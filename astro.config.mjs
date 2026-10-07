// @ts-check
import { defineConfig } from 'astro/config';

// Fully prerendered HTML is served by Cloudflare Workers Static Assets.
export default defineConfig({ output: 'static' });
