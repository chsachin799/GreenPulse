import React from 'react';

const HUDOverlay = ({ ecoScore }) => {
    const color = ecoScore > 50 ? 'rgba(0, 255, 127, 0.4)' : 'rgba(255, 99, 71, 0.4)';

    const cornerStyle = {
        position: 'absolute',
        width: '50px',
        height: '50px',
        borderColor: color,
        borderStyle: 'solid',
        zIndex: 9999,
        pointerEvents: 'none',
        transition: 'border-color 1s ease'
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 999 }}>

            {/* Bottom Left */}
            <div style={{ ...cornerStyle, bottom: '20px', left: '20px', borderBottomWidth: '3px', borderLeftWidth: '3px' }}></div>
            {/* Bottom Right */}
            <div style={{ ...cornerStyle, bottom: '20px', right: '20px', borderBottomWidth: '3px', borderRightWidth: '3px' }}></div>

            {/* Scan Lines Animation */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
                backgroundSize: '100% 4px, 6px 100%',
                pointerEvents: 'none'
            }} />


        </div>
    );
};

export default HUDOverlay;
