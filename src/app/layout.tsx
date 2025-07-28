import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FireRules Builder – Visual Firestore Rules Generator",
  description: "Generate secure and scalable Firestore rules from JSON, visual builder or natural language input using AI.",
  keywords: ["firebase", "firestore", "security rules", "rules generator", "firestore auth", "firebase admin"],
  authors: [{ name: "mf Develop", url: "https://github.com/tu-github" }],
  creator: "mf Develop",
  openGraph: {
    title: "FireRules Builder",
    description: "Visual Firestore rules generator with AI support.",
    url: "https://firerules.vercel.app",
    siteName: "FireRules",
    images: [
      {
        url: "/preview.png",  
        width: 1200,
        height: 630,
        alt: "FireRules Builder Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
                <NavBar />
      
          {children}
        </Providers>
      </body>
    </html>
  );
}