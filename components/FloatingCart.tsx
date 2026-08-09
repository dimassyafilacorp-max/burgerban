'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CartItem } from '@/data/menu';

interface FloatingCartProps {
  totalItems?: number;
}

export default function FloatingCart({ totalItems: initialTotalItems }: FloatingCartProps) {
  const [cartCount, setCartCount] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    const updateCartCount = () => {
      const savedCart = localStorage.getItem('burgerban_cart');
      if (savedCart) {
        try {
          const cart: CartItem[] = JSON.parse(savedCart);
          // Menghitung total kuantitas seluruh pesanan (bukan sekadar jumlah jenis item)
          const total = cart.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(total);
        } catch (e) {
          console.error('Failed to parse cart data:', e);
          setCartCount(0);
        }
      } else {
        // Gunakan initialTotalItems jika ada, atau 0 jika kosong
        setCartCount(initialTotalItems ?? 0);
      }
    };

    updateCartCount();

    // Event Listener untuk mendengarkan perubahan dari komponen/tab lain
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cart-updated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, [initialTotalItems]);

  // Hindari Hydration Mismatch saat render pertama di server
  if (!isMounted || cartCount <= 0) return null;

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
        <span
          suppressHydrationWarning
          className="bg-[#fbbf24] text-black font-extrabold text-xs px-2 py-0.5 rounded-full min-w-[22px] text-center flex items-center justify-center"
        >
          {cartCount}
        </span>
      </Link>
    </div>
  );
}