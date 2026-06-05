import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const ghostExport = readFileSync("specs/refs/brian-erickson.ghost.2026-06-05.json", "utf8");

describe("public repo safety", () => {
  it("keeps the Ghost export sanitized for public source control", () => {
    const exportData = JSON.parse(ghostExport);
    const data = exportData.db[0].data;

    expect(exportData.db[0].meta.sanitized).toBe(true);
    expect(data.roles).toBeUndefined();
    expect(data.permissions).toBeUndefined();
    expect(ghostExport).not.toMatch(/"password"\s*:/i);
    expect(ghostExport).not.toMatch(/"email"\s*:/i);
    expect(ghostExport).not.toMatch(/\$2[aby]\$/);
  });
});
