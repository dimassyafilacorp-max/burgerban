'use client';

import Link from 'next/link';

interface FloatingCartProps {
  totalItems?: number;
}

export default function FloatingCart({ totalItems = 2 }: FloatingCartProps) {
  // Jika keranjang kosong, tombol tidak perlu ditampilkan (opsional)
  if (totalItems <= 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/checkout"
        className="flex items-center gap-3 bg-black hover:bg-stone-800 text-white px-5 py-3.5 rounded-full shadow-2xl border border-stone-800 transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        {/* Ikon Tas Keranjang */}
        <div className="relative">
          <svg
            className="w-5 h-5 fill-current text-white"
            viewBox="0 0 24 24"
          >
            <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h6v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" />
          </svg>
        </div>

        {/* Teks */}
        <span className="font-bold text-sm tracking-wide">Keranjang</span>

        {/* Badge Jumlah Item (Kuning Emas) */}
        <span className="bg-[#fbbf24] text-black font-extrabold text-xs px-2 py-0.5 rounded-full min-w-[22px] text-center flex items-center justify-center">
          {totalItems}
        </span>
      </Link>
    </div>
  );
}