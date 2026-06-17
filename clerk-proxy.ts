const vercelEnv = process.env.VERCEL_ENV;

export const clerkProxyPath = "/_clerk";

export const shouldUseClerkProxy =
  vercelEnv === "preview" || vercelEnv === "development" || !vercelEnv;

if (!shouldUseClerkProxy) {
  // Clerk auto-derives /__clerk for Vercel production live-key builds unless these are empty.
  process.env.NEXT_PUBLIC_CLERK_PROXY_URL = "";
  process.env.VERCEL_TARGET_ENV = "";
}

export const clerkProxyUrl = shouldUseClerkProxy
  ? clerkProxyPath
  : undefined;
