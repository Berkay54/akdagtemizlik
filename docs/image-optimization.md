# Image optimization

Original PNG files stay in src/assets/hero and src/assets/services for future edits.
The production site imports only the generated WebP files in src/assets/optimized.

To regenerate after replacing originals, use the locally installed FFmpeg and ffprobe:

    powershell -NoProfile -ExecutionPolicy Bypass -File scripts/optimize-images.ps1
    npm.cmd run build

The script creates 480, 800, 1120 and 1600 pixel variants without upscaling,
at WebP quality 82, and writes src/config/images.ts. Portrait sources smaller
than 1600 pixels get the first three sizes.

Components provide srcset/sizes, explicit aspect ratios and image dimensions.
The first slide uses high fetch priority. Other slides are decoded before
transitioning; the next slide is prefetched after 1.5 seconds when the page is
visible, reduced motion is off and data saving is not enabled.
Service cards and the About image use native lazy loading.

## Local production verification

Measured with fresh Chromium contexts against vite preview, after visiting all
sections and all three slides (compressed image response bodies, excluding JS,
CSS and headers):

- Original six PNG files: 13,296,409 bytes.
- All 23 generated WebP variants on disk: 1,798,792 bytes.
- 1440px viewport, device pixel ratio 1: 340,072 image bytes requested.
- 390px viewport, device pixel ratio 2: 549,424 image bytes requested.
- No original PNG requests; only the first slider image mounted initially.

These figures describe image payloads, not a measured speed multiplier or
production Core Web Vitals score. Hosting, caching and connection speed affect
real loading times.
