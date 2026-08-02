import React, { createContext, useContext, useState } from 'react';
import { sampleItems } from '../data/items';
import toast from 'react-hot-toast';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [items, setItems] = useState(sampleItems);
  const [wishlist, setWishlist] = useState(['item-1', 'item-4']);
  const [myListings, setMyListings] = useState([]);
  const [allUsers, setAllUsers] = useState([
    { id: 'usr-1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'Owner', status: 'Verified', listingsCount: 4, bookingsCount: 38, joined: 'May 2026' },
    { id: 'usr-2', name: 'Marcus Vance', email: 'marcus.v@example.com', role: 'Both', status: 'Verified', listingsCount: 3, bookingsCount: 24, joined: 'June 2026' },
    { id: 'usr-3', name: 'Elena Rostova', email: 'elena.r@example.com', role: 'Owner', status: 'Verified', listingsCount: 2, bookingsCount: 42, joined: 'April 2026' },
    { id: 'usr-4', name: 'David Kim', email: 'david.k@example.com', role: 'Both', status: 'Verified', listingsCount: 2, bookingsCount: 19, joined: 'July 2026' },
    { id: 'usr-5', name: 'Robert Miller', email: 'robert.m@example.com', role: 'Owner', status: 'Pending Verification', listingsCount: 2, bookingsCount: 56, joined: 'August 2026' }
  ]);

  const [myBookings, setMyBookings] = useState([
    {
      id: 'bk-101',
      itemId: 'item-1',
      itemTitle: 'Canon EOS R5 Full-Frame Mirrorless Camera Kit',
      itemImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
      category: 'Cameras',
      startDate: '2026-08-15',
      endDate: '2026-08-18',
      days: 3,
      dailyRent: 45,
      totalRent: 135,
      deposit: 300,
      totalPaid: 435,
      status: 'Confirmed',
      pickupType: 'Local Pickup',
      ownerName: 'Sarah Jenkins',
      ownerPhone: '+1 (555) 234-5678',
      escrowStatus: 'Held in Escrow'
    },
    {
      id: 'bk-102',
      itemId: 'item-4',
      itemTitle: 'DJI Mavic 3 Pro Cine Drone',
      itemImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
      category: 'Drones',
      startDate: '2026-08-01',
      endDate: '2026-08-03',
      days: 2,
      dailyRent: 60,
      totalRent: 120,
      deposit: 500,
      totalPaid: 620,
      status: 'Completed',
      pickupType: 'Doorstep Courier',
      ownerName: 'David Kim',
      ownerPhone: '+1 (555) 901-2345',
      escrowStatus: 'Refunded to Renter'
    }
  ]);

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

  const createBooking = (bookingData) => {
    const newBooking = {
      id: `bk-${Date.now()}`,
      ...bookingData,
      status: 'Confirmed',
      escrowStatus: 'Held in Escrow',
      createdAt: new Date().toISOString()
    };
    setMyBookings(prev => [newBooking, ...prev]);
    toast.success('Booking confirmed! Refundable deposit secured.', { duration: 4000 });
    return newBooking;
  };

  const addListing = (newItemData) => {
    const newItem = {
      id: `item-${Date.now()}`,
      ...newItemData,
      rating: 5.0,
      reviewCount: 1,
      availability: 'Available Now',
      distance: 0.4,
      owner: {
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        rating: 5.0,
        responseRate: '100%',
        verified: true,
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA'
      }
    };
    setItems(prev => [newItem, ...prev]);
    setMyListings(prev => [newItem, ...prev]);
    toast.success('Your item is live on BorrowBridge!');
    return newItem;
  };

  // ADMIN ACTIONS
  const deleteItem = (itemId) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
    setMyListings(prev => prev.filter(i => i.id !== itemId));
    toast.success('Listing deleted by Admin');
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

  const releaseEscrowDeposit = (bookingId) => {
    setMyBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        toast.success(`Deposit of $${b.deposit} released back to Renter!`);
        return { ...b, escrowStatus: 'Refunded to Renter', status: 'Completed' };
      }
      return b;
    }));
  };

  return (
    <BookingContext.Provider value={{
      items,
      wishlist,
      myListings,
      myBookings,
      allUsers,
      toggleWishlist,
      createBooking,
      addListing,
      deleteItem,
      toggleVerifyUser,
      releaseEscrowDeposit,
      isWishlisted: (id) => wishlist.includes(id)
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
