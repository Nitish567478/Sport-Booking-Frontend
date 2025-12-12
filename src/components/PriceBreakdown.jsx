// frontend/src/components/PriceBreakdown.jsx
import React from 'react';

export default function PriceBreakdown({ pricing }) {
  if (!pricing) return null;
  return (
    <div className="price-breakdown">
      <div>Base: {pricing.basePrice}</div>
      {Array.isArray(pricing.ruleAdjustments) && pricing.ruleAdjustments.map((r, i) => (
        <div key={i}>{r.ruleName}: {r.amount}</div>
      ))}
      <div>Equipment: {pricing.equipmentFee}</div>
      <div>Coach: {pricing.coachFee}</div>
      <hr />
      <div><strong>Total: {pricing.total}</strong></div>
    </div>
  );
}
