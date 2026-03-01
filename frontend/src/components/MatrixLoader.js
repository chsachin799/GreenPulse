import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MatrixLoader = () => {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        const messages = [
            "Analyzing Soil Composition...",
            "Fetching Satellite Weather Data...",
            "Calibrating NPK Models...",
            "Checking Historical Yields...",
            "Optimizing Water Tables...",
            "Detecting Pesticide Saturation...",
            "Simulating Growth Cycles...",
            "Encrypting Harvest Data...",
            "Connecting to Global Agri-Net..."
        ];

        const interval = setInterval(() => {
            setLines(prev => {
                const newMsg = messages[Math.floor(Math.random() * messages.length)];
                const timestamp = new Date().toLocaleTimeString().split(" ")[0];
                const newLine = `[${timestamp}] ${newMsg}`;
                return [newLine, ...prev].slice(0, 8); // Keep last 8 lines
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            fontFamily: "'Courier New', monospace",
            color: '#0f0',
            background: 'rgba(0,0,0,0.8)',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #0f0',
            width: '100%',
            maxWidth: '500px',
            margin: '20px auto',
            textAlign: 'left',
            boxShadow: '0 0 15px rgba(0, 255, 0, 0.3)'
        }}>
            <div style={{ borderBottom: '1px solid #0f0', marginBottom: '10px', paddingBottom: '5px', fontWeight: 'bold' }}>
                &gt; SYSTEM_ANALYSIS_MODE_ACTIVE
            </div>
            <div style={{ height: '150px', overflow: 'hidden', display: 'flex', flexDirection: 'column-reverse' }}>
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1 - (i * 0.1), x: 0 }}
                        style={{ fontSize: '0.9rem', marginBottom: '4px' }}
                    >
                        {line}
                    </motion.div>
                ))}
            </div>
            <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ marginTop: '10px', width: '10px', height: '20px', background: '#0f0' }}
            />
        </div>
    );
};

export default MatrixLoader;
