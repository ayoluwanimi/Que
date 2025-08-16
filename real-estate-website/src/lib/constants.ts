export const SITE_CONFIG = {
  name: 'Elite Realty',
  description: 'Your trusted partner in finding the perfect property. Specializing in land sales, residential homes, and commercial real estate.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://elite-realty.com',
  company: {
    name: 'Elite Realty',
    phone: '(555) 123-4567',
    email: 'info@elite-realty.com',
    address: {
      street: '123 Main Street',
      city: 'Your City',
      state: 'Your State',
      zipCode: '12345',
    },
  },
  social: {
    facebook: 'https://facebook.com/eliterealty',
    instagram: 'https://instagram.com/eliterealty',
    twitter: 'https://twitter.com/eliterealty',
    linkedin: 'https://linkedin.com/company/eliterealty',
  },
};

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { 
    name: 'Properties', 
    href: '/properties',
    children: [
      { name: 'All Properties', href: '/properties' },
      { name: 'Houses for Sale', href: '/properties?type=house&listing=sale' },
      { name: 'Land for Sale', href: '/properties?type=land&listing=sale' },
      { name: 'Commercial', href: '/properties?type=commercial' },
      { name: 'Rentals', href: '/properties?listing=rent' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export const PROPERTY_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'house', label: 'Houses' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
] as const;

export const LISTING_TYPES = [
  { value: 'all', label: 'All Listings' },
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
] as const;

export const PRICE_RANGES = [
  { value: '', label: 'Any Price' },
  { value: '0-100000', label: 'Under $100K' },
  { value: '100000-250000', label: '$100K - $250K' },
  { value: '250000-500000', label: '$250K - $500K' },
  { value: '500000-750000', label: '$500K - $750K' },
  { value: '750000-1000000', label: '$750K - $1M' },
  { value: '1000000-2000000', label: '$1M - $2M' },
  { value: '2000000+', label: '$2M+' },
] as const;

export const BEDROOM_OPTIONS = [
  { value: '', label: 'Any Bedrooms' },
  { value: '1', label: '1+ Bedroom' },
  { value: '2', label: '2+ Bedrooms' },
  { value: '3', label: '3+ Bedrooms' },
  { value: '4', label: '4+ Bedrooms' },
  { value: '5', label: '5+ Bedrooms' },
] as const;

export const BATHROOM_OPTIONS = [
  { value: '', label: 'Any Bathrooms' },
  { value: '1', label: '1+ Bathroom' },
  { value: '2', label: '2+ Bathrooms' },
  { value: '3', label: '3+ Bathrooms' },
  { value: '4', label: '4+ Bathrooms' },
] as const;

export const COMMON_AMENITIES = [
  'Swimming Pool',
  'Gym/Fitness Center',
  'Parking Garage',
  'Balcony/Patio',
  'Fireplace',
  'Air Conditioning',
  'Heating',
  'Dishwasher',
  'Washer/Dryer',
  'Hardwood Floors',
  'Carpet',
  'Tile Floors',
  'Walk-in Closet',
  'Garden/Yard',
  'Pet Friendly',
  'Security System',
  'Elevator',
  'Storage Unit',
  'High-Speed Internet',
  'Cable Ready',
] as const;

export const BLOG_CATEGORIES = [
  { id: 'market-updates', name: 'Market Updates', slug: 'market-updates', color: '#3B82F6' },
  { id: 'buying-guide', name: 'Buying Guide', slug: 'buying-guide', color: '#10B981' },
  { id: 'selling-tips', name: 'Selling Tips', slug: 'selling-tips', color: '#F59E0B' },
  { id: 'investment', name: 'Investment', slug: 'investment', color: '#8B5CF6' },
  { id: 'neighborhood', name: 'Neighborhoods', slug: 'neighborhood', color: '#EF4444' },
  { id: 'legal', name: 'Legal & Finance', slug: 'legal', color: '#6B7280' },
] as const;

export const DEFAULT_MAP_CENTER = {
  lat: 40.7128,
  lng: -74.0060,
} as const;

export const MAP_ZOOM_LEVELS = {
  city: 12,
  neighborhood: 14,
  property: 16,
} as const;

export const SEO_DEFAULTS = {
  metaTitle: 'Elite Realty - Your Trusted Real Estate Partner',
  metaDescription: 'Find your dream home with Elite Realty. Browse our extensive listings of houses, land, and commercial properties. Expert agents ready to help you buy or sell.',
  keywords: [
    'real estate',
    'homes for sale',
    'land for sale',
    'commercial property',
    'property listings',
    'real estate agent',
    'buy house',
    'sell house',
    'property investment',
  ],
  ogImage: '/images/og-default.jpg',
};

export const CONTACT_PREFERENCES = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'either', label: 'Either' },
] as const;

export const CALL_TIME_PREFERENCES = [
  { value: 'morning', label: 'Morning (9AM - 12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
  { value: 'evening', label: 'Evening (5PM - 8PM)' },
  { value: 'anytime', label: 'Anytime' },
] as const;

export const INQUIRY_TYPES = [
  { value: 'viewing', label: 'Schedule a Viewing' },
  { value: 'information', label: 'Request Information' },
  { value: 'offer', label: 'Make an Offer' },
  { value: 'general', label: 'General Inquiry' },
] as const;