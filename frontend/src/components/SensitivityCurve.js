import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const SensitivityCurve = () => {
    const { formData, predictBatch, result, t } = useGlobalContext();
    const [data, setData] = useState([]);
    const [parameter, setParameter] = useState('average_rain_fall_mm_per_year'); // or avg_temp

    useEffect(() => {
        const generateCurve = async () => {
            if (!result) return;

            const points = [];
            const baseValue = formData[parameter];

            const step = parameter === 'avg_temp' ? 2 : 200;

            for (let i = -5; i <= 5; i++) {
                const val = baseValue + (i * step);
                // Ensure non-negative for rain/pest
                const safeVal = Math.max(0, val);

                points.push({
                    ...formData,
                    [parameter]: safeVal,
                    _label: safeVal // For chart x-axis
                });
            }

            const results = await predictBatch(points);

            const chartData = results.map((res, idx) => ({
                val: points[idx]._label,
                yield: res.prediction
            }));

            setData(chartData);
        };

        generateCurve();
    }, [formData, result, parameter, predictBatch]);

    if (!result) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                background: 'rgba(20, 30, 40, 0.6)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(0,255,127,0.2)'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, color: '#00ff7f', fontSize: '1rem' }}>📈 {t('sensCurve')}</h3>
                <select
                    value={parameter}
                    onChange={(e) => setParameter(e.target.value)}
                    style={{ background: 'black', color: '#fff', border: '1px solid #333', borderRadius: '5px' }}
                >
                    <option value="average_rain_fall_mm_per_year">{t('rainfall')}</option>
                    <option value="avg_temp">{t('temp')}</option>
                    <option value="pesticides_tonnes">{t('pesticides')}</option>
                </select>
            </div>

            <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="val" stroke="#888" label={{ value: parameter.split('_')[1], position: 'insideBottom', offset: -5 }} />
                        <YAxis stroke="#888" />
                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #00ff7f' }} />
                        <Line type="monotone" dataKey="yield" stroke="#00ff7f" strokeWidth={3} dot={{ r: 4 }} />
                        {/* Reference Line for current value could be added */}
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '10px' }}>
                {t('sensDesc')} <strong>{parameter}</strong> {t('whileConstant')}
            </p>
        </motion.div>
    );
};

export default SensitivityCurve;
