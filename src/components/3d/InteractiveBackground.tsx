
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';

const SlimeEffect = ({ position, isActive }: { position: THREE.Vector3; isActive: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(0);

  useFrame((state) => {
    if (meshRef.current && isActive) {
      const targetScale = Math.sin(state.clock.getElapsedTime() * 8) * 0.5 + 1.5;
      setScale(THREE.MathUtils.lerp(scale, targetScale, 0.1));
      meshRef.current.scale.setScalar(scale);
      
      // اختفاء تدريجي
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.opacity = Math.max(0, meshRef.current.material.opacity - 0.02);
      }
    }
  });

  useEffect(() => {
    if (isActive) {
      setScale(0.1);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
};

const FloatingCodeElement = ({ position, char }: { position: [number, number, number]; char: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isDarkMode } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.3, 0.3, 0.1]} />
      <meshStandardMaterial
        color={isDarkMode ? "#8b5cf6" : "#f97316"}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

const InteractiveBackground = () => {
  const { isDarkMode } = useTheme();
  const [slimeEffects, setSlimeEffects] = useState<Array<{ id: number; position: THREE.Vector3; isActive: boolean }>>([]);
  const { camera, gl } = useThree();

  const codeElements = [
    '<div>', '</div>', '{', '}', 'const', 'let', 'function', '=>', 'useState', 'useEffect',
    'import', 'export', 'return', 'if', 'else', 'for', 'while', 'map', 'filter', 'reduce'
  ];

  const handleCanvasClick = (event: any) => {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    // تحويل موقع الماوس إلى إحداثيات ثلاثية الأبعاد
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // إنشاء نقطة التأثير
    const intersectionPoint = new THREE.Vector3();
    raycaster.ray.at(5, intersectionPoint);

    const newEffect = {
      id: Date.now(),
      position: intersectionPoint,
      isActive: true
    };

    setSlimeEffects(prev => [...prev, newEffect]);

    // إزالة التأثير بعد 3 ثوان
    setTimeout(() => {
      setSlimeEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 3000);
  };

  useEffect(() => {
    gl.domElement.addEventListener('click', handleCanvasClick);
    return () => {
      gl.domElement.removeEventListener('click', handleCanvasClick);
    };
  }, [gl, camera]);

  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.3 : 0.6} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={isDarkMode ? 0.8 : 1.2} 
        color={isDarkMode ? "#8b5cf6" : "#f97316"} 
      />
      <pointLight 
        position={[-10, -10, -5]} 
        intensity={0.5} 
        color={isDarkMode ? "#ec4899" : "#ef4444"} 
      />

      {/* عناصر الكود العائمة */}
      {codeElements.map((char, index) => (
        <FloatingCodeElement
          key={index}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
          char={char}
        />
      ))}

      {/* تأثيرات السلايم */}
      {slimeEffects.map((effect) => (
        <SlimeEffect
          key={effect.id}
          position={effect.position}
          isActive={effect.isActive}
        />
      ))}
    </>
  );
};

export default InteractiveBackground;
