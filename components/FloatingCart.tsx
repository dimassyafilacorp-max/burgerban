'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
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
          // Menghitung total kuantitas seluruh pesanan
          const total = cart.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(total);
        } catch (e) {
          console.error('Failed to parse cart data:', e);
          setCartCount(0);
        }
      } else {
        setCartCount(initialTotalItems ?? 0);
      }
    };

    updateCartCount();

    // Event Listener untuk update otomatis antar komponen/tab
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cart-updated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, [initialTotalItems]);

  // Hindari Hydration Mismatch & sembunyikan jika keranjang kosong
  if (!isMounted || cartCount <= 0) return null;

  return (
    <div className="sticky bottom-6 z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end pointer-events-none -mt-16 pb-6">
      <Link
        href="/checkout"
        className="pointer-events-auto flex items-center gap-3 bg-black hover:bg-stone-800 text-white px-5 py-3.5 rounded-full shadow-2xl border border-stone-800 transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        {/* Ikon Tas Keranjang Lucide */}
        <ShoppingBag className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-12" />

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