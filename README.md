# Personal Homepage

A static Astro website for Home, Research, Writing, and About. Writing uses Markdown and Astro Content Collections. Hosting target: Cloudflare Workers Static Assets, built automatically by Workers Builds from the user-supplied GitHub repository `ideafang/personal-site`.

## Develop

Use Node 22 (tested version in `.nvmrc`) and npm.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

For local Cloudflare validation after building:

```sh
npm run preview:workers
npm run check:workers
```

`npm run deploy` is reserved for authorized deployment or Cloudflare Workers Builds; it has not been run during initialization. Local `origin` is configured to `git@github.com:ideafang/personal-site.git`; no push or Cloudflare account login has been performed.

## Writing

Articles live in `src/content/writing/`; metadata is validated in `src/content.config.ts`. Drafts appear only in local development and are excluded from production lists and routes. Missing draft flags default to true. `test-draft.md` is only a validation fixture. Home, Research and About contain placeholders awaiting author content.

See [architecture](docs/architecture.md), [publishing](docs/publishing.md), and [agent instructions](AGENTS.md). The publishing guide describes manual GitHub/Cloudflare connection. No GitHub Actions deployment is used.
