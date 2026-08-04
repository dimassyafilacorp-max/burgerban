@extends('layouts.app')

@section('content')
<div class="container-fluid px-0">

    <!-- BAGIAN 1: HERO SECTION -->
    <section class="text-white py-5 position-relative" style="background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;">
        <div class="container py-5 text-center text-lg-start">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <h1 class="fw-bold display-5 mb-3">Jadi Bagian dari Burgerban, The Fastest Growing Local Burger in Indonesia</h1>
                    <p class="lead text-light mb-4 opacity-75">
                        Pilih program kemitraan fleksibel Burgerban—mulai dari suplai putus B2B, konsinyasi, hingga co-branding untuk mengembangkan bisnis Anda bersama kami.
                    </p>
                    <a href="#program-kemitraan" class="btn btn-success btn-lg fw-bold px-4 rounded-pill" style="background-color: #a3e635; color: #000; border: none;">Lihat Pilihan Program</a>
                </div>
            </div>
        </div>
    </section>

    <!-- BAGIAN 2: PILIH PROGRAM KEMITRAAN (3 MENU UTAMA) -->
    <section id="program-kemitraan" class="py-5 bg-light">
        <div class="container py-4">
            <h2 class="fw-bold text-center mb-5" style="color: #65a30d;">Pilih Program Kemitraan Anda</h2>
            <div class="row g-4 justify-content-center">
                
                <!-- 1. Suplai Putus (B2B Wholesale) -->
                <div class="col-lg-4 col-md-6">
                    <div class="card border-0 rounded-4 shadow-sm h-100 p-4 position-relative bg-white" style="border-top: 5px solid #a3e635 !important;">
                        <div class="card-body p-0 d-flex flex-column">
                            <div class="mb-3">
                                <span class="badge rounded-pill px-3 py-2 fw-bold text-dark" style="background-color: #a3e635;">B2B Wholesale</span>
                            </div>
                            <h3 class="fw-bold fs-4 mb-3 text-dark">Suplai Putus</h3>
                            <p class="text-muted small mb-4">
                                Mitra membeli paket bahan baku secara berkala sesuai kebutuhan stok operasional kedai/resto mitra.
                            </p>
                            
                            <div class="bg-light p-3 rounded-3 mb-4 mt-auto">
                                <p class="fw-bold small text-dark mb-2">Terdapat 2 paket kerja sama:</p>
                                <ul class="list-unstyled small text-muted mb-0">
                                    <li class="mb-1">✓ <strong>1. Paket 8 porsi</strong></li>
                                    <li>✓ <strong>2. Paket 10 porsi</strong></li>
                                </ul>
                            </div>

                            <a href="#konsultasi" class="btn btn-dark rounded-pill fw-bold py-2 w-100">Pilih Suplai Putus</a>
                        </div>
                    </div>
                </div>

                <!-- 2. Sistem Konsinyasi / Titip Jual -->
                <div class="col-lg-4 col-md-6">
                    <div class="card border-0 rounded-4 shadow-sm h-100 p-4 position-relative bg-white" style="border-top: 5px solid #212529 !important;">
                        <div class="card-body p-0 d-flex flex-column">
                            <div class="mb-3">
                                <span class="badge bg-dark text-light rounded-pill px-3 py-2 fw-bold">Titip Jual</span>
                            </div>
                            <h3 class="fw-bold fs-4 mb-3 text-dark">Sistem Konsinyasi</h3>
                            <p class="text-muted small mb-4">
                                Disesuaikan jika anda juga menitipkan produk siap olah / frozen, namun umumnya untuk bahan baku murni menggunakan sistem jual-putus dengan minimum pesanan.
                            </p>

                            <div class="bg-light p-3 rounded-3 mb-4 mt-auto">
                                <p class="fw-bold small text-dark mb-1">Ketentuan:</p>
                                <p class="small text-muted mb-0">Fleksibel berdasarkan produk frozen & sistem jual-putus minimum pesanan.</p>
                            </div>

                            <a href="#konsultasi" class="btn btn-dark rounded-pill fw-bold py-2 w-100">Pilih Konsinyasi</a>
                        </div>
                    </div>
                </div>

                <!-- 3. Co-Branding / Dukungan Menu -->
                <div class="col-lg-4 col-md-6">
                    <div class="card border-0 rounded-4 shadow-sm h-100 p-4 position-relative bg-white" style="border-top: 5px solid #a3e635 !important;">
                        <div class="card-body p-0 d-flex flex-column">
                            <div class="mb-3">
                                <span class="badge rounded-pill px-3 py-2 fw-bold text-dark" style="background-color: #a3e635;">Partner Brand</span>
                            </div>
                            <h3 class="fw-bold fs-4 mb-3 text-dark">Co-Branding / Dukungan Menu</h3>
                            <p class="text-muted small mb-4">
                                Kami memperbolehkan mitra mencantumkan menu burger kami di buku menu mereka atau menggunakan brand kami sebagai varian partner brand.
                            </p>

                            <div class="bg-light p-3 rounded-3 mb-4 mt-auto">
                                <p class="fw-bold small text-dark mb-1">Keuntungan:</p>
                                <p class="small text-muted mb-0">Menambah variasi menu tanpa harus merintis brand baru dari awal.</p>
                            </div>

                            <a href="#konsultasi" class="btn btn-dark rounded-pill fw-bold py-2 w-100">Pilih Co-Branding</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- BAGIAN 3: CARA KERJA KEMITRAAN -->
    <section class="py-5 bg-white">
        <div class="container py-4">
            <h2 class="fw-bold text-center mb-5" style="color: #65a30d;">Cara Kerja Kemitraan Burgerban</h2>
            <div class="row g-4">
                <div class="col-lg-4">
                    <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-light">
                        <span class="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-2 rounded-pill mb-3" style="width: fit-content; color: #65a30d !important;">STEP 1</span>
                        <h5 class="fw-bold mb-3">Pilih Program & Konsultasi</h5>
                        <p class="text-muted small mb-0">Tentukan apakah Anda ingin mengambil program Suplai Putus, Konsinyasi, atau Co-Branding sesuai kebutuhan bisnis Anda.</p>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-light">
                        <span class="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-2 rounded-pill mb-3" style="width: fit-content; color: #65a30d !important;">STEP 2</span>
                        <h5 class="fw-bold mb-3">Proses & Pengelolaan Tim</h5>
                        <p class="text-muted small mb-0">Tim profesional Burgerban siap mendampingi dari penyiapan bahan baku hingga suplai produk secara berkala.</p>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-light">
                        <span class="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-2 rounded-pill mb-3" style="width: fit-content; color: #65a30d !important;">STEP 3</span>
                        <h5 class="fw-bold mb-3">Bisnis Berjalan & Berkembang</h5>
                        <p class="text-muted small mb-0">Nikmati pertumbuhan bisnis F&B Anda bersama dukungan brand lokal yang kuat dan terpercaya di Indonesia.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- BAGIAN 4: FORM KONSULTASI -->
    <section class="py-5 bg-light">
        <div class="container py-4">
            <div id="konsultasi" class="card border-0 shadow rounded-4 p-4 p-lg-5 text-white" style="background-color: #1a1a1a;">
                <h3 class="fw-bold mb-2">Konsultasi Kemitraan Burgerban</h3>
                <p class="text-secondary small mb-4">Tidak ada komitmen apapun. Tim kami akan menghubungi Anda via WhatsApp untuk menjelaskan seluruh skema dan menjawab pertanyaan Anda.</p>
                
                <form action="#" method="POST">
                    @csrf
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label small text-secondary">Nama Lengkap <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="Jane Doe" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small text-secondary">Email <span class="text-danger">*</span></label>
                            <input type="email" class="form-control" placeholder="janedoe@gmail.com" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small text-secondary">No. Telepon <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="08xxxxxxxxxx" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small text-secondary">Jenis Kemitraan <span class="text-danger">*</span></label>
                            <select class="form-select" required>
                                <option value="" selected disabled>Pilih jenis kemitraan</option>
                                <option>Suplai Putus (B2B Wholesale)</option>
                                <option>Sistem Konsinyasi / Titip Jual</option>
                                <option>Co-Branding / Dukungan Menu</option>
                            </select>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label small text-secondary">Estimasi Kebutuhan / Skala Bisnis <span class="text-danger">*</span></label>
                            <select class="form-select" required>
                                <option value="" selected disabled>Pilih estimasi kebutuhan</option>
                                <option>Paket 8 Porsi</option>
                                <option>Paket 10 Porsi</option>
                                <option>Skala Besar / Kedai / Resto</option>
                            </select>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label small text-secondary">Saya ingin tahu lebih lanjut tentang <span class="text-danger">*</span></label>
                            <textarea class="form-control" rows="3" placeholder="Tuliskan pesan di sini" required></textarea>
                            <small class="text-muted">Minimal 10 karakter.</small>
                        </div>
                        <div class="col-12 text-center mt-4">
                            <button type="submit" class="btn btn-success fw-bold px-5 py-2 rounded-pill" style="background-color: #a3e635; color: #000; border: none;">Jadwalkan Konsultasi Gratis →</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

</div>
@endsection