// src/components/modals/Ambulance3DModal.tsx
import { Box, Button, Heading, Text, HStack } from "@chakra-ui/react";
import { X } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Ambulance3D from "../3D/Ambulance3D";
import { useState } from "react";

interface Ambulance3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  ambulance?: any;
}

export default function Ambulance3DModal({ isOpen, onClose, ambulance }: Ambulance3DModalProps) {
  const [autoRotate, setAutoRotate] = useState(true);

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0,0,0,0.9)"
      backdropFilter="blur(10px)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
    >
      <Box
        bg="rgb(15,15,25)"
        borderRadius="2xl"
        border="2px solid"
        borderColor="rgba(255,0,80,0.3)"
        p={8}
        w="90vw"
        maxW="1200px"
        h="80vh"
        boxShadow="0 0 50px rgba(255,0,80,0.3)"
        onClick={(e) => e.stopPropagation()}
        display="flex"
        flexDirection="column"
      >
        {/* Header */}
        <HStack justify="space-between" mb={4}>
          <Box>
            <Heading
              size="xl"
              bgGradient="to-r"
              gradientFrom="#ff0050"
              gradientTo="#8a2be2"
              bgClip="text"
            >
              🚑 Ambulance 3D
            </Heading>
            {ambulance && (
              <Text color="gray.400" mt={2}>
                {ambulance.identifier} - Status: {ambulance.status}
              </Text>
            )}
          </Box>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            color="gray.400"
            _hover={{ color: "white", bg: "rgba(255,0,80,0.1)" }}
          >
            <X size={20} />
          </Button>
        </HStack>

        {/* Controls */}
        <HStack mb={4} gap={3}>
          <Button
            size="sm"
            onClick={() => setAutoRotate(!autoRotate)}
            bg={autoRotate ? "rgba(255,0,80,0.2)" : "rgba(255,255,255,0.05)"}
            color="white"
            border="1px solid"
            borderColor={autoRotate ? "#ff0050" : "rgba(255,255,255,0.1)"}
            _hover={{ bg: "rgba(255,0,80,0.3)" }}
          >
            {autoRotate ? "⏸️ Stop Rotation" : "▶️ Auto Rotate"}
          </Button>
          <Text color="gray.400" fontSize="sm">
            🖱️ Drag to rotate • Scroll to zoom
          </Text>
        </HStack>

        {/* 3D Canvas */}
        <Box
          flex={1}
          borderRadius="xl"
          border="2px solid"
          borderColor="rgba(255,0,80,0.2)"
          overflow="hidden"
          bg="linear-gradient(135deg, rgba(15,15,25,1) 0%, rgba(25,25,40,1) 100%)"
        >
          <Canvas>
            <PerspectiveCamera makeDefault position={[8, 5, 8]} />
            <OrbitControls 
              autoRotate={autoRotate}
              autoRotateSpeed={2}
              enablePan={false}
              minDistance={5}
              maxDistance={20}
            />
            
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, 10, -5]} intensity={0.5} />
            <pointLight position={[0, 5, 0]} intensity={0.5} color="#ff0050" />
            
            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial 
                color="#0a0a0a" 
                roughness={0.8}
                metalness={0.2}
              />
            </mesh>

            {/* Grid */}
            <gridHelper args={[20, 20, "#ff0050", "#333333"]} position={[0, 0, 0]} />
            
            {/* Ambulance */}
            <Ambulance3D 
              position={[0, 0, 0]} 
              scale={0.8}
              status={ambulance?.status || 'available'}
            />
          </Canvas>
        </Box>

        {/* Footer Info */}
        <HStack mt={4} justify="center" gap={6}>
          <Box textAlign="center">
            <Text color="gray.400" fontSize="sm">Status Color</Text>
            <HStack justify="center" mt={1}>
              <Box w={3} h={3} borderRadius="full" bg="#22c55e" />
              <Text color="white" fontSize="xs">Available</Text>
            </HStack>
          </Box>
          <Box textAlign="center">
            <Text color="gray.400" fontSize="sm">En Route</Text>
            <HStack justify="center" mt={1}>
              <Box w={3} h={3} borderRadius="full" bg="#ffc107" />
              <Text color="white" fontSize="xs">Yellow</Text>
            </HStack>
          </Box>
          <Box textAlign="center">
            <Text color="gray.400" fontSize="sm">On Scene</Text>
            <HStack justify="center" mt={1}>
              <Box w={3} h={3} borderRadius="full" bg="#3b82f6" />
              <Text color="white" fontSize="xs">Blue</Text>
            </HStack>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
