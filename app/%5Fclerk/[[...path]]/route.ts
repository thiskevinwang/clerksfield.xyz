import { clerkProxyPath } from "@/clerk-proxy";
import { createFrontendApiProxyHandlers } from "@clerk/nextjs/server";

export const { GET, POST, PUT, DELETE, PATCH } = createFrontendApiProxyHandlers({
  proxyPath: clerkProxyPath,
  fapiUrl: process.env.CLERK_FAPI_URL,
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});
