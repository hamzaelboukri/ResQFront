import { Box, VStack, HStack, Heading, Text, Button } from "@chakra-ui/react";
import { Activity } from "lucide-react";

interface HeroSectionProps {
  onMapClick?: () => void;
  onHistoryClick?: () => void;
}

export default function HeroSection({ onMapClick, onHistoryClick }: HeroSectionProps) {
  return (
    <Box
      position="relative"
      bgGradient="linear(135deg, rgba(255, 0, 80, 0.15), rgba(139, 0, 139, 0.1), rgba(0, 150, 255, 0.1))"
      p={8}
      borderRadius="2xl"
      border="1px solid"
      borderColor="rgba(255, 0, 80, 0.3)"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: "-50%",
        right: "-10%",
        width: "400px",
        height: "400px",
        bg: "radial-gradient(circle, rgba(255, 0, 80, 0.2), transparent)",
        borderRadius: "full",
        filter: "blur(80px)",
      }}
    >
      <VStack align="start" gap={3} position="relative" zIndex={1}>
        <HStack gap={3}>
          <Box
            bg="rgba(255, 0, 80, 0.2)"
            p={4}
            borderRadius="xl"
            border="2px solid"
            borderColor="red.500"
          >
            <Activity size={40} color="#ff0050" />
          </Box>
          <VStack align="start" gap={1}>
            <Heading
              size="3xl"
              bgGradient="linear(to-r, #ff0050, #ff4081, #ff6090)"
              bgClip="text"
              fontWeight="black"
            >
              Centre de Régulation ResQ
            </Heading>
            <Text color="gray.300" fontSize="lg">
              Vue d'ensemble en temps réel • Système de dispatching d'ambulances
            </Text>
          </VStack>
        </HStack>

        <HStack gap={4} mt={4}>
          <Button
            size="lg"
            bgGradient="linear(to-r, red.500, pink.500)"
            color="white"
            fontWeight="bold"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 10px 30px rgba(255, 0, 80, 0.4)",
            }}
            onClick={onMapClick}
          >
            🗺️ Carte Interactive
          </Button>
          <Button
            size="lg"
            variant="outline"
            borderColor="gray.600"
            color="white"
            fontWeight="bold"
            _hover={{ bg: "rgba(255, 255, 255, 0.05)" }}
            onClick={onHistoryClick}
          >
            📋 Historique
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
