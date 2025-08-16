'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PROPERTY_TYPES, LISTING_TYPES, PRICE_RANGES } from '@/lib/constants';
import { Search, MapPin, Home, TrendingUp } from 'lucide-react';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [listingType, setListingType] = useState('all');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    if (propertyType !== 'all') params.set('type', propertyType);
    if (listingType !== 'all') params.set('listing', listingType);
    if (priceRange) {
      const [min, max] = priceRange.includes('-') 
        ? priceRange.split('-').map(p => p.replace('+', ''))
        : [priceRange.replace('+', ''), ''];
      if (min) params.set('minPrice', min);
      if (max) params.set('maxPrice', max);
    }
    
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <section className="relative bg-gradient-to-br from-sky-900 via-sky-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-600/20 rounded-full blur-3xl"></div>
      
      <div className="relative container-width section-padding py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance animate-fade-in-up">
              Find Your{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Dream Property
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-sky-100 mb-8 max-w-2xl mx-auto text-balance animate-fade-in-up">
              Discover exceptional homes, prime land, and commercial properties with Elite Realty&apos;s expert guidance.
            </p>
          </div>

          {/* Search Form */}
          <div className="glass-effect rounded-2xl p-6 md:p-8 mb-12 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Search Input */}
              <div className="lg:col-span-2">
                <Input
                  type="text"
                  placeholder="Search by location, property type, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-5 w-5" />}
                  className="bg-white/90 border-white/20 text-gray-900 placeholder-gray-500"
                />
              </div>
              
              {/* Property Type */}
              <div>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="input-field bg-white/90 border-white/20 text-gray-900"
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
                <select
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value)}
                  className="input-field bg-white/90 border-white/20 text-gray-900"
                >
                  {LISTING_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Price Range and Search Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="input-field bg-white/90 border-white/20 text-gray-900"
                >
                  {PRICE_RANGES.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                onClick={handleSearch}
                size="lg"
                className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white px-8"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Properties
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-sky-600/20 p-3 rounded-full">
                  <Home className="h-8 w-8 text-sky-300" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sky-200">Properties Listed</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-amber-600/20 p-3 rounded-full">
                  <MapPin className="h-8 w-8 text-amber-300" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">15+</div>
              <div className="text-sky-200">Cities Covered</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-emerald-600/20 p-3 rounded-full">
                  <TrendingUp className="h-8 w-8 text-emerald-300" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-sky-200">Client Satisfaction</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in-up">
            <Link href="/properties">
              <Button size="lg" className="w-full sm:w-auto bg-white text-sky-900 hover:bg-gray-100 px-8">
                Browse All Properties
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-sky-900 px-8">
                Speak with an Agent
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}