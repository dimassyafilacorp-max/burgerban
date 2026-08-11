'use client';

export default function AboutUsSection() {
  const timelineEvents = [
    {
      year: '2020',
      title: 'Lahirnya BurgerBan',
      description: 'Memulai langkah kecil melalui kuliner UMKM dengan sistem Pre-Order sampai seluruh Banyuwangi.',
      highlight: false,
    },
    {
      year: '2021',
      title: 'Outlet Pertama',
      description: 'Membuka outlet untuk pertama kali di Genteng untuk memudahkan customer datang langsung.',
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
      description: 'Memulai lagi dengan konsep yang berbeda dari sebelumnya dan persiapan lebih matang.',
      highlight: true,
    },
  ];

  return (
    <section id="about-us" className="bg-white text-stone-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Title & Deskripsi */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-stone-950 leading-tight">
            Kelezatan Autentik, Kualitas Tanpa Kompromi, Harga untuk Semua Kalangan.
          </h2>

          <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            <p>
              Lahir di tengah badai ketidakpastian pada tahun 2020 saat pandemi COVID-19 melanda dunia, BURGER BAN hadir sebagai bentuk keberanian dan inovasi di kancah kuliner UMKM lokal. Kami percaya bahwa setiap krisis selalu melahirkan peluang, dan bagi kami, peluang tersebut adalah menghadirkan kebahagiaan melalui makanan yang berkualitas.
            </p>

            <p>
              Perjalanan kami tidak instan. Sang owner mendedikasikan waktu hampir 4 bulan penuh untuk melakukan <span className="italic">trial & error</span> tanpa henti—meracik bumbu, memilih bahan, dan menyempurnakan resep—hingga akhirnya menemukan formula rasa yang sempurna, pas, dan dapat diterima di lidah para pencinta kuliner.
            </p>

            <p>
              <strong className="text-stone-900 font-bold">Dari Sistem Pre-Order hingga Menjadi Pilihan Kota:</strong> Pada awal kemunculannya, BURGER BAN memperkenalkan produknya melalui sistem Pre-Order (PO) guna menguji kualitas rasa dan membangun kepercayaan pelanggan. Sambutan hangat serta loyalitas para pelanggan awal menjadi bahan bakar utama bagi kami. Dengan modal keyakinan dan dukungan yang kuat, kami akhirnya memberanikan diri untuk melangkah lebih jauh dengan membuka outlet fisik pertama yang strategis di jantung Pusat Kota Genteng.
            </p>

            <p>
              <strong className="text-stone-900 font-bold">Komitmen dan Keunggulan Kami:</strong> Di BURGER BAN, kami memegang teguh komitmen untuk menyajikan burger yang lezat, higienis, dan terjangkau bagi seluruh kalangan masyarakat. Keunggulan utama kami terletak pada konsistensi rasa dan kualitas bahan baku yang selalu terjaga. Kami percaya bahwa menikmati burger berkualitas tinggi, lezat, dan mengenylkan tidak harus menguras kantong. BURGER BAN hadir untuk membuktikan bahwa standar rasa bintang lima kini bisa dinikmati oleh siapa saja, kapan saja.
            </p>
          </div>
        </div>

        {/* Section Journey / Perjalanan */}
        <div className="bg-black text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Background Glow Amber */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center space-y-1">
            <span className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
              JOURNEY
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Perjalanan Burgerban
            </h3>
          </div>

          {/* Cards Grid Timeline */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineEvents.map((item, idx) => (
              <div
                key={idx}
                className={`bg-white text-stone-900 rounded-2xl p-6 flex flex-col justify-between shadow-md hover:-translate-y-1 transition duration-200 ${
                  item.highlight ? 'ring-2 ring-amber-400' : ''
                }`}
              >
                <div>
                  {/* Badge Tahun - DIUBAH DARI bg-[#b2f042] MENJADI bg-amber-400 */}
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-xs font-black mb-4 shadow-sm ${
                      item.highlight
                        ? 'bg-amber-400 text-stone-950'
                        : 'bg-stone-800 text-white'
                    }`}
                  >
                    {item.year}
                  </span>

                  <h4 className="text-lg font-bold text-stone-950 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}