<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Burgerban</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome untuk Icon Sosial Media -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-light d-flex flex-column min-vh-100">

    <!-- Header & Navbar Utama di Bagian Atas -->
    <header class="bg-white border-bottom py-3 mb-4">
        <div class="container d-flex justify-content-between align-items-center">
            <!-- Logo -->
            <a href="{{ route('order.index') }}" class="text-decoration-none d-flex align-items-center gap-2">
                <span class="fs-4">🍔</span>
                <span class="fw-bold fs-4 text-dark fst-italic">BURGERBAN</span>
            </a>

            <!-- Menu Navigasi -->
            <ul class="nav align-items-center gap-4 mb-0">
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('order.index', 'order.show') ? 'fw-bold text-dark border-bottom border-dark border-2 pb-1' : 'text-secondary' }} px-0" href="{{ route('order.index') }}">Menu</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('about') ? 'fw-bold text-dark border-bottom border-dark border-2 pb-1' : 'text-secondary' }} px-0" href="{{ route('about') }}">Tentang Kami</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('kemitraan') ? 'fw-bold text-dark border-bottom border-dark border-2 pb-1' : 'text-secondary' }} px-0" href="{{ route('kemitraan') }}">Kemitraan</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('big-order') ? 'fw-bold text-dark border-bottom border-dark border-2 pb-1' : 'text-secondary' }} px-0" href="{{ route('big-order') }}">Big Order</a>
                </li>
            </ul>
        </div>
    </header>

    <!-- Bagian Konten Utama Halaman -->
    <main class="flex-fill">
        @yield('content')
    </main>

    <!-- Footer Konsisten di Setiap Halaman -->
    <footer class="bg-black text-light pt-5 pb-3 mt-5">
        <div class="container">
            <div class="row gy-4 justify-content-between">
                
                <!-- Kolom 1: Logo & Quick Menu -->
                <div class="col-lg-3 col-md-4 col-6">
                    <h3 class="fw-bold text-white mb-4 fst-italic">Burgerban</h3>
                    <h6 class="fw-bold text-white mb-3">Quick Menu</h6>
                    <ul class="list-unstyled text-secondary small">
                        <li class="mb-2"><a href="{{ route('order.index') }}" class="text-decoration-none text-secondary">Menu</a></li>
                        <li class="mb-2"><a href="{{ route('big-order') }}" class="text-decoration-none text-secondary">Big Order</a></li>
                    </ul>
                </div>

                <!-- Kolom 2: Kemitraan -->
                <div class="col-lg-2 col-md-4 col-6">
                    <h6 class="fw-bold text-white mb-3 mt-lg-5">Kemitraan</h6>
                    <ul class="list-unstyled text-secondary small">
                        <li class="mb-2"><a href="#" class="text-decoration-none text-secondary">Kemitraan</a></li>
                    </ul>
                </div>

                <!-- Kolom 3: Tentang -->
                <div class="col-lg-2 col-md-4 col-6">
                    <h6 class="fw-bold text-white mb-3 mt-lg-5">Tentang</h6>
                    <ul class="list-unstyled text-secondary small">
                        <li class="mb-2"><a href="{{ route('about') }}" class="text-decoration-none text-secondary">Tentang Kami</a></li>
                    </ul>
                </div>

                <!-- Kolom 4: Head Office, Email & Social Media -->
                <div class="col-lg-4 col-md-8">
                    <div class="mb-3">
                        <p class="text-secondary small mb-1">Head Office Location</p>
                        <p class="text-white small fw-semibold mb-0">Genteng, Banyuwangi</p>
                    </div>
                    <div class="mb-3">
                        <p class="text-secondary small mb-1">Email</p>
                        <p class="text-white small fw-semibold mb-0">contactburgerban@gmail.com</p>
                    </div>
                    <div>
                        <p class="text-secondary small mb-2">Social Media</p>
                        <div class="d-flex gap-2">
                            <a href="#" class="btn btn-dark btn-sm rounded-circle border border-secondary text-light d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="btn btn-dark btn-sm rounded-circle border border-secondary text-light d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;"><i class="fab fa-tiktok"></i></a>
                        </div>
                    </div>
                </div>

            </div>

            <hr class="border-secondary my-4">

            <!-- Copyright & Kontak Kami -->
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                <p class="text-secondary small mb-3 mb-md-0">&copy; 2026 PT. Berlian Anugerah Numusi.</p>
                <a href="#" class="btn rounded-pill px-4 fw-bold" style="background-color: #a3e635; color: #000; border: none;">Kontak Kami</a>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>