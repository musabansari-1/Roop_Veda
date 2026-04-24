# Roop Veda Funnel

Production-ready Next.js 14 App Router funnel for:

- SEO landing traffic on `/`
- Ads-first quiz traffic on `/quiz`
- Quiz -> lead capture -> plans -> Zaakpay checkout -> account setup -> dashboard
- JWT auth with bcrypt password hashing
- Meta Pixel + Meta Conversions API deduped by shared `event_id`
- Resend transactional emails
- Private video delivery through a swappable video provider abstraction

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Pure-JS PostgreSQL data layer via `postgres`
- PostgreSQL for local and production
- Zaakpay
- Resend
- bcrypt
- jose-based JWT auth
- Meta Pixel + Meta CAPI
- Google Cloud Storage signed URLs

## Local setup

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to your local or hosted PostgreSQL connection string.
3. Add your Zaakpay, Resend, Meta, and GCS credentials when you want those integrations live.
4. Run:

```bash
npm install
npm run dev
```

`npm run dev` starts Next.js. The app lazily creates any missing tables in PostgreSQL on first database use.

You can also inspect the current integration readiness at:

- `/api/health`

### Local no-gateway access

For local development, this repo includes a disabled-by-default bypass flag:

```env
DEV_ENABLE_BYPASS_CHECKOUT="true"
```

When that flag is enabled outside production and Zaakpay credentials are absent:

1. Open `/quiz`
2. Complete the email capture
3. Choose any plan on `/plans`
4. The app will create a local paid purchase record and send you to `/setup`
5. Create your password
6. You will be auto-logged into `/dashboard`

This bypass is intended only for local testing and is automatically off in production.

### Temporary production fallback

If the final gateway is delayed, you can temporarily allow specific approved emails
to pass through checkout without Zaakpay in production.

Set:

```env
TEMP_MANUAL_ACCESS_ENABLED="true"
TEMP_MANUAL_ACCESS_EMAILS="approved1@example.com,approved2@example.com"
```

Behavior:

1. approved emails can complete the funnel even if Zaakpay is not configured
2. non-approved emails still see checkout blocked
3. the resulting purchase is stored with `source="manual_access"`

This is safer than a global production bypass because access is limited to a
small allowlist that you control.

## Production database mode

For GCP production, set the database env to PostgreSQL:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require"
```

### Neon integration

This app is ready to use Neon as the production PostgreSQL provider.

Recommended:

- use the pooled Neon connection string in `DATABASE_URL`
- keep `sslmode=require`

Example:

```env
DATABASE_URL="postgresql://USER:PASSWORD@ep-example-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=15"
```

On Cloud Run with Neon:

- do not attach Cloud SQL
- set `DATABASE_URL`
- keep `sslmode=require`

If Neon scales to zero, cold starts can slow first connection attempts, so the
extra `connect_timeout=15` is helpful.

Recommended production command sequence:

```bash
npm install
npm run build
npm run start
```

## Required environment variables

Core:

- `AUTH_JWT_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `DATABASE_URL`

Zaakpay:

- `ZAAKPAY_MERCHANT_IDENTIFIER`
- `ZAAKPAY_SECRET_KEY`
- `ZAAKPAY_ENVIRONMENT`

Resend:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

Meta:

- `NEXT_PUBLIC_META_PIXEL_ID`
- `META_ACCESS_TOKEN`
- `META_API_VERSION`
- `META_TEST_EVENT_CODE` optional

GCS:

- `GCS_BUCKET_NAME`
- `GCP_PROJECT_ID` optional on Cloud Run
- `GCP_CLIENT_EMAIL` optional outside Cloud Run only
- `GCP_PRIVATE_KEY` optional outside Cloud Run only

Optional:

- `NEXT_PUBLIC_SUPPORT_WHATSAPP`
- `NEXT_PUBLIC_DEFAULT_CURRENCY`
- `NEXT_PUBLIC_BRAND_NAME`
- `DEV_ENABLE_BYPASS_CHECKOUT`
- `TEMP_MANUAL_ACCESS_ENABLED`
- `TEMP_MANUAL_ACCESS_EMAILS`

## Funnel routes

- `/`: SEO landing page with CTA to `/quiz`
- `/quiz`: ads-first quiz entry
- `/plans`: pricing selection
- `/setup`: post-payment password setup
- `/login`: returning user login
- `/dashboard`: protected paid dashboard

## Tracking architecture

Browser Pixel events:

- `PageView`
- `ViewContent`
- `Lead`
- `InitiateCheckout`
- `Purchase`

Server-side CAPI events:

- Page views and quiz starts are forwarded through `/api/meta/track`
- Lead creation sends CAPI from `/api/lead`
- Checkout initiation sends CAPI from `/api/checkout`
- Purchase confirmation sends CAPI from the Zaakpay return flow

All deduped business events share the same `event_id` between browser and server.

Attribution captured and persisted:

- `source`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `fbclid`
- `fbc`
- `_fbp`

## Video provider switch rule

The application imports the provider through [`lib/videoProvider/index.ts`](./lib/videoProvider/index.ts).

To change storage vendors later, update only that file to instantiate a different implementation. The rest of the app calls the abstraction only through:

```ts
export interface VideoProvider {
  getVideoUrl(videoId: string, userId: string): Promise<string>;
  listVideos(): Promise<Video[]>;
}
```

## GCP deployment

This repo includes:

- `Dockerfile` for Cloud Run
- `cloudbuild.yaml` for build + deploy to Cloud Run
- `output: "standalone"` in Next.js config

Suggested GCP flow:

1. Create a private GCS bucket for videos.
2. Store video metadata in the `Video` table with `gcsPath` values.
3. Configure Neon PostgreSQL and set production database env vars.
4. Configure a Cloud Run service account with signed URL access to the bucket.
5. Store secrets in Secret Manager.
6. Build and deploy with Cloud Build / Cloud Run.
7. Configure Zaakpay return URL to `/api/zaakpay/return`.
8. Set Meta Pixel and Conversions API credentials.
9. Set Resend API credentials and verified sender domain.

### Cloud Run with Neon

Recommended runtime env vars:

```env
DATABASE_PROVIDER="postgresql"
NEXT_PUBLIC_APP_URL="https://YOUR_CLOUD_RUN_URL"
NEXT_PUBLIC_BRAND_NAME="Roop Veda"
NEXT_PUBLIC_DEFAULT_CURRENCY="usd"
GCS_BUCKET_NAME="YOUR_PRIVATE_BUCKET"
TEMP_MANUAL_ACCESS_ENABLED="false"
META_API_VERSION="v19.0"
```

Recommended Secret Manager secrets:

- `DATABASE_URL`
- `DIRECT_URL`
- `AUTH_JWT_SECRET`
- `ZAAKPAY_MERCHANT_IDENTIFIER`
- `ZAAKPAY_SECRET_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `META_ACCESS_TOKEN`
- `NEXT_PUBLIC_META_PIXEL_ID`

For Cloud Run with Google Cloud Storage:

- keep the bucket private
- do not set `GCP_CLIENT_EMAIL` or `GCP_PRIVATE_KEY` unless you intentionally want to use a manual service-account key
- let the Cloud Run service account authenticate automatically

IAM for the Cloud Run service account:

- `roles/storage.objectViewer` on the video bucket
- `roles/secretmanager.secretAccessor`
- `roles/iam.serviceAccountTokenCreator` on the same service account so signed URLs can be generated reliably

Deploy with Cloud Build:

```bash
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=_IMAGE_URI=asia-south1-docker.pkg.dev/PROJECT_ID/roop-veda/web:latest,_SERVICE_NAME=roop-veda-web,_REGION=asia-south1,_SERVICE_ACCOUNT=roop-veda-run@PROJECT_ID.iam.gserviceaccount.com,_ENV_VARS=DATABASE_PROVIDER=postgresql,NEXT_PUBLIC_APP_URL=https://YOUR_RUN_URL,NEXT_PUBLIC_BRAND_NAME=Roop\ Veda,NEXT_PUBLIC_DEFAULT_CURRENCY=usd,GCS_BUCKET_NAME=YOUR_BUCKET,TEMP_MANUAL_ACCESS_ENABLED=false,META_API_VERSION=v19.0,_SECRET_VARS=DATABASE_URL=DATABASE_URL:latest,DIRECT_URL=DIRECT_URL:latest,AUTH_JWT_SECRET=AUTH_JWT_SECRET:latest,ZAAKPAY_MERCHANT_IDENTIFIER=ZAAKPAY_MERCHANT_IDENTIFIER:latest,ZAAKPAY_SECRET_KEY=ZAAKPAY_SECRET_KEY:latest,RESEND_API_KEY=RESEND_API_KEY:latest,RESEND_FROM_EMAIL=RESEND_FROM_EMAIL:latest,META_ACCESS_TOKEN=META_ACCESS_TOKEN:latest,NEXT_PUBLIC_META_PIXEL_ID=NEXT_PUBLIC_META_PIXEL_ID:latest \
  .
```

After deploy:

1. open `/api/health`
2. verify database, GCS, and secret-backed integrations
3. test `/quiz`
4. test `/forgot-password`
5. verify Zaakpay checkout and return flow end to end

## Notes

- Video files are never proxied through the backend.
- Signed URLs are generated on demand and expire after 30 minutes.
- `/dashboard` and `/api/videos` are protected by middleware and server checks.
- If Zaakpay, Resend, Meta, or GCS credentials are omitted locally, the UI still builds, but those integrations will not complete live actions.
- Without real GCS credentials and private bucket assets, the dashboard can still be accessed locally but protected video playback cannot be fully exercised against live signed URLs.
