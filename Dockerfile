ARG DATABASE_PROVIDER=postgresql

FROM node:20-bookworm-slim AS deps
WORKDIR /app
ARG DATABASE_PROVIDER
ENV DATABASE_PROVIDER=${DATABASE_PROVIDER}

# ✅ FIX 1: ADD OPENSSL
RUN apt-get update -y && apt-get install -y openssl

COPY package.json package-lock.json ./
COPY scripts ./scripts
COPY prisma ./prisma
RUN npm ci


FROM node:20-bookworm-slim AS builder
WORKDIR /app
ARG DATABASE_PROVIDER
ENV DATABASE_PROVIDER=${DATABASE_PROVIDER}

# ✅ FIX 2: ADD OPENSSL
RUN apt-get update -y && apt-get install -y openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# (IMPORTANT: ensures correct Prisma binary for this OS)
RUN npx prisma generate

RUN npm run build


FROM node:20-bookworm-slim AS runner
WORKDIR /app
ARG DATABASE_PROVIDER
ENV DATABASE_PROVIDER=${DATABASE_PROVIDER}
ENV NODE_ENV=production
ENV PORT=8080

# ✅ FIX 3: ADD OPENSSL (runtime needs it too)
RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 8080

CMD ["node", "server.js"]