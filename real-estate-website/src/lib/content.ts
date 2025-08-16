import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Property, Agent, BlogPost, SiteSettings } from '@/types';

const contentDirectory = path.join(process.cwd(), 'content');

// Helper function to get all files in a directory
function getContentFiles(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  const files = fs.readdirSync(fullPath);
  return files.filter(file => file.endsWith('.md'));
}

// Helper function to parse markdown content
function parseMarkdownFile<T>(filePath: string): T & { id: string } {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  const id = path.basename(filePath, '.md');
  
  return {
    ...data as T,
    id,
  };
}

// Get all properties
export function getProperties(): Property[] {
  try {
    const files = getContentFiles('properties');
    
    const properties = files.map(file => {
      const filePath = path.join(contentDirectory, 'properties', file);
      return parseMarkdownFile<Omit<Property, 'id'>>(filePath);
    });

    // Sort by date (newest first) and filter active properties
    return properties
      .filter(property => property.status === 'active')
      .sort((a, b) => new Date(b.createdAt || b.updatedAt).getTime() - new Date(a.createdAt || a.updatedAt).getTime());
  } catch (error) {
    console.error('Error loading properties:', error);
    return [];
  }
}

// Get property by slug
export function getPropertyBySlug(slug: string): Property | null {
  try {
    const properties = getProperties();
    return properties.find(property => property.slug === slug) || null;
  } catch (error) {
    console.error('Error loading property:', error);
    return null;
  }
}

// Get featured properties
export function getFeaturedProperties(limit = 6): Property[] {
  try {
    const properties = getProperties();
    return properties
      .filter(property => property.isFeatured)
      .slice(0, limit);
  } catch (error) {
    console.error('Error loading featured properties:', error);
    return [];
  }
}

// Get properties by type
export function getPropertiesByType(type: Property['propertyType'], limit?: number): Property[] {
  try {
    const properties = getProperties();
    const filtered = properties.filter(property => property.propertyType === type);
    return limit ? filtered.slice(0, limit) : filtered;
  } catch (error) {
    console.error('Error loading properties by type:', error);
    return [];
  }
}

// Get all agents
export function getAgents(): Agent[] {
  try {
    const files = getContentFiles('agents');
    
    const agents = files.map(file => {
      const filePath = path.join(contentDirectory, 'agents', file);
      return parseMarkdownFile<Omit<Agent, 'id'>>(filePath);
    });

    return agents.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error loading agents:', error);
    return [];
  }
}

// Get agent by slug
export function getAgentBySlug(slug: string): Agent | null {
  try {
    const agents = getAgents();
    return agents.find(agent => agent.slug === slug) || null;
  } catch (error) {
    console.error('Error loading agent:', error);
    return null;
  }
}

// Get all blog posts
export function getBlogPosts(): BlogPost[] {
  try {
    const files = getContentFiles('blog');
    
    const posts = files.map(file => {
      const filePath = path.join(contentDirectory, 'blog', file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const id = path.basename(filePath, '.md');
      
      return {
        ...data as Omit<BlogPost, 'id' | 'content'>,
        id,
        content,
        readingTime: Math.ceil(content.split(' ').length / 200), // Approximate reading time
      };
    });

    // Sort by publish date (newest first) and filter published posts
    return posts
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// Get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const posts = getBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}

// Get featured blog posts
export function getFeaturedBlogPosts(limit = 3): BlogPost[] {
  try {
    const posts = getBlogPosts();
    return posts
      .filter(post => post.isFeatured)
      .slice(0, limit);
  } catch (error) {
    console.error('Error loading featured blog posts:', error);
    return [];
  }
}

// Get site settings
export function getSiteSettings(): SiteSettings | null {
  try {
    const filePath = path.join(contentDirectory, 'settings', 'general.md');
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return data as SiteSettings;
  } catch (error) {
    console.error('Error loading site settings:', error);
    return null;
  }
}

// Search properties
export function searchProperties(query: string): Property[] {
  try {
    const properties = getProperties();
    const lowercaseQuery = query.toLowerCase();
    
    return properties.filter(property =>
      property.title.toLowerCase().includes(lowercaseQuery) ||
      property.description.toLowerCase().includes(lowercaseQuery) ||
      property.location.city.toLowerCase().includes(lowercaseQuery) ||
      property.location.address.toLowerCase().includes(lowercaseQuery) ||
      property.amenities.some(amenity => amenity.toLowerCase().includes(lowercaseQuery))
    );
  } catch (error) {
    console.error('Error searching properties:', error);
    return [];
  }
}

// Filter properties
export function filterProperties(filters: {
  propertyType?: Property['propertyType'];
  listingType?: Property['listingType'];
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  city?: string;
}): Property[] {
  try {
    let properties = getProperties();

    if (filters.propertyType && filters.propertyType !== 'all') {
      properties = properties.filter(p => p.propertyType === filters.propertyType);
    }

    if (filters.listingType && filters.listingType !== 'all') {
      properties = properties.filter(p => p.listingType === filters.listingType);
    }

    if (filters.minPrice) {
      properties = properties.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      properties = properties.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.minBedrooms) {
      properties = properties.filter(p => (p.features.bedrooms || 0) >= filters.minBedrooms!);
    }

    if (filters.maxBedrooms) {
      properties = properties.filter(p => (p.features.bedrooms || 0) <= filters.maxBedrooms!);
    }

    if (filters.minBathrooms) {
      properties = properties.filter(p => (p.features.bathrooms || 0) >= filters.minBathrooms!);
    }

    if (filters.maxBathrooms) {
      properties = properties.filter(p => (p.features.bathrooms || 0) <= filters.maxBathrooms!);
    }

    if (filters.city) {
      properties = properties.filter(p => 
        p.location.city.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }

    return properties;
  } catch (error) {
    console.error('Error filtering properties:', error);
    return [];
  }
}