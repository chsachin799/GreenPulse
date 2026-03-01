import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGlobalContext } from '../context/GlobalContext';
import MatrixLoader from './MatrixLoader';
import ResultCard from './ResultCard';
import AIAnalysisBox from './AIAnalysisBox';
import SensitivityCurve from './SensitivityCurve';
import CropBattle from './CropBattle';
import ScenarioManager from './ScenarioManager';
import { BarChart2, Activity, Layers } from 'lucide-react';

const Dashboard = () => {
    const { loading, result, t } = useGlobalContext();
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', labelKey: 'overview', icon: <BarChart2 size={16} /> },
        { id: 'deep_dive', labelKey: 'deepDive', icon: <Activity size={16} /> },
        { id: 'scenarios', labelKey: 'scenarios', icon: <Layers size={16} /> },
    ];

    return (
        <div style={{ position: 'relative' }}>
            <AnimatePresence>
                {loading && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}><MatrixLoader /></div>}

                {!loading && !result && (
                    <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'rgba(0,255,255,0.5)' }}>
                        <div style={{ border: '2px dashed rgba(0,255,255,0.2)', padding: '50px', borderRadius: '20px' }}>
                            {t('waiting')}
                        </div>
                    </div>
                )}

                {/* Standard Prediction Mode Results */}
                {!loading && result && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-grid">

                        {/* Tab Navigation */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={activeTab === tab.id ? 'tab-btn-active' : 'tab-btn-inactive'}
                                    style={{
                                        background: activeTab === tab.id ? '#00ff7f' : 'transparent',
                                        color: activeTab === tab.id ? '#000' : '#aaa',
                                        border: 'none',
                                        padding: '8px 15px',
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {tab.icon} {t(tab.labelKey)}
                                </button>
                            ))}
                        </div>

                        {/* TAB CONTENT */}

                        {/* TAB 1: OVERVIEW */}
                        {activeTab === 'overview' && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <ResultCard result={result} />
                                    <AIAnalysisBox xaiAnalysis={result.xai_analysis} insight={result.insight} />
                                </div>
                            </motion.div>
                        )}

                        {/* TAB 2: DEEP DIVE */}
                        {activeTab === 'deep_dive' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                                    <SensitivityCurve />
                                </div>
                            </motion.div>
                        )}

                        {/* TAB 3: SCENARIOS */}
                        {activeTab === 'scenarios' && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                                <CropBattle />
                                <ScenarioManager />
                            </motion.div>
                        )}

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
