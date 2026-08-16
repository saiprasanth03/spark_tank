export const categories = [
  { id: 'all', name: 'All Categories', icon: 'Grid' },
  { id: 'Cameras', name: 'Cameras', icon: 'Camera' },
  { id: 'Laptops', name: 'Laptops', icon: 'Laptop' },
  { id: 'Projectors', name: 'Projectors', icon: 'Tv' },
  { id: 'Tools', name: 'Tools', icon: 'Wrench' },
  { id: 'Camping', name: 'Camping', icon: 'Tent' },
  { id: 'Sports', name: 'Sports', icon: 'Dumbbell' },
  { id: 'Music', name: 'Music', icon: 'Music' },
  { id: 'Drones', name: 'Drones', icon: 'Navigation' },
  { id: 'Electronics', name: 'Electronics', icon: 'Zap' },
  { id: 'Books', name: 'Books', icon: 'BookOpen' },
];

export const sampleItems = [
  {
    id: 'item-1',
    title: 'Canon EOS R5 Full-Frame Mirrorless Camera Kit',
    category: 'Cameras',
    description: 'Professional 45MP full-frame mirrorless camera with 8K video capabilities. Includes 24-70mm f/2.8L lens, 2x 128GB SanDisk Extreme PRO CFexpress cards, dual batteries, and waterproof Pelican carrying case.',
    features: ['45MP Full-Frame Sensor', '8K RAW Internal Recording', 'Dual Pixel CMOS AF II', '2x 128GB High-Speed Cards', 'Waterproof Hard Case'],
    dailyRent: 450,
    deposit: 3000,
    distance: 0.8,
    rating: 4.95,
    reviewCount: 38,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
      rating: 4.98,
      responseRate: '100%',
      verified: true,
      phone: '+91 98765 43210',
      location: 'SRKR College Road, Bhimavaram'
    },
    location: {
      address: 'SRKR College Road, Bhimavaram, AP',
      lat: 16.5449,
      lng: 81.5212
    }
  },
  {
    id: 'item-2',
    title: 'Apple MacBook Pro 16" (M3 Max, 64GB RAM)',
    category: 'Laptops',
    description: 'Ultimate creative powerhouse. Perfect for heavy video editing, 3D rendering, and software development.',
    features: ['M3 Max CPU/GPU', '64GB Unified Memory', '1TB SSD Storage', 'MagSafe Charger'],
    dailyRent: 650,
    deposit: 4500,
    distance: 1.4,
    rating: 4.90,
    reviewCount: 24,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      rating: 4.92,
      responseRate: '98%',
      verified: true,
      phone: '+91 98765 43211',
      location: 'J P Road, Bhimavaram'
    },
    location: {
      address: 'J P Road, Bhimavaram, AP',
      lat: 16.5400,
      lng: 81.5230
    }
  },
  {
    id: 'item-11',
    title: 'GATE & Engineering Core Exam Preparation Master Set (10 Volumes)',
    category: 'Books',
    description: 'Complete verified set for Engineering & GATE preparation.',
    features: ['10 Comprehensive Volumes', 'Solved Previous 20 Years Papers'],
    dailyRent: 40,
    deposit: 400,
    distance: 0.6,
    rating: 4.96,
    reviewCount: 34,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Venkatesh Rao',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      rating: 4.95,
      responseRate: '100%',
      verified: true,
      phone: '+91 98765 43218',
      location: 'SRKR College Road, Bhimavaram'
    },
    location: {
      address: 'SRKR College Road, Bhimavaram, AP',
      lat: 16.5445,
      lng: 81.5218
    }
  }
];
