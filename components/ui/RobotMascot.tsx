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

const LaptopScreen = ({ code, lang }: { code: string; lang: string }) => {
    const textRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (textRef.current) {
            // Very slight vertical scroll
            textRef.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    return (
        <group position={[0, -0.05, 0.02]} rotation={[0, 0, 0]}>
            <Text
                ref={textRef as any}
                fontSize={0.035}
                color="#00ffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={0.5}
                lineHeight={1.2}
                textAlign="left"
            >
                {`${lang.toUpperCase()}\n\n${code}`}
            </Text>
        </group>
    );
};

const RobotModel = ({ targetPosRef, sectionKey }: { targetPosRef: React.RefObject<THREE.Vector3 | null>; sectionKey: string }) => {
    const groupRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const laptopRef = useRef<THREE.Group>(null);
    const leftArmRef = useRef<THREE.Group>(null);
    const rightArmRef = useRef<THREE.Group>(null);

    const snippet = useMemo(() => CODE_SNIPPETS[sectionKey] || CODE_SNIPPETS.default, [sectionKey]);

    useFrame((state) => {
        if (!groupRef.current || !headRef.current || !targetPosRef.current) return;

        // Smooth movement to target position
        groupRef.current.position.lerp(targetPosRef.current, 0.08);

        // Subtle floating
        groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5) * 0.002;

        // Look at laptop
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0.5, 0.1);

        // Typing animation
        if (leftArmRef.current && rightArmRef.current) {
            leftArmRef.current.rotation.x = -Math.PI / 3 + Math.sin(state.clock.elapsedTime * 25) * 0.1;
            rightArmRef.current.rotation.x = -Math.PI / 3 + Math.cos(state.clock.elapsedTime * 25 + 0.5) * 0.1;
        }
    });

    return (
        <group ref={groupRef} scale={0.6}>
            {/* Body: High-tech core */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.7, 0.9, 0.5]} />
                <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Power Core */}
            <mesh position={[0, 0.1, 0.26]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
            </mesh>

            {/* Head: Enhanced design */}
            <group ref={headRef} position={[0, 0.7, 0]}>
                <mesh>
                    <boxGeometry args={[0.6, 0.5, 0.5]} />
                    <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Antennas */}
                <mesh position={[-0.2, 0.3, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.3]} />
                    <meshStandardMaterial color="#94a3b8" />
                </mesh>
                <mesh position={[-0.2, 0.45, 0]}>
                    <sphereGeometry args={[0.04]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" />
                </mesh>
                <mesh position={[0.2, 0.3, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.3]} />
                    <meshStandardMaterial color="#94a3b8" />
                </mesh>
                <mesh position={[0.2, 0.45, 0]}>
                    <sphereGeometry args={[0.04]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" />
                </mesh>
                {/* Visor Area */}
                <mesh position={[0, 0.05, 0.26]}>
                    <planeGeometry args={[0.5, 0.2]} />
                    <meshStandardMaterial color="#0f172a" metalness={1} roughness={0} />
                </mesh>
                {/* Eyes: Glowing dots */}
                <mesh position={[-0.15, 0.05, 0.27]}>
                    <sphereGeometry args={[0.05]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={5} />
                </mesh>
                <mesh position={[0.15, 0.05, 0.27]}>
                    <sphereGeometry args={[0.05]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={5} />
                </mesh>
            </group>

            {/* Arms: Segmented */}
            <group ref={leftArmRef} position={[-0.45, 0.2, 0]}>
                {/* Shoulder */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.12]} />
                    <meshStandardMaterial color="#475569" />
                </mesh>
                {/* Upper Arm */}
                <mesh position={[-0.1, -0.2, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.4]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                {/* Hands */}
                <mesh position={[-0.1, -0.45, 0]}>
                    <boxGeometry args={[0.15, 0.15, 0.15]} />
                    <meshStandardMaterial color="#00ffff" metalness={0.9} />
                </mesh>
            </group>

            <group ref={rightArmRef} position={[0.45, 0.2, 0]}>
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.12]} />
                    <meshStandardMaterial color="#475569" />
                </mesh>
                <mesh position={[0.1, -0.2, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.4]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                <mesh position={[0.1, -0.45, 0]}>
                    <boxGeometry args={[0.15, 0.15, 0.15]} />
                    <meshStandardMaterial color="#00ffff" metalness={0.9} />
                </mesh>
            </group>

            {/* Legs: Industrial look */}
            <group position={[-0.2, -0.6, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.12, 0.1, 0.6]} />
                    <meshStandardMaterial color="#334155" />
                </mesh>
                <mesh position={[0, -0.35, 0.05]}>
                    <boxGeometry args={[0.2, 0.1, 0.3]} />
                    <meshStandardMaterial color="#0f172a" />
                </mesh>
            </group>
            <group position={[0.2, -0.6, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.12, 0.1, 0.6]} />
                    <meshStandardMaterial color="#334155" />
                </mesh>
                <mesh position={[0, -0.35, 0.05]}>
                    <boxGeometry args={[0.2, 0.1, 0.3]} />
                    <meshStandardMaterial color="#0f172a" />
                </mesh>
            </group>

            {/* Laptop: Modern slim design */}
            <group ref={laptopRef} position={[0, -0.1, 0.6]} rotation={[-0.1, 0, 0]}>
                {/* Base */}
                <mesh position={[0, -0.05, 0]}>
                    <boxGeometry args={[0.7, 0.04, 0.5]} />
                    <meshStandardMaterial color="#0f172a" metalness={1} roughness={0.2} />
                </mesh>
                {/* Screen Hinge Area */}
                <group position={[0, 0, -0.25]} rotation={[Math.PI / 2.5, 0, 0]}>
                    <mesh position={[0, 0.25, 0]}>
                        <boxGeometry args={[0.7, 0.5, 0.03]} />
                        <meshStandardMaterial color="#1e293b" metalness={0.8} />
                    </mesh>
                    {/* Screen Display */}
                    <mesh position={[0, 0.25, 0.021]}>
                        <planeGeometry args={[0.65, 0.45]} />
                        <meshStandardMaterial color="#000000" emissive="#003333" emissiveIntensity={0.5} />
                    </mesh>
                    {/* The Actual Code Text */}
                    <group position={[0, 0.25, 0.022]}>
                        <LaptopScreen code={snippet.code} lang={snippet.lang} />
                    </group>
                </group>
            </group>
        </group>
    );
};

export default function RobotMascot() {
    const targetPosRef = useRef<THREE.Vector3>(new THREE.Vector3(2, 2, 0));
    const [sectionKey, setSectionKey] = useState("default");

    useEffect(() => {
        let lastSection = "default";

        const handleUpdate = () => {
            const x = (window as any)._lastMouseX || window.innerWidth / 2;
            const y = (window as any)._lastMouseY || window.innerHeight / 2;

            const element = document.elementFromPoint(x, y);
            if (!element) return;

            const section = element.closest("section, footer, main > div, header, [id*='hero'], [class*='hero']");
            if (section) {
                const rect = section.getBoundingClientRect();

                const ndcX = (rect.right / window.innerWidth) * 2 - 1;
                const ndcY = -(rect.top / window.innerHeight) * 2 + 1;

                const aspect = window.innerWidth / window.innerHeight;
                const vHeight = 2 * Math.tan((50 * Math.PI) / 360) * 5;
                const vWidth = vHeight * aspect;

                const margin = 0.6; // Reduced margin for smaller robot
                targetPosRef.current.set(
                    (ndcX * vWidth) / 2 - margin,
                    (ndcY * vHeight) / 2 - margin,
                    0
                );

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
                    <RobotModel targetPosRef={targetPosRef} sectionKey={sectionKey} />
                </Float>

                <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={10} blur={2.5} far={4.5} />
            </Canvas>
        </div>
    );
}
