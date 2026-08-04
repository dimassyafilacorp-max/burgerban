<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

// Route Halaman Utama (Menu)
Route::get('/', [OrderController::class, 'index'])->name('order.index');

// Route Detail Menu
Route::get('/menu/{id}', [OrderController::class, 'show'])->name('order.show');

// Route Proses Pesanan (Form Submit)
Route::post('/order', [OrderController::class, 'store'])->name('order.store');

// Route Halaman Tentang Kami (Langsung mengarah ke view about.blade.php)
Route::view('/tentang-kami', 'about')->name('about');

// Route Halaman Kemitraan
Route::view('/kemitraan', 'kemitraan')->name('kemitraan');

// Route Halaman Big Order
Route::view('/big-order', 'big-order')->name('big-order');