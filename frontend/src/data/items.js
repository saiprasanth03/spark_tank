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
    dailyRent: 45,
    deposit: 300,
    distance: 0.8,
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
      phone: '+1 (555) 234-5678',
      location: 'Downtown Tech District'
    },
    location: {
      address: '742 Market St, San Francisco, CA',
      lat: 37.7879,
      lng: -122.4075
    }
  },
  {
    id: 'item-2',
    title: 'Apple MacBook Pro 16" (M3 Max, 64GB RAM, 1TB SSD)',
    category: 'Laptops',
    description: 'Ultimate creative powerhouse. Perfect for heavy video editing, 3D rendering, software development, and machine learning workloads on the go.',
    features: ['M3 Max 16-Core CPU / 40-Core GPU', '64GB Unified Memory', 'Liquid Retina XDR Display', 'MagSafe Charger included'],
    dailyRent: 55,
    deposit: 450,
    distance: 1.2,
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
      phone: '+1 (555) 876-5432',
      location: 'SOMA Creative Hub'
    },
    location: {
      address: '200 Folsom St, San Francisco, CA',
      lat: 37.7901,
      lng: -122.3925
    }
  },
  {
    id: 'item-3',
    title: 'Anker Nebula Cosmos Max 4K UHD Home Theater Projector',
    category: 'Projectors',
    description: 'True 4K UHD smart projector with 1500 ANSI Lumens, 3D Dolby Digital Plus speakers, Android TV built-in, and 120-inch collapsible tripod screen included.',
    features: ['4K UHD Resolution', '1500 ANSI Lumens', '3D Audio Speakers', '120-Inch Portable Screen Included', 'HDMI / Wi-Fi / AirPlay'],
    dailyRent: 35,
    deposit: 200,
    distance: 2.1,
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
      phone: '+1 (555) 345-6789',
      location: 'Mission District'
    },
    location: {
      address: '1015 Valencia St, San Francisco, CA',
      lat: 37.7565,
      lng: -122.4213
    }
  },
  {
    id: 'item-4',
    title: 'DJI Mavic 3 Pro Cine Drone with Fly More Combo',
    category: 'Drones',
    description: 'Tri-camera flagship drone featuring Hasselblad main camera, Apple ProRes 422 HQ recording, 43 min flight time, and RC Pro controller with built-in high-brightness screen.',
    features: ['Hasselblad 4/3 CMOS Camera', '43-Min Flight Time', '15km HD Video Transmission', '3x Intelligent Batteries', 'DJI RC Pro Remote'],
    dailyRent: 60,
    deposit: 500,
    distance: 1.5,
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
      phone: '+1 (555) 901-2345',
      location: 'Potrero Hill'
    },
    location: {
      address: '300 Connecticut St, San Francisco, CA',
      lat: 37.7628,
      lng: -122.3976
    }
  },
  {
    id: 'item-5',
    title: 'DeWalt 20V MAX Cordless Power Tool Combo Kit (6-Piece)',
    category: 'Tools',
    description: 'Complete heavy-duty tool set: Drill Driver, Impact Driver, Circular Saw, Reciprocating Saw, Oscillating Multi-Tool, LED Work Light, 2x 4.0Ah batteries, fast charger, and canvas contractor bag.',
    features: ['Brushless High Efficiency Motors', '2x 4Ah 20V Lithium Batteries', 'Fast Charger (30 min)', 'Heavy Duty Canvas Tote'],
    dailyRent: 28,
    deposit: 150,
    distance: 0.5,
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
      phone: '+1 (555) 432-1098',
      location: 'Castro'
    },
    location: {
      address: '400 Castro St, San Francisco, CA',
      lat: 37.7615,
      lng: -122.4350
    }
  },
  {
    id: 'item-6',
    title: 'The North Face 4-Person All-Weather Camping Tent & Gear Set',
    category: 'Camping',
    description: 'Everything you need for an outdoor mountain adventure: 4-person double-wall waterproof tent, 2x zero-degree sleeping bags, insulated sleeping pads, compact stove kit, and LED lantern.',
    features: ['4-Person Waterproof Tent', '2x Sub-Zero Sleeping Bags', 'Self-Inflating Thermal Pads', 'Camp Stove & Cookware', '20,000 mAh Power Bank'],
    dailyRent: 32,
    deposit: 180,
    distance: 3.0,
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
      phone: '+1 (555) 678-9012',
      location: 'Presidio Heights'
    },
    location: {
      address: '3200 California St, San Francisco, CA',
      lat: 37.7882,
      lng: -122.4491
    }
  },
  {
    id: 'item-7',
    title: 'Taylor 214ce Deluxe Acoustic-Electric Guitar',
    category: 'Music',
    description: 'Stunning Sitka Spruce top with layered rosewood back & sides. Includes Expression System 2 electronics, hard shell case, capo, chromatic tuner, and extra string sets.',
    features: ['Grand Auditorium Body Shape', 'Expression System 2 Electronics', 'Hard Case Included', 'Capo & Tuner Kit'],
    dailyRent: 25,
    deposit: 250,
    distance: 1.8,
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
      phone: '+1 (555) 111-2233',
      location: 'Haight-Ashbury'
    },
    location: {
      address: '1500 Haight St, San Francisco, CA',
      lat: 37.7700,
      lng: -122.4469
    }
  },
  {
    id: 'item-8',
    title: 'GoPro HERO12 Black Action Camera + Creator Edition Kit',
    category: 'Cameras',
    description: '5.3K60 video, HDR video & photo, HyperSmooth 6.0 stabilization, Volta battery grip, media mod, light mod, 3-way 2.0 tripod, and 256GB SanDisk Extreme card.',
    features: ['5.3K60 & 4K120 Video', 'HyperSmooth 6.0 Stabilization', 'Waterproof to 33ft (10m)', 'Volta Battery Grip (5+ hrs recording)', 'Media & Light Mods'],
    dailyRent: 22,
    deposit: 120,
    distance: 0.9,
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
      phone: '+1 (555) 234-5678',
      location: 'Downtown Tech District'
    },
    location: {
      address: '742 Market St, San Francisco, CA',
      lat: 37.7879,
      lng: -122.4075
    }
  },
  {
    id: 'item-9',
    title: 'JBL PartyBox 310 Portable Bluetooth Party Speaker',
    category: 'Electronics',
    description: '240W RMS powerful JBL Pro Sound, dynamic sync light show, splashproof design, 18-hour battery life, wheel handle design, and 2 dual wireless karaoke microphones included.',
    features: ['240 Watts RMS Sound', 'Custom RGB Light Show', '18 Hours Playtime', 'IPX4 Splashproof', '2 Wireless Mics Included'],
    dailyRent: 30,
    deposit: 150,
    distance: 1.1,
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
      phone: '+1 (555) 876-5432',
      location: 'SOMA Creative Hub'
    },
    location: {
      address: '200 Folsom St, San Francisco, CA',
      lat: 37.7901,
      lng: -122.3925
    }
  },
  {
    id: 'item-10',
    title: 'TI-Nspire CX II CAS Graphing Calculator',
    category: 'Books',
    description: 'Approved for SAT, AP, PSAT, and ACT exams. Full color screen, Computer Algebra System (CAS), rechargeable battery, and math software bundle included.',
    features: ['Color Backlit Display', 'CAS Algebraic Functionality', 'Rechargeable Battery', 'Approved for College Board Exams'],
    dailyRent: 8,
    deposit: 60,
    distance: 0.4,
    rating: 4.87,
    reviewCount: 15,
    availability: 'Available Now',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      rating: 4.85,
      responseRate: '94%',
      verified: true,
      phone: '+1 (555) 777-8899',
      location: 'UC Berkeley / Telegraph'
    },
    location: {
      address: '2400 Telegraph Ave, Berkeley, CA',
      lat: 37.8660,
      lng: -122.2590
    }
  },
  {
    id: 'item-11',
    title: 'Asus ROG Strix G16 Gaming Laptop (RTX 4080, 32GB RAM)',
    category: 'Laptops',
    description: 'Blazing-fast gaming and VR computer. Intel i9 13th Gen, NVIDIA GeForce RTX 4080 12GB, 240Hz QHD display, RGB per-key keyboard, and laptop cooling pad.',
    features: ['NVIDIA RTX 4080 12GB', 'Intel Core i9 13980HX', '240Hz ROG Nebula Display', 'Includes Wireless Gaming Mouse & Pad'],
    dailyRent: 48,
    deposit: 400,
    distance: 2.4,
    rating: 4.96,
    reviewCount: 22,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      rating: 4.96,
      responseRate: '99%',
      verified: true,
      phone: '+1 (555) 901-2345',
      location: 'Potrero Hill'
    },
    location: {
      address: '300 Connecticut St, San Francisco, CA',
      lat: 37.7628,
      lng: -122.3976
    }
  },
  {
    id: 'item-12',
    title: 'Peloton Bike+ Interactive Exercise Bike',
    category: 'Sports',
    description: 'Includes 23.8" rotating HD touchscreen, auto-follow resistance knob, dual SPD pedals, pair of 3lb dumbbells, and heavy-duty floor protection mat.',
    features: ['23.8" Rotating HD Screen', 'Auto-Follow Resistance', 'Apple GymKit Integration', 'Floor Mat & Weights Included'],
    dailyRent: 38,
    deposit: 350,
    distance: 1.7,
    rating: 4.91,
    reviewCount: 17,
    availability: 'Available Now',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      rating: 5.0,
      responseRate: '100%',
      verified: true,
      phone: '+1 (555) 345-6789',
      location: 'Mission District'
    },
    location: {
      address: '1015 Valencia St, San Francisco, CA',
      lat: 37.7565,
      lng: -122.4213
    }
  },
  {
    id: 'item-13',
    title: 'Sony FE 70-200mm f/2.8 GM OSS II Telephoto Lens',
    category: 'Cameras',
    description: 'World\'s lightest 70-200mm f/2.8 telephoto zoom lens. Breathtaking resolution, creamy bokeh, hyper-fast autofocus, and optical image stabilization.',
    features: ['E-Mount Full-Frame', 'f/2.8 Constant Aperture', 'Optical SteadyShot', 'Removable Tripod Collar'],
    dailyRent: 35,
    deposit: 280,
    distance: 0.8,
    rating: 4.98,
    reviewCount: 27,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
      rating: 4.98,
      responseRate: '100%',
      verified: true,
      phone: '+1 (555) 234-5678',
      location: 'Downtown Tech District'
    },
    location: {
      address: '742 Market St, San Francisco, CA',
      lat: 37.7879,
      lng: -122.4075
    }
  },
  {
    id: 'item-14',
    title: 'Bose S1 Pro+ Wireless PA System & Battery',
    category: 'Music',
    description: 'Ultra-portable all-in-one PA system for live gigs, events, or speeches. Built-in 3-channel mixer, OLED screens, integrated wireless mic receiver, and 11-hr battery.',
    features: ['Bluetooth Streaming', 'Integrated Wireless Receiver', 'Position-dependent EQ Sensors', '11-Hour Rechargeable Battery'],
    dailyRent: 30,
    deposit: 160,
    distance: 1.9,
    rating: 4.89,
    reviewCount: 34,
    availability: 'Available Now',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Liam Gallagher',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
      rating: 5.0,
      responseRate: '100%',
      verified: true,
      phone: '+1 (555) 111-2233',
      location: 'Haight-Ashbury'
    },
    location: {
      address: '1500 Haight St, San Francisco, CA',
      lat: 37.7700,
      lng: -122.4469
    }
  },
  {
    id: 'item-15',
    title: 'Garmin InReach Freedom Satellite Communicator & GPS',
    category: 'Camping',
    description: 'Global 100% Iridium satellite coverage for backcountry hiking, climbing, and expeditions. 2-way text messaging, interactive SOS, location sharing, and map navigation.',
    features: ['100% Global Iridium Coverage', 'Interactive 24/7 SOS', 'Location Tracking & Mapbox', 'Rugged Waterproof IPX7'],
    dailyRent: 15,
    deposit: 100,
    distance: 3.2,
    rating: 4.95,
    reviewCount: 40,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Jessica Taylor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
      rating: 4.97,
      responseRate: '100%',
      verified: true,
      phone: '+1 (555) 678-9012',
      location: 'Presidio Heights'
    },
    location: {
      address: '3200 California St, San Francisco, CA',
      lat: 37.7882,
      lng: -122.4491
    }
  },
  {
    id: 'item-16',
    title: 'Karcher K5 Premium Electric Pressure Washer (2000 PSI)',
    category: 'Tools',
    description: 'High-performance 2000 PSI electric pressure washer with DirtBlaster wand, Vario Power Spray wand, integrated detergent tank, and 25-ft high-pressure hose.',
    features: ['2000 PSI Water Pressure', 'Water-Cooled Induction Motor', 'DirtBlaster Turbo Spray Wand', 'On-Board Hose Reel'],
    dailyRent: 24,
    deposit: 120,
    distance: 0.6,
    rating: 4.88,
    reviewCount: 33,
    availability: 'Available Now',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Robert Miller',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
      rating: 4.89,
      responseRate: '95%',
      verified: true,
      phone: '+1 (555) 432-1098',
      location: 'Castro'
    },
    location: {
      address: '400 Castro St, San Francisco, CA',
      lat: 37.7615,
      lng: -122.4350
    }
  },
  {
    id: 'item-17',
    title: 'Meta Quest 3 VR Headset (512GB) with Touch Plus Controllers',
    category: 'Electronics',
    description: 'Breakthrough mixed reality headset with 4K+ Infinite Display, Snapdragon XR2 Gen 2 performance, full-color passthrough, and premium comfort head strap.',
    features: ['4K+ Infinite Display', 'Full-Color Passthrough MR', '512GB Storage', 'Carrying Case & Link Cable'],
    dailyRent: 26,
    deposit: 180,
    distance: 1.3,
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
      phone: '+1 (555) 777-8899',
      location: 'UC Berkeley / Telegraph'
    },
    location: {
      address: '2400 Telegraph Ave, Berkeley, CA',
      lat: 37.8660,
      lng: -122.2590
    }
  },
  {
    id: 'item-18',
    title: 'Hardcover Computer Science & Algorithms Textbook Bundle',
    category: 'Books',
    description: 'Includes "Introduction to Algorithms" (CLRS 4th Ed), "Designing Data-Intensive Applications" (Martin Kleppmann), and "Clean Code". Pristine condition.',
    features: ['CLRS 4th Edition', 'DDIA Hardcover', 'Clean Code Hardcover', 'No Highlights or Markings'],
    dailyRent: 6,
    deposit: 50,
    distance: 0.3,
    rating: 4.97,
    reviewCount: 18,
    availability: 'Available Now',
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      rating: 4.85,
      responseRate: '94%',
      verified: true,
      phone: '+1 (555) 777-8899',
      location: 'UC Berkeley / Telegraph'
    },
    location: {
      address: '2400 Telegraph Ave, Berkeley, CA',
      lat: 37.8660,
      lng: -122.2590
    }
  },
  {
    id: 'item-19',
    title: 'Callaway Paradym AI Smoke Golf Club Set with Stand Bag',
    category: 'Sports',
    description: 'Complete 14-piece right-handed stiff flex set: AI Smoke Driver, 3-Wood, 4-Hybrid, 5-PW Irons, Mack Daddy 54/58 Wedges, Odyssey Putter, and Callaway Fairway C Bag.',
    features: ['14-Piece Complete Set', 'Stiff Flex Graphite & Steel', 'Odyssey Stroke Lab Putter', 'Callaway Stand Bag Included'],
    dailyRent: 40,
    deposit: 300,
    distance: 2.7,
    rating: 4.90,
    reviewCount: 26,
    availability: 'Available Now',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      rating: 4.92,
      responseRate: '98%',
      verified: true,
      phone: '+1 (555) 876-5432',
      location: 'SOMA Creative Hub'
    },
    location: {
      address: '200 Folsom St, San Francisco, CA',
      lat: 37.7901,
      lng: -122.3925
    }
  },
  {
    id: 'item-20',
    title: 'Godox SL60W LED Video Light Studio Continuous Lighting Kit',
    category: 'Electronics',
    description: '2x SL60W 5600K Bowens mount continuous LED lights, 2x 31"x47" softboxes, 2x 7ft light stands, remote control, and padded carrying case.',
    features: ['60W High Power LED Cobra', '5600K Daylight Balanced', 'Bowens Mount Compatibility', '2x Softboxes & Stands Included'],
    dailyRent: 20,
    deposit: 100,
    distance: 1.0,
    rating: 4.88,
    reviewCount: 33,
    availability: 'Available Now',
    condition: 'Excellent',
    images: [
      'https://images.unsplash.com/photo-1512790182412-b19e6d61b39a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
      rating: 4.98,
      responseRate: '100%',
      verified: true,
      phone: '+1 (555) 234-5678',
      location: 'Downtown Tech District'
    },
    location: {
      address: '742 Market St, San Francisco, CA',
      lat: 37.7879,
      lng: -122.4075
    }
  }
];
