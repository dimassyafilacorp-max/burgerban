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
    description: 'Beef Burger, Chicken Burger, dan Egg Smoke Burger.',
    badge: 'Hemat',
    image: '/images/banbox_a.png',
  },
  {
    id: 'banbox-b',
    name: 'Paket Banbox B',
    category: 'paket',
    price: 37000,
    description: 'Beef Burger, Crispy Chicken Burger, dan Egg Smoke Burger.',
    badge: 'Favorit',
    image: '/images/banbox_b.png',
  },
  {
    id: 'bbc-a',
    name: 'Paket BBC A',
    category: 'paket',
    price: 32000,
    description: 'Big Beef Burger dan Big Chicken Burger.',
    image: '/images/bbc_a.png',
  },
  {
    id: 'bbc-b',
    name: 'Paket BBC B',
    category: 'paket',
    price: 34000,
    description: 'Big Beef Burger dan Big Crispy Chicken Burger.',
    image: '/images/bbc_b.png',
  },
  {
    id: 'miniban-a',
    name: 'Paket Miniban A',
    category: 'paket',
    price: 26000,
    description: 'Beef Burger, Chicken Burger, dan Egg Smoke Burger (porsi mini/ringan).',
    badge: 'Super Murah',
    image: '/images/miniban_a.png',
  },
  {
    id: 'miniban-b',
    name: 'Paket Miniban B',
    category: 'paket',
    price: 28000,
    description: 'Beef Burger, Chicken Burger, dan Egg Smoke Burger.',
    image: '/images/miniban_b.png',
  },

  // --- 2. MENU BURGER SATUAN (Gambar Google / Unsplash) ---
  {
    id: 'beef-burger',
    name: 'Beef Burger',
    category: 'burgers',
    price: 13000,
    description: 'Burger dengan juicy beef patty pilihan dan saus spesial Burgerban.',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    category: 'burgers',
    price: 10000,
    description: 'Burger patty ayam lembut dengan kombinasi sayur segar.',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'crispy-chicken-burger',
    name: 'Crispy Chicken Burger',
    category: 'burgers',
    price: 11000,
    description: 'Burger dengan daging ayam goreng renyah dan gurih.',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'egg-smoke-burger',
    name: 'Egg Smoke Burger',
    category: 'burgers',
    price: 8000,
    description: 'Burger lezat dengan kombinasi telur dan aroma smoked spesial.',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'smoke-beef-burger',
    name: 'Smoke Beef Burger',
    category: 'burgers',
    price: 6000,
    description: 'Burger porsi pas dengan potongan smoked beef gurih.',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'scrambled-egg-burger',
    name: 'Scrambled Egg Burger',
    category: 'burgers',
    price: 6000,
    description: 'Burger simpel dengan isian scrambled egg yang lembut.',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'big-beef-burger',
    name: 'Big Beef Burger',
    category: 'burgers',
    price: 21000,
    description: 'Porsi lebih besar dengan ekstra beef patty yang memuaskan.',
    badge: 'Popular',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'big-chicken-burger',
    name: 'Big Chicken Burger',
    category: 'burgers',
    price: 15000,
    description: 'Porsi besar chicken burger untuk kepuasan ekstra.',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'big-crispy-chicken-burger',
    name: 'Big Crispy Chicken Burger',
    category: 'burgers',
    price: 17000,
    description: 'Crispy chicken ukuran jumbo yang super renyah.',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'double-beef-burger',
    name: 'Double Beef Burger',
    category: 'burgers',
    price: 29000,
    description: 'Dua lapis beef patty juicy dengan double kelezatan.',
    badge: 'Best Seller',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'double-chicken-burger',
    name: 'Double Chicken Burger',
    category: 'burgers',
    price: 21000,
    description: 'Dua lapis patty ayam melimpah dan mengenyangkan.',
    image: '/images/comingsoon.jpg',
  },

  // --- 3. SIDE DISHES (Gambar Google / Unsplash) ---
  {
    id: 'beef-patty',
    name: 'Beef Patty',
    category: 'sides',
    price: 10000,
    description: 'Tambahan topping 100% beef patty premium.',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'chicken-patty',
    name: 'Chicken Patty',
    category: 'sides',
    price: 7000,
    description: 'Tambahan topping patty ayam gurih.',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'crispy-chicken-patty',
    name: 'Crispy Chicken Patty',
    category: 'sides',
    price: 8000,
    description: 'Tambahan topping ayam krispi renyah.',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'cheese-egg',
    name: 'Cheese / Egg',
    category: 'sides',
    price: 4000,
    description: 'Ekstra slice keju atau telur dadar/ceplok.',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'kentang-goreng',
    name: 'Kentang Goreng',
    category: 'sides',
    price: 8000,
    description: 'French fries renyah dengan bumbu gurih pas.',
    image: '/images/comingsoon.jpg',
  },
  {
    id: 'mayo',
    name: 'Mayo',
    category: 'sides',
    price: 2000,
    description: 'Ekstra saus mayones creamy spesial.',
    image: '/images/comingsoon.jpg',
  },
];