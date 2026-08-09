import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingCart from "@/components/FloatingCart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative bg-stone-50 text-gray-900">
        {children}
        
        {/* Tombol Keranjang Mengambang di Sudut Kanan Bawah */}
        <FloatingCart totalItems={2} />
      </body>
    </html>
  );
}