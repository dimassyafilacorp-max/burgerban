'use client';

import { useState, useEffect, useMemo } from 'react';
import { menuItems, categories, MenuItem, CartItem } from '@/data/menu';
import { ChevronLeft, ChevronRight, Package } from 'lucide-react';

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Batas 3 baris (3 kolom x 3 baris = 9 item per halaman)
  const ITEMS_PER_PAGE = 9;

  // 1. Filter & Urutkan Menu (Kategori 'paket' & 'combo' SELALU diprioritaskan ke paling atas)
  const filteredMenu = useMemo(() => {
    const items =
      selectedCategory === 'all'
        ? [...menuItems]
        : menuItems.filter((item) => (item.category as string) === selectedCategory);

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

  // --- LOGIKA TAMBAH KE KERANJANG (Di-sync dengan FloatingCart via localStorage) ---
  const addToCart = (item: MenuItem) => {
    const savedCart = localStorage.getItem('burgerban_cart');
    let cart: CartItem[] = [];

    if (savedCart) {
      try {
        cart = JSON.parse(savedCart);
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }

    const existingIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    // Simpan ke localStorage & Trigger Event agar FloatingCart.tsx mendeteksi & langsung terbuka
    localStorage.setItem('burgerban_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  if (!isMounted) return null;

  return (
    <section id="menu-section" className="py-12 px-4 max-w-7xl mx-auto relative">
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

      {/* Grid Menu */}
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
    </section>
  );
}