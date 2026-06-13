// ============================================================
// TYPE DEFINITIONS FOR AI-ENHANCED CARPOOLING APPLICATION
// ============================================================

export type UserRole = 'driver' | 'passenger';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  rating: number;
  totalRides: number;
  joinedDate: string;
  verified: boolean;
  vehicle?: Vehicle;
  preferences?: PassengerPreferences;
}

export interface Vehicle {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  seats: number;
}

export interface PassengerPreferences {
  music: boolean;
  smoking: boolean;
  pets: boolean;
  ac: boolean;
  luggage: 'none' | 'small' | 'large';
}

export type RideStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
export type MatchLevel = 'Best Match' | 'Suitable Match' | 'Low Match';

export interface Ride {
  id: string;
  driverId: string;
  driverName: string;
  driverAvatar?: string;
  driverRating: number;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  availableSeats: number;
  totalSeats: number;
  price: number;
  status: RideStatus;
  distance: string;
  duration: string;
  vehicle: Vehicle;
  preferences: PassengerPreferences;
  matchScore?: number;
  matchLevel?: MatchLevel;
  aiInsight?: string;
  route?: string[];
  bookedPassengers?: string[];
}

export interface Booking {
  id: string;
  rideId: string;
  passengerId: string;
  passengerName: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  driverName: string;
  driverRating: number;
  vehicle: Vehicle;
  matchLevel?: MatchLevel;
  aiInsight?: string;
  bookedAt: string;
}

export interface Rating {
  id: string;
  rideId: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  review: string;
  date: string;
}

export interface RideHistory {
  id: string;
  rideId: string;
  userId: string;
  role: UserRole;
  pickup: string;
  destination: string;
  date: string;
  price: number;
  status: RideStatus;
  rating?: number;
  distance: string;
}

export interface AIRecommendation {
  id: string;
  userId: string;
  rideId: string;
  matchLevel: MatchLevel;
  compatibilityScore: number;
  insight: string;
  routeAnalysis: string;
  timestamp: string;
}

export interface DashboardStats {
  totalRides: number;
  totalBookings: number;
  successRate: number;
  averageRating: number;
  totalEarnings?: number;
  totalSpent?: number;
  activeRides: number;
  completedRides: number;
}

export interface ChartData {
  name: string;
  rides: number;
  bookings: number;
  earnings?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface Notification {
  id: string;
  userId: string; // Add this line
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}