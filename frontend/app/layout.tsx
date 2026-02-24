import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { UserProvider } from "@/lib/userContext";
import ConsoleGuard from "@/components/ConsoleGuard";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
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
        <body className={spaceGrotesk.variable}>
          <UserProvider>
            <ConsoleGuard />
            {children}
          </UserProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
