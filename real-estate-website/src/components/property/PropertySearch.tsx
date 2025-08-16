'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search, X } from 'lucide-react';
import { debounce } from '@/lib/utils';

interface PropertySearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  showButton?: boolean;
}

export function PropertySearch({ 
  onSearch, 
  placeholder = "Search properties by location, type, or keyword...",
  showButton = true 
}: PropertySearchProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Load search query from URL on mount
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setQuery(searchQuery);
      onSearch(searchQuery);
    }
  }, [searchParams, onSearch]);

  // Debounced search function
  const debouncedSearch = debounce((searchQuery: string) => {
    onSearch(searchQuery);
    
    // Update URL without causing navigation
    const url = new URL(window.location.href);
    if (searchQuery.trim()) {
      url.searchParams.set('search', searchQuery);
    } else {
      url.searchParams.delete('search');
    }
    window.history.replaceState({}, '', url.toString());
  }, 300);

  const handleInputChange = (value: string) => {
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    
    // Remove search param from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('search');
    window.history.replaceState({}, '', url.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-1 max-w-md">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          icon={<Search className="h-5 w-5 text-gray-400" />}
          className={`pr-20 transition-all duration-200 ${
            isFocused ? 'ring-2 ring-sky-500 border-sky-500' : ''
          }`}
        />
        
        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        {/* Search button */}
        {showButton && (
          <Button
            type="submit"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3"
          >
            <Search className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Search suggestions (could be implemented later) */}
      {isFocused && query.length > 2 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
          <div className="p-3 text-sm text-gray-500">
            Press Enter to search for &quot;{query}&quot;
          </div>
        </div>
      )}
    </form>
  );
}

// Quick search component for hero section
export function QuickSearch() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `/properties?search=${encodeURIComponent(query)}`;
    } else {
      window.location.href = '/properties';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search by location, property type, or keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        icon={<Search className="h-5 w-5" />}
        className="bg-white/90 border-white/20 text-gray-900 placeholder-gray-500"
      />
      <Button
        onClick={handleSearch}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-700"
      >
        Search
      </Button>
    </div>
  );
}