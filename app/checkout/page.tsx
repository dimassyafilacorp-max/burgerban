'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/data/menu';
import { ArrowLeft, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Process Checkout via Instagram
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Keranjang belanja Anda kosong!');
      return;
    }

    if (!address.trim()) {
      alert('Silakan isi Alamat Lengkap!');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = `REG-${Date.now().toString().slice(-6)}`;

      // Format items untuk database Supabase
      const itemsForDb = cart.map((item) => ({
        namaMenu: item.name,
        jumlah: item.quantity,
        harga: item.price,
      }));

      const combinedNote = `Alamat: ${address.trim()} | Catatan: ${notes.trim() || '-'}`;

      // 1. Simpan ke Supabase agar tetap masuk Admin Panel
      const { data, error } = await supabase
        .from('regular_orders')
        .insert([
          {
            order_id: orderId,
            nama: name.trim() || 'Pelanggan Ritel',
            telepon: phone.trim() || '-',
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

      // 2. Format Teks Pesanan untuk Instagram DM
      const itemsList = cart
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
        `Nama: ${name || '-'}\n` +
        `No. HP: ${phone || '-'}\n` +
        `Alamat: ${address}\n` +
        `Catatan: ${notes || '-'}\n\n` +
        `Rincian Pesanan:\n${itemsList}\n\n` +
        `Total Pembayaran: Rp ${totalPrice.toLocaleString('id-ID')}\n\n` +
        `Mohon diproses pesanan saya. Terima kasih!`;

      // 3. Salin rincian pesanan ke Clipboard pelanggan
      try {
        await navigator.clipboard.writeText(message);
        alert('Rincian pesanan berhasil disalin! Silakan Paste (Tempel) di DM Instagram kami.');
      } catch (clipErr) {
        console.error('Gagal menyalin teks ke clipboard:', clipErr);
      }

      // 4. Kosongkan keranjang belanja
      updateCartState([]);

      // 5. Buka Direct Message Instagram Toko
      const instagramUsername = 'burgerban.id'; // Ganti sesuai username Instagram kamu
      window.open(`https://ig.me/m/${instagramUsername}`, '_blank');
      
      router.push('/');
    } catch (err) {
      alert('Terjadi kesalahan saat memproses pesanan.');
      console.error('Catch Error:', err);
    } finally {
      setIsSubmitting(false);
    }
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
                <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap (Opsional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">No. Kontak / HP (Opsional)</label>
                <input
                  type="tel"
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
                disabled={isSubmitting}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:opacity-90 disabled:opacity-50 text-white font-extrabold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-md active:scale-95"
              >
                {isSubmitting ? (
                  'Memproses...'
                ) : (
                  <>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Kirim Pesanan via Instagram
                  </>
                )}
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