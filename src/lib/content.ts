import type { CollectionEntry } from "astro:content";

export const SITE_TITLE = "Brian Erickson";
export const SITE_DESCRIPTION =
  "Brian Erickson is a senior product manager at Mailgun (Sinch) building B2B SaaS products for enterprise adoption and product-led growth.";
export const SITE_URL = "https://brian-erickson.com";

export function todayUtcDateString(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function dateToUtcDateString(date: Date | string) {
  const value = typeof date === "string" ? new Date(date) : date;
  return value.toISOString().slice(0, 10);
}

export function formatDate(date: Date | string) {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}

export function isPublishedPost(post: CollectionEntry<"blog">) {
  return post.data.draft !== true && dateToUtcDateString(post.data.date) <= todayUtcDateString();
}

export function sortByDateDesc<T extends { data: { date: Date } }>(items: T[]) {
  return [...items].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function estimateReadingMinutes(markdown: string) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_\-[\]()`]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 220));
}
