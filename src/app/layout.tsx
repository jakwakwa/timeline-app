import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RemoveLoader from "@/components/RemoveLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timeline App",
  description: "This project is a web application built with Next.js that visualizes a timeline of episodes, allowing users to browse, filter by category, and play audio directly within the interface. It was developed as a solution for a frontend job application assessment.",
  authors: [{ name: "Jacob Kotzee" }],
  icons: {
    icon: "/christian_cross.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div id="global-loader">
          <div className="global-spinner"></div>
        </div>
        <RemoveLoader />
        {children}
      </body>
    </html>
  );
}
