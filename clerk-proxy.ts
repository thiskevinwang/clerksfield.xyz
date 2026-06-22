import { getClerkProxyCookiePreference } from "./clerk-proxy-cookie";

export {
  clerkProxyCookieName,
  clerkProxyCookieValues,
  getClerkProxyCookiePreference,
} from "./clerk-proxy-cookie";

export const clerkProxyPath = process.env.NEXT_PUBLIC_PROXY_URL;

const vercelEnv = process.env.VERCEL_ENV || "development";
const envsThatUseProxy: string[] = [
  // "preview",
  // "production"
];
export const shouldUseClerkProxyUrl = envsThatUseProxy.includes(vercelEnv) || false;

export function shouldUseClerkProxyUrlForCookie(cookieValue: string | null | undefined) {
  const preference = getClerkProxyCookiePreference(cookieValue);

  if (preference === "enabled") {
    return true;
  }

  if (preference === "disabled") {
    return false;
  }

  return shouldUseClerkProxyUrl;
}

export function getClerkProxyUrl(cookieValue?: string | null) {
  return shouldUseClerkProxyUrlForCookie(cookieValue) ? clerkProxyPath : undefined;
}

export const clerkProxyUrl = getClerkProxyUrl();
