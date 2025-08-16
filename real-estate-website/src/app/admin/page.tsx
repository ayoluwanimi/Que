'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    // Redirect to the actual admin page
    window.location.href = '/admin/index.html';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600 mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Redirecting to Admin Panel
        </h1>
        <p className="text-gray-600">
          If you&apos;re not redirected automatically,{' '}
          <a 
            href="/admin/index.html" 
            className="text-sky-600 hover:text-sky-800 underline"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
}