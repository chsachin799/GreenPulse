import { useGlobalContext } from '../context/GlobalContext';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const AIAnalysisBox = ({ xaiAnalysis, insight }) => {
    const { t } = useGlobalContext();

    const getImpactDescription = (impact) => {
        // const absImpact = Math.abs(impact); // Removed unused variable
        if (impact > 15) return { text: "SIGNIFICANT BOOST", color: "#00ff7f" };
        if (impact > 5) return { text: "MODERATE GAIN", color: "#76ff03" };
        if (impact > 0) return { text: "SLIGHT POSITIVE", color: "#b2ff59" };
        if (impact < -15) return { text: "CRITICAL REDUCTION", color: "#ff3333" };
        if (impact < -5) return { text: "MODERATE LOSS", color: "#ff9800" };
        return { text: "SLIGHT DRAG", color: "#ffca28" };
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            style={{
                marginTop: '10px',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(10px)',
                padding: '25px',
                borderRadius: '15px',
                border: '1px solid #00ffff',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.1)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(0,255,255,0.3)', paddingBottom: '10px' }}>
                <Cpu size={24} color="#00ffff" />
                <h3 style={{ margin: 0, color: '#00ffff', fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}>{t('aiLogic')}</h3>
            </div>

            {xaiAnalysis ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {xaiAnalysis.map((item, idx) => {
                        const isPositive = item.impact > 0;
                        const { text, color } = getImpactDescription(item.impact);

                        return (
                            <div key={idx} style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr auto',
                                alignItems: 'center',
                                gap: '10px',
                                background: isPositive ? 'rgba(0, 255, 127, 0.05)' : 'rgba(255, 68, 68, 0.05)',
                                padding: '15px',
                                borderRadius: '8px',
                                borderLeft: `4px solid ${color}`
                            }}>
                                <div>
                                    <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '1rem', marginBottom: '4px' }}>
                                        {item.factor.toUpperCase()}
                                    </div>
                                    <div style={{ color: '#aaa', fontSize: '0.85rem', fontStyle: 'italic' }}>
                                        "{item.reason}"
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        color: color,
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                        background: 'rgba(0,0,0,0.4)',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        marginBottom: '4px',
                                        display: 'inline-block'
                                    }}>
                                        {text}
                                    </div>
                                    <div style={{ color: color, fontSize: '0.8rem', opacity: 0.8 }}>
                                        {isPositive ? '+' : ''}{item.impact}% Effect
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p style={{ margin: 0, color: '#ddd' }}>{insight || "No detailed insights available."}</p>
            )}
        </motion.div>
    );
};

export default AIAnalysisBox;
