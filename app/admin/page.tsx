'use client';

import { useEffect, useState } from 'react';
import { Search, Eye, ShoppingCart, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Tipe Data Big Order
interface BigOrder {
  id: string;
  order_id: string;
  nama: string;
  telepon: string;
  tanggal_acara: string;
  jumlah: number;
  lokasi: string;
  jenis_acara: string;
  status: 'Pending' | 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan';
  created_at: string;
}

// Tipe Data Item Keranjang
interface CartItem {
  namaMenu: string;
  jumlah: number;
  harga: number;
}

// Tipe Data Regular Order (Keranjang)
interface RegularOrder {
  id: string;
  order_id: string;
  nama: string;
  telepon: string;
  items: CartItem[];
  total_harga: number;
  catatan?: string;
  status: 'Pending' | 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan';
  created_at: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'bigOrder' | 'regularOrder'>('bigOrder');
  
  // Data States
  const [bigOrders, setBigOrders] = useState<BigOrder[]>([]);
  const [regularOrders, setRegularOrders] = useState<RegularOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Item Modal
  const [selectedBigOrder, setSelectedBigOrder] = useState<BigOrder | null>(null);
  const [selectedRegularOrder, setSelectedRegularOrder] = useState<RegularOrder | null>(null);

  // 1. Fetch Big Orders
  const fetchBigOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBigOrders(data);
    }
  };

  // 2. Fetch Regular Orders
  const fetchRegularOrders = async () => {
    const { data, error } = await supabase
      .from('regular_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRegularOrders(data);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([fetchBigOrders(), fetchRegularOrders()]);
    setLoading(false);
  };

  // Setup Realtime Subscription & Initial Load
  useEffect(() => {
    loadAllData();

    // Listener Realtime Big Orders
    const bigChannel = supabase
      .channel('realtime-big-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchBigOrders)
      .subscribe();

    // Listener Realtime Regular Orders
    const regularChannel = supabase
      .channel('realtime-regular-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'regular_orders' }, fetchRegularOrders)
      .subscribe();

    return () => {
      supabase.removeChannel(bigChannel);
      supabase.removeChannel(regularChannel);
    };
  }, []);

  // Handler Update Status Big Order
  const handleBigStatusChange = async (id: string, newStatus: BigOrder['status']) => {
    setBigOrders((prev) =>
      prev.map((ord) => (String(ord.id) === String(id) ? { ...ord, status: newStatus } : ord))
    );
    if (selectedBigOrder && String(selectedBigOrder.id) === String(id)) {
      setSelectedBigOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    await supabase.from('orders').update({ status: newStatus }).eq('id', id);
  };

  // Handler Update Status Regular Order
  const handleRegularStatusChange = async (id: string, newStatus: RegularOrder['status']) => {
    setRegularOrders((prev) =>
      prev.map((ord) => (String(ord.id) === String(id) ? { ...ord, status: newStatus } : ord))
    );
    if (selectedRegularOrder && String(selectedRegularOrder.id) === String(id)) {
      setSelectedRegularOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    await supabase.from('regular_orders').update({ status: newStatus }).eq('id', id);
  };

  // Filtering Big Orders
  const filteredBigOrders = bigOrders.filter(
    (o) =>
      o.order_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.telepon?.includes(searchTerm)
  );

  // Filtering Regular Orders
  const filteredRegularOrders = regularOrders.filter(
    (o) =>
      o.order_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.telepon?.includes(searchTerm)
  );

  // Badge Status Component
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs px-2.5 py-1 rounded-full font-semibold">Pending</span>;
      case 'Diproses':
        return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs px-2.5 py-1 rounded-full font-semibold">Diproses</span>;
      case 'Dikirim':
        return <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs px-2.5 py-1 rounded-full font-semibold">Dikirim</span>;
      case 'Selesai':
        return <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs px-2.5 py-1 rounded-full font-semibold">Selesai</span>;
      case 'Dibatalkan':
        return <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-2.5 py-1 rounded-full font-semibold">Dibatalkan</span>;
      default:
        return <span className="bg-neutral-700 text-neutral-300 text-xs px-2.5 py-1 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <h1 className="text-2xl font-bold">Admin Panel - Burgerban</h1>
            <p className="text-xs text-neutral-400 mt-1">Kelola dan update status pesanan pelanggan secara real-time</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Cari ID, Nama, atau No. HP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-800 text-sm text-white px-4 py-2 pl-10 rounded-xl border border-neutral-700 outline-none focus:border-amber-400"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Tab Switcher (Big Order vs Order Keranjang) */}
        <div className="flex space-x-3 border-b border-neutral-800 pb-3">
          <button
            onClick={() => setActiveTab('bigOrder')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'bigOrder'
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/10'
                : 'bg-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            Big Order
            <span className="bg-black/20 text-black px-2 py-0.5 rounded-full text-[10px]">
              {bigOrders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('regularOrder')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'regularOrder'
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/10'
                : 'bg-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Order Keranjang (Ritel)
            <span className="bg-black/20 text-black px-2 py-0.5 rounded-full text-[10px]">
              {regularOrders.length}
            </span>
          </button>
        </div>

        {/* TABEL 1: BIG ORDER */}
        {activeTab === 'bigOrder' && (
          <div className="bg-neutral-800 rounded-2xl border border-neutral-700 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-neutral-300">
                <thead className="bg-neutral-900/60 text-xs uppercase text-neutral-400 border-b border-neutral-700">
                  <tr>
                    <th className="p-4">ID Pesanan</th>
                    <th className="p-4">Pelanggan</th>
                    <th className="p-4">Jumlah</th>
                    <th className="p-4">Tgl Acara</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700/50">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-neutral-400">
                        Memuat data pesanan...
                      </td>
                    </tr>
                  ) : filteredBigOrders.length > 0 ? (
                    filteredBigOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-neutral-700/30 transition">
                        <td className="p-4 font-mono font-bold text-amber-400">{order.order_id}</td>
                        <td className="p-4">
                          <div className="font-semibold text-white">{order.nama}</div>
                          <div className="text-xs text-neutral-400">{order.telepon}</div>
                        </td>
                        <td className="p-4 font-bold text-white">{order.jumlah} Pcs</td>
                        <td className="p-4">{order.tanggal_acara || '-'}</td>
                        <td className="p-4">{renderStatusBadge(order.status)}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => setSelectedBigOrder(order)}
                            className="bg-amber-400 hover:bg-amber-500 text-black px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 mx-auto"
                          >
                            <Eye className="w-3.5 h-3.5" /> Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-neutral-500">
                        Tidak ada pesanan Big Order ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TABEL 2: ORDER KERANJANG */}
        {activeTab === 'regularOrder' && (
          <div className="bg-neutral-800 rounded-2xl border border-neutral-700 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-neutral-300">
                <thead className="bg-neutral-900/60 text-xs uppercase text-neutral-400 border-b border-neutral-700">
                  <tr>
                    <th className="p-4">ID Pesanan</th>
                    <th className="p-4">Pelanggan</th>
                    <th className="p-4">Menu Dipesan</th>
                    <th className="p-4">Total Harga</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700/50">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-neutral-400">
                        Memuat data pesanan...
                      </td>
                    </tr>
                  ) : filteredRegularOrders.length > 0 ? (
                    filteredRegularOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-neutral-700/30 transition">
                        <td className="p-4 font-mono font-bold text-amber-400">{order.order_id}</td>
                        <td className="p-4">
                          <div className="font-semibold text-white">{order.nama}</div>
                          <div className="text-xs text-neutral-400">{order.telepon}</div>
                        </td>
                        <td className="p-4 text-xs">
                          {order.items && order.items.length > 0 ? (
                            <span>
                              {order.items[0].namaMenu} ({order.items[0].jumlah}x)
                              {order.items.length > 1 && (
                                <span className="text-amber-400 font-semibold ml-1">
                                  +{order.items.length - 1} item
                                </span>
                              )}
                            </span>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="p-4 font-bold text-amber-400">
                          Rp {order.total_harga?.toLocaleString('id-ID')}
                        </td>
                        <td className="p-4">{renderStatusBadge(order.status)}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => setSelectedRegularOrder(order)}
                            className="bg-amber-400 hover:bg-amber-500 text-black px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 mx-auto"
                          >
                            <Eye className="w-3.5 h-3.5" /> Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-neutral-500">
                        Tidak ada pesanan keranjang ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* MODAL DETAIL & UPDATE STATUS: BIG ORDER */}
      {selectedBigOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex justify-between items-start border-b border-neutral-700 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Detail Big Order</h3>
                <p className="text-xs font-mono text-amber-400">{selectedBigOrder.order_id}</p>
              </div>
              <button
                onClick={() => setSelectedBigOrder(null)}
                className="text-neutral-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm text-neutral-300">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-xs text-neutral-400 block">Nama Pemesan</span>
                  <span className="font-semibold text-white">{selectedBigOrder.nama}</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">No. WhatsApp</span>
                  <span className="font-semibold text-white">{selectedBigOrder.telepon}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-xs text-neutral-400 block">Jumlah Order</span>
                  <span className="font-semibold text-white">{selectedBigOrder.jumlah} Pcs</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">Jenis Acara</span>
                  <span className="font-semibold text-white">{selectedBigOrder.jenis_acara || '-'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-xs text-neutral-400 block">Tanggal Acara</span>
                  <span className="font-semibold text-white">{selectedBigOrder.tanggal_acara || '-'}</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">Lokasi</span>
                  <span className="font-semibold text-white">{selectedBigOrder.lokasi || '-'}</span>
                </div>
              </div>

              <div className="pt-2">
                <label className="text-xs text-neutral-400 block mb-1">Ubah Status Pesanan</label>
                <select
                  value={selectedBigOrder.status}
                  onChange={(e) =>
                    handleBigStatusChange(selectedBigOrder.id, e.target.value as BigOrder['status'])
                  }
                  className="w-full bg-neutral-900 border border-neutral-600 rounded-xl px-3 py-2 text-white font-semibold outline-none focus:border-amber-400"
                >
                  <option value="Pending">Pending</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Dikirim">Dikirim</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </div>
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setSelectedBigOrder(null)}
                className="bg-neutral-700 hover:bg-neutral-600 text-white font-semibold px-5 py-2 rounded-xl text-xs transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETAIL & UPDATE STATUS: REGULAR ORDER (KERANJANG) */}
      {selectedRegularOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex justify-between items-start border-b border-neutral-700 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Detail Order Keranjang</h3>
                <p className="text-xs font-mono text-amber-400">{selectedRegularOrder.order_id}</p>
              </div>
              <button
                onClick={() => setSelectedRegularOrder(null)}
                className="text-neutral-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-neutral-300">
              <div className="grid grid-cols-2 gap-2 border-b border-neutral-700 pb-3">
                <div>
                  <span className="text-xs text-neutral-400 block">Nama Pemesan</span>
                  <span className="font-semibold text-white">{selectedRegularOrder.nama}</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">No. WhatsApp</span>
                  <span className="font-semibold text-white">{selectedRegularOrder.telepon}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-neutral-400 block mb-2 font-bold">Rincian Item Dipesan:</span>
                <div className="bg-neutral-900 p-3 rounded-xl space-y-2 border border-neutral-700">
                  {selectedRegularOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs border-b border-neutral-800 last:border-0 pb-1.5 last:pb-0">
                      <span className="text-white font-medium">
                        {item.namaMenu} <span className="text-amber-400 font-bold">x{item.jumlah}</span>
                      </span>
                      <span className="font-bold text-neutral-300">
                        Rp {(item.harga * item.jumlah).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center font-bold text-white pt-1">
                <span>Total Pembayaran:</span>
                <span className="text-amber-400 text-base">
                  Rp {selectedRegularOrder.total_harga?.toLocaleString('id-ID')}
                </span>
              </div>

              {selectedRegularOrder.catatan && (
                <div className="text-xs bg-amber-400/10 border border-amber-400/20 text-amber-300 p-3 rounded-xl">
                  <strong>Catatan:</strong> {selectedRegularOrder.catatan}
                </div>
              )}

              <div className="pt-2">
                <label className="text-xs text-neutral-400 block mb-1">Ubah Status Pesanan</label>
                <select
                  value={selectedRegularOrder.status}
                  onChange={(e) =>
                    handleRegularStatusChange(selectedRegularOrder.id, e.target.value as RegularOrder['status'])
                  }
                  className="w-full bg-neutral-900 border border-neutral-600 rounded-xl px-3 py-2 text-white font-semibold outline-none focus:border-amber-400"
                >
                  <option value="Pending">Pending</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Dikirim">Dikirim</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </div>
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setSelectedRegularOrder(null)}
                className="bg-neutral-700 hover:bg-neutral-600 text-white font-semibold px-5 py-2 rounded-xl text-xs transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}