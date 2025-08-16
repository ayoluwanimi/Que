// Property types
export type {
  Property,
  PropertyImage,
  Agent,
  PropertyFilters,
  PropertySearchResults,
} from './property';

// Blog types
export type {
  BlogPost,
  BlogImage,
  Author,
  BlogCategory,
  BlogFilters,
  BlogSearchResults,
} from './blog';

// Form types
export type {
  ContactFormData,
  PropertyInquiryFormData,
  NewsletterFormData,
  PropertyAlertFormData,
  FormValidationError,
  FormSubmissionState,
} from './forms';

// Common types
export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  companyName: string;
  companyPhone: string;
  companyEmail: string;
  companyAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  seo: {
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    keywords: string[];
    ogImage: string;
  };
}

export interface NavigationItem {
  name: string;
  href: string;
  isExternal?: boolean;
  children?: NavigationItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: PropertyImage;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Map types for Leaflet integration
export interface MapLocation {
  lat: number;
  lng: number;
}

export interface MapMarker {
  id: string;
  position: MapLocation;
  title: string;
  description?: string;
  image?: string;
  price?: string;
  type?: string;
}