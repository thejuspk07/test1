# Validation — 2026-10-25

## Executed checks

- `npm test`: **6/6 passing**. Preserves all 10 original external/mail destinations, 36 skills, 14 internship/project bullets, education, grades, certifications and languages. Checks section IDs, local assets and removal of legacy runtime references.
- `npm run test:browser`: **19 checks passing** in local installed Chrome. Includes actual video playback; lazy scene loading; crossfade and outgoing pause; all videos paused under solid content; desktop native-scroll timeline; pause without hero-height change; theme persistence; project disclosures; clipboard; no overflow across every section at 1440, 1024, 768, 390 and 320 pixels; mobile menu/Escape/anchors; unpinned mobile; reduced-motion/no video downloads; blocked-video fallback; no-JavaScript mobile navigation; no page errors or HTTP failures.
- `npm run test:a11y`: **0 axe WCAG 2 A/AA and WCAG 2.1 AA violations** at 1440 and 390 pixels in both dark and light modes. This automated result is not a claim of exhaustive accessibility certification.
- `npm run build`: passes; explicit allowlist produces `dist/` without raw footage, legacy assets, development tools, documentation or test artifacts.
- `npm install` audit: **0 vulnerabilities** at installation time.
- A separate data-saver check passed: no decorative video source was requested. It is now also part of the repeatable browser suite. The small hero-background scale change was checked separately after the full suite.

## Mobile Lighthouse

Local Chrome, simulated mobile throttling, Lighthouse 13. Scores are lab observations, not field guarantees.

| Measure | Result |
| --- | ---: |
| Performance | 97 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| First contentful paint | 1.5 s |
| Largest contentful paint | 1.9 s |
| Cumulative layout shift | 0 |
| Total blocking time | 20 ms |

The initial audit found CLS 0.138 caused by mobile navigation changing layout after the first render. Moving the initial layout classes into the synchronous startup script fixed it. Contrast fixes darkened the document label and About overlay. The measurements above are from the subsequent run.

Raw reports are in ignored `test-results/browser.json`, `test-results/accessibility.json` and `test-results/lighthouse-mobile.json`. A compact summary is tracked in `validation-summary.json`.

## Screenshots

- [Original desktop](screenshots/baseline-desktop.png) / [original mobile](screenshots/baseline-mobile.png)
- [Desktop hero](screenshots/desktop-hero.png) / [mobile hero](screenshots/mobile-hero.png)
- [Desktop About](screenshots/desktop-about.png)
- [Desktop projects](screenshots/desktop-projects.png) / [mobile projects](screenshots/mobile-projects.png)
- [Desktop contact](screenshots/desktop-contact.png) / [mobile contact](screenshots/mobile-contact.png)
- [Light theme](screenshots/desktop-light.png)
- [Tablet skills](screenshots/tablet-skills.png)
- [Reduced motion](screenshots/reduced-motion.png)
- [Desktop scroll transition](screenshots/desktop-transition.png)

## Scope limits

No production deployment, physical-device test or field Core Web Vitals measurement was performed. Real tab-backgrounding could not be exercised in headless Chrome (it continued reporting the page visible); the visibility-change pause handler is implemented but that browser behavior remains unverified. The Streamlit demo's current availability and two certification issuer associations remain unverified; see IMPLEMENTATION.md. LinkedIn identity and resume contents were not independently verified. Motion was visually inspected through sampled frames and screenshots, alongside playback and transition state assertions.
