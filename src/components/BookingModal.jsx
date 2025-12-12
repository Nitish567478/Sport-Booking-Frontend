// frontend/src/components/BookingModal.jsx
import React, { useEffect, useState } from 'react';
import PriceBreakdown from './PriceBreakdown';
import './BookingModal.css';

export default function BookingModal({
  court,
  slot,
  equipmentOptions = [],
  coaches = [],
  onClose,
  previewPrice,
  createBooking
}) {
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [coachId, setCoachId] = useState('');
  const [pricing, setPricing] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function toggleEquipment(eq) {
    const exists = selectedEquipment.find(e => e.equipmentId === eq._id);
    if (exists) {
      setSelectedEquipment(selectedEquipment.filter(e => e.equipmentId !== eq._id));
    } else {
      setSelectedEquipment([...selectedEquipment, { equipmentId: eq._id, quantity: 1 }]);
    }
  }

  useEffect(() => {
    async function load() {
      if (!slot || !court) return;
      setLoadingPrice(true);
      const payload = {
        courtId: court._id,
        startTime: slot.start,
        endTime: slot.end,
        equipment: selectedEquipment,
        coachId: coachId || null
      };
      console.log('Preview payload:', payload);
      try {
        const res = await previewPrice(payload);
        if (res && res.data && typeof res.data.total === 'number') {
          setPricing(res.data);
        } else {
          console.warn('Invalid preview response', res);
          setPricing(null);
        }
      } catch (err) {
        console.error('Preview price error:', err);
        setPricing(null);
      } finally {
        setLoadingPrice(false);
      }
    }
    load();
  }, [selectedEquipment, coachId, court, slot, previewPrice]);

  async function handleConfirm() {
    try {
      setSubmitting(true);
      const payload = {
        courtId: court._id,
        startTime: slot.start,
        endTime: slot.end,
        equipment: selectedEquipment,
        coachId: coachId || null,
        userId: null
      };
      console.log('Create booking payload:', payload);
      const res = await createBooking(payload);
      if (res && res.data && res.data.booking) {
        alert('Booking confirmed');
        onClose();
      } else {
        console.error('Unexpected response from server:', res);
        alert('Booking failed: No booking data returned.');
      }
    } catch (err) {
      console.error('Booking error:', err);
      const msg = err?.response?.data?.error || err?.message || 'Server not reachable';
      alert('Booking failed: ' + msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3 className="modal-title">Book {court?.name}</h3>
        <p className="modal-slot">
          {new Date(slot.start).toLocaleString()} - {new Date(slot.end).toLocaleTimeString()}
        </p>

        <div className="section equipment-section">
          <h4 className="section-title">Equipment</h4>
          <div className="equipment-list">
            {equipmentOptions.map(eq => {
              const checked = selectedEquipment.some(e => e.equipmentId === eq._id);
              return (
                <label key={eq._id} className="equipment-item">
                  <input type="checkbox" checked={checked} onChange={() => toggleEquipment(eq)} />
                  {eq.name} (+{eq.rentalPrice})
                </label>
              );
            })}
          </div>
        </div>

        <div className="section coach-section">
          <h4 className="section-title">Coach (optional)</h4>
          <select value={coachId} onChange={e => setCoachId(e.target.value)} className="coach-select">
            <option value="">No coach</option>
            {coaches.map(c => (
              <option key={c._id} value={c._id}>{c.name} (+{c.hourlyRate}/hr)</option>
            ))}
          </select>
        </div>

        <div className="section price-section">
          <h4 className="section-title">Price</h4>
          {loadingPrice ? <div className="loading-text">Calculating...</div>
            : pricing ? <PriceBreakdown pricing={pricing} /> : <div className="loading-text">Price not available</div>}
        </div>

        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onClose} disabled={submitting}>Cancel</button>
          <button className="btn btn-confirm" onClick={handleConfirm} disabled={submitting}>
            {submitting ? 'Booking…' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
}
