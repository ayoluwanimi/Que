import Link from 'next/link';
import { SITE_CONFIG, NAVIGATION_ITEMS } from '@/lib/constants';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-width section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-sky-600 to-amber-600 p-2 rounded-lg">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-sky-600 font-bold text-lg">ER</span>
                </div>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold">{SITE_CONFIG.name}</h2>
                <p className="text-sm text-gray-400">Premier Real Estate</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {SITE_CONFIG.description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  {SITE_CONFIG.company.address.street}, {SITE_CONFIG.company.address.city}, {SITE_CONFIG.company.address.state} {SITE_CONFIG.company.address.zipCode}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.company.phone}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {SITE_CONFIG.company.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.company.email}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {SITE_CONFIG.company.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties?type=house"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Residential Homes
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=land"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Land & Lots
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=commercial"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Commercial
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?listing=rent"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Rentals
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?featured=true"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Featured Properties
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              {Object.entries(SITE_CONFIG.social).map(([platform, url]) => {
                const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                if (!IconComponent) return null;
                
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={`Follow us on ${platform}`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>© {currentYear} {SITE_CONFIG.company.name}. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}