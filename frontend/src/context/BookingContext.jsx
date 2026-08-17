import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleItems } from '../data/items';
import toast from 'react-hot-toast';

const BookingContext = createContext();

const STORAGE_KEYS = {
  ITEMS: 'borrowbridge_items_v2',
  MY_LISTINGS: 'borrowbridge_my_listings_v2',
  BOOKINGS: 'borrowbridge_bookings_v2',
  WISHLIST: 'borrowbridge_wishlist_v2',
  PRODUCT_REVIEWS: 'borrowbridge_product_reviews_v2',
  WEBSITE_FEEDBACKS: 'borrowbridge_website_feedbacks_v2'
};

const mergeCustomAndBase = (customList, baseList = sampleItems) => {
  const baseIds = new Set(baseList.map(s => s.id));
  const onlyCustom = (customList || []).filter(c => c && c.id && !baseIds.has(c.id));
  const uniqueMap = new Map();
  onlyCustom.forEach(c => {
    if (!uniqueMap.has(c.id)) {
      uniqueMap.set(c.id, c);
    }
  });
  return [...Array.from(uniqueMap.values()), ...baseList];
};

export const BookingProvider = ({ children }) => {
  // 1. Items with localStorage persistence and base items merging
  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEYS.ITEMS);
      const savedMyListings = localStorage.getItem(STORAGE_KEYS.MY_LISTINGS);
      let list = [];

      if (savedItems) {
        const parsed = JSON.parse(savedItems);
        if (Array.isArray(parsed)) list.push(...parsed);
      }

      if (savedMyListings) {
        const parsedListings = JSON.parse(savedMyListings);
        if (Array.isArray(parsedListings)) list.push(...parsedListings);
      }

      return mergeCustomAndBase(list);
    } catch (e) {
      console.error('Error loading items from localStorage', e);
    }
    return sampleItems;
  });

  // 2. My Listings with localStorage persistence
  const [myListings, setMyListings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MY_LISTINGS);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // 3. Wishlist with localStorage persistence
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // 4. All Users mock store
  const [allUsers, setAllUsers] = useState([
    { id: 'usr-1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'Seller / Owner', status: 'Verified', listingsCount: 4, bookingsCount: 38, joined: 'May 2026', phone: '+91 98765 43210', location: 'SRKR College Road, Bhimavaram' },
    { id: 'usr-2', name: 'Marcus Vance', email: 'marcus.v@example.com', role: 'Both', status: 'Verified', listingsCount: 3, bookingsCount: 24, joined: 'June 2026', phone: '+91 98765 43211', location: 'J P Road, Bhimavaram' },
    { id: 'usr-3', name: 'Elena Rostova', email: 'elena.r@example.com', role: 'Seller / Owner', status: 'Verified', listingsCount: 2, bookingsCount: 42, joined: 'April 2026', phone: '+91 98765 43212', location: 'Undi Road, Bhimavaram' },
    { id: 'usr-4', name: 'David Kim', email: 'david.k@example.com', role: 'Both', status: 'Verified', listingsCount: 2, bookingsCount: 19, joined: 'July 2026', phone: '+91 98765 43213', location: 'P P Road, Bhimavaram' }
  ]);

  // 5. My Bookings with localStorage persistence
  const [myBookings, setMyBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}

    return [
      {
        id: 'bk-101',
        itemId: 'item-1',
        itemTitle: 'Canon EOS R5 Full-Frame Mirrorless Camera Kit',
        itemImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
        category: 'Cameras',
        startDate: '2026-08-18',
        endDate: '2026-08-20',
        days: 2,
        dailyRent: 450,
        totalRent: 900,
        deposit: 3000,
        platformFee: 9,
        totalPaid: 3909,
        pickupType: 'Local Self-Pickup',
        renterName: 'Priya Verma',
        renterEmail: 'priya.v@example.com',
        renterPhone: '+91 98765 43299',
        ownerName: 'Sarah Jenkins',
        ownerEmail: 'sarah.j@example.com',
        ownerPhone: '+91 98765 43210',
        ownerLocation: 'SRKR College Road, Bhimavaram',
        stage: 'ACCEPTED',
        status: 'Request Accepted - Awaiting Joint Pickup Inspection',
        escrowStatus: 'Awaiting Pickup & Escrow Payment',
        createdAt: '2026-08-16T10:00:00Z',
        pickupInspection: null,
        returnInspection: null
      },
      {
        id: 'bk-102',
        itemId: 'item-2',
        itemTitle: 'Apple MacBook Pro 16" (M3 Max, 64GB RAM)',
        itemImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
        category: 'Laptops',
        startDate: '2026-08-14',
        endDate: '2026-08-17',
        days: 3,
        dailyRent: 650,
        totalRent: 1950,
        deposit: 4500,
        platformFee: 9,
        totalPaid: 6459,
        pickupType: 'Local Self-Pickup',
        renterName: 'Rahul Reddy',
        renterEmail: 'rahul.r@example.com',
        renterPhone: '+91 98765 43288',
        ownerName: 'Marcus Vance',
        ownerEmail: 'marcus.v@example.com',
        ownerPhone: '+91 98765 43211',
        ownerLocation: 'J P Road, Bhimavaram',
        stage: 'ACTIVE',
        status: 'Active Rental - Item Handed Over',
        escrowStatus: '₹4,500 Security Deposit Held in Escrow',
        createdAt: '2026-08-14T09:00:00Z',
        pickupInspection: {
          inspected: true,
          checklist: { powerOn: true, workingCondition: true, accessoriesPresent: true, cosmeticGood: true },
          notes: 'Screen pristine, MagSafe charger verified, 98% battery health tested together.',
          timestamp: '2026-08-14T11:30:00Z',
          inspectedBy: 'Marcus Vance (Owner) & Rahul Reddy (Renter)'
        },
        returnInspection: null
      }
    ];
  });

  // 6. Product Reviews Store with localStorage persistence
  const [productReviews, setProductReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCT_REVIEWS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return {
      'item-1': [
        {
          id: 'rev-1',
          reviewer: 'Ananya Rao',
          rating: 5,
          date: 'Aug 12, 2026',
          comment: 'Rented this Canon EOS R5 for a wedding shoot at Bhimavaram. Lens was crystal clear, batteries fully charged, and the owner was very cooperative!',
          verifiedBookingId: 'bk-99'
        },
        {
          id: 'rev-2',
          reviewer: 'Sai Teja',
          rating: 5,
          date: 'Aug 5, 2026',
          comment: 'Top quality 8K footage. Handover inspection was smooth near SRKR campus road and full deposit was refunded instantly after return.',
          verifiedBookingId: 'bk-98'
        }
      ],
      'item-2': [
        {
          id: 'rev-3',
          reviewer: 'Karthik Varma',
          rating: 5,
          date: 'Aug 9, 2026',
          comment: 'Blazing fast M3 Max. Rendered our entire 4K project in 20 minutes. Battery and charger in perfect condition.',
          verifiedBookingId: 'bk-97'
        }
      ],
      'item-11': [
        {
          id: 'rev-4',
          reviewer: 'Naveen Kumar',
          rating: 5,
          date: 'Aug 11, 2026',
          comment: 'Complete GATE engineering book bundle. Books are in pristine condition with 0 markings. Saved thousands of rupees!',
          verifiedBookingId: 'bk-96'
        }
      ]
    };
  });

  // 7. Website Feedbacks Store with localStorage persistence
  const [websiteFeedbacks, setWebsiteFeedbacks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WEBSITE_FEEDBACKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return [
      {
        id: 'wfb-1',
        category: 'Rental & Escrow Process',
        rating: 5,
        title: 'Amazing Escrow Security in Bhimavaram',
        message: 'The physical inspection checklist and deposit protection gives peace of mind. Both renting and lending is seamless!',
        submittedBy: 'Venkatesh Rao',
        date: 'Aug 15, 2026'
      },
      {
        id: 'wfb-2',
        category: 'General User Experience',
        rating: 5,
        title: 'Map view and neighborhood search is super fast',
        message: 'Love being able to see items near SRKR and J P Road directly on the map.',
        submittedBy: 'Pooja Sharma',
        date: 'Aug 14, 2026'
      }
    ];
  });

  // Fetch live cloud items from MongoDB API on startup and poll every 8 seconds
  useEffect(() => {
    const fetchCloudItems = async () => {
      try {
        const res = await fetch('/api/items');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setItems(prev => {
              const merged = mergeCustomAndBase([...json.data, ...prev]);
              try {
                localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(merged));
              } catch (e) {}
              return merged;
            });
          }
        }
      } catch (err) {
        // Offline / fallback to local cache
      }
    };

    fetchCloudItems();
    const interval = setInterval(fetchCloudItems, 8000);
    return () => clearInterval(interval);
  }, []);

  // Real-time synchronization across browser tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEYS.BOOKINGS && e.newValue) {
        try {
          setMyBookings(JSON.parse(e.newValue));
        } catch (err) {}
      }
      if (e.key === STORAGE_KEYS.ITEMS && e.newValue) {
        try {
          setItems(JSON.parse(e.newValue));
        } catch (err) {}
      }
      if (e.key === STORAGE_KEYS.MY_LISTINGS && e.newValue) {
        try {
          setMyListings(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // SYNC STATES TO LOCALSTORAGE
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MY_LISTINGS, JSON.stringify(myListings));
    } catch (e) {}
  }, [myListings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(myBookings));
    } catch (e) {}
  }, [myBookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCT_REVIEWS, JSON.stringify(productReviews));
    } catch (e) {}
  }, [productReviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WEBSITE_FEEDBACKS, JSON.stringify(websiteFeedbacks));
    } catch (e) {}
  }, [websiteFeedbacks]);

  const toggleWishlist = (itemId) => {
    setWishlist(prev => {
      const isFav = prev.includes(itemId);
      if (isFav) {
        toast('Removed from wishlist', { icon: '💔' });
        return prev.filter(id => id !== itemId);
      } else {
        toast.success('Saved to wishlist!');
        return [...prev, itemId];
      }
    });
  };

  // Add Product Review & Update Item Average Rating
  const addProductReview = (itemId, reviewData) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      ...reviewData,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setProductReviews(prev => {
      const existing = prev[itemId] || [];
      const updated = [newReview, ...existing];

      const avg = (updated.reduce((sum, r) => sum + r.rating, 0) / updated.length).toFixed(2);
      setItems(prevItems => prevItems.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            rating: Number(avg),
            reviewCount: updated.length
          };
        }
        return item;
      }));

      return {
        ...prev,
        [itemId]: updated
      };
    });

    toast.success('Thank you! Your product review and feedback has been published.');
    return newReview;
  };

  const getProductReviews = (itemId) => {
    return productReviews[itemId] || [];
  };

  // Submit Website / Platform Feedback
  const submitWebsiteFeedback = (feedbackData) => {
    const newFeedback = {
      id: `wfb-${Date.now()}`,
      ...feedbackData,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setWebsiteFeedbacks(prev => [newFeedback, ...prev]);
    toast.success('🎉 Thank you for your feedback! Your review helps make BorrowBridge even better.', { duration: 4500 });
    return newFeedback;
  };

  // STAGE 1: Renter Submits Booking Request with Date Range
  const createBookingRequest = (bookingData) => {
    const newBooking = {
      id: `bk-${Date.now()}`,
      ...bookingData,
      stage: 'REQUESTED',
      status: 'Pending Owner Acceptance',
      escrowStatus: 'No Upfront Charge (Awaiting Owner Acceptance)',
      pickupInspection: null,
      returnInspection: null,
      createdAt: new Date().toISOString()
    };
    setMyBookings(prev => [newBooking, ...prev]);
    toast.success('Booking request sent to owner! Awaiting owner acceptance.', { duration: 4000 });
    return newBooking;
  };

  const createBooking = (bookingData) => createBookingRequest(bookingData);

  // STAGE 2: Owner Accepts Booking Request
  const acceptBookingRequest = (bookingId) => {
    setMyBookings(prev => prev.map(bk => {
      if (bk.id === bookingId) {
        toast.success('Booking request accepted! Coordinate with renter for physical pickup & working inspection.');
        return {
          ...bk,
          stage: 'ACCEPTED',
          status: 'Request Accepted - Awaiting Joint Pickup Inspection',
          escrowStatus: 'Awaiting Pickup & Escrow Payment'
        };
      }
      return bk;
    }));
  };

  // STAGE 2 (Alt): Owner Declines Booking Request
  const declineBookingRequest = (bookingId, reason = 'Dates not available') => {
    setMyBookings(prev => prev.map(bk => {
      if (bk.id === bookingId) {
        toast('Booking request declined.', { icon: 'ℹ️' });
        return {
          ...bk,
          stage: 'DECLINED',
          status: 'Declined by Owner',
          escrowStatus: 'No Charges Made',
          declineReason: reason
        };
      }
      return bk;
    }));
  };

  // STAGE 3: Owner logs Physical Working Condition Checklist & Inspection
  const submitPickupInspection = (bookingId, inspectionData) => {
    setMyBookings(prev => prev.map(bk => {
      if (bk.id === bookingId) {
        toast.success('Working condition checklist recorded! Renter can now accept & authorize Escrow payment.', { duration: 4500 });
        return {
          ...bk,
          stage: 'INSPECTION_PENDING_RENTER',
          status: 'Inspection Logged - Awaiting Renter Payment & Agreement',
          escrowStatus: 'Awaiting Renter Escrow Payment',
          pickupInspection: {
            inspected: true,
            checklist: inspectionData.checklist,
            notes: inspectionData.notes || 'Equipment tested and in verified operational order.',
            timestamp: new Date().toISOString(),
            inspectedBy: `${bk.ownerName} (Owner)`
          }
        };
      }
      return bk;
    }));
  };

  // STAGE 4: Renter Accepts Condition, Digital Terms & Pays Rent + Refundable Security Deposit
  const renterAcceptAndPay = (bookingId, paymentData = {}) => {
    setMyBookings(prev => prev.map(bk => {
      if (bk.id === bookingId) {
        toast.success(`Payment successful! ₹${bk.deposit} security deposit secured in Escrow. Rental is now active!`, { duration: 5000 });
        return {
          ...bk,
          stage: 'ACTIVE',
          status: 'Active Rental - Item Handed Over',
          escrowStatus: `₹${bk.deposit} Security Deposit Held in Escrow`,
          paymentMethod: paymentData.paymentMethod || 'UPI / Instant Escrow Pay',
          paidAt: new Date().toISOString()
        };
      }
      return bk;
    }));
  };

  // STAGE 5: Renter Initiates Return to Owner
  const initiateReturn = (bookingId) => {
    setMyBookings(prev => prev.map(bk => {
      if (bk.id === bookingId) {
        toast.success('Return initiated! Meet the owner for final condition handover & deposit settlement.', { duration: 4500 });
        return {
          ...bk,
          stage: 'RETURN_INITIATED',
          status: 'Return in Progress - Under Final Inspection',
          escrowStatus: 'Escrow Ready for Final Settlement'
        };
      }
      return bk;
    }));
  };

  const requestReturnAndInspection = (bookingId) => initiateReturn(bookingId);

  // STAGE 6: Owner performs Final Handover & Settles Escrow
  const submitReturnHandover = (bookingId, { hasDamage, damageDetails, damageAmount = 0 }) => {
    setMyBookings(prev => prev.map(bk => {
      if (bk.id === bookingId) {
        const deposit = bk.deposit || 0;
        const validDamageAmount = Math.min(deposit, Math.max(0, Number(damageAmount)));
        const refundAmount = deposit - validDamageAmount;

        if (hasDamage && validDamageAmount > 0) {
          toast.success(
            `Handover complete! ₹${validDamageAmount} damage fee paid to owner. Remaining ₹${refundAmount} deposit refunded to renter.`,
            { duration: 6000 }
          );
        } else {
          toast.success(
            `Handover accepted with 0 damage! 100% of ₹${deposit} security deposit refunded to renter.`,
            { duration: 5000 }
          );
        }

        return {
          ...bk,
          stage: 'COMPLETED',
          status: hasDamage && validDamageAmount > 0 ? 'Completed (Damage Settled)' : 'Completed (Deposit Refunded)',
          escrowStatus: hasDamage && validDamageAmount > 0
            ? `₹${validDamageAmount} to Owner for Damage | ₹${refundAmount} Refunded to Renter`
            : `100% Deposit (₹${deposit}) Refunded to Renter`,
          returnInspection: {
            inspected: true,
            hasDamage: Boolean(hasDamage && validDamageAmount > 0),
            damageDetails: damageDetails || 'Returned in good working condition.',
            damageAmount: validDamageAmount,
            refundAmount: refundAmount,
            timestamp: new Date().toISOString()
          }
        };
      }
      return bk;
    }));
  };

  const cancelBooking = (bookingId) => {
    setMyBookings(prev => prev.map(bk => {
      if (bk.id === bookingId) {
        toast.success('Booking cancelled.');
        return {
          ...bk,
          stage: 'CANCELLED',
          status: 'Cancelled',
          escrowStatus: 'No Funds Deducted'
        };
      }
      return bk;
    }));
  };

  // ADD NEW LISTING - Guaranteed Persistence & Instant Display
  const addListing = (newItemData) => {
    const newItem = {
      id: `item-${Date.now()}`,
      title: newItemData.title,
      category: newItemData.category || 'Cameras',
      description: newItemData.description || `${newItemData.title} in ${newItemData.condition || 'Good'} condition.`,
      dailyRent: Number(newItemData.dailyRent) || 500,
      threeDayRent: Number(newItemData.threeDayRent) || Math.round((Number(newItemData.dailyRent) || 500) * 0.93),
      sevenDayRent: Number(newItemData.sevenDayRent) || Math.round((Number(newItemData.dailyRent) || 500) * 0.875),
      marketValue: Number(newItemData.marketValue) || 40000,
      deposit: Number(newItemData.deposit) || 3000,
      condition: newItemData.condition || 'Good',
      features: newItemData.features && newItemData.features.length > 0
        ? newItemData.features
        : ['Original Accessories', 'Tested & Verified', 'Local Pickup Available'],
      images: newItemData.images && newItemData.images.length > 0
        ? newItemData.images
        : ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80'],
      rating: 5.0,
      reviewCount: 1,
      availability: 'Available Now',
      distanceKm: 0.8,
      location: {
        city: newItemData.location?.city || 'Bhimavaram',
        address: newItemData.location?.address || 'SRKR College Road, Bhimavaram, AP',
        lat: Number(newItemData.location?.lat) || 16.5449,
        lng: Number(newItemData.location?.lng) || 81.5212
      },
      owner: {
        name: newItemData.ownerName || 'Verified Owner',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        rating: 5.0,
        responseRate: '100%',
        verified: true,
        phone: newItemData.ownerPhone || '+91 98765 43210',
        email: newItemData.ownerEmail || 'owner@example.com',
        location: newItemData.location?.address || 'Bhimavaram, AP'
      }
    };

    setItems(prev => {
      const filtered = prev.filter(i => i.id !== newItem.id);
      const updated = [newItem, ...filtered];
      try {
        localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setMyListings(prev => {
      const filtered = prev.filter(i => i.id !== newItem.id);
      const updated = [newItem, ...filtered];
      try {
        localStorage.setItem(STORAGE_KEYS.MY_LISTINGS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // Sync to MongoDB Cloud Database in background
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    }).catch(() => {});

    toast.success('🎉 Product added successfully and is now live across Marketplace & Map!');
    return newItem;
  };

  // OWNER & ADMIN EDITING ACTIONS
  const updateItem = (itemId, updatedFields) => {
    setItems(prev => {
      const updated = prev.map(i => i.id === itemId ? { ...i, ...updatedFields } : i);
      try {
        localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setMyListings(prev => {
      const updated = prev.map(i => i.id === itemId ? { ...i, ...updatedFields } : i);
      try {
        localStorage.setItem(STORAGE_KEYS.MY_LISTINGS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // Sync updates to MongoDB Cloud Database in background
    fetch('/api/items', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: itemId, ...updatedFields })
    }).catch(() => {});

    toast.success('Product details updated successfully!');
  };

  const deleteItem = (itemId) => {
    setItems(prev => {
      const updated = prev.filter(i => i.id !== itemId);
      try {
        localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setMyListings(prev => {
      const updated = prev.filter(i => i.id !== itemId);
      try {
        localStorage.setItem(STORAGE_KEYS.MY_LISTINGS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // Sync deletion to MongoDB Cloud Database in background
    fetch(`/api/items?id=${itemId}`, {
      method: 'DELETE'
    }).catch(() => {});

    toast.success('Listing permanently removed!');
  };

  const clearTestListings = () => {
    setItems(prev => {
      const updated = prev.filter(i => !i.id.startsWith('item-17'));
      try {
        localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    setMyListings([]);
    try {
      localStorage.setItem(STORAGE_KEYS.MY_LISTINGS, JSON.stringify([]));
    } catch (e) {}
    toast.success('All fake/test added listings removed successfully!');
  };

  const resetAllToDefault = () => {
    setItems(sampleItems);
    setMyListings([]);
    try {
      localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(sampleItems));
      localStorage.setItem(STORAGE_KEYS.MY_LISTINGS, JSON.stringify([]));
    } catch (e) {}
    toast.success('Reset marketplace to original catalog!');
  };

  const updateUser = (userId, updatedFields) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updatedFields } : u));
    toast.success('User account details updated by Admin!');
  };

  const deleteUser = (userId) => {
    setAllUsers(prev => prev.filter(u => u.id !== userId));
    toast.success('User account removed!');
  };

  const toggleVerifyUser = (userId) => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === 'Verified' ? 'Pending Verification' : 'Verified';
        toast.success(`User status updated to ${newStatus}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const updateBooking = (bookingId, updatedFields) => {
    setMyBookings(prev => prev.map(b => b.id === bookingId ? { ...b, ...updatedFields } : b));
    toast.success('Booking details updated!');
  };

  return (
    <BookingContext.Provider value={{
      items,
      wishlist,
      myListings,
      myBookings,
      allUsers,
      productReviews,
      websiteFeedbacks,
      toggleWishlist,
      addProductReview,
      getProductReviews,
      submitWebsiteFeedback,
      createBookingRequest,
      createBooking,
      acceptBookingRequest,
      declineBookingRequest,
      submitPickupInspection,
      renterAcceptAndPay,
      initiateReturn,
      requestReturnAndInspection,
      submitReturnHandover,
      cancelBooking,
      addListing,
      updateItem,
      deleteItem,
      clearTestListings,
      resetAllToDefault,
      updateUser,
      deleteUser,
      toggleVerifyUser,
      updateBooking,
      isWishlisted: (id) => wishlist.includes(id)
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
