import React, { useEffect, useState } from "react";
import "./BookingModal.css";

export default function BookingModal({
  court,
  slot,
  equipmentOptions,
  coaches,
  onClose,
  previewPrice,
  createBooking,
}) {
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [coachId, setCoachId] = useState("");
  const [pricing, setPricing] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function toggleEquipment(eq) {
    const exists = selectedEquipment.find(
      (e) => e.equipmentId === eq._id
    );

    if (exists) {
      setSelectedEquipment(
        selectedEquipment.filter((e) => e.equipmentId !== eq._id)
      );
    } else {
      setSelectedEquipment([
        ...selectedEquipment,
        { equipmentId: eq._id, quantity: 1 },
      ]);
    }
  }

  function buildPayload() {
    return {
      courtId: court._id,
      startTime: new Date(slot.start).toISOString(),
      endTime: new Date(slot.end).toISOString(),
      equipment: selectedEquipment,
      coachId: coachId || null,
    };
  }

  useEffect(() => {
    async function loadPrice() {
      try {
        const res = await previewPrice(buildPayload());
        setPricing(res.data);
      } catch (err) {
        console.error("Preview price error", err);
      }
    }
    loadPrice();
  }, [selectedEquipment, coachId, court, slot]);

  async function handleConfirm() {
  try {
    setSubmitting(true);

    await createBooking(buildPayload());

    alert("Booking Confirmed ✅");
    onClose();

  } catch (err) {
    if (err.response && err.response.status === 409) {
      alert("This slot is already booked. Please select another slot.");
    } else {
      alert("Booking failed. Please try again.");
    }
  } finally {
    setSubmitting(false);
  }
  }


  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3 className="book-heading">Book {court.name}</h3>

        <p>
          {new Date(slot.start).toLocaleTimeString()} -{" "}
          {new Date(slot.end).toLocaleTimeString()}
        </p>

        <h4 className="equipment-head">Equipment</h4>
        {equipmentOptions.map((eq) => (
          <label key={eq._id} className="checkbox">
            <input
              type="checkbox"
              checked={selectedEquipment.some(
                (e) => e.equipmentId === eq._id
              )}
              onChange={() => toggleEquipment(eq)}
            />
            {eq.name} (+₹{eq.rentalPrice})
          </label>
        ))}

        <h4 className="coach-head">Coach</h4>
        <select
          value={coachId}
          onChange={(e) => setCoachId(e.target.value)}
        >
          <option value="">No Coach</option>
          {coaches.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name} (+₹{c.hourlyRate}/hr)
            </option>
          ))}
        </select>

        <h4 className="prices-head">Price</h4>
        {pricing && (
          <>
            <p className="base-price">Base: ₹{pricing.basePrice}</p>
            <p className="base-price">Equipment: ₹{pricing.equipmentFee}</p>
            <p className="base-price">Coach: ₹{pricing.coachFee}</p>
            <p className="total-price"><strong>Total: ₹{pricing.total}</strong></p>
          </>
        )}

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="booking-btn" onClick={handleConfirm} disabled={submitting}>
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
