import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Clock, TrendingUp } from 'lucide-react';

const HistorySidebar = () => {
    const { history } = useGlobalContext();

    if (history.length === 0) return null;

    return (
        <div style={{
            background: 'rgba(10, 20, 30, 0.8)',
            border: '1px solid rgba(0, 255, 255, 0.2)',
            borderRadius: '15px',
            padding: '20px',
            color: '#fff',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.05)'
        }}>
            <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={16} /> HISTORY
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {history.map((record, index) => (
                    <div key={index} style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '10px',
                        borderRadius: '5px',
                        fontSize: '0.85rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ color: '#00ff7f', fontWeight: 'bold' }}>{record.input.Item}</span>
                            <span style={{ color: '#aaa' }}>{new Date(record.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <TrendingUp size={14} color="#00ffff" />
                            <span>{(record.prediction || 0).toFixed(2)} tonnes/ha</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistorySidebar;
