export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
  preferredContact?: 'email' | 'phone' | 'either';
  bestTimeToCall?: 'morning' | 'afternoon' | 'evening' | 'anytime';
}

export interface PropertyInquiryFormData extends ContactFormData {
  propertyId: string;
  propertyTitle: string;
  inquiryType: 'viewing' | 'information' | 'offer' | 'general';
  budget?: number;
  timeline?: 'immediate' | '1-3months' | '3-6months' | '6+months';
  financing?: 'cash' | 'mortgage' | 'other';
}

export interface NewsletterFormData {
  email: string;
  name?: string;
  interests?: string[];
  frequency?: 'daily' | 'weekly' | 'monthly';
}

export interface PropertyAlertFormData {
  email: string;
  name?: string;
  propertyType?: 'land' | 'house' | 'commercial' | 'all';
  listingType?: 'sale' | 'rent' | 'all';
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  city?: string;
  radius?: number;
}

export interface FormValidationError {
  field: string;
  message: string;
}

export interface FormSubmissionState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errors: FormValidationError[];
  message?: string;
}