import React, { createContext, useContext, useState } from 'react';
import { sampleItems } from '../data/items';
import toast from 'react-hot-toast';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [items, setItems] = useState(sampleItems);
  const [wishlist, setWishlist] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [allUsers, setAllUsers] = useState([
    { id: 'usr-1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'Seller / Owner', status: 'Verified', listingsCount: 4, bookingsCount: 38, joined: 'May 2026', phone: '+91 98765 43210', location: 'SRKR College Road, Bhimavaram' },
    { id: 'usr-2', name: 'Marcus Vance', email: 'marcus.v@example.com', role: 'Both', status: 'Verified', listingsCount: 3, bookingsCount: 24, joined: 'June 2026', phone: '+91 98765 43211', location: 'J P Road, Bhimavaram' },
    { id: 'usr-3', name: 'Elena Rostova', email: 'elena.r@example.com', role: 'Seller / Owner', status: 'Verified', listingsCount: 2, bookingsCount: 42, joined: 'April 2026', phone: '+91 98765 43212', location: 'Undi Road, Bhimavaram' },
    { id: 'usr-4', name: 'David Kim', email: 'david.k@example.com', role: 'Both', status: 'Verified', listingsCount: 2, bookingsCount: 19, joined: 'July 2026', phone: '+91 98765 43213', location: 'P P Road, Bhimavaram' }
  ]);

  const [myBookings, setMyBookings] = useState([]);

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
      inspectionStatus: 'Pending Return',
      createdAt: new Date().toISOString()
    };
    setMyBookings(prev => [newBooking, ...prev]);
    toast.success('Booking confirmed! Rent collected & safety deposit held in escrow.', { duration: 4000 });
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setMyBookings(prev => prev.map(bk => {
      if (bk.id === bookingId) {
        toast.success('Booking cancelled. Full refund & deposit returned to consumer.');
        return { ...bk, status: 'Cancelled', escrowStatus: 'Full Refund Processed' };
      }
      return bk;
    }));
  };

  const requestReturnAndInspection = (bookingId) => {
    setMyBookings(prev => prev.map(bk => {
      if (bk.id === bookingId) {
        toast.success('Item return initiated! Under inspection for damage checks.', { duration: 4000 });
        return { ...bk, status: 'Under Inspection', escrowStatus: 'Damage Inspection Active' };
      }
      return bk;
    }));
  };

  const addListing = (newItemData) => {
    const newItem = {
      id: `item-${Date.now()}`,
      ...newItemData,
      rating: 5.0,
      reviewCount: 1,
      availability: 'Available Now',
      distanceKm: 0.8,
      owner: {
        name: newItemData.ownerName || 'Verified Seller',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        rating: 5.0,
        responseRate: '100%',
        verified: true,
        phone: '+91 98765 43210',
        location: 'Bhimavaram, AP'
      }
    };
    setItems(prev => [newItem, ...prev]);
    setMyListings(prev => [newItem, ...prev]);
    toast.success('Your product is live for rent on BorrowBridge!');
    return newItem;
  };

  // ADMIN EDITING & GOVERNANCE ACTIONS
  const updateItem = (itemId, updatedFields) => {
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, ...updatedFields } : i));
    setMyListings(prev => prev.map(i => i.id === itemId ? { ...i, ...updatedFields } : i));
    toast.success('Listing updated by Admin!');
  };

  const deleteItem = (itemId) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
    setMyListings(prev => prev.filter(i => i.id !== itemId));
    toast.success('Listing removed by Admin');
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
    toast.success('Booking & Escrow details updated!');
  };

  const releaseEscrowDeposit = (bookingId) => {
    setMyBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        toast.success(`No damages found! Safety deposit of ₹${b.deposit} refunded to consumer & rent paid to owner.`);
        return { ...b, escrowStatus: 'Refunded to Consumer (No Damage)', status: 'Completed' };
      }
      return b;
    }));
  };

  const deductEscrowDeposit = (bookingId, damageAmount) => {
    setMyBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        toast.error(`Deducted ₹${damageAmount} from deposit for item damages. Remaining balance refunded to consumer.`);
        return { ...b, escrowStatus: `Deducted ₹${damageAmount} for Damages`, status: 'Completed' };
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
      cancelBooking,
      requestReturnAndInspection,
      addListing,
      updateItem,
      deleteItem,
      updateUser,
      deleteUser,
      toggleVerifyUser,
      updateBooking,
      releaseEscrowDeposit,
      deductEscrowDeposit,
      isWishlisted: (id) => wishlist.includes(id)
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
