'use client';

import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/menu';

export default function KemitraanSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    partnershipType: '',
    businessScale: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let waMessage = `*KONSULTASI KEMITRAAN BANGOR*\n\n`;
    waMessage += `👤 *Nama Lengkap:* ${formData.fullName}\n`;
    waMessage += `✉️ *Email:* ${formData.email}\n`;
    waMessage += `📞 *No. Telepon:* ${formData.phone}\n`;
    waMessage += `🤝 *Jenis Kemitraan:* ${formData.partnershipType || '-'}\n`;
    waMessage += `📊 *Estimasi Kebutuhan:* ${formData.businessScale || '-'}\n`;
    waMessage += `💬 *Pesan/Pertanyaan:* ${formData.message}\n`;

    const encodedMessage = encodeURIComponent(waMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const scrollToForm = (type?: string) => {
    if (type) {
      setFormData((prev) => ({ ...prev, partnershipType: type }));
    }
    const formElement = document.getElementById('form-konsultasi');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="kemitraan" className="bg-stone-950 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Banner Hero Kemitraan */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 p-8 sm:p-14 text-center sm:text-left flex flex-col items-center sm:items-start justify-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Jadi Bagian dari Bangor, <br />
              <span className="text-lime-400">The Fastest Growing Local Burger in Indonesia</span>
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Pilih program kemitraan fleksibel Bangor—mulai dari suplai putus B2B, konsinyasi, hingga co-branding untuk mengembangkan bisnis Anda bersama kami.
            </p>
            <button
              onClick={() => scrollToForm()}
              className="mt-4 bg-lime-400 hover:bg-lime-500 text-stone-950 font-bold px-6 py-3 rounded-full transition shadow-lg shadow-lime-400/20"
            >
              Lihat Pilihan Program
            </button>
          </div>
        </div>

        {/* Section Pilih Program Kemitraan */}
        <div className="space-y-10">
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-lime-400">
              Pilih Program Kemitraan Anda
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Suplai Putus */}
            <div className="bg-stone-900/90 rounded-2xl p-6 border border-stone-800 flex flex-col justify-between hover:border-lime-400/50 transition">
              <div className="space-y-4">
                <span className="inline-block bg-lime-400 text-stone-950 font-bold text-xs px-3 py-1 rounded-full uppercase">
                  B2B Wholesale
                </span>
                <h4 className="text-2xl font-bold text-white">Suplai Putus</h4>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Mitra membeli paket bahan baku secara berkala sesuai kebutuhan stok operasional kedai/resto mitra.
                </p>

                <div className="bg-stone-800/60 rounded-xl p-4 text-xs text-stone-300 space-y-2 border border-stone-700/50">
                  <p className="font-semibold text-white">Terdapat 2 paket kerja sama:</p>
                  <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-lime-400" /> 1. Paket 8 porsi</p>
                  <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-lime-400" /> 2. Paket 10 porsi</p>
                </div>
              </div>

              <button
                onClick={() => scrollToForm('Suplai Putus (B2B Wholesale)')}
                className="mt-6 w-full bg-stone-800 hover:bg-stone-700 text-white font-bold py-3 rounded-xl transition text-sm"
              >
                Pilih Suplai Putus
              </button>
            </div>

            {/* Card 2: Sistem Konsinyasi */}
            <div className="bg-stone-900/90 rounded-2xl p-6 border border-stone-800 flex flex-col justify-between hover:border-lime-400/50 transition">
              <div className="space-y-4">
                <span className="inline-block bg-stone-800 text-stone-200 font-bold text-xs px-3 py-1 rounded-full uppercase border border-stone-700">
                  Titip Jual
                </span>
                <h4 className="text-2xl font-bold text-white">Sistem Konsinyasi</h4>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Disesuaikan jika Anda juga menitipkan produk siap olah / frozen, namun umumnya untuk bahan baku murni menggunakan sistem jual-putus dengan minimum pesanan.
                </p>

                <div className="bg-stone-800/60 rounded-xl p-4 text-xs text-stone-300 space-y-1 border border-stone-700/50">
                  <p className="font-semibold text-white mb-1">Ketentuan:</p>
                  <p>Fleksibel berdasarkan produk frozen & sistem jual-putus minimum pesanan.</p>
                </div>
              </div>

              <button
                onClick={() => scrollToForm('Sistem Konsinyasi (Titip Jual)')}
                className="mt-6 w-full bg-stone-800 hover:bg-stone-700 text-white font-bold py-3 rounded-xl transition text-sm"
              >
                Pilih Konsinyasi
              </button>
            </div>

            {/* Card 3: Co-Branding */}
            <div className="bg-stone-900/90 rounded-2xl p-6 border border-stone-800 flex flex-col justify-between hover:border-lime-400/50 transition">
              <div className="space-y-4">
                <span className="inline-block bg-lime-400 text-stone-950 font-bold text-xs px-3 py-1 rounded-full uppercase">
                  Partner Brand
                </span>
                <h4 className="text-2xl font-bold text-white">Co-Branding / Dukungan Menu</h4>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Kami memperbolehkan mitra mencantumkan menu burger kami di buku menu mereka atau menggunakan brand kami sebagai varian partner brand.
                </p>

                <div className="bg-stone-800/60 rounded-xl p-4 text-xs text-stone-300 space-y-1 border border-stone-700/50">
                  <p className="font-semibold text-white mb-1">Keuntungan:</p>
                  <p>Menambah variasi menu tanpa harus merintis brand baru dari awal.</p>
                </div>
              </div>

              <button
                onClick={() => scrollToForm('Co-Branding / Dukungan Menu')}
                className="mt-6 w-full bg-stone-800 hover:bg-stone-700 text-white font-bold py-3 rounded-xl transition text-sm"
              >
                Pilih Co-Branding
              </button>
            </div>
          </div>
        </div>

        {/* Section Cara Kerja Kemitraan */}
        <div className="space-y-10">
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-lime-400">
              Cara Kerja Kemitraan Bangor
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-900/60 p-6 rounded-2xl border border-stone-800 space-y-3">
              <span className="bg-lime-400/20 text-lime-400 font-extrabold text-xs px-3 py-1 rounded-md">
                STEP 1
              </span>
              <h4 className="text-lg font-bold text-white">Pilih Program & Konsultasi</h4>
              <p className="text-stone-400 text-sm leading-relaxed">
                Tentukan apakah Anda ingin mengambil program Suplai Putus, Konsinyasi, atau Co-Branding sesuai kebutuhan bisnis Anda.
              </p>
            </div>

            <div className="bg-stone-900/60 p-6 rounded-2xl border border-stone-800 space-y-3">
              <span className="bg-lime-400/20 text-lime-400 font-extrabold text-xs px-3 py-1 rounded-md">
                STEP 2
              </span>
              <h4 className="text-lg font-bold text-white">Proses & Pengelolaan Tim</h4>
              <p className="text-stone-400 text-sm leading-relaxed">
                Tim profesional Bangor siap mendampingi dari penyiapan bahan baku hingga suplai produk secara berkala.
              </p>
            </div>

            <div className="bg-stone-900/60 p-6 rounded-2xl border border-stone-800 space-y-3">
              <span className="bg-lime-400/20 text-lime-400 font-extrabold text-xs px-3 py-1 rounded-md">
                STEP 3
              </span>
              <h4 className="text-lg font-bold text-white">Bisnis Berjalan & Berkembang</h4>
              <p className="text-stone-400 text-sm leading-relaxed">
                Nikmati pertumbuhan bisnis F&B Anda bersama dukungan brand lokal yang kuat dan terpercaya di Indonesia.
              </p>
            </div>
          </div>
        </div>

        {/* Form Konsultasi Kemitraan */}
        <div id="form-konsultasi" className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Konsultasi Kemitraan Bangor
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mt-2">
              Tidak ada komitmen apapun. Tim kami akan menghubungi Anda via WhatsApp untuk menjelaskan seluruh skema dan menjawab pertanyaan Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-stone-800 border border-stone-700 text-stone-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-lime-400 transition"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="janedoe@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-800 border border-stone-700 text-stone-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-lime-400 transition"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-2">
                  No. Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="08xxxxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-stone-800 border border-stone-700 text-stone-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-lime-400 transition"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-2">
                  Jenis Kemitraan <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.partnershipType}
                  onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                  className="w-full bg-stone-800 border border-stone-700 text-stone-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-lime-400 transition"
                >
                  <option value="" disabled>Pilih jenis kemitraan</option>
                  <option value="Suplai Putus (B2B Wholesale)">Suplai Putus (B2B Wholesale)</option>
                  <option value="Sistem Konsinyasi (Titip Jual)">Sistem Konsinyasi (Titip Jual)</option>
                  <option value="Co-Branding / Dukungan Menu">Co-Branding / Dukungan Menu</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-2">
                Estimasi Kebutuhan / Skala Bisnis <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.businessScale}
                onChange={(e) => setFormData({ ...formData, businessScale: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 text-stone-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-lime-400 transition"
              >
                <option value="" disabled>Pilih estimasi kebutuhan</option>
                <option value="Resto / Kedai Kecil (< 50 porsi/hari)">Resto / Kedai Kecil (&lt; 50 porsi/hari)</option>
                <option value="Resto Menengah (50 - 200 porsi/hari)">Resto Menengah (50 - 200 porsi/hari)</option>
                <option value="Skala Besar / Multiple Outlet (> 200 porsi/hari)">Skala Besar / Multiple Outlet (&gt; 200 porsi/hari)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-2">
                Saya ingin tahu lebih lanjut tentang <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tuliskan pesan di sini"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 text-stone-200 text-sm p-4 rounded-xl focus:outline-none focus:border-lime-400 transition resize-none"
              />
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                className="bg-lime-400 hover:bg-lime-500 text-stone-950 font-black text-sm px-8 py-3.5 rounded-full transition flex items-center gap-2 mx-auto shadow-lg shadow-lime-400/20 active:scale-95"
              >
                Jadwalkan Konsultasi Gratis <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}