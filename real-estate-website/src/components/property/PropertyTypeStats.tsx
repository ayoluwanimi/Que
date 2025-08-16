import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Home, TreePine, Building2, TrendingUp } from 'lucide-react';

const propertyStats = [
  {
    type: 'houses',
    title: 'Residential Homes',
    description: 'Family homes, luxury estates, and starter properties',
    count: 245,
    averagePrice: '$485,000',
    icon: Home,
    color: 'text-blue-600 bg-blue-100',
    href: '/properties?type=house'
  },
  {
    type: 'land',
    title: 'Land & Lots',
    description: 'Development opportunities and residential lots',
    count: 89,
    averagePrice: '$185,000',
    icon: TreePine,
    color: 'text-green-600 bg-green-100',
    href: '/properties?type=land'
  },
  {
    type: 'commercial',
    title: 'Commercial Properties',
    description: 'Office buildings, retail spaces, and investments',
    count: 67,
    averagePrice: '$850,000',
    icon: Building2,
    color: 'text-purple-600 bg-purple-100',
    href: '/properties?type=commercial'
  },
  {
    type: 'all',
    title: 'Market Growth',
    description: 'Properties sold in the last quarter',
    count: 156,
    averagePrice: '+12%',
    icon: TrendingUp,
    color: 'text-amber-600 bg-amber-100',
    href: '/properties'
  }
];

export function PropertyTypeStats() {
  return (
    <section className="py-16 bg-white">
      <div className="container-width section-padding">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Property Market Overview
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Explore our diverse portfolio of properties across different categories. 
            From family homes to commercial investments, find your perfect match.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyStats.map((stat) => {
            const IconComponent = stat.icon;
            
            return (
              <Link key={stat.type} href={stat.href} className="group">
                <Card hover className="h-full">
                  <CardContent className="text-center">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-full ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {stat.count.toLocaleString()}
                      </div>
                      <div className="text-lg font-semibold text-sky-600 mb-2">
                        {stat.averagePrice}
                      </div>
                    </div>
                    
                    {/* Title and Description */}
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                      {stat.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-sky-50 rounded-2xl p-8">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
              Why Choose Elite Realty?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-600 mb-2">15+</div>
                <div className="text-gray-700 font-medium mb-1">Years Experience</div>
                <div className="text-sm text-gray-600">Serving the Springfield area</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-600 mb-2">$2.5B+</div>
                <div className="text-gray-700 font-medium mb-1">Properties Sold</div>
                <div className="text-sm text-gray-600">Total transaction volume</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-600 mb-2">98%</div>
                <div className="text-gray-700 font-medium mb-1">Client Satisfaction</div>
                <div className="text-sm text-gray-600">Based on client reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}