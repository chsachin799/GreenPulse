import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Swords } from 'lucide-react';

const CropBattle = () => {
    const { formData, predictBatch, t } = useGlobalContext();
    const [opponent, setOpponent] = useState('Maize');
    const [battleData, setBattleData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleBattle = async () => {
        setLoading(true);
        // Prepare two inputs: Current vs Opponent (same conditions)
        const inputs = [
            { ...formData }, // Current
            { ...formData, Item: opponent } // Opponent
        ];

        const results = await predictBatch(inputs);
        if (results && results.length === 2) {
            setBattleData([
                { name: formData.Item, yield: results[0].prediction, profit: results[0].market_price, score: results[0].eco_score },
                { name: opponent, yield: results[1].prediction, profit: results[1].market_price, score: results[1].eco_score }
            ]);
        }
        setLoading(false);
    };

    const crops = ['Maize', 'Rice, paddy', 'Wheat', 'Potatoes', 'Sorghum', 'Soybeans', 'Yams', 'Cassava'];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                background: 'rgba(20, 30, 40, 0.8)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid #ff3333',
                marginTop: '20px'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: '#ff3333', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Swords size={20} /> {t('cropComparison')}
                </h3>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <select
                        value={opponent}
                        onChange={(e) => setOpponent(e.target.value)}
                        style={{ background: 'black', color: '#fff', border: '1px solid #333', borderRadius: '5px', padding: '5px' }}
                    >
                        {crops.filter(c => c !== formData.Item).map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleBattle}
                        disabled={loading}
                        style={{
                            background: '#ff3333', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 15px', cursor: 'pointer'
                        }}
                    >
                        {loading ? t('comparing') : t('compare')}
                    </button>
                </div>
            </div>

            {battleData && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ height: 200 }}>
                        <h4 style={{ textAlign: 'center', color: '#aaa', margin: '0 0 10px 0' }}>Yield (hg/ha)</h4>
                        <ResponsiveContainer>
                            <BarChart data={battleData}>
                                <XAxis dataKey="name" stroke="#555" tick={{ fontSize: 10 }} />
                                <YAxis stroke="#555" hide />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#000' }} />
                                <Bar dataKey="yield">
                                    {battleData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#00ff7f' : '#ff3333'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
                        {battleData.map((fighter, i) => (
                            <div key={i} style={{
                                background: i === 0 ? 'rgba(0, 255, 127, 0.1)' : 'rgba(255, 51, 51, 0.1)',
                                padding: '10px',
                                borderRadius: '5px',
                                borderLeft: `3px solid ${i === 0 ? '#00ff7f' : '#ff3333'}`
                            }}>
                                <div style={{ fontWeight: 'bold', color: '#fff' }}>{fighter.name}</div>
                                <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{t('profitIndex')}: ${fighter.profit}</div>
                                <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{t('ecoScore')}: {fighter.score}</div>
                            </div>
                        ))}
                        <div style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold', color: '#fff' }}>
                            {t('winner')}: <span style={{ color: battleData[0].yield > battleData[1].yield ? '#00ff7f' : '#ff3333' }}>
                                {battleData[0].yield > battleData[1].yield ? battleData[0].name : battleData[1].name}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default CropBattle;
