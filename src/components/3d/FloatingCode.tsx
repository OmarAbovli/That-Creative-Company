
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CodeBlock = ({ position, text }: { position: [number, number, number], text: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.3 + position[0]) * 0.5;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 1, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

const BinaryRain = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y -= 0.01;
        if (child.position.y < -10) {
          child.position.y = 10;
          child.position.x = (Math.random() - 0.5) * 20;
        }
      });
    }
  });

  const binaryNumbers = Array.from({ length: 50 }, (_, i) => (
    <mesh key={i} position={[(Math.random() - 0.5) * 20, Math.random() * 20 - 10, -5]}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="#00ff00" />
    </mesh>
  ));

  return <group ref={groupRef}>{binaryNumbers}</group>;
};

export const FloatingCodeBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
        
        <CodeBlock position={[-5, 2, 0]} text="function code()" />
        <CodeBlock position={[5, -2, 0]} text="const data = []" />
        <CodeBlock position={[0, 4, -2]} text="return result;" />
        <CodeBlock position={[-3, -4, -1]} text="if (true) {" />
        
        <BinaryRain />
      </Canvas>
    </div>
  );
};
