import React from 'react';

export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-400 border-t-transparent" />
    </div>
  );
}
