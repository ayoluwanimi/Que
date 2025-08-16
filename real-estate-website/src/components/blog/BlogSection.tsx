import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

const blogPosts = [
  {
    id: 'first-time-homebuyer-guide',
    title: 'First-Time Homebuyer\'s Guide to Springfield Real Estate',
    slug: 'first-time-homebuyer-guide-springfield',
    excerpt: 'Everything you need to know about buying your first home in Springfield, from financing options to neighborhood insights.',
    publishedAt: '2024-01-25T09:00:00.000Z',
    readingTime: 8,
    category: {
      id: 'buying-guide',
      name: 'Buying Guide',
      slug: 'buying-guide',
      color: '#10B981'
    },
    featuredImage: {
      src: '/images/blog/first-time-buyer-guide.jpg',
      alt: 'First-time homebuyers looking at a house',
      width: 800,
      height: 600
    },
    author: {
      id: 'elite-realty-team',
      name: 'Elite Realty Team',
      avatar: {
        src: '/images/authors/elite-realty-logo.jpg',
        alt: 'Elite Realty Team',
        width: 100,
        height: 100
      }
    }
  },
  {
    id: 'market-trends-2024',
    title: 'Springfield Real Estate Market Trends: What to Expect in 2024',
    slug: 'springfield-market-trends-2024',
    excerpt: 'Comprehensive analysis of Springfield\'s real estate market including price trends, inventory levels, and predictions for the coming year.',
    publishedAt: '2024-01-20T09:00:00.000Z',
    readingTime: 6,
    category: {
      id: 'market-updates',
      name: 'Market Updates',
      slug: 'market-updates',
      color: '#3B82F6'
    },
    featuredImage: {
      src: '/images/blog/market-trends-2024.jpg',
      alt: 'Real estate market analysis charts',
      width: 800,
      height: 600
    },
    author: {
      id: 'elite-realty-team',
      name: 'Elite Realty Team',
      avatar: {
        src: '/images/authors/elite-realty-logo.jpg',
        alt: 'Elite Realty Team',
        width: 100,
        height: 100
      }
    }
  },
  {
    id: 'land-investment-guide',
    title: 'The Complete Guide to Land Investment in Illinois',
    slug: 'land-investment-guide-illinois',
    excerpt: 'Learn about the opportunities and considerations when investing in land, from zoning laws to development potential.',
    publishedAt: '2024-01-18T09:00:00.000Z',
    readingTime: 10,
    category: {
      id: 'investment',
      name: 'Investment',
      slug: 'investment',
      color: '#8B5CF6'
    },
    featuredImage: {
      src: '/images/blog/land-investment.jpg',
      alt: 'Aerial view of development land',
      width: 800,
      height: 600
    },
    author: {
      id: 'elite-realty-team',
      name: 'Elite Realty Team',
      avatar: {
        src: '/images/authors/elite-realty-logo.jpg',
        alt: 'Elite Realty Team',
        width: 100,
        height: 100
      }
    }
  }
];

export function BlogSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-width section-padding">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-sky-600 mr-2" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
              Latest Insights
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
            Stay informed with our expert insights on real estate trends, 
            buying tips, and market analysis.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="group">
              <Card hover className="h-full overflow-hidden">
                {/* Featured Image */}
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={post.featuredImage.src}
                      alt={post.featuredImage.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>
                
                <CardContent className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <Badge 
                      style={{ 
                        backgroundColor: `${post.category.color}20`,
                        color: post.category.color 
                      }}
                    >
                      {post.category.name}
                    </Badge>
                  </div>
                  
                  {/* Title */}
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="group-hover:text-sky-600 transition-colors"
                  >
                    <h3 className="font-semibold text-xl text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(post.publishedAt, 'short')}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Author */}
                  <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                    <Image
                      src={post.author.avatar.src}
                      alt={post.author.avatar.alt}
                      width={32}
                      height={32}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {post.author.name}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link href="/blog">
            <Button size="lg" className="inline-flex items-center">
              Read All Articles
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
          <p className="text-gray-600 mt-4">
            Explore our complete library of real estate insights and guides
          </p>
        </div>
      </div>
    </section>
  );
}