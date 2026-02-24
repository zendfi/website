import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/geist-mono";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "ZendFi — Crypto Payments for the Borderless Economy",
  description:
    "Accept Solana payments from anywhere. Nigerian customers pay in Naira — you receive USDC. Gasless checkout, DeFi yield on idle funds, subscriptions, splits, and a full developer SDK.",
  keywords: ["crypto payments", "Solana", "Nigeria", "USDC", "NGN onramp", "gasless payments"],
  openGraph: {
    title: "ZendFi — Crypto Payments for the Borderless Economy",
    description: "One link. Three ways to pay. Your USDC earns yield while you sleep.",
    type: "website",
    url: "https://zendfi.tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZendFi — Crypto Payments for the Borderless Economy",
    description: "One link. Three ways to pay. Your USDC earns yield while you sleep.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
