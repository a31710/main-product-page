import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/Providers/Providers";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";
import ApplyForm from "@/components/jobs/ApplyForm/ApplyForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Main Product Page",
  description: "Job listing and application platform built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 md:ml-[280px]">
              <Header />
              <main className="pt-[72px] md:pt-[72px] pt-[60px] p-4 md:p-8 bg-gray-50 min-h-screen">
                {children}
              </main>
            </div>
          </div>
          <ApplyForm />
        </Providers>
      </body>
    </html>
  );
}
