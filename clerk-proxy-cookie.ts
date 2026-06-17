export const clerkProxyCookieName = "clerk_use_proxy";

export const clerkProxyCookieValues = {
  enabled: "true",
  disabled: "false",
} as const;

export type ClerkProxyCookiePreference = "default" | "enabled" | "disabled";

export function getClerkProxyCookiePreference(
  cookieValue: string | null | undefined,
): ClerkProxyCookiePreference {
  if (cookieValue === clerkProxyCookieValues.enabled) {
    return "enabled";
  }

  if (cookieValue === clerkProxyCookieValues.disabled) {
    return "disabled";
  }

  return "default";
}
