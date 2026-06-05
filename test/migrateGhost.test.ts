import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import {
  BME_FORMAT_LINK_SLUG,
  buildGeneratedRedirects,
  buildPostFile,
  cleanBody,
  composeRedirects,
  deriveDescriptionFromBody,
  extractExternalLinks,
  extractImageRefs,
  getAboutPage,
  getExportData,
  getPublishedPosts,
  isProseDescription,
  joinTags,
  resolveDescription,
  rewriteImagePath,
  shouldWrite,
  stripTrackingParams,
  toFrontmatter,
  unixMsToDate,
} from "../scripts/migrate-ghost.js";

const exportJson = JSON.parse(
  readFileSync("specs/refs/brian-erickson.ghost.2026-06-05.json", "utf8"),
);
const data = getExportData(exportJson);

describe("post selection", () => {
  it("returns exactly the 19 published, non-page posts", () => {
    const posts = getPublishedPosts(data);
    expect(posts).toHaveLength(19);
    expect(posts.every((p: any) => p.status === "published" && p.page === 0)).toBe(true);
  });

  it("excludes drafts and the About page from the blog set", () => {
    const posts = getPublishedPosts(data);
    expect(posts.some((p: any) => p.status === "draft")).toBe(false);
    expect(posts.some((p: any) => p.page === 1)).toBe(false);
    expect(posts.some((p: any) => p.slug === "about")).toBe(false);
  });

  it("extracts the published About page separately", () => {
    const about = getAboutPage(data);
    expect(about?.slug).toBe("about");
    expect(about?.page).toBe(1);
  });
});

describe("tag joins", () => {
  it("joins tags via the posts_tags table ordered by sort_order", () => {
    const post = getPublishedPosts(data).find((p: any) => p.slug === "first-trail-run-of-summer-2009");
    expect(joinTags(post, data)).toEqual(["Running"]);
  });

  it("strips the internal bme_format_link tag", () => {
    // onboarding post is tagged only with bme_format_link in the export.
    const post = getPublishedPosts(data).find(
      (p: any) => p.slug === "onboarding-users-is-harder-than-you-think",
    );
    expect(joinTags(post, data)).toEqual([]);
    expect(joinTags(post, data)).not.toContain("bme_format_link");
  });

  it("never emits the bme_format_link slug for any post", () => {
    const linkTag = data.tags.find((t: any) => t.slug === BME_FORMAT_LINK_SLUG);
    expect(linkTag).toBeDefined();
    for (const post of getPublishedPosts(data)) {
      expect(joinTags(post, data)).not.toContain(linkTag.name);
    }
  });
});

describe("date mapping", () => {
  it("converts unix ms to YYYY-MM-DD", () => {
    expect(unixMsToDate(0)).toBe("1970-01-01");
    const post = getPublishedPosts(data).find((p: any) => p.slug === "looking-back");
    expect(unixMsToDate(post.published_at)).toBe("2009-05-24");
  });
});

describe("description resolution", () => {
  it("treats a bare URL or blank meta_description as non-prose", () => {
    expect(isProseDescription("")).toBe(false);
    expect(isProseDescription("   ")).toBe(false);
    expect(isProseDescription("https://example.com/path")).toBe(false);
    expect(isProseDescription("A real human sentence.")).toBe(true);
  });

  it("derives a trimmed excerpt from the body when meta_description is a URL", () => {
    const post = getPublishedPosts(data).find(
      (p: any) => p.slug === "onboarding-users-is-harder-than-you-think",
    );
    const description = resolveDescription(post);
    expect(description.length).toBeGreaterThan(0);
    expect(description).not.toMatch(/^https?:\/\//);
    expect(description.startsWith("Some great advice")).toBe(true);
  });

  it("derives at a word boundary within the length budget", () => {
    const body = "word ".repeat(100);
    const desc = deriveDescriptionFromBody(body, 50);
    expect(desc.length).toBeLessThanOrEqual(52); // budget + ellipsis
    expect(desc.endsWith("…")).toBe(true);
    expect(desc).not.toMatch(/\s…$/);
  });
});

describe("image rewriting", () => {
  it("rewrites legacy /content/images and /img paths to /images/blog/<file>", () => {
    expect(rewriteImagePath("/content/images/2016/03/photosapp-hero-1.png")).toBe(
      "/images/blog/photosapp-hero-1.png",
    );
    expect(rewriteImagePath("/img/leeds-colorado.jpg")).toBe("/images/blog/leeds-colorado.jpg");
  });

  it("leaves remote image URLs untouched", () => {
    expect(rewriteImagePath("https://cdn.example.com/x.png")).toBe(
      "https://cdn.example.com/x.png",
    );
  });

  it("rewrites image targets and drops the excerpt marker in cleanBody", () => {
    const body = "![alt](/img/leeds-colorado.jpg)\n\nIntro<!--more-->\n\nMore";
    const cleaned = cleanBody(body);
    expect(cleaned).toContain("![alt](/images/blog/leeds-colorado.jpg)");
    expect(cleaned).not.toContain("<!--more-->");
  });

  it("extracts only local image references", () => {
    const refs = extractImageRefs("![a](/img/x.png) ![b](https://e.com/y.png)");
    expect(refs).toEqual(["/img/x.png"]);
  });
});

describe("link cleanup", () => {
  it("strips utm_* tracking params while preserving other params and hash", () => {
    expect(stripTrackingParams("https://e.com/a?utm_source=tw&id=5#frag")).toBe(
      "https://e.com/a?id=5#frag",
    );
    expect(stripTrackingParams("https://e.com/a?utm_source=tw")).toBe("https://e.com/a");
    expect(stripTrackingParams("https://e.com/a")).toBe("https://e.com/a");
  });

  it("collects unique external links from a body", () => {
    const links = extractExternalLinks("[a](https://x.com) [b](https://x.com) [c](/local)");
    expect(links).toEqual(["https://x.com"]);
  });
});

describe("post file building", () => {
  it("builds frontmatter with ghost_id, draft false, and slug filename", () => {
    const post = getPublishedPosts(data).find((p: any) => p.slug === "looking-back");
    const file = buildPostFile(post, data);
    expect(file.filename).toBe("looking-back.md");
    expect(file.contents).toMatch(/^---\n/);
    expect(file.contents).toContain("ghost_id: 4");
    expect(file.contents).toContain("draft: false");
    expect(file.contents).toContain("date: \"2009-05-24\"");
    expect(file.contents).toContain("![Leeds School of Business](/images/blog/leeds-colorado.jpg)");
  });
});

describe("frontmatter serialization", () => {
  it("emits arrays and quotes risky scalars", () => {
    const yaml = toFrontmatter({ title: "A: B", tags: ["One", "Two"], draft: false, n: 3 });
    expect(yaml).toContain('title: "A: B"');
    expect(yaml).toContain("tags:\n  - One\n  - Two");
    expect(yaml).toContain("draft: false");
    expect(yaml).toContain("n: 3");
  });

  it("emits an empty array inline", () => {
    expect(toFrontmatter({ tags: [] })).toContain("tags: []");
  });
});

describe("redirect generation", () => {
  it("generates both /slug and /slug/ redirects for every post", () => {
    const lines = buildGeneratedRedirects(getPublishedPosts(data));
    expect(lines).toContain("/looking-back /blog/looking-back/ 301");
    expect(lines).toContain("/looking-back/ /blog/looking-back/ 301");
  });

  it("generates legacy image path redirects", () => {
    const lines = buildGeneratedRedirects(getPublishedPosts(data));
    expect(lines).toContain("/img/leeds-colorado.jpg /images/blog/leeds-colorado.jpg 301");
  });

  it("preserves an existing manual redirects section when recomposing", () => {
    const existing = [
      "# Generated by scripts/migrate-ghost.js",
      "/old /blog/old/ 301",
      "",
      "# Manual redirects",
      "/about /resume/ 301",
      "/custom /somewhere/ 302",
    ].join("\n");
    const composed = composeRedirects(["/new /blog/new/ 301"], existing);
    expect(composed).toContain("/new /blog/new/ 301");
    expect(composed).toContain("# Manual redirects");
    expect(composed).toContain("/custom /somewhere/ 302");
    expect(composed).not.toContain("/old /blog/old/ 301"); // generated section rebuilt
  });

  it("seeds default about->resume manual redirects when none exist", () => {
    const composed = composeRedirects(["/new /blog/new/ 301"], "");
    expect(composed).toContain("/about /resume/ 301");
    expect(composed).toContain("/about/ /resume/ 301");
  });
});

describe("no-overwrite behavior", () => {
  it("skips existing files unless forced", () => {
    expect(shouldWrite(false, false)).toBe(true); // new file
    expect(shouldWrite(true, false)).toBe(false); // exists, no force -> skip
    expect(shouldWrite(true, true)).toBe(true); // exists, force -> overwrite
  });
});
