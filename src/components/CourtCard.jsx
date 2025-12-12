import React from 'react';

export default function CourtCard({ court, children }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold">
        {court.name} <span className="text-xs text-gray-500">({court.type})</span>
      </h3>
      <p className="text-xs text-gray-600 mb-2">Base price: {court.basePrice}</p>
      {children}
    </div>
  );
}
