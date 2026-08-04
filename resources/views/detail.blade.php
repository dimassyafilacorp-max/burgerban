@extends('layouts.app')

@section('content')
<div class="container py-5">
    <div class="row">
        <!-- Kolom Kiri: Form Detail Pesanan -->
        <div class="col-lg-5 mb-4">
            <div class="card shadow-sm border-0 rounded-4 p-4">
                <h4 class="fw-bold mb-3">📋 Detail Pesanan</h4>
                
                <form action="{{ route('order.store') }}" method="POST">
                    @csrf
                    <input type="hidden" name="item_ordered" value="{{ $menu['name'] }}">
                    <input type="hidden" name="price" value="{{ $menu['price'] }}">

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Nama Penerima</label>
                        <input type="text" name="name" class="form-control" placeholder="Masukkan nama lengkap" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Alamat Lengkap Pengiriman</label>
                        <textarea name="address" class="form-control" rows="3" placeholder="Jalan, No. Rumah, Patokan..." required></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-semibold">Metode Pembayaran</label>
                        <select name="payment_method" class="form-select" required>
                            <option value="">-- Pilih Pembayaran --</option>
                            <option value="COD">COD (Bayar di Tempat)</option>
                            <option value="QRIS">QRIS</option>
                        </select>
                    </div>

                    <hr>

                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Menu Dipilih:</span>
                        <span class="fw-bold text-end">{{ $menu['name'] }}</span>
                    </div>
                    <div class="d-flex justify-content-between mb-4">
                        <span class="fw-bold">Total Harga:</span>
                        <span class="fw-bold text-danger">Rp {{ number_format($menu['price'], 0, ',', '.') }}</span>
                    </div>

                    <button type="submit" class="btn btn-dark w-100 rounded-pill py-2 fw-semibold">
                        Pesan Sekarang
                    </button>
                </form>
            </div>
        </div>

        <!-- Kolom Kanan: Informasi Produk & Menu Serupa -->
        <div class="col-lg-7">
            <div class="card shadow-sm border-0 rounded-4 p-4 mb-4">
                <div class="row align-items-center">
                    <div class="col-md-5 mb-3 mb-md-0">
                        <img src="{{ $menu['image'] }}" class="img-fluid rounded-4 object-fit-cover" style="height: 180px; width: 100%;" alt="{{ $menu['name'] }}">
                    </div>
                    <div class="col-md-7">
                        <h3 class="fw-bold mb-2">{{ $menu['name'] }}</h3>
                        <h5 class="text-danger fw-bold mb-3">Rp {{ number_format($menu['price'], 0, ',', '.') }}</h5>
                        <p class="text-muted small">{{ $menu['desc'] }}</p>
                    </div>
                </div>
            </div>

            <h5 class="fw-bold mb-3">Menu Serupa Lainnya</h5>
            <div class="row">
                @foreach($similarMenus as $sim)
                <div class="col-md-6 mb-3">
                    <div class="card h-100 shadow-sm border-0 rounded-4 p-3">
                        <div class="d-flex align-items-center">
                            <img src="{{ $sim['image'] }}" class="rounded-3 me-3 object-fit-cover" style="width: 60px; height: 60px;" alt="{{ $sim['name'] }}">
                            <div>
                                <h6 class="fw-bold mb-1" style="font-size: 14px;">{{ $sim['name'] }}</h6>
                                <p class="text-danger fw-bold small mb-2">Rp {{ number_format($sim['price'], 0, ',', '.') }}</p>
                                <a href="{{ route('order.show', $sim['id']) }}" class="btn btn-sm btn-outline-dark rounded-pill px-3 py-0" style="font-size: 12px;">Lihat Detail</a>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
@endsection