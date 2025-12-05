// src/components/3d/Ambulance3D.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

interface Ambulance3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  status?: string;
}

export default function Ambulance3D({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  status = 'available'
}: Ambulance3DProps) {
  const groupRef = useRef<any>(null);
  const lightRef = useRef<Mesh>(null);

  // Rotate the light on top
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.rotation.y += 0.05;
    }
  });

  // Color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#22c55e';
      case 'en_route': return '#ffc107';
      case 'on_scene': return '#3b82f6';
      case 'maintenance': return '#6b7280';
      default: return '#22c55e';
    }
  };

  const statusColor = getStatusColor(status);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 3]} />
        <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Red cross on left side */}
      <mesh position={[-1.01, 0.5, 0]}>
        <boxGeometry args={[0.02, 0.4, 0.2]} />
        <meshStandardMaterial color="#ff0050" emissive="#ff0050" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-1.01, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 0.4, 0.2]} />
        <meshStandardMaterial color="#ff0050" emissive="#ff0050" emissiveIntensity={0.5} />
      </mesh>

      {/* Red cross on right side */}
      <mesh position={[1.01, 0.5, 0]}>
        <boxGeometry args={[0.02, 0.4, 0.2]} />
        <meshStandardMaterial color="#ff0050" emissive="#ff0050" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.01, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 0.4, 0.2]} />
        <meshStandardMaterial color="#ff0050" emissive="#ff0050" emissiveIntensity={0.5} />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 1.2, 1.2]}>
        <boxGeometry args={[1.8, 0.8, 1]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 1.2, 1.7]}>
        <boxGeometry args={[1.6, 0.6, 0.1]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.3} 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Roof light (rotating) */}
      <mesh ref={lightRef} position={[0, 1.7, 0.5]}>
        <boxGeometry args={[0.3, 0.15, 0.5]} />
        <meshStandardMaterial 
          color={statusColor} 
          emissive={statusColor} 
          emissiveIntensity={1}
        />
      </mesh>

      {/* Point light from roof */}
      <pointLight 
        position={[0, 1.8, 0.5]} 
        color={statusColor} 
        intensity={2} 
        distance={5}
      />

      {/* Wheels - Front Left */}
      <mesh position={[-0.8, 0.3, 1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      {/* Front Right */}
      <mesh position={[0.8, 0.3, 1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      {/* Rear Left */}
      <mesh position={[-0.8, 0.3, -1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      {/* Rear Right */}
      <mesh position={[0.8, 0.3, -1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.6, 0.6, 1.51]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial 
          color="#ffff00" 
          emissive="#ffff00" 
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[0.6, 0.6, 1.51]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial 
          color="#ffff00" 
          emissive="#ffff00" 
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Bumper */}
      <mesh position={[0, 0.3, 1.6]}>
        <boxGeometry args={[2, 0.2, 0.2]} />
        <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Back doors */}
      <mesh position={[0, 0.7, -1.51]}>
        <boxGeometry args={[1.8, 1.2, 0.1]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Door handles */}
      <mesh position={[-0.5, 0.7, -1.52]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.5, 0.7, -1.52]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Side mirrors */}
      <mesh position={[-1.1, 1.3, 1.2]}>
        <boxGeometry args={[0.15, 0.15, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.1, 1.3, 1.2]}>
        <boxGeometry args={[0.15, 0.15, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Shadow */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 3.5]} />
        <meshBasicMaterial 
          color="#000000" 
          transparent 
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
