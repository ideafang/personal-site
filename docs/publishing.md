# Content publishing and deployment

Last reviewed: 2026-10-08. Local origin is configured to the user-supplied `git@github.com:ideafang/personal-site.git`. No push or repository-access check has been performed. Cloudflare is not connected or deployed.

## Local setup
Use Node 22 (tested version in `.nvmrc`) and npm:

```sh
npm ci
npm run dev
```

Open the URL printed by Astro. Stop foreground development with Ctrl-C. Astro also supports `npm run dev -- --background` and management through `npm run astro -- dev status`, `npm run astro -- dev logs`, `npm run astro -- dev stop`.

## Write an article
Create `src/content/writing/descriptive-slug.md`:

```yaml
---
title: "Article title"
description: "A short description for readers and page metadata."
date: 2026-10-07
# updatedDate: 2026-10-08
tags: [research]
draft: true
# cover: ../../assets/example.jpg
---
```

Write the body below the frontmatter. Use ISO dates and a local image path relative to the Markdown file if a cover is supplied. `updatedDate` must not precede `date`. Cover is decorative; informative figures belong in the article body with meaningful alt text. The filename determines the URL; avoid renaming published articles without a redirect plan.

During local development, `/writing/` includes draft labels and `/writing/descriptive-slug/` renders the article. Missing draft flags default to true. Production excludes drafts from both listings and generated article routes. Draft exclusion does not hide content in GitHub: never commit confidential AI discussions or private notes, especially to a public repository.

Before publishing, review facts, references, permissions, personal information, and the final wording of AI-assisted passages. Set `draft: false` only after author review. A future date is metadata, not a scheduled-publication gate.

## Validate and commit

```sh
npm run check
npm run build
npm run preview
# Or stop preview, then inspect in the local Workers runtime:
npm run preview:workers
# Packaging check with no upload:
npm run check:workers
```

Production build output is `dist/`. `npm run preview` previews the built site and therefore excludes drafts. `preview:workers` uses `wrangler dev --local` against existing dist; always build first. Do not use remote flags or cloud preview upload commands for local checks.

Review changed and staged files, confirm no secrets/private content, then create a focused commit:

```sh
git status
git add <reviewed-files>
git diff --cached
git commit -m "content: publish article title"
```

Do not add ignored outputs, tokens, .env, .dev.vars, .wrangler state, or SSH keys. Keep the lockfile with dependency changes.

## One-time manual GitHub and Cloudflare setup
The author performs these steps later:

1. The supplied GitHub repository is `ideafang/personal-site`; local `origin` uses its SSH URL. Ensure the local source reaches its `main` branch before importing it into Cloudflare.
2. Push `main` when authorized (`git push -u origin main`). No push has been performed in this session. If the remote already has commits, inspect and reconcile history first; do not force-push. No PAT or SSH configuration changes are made by this project.
3. In Cloudflare Dashboard: **Workers & Pages → Create application → Import a repository → Get started**. Authorize GitHub access to `ideafang/personal-site`, then select that repository. This is Workers Builds Git integration. For an existing Worker, use **Worker → Settings → Builds → Connect**.
4. Confirm the actual Worker name. Make `wrangler.jsonc` name match the Dashboard Worker before the first production build. The initial proposed name is `personal-homepage`.
5. Set the production branch and build configuration below, then choose **Save and Deploy** to start the first remote build/deployment. Confirm the successful build and generated workers.dev URL.
6. Configure a custom domain later if desired, then supply its URL for Astro site metadata.

| Setting | Value |
| --- | --- |
| Production branch | main |
| Root directory | repository root (`/` in Dashboard) |
| Build command | npm run build |
| Deploy command | npm run deploy |
| Node version build variable | NODE_VERSION=22.23.3 (same as .nvmrc) |
| Assets directory | ./dist (Wrangler configuration) |

Workers Builds installs project dependencies before the build. The deploy script runs only Wrangler, avoiding a duplicate Astro build. Cloudflare manages build authentication through its Dashboard integration; do not create or store tokens locally. No GitHub Actions workflow is needed. If branch previews are enabled, review Cloudflare's current preview configuration in Dashboard; no cloud preview was created during initialization.

## Normal release flow
Author reviews content → local checks/build → local Git commit → authorized push to GitHub → Cloudflare Workers Builds → automatic deployment. Inspect the Cloudflare build logs and live site after release. A later Git revert and push can undo a content release. Local checks do not prove that account permissions, custom domains, or the first remote deployment work.

Keep this document and README synchronized whenever publication or deployment commands change.

Dashboard entry points verified against [Workers Builds official documentation](https://developers.cloudflare.com/workers/ci-cd/builds/) on 2026-10-08.
