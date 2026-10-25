# Cinematic portfolio redesign

## Baseline

Started on clean `main`, commit `5ea3a45`; created `redesign/cinematic`. No prior local redesign branch or separated CSS/JS refactor existed. `index.html` and `web.html` were identical single-file applications. The checkout contained GSAP 3.13, ScrollTrigger, Lenis 1.3.11, Three.js 0.170, two dynamically addressed 720p frame sequences, higher-resolution variants, samurai/katana videos, music, and decorative mockup images. The fetched production HTML matched the original after CRLF normalization. Baseline screenshots and a content/link snapshot were saved before implementation.

## Implementation

- Static semantic HTML with separate CSS, startup theme script, and application controller. No runtime framework, CDN, Three.js, audio processing, synthetic cursor, or smooth-scroll library.
- Persistent two-scene video layer; poster-first crossfade; native sticky desktop hero with a single scroll-progress sequence. Native scrolling and anchors are retained. Mobile and reduced-motion layouts are unpinned.
- Large Space Grotesk display type, Manrope supporting text, charcoal, warm white, slate and muted amber. Dark/light selection retains the original `portfolio-theme` storage key.
- About, all 36 original skills, internship bullets, education dates/grades, certifications, languages, soft skills, four projects, resume and contact destinations retained. Full project approaches are in keyboard-operable disclosure sections.
- Four distinct compositions with labelled original technical illustrations. Software prototypes are explicitly identified; the two GitHub forks are labelled. Specific personal contributions beyond the original copy have not been invented.
- Accessible mobile menu, Escape dismissal/focus return, skip link, visible focus, copy email with failure message, playback control, no-JavaScript fallback and video failure fallback.
- Explicit build allowlist copies only the site entry points and `assets/` into `dist/`. No raw footage, deleted stock, test output, documentation, or development dependencies ship.

## Research and design decisions

Reviewed the READMEs for [Taste Skill](https://github.com/Leonxlnx/taste-skill), [Awesome Design MD](https://github.com/VoltAgent/awesome-design-md), [Playwright CLI](https://github.com/microsoft/playwright-cli), [React Three Fiber](https://github.com/pmndrs/react-three-fiber), [Liquid Glass JS](https://github.com/dashersw/liquid-glass-js), and [ShaderGradient](https://github.com/ruucm/shadergradient). Applied hierarchy, real subject matter, coherent type/palette, varied composition and screenshot critique. Taste's no-hairline rule was intentionally not adopted: restrained separators clarify the dense factual content. Its external inspector was not installed; Playwright, axe and Lighthouse provide the recorded verification. No React or WebGL stack was justified for this static portfolio.

The Browser plugin skill path was missing; a backup skill referenced a runtime API incompatible with the installed module. Local Playwright with installed Chrome successfully captured the baseline and performed testing instead.

## Content verification and remaining limitations

- All four GitHub repository API requests returned 200. The reservoir and anomaly-detection repositories are forks. READMEs support the retained technical descriptions. No project benchmark or business-impact claims were added.
- The Google Drive resume destination responded HTTP 200; the file contents were not independently audited.
- The Streamlit demo request failed from this environment. Its existing URL is confirmed in the project README and retained, but current public demo operation is unverified.
- LinkedIn was retained; the automated response did not establish profile availability.
- Two original certification entries mix issuer/qualification information: Microsoft Learn with IBM SkillsBuild, and Wingspan/Forage with Python Fundamentals/Solutions Architecture Job Simulation. Exact original wording is retained and the association is visibly marked for verification. No credential links were invented.
- Education and internship facts remain the owner's original claims, not independently credential-verified. The original CGPA remains 7.2.
- Chrome testing is local, including simulated mobile sizes. Physical iOS/Safari/Android testing and field Core Web Vitals are not claimed.
- No push, merge, history rewrite or production deployment was performed.

## Cleanup

`deletion-manifest.json` records each of 1,545 removed files, its byte size, reason and reference-check evidence. Total removed: 535,515,856 bytes (510.71 MiB). Every removed file was tracked and unchanged relative to the baseline. Replacement videos and browser tests passed first. Assets are recoverable from Git history. The historical repository itself was not rewritten.

## Verification

See `VALIDATION.md` for actual results, metrics, screenshot links and limitations. Scripts are listed in the project README.
