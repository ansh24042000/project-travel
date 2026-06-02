import { CommunityTrip } from '../types';

export const MOCK_COMMUNITY_TRIPS: CommunityTrip[] = [
  {
    id: 'trip-1',
    name: 'Manali Adventure Expedition',
    destination: 'Manali',
    startDate: '2024-06-15',
    endDate: '2024-06-25',
    duration: '10 Days',
    type: 'Adventure',
    budget: 15000,
    maxMembers: 8,
    description: 'Looking for adventure junkies for a 10-day Manali backpacking trip. We will be doing river rafting, paragliding, and trekking to Beas Kund.',
    coverImage: 'https://images.unsplash.com/photo-1596701062351-df5f8a42f431?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    visibility: 'Public',
    rules: {
      smoking: false,
      drinking: true,
      mixedGroup: true,
      ageRestricted: true
    },
    approvalMode: 'Manual',
    organizer: {
      id: 'org-1',
      name: 'Sahil Verma',
      image: 'https://i.pravatar.cc/150?u=org1',
      rating: 4.8,
      tripsHosted: 12,
      isVerified: true
    },
    members: [
      { id: 'org-1', name: 'Sahil Verma', image: 'https://i.pravatar.cc/150?u=org1', city: 'Delhi', role: 'Organizer' },
      { id: 'user-2', name: 'Ananya Rao', image: 'https://i.pravatar.cc/150?u=user2', city: 'Mumbai', role: 'Member' },
      { id: 'user-3', name: 'Rohan Mehra', image: 'https://i.pravatar.cc/150?u=user3', city: 'Bangalore', role: 'Member' }
    ],
    requests: [],
    itinerary: [
      { day: 1, plan: 'Arrival in Manali and check-in to hostel.' },
      { day: 2, plan: 'Local sightseeing and Hadimba Temple.' },
      { day: 3, plan: 'Solang Valley adventure activities.' }
    ],
    wallet: {
      totalCost: 15000,
      contributions: [],
      members: ['Sahil Verma', 'Ananya Rao', 'Rohan Mehra']
    }
  },
  {
    id: 'trip-2',
    name: 'Spiti Valley Bike Trip',
    destination: 'Spiti Valley',
    startDate: '2024-07-10',
    endDate: '2024-07-20',
    duration: '11 Days',
    type: 'Bike Trip',
    budget: 25000,
    maxMembers: 6,
    description: 'A rugged bike trip through the scenic Spiti Valley. Experience the high passes and ancient monasteries.',
    coverImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1200',
    gallery: [],
    visibility: 'Public',
    rules: {
      smoking: true,
      drinking: true,
      mixedGroup: false,
      ageRestricted: true
    },
    approvalMode: 'Manual',
    organizer: {
      id: 'org-2',
      name: 'Vikram Singh',
      image: 'https://i.pravatar.cc/150?u=org2',
      rating: 4.9,
      tripsHosted: 25,
      isVerified: true
    },
    members: [
      { id: 'org-2', name: 'Vikram Singh', image: 'https://i.pravatar.cc/150?u=org2', city: 'Chandigarh', role: 'Organizer' },
      { id: 'user-4', name: 'Kabir Khan', image: 'https://i.pravatar.cc/150?u=user4', city: 'Pune', role: 'Member' }
    ],
    requests: [],
    itinerary: [],
    wallet: {
      totalCost: 25000,
      contributions: [],
      members: ['Vikram Singh', 'Kabir Khan']
    }
  }
];
