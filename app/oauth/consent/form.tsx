"use client";

import { useClerk, useOAuthConsent, useUser } from "@clerk/nextjs";
import { OAuthConsent } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export function Form() {
  const clerk = useClerk();
  const { user } = useUser();
  const searchParams = useSearchParams();

  const clientId = searchParams.get("client_id") ?? "";
  const redirectUri = searchParams.get("redirect_uri") ?? "";
  const scope = searchParams.get("scope") ?? undefined;

  const { data, isLoading, error } = useOAuthConsent({
    oauthClientId: clientId,
    scope,
    redirectUri,
  });

  if (!clientId || !redirectUri) {
    return <p>Missing OAuth consent parameters.</p>;
  }

  if (isLoading) {
    return <p>Loading consent request...</p>;
  }

  if (error || !data) {
    return <p>Unable to load consent request.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <form method="POST" action={clerk.oauthApplication.buildConsentActionUrl({ clientId })}>
        <h1>{data.oauthApplicationName} wants access to your account</h1>

        {data.oauthApplicationLogoUrl && (
          <img src={data.oauthApplicationLogoUrl} alt={`${data.oauthApplicationName} logo`} />
        )}

        {data.oauthApplicationUrl && (
          <p>
            Application URL: <a href={data.oauthApplicationUrl}>{data.oauthApplicationUrl}</a>
          </p>
        )}
        <p>
          Client ID: <code>{data.clientId}</code>
        </p>
        <p>
          Signed-in user:{" "}
          <strong>{user?.primaryEmailAddress?.emailAddress ?? user?.username ?? user?.id}</strong>
        </p>
        <p>Resource service: Clerk user data</p>

        <p>
          Review the requested permissions before continuing. After you allow or deny access, you
          will be redirected to{" "}
          <strong>{data.redirectDomain || new URL(redirectUri).hostname}</strong>.
        </p>

        <details>
          <summary>View full redirect URL</summary>
          <code>{redirectUri}</code>
        </details>

        <ul>
          {data.scopes.map((scope) => (
            <li key={scope.scope}>{scope.description || scope.scope}</li>
          ))}
        </ul>

        {/* Forward the original OAuth parameters, except fields set by this form. */}
        {Array.from(searchParams.entries())
          .filter(([key]) => key !== "consented" && key !== "organization_id")
          .map(([key, value], index) => (
            <input key={`${key}:${index}`} type="hidden" name={key} value={value} />
          ))}

        <button type="submit" name="consented" value="false">
          Deny
        </button>
        <button type="submit" name="consented" value="true">
          Allow
        </button>
      </form>

      <OAuthConsent oauthClientId={clientId} />
    </div>
  );
}
