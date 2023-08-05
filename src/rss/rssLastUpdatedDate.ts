import { dateRfc3339 } from "./dateRfc3339";

export function rssLastUpdatedDate(posts: Array<{ date: string }>) {
    return dateRfc3339(new Date(posts.at(-1)!.date));
}
