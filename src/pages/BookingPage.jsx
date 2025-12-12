import React, { useEffect, useState } from 'react';
import SlotGrid from '../components/SlotGrid';
import BookingModal from '../components/BookingModal';
import Spinner from '../components/Spinner';

import './BookingPage.css';
// Demo data to replace API calls
const demoCourts = [
  { _id: 'court1', name: 'Court A', type: 'Indoor', basePrice: 20 },
  { _id: 'court2', name: 'Court B', type: 'Outdoor', basePrice: 15 },
];

const demoEquipment = [
  { _id: 'equip1', name: 'Rackets', price: 5 },
  { _id: 'equip2', name: 'Balls', price: 3 },
];

const demoCoaches = [
  { _id: 'coach1', name: 'Coach John', pricePerHour: 30 },
  { _id: 'coach2', name: 'Coach Mary', pricePerHour: 25 },
];

export default function BookingPage() {
  const [courts, setCourts] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setCourts(demoCourts);
      setEquipment(demoEquipment);
      setCoaches(demoCoaches);
      setLoading(false);
    }, 500);
  }, []);

  function onSlotClick(court, start, end) {
    setSelectedCourt(court);
    setSelectedSlot({ start, end });
    setModalOpen(true);
  }

  if (loading) return <Spinner />;

  return (
    <div className="booking-page">
      <h2 className="heading">Book a Court</h2>
      <p className="paragraph">Select a court and time slot for today.</p>

      <div className="court-grid">
        {courts.map(court => (
          <div key={court._id} className="court-card">
            <h3 className="court-card__title">
              {court.name} <span className="court-card__subtitle">({court.type})</span>
            </h3>
            <p className="court-card__price">Base price: ${court.basePrice}</p>
            <SlotGrid
              court={court}
              onSlotClick={(start, end) => onSlotClick(court, start, end)}
            />
          </div>
        ))}
      </div>

      {modalOpen && selectedCourt && selectedSlot && (
        <BookingModal
          court={selectedCourt}
          slot={selectedSlot}
          equipmentOptions={equipment}
          coaches={coaches}
          onClose={() => setModalOpen(false)}
          previewPrice={() => {}}
          createBooking={() => {}}
        />
      )}
    </div>
  );
}