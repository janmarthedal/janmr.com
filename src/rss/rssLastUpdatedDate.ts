import { dateRfc3339 } from "./dateRfc3339";

export function rssLastUpdatedDate(posts: Array<{ date: Date }>) {
    return dateRfc3339(posts.at(-1)!.date);
}
