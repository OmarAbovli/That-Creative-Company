import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const RefractiveCore = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.cos(t / 4) / 4;
            meshRef.current.rotation.y = Math.sin(t / 4) / 4;
            meshRef.current.position.y = Math.sin(t / 1.5) / 10;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = t / 2;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Main Refractive Core */}
                <mesh ref={meshRef}>
                    <icosahedronGeometry args={[2, 15]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        thickness={1}
                        chromaticAberration={0.06}
                        anisotropy={0.3}
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.1}
                        clearcoat={1}
                        attenuationDistance={0.5}
                        attenuationColor="#ffffff"
                        color="#c9e5ff"
                    />
                </mesh>

                {/* Ambient Glow Sphere */}
                <mesh scale={2.1}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial
                        color="#0066ff"
                        transparent
                        opacity={0.1}
                        emissive="#0066ff"
                        emissiveIntensity={2}
                        side={THREE.BackSide}
                    />
                </mesh>

                {/* Central Brand Motif: Lightning Bolt */}
                <group position={[0, 0, 0]} scale={0.5}>
                    {/* Lightning Shape using a basic line/mesh combination */}
                    <mesh position={[0, 0, 0]}>
                        <octahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial
                            color="#01ECFF"
                            emissive="#01ECFF"
                            emissiveIntensity={10}
                            transparent
                            opacity={0.8}
                        />
                    </mesh>
                    <pointLight intensity={2} color="#0082FF" distance={5} />
                </group>

                {/* Orbital Rings */}
                <group ref={ringRef}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[3.5, 0.02, 16, 100]} />
                        <meshStandardMaterial color="#0082FF" emissive="#0082FF" emissiveIntensity={5} transparent opacity={0.5} />
                    </mesh>
                    <mesh rotation={[Math.PI / 2, 1, 0]}>
                        <torusGeometry args={[3.8, 0.01, 16, 100]} />
                        <meshStandardMaterial color="#01ECFF" emissive="#01ECFF" emissiveIntensity={3} transparent opacity={0.3} />
                    </mesh>
                </group>
            </Float>

            {/* Background Particles Flare */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={500}
                        array={new Float32Array(500 * 3).map(() => (Math.random() - 0.5) * 20)}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.05} color="#00ffff" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
            </points>
        </group>
    );
};

export default RefractiveCore;
