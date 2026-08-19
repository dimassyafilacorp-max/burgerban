'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus } from 'lucide-react';
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

export default function FloatingCart({ totalItems }: FloatingCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form Pemesan
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [catatan, setCatatan] = useState('');

  const loadCart = () => {
    const savedCart = localStorage.getItem('burgerban_cart');
    if (savedCart) {
      try {
        const parsed: CartItem[] = JSON.parse(savedCart);
        setCartItems(parsed);
        const count = parsed.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
      } catch (e) {
        console.error('Error parsing cart:', e);
      }
    } else {
      setCartItems([]);
      setCartCount(0);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    const count = newCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
    localStorage.setItem('burgerban_cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);

    updateCart(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Process Checkout via Instagram
  const handleCheckoutInstagram = async () => {
    if (cartItems.length === 0) {
      alert('Keranjang belanja Anda kosong!');
      return;
    }

    if (!alamat.trim()) {
      alert('Silakan isi Alamat Pengiriman!');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = `REG-${Date.now().toString().slice(-6)}`;

      const itemsForDb = cartItems.map((item) => ({
        namaMenu: item.name,
        jumlah: item.quantity,
        harga: item.price,
      }));

      const combinedNote = `Alamat: ${alamat.trim()} | Catatan: ${catatan.trim() || '-'}`;

      // 1. Simpan ke Supabase Admin
      const { error } = await supabase.from('regular_orders').insert([
        {
          order_id: orderId,
          nama: nama.trim() || 'Pelanggan Ritel',
          telepon: '-',
          items: itemsForDb,
          total_harga: totalPrice,
          catatan: combinedNote,
          status: 'Pending',
        },
      ]);

      if (error) {
        console.error('Supabase Error:', error);
        alert(`Gagal menyimpan pesanan: ${error.message}`);
        setIsSubmitting(false);
        return;
      }

      // 2. Format Teks Pesanan
      const itemsList = cartItems
        .map(
          (item, index) =>
            `${index + 1}. ${item.name} (${item.quantity}x) = Rp ${(
              item.price * item.quantity
            ).toLocaleString('id-ID')}`
        )
        .join('\n');

      const message =
        `Halo Burgerban! Saya mau konfirmasi pesanan:\n\n` +
        `ID Pesanan: ${orderId}\n` +
        `Nama Pemesan: ${nama.trim() || '-'}\n` +
        `Alamat Pengiriman: ${alamat.trim()}\n` +
        `Catatan: ${catatan.trim() || '-'}\n\n` +
        `Rincian Pesanan:\n${itemsList}\n\n` +
        `Total Pembayaran: Rp ${totalPrice.toLocaleString('id-ID')}\n\n` +
        `Mohon diproses pesanan saya. Terima kasih!`;

      // 3. Salin Teks ke Clipboard
      try {
        await navigator.clipboard.writeText(message);
        alert('Rincian pesanan berhasil disalin! Silakan Paste (Tempel) di DM Instagram kami.');
      } catch (err) {
        console.error('Gagal menyalin:', err);
      }

      // 4. Reset & Buka Instagram
      updateCart([]);
      setNama('');
      setAlamat('');
      setCatatan('');
      setIsOpen(false);

      const instagramUsername = 'burgerban.id'; // Ganti username Instagram toko kamu
      window.open(`https://ig.me/m/${instagramUsername}`, '_blank');
    } catch (err) {
      alert('Terjadi kesalahan saat memproses pesanan.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Tombol Keranjang Melayang di Pojok Kanan Bawah */}
      {cartCount > 0 && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-105 transition flex items-center gap-3"
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <span className="font-bold text-sm pr-1">
            Rp {totalPrice.toLocaleString('id-ID')}
          </span>
        </button>
      )}

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-over Drawer Keranjang */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header Drawer */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-800" />
            <h2 className="font-bold text-lg text-gray-900">Keranjang Pesanan</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Konten Utama Keranjang */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold">Keranjang Anda kosong</p>
            </div>
          ) : (
            <>
              {/* Daftar Menu */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="font-bold text-sm text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-amber-600 font-extrabold">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border rounded-lg bg-white">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-100 text-gray-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form Input Data Pemesan */}
              <div className="space-y-3 pt-3 border-t">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nama Pemesan (Opsional)
                  </label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Alamat Pengiriman *
                  </label>
                  <textarea
                    rows={2}
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    placeholder="Nama jalan, nomor rumah, RT/RW"
                    className="w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Catatan Pesanan
                  </label>
                  <input
                    type="text"
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    placeholder="Contoh: Tanpa acar / Saus pedas"
                    className="w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Drawer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t bg-white space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-600">Total Bayar:</span>
              <span className="text-lg font-extrabold text-gray-900">
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={handleCheckoutInstagram}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:opacity-90 disabled:opacity-50 text-white font-extrabold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              {isSubmitting ? (
                'Memproses...'
              ) : (
                <>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Checkout via Instagram
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}