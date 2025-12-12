import React, { useEffect, useState } from 'react';
import { getPricingRules, createPricingRule } from '../api/api';

import './AdminDashboard.css';

export default function AdminDashboard() {
  const [rules, setRules] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('timeWindow');

  useEffect(() => {
    async function load() {
      try {
        const res = await getPricingRules();
        setRules(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const payload = {
        name,
        type,
        enabled: true,
        priority: 50,
      };
      const res = await createPricingRule(payload);
      setRules([...rules, res.data]);
      setName('');
    } catch (err) {
      console.error(err);
      alert('Failed to create rule');
    }
  }

  return (
    <div className="admin-dashboard">
      <h2 className="heading-large">Admin Dashboard</h2>

      <section className="section pricing-rules-section">
        <h3 className="subheading">Pricing Rules</h3>
        <ul className="rules-list">
          {rules.map(r => (
            <li key={r._id} className="rule-item">
              {r.name} ({r.type}) {r.enabled ? '' : '(disabled)'}
            </li>
          ))}
        </ul>

        <form onSubmit={handleCreate} className="create-rule-form">
          <input
            type="text"
            className="input-text"
            placeholder="Rule name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <select
            className="select-input"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value="timeWindow">timeWindow</option>
            <option value="dayOfWeek">dayOfWeek</option>
            <option value="courtType">courtType</option>
            <option value="fixedSurcharge">fixedSurcharge</option>
            <option value="multiplier">multiplier</option>
          </select>
          <button className="btn btn-primary" type="submit">
            Add Rule
          </button>
        </form>
      </section>
    </div>
  );
}
