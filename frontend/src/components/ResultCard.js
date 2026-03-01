import { useGlobalContext } from '../context/GlobalContext';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Leaf, TrendingUp } from 'lucide-react'; // Added Leaf, TrendingUp
import InteractiveDial from './InteractiveDial';

const ResultCard = ({ result }) => {
    const { t } = useGlobalContext();
    if (!result) return null;

    const isSuccess = result.status === 'success';


    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            style={{
                background: 'rgba(10, 20, 30, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                padding: '30px',
                marginTop: '30px',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                color: '#fff'
            }}
        >
            {/* Decorative Top Line */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: `linear-gradient(90deg, ${isSuccess ? '#00ff7f' : '#ff9800'}, #00ffff)` }} />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="result-header"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {isSuccess ? <CheckCircle size={28} color="#00ff7f" /> : <AlertTriangle size={28} color="#ff9800" />}
                    <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#fff', fontFamily: 'Orbitron, sans-serif' }}>ANALYSIS COMPLETE</h2>
                </div>
                <div style={{ background: 'rgba(0, 255, 255, 0.1)', border: '1px solid #00ffff', padding: '5px 12px', borderRadius: '5px', color: '#00ffff', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    CONFIDENCE: {result.reliability}
                </div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                {/* Main Yield Metric */}
                <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(0, 255, 127, 0.3)' }}>
                    <div style={{ color: '#00ff7f', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '2px' }}>{t('yieldForecast')}</div>

                    {/* Novelty Feature: Interactive Dial */}
                    <InteractiveDial
                        value={Number(result.prediction).toLocaleString()}
                        maxValue={100000}
                        label="hg/ha"
                    />
                </div>
            </div>



        </motion.div>
    );
};

export default ResultCard;

