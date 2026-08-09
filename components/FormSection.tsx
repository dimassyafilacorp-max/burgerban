'use client';

import { useState } from 'react';
import { Send, CalendarCheck } from 'lucide-react';

export default function FormsSection() {
  // -------------------------------------------------------------
  // 1. STATE & HANDLER FOR FORM PEMESANAN BIG ORDER
  // -------------------------------------------------------------
  const [bigOrderForm, setBigOrderForm] = useState({
    fullName: '',
    phone: '',
    eventDate: '',
    quantity: '',
    serviceType: '',
    location: '',
    eventType: ''
  });

  const handleBigOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = `*PEMESANAN BURGERBAN BIG ORDER* 🍔\n\n`;
    message += `👤 *Nama Lengkap:* ${bigOrderForm.fullName}\n`;
    message += `📞 *No. Telepon:* ${bigOrderForm.phone}\n`;
    message += `📅 *Tanggal Acara:* ${bigOrderForm.eventDate}\n`;
    message += `📦 *Jumlah Pesanan:* ${bigOrderForm.quantity} pcs\n`;
    message += `🚚 *Jenis Layanan:* ${bigOrderForm.serviceType}\n`;
    message += `📍 *Lokasi Acara:* ${bigOrderForm.location}\n`;
    message += `🎉 *Jenis Acara:* ${bigOrderForm.eventType}\n\n`;
    message += `Mohon info penawaran harganya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    // Diarahkan ke nomor WhatsApp: 082117637898
    window.open(`https://wa.me/6282117637898?text=${encodedMessage}`, '_blank');
  };

  // -------------------------------------------------------------
  // 2. STATE & HANDLER FOR FORM JADWAL KONSULTASI GRATIS
  // -------------------------------------------------------------
  const [consultForm, setConsultForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    partnershipType: '',
    businessScale: '',
    message: ''
  });

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = `*JADWAL KONSULTASI GRATIS* 📋\n\n`;
    message += `👤 *Nama Lengkap:* ${consultForm.fullName}\n`;
    message += `✉️ *Email:* ${consultForm.email}\n`;
    message += `📞 *No. Telepon:* ${consultForm.phone}\n`;
    message += `🤝 *Jenis Kemitraan:* ${consultForm.partnershipType}\n`;
    message += `📊 *Estimasi Kebutuhan / Skala Bisnis:* ${consultForm.businessScale}\n`;
    message += `💬 *Pesan / Informasi Tambahan:* ${consultForm.message}\n\n`;
    message += `Halo tim, saya ingin menjadwalkan konsultasi gratis. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    // Diarahkan ke nomor WhatsApp: 082117637898
    window.open(`https://wa.me/6282117637898?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="space-y-16 py-12 max-w-4xl mx-auto px-4">
      {/* ========================================================= */}
      {/* FORM JADWALKAN KONSULTASI GRATIS                          */}
      {/* ========================================================= */}
      <section className="bg-[#181818] p-8 rounded-3xl border border-neutral-800 text-white shadow-2xl">
        <div className="mb-6">
          <p className="text-xs text-neutral-400 mb-2">
            Tidak ada komitmen apapun. Tim kami akan menghubungi Anda via WhatsApp untuk menjelaskan seluruh skema dan menjawab pertanyaan Anda.
          </p>
        </div>

        <form onSubmit={handleConsultSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={consultForm.fullName}
                onChange={(e) => setConsultForm({ ...consultForm, fullName: e.target.value })}
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="janedoe@gmail.com"
                value={consultForm.email}
                onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">
                No. Telepon <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="08xxxxxxxxxx"
                value={consultForm.phone}
                onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-200 mb-1">
                Jenis Kemitraan <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={consultForm.partnershipType}
                onChange={(e) => setConsultForm({ ...consultForm, partnershipType: e.target.value })}
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500 appearance-none"
              >
                <option value="" disabled>Pilih jenis kemitraan</option>
                <option value="Franchise / Outlet">Franchise / Outlet</option>
                <option value="Catering / Big Order">Catering / Big Order</option>
                <option value="Event / Booth / Food Truck">Event / Booth / Food Truck</option>
                <option value="Kerjasama Lainnya">Kerjasama Lainnya</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-200 mb-1">
              Estimasi Kebutuhan / Skala Bisnis <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={consultForm.businessScale}
              onChange={(e) => setConsultForm({ ...consultForm, businessScale: e.target.value })}
              className="w-full bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500 appearance-none"
            >
              <option value="" disabled>Pilih estimasi kebutuhan</option>
              <option value="Kecil (50 - 200 Pcs / Skala Perorangan)">Kecil (50 - 200 Pcs / Skala Perorangan)</option>
              <option value="Menengah (200 - 1000 Pcs / Event Sedang)">Menengah (200 - 1000 Pcs / Event Sedang)</option>
              <option value="Besar (1000+ Pcs / Corporate & Festival)">Besar (1000+ Pcs / Corporate & Festival)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-200 mb-1">
              Saya ingin tahu lebih lanjut tentang <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tuliskan pesan di sini"
              value={consultForm.message}
              onChange={(e) => setConsultForm({ ...consultForm, message: e.target.value })}
              className="w-full bg-white text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-lime-400 hover:bg-lime-300 text-black font-extrabold px-8 py-3.5 rounded-full text-sm transition transform hover:scale-105 inline-flex items-center gap-2 shadow-lg cursor-pointer"
            >
              Jadwalkan Konsultasi Gratis →
            </button>
          </div>
        </form>
      </section>

      {/* ========================================================= */}
      {/* FORM PEMESANAN BURGERBAN BIG ORDER                        */}
      {/* ========================================================= */}
      <section className="bg-[#242424] p-8 rounded-3xl border border-neutral-700 text-white shadow-2xl" id="form-pemesanan">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Pemesanan Burgerban Big Order</h2>
          <p className="text-xs text-gray-400 mt-1">Pesan Big Order sekarang dan dapatkan diskon up to 10%!</p>
        </div>

        <form onSubmit={handleBigOrderSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={bigOrderForm.fullName}
                onChange={(e) => setBigOrderForm({ ...bigOrderForm, fullName: e.target.value })}
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Tanggal Acara</label>
              <input
                type="date"
                required
                value={bigOrderForm.eventDate}
                onChange={(e) => setBigOrderForm({ ...bigOrderForm, eventDate: e.target.value })}
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                No. Telepon <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="08xxxxxxxxxx"
                value={bigOrderForm.phone}
                onChange={(e) => setBigOrderForm({ ...bigOrderForm, phone: e.target.value })}
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Jumlah Pesanan</label>
              <input
                type="number"
                min="50"
                required
                placeholder="Minimal order 50 Pcs"
                value={bigOrderForm.quantity}
                onChange={(e) => setBigOrderForm({ ...bigOrderForm, quantity: e.target.value })}
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Jenis Layanan</label>
              <select
                value={bigOrderForm.serviceType}
                onChange={(e) => setBigOrderForm({ ...bigOrderForm, serviceType: e.target.value })}
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime-500"
              >
                <option value="">Pilih jenis layanan</option>
                <option value="Big Order (Box)">Big Order (Box)</option>
                <option value="Booth / Catering">Booth / Catering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Lokasi Acara</label>
              <input
                type="text"
                required
                placeholder="Masukkan alamat lengkap lokasi acaramu"
                value={bigOrderForm.location}
                onChange={(e) => setBigOrderForm({ ...bigOrderForm, location: e.target.value })}
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Jenis Acara</label>
            <select
              value={bigOrderForm.eventType}
              onChange={(e) => setBigOrderForm({ ...bigOrderForm, eventType: e.target.value })}
              className="w-full bg-white text-gray-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime-500"
            >
              <option value="">Pilih Jenis Acara</option>
              <option value="Wedding / Pernikahan">Wedding / Pernikahan</option>
              <option value="Corporate Event / Kantor">Corporate Event / Kantor</option>
              <option value="Ulang Tahun / Kumpul Keluarga">Ulang Tahun / Kumpul Keluarga</option>
              <option value="Acara Sekolah / Kampus">Acara Sekolah / Kampus</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-8 py-3 rounded-full text-sm transition transform hover:scale-105 inline-flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Send className="h-4 w-4" /> Kirim Form Pemesanan
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}