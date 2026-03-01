import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { motion } from 'framer-motion';
import { Pin, X } from 'lucide-react';

const ScenarioManager = () => {
    const { result, formData, scenarios, addScenario, removeScenario, t } = useGlobalContext();

    if (!result && scenarios.length === 0) return null;

    const handlePin = () => {
        // Prevent duplicates (simple check by prediction value)
        if (scenarios.some(s => s.prediction === result.prediction)) return;
        // Attach current formData as input so we can read it later
        addScenario({ ...result, input: formData });
    };

    return (
        <div style={{ marginTop: '20px' }}>
            {/* Control Bar */}
            {result && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <button
                        onClick={handlePin}
                        disabled={scenarios.length >= 3}
                        style={{
                            background: scenarios.length >= 3 ? '#555' : 'rgba(0, 255, 127, 0.2)',
                            color: scenarios.length >= 3 ? '#aaa' : '#00ff7f',
                            border: '1px solid #00ff7f',
                            padding: '8px 15px',
                            borderRadius: '20px',
                            cursor: scenarios.length >= 3 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.9rem'
                        }}
                    >
                        <Pin size={16} /> {t('pinScenario')} ({scenarios.length}/3)
                    </button>
                </div>
            )}

            {/* Pinned Scenarios List */}
            {scenarios.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    {scenarios.map((scen, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{
                                background: 'rgba(0,0,0,0.6)',
                                border: '1px dashed #00ff7f',
                                padding: '10px',
                                borderRadius: '10px',
                                position: 'relative'
                            }}
                        >
                            <button
                                onClick={() => removeScenario(idx)}
                                style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    background: 'none',
                                    border: 'none',
                                    color: '#ff4d4d',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={14} />
                            </button>

                            <h4 style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: '#aaa' }}>{t('scenario')} #{idx + 1}</h4>
                            <div style={{ color: '#00ff7f', fontWeight: 'bold' }}>{scen.prediction.toLocaleString()} hg/ha</div>
                            <div style={{ fontSize: '0.75rem', color: '#888' }}>
                                {scen.input.average_rain_fall_mm_per_year}mm | {scen.input.avg_temp}°C
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ScenarioManager;
