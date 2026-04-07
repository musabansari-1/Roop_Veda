# Roop Veda Funnel

Production-ready Next.js 14 App Router funnel for:

- SEO landing traffic on `/`
- Ads-first quiz traffic on `/quiz`
- Quiz -> lead capture -> plans -> Stripe checkout -> account setup -> dashboard
- JWT auth with bcrypt password hashing
- Meta Pixel + Meta Conversions API deduped by shared `event_id`
- Resend transactional emails
- Private video delivery through a swappable video provider abstraction

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite for local development, PostgreSQL for production
- Stripe
- Resend
- bcrypt
- jose-based JWT auth
- Meta Pixel + Meta CAPI
- Google Cloud Storage signed URLs

## Local setup

1. Copy `.env.example` to `.env`.
2. Keep the default local values:
   - `DATABASE_PROVIDER="sqlite"`
   - `DATABASE_URL="file:./dev.db"`
3. Add your Stripe, Resend, Meta, and GCS credentials when you want those integrations live.
4. Run:

```bash
npm install
npm run dev
```

`npm run dev` prepares the SQLite Prisma schema, pushes it to `prisma/dev.db`, and starts Next.js.

You can also inspect the current integration readiness at:

- `/api/health`

### Local no-Stripe access

For local development, this repo includes a disabled-by-default bypass flag:

```env
DEV_ENABLE_BYPASS_CHECKOUT="true"
```

When that flag is enabled outside production and Stripe keys are absent:

1. Open `/quiz`
2. Complete the email capture
3. Choose any plan on `/plans`
4. The app will create a local paid purchase record and send you to `/setup`
5. Create your password
6. You will be auto-logged into `/dashboard`

This bypass is intended only for local testing and is automatically off in production.

## Production database mode

For GCP production, switch the database env to PostgreSQL:

```env
DATABASE_PROVIDER="postgresql"
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB?schema=public"
```

The Prisma prepare script will automatically swap in `prisma/schema.postgres.prisma` before generate/build/dev commands.

Recommended production command sequence:

```bash
npm install
npm run db:push
npm run build
npm run start
```

## Required environment variables

Core:

- `AUTH_JWT_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `DATABASE_PROVIDER`
- `DATABASE_URL`

Stripe:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

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
- `GCP_PROJECT_ID`
- `GCP_CLIENT_EMAIL`
- `GCP_PRIVATE_KEY`

Optional:

- `NEXT_PUBLIC_SUPPORT_WHATSAPP`
- `NEXT_PUBLIC_DEFAULT_CURRENCY`
- `NEXT_PUBLIC_BRAND_NAME`
- `DEV_ENABLE_BYPASS_CHECKOUT`

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
- Purchase confirmation sends CAPI from `/api/stripe/webhook`

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
- `cloudbuild.yaml` for container builds
- `output: "standalone"` in Next.js config

Suggested GCP flow:

1. Create a private GCS bucket for videos.
2. Store video metadata in the `Video` table with `gcsPath` values.
3. Configure Cloud SQL PostgreSQL and set production database env vars.
4. Configure a service account with signed URL access to the bucket.
5. Build and deploy with Cloud Build / Cloud Run.
6. Set Stripe webhook target to `/api/stripe/webhook`.
7. Set Meta Pixel and Conversions API credentials.
8. Set Resend API credentials and verified sender domain.

## Notes

- Video files are never proxied through the backend.
- Signed URLs are generated on demand and expire after 30 minutes.
- `/dashboard` and `/api/videos` are protected by middleware and server checks.
- If Stripe, Resend, Meta, or GCS credentials are omitted locally, the UI still builds, but those integrations will not complete live actions.
- Without real GCS credentials and private bucket assets, the dashboard can still be accessed locally but protected video playback cannot be fully exercised against live signed URLs.
