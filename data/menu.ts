export interface MenuItem {
  id: string;
  name: string;
  category: 'burgers' | 'sides' | 'drinks' | 'combo' | 'paket';
  price: number;
  description: string;
  badge?: string;
  image: string;
}

// Tipe data untuk item di dalam keranjang belanja
export interface CartItem extends MenuItem {
  quantity: number;
}

// Nomor WhatsApp Toko (Ubah sesuai dengan nomor Anda, wajib gunakan format 62)
export const WHATSAPP_NUMBER = '6281234567890';

export const categories = [
  { id: 'all', label: 'Semua Menu' },
  { id: 'paket', label: 'Paket Bundling' },
  { id: 'burgers', label: 'Burger' },
  { id: 'sides', label: 'Side Dishes' },
  { id: 'drinks', label: 'Minuman' },
];

export const menuItems: MenuItem[] = [
  // --- 1. PAKET BUNDLING (DIUTAMAKAN POSISI PALING ATAS) ---
  {
    id: 'banbox-a',
    name: 'Paket Banbox A',
    category: 'paket',
    price: 35000,
    description: 'Terdiri dari: Beef Burger, Chicken Burger, dan Egg Smoke Burger.',
    badge: 'Hemat',
    image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'banbox-b',
    name: 'Paket Banbox B',
    category: 'paket',
    price: 37000,
    description: 'Terdiri dari: Beef Burger, Crispy Chicken Burger, dan Egg Smoke Burger.',
    badge: 'Favorit',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bbc-a',
    name: 'Paket BBC A',
    category: 'paket',
    price: 32000,
    description: 'Terdiri dari: Big Beef Burger dan Big Chicken Burger.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bbc-b',
    name: 'Paket BBC B',
    category: 'paket',
    price: 34000,
    description: 'Terdiri dari: Big Beef Burger dan Big Crispy Chicken Burger.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'miniban-a',
    name: 'Paket Miniban A',
    category: 'paket',
    price: 26000,
    description: 'Terdiri dari: Beef Burger, Chicken Burger, dan Egg Smoke Burger (porsi mini/ringan).',
    badge: 'Super Murah',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'miniban-b',
    name: 'Paket Miniban B',
    category: 'paket',
    price: 28000,
    description: 'Terdiri dari: Beef Burger, Chicken Burger, dan Egg Smoke Burger.',
    image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=600&q=80',
  },

  // --- 2. MENU BURGER SATUAN ---
  {
    id: '1',
    name: 'Bangor Jelata',
    category: 'burgers',
    price: 13500,
    description: '100% Beef Patty Australia premium dengan saus spesial Bangor.',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    name: 'Bangor Juragan',
    category: 'burgers',
    price: 20000,
    description: 'Double Beef Patty premium dengan keju cheddar gurih.',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    name: 'Bangor Smoked BBQ Cheese',
    category: 'burgers',
    price: 26000,
    description: 'Beef patty, smoked beef, keju melted, dan saus BBQ smoky.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
  },

  // --- 3. SIDES & DRINKS ---
  {
    id: '4',
    name: 'French Fries Bangor',
    category: 'sides',
    price: 12000,
    description: 'Kentang goreng renyah dengan taburan bumbu gurih khas.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    name: 'Lemon Tea Cold',
    category: 'drinks',
    price: 8000,
    description: 'Es teh lemon segar pemutus dahaga.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
  },
];