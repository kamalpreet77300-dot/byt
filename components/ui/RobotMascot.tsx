"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera, ContactShadows, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const CODE_SNIPPETS: Record<string, { lang: string; code: string }> = {
    hero: {
        lang: "React",
        code: "const Hero = () => {\n  return (\n    <div className=\"bg-grid\">\n      <AnimatedTitle />\n    </div>\n  );\n};",
    },
    services: {
        lang: "TypeScript",
        code: "interface Service {\n  id: string;\n  name: string;\n  icon: LucideIcon;\n}\n\nasync function getServices() {\n  return await db.service.findMany();\n}",
    },
    courses: {
        lang: "Tailwind",
        code: "<div className=\"flex items-center space-x-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:scale-105 transition-all shadow-xl hover:shadow-cyan-500/20\">\n  <h3 className=\"text-2xl font-bold\">Course</h3>\n</div>",
    },
    projects: {
        lang: "Python",
        code: "def analyze_project(data):\n    results = np.linalg.solve(A, b)\n    chart = px.scatter(results)\n    return chart",
    },
    testimonials: {
        lang: "Markdown",
        code: "## Client Feedback\n\n> \"The 3D robot is amazing!\"\n\n- [x] Integrate Three.js\n- [x] Add Mascot\n- [ ] Polish UI",
    },
    footer: {
        lang: "CSS",
        code: ".footer {\n  display: flex;\n  background: linear-gradient(\n    to top,\n    #000,\n    #111\n  );\n  filter: blur(10px);\n}",
    },
    default: {
        lang: "JS",
        code: "console.log(\"Building BytSmartz...\");\n\nwhile(true) {\n  code();\n  innovate();\n  deploy();\n}",
    }
};

const LaptopScreen = ({ code, lang, isInteracting, isFixing }: { code: string; lang: string; isInteracting: boolean; isFixing: boolean }) => {
    const textRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (textRef.current) {
            // Speed up scroll when interacting
            const speed = isInteracting || isFixing ? 1.5 : 0.3;
            textRef.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * speed) * 0.05;
        }
    });

    const getDisplayText = () => {
        if (isFixing) return `\n\n   COMPONENT\n   OPTIMIZED\n   ✓ SUCCESS`;
        if (isInteracting) return `ANALYZING COMPONENT...\n\n${lang.toUpperCase()}\n\n${code}`;
        return `${lang.toUpperCase()}\n\n${code}`;
    }

    return (
        <group position={[0, -0.05, 0.02]} rotation={[0, 0, 0]}>
            <Text
                ref={textRef as any}
                fontSize={0.045}
                color={isFixing ? "#00ff00" : isInteracting ? "#ffffff" : "#00ffff"}
                anchorX="center"
                anchorY="middle"
                maxWidth={1.5}
                lineHeight={0.8}
                textAlign="left"
            >
                {getDisplayText()}
            </Text>
        </group>
    );
};

const ScanBeam = ({ targetPos, sourcePos }: { targetPos: THREE.Vector3; sourcePos: THREE.Vector3 }) => {
    const beamRef = useRef<THREE.Mesh>(null);
    const beamMat = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#00ffff",
        emissive: "#00ffff",
        emissiveIntensity: 10,
        transparent: true,
        opacity: 0.8
    }), []);

    useFrame((state) => {
        if (!beamRef.current) return;

        const dist = sourcePos.distanceTo(targetPos);
        beamRef.current.scale.set(1, dist, 1);
        beamRef.current.position.copy(sourcePos).lerp(targetPos, 0.5);
        beamRef.current.lookAt(targetPos);
        beamRef.current.rotateX(Math.PI / 2);

        beamMat.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 20) * 0.2;
    });

    return (
        <mesh ref={beamRef}>
            <cylinderGeometry args={[0.01, 0.03, 1, 8]} />
            <primitive object={beamMat} attach="material" />
        </mesh>
    );
};

const RobotModel = ({ targetPosRef, interactionPosRef, isInteracting, isFixing, sectionKey }: {
    targetPosRef: React.RefObject<THREE.Vector3>;
    interactionPosRef: React.RefObject<THREE.Vector3>;
    isInteracting: boolean;
    isFixing: boolean;
    sectionKey: string
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const laptopRef = useRef<THREE.Group>(null);
    const leftArmRef = useRef<THREE.Group>(null);
    const rightArmRef = useRef<THREE.Group>(null);
    const [scale, setScale] = useState(0.35);

    useEffect(() => {
        const updateScale = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            // More conservative scaling to avoid overlap
            let newScale = width < 768 ? 0.18 : width < 1280 ? 0.28 : 0.38;
            if (height < 700) newScale *= 0.85;
            setScale(newScale);
        };
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const snippet = useMemo(() => CODE_SNIPPETS[sectionKey] || CODE_SNIPPETS.default, [sectionKey]);

    const bloomPulse = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#00ffff",
        emissive: "#00ffff",
        emissiveIntensity: 2,
        metalness: 1,
        roughness: 0
    }), []);

    useFrame((state) => {
        if (!groupRef.current || !headRef.current || !targetPosRef.current) return;

        groupRef.current.position.lerp(targetPosRef.current, 0.08);
        groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5) * 0.005;

        // Pulse effect
        bloomPulse.emissiveIntensity = (isInteracting || isFixing ? 5 : 2) + Math.sin(state.clock.elapsedTime * 5) * 1;

        // Green color for fixing state
        // if (isFixing) {
        //     bloomPulse.color.set("#00ff00");
        //     bloomPulse.emissive.set("#00ff00");
        // } else {
        //     bloomPulse.color.set("#00ffff");
        //     bloomPulse.emissive.set("#00ffff");
        // }

        // if (isInteracting && interactionPosRef.current) {
        // Look at interaction target
        const lookPos = interactionPosRef.current.clone().sub(groupRef.current.position).multiplyScalar(1 / scale);
        // headRef.current.lookAt(lookPos);
        // Limit neck rotation for realism
        // headRef.current.rotation.x = THREE.MathUtils.clamp(headRef.current.rotation.x, -0.4, 0.6);
        // headRef.current.rotation.y = THREE.MathUtils.clamp(headRef.current.rotation.y, -0.8, 0.8);

        if (rightArmRef.current) {
            rightArmRef.current.lookAt(lookPos);
            rightArmRef.current.rotateX(-Math.PI / 2);
        }
        if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -Math.PI / 4;
            // leftArmRef.current.rotation.x = -Math.PI / 4 + Math.sin(state.clock.elapsedTime * 30) * 0.1;
        }
        // } else if (isFixing) {
        // Fixing Animation (Nodding / Thumbs Up illusion)
        // headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 15) * 0.2; // Rapid nodding
        // headRef.current.rotation.y = 0;

        // "Typing" or "Fixing" fast arm movement
        // if (leftArmRef.current && rightArmRef.current) {
        //     leftArmRef.current.rotation.x = -Math.PI / 3 + Math.sin(state.clock.elapsedTime * 40) * 0.2;
        //     rightArmRef.current.rotation.x = -Math.PI / 3 + Math.cos(state.clock.elapsedTime * 40) * 0.2;
        // }
        // } else {
        // headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0.3, 0.05);
        // headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, Math.sin(state.clock.elapsedTime * 0.5) * 0.1, 0.05);

        // if (leftArmRef.current && rightArmRef.current) {
        //     leftArmRef.current.rotation.x = -Math.PI / 4 + Math.sin(state.clock.elapsedTime * 15) * 0.05;
        //     rightArmRef.current.rotation.x = -Math.PI / 4 + Math.cos(state.clock.elapsedTime * 15 + 0.5) * 0.05;
        // }
        // }
    });

    return (
        <group ref={groupRef} scale={scale}>
            {/* Energy Ring Behind Robot */}
            <mesh position={[0, 0, -0.3]}>
                <torusGeometry args={[1, 0.02, 16, 100]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} transparent opacity={0.3} />
            </mesh>

            {/* Main Torso */}
            <group position={[0, 0, 0]}>
                <RoundedBox args={[0.7, 0.9, 0.45]} radius={0.12} smoothness={4}>
                    <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
                </RoundedBox>
                {/* Internal Glow visible through slits */}
                <mesh position={[0, 0, 0.23]}>
                    <boxGeometry args={[0.4, 0.6, 0.01]} />
                    <primitive object={bloomPulse} attach="material" transparent opacity={0.1} />
                </mesh>
                {/* Core Reactor */}
                <group position={[0, 0.1, 0.23]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
                        <primitive object={bloomPulse} attach="material" />
                    </mesh>
                    <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[0.16, 0.18, 32]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} />
                    </mesh>
                </group>
            </group>

            {/* Segmented Neck */}
            <group position={[0, 0.5, 0]}>
                <mesh position={[0, -0.05, 0]}>
                    <cylinderGeometry args={[0.08, 0.1, 0.1]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
            </group>

            {/* Advanced Head Unit */}
            <group ref={headRef} position={[0, 0.8, 0]}>
                <RoundedBox args={[0.6, 0.5, 0.45]} radius={0.15} smoothness={4}>
                    <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
                </RoundedBox>

                {/* Visor Panel */}
                <mesh position={[0, 0, 0.23]}>
                    <RoundedBox args={[0.5, 0.25, 0.02]} radius={0.05}>
                        <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
                    </RoundedBox>
                </mesh>

                {/* Cyber Eyes */}
                {[-1, 1].map((side) => (
                    <group key={side} position={[0.15 * side, 0, 0.25]}>
                        <mesh>
                            <sphereGeometry args={[0.07]} />
                            <primitive object={bloomPulse} attach="material" />
                        </mesh>
                        <mesh position={[0, 0, 0.01]}>
                            <torusGeometry args={[0.08, 0.01, 8, 32]} />
                            <meshStandardMaterial color="#ffffff" emissive="#ffffff" />
                        </mesh>
                    </group>
                ))}

                {/* Sensor Array (Antennas) */}
                {[-1, 1].map((side) => (
                    <group key={side} position={[0.2 * side, 0.25, 0]} rotation={[0, 0, 0.2 * side]}>
                        <mesh>
                            <cylinderGeometry args={[0.01, 0.02, 0.4]} />
                            <meshStandardMaterial color="#334155" />
                        </mesh>
                        <mesh position={[0, 0.2, 0]}>
                            <sphereGeometry args={[0.04]} />
                            <primitive object={bloomPulse} attach="material" />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Professional Articulated Arms */}
            {[-1, 1].map((side) => (
                <group key={side} ref={side === -1 ? leftArmRef : rightArmRef} position={[0.45 * side, 0.25, 0]}>
                    {/* Shoulder Ball Joint */}
                    <mesh>
                        <sphereGeometry args={[0.15]} />
                        <meshStandardMaterial color="#334155" metalness={1} />
                    </mesh>
                    {/* Upper Arm Bone */}
                    <group position={[0.1 * side, -0.2, 0]} rotation={[0, 0, 0.2 * side]}>
                        <mesh>
                            <cylinderGeometry args={[0.06, 0.08, 0.4]} />
                            <meshStandardMaterial color="#0f172a" />
                        </mesh>
                        {/* Hydraulics */}
                        <mesh position={[0.05 * side, 0, 0]}>
                            <cylinderGeometry args={[0.01, 0.01, 0.35]} />
                            <meshStandardMaterial color="#475569" metalness={1} />
                        </mesh>
                    </group>
                    {/* Elbow Joint */}
                    <mesh position={[0.2 * side, -0.4, 0]}>
                        <sphereGeometry args={[0.1]} />
                        <meshStandardMaterial color="#00ffff" />
                    </mesh>
                    {/* Functional Hands */}
                    <group position={[0.25 * side, -0.6, 0.1]}>
                        <RoundedBox args={[0.15, 0.2, 0.15]} radius={0.03}>
                            <meshStandardMaterial color="#1e293b" />
                        </RoundedBox>
                        {/* Glow on palm */}
                        <mesh position={[0, -0.05, 0.08]}>
                            <sphereGeometry args={[0.04]} />
                            <primitive object={bloomPulse} attach="material" />
                        </mesh>
                    </group>
                </group>
            ))}

            {/* Industrial Legs with Pistons */}
            {[-1, 1].map((side) => (
                <group key={side} position={[0.25 * side, -0.6, 0]}>
                    <mesh>
                        <sphereGeometry args={[0.14]} />
                        <meshStandardMaterial color="#334155" />
                    </mesh>
                    <mesh position={[0, -0.3, 0]}>
                        <cylinderGeometry args={[0.12, 0.1, 0.6]} />
                        <meshStandardMaterial color="#0f172a" />
                    </mesh>
                    {/* Piston Detail */}
                    <mesh position={[0.1 * side, -0.3, 0.05]}>
                        <cylinderGeometry args={[0.02, 0.02, 0.4]} />
                        <meshStandardMaterial color="#475569" metalness={1} />
                    </mesh>
                    <RoundedBox args={[0.25, 0.15, 0.4]} radius={0.04} position={[0, -0.65, 0.1]}>
                        <meshStandardMaterial color="#1e293b" />
                    </RoundedBox>
                </group>
            ))}

            {/* High-Performance Workstation */}
            <group ref={laptopRef} position={[0, -0.1, 0.7]} rotation={[-0.2, 0, 0]}>
                <RoundedBox args={[0.9, 0.06, 0.6]} radius={0.02} position={[0, -0.05, 0]}>
                    <meshStandardMaterial color="#000000" metalness={1} roughness={0.1} />
                </RoundedBox>
                {/* Glowing edge on laptop */}
                <mesh position={[0, -0.05, 0.301]}>
                    <boxGeometry args={[0.8, 0.01, 0.01]} />
                    <primitive object={bloomPulse} attach="material" />
                </mesh>

                <group position={[0, 0, -0.3]} rotation={[Math.PI / 10.2, 0, 0]}>
                    <RoundedBox args={[0.9, 0.6, 0.03]} radius={0.02} position={[0, 0.3, 0]}>
                        <meshStandardMaterial color="#0f172a" metalness={0.8} />
                    </RoundedBox>
                    {/* Screen Emit */}
                    <mesh position={[0, 0.3, 0.021]}>
                        <planeGeometry args={[0.84, 0.54]} />
                        <meshStandardMaterial color="#000000" emissive="#ffffff" emissiveIntensity={0.2} transparent opacity={0.9} />
                    </mesh>
                    <group position={[-0.06, 0.15, 0.005]}>
                        <group position={[0, 0, 0]}>
                            <LaptopScreen code={snippet.code} lang={snippet.lang} isInteracting={isInteracting} isFixing={isFixing} />
                        </group>
                    </group>
                </group>
            </group>

            {isInteracting && interactionPosRef.current && groupRef.current && (
                <ScanBeam
                    sourcePos={new THREE.Vector3(0.3, 0, 0).applyMatrix4(groupRef.current.matrixWorld)}
                    targetPos={interactionPosRef.current}
                />
            )}
        </group>
    );
};

export default function RobotMascot() {
    const targetPosRef = useRef<THREE.Vector3>(new THREE.Vector3(2, 2, 0));
    const interactionPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
    const [isInteracting, setIsInteracting] = useState(false);
    const [isFixing, setIsFixing] = useState(false);
    const [sectionKey, setSectionKey] = useState("default");

    useEffect(() => {
        let lastSection = "default";

        const handleUpdate = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const x = (window as any)._lastMouseX || width / 2;
            const y = (window as any)._lastMouseY || height / 2;

            const element = document.elementFromPoint(x, y);

            // Interaction detection
            const interactive = element?.closest("button, a, svg, img, .card, [class*='card'], [class*='group/item'], [class*='icon']");
            if (interactive) {
                const irect = interactive.getBoundingClientRect();
                const centerX = irect.left + irect.width / 2;
                const centerY = irect.top + irect.height / 2;

                const aspect = width / height;
                const vHeight = 4.66;
                const vWidth = vHeight * aspect;

                const ndcX = (centerX / width) * 2 - 1;
                const ndcY = -(centerY / height) * 2 + 1;

                interactionPosRef.current.set((ndcX * vWidth) / 2, (ndcY * vHeight) / 2, 0);
                setIsInteracting(true);
                setIsFixing(false); // Cancel fixing if new interaction starts
            } else {
                if (isInteracting) {
                    // Just stopped interacting, trigger fixing
                    setIsInteracting(false);
                    setIsFixing(true);
                    setTimeout(() => setIsFixing(false), 2000); // Fixing duration
                }
            }

            // Fixed container handling
            const section = element?.closest("section, footer, main > div, header, [id*='hero'], [class*='hero']") || document.querySelector("section");

            if (section) {
                const rect = section.getBoundingClientRect();
                const isSmall = width < 768;

                // NDC calculation with safety margins
                const ndcX = (rect.right / width) * 2 - 1;
                const ndcY = -(rect.top / height) * 2 + 1;

                const aspect = width / height;
                const vHeight = 4.66; // Fixed based on distance 5 and fov 50
                const vWidth = vHeight * aspect;

                // Targeting logic: Stay to the right, but keep fully in view
                // Offset calculation based on scale
                const robotScale = isSmall ? 0.18 : width < 1280 ? 0.28 : 0.38;
                const robotWidth = 1.0 * robotScale; // Account for arms/laptop
                const robotHeight = 2.0 * robotScale;

                const targetX = (ndcX * vWidth) / 2 - (isSmall ? robotWidth + 0.1 : robotWidth + 0.6);
                const targetY = (ndcY * vHeight) / 2 - (isSmall ? robotHeight + 0.2 : robotHeight + 0.8);

                // Strict clamping to viewport
                const margin = 0.2;
                const clampedX = Math.max(-vWidth / 2 + robotWidth + margin, Math.min(vWidth / 2 - robotWidth - margin, targetX));
                const clampedY = Math.max(-vHeight / 2 + robotHeight + margin, Math.min(vHeight / 2 - robotHeight - margin, targetY));

                targetPosRef.current.set(clampedX, clampedY, 0);

                let newKey = "default";
                const id = section.id?.toLowerCase() || "";
                const className = section.className?.toLowerCase() || "";

                if (id.includes("hero") || className.includes("hero")) newKey = "hero";
                else if (id.includes("service") || className.includes("service")) newKey = "services";
                else if (id.includes("course") || className.includes("course") || id.includes("popular")) newKey = "courses";
                else if (id.includes("project") || className.includes("project") || id.includes("featured")) newKey = "projects";
                else if (id.includes("testimonial") || className.includes("testimonial")) newKey = "testimonials";
                else if (section.tagName === "FOOTER") newKey = "footer";

                if (newKey !== lastSection) {
                    lastSection = newKey;
                    setSectionKey(newKey);
                }
            }
        };

        const trackMouse = (e: MouseEvent) => {
            (window as any)._lastMouseX = e.clientX;
            (window as any)._lastMouseY = e.clientY;
            handleUpdate();
        };

        window.addEventListener("scroll", handleUpdate);
        window.addEventListener("mousemove", trackMouse);
        handleUpdate();

        return () => {
            window.removeEventListener("scroll", handleUpdate);
            window.removeEventListener("mousemove", trackMouse);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ pointerEvents: 'none' }}>
            <Canvas shadows dpr={[1, 2]} style={{ pointerEvents: 'none', background: 'transparent' }}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
                <spotLight position={[-10, 10, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />
                <Environment preset="city" />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <RobotModel
                        targetPosRef={targetPosRef}
                        interactionPosRef={interactionPosRef}
                        isInteracting={isInteracting}
                        isFixing={isFixing}
                        sectionKey={sectionKey}
                    />
                </Float>

                <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={10} blur={2.5} far={4.5} />
            </Canvas>
        </div>
    );
}
