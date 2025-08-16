import Link from 'next/link';
import { PropertyCard } from './PropertyCard';
import { Button } from '@/components/ui/Button';
// import { getFeaturedProperties } from '@/lib/content';
import { ArrowRight, Star } from 'lucide-react';

export function FeaturedProperties() {
  // In a real app, this would be fetched from the CMS or API
  // For now, we'll use mock data that matches our content structure
  const featuredProperties = [
    {
      id: 'luxury-family-home',
      title: 'Luxury Family Home with Pool',
      slug: 'luxury-family-home-oak-street',
      description: 'Stunning 4-bedroom home in prestigious Oak Hills neighborhood with swimming pool and gourmet kitchen.',
      propertyType: 'house' as const,
      listingType: 'sale' as const,
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
      status: 'active' as const,
      isFeatured: true,
      isNew: false,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
      seo: {}
    },
    {
      id: 'development-land',
      title: 'Prime Development Land - Sunset Ridge',
      slug: 'development-land-sunset-ridge',
      description: 'Exceptional 5.2-acre development opportunity with city utilities and potential for 8-10 homes.',
      propertyType: 'land' as const,
      listingType: 'sale' as const,
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
        src: '/images/properties/sunset-ridge-land.png',
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
        bio: 'Expert in land acquisitions and development',
        image: { src: '/images/agents/michael-chen.png', alt: 'Michael Chen', width: 200, height: 200 },
        license: 'RE234567',
        specialties: ['Land Sales'],
        yearsExperience: 8,
        social: {}
      },
      status: 'active' as const,
      isFeatured: false,
      isNew: true,
      createdAt: '2024-01-20T00:00:00Z',
      updatedAt: '2024-01-20T00:00:00Z',
      seo: {}
    },
    {
      id: 'starter-home',
      title: 'Charming Starter Home',
      slug: 'charming-starter-home-maple-avenue',
      description: 'Perfect first home with updated kitchen and beautiful hardwood floors in quiet neighborhood.',
      propertyType: 'house' as const,
      listingType: 'sale' as const,
      price: 285000,
      priceFormatted: '$285,000',
      location: {
        address: '789 Maple Avenue',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62703',
        coordinates: { lat: 39.7501, lng: -89.6201 }
      },
      features: {
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1650,
        lotSize: 6000,
        parkingSpaces: 1,
        yearBuilt: 2005,
        propertyTax: 4200
      },
      amenities: ['Updated Kitchen', 'Hardwood Floors', 'Fenced Yard', 'Garage'],
      images: [],
      featuredImage: {
        src: '/images/properties/starter-home-1.png',
        alt: 'Charming Starter Home',
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
        specialties: ['First-Time Buyers'],
        yearsExperience: 10,
        social: {}
      },
      status: 'active' as const,
      isFeatured: true,
      isNew: false,
      createdAt: '2024-01-12T00:00:00Z',
      updatedAt: '2024-01-12T00:00:00Z',
      seo: {}
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-width section-padding">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-amber-500 mr-2" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
              Featured Properties
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
            Discover our handpicked selection of exceptional properties, from luxury homes to prime investment opportunities.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              showAgent
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link href="/properties">
            <Button size="lg" className="inline-flex items-center">
              View All Properties
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
          <p className="text-gray-600 mt-4">
            Explore our complete collection of {featuredProperties.length * 10}+ properties
          </p>
        </div>
      </div>
    </section>
  );
}