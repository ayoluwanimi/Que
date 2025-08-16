import { Card, CardContent } from '@/components/ui/Card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Jennifer Martinez',
    role: 'First-time Homebuyer',
    content: 'Sarah made our first home purchase so easy and stress-free. She guided us through every step and helped us find the perfect home within our budget. Her expertise and patience were invaluable.',
    rating: 5,
    location: 'Oak Hills, Springfield'
  },
  {
    id: 2,
    name: 'Robert Chen',
    role: 'Commercial Investor',
    content: 'I\'ve worked with many real estate agents over the years, but Elite Realty stands out. Their market knowledge and professional approach helped me identify a fantastic investment opportunity.',
    rating: 5,
    location: 'Downtown Springfield'
  },
  {
    id: 3,
    name: 'The Thompson Family',
    role: 'Luxury Home Buyers',
    content: 'When we decided to upgrade to our dream home, Elite Realty delivered beyond our expectations. The attention to detail and personalized service made all the difference.',
    rating: 5,
    location: 'Riverside District'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Land Developer',
    content: 'Michael\'s expertise in land development is exceptional. He helped us navigate zoning requirements and find the perfect parcels for our residential development project.',
    rating: 5,
    location: 'Sunset Ridge'
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Property Seller',
    content: 'Elite Realty sold our home in just two weeks at asking price! Their marketing strategy and professional photography really made our property stand out in the market.',
    rating: 5,
    location: 'Meadowbrook'
  },
  {
    id: 6,
    name: 'Mark Johnson',
    role: 'Rental Property Owner',
    content: 'The team helped me find an excellent rental property investment. Their analysis of rental market trends and property potential was spot-on. Highly recommended!',
    rating: 5,
    location: 'Springfield'
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-width section-padding">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Quote className="h-8 w-8 text-sky-600 mr-2" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
              What Our Clients Say
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
            Don&apos;t just take our word for it. Hear from the families and investors 
            who have trusted us with their real estate journey.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} hover className="h-full">
              <CardContent>
                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
                
                {/* Quote */}
                <blockquote className="text-gray-700 mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </blockquote>
                
                {/* Author Info */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-900 mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-600 mb-2">4.9/5</div>
                <div className="text-gray-700 font-medium mb-1">Average Rating</div>
                <div className="flex justify-center">
                  <StarRating rating={5} />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-600 mb-2">500+</div>
                <div className="text-gray-700 font-medium mb-1">Happy Clients</div>
                <div className="text-sm text-gray-600">Over the years</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-600 mb-2">95%</div>
                <div className="text-gray-700 font-medium mb-1">Referral Rate</div>
                <div className="text-sm text-gray-600">Client recommendations</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-600 mb-2">30</div>
                <div className="text-gray-700 font-medium mb-1">Days Average</div>
                <div className="text-sm text-gray-600">Time to close</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}