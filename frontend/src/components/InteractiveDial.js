import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

const InteractiveDial = ({ value, maxValue = 10, label = "Yield" }) => {
    // Normalize value to percentage for the chart? 
    // Actually RadialBarChart likes data array.

    const data = [
        { name: 'Yield', value: value, fill: '#00ff7f' }
    ];

    // Domain for axis
    const domain = [0, maxValue];

    return (
        <div style={{ width: '100%', height: '200px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    cx="50%"
                    cy="80%"
                    innerRadius="70%"
                    outerRadius="100%"
                    barSize={20}
                    data={data}
                    startAngle={180}
                    endAngle={0}
                >
                    <PolarAngleAxis type="number" domain={domain} angleAxisId={0} tick={false} />
                    <RadialBar
                        minAngle={15}
                        background
                        clockWise
                        dataKey="value"
                        cornerRadius={10}
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <div style={{
                position: 'absolute',
                top: '65%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00ff7f' }}>
                    {value}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#aaa' }}>
                    {label}
                </div>
            </div>
        </div>
    );
};

export default InteractiveDial;
