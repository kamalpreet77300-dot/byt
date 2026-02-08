'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import {
    Float,
    PerspectiveCamera,
    Text,
    Html,
    Environment,
    ContactShadows,
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
import { useRouter } from 'next/navigation';


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
    onHover,
    onSelect,
    isDraggingRef
}: {
    active: boolean,
    data: any,
    position: [number, number, number],
    index: number,
    onHover: (id: string | null) => void,
    onSelect: (id: string) => void,
    isDraggingRef: React.MutableRefObject<boolean>
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
        // onClick={(e) => {
        //     e.stopPropagation();
        //     // If we were dragging, do NOT select
        //     if (isDraggingRef.current) return;
        //     onSelect(data.id);
        // }}
        >
            {/* Card Main Body */}
            <mesh>
                <boxGeometry args={[2.5, 3.5, 0.1]} />
                <meshPhysicalMaterial
                    color={active ? data.color : '#000000'}
                    roughness={0.2}
                    metalness={0.1}
                    transmission={0.6}
                    thickness={0.5}
                    ior={1.5}
                    clearcoat={1}
                    transparent
                    opacity={active ? 0.8 : 0.4}
                />
            </mesh>

            {/* Glowing Border */}
            <mesh position={[0, 0, -0.01]}>
                <boxGeometry args={[2.55, 3.55, 0.05]} />
                <meshStandardMaterial
                    color={data.color}
                    emissive={data.color}
                    emissiveIntensity={active || hovered ? 3 : 0.5}
                    transparent
                    opacity={active || hovered ? 0.8 : 0.3}
                />
            </mesh>

            {/* Icon & Title */}
            <Html transform position={[0, 1.2, 0.06]} pointerEvents="none">
                <div className="flex flex-col items-center select-none" style={{ color: active || hovered ? 'white' : 'rgba(255,255,255,0.6)', transition: 'all 0.3s' }}>
                    <div className="text-4xl mb-2 filter drop-shadow-lg">{data.icon}</div>
                    <div className="text-sm font-black uppercase tracking-widest text-center whitespace-nowrap drop-shadow-md">{data.title}</div>
                </div>
            </Html>

            {/* Workflow Steps */}
            <group position={[0, -0.2, 0.06]}>
                {data.steps.map((step: string, i: number) => (
                    <Html key={i} transform position={[0, 0.8 - i * 0.35, 0]} pointerEvents="none">
                        <div className="flex items-center gap-2 w-48 transition-all duration-500" style={{
                            opacity: active || hovered ? (1 - (i * 0.1)) : 0.3,
                            transform: active || hovered ? `translateX(${i * 2}px)` : 'none'
                        }}>
                            <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_5px_currentColor]" style={{ backgroundColor: data.color }} />
                            <div className="text-[10px] font-bold text-white uppercase tracking-tighter opacity-90 drop-shadow-sm">{step}</div>
                        </div>
                    </Html>
                ))}
            </group>
        </group>
    );
};

const Scene = ({ slug }: { slug: string }) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const groupRef = useRef<THREE.Group>(null);
    // const router = useRouter();
    const { gl, camera } = useThree();

    // Interaction State
    const isDragging = useRef(false); // Are we currently holding down?
    const hasDragged = useRef(false); // Did we move enough to count as a drag? (Pass to cards)
    const previousPointerX = useRef(0);
    const rotationVelocity = useRef(0);
    const startPointerX = useRef(0);

    // Performance State
    const lastSyncedSlug = useRef(slug);

    // Calculate initial index
    const foundIndex = SERVICE_CARDS.findIndex(s => s.id === slug);
    const activeIndex = foundIndex === -1 ? 0 : foundIndex;
    const total = SERVICE_CARDS.length;
    const segmentAngle = (Math.PI * 2) / total;

    // Camera setup
    useEffect(() => {
        // Look slightly above center to frame the cards nicely
        camera.lookAt(0, 0, 0);
    }, [camera]);

    // Sync rotation with slug (initial or external change) ONLY if not interacting
    useEffect(() => {
        if (!isDragging.current && !rotationVelocity.current) {
            // Target rotation: active card should be at PI/2 (front)
            // GroupRot + CardAngle = PI/2
            // GroupRot = PI/2 - CardAngle
            const target = (Math.PI / 2) - (activeIndex * segmentAngle);

            // We'll let the lerp loop handle the animation,
            // but if we wanted to snap instantly on mount:
            // groupRef.current.rotation.y = target;
        }
    }, [activeIndex, segmentAngle]);

    const handleSelect = (id: string) => {
        if (lastSyncedSlug.current !== id) {
            lastSyncedSlug.current = id;
            // router.replace(`/services/${id}`);
        }
    };

    // Global Event Listeners for robust drag
    useEffect(() => {
        const canvas = gl.domElement;

        const onPointerDown = (e: PointerEvent) => {
            isDragging.current = true;
            hasDragged.current = false;
            previousPointerX.current = e.clientX;
            startPointerX.current = e.clientX;
            rotationVelocity.current = 0;
            canvas.setPointerCapture(e.pointerId);
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDragging.current) return;

            const deltaX = e.clientX - previousPointerX.current;
            previousPointerX.current = e.clientX;

            // Check threshold to invalidate click
            if (Math.abs(e.clientX - startPointerX.current) > 5) {
                hasDragged.current = true;
            }

            // Sensitivity
            const deltaRotation = deltaX * 0.005;
            rotationVelocity.current = deltaRotation;

            if (groupRef.current) {
                groupRef.current.rotation.y += deltaRotation;
            }
        };

        const onPointerUp = (e: PointerEvent) => {
            isDragging.current = false;
            canvas.releasePointerCapture(e.pointerId);
        };

        canvas.addEventListener('pointerdown', onPointerDown);
        canvas.addEventListener('pointermove', onPointerMove);
        canvas.addEventListener('pointerup', onPointerUp);
        // Also handle leave/cancel
        canvas.addEventListener('pointerleave', onPointerUp);

        return () => {
            canvas.removeEventListener('pointerdown', onPointerDown);
            canvas.removeEventListener('pointermove', onPointerMove);
            canvas.removeEventListener('pointerup', onPointerUp);
            canvas.removeEventListener('pointerleave', onPointerUp);
        };
    }, [gl]);


    useFrame((state, delta) => {
        if (!groupRef.current) return;

        if (isDragging.current) {
            // Dragging handled in pointer move
        } else {
            // Apply inertia
            if (Math.abs(rotationVelocity.current) > 0.0001) {
                groupRef.current.rotation.y += rotationVelocity.current;
                rotationVelocity.current *= 0.95; // Damping
            } else {
                rotationVelocity.current = 0;
            }

            // Snap Logic
            if (Math.abs(rotationVelocity.current) < 0.001) {
                const currentRot = groupRef.current.rotation.y;

                // Inverse of: GroupRot = PI/2 - index * segment
                // index * segment = PI/2 - GroupRot
                // index = (PI/2 - GroupRot) / segment

                const rawIndex = (Math.PI / 2 - currentRot) / segmentAngle;
                let targetIndex = Math.round(rawIndex);

                // Wrap index
                let wrappedIndex = ((targetIndex % total) + total) % total;

                // Target Rotation
                const targetRot = (Math.PI / 2) - (targetIndex * segmentAngle);

                // Smoothly lerp to target
                groupRef.current.rotation.y = THREE.MathUtils.lerp(
                    currentRot,
                    targetRot,
                    0.1
                );

                // Update Slug with tighter threshold and debounce protection (implicit by logic)
                if (Math.abs(currentRot - targetRot) < 0.005) {
                    const currentSlugId = SERVICE_CARDS[wrappedIndex].id;

                    // Optimization: Only replace if it's a NEW slug we haven't already synced
                    // if (currentSlugId !== slug && currentSlugId !== lastSyncedSlug.current) {
                    //     lastSyncedSlug.current = currentSlugId;
                    //     router.replace(`/services/${currentSlugId}`, { scroll: false });
                    // }
                }
            }
        }
    });

    return (
        <>
            <group ref={groupRef}>
                {SERVICE_CARDS.map((service, i) => {
                    const angle = (i / SERVICE_CARDS.length) * Math.PI * 2;
                    const radius = 8;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;
                    const pos: [number, number, number] = [x, 0, z];

                    return (
                        <group key={service.id} position={pos} rotation={[0, angle, 0]}>
                            <WorkflowCard
                                active={service.id === slug}
                                data={service}
                                position={[0, 0, 0]}
                                index={i}
                                onHover={setHoveredId}
                                onSelect={handleSelect}
                                isDraggingRef={hasDragged}
                            />
                            {/* Connect to next card */}
                            {i < SERVICE_CARDS.length && (
                                <Connector
                                    start={[0, 0, 0]}
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
            </Canvas>
        </div>
    );
};

export default ThreeServiceBackground;

