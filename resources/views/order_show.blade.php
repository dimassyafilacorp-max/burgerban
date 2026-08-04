@extends('layouts.app')

@section('content')
<div class="container py-5">
    
    <!-- Breadcrumb Navigasi -->
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="{{ route('order.index') }}" class="text-decoration-none text-muted">Home</a></li>
            <li class="breadcrumb-item"><a href="{{ route('order.index') }}" class="text-decoration-none text-muted">Menu</a></li>
            <li class="breadcrumb-item active text-dark fw-bold" aria-current="page">{{ $package['name'] }}</li>
        </ol>
    </nav>

    <div class="row">
        <!-- Kolom Kiri: Form Detail Pesanan -->
        <div class="col-lg-5 mb-4 mb-lg-0">
            <div class="card shadow-sm border-0 p-4 sticky-top rounded-4" style="top: 90px;">
                <h4 class="mb-3 fw-bold fs-5"><i class="fas fa-receipt text-warning me-2"></i>Detail Pesanan</h4>
                
                <form action="{{ route('order.store') }}" method="POST">
                    @csrf
                    <input type="hidden" name="item_ordered" value="{{ $package['name'] }}">
                    <input type="hidden" name="price" value="{{ $package['price'] }}">

                    <div class="mb-3">
                        <label for="name" class="form-label small fw-semibold">Nama Penerima</label>
                        <input type="text" class="form-control form-control-sm" id="name" name="name" placeholder="Masukkan nama lengkap" required>
                    </div>

                    <div class="mb-3">
                        <label for="address" class="form-label small fw-semibold">Alamat Lengkap Pengiriman</label>
                        <textarea class="form-control form-control-sm" id="address" name="address" rows="3" placeholder="Jalan, No. Rumah, Patokan..." required></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label small fw-semibold">Metode Pembayaran</label>
                        <select class="form-select form-select-sm" name="payment_method" id="payment_method" required>
                            <option value="">-- Pilih Pembayaran --</option>
                            <option value="COD">COD (Bayar di Tempat)</option>
                            <option value="QRIS">QRIS (Scan & Bayar)</option>
                        </select>
                    </div>

                    <!-- Simulasi Tampilan QRIS -->
                    <div id="qris-container" class="text-center mb-3 d-none p-3 bg-light rounded border">
                        <p class="small text-muted fw-bold mb-2">Scan QRIS:</p>
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=SimulasiQRISBurgerban" alt="QRIS Code" class="img-thumbnail mb-2">
                        <p class="text-danger small mb-0 fw-semibold">Bebas Biaya Admin</p>
                    </div>

                    <div class="border-top pt-3 mb-3">
                        <div class="d-flex justify-content-between mb-2 small">
                            <span class="text-muted">Menu Dipilih:</span>
                            <span class="fw-bold text-end text-dark">{{ $package['name'] }}</span>
                        </div>
                        <div class="d-flex justify-content-between fs-6 fw-bold">
                            <span>Total Harga:</span>
                            <span class="text-danger">Rp {{ number_format($package['price'], 0, ',', '.') }}</span>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-dark w-100 py-2 fw-bold rounded-pill shadow-sm">
                        Pesan Sekarang
                    </button>
                </form>
            </div>
        </div>

        <!-- Kolom Kanan: Detail Menu yang Diklik & Menu Serupa Lainnya -->
        <div class="col-lg-7">
            
            <!-- Card Menu Utama yang Dipilih -->
            <div class="card shadow-sm border-0 p-4 rounded-4 mb-4 bg-white">
                <div class="row align-items-center">
                    <div class="col-md-5 text-center mb-3 mb-md-0">
                        <img src="{{ $package['image'] }}" class="img-fluid rounded-3 object-fit-contain" style="max-height: 180px;" alt="{{ $package['name'] }}">
                    </div>
                    <div class="col-md-7">
                        <h3 class="fw-bold text-dark mb-1">{{ $package['name'] }}</h3>
                        <h5 class="text-danger fw-bold mb-3">Rp {{ number_format($package['price'], 0, ',', '.') }}</h5>
                        <p class="text-muted small mb-0">Udah waktunya move on dari yang hobi ghosting dan pilih yang pasti-pasti aja, kayak Juragan yang pasti bikin kenyang.</p>
                    </div>
                </div>
            </div>

            <!-- Menu Serupa Lainnya -->
            <h5 class="fw-bold text-dark mb-3">Menu Serupa Lainnya</h5>
            <div class="row g-3">
                @if(isset($packages))
                    @foreach($packages as $pkg)
                        @if($pkg['id'] != $package['id'])
                        <div class="col-md-6">
                            <div class="card shadow-sm border-0 rounded-4 p-3 h-100 d-flex flex-row align-items-center">
                                <img src="{{ $pkg['image'] }}" class="rounded-3 me-3" style="width: 80px; height: 80px; object-fit: cover;" alt="{{ $pkg['name'] }}">
                                <div class="flex-grow-1">
                                    <h6 class="fw-bold text-dark mb-1">{{ $pkg['name'] }}</h6>
                                    <p class="text-danger fw-bold small mb-2">Rp {{ number_format($pkg['price'], 0, ',', '.') }}</p>
                                    <a href="{{ route('order.show', $pkg['id']) }}" class="btn btn-outline-dark btn-sm rounded-pill px-3 py-1" style="font-size: 11px;">Lihat Detail</a>
                                </div>
                            </div>
                        </div>
                        @endif
                    @endforeach
                @endif
            </div>

        </div>
    </div>
</div>

<script>
    const paymentMethod = document.getElementById('payment_method');
    const qrisContainer = document.getElementById('qris-container');

    paymentMethod.addEventListener('change', function() {
        if(this.value === 'QRIS') {
            qrisContainer.classList.remove('d-none');
        } else {
            qrisContainer.classList.add('d-none');
        }
    });
</script>
@endsection