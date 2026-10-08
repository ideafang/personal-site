# Architecture

Last reviewed: 2026-10-07. Status: initial static foundation; remote hosting is not configured.

## Purpose
A long-term personal website for introduction, Research, Writing, and About. Content precedes visual design. No Projects section, CMS, database, backend, or client UI framework is needed in this phase. Profile and research paragraphs are deliberately placeholders pending author input.

## Rendering and hosting
Astro prerenders pages and Markdown articles to HTML in `dist/`. Cloudflare Workers serves that directory as Static Assets. There is no Worker script (`main`), SSR adapter, account ID, or runtime binding. A prerendered 404 page supports missing routes. The C3-generated `public/.assetsignore` excludes Worker script/router artifacts from static uploads; retain this small guard even though this version has no Worker script. Minimal CSS is in the shared layout; no application JavaScript is shipped for interactivity.

The official C3 Astro Workers initializer was evaluated and used to obtain the minimal Astro starter. Its default Cloudflare integration targets SSR; for this wholly static site the configuration was simplified according to the static-site section of Cloudflare's guide. C3's adapter installation encountered a mirror version mismatch; `.npmrc` uses the official npm registry. No system package-manager or proxy configuration was changed.

## Content model
`src/content.config.ts` defines a `writing` collection using `glob` over `src/content/writing/**/*.md`. Astro validates the schema at sync/build time.

| Field | Type | Policy |
| --- | --- | --- |
| title | non-empty string | required |
| description | non-empty string | required; listing and page metadata |
| date | coerced Date | required; ISO date or timestamp |
| updatedDate | Date | optional; must be at least date |
| tags | string array | defaults to [] |
| draft | boolean | defaults to true; explicit false publishes |
| cover | Astro image metadata | optional local image, relative to article |

Filename-derived collection ID determines `/writing/<id>/`; preserve published filenames to avoid breaking links. `src/lib/writing.ts` centralizes newest-first sorting and visibility. DEV includes drafts; production excludes them in both listing and `getStaticPaths`. Dates display as UTC ISO calendar dates to avoid host-timezone drift. Dates do not implement scheduled publication.

`src/pages/writing/[...id].astro` uses the collection entry type and `render()` to render Markdown. Cover images use Astro's Image component. No taxonomy pages, pagination, search, or RSS are added yet.

## Source and deployment ownership
Git/GitHub manages source. Cloudflare Workers Builds installs dependencies, builds Astro, and deploys static assets. GitHub Actions is not used. The user supplied GitHub repository `ideafang/personal-site` on 2026-10-08, and local `origin` is configured to its SSH URL. No push or access check has been performed. Cloudflare integration, production Worker name and domain await user decisions. `personal-homepage` in Wrangler is only a suggested name. Do not set Astro's `site` URL until a real public hostname is supplied; add canonical URLs and sitemap when that hostname is confirmed.

## Runtime and dependencies
Use supported Node 22 (tested version in `.nvmrc`) and npm. The initial host was macOS, Node 22.20.0, npm 10.9.3, Git 2.54.0. A newer Node 22 was downloaded only under ignored `.cache/runtime` to work around create-astro's proxy flag requirement. Normal Astro commands are also verified with the system Node where possible. Ubuntu has not been accessed or tested.

Keep `package-lock.json` committed. Astro is the only application dependency; Wrangler, Astro check, and TypeScript are development tools. Future dependency upgrades require check/build and review of official migration guidance.

## Official references
Reviewed on 2026-10-07:
- [Astro installation](https://docs.astro.build/en/install-and-setup/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Cloudflare Workers Astro framework guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)
- [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Workers Builds Git integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/)
- [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)

Keep this document updated when rendering, routes, content schema, or deployment decisions change.

## Dependency exception
Wrangler 4.148.0 brings a Miniflare dependency pinned to sharp 0.35.4, which npm audit flags for GHSA-wq5f-xc86-pv6w. `package.json` overrides sharp across the dependency tree to patched 0.35.5. Keep this override until upstream uses a patched release; inspect and remove it during a later Wrangler upgrade if redundant. Validate Workers preview after any override change.

Local scripts target macOS/Linux, disable Astro/Wrangler telemetry, and keep Wrangler config/log state under ignored project-local `.cache/`. They do not read existing Cloudflare authentication from the user profile. Windows shell compatibility has not been added.

## Initialization verification (2026-10-07)
Verified locally on macOS with system Node 22.20.0: Astro check (12 files, zero errors/warnings/hints), production static build (4 main pages plus 404), development HTTP requests including the draft article, Wrangler deployment dry-run, and local Workers asset serving. Production draft URL and unknown routes return the custom 404. npm audit reports zero vulnerabilities after the sharp override. Local Wrangler used placeholder Request.cf metadata after a proxy timeout; no runtime behavior depends on that metadata. No Cloudflare account, actual Worker deployment, or Ubuntu environment was verified.

Lockfile reproduction was verified with `npm ci --prefer-offline` (297 packages installed, zero audit vulnerabilities).
