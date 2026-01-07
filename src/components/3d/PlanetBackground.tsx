
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';

// Helper to convert Lat/Long to 3D Vector
const calcPosFromLatLonRad = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  return [x, y, z] as [number, number, number];
};

const Hotspot = ({ lat, lon, label, region }: { lat: number, lon: number, label: string, region: string }) => {
  const position = calcPosFromLatLonRad(lat, lon, 2.02); // Slightly above surface
  const [hovered, setHovered] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color={isDarkMode ? "#00FFFF" : "#0055FF"} transparent opacity={0.8} />
      </mesh>
      {/* Pulse Effect */}
      <mesh scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color={isDarkMode ? "#00FFFF" : "#0055FF"} transparent opacity={0.3} />
      </mesh>

      <Html distanceFactor={10} zIndexRange={[100, 0]}>
        <div className={`transition-all duration-300 pointer-events-none transform ${hovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} 
          ${isDarkMode ? 'text-white bg-black/80' : 'text-blue-900 bg-white/90'}
          px-3 py-1 rounded-lg backdrop-blur-md border border-blue-500/30 shadow-lg text-sm font-bold whitespace-nowrap`}
          style={{ transform: `translate3d(-50%, -150%, 0)` }}
        >
          <span className="text-xs font-light block opacity-70">{region}</span>
          {label}
        </div>
      </Html>
    </group>
  );
}

// --- Improved Noise Implementation for Realism ---
// Simple permutation table for Perlin-like noise
const perm = new Uint8Array([151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]);

function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(t: number, a: number, b: number) { return a + t * (b - a); }
function grad(hash: number, x: number, y: number, z: number) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

// 3D Noise function
function noise(x: number, y: number, z: number) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);
  const u = fade(x);
  const v = fade(y);
  const w = fade(z);
  const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z;
  const B = perm[X + 1] + Y, BA = perm[B] + Z, BB = perm[B + 1] + Z;
  return lerp(w, lerp(v, lerp(u, grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z)), lerp(u, grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z))), lerp(v, lerp(u, grad(perm[AA + 1], x, y, z - 1), grad(perm[BA + 1], x - 1, y, z - 1)), lerp(u, grad(perm[AB + 1], x, y - 1, z - 1), grad(perm[BB + 1], x - 1, y - 1, z - 1))));
}

// Fractal Brownian Motion for complex details
function fbm(x: number, y: number, z: number, octaves: number) {
  let total = 0;
  let frequency = 1;
  let amplitude = 1;
  let maxValue = 0;
  for (let i = 0; i < octaves; i++) {
    total += noise(x * frequency, y * frequency, z * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return total / maxValue;
}


const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const hotspotsRef = useRef<THREE.Group>(null);
  const { isDarkMode } = useTheme();

  const [scrollY, setScrollY] = useState(0);
  const [textures, setTextures] = useState<{
    diffuse: THREE.CanvasTexture,
    specular: THREE.CanvasTexture,
    bump: THREE.CanvasTexture,
    clouds: THREE.CanvasTexture
  } | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // ASYNC TEXTURE GENERATION
    const width = 256;
    const height = 128;
    const diffCanvas = document.createElement('canvas'); diffCanvas.width = width; diffCanvas.height = height;
    const specCanvas = document.createElement('canvas'); specCanvas.width = width; specCanvas.height = height;
    const bumpCanvas = document.createElement('canvas'); bumpCanvas.width = width; bumpCanvas.height = height;
    const cloudCanvas = document.createElement('canvas'); cloudCanvas.width = width; cloudCanvas.height = height;

    const diffCtx = diffCanvas.getContext('2d')!;
    const specCtx = specCanvas.getContext('2d')!;
    const bumpCtx = bumpCanvas.getContext('2d')!;
    const cloudCtx = cloudCanvas.getContext('2d')!;

    const diffImg = diffCtx.createImageData(width, height);
    const specImg = specCtx.createImageData(width, height);
    const bumpImg = bumpCtx.createImageData(width, height);
    const cloudImg = cloudCtx.createImageData(width, height);

    let currentY = 0;
    const CHUNK_Y = 16;

    const processNextChunk = () => {
      const targetY = Math.min(currentY + CHUNK_Y, height);
      for (let y = currentY; y < targetY; y++) {
        for (let x = 0; x < width; x++) {
          const u = x / width;
          const v = y / height;
          const theta = u * Math.PI * 2;
          const phi = v * Math.PI;
          const nx = Math.sin(phi) * Math.cos(theta);
          const ny = Math.cos(phi);
          const nz = Math.sin(phi) * Math.sin(theta);

          const n = fbm(nx + 10, ny + 10, nz + 10, 3);
          const index = (x + y * width) * 4;

          let r, g, b, spec, bump;
          if (n < 0.05) { r = 10; g = 40; b = 100; spec = 150; bump = 0; }
          else if (n < 0.1) { r = 20; g = 100; b = 150; spec = 100; bump = 10; }
          else if (n < 0.4) { r = 50; g = 120; b = 50; spec = 10; bump = 100; }
          else if (n < 0.7) { r = 120; g = 110; b = 90; spec = 5; bump = 200; }
          else { r = 240; g = 240; b = 250; spec = 30; bump = 255; }

          diffImg.data[index] = r;
          diffImg.data[index + 1] = g;
          diffImg.data[index + 2] = b;
          diffImg.data[index + 3] = 255;
          specImg.data[index] = specImg.data[index + 1] = specImg.data[index + 2] = spec;
          specImg.data[index + 3] = 255;
          bumpImg.data[index] = bumpImg.data[index + 1] = bumpImg.data[index + 2] = bump;
          bumpImg.data[index + 3] = 255;

          const c = fbm(nx + 50, ny + 50, nz + 50, 2);
          const cloudThreshold = 0.3;
          const cloudVal = c > cloudThreshold ? (c - cloudThreshold) * 3 * 255 : 0;
          cloudImg.data[index] = 255;
          cloudImg.data[index + 1] = 255;
          cloudImg.data[index + 2] = 255;
          cloudImg.data[index + 3] = Math.min(255, cloudVal);
        }
      }
      currentY = targetY;
      if (currentY < height) {
        setTimeout(processNextChunk, 0);
      } else {
        diffCtx.putImageData(diffImg, 0, 0);
        specCtx.putImageData(specImg, 0, 0);
        bumpCtx.putImageData(bumpImg, 0, 0);
        cloudCtx.putImageData(cloudImg, 0, 0);
        setTextures({
          diffuse: new THREE.CanvasTexture(diffCanvas),
          specular: new THREE.CanvasTexture(specCanvas),
          bump: new THREE.CanvasTexture(bumpCanvas),
          clouds: new THREE.CanvasTexture(cloudCanvas)
        });
      }
    };
    processNextChunk();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollRotation = scrollY * 0.0005;
    if (earthRef.current) earthRef.current.rotation.y = time * 0.05 + scrollRotation;
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.065 + scrollRotation;
      cloudsRef.current.rotation.x = Math.sin(time * 0.05) * 0.02;
    }
    if (hotspotsRef.current) hotspotsRef.current.rotation.y = time * 0.05 + scrollRotation;
  });

  if (!textures) return null;

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={earthRef} receiveShadow castShadow>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial
          map={textures.diffuse}
          normalMap={textures.bump}
          normalScale={new THREE.Vector2(0.5, 0.5)}
          roughnessMap={textures.specular}
          roughness={0.6}
          metalness={0.1}
          envMapIntensity={0.5}
          emissive={isDarkMode ? "#000020" : "#000000"}
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh ref={cloudsRef} scale={[1.025, 1.025, 1.025]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          map={textures.clouds}
          transparent={true}
          opacity={0.9}
          blending={THREE.NormalBlending}
          side={THREE.DoubleSide}
          alphaMap={textures.clouds}
          depthWrite={false}
        />
      </mesh>

      {/* 3. ATMOSPHERE GLOW (Fresnel) */}
      <mesh ref={atmosphereRef} scale={[1.25, 1.25, 1.25]}>
        <sphereGeometry args={[2, 24, 24]} />
        <meshBasicMaterial
          color={new THREE.Color(0.2, 0.6, 1.0)}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide} /* Backside makes it look like a halo */
        />
      </mesh>

      {/* 4. HOTSPOTS */}
      <group ref={hotspotsRef}>
        {/* Egypt (Cairo approx) */}
        <Hotspot lat={30.0} lon={31.2} label="Cairo" region="Egypt" />
        {/* KSA (Riyadh approx) */}
        <Hotspot lat={24.7} lon={46.6} label="Riyadh" region="Saudi Arabia" />
        {/* UAE (Dubai approx) */}
        <Hotspot lat={25.2} lon={55.3} label="Dubai" region="UAE" />
      </group>
    </group>
  );
};

// Simple Moon reusing bump map logic simplified
const Moon = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => {
    const cvs = document.createElement('canvas'); cvs.width = 256; cvs.height = 128;
    const ctx = cvs.getContext('2d')!;
    ctx.fillStyle = '#aaaaaa'; ctx.fillRect(0, 0, 256, 128);
    // random craters
    ctx.fillStyle = '#888888';
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 256, Math.random() * 128, Math.random() * 10 + 2, 0, Math.PI * 2);
      ctx.fill();
    }
    return new THREE.CanvasTexture(cvs);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() * 0.2;
      meshRef.current.position.x = Math.cos(t) * 9; // Further orbit
      meshRef.current.position.z = Math.sin(t) * 9 - 4;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[9, 0, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial map={texture} roughness={0.9} />
    </mesh>
  );
};


const PlanetBackground = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      {/* Base uniform light so nothing is ever pitch black */}
      <ambientLight intensity={isDarkMode ? 1.5 : 1.2} />

      {/* Sky/Ground light for better 3D definition */}
      <hemisphereLight
        color={isDarkMode ? "#001133" : "#ffffff"}
        groundColor={isDarkMode ? "#000000" : "#ffffff"}
        intensity={1}
      />

      <directionalLight
        position={[10, 5, 10]}
        intensity={isDarkMode ? 2.5 : 1.5}
        color="#ffffff"
        castShadow
      />
      {/* Blue rim light for dramatic effect */}
      <spotLight position={[-10, 0, -5]} intensity={5} color="#0044ff" distance={20} />

      <Earth />
      {isDarkMode && <Moon />}

      {/* Stars */}
      {isDarkMode &&
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={1500}
              array={new Float32Array(4500).map(() => (Math.random() - 0.5) * 100)}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.15} color="white" transparent opacity={0.8} />
        </points>
      }
    </>
  );
};

export default PlanetBackground;
