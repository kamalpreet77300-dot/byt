'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    Float,
    PerspectiveCamera,
    Text,
    Html,
    Environment,
    ContactShadows,
    OrbitControls,
    QuadraticBezierLine,
} from '@react-three/drei';
import * as THREE from 'three';
import {
    HiCode,
    HiDeviceMobile,
    HiLightningBolt,
    HiCube,
    HiServer,
    HiCloud
} from 'react-icons/hi';

const SERVICE_CARDS = [
    {
        id: 'web-development',
        title: 'Web Development',
        icon: <HiCode />,
        color: '#3b82f6',
        steps: ['Requirements', 'Design', 'Architecture', 'Frontend', 'Backend', 'SEO', 'Testing', 'Launch']
    },
    {
        id: 'mobile-app-development',
        title: 'Mobile App',
        icon: <HiDeviceMobile />,
        color: '#a855f7',
        steps: ['Analysis', 'Platform', 'Design', 'Dev', 'Integration', 'Testing', 'Store', 'Updates']
    },
    {
        id: 'ai-ml-solutions',
        title: 'AI / ML',
        icon: <HiLightningBolt />,
        color: '#10b981',
        steps: ['Analysis', 'Preprocessing', 'Modeling', 'Training', 'Optimization', 'API', 'Intel', 'Auto']
    },
    {
        id: 'saas-development',
        title: 'SaaS Dev',
        icon: <HiCube />,
        color: '#f97316',
        steps: ['Arch', 'Tenancy', 'Billing', 'Dashboards', 'Backend', 'Cloud', 'Scaling', 'Updates']
    },
    {
        id: 'api-backend-development',
        title: 'API & Backend',
        icon: <HiServer />,
        color: '#6366f1',
        steps: ['Design', 'Database', 'Auth', 'Perf', 'Security', 'Docs', 'Integrations', 'Monitor']
    },
    {
        id: 'cloud-devops',
        title: 'Cloud & DevOps',
        icon: <HiCloud />,
        color: '#14b8a6',
        steps: ['Architecture', 'Containers', 'CI/CD', 'Automation', 'Deploy', 'Monitor', 'Hardening', 'Scaling']
    }
];

const Connector = ({ start, end, color }: { start: [number, number, number], end: [number, number, number], color: string }) => {
    const ref = useRef<any>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.material.dashOffset -= 0.01;
        }
    });

    return (
        <QuadraticBezierLine
            ref={ref}
            start={start}
            end={end}
            mid={[(start[0] + end[0]) / 2, (start[1] + end[1]) / 2 + 1, (start[2] + end[2]) / 2]}
            color={color}
            lineWidth={1}
            dashed
            dashScale={50}
            transparent
            opacity={0.3}
        />
    );
};

const WorkflowCard = ({
    active,
    data,
    position,
    index,
    onHover
}: {
    active: boolean,
    data: any,
    position: [number, number, number],
    index: number,
    onHover: (id: string | null) => void
}) => {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            if (!active) {
                meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.1;
            }
            const targetScale = hovered || active ? 1.15 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group
            ref={meshRef}
            position={position}
            onPointerOver={() => { setHovered(true); onHover(data.id); }}
            onPointerOut={() => { setHovered(false); onHover(null); }}
        >
            {/* Card Main Body */}
            <mesh>
                <boxGeometry args={[2.5, 3.5, 0.1]} />
                <meshStandardMaterial
                    color={active ? data.color : '#1a1a1a'}
                    roughness={0.1}
                    metalness={0.8}
                    transparent
                    opacity={active ? 0.3 : 0.1}
                />
            </mesh>

            {/* Glowing Border */}
            <mesh position={[0, 0, -0.01]}>
                <boxGeometry args={[2.55, 3.55, 0.05]} />
                <meshStandardMaterial
                    color={data.color}
                    emissive={data.color}
                    emissiveIntensity={active || hovered ? 2 : 0.2}
                    transparent
                    opacity={active || hovered ? 0.5 : 0.1}
                />
            </mesh>

            {/* Icon & Title */}
            <Html transform position={[0, 1.2, 0.06]} pointerEvents="none">
                <div className="flex flex-col items-center select-none" style={{ color: active || hovered ? 'white' : 'rgba(255,255,255,0.4)', transition: 'all 0.3s' }}>
                    <div className="text-4xl mb-2">{data.icon}</div>
                    <div className="text-sm font-black uppercase tracking-widest text-center whitespace-nowrap">{data.title}</div>
                </div>
            </Html>

            {/* Workflow Steps */}
            <group position={[0, -0.2, 0.06]}>
                {data.steps.map((step: string, i: number) => (
                    <Html key={i} transform position={[0, 0.8 - i * 0.35, 0]} pointerEvents="none">
                        <div className="flex items-center gap-2 w-48 transition-all duration-500" style={{
                            opacity: active || hovered ? (1 - (i * 0.1)) : 0.2,
                            transform: active || hovered ? `translateX(${i * 2}px)` : 'none'
                        }}>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: data.color }} />
                            <div className="text-[10px] font-bold text-white uppercase tracking-tighter opacity-80">{step}</div>
                        </div>
                    </Html>
                ))}
            </group>
        </group>
    );
};

const Scene = ({ slug }: { slug: string }) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const { camera } = useThree();
    const activeIndex = SERVICE_CARDS.findIndex(s => s.id === slug);

    // Smooth camera movement
    useFrame((state) => {
        const activeCard = SERVICE_CARDS[activeIndex];
        if (activeCard) {
            const angle = (activeIndex / SERVICE_CARDS.length) * Math.PI * 2;
            const targetX = Math.cos(angle) * 8;
            const targetZ = Math.sin(angle) * 8;

            // Refocus camera smoothly
            camera.position.lerp(new THREE.Vector3(targetX, 2, targetZ + 12), 0.05);
            camera.lookAt(0, 0, 0);
        }
    });

    return (
        <>
            <group>
                {SERVICE_CARDS.map((service, i) => {
                    const angle = (i / SERVICE_CARDS.length) * Math.PI * 2;
                    const radius = 8;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;
                    const pos: [number, number, number] = [x, 0, z];

                    return (
                        <group key={service.id}>
                            <WorkflowCard
                                active={service.id === slug}
                                data={service}
                                position={pos}
                                index={i}
                                onHover={setHoveredId}
                            />
                            {/* Connect to next card */}
                            {i < SERVICE_CARDS.length && (
                                <Connector
                                    start={pos}
                                    end={[
                                        Math.cos(((i + 1) / SERVICE_CARDS.length) * Math.PI * 2) * radius,
                                        0,
                                        Math.sin(((i + 1) / SERVICE_CARDS.length) * Math.PI * 2) * radius
                                    ]}
                                    color={service.color}
                                />
                            )}
                        </group>
                    );
                })}
            </group>

            {/* Background Particles Flow */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[8, 0.02, 16, 100]} />
                <meshStandardMaterial color="#444" transparent opacity={0.2} />
            </mesh>

            <ambientLight intensity={1.5} />
            <pointLight position={[0, 10, 0]} intensity={2.5} color="#3b82f6" />
            <Environment preset="city" />
            <ContactShadows position={[0, -5, 0]} opacity={0.2} scale={20} blur={24} far={4.5} />
        </>
    );
};

const ThreeServiceBackground = ({ slug }: { color: string, slug: string }) => {
    return (
        <div className="w-full h-full bg-[#030712]">
            <Canvas dpr={[1, 2]} shadows>
                <PerspectiveCamera makeDefault position={[0, 10, 20]} fov={40} />
                <Scene slug={slug} />
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
            </Canvas>
        </div>
    );
};

export default ThreeServiceBackground;
