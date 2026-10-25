# Thejus P K — Cinematic portfolio

Static HTML, CSS and JavaScript portfolio with two local Pexels video scenes, native scroll transitions, responsive layouts and a persisted dark/light theme.

## Run locally

Requires Node.js 22+.

```sh
npm ci
npm run dev
```

Open **http://127.0.0.1:4173**. The development server is bound to loopback.

## Build and verify

```sh
npm test
npm run test:browser
npm run test:a11y
npm run build
```

Browser checks require installed Google Chrome. `dist/` is the deployment output; `npm run build` copies an explicit allowlist. Nothing is deployed automatically.

## Editing

- `index.html`: content, navigation, illustrations and metadata.
- `assets/styles.css`: responsive layout, type, color tokens and motion fallbacks.
- `assets/theme.js`: theme and layout setup before first paint.
- `assets/app.js`: scene lifecycle, hero sequence, controls and navigation.
- `assets/media/`: optimized footage and WebP posters.
- `assets/fonts/`: self-hosted fonts and their licenses.
- `web.html`: compatibility redirect to the canonical entry point.

Keep the `portfolio-theme` storage key to preserve existing preferences. Project links and factual copy are protected by `tests/content.test.mjs`. Update `docs/content-baseline.json` only for intentional owner-approved factual changes.

Footage provenance, licensing, encoding and sizes: [ASSETS.md](docs/ASSETS.md). Implementation decisions and open factual questions: [IMPLEMENTATION.md](docs/IMPLEMENTATION.md). Test results and screenshots: [VALIDATION.md](docs/VALIDATION.md). Removed assets: [deletion manifest](docs/deletion-manifest.md).

Raw source videos are excluded from Git and deployment. To re-encode, obtain the source files documented in `ASSETS.md`, place them at `.cache/raw/city.mp4` and `.cache/raw/rain.mp4`, then run `node scripts/encode-media.mjs`. FFmpeg must be available through `ffmpeg-static`. To refresh the social image, run the dev server and `node scripts/social-preview.mjs`.
