# ============================
# upload-videos.ps1
# Upload all videos from local "videoer" folder to an S3 bucket
# ============================

# Stop on first error
$ErrorActionPreference = "Stop"

# --- CONFIGURATION ---
# Local folder containing your HLS outputs
$LocalVideoDir = Join-Path $PSScriptRoot "src/videoer"

# Your S3 bucket name (edit this!)
$BucketName = "taekwondo-pensum"

# Optional: subfolder in the bucket (leave empty "" if not needed)
$S3Prefix = "videos"

# -----------------------------

Write-Host " Uploading videos from $LocalVideoDir to s3://$BucketName/$S3Prefix"

# Upload .m3u8 files (HLS playlists) with correct MIME type
Get-ChildItem -Path $LocalVideoDir -Recurse -Filter *.m3u8 | ForEach-Object {
    $RelativePath = $_.FullName.Substring($LocalVideoDir.Length).TrimStart('\','/')
    $S3Key = if ($S3Prefix -ne "") { "$S3Prefix/$RelativePath" } else { $RelativePath }

    Write-Host " Uploading playlist $RelativePath"
    aws s3 cp $_.FullName "s3://$BucketName/$S3Key" --content-type "application/vnd.apple.mpegurl"
}

# Upload .ts files (HLS segments) with correct MIME type
Get-ChildItem -Path $LocalVideoDir -Recurse -Filter *.ts | ForEach-Object {
    $RelativePath = $_.FullName.Substring($LocalVideoDir.Length).TrimStart('\','/')
    $S3Key = if ($S3Prefix -ne "") { "$S3Prefix/$RelativePath" } else { $RelativePath }

    Write-Host " Uploading segment $RelativePath"
    aws s3 cp $_.FullName "s3://$BucketName/$S3Key" --content-type "video/mp2t"
}

Write-Host "Upload complete!"
