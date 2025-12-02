import { Box, VStack, HStack, Text, Badge, Heading } from "@chakra-ui/react";
import { AlertCircle, MapPin, CheckCircle } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";

interface Incident {
  id: string;
  severity: string;
  status: string;
  patient: string;
  address: string;
}

interface CriticalIncidentsProps {
  incidents: Incident[];
  onIncidentClick?: (id: string) => void;
}

export default function CriticalIncidents({ incidents, onIncidentClick }: CriticalIncidentsProps) {
  const criticalCount = incidents.filter(
    (i) => i.severity === "critical" || i.severity === "high"
  ).length;

  const criticalIncidents = incidents
    .filter((i) => i.severity === "critical" || i.severity === "high")
    .slice(0, 5);

  return (
    <Box
      bg="rgba(15, 15, 25, 0.98)"
      borderRadius="xl"
      border="2px solid"
      borderColor="gray.800"
      p={6}
    >
      <HStack justify="space-between" mb={6}>
        <HStack gap={3}>
          <Box bg="rgba(239, 68, 68, 0.2)" p={2} borderRadius="lg">
            <AlertCircle size={24} color="#ef4444" />
          </Box>
          <Heading size="lg" color="white">
            Incidents Critiques
          </Heading>
        </HStack>
        <Badge bg="red.500" color="white" px={3} py={1} borderRadius="full">
          {criticalCount}
        </Badge>
      </HStack>

      <VStack align="stretch" gap={3} maxH="500px" overflowY="auto">
        {criticalIncidents.length > 0 ? (
          criticalIncidents.map((incident) => (
            <Box
              key={incident.id}
              p={4}
              bg="rgba(255, 255, 255, 0.02)"
              borderRadius="lg"
              border="1px solid"
              borderColor={incident.severity === "critical" ? "red.800" : "orange.800"}
              borderLeftWidth="4px"
              _hover={{ bg: "rgba(255, 255, 255, 0.05)", transform: "translateX(5px)" }}
              transition="all 0.2s"
              cursor="pointer"
              onClick={() => onIncidentClick?.(incident.id)}
            >
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="bold" color="white">
                  Incident #{incident.id}
                </Text>
                <StatusBadge status={incident.status} size="sm" />
              </HStack>
              <Text fontSize="sm" color="gray.300" mb={2}>
                Patient: {incident.patient}
              </Text>
              <HStack justify="space-between">
                <HStack>
                  <MapPin size={14} color="#9ca3af" />
                  <Text fontSize="xs" color="gray.400">
                    {incident.address}
                  </Text>
                </HStack>
                <StatusBadge status={incident.severity} size="sm" />
              </HStack>
            </Box>
          ))
        ) : (
          <Box textAlign="center" py={12}>
            <CheckCircle size={48} color="#10b981" style={{ margin: "0 auto 16px" }} />
            <Text color="green.400" fontWeight="bold" fontSize="lg" mb={2}>
              Aucun incident critique
            </Text>
            <Text color="gray.500" fontSize="sm">
              Tous les incidents sont sous contrôle
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
