// src/pages/Incidents.tsx
import { Box, Container, Flex, Heading, Text, Button, Input, Grid } from "@chakra-ui/react";
import { AlertCircle, Search, Plus, MapPin, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Header from "../components/header";
import Loader from "../components/ui/Loader";
import StatusBadge from "../components/ui/StatusBadge";
import AddIncidentModal from "../components/modals/AddIncidentModal";

const fetchIncidents = async () => {
  const response = await fetch("http://localhost:3000/incidents");
  if (!response.ok) throw new Error("Failed to fetch incidents");
  return response.json();
};

export default function Incidents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: incidents, isLoading } = useQuery({
    queryKey: ["incidents"],
    queryFn: fetchIncidents,
  });

  if (isLoading) {
    return <Loader />;
  }

  const stats = {
    total: incidents?.length || 0,
    critical: incidents?.filter((i: any) => i.severity === "critical").length || 0,
    pending: incidents?.filter((i: any) => i.status === "pending").length || 0,
    completed: incidents?.filter((i: any) => i.status === "completed").length || 0,
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "#ff0050";
      case "high":
        return "#ff6b35";
      case "medium":
        return "#ffc107";
      case "low":
        return "#22c55e";
      default:
        return "#6b7280";
    }
  };

  return (
    <Box minH="100vh" bg="rgb(5,5,15)">
      <Header />
      <Container maxW="container.xl" py={8}>
        {/* Header Section */}
        <Box
          mb={8}
          p={8}
          borderRadius="2xl"
          bgGradient="to-br"
          gradientFrom="rgba(255,0,80,0.1)"
          gradientTo="rgba(138,43,226,0.1)"
          border="1px solid"
          borderColor="rgba(255,0,80,0.2)"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="to-r"
            gradientFrom="rgba(255,0,80,0.05)"
            gradientTo="transparent"
            pointerEvents="none"
          />
          <Flex justify="space-between" align="center" position="relative">
            <Box>
              <Heading
                size="2xl"
                bgGradient="to-r"
                gradientFrom="#ff0050"
                gradientTo="#8a2be2"
                bgClip="text"
                mb={2}
              >
                🚨 Incident Management
              </Heading>
              <Text color="gray.400" fontSize="lg">
                Track and manage all emergency incidents
              </Text>
            </Box>
            <Button
              size="lg"
              colorScheme="red"
              bgGradient="to-r"
              gradientFrom="#ff0050"
              gradientTo="#ff1a66"
              _hover={{
                transform: "translateY(-2px)",
                shadow: "0 0 30px rgba(255,0,80,0.5)",
              }}
              transition="all 0.3s"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus />
              New Incident
            </Button>
          </Flex>
        </Box>

        {/* Search and Filters */}
        <Flex gap={4} mb={6}>
          <Box flex={1} position="relative">
            <Input
              placeholder="Search incidents by address, patient name..."
              size="lg"
              bg="rgba(255,255,255,0.03)"
              border="1px solid rgba(255,0,80,0.2)"
              color="white"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                borderColor: "#ff0050",
                shadow: "0 0 20px rgba(255,0,80,0.3)",
              }}
              pl={12}
            />
            <Box
              position="absolute"
              left={4}
              top="50%"
              transform="translateY(-50%)"
              color="gray.500"
            >
              <Search size={20} />
            </Box>
          </Box>
          <Button
            size="lg"
            bg="rgba(255,255,255,0.03)"
            border="1px solid rgba(255,0,80,0.2)"
            color="white"
            _hover={{ bg: "rgba(255,0,80,0.1)" }}
          >
            All Severity
          </Button>
          <Button
            size="lg"
            bg="rgba(255,255,255,0.03)"
            border="1px solid rgba(255,0,80,0.2)"
            color="white"
            _hover={{ bg: "rgba(255,0,80,0.1)" }}
          >
            All Status
          </Button>
        </Flex>

        {/* Incidents Grid */}
        <Grid
          templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
          gap={6}
          mb={8}
        >
          {incidents?.map((incident: any) => (
            <Box
              key={incident.id}
              p={6}
              bg="rgba(255,255,255,0.03)"
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(255,0,80,0.2)"
              borderLeft="4px solid"
              borderLeftColor={getSeverityColor(incident.severity)}
              _hover={{
                transform: "translateY(-5px)",
                shadow: `0 10px 40px ${getSeverityColor(incident.severity)}33`,
                borderColor: getSeverityColor(incident.severity),
              }}
              transition="all 0.3s"
              cursor="pointer"
            >
              <Flex justify="space-between" align="start" mb={4}>
                <Flex align="center" gap={3}>
                  <Box
                    p={3}
                    bg={`${getSeverityColor(incident.severity)}22`}
                    borderRadius="lg"
                    color={getSeverityColor(incident.severity)}
                  >
                    <AlertCircle size={24} />
                  </Box>
                  <Box>
                    <Text fontSize="xl" fontWeight="bold" color="white">
                      Incident #{incident.id}
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      {new Date(incident.timestamp).toLocaleString()}
                    </Text>
                  </Box>
                </Flex>
                <Box>
                  <StatusBadge status={incident.severity} />
                  <Box mt={2}>
                    <StatusBadge status={incident.status} />
                  </Box>
                </Box>
              </Flex>

              <Box spaceY={3}>
                <Flex align="center" gap={2} color="gray.400">
                  <User size={16} />
                  <Text fontSize="sm">
                    {incident.patient?.name || "Unknown"} ({incident.patient?.age || "N/A"} years,{" "}
                    {incident.patient?.gender || "N/A"})
                  </Text>
                </Flex>

                <Flex align="center" gap={2} color="gray.400">
                  <MapPin size={16} />
                  <Text fontSize="sm">{incident.address}</Text>
                </Flex>

                <Box
                  p={3}
                  bg="rgba(255,255,255,0.02)"
                  borderRadius="md"
                  mt={3}
                >
                  <Text fontSize="sm" color="gray.300">
                    {incident.description}
                  </Text>
                </Box>

                {incident.assignedAmbulanceId && (
                  <Flex
                    align="center"
                    gap={2}
                    p={2}
                    bg="rgba(34,197,94,0.1)"
                    borderRadius="md"
                    mt={3}
                  >
                    <Text fontSize="sm" color="#22c55e" fontWeight="semibold">
                      🚑 Assigned: {incident.assignedAmbulanceId}
                    </Text>
                  </Flex>
                )}
              </Box>
            </Box>
          ))}
        </Grid>

        {/* Stats Cards */}
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <Box
            p={6}
            bg="rgba(255,255,255,0.03)"
            borderRadius="xl"
            border="1px solid rgba(59,130,246,0.2)"
            textAlign="center"
          >
            <Text fontSize="3xl" fontWeight="bold" color="#3b82f6" mb={2}>
              {stats.total}
            </Text>
            <Text color="gray.400">Total Incidents</Text>
          </Box>
          <Box
            p={6}
            bg="rgba(255,255,255,0.03)"
            borderRadius="xl"
            border="1px solid rgba(255,0,80,0.2)"
            textAlign="center"
          >
            <Text fontSize="3xl" fontWeight="bold" color="#ff0050" mb={2}>
              {stats.critical}
            </Text>
            <Text color="gray.400">Critical</Text>
          </Box>
          <Box
            p={6}
            bg="rgba(255,255,255,0.03)"
            borderRadius="xl"
            border="1px solid rgba(255,193,7,0.2)"
            textAlign="center"
          >
            <Text fontSize="3xl" fontWeight="bold" color="#ffc107" mb={2}>
              {stats.pending}
            </Text>
            <Text color="gray.400">Pending</Text>
          </Box>
          <Box
            p={6}
            bg="rgba(255,255,255,0.03)"
            borderRadius="xl"
            border="1px solid rgba(34,197,94,0.2)"
            textAlign="center"
          >
            <Text fontSize="3xl" fontWeight="bold" color="#22c55e" mb={2}>
              {stats.completed}
            </Text>
            <Text color="gray.400">Completed</Text>
          </Box>
        </Grid>
      </Container>
      
      <AddIncidentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}
