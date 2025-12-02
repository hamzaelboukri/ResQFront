import { Box, Grid, Button, VStack, Text, Heading } from "@chakra-ui/react";
import { MapPin, Ambulance, AlertCircle, TrendingUp } from "lucide-react";

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  onClick?: () => void;
}

interface QuickActionsProps {
  onMapClick?: () => void;
  onFleetClick?: () => void;
  onIncidentsClick?: () => void;
  onStatsClick?: () => void;
}

export default function QuickActions({
  onMapClick,
  onFleetClick,
  onIncidentsClick,
  onStatsClick,
}: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      label: "Carte Interactive",
      icon: <MapPin size={24} />,
      color: "rgba(59, 130, 246, 0.2)",
      borderColor: "blue.700",
      onClick: onMapClick,
    },
    {
      label: "Gestion Flotte",
      icon: <Ambulance size={24} />,
      color: "rgba(16, 185, 129, 0.2)",
      borderColor: "green.700",
      onClick: onFleetClick,
    },
    {
      label: "Incidents",
      icon: <AlertCircle size={24} />,
      color: "rgba(239, 68, 68, 0.2)",
      borderColor: "red.700",
      onClick: onIncidentsClick,
    },
    {
      label: "Statistiques",
      icon: <TrendingUp size={24} />,
      color: "rgba(168, 85, 247, 0.2)",
      borderColor: "purple.700",
      onClick: onStatsClick,
    },
  ];

  return (
    <Box
      bgGradient="linear(to-r, rgba(255, 0, 80, 0.1), rgba(139, 0, 139, 0.05))"
      p={6}
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.800"
    >
      <Heading size="md" color="white" mb={4}>
        Actions Rapides
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
        {actions.map((action, index) => (
          <Button
            key={index}
            size="lg"
            bg={action.color}
            color="gray.300"
            border="1px solid"
            borderColor={action.borderColor}
            _hover={{
              bg: action.color.replace("0.2", "0.3"),
              transform: "translateY(-2px)",
            }}
            onClick={action.onClick}
          >
            <VStack gap={2}>
              {action.icon}
              <Text fontSize="sm" fontWeight="bold">
                {action.label}
              </Text>
            </VStack>
          </Button>
        ))}
      </Grid>
    </Box>
  );
}
