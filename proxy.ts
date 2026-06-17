import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // The FAPI proxy is served by app/%5Fclerk/[[...path]]/route.ts.
  frontendApiProxy: {
    enabled: false,
  },
});

export const config = {
  matcher: [
    "/((?!_next|_clerk|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
