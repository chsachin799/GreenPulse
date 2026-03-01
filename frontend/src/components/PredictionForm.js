import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { COUNTRIES, CROPS, CROP_CONSTRAINTS } from '../utils/constants';

const PredictionForm = () => {
    const { formData, updateFormData, predictYield, loading, error, t } = useGlobalContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Input Validation
        const rain = parseFloat(formData.average_rain_fall_mm_per_year);
        const pest = parseFloat(formData.pesticides_tonnes);
        const temp = parseFloat(formData.avg_temp);
        const selectedCrop = formData.Item;
        const constraints = CROP_CONSTRAINTS[selectedCrop];

        // 1. Crop-Specific Rainfall Validation
        if (constraints) {
            if (rain < constraints.rainMin || rain > constraints.rainMax) {
                alert(`⚠️ INVALID RAINFALL FOR ${selectedCrop.toUpperCase()}:\nOptimal Range: ${constraints.rainMin} - ${constraints.rainMax} mm.\nYou entered: ${rain} mm.`);
                return;
            }

            // 2. Crop-Specific Temperature Validation
            if (temp < constraints.tempMin || temp > constraints.tempMax) {
                alert(`⚠️ INVALID TEMP FOR ${selectedCrop.toUpperCase()}:\nSurvival Range: ${constraints.tempMin}°C - ${constraints.tempMax}°C.\nYou entered: ${temp}°C.`);
                return;
            }
        } else {
            // General fallback
            if (rain < 100 || rain > 5000) { alert("Invalid Rainfall Range"); return; }
            if (temp < -10 || temp > 50) { alert("Invalid Temp Range"); return; }
        }

        // 3. Pesticide Validation
        if (pest < 0 || pest > 1500) {
            alert("⚠️ INVALID PESTICIDE LOAD: Please enter a value between 0 and 1500 tonnes.");
            return;
        }

        // Trigger context action
        predictYield();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="prediction-form" style={{ backdropFilter: 'blur(10px)', background: 'rgba(0,0,0,0.6)' }}>
                <div style={{ marginBottom: '20px', fontSize: '0.8rem', color: '#aaa', paddingBottom: '10px', borderBottom: '1px solid #333' }}>
                    {t('inputTitle')} <strong>REGIONAL</strong> ANALYSIS
                </div>
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
                    <div className="form-group">
                        <label>{t('sector')}</label>
                        <select name="Area" value={formData.Area} onChange={updateFormData}>
                            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>{t('biomass')}</label>
                        <select name="Item" value={formData.Item} onChange={updateFormData}>
                            {CROPS.map(item => <option key={item} value={item}>{item}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>{t('rainfall')}</label>
                        <input type="number" name="average_rain_fall_mm_per_year" value={Math.floor(formData.average_rain_fall_mm_per_year)} onChange={updateFormData} />
                    </div>
                    <div className="form-group">
                        <label>{t('pesticides')}</label>
                        <input type="number" name="pesticides_tonnes" value={Math.floor(formData.pesticides_tonnes)} onChange={updateFormData} />
                        <small style={{ color: '#666', fontSize: '0.7rem' }}>{t('pesticidesSub')}</small>
                    </div>
                    <div className="form-group">
                        <label>{t('temp')}</label>
                        <input type="number" step="0.1" name="avg_temp" value={formData.avg_temp} onChange={updateFormData} />
                    </div>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? t('processing') : t('submitBtn')}
                </button>
            </form>
        </div>
    );
};

export default PredictionForm;
