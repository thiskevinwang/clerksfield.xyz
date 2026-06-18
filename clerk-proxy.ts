import { getClerkProxyCookiePreference } from "./clerk-proxy-cookie";

export {
  clerkProxyCookieName,
  clerkProxyCookieValues,
  getClerkProxyCookiePreference,
} from "./clerk-proxy-cookie";

export const clerkProxyPath = "/_clerk";

const vercelEnv = process.env.VERCEL_ENV;
const envsThatUseProxy = [
  "preview",
  // "production"
];
export const shouldUseClerkProxyUrl = !vercelEnv || envsThatUseProxy.includes(vercelEnv);

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
