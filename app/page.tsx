'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Flame, Star, X, Plus, Minus, Trash2, Send } from 'lucide-react';
import { menuItems, categories, MenuItem, CartItem } from '@/data/menu';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Nomor WhatsApp tujuan pemesanan
const WHATSAPP_NUMBER = '6282143561141';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State Keranjang dengan Inisialisasi dari LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('burgerban_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // State Form Pemesan dengan Inisialisasi dari LocalStorage
  const [customerName, setCustomerName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('burgerban_customer_name') || '';
    }
    return '';
  });

  const [address, setAddress] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('burgerban_address') || '';
    }
    return '';
  });

  const [notes, setNotes] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('burgerban_notes') || '';
    }
    return '';
  });

  // State Animasi Tombol Keranjang
  const [isAnimating, setIsAnimating] = useState(false);

  // SIMPAN KE LOCALSTORAGE SETIAP TERJADI PERUBAHAN
  useEffect(() => {
    localStorage.setItem('burgerban_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('burgerban_customer_name', customerName);
  }, [customerName]);

  useEffect(() => {
    localStorage.setItem('burgerban_address', address);
  }, [address]);

  useEffect(() => {
    localStorage.setItem('burgerban_notes', notes);
  }, [notes]);

  // Trigger animasi tombol keranjang mengambang
  const triggerCartAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  // Tambah item ke keranjang
  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });

    triggerCartAnimation();
  };

  // Kurangi jumlah item
  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Hapus item dari keranjang
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Hitung total harga & jumlah pesanan
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Filter menu berdasarkan kategori & pencarian
  const filteredMenu = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Fungsi Checkout via WhatsApp
  const handleCheckoutWA = () => {
    if (cart.length === 0) return;

    if (!address) {
      alert('Mohon isi Alamat Pengiriman terlebih dahulu.');
      return;
    }

    let message = `*HALO BURGERBAN!* 🍔\n`;
    message += `Saya ingin memesan menu berikut:\n\n`;

    if (customerName) {
      message += `👤 *Nama Pemesan:* ${customerName}\n`;
    }

    message += `📍 *Alamat Pengiriman:* ${address}\n\n`;

    message += `📝 *Rincian Pesanan:*\n`;
    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      message += `${index + 1}. *${item.name}* (${item.quantity}x) = Rp ${subtotal.toLocaleString('id-ID')}\n`;
    });

    message += `\n💰 *Total Pembayaran:* Rp ${totalPrice.toLocaleString('id-ID')}\n`;

    if (notes) {
      message += `📌 *Catatan Tambahan:* ${notes}\n`;
    }

    message += `\nMohon diproses ya, terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans relative flex flex-col justify-between">
      {/* Navbar Fixed */}
      <Navbar />

      {/* Main Container */}
      <div className="pt-16">
        {/* Search Bar Panel */}
        <section className="bg-white border-b border-gray-200 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari menu favorit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 text-sm text-gray-800 pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-black transition"
              />
            </div>
          </div>
        </section>

        {/* Hero Banner */}
        <section className="bg-white border-b border-gray-200 py-12 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4 border border-amber-200">
              <Flame className="h-4 w-4 text-amber-600" /> 100% Quality Premium Beef
            </div>
            <h1 className="text-4xl sm:text-6xl font-black italic text-gray-900 tracking-tight mb-4">
              LEZAT, TEBAL, <span className="text-amber-500">BURGERBAN!</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
              Nikmati varian burger lokal rasa internasional dengan kualitas daging pilihan dan harga terjangkau.
            </p>
          </div>
        </section>

        {/* Category Filter Pills & Menu Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="menu">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {item.badge && (
                      <span className="absolute top-3 left-3 bg-amber-400 text-black text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <Star className="h-3 w-3 fill-black" /> {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 mt-auto">
                  <div>
                    <span className="text-xs text-gray-400 block">Harga</span>
                    <span className="text-lg font-extrabold text-gray-900">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition active:scale-95 flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="h-4 w-4" /> Tambah
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              Menu tidak ditemukan. Coba kata kunci lain!
            </div>
          )}
        </main>
      </div>

      {/* FLOATING CART BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsCartOpen(true)}
          className={`flex items-center gap-3 bg-black hover:bg-stone-800 text-white px-5 py-3.5 rounded-full shadow-2xl border border-stone-800 transition-all duration-300 ease-out active:scale-95 ${
            isAnimating
              ? 'scale-110 -translate-y-1 ring-4 ring-amber-400/50 bg-stone-900'
              : 'hover:scale-105'
          }`}
        >
          <ShoppingBag className={`h-5 w-5 text-white transition-transform duration-300 ${isAnimating ? 'rotate-12' : ''}`} />
          <span className="font-bold text-sm tracking-wide">Keranjang</span>
          
          <span
            className={`bg-[#fbbf24] text-black font-extrabold text-xs px-2 py-0.5 rounded-full min-w-[22px] text-center flex items-center justify-center transition-transform duration-300 ${
              isAnimating ? 'scale-125 bg-amber-300' : 'scale-100'
            }`}
          >
            {totalCartCount}
          </span>
        </button>
      </div>

      {/* Footer */}
      <Footer />

      {/* Slide-over Modal Keranjang */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white text-gray-900 flex flex-col justify-between shadow-2xl border-l border-gray-200">
              {/* Header Modal */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6 text-black" />
                  <h2 className="text-xl font-bold">Keranjang Pesanan</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-400 hover:text-black rounded-lg transition"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Body Keranjang */}
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>Keranjang belanjaan Anda masih kosong.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between gap-3"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                            <p className="text-gray-900 font-bold text-xs mt-0.5">
                              Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                            </p>
                          </div>

                          {/* Control Quantity */}
                          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-gray-300">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:text-black text-gray-600"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:text-black text-gray-600"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-600 p-1 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Form Detail Pelanggan & Alamat */}
                    <div className="pt-4 border-t border-gray-200 space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1">
                          Nama Pemesan (Opsional)
                        </label>
                        <input
                          type="text"
                          placeholder="Masukkan nama Anda..."
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-300 text-sm px-3 py-2.5 rounded-lg text-gray-900 focus:outline-none focus:border-black"
                        />
                      </div>

                      {/* Field Alamat Pengiriman */}
                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1">
                          Alamat Pengiriman <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          placeholder="Jalan, No. Rumah, Patokan..."
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          rows={2}
                          className="w-full bg-gray-50 border border-gray-300 text-sm px-3 py-2 rounded-lg text-gray-900 focus:outline-none focus:border-black resize-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1">
                          Catatan Pesanan
                        </label>
                        <textarea
                          placeholder="Contoh: Tanpa acar, pedas sedang..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={2}
                          className="w-full bg-gray-50 border border-gray-300 text-sm px-3 py-2 rounded-lg text-gray-900 focus:outline-none focus:border-black resize-none"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer Checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Total Bayar:</span>
                    <span className="text-2xl font-black text-gray-900">
                      Rp {totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckoutWA}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-md active:scale-98"
                  >
                    <Send className="h-5 w-5" /> Checkout via WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}