import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Star,
  Sparkles 
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  showAgent?: boolean;
}

export function PropertyCard({ property, showAgent = false }: PropertyCardProps) {
  const {
    slug,
    title,
    propertyType,
    listingType,
    price,
    location,
    features,
    featuredImage,
    isFeatured,
    isNew,
    status,
  } = property;

  const propertyTypeColors = {
    house: 'bg-blue-100 text-blue-800',
    land: 'bg-green-100 text-green-800',
    commercial: 'bg-purple-100 text-purple-800',
  };

  const listingTypeColors = {
    sale: 'bg-orange-100 text-orange-800',
    rent: 'bg-indigo-100 text-indigo-800',
  };

  return (
    <Card hover className="group overflow-hidden">
      <div className="relative">
        <Link href={`/properties/${slug}`}>
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={featuredImage.src}
              alt={featuredImage.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className={propertyTypeColors[propertyType]}>
            {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
          </Badge>
          <Badge className={listingTypeColors[listingType]}>
            For {listingType.charAt(0).toUpperCase() + listingType.slice(1)}
          </Badge>
          {isFeatured && (
            <Badge className="bg-yellow-100 text-yellow-800">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-emerald-100 text-emerald-800">
              <Sparkles className="h-3 w-3 mr-1" />
              New
            </Badge>
          )}
        </div>

        {/* Status indicator */}
        {status !== 'active' && (
          <div className="absolute top-3 right-3">
            <Badge 
              className={
                status === 'sold' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-gray-100 text-gray-800'
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3 glass-effect px-3 py-1 rounded-lg">
          <span className="font-bold text-gray-900">
            {formatPrice(price)}
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        <Link 
          href={`/properties/${slug}`}
          className="group-hover:text-sky-600 transition-colors"
        >
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">
            {location.city}, {location.state}
          </span>
        </div>

        {/* Property details */}
        {(features.bedrooms || features.bathrooms || features.squareFeet) && (
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <div className="flex space-x-4">
              {features.bedrooms && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{features.bedrooms} bed</span>
                </div>
              )}
              {features.bathrooms && (
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{features.bathrooms} bath</span>
                </div>
              )}
            </div>
            {features.squareFeet && (
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{features.squareFeet.toLocaleString()} sq ft</span>
              </div>
            )}
          </div>
        )}

        {/* Lot size for land */}
        {propertyType === 'land' && features.lotSize && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <Square className="h-4 w-4 mr-1" />
            <span>{(features.lotSize / 43560).toFixed(2)} acres</span>
          </div>
        )}

        {/* Agent info */}
        {showAgent && property.agent && (
          <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
            <Image
              src={property.agent.image.src}
              alt={property.agent.image.alt}
              width={32}
              height={32}
              className="rounded-full mr-2"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {property.agent.name}
              </p>
              <p className="text-xs text-gray-600">
                {property.agent.title}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}