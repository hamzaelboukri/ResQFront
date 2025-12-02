import { Box, VStack, HStack, Text, Badge, Heading } from "@chakra-ui/react";
import { Activity, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import Loader from "../ui/Loader";

interface ActivityItem {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  isLoading?: boolean;
}

export default function ActivityFeed({ activities, isLoading }: ActivityFeedProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <MapPin size={16} color="#3b82f6" />;
      case "incident_created":
        return <AlertCircle size={16} color="#ef4444" />;
      case "incident_completed":
        return <CheckCircle size={16} color="#10b981" />;
      case "status_change":
        return <Activity size={16} color="#fbbf24" />;
      default:
        return <Activity size={16} color="#9ca3af" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "rgba(59, 130, 246, 0.2)";
      case "incident_created":
        return "rgba(239, 68, 68, 0.2)";
      case "incident_completed":
        return "rgba(16, 185, 129, 0.2)";
      case "status_change":
        return "rgba(251, 191, 36, 0.2)";
      default:
        return "rgba(107, 114, 128, 0.2)";
    }
  };

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
          <Box bg="rgba(59, 130, 246, 0.2)" p={2} borderRadius="lg">
            <Activity size={24} color="#3b82f6" />
          </Box>
          <Heading size="lg" color="white">
            Flux d'Activité
          </Heading>
        </HStack>
        <Badge bg="blue.500" color="white" px={3} py={1} borderRadius="full">
          Live
        </Badge>
      </HStack>

      <VStack align="stretch" gap={3} maxH="500px" overflowY="auto">
        {isLoading ? (
          <Box p={4}>
            <Text color="gray.400" textAlign="center">Chargement...</Text>
          </Box>
        ) : activities && activities.length > 0 ? (
          activities.map((item) => (
            <HStack
              key={item.id}
              p={4}
              bg="rgba(255, 255, 255, 0.02)"
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.800"
              justify="space-between"
              _hover={{ bg: "rgba(255, 255, 255, 0.05)", borderColor: "gray.700" }}
              transition="all 0.2s"
            >
              <HStack gap={3} flex={1}>
                <Box bg={getBackgroundColor(item.type)} p={2} borderRadius="md">
                  {getIcon(item.type)}
                </Box>
                <VStack align="start" gap={0} flex={1}>
                  <Text color="white" fontSize="sm" fontWeight="semibold">
                    {item.message}
                  </Text>
                  <Text color="gray.500" fontSize="xs">
                    {new Date(item.timestamp).toLocaleString("fr-FR")}
                  </Text>
                </VStack>
              </HStack>
              <StatusBadge status={item.type} size="sm" />
            </HStack>
          ))
        ) : (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">Aucune activité récente</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
