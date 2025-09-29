# =========================
# convert-hls.ps1
# Single-quality HLS from all .mp4 files in a folder (Windows PowerShell)
# =========================

# Stop on the first error so the script doesn't keep going if something fails.
$ErrorActionPreference = "Stop"

# --- Configure paths (edit these if you like) ---
# Folder containing your .mp4 files
$InputDir  = Join-Path $PSScriptRoot "public/video_input"

# Folder where HLS outputs (m3u8 + .ts) will be written
$OutputDir = Join-Path $PSScriptRoot "public/videoer"

# Path to ffmpeg. If ffmpeg is on your PATH, just "ffmpeg" works.
# Otherwise, set a full path like: "C:\ffmpeg\bin\ffmpeg.exe"
$FfmpegPath = "ffmpeg"

# Verify ffmpeg is available; this throws if not found.
Get-Command $FfmpegPath | Out-Null

# Ensure the output directory exists (creates it if missing).
New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

# Find all .mp4 files (non-recursive; add -Recurse if you want subfolders too).
Get-ChildItem -Path $InputDir -Filter *.mp4 -File | ForEach-Object {
    # Full path to the input file
    $InFile = $_.FullName
    # Filename without extension (used to name folders and files)
    $BaseName = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)

    # Create a per-video output subfolder: .\output_hls\<video-name>
    $VideoOutDir = Join-Path $OutputDir $BaseName
    New-Item -ItemType Directory -Force -Path $VideoOutDir | Out-Null

    # HLS playlist output: .\output_hls\<video-name>\<video-name>.m3u8
    $M3U8Path = Join-Path $VideoOutDir "$BaseName.m3u8"
    # Segment filename pattern (e.g., myclip_000.ts, myclip_001.ts, ...)
    $SegmentPattern = Join-Path $VideoOutDir ($BaseName + "_%03d.ts")

    Write-Host "🎬 Converting '$InFile'"
    Write-Host "    -> $M3U8Path"

    # Build ffmpeg arguments as an array to avoid quoting issues on Windows.
    $ffArgs = @(
        "-y",                          # Overwrite outputs without asking
        "-i", $InFile,                 # Input file

        # --- Video encoding (single quality) ---
        "-c:v", "libx264",             # H.264 video codec (widely supported)
        "-preset", "veryfast",         # Faster encode (bigger files). Use "slow" for better compression.
        "-crf", "23",                  # Quality target (lower = better quality, larger size); 18–23 is typical
        "-profile:v", "baseline",      # Baseline profile for broad compatibility (older devices)
        "-level", "3.0",               # H.264 level (also for compatibility)

        # --- Audio encoding ---
        "-c:a", "aac",                 # AAC audio (required by HLS on many devices)
        "-b:a", "128k",                # Audio bitrate
        "-ac", "2",                    # Stereo

        # --- HLS settings ---
        "-start_number", "0",          # Segment index starts at 0
        "-hls_time", "6",              # Target segment duration (seconds). Common values: 4–10
        "-hls_list_size", "0",         # Write ALL segments to the playlist (VOD)
        "-hls_playlist_type", "vod",   # Mark playlist as VOD and add #EXT-X-ENDLIST
        "-hls_flags", "independent_segments",  # Force IDR at segment starts for clean seeking

        # Segment file naming pattern
        "-hls_segment_filename", $SegmentPattern,

        # Container format and playlist output path
        "-f", "hls", $M3U8Path
    )

    # Run ffmpeg with the arguments above.
    & $FfmpegPath @ffArgs
    Write-Host "✅ Done: $BaseName"
}

Write-Host "`nAll videos converted to single-quality HLS in '$OutputDir'."
