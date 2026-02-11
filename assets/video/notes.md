# Video processing notes

Finding: The video contains no spoken audio. Extraction proceeded using `yt-dlp` and `ffmpeg` to capture visual evidence (frames and short highlight clips).

Commands run (successful):
- Installed: `python3 -m pip install --user -U yt-dlp` (via project venv)
- Download video: `yt-dlp -f best -o "assets/video/%(id)s.%(ext)s" "https://youtube.com/watch?v=QdZx1Gk6NY4"`
- Confirm silence: `ffmpeg -i assets/video/QdZx1Gk6NY4.mp4 -af silencedetect=noise=-50dB:d=0.5 -f null -` → `silence_duration: 34.690612`
- Extract scene frames: `ffmpeg -i assets/video/QdZx1Gk6NY4.mp4 -vf "select='gt(scene,0.3)',scale=1280:-1" -vsync vfr assets/video/shot%03d.jpg`
- Create highlight clips (10s each):
  - `ffmpeg -ss 00:00:02 -i assets/video/QdZx1Gk6NY4.mp4 -t 10 -c:v libx264 -crf 23 -c:a aac assets/video/clip-hero.mp4`
  - `ffmpeg -ss 00:00:12 -i assets/video/QdZx1Gk6NY4.mp4 -t 10 -c:v libx264 -crf 23 -c:a aac assets/video/clip-architecture.mp4`
  - `ffmpeg -ss 00:00:22 -i assets/video/QdZx1Gk6NY4.mp4 -t 10 -c:v libx264 -crf 23 -c:a aac assets/video/clip-integration.mp4`

Extracted files:
- `assets/video/QdZx1Gk6NY4.mp4`
- `assets/video/shot001.jpg`, `assets/video/shot002.jpg`
- `assets/video/clip-hero.mp4`, `assets/video/clip-architecture.mp4`, `assets/video/clip-integration.mp4`

Next steps:
- Manually annotate frames with on-screen text and visual notes (author confirmation recommended).
- Add clip captions and include direct references (timestamped visual claims) into `docs/case-study.md`.

Notes on legal/attribution:
- Obtain the author's permission before publishing clips or edited excerpts. Keep the original video link and timestamp references intact.
