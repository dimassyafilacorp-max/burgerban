<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Http;

class OrderController extends Controller
{
    /**
     * Daftar seluruh menu Burgerban
     */
    private array $packages = [
        'p1' => [
            'id' => 'p1', 
            'name' => 'BANBOX A', 
            'price' => 35000,
            'desc' => 'Cobain dari Jelata dijamin bikin lidah ketagihan dengan keju lelehnya.',
            'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80'
        ],
        'p2' => [
            'id' => 'p2', 
            'name' => 'BANBOX B', 
            'price' => 38000,
            'desc' => 'Udah waktunya move on dari yang hobi ghosting dan pilih yang pasti-pasti aja, kayak Juragan yang pasti bikin kenyang.',
            'image' => 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80'
        ],
        'p3' => [
            'id' => 'p3', 
            'name' => 'BBC A', 
            'price' => 35000,
            'desc' => 'Burger porsi mewah dengan keju melimpah khusus untuk para sultan.',
            'image' => 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80'
        ],
        'p4' => [
            'id' => 'p4', 
            'name' => 'BBC B', 
            'price' => 38000,
            'desc' => 'Rasa berkelas ala bangsawan dalam setiap gigitan burger.',
            'image' => 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=400&q=80'
        ],
        'p5' => [
            'id' => 'p5', 
            'name' => 'MINIBAN B', 
            'price' => 35000,
            'desc' => 'Perpaduan saus BBQ smoked beef khas dengan lelehan keju.',
            'image' => 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=400&q=80'
        ],
        'p6' => [
            'id' => 'p6', 
            'name' => 'MINIBAN B', 
            'price' => 38000,
            'desc' => 'Burger jumbo ekstra tebal dengan sensasi keju lumer luar biasa.',
            'image' => 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80'
        ],
    ];

    public function index()
    {
        $packages = $this->packages;
        $additionals = [];

        return view('order', compact('packages', 'additionals'));
    }

    public function show(string $id)
    {
        if (!array_key_exists($id, $this->packages)) {
            abort(404);
        }

        // Variabel untuk menu yang sedang dipilih
        $package = $this->packages[$id];
        
        // Seluruh daftar menu (untuk ditampilkan sebagai menu serupa/pilihan lain)
        $packages = $this->packages;

        return view('order_show', compact('package', 'packages'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'address' => 'required|string',
            'item_ordered' => 'required|string',
            'price' => 'required|integer',
            'payment_method' => 'required|in:COD,QRIS',
        ]);

        // 1. Simpan pesanan ke database
        $order = Order::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'item_ordered' => $request->item_ordered,
            'price' => $request->price,
            'payment_method' => $request->payment_method,
        ]);

        // 2. Format pesan WhatsApp untuk Admin
        $message = "🚨 *ADA PESANAN MASUK BARU!* 🚨\n\n" .
                   "👤 *Nama:* {$order->name}\n" .
                   "📱 *No. HP:* {$order->phone}\n" .
                   "🍔 *Menu:* {$order->item_ordered}\n" .
                   "💰 *Total:* Rp " . number_format($order->price, 0, ',', '.') . "\n" .
                   "💳 *Pembayaran:* {$order->payment_method}\n" .
                   "📍 *Alamat:* {$order->address}\n\n" .
                   "Segera proses pesanannya ya, Juragan!";

        // 3. Kirim pesan otomatis via API Fonnte ke nomor Admin
        try {
            Http::withHeaders([
                'Authorization' => env('FONNTE_TOKEN'),
            ])->post('https://api.fonnte.com/send', [
                'target' => env('ADMIN_WHATSAPP'),
                'message' => $message,
            ]);
        } catch (\Exception $e) {
            // Jika gagal mengirim pesan WA, pesanan tetap tersimpan aman di database
        }

        return redirect()->back()->with('success', 'Pesanan berhasil dibuat! Terima kasih sudah memesan.');
    }

    // Method untuk menampilkan dashboard rekap data pesanan admin
    public function adminDashboard()
    {
        $orders = Order::latest()->get();
        return view('admin.dashboard', compact('orders'));
    }

    // Method untuk menghapus data pesanan pada dashboard admin
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return redirect()->back()->with('success', 'Pesanan berhasil dihapus.');
    }

    public function about()
    {
        return view('about');
    }
}
