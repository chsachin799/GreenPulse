import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const ComparisonView = ({ onClose }) => {
    const { history } = useGlobalContext();

    // Prepare data: take last 5 records
    const data = history.slice(0, 5).reverse().map((rec, idx) => ({
        name: rec.input.Item.split(',')[0], // Shorten name
        yield: rec.prediction,
        fullDate: new Date(rec.timestamp).toLocaleString()
    }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
                position: 'fixed',
                top: '10%',
                left: '10%',
                right: '10%',
                bottom: '10%',
                background: 'rgba(0, 10, 20, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid #00ff7f',
                zIndex: 2000,
                padding: '40px',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, color: '#00ff7f', fontFamily: 'Orbitron' }}>YIELD COMPARISON</h2>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>&times;</button>
            </div>

            {data.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#aaa' }}>
                    <p style={{ fontSize: '1.2rem' }}>No history available to compare.</p>
                    <p>Make some predictions first!</p>
                </div>
            ) : (
                <>
                    <div style={{ flex: 1, width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                                <XAxis dataKey="name" stroke="#fff" />
                                <YAxis stroke="#fff" />
                                <Tooltip
                                    contentStyle={{ background: '#000', border: '1px solid #00ff7f' }}
                                    itemStyle={{ color: '#00ff7f' }}
                                />
                                <Bar dataKey="yield" fill="#00ff7f" radius={[10, 10, 0, 0]}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#00ffff' : '#00ff7f'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p style={{ textAlign: 'center', color: '#aaa', marginTop: '10px' }}>Comparing your last {data.length} predictions</p>
                </>
            )}
        </motion.div>
    );
};

export default ComparisonView;
