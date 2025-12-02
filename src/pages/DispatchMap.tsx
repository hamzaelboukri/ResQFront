// src/pages/DispatchMap.tsx
import React from "react";
import { Box, Container, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { AlertCircle, Ambulance, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/header";
import Loader from "../components/ui/Loader";
import StatusBadge from "../components/ui/StatusBadge";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const fetchAmbulances = async () => {
  const response = await fetch("http://localhost:3000/ambulances");
  if (!response.ok) throw new Error("Failed to fetch ambulances");
  return response.json();
};

const fetchIncidents = async () => {
  const response = await fetch("http://localhost:3000/incidents");
  if (!response.ok) throw new Error("Failed to fetch incidents");
  return response.json();
};

export default function DispatchMap() {
  const { data: ambulances, isLoading: loadingAmbulances } = useQuery({
    queryKey: ["ambulances"],
    queryFn: fetchAmbulances,
  });

  const { data: incidents, isLoading: loadingIncidents } = useQuery({
    queryKey: ["incidents"],
    queryFn: fetchIncidents,
  });

  if (loadingAmbulances || loadingIncidents) {
    return <Loader />;
  }

  const center: [number, number] = [33.5731, -7.5898]; // Casablanca

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
                🗺️ Dispatch Map
              </Heading>
              <Text color="gray.400" fontSize="lg">
                Real-time tracking of all ambulances and incidents
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
            >
              <Filter />
              Filters
            </Button>
          </Flex>
        </Box>

        {/* Stats Row */}
        <Flex gap={4} mb={6}>
          <Box
            flex={1}
            p={4}
            bg="rgba(255,255,255,0.03)"
            borderRadius="xl"
            border="1px solid rgba(255,0,80,0.2)"
          >
            <Flex align="center" gap={3}>
              <Box
                p={3}
                bg="rgba(34,197,94,0.1)"
                borderRadius="lg"
                color="#22c55e"
              >
                <Ambulance size={24} />
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.400">
                  Available
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {ambulances?.filter((a: any) => a.status === "available").length || 0}
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box
            flex={1}
            p={4}
            bg="rgba(255,255,255,0.03)"
            borderRadius="xl"
            border="1px solid rgba(255,0,80,0.2)"
          >
            <Flex align="center" gap={3}>
              <Box
                p={3}
                bg="rgba(255,193,7,0.1)"
                borderRadius="lg"
                color="#ffc107"
              >
                <Ambulance size={24} />
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.400">
                  En Route
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {ambulances?.filter((a: any) => a.status === "en_route").length || 0}
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box
            flex={1}
            p={4}
            bg="rgba(255,255,255,0.03)"
            borderRadius="xl"
            border="1px solid rgba(255,0,80,0.2)"
          >
            <Flex align="center" gap={3}>
              <Box
                p={3}
                bg="rgba(255,0,80,0.1)"
                borderRadius="lg"
                color="#ff0050"
              >
                <AlertCircle size={24} />
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.400">
                  Active Incidents
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {incidents?.filter((i: any) => i.status === "pending" || i.status === "en_route").length || 0}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Flex>

        {/* Map Container */}
        <Box
          borderRadius="2xl"
          overflow="hidden"
          border="2px solid"
          borderColor="rgba(255,0,80,0.3)"
          shadow="0 0 50px rgba(255,0,80,0.2)"
          h="600px"
        >
          <MapContainer
            center={center}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Ambulance Markers */}
            {ambulances?.map((ambulance: any) => (
              <Marker
                key={ambulance.id}
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
            ))}

            {/* Incident Markers */}
            {incidents?.map((incident: any) => {
              if (!incident.location?.lat || !incident.location?.lng) return null;
              return (
                <React.Fragment key={incident.id}>
                  <Marker position={[incident.location.lat, incident.location.lng]}>
                    <Popup>
                      <Box>
                        <Text fontWeight="bold">🚨 Incident #{incident.id}</Text>
                        <StatusBadge status={incident.severity} />
                        <Text fontSize="sm" mt={2}>
                          {incident.address}
                        </Text>
                        <Text fontSize="sm">Patient: {incident.patient?.name}</Text>
                      </Box>
                    </Popup>
                  </Marker>
                  {incident.severity === "critical" && (
                    <Circle
                      center={[incident.location.lat, incident.location.lng]}
                      radius={500}
                      pathOptions={{
                        color: "#ff0050",
                        fillColor: "#ff0050",
                        fillOpacity: 0.1,
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </MapContainer>
        </Box>

        {/* Legend */}
        <Flex gap={4} mt={6} justify="center">
          <Flex align="center" gap={2}>
            <Box w={4} h={4} bg="#22c55e" borderRadius="full" />
            <Text color="gray.400">Available</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Box w={4} h={4} bg="#ffc107" borderRadius="full" />
            <Text color="gray.400">En Route</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Box w={4} h={4} bg="#ff0050" borderRadius="full" />
            <Text color="gray.400">Critical Incident</Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Box w={4} h={4} bg="#3b82f6" borderRadius="full" />
            <Text color="gray.400">On Scene</Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
