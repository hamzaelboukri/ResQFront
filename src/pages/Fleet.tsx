// src/pages/Fleet.tsx
import { Box, Container, Flex, Heading, Text, Button, Input, Grid } from "@chakra-ui/react";
import { Ambulance, Search, Plus, MapPin, Users, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Header from "../components/header";
import Loader from "../components/ui/Loader";
import StatusBadge from "../components/ui/StatusBadge";
import AddAmbulanceModal from "../components/modals/AddAmbulanceModal";
import Ambulance3DModal from "../components/modals/Ambulance3DModal";

const fetchAmbulances = async () => {
  const response = await fetch("http://localhost:3000/ambulances");
  if (!response.ok) throw new Error("Failed to fetch ambulances");
  return response.json();
};

const fetchCrews = async () => {
  const response = await fetch("http://localhost:3000/crews");
  if (!response.ok) throw new Error("Failed to fetch crews");
  return response.json();
};

export default function Fleet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState<any>(null);
  
  const { data: ambulances, isLoading: loadingAmbulances } = useQuery({
    queryKey: ["ambulances"],
    queryFn: fetchAmbulances,
  });

  const { data: crews, isLoading: loadingCrews } = useQuery({
    queryKey: ["crews"],
    queryFn: fetchCrews,
  });

  if (loadingAmbulances || loadingCrews) {
    return <Loader />;
  }

  const getCrewForAmbulance = (crewId: string) => {
    return crews?.find((c: any) => c.id === crewId);
  };

  const stats = {
    total: ambulances?.length || 0,
    available: ambulances?.filter((a: any) => a.status === "available").length || 0,
    enRoute: ambulances?.filter((a: any) => a.status === "en_route").length || 0,
    onScene: ambulances?.filter((a: any) => a.status === "on_scene").length || 0,
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
                🚑 Fleet Management
              </Heading>
              <Text color="gray.400" fontSize="lg">
                Monitor and manage your ambulance fleet
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
              Add Ambulance
            </Button>
          </Flex>
        </Box>

        {/* Search and Filters */}
        <Flex gap={4} mb={6}>
          <Box flex={1} position="relative">
            <Input
              placeholder="Search by identifier or crew..."
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
            All Status
          </Button>
        </Flex>

        {/* Ambulances Grid */}
        <Grid
          templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
          gap={6}
          mb={8}
        >
          {ambulances?.map((ambulance: any) => {
            const crew = getCrewForAmbulance(ambulance.crewId);
            return (
              <Box
                key={ambulance.id}
                p={6}
                bg="rgba(255,255,255,0.03)"
                borderRadius="xl"
                border="1px solid"
                borderColor="rgba(255,0,80,0.2)"
                _hover={{
                  transform: "translateY(-5px)",
                  shadow: "0 10px 40px rgba(255,0,80,0.2)",
                  borderColor: "#ff0050",
                }}
                transition="all 0.3s"
                cursor="pointer"
                onClick={() => {
                  setSelectedAmbulance(ambulance);
                  setIs3DModalOpen(true);
                }}
              >
                <Flex justify="space-between" align="start" mb={4}>
                  <Flex align="center" gap={3}>
                    <Box
                      p={3}
                      bg="rgba(255,0,80,0.1)"
                      borderRadius="lg"
                      color="#ff0050"
                    >
                      <Ambulance size={24} />
                    </Box>
                    <Box>
                      <Text fontSize="xl" fontWeight="bold" color="white">
                        {ambulance.identifier}
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        ID: {ambulance.id}
                      </Text>
                    </Box>
                  </Flex>
                  <StatusBadge status={ambulance.status} />
                </Flex>

                <Box spaceY={3}>
                  <Flex align="center" gap={2} color="gray.400">
                    <MapPin size={16} />
                    <Text fontSize="sm">
                      {ambulance.lat.toFixed(4)}, {ambulance.lng.toFixed(4)}
                    </Text>
                  </Flex>

                  {crew && (
                    <Flex align="center" gap={2} color="gray.400">
                      <Users size={16} />
                      <Text fontSize="sm">
                        {crew.members.map((m: any) => m.name).join(", ")}
                      </Text>
                    </Flex>
                  )}

                  <Flex align="center" gap={2} color="gray.400">
                    <Clock size={16} />
                    <Text fontSize="sm">
                      Last Update: {new Date().toLocaleTimeString()}
                    </Text>
                  </Flex>
                </Box>
              </Box>
            );
          })}
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
            <Text color="gray.400">Total Fleet</Text>
          </Box>
          <Box
            p={6}
            bg="rgba(255,255,255,0.03)"
            borderRadius="xl"
            border="1px solid rgba(34,197,94,0.2)"
            textAlign="center"
          >
            <Text fontSize="3xl" fontWeight="bold" color="#22c55e" mb={2}>
              {stats.available}
            </Text>
            <Text color="gray.400">Available</Text>
          </Box>
          <Box
            p={6}
            bg="rgba(255,255,255,0.03)"
            borderRadius="xl"
            border="1px solid rgba(255,193,7,0.2)"
            textAlign="center"
          >
            <Text fontSize="3xl" fontWeight="bold" color="#ffc107" mb={2}>
              {stats.enRoute}
            </Text>
            <Text color="gray.400">En Route</Text>
          </Box>
          <Box
            p={6}
            bg="rgba(255,255,255,0.03)"
            borderRadius="xl"
            border="1px solid rgba(255,0,80,0.2)"
            textAlign="center"
          >
            <Text fontSize="3xl" fontWeight="bold" color="#ff0050" mb={2}>
              {stats.onScene}
            </Text>
            <Text color="gray.400">On Scene</Text>
          </Box>
        </Grid>
      </Container>
      
      <AddAmbulanceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Ambulance3DModal 
        isOpen={is3DModalOpen} 
        onClose={() => setIs3DModalOpen(false)}
        ambulance={selectedAmbulance}
      />
    </Box>
  );
}
