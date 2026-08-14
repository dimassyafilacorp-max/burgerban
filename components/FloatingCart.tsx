'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, X, Trash2, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

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

  // Form Data Pembeli sesuai UI
  const [nama, setNama] = useState('');
  const [telepon, setTelepon] = useState('');
  const [alamat, setAlamat] = useState('');
  const [catatan, setCatatan] = useState('');

  // Synchronize Keranjang
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

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    localStorage.setItem('burgerban_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
  };

  // Process Checkout
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Keranjang belanjaan Anda kosong!');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = `REG-${Date.now().toString().slice(-6)}`;

      // Format items untuk database
      const itemsForDb = cartItems.map((item) => ({
        namaMenu: item.name,
        jumlah: item.quantity,
        harga: item.price,
      }));

      // Kombinasikan Alamat & Catatan jika ada
      const combinedNote = `Alamat: ${alamat || '-'} | Catatan: ${catatan || '-'}`;

      console.log('Mengirim data ke Supabase...');

      // 1. Simpan ke Supabase
      const { data, error } = await supabase
        .from('regular_orders')
        .insert([
          {
            order_id: orderId,
            nama: nama.trim() || 'Pelanggan Ritel',
            telepon: telepon.trim() || '-',
            items: itemsForDb,
            total_harga: totalPrice,
            catatan: combinedNote,
            status: 'Pending',
          },
        ])
        .select();

      if (error) {
        console.error('⚠️ Supabase Insert Error:', error);
        alert(`Gagal menyimpan pesanan: ${error.message}`);
        setIsSubmitting(false);
        return;
      }

      console.log('✅ Berhasil disimpan di Supabase:', data);

      // 2. Format Pesan WhatsApp
      let waMessage = `Halo Burgerban, saya mau pesan:\n\n`;
      waMessage += `*ID Pesanan:* ${orderId}\n`;
      waMessage += `*Nama:* ${nama || 'Pelanggan'}\n`;
      if (telepon) waMessage += `*No. HP:* ${telepon}\n`;
      waMessage += `*Alamat:* ${alamat || '-'}\n\n`;
      waMessage += `*Rincian Pesanan:*\n`;

      cartItems.forEach((item) => {
        waMessage += `• ${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
      });

      waMessage += `\n*Total Bayar:* Rp ${totalPrice.toLocaleString('id-ID')}\n`;
      if (catatan) waMessage += `*Catatan:* ${catatan}\n`;

      // 3. Reset LocalStorage
      localStorage.removeItem('burgerban_cart');
      window.dispatchEvent(new Event('cart-updated'));
      setNama('');
      setTelepon('');
      setAlamat('');
      setCatatan('');

      // 4. Redirect WhatsApp
      const adminPhoneNumber = '6281234567890'; // Ganti dengan nomor WA Admin Burgerban kamu
      const waUrl = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(waMessage)}`;

      setIsOpen(false);
      window.open(waUrl, '_blank');
    } catch (err) {
      alert('Terjadi kesalahan saat memproses pesanan.');
      console.error('Catch Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted || cartCount <= 0) return null;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 bg-black text-white px-5 py-3.5 rounded-full shadow-2xl border border-stone-800 hover:scale-105 transition"
        >
          <ShoppingBag className="w-5 h-5 text-white" />
          <span className="font-bold text-sm">Keranjang</span>
          <span className="bg-amber-400 text-black font-extrabold text-xs px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        </button>
      </div>

      {/* Drawer Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-neutral-900 border-l border-neutral-800 text-white w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h2 className="font-bold text-lg">Keranjang Pesanan</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List Item */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-neutral-800 p-3 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <p className="text-xs text-neutral-400">Rp {item.price.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-amber-400 text-sm">x{item.quantity}</span>
                    <button onClick={() => handleRemoveItem(item.id)} className="text-neutral-500 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Form Checkout */}
            <form onSubmit={handleCheckout} className="border-t border-neutral-800 pt-4 space-y-3">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Nama Pemesan (Opsional)</label>
                <input
                  type="text"
                  placeholder="Nama Kamu"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-xs px-3.5 py-2.5 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">Nomor WhatsApp (Opsional)</label>
                <input
                  type="tel"
                  placeholder="08123456789"
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-xs px-3.5 py-2.5 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">Alamat Pengiriman *</label>
                <input
                  type="text"
                  placeholder="Alamat Lengkap"
                  required
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-xs px-3.5 py-2.5 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">Catatan Pesanan</label>
                <input
                  type="text"
                  placeholder="Contoh: Pedas, tanpa timun"
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-xs px-3.5 py-2.5 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-neutral-400 font-semibold">Total Bayar:</span>
                <span className="text-lg font-bold text-amber-400">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition"
              >
                {isSubmitting ? 'Memproses...' : (
                  <>
                    <Send className="w-4 h-4" />
                    Checkout via WhatsApp
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