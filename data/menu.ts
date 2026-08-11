export interface MenuItem {
  id: string;
  name: string;
  category: 'burgers' | 'sides' | 'drinks' | 'paket';
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
];

export const menuItems: MenuItem[] = [
  // --- 1. PAKET BUNDLING (Lokal Gambar) ---
  {
    id: 'banbox-a',
    name: 'Paket Banbox A',
    category: 'paket',
    price: 35000,
    description: 'Terdiri dari: Beef Burger, Chicken Burger, dan Egg Smoke Burger.',
    badge: 'Hemat',
    image: '/images/banbox_a.png',
  },
  {
    id: 'banbox-b',
    name: 'Paket Banbox B',
    category: 'paket',
    price: 37000,
    description: 'Terdiri dari: Beef Burger, Crispy Chicken Burger, dan Egg Smoke Burger.',
    badge: 'Favorit',
    image: '/images/banbox_b.png',
  },
  {
    id: 'bbc-a',
    name: 'Paket BBC A',
    category: 'paket',
    price: 32000,
    description: 'Terdiri dari: Big Beef Burger dan Big Chicken Burger.',
    image: '/images/bbc_a.png',
  },
  {
    id: 'bbc-b',
    name: 'Paket BBC B',
    category: 'paket',
    price: 34000,
    description: 'Terdiri dari: Big Beef Burger dan Big Crispy Chicken Burger.',
    image: '/images/bbc_b.png',
  },
  {
    id: 'miniban-a',
    name: 'Paket Miniban A',
    category: 'paket',
    price: 26000,
    description: 'Terdiri dari: Beef Burger, Chicken Burger, dan Egg Smoke Burger (porsi mini/ringan).',
    badge: 'Super Murah',
    image: '/images/miniban_a.png',
  },
  {
    id: 'miniban-b',
    name: 'Paket Miniban B',
    category: 'paket',
    price: 28000,
    description: 'Terdiri dari: Beef Burger, Chicken Burger, dan Egg Smoke Burger.',
    image: '/images/miniban_b.png',
  },

  // --- 2. MENU BURGER SATUAN (Gambar Google / Unsplash) ---
  {
    id: 'beef-burger',
    name: 'Beef Burger',
    category: 'burgers',
    price: 13000,
    description: 'Burger dengan juicy beef patty pilihan dan saus spesial Burgerban.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    category: 'burgers',
    price: 10000,
    description: 'Burger patty ayam lembut dengan kombinasi sayur segar.',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'crispy-chicken-burger',
    name: 'Crispy Chicken Burger',
    category: 'burgers',
    price: 11000,
    description: 'Burger dengan daging ayam goreng renyah dan gurih.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'egg-smoke-burger',
    name: 'Egg Smoke Burger',
    category: 'burgers',
    price: 8000,
    description: 'Burger lezat dengan kombinasi telur dan aroma smoked spesial.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'smoke-beef-burger',
    name: 'Smoke Beef Burger',
    category: 'burgers',
    price: 6000,
    description: 'Burger porsi pas dengan potongan smoked beef gurih.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'scrambled-egg-burger',
    name: 'Scrambled Egg Burger',
    category: 'burgers',
    price: 6000,
    description: 'Burger simpel dengan isian scrambled egg yang lembut.',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'big-beef-burger',
    name: 'Big Beef Burger',
    category: 'burgers',
    price: 21000,
    description: 'Porsi lebih besar dengan ekstra beef patty yang memuaskan.',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'big-chicken-burger',
    name: 'Big Chicken Burger',
    category: 'burgers',
    price: 15000,
    description: 'Porsi besar chicken burger untuk kepuasan ekstra.',
    image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'big-crispy-chicken-burger',
    name: 'Big Crispy Chicken Burger',
    category: 'burgers',
    price: 17000,
    description: 'Crispy chicken ukuran jumbo yang super renyah.',
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'double-beef-burger',
    name: 'Double Beef Burger',
    category: 'burgers',
    price: 29000,
    description: 'Dua lapis beef patty juicy dengan double kelezatan.',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'double-chicken-burger',
    name: 'Double Chicken Burger',
    category: 'burgers',
    price: 21000,
    description: 'Dua lapis patty ayam melimpah dan mengenyangkan.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
  },

  // --- 3. SIDE DISHES (Gambar Google / Unsplash) ---
  {
    id: 'beef-patty',
    name: 'Beef Patty',
    category: 'sides',
    price: 10000,
    description: 'Tambahan topping 100% beef patty premium.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'chicken-patty',
    name: 'Chicken Patty',
    category: 'sides',
    price: 7000,
    description: 'Tambahan topping patty ayam gurih.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'crispy-chicken-patty',
    name: 'Crispy Chicken Patty',
    category: 'sides',
    price: 8000,
    description: 'Tambahan topping ayam krispi renyah.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cheese-egg',
    name: 'Cheese / Egg',
    category: 'sides',
    price: 4000,
    description: 'Ekstra slice keju atau telur dadar/ceplok.',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'kentang-goreng',
    name: 'Kentang Goreng',
    category: 'sides',
    price: 8000,
    description: 'French fries renyah dengan bumbu gurih pas.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mayo',
    name: 'Mayo',
    category: 'sides',
    price: 2000,
    description: 'Ekstra saus mayones creamy spesial.',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=600&q=80',
  },
];