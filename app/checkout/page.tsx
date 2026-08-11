'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem, WHATSAPP_NUMBER } from '@/data/menu';
import { ArrowLeft, ShoppingBag, Send, Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Form Pembeli
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Load keranjang dari localStorage saat halaman dibuka
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('burgerban_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart:', e);
      }
    }
  }, []);

  // Simpan perubahan keranjang ke localStorage & panggil event pembaharuan
  const updateCartState = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('burgerban_cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  // Fungsi Tambah / Kurang Kuantitas
  const handleUpdateQuantity = (id: string, delta: number) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);

    updateCartState(updatedCart);
  };

  // Fungsi Hapus Item dari Keranjang
  const handleRemoveItem = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCartState(updatedCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.name}* (${item.quantity}x) = Rp ${(
            item.price * item.quantity
          ).toLocaleString('id-ID')}`
      )
      .join('\n');

    const message =
      `*PESANAN BARU - BURGERBAN*\n\n` +
      `*Nama:* ${name}\n` +
      `*No. HP:* ${phone}\n` +
      `*Alamat:* ${address}\n` +
      `*Catatan:* ${notes || '-'}\n\n` +
      `*Rincian Pesanan:*\n${itemsList}\n\n` +
      `*Total Pembayaran:* Rp ${totalPrice.toLocaleString('id-ID')}\n\n` +
      `Mohon diproses pesanan saya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);

    // Kosongkan keranjang setelah checkout dikirim
    updateCartState([]);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Menu
        </Link>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Formulir Checkout</h1>

        {cart.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center space-y-4 shadow-sm">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto stroke-1" />
            <h2 className="text-lg font-bold text-gray-800">Keranjang Belanja Anda Kosong</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Seluruh pesanan telah dibatalkan atau belum ada item yang ditambahkan.
            </p>
            <Link
              href="/"
              className="inline-block bg-black hover:bg-stone-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition shadow-md mt-2"
            >
              Pilih Menu Sekarang
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Form Data Pemesan */}
            <form
              onSubmit={handleSubmitOrder}
              className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4 shadow-sm"
            >
              <h2 className="font-bold text-lg text-gray-900 border-b pb-3">Data Pengiriman</h2>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">No. WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Alamat Lengkap *</label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Tanpa acar / Saus dipisah"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-amber-400 hover:bg-amber-500 text-black font-extrabold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-md active:scale-95"
              >
                <Send className="w-4 h-4" /> Kirim Pesanan via WhatsApp
              </button>
            </form>

            {/* Ringkasan Pesanan + Opsi Tambah/Kurang/Hapus */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="font-bold text-lg text-gray-900">Ringkasan Pesanan</h2>
                <span className="text-xs font-semibold text-gray-500">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} item
                </span>
              </div>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Rp {item.price.toLocaleString('id-ID')} / porsi
                      </p>
                      <p className="text-xs font-extrabold text-amber-600 mt-0.5">
                        Subtotal: Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </p>
                    </div>

                    {/* Tombol Pengatur Kuantitas (+/-) dan Hapus */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-100 text-gray-600 transition rounded-l-lg"
                          title="Kurangi"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="px-2 text-xs font-bold text-gray-900 min-w-[20px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600 transition rounded-r-lg"
                          title="Tambah"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="Hapus Menu"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 flex justify-between items-center text-base font-extrabold text-gray-900">
                <span>Total Pembayaran:</span>
                <span className="text-xl text-amber-600">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}