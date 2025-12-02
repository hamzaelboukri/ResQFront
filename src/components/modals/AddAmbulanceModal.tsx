// src/components/modals/AddAmbulanceModal.tsx
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { X, Ambulance, Save } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

interface AddAmbulanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAmbulanceModal({ isOpen, onClose }: AddAmbulanceModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    identifier: "",
    status: "available",
    lat: 33.5731,
    lng: -7.5898,
    crewId: "",
  });

  const { data: crews } = useQuery({
    queryKey: ["crews"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/crews");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (newAmbulance: typeof formData) => {
      const response = await fetch("http://localhost:3000/ambulances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAmbulance),
      });
      if (!response.ok) throw new Error("Failed to add ambulance");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ambulances"] });
      onClose();
      setFormData({
        identifier: "",
        status: "available",
        lat: 33.5731,
        lng: -7.5898,
        crewId: "",
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
        maxW="500px"
        w="full"
        mx={4}
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
              <Ambulance size={24} color="#ff0050" />
            </Box>
            <Heading
              size="xl"
              bgGradient="to-r"
              gradientFrom="#ff0050"
              gradientTo="#8a2be2"
              bgClip="text"
            >
              Ajouter Ambulance
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
                Identifiant
              </Text>
              <Input
                placeholder="Ex: AMB-001"
                value={formData.identifier}
                onChange={(e) =>
                  setFormData({ ...formData, identifier: e.target.value })
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
                <option value="available">Disponible</option>
                <option value="en_route">En Route</option>
                <option value="on_scene">Sur Place</option>
                <option value="maintenance">Maintenance</option>
              </select>
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
                  value={formData.lat}
                  onChange={(e) =>
                    setFormData({ ...formData, lat: parseFloat(e.target.value) })
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
                  value={formData.lng}
                  onChange={(e) =>
                    setFormData({ ...formData, lng: parseFloat(e.target.value) })
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

            <Box>
              <Text color="gray.300" mb={2} fontSize="sm" fontWeight="medium">
                Équipage
              </Text>
              <select
                value={formData.crewId}
                onChange={(e: any) =>
                  setFormData({ ...formData, crewId: e.target.value })
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
                required
              >
                <option value="">Sélectionner un équipage</option>
                {crews?.map((crew: any) => (
                  <option key={crew.id} value={crew.id}>
                    Équipe {crew.id} - {crew.members.map((m: any) => m.name).join(", ")}
                  </option>
                ))}
              </select>
            </Box>

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
                Enregistrer
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
