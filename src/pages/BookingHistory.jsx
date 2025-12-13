import React, { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "../api/api";

import './BookingHistory.css';

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const res = await getBookings();
    setBookings(res.data);
  }

  async function handleDelete(id) {
    await deleteBooking(id);
    loadBookings();
  }

  if (bookings.length === 0) {
    return <p>No bookings yet.</p>;
  }

  return (
    <div className="history-container">
      <h2 className="history-heading">Booking History</h2>

      {bookings.map((b) => (
        <div key={b._id} className="history-card">
          <p><strong>Court:</strong> {b.court?.name}</p>

          <p>
            <strong className="time">Time:</strong>{" "}
            {new Date(b.startTime).toLocaleTimeString()} -{" "}
            {new Date(b.endTime).toLocaleTimeString()}
          </p>

          <p className="date">
            <strong className="equipment">Equipment:</strong>{" "}
            {b.equipment.length === 0
              ? "None"
              : b.equipment
                  .map((e) => e.equipmentId?.name)
                  .join(", ")}
          </p>

          <p className="coach-name">
            <strong className="coach">Coach:</strong>{" "}
            {b.coach ? b.coach.name : "None"}
          </p>

          <p className="total-prices">
            <strong className="total">Total:</strong>{" "}
            ₹{b.price?.total ?? 0}
          </p>

          <button onClick={() => handleDelete(b._id)}>
            Cancel Booking
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}
