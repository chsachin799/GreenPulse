import React, { useEffect, useRef } from 'react';

const Background = ({ ecoScore }) => {
    const canvasRef = useRef(null);

    // Base color logic moved inside useEffect for reactivity


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Feature 5: Reactive Logic
        const isCritical = ecoScore < 50;
        // Define color components for flexible usage
        const color = isCritical ? { r: 255, g: 50, b: 50 } : { r: 0, g: 255, b: 127 };
        const speed = isCritical ? 2 : 0.5; // High speed chaos if critical
        const connectionDistance = 150;

        let particles = [];
        const particleCount = 100;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * speed;
                this.vy = (Math.random() - 0.5) * speed;
                this.size = Math.random() * 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }

            draw() {
                ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.random() * 0.5})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(10, 15, 20, 0.2)'; // Trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, index) => {
                p.update();
                p.draw();

                // Draw connections
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${1 - dist / connectionDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [ecoScore]); // Re-init when score changes color

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                background: '#050a0f' // Deep dark blue/black base
            }}
        />
    );
};

export default Background;
