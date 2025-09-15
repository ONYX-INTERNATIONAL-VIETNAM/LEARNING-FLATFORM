import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-learning Platform",
  description: "A platform for online learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
