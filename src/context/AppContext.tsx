// ============================================================
// APPLICATION STATE CONTEXT
// Manages rides, bookings, notifications, and AI state
// ============================================================

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Ride, Booking, Notification, RideHistory } from '../types';
import { mockRides, mockBookings, mockNotifications, mockRideHistory } from '../data/mockData';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface AppContextType {
  rides: Ride[];
  bookings: Booking[];
  notifications: Notification[];
  rideHistory: RideHistory[];
  isAILoading: boolean;
  addRide: (ride: Omit<Ride, 'id'>) => void;
  bookRide: (rideId: string, userId: string, userName: string, seats: number) => Promise<boolean>;
  cancelBooking: (bookingId: string) => void;
  cancelRide: (rideId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  setAILoading: (val: boolean) => void;
  unreadCount: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [rides, setRides] = useState<Ride[]>(mockRides);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [rideHistory, setRideHistory] = useState<RideHistory[]>(mockRideHistory);
  const [isAILoading, setIsAILoadingState] = useState(false);

  const setAILoading = useCallback((val: boolean) => setIsAILoadingState(val), []);

  const addRide = useCallback((rideData: Omit<Ride, 'id'>) => {
    const newRide: Ride = { ...rideData, id: `r${Date.now()}` };
    setRides((prev) => [newRide, ...prev]);

    const newNotif: Notification = {
      id: `n${Date.now()}`,
      userId: newRide.driverId,
      type: 'success',
      title: 'Ride Posted!',
      message: `Your ride from ${newRide.pickup} to ${newRide.destination} has been posted.`,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    toast.success('Ride posted successfully! 🚗');
  }, []);

  const bookRide = useCallback(
    async (rideId: string, userId: string, userName: string, seats: number): Promise<boolean> => {
      await new Promise((r) => setTimeout(r, 800));

      const ride = rides.find((r) => r.id === rideId);

      if (!ride || ride.availableSeats < seats) {
        toast.error('Not enough seats available');
        return false;
      }

      const newBooking: Booking = {
        id: `b${Date.now()}`,
        rideId,
        passengerId: userId,
        passengerName: userName,
        pickup: ride.pickup,
        destination: ride.destination,
        date: ride.date,
        time: ride.time,
        seats,
        totalPrice: ride.price * seats,
        status: 'confirmed',
        driverName: ride.driverName,
        driverRating: ride.driverRating,
        vehicle: ride.vehicle,
        matchLevel: ride.matchLevel,
        aiInsight: ride.aiInsight,
        bookedAt: new Date().toISOString(),
      };

      setBookings((prev) => [newBooking, ...prev]);

      setRides((prev) =>
        prev.map((r) =>
          r.id === rideId
            ? { ...r, availableSeats: r.availableSeats - seats }
            : r
        )
      );

      const passengerNotif: Notification = {
        id: `n${Date.now()}p`,
        userId: userId,
        type: 'success',
        title: 'Booking Confirmed! ✅',
        message: `Ride from ${ride.pickup} to ${ride.destination} on ${ride.date} is confirmed.`,
        timestamp: new Date().toISOString(),
        read: false,
      };

      const driverNotif: Notification = {
        id: `n${Date.now()}d`,
        userId: ride.driverId,
        type: 'info',
        title: 'New Booking Request',
        message: `${userName} has booked your ride from ${ride.pickup} to ${ride.destination}.`,
        timestamp: new Date().toISOString(),
        read: false,
      };

      setNotifications((prev) => [passengerNotif, driverNotif, ...prev]);

      const historyEntry: RideHistory = {
        id: `rh${Date.now()}`,
        rideId,
        userId,
        role: 'passenger',
        pickup: ride.pickup,
        destination: ride.destination,
        date: ride.date,
        price: ride.price * seats,
        status: 'upcoming',
        distance: ride.distance,
      };

      setRideHistory((prev) => [historyEntry, ...prev]);

      toast.success('Ride booked successfully! 🎉');
      return true;
    },
    [rides]
  );

  const cancelBooking = useCallback((bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      )
    );

    const newNotif: Notification = {
      id: `n${Date.now()}`,
      userId: booking?.passengerId || '',
      type: 'warning',
      title: 'Booking Cancelled',
      message: 'Your booking has been cancelled successfully.',
      timestamp: new Date().toISOString(),
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    toast.success('Booking cancelled');
  }, [bookings]);

  const cancelRide = useCallback((rideId: string) => {
    setRides((prev) =>
      prev.map((r) =>
        r.id === rideId ? { ...r, status: 'cancelled' as const } : r
      )
    );
    toast.success('Ride cancelled');
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.userId === user?.id ? { ...n, read: true } : n
      )
    );
  }, [user?.id]);

  const userNotifications = notifications.filter(
    (n) => n.userId === user?.id
  );

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        rides,
        bookings,
        notifications: userNotifications,
        rideHistory,
        isAILoading,
        addRide,
        bookRide,
        cancelBooking,
        cancelRide,
        markNotificationRead,
        markAllRead,
        setAILoading,
        unreadCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}