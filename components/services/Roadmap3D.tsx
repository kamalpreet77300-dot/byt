'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    Float,
    PerspectiveCamera,
    Text,
    Html,
    Environment,
    ScrollControls,
    useScroll,
    QuadraticBezierLine,
    MeshDistortMaterial,
    MeshWobbleMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

const ROADMAP_NODES = [
    { type: 'torus', color: '#3b82f6', scale: 0.8 },
    { type: 'icosahedron', color: '#6366f1', scale: 0.7 },
    { type: 'octahedron', color: '#a855f7', scale: 1.0 },
    { type: 'box', color: '#ec4899', scale: 0.75 },
    { type: 'dodecahedron', color: '#f43f5e', scale: 0.9 },
    { type: 'sphere', color: '#f97316', scale: 0.85 },
    { type: 'torusKnot', color: '#eab308', scale: 0.65 },
    { type: 'tetrahedron', color: '#22c55e', scale: 0.95 },
];

const NodeObject = ({ type, color, scale }: { type: string, color: string, scale: number }) => {
    switch (type) {
        case 'torus': return <torusGeometry args={[scale, 0.3, 16, 100]} />;
        case 'icosahedron': return <icosahedronGeometry args={[scale, 0]} />;
        case 'octahedron': return <octahedronGeometry args={[scale, 0]} />;
        case 'box': return <boxGeometry args={[scale * 1.5, scale * 1.5, scale * 1.5]} />;
        case 'dodecahedron': return <dodecahedronGeometry args={[scale, 0]} />;
        case 'torusKnot': return <torusKnotGeometry args={[scale, 0.2, 128, 32]} />;
        case 'tetrahedron': return <tetrahedronGeometry args={[scale, 0]} />;
        default: return <sphereGeometry args={[scale, 32, 32]} />;
    }
};

const MilestoneNode = ({
    index,
    data,
    position,
    isActive
}: {
    index: number,
    data: any,
    position: [number, number, number],
    isActive: boolean
}) => {
    const nodeConfig = ROADMAP_NODES[index];

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh>
                    <NodeObject type={nodeConfig.type} color={nodeConfig.color} scale={nodeConfig.scale} />
                    {index % 2 === 0 ? (
                        <MeshDistortMaterial
                            color={nodeConfig.color}
                            speed={2}
                            distort={0.4}
                            emissive={nodeConfig.color}
                            emissiveIntensity={isActive ? 2 : 0.5}
                            transparent
                            opacity={0.9}
                        />
                    ) : (
                        <MeshWobbleMaterial
                            color={nodeConfig.color}
                            speed={2}
                            factor={0.4}
                            emissive={nodeConfig.color}
                            emissiveIntensity={isActive ? 2 : 0.5}
                            transparent
                            opacity={0.9}
                        />
                    )}
                </mesh>
            </Float>

            {/* Label */}
            <Html position={[0, nodeConfig.scale + 0.5, 0]} center transform>
                <div className={`transition-all duration-700 flex flex-col items-center ${isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-40'}`}>
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-1">Phase 0{index + 1}</div>
                    <div className="text-sm font-black text-gray-900 uppercase tracking-tighter text-center whitespace-nowrap bg-white/80 backdrop-blur-md px-3 py-1 rounded-lg border border-gray-200 shadow-lg">
                        {data.step}
                    </div>
                </div>
            </Html>

            {isActive && (
                <Html position={[0, -nodeConfig.scale - 0.5, 0]} center transform>
                    <div className="w-64 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
                        <p className="text-[10px] font-bold text-gray-500 leading-relaxed bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-gray-100 shadow-xl">
                            {data.desc}
                        </p>
                    </div>
                </Html>
            )}
        </group>
    );
};

const Scene = ({ process }: { process: any[] }) => {
    const scroll = useScroll();
    const { camera } = useThree();
    const [activeIndex, setActiveIndex] = useState(0);

    const nodePositions = useMemo(() => {
        return process.map((_, i) => [
            Math.sin(i * 1.5) * 4,
            -i * 6,
            Math.cos(i * 1.5) * 4
        ] as [number, number, number]);
    }, [process]);

    useFrame((state) => {
        const offset = scroll.offset; // 0 to 1
        const targetIndex = Math.min(Math.floor(offset * process.length * 1.1), process.length - 1);
        if (targetIndex !== activeIndex) setActiveIndex(targetIndex);

        const currentPos = nodePositions[targetIndex];
        const nextPos = nodePositions[Math.min(targetIndex + 1, process.length - 1)];

        // Easing interpolation
        const subOffset = (offset * process.length) % 1;
        const targetCamX = currentPos[0] + (nextPos[0] - currentPos[0]) * subOffset;
        const targetCamY = currentPos[1] + (nextPos[1] - currentPos[1]) * subOffset;
        const targetCamZ = currentPos[2] + (nextPos[2] - currentPos[2]) * subOffset + 8;

        camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.1);
        camera.lookAt(targetCamX, targetCamY, targetCamZ - 8);
    });

    return (
        <group>
            {process.map((node, i) => (
                <React.Fragment key={i}>
                    <MilestoneNode
                        index={i}
                        data={node}
                        position={nodePositions[i]}
                        isActive={activeIndex === i}
                    />
                    {i < process.length - 1 && (
                        <QuadraticBezierLine
                            start={nodePositions[i]}
                            end={nodePositions[i + 1]}
                            mid={[
                                (nodePositions[i][0] + nodePositions[i + 1][0]) / 2 + 2,
                                (nodePositions[i][1] + nodePositions[i + 1][1]) / 2,
                                (nodePositions[i][2] + nodePositions[i + 1][2]) / 2
                            ]}
                            color={ROADMAP_NODES[i].color}
                            lineWidth={1}
                            dashed
                            dashScale={20}
                            transparent
                            opacity={0.2}
                        />
                    )}
                </React.Fragment>
            ))}

            {/* Path Particles */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={1000}
                        array={new Float32Array(3000).map(() => (Math.random() - 0.5) * 40)}
                        itemSize={3}
                        args={[new Float32Array(3000), 3]}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.05} color="#3b82f6" transparent opacity={0.5} />
            </points>
        </group>
    );
};

const Roadmap3D = ({ process }: { process: any[] }) => {
    return (
        <div className="w-full h-full">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#3b82f6" />
                <ScrollControls pages={process.length * 1.5} damping={0.3}>
                    <Scene process={process} />
                </ScrollControls>
                <Environment preset="city" />
            </Canvas>
        </div>
    );
};

export default Roadmap3D;
