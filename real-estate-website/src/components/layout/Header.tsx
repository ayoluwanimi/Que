'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { Menu, X, Phone, Mail } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-sky-900 text-white py-2">
        <div className="container-width section-padding">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a
                href={`tel:${SITE_CONFIG.company.phone}`}
                className="flex items-center space-x-1 hover:text-sky-200 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{SITE_CONFIG.company.phone}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.company.email}`}
                className="flex items-center space-x-1 hover:text-sky-200 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{SITE_CONFIG.company.email}</span>
              </a>
            </div>
            <div className="flex space-x-3 mt-1 sm:mt-0">
              {Object.entries(SITE_CONFIG.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-200 transition-colors capitalize"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container-width section-padding py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-sky-600 to-amber-600 p-2 rounded-lg">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-sky-600 font-bold text-lg">ER</span>
              </div>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-gray-900">
                {SITE_CONFIG.name}
              </h1>
              <p className="text-xs text-gray-600">Premier Real Estate</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    'font-medium transition-colors hover:text-sky-600',
                    isActiveLink(item.href)
                      ? 'text-sky-600'
                      : 'text-gray-700'
                  )}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* CTA Button */}
            <Link
              href="/contact"
              className="btn-primary"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2 mt-4">
              {NAVIGATION_ITEMS.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block py-2 font-medium transition-colors',
                      isActiveLink(item.href)
                        ? 'text-sky-600'
                        : 'text-gray-700 hover:text-sky-600'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block py-1 text-sm text-gray-600 hover:text-sky-600 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className="btn-primary mt-4 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}