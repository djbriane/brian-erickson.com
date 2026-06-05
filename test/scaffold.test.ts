import { describe, expect, it } from "vitest";
import { todayUtcDateString } from "../src/lib/content";

describe("scaffold", () => {
  it("formats the current UTC date as YYYY-MM-DD", () => {
    expect(todayUtcDateString(new Date("2026-06-05T23:59:00Z"))).toBe("2026-06-05");
  });
});

