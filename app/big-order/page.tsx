'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PackageCheck, Clock, Tag, Send } from 'lucide-react';

export default function BigOrderPage() {
  const WHATSAPP_NUMBER = '6281234567890';

  const handleOrder = () => {
    const msg = encodeURIComponent('Halo Burgerban, saya ingin memesan paket Big Order/Acara.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col justify-between font-sans">
      <Navbar />

      <main className="pt-24 pb-16 px-4 max-w-7xl mx-auto w-full flex-1">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Pesanan Jumlah Besar
          </span>
          <h1 className="text-4xl sm:text-5xl font-black italic mt-4 mb-4">
            BIG ORDER <span className="text-amber-500">BURGERBAN</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Solusi praktis dan lezat untuk acara kantor, ulang tahun, gathering, maupun pesta komunitas.
          </p>
        </div>

        {/* Keuntungan Big Order */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Harga Spesial</h3>
            <p className="text-gray-500 text-sm">
              Dapatkan harga atau potongan diskon khusus untuk pemesanan dalam jumlah besar.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tepat Waktu</h3>
            <p className="text-gray-500 text-sm">
              Pengiriman dan penyajian dijamin hangat sesuai jam jadwal acara Anda.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <PackageCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Kemasan Higenis</h3>
            <p className="text-gray-500 text-sm">
              Dikemas rapi dan aman secara individual sehingga memudahkan pembagian ke tamu.
            </p>
          </div>
        </div>

        {/* Banner Pemesanan */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-md">
          <h2 className="text-3xl font-extrabold mb-4">Butuh Penawaran Khusus Acara Anda?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Isi jumlah porsi dan tanggal acara Anda, tim catering kami akan segera merespons pesanan Anda.
          </p>
          <button
            onClick={handleOrder}
            className="bg-black hover:bg-gray-800 text-white font-extrabold px-8 py-4 rounded-xl transition duration-200 inline-flex items-center gap-2 shadow-lg"
          >
            <Send className="w-5 h-5 text-amber-400" /> Pesan Big Order Sekarang
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}