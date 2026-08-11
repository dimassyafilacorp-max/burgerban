'use client';

import { useState, useEffect, useMemo } from 'react';
import { menuItems, categories, MenuItem, CartItem, WHATSAPP_NUMBER } from '@/data/menu';
import { ChevronLeft, ChevronRight, ShoppingBag, X, Plus, Minus, Trash2, Package } from 'lucide-react';

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // State Keranjang Belanja & Status Open/Close Drawer
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Load cart dari localStorage setelah component di-mount di client (menghindari Hydration Error)
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('burgerban_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart:', e);
      }
    }
  }, []);

  // Sync cart ke localStorage setiap kali ada perubahan data keranjang
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('burgerban_cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  // Batas 3 baris (3 kolom x 3 baris = 9 item per halaman)
  const ITEMS_PER_PAGE = 9;

  // 1. Filter & Urutkan Menu (Kategori 'paket' & 'combo' SELALU diprioritaskan ke paling atas)
  const filteredMenu = useMemo(() => {
    // Filter berdasarkan kategori yang dipilih
    const items =
      selectedCategory === 'all'
        ? [...menuItems]
        : menuItems.filter((item) => (item.category as string) === selectedCategory);

    // Pengurutan: Prioritaskan kategori 'paket' & 'combo' di atas kategori lainnya
    return items.sort((a, b) => {
      const isAPaket = (a.category as string) === 'paket' || (a.category as string) === 'combo';
      const isBPaket = (b.category as string) === 'paket' || (b.category as string) === 'combo';

      if (isAPaket && !isBPaket) return -1;
      if (!isAPaket && isBPaket) return 1;
      return 0;
    });
  }, [selectedCategory]);

  // 2. Hitung Total Halaman
  const totalItems = filteredMenu.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Reset ke halaman 1 jika kategori berubah
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  // 3. Potong Array Menu Sesuai Halaman Aktif
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentMenuItems = filteredMenu.slice(indexOfFirstItem, indexOfLastItem);

  // Handler Ganti Halaman
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- LOGIKA KERANJANG BELANJA ---

  // Tambah item ke keranjang
  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Update kuantitas (+ atau -)
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

  // Hitung total item & total harga
  const totalCartCount = isMounted ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const totalPrice = isMounted ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;

  // Checkout via WhatsApp
  const handleCheckoutWA = () => {
    if (cart.length === 0) return;

    const itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.name}* (${item.quantity}x) = Rp ${(
            item.price * item.quantity
          ).toLocaleString('id-ID')}`
      )
      .join('\n');

    const message = `Halo Admin Burgerban, saya ingin memesan menu berikut:\n\n${itemsList}\n\n*Total Pembayaran:* Rp ${totalPrice.toLocaleString(
      'id-ID'
    )}\n\nMohon informasi ketersediaan dan metode pembayaran. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="menu-section" className="py-12 px-4 max-w-7xl mx-auto relative">
      {/* FLOATING CART BUTTON */}
      {totalCartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-amber-400 hover:bg-amber-500 text-black font-extrabold px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 transition transform active:scale-95"
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            <span
              suppressHydrationWarning
              className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
            >
              {totalCartCount}
            </span>
          </div>
          <span className="text-sm">Keranjang Belanja</span>
          <span suppressHydrationWarning className="bg-black/10 px-2.5 py-1 rounded-full text-xs font-black">
            Rp {totalPrice.toLocaleString('id-ID')}
          </span>
        </button>
      )}

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.id === 'paket' && <Package className="w-4 h-4 text-amber-400" />}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Menu (Maksimal 3 Baris / 9 Item per Halaman) */}
      {currentMenuItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentMenuItems.map((item: MenuItem) => {
            const isPaket = (item.category as string) === 'paket' || (item.category as string) === 'combo';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition overflow-hidden flex flex-col justify-between ${
                  isPaket
                    ? 'border-amber-300 shadow-md hover:shadow-xl ring-1 ring-amber-200'
                    : 'border-gray-100 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="relative w-full h-48 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Badge Spesial Menu Paket & Standard Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      {isPaket && (
                        <span className="bg-black text-amber-400 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider flex items-center gap-1 shadow-sm">
                          <Package className="w-3 h-3" /> Hemat Paket
                        </span>
                      )}
                      {item.badge && (
                        <span className="bg-amber-400 text-black text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider">
                          ★ {item.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-base text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-gray-50">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Harga</span>
                    <span className="font-bold text-sm text-gray-900">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-black hover:bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-1 active:scale-95"
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400 text-sm">
          Menu tidak ditemukan. Coba kategori lain!
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl font-bold text-sm transition ${
                      currentPage === page
                        ? 'bg-amber-400 text-black shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (
                (page === 2 && currentPage > 3) ||
                (page === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return (
                  <span key={page} className="px-1 text-gray-400 font-bold">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Menampilkan {indexOfFirstItem + 1} sampai{' '}
            {Math.min(indexOfLastItem, totalItems)} dari {totalItems} menu
          </p>
        </div>
      )}

      {/* SIDEBAR CART DRAWER */}
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-900" />
            <h2 className="font-bold text-lg text-gray-900">Keranjang Belanja</h2>
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full" suppressHydrationWarning>
              {totalCartCount} item
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-gray-400 hover:text-black rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-gray-400 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
              <p className="text-sm font-medium">Keranjang kamu masih kosong</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100 gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 truncate">{item.name}</h4>
                  <p className="text-xs text-gray-500">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-xs font-extrabold text-amber-600 mt-0.5">
                    Subtotal: Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-100 text-gray-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-xs font-bold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-100 text-gray-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50 space-y-4">
            <div className="flex items-center justify-between text-base font-bold text-gray-900">
              <span>Total Harga:</span>
              <span className="text-xl text-amber-600" suppressHydrationWarning>
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              onClick={handleCheckoutWA}
              className="w-full bg-amber-400 hover:bg-amber-500 text-black font-extrabold py-3.5 rounded-xl shadow-md transition text-sm flex items-center justify-center gap-2"
            >
              <span>Pesan via WhatsApp</span>
            </button>
          </div>
        )}
      </aside>
    </section>
  );
}