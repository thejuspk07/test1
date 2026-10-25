# Media and sources

All footage is used as part of the portfolio, with no implication of endorsement. Source files are kept in ignored `.cache/raw/`, outside the deployment allowlist. Reviewed against the [Pexels license](https://www.pexels.com/license/) on 2026-10-25.

## Selected footage

1. **City / architecture:** [Aerial View of Modern City Buildings at Sunset](https://www.pexels.com/video/a-building-with-windows-and-a-clock-on-the-side-19740960/) by **binary Ego**. Original source: `https://videos.pexels.com/video-files/19740960/19740960-uhd_2560_1440_25fps.mp4`. Source download: 27,525,592 bytes. Used for hero, the experience photograph, and contact. The later rising skyline composition leaves more breathing room than the initial facade. Encoded from source seconds 12–29, with the ending blended into the beginning.
2. **Rain / urban night:** [Moody Night Street with Rain Reflections](https://www.pexels.com/video/moody-night-street-with-rain-reflections-34796505/) by **Nothing Ahead**. Original source: `https://videos.pexels.com/video-files/34796505/14753503_1920_1080_60fps.mp4`. Source download: 9,544,623 bytes. Used for the About section. Dark negative space, restrained reflected lights, and gentle urban movement keep the focus on the introduction. Encoded from source seconds 2–19, with the ending blended into the beginning.

The source pages and six sampled frames from each downloaded clip were inspected. Local Chrome confirmed successful playback and scroll transitions. This is not a claim that every frame of the original clips was watched.

[Rainfall at Night](https://www.pexels.com/video/rainfall-at-night-13689954/) was researched as a candidate but not downloaded or used. Two contrasting but coordinated urban scenes were sufficient.

## Encoding and playback

Both clips are 16 seconds, H.264 MP4, 24 fps, no audio, yuv420p, fast-start. Desktop is 1920×1080; mobile is 960×540. Each has a WebP poster at 1600×900 and 720×405. A one-second end/start blend softens the loop seam. MP4 alone avoids duplicate media formats for this small static site; browsers with failed or blocked playback retain the poster.

Sources are assigned only to active scenes. Outgoing playback pauses after the 1.1-second crossfade. All video pauses under solid content or in hidden tabs. Reduced motion and data saver use still images without requesting video. There is a visible motion control. Playback is muted and inline; ordinary video is never scrubbed by scroll.

Exact final byte sizes are recorded in `asset-sizes.json`.

## Other assets

- Project illustrations are original HTML/SVG conceptual diagrams, explicitly labelled. They are not application screenshots or measured results. No authentic screenshots were identified in the reviewed project READMEs; the prior decorative mockups were removed.
- Local **Manrope** and **Space Grotesk** Latin WOFF2 fonts originate from Google Fonts. Their SIL Open Font License files are included alongside them.
- `social-preview.jpg` is an actual screenshot of the portfolio hero, created with `node scripts/social-preview.mjs` while the local server runs. Open Graph URLs use the existing production domain and become available only after a future deployment.
- The favicon is original SVG.
