import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import lycheeConfig from "../lychee.toml";

// Checks links in the generated site with lychee (settings in lychee.toml).
// Internal links, including absolute https://janmr.com/ ones, are resolved
// against _site. Links to redirect sources in _site/_redirects are reported
// as warnings, other broken links as errors. With --external, permanent
// redirects (301/308) of external links are reported as warnings, and http(s)
// links matching an `exclude` pattern in lychee.toml are listed as links to
// check manually. 403 Forbidden responses are reported as warnings, since
// many sites return them to non-browser clients.
//
// Usage: bun scripts/check-links.ts [--external]

const SITE_DIR = resolve("_site");
const SITE_URL = "https://janmr.com";
const REDIRECT_FILE = `${SITE_DIR}/_redirects`;
const CACHE_FILE = ".lycheecache";
const PERMANENT_REDIRECT_CODES = [301, 308];

interface LinkResult {
    url: string;
    status: { text: string; code?: number; details?: string };
    remap?: { original: { url: string } };
    span?: { line: number; column: number };
}

interface LycheeReport {
    total: number;
    successful: number;
    excludes: number;
    error_map: Record<string, Array<LinkResult>>;
    excluded_map: Record<string, Array<LinkResult>>;
    success_map: Record<string, Array<LinkResult>>;
    redirect_map: Record<string, Array<Redirect>>;
}

interface Redirect {
    origin: string;
    redirects: Array<{ url: string; code: number }>;
}

const external = process.argv.includes("--external");
const excludePatterns = ((lycheeConfig.exclude ?? []) as string[]).map((p) => new RegExp(p));

if (!existsSync(SITE_DIR)) {
    console.error(`${SITE_DIR} not found; run \`bun run make\` first`);
    process.exit(2);
}

const args = [
    "lychee",
    "--no-progress",
    "--format", "json",
    "--root-dir", SITE_DIR,
    "--remap", `${SITE_URL.replaceAll(".", "\\.")}/(.*) file://${SITE_DIR}/$1`,
];
if (external) {
    args.push(
        "-v", // needed for redirect_map
        "--cache",
        "--max-cache-age", "7d",
        "--cache-exclude-status", "429",
        "--max-concurrency", "8",
    );
} else {
    args.push("--offline");
}
args.push("_site");

async function runLychee(): Promise<LycheeReport> {
    // With -v, lychee logs every link to stderr; only show it on failure.
    const proc = Bun.spawn(args, { stdout: "pipe", stderr: external ? "pipe" : "inherit" });
    const [output, log] = await Promise.all([
        new Response(proc.stdout).text(),
        external ? new Response(proc.stderr).text() : "",
    ]);
    const exitCode = await proc.exited;
    if (exitCode !== 0 && exitCode !== 2) process.stderr.write(log);
    try {
        return JSON.parse(output);
    } catch {
        console.error("Could not parse lychee output:\n" + output);
        process.exit(2);
    }
}

function loadRedirects(): Map<string, string> {
    const redirects = new Map<string, string>();
    if (!existsSync(REDIRECT_FILE)) return redirects;
    for (const line of readFileSync(REDIRECT_FILE, "utf8").split("\n")) {
        const [src, dst] = line.split("\t");
        if (src && dst) redirects.set(src, dst);
    }
    return redirects;
}

// Site path (e.g. /posts/x/index.html) for an internal URL, or null if external.
function sitePath(url: string): string | null {
    let path: string;
    if (url.startsWith(`file://${SITE_DIR}/`)) {
        path = url.slice(`file://${SITE_DIR}`.length);
    } else if (url.startsWith(`${SITE_URL}/`)) {
        path = url.slice(SITE_URL.length);
    } else {
        return null;
    }
    path = decodeURI(path.replace(/[?#].*$/, ""));
    return path.endsWith("/") ? path + "index.html" : path;
}

// Locations of excluded http(s) links matching a lychee.toml pattern, by URL.
function manualChecks(report: LycheeReport): Map<string, string[]> {
    const checks = new Map<string, string[]>();
    for (const [input, results] of Object.entries(report.excluded_map ?? {})) {
        for (const result of results) {
            const url = result.remap?.original.url ?? result.url;
            if (!/^https?:/.test(url) || !excludePatterns.some((p) => p.test(url))) continue;
            const where = result.span ? `${input}:${result.span.line}:${result.span.column}` : input;
            checks.set(url, [...(checks.get(url) ?? []), where]);
        }
    }
    return checks;
}

interface PermanentRedirect {
    where: string;
    url: string;
    target: string;
    codes: number[];
}

// Occurrences of external links whose first redirect is permanent. The
// suggested target is where the leading run of permanent redirects ends.
// lychee lists a redirect under only one of the pages linking to it, so all
// occurrences are looked up in the success and error maps.
function permanentRedirects(report: LycheeReport): PermanentRedirect[] {
    const targets = new Map<string, { target: string; codes: number[] }>();
    for (const { origin, redirects } of Object.values(report.redirect_map ?? {}).flat()) {
        const temporary = redirects.findIndex((r) => !PERMANENT_REDIRECT_CODES.includes(r.code));
        const count = temporary < 0 ? redirects.length : temporary;
        if (count === 0) continue;
        targets.set(origin, {
            target: redirects[count - 1].url,
            codes: redirects.slice(0, count).map((r) => r.code),
        });
    }
    const found: PermanentRedirect[] = [];
    for (const map of [report.success_map ?? {}, report.error_map]) {
        for (const [input, results] of Object.entries(map)) {
            for (const result of results) {
                const redirect = targets.get(result.url);
                if (!redirect) continue;
                const where = result.span ? `${input}:${result.span.line}:${result.span.column}` : input;
                found.push({ where, url: result.url, ...redirect });
            }
        }
    }
    return found;
}

// lychee caches a redirected link as a plain success, which would hide the
// redirect on later runs. Remove such links from the cache so they are always
// re-checked.
function uncache(urls: Set<string>) {
    if (urls.size === 0 || !existsSync(CACHE_FILE)) return;
    const lines = readFileSync(CACHE_FILE, "utf8").split("\n");
    const kept = lines.filter((line) => !urls.has(line.slice(0, line.lastIndexOf(",", line.lastIndexOf(",") - 1))));
    if (kept.length < lines.length) writeFileSync(CACHE_FILE, kept.join("\n"));
}

async function run() {
    const report = await runLychee();
    const redirects = loadRedirects();
    let warnings = 0;
    let errors = 0;

    const inputs = Object.keys(report.error_map).sort();
    for (const input of inputs) {
        const results = report.error_map[input].toSorted((a, b) => (a.span?.line ?? 0) - (b.span?.line ?? 0));
        for (const result of results) {
            const url = result.remap?.original.url ?? result.url;
            const where = result.span ? `${input}:${result.span.line}:${result.span.column}` : input;
            const path = sitePath(url);
            const target = path ? redirects.get(path) : undefined;
            if (target) {
                warnings++;
                console.log(`WARN  ${where}\n      ${url} redirects to ${target}`);
            } else if (result.status.code === 403) {
                warnings++;
                console.log(`WARN  ${where}\n      ${url}: 403 Forbidden, check manually`);
            } else {
                errors++;
                console.log(`ERROR ${where}\n      ${url}: ${result.status.text}`);
            }
        }
    }

    if (external) {
        const found = permanentRedirects(report).toSorted((a, b) => a.where.localeCompare(b.where, "en", { numeric: true }));
        for (const { where, url, target, codes } of found) {
            warnings++;
            console.log(`WARN  ${where}\n      ${url} permanently redirects (${codes.join(", ")}) to ${target}`);
        }
        uncache(new Set(found.map((r) => r.url)));
    }

    const checks = external ? manualChecks(report) : new Map<string, string[]>();
    for (const url of [...checks.keys()].sort()) {
        console.log(`CHECK ${url} (excluded, check manually)`);
        for (const where of checks.get(url)!.sort()) console.log(`      ${where}`);
    }

    console.log(
        `\n${report.total} total, ${report.successful} ok, ${report.excludes} excluded, ` +
            `${warnings} warnings, ${errors} errors` +
            (external ? `, ${checks.size} to check manually` : ""),
    );
    process.exit(errors > 0 ? 1 : 0);
}

run();
