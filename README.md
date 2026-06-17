# clerksfield.ai

Minimal Next.js 16 + Clerk app for testing FAPI proxying.

## Setup

1. Copy env vars:

   ```bash
   cp .env.example .env.local
   ```

2. Add your Clerk keys from the [Clerk Dashboard](https://dashboard.clerk.com).

3. Enable proxying in the Clerk Dashboard and set the proxy URL to `/_clerk`.
   Do not set `NEXT_PUBLIC_CLERK_PROXY_URL`; this app passes `proxyUrl`
   from `app/layout.tsx` so it can be controlled per request.

4. Run the dev server:

   ```bash
   npm run dev
   ```

## FAPI proxy

The `/_clerk` path is always served by the App Router route handler in `app/%5Fclerk/[[...path]]/route.ts`, so it can be visited in both Vercel Preview and Production.

Preview and local/development deployments default Clerk's `proxyUrl` to `/_clerk`, so Clerk actively uses the proxy. Production deployments default to direct Frontend API requests, while `/_clerk` remains passively available.

The browser cookie `clerk_use_proxy` can override the deployment default:

- `true` forces Clerk to use `/_clerk`
- `false` forces direct Frontend API requests
- unset uses the deployment default

The home page toggle writes that cookie with `js-cookie` and reloads the page so the server layout can pass the new `proxyUrl` to `ClerkProvider`.

## Stack

- Next.js 16.1.7
- `@clerk/nextjs` (latest)
