import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // app/layout.tsx passes proxyUrl from the request cookie. Keep Clerk's
    // env and Vercel auto-proxy fallbacks empty so the cookie can disable it.
    NEXT_PUBLIC_CLERK_PROXY_URL: "",
    VERCEL_TARGET_ENV: "",
  },
};

export default nextConfig;
