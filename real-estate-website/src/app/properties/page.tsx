'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PropertyFilters } from '@/components/property/PropertyFilters';
import { PropertySearch } from '@/components/property/PropertySearch';
import { Button } from '@/components/ui/Button';
import { Property } from '@/types';
import { Search, Filter, Grid, List } from 'lucide-react';

// Mock properties data - in real app this would come from API/CMS
const mockProperties: Property[] = [
  {
    id: 'luxury-family-home',
    title: 'Luxury Family Home with Pool',
    slug: 'luxury-family-home-oak-street',
    description: 'Stunning 4-bedroom home in prestigious Oak Hills neighborhood with swimming pool and gourmet kitchen.',
    propertyType: 'house',
    listingType: 'sale',
    price: 750000,
    priceFormatted: '$750,000',
    location: {
      address: '123 Oak Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      coordinates: { lat: 39.7817, lng: -89.6501 }
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2850,
      lotSize: 8500,
      parkingSpaces: 2,
      yearBuilt: 2018,
      propertyTax: 8500
    },
    amenities: ['Swimming Pool', 'Fireplace', 'Hardwood Floors', 'Granite Countertops'],
    images: [],
    featuredImage: {
      src: '/images/properties/luxury-home-1.png',
      alt: 'Luxury Family Home - Front View',
      width: 800,
      height: 600
    },
    agent: {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      title: 'Senior Real Estate Agent',
      email: 'sarah@elite-realty.com',
      phone: '(555) 123-4567',
      bio: 'Senior agent with 10 years experience',
      image: { src: '/images/agents/sarah-johnson.png', alt: 'Sarah Johnson', width: 200, height: 200 },
      license: 'RE123456',
      specialties: ['Luxury Homes'],
      yearsExperience: 10,
      social: {}
    },
    status: 'active',
    isFeatured: true,
    isNew: false,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    seo: {}
  },
  {
    id: 'cozy-starter-home',
    title: 'Cozy Starter Home - Perfect for First-Time Buyers',
    slug: 'cozy-starter-home-maple-avenue',
    description: 'Charming 3-bedroom ranch-style home with updated kitchen and beautiful backyard. Move-in ready!',
    propertyType: 'house',
    listingType: 'sale',
    price: 285000,
    priceFormatted: '$285,000',
    location: {
      address: '456 Maple Avenue',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
      coordinates: { lat: 39.7654, lng: -89.6298 }
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1650,
      lotSize: 6200,
      parkingSpaces: 2,
      yearBuilt: 1995,
      propertyTax: 3200
    },
    amenities: ['Updated Kitchen', 'Fenced Yard', 'Attached Garage', 'Central Air'],
    images: [],
    featuredImage: {
      src: '/images/properties/starter-home-1.png',
      alt: 'Cozy Starter Home',
      width: 800,
      height: 600
    },
    agent: {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      title: 'Senior Real Estate Agent',
      email: 'sarah@elite-realty.com',
      phone: '(555) 123-4567',
      bio: 'Senior agent',
      image: { src: '/images/agents/sarah-johnson.png', alt: 'Sarah Johnson', width: 200, height: 200 },
      license: 'RE123456',
      specialties: ['First-Time Buyers'],
      yearsExperience: 10,
      social: {}
    },
    status: 'active',
    isFeatured: false,
    isNew: true,
    createdAt: '2024-01-22T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z',
    seo: {}
  },
  {
    id: 'development-land',
    title: 'Prime Development Land - Sunset Ridge',
    slug: 'development-land-sunset-ridge',
    description: 'Exceptional 5.2-acre development opportunity with city utilities and potential for 8-10 homes.',
    propertyType: 'land',
    listingType: 'sale',
    price: 425000,
    priceFormatted: '$425,000',
    location: {
      address: 'Sunset Ridge Drive',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62702',
      coordinates: { lat: 39.7901, lng: -89.6298 }
    },
    features: {
      lotSize: 226512,
      propertyTax: 3200
    },
    amenities: ['City Water Available', 'Sewer Available', 'Paved Road Access', 'Scenic Views'],
    images: [],
    featuredImage: {
      src: '/images/properties/sunset-ridge-land.jpg',
      alt: 'Development Land - Sunset Ridge',
      width: 800,
      height: 600
    },
    agent: {
      id: 'michael-chen',
      name: 'Michael Chen',
      title: 'Land Specialist',
      email: 'michael@elite-realty.com',
      phone: '(555) 234-5678',
      bio: 'Expert in land acquisitions',
      image: { src: '/images/agents/michael-chen.png', alt: 'Michael Chen', width: 200, height: 200 },
      license: 'RE234567',
      specialties: ['Land Sales'],
      yearsExperience: 8,
      social: {}
    },
    status: 'active',
    isFeatured: false,
    isNew: true,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    seo: {}
  },
  {
    id: 'downtown-office-building',
    title: 'Downtown Office Building - Investment Opportunity',
    slug: 'downtown-office-building-main-street',
    description: 'Prime commercial investment with 85% occupancy and stable long-term tenants.',
    propertyType: 'commercial',
    listingType: 'sale',
    price: 1200000,
    priceFormatted: '$1,200,000',
    location: {
      address: '456 Main Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      coordinates: { lat: 39.8017, lng: -89.6440 }
    },
    features: {
      squareFeet: 8500,
      lotSize: 12000,
      parkingSpaces: 25,
      yearBuilt: 1985,
      propertyTax: 18500
    },
    amenities: ['12 Office Suites', 'Conference Room', 'On-Site Parking', 'Elevator Access'],
    images: [],
    featuredImage: {
      src: '/images/properties/office-building-main.jpg',
      alt: 'Downtown Office Building',
      width: 800,
      height: 600
    },
    agent: {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      title: 'Senior Real Estate Agent',
      email: 'sarah@elite-realty.com',
      phone: '(555) 123-4567',
      bio: 'Senior agent',
      image: { src: '/images/agents/sarah-johnson.png', alt: 'Sarah Johnson', width: 200, height: 200 },
      license: 'RE123456',
      specialties: ['Commercial Properties'],
      yearsExperience: 10,
      social: {}
    },
    status: 'active',
    isFeatured: true,
    isNew: false,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
    seo: {}
  },
  {
    id: 'modern-condo',
    title: 'Modern Downtown Condo with City Views',
    slug: 'modern-downtown-condo',
    description: 'Stylish 2-bedroom condo with floor-to-ceiling windows, modern amenities, and downtown convenience.',
    propertyType: 'house',
    listingType: 'rent',
    price: 1800,
    priceFormatted: '$1,800/month',
    location: {
      address: '789 Center Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      coordinates: { lat: 39.8012, lng: -89.6420 }
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1200,
      parkingSpaces: 1,
      yearBuilt: 2020
    },
    amenities: ['City Views', 'Modern Kitchen', 'In-Unit Laundry', 'Fitness Center', 'Rooftop Deck'],
    images: [],
    featuredImage: {
      src: '/images/properties/modern-condo.jpg',
      alt: 'Modern Downtown Condo',
      width: 800,
      height: 600
    },
    agent: {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      title: 'Senior Real Estate Agent',
      email: 'sarah@elite-realty.com',
      phone: '(555) 123-4567',
      bio: 'Senior agent',
      image: { src: '/images/agents/sarah-johnson.png', alt: 'Sarah Johnson', width: 200, height: 200 },
      license: 'RE123456',
      specialties: ['Urban Living'],
      yearsExperience: 10,
      social: {}
    },
    status: 'active',
    isFeatured: false,
    isNew: false,
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
    seo: {}
  },
  {
    id: 'country-estate',
    title: 'Elegant Country Estate on 10 Acres',
    slug: 'country-estate-willowbrook',
    description: 'Magnificent 5-bedroom estate home with horse facilities, pond, and complete privacy on 10 beautiful acres.',
    propertyType: 'house',
    listingType: 'sale',
    price: 1250000,
    priceFormatted: '$1,250,000',
    location: {
      address: '1500 Willowbrook Lane',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62703',
      coordinates: { lat: 39.7432, lng: -89.5987 }
    },
    features: {
      bedrooms: 5,
      bathrooms: 4,
      squareFeet: 4200,
      lotSize: 435600,
      parkingSpaces: 3,
      yearBuilt: 2010,
      propertyTax: 12500
    },
    amenities: ['Horse Facilities', 'Pond', 'Guest House', 'Workshop', 'Circular Driveway'],
    images: [],
    featuredImage: {
      src: '/images/properties/country-estate.jpg',
      alt: 'Country Estate',
      width: 800,
      height: 600
    },
    agent: {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      title: 'Senior Real Estate Agent',
      email: 'sarah@elite-realty.com',
      phone: '(555) 123-4567',
      bio: 'Senior agent',
      image: { src: '/images/agents/sarah-johnson.png', alt: 'Sarah Johnson', width: 200, height: 200 },
      license: 'RE123456',
      specialties: ['Luxury Homes', 'Estate Properties'],
      yearsExperience: 10,
      social: {}
    },
    status: 'active',
    isFeatured: true,
    isNew: false,
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
    seo: {}
  }
];

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  // const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  // Apply URL parameters on mount
  useEffect(() => {
    const type = searchParams.get('type');
    const listing = searchParams.get('listing');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const featured = searchParams.get('featured');
    
    let filtered = [...mockProperties];

    if (type && type !== 'all') {
      filtered = filtered.filter(p => p.propertyType === type);
    }
    
    if (listing && listing !== 'all') {
      filtered = filtered.filter(p => p.listingType === listing);
    }
    
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.location.city.toLowerCase().includes(query) ||
        p.amenities.some(amenity => amenity.toLowerCase().includes(query))
      );
    }
    
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(minPrice));
    }
    
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
    }
    
    if (featured === 'true') {
      filtered = filtered.filter(p => p.isFeatured);
    }

    setFilteredProperties(filtered);
  }, [searchParams]);

  const handleFilter = (filters: import('@/types/property').PropertyFilters) => {
    let filtered = [...mockProperties];

    if (filters.propertyType && filters.propertyType !== 'all') {
      filtered = filtered.filter(p => p.propertyType === filters.propertyType);
    }
    
    if (filters.listingType && filters.listingType !== 'all') {
      filtered = filtered.filter(p => p.listingType === filters.listingType);
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }
    
    if (filters.minBedrooms) {
      filtered = filtered.filter(p => (p.features.bedrooms || 0) >= filters.minBedrooms);
    }
    
    if (filters.minBathrooms) {
      filtered = filtered.filter(p => (p.features.bathrooms || 0) >= filters.minBathrooms);
    }
    
    if (filters.city) {
      filtered = filtered.filter(p => 
        p.location.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProperties(filtered);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProperties(mockProperties);
      return;
    }

    const searchLower = query.toLowerCase();
    const filtered = mockProperties.filter(p =>
      p.title.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.location.city.toLowerCase().includes(searchLower) ||
      p.location.address.toLowerCase().includes(searchLower) ||
      p.amenities.some(amenity => amenity.toLowerCase().includes(searchLower))
    );
    
    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-width section-padding py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Property Listings
              </h1>
              <p className="text-gray-600">
                Showing {filteredProperties.length} of {mockProperties.length} properties
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <PropertySearch onSearch={handleSearch} />
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="flex items-center lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-sky-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-sky-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-width section-padding py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${isFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-8">
              <PropertyFilters onFilter={handleFilter} />
            </div>
          </div>

          {/* Properties Grid/List */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg text-gray-900">
                {filteredProperties.length} Properties Found
              </h2>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field w-auto min-w-[160px]"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Properties Display */}
            {filteredProperties.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
                : 'space-y-6'
              }>
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    showAgent
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-xl text-gray-900 mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or filters to see more results.
                  </p>
                  <Button onClick={() => window.location.href = '/properties'}>
                    View All Properties
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}