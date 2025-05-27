
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';

const SlimeEffect = ({ position, isActive }: { position: THREE.Vector3; isActive: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(0);

  useFrame((state) => {
    if (meshRef.current && isActive) {
      const targetScale = Math.sin(state.clock.getElapsedTime() * 8) * 0.3 + 1;
      setScale(THREE.MathUtils.lerp(scale, targetScale, 0.1));
      meshRef.current.scale.setScalar(scale);
      
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
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial
        color="#00ff88"
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
};

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const continentsRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const { isDarkMode } = useTheme();

  // Create realistic Earth texture using procedural generation
  const createEarthTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Create base ocean color
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1e40af'); // Deep blue at poles
    gradient.addColorStop(0.5, '#2563eb'); // Ocean blue at equator
    gradient.addColorStop(1, '#1e40af'); // Deep blue at poles
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add continents (simplified shapes representing major landmasses)
    ctx.fillStyle = '#059669'; // Green for land

    // Africa and Europe
    ctx.beginPath();
    ctx.ellipse(280, 120, 40, 60, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Asia
    ctx.beginPath();
    ctx.ellipse(350, 100, 80, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // North America
    ctx.beginPath();
    ctx.ellipse(150, 80, 50, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // South America
    ctx.beginPath();
    ctx.ellipse(180, 150, 25, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(420, 180, 30, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    // Add mountain ranges (darker green)
    ctx.fillStyle = '#065f46';
    
    // Himalayas
    ctx.beginPath();
    ctx.ellipse(360, 90, 40, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Andes
    ctx.beginPath();
    ctx.ellipse(175, 150, 8, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Rocky Mountains
    ctx.beginPath();
    ctx.ellipse(140, 75, 8, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Add deserts (sandy color)
    ctx.fillStyle = '#d97706';
    
    // Sahara
    ctx.beginPath();
    ctx.ellipse(280, 100, 35, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Arabian Desert
    ctx.beginPath();
    ctx.ellipse(320, 105, 20, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Add ice caps
    ctx.fillStyle = '#f8fafc';
    
    // North Pole
    ctx.beginPath();
    ctx.ellipse(256, 20, 80, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // South Pole
    ctx.beginPath();
    ctx.ellipse(256, 235, 70, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  };

  const earthTexture = createEarthTexture();

  useFrame((state) => {
    if (meshRef.current) {
      if (!isDragging) {
        meshRef.current.rotation.y += 0.003;
        if (continentsRef.current) {
          continentsRef.current.rotation.y += 0.003;
        }
        if (cloudsRef.current) {
          cloudsRef.current.rotation.y += 0.001;
        }
      }
      
      // Subtle pulsing effect
      const pulseFactor = 1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.02;
      meshRef.current.scale.setScalar(pulseFactor);
      if (continentsRef.current) {
        continentsRef.current.scale.setScalar(pulseFactor);
      }
      if (cloudsRef.current) {
        cloudsRef.current.scale.setScalar(pulseFactor * 1.01);
      }
      if (atmosphereRef.current) {
        atmosphereRef.current.scale.setScalar(pulseFactor * 1.05);
      }
    }
  });

  const handlePointerDown = (event: any) => {
    setIsDragging(true);
    setLastMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handlePointerMove = (event: any) => {
    if (isDragging && meshRef.current) {
      const deltaX = event.clientX - lastMousePosition.x;
      const deltaY = event.clientY - lastMousePosition.y;
      
      const rotationSpeed = 0.01;
      meshRef.current.rotation.y += deltaX * rotationSpeed;
      meshRef.current.rotation.x += deltaY * rotationSpeed;
      
      if (continentsRef.current) {
        continentsRef.current.rotation.y += deltaX * rotationSpeed;
        continentsRef.current.rotation.x += deltaY * rotationSpeed;
      }
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += deltaX * rotationSpeed * 0.8;
        cloudsRef.current.rotation.x += deltaY * rotationSpeed * 0.8;
      }
      
      setLastMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
      canvas.addEventListener('mousemove', handlePointerMove);
      canvas.addEventListener('mouseup', handlePointerUp);
      canvas.addEventListener('mouseleave', handlePointerUp);
      
      return () => {
        canvas.removeEventListener('mousemove', handlePointerMove);
        canvas.removeEventListener('mouseup', handlePointerUp);
        canvas.removeEventListener('mouseleave', handlePointerUp);
      };
    }
  }, [isDragging, lastMousePosition]);

  return (
    <group>
      {/* Main Earth sphere with detailed texture */}
      <mesh 
        ref={meshRef} 
        position={[0, 0, 0]}
        onPointerDown={handlePointerDown}
      >
        <sphereGeometry args={[2, 128, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.1}
          bumpMap={earthTexture}
          bumpScale={0.1}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.05, 64, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={isDarkMode ? 0.15 : 0.25}
          roughness={1}
          metalness={0}
          alphaMap={earthTexture}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.15, 32, 32]} />
        <meshStandardMaterial
          color={isDarkMode ? "#1e40af" : "#60a5fa"}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
          roughness={0}
          metalness={0.3}
        />
      </mesh>

      {/* Outer atmosphere glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.25, 16, 16]} />
        <meshStandardMaterial
          color={isDarkMode ? "#3730a3" : "#93c5fd"}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          roughness={0}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
};

const Moon = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const createMoonTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Base moon color (gray)
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add craters
    ctx.fillStyle = '#cbd5e1';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 15 + 5;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add darker craters
    ctx.fillStyle = '#94a3b8';
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 8 + 3;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  };

  const moonTexture = createMoonTexture();

  useFrame((state) => {
    if (meshRef.current) {
      // Moon rotation
      meshRef.current.rotation.y += 0.002;
      
      // Moon orbit around Earth
      const angle = state.clock.getElapsedTime() * 0.5;
      meshRef.current.position.x = Math.cos(angle) * 6;
      meshRef.current.position.z = Math.sin(angle) * 6;
      meshRef.current.position.y = Math.sin(angle * 0.5) * 2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        map={moonTexture}
        roughness={0.9}
        metalness={0.1}
        bumpMap={moonTexture}
        bumpScale={0.05}
      />
    </mesh>
  );
};

const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const flareRef = useRef<THREE.Mesh>(null);

  const createSunTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Create radial gradient for sun surface
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(centerX, centerY));
    
    gradient.addColorStop(0, '#fff3cd'); // Bright center
    gradient.addColorStop(0.3, '#fbbf24'); // Golden yellow
    gradient.addColorStop(0.6, '#f59e0b'); // Orange
    gradient.addColorStop(1, '#dc2626'); // Red edges

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add solar flares and spots
    ctx.fillStyle = '#dc2626';
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 8 + 2;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add bright spots
    ctx.fillStyle = '#fef3c7';
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 6 + 1;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  };

  const sunTexture = createSunTexture();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      
      // Pulsing effect
      const glowIntensity = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.1;
      meshRef.current.scale.setScalar(glowIntensity);
      
      if (coronaRef.current) {
        coronaRef.current.scale.setScalar(glowIntensity * 1.2);
        coronaRef.current.rotation.y -= 0.005;
      }
      
      if (flareRef.current) {
        flareRef.current.scale.setScalar(glowIntensity * 1.5);
        flareRef.current.rotation.z += 0.02;
      }
    }
  });

  return (
    <group position={[8, 4, -5]}>
      {/* Main sun body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 32]} />
        <meshStandardMaterial
          map={sunTexture}
          emissive="#f59e0b"
          emissiveIntensity={0.8}
          emissiveMap={sunTexture}
        />
      </mesh>
      
      {/* Corona effect */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[1.3, 32, 16]} />
        <meshStandardMaterial
          color="#fbbf24"
          transparent
          opacity={0.3}
          emissive="#f59e0b"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Solar flares */}
      <mesh ref={flareRef}>
        <sphereGeometry args={[1.6, 16, 8]} />
        <meshStandardMaterial
          color="#fef3c7"
          transparent
          opacity={0.1}
          emissive="#fbbf24"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Point light for sun illumination */}
      <pointLight
        intensity={2}
        color="#fbbf24"
        distance={20}
        decay={2}
      />
    </group>
  );
};

const Stars = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { isDarkMode } = useTheme();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0002;
    }
  });

  const starPositions = React.useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  if (!isDarkMode) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="white" />
    </points>
  );
};

const PlanetBackground = () => {
  const { isDarkMode } = useTheme();
  const [slimeEffects, setSlimeEffects] = useState<Array<{ id: number; position: THREE.Vector3; isActive: boolean }>>([]);
  const { camera, gl } = useThree();

  const handleCanvasClick = (event: any) => {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersectionPoint = new THREE.Vector3();
    raycaster.ray.at(5, intersectionPoint);

    const newEffect = {
      id: Date.now(),
      position: intersectionPoint,
      isActive: true
    };

    setSlimeEffects(prev => [...prev, newEffect]);

    setTimeout(() => {
      setSlimeEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 2000);
  };

  useEffect(() => {
    gl.domElement.addEventListener('click', handleCanvasClick);
    return () => {
      gl.domElement.removeEventListener('click', handleCanvasClick);
    };
  }, [gl, camera]);

  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.2 : 0.4} />
      <directionalLight 
        position={isDarkMode ? [5, 5, 5] : [10, 10, 5]} 
        intensity={isDarkMode ? 0.6 : 1} 
        color={isDarkMode ? "#e2e8f0" : "#fbbf24"} 
      />
      
      {isDarkMode ? (
        <>
          <Stars />
          <Moon />
        </>
      ) : (
        <Sun />
      )}
      
      <Earth />
      
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

export default PlanetBackground;
