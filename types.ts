
export enum View {
  HOME = 'HOME',
  ONBOARDING = 'ONBOARDING',
  RECOMMENDATIONS = 'RECOMMENDATIONS',
  DETAILS = 'DETAILS',
  ITINERARY = 'ITINERARY',
  EXPLORE = 'EXPLORE',
  PACKAGES = 'PACKAGES',
  LOGIN = 'LOGIN',
  DASHBOARD_CUSTOMER = 'DASHBOARD_CUSTOMER',
  DASHBOARD_GUIDE = 'DASHBOARD_GUIDE',
  DASHBOARD_DISTRIBUTOR = 'DASHBOARD_DISTRIBUTOR',
  DASHBOARD_HOTEL = 'DASHBOARD_HOTEL',
  DASHBOARD_ADMIN = 'DASHBOARD_ADMIN',
  COMMUNITY_EXPLORE = 'COMMUNITY_EXPLORE',
  COMMUNITY_CREATE = 'COMMUNITY_CREATE',
  COMMUNITY_DETAIL = 'COMMUNITY_DETAIL'
}

export type UserRole = 'Customer' | 'Guide' | 'Package Distributor' | 'Hotel Partner' | 'Super Admin';

export type TravelPreference = 'Hill Station' | 'Beach' | 'Adventure' | 'Religious' | 'Wildlife' | 'Honeymoon' | 'Family';

export interface TravelerCount {
  adults: number;
  children: number;
}

export interface UserSession {
  id: string;
  fullName: string;
  role?: UserRole;
  travelers: TravelerCount;
  preferences: TravelPreference[];
  startingCity: string;
  budget: string;
  startDate: string;
  endDate: string;
  isLoggedIn: boolean;
}

export interface RecommendedDestination {
  id: string;
  name: string;
  country: string;
  description: string;
  category: 'Best Match' | 'Budget Friendly' | 'Premium';
  bestTimeToVisit: string;
  duration: string;
  imageSearchQuery: string;
  highlights: string[];
}

export interface Attraction {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
  bestTime: string;
  entryFee?: string;
  timeRequired: string;
  location: string;
}

export interface Activity {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: 'Adventure' | 'Cultural' | 'Nature' | 'Relaxation';
  images: string[];
  duration: string;
  bestSeason: string;
  suitableFor: ('Solo' | 'Family' | 'Group')[];
  priceIndicator: string;
  address: string;
  coordinates: { lat: number; lng: number };
}

export interface ActivityBooking {
  id: string;
  activityId: string;
  activityName: string;
  customerId: string;
  customerName: string;
  destination: string;
  date: string;
  participants: number;
  status: 'Pending' | 'Confirmed' | 'Rejected' | 'Paid';
  totalAmount: number;
  notes?: string;
}

export interface Contribution {
  id: string;
  memberName: string;
  amount: number;
  mode: 'Online' | 'Physical';
  date: string;
  remarks?: string;
}

export interface WalletSummary {
  totalCost: number;
  contributions: Contribution[];
  members: string[];
}

export interface DayPlan {
  day: number;
  activities: string[];
}

export interface DetailedItinerary {
  destination: string;
  days: DayPlan[];
}

export interface Guide {
  id: string;
  name: string;
  experience: number;
  languages: string[];
  specialization: TravelPreference;
  rating: number;
  pricePerDay: number;
  bio: string;
  image: string;
  location: string;
}

export interface GuideBooking {
  id: string;
  customerId: string;
  customerName: string;
  guideId: string;
  guideName: string;
  destination: string;
  date: string;
  travelers: number;
  serviceType: 'Half-day' | 'Full-day' | 'Multi-day';
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
  amount: number;
  notes?: string;
}

export interface CommunityTrip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  duration: string;
  type: 'Adventure' | 'Backpacking' | 'Family' | 'Religious' | 'Bike Trip' | 'Trekking' | 'Luxury';
  budget: number;
  maxMembers: number;
  description: string;
  coverImage: string;
  gallery: string[];
  visibility: 'Public' | 'Invite Only';
  rules: {
    smoking: boolean;
    drinking: boolean;
    mixedGroup: boolean;
    ageRestricted: boolean;
  };
  approvalMode: 'Auto' | 'Manual';
  organizer: {
    id: string;
    name: string;
    image: string;
    rating: number;
    tripsHosted: number;
    isVerified: boolean;
  };
  members: TripMember[];
  requests: JoinRequest[];
  itinerary: { day: number; plan: string }[];
  wallet: WalletSummary;
}

export interface TripMember {
  id: string;
  name: string;
  image: string;
  city: string;
  role: 'Organizer' | 'Member';
}

export interface JoinRequest {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  message: string;
  age: number;
  gender: string;
  city: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderImage: string;
  text: string;
  timestamp: string;
  type: 'Text' | 'Image' | 'Update' | 'Poll';
}
