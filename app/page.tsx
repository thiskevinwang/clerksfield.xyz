import { Show, UserButton } from "@clerk/nextjs";
import { clerkProxyPath, shouldUseClerkProxy } from "@/clerk-proxy";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-8 px-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">clerksfield.ai</h1>
        <p className="mt-2 text-zinc-600">
          {shouldUseClerkProxy ? (
            <>
              Clerk + Next.js 16 with FAPI proxied at{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5">
                {clerkProxyPath}
              </code>
            </>
          ) : (
            "Clerk + Next.js 16 with direct FAPI requests"
          )}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <Link
            href="/sign-in"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium"
          >
            Sign up
          </Link>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>

      <div className="flex gap-4 text-sm text-zinc-600">
        <Link href="/sign-in" className="underline">
          /sign-in
        </Link>
        <Link href="/sign-up" className="underline">
          /sign-up
        </Link>
      </div>
    </main>
  );
}
