import React from 'react';

/*
  Expects pricing shape:
  {
    basePrice: Number,
    ruleAdjustments: [{ ruleName, amount }],
    equipmentFee: Number,
    coachFee: Number,
    total: Number
  }
 */
export default function PriceBreakdown({ pricing }) {
  if (!pricing) return null;

  const { basePrice = 0, ruleAdjustments = [], equipmentFee = 0, coachFee = 0, total = 0 } = pricing;

  return (
    <div className="price-breakdown">
      <div className="row">
        <div>Base price</div>
        <div>₹{basePrice.toFixed(2)}</div>
      </div>

      {Array.isArray(ruleAdjustments) && ruleAdjustments.length > 0 && (
        <>
          <div style={{ marginTop: 8, fontWeight: '600' }}>Rule adjustments</div>
          {ruleAdjustments.map((r, i) => (
            <div key={i} className="row">
              <div>{r.ruleName}</div>
              <div>₹{(r.amount || 0).toFixed(2)}</div>
            </div>
          ))}
        </>
      )}

      <div className="row">
        <div>Equipment</div>
        <div>₹{(equipmentFee || 0).toFixed(2)}</div>
      </div>

      <div className="row">
        <div>Coach</div>
        <div>₹{(coachFee || 0).toFixed(2)}</div>
      </div>

      <hr />

      <div className="row" style={{ fontWeight: 700 }}>
        <div>Total</div>
        <div>₹{(total || 0).toFixed(2)}</div>
      </div>
    </div>
  );
}
