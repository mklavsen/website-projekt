# === 0. Verify AWS CLI profile, region, and account ID ===
$awsProfile = "taekwondo-admin"
$BucketName = "taekwondo-pensum"
$cloudFrontDistributionId = "E2RFZ1I4XS8JQ7"




Write-Host "Verifying AWS CLI profile settings..."

# Get the current region
$region = aws configure get region --profile $awsProfile
if (-not $region) {
    Write-Error "No region configured for profile '$awsProfile'. Use 'aws configure --profile $awsProfile' to set it."
    exit 1
}
Write-Host "Region: $region"

# Get the AWS account ID
try {
    $accountId = aws sts get-caller-identity --profile $awsProfile | ConvertFrom-Json | Select-Object -ExpandProperty Account
    Write-Host "AWS Account ID: $accountId"
} catch {
    Write-Error "Failed to get AWS account identity. Make sure you are signed in and your profile is valid."
    exit 1
}


# Stop on error
$ErrorActionPreference = "Stop"

# === 1. Build the Vite project ===
Write-Host "Building project with Vite..."
npm run build

# === 2. Sync dist folder to S3 ===
Write-Host "Syncing dist/ to S3 bucket: taekwondo-pensum"
aws s3 sync ./dist s3://$BucketName --delete --profile "$awsProfile"

# === 3 fixing mime type for HLS playlists ===
Write-Host "Fixing MIME types for .m3u8 files in S3"
aws s3 cp s3://$BucketName/videoer s3://$BucketName/videoer `
  --recursive `
  --exclude "*" `
  --include "*.m3u8" `
  --content-type "application/vnd.apple.mpegurl" `
  --metadata-directive "REPLACE" `
  --profile "$awsProfile"

# === 4 fixing mime type for .ts files ===
Write-Host "Fixing MIME types for .ts files in S3"
aws s3 cp s3://$BucketName/videoer s3://$BucketName/videoer `
  --recursive `
  --exclude "*" `
  --include "*.ts" `
  --content-type "video/mp2t" `
  --metadata-directive "REPLACE" `
  --profile "$awsProfile"


# === 5. Set no-cache header for index.html ===
Write-Host "Setting cache-control for index.html"
aws s3 cp ./dist/index.html s3://$BucketName/index.html `
  --cache-control "no-cache" `
  --content-type "text/html" `
  --profile "$awsProfile"


# === 6. Optional: Invalidate CloudFront (uncomment if needed) ===
 Write-Host "Invalidating CloudFront cache..."
 aws cloudfront create-invalidation `
    --distribution-id $cloudFrontDistributionId `
    --paths "/*" `
    --profile "$awsProfile"

Write-Host "Deploy complete!"
