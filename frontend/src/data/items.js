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
    threeDayRent: 420,
    sevenDayRent: 380,
    marketValue: 40000,
    deposit: 3000,
    distanceKm: 0.8,
    rating: 4.95,
    reviewCount: 38,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512790182412-b19e6d61b39a?auto=format&fit=crop&w=1200&q=80'
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
      city: 'Bhimavaram',
      address: 'SRKR College Road, Bhimavaram, AP',
      lat: 16.5449,
      lng: 81.5212
    }
  },
  {
    id: 'item-2',
    title: 'Apple MacBook Pro 16" (M3 Max, 64GB RAM, 1TB SSD)',
    category: 'Laptops',
    description: 'Ultimate creative powerhouse. Perfect for heavy video editing, 3D rendering, software development, and machine learning workloads on the go.',
    features: ['M3 Max 16-Core CPU / 40-Core GPU', '64GB Unified Memory', 'Liquid Retina XDR Display', 'MagSafe Charger included'],
    dailyRent: 650,
    threeDayRent: 600,
    sevenDayRent: 550,
    marketValue: 180000,
    deposit: 4500,
    distanceKm: 1.4,
    rating: 4.90,
    reviewCount: 24,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=80'
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
      city: 'Bhimavaram',
      address: 'J P Road, Bhimavaram, AP',
      lat: 16.5400,
      lng: 81.5230
    }
  },
  {
    id: 'item-3',
    title: 'Anker Nebula Cosmos Max 4K UHD Home Theater Projector',
    category: 'Projectors',
    description: 'True 4K UHD smart projector with 1500 ANSI Lumens, 3D Dolby Digital Plus speakers, Android TV built-in, and 120-inch collapsible tripod screen included.',
    features: ['4K UHD Resolution', '1500 ANSI Lumens', '3D Audio Speakers', '120-Inch Portable Screen Included', 'HDMI / Wi-Fi / AirPlay'],
    dailyRent: 350,
    threeDayRent: 320,
    sevenDayRent: 290,
    marketValue: 45000,
    deposit: 2000,
    distanceKm: 2.3,
    rating: 4.88,
    reviewCount: 42,
    availability: 'Available Now',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      rating: 5.0,
      responseRate: '100%',
      verified: true,
      phone: '+91 98765 43212',
      location: 'Undi Road, Bhimavaram'
    },
    location: {
      city: 'Bhimavaram',
      address: 'Undi Road, Bhimavaram, AP',
      lat: 16.5480,
      lng: 81.5300
    }
  },
  {
    id: 'item-4',
    title: 'DJI Mavic 3 Pro Cine Drone with Fly More Combo',
    category: 'Drones',
    description: 'Tri-camera flagship drone featuring Hasselblad main camera, Apple ProRes 422 HQ recording, 43 min flight time, and RC Pro controller with built-in high-brightness screen.',
    features: ['Hasselblad 4/3 CMOS Camera', '43-Min Flight Time', '15km HD Video Transmission', '3x Intelligent Batteries', 'DJI RC Pro Remote'],
    dailyRent: 600,
    threeDayRent: 550,
    sevenDayRent: 500,
    marketValue: 120000,
    deposit: 5000,
    distanceKm: 1.8,
    rating: 4.97,
    reviewCount: 19,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      rating: 4.96,
      responseRate: '99%',
      verified: true,
      phone: '+91 98765 43213',
      location: 'P P Road, Bhimavaram'
    },
    location: {
      city: 'Bhimavaram',
      address: 'P P Road, Bhimavaram, AP',
      lat: 16.5380,
      lng: 81.5260
    }
  },
  {
    id: 'item-5',
    title: 'DeWalt 20V MAX Cordless Power Tool Combo Kit (6-Piece)',
    category: 'Tools',
    description: 'Complete heavy-duty tool set: Drill Driver, Impact Driver, Circular Saw, Reciprocating Saw, Oscillating Multi-Tool, LED Work Light, 2x 4.0Ah batteries, fast charger, and canvas contractor bag.',
    features: ['Brushless High Efficiency Motors', '2x 4Ah 20V Lithium Batteries', 'Fast Charger (30 min)', 'Heavy Duty Canvas Tote'],
    dailyRent: 280,
    threeDayRent: 250,
    sevenDayRent: 220,
    marketValue: 15000,
    deposit: 1500,
    distanceKm: 0.5,
    rating: 4.91,
    reviewCount: 56,
    availability: 'Available Now',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Robert Miller',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
      rating: 4.89,
      responseRate: '95%',
      verified: true,
      phone: '+91 98765 43214',
      location: 'Mavullamma Temple St, Bhimavaram'
    },
    location: {
      city: 'Bhimavaram',
      address: 'Mavullamma Temple St, Bhimavaram, AP',
      lat: 16.5410,
      lng: 81.5240
    }
  },
  {
    id: 'item-6',
    title: 'The North Face 4-Person All-Weather Camping Tent & Gear Set',
    category: 'Camping',
    description: 'Everything you need for an outdoor mountain adventure: 4-person double-wall waterproof tent, 2x zero-degree sleeping bags, insulated sleeping pads, compact stove kit, and LED lantern.',
    features: ['4-Person Waterproof Tent', '2x Sub-Zero Sleeping Bags', 'Self-Inflating Thermal Pads', 'Camp Stove & Cookware'],
    dailyRent: 320,
    threeDayRent: 290,
    sevenDayRent: 260,
    marketValue: 18000,
    deposit: 1800,
    distanceKm: 3.1,
    rating: 4.94,
    reviewCount: 31,
    availability: 'Available Now',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Jessica Taylor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
      rating: 4.97,
      responseRate: '100%',
      verified: true,
      phone: '+91 98765 43215',
      location: 'Bhimavaram Town Center'
    },
    location: {
      city: 'Bhimavaram',
      address: 'Town Center, Bhimavaram, AP',
      lat: 16.5420,
      lng: 81.5220
    }
  },
  {
    id: 'item-7',
    title: 'Taylor 214ce Deluxe Acoustic-Electric Guitar',
    category: 'Music',
    description: 'Stunning Sitka Spruce top with layered rosewood back & sides. Includes Expression System 2 electronics, hard shell case, capo, chromatic tuner, and extra string sets.',
    features: ['Grand Auditorium Body Shape', 'Expression System 2 Electronics', 'Hard Case Included', 'Capo & Tuner Kit'],
    dailyRent: 250,
    threeDayRent: 230,
    sevenDayRent: 200,
    marketValue: 25000,
    deposit: 2500,
    distanceKm: 1.1,
    rating: 4.99,
    reviewCount: 29,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Liam Gallagher',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
      rating: 5.0,
      responseRate: '100%',
      verified: true,
      phone: '+91 98765 43216',
      location: 'SRKR Campus Zone, Bhimavaram'
    },
    location: {
      city: 'Bhimavaram',
      address: 'Campus Zone, Bhimavaram, AP',
      lat: 16.5450,
      lng: 81.5215
    }
  },
  {
    id: 'item-8',
    title: 'GoPro HERO12 Black Action Camera + Creator Edition Kit',
    category: 'Cameras',
    description: '5.3K60 video, HDR video & photo, HyperSmooth 6.0 stabilization, Volta battery grip, media mod, light mod, 3-way 2.0 tripod, and 256GB SanDisk Extreme card.',
    features: ['5.3K60 & 4K120 Video', 'HyperSmooth 6.0 Stabilization', 'Volta Battery Grip', 'Media & Light Mods'],
    dailyRent: 220,
    threeDayRent: 200,
    sevenDayRent: 180,
    marketValue: 12000,
    deposit: 1200,
    distanceKm: 0.9,
    rating: 4.86,
    reviewCount: 63,
    availability: 'Available Now',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80'
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
      city: 'Bhimavaram',
      address: 'SRKR College Road, Bhimavaram, AP',
      lat: 16.5449,
      lng: 81.5212
    }
  },
  {
    id: 'item-9',
    title: 'JBL PartyBox 310 Portable Bluetooth Party Speaker',
    category: 'Electronics',
    description: '240W RMS powerful JBL Pro Sound, dynamic sync light show, splashproof design, 18-hour battery life, wheel handle design, and 2 dual wireless karaoke microphones included.',
    features: ['240 Watts RMS Sound', 'Custom RGB Light Show', '18 Hours Playtime', '2 Wireless Mics Included'],
    dailyRent: 300,
    threeDayRent: 270,
    sevenDayRent: 240,
    marketValue: 15000,
    deposit: 1500,
    distanceKm: 1.1,
    rating: 4.93,
    reviewCount: 48,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80'
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
      city: 'Bhimavaram',
      address: 'J P Road, Bhimavaram, AP',
      lat: 16.5400,
      lng: 81.5230
    }
  },
  {
    id: 'item-10',
    title: 'Meta Quest 3 VR Headset (512GB) with Controllers',
    category: 'Electronics',
    description: 'Breakthrough mixed reality headset with 4K+ Infinite Display, Snapdragon XR2 Gen 2 performance, full-color passthrough, and premium comfort head strap.',
    features: ['4K+ Infinite Display', 'Full-Color Passthrough MR', '512GB Storage', 'Carrying Case Included'],
    dailyRent: 260,
    threeDayRent: 240,
    sevenDayRent: 210,
    marketValue: 18000,
    deposit: 1800,
    distanceKm: 1.3,
    rating: 4.92,
    reviewCount: 39,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      rating: 4.85,
      responseRate: '94%',
      verified: true,
      phone: '+91 98765 43217',
      location: 'Telegraph Zone, Bhimavaram'
    },
    location: {
      city: 'Bhimavaram',
      address: 'Telegraph Zone, Bhimavaram, AP',
      lat: 16.5430,
      lng: 81.5225
    }
  },
  {
    id: 'item-11',
    title: 'GATE & Engineering Core Exam Preparation Master Set (10 Volumes)',
    category: 'Books',
    description: 'Complete verified set for Engineering & GATE / PSU preparation. Includes comprehensive Theory Books, Solved Previous 20-Year Papers, Formula Handbooks, and Practice Question Banks in pristine condition.',
    features: ['10 Comprehensive Volumes', 'Solved Previous 20 Years Papers', 'Concise Formula Pocket Guide', 'Latest 2026 Edition'],
    dailyRent: 40,
    threeDayRent: 35,
    sevenDayRent: 30,
    marketValue: 4500,
    deposit: 400,
    distanceKm: 0.6,
    rating: 4.96,
    reviewCount: 34,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80'
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
      city: 'Bhimavaram',
      address: 'SRKR College Road, Bhimavaram, AP',
      lat: 16.5445,
      lng: 81.5218
    }
  },
  {
    id: 'item-12',
    title: 'O\'Reilly & Pearson Tech Library: System Design & AI Engineering',
    category: 'Books',
    description: 'Premier hardcover collection including Designing Data-Intensive Applications, Clean Code, Deep Learning by Ian Goodfellow, and High Performance Browser Networking.',
    features: ['Hardcover Collector Editions', 'No Markings or Tears', 'Bookmark Kit Included', 'Latest Revisions'],
    dailyRent: 55,
    threeDayRent: 50,
    sevenDayRent: 42,
    marketValue: 8000,
    deposit: 600,
    distanceKm: 1.0,
    rating: 4.98,
    reviewCount: 22,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Pooja Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
      rating: 4.97,
      responseRate: '99%',
      verified: true,
      phone: '+91 98765 43219',
      location: 'DNR College Road, Bhimavaram'
    },
    location: {
      city: 'Bhimavaram',
      address: 'DNR College Road, Bhimavaram, AP',
      lat: 16.5415,
      lng: 81.5235
    }
  },
  {
    id: 'item-13',
    title: 'Bestseller Fiction & Productivity Bundle (12 Hardcovers)',
    category: 'Books',
    description: 'A curated collection of top personal growth and best-selling fiction titles: Atomic Habits, Psychology of Money, Thinking Fast & Slow, Dune, and Project Hail Mary.',
    features: ['12 Top-Rated Titles', 'Hardcover Editions', 'Read-at-your-own-pace', 'Sanitized & Clean'],
    dailyRent: 35,
    threeDayRent: 30,
    sevenDayRent: 25,
    marketValue: 5000,
    deposit: 350,
    distanceKm: 1.2,
    rating: 4.91,
    reviewCount: 28,
    availability: 'Available Now',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Kiran Varma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      rating: 4.90,
      responseRate: '97%',
      verified: true,
      phone: '+91 98765 43220',
      location: 'J P Road, Bhimavaram'
    },
    location: {
      city: 'Bhimavaram',
      address: 'J P Road, Bhimavaram, AP',
      lat: 16.5402,
      lng: 81.5231
    }
  }
];
