 import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar";
import SessionSync from "@/components/SessionSync";
 import { UserProvider } from "@/components/UserProvider";

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
  authors: [{ name: "mf Develop", url: "https://github.com/mfelizweb/rulebuilder" }],
  creator: "mf Develop",
  openGraph: {
    title: "FireRules Builder",
    description: "Visual Firestore rules generator with AI support.",   
    url: "https://firerules-builder.vercel.app/",
    siteName: "FireRules",
  
    images: [
      {
        url: "/favicon.svg",  
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <UserProvider>
            <NavBar />
            <SessionSync />
            {children}
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}


