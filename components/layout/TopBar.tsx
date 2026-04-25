'use client';

import { Phone } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-end items-center py-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="h-4 w-4" />
          <span>+216 93 149 727</span>
        </div>
      </div>
    </div>
  );
}