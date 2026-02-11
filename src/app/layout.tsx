import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SimulationProvider } from "@/context/SimulationContext";
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
  title: "Civic Mirror",
  description: "A decision-based civic simulation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SimulationProvider>{children}</SimulationProvider>
      </body>
    </html>
  );
}
