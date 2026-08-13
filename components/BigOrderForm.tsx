'use client';

import { useState } from 'react';

export default function BigOrderForm() {
  // 1. State penampung data form
  const [formData, setFormData] = useState({
    nama: '',
    tanggal: '',
    telepon: '',
    jumlah: '',
    lokasi: '',
    jenisAcara: '',
  });

  // Nomor WhatsApp Admin Burgerban
  const ADMIN_WA_NUMBER = '6282117637898';

  // Handler perubahan input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler submit, simpan ke sistem admin, & pengalihan ke WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Buat ID Pesanan Unik (Contoh: ORD-172350)
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const createdAt = new Date().toLocaleString('id-ID');

    // Struktur objek pesanan baru
    const newOrder = {
      id: orderId,
      nama: formData.nama,
      telepon: formData.telepon,
      tanggalAcara: formData.tanggal || '-',
      jumlah: formData.jumlah ? Number(formData.jumlah) : 0,
      lokasi: formData.lokasi || '-',
      jenisAcara: formData.jenisAcara || '-',
      status: 'Pending',
      createdAt: createdAt,
    };

    // Simpan ke LocalStorage agar Dashboard Admin dapat membaca data ini
    try {
      const existingOrders = JSON.parse(
        localStorage.getItem('burgerban_admin_orders') || '[]'
      );
      localStorage.setItem(
        'burgerban_admin_orders',
        JSON.stringify([newOrder, ...existingOrders])
      );
    } catch (error) {
      console.error('Gagal menyimpan pesanan ke admin storage:', error);
    }

    // Format pesan rapi ke WhatsApp
    const message = `Halo Admin Burgerban, saya ingin melakukan pemesanan Big Order:

*ID Pesanan:* ${orderId}
*Nama Lengkap:* ${formData.nama}
*Tanggal Acara:* ${formData.tanggal || '-'}
*No. Telepon:* ${formData.telepon}
*Jumlah Pesanan:* ${formData.jumlah ? `${formData.jumlah} Pcs` : '-'}
*Lokasi Acara:* ${formData.lokasi || '-'}
*Jenis Acara:* ${formData.jenisAcara || '-'}

Mohon konfirmasi dan informasi selanjutnya. Terima kasih!`;

    // Encode URL agar karakter spasi & baris baru aman
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodedMessage}`;

    // Buka WhatsApp di tab/aplikasi baru
    window.open(waUrl, '_blank');
  };

  return (
    <section id="form-pemesanan" className="py-16 px-4 max-w-4xl mx-auto">
      <div className="bg-neutral-800/80 border border-neutral-700 p-8 rounded-3xl shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Pemesanan Burgerban Big Order
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Pesan Big Order sekarang dan dapatkan diskon up to 10%!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-300 font-medium mb-1">
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-2.5 text-sm outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-300 font-medium mb-1">
                Tanggal Acara
              </label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-300 font-medium mb-1">
                No. Telepon *
              </label>
              <input
                type="tel"
                name="telepon"
                value={formData.telepon}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-2.5 text-sm outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-300 font-medium mb-1">
                Jumlah Pesanan
              </label>
              <input
                type="number"
                name="jumlah"
                value={formData.jumlah}
                onChange={handleChange}
                placeholder="Minimal order 50 Pcs"
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-300 font-medium mb-1">
                Lokasi Acara
              </label>
              <input
                type="text"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleChange}
                placeholder="Masukkan alamat lengkap lokasi acaramu"
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-300 font-medium mb-1">
                Jenis Acara
              </label>
              <select
                name="jenisAcara"
                value={formData.jenisAcara}
                onChange={handleChange}
                className="w-full bg-white text-gray-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              >
                <option value="">Pilih Jenis Acara</option>
                <option value="Wedding">Wedding</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Kumpul Keluarga">Kumpul Keluarga</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-8 py-3 rounded-full text-sm transition"
            >
              Kirim Form Pemesanan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}