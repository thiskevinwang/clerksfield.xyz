# clerksfield.ai

Minimal Next.js 16 + Clerk app for testing FAPI proxying.

## Setup

1. Copy env vars:

   ```bash
   cp .env.example .env.local
   ```

2. Add your Clerk keys from the [Clerk Dashboard](https://dashboard.clerk.com).

3. Enable proxying in the Clerk Dashboard and set the proxy URL to `/_clerk`.
   On Vercel, keep `NEXT_PUBLIC_CLERK_PROXY_URL` scoped to Preview only; do not set it for Production.

4. Run the dev server:

   ```bash
   npm run dev
   ```

## FAPI proxy

Frontend API requests are proxied through `/_clerk` via `frontendApiProxy` in `proxy.ts` for local/development and Vercel Preview deployments. Vercel Production deployments leave `proxyUrl` empty and use direct Frontend API requests.

If you use App Router route handlers instead of middleware, create the route folder as `app/%5Fclerk/[...path]/route.ts` so Next.js treats it as a literal `/_clerk` segment (folders starting with `_` are private by default).

## Stack

- Next.js 16.1.7
- `@clerk/nextjs` (latest)
