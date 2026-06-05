# Original Site Design Reference

This folder preserves the useful parts of the original Ghost and legacy site archive. Treat these files as reference material, not application source.

## Source Of Truth

The live Ghost install was configured with:

- Site title: `Brian Erickson`
- Site description: `Product Management, iOS Development and Design.`
- Active theme: `casper-bme`
- Site cover: `/content/images/2016/03/djbriane-background_blur_1400-2.jpg`
- Author cover: `/content/images/2016/03/djbriane-background_blur_1400-3.jpg`
- Author image: `/content/images/2016/03/Brian-Profile-2016-1.jpg`

## Preserved References

- `theme/` contains the customized Ghost Casper theme templates and CSS.
- `images/` contains the key original cover/profile images that drove the visual identity.
- `ghost-images/` contains the full Ghost image month from the backup so migrated posts do not lose media references.
- `legacy/` contains the older pre-Ghost CSS and selected legacy images that may help with visual archaeology.
- `legacy/images/` contains the full legacy image folder, including old 404 art and post images.
- `../brian-erickson.ghost.2026-06-05.json` is a sanitized Ghost export for migration; do not replace it with a raw Ghost database export.

## Visual DNA

The original site is a customized Ghost Casper blog:

- Full-viewport image hero on the homepage, using blurred Ganesh artwork as the cover.
- White centered title and description over the hero.
- Thin uppercase navigation buttons overlaid at the top of the cover image.
- Editorial reading column around `710px`.
- Body typography: `Merriweather`, serif, around `18px` with generous line height.
- Heading/navigation typography: `Open Sans`, bold, compact, and utilitarian.
- Background: white content surface, not parchment/off-white.
- Text: dark neutral gray (`#3A4145`) with cooler muted metadata (`#9EABB3`).
- Dividers: very light blue-gray (`#EBF2F6`) with Casper's small centered divider ornament after index posts.
- Post images can break wider than the reading column.

## Astro Port Guidance

Do not import the Ghost theme wholesale into Astro. Rebuild the design as a small maintainable theme layer:

- `src/styles/tokens.css` or a token section in `global.css` for colors, typography, spacing, and reading widths.
- `src/components/SiteCover.astro` for the full-screen homepage/post hero treatment.
- `src/components/PostListItem.astro` for the Casper-style index row and metadata.
- `src/layouts/Post.astro` or equivalent for narrow editorial reading pages.
- `src/components/Nav.astro` should support the over-cover navigation style used by the original site.

Use the preserved `screen.css` for measurements and mood, but convert only the pieces we actually need. Keep modern accessibility, responsive behavior, sitemap/canonical metadata, and Astro content collections.

## Files Not Worth Keeping

- `nginx/usr-share-nginx-html/index.html` is the default nginx welcome page, not the old site design.
- The nested `.git` directory from the extracted legacy repo should not be preserved.
- Docker/nginx operational files are useful only as historical deployment context, not for the v1 Astro build.
