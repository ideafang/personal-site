# Initialization evidence

Verified 2026-10-07 in the project root:
- Empty directory; no existing source files or Git repository.
- macOS/Darwin; Node.js v22.20.0; npm 10.9.3; Git 2.54.0.
- Ubuntu checks cannot be performed from this local session without a supplied remote target.

## Official documentation
Pending research.

Reviewed official sources on 2026-10-07:
- https://docs.astro.build/en/install-and-setup/ — Node >=22.12.0; official create-astro.
- https://docs.astro.build/en/guides/content-collections/ — src/content.config.ts, glob loader, schema validation, getCollection/render, draft filtering.
- https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/ — official C3 command; fully prerendered sites need only assets.directory=dist, no main or SSR adapter.
- https://developers.cloudflare.com/workers/ci-cd/builds/ — Cloudflare builds and hosts from Git.
- https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/ — user authorizes GitHub integration in Dashboard.
- https://developers.cloudflare.com/workers/ci-cd/builds/configuration/ — separate build and deploy commands; production branch main; root directory configurable.

Decision: evaluate C3 minimal Workers starter, then simplify any SSR defaults to Astro static output and Workers Static Assets. No Pages deployment or GitHub Actions. Drafts are visible only in local Astro development and excluded from both production index and routes.

## Implementation and checks
- Official npm reports Astro 7.3.6 and Wrangler 4.148.0.
- System Node 22.20.0: Astro check passed for 12 files (0 errors/warnings/hints); static build passed, 5 pages.
- Development HTTP checks: /, /research/, /writing/, /about/, /writing/test-draft/ all 200. Draft list label and Markdown article body verified.
- npm audit identified sharp <0.35.5 through Miniflare. Latest Wrangler still pins 0.35.4. Apply targeted Miniflare sharp override 0.35.5, then revalidate Workers runtime; do not force downgrade Wrangler.

## Final local verification
- Patched sharp 0.35.5 override: valid npm dependency tree; npm audit 0 vulnerabilities.
- Regenerated lockfile uses only official npm registry tarball URLs.
- Astro check: 12 files, 0 errors/warnings/hints. Build: 5 pages, static mode.
- Wrangler deploy --dry-run passed (no upload, no bindings).
- Local Wrangler HTTP: 4 main pages 200; draft route and missing route 404 with custom page. Request.cf metadata fetch timed out through proxy; placeholder metadata used, irrelevant to static pages.
- Development server and Workers preview were stopped after checks.
- Git main initialized; ignore checks cover dependencies/output/cache/env/Cloudflare state/keys/editor noise.

- Final `npm ci --prefer-offline` succeeded: 297 packages installed; 0 audit vulnerabilities.
- First local commit: `feat: initialize static Astro personal homepage`. No remote, account login, token, or deployment.
- C3 generated public/.assetsignore (excluding _worker.js and _routes.json); retained as an upload guard and included in the initial commit.
