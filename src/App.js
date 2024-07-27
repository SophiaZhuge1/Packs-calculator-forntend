import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState(0);
  const [packs, setPacks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });
      const data = await response.json();
      setPacks(data.packs);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <img src="/gymshark-logo.png" alt="Gymshark Logo" className="logo" />
      <h1>Product Pack Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Items:
          <input
            type="number"
            value={items}
            onChange={(e) => setItems(Number(e.target.value))}
            className="input"
          />
        </label>
        <button type="submit" className="button">Calculate Packs</button>
      </form>
      <h2>Calculated Packs Needed:</h2>
      <ul className="packs-list">
        {packs.map((pack, index) => (
          <li key={index} className="pack-item">Pack Size: {pack.size}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
