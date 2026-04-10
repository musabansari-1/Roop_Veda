# Cloud Run Deployment Guide

This app can run on Google Cloud Run with:

- Neon for PostgreSQL
- Google Cloud Storage for private videos
- Secret Manager for production secrets

## 1. GCP resources

Create or confirm these resources:

- Artifact Registry Docker repo
- Cloud Run service
- Secret Manager secrets
- A dedicated Cloud Run service account
- A private GCS bucket with your video objects

## 2. Required IAM

Grant the Cloud Run runtime service account:

- `roles/storage.objectViewer` on the video bucket
- `roles/secretmanager.secretAccessor`
- `roles/iam.serviceAccountTokenCreator` on itself

The last role is important for signed GCS URLs.

## 3. Secret Manager

Create these secrets:

- `DATABASE_URL`
- `AUTH_JWT_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `META_ACCESS_TOKEN`
- `NEXT_PUBLIC_META_PIXEL_ID`

Recommended values:

- `DATABASE_URL`: Neon pooled URL
- `RESEND_FROM_EMAIL`: verified domain sender, not Gmail

## 4. Runtime env vars

Set these non-secret env vars:

```text
NEXT_PUBLIC_APP_URL=https://YOUR_CLOUD_RUN_URL
NEXT_PUBLIC_BRAND_NAME=Roop Veda
NEXT_PUBLIC_DEFAULT_CURRENCY=usd
GCS_BUCKET_NAME=YOUR_PRIVATE_BUCKET
TEMP_MANUAL_ACCESS_ENABLED=false
META_API_VERSION=v19.0
```

For Cloud Run, do not set `GCP_CLIENT_EMAIL` or `GCP_PRIVATE_KEY` unless you
explicitly want to use a downloaded service-account key. The app can use the
attached Cloud Run service account automatically.

The health endpoint now reports:

- `integrations.database`: whether the app could connect to PostgreSQL and ensure tables exist
- `integrations.gcs`: whether a bucket name is configured
- `runtime.gcsAuthMode`: `cloud_run_iam` or `explicit_key`

## 5. Build and deploy

This repo's `cloudbuild.yaml` now supports build + push + deploy.

Useful deploy substitutions:

- `_CPU`
- `_MEMORY`
- `_TIMEOUT`
- `_CONCURRENCY`
- `_MIN_INSTANCES`
- `_MAX_INSTANCES`

Example:

```bash
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=_IMAGE_URI=asia-south1-docker.pkg.dev/PROJECT_ID/roop-veda/web:latest,_SERVICE_NAME=roop-veda-web,_REGION=asia-south1,_SERVICE_ACCOUNT=roop-veda-run@PROJECT_ID.iam.gserviceaccount.com,_CPU=1,_MEMORY=512Mi,_TIMEOUT=300s,_CONCURRENCY=80,_MIN_INSTANCES=0,_MAX_INSTANCES=10,_ENV_VARS=NEXT_PUBLIC_APP_URL=https://YOUR_RUN_URL,NEXT_PUBLIC_BRAND_NAME=Roop\ Veda,NEXT_PUBLIC_DEFAULT_CURRENCY=usd,GCS_BUCKET_NAME=YOUR_BUCKET,TEMP_MANUAL_ACCESS_ENABLED=false,META_API_VERSION=v19.0,_SECRET_VARS=DATABASE_URL=DATABASE_URL:latest,AUTH_JWT_SECRET=AUTH_JWT_SECRET:latest,STRIPE_SECRET_KEY=STRIPE_SECRET_KEY:latest,STRIPE_WEBHOOK_SECRET=STRIPE_WEBHOOK_SECRET:latest,RESEND_API_KEY=RESEND_API_KEY:latest,RESEND_FROM_EMAIL=RESEND_FROM_EMAIL:latest,META_ACCESS_TOKEN=META_ACCESS_TOKEN:latest,NEXT_PUBLIC_META_PIXEL_ID=NEXT_PUBLIC_META_PIXEL_ID:latest \
  .
```

## 6. Post-deploy checklist

Visit:

- `/api/health`
- `/quiz`
- `/plans`
- `/login`
- `/dashboard`

Then verify:

- `integrations.database` is `true`
- lead capture stores data in Neon
- emails send from Resend
- signed video URLs open correctly
- Stripe webhook points to `/api/stripe/webhook`

## 7. Known production notes

- Resend requires a verified sending domain
- Stripe will not work until live credentials and webhook secret are set
- Meta CAPI requires both pixel ID and access token
- Videos must exist in the DB `Video` table with valid `gcsPath` values
