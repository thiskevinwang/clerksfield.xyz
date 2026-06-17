import type { NextConfig } from "next";
import { clerkProxyPath, shouldUseClerkProxy } from "./clerk-proxy";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_PROXY_URL: shouldUseClerkProxy ? clerkProxyPath : "",
    // Prevent Clerk from auto-deriving /__clerk for Vercel production live-key builds.
    VERCEL_TARGET_ENV: shouldUseClerkProxy
      ? (process.env.VERCEL_TARGET_ENV ?? "")
      : "",
  },
};

export default nextConfig;
