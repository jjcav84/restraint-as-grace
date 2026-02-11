# Technical Appendix — Orkid Labs CAGE18NQ1

This appendix collects reproducibility steps, benchmark expectations, and requests for artifacts to validate the video claims.

Requested artifacts from author
- Benchmark logs showing the 18x improvement and test harness (scripted runs, environment, versions).
- Rust orchestrator repo or tarball and build/bench instructions.
- Test datasets and anonymized sample traces used in the demo.

Suggested reproduction steps
1. Provide a minimal reproducible benchmark script that runs the reconciliation engine on a small dataset and emits latency histograms and p99/p999 numbers.
2. Provide a containerized runner (Dockerfile) or a GitHub Actions workflow to re-run the benchmark reproducibly in CI.
3. Provide instructions to validate the integration chain (Polygon bridge integration, mint flow, and clearing rails). Include endpoints and example transactions if possible.

Local video workflow (updated)
- Finding: the video contains no spoken audio. Use visual extraction workflows instead of STT.

Visual extraction commands used in this repo

# Download the video (yt-dlp)
yt-dlp -f best -o "assets/video/%(id)s.%(ext)s" "https://youtube.com/watch?v=QdZx1Gk6NY4"

# Confirm silence (ffmpeg)
ffmpeg -i assets/video/QdZx1Gk6NY4.mp4 -af silencedetect=noise=-50dB:d=0.5 -f null -

# Extract scene frames
ffmpeg -i assets/video/QdZx1Gk6NY4.mp4 -vf "select='gt(scene,0.3)',scale=1280:-1" -vsync vfr assets/video/shot%03d.jpg

# Create highlight clips (10s each)
ffmpeg -ss 00:00:02 -i assets/video/QdZx1Gk6NY4.mp4 -t 10 -c:v libx264 -crf 23 -c:a aac assets/video/clip-hero.mp4
ffmpeg -ss 00:00:12 -i assets/video/QdZx1Gk6NY4.mp4 -t 10 -c:v libx264 -crf 23 -c:a aac assets/video/clip-architecture.mp4
ffmpeg -ss 00:00:22 -i assets/video/QdZx1Gk6NY4.mp4 -t 10 -c:v libx264 -crf 23 -c:a aac assets/video/clip-integration.mp4

Notes:
- Use the extracted frames and clips to annotate visual claims and place those annotations into `docs/case-study.md`.
- Keep author sign-off for clip publication and maintain provenance links to the original video.
Legal / attribution note
- Confirm permission with the author for use of clips and quotes. Keep full citation and link to the source video to maintain provenance.

Contact
- Request artifacts and sign-off from: Jacob Cavazos — https://www.youtube.com/@jacobcavazos9471
