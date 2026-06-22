"use client";

import {
  clerkProxyCookieName,
  clerkProxyCookieValues,
  type ClerkProxyCookiePreference,
} from "@/clerk-proxy-cookie";
import Cookies from "js-cookie";
import { useState } from "react";

type ClerkProxyToggleProps = {
  defaultShouldUseProxy: boolean;
  effectiveShouldUseProxy: boolean;
  initialPreference: ClerkProxyCookiePreference;
  proxyPath?: string;
};

const options: Array<{
  label: string;
  value: ClerkProxyCookiePreference;
}> = [
  { label: "Default", value: "default" },
  { label: "Proxy", value: "enabled" },
  { label: "Hosted", value: "disabled" },
];

function getCookieAttributes() {
  return {
    expires: 365,
    path: "/",
    sameSite: "lax" as const,
    secure: window.location.protocol === "https:",
  };
}

function shouldUseProxyForPreference(
  preference: ClerkProxyCookiePreference,
  defaultShouldUseProxy: boolean,
) {
  if (preference === "enabled") {
    return true;
  }

  if (preference === "disabled") {
    return false;
  }

  return defaultShouldUseProxy;
}

export function ClerkProxyToggle({
  defaultShouldUseProxy,
  effectiveShouldUseProxy,
  initialPreference,
  proxyPath,
}: ClerkProxyToggleProps) {
  const [preference, setPreference] = useState<ClerkProxyCookiePreference>(initialPreference);
  const pendingEffectiveShouldUseProxy = shouldUseProxyForPreference(
    preference,
    defaultShouldUseProxy,
  );
  const displayedShouldUseProxy =
    preference === initialPreference ? effectiveShouldUseProxy : pendingEffectiveShouldUseProxy;
  const cookieDisplay =
    preference === "default"
      ? "unset"
      : preference === "enabled"
        ? clerkProxyCookieValues.enabled
        : clerkProxyCookieValues.disabled;

  function updatePreference(nextPreference: ClerkProxyCookiePreference) {
    setPreference(nextPreference);

    if (nextPreference === "default") {
      Cookies.remove(clerkProxyCookieName, getCookieAttributes());
    } else {
      Cookies.set(
        clerkProxyCookieName,
        nextPreference === "enabled"
          ? clerkProxyCookieValues.enabled
          : clerkProxyCookieValues.disabled,
        getCookieAttributes(),
      );
    }

    window.location.reload();
  }

  return (
    <section className="w-full rounded-lg border border-zinc-200 p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-medium">FAPI proxy</h2>
          <p className="mt-1 text-xs text-zinc-500">
            <code>{clerkProxyCookieName}</code>: {cookieDisplay}
          </p>
        </div>
        <div className="text-sm font-medium">{displayedShouldUseProxy ? proxyPath : "Hosted"}</div>
      </div>

      <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-lg border border-zinc-200 text-sm">
        {options.map((option) => {
          const selected = preference === option.value;

          return (
            <button
              aria-pressed={selected}
              className={[
                "min-h-10 border-r border-zinc-200 px-3 font-medium transition last:border-r-0",
                selected ? "bg-black text-white" : "bg-white text-zinc-700 hover:bg-zinc-50",
              ].join(" ")}
              key={option.value}
              onClick={() => updatePreference(option.value)}
              type="button"
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-zinc-500">
        Default is {defaultShouldUseProxy ? proxyPath : "Direct"}.
      </p>
    </section>
  );
}
