import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Konfigurasi Viewport untuk Mencegah Double-Tap Zoom di Mobile
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Mematikan zoom paksa saat pengguna mengetuk layar
};

// 2. Metadata Aplikasi
export const metadata: Metadata = {
  title: "Burgerban - Rasa Internasional, Harga Lokal",
  description: "Nikmati varian burger lokal rasa internasional dengan kualitas daging pilihan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-stone-50 text-gray-900 selection:bg-orange-500 selection:text-white touch-manipulation">
        {children}
      </body>
    </html>
  );
}