@extends('layouts.app')

@section('content')
<div class="container-fluid px-0">

    <!-- BAGIAN 1: HERO SECTION -->
    <section class="text-white py-5 position-relative" style="background: linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;">
        <div class="container py-5">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <h1 class="fw-bold display-5 mb-3">Solusi Praktis Untuk Konsumsi Acara, Diskon Hingga 10%</h1>
                    <p class="lead text-light mb-4 opacity-75">
                        Cocok untuk wedding, corporate event, hingga kumpul keluarga. Minimum pemesanan 50 pcs, semua kebutuhan konsumsi tersiapkan dengan rapi.
                    </p>
                    <a href="#form-pemesanan" class="btn btn-success btn-lg fw-bold px-4 rounded-pill" style="background-color: #a3e635; color: #000; border: none;">Isi Form Pemesanan</a>
                </div>
            </div>
        </div>
    </section>

    <!-- BAGIAN 2: MENU FAVORIT BIG ORDER -->
    <section class="py-5 bg-light">
        <div class="container py-4">
            <h2 class="fw-bold text-center mb-5" style="color: #65a30d;">Menu Favorit Burgerban Big Order</h2>
            <div class="row g-4 justify-content-center">
                
                @foreach([
                    ['Juragan', 'Burger', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'],
                    ['Ningrat', 'Burger', 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80'],
                    ['Jelata', 'Cobain dari Jelata dijamin...', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80'],
                    ['Jelata Cheese', 'Cheese Burger', 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80']
                ] as $menu)
                <div class="col-lg-3 col-md-6">
                    <div class="card border-0 shadow-sm rounded-4 p-3 h-100 bg-white">
                        <div class="position-relative mb-3">
                            <span class="position-absolute top-0 start-0 badge bg-success p-2 rounded-circle shadow-sm" style="background-color: #a3e635 !important; color:#000;">👍</span>
                            <img src="{{ $menu[2] }}" class="card-img-top rounded-3 object-fit-cover" style="height: 180px;" alt="{{ $menu[0] }}">
                        </div>
                        <h5 class="fw-bold text-dark mb-1">{{ $menu[0] }}</h5>
                        <p class="text-muted small mb-0">{{ $menu[1] }}</p>
                    </div>
                </div>
                @endforeach

            </div>
            <div class="text-center mt-4">
                <a href="{{ route('order.index') }}" class="btn btn-outline-success rounded-pill px-4 fw-semibold py-2" style="border-color: #a3e635; color: #65a30d;">Lihat Semua Menu</a>
            </div>
        </div>
    </section>

    <!-- BAGIAN 3: KEUNGGULAN BIG ORDER -->
    <section class="py-5 bg-white">
        <div class="container py-4">
            <h2 class="fw-bold text-center mb-5" style="color: #65a30d;">Keuntungan Burgerban Big Order</h2>
            <div class="row g-4">
                
                <div class="col-lg-4 col-md-6">
                    <div class="bg-dark text-white rounded-4 p-4 h-100 shadow-sm">
                        <div class="fs-2 mb-3 text-success">%</div>
                        <h5 class="fw-bold mb-2">Pesan Banyak, Diskon Hingga 10%</h5>
                        <p class="text-secondary small mb-0">Pesan dalam jumlah besar dan nikmati diskon spesial hingga 10%.</p>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6">
                    <div class="rounded-4 p-4 h-100 shadow-sm text-dark" style="background-color: #a3e635;">
                        <div class="fs-2 mb-3">🍔</div>
                        <h5 class="fw-bold mb-2">50 Burger Mulai 750 Ribuan</h5>
                        <p class="small mb-0 opacity-75">Burger Mulai 15 ribuan, cukup untuk konsumsi acaramu dengan harga yang ramah di kantong.</p>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6">
                    <div class="bg-dark text-white rounded-4 p-4 h-100 shadow-sm">
                        <div class="fs-2 mb-3 text-success">🏪</div>
                        <h5 class="fw-bold mb-2">Siap Layani hingga 3.000+ Pcs</h5>
                        <p class="text-secondary small mb-0">Acara kecil atau ribuan tamu, kapasitas kami selalu siap.</p>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6">
                    <div class="rounded-4 p-4 h-100 shadow-sm text-dark" style="background-color: #a3e635;">
                        <div class="fs-2 mb-3">🛡️</div>
                        <h5 class="fw-bold mb-2">Fresh & Bersertifikat Halal</h5>
                        <p class="small mb-0 opacity-75">Dibuat fresh, bersertifikat halal. Aman untuk semua tamu undanganmu.</p>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6">
                    <div class="bg-dark text-white rounded-4 p-4 h-100 shadow-sm">
                        <div class="fs-2 mb-3 text-success">👥</div>
                        <h5 class="fw-bold mb-2">Sudah dipercaya di 1000+ Acara</h5>
                        <p class="text-secondary small mb-0">Dari wedding, acara corporate, hingga acara sekolah, kami selalu siap hadir.</p>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6">
                    <div class="rounded-4 p-4 h-100 shadow-sm text-dark" style="background-color: #a3e635;">
                        <div class="fs-2 mb-3">🚚</div>
                        <h5 class="fw-bold mb-2">Gratis Ongkir se-JABODETABEK!</h5>
                        <p class="small mb-0 opacity-75">Pemesanan khusus Booth, Mobile Van, dan Food Truck di daerah Jabodetabek.</p>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- BAGIAN 4: LAYANAN BURGERBAN BIG ORDER -->
    <section class="py-5 bg-light">
        <div class="container py-4">
            <h2 class="fw-bold text-center mb-2" style="color: #65a30d;">Layanan Burgerban Big Order</h2>
            <p class="text-center text-muted mb-5 small">Dipercaya di ratusan acara, kami hadir dengan layanan yang fleksibel sesuai kebutuhanmu.</p>
            
            <div class="row g-4 justify-content-center">
                <div class="col-lg-5">
                    <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                        <h4 class="fw-bold text-dark text-center mb-4">Big Order</h4>
                        <ul class="list-unstyled text-muted small">
                            <li class="d-flex justify-content-between py-2 border-bottom"><span>Minimal Order</span> <strong class="text-dark">50 pcs per pesanan</strong></li>
                            <li class="d-flex justify-content-between py-2 border-bottom"><span>Packaging Box</span> <strong class="text-dark">Dikemas rapi menggunakan box</strong></li>
                            <li class="d-flex justify-content-between py-2 border-bottom"><span>Pengiriman via Gosend</span> <strong class="text-dark">Dari outlet terdekat ke alamat tujuan</strong></li>
                            <li class="d-flex justify-content-between py-2 border-bottom"><span>Ongkir Sesuai Jarak</span> <strong class="text-dark">Biaya pengiriman menyesuaikan alamat tujuan</strong></li>
                            <li class="d-flex justify-content-between py-2"><span>Bebas Pilih Menu</span> <strong class="text-dark">Maksimal 3 varian dalam satu pesanan</strong></li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-5">
                    <div class="card border-2 shadow rounded-4 p-4 h-100 bg-white" style="border-color: #a3e635 !important;">
                        <h4 class="fw-bold text-dark text-center mb-4">Booth</h4>
                        <ul class="list-unstyled text-muted small">
                            <li class="d-flex justify-content-between py-2 border-bottom"><span>Minimal Order</span> <strong class="text-danger">Senilai Rp 3.000.000</strong></li>
                            <li class="d-flex justify-content-between py-2 border-bottom"><span>Free Ongkir</span> <strong class="text-danger">Area JABODETABEK</strong></li>
                            <li class="d-flex justify-content-between py-2 border-bottom"><span>Bebas Pilih Menu</span> <strong class="text-dark">Maksimal 3 varian dalam satu pesanan</strong></li>
                            <li class="d-flex justify-content-between py-2 border-bottom"><span>Burger Ready to Serve</span> <strong class="text-dark">Siap saji, langsung bisa dihidangkan</strong></li>
                            <li class="d-flex justify-content-between py-2"><span>Include Man Power & Microwave</span> <strong class="text-dark">Sudah termasuk crew dan peralatan</strong></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- BAGIAN 5: SIMULATOR DISKON PEMBELIAN -->
    <section class="py-5 bg-dark text-white">
        <div class="container py-4">
            <h2 class="fw-bold mb-1">Diskon Pembelian Burgerban Big Order</h2>
            <p class="text-secondary small mb-4">Semakin Banyak Beli, Semakin Hemat. Geser untuk lihat berapa diskon yang kamu dapat.</p>
            
            <div class="bg-black border border-secondary rounded-4 p-4">
                <h3 class="fw-bold mb-3" id="qtyDisplay">50 pcs</h3>
                
                <!-- Custom Slider Container -->
                <div class="position-relative my-4" style="height: 30px;">
                    <!-- Track Background -->
                    <div class="position-absolute w-100 rounded-pill" style="height: 6px; background-color: #4b5563; top: 12px;"></div>
                    <!-- Track Fill Hijau -->
                    <div id="trackFill" class="position-absolute rounded-pill" style="height: 6px; background-color: #a3e635; top: 12px; left: 0; width: 0%;"></div>
                    
                    <!-- Input Range Transparan -->
                    <input type="range" id="discountRange" class="position-absolute w-100 m-0 opacity-0" style="top: 5px; cursor: pointer; z-index: 3;" min="50" max="450" step="1" value="50">
                    
                    <!-- Thumb / Bola Indikator Custom -->
                    <div id="sliderThumb" class="position-absolute rounded-circle shadow" style="width: 20px; height: 20px; background-color: #a3e635; border: 3px solid #fff; top: 5px; transform: translateX(-50%); pointer-events: none; z-index: 2; left: 0%;"></div>
                </div>

                <!-- Label Titik Marker Proporsional & Natural -->
                <div class="position-relative text-secondary small mb-4" style="height: 20px;">
                    <span class="position-absolute start-0" style="transform: translateX(0%);">50</span>
                    <span class="position-absolute" style="left: 12.5%; transform: translateX(-50%);">100</span>
                    <span class="position-absolute" style="left: 50%; transform: translateX(-50%);">250</span>
                    <span class="position-absolute end-0" style="transform: translateX(0%);">450</span>
                </div>

                <div class="bg-secondary bg-opacity-25 rounded-3 p-3 d-flex justify-content-between align-items-center">
                    <span class="fw-semibold">Diskon Kamu</span>
                    <span class="fs-4 fw-bold" id="discountDisplay" style="color: #a3e635;">5%</span>
                </div>
                
                <p class="small mt-3 mb-0" id="targetInfo" style="color: #a3e635 !important;">Tambah 51 pcs lagi untuk dapat diskon 7%!</p>
            </div>
        </div>
    </section>

    <!-- BAGIAN 6: CARA PEMESANAN -->
    <section class="py-5 text-white" style="background-color: #a3e635;">
        <div class="container py-4 text-center">
            <h2 class="fw-bold text-dark mb-5">Cara Pemesanan Burgerban Big Order</h2>
            
            <div class="row g-3 justify-content-center">
                @foreach([
                    ['1', 'Isi Form Pemesanan di Bawah dengan Lengkap'],
                    ['2', 'Hubungi nomor admin untuk pemesanan.'],
                    ['3', 'Invoice akan dikirim lewat WhatsApp.'],
                    ['4', 'Kirim bukti pembayaran via WhatsApp.'],
                    ['5', 'Pesanan diantar sesuai waktu yang sudah ditentukan.']
                ] as $step)
                <div class="col-lg-2 col-md-4 col-6">
                    <div class="card bg-white text-dark border-0 p-3 h-100 rounded-4 shadow-sm">
                        <div class="badge text-white fw-bold mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center" style="width: 35px; height: 35px; background-color: #65a30d !important;">{{ $step[0] }}</div>
                        <p class="small text-secondary mb-0">{{ $step[1] }}</p>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    <!-- BAGIAN 7: FORM PEMESANAN BIG ORDER -->
    <section id="form-pemesanan" class="py-5 bg-white">
        <div class="container py-4">
            <div class="card border-0 shadow rounded-4 p-4 p-lg-5 text-white" style="background-color: #1a1a1a;">
                <h3 class="fw-bold mb-1">Pemesanan Burgerban Big Order</h3>
                <p class="text-secondary small mb-4">Pesan Big Order sekarang dan dapatkan diskon up to 10%!</p>
                
                <form action="#" method="POST">
                    @csrf
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label small text-secondary">Nama Lengkap <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="Jane Doe" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small text-secondary">Tanggal Acara</label>
                            <input type="date" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small text-secondary">No. Telepon <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="08xxxxxxxxxx" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small text-secondary">Jumlah Pesanan</label>
                            <input type="number" class="form-control" placeholder="Minimal order 50 Pcs">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small text-secondary">Jenis Layanan</label>
                            <select class="form-select">
                                <option value="" selected disabled>Pilih jenis layanan</option>
                                <option>Big Order</option>
                                <option>Booth</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small text-secondary">Lokasi Acara</label>
                            <textarea class="form-control" rows="1" placeholder="Masukkan alamat lengkap lokasi acaramu"></textarea>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label small text-secondary">Jenis Acara</label>
                            <select class="form-select">
                                <option value="" selected disabled>Pilih jenis Acara</option>
                                <option>Wedding</option>
                                <option>Corporate Event</option>
                                <option>Kumpul Keluarga</option>
                            </select>
                        </div>
                        <div class="col-12 text-center mt-4">
                            <button type="submit" class="btn fw-bold px-5 py-2 rounded-pill" style="background-color: #a3e635; color: #000; border: none;">Kirim Form Pemesanan</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

</div>

<!-- SCRIPT SINGLE SLIDER PROPOSIONAL -->
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const range = document.getElementById('discountRange');
        const qtyDisplay = document.getElementById('qtyDisplay');
        const discountDisplay = document.getElementById('discountDisplay');
        const targetInfo = document.getElementById('targetInfo');
        const trackFill = document.getElementById('trackFill');
        const sliderThumb = document.getElementById('sliderThumb');

        function updateUI(qty) {
            qtyDisplay.innerText = qty + " pcs";

            let discount = 5;
            let nextTarget = 101;
            let nextDiscount = 7;

            if (qty >= 451) {
                discount = 10;
                nextTarget = null;
            } else if (qty >= 251) {
                discount = 8;
                nextTarget = 451;
                nextDiscount = 10;
            } else if (qty >= 101) {
                discount = 7;
                nextTarget = 251;
                nextDiscount = 8;
            } else {
                discount = 5;
                nextTarget = 101;
                nextDiscount = 7;
            }

            discountDisplay.innerText = discount + "%";

            if (nextTarget !== null) {
                let kekurangan = nextTarget - qty;
                targetInfo.innerText = `Tambah ${kekurangan} pcs lagi untuk dapat diskon ${nextDiscount}%!`;
            } else {
                targetInfo.innerText = `Anda sudah mendapatkan diskon maksimal sebesar 10%!`;
            }

            let percent = ((qty - 50) / 400) * 100;
            sliderThumb.style.left = percent + "%";
            trackFill.style.width = percent + "%";
        }

        range.addEventListener('input', function () {
            let qty = parseInt(this.value);
            updateUI(qty);
        });

        updateUI(50);
    });
</script>
@endsection