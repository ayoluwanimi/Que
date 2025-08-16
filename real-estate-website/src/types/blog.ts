export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  featuredImage?: BlogImage;
  images: BlogImage[];
  tags: string[];
  category: BlogCategory;
  readingTime: number;
  isFeatured: boolean;
  status: 'draft' | 'published' | 'archived';
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface BlogImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: BlogImage;
  email?: string;
  social: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  status?: BlogPost['status'];
}

export interface BlogSearchResults {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  filters: BlogFilters;
}