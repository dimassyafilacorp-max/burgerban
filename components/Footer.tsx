'use client';

import Link from 'next/link';

export default function Footer() {
  const whatsappNumber = '6282117637898';

  const handleContactClick = () => {
    const message = encodeURIComponent(
      'Halo Burgerban, saya ingin bertanya info lebih lanjut.'
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-black text-white pt-12 pb-8 border-t border-stone-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-800/80">
          {/* Logo Brand */}
          <div className="md:col-span-3">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black italic tracking-wide text-white">
                Burgerban
              </span>
            </Link>
          </div>

          {/* Quick Menu */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-white mb-4">Quick Menu</h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/big-order"
                  className="hover:text-white transition-colors"
                >
                  Big Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Kemitraan */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-white mb-4">Kemitraan</h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link
                  href="/kemitraan"
                  className="hover:text-white transition-colors"
                >
                  Kemitraan
                </Link>
              </li>
            </ul>
          </div>

          {/* Tentang */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-white mb-4">Tentang</h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Head Office, Email & Social Media Info */}
          <div className="md:col-span-3 space-y-5">
            <div>
              <span className="text-xs text-stone-400 block mb-1">
                Head Office Location
              </span>
              <p className="text-sm font-bold text-white">Genteng, Banyuwangi</p>
            </div>

            <div>
              <span className="text-xs text-stone-400 block mb-1">Email</span>
              <a
                href="mailto:contactburgerban@gmail.com"
                className="text-sm font-bold text-white hover:underline"
              >
                contactburgerban@gmail.com
              </a>
            </div>

            <div>
              <span className="text-xs text-stone-400 block mb-2">
                Social Media
              </span>
              <div className="flex items-center gap-3">
                {/* Instagram Icon */}
                <a
                  href="https://www.instagram.com/burgerbanbwi?igsh=bGdhOXBiY2U3dDl1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* TikTok Icon */}
                <a
                  href="https://www.tiktok.com/@burgerban?_r=1&_t=ZS-98dIBwJ68Un"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.98-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.67 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.56-1.28 2.56.02.91.5 1.78 1.25 2.29 1.02.7 2.41.68 3.42-.01.73-.5 1.19-1.34 1.25-2.22.05-2.83.02-5.66.02-8.49z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Contact Button */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            © 2026 PT. Berlian Anugerah Numusi.
          </p>

          <button
            onClick={handleContactClick}
            className="bg-[#a3e635] hover:bg-[#84cc16] text-black font-bold text-sm px-6 py-2.5 rounded-full transition-colors active:scale-95 shadow-md"
          >
            Kontak Kami
          </button>
        </div>
      </div>
    </footer>
  );
}