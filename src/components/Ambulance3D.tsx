import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

function Ambulance() {
  const { scene } = useGLTF("/modles/ambulance.glb");  
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
}

export default function Ambulance3D() {
  return (
    <div style={{ width: "100%", height: "600px", background: "rgb(10, 10, 20)", overflow: "hidden", margin: "0 auto" }}>
      <Canvas shadows camera={{ position: [5, 3, 5], fov: 50 }} style={{ display: "block" }}>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff0050" />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff0050" />
          
          {/* Model */}
          <Ambulance />
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={true} 
            minDistance={3} 
            maxDistance={20} 
            autoRotate 
            autoRotateSpeed={1} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
