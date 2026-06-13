// ============================================================
// MOCK DATA FOR AI-ENHANCED CARPOOLING APPLICATION
// Simulates backend responses from FastAPI + MySQL
// ============================================================

import { User, Ride, Booking, RideHistory, AIRecommendation, Notification, ChartData } from '../types';

// ── USERS ──────────────────────────────────────────────────
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Arjun Sharma',
    email: 'driver@rideshare.com',
    phone: '+91 9876543210',
    role: 'driver',
    rating: 4.8,
    totalRides: 247,
    joinedDate: '2023-01-15',
    verified: true,
    vehicle: {
      make: 'Honda',
      model: 'City',
      year: 2022,
      color: 'Pearl White',
      licensePlate: 'TS 09 AB 1234',
      seats: 4,
    },
    preferences: {
      music: true,
      smoking: false,
      pets: false,
      ac: true,
      luggage: 'small',
    },
  },
  {
    id: 'u2',
    name: 'Priya Patel',
    email: 'passenger@rideshare.com',
    phone: '+91 9123456780',
    role: 'passenger',
    rating: 4.6,
    totalRides: 89,
    joinedDate: '2023-05-20',
    verified: true,
    preferences: {
      music: true,
      smoking: false,
      pets: true,
      ac: true,
      luggage: 'small',
    },
  },
  {
    id: 'u3',
    name: 'Rahul Verma',
    email: 'rahul@rideshare.com',
    phone: '+91 9988776655',
    role: 'driver',
    rating: 4.5,
    totalRides: 183,
    joinedDate: '2022-11-10',
    verified: true,
    vehicle: {
      make: 'Hyundai',
      model: 'Creta',
      year: 2021,
      color: 'Phantom Black',
      licensePlate: 'TS 10 CD 5678',
      seats: 5,
    },
    preferences: {
      music: false,
      smoking: false,
      pets: false,
      ac: true,
      luggage: 'large',
    },
  },
  {
    id: 'u4',
    name: 'Sneha Reddy',
    email: 'sneha@rideshare.com',
    phone: '+91 8877665544',
    role: 'driver',
    rating: 4.9,
    totalRides: 312,
    joinedDate: '2022-08-05',
    verified: true,
    vehicle: {
      make: 'Toyota',
      model: 'Innova Crysta',
      year: 2023,
      color: 'Silver',
      licensePlate: 'TS 07 EF 9012',
      seats: 6,
    },
    preferences: {
      music: true,
      smoking: false,
      pets: true,
      ac: true,
      luggage: 'large',
    },
  },
];

// ── RIDES ──────────────────────────────────────────────────
export const mockRides: Ride[] = [
  {
    id: 'r1',
    driverId: 'u1',
    driverName: 'Arjun Sharma',
    driverRating: 4.8,
    pickup: 'Gachibowli',
    destination: 'Hitech City',
    date: '2025-07-20',
    time: '08:30 AM',
    availableSeats: 3,
    totalSeats: 4,
    price: 80,
    status: 'upcoming',
    distance: '5.2 km',
    duration: '18 min',
    vehicle: { make: 'Honda', model: 'City', year: 2022, color: 'Pearl White', licensePlate: 'TS 09 AB 1234', seats: 4 },
    preferences: { music: true, smoking: false, pets: false, ac: true, luggage: 'small' },
    matchScore: 95,
    matchLevel: 'Best Match',
    aiInsight: 'This ride is ideal for office commuters traveling from Gachibowli to Hitech City during peak morning hours. The route has high compatibility, excellent passenger ratings, and the driver has a stellar 4.8 rating with 247 completed rides.',
    route: ['Gachibowli', 'DLF Cyber City', 'Mindspace', 'Hitech City'],
    bookedPassengers: ['Priya P.'],
  },
  {
    id: 'r2',
    driverId: 'u3',
    driverName: 'Rahul Verma',
    driverRating: 4.5,
    pickup: 'Kondapur',
    destination: 'HITEC City',
    date: '2025-07-20',
    time: '09:00 AM',
    availableSeats: 2,
    totalSeats: 5,
    price: 70,
    status: 'upcoming',
    distance: '6.8 km',
    duration: '22 min',
    vehicle: { make: 'Hyundai', model: 'Creta', year: 2021, color: 'Phantom Black', licensePlate: 'TS 10 CD 5678', seats: 5 },
    preferences: { music: false, smoking: false, pets: false, ac: true, luggage: 'large' },
    matchScore: 78,
    matchLevel: 'Suitable Match',
    aiInsight: 'A suitable option for passengers from Kondapur heading to HITEC City. The driver is experienced with 183 rides and maintains a clean vehicle. Slightly longer route but reasonable pricing.',
    route: ['Kondapur', 'Madhapur', 'HITEC City'],
    bookedPassengers: ['Amit K.', 'Sree V.', 'Mohan R.'],
  },
  {
    id: 'r3',
    driverId: 'u4',
    driverName: 'Sneha Reddy',
    driverRating: 4.9,
    pickup: 'Jubilee Hills',
    destination: 'Banjara Hills',
    date: '2025-07-20',
    time: '07:45 AM',
    availableSeats: 4,
    totalSeats: 6,
    price: 60,
    status: 'upcoming',
    distance: '3.5 km',
    duration: '12 min',
    vehicle: { make: 'Toyota', model: 'Innova Crysta', year: 2023, color: 'Silver', licensePlate: 'TS 07 EF 9012', seats: 6 },
    preferences: { music: true, smoking: false, pets: true, ac: true, luggage: 'large' },
    matchScore: 91,
    matchLevel: 'Best Match',
    aiInsight: 'An excellent choice for morning commuters from Jubilee Hills to Banjara Hills. Driver Sneha has the highest rating on the platform (4.9) with 312 rides. Spacious Innova with AC and music – perfect for a comfortable morning commute.',
    route: ['Jubilee Hills', 'Road No. 12', 'Banjara Hills'],
    bookedPassengers: ['Ravi S.', 'Kavita M.'],
  },
  {
    id: 'r4',
    driverId: 'u1',
    driverName: 'Arjun Sharma',
    driverRating: 4.8,
    pickup: 'Madhapur',
    destination: 'Secunderabad',
    date: '2025-07-21',
    time: '10:00 AM',
    availableSeats: 3,
    totalSeats: 4,
    price: 120,
    status: 'upcoming',
    distance: '18.3 km',
    duration: '40 min',
    vehicle: { make: 'Honda', model: 'City', year: 2022, color: 'Pearl White', licensePlate: 'TS 09 AB 1234', seats: 4 },
    preferences: { music: true, smoking: false, pets: false, ac: true, luggage: 'small' },
    matchScore: 85,
    matchLevel: 'Suitable Match',
    aiInsight: 'A recommended ride for passengers traveling from Madhapur to Secunderabad. The journey covers a longer distance through the city. Driver Arjun is reliable with consistent on-time performance.',
    route: ['Madhapur', 'Begumpet', 'Secunderabad'],
  },
  {
    id: 'r5',
    driverId: 'u3',
    driverName: 'Rahul Verma',
    driverRating: 4.5,
    pickup: 'Ameerpet',
    destination: 'LB Nagar',
    date: '2025-07-21',
    time: '06:30 PM',
    availableSeats: 4,
    totalSeats: 5,
    price: 90,
    status: 'upcoming',
    distance: '14.7 km',
    duration: '35 min',
    vehicle: { make: 'Hyundai', model: 'Creta', year: 2021, color: 'Phantom Black', licensePlate: 'TS 10 CD 5678', seats: 5 },
    preferences: { music: false, smoking: false, pets: false, ac: true, luggage: 'large' },
    matchScore: 62,
    matchLevel: 'Low Match',
    aiInsight: 'An available option for evening travel from Ameerpet to LB Nagar. The route may experience peak-hour traffic. Consider booking early for guaranteed seats.',
    route: ['Ameerpet', 'Dilsukhnagar', 'LB Nagar'],
  },
  {
    id: 'r6',
    driverId: 'u4',
    driverName: 'Sneha Reddy',
    driverRating: 4.9,
    pickup: 'Kukatpally',
    destination: 'Gachibowli',
    date: '2025-07-22',
    time: '08:00 AM',
    availableSeats: 5,
    totalSeats: 6,
    price: 100,
    status: 'upcoming',
    distance: '12.1 km',
    duration: '28 min',
    vehicle: { make: 'Toyota', model: 'Innova Crysta', year: 2023, color: 'Silver', licensePlate: 'TS 07 EF 9012', seats: 6 },
    preferences: { music: true, smoking: false, pets: true, ac: true, luggage: 'large' },
    matchScore: 93,
    matchLevel: 'Best Match',
    aiInsight: 'Highly recommended for tech professionals commuting from Kukatpally to Gachibowli. The route is well-timed for office hours. Sneha\'s Innova offers the most comfort with maximum passenger capacity.',
    route: ['Kukatpally', 'KPHB', 'Miyapur', 'Gachibowli'],
  },
  {
    id: 'r7',
    driverId: 'u1',
    driverName: 'Arjun Sharma',
    driverRating: 4.8,
    pickup: 'Gachibowli',
    destination: 'Hitech City',
    date: '2025-07-15',
    time: '08:30 AM',
    availableSeats: 0,
    totalSeats: 4,
    price: 80,
    status: 'completed',
    distance: '5.2 km',
    duration: '18 min',
    vehicle: { make: 'Honda', model: 'City', year: 2022, color: 'Pearl White', licensePlate: 'TS 09 AB 1234', seats: 4 },
    preferences: { music: true, smoking: false, pets: false, ac: true, luggage: 'small' },
    matchScore: 95,
    matchLevel: 'Best Match',
    aiInsight: 'Completed ride – excellent driver-passenger match.',
    route: ['Gachibowli', 'DLF Cyber City', 'Hitech City'],
    bookedPassengers: ['Priya P.', 'Ravi K.', 'Anu S.', 'Mohan T.'],
  },
];

// ── BOOKINGS ───────────────────────────────────────────────
export const mockBookings: Booking[] = [
  {
    id: 'b1',
    rideId: 'r1',
    passengerId: 'u2',
    passengerName: 'Priya Patel',
    pickup: 'Gachibowli',
    destination: 'Hitech City',
    date: '2025-07-20',
    time: '08:30 AM',
    seats: 1,
    totalPrice: 80,
    status: 'confirmed',
    driverName: 'Arjun Sharma',
    driverRating: 4.8,
    vehicle: { make: 'Honda', model: 'City', year: 2022, color: 'Pearl White', licensePlate: 'TS 09 AB 1234', seats: 4 },
    matchLevel: 'Best Match',
    aiInsight: 'Excellent match for your morning commute. High compatibility with driver preferences.',
    bookedAt: '2025-07-18T10:30:00Z',
  },
  {
    id: 'b2',
    rideId: 'r3',
    passengerId: 'u2',
    passengerName: 'Priya Patel',
    pickup: 'Jubilee Hills',
    destination: 'Banjara Hills',
    date: '2025-07-20',
    time: '07:45 AM',
    seats: 1,
    totalPrice: 60,
    status: 'confirmed',
    driverName: 'Sneha Reddy',
    driverRating: 4.9,
    vehicle: { make: 'Toyota', model: 'Innova Crysta', year: 2023, color: 'Silver', licensePlate: 'TS 07 EF 9012', seats: 6 },
    matchLevel: 'Best Match',
    aiInsight: 'Top-rated driver on the platform. Highly recommended for a comfortable commute.',
    bookedAt: '2025-07-17T14:20:00Z',
  },
  {
    id: 'b3',
    rideId: 'r2',
    passengerId: 'u2',
    passengerName: 'Priya Patel',
    pickup: 'Kondapur',
    destination: 'HITEC City',
    date: '2025-07-14',
    time: '09:00 AM',
    seats: 1,
    totalPrice: 70,
    status: 'completed',
    driverName: 'Rahul Verma',
    driverRating: 4.5,
    vehicle: { make: 'Hyundai', model: 'Creta', year: 2021, color: 'Phantom Black', licensePlate: 'TS 10 CD 5678', seats: 5 },
    matchLevel: 'Suitable Match',
    aiInsight: 'Suitable match for your route preferences.',
    bookedAt: '2025-07-12T09:00:00Z',
  },
  {
    id: 'b4',
    rideId: 'r4',
    passengerId: 'u2',
    passengerName: 'Priya Patel',
    pickup: 'Madhapur',
    destination: 'Secunderabad',
    date: '2025-07-10',
    time: '10:00 AM',
    seats: 2,
    totalPrice: 240,
    status: 'cancelled',
    driverName: 'Arjun Sharma',
    driverRating: 4.8,
    vehicle: { make: 'Honda', model: 'City', year: 2022, color: 'Pearl White', licensePlate: 'TS 09 AB 1234', seats: 4 },
    matchLevel: 'Suitable Match',
    aiInsight: 'Cancelled by passenger.',
    bookedAt: '2025-07-08T16:45:00Z',
  },
];

// ── RIDE HISTORY ───────────────────────────────────────────
export const mockRideHistory: RideHistory[] = [
  {
    id: 'rh1',
    rideId: 'r7',
    userId: 'u1',
    role: 'driver',
    pickup: 'Gachibowli',
    destination: 'Hitech City',
    date: '2025-07-15',
    price: 320,
    status: 'completed',
    rating: 5,
    distance: '5.2 km',
  },
  {
    id: 'rh2',
    rideId: 'r8',
    userId: 'u1',
    role: 'driver',
    pickup: 'Kondapur',
    destination: 'Ameerpet',
    date: '2025-07-12',
    price: 280,
    status: 'completed',
    rating: 4,
    distance: '9.1 km',
  },
  {
    id: 'rh3',
    rideId: 'r9',
    userId: 'u1',
    role: 'driver',
    pickup: 'Madhapur',
    destination: 'Kukatpally',
    date: '2025-07-08',
    price: 360,
    status: 'completed',
    rating: 5,
    distance: '11.3 km',
  },
  {
    id: 'rh4',
    rideId: 'r10',
    userId: 'u1',
    role: 'driver',
    pickup: 'Jubilee Hills',
    destination: 'Gachibowli',
    date: '2025-07-05',
    price: 200,
    status: 'cancelled',
    distance: '7.8 km',
  },
  {
    id: 'rh5',
    rideId: 'r11',
    userId: 'u2',
    role: 'passenger',
    pickup: 'Kondapur',
    destination: 'HITEC City',
    date: '2025-07-14',
    price: 70,
    status: 'completed',
    rating: 4,
    distance: '6.8 km',
  },
  {
    id: 'rh6',
    rideId: 'r12',
    userId: 'u2',
    role: 'passenger',
    pickup: 'Gachibowli',
    destination: 'Hitech City',
    date: '2025-07-10',
    price: 80,
    status: 'completed',
    rating: 5,
    distance: '5.2 km',
  },
];

// ── AI RECOMMENDATIONS ─────────────────────────────────────
export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: 'ai1',
    userId: 'u2',
    rideId: 'r1',
    matchLevel: 'Best Match',
    compatibilityScore: 95,
    insight: 'This ride is ideal for office commuters traveling from Gachibowli to Hitech City during peak morning hours. The route has high compatibility, excellent passenger ratings, and the driver has a stellar 4.8 rating.',
    routeAnalysis: 'The route via DLF Cyber City is the most efficient path with minimal traffic diversions. Expected travel time is 18 minutes during 8:30 AM slot.',
    timestamp: '2025-07-19T08:00:00Z',
  },
  {
    id: 'ai2',
    userId: 'u2',
    rideId: 'r3',
    matchLevel: 'Best Match',
    compatibilityScore: 91,
    insight: 'An excellent choice! Sneha has the highest driver rating on the platform. The Innova Crysta offers superior comfort with AC, music, and ample luggage space.',
    routeAnalysis: 'Direct route from Jubilee Hills to Banjara Hills via Road No. 12. Light morning traffic expected. 12-minute journey is optimal.',
    timestamp: '2025-07-19T08:05:00Z',
  },
  {
    id: 'ai3',
    userId: 'u2',
    rideId: 'r6',
    matchLevel: 'Best Match',
    compatibilityScore: 93,
    insight: 'Highly recommended for tech professionals commuting from Kukatpally to Gachibowli. Perfect timing for IT office hours. Maximum seats available.',
    routeAnalysis: 'Route through KPHB and Miyapur avoids major traffic bottlenecks. The 28-minute estimate is highly accurate based on historical data.',
    timestamp: '2025-07-19T08:10:00Z',
  },
];

// ── NOTIFICATIONS ──────────────────────────────────────────
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: 'u2', // passenger
    type: 'success',
    title: 'Booking Confirmed!',
    message: 'Your ride from Gachibowli to Hitech City on Jul 20 is confirmed.',
    timestamp: '2025-07-18T10:30:00Z',
    read: false,
  },
  {
    id: 'n2',
    userId: 'u2', // passenger
    type: 'info',
    title: 'AI Recommendation',
    message: 'New ride matches found for your preferred route.',
    timestamp: '2025-07-18T09:00:00Z',
    read: false,
  },
  {
    id: 'n3',
    userId: 'u2', // passenger
    type: 'warning',
    title: 'Ride Reminder',
    message: 'Your ride tomorrow at 8:30 AM is in less than 24 hours.',
    timestamp: '2025-07-17T10:00:00Z',
    read: true,
  },
  {
    id: 'n4',
    userId: 'u1', // driver
    type: 'success',
    title: 'New Booking Request',
    message: 'Priya Patel has booked your ride from Gachibowli.',
    timestamp: '2025-07-17T09:30:00Z',
    read: true,
  },
];

// ── CHART DATA ─────────────────────────────────────────────
export const weeklyChartData: ChartData[] = [
  { name: 'Mon', rides: 4, bookings: 8, earnings: 640 },
  { name: 'Tue', rides: 6, bookings: 12, earnings: 960 },
  { name: 'Wed', rides: 3, bookings: 7, earnings: 560 },
  { name: 'Thu', rides: 8, bookings: 15, earnings: 1200 },
  { name: 'Fri', rides: 10, bookings: 20, earnings: 1600 },
  { name: 'Sat', rides: 5, bookings: 9, earnings: 720 },
  { name: 'Sun', rides: 2, bookings: 4, earnings: 320 },
];

export const monthlyChartData: ChartData[] = [
  { name: 'Jan', rides: 45, bookings: 89, earnings: 7120 },
  { name: 'Feb', rides: 52, bookings: 104, earnings: 8320 },
  { name: 'Mar', rides: 61, bookings: 122, earnings: 9760 },
  { name: 'Apr', rides: 58, bookings: 116, earnings: 9280 },
  { name: 'May', rides: 73, bookings: 146, earnings: 11680 },
  { name: 'Jun', rides: 80, bookings: 160, earnings: 12800 },
  { name: 'Jul', rides: 67, bookings: 134, earnings: 10720 },
];

// ── CITIES / LOCATIONS ─────────────────────────────────────
export const hyderabadLocations = [
  'Gachibowli',
  'Hitech City',
  'HITEC City',
  'Kondapur',
  'Madhapur',
  'Jubilee Hills',
  'Banjara Hills',
  'Ameerpet',
  'Kukatpally',
  'Secunderabad',
  'LB Nagar',
  'Dilsukhnagar',
  'Uppal',
  'Miyapur',
  'KPHB Colony',
  'Begumpet',
  'Somajiguda',
  'Punjagutta',
  'Mehdipatnam',
  'Tolichowki',
  'Charminar',
  'Abids',
  'Malakpet',
  'Nanakramguda',
  'Financial District',
  'Manikonda',
  'Shamshabad',
  'Bowenpally',
  'Sainikpuri',
  'Kompally',
];

// ── ML MODEL SIMULATION ────────────────────────────────────
/**
 * Simulates KNN model prediction
 * In production, this calls the FastAPI ML endpoint
 * Model: ride_match_model.joblib (KNN, k=5)
 * Features: pickup_enc, dest_enc, hour, seats, rating, pref_score
 */
export function predictRideMatch(
  _pickup: string,
  _destination: string,
  hour: number,
  seats: number,
  driverRating: number,
  prefScore: number
): { matchLevel: 'Best Match' | 'Suitable Match' | 'Low Match'; score: number } {
  // Simulate KNN scoring logic
  const timeScore = hour >= 7 && hour <= 10 ? 30 : hour >= 17 && hour <= 20 ? 25 : 10;
  const seatsScore = seats >= 3 ? 25 : seats >= 2 ? 15 : 5;
  const ratingScore = driverRating >= 4.7 ? 25 : driverRating >= 4.0 ? 15 : 5;
  const prefScoreNorm = prefScore * 20;
  const total = timeScore + seatsScore + ratingScore + prefScoreNorm;
  const score = Math.min(Math.round(total), 100);

  let matchLevel: 'Best Match' | 'Suitable Match' | 'Low Match';
  if (score >= 80) matchLevel = 'Best Match';
  else if (score >= 60) matchLevel = 'Suitable Match';
  else matchLevel = 'Low Match';

  return { matchLevel, score };
}

// ── AI INSIGHT GENERATION ──────────────────────────────────
/**
 * Simulates Google Gemini API response for ride insights
 * In production: POST /api/ai/insights with ride details
 */
export const aiInsightTemplates = {
  bestMatch: (pickup: string, dest: string, driver: string, rating: number) =>
    `This ride is highly recommended for your journey from ${pickup} to ${dest}. Driver ${driver} (★${rating}) is one of our top-rated drivers with exceptional on-time performance and passenger satisfaction. The route is well-optimized for your schedule, making this a Best Match for your travel needs.`,

  suitableMatch: (pickup: string, dest: string, driver: string) =>
    `A suitable option for your commute from ${pickup} to ${dest}. Driver ${driver} has a reliable track record. The route aligns well with your preferences, though some minor adjustments may be needed. Consider this a solid choice for your journey.`,

  lowMatch: (pickup: string, dest: string) =>
    `An available ride from ${pickup} to ${dest}. While the compatibility score is moderate, the ride still covers your required route. We recommend exploring other available options or booking early if this timing works for you.`,

  tripSummary: (pickup: string, dest: string, distance: string, duration: string, price: number) =>
    `Trip Summary: ${pickup} → ${dest} | Distance: ${distance} | Est. Duration: ${duration} | Fare: ₹${price}. Your journey covers a scenic urban route through Hyderabad's tech corridor. Estimated arrival is on schedule based on current traffic patterns.`,
};
