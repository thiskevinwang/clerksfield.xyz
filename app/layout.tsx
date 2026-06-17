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

  return (
    <ClerkProvider proxyUrl={clerkProxyUrl}>
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
