import { dateRfc3339 } from "./dateRfc3339";

export function rssLastUpdatedDate(pages: Array<{ date: Date }>) {
    return dateRfc3339(pages[0].date);
}
