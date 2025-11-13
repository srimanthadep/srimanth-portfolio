import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingGeometry({ position, geometry, color }: { position: [number, number, number], geometry: string, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometryMap = {
    box: <boxGeometry args={[1, 1, 1]} />,
    sphere: <sphereGeometry args={[0.8, 32, 32]} />,
    torus: <torusGeometry args={[0.6, 0.3, 16, 100]} />,
    cone: <coneGeometry args={[0.6, 1.2, 8]} />,
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {geometryMap[geometry as keyof typeof geometryMap]}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

export function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <FloatingGeometry position={[-4, 3, -2]} geometry="box" color="#3b82f6" />
        <FloatingGeometry position={[4, -2, -1]} geometry="sphere" color="#8b5cf6" />
        <FloatingGeometry position={[-3, -3, -3]} geometry="torus" color="#06b6d4" />
        <FloatingGeometry position={[3, 4, -2]} geometry="cone" color="#10b981" />
        <FloatingGeometry position={[0, -4, -4]} geometry="box" color="#f59e0b" />
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}