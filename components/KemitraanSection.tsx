'use client';

import { useState } from 'react';

export default function KemitraanSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    partnershipType: '',
    businessScale: '',
    message: '',
  });

  const steps = [
    {
      step: 'STEP 1',
      title: 'Pilih Program & Konsultasi',
      description:
        'Tentukan apakah Anda ingin mengambil program Suplai Putus, Konsinyasi, atau Co-Branding sesuai kebutuhan bisnis Anda.',
    },
    {
      step: 'STEP 2',
      title: 'Proses & Pengelolaan Tim',
      description:
        'Tim profesional Burgerban siap mendampingi dari penyiapan bahan baku hingga suplai produk secara berkala.',
    },
    {
      step: 'STEP 3',
      title: 'Bisnis Berjalan & Berkembang',
      description:
        'Nikmati pertumbuhan bisnis F&B Anda bersama dukungan brand lokal yang kuat dan terpercaya di Indonesia.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = '6282117637898';

    let textMessage = `*KONSULTASI KEMITRAAN BURGERBAN*\n\n`;
    textMessage += `👤 *Nama Lengkap:* ${formData.fullName}\n`;
    textMessage += `✉️ *Email:* ${formData.email}\n`;
    textMessage += `📞 *No. Telepon:* ${formData.phone}\n`;
    textMessage += `🤝 *Jenis Kemitraan:* ${formData.partnershipType || '-'}\n`;
    textMessage += `📊 *Estimasi Kebutuhan:* ${formData.businessScale || '-'}\n`;
    textMessage += `💬 *Pesan/Pertanyaan:* ${formData.message}\n`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`,
      '_blank'
    );
  };

  return (
    <section id="kemitraan" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* 1. CARA KERJA KEMITRAAN */}
        <div className="space-y-10">
          {/* Title: Diubah total dari hijau lime ke Kuning Amber (#f59e0b / text-amber-500) */}
          <h2 
            className="text-3xl sm:text-4xl font-extrabold text-center text-amber-500"
            style={{ color: '#f59e0b' }}
          >
            Cara Kerja Kemitraan Burgerban
          </h2>

          {/* Grid Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="bg-stone-50 border border-stone-100 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  {/* Badge Step: Diubah dari lime ke Kuning Amber (#fbbf24 / bg-amber-400) */}
                  <span
                    className="inline-block bg-amber-400 text-stone-950 font-extrabold text-[11px] px-3 py-1 rounded-md tracking-wider"
                    style={{ backgroundColor: '#fbbf24', color: '#0c0a09' }}
                  >
                    {item.step}
                  </span>

                  <h3 className="text-lg font-bold text-stone-900">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. FORM KONSULTASI KEMITRAAN */}
        <div className="bg-[#1c1a19] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Konsultasi Kemitraan Burgerban
            </h3>
            <p className="text-xs sm:text-sm text-stone-400">
              Tidak ada komitmen apapun. Tim kami akan menghubungi Anda via WhatsApp untuk menjelaskan seluruh skema dan menjawab pertanyaan Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Nama Lengkap */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white text-stone-900 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="janedoe@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white text-stone-900 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* No Telepon */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">
                  No. Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="08xxxxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white text-stone-900 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Jenis Kemitraan */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">
                  Jenis Kemitraan <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.partnershipType}
                  onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                  className="w-full bg-white text-stone-900 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="" disabled>Pilih jenis kemitraan</option>
                  <option value="Suplai Putus (B2B Wholesale)">Suplai Putus (B2B Wholesale)</option>
                  <option value="Sistem Konsinyasi (Titip Jual)">Sistem Konsinyasi (Titip Jual)</option>
                  <option value="Co-Branding / Dukungan Menu">Co-Branding / Dukungan Menu</option>
                </select>
              </div>
            </div>

            {/* Skala Bisnis */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">
                Estimasi Kebutuhan / Skala Bisnis <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.businessScale}
                onChange={(e) => setFormData({ ...formData, businessScale: e.target.value })}
                className="w-full bg-white text-stone-900 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="" disabled>Pilih estimasi kebutuhan</option>
                <option value="Resto / Kedai Kecil (< 50 porsi/hari)">Resto / Kedai Kecil (&lt; 50 porsi/hari)</option>
                <option value="Resto Menengah (50 - 200 porsi/hari)">Resto Menengah (50 - 200 porsi/hari)</option>
                <option value="Skala Besar / Multiple Outlet (> 200 porsi/hari)">Skala Besar / Multiple Outlet (&gt; 200 porsi/hari)</option>
              </select>
            </div>

            {/* Pesan */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">
                Saya ingin tahu lebih lanjut tentang <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tuliskan pesan di sini"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white text-stone-900 text-sm p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
            </div>

            {/* Tombol Submit: Diubah dari Lime ke Kuning Amber (#fbbf24) */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-500 text-stone-950 font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full transition transform active:scale-95 shadow-lg shadow-amber-400/20"
                style={{ backgroundColor: '#fbbf24', color: '#0c0a09' }}
              >
                Jadwalkan Konsultasi Gratis &rarr;
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}