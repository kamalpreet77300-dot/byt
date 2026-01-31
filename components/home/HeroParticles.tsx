'use client';

import React, { useRef, useEffect } from 'react';

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    size: number;
    color: string;
    vx: number;
    vy: number;
    ease: number;
    shape: 'circle' | 'square' | 'triangle';
    rotation: number;
    rotationSpeed: number;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];
const SHAPES = ['circle', 'square', 'triangle'] as const;

const HeroParticles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const isMouseActiveRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particlesRef.current = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 10000); // Responsive count

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() * 4 + 2;
                const color = COLORS[Math.floor(Math.random() * COLORS.length)];
                const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];

                particlesRef.current.push({
                    x,
                    y,
                    originX: x,
                    originY: y,
                    size,
                    color,
                    vx: 0,
                    vy: 0,
                    ease: Math.random() * 0.1 + 0.05,
                    shape,
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 2,
                });
            }
        };

        const drawShape = (ctx: CanvasRenderingContext2D, p: Particle) => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.beginPath();

            if (p.shape === 'circle') {
                ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            } else if (p.shape === 'square') {
                ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
            } else if (p.shape === 'triangle') {
                ctx.moveTo(0, -p.size);
                ctx.lineTo(p.size, p.size);
                ctx.lineTo(-p.size, p.size);
                ctx.closePath();
            }

            ctx.fill();
            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((p) => {
                // Mouse interaction physics
                if (isMouseActiveRef.current) {
                    const dx = p.x - mouseRef.current.x;
                    const dy = p.y - mouseRef.current.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const maxDistance = 300;
                    const force = (maxDistance - distance) / maxDistance;
                    const directionX = forceDirectionX * force * 5; // Repulsion strength
                    const directionY = forceDirectionY * force * 5;

                    if (distance < maxDistance) {
                        p.vx += directionX;
                        p.vy += directionY;
                    }
                }

                // Return to origin logic
                const dxOrigin = p.originX - p.x;
                const dyOrigin = p.originY - p.y;

                p.vx += dxOrigin * 0.02; // Spring force back to origin
                p.vy += dyOrigin * 0.02;
                p.vx *= 0.9; // Friction
                p.vy *= 0.9;

                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;

                drawShape(ctx, p);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Event Listeners
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
            isMouseActiveRef.current = true;
        };

        const handleMouseLeave = () => {
            isMouseActiveRef.current = false;
        };

        window.addEventListener('resize', resizeCanvas);
        // We attach mouse events to window to track cursor even if not directly over canvas content
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default HeroParticles;
