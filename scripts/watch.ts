import { watch } from "fs";

const WATCH_DIRS = ["content", "layouts", "src"];
const DEBOUNCE_MS = 100;

let child: ReturnType<typeof Bun.spawn> | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;

function run() {
    if (child) child.kill();
    child = Bun.spawn(["bun", "src/run.ts"], {
        stdout: "inherit",
        stderr: "inherit",
    });
}

function scheduleRun() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(run, DEBOUNCE_MS);
}

for (const dir of WATCH_DIRS) {
    watch(dir, { recursive: true }, scheduleRun);
}

run();
