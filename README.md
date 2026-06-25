# clerksfield.ai

Minimal Next.js 16 + Clerk demo for switching one application between:

- hosted Clerk Frontend API requests
- proxied Clerk Frontend API requests through the same-origin `/_clerk` route

The demo is useful when you want to compare direct FAPI traffic with proxied
FAPI traffic without maintaining two separate apps or changing the Clerk
provider setup by hand between runs.

## What this demonstrates

Clerk can be told, per request, whether to use a `proxyUrl`. In this app that
choice is controlled by a browser cookie:

- `clerk_use_proxy=true` uses the proxied FAPI path, `/_clerk`
- `clerk_use_proxy=false` uses hosted Clerk FAPI directly
- no cookie uses the app's default from `clerk-proxy.ts`

The cookie name is arbitrary. This repo uses `clerk_use_proxy` only so the
toggle state is easy to see in the browser.

## How it works

1. `app/%5Fclerk/[[...path]]/route.ts` creates the proxy endpoint.

   The route exports handlers from Clerk's `createFrontendApiProxyHandlers`.
   Requests to `/_clerk/...` are forwarded to Clerk's hosted Frontend API.

2. `proxy.ts` reads the cookie in middleware.

   Middleware passes `proxyUrl: "/_clerk"` to `clerkMiddleware` when the cookie
   says proxying is enabled. This keeps Clerk middleware and handshake traffic
   aligned with the selected FAPI mode.

3. `app/layout.tsx` reads the same cookie for the application.

   The root layout passes the same `proxyUrl` decision into `ClerkProvider`.
   When `proxyUrl` is present, ClerkJS talks to `/_clerk`. When it is omitted,
   ClerkJS talks to Clerk's hosted FAPI directly.

4. `app/clerk-proxy-toggle.tsx` changes the cookie from the browser.

   The home page toggle writes `clerk_use_proxy`, then reloads the page so both
   middleware and the server layout see the new preference on the next request.

## Key files

- `app/%5Fclerk/[[...path]]/route.ts`: the `/_clerk` FAPI proxy handler
- `proxy.ts`: Clerk middleware configuration that reads the proxy cookie
- `app/layout.tsx`: `ClerkProvider` setup that passes the selected `proxyUrl`
- `clerk-proxy.ts`: shared proxy URL and default-mode logic
- `clerk-proxy-cookie.ts`: cookie name, values, and parser
- `app/clerk-proxy-toggle.tsx`: UI for switching between default, proxy, and hosted modes

## Setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Add your Clerk keys:

   ```dotenv
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

3. Configure the Clerk proxy URL in the Clerk Dashboard as `/_clerk`.

   Do not set `NEXT_PUBLIC_CLERK_PROXY_URL`. This app intentionally passes
   `proxyUrl` from code so the cookie can turn proxying on and off per request.

4. Optionally set the proxy URL explicitly:

   ```dotenv
   NEXT_PUBLIC_PROXY_URL=/_clerk
   ```

   If omitted, the app defaults to `/_clerk`. Keep this path in sync with the
   mounted route in `app/%5Fclerk/[[...path]]/route.ts` if you change it.

5. Run the app:

   ```bash
   npm run dev
   ```

## Trying the demo

Open the home page and use the FAPI proxy toggle:

- `Default`: clears the cookie and uses the default from `clerk-proxy.ts`
  (currently direct hosted FAPI)
- `Proxy`: writes `clerk_use_proxy=true` and routes ClerkJS through `/_clerk`
- `Hosted`: writes `clerk_use_proxy=false` and routes ClerkJS directly to hosted FAPI

Use the browser's network panel to compare requests in each mode. In proxy mode,
Frontend API traffic should go to the app's own `/_clerk` route. In hosted mode,
Frontend API traffic should go directly to Clerk's hosted FAPI origin.

## Notes

`next.config.ts` clears Clerk's environment-based proxy fallbacks so the runtime
cookie decision can disable proxying. If those fallbacks are set globally,
Clerk may use a proxy even when this demo intentionally omits `proxyUrl`.
