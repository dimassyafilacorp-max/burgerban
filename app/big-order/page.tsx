'use client';

import { useState } from 'react';
import { 
  Percent, 
  Utensils, 
  Store, 
  ShieldCheck, 
  Users, 
  Truck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BigOrderForm from '@/components/BigOrderForm';
import { menuItems } from '@/data/menu'; // Data menu terpusat

export default function BigOrderPage() {
  // State slider kalkulator diskon
  const [sliderPos, setSliderPos] = useState<number>(0);

  // State slider carousel menu favorit
  const [currentMenuIndex, setCurrentMenuIndex] = useState<number>(0);

  // Filter menu favorit dari data/menu.ts yang memiliki badge
  const favoriteMenus = menuItems.filter((item) => Boolean(item.badge));

  // Pengaturan Carousel Menu Favorit (3 item per tampilan)
  const itemsPerPage = 3;
  const maxMenuIndex = Math.max(0, favoriteMenus.length - itemsPerPage);

  const prevMenuSlide = () => {
    setCurrentMenuIndex((prev) => Math.max(0, prev - 1));
  };

  const nextMenuSlide = () => {
    setCurrentMenuIndex((prev) => Math.min(maxMenuIndex, prev + 1));
  };

  // Konversi slider linear ke quantity (50 - 450 pcs)
  const getQuantityFromSlider = (pos: number): number => {
    return Math.round(50 + (pos / 100) * 400);
  };

  const itemQuantity = getQuantityFromSlider(sliderPos);

  // Kalkulasi persentase diskon
  const getDiscountPercent = (qty: number) => {
    if (qty >= 450) return 10;
    if (qty >= 250) return 8;
    if (qty >= 100) return 7;
    return 5;
  };

  const currentDiscount = getDiscountPercent(itemQuantity);

  // Pesan indikator diskon selanjutnya
  const getNextTierText = (qty: number) => {
    if (qty < 100) {
      return `Tambah ${100 - qty} pcs lagi untuk dapat diskon 7%!`;
    } else if (qty < 250) {
      return `Tambah ${250 - qty} pcs lagi untuk dapat diskon 8%!`;
    } else if (qty < 450) {
      return `Tambah ${450 - qty} pcs lagi untuk dapat diskon 10%!`;
    } else {
      return `Selamat! Kamu mendapatkan diskon maksimal 10%!`;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col justify-between">
      <Navbar />

      <main className="pt-16">
        {/* HERO SECTION */}
        <section 
          className="relative bg-stone-900 border-b border-neutral-800 py-20 px-4 sm:px-6 lg:px-8 text-center bg-cover bg-center" 
          style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('/images/hero-bg.jpg')" }}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Solusi Praktis Untuk Konsumsi Acara,<br /> Diskon Hingga 10%
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Cocok untuk wedding, corporate event, hingga kumpul keluarga. Minimum pemesanan 50 pcs, semua kebutuhan konsumsi tersiapkan dengan rapi.
            </p>
            <a
              href="#form-pemesanan"
              className="inline-block bg-amber-400 hover:bg-amber-500 text-black font-bold px-6 py-3 rounded-full text-sm transition transform hover:scale-105 shadow-lg"
            >
              Isi Form Pemesanan
            </a>
          </div>
        </section>

        {/* MENU FAVORIT SECTION (3 MENU + GESER KANAN KIRI) */}
        <section className="py-12 px-4 max-w-6xl mx-auto bg-white text-gray-900 rounded-3xl my-8 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-amber-500 mb-8">
            Menu Favorit Burgerban Big Order
          </h2>

          <div className="relative px-2 sm:px-10">
            {/* Tombol Geser Kiri */}
            <button
              onClick={prevMenuSlide}
              disabled={currentMenuIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white border border-gray-200 shadow-md transition-all ${
                currentMenuIndex === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-amber-400 hover:border-amber-400 text-gray-800'
              }`}
              aria-label="Previous Menu"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Container Slide */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out gap-6"
                style={{
                  transform: `translateX(-${currentMenuIndex * (100 / itemsPerPage)}%)`,
                }}
              >
                {favoriteMenus.map((item) => (
                  <div
                    key={item.id}
                    className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    {/* Gambar & Badge Bintang */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.opacity = '0.3';
                        }}
                      />

                      {item.badge && (
                        <div className="absolute top-3 left-3 bg-amber-400 text-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                          <span className="text-[10px]">★</span>
                          <span className="text-[10px] font-extrabold tracking-wider uppercase">
                            {item.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Informasi Menu */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {item.description || item.category}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-sm font-extrabold text-gray-900">
                          Rp {item.price ? item.price.toLocaleString('id-ID') : '-'}
                        </span>
                        <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                          Favorit
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol Geser Kanan */}
            <button
              onClick={nextMenuSlide}
              disabled={currentMenuIndex >= maxMenuIndex}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white border border-gray-200 shadow-md transition-all ${
                currentMenuIndex >= maxMenuIndex
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-amber-400 hover:border-amber-400 text-gray-800'
              }`}
              aria-label="Next Menu"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/#menu"
              className="inline-block bg-amber-100 border border-amber-400 text-amber-900 hover:bg-amber-200 px-8 py-2.5 rounded-full text-sm font-bold transition shadow-sm"
            >
              Lihat Semua Menu
            </Link>
          </div>
        </section>

        {/* KEUNTUNGAN BIG ORDER */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-amber-400 mb-10">
            Keuntungan Burgerban Big Order
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 space-y-3">
              <Percent className="h-6 w-6 text-amber-400" />
              <h3 className="font-bold text-lg text-white">Pesan Banyak, Diskon Hingga 10%</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Pesan dalam jumlah besar dan nikmati diskon spesial hingga 10%.
              </p>
            </div>

            <div className="bg-amber-400 p-6 rounded-2xl text-black space-y-3 shadow-md">
              <Utensils className="h-6 w-6 text-black" />
              <h3 className="font-bold text-lg">50 Burger Mulai 500 Ribuan</h3>
              <p className="text-xs text-stone-900 leading-relaxed font-medium">
                Harga mulai dari 10 ribuan yang ramah di kantong cukup untuk konsumsi acaramu.
              </p>
            </div>

            <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 space-y-3">
              <Store className="h-6 w-6 text-amber-400" />
              <h3 className="font-bold text-lg text-white">Siap Layani hingga 450+ Pcs</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Acara kecil atau ratusan tamu, kapasitas kami selalu siap.
              </p>
            </div>

            <div className="bg-amber-400 p-6 rounded-2xl text-black space-y-3 shadow-md">
              <ShieldCheck className="h-6 w-6 text-black" />
              <h3 className="font-bold text-lg">Fresh & Bersertifikat Halal</h3>
              <p className="text-xs text-stone-900 leading-relaxed font-medium">
                Dibuat fresh, bersertifikat halal. Aman untuk semua tamu undanganmu.
              </p>
            </div>

            <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 space-y-3">
              <Users className="h-6 w-6 text-amber-400" />
              <h3 className="font-bold text-lg text-white">Sudah Dipercaya di Berbagai Acara</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Dari wedding, acara corporate, hingga acara sekolah, kami selalu siap hadir.
              </p>
            </div>

            <div className="bg-amber-400 p-6 rounded-2xl text-black space-y-3 shadow-md">
              <Truck className="h-6 w-6 text-black" />
              <h3 className="font-bold text-lg">Gratis Ongkir se-Genteng!</h3>
              <p className="text-xs text-stone-900 leading-relaxed font-medium">
                Pemesanan Big Order khusus pengiriman untuk area Genteng.
              </p>
            </div>
          </div>
        </section>

        {/* LAYANAN TABLE SECTION (HANYA BIG ORDER) */}
        <section className="py-16 px-4 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-amber-400 mb-2">
            Layanan Burgerban Big Order
          </h2>
          <p className="text-center text-xs sm:text-sm text-gray-400 mb-10">
            Dipercaya di ratusan acara, kami hadir dengan layanan yang fleksibel sesuai kebutuhanmu.
          </p>

          <div className="bg-white text-gray-900 p-8 rounded-3xl border border-gray-200 shadow-xl">
            <h3 className="text-2xl font-extrabold text-center mb-6 text-gray-900">Big Order</h3>
            <div className="space-y-4 text-sm divide-y divide-gray-100">
              <div className="flex justify-between pt-3">
                <span className="text-gray-500 font-medium">Minimal Order</span>
                <span className="font-bold text-gray-900">50 pcs per pesanan</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-gray-500 font-medium">Packaging Box</span>
                <span className="font-bold text-gray-900">Dikemas rapi menggunakan box</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-gray-500 font-medium">Pengiriman via Courier</span>
                <span className="font-bold text-right text-gray-900">Dari outlet terdekat ke alamat tujuan</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-gray-500 font-medium">Ongkir Sesuai Jarak</span>
                <span className="font-bold text-right text-gray-900">Gratis ongkir khusus area Genteng</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-gray-500 font-medium">Bebas Pilih Menu</span>
                <span className="font-bold text-gray-900">Maksimal 3 varian dalam satu pesanan</span>
              </div>
            </div>
          </div>
        </section>

        {/* KALKULATOR DISKON SLIDER */}
        <section className="py-16 px-4 max-w-4xl mx-auto">
          <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800 shadow-xl space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Semakin Banyak Beli, Semakin Hemat</h2>
            <p className="text-xs text-gray-400">Geser untuk lihat berapa diskon yang kamu dapat.</p>

            <div className="p-2 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-4xl sm:text-5xl font-black text-white">{itemQuantity} pcs</span>
              </div>

              <div className="relative pt-2 pb-8">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full accent-amber-400 h-2 bg-neutral-300 rounded-lg cursor-pointer"
                />

                <div className="relative w-full text-xs text-gray-300 font-semibold mt-3 h-8">
                  <div className="absolute left-0 -translate-x-0 flex flex-col items-center">
                    <span className="w-2 h-2 bg-white rounded-full mb-1"></span>
                    <span>50</span>
                  </div>

                  <div className="absolute left-[12.5%] -translate-x-1/2 flex flex-col items-center">
                    <span className="w-2 h-2 bg-white rounded-full mb-1"></span>
                    <span>100</span>
                  </div>

                  <div className="absolute left-[50%] -translate-x-1/2 flex flex-col items-center">
                    <span className="w-2 h-2 bg-white rounded-full mb-1"></span>
                    <span>250</span>
                  </div>

                  <div className="absolute right-0 translate-x-0 flex flex-col items-center">
                    <span className="w-2 h-2 bg-white rounded-full mb-1"></span>
                    <span>450</span>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-700/80 p-5 rounded-2xl flex justify-between items-center">
                <span className="text-base text-gray-200 font-bold">Diskon Kamu</span>
                <span className="text-3xl font-black text-amber-400">{currentDiscount}%</span>
              </div>

              <p className="text-xs text-amber-400 font-medium">
                {getNextTierText(itemQuantity)}
              </p>
            </div>
          </div>
        </section>

        {/* CARA PEMESANAN */}
        <section className="py-16 px-4 bg-amber-400 text-black">
          <div className="max-w-6xl mx-auto space-y-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center">Cara Pemesanan Burgerban Big Order</h2>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { step: '1', text: 'Isi Form Pemesanan di Bawah dengan Lengkap' },
                { step: '2', text: 'Hubungi nomor admin untuk pemesanan.' },
                { step: '3', text: 'Invoice akan dikirim lewat WhatsApp.' },
                { step: '4', text: 'Kirim bukti pembayaran via WhatsApp.' },
                { step: '5', text: 'Pesanan diantar sesuai waktu yang sudah ditentukan.' }
              ].map((item) => (
                <div key={item.step} className="bg-white p-4 rounded-2xl text-center space-y-2 shadow-sm flex flex-col items-center justify-start">
                  <span className="w-7 h-7 bg-amber-500 text-black rounded-full font-bold flex items-center justify-center text-xs">
                    {item.step}
                  </span>
                  <p className="text-xs font-semibold text-gray-800">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FORM PEMESANAN KHUSUS BIG ORDER */}
        <BigOrderForm />
      </main>

      <Footer />
    </div>
  );
}