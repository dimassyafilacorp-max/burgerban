// @ts-nocheck
'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, Variants } from 'framer-motion';

function JourneySection() {
  const journeys = [
    {
      year: '2020',
      title: 'Lahirnya BurgerBan',
      description:
        'Memulai langkah kecil melalui kuliner UMKM dengan sistem Pre-Order sampai seluruh Banyuwangi.',
      highlight: false,
    },
    {
      year: '2021',
      title: 'Outlet Pertama',
      description:
        'Membuka outlet untuk pertama kali di Genteng untuk memudahkan customer datang langsung.',
      highlight: false,
    },
    {
      year: '2025',
      title: 'Istirahat Sementara',
      description: 'Kami tutup sementara sampai waktu ditentukan.',
      highlight: false,
    },
    {
      year: '2026',
      title: 'Bangkit Kembali',
      description:
        'Memulai lagi dengan konsep yang berbeda dari sebelumnya dan persiapan lebih matang.',
      highlight: true,
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="bg-black text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden border border-stone-800 my-12">
      {/* Glow Effect Dekoratif */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#a3e635]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Journey */}
      <div className="text-center mb-8 sm:mb-12 relative z-10">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-400 font-semibold block mb-2">
          JOURNEY
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Perjalanan Burgerban
        </h2>
        <p className="text-xs text-stone-400 mt-2 block sm:hidden">
          ← Geser untuk melihat perjalanan →
        </p>
      </div>

      {/* Grid Desktop / Slider Mobile */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="
          flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-6 px-6
          sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible
          [scrollbar-width:none] [-ms-overflow-style:none] [::-webkit-scrollbar]:hidden
          relative z-10
        "
      >
        {journeys.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className={`
              min-w-[82%] sm:min-w-0 snap-center flex-shrink-0 sm:flex-shrink
              group bg-white text-gray-900 rounded-2xl p-6 flex flex-col justify-between 
              transition-all duration-300 ease-out transform hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(255,255,255,0.15)]
              border ${
                item.highlight
                  ? 'border-[#a3e635] shadow-[0_0_20px_rgba(163,230,53,0.25)]'
                  : 'border-transparent hover:border-stone-300'
              }
            `}
          >
            <div>
              <span
                className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold mb-4 transition-transform duration-300 group-hover:scale-110 ${
                  item.highlight
                    ? 'bg-[#a3e635] text-black shadow-sm'
                    : 'bg-stone-900 text-white'
                }`}
              >
                {item.year}
              </span>

              <h3 className="text-lg font-bold mb-2 group-hover:text-amber-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between font-sans">
      {/* 1. NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="pt-28 pb-16 px-4 max-w-6xl mx-auto w-full flex-1">
        
        {/* 2. TEKS NARASI */}
        <section className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-8 leading-tight">
            Kelezatan Autentik, Kualitas Tanpa Kompromi, Harga untuk Semua Kalangan.
          </h1>

          <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
            <p>
              Lahir di tengah badai ketidakpastian pada tahun 2020 saat pandemi COVID-19 melanda dunia, BURGER BAN hadir sebagai bentuk keberanian dan inovasi di kancah kuliner UMKM lokal. Kami percaya bahwa setiap krisis selalu melahirkan peluang, dan bagi kami, peluang tersebut adalah menghadirkan kebahagiaan melalui makanan yang berkualitas.
            </p>

            <p>
              Perjalanan kami tidak instan. Sang owner mendedikasikan waktu hampir 4 bulan penuh untuk melakukan trial & error tanpa henti—meracik bumbu, memilih bahan, dan menyempurnakan resep—hingga akhirnya menemukan formula rasa yang sempurna, pas, dan dapat diterima di lidah para pencinta kuliner.
            </p>

            <p>
              <strong>Dari Sistem Pre-Order hingga Menjadi Pilihan Kota:</strong> Pada awal kemunculannya, BURGER BAN memperkenalkan produknya melalui sistem Pre-Order (PO) guna menguji kualitas rasa dan membangun kepercayaan pelanggan. Sambutan hangat serta loyalitas para pelanggan awal menjadi bahan bakar utama bagi kami. Dengan modal keyakinan dan dukungan yang kuat, kami akhirnya memberanikan diri untuk melangkah lebih jauh dengan membuka outlet fisik pertama yang strategis di jantung Pusat Kota Genteng.
            </p>

            <p>
              <strong>Komitmen dan Keunggulan Kami:</strong> Di BURGER BAN, kami memegang teguh komitmen untuk menyajikan burger yang lezat, higienis, dan terjangkau bagi seluruh kalangan masyarakat. Keunggulan utama kami terletak pada konsistensi rasa dan kualitas bahan baku yang selalu terjaga. Kami percaya bahwa menikmati burger berkualitas tinggi, lezat, dan mengenyangkan tidak harus menguras kantong. BURGER BAN hadir untuk membuktikan bahwa standar rasa bintang lima kini bisa dinikmati oleh siapa saja, kapan saja.
            </p>
          </div>
        </section>

        {/* 3. SECTION JOURNEY (Seksi Hitam Beranimasi) */}
        <JourneySection />

      </main>

      {/* 4. FOOTER */}
      <Footer />
    </div>
  );
}