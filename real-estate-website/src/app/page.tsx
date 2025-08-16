import { HeroSection } from '@/components/layout/HeroSection';
// import { FeaturedProperties } from '@/components/property/FeaturedProperties';
// import { PropertyTypeStats } from '@/components/property/PropertyTypeStats';
// import { TestimonialsSection } from '@/components/layout/TestimonialsSection';
import { BlogSection } from '@/components/blog/BlogSection';
// import { CTASection } from '@/components/layout/CTASection';

export default function Home() {
  return (
    <>
      {/* Hero Section with search */}
      <HeroSection />
      
      {/* Featured Properties */}
      {/* <FeaturedProperties /> */}
      
      {/* Property Type Statistics */}
      {/* <PropertyTypeStats /> */}
      
      {/* Testimonials */}
      {/* <TestimonialsSection /> */}
      
      {/* Blog Section */}
      <BlogSection />
      
      {/* Call to Action */}
      {/* <CTASection /> */}
      
      {/* Temporary content to show the site is working */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Real Estate Website
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your modern real estate website is now live! The remaining components are being finalized.
          </p>
          <div className="space-y-4">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Hero Section - Working
            </div>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Blog Section - Working
            </div>
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              🔧 Property Listings - Available at /properties
            </div>
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
              🎯 Additional sections coming soon...
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
