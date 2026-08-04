@extends('layouts.app')

@section('content')
<div class="container py-5">
    
    <!-- Bagian Header & Deskripsi Utama (Full Width tanpa foto) -->
    <div class="row mb-5">
        <div class="col-lg-12">
            <h1 class="fw-bold text-dark display-6 mb-3">
                Kelezatan Autentik, Kualitas Tanpa Kompromi, Harga untuk Semua Kalangan.
            </h1>
            <p class="text-muted mb-3">
                Lahir di tengah badai ketidakpastian pada tahun 2020 saat pandemi COVID-19 melanda dunia, BURGER BAN hadir sebagai bentuk keberanian dan inovasi di kancah kuliner UMKM lokal. Kami percaya bahwa setiap krisis selalu melahirkan peluang, dan bagi kami, peluang tersebut adalah menghadirkan kebahagiaan melalui makanan yang berkualitas.
            </p>
            <p class="text-muted mb-3">
                Perjalanan kami tidak instan. Sang owner mendedikasikan waktu hampir 4 bulan penuh untuk melakukan trial & error tanpa henti—meracik bumbu, memilih bahan, dan menyempurnakan resep—hingga akhirnya menemukan formula rasa yang sempurna, pas, dan dapat diterima di lidah para pencinta kuliner.
            </p>
            <p class="text-muted mb-3">
                <strong>Dari Sistem Pre-Order hingga Menjadi Pilihan Kota:</strong> Pada awal kemunculannya, BURGER BAN memperkenalkan produknya melalui sistem Pre-Order (PO) guna menguji kualitas rasa dan membangun kepercayaan pelanggan. Sambutan hangat serta loyalitas para pelanggan awal menjadi bahan bakar utama bagi kami. Dengan modal keyakinan dan dukungan yang kuat, kami akhirnya memberanikan diri untuk melangkah lebih jauh dengan membuka outlet fisik pertama yang strategis di jantung Pusat Kota Genteng.
            </p>
            <p class="text-muted mb-0">
                <strong>Komitmen dan Keunggulan Kami:</strong> Di BURGER BAN, kami memegang teguh komitmen untuk menyajikan burger yang lezat, higienis, dan terjangkau bagi seluruh kalangan masyarakat. Keunggulan utama kami terletak pada konsistensi rasa dan kualitas bahan baku yang selalu terjaga. Kami percaya bahwa menikmati burger berkualitas tinggi, lezat, dan mengenyangkan tidak harus menguras kantong. BURGER BAN hadir untuk membuktikan bahwa standar rasa bintang lima kini bisa dinikmati oleh siapa saja, kapan saja.
            </p>
        </div>
    </div>

    <!-- Bagian Journey / Perjalanan Burgerban -->
    <div class="bg-black text-light p-5 rounded-4 shadow-lg">
        <div class="text-center mb-5">
            <span class="text-uppercase text-secondary small fw-bold tracking-widest">Journey</span>
            <h2 class="fw-bold text-white fs-2">Perjalanan Burgerban</h2>
        </div>

        <!-- Timeline Grid / Cards -->
        <div class="row g-4">
            
            <!-- 2020 -->
            <div class="col-md-3 col-sm-6">
                <div class="card bg-white text-dark border-0 rounded-4 p-4 h-100 shadow">
                    <span class="badge bg-dark text-light rounded-pill align-self-start mb-3 px-3 py-2 fw-bold">2020</span>
                    <h4 class="fw-bold fs-5 mb-2">Lahirnya BurgerBan</h4>
                    <p class="text-muted small mb-0">Memulai langkah kecil melalui kuliner UMKM dengan sistem Pre-Order sampai seluruh Banyuwangi.</p>
                </div>
            </div>

            <!-- 2021 -->
            <div class="col-md-3 col-sm-6">
                <div class="card bg-white text-dark border-0 rounded-4 p-4 h-100 shadow">
                    <span class="badge bg-dark text-light rounded-pill align-self-start mb-3 px-3 py-2 fw-bold">2021</span>
                    <h4 class="fw-bold fs-5 mb-2">Outlet Pertama</h4>
                    <p class="text-muted small mb-0">Membuka outlet untuk pertama kali di Genteng untuk memudahkan customer datang langsung.</p>
                </div>
            </div>

            <!-- 2025 -->
            <div class="col-md-3 col-sm-6">
                <div class="card bg-white text-dark border-0 rounded-4 p-4 h-100 shadow">
                    <span class="badge bg-dark text-light rounded-pill align-self-start mb-3 px-3 py-2 fw-bold">2025</span>
                    <h4 class="fw-bold fs-5 mb-2">Istirahat Sementara</h4>
                    <p class="text-muted small mb-0">Kami tutup sementara sampai waktu ditentukan.</p>
                </div>
            </div>

            <!-- 2026 -->
            <div class="col-md-3 col-sm-6">
                <div class="card bg-white text-dark border-0 rounded-4 p-4 h-100 shadow" style="border-top: 5px solid #a3e635 !important;">
                    <span class="badge rounded-pill align-self-start mb-3 px-3 py-2 fw-bold" style="background-color: #a3e635; color: #000;">2026</span>
                    <h4 class="fw-bold fs-5 mb-2">Bangkit Kembali</h4>
                    <p class="text-muted small mb-0">Memulai lagi dengan konsep yang berbeda dari sebelumnya dan persiapan lebih matang.</p>
                </div>
            </div>

        </div>
    </div>

</div>
@endsection