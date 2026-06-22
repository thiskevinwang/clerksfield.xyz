import { clerkMiddleware } from "@clerk/nextjs/server";
import { clerkProxyCookieName } from "./clerk-proxy-cookie";

export default clerkMiddleware(
  async (_auth, _request, _event) => {
    // noop
  },
  (req) => {
    // dynamically determine if proxy should be used
    const shouldUseProxy = Boolean(req.cookies.get(clerkProxyCookieName)?.value);
    // this is to make sure handshake happens over proxy
    return {
      proxyUrl: shouldUseProxy ? process.env.PROXY_URL : undefined,
      debug: true,
    };
  },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for Clerk-specific frontend API routes
    "/_clerk/(.*)",
  ],
};
