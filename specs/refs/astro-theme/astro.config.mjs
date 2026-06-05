import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://brianerickson.example.com',
  output: 'static',
  integrations: [mdx(), sitemap()],
  trailingSlash: 'never',
});
