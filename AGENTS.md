# Personal Homepage — Agent Instructions

## Purpose and scope
This directory is an independent, long-term personal website project. It hosts personal introduction, Research, Writing, and About. The first version has four navigation pages: Home, Research, Writing, About. Article routes and a 404 page support those sections. Do not add a Projects page, CMS, database, dynamic backend, JavaScript UI framework, or substantial visual dependencies without a new user request.

## Stack and architecture
- Astro, strict TypeScript, native Astro components, and Markdown.
- Astro build-time Content Collections (`src/content.config.ts`, `glob` loader).
- Static output in `dist/`, hosted by Cloudflare Workers Static Assets.
- Git locally; GitHub for source history once the user supplies a repository.
- Cloudflare Workers Builds for build and deployment; no GitHub Actions deployment.
- npm lockfile is committed. Node requirements live in package.json; tested Node is recorded in .nvmrc.

## Directory structure
- `src/pages/`: Home, Research, About, Writing list/article routes, 404.
- `src/layouts/BaseLayout.astro`: shared document, navigation, minimal styles.
- `src/content/writing/`: Markdown articles; filename determines stable article URL.
- `src/content.config.ts`: Writing metadata validation.
- `src/lib/writing.ts`: shared sorting and draft visibility policy.
- `public/`: files served without transformation; never store private drafts here.
- `docs/architecture.md`: architecture decisions and official references.
- `docs/publishing.md`: content and deployment procedures.
- `task_plan.md`, `notes.md`: initialization progress and evidence.
- `astro.config.mjs`, `wrangler.jsonc`: static build and Workers assets configuration.

## Development rules
Read existing files before edits. Keep changes small and reversible. Prefer native Astro and plain CSS. Do not invent biography, affiliations, publications, contact details, account IDs, or domains. Use official documentation before changing platform configuration. Keep every project write inside this root. Use the installed expression-skill for clear communication and planning-with-files for substantial work.

Run `npm ci`, `npm run dev`, `npm run check`, and `npm run build` as appropriate. Use `npm run preview` to inspect built HTML and `npm run preview:workers` for local Workers runtime. `npm run check:workers` performs a deployment dry run; it must not publish anything. Record checks and material limitations in docs when they change the operating procedure.

## Content rules
Writing uses plain `.md`, not MDX. Required metadata: title, description, date. Optional metadata: updatedDate, tags, cover. `draft` defaults to true; publication requires explicit `draft: false`. Dates use ISO format. updatedDate cannot precede date. Cover is a local image path relative to the Markdown file; use it as a decorative article header. Meaningful figures require descriptive alternative text in the body.

Drafts appear in local Astro development only. Production lists AND generated article routes must use the same filter from `src/lib/writing.ts`. Draft status prevents website publication, not disclosure through a public Git repository. Never commit confidential discussions or source material. Review AI-assisted writing for accuracy, attribution, privacy, and author intent before publication. Do not change the test fixture to published status except temporarily for a verification that restores it afterward.

## Git and secrets
Use focused local commits with meaningful messages (for example `feat: ...`, `docs: ...`, `fix: ...`). Inspect staged diff before committing; include package-lock.json with dependency changes. Ignore node_modules, dist/build/cache, .astro, .wrangler, .env variants, .dev.vars variants, editor state, logs and credentials. Never commit tokens, account credentials, SSH keys, or private material. .gitignore is a guardrail, not a secret scanner.

The user permits local commits. Do not create a GitHub repository, guess a username, add an unprovided remote, push, create/save PATs, alter SSH configuration, or change global Git/npm/Node configuration without explicit authorization. Use an existing Git identity; if missing, ask instead of inventing it.

## Deployment and account boundary
Local Astro → Git → user-provided GitHub repository → Cloudflare Workers Builds → Workers Static Assets. The user manually connects GitHub in the Cloudflare Dashboard. No login, actual Worker creation, remote preview upload, or deployment is authorized during initialization. `deploy` is reserved for future authorized use/Cloudflare Builds. Wrangler `name` is a local proposal, not an existing Worker; the user must confirm it during Dashboard setup.

## Durable maintenance
Update AGENTS.md and docs/architecture.md when structure, schema, dependencies, rendering, or platform decisions change. Update docs/publishing.md when content or release commands change. Keep README commands consistent. Distinguish verified local behavior from untested production hosting. Report exact files changed, checks, and remaining user actions. Do not silently introduce deployment automation or accounts.
