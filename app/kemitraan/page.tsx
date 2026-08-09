'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function KemitraanPage() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    jenisKemitraan: '',
    estimasiKebutuhan: '',
    pesan: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kirim data via WhatsApp atau API
    const text = `Halo Admin Burgerban, saya ingin berkonsultasi mengenai Kemitraan.%0A%0A*Nama:* ${formData.nama}%0A*Email:* ${formData.email}%0A*No. Telepon:* ${formData.telepon}%0A*Jenis Kemitraan:* ${formData.jenisKemitraan}%0A*Estimasi Kebutuhan:* ${formData.estimasiKebutuhan}%0A*Pesan:* ${formData.pesan}`;
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  const scrollToPrograms = () => {
    document
      .getElementById('pilihan-program')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between font-sans">
      {/* NAVBAR */}
      <Navbar />

      <main className="pt-20 flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative bg-stone-900 text-white py-24 px-4 sm:px-8 overflow-hidden min-h-[500px] flex items-center justify-center">
          {/* Background Image Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1600&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-900/80" />

          <div className="relative z-10 max-w-4xl mx-auto text-left sm:text-left w-full">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4 max-w-3xl">
              Jadi Bagian dari Burgerban, The Fastest Growing Local Burger in
              Indonesia
            </h1>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mb-8 leading-relaxed">
              Pilih program kemitraan fleksibel Burgerban—mulai dari suplai
              putus B2B, konsinyasi, hingga co-branding untuk mengembangkan
              bisnis Anda bersama kami.
            </p>
            <button
              onClick={scrollToPrograms}
              className="bg-[#a3e635] text-black font-bold px-6 py-3.5 rounded-full hover:bg-[#8ece25] transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              Lihat Pilihan Program
            </button>
          </div>
        </section>

        {/* 2. PILIH PROGRAM KEMITRAAN */}
        <section
          id="pilihan-program"
          className="py-16 px-4 max-w-6xl mx-auto scroll-mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#65a30d]">
              Pilih Program Kemitraan Anda
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CARD 1 */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="inline-block px-3 py-1 bg-[#a3e635] text-stone-950 text-xs font-bold rounded-full mb-4">
                  B2B Wholesale
                </span>
                <h3 className="text-xl font-bold mb-3 text-stone-900">
                  Suplai Putus
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  Mitra membeli paket bahan baku secara berkala sesuai kebutuhan
                  stok operasional kedai/resto mitra.
                </p>

                <div className="bg-stone-50 rounded-xl p-4 mb-6 border border-stone-100">
                  <p className="text-xs font-bold text-stone-800 mb-2">
                    Terdapat 2 paket kerja sama:
                  </p>
                  <ul className="text-xs text-stone-600 space-y-1.5">
                    <li className="flex items-center gap-1.5">
                      <span className="text-stone-800 font-semibold">✓</span> 1.
                      Paket 8 porsi
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-stone-800 font-semibold">✓</span> 2.
                      Paket 10 porsi
                    </li>
                  </ul>
                </div>
              </div>

              <a
                href="#form-konsultasi"
                className="w-full block text-center bg-stone-900 hover:bg-stone-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                Pilih Suplai Putus
              </a>
            </div>

            {/* CARD 2 */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="inline-block px-3 py-1 bg-stone-900 text-white text-xs font-bold rounded-full mb-4">
                  Titip Jual
                </span>
                <h3 className="text-xl font-bold mb-3 text-stone-900">
                  Sistem Konsinyasi
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  Disesuaikan jika Anda juga menitipkan produk siap olah /
                  frozen, namun umumnya untuk bahan baku murni menggunakan
                  sistem jual-putus dengan minimum pesanan.
                </p>

                <div className="bg-stone-50 rounded-xl p-4 mb-6 border border-stone-100">
                  <p className="text-xs font-bold text-stone-800 mb-1">
                    Ketentuan:
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Fleksibel berdasarkan produk frozen & sistem jual-putus
                    minimum pesanan.
                  </p>
                </div>
              </div>

              <a
                href="#form-konsultasi"
                className="w-full block text-center bg-stone-900 hover:bg-stone-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                Pilih Konsinyasi
              </a>
            </div>

            {/* CARD 3 */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="inline-block px-3 py-1 bg-[#a3e635] text-stone-950 text-xs font-bold rounded-full mb-4">
                  Partner Brand
                </span>
                <h3 className="text-xl font-bold mb-3 text-stone-900">
                  Co-Branding / Dukungan Menu
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  Kami memperbolehkan mitra mencantumkan menu burger kami di buku
                  menu mereka atau menggunakan brand kami sebagai varian partner
                  brand.
                </p>

                <div className="bg-stone-50 rounded-xl p-4 mb-6 border border-stone-100">
                  <p className="text-xs font-bold text-stone-800 mb-1">
                    Keuntungan:
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Menambah variasi menu tanpa harus merintis brand baru dari
                    awal.
                  </p>
                </div>
              </div>

              <a
                href="#form-konsultasi"
                className="w-full block text-center bg-stone-900 hover:bg-stone-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                Pilih Co-Branding
              </a>
            </div>
          </div>
        </section>

        {/* 3. CARA KERJA KEMITRAAN */}
        <section className="py-12 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#65a30d]">
              Cara Kerja Kemitraan Burgerban
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* STEP 1 */}
            <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6">
              <span className="inline-block px-3 py-1 bg-[#a3e635]/30 text-[#4d7c0f] text-xs font-bold rounded-full mb-4">
                STEP 1
              </span>
              <h3 className="text-lg font-bold mb-2 text-stone-900">
                Pilih Program & Konsultasi
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Tentukan apakah Anda ingin mengambil program Suplai Putus,
                Konsinyasi, atau Co-Branding sesuai kebutuhan bisnis Anda.
              </p>
            </div>

            {/* STEP 2 */}
            <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6">
              <span className="inline-block px-3 py-1 bg-[#a3e635]/30 text-[#4d7c0f] text-xs font-bold rounded-full mb-4">
                STEP 2
              </span>
              <h3 className="text-lg font-bold mb-2 text-stone-900">
                Proses & Pengelolaan Tim
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Tim profesional Burgerban siap mendampingi dari penyiapan bahan
                baku hingga suplai produk secara berkala.
              </p>
            </div>

            {/* STEP 3 */}
            <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6">
              <span className="inline-block px-3 py-1 bg-[#a3e635]/30 text-[#4d7c0f] text-xs font-bold rounded-full mb-4">
                STEP 3
              </span>
              <h3 className="text-lg font-bold mb-2 text-stone-900">
                Bisnis Berjalan & Berkembang
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Nikmati pertumbuhan bisnis F&B Anda bersama dukungan brand lokal
                yang kuat dan terpercaya di Indonesia.
              </p>
            </div>
          </div>
        </section>

        {/* 4. FORM KONSULTASI KEMITRAAN */}
        <section id="form-konsultasi" className="py-12 px-4 max-w-6xl mx-auto scroll-mt-20">
          <div className="bg-[#1c1917] text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Konsultasi Kemitraan Burgerban
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mb-8">
              Tidak ada komitmen apapun. Tim kami akan menghubungi Anda via
              WhatsApp untuk menjelaskan seluruh skema dan menjawab pertanyaan
              Anda.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Nama Lengkap */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama"
                    required
                    placeholder="Jane Doe"
                    value={formData.nama}
                    onChange={handleInputChange}
                    className="w-full bg-white text-gray-900 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="janedoe@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white text-gray-900 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                  />
                </div>

                {/* No. Telepon */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    No. Telepon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telepon"
                    required
                    placeholder="08xxxxxxxxxx"
                    value={formData.telepon}
                    onChange={handleInputChange}
                    className="w-full bg-white text-gray-900 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                  />
                </div>

                {/* Jenis Kemitraan */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Jenis Kemitraan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jenisKemitraan"
                    required
                    value={formData.jenisKemitraan}
                    onChange={handleInputChange}
                    className="w-full bg-white text-gray-900 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                  >
                    <option value="" disabled>
                      Pilih jenis kemitraan
                    </option>
                    <option value="Suplai Putus">Suplai Putus (B2B)</option>
                    <option value="Sistem Konsinyasi">Sistem Konsinyasi</option>
                    <option value="Co-Branding">Co-Branding / Dukungan Menu</option>
                  </select>
                </div>
              </div>

              {/* Estimasi Kebutuhan */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Estimasi Kebutuhan / Skala Bisnis{' '}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="estimasiKebutuhan"
                  required
                  value={formData.estimasiKebutuhan}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                >
                  <option value="" disabled>
                    Pilih estimasi kebutuhan
                  </option>
                  <option value="Skala Kecil (1-50 porsi/hari)">
                    Skala Kecil (1 - 50 porsi/hari)
                  </option>
                  <option value="Skala Menengah (50-150 porsi/hari)">
                    Skala Menengah (50 - 150 porsi/hari)
                  </option>
                  <option value="Skala Besar (>150 porsi/hari)">
                    Skala Besar (&gt;150 porsi/hari)
                  </option>
                </select>
              </div>

              {/* Pesan */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Saya ingin tahu lebih lanjut tentang{' '}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="pesan"
                  required
                  rows={4}
                  placeholder="Tuliskan pesan di sini"
                  value={formData.pesan}
                  onChange={handleInputChange}
                  className="w-full bg-white text-gray-900 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="bg-[#a3e635] text-stone-950 font-bold px-8 py-3.5 rounded-full hover:bg-[#8ece25] transition-all transform hover:scale-105 shadow-md text-sm sm:text-base inline-flex items-center gap-2"
                >
                  Jadwalkan Konsultasi Gratis →
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}