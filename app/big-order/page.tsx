'use client';

import { useState } from 'react';
import { 
  Percent, 
  Utensils, 
  Store, 
  ShieldCheck, 
  Users, 
  Truck 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BigOrderForm from '@/components/BigOrderForm';

export default function BigOrderPage() {
  // State posisi slider (0 - 100)
  const [sliderPos, setSliderPos] = useState<number>(0);

  // 1. Konversi posisi slider linear (0-100%) ke rentang 50-450 pcs
  const getQuantityFromSlider = (pos: number): number => {
    return Math.round(50 + (pos / 100) * 400);
  };

  const itemQuantity = getQuantityFromSlider(sliderPos);

  // 2. Hitung persentase diskon
  const getDiscountPercent = (qty: number) => {
    if (qty >= 450) return 10;
    if (qty >= 250) return 8;
    if (qty >= 100) return 7;
    return 5;
  };

  const currentDiscount = getDiscountPercent(itemQuantity);

  // 3. Pesan bantuan penambahan pcs untuk diskon berikutnya
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
              className="inline-block bg-lime-500 hover:bg-lime-400 text-black font-bold px-6 py-3 rounded-full text-sm transition transform hover:scale-105 shadow-lg"
            >
              Isi Form Pemesanan
            </a>
          </div>
        </section>

        {/* MENU FAVORIT SECTION */}
        <section className="py-16 px-4 max-w-7xl mx-auto bg-white text-gray-900 rounded-3xl my-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-lime-600 mb-10">
            Menu Favorit Burgerban Big Order
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Juragan', desc: 'Burger', img: '/images/juragan.jpg' },
              { name: 'Ningrat', desc: 'Burger', img: '/images/ningrat.jpg' },
              { name: 'Jelata', desc: 'Cobain dari Jelata dijamin...', img: '/images/jelata.jpg' },
              { name: 'Jelata Cheese', desc: 'Cheese Burger', img: '/images/jelata-cheese.jpg' },
            ].map((menu, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="relative h-44 bg-gray-200">
                  <img src={menu.img} alt={menu.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-lime-500 text-black p-1.5 rounded-full">
                    <Utensils className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900">{menu.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{menu.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/#menu"
              className="inline-block bg-lime-100 border border-lime-400 text-lime-800 hover:bg-lime-200 px-6 py-2.5 rounded-full text-sm font-semibold transition"
            >
              Lihat Semua Menu
            </a>
          </div>
        </section>

        {/* KEUNTUNGAN BIG ORDER */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-lime-500 mb-10">
            Keuntungan Burgerban Big Order
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 space-y-3">
              <Percent className="h-6 w-6 text-lime-400" />
              <h3 className="font-bold text-lg text-white">Pesan Banyak, Diskon Hingga 10%</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Pesan dalam jumlah besar dan nikmati diskon spesial hingga 10%.
              </p>
            </div>

            <div className="bg-lime-500 p-6 rounded-2xl text-black space-y-3 shadow-md">
              <Utensils className="h-6 w-6 text-black" />
              <h3 className="font-bold text-lg">50 Burger Mulai 500 Ribuan</h3>
              <p className="text-xs text-stone-900 leading-relaxed font-medium">
                Harga mulai dari 10 ribuan yang ramah di kantong cukup untuk konsumsi acaramu.
              </p>
            </div>

            <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 space-y-3">
              <Store className="h-6 w-6 text-lime-400" />
              <h3 className="font-bold text-lg text-white">Siap Layani hingga 3.000+ Pcs</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Acara kecil atau ribuan tamu, kapasitas kami selalu siap.
              </p>
            </div>

            <div className="bg-lime-500 p-6 rounded-2xl text-black space-y-3 shadow-md">
              <ShieldCheck className="h-6 w-6 text-black" />
              <h3 className="font-bold text-lg">Fresh & Bersertifikat Halal</h3>
              <p className="text-xs text-stone-900 leading-relaxed font-medium">
                Dibuat fresh, bersertifikat halal. Aman untuk semua tamu undanganmu.
              </p>
            </div>

            <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 space-y-3">
              <Users className="h-6 w-6 text-lime-400" />
              <h3 className="font-bold text-lg text-white">Sudah dipercaya di 1000+ Acara</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Dari wedding, acara corporate, hingga acara sekolah, kami selalu siap hadir.
              </p>
            </div>

            <div className="bg-lime-500 p-6 rounded-2xl text-black space-y-3 shadow-md">
              <Truck className="h-6 w-6 text-black" />
              <h3 className="font-bold text-lg">Gratis Ongkir se-JABODETABEK!</h3>
              <p className="text-xs text-stone-900 leading-relaxed font-medium">
                Pemesanan khusus Booth, Mobile Van, dan Food Truck di daerah Jabodetabek.
              </p>
            </div>
          </div>
        </section>

        {/* LAYANAN TABLE SECTION */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-lime-500 mb-2">
            Layanan Burgerban Big Order
          </h2>
          <p className="text-center text-xs sm:text-sm text-gray-400 mb-10">
            Dipercaya di ratusan acara, kami hadir dengan layanan yang fleksibel sesuai kebutuhanmu.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white text-gray-900 p-6 rounded-3xl border border-gray-200 shadow-md">
              <h3 className="text-xl font-bold text-center mb-6">Big Order</h3>
              <div className="space-y-3 text-sm divide-y divide-gray-100">
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500">Minimal Order</span>
                  <span className="font-bold">50 pcs per pesanan</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500">Packaging Box</span>
                  <span className="font-bold">Dikemas rapi menggunakan box</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500">Pengiriman via Gosend</span>
                  <span className="font-bold text-right">Dari outlet terdekat ke alamat tujuan</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500">Ongkir Sesuai Jarak</span>
                  <span className="font-bold text-right">Biaya pengiriman menyesuaikan alamat tujuan</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500">Bebas Pilih Menu</span>
                  <span className="font-bold">Maksimal 3 varian dalam satu pesanan</span>
                </div>
              </div>
            </div>

            <div className="bg-white text-gray-900 p-6 rounded-3xl border-2 border-lime-500 shadow-md">
              <h3 className="text-xl font-bold text-center mb-6">Booth</h3>
              <div className="space-y-3 text-sm divide-y divide-gray-100">
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500">Minimal Order</span>
                  <span className="font-bold text-red-600">Senilai Rp 3.000.000</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500">Free Ongkir</span>
                  <span className="font-bold text-red-600">Area JABODETABEK</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500">Bebas Pilih Menu</span>
                  <span className="font-bold">Maksimal 3 varian dalam satu pesanan</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500">Burger Ready to Serve</span>
                  <span className="font-bold">Siap saji, langsung bisa dihidangkan</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-500">Include Man Power & Microwave</span>
                  <span className="font-bold">Sudah termasuk crew dan peralatan</span>
                </div>
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
              {/* Output Jumlah Pcs */}
              <div className="flex justify-between items-center">
                <span className="text-4xl sm:text-5xl font-black text-white">{itemQuantity} pcs</span>
              </div>

              {/* Slider Component & Custom Marker */}
              <div className="relative pt-2 pb-8">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full accent-lime-400 h-2 bg-neutral-300 rounded-lg cursor-pointer"
                />

                {/* Marker Dots & Label Angka */}
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

              {/* Box Diskon Kamu */}
              <div className="bg-neutral-700/80 p-5 rounded-2xl flex justify-between items-center">
                <span className="text-base text-gray-200 font-bold">Diskon Kamu</span>
                <span className="text-3xl font-black text-lime-400">{currentDiscount}%</span>
              </div>

              {/* Teks Informasi Tambahan */}
              <p className="text-xs text-lime-400 font-medium">
                {getNextTierText(itemQuantity)}
              </p>
            </div>
          </div>
        </section>

        {/* CARA PEMESANAN */}
        <section className="py-16 px-4 bg-lime-500 text-black">
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
                  <span className="w-7 h-7 bg-lime-600 text-white rounded-full font-bold flex items-center justify-center text-xs">
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