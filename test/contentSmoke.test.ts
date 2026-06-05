import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("migrated content smoke checks", () => {
  it("has 19 migrated blog posts", () => {
    const files = readdirSync("src/content/blog").filter((f) => f.endsWith(".md"));
    expect(files).toHaveLength(19);
  });

  it("every blog post carries required frontmatter", () => {
    const files = readdirSync("src/content/blog").filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const contents = readFileSync(`src/content/blog/${file}`, "utf8");
      expect(contents).toMatch(/^---\n[\s\S]*?\n---/);
      expect(contents).toMatch(/\ntitle:/);
      expect(contents).toMatch(/\ndate:/);
      expect(contents).toMatch(/\ndescription:/);
      expect(contents).toMatch(/\ndraft: false/);
      expect(contents).toMatch(/\nghost_id: \d+/);
    }
  });

  it("keeps the single real GPXplore project and the extracted About page", () => {
    expect(existsSync("src/content/projects/gpxplore.md")).toBe(true);
    expect(existsSync("src/data/about.md")).toBe(true);
  });

  it("copied referenced blog images into the public tree", () => {
    expect(existsSync("public/images/blog/leeds-colorado.jpg")).toBe(true);
    expect(existsSync("public/images/cover.jpg")).toBe(true);
  });

  it("generates Ghost post + about redirects", () => {
    const redirects = readFileSync("public/_redirects", "utf8");
    expect(redirects).toContain("/looking-back /blog/looking-back/ 301");
    expect(redirects).toContain("/looking-back/ /blog/looking-back/ 301");
    expect(redirects).toContain("/about /resume/ 301");
  });

  it("leaves no legacy Ghost image paths in migrated bodies", () => {
    const files = readdirSync("src/content/blog").filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const contents = readFileSync(`src/content/blog/${file}`, "utf8");
      expect(contents).not.toMatch(/\/content\/images\//);
      expect(contents).not.toMatch(/]\(\/img\//);
      expect(contents).not.toContain("<!--more-->");
    }
  });
});
