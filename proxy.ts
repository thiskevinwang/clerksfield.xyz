import { clerkMiddleware } from "@clerk/nextjs/server";
import { clerkProxyUrl, shouldUseClerkProxyUrlForCookie } from "./clerk-proxy";
import { clerkProxyCookieName } from "./clerk-proxy-cookie";

export default clerkMiddleware(
  async (_auth, _request, _event) => {
    // noop
  },
  (req) => {
    // dynamically determine if proxy should be used
    const shouldUseProxy = shouldUseClerkProxyUrlForCookie(
      req.cookies.get(clerkProxyCookieName)?.value,
    );
    // this is to make sure handshake happens over proxy
    return {
      proxyUrl: shouldUseProxy ? clerkProxyUrl : undefined,
      debug: true,
    };
  },
);

export const config = {
  matcher: [
    // Do not include "/_clerk/(.*)", and also exclude _clerk from the broad first matcher.
    // The route handler will own proxied FAPI requests,
    // rather than proxy.ts (aka middleware).
    "/((?!_next|_clerk|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
