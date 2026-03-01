import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { translations } from '../utils/translations';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    // Prediction State
    const [formData, setFormData] = useState({
        Area: 'India',
        Item: 'Rice, paddy',
        Year: 2026,
        average_rain_fall_mm_per_year: 1500,
        pesticides_tonnes: 100,
        avg_temp: 25
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Theme and Language State
    const [theme] = useState('dark'); // Locked to dark
    const [language] = useState('en'); // Locked to en

    // History State
    const [history, setHistory] = useState([]);
    const [showComparison, setShowComparison] = useState(false);

    // Scenarios for A/B Testing & Battle
    const [scenarios, setScenarios] = useState([]);

    // Removed toggleTheme and toggleLanguage


    // Translation helper
    const t = (key) => {
        const text = translations[language][key];
        return text || key;
    };

    const updateFormData = (e) => {
        const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const predictYield = async () => {
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            await new Promise(r => setTimeout(r, 1000));
            const response = await axios.post(`${API_BASE_URL}/predict`, formData);

            if (response.data.status === 'success') {
                setResult(response.data);
                // Add to history
                setHistory(prev => [{ ...response.data, timestamp: new Date(), input: { ...formData } }, ...prev]);
            } else {
                setError("Model Error: " + response.data.message);
            }
        } catch (err) {
            console.error(err);
            setError("System Error: Check Backend Connection");
        } finally {
            setLoading(false);
        }
    };

    const predictBatch = async (batchData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/predict_batch`, batchData);
            if (response.data.status === 'success') {
                return response.data.batch_results;
            }
            return [];
        } catch (err) {
            console.error("Batch Predict Error", err);
            return [];
        }
    };

    const addScenario = (scenarioResult) => {
        if (scenarios.length < 3) {
            setScenarios(prev => [...prev, scenarioResult]);
        }
    };

    const removeScenario = (index) => {
        setScenarios(prev => prev.filter((_, i) => i !== index));
    };

    const value = {
        formData, updateFormData,
        result, loading, error, predictYield, setError,
        theme, // toggleTheme removed
        language, t, // toggleLanguage removed
        history,
        showComparison, setShowComparison,
        scenarios, addScenario, removeScenario, predictBatch
    };

    return (
        <GlobalContext.Provider value={value}>
            <div className={`app-theme-${theme}`} style={{ minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
                {children}
            </div>
        </GlobalContext.Provider>
    );
};
