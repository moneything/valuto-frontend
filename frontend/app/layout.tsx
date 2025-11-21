import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { UserProvider } from "@/lib/userContext";
import { Dancing_Script } from "next/font/google";
import "./globals.css";

const cursiveFont = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
});


export const metadata: Metadata = {
  title: "Valuto - Financial Education for Young People",
  description: "Teaching money skills to young people aged 11-18 through interactive workshops and gamified learning.",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formFieldInput: {
            autoComplete: "off",
          },
          formFieldInputShowPasswordButton: "autocomplete-off",
        },
      }}
    >
      <html lang="en">
        <body>
          <UserProvider>
            {children}
          </UserProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

