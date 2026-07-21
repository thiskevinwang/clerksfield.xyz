import { Show } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Form } from "./form";

export const metadata: Metadata = {
  referrer: "strict-origin-when-cross-origin",
};

export default function OAuthConsentPage() {
  return (
    <Show when="signed-in">
      <Suspense fallback={<p>Loading consent request...</p>}>
        <Form />
      </Suspense>
    </Show>
  );
}
