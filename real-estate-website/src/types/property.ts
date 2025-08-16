export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  propertyType: 'land' | 'house' | 'commercial';
  listingType: 'sale' | 'rent';
  price: number;
  priceFormatted: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  features: {
    bedrooms?: number;
    bathrooms?: number;
    squareFeet?: number;
    lotSize?: number;
    parkingSpaces?: number;
    yearBuilt?: number;
    propertyTax?: number;
    hoaFees?: number;
  };
  amenities: string[];
  images: PropertyImage[];
  featuredImage: PropertyImage;
  agent: Agent;
  status: 'active' | 'pending' | 'sold' | 'withdrawn';
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface PropertyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
  image: PropertyImage;
  license?: string;
  specialties: string[];
  yearsExperience: number;
  social: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface PropertyFilters {
  propertyType?: Property['propertyType'] | 'all';
  listingType?: Property['listingType'] | 'all';
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minSquareFeet?: number;
  maxSquareFeet?: number;
  city?: string;
  amenities?: string[];
  status?: Property['status'];
}

export interface PropertySearchResults {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  filters: PropertyFilters;
}