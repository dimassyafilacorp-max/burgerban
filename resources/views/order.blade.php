@extends('layouts.app')

@section('content')
<div class="container py-5">
    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show shadow-sm mb-4" role="alert">
            <i class="fas fa-check-circle me-2"></i> {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    <!-- Judul & Keterangan -->
    <div class="mb-4">
        <h2 class="fw-bold text-dark">Rekomendasi Menu Untuk Setiap Mood Kamu</h2>
        <p class="text-muted">Temukan pilihan menu favorit kami yang cocok dinikmati di berbagai suasana dan momen.</p>
    </div>

    <!-- Grid Menu Unggulan -->
    <div class="row g-4">
        @foreach($packages as $pkg)
        <div class="col-lg-3 col-md-6 mb-3">
            <div class="card card-menu h-100 shadow-sm border-0 rounded-4 p-3">
                <img src="{{ $pkg['image'] }}" class="card-img-top object-fit-contain menu-img rounded-3" alt="{{ $pkg['name'] }}" style="height: 160px;">
                <div class="card-body d-flex flex-column px-2">
                    <h5 class="fw-bold text-dark mb-1">{{ $pkg['name'] }}</h5>
                    <p class="text-muted small mb-2">Burger Unggulan</p>
                    <h6 class="text-danger fw-bold mb-4">Rp {{ number_format($pkg['price'], 0, ',', '.') }}</h6>
                    <a href="{{ route('order.show', $pkg['id']) }}" class="btn btn-outline-dark rounded-pill w-100 py-2 fw-semibold mt-auto">
                        Pilih Menu
                    </a>
                </div>
            </div>
        </div>
        @endforeach
    </div>
</div>
@endsection