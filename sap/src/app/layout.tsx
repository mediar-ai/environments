import type { Metadata, Viewport } from "next";
import "./globals.css";
import SAPVersionSwitch from "@/components/SAPVersionSwitch";

export const metadata: Metadata = {
  title: "SAP Business One",
  description: "SAP Business One - ERP for Small & Medium Enterprises",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SAP B1",
  },
  applicationName: "SAP Business One",
};

export const viewport: Viewport = {
  themeColor: "#0a246a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <SAPVersionSwitch>{children}</SAPVersionSwitch>
      </body>
    </html>
  );
}
