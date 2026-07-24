import type { Metadata } from "next";
import { clerkProxyCookieName, getClerkProxyUrl } from "@/clerk-proxy";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "clerksfield.ai",
  description: "Clerk + Next.js FAPI proxy test app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const clerkProxyUrl = getClerkProxyUrl(
    cookieStore.get(clerkProxyCookieName)?.value,
  );

  const internalClerkJSUrl = process.env.NEXT_PUBLIC_INTERNAL_CLERK_JS_URL;
  const internalClerkUIUrl = process.env.NEXT_PUBLIC_INTERNAL_CLERK_UI_URL;

  let allowedRedirectOrigins = [];
  if (process.env.NEXT_PUBLIC_ALLOWED_REDIRECT_ORIGINS) {
    try {
      allowedRedirectOrigins = JSON.parse(
        process.env.NEXT_PUBLIC_ALLOWED_REDIRECT_ORIGINS,
      );
    } catch (error) {
      console.error(
        "Failed to parse NEXT_PUBLIC_ALLOWED_REDIRECT_ORIGINS:",
        error,
      );
    }
  }
  return (
    <ClerkProvider
      proxyUrl={clerkProxyUrl}
      allowedRedirectOrigins={allowedRedirectOrigins}
      // @ts-expect-error - ignore
      __internal_clerkJSUrl={internalClerkJSUrl}
      __internal_clerkUIUrl={internalClerkUIUrl}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
