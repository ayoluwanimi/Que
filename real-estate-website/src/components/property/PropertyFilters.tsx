'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { 
  PROPERTY_TYPES, 
  LISTING_TYPES, 
  PRICE_RANGES
} from '@/lib/constants';
import { X, RotateCcw } from 'lucide-react';

interface PropertyFiltersProps {
  onFilter: (filters: import('@/types/property').PropertyFilters) => void;
  onClose?: () => void;
}

interface FilterState {
  propertyType: string;
  listingType: string;
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
  maxBedrooms: string;
  minBathrooms: string;
  maxBathrooms: string;
  city: string;
  amenities: string[];
}

const initialFilters: FilterState = {
  propertyType: 'all',
  listingType: 'all',
  minPrice: '',
  maxPrice: '',
  minBedrooms: '',
  maxBedrooms: '',
  minBathrooms: '',
  maxBathrooms: '',
  city: '',
  amenities: []
};

export function PropertyFilters({ onFilter, onClose }: PropertyFiltersProps) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Load filters from URL params on mount
  useEffect(() => {
    const newFilters = { ...initialFilters };
    
    const type = searchParams.get('type');
    const listing = searchParams.get('listing');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const city = searchParams.get('city');
    
    if (type) newFilters.propertyType = type;
    if (listing) newFilters.listingType = listing;
    if (minPrice) newFilters.minPrice = minPrice;
    if (maxPrice) newFilters.maxPrice = maxPrice;
    if (city) newFilters.city = city;
    
    setFilters(newFilters);
    onFilter(newFilters);
  }, [searchParams, onFilter]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handlePriceRangeChange = (range: string) => {
    if (!range) {
      handleFilterChange('minPrice', '');
      handleFilterChange('maxPrice', '');
      return;
    }

    if (range.includes('-')) {
      const [min, max] = range.split('-');
      setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
      onFilter({ ...filters, minPrice: min, maxPrice: max });
    } else if (range.includes('+')) {
      const min = range.replace('+', '');
      setFilters(prev => ({ ...prev, minPrice: min, maxPrice: '' }));
      onFilter({ ...filters, minPrice: min, maxPrice: '' });
    }
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilter(initialFilters);
    // Update URL
    window.history.pushState({}, '', '/properties');
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => {
      if (key === 'amenities') return (value as string[]).length > 0;
      return value && value !== 'all' && value !== '';
    }
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-900">Filter Properties</h3>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="w-full mt-2"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="input-field"
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Listing Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Listing Type
          </label>
          <select
            value={filters.listingType}
            onChange={(e) => handleFilterChange('listingType', e.target.value)}
            className="input-field"
          >
            {LISTING_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            value={
              filters.minPrice && filters.maxPrice
                ? `${filters.minPrice}-${filters.maxPrice}`
                : filters.minPrice
                ? `${filters.minPrice}+`
                : ''
            }
            onChange={(e) => handlePriceRangeChange(e.target.value)}
            className="input-field mb-3"
          >
            {PRICE_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          
          {/* Custom Price Range */}
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={filters.minBedrooms}
              onChange={(e) => handleFilterChange('minBedrooms', e.target.value)}
              className="input-field"
            >
              <option value="">Min</option>
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}+</option>
              ))}
            </select>
            <select
              value={filters.maxBedrooms}
              onChange={(e) => handleFilterChange('maxBedrooms', e.target.value)}
              className="input-field"
            >
              <option value="">Max</option>
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms
          </label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={filters.minBathrooms}
              onChange={(e) => handleFilterChange('minBathrooms', e.target.value)}
              className="input-field"
            >
              <option value="">Min</option>
              {[1, 1.5, 2, 2.5, 3, 3.5, 4].map(num => (
                <option key={num} value={num}>{num}+</option>
              ))}
            </select>
            <select
              value={filters.maxBathrooms}
              onChange={(e) => handleFilterChange('maxBathrooms', e.target.value)}
              className="input-field"
            >
              <option value="">Max</option>
              {[1, 1.5, 2, 2.5, 3, 3.5, 4].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        {/* City */}
        <div>
          <Input
            label="City"
            placeholder="Enter city name"
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
          />
        </div>

        {/* Popular Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Popular Amenities
          </label>
          <div className="space-y-2">
            {[
              'Swimming Pool',
              'Fireplace',
              'Garage',
              'Hardwood Floors',
              'Updated Kitchen',
              'Fenced Yard',
              'Central Air',
              'Basement'
            ].map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={(e) => {
                    const newAmenities = e.target.checked
                      ? [...filters.amenities, amenity]
                      : filters.amenities.filter(a => a !== amenity);
                    setFilters(prev => ({ ...prev, amenities: newAmenities }));
                    onFilter({ ...filters, amenities: newAmenities });
                  }}
                  className="mr-2 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}