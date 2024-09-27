import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "TB Travels",
  description: "Airline loyalty program demo built with Next.js, Tinybird, and DynamoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
