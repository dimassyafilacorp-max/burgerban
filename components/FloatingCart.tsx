'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, X, Trash2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Interface Item Keranjang
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface FloatingCartProps {
  totalItems?: number;
}

export default function FloatingCart({ totalItems: initialTotalItems }: FloatingCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form Data Pembeli (Modal)
  const [nama, setNama] = useState('');
  const [telepon, setTelepon] = useState('');
  const [catatan, setCatatan] = useState('');

  // Synchronize Keranjang dari LocalStorage
  const syncCart = () => {
    const savedCart = localStorage.getItem('burgerban_cart');
    if (savedCart) {
      try {
        const cart: CartItem[] = JSON.parse(savedCart);
        setCartItems(cart);
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      } catch (e) {
        console.error('Gagal membaca data keranjang:', e);
        setCartItems([]);
        setCartCount(0);
      }
    } else {
      setCartCount(initialTotalItems ?? 0);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    syncCart();

    window.addEventListener('storage', syncCart);
    window.addEventListener('cart-updated', syncCart);

    return () => {
      window.removeEventListener('storage', syncCart);
      window.removeEventListener('cart-updated', syncCart);
    };
  }, [initialTotalItems]);

  // Hitung Total Harga
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Hapus Item
  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    localStorage.setItem('burgerban_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
  };

  // Kirim Pesanan ke Supabase & WhatsApp
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !telepon) {
      alert('Harap isi Nama dan Nomor WhatsApp terlebih dahulu!');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = `REG-${Date.now().toString().slice(-6)}`;

      // 1. Format Item untuk Supabase
      const itemsForDb = cartItems.map((item) => ({
        namaMenu: item.name,
        jumlah: item.quantity,
        harga: item.price,
      }));

      // 2. Insert ke Database Supabase (Tabel: regular_orders)
      const { error } = await supabase.from('regular_orders').insert([
        {
          order_id: orderId,
          nama: nama,
          telepon: telepon,
          items: itemsForDb,
          total_harga: totalPrice,
          catatan: catatan || '-',
          status: 'Pending',
        },
      ]);

      if (error) {
        console.error('Gagal menyimpan ke Supabase:', error);
      }

      // 3. Format Pesan WhatsApp
      let waMessage = `Halo Burgerban, saya mau pesan:\n\n`;
      waMessage += `*ID Pesanan:* ${orderId}\n`;
      waMessage += `*Nama:* ${nama}\n`;
      waMessage += `*No. HP:* ${telepon}\n\n`;
      waMessage += `*Rincian Pesanan:*\n`;

      cartItems.forEach((item) => {
        waMessage += `• ${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
      });

      waMessage += `\n*Total Bayar:* Rp ${totalPrice.toLocaleString('id-ID')}\n`;
      if (catatan) waMessage += `*Catatan:* ${catatan}\n`;

      // 4. Reset Keranjang LocalStorage
      localStorage.removeItem('burgerban_cart');
      window.dispatchEvent(new Event('cart-updated'));

      // 5. Redirect ke WhatsApp
      const adminPhoneNumber = '6281234567890'; // Ganti dengan nomor WA Admin Burgerban kamu
      const waUrl = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(waMessage)}`;
      
      setIsOpen(false);
      window.open(waUrl, '_blank');
    } catch (err) {
      alert('Terjadi kesalahan saat memproses pesanan.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Jangan tampilkan jika belum mount atau keranjang kosong
  if (!isMounted || cartCount <= 0) return null;

  return (
    <>
      {/* TOMBOL FLOATING CARAJANG MELAYANG */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 bg-black hover:bg-stone-800 text-white px-5 py-3.5 rounded-full shadow-2xl border border-stone-800 transition-all duration-300 hover:scale-105 active:scale-95 group"
        >
          <ShoppingBag className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-bold text-sm tracking-wide">Keranjang</span>
          <span
            suppressHydrationWarning
            className="bg-[#fbbf24] text-black font-extrabold text-xs px-2 py-0.5 rounded-full min-w-[22px] text-center flex items-center justify-center"
          >
            {cartCount}
          </span>
        </button>
      </div>

      {/* DRAWER / MODAL RINGKASAN KERANJANG & CHECKOUT */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-neutral-900 border-l border-neutral-800 text-white w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-right duration-300">
            
            {/* Header Drawer */}
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h2 className="font-bold text-lg">Keranjang Belanja</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List Item Keranjang */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-800/80 border border-neutral-700/60 rounded-xl p-3 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold text-sm text-white">{item.name}</h4>
                    <p className="text-xs text-neutral-400">
                      {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-amber-400 text-sm">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-neutral-500 hover:text-red-400 p-1 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Form & Ringkasan Checkout */}
            <form onSubmit={handleCheckout} className="border-t border-neutral-800 pt-4 space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Nama Lengkap *"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-xs px-3.5 py-2.5 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Nomor WhatsApp (Contoh: 08123456789) *"
                  required
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-xs px-3.5 py-2.5 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Catatan tambahan (Opsional)"
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-xs px-3.5 py-2.5 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              {/* Total Bayar */}
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-neutral-400 font-semibold">Total Pembayaran:</span>
                <span className="text-lg font-bold text-amber-400">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-neutral-700 text-black font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-amber-400/10"
              >
                {isSubmitting ? (
                  'Memproses Pesanan...'
                ) : (
                  <>
                    Pesan Sekarang (WhatsApp)
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
}