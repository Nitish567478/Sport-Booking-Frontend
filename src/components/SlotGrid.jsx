import React from 'react';
import { buildTodaySlotRange } from '../utils/dateUtils';

import './SlotGrid.css';

export default function SlotGrid({ court, onSlotClick }) {
  // slots = [{ start: Date, end: Date, label: string }]
  const slots = buildTodaySlotRange(8, 22);

  return (
    <div className="slot-grid">
      {slots.map((slot) => (
        <button
          key={slot.start.toISOString()}
          className="slot-button"
          onClick={() => onSlotClick(slot)}  // ✅ pass full slot object
        >
          {slot.label}
        </button>
      ))}
    </div>
  );
}
