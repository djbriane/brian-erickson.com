import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://brian-erickson.com",
  trailingSlash: "always",
  integrations: [sitemap()],
});

