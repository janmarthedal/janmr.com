import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import lycheeConfig from "../lychee.toml";

// Checks links in the generated site with lychee (settings in lychee.toml).
// Internal links, including absolute https://janmr.com/ ones, are resolved
// against _site. Links to redirect sources in _site/_redirects are reported
// as warnings, other broken links as errors. With --external, http(s) links
// matching an `exclude` pattern in lychee.toml are listed as links to check
// manually.
//
// Usage: bun scripts/check-links.ts [--external]

const SITE_DIR = resolve("_site");
const SITE_URL = "https://janmr.com";
const REDIRECT_FILE = `${SITE_DIR}/_redirects`;

interface LinkResult {
    url: string;
    status: { text: string; details?: string };
    remap?: { original: { url: string } };
    span?: { line: number; column: number };
}

interface LycheeReport {
    total: number;
    successful: number;
    excludes: number;
    error_map: Record<string, Array<LinkResult>>;
    excluded_map: Record<string, Array<LinkResult>>;
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
    const proc = Bun.spawn(args, { stdout: "pipe", stderr: "inherit" });
    const output = await new Response(proc.stdout).text();
    await proc.exited;
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
            } else {
                errors++;
                console.log(`ERROR ${where}\n      ${url}: ${result.status.text}`);
            }
        }
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
