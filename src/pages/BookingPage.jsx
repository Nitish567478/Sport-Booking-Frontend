import React, { useEffect, useState } from "react";
import SlotGrid from "../components/SlotGrid";
import BookingModal from "../components/BookingModal";

import './BookingPage.css';

import {
  getCourts,
  getEquipment,
  getCoaches,
  previewPrice,
  createBooking,
} from "../api/api";

export default function BookingPage() {
  const [courts, setCourts] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCourt, setActiveCourt] = useState(null);
  const [activeSlot, setActiveSlot] = useState(null);

  useEffect(() => {
    async function load() {
      const [c, e, co] = await Promise.all([
        getCourts(),
        getEquipment(),
        getCoaches(),
      ]);
      setCourts(c.data);
      setEquipment(e.data);
      setCoaches(co.data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <h3>Loading...</h3>;

  return (
    <div>
      <h2 className="booking-heading">Book a Court</h2>

      {courts.map((court) => (
        <div key={court._id}>
          <h3 className="court-name">{court.name} ({court.type})</h3>
          <SlotGrid
            court={court}
            onSlotClick={(slot) => {
              setActiveCourt(court);
              setActiveSlot(slot);
            }}
          />
        </div>
      ))}

      {activeCourt && activeSlot && (
        <BookingModal
          court={activeCourt}
          slot={activeSlot}
          equipmentOptions={equipment}
          coaches={coaches}
          onClose={() => {
            setActiveCourt(null);
            setActiveSlot(null);
          }}
          previewPrice={previewPrice}
          createBooking={createBooking}
        />
      )}
    </div>
  );
}
