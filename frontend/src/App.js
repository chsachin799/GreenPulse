import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const COUNTRIES = ['Albania', 'Algeria', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Belarus', 'Belgium', 'Botswana', 'Brazil', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cameroon', 'Canada', 'Central African Republic', 'Chile', 'Colombia', 'Croatia', 'Denmark', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Eritrea', 'Estonia', 'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Guinea', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Italy', 'Jamaica', 'Japan', 'Kazakhstan', 'Kenya', 'Latvia', 'Lebanon', 'Lesotho', 'Libya', 'Lithuania', 'Madagascar', 'Malawi', 'Malaysia', 'Mali', 'Mauritania', 'Mauritius', 'Mexico', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Norway', 'Pakistan', 'Papua New Guinea', 'Peru', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Rwanda', 'Saudi Arabia', 'Senegal', 'Slovenia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Tajikistan', 'Thailand', 'Tunisia', 'Turkey', 'Uganda', 'Ukraine', 'United Kingdom', 'Uruguay', 'Zambia', 'Zimbabwe'];

const CROPS = ['Cassava', 'Maize', 'Plantains and others', 'Potatoes', 'Rice, paddy', 'Sorghum', 'Soybeans', 'Sweet potatoes', 'Wheat', 'Yams'];

function App() {
  // formData keys now exactly match the ML model column names
  const [formData, setFormData] = useState({
    Area: 'Albania',
    Item: 'Maize',
    Year: 2026,
    average_rain_fall_mm_per_year: 1485,
    pesticides_tonnes: 121,
    avg_temp: 16.37
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      
      if (response.data.status === 'success') {
        setResult({
          prediction: response.data.prediction,
          reliability: response.data.reliability || "99.11%",
          insight: response.data.insight || "Analysis complete.",
          status: response.data.prediction > 77053 ? "success" : "warning"
        });
      } else {
        // If backend returns an error (like missing columns), show it here
        alert("Model Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("System Error: Ensure the Flask server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🌱 GreenPulse Yield Predictor</h1>
        <p>Hybrid Ensemble Decision Support System</p>
      </header>

      <main className="container">
        <form onSubmit={handleSubmit} className="prediction-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Geographical Region</label>
              <select name="Area" value={formData.Area} onChange={handleChange}>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Crop Type</label>
              <select name="Item" value={formData.Item} onChange={handleChange}>
                {CROPS.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Target Year</label>
              <input type="number" name="Year" value={formData.Year} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Avg Annual Rainfall (mm)</label>
              <input type="number" name="average_rain_fall_mm_per_year" value={formData.average_rain_fall_mm_per_year} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Pesticides Used (tonnes)</label>
              <input type="number" name="pesticides_tonnes" value={formData.pesticides_tonnes} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Avg Temperature (°C)</label>
              <input type="number" step="0.1" name="avg_temp" value={formData.avg_temp} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Analyzing Hybrid Agreement..." : "Predict Crop Yield"}
          </button>
        </form>

        {result && (
          <section className={`result-card ${result.status}`} style={{ display: 'block', visibility: 'visible', opacity: 1, marginTop: '20px' }}>
            <div className="result-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Predicted Yield</h3>
              <span className="reliability-badge" style={{ background: '#e8f5e9', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem' }}>
                Reliability: {result.reliability}
              </span>
            </div>
            
            <div className="yield-display" style={{ margin: '20px 0' }}>
              <h2 style={{ fontSize: '2.8rem', color: '#2e7d32', margin: 0 }}>
                {Number(result.prediction).toLocaleString()} 
                <span style={{ fontSize: '1rem', marginLeft: '10px', color: '#666' }}>hg/ha</span>
              </h2>
            </div>

            <div className="insight-box" style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #4caf50' }}>
              <strong>💡 Decision Insight:</strong>
              <p style={{ margin: '5px 0 0 0' }}>{result.insight}</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;