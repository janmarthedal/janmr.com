import type { Page } from "./page";
import { jsDateToISO } from "./date-to-iso";

const levelFor = (count: number) => (count <= 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : 3);
const heatmapMonthFormat = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });
const heatmapDayFormat = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Copenhagen" });
const heatmapDayIso = (date: Date) => heatmapDayFormat.format(date);

function updatesHeatmapYear(year: number, yearStart: Date, yearEnd: Date, counts: Map<string, number>): string {
    const start = new Date(yearStart);
    start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));
    const end = new Date(yearEnd);
    end.setUTCDate(end.getUTCDate() + ((7 - end.getUTCDay()) % 7));

    const weeks: Array<Array<Date>> = [];
    for (let cursor = new Date(start); cursor <= end; ) {
        const week: Array<Date> = [];
        for (let i = 0; i < 7; i++) {
            week.push(new Date(cursor));
            cursor.setUTCDate(cursor.getUTCDate() + 1);
        }
        weeks.push(week);
    }

    const monthGroups: Array<{ label: string; span: number }> = [];
    for (const week of weeks) {
        const monthKey = `${week[0].getUTCFullYear()}-${week[0].getUTCMonth()}`;
        const last = monthGroups[monthGroups.length - 1];
        if (last && last.label === monthKey) {
            last.span++;
        } else {
            monthGroups.push({ label: monthKey, span: 1 });
        }
    }
    const monthRow = monthGroups
        .map(({ label, span }) => {
            if (span <= 2) return `<th colspan="${span}"></th>`;
            const [y, month] = label.split("-").map(Number);
            return `<th colspan="${span}">${heatmapMonthFormat.format(new Date(Date.UTC(y, month, 1)))}</th>`;
        })
        .join("");

    const dayLabels = ["Mon", "", "Wed", "", "Fri", "", "Sun"];
    const bodyRows = dayLabels
        .map((label, day) => {
            const cells = weeks
                .map((week) => {
                    const d = week[day];
                    if (d.getUTCFullYear() !== year) return `<td class="uh-empty" style="width:10px"></td>`;
                    const iso = jsDateToISO(d);
                    const count = counts.get(iso) ?? 0;
                    const level = levelFor(count);
                    const cellLabel = `${iso}: ${count} update${count === 1 ? "" : "s"}`;
                    return `<td class="uh-level-${level}" style="width:10px" title="${cellLabel}"></td>`;
                })
                .join("");
            return `<tr style="height:10px"><th style="position:relative"><span style="clip-path: None;position: absolute;bottom: -3px;">${label}</span></th>${cells}</tr>`;
        })
        .join("");

    return `<h3>${year}</h3><div class="updates-heatmap"><table><thead><tr><th style="width:28px"></th>${monthRow}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
}

export function updatesHeatmap(pages: Array<Page>): string {
    const counts = new Map<string, number>();
    for (const page of pages) {
        if (!page.date) continue;
        const iso = heatmapDayIso(page.date);
        counts.set(iso, (counts.get(iso) ?? 0) + 1);
    }
    if (counts.size === 0) return "";

    const isoDates = [...counts.keys()].sort();
    const firstYear = Number(isoDates[0].slice(0, 4));
    const [nowYear, nowMonth, nowDate] = heatmapDayIso(new Date()).split("-").map(Number);
    const lastDay = new Date(Date.UTC(nowYear, nowMonth - 1, nowDate));
    const lastYear = lastDay.getUTCFullYear();

    const tables: Array<string> = [];
    for (let year = lastYear; year >= firstYear; year--) {
        const yearStart = new Date(Date.UTC(year, 0, 1));
        const yearEnd = year === lastYear ? lastDay : new Date(Date.UTC(year, 11, 31));
        tables.push(updatesHeatmapYear(year, yearStart, yearEnd, counts));
    }
    return tables.join("");
}
