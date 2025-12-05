import { useEffect, useRef } from 'react';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import L from 'leaflet';
import ReactDOM from 'react-dom/client';
import { Box, Text } from '@chakra-ui/react';
import StatusBadge from '../ui/StatusBadge';
import * as THREE from 'three';

function AmbulanceModel({ status }: { status: string }) {
  const { scene } = useGLTF('/modles/mapAmbulance.glb');
  const groupRef = useRef<THREE.Group>(null);
  
  // Clone the scene to allow multiple instances
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'en_route': return '#f59e0b';
      case 'on_scene': return '#3b82f6';
      case 'maintenance': return '#6b7280';
      default: return '#10b981';
    }
  };

  const statusColor = getStatusColor(status);
  
  // Bouncing animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 2.5) * 0.1;
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 2.5) * 0.02;
    }
  });
  
  return (
    <group ref={groupRef}>
      <primitive 
        object={clonedScene} 
        scale={0.8} 
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
      />
      {/* Status indicator light */}
      <pointLight position={[0, 1.5, 0]} color={statusColor} intensity={1} distance={3} />
    </group>
  );
}

// Component to render 3D canvas into a div
function Canvas3DIcon({ status }: { status: string }) {
  return (
    <div style={{ 
      position: 'relative', 
      width: '70px', 
      height: '70px',
    }}>
      <Canvas
        camera={{ position: [0, 3, 5], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 5]} intensity={2} castShadow />
        <pointLight position={[-3, 3, -3]} intensity={0.8} color="#ff0050" />
        <AmbulanceModel status={status} />
      </Canvas>
    </div>
  );
}



// Custom Marker component with 3D icon
interface Ambulance3DMarkerProps {
  ambulance: any;
}

export function Ambulance3DMarker({ ambulance }: Ambulance3DMarkerProps) {
  const markerRef = useRef<L.Marker>(null);
  const iconDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (markerRef.current) {
      // Create a div for the icon
      const iconDiv = document.createElement('div');
      iconDiv.className = 'ambulance-3d-marker-container';
      iconDivRef.current = iconDiv;
      
      // Render the 3D canvas into the div
      const root = ReactDOM.createRoot(iconDiv);
      root.render(<Canvas3DIcon status={ambulance.status} />);
      
      // Create the custom icon
      const customIcon = L.divIcon({
        html: iconDiv,
        className: 'ambulance-3d-marker',
        iconSize: [70, 70],
        iconAnchor: [35, 35],
        popupAnchor: [0, -35]
      });
      
      markerRef.current.setIcon(customIcon);
    }
  }, [ambulance.status]);

  return (
    <Marker
      ref={markerRef}
      position={[ambulance.lat, ambulance.lng]}
    >
      <Popup>
        <Box>
          <Text fontWeight="bold">🚑 {ambulance.identifier}</Text>
          <StatusBadge status={ambulance.status} />
          <Text fontSize="sm" mt={2}>
            Crew ID: {ambulance.crewId}
          </Text>
        </Box>
      </Popup>
    </Marker>
  );
}

// Preload the model
useGLTF.preload('/modles/mapAmbulance.glb');


