// src/components/modals/AddIncidentModal.tsx
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import { X, AlertCircle, Save } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddIncidentModal({ isOpen, onClose }: AddIncidentModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    severity: "medium",
    status: "pending",
    address: "",
    description: "",
    patient: {
      name: "",
      age: "",
      gender: "male",
    },
    location: {
      lat: 33.5731,
      lng: -7.5898,
    },
    timestamp: new Date().toISOString(),
  });



  const mutation = useMutation({
    mutationFn: async (newIncident: any) => {
      const response = await fetch("http://localhost:3000/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIncident),
      });
      if (!response.ok) throw new Error("Failed to add incident");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      onClose();
      setFormData({
        severity: "medium",
        status: "pending",
        address: "",
        description: "",
        patient: {
          name: "",
          age: "",
          gender: "male",
        },
        location: {
          lat: 33.5731,
          lng: -7.5898,
        },
        timestamp: new Date().toISOString(),
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0,0,0,0.8)"
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
        maxW="600px"
        w="full"
        mx={4}
        maxH="90vh"
        overflowY="auto"
        boxShadow="0 0 50px rgba(255,0,80,0.3)"
        onClick={(e) => e.stopPropagation()}
      >
        <HStack justify="space-between" mb={6}>
          <HStack gap={3}>
            <Box
              p={3}
              bg="rgba(255,0,80,0.1)"
              borderRadius="lg"
              border="1px solid #ff0050"
            >
              <AlertCircle size={24} color="#ff0050" />
            </Box>
            <Heading
              size="xl"
              bgGradient="to-r"
              gradientFrom="#ff0050"
              gradientTo="#8a2be2"
              bgClip="text"
            >
              Nouvel Incident
            </Heading>
          </HStack>
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

        <form onSubmit={handleSubmit}>
          <VStack gap={4} align="stretch">
            <Box>
              <Text color="gray.300" mb={2} fontSize="sm" fontWeight="medium">
                Adresse
              </Text>
              <Input
                placeholder="Ex: 123 Rue Mohammed V, Casablanca"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                bg="rgba(255,255,255,0.03)"
                border="1px solid rgba(255,0,80,0.2)"
                color="white"
                _placeholder={{ color: "gray.500" }}
                _focus={{
                  borderColor: "#ff0050",
                  boxShadow: "0 0 20px rgba(255,0,80,0.3)",
                }}
                required
              />
            </Box>

            <Box>
              <Text color="gray.300" mb={2} fontSize="sm" fontWeight="medium">
                Description
              </Text>
              <Textarea
                placeholder="Décrivez l'incident..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                bg="rgba(255,255,255,0.03)"
                border="1px solid rgba(255,0,80,0.2)"
                color="white"
                _placeholder={{ color: "gray.500" }}
                _focus={{
                  borderColor: "#ff0050",
                  boxShadow: "0 0 20px rgba(255,0,80,0.3)",
                }}
                rows={3}
                required
              />
            </Box>

            <HStack gap={4}>
              <Box flex={1}>
                <Text color="gray.300" mb={2} fontSize="sm" fontWeight="medium">
                  Sévérité
                </Text>
                <select
                  value={formData.severity}
                  onChange={(e: any) =>
                    setFormData({ ...formData, severity: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,0,80,0.2)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <option value="low">Faible</option>
                  <option value="medium">Moyen</option>
                  <option value="high">Élevé</option>
                  <option value="critical">Critique</option>
                </select>
              </Box>
              <Box flex={1}>
                <Text color="gray.300" mb={2} fontSize="sm" fontWeight="medium">
                  Statut
                </Text>
                <select
                  value={formData.status}
                  onChange={(e: any) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,0,80,0.2)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <option value="pending">En Attente</option>
                  <option value="en_route">En Route</option>
                  <option value="on_scene">Sur Place</option>
                  <option value="completed">Terminé</option>
                </select>
              </Box>
            </HStack>

            <Box
              p={4}
              bg="rgba(255,255,255,0.02)"
              borderRadius="lg"
              border="1px solid rgba(255,0,80,0.1)"
            >
              <Text color="white" mb={3} fontSize="sm" fontWeight="bold">
                Information Patient
              </Text>
              <VStack gap={3}>
                <Input
                  placeholder="Nom du patient"
                  value={formData.patient.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      patient: { ...formData.patient, name: e.target.value },
                    })
                  }
                  bg="rgba(255,255,255,0.03)"
                  border="1px solid rgba(255,0,80,0.2)"
                  color="white"
                  _placeholder={{ color: "gray.500" }}
                  _focus={{
                    borderColor: "#ff0050",
                    boxShadow: "0 0 20px rgba(255,0,80,0.3)",
                  }}
                  required
                />
                <HStack gap={3} w="full">
                  <Input
                    type="number"
                    placeholder="Âge"
                    value={formData.patient.age}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        patient: { ...formData.patient, age: e.target.value },
                      })
                    }
                    bg="rgba(255,255,255,0.03)"
                    border="1px solid rgba(255,0,80,0.2)"
                    color="white"
                    _focus={{
                      borderColor: "#ff0050",
                      boxShadow: "0 0 20px rgba(255,0,80,0.3)",
                    }}
                    required
                  />
                  <select
                    value={formData.patient.gender}
                    onChange={(e: any) =>
                      setFormData({
                        ...formData,
                        patient: { ...formData.patient, gender: e.target.value },
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,0,80,0.2)",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                    <option value="other">Autre</option>
                  </select>
                </HStack>
              </VStack>
            </Box>

            <HStack gap={4}>
              <Box flex={1}>
                <Text color="gray.300" mb={2} fontSize="sm" fontWeight="medium">
                  Latitude
                </Text>
                <Input
                  type="number"
                  step="0.0001"
                  placeholder="33.5731"
                  value={formData.location.lat}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        lat: parseFloat(e.target.value),
                      },
                    })
                  }
                  bg="rgba(255,255,255,0.03)"
                  border="1px solid rgba(255,0,80,0.2)"
                  color="white"
                  _focus={{
                    borderColor: "#ff0050",
                    boxShadow: "0 0 20px rgba(255,0,80,0.3)",
                  }}
                  required
                />
              </Box>
              <Box flex={1}>
                <Text color="gray.300" mb={2} fontSize="sm" fontWeight="medium">
                  Longitude
                </Text>
                <Input
                  type="number"
                  step="0.0001"
                  placeholder="-7.5898"
                  value={formData.location.lng}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        lng: parseFloat(e.target.value),
                      },
                    })
                  }
                  bg="rgba(255,255,255,0.03)"
                  border="1px solid rgba(255,0,80,0.2)"
                  color="white"
                  _focus={{
                    borderColor: "#ff0050",
                    boxShadow: "0 0 20px rgba(255,0,80,0.3)",
                  }}
                  required
                />
              </Box>
            </HStack>

            <HStack gap={3} mt={4}>
              <Button
                flex={1}
                variant="ghost"
                onClick={onClose}
                color="gray.400"
                _hover={{ bg: "rgba(255,255,255,0.05)" }}
              >
                Annuler
              </Button>
              <Button
                flex={1}
                type="submit"
                bgGradient="to-r"
                gradientFrom="#ff0050"
                gradientTo="#ff1a66"
                color="white"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 0 30px rgba(255,0,80,0.5)",
                }}
                transition="all 0.3s"
                loading={mutation.isPending}
              >
                <Save size={18} style={{ marginRight: "8px" }} />
                Créer Incident
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
