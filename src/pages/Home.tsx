import { Box, Container, Heading, Text, Button, SimpleGrid, VStack, HStack, Flex } from "@chakra-ui/react";
import Header from "../components/header";
import Footer from "../components/footer";
import Ambulance3D from '../components/Ambulance3D';

export default function Home() {
  return (
    <Box bg="rgb(5, 5, 15)" minH="100vh">
      <Header />
      
      {/* Hero Section with 3D Model */}
      <Box pt="16" minH="90vh" display="flex" alignItems="center">
        <Container maxW="1400px" py={20}>
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap={12}>
            
            {/* Left Content */}
            <VStack align="start" flex={1} gap={8} pr={{ base: 0, lg: 8 }}>
              <Heading 
                size="3xl" 
                color="white"
                lineHeight="1.2"
                fontWeight="bold"
              >
                Save Lives with{" "}
                <Text as="span" color="red.400" textShadow="0 0 20px rgba(255, 0, 80, 0.6)">
                  Smart Dispatching
                </Text>
              </Heading>
              
              <Text fontSize="xl" color="gray.400" lineHeight="1.8">
                ResQ is an advanced ambulance dispatching platform that helps emergency responders coordinate faster, smarter, and more efficiently. Real-time tracking, intelligent routing, and instant incident management.
              </Text>

              <HStack gap={4} pt={4}>
                <Button 
                  size="lg" 
                  bg="red.500" 
                  color="white"
                  px={8}
                  py={6}
                  fontSize="lg"
                  _hover={{ bg: "red.600", boxShadow: "0 0 25px rgba(255, 0, 80, 0.6)", transform: "translateY(-2px)" }}
                  transition="all 0.3s"
                  fontWeight="bold"
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  borderColor="red.500"
                  color="red.400"
                  px={8}
                  py={6}
                  fontSize="lg"
                  borderWidth="2px"
                  _hover={{ bg: "rgba(255, 0, 80, 0.1)", borderColor: "red.400", transform: "translateY(-2px)" }}
                  transition="all 0.3s"
                >
                  Watch Demo
                </Button>
              </HStack>

              {/* Stats */}
              <HStack gap={8} pt={8}>
                <VStack align="start" gap={0}>
                  <Heading size="2xl" color="red.400" textShadow="0 0 15px rgba(255, 0, 80, 0.5)">
                    99.9%
                  </Heading>
                  <Text color="gray.500" fontSize="sm">Uptime</Text>
                </VStack>
                <Box h="50px" w="1px" bg="gray.700" />
                <VStack align="start" gap={0}>
                  <Heading size="2xl" color="red.400" textShadow="0 0 15px rgba(255, 0, 80, 0.5)">
                    &lt;3min
                  </Heading>
                  <Text color="gray.500" fontSize="sm">Response Time</Text>
                </VStack>
                <Box h="50px" w="1px" bg="gray.700" />
                <VStack align="start" gap={0}>
                  <Heading size="2xl" color="red.400" textShadow="0 0 15px rgba(255, 0, 80, 0.5)">
                    24/7
                  </Heading>
                  <Text color="gray.500" fontSize="sm">Support</Text>
                </VStack>
              </HStack>
            </VStack>

            {/* Right - 3D Model */}
            <Box 
              flex={1} 
              w="full"
              position="relative"
            >
              <Box 
                bg="rgba(255, 0, 80, 0.03)" 
                border="2px solid" 
                borderColor="red.500"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="0 0 50px rgba(255, 0, 80, 0.3)"
                position="relative"
              >
                <Ambulance3D/>
                
                {/* Decorative Elements */}
                <Box 
                  position="absolute" 
                  top="-20px" 
                  right="-20px" 
                  w="100px" 
                  h="100px" 
                  bg="red.500" 
                  opacity={0.1} 
                  borderRadius="full"
                  filter="blur(40px)"
                />
                <Box 
                  position="absolute" 
                  bottom="-20px" 
                  left="-20px" 
                  w="150px" 
                  h="150px" 
                  bg="red.500" 
                  opacity={0.1} 
                  borderRadius="full"
                  filter="blur(60px)"
                />
              </Box>
            </Box>

          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box bg="rgba(255, 0, 80, 0.02)" py={20} borderTop="1px solid" borderBottom="1px solid" borderColor="rgba(255, 0, 80, 0.2)">
        <Container maxW="1400px">
          <VStack gap={16}>
            {/* Section Title */}
            <Box textAlign="center" maxW="800px">
              <Heading 
                size="2xl" 
                color="white"
                mb={4}
              >
                Why Choose{" "}
                <Text as="span" color="red.400" textShadow="0 0 15px rgba(255, 0, 80, 0.5)">
                  ResQ?
                </Text>
              </Heading>
              <Text fontSize="lg" color="gray.400">
                Built for emergency services with cutting-edge technology and real-time intelligence
              </Text>
            </Box>

            {/* Feature Cards */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
              
              {/* Card 1 */}
              <Box 
                bg="rgba(10, 10, 20, 0.8)" 
                border="1px solid" 
                borderColor="rgba(255, 0, 80, 0.3)"
                borderRadius="xl"
                p={8}
                backdropFilter="blur(10px)"
                _hover={{ 
                  borderColor: "red.500",
                  boxShadow: "0 0 30px rgba(255, 0, 80, 0.2)",
                  transform: "translateY(-8px)",
                  transition: "all 0.3s"
                }}
                transition="all 0.3s"
              >
                <VStack align="start" gap={4}>
                  <Box 
                    bg="rgba(255, 0, 80, 0.1)" 
                    p={3} 
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="red.500"
                  >
                    <Text fontSize="2xl">🗺️</Text>
                  </Box>
                  <Heading size="md" color="white">Real-Time Mapping</Heading>
                  <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                    Live GPS tracking of all ambulances with intelligent route optimization and traffic awareness
                  </Text>
                  <Text color="red.400" fontSize="sm" fontWeight="semibold" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                    Learn more →
                  </Text>
                </VStack>
              </Box>

              {/* Card 2 */}
              <Box 
                bg="rgba(10, 10, 20, 0.8)" 
                border="1px solid" 
                borderColor="rgba(255, 0, 80, 0.3)"
                borderRadius="xl"
                p={8}
                backdropFilter="blur(10px)"
                _hover={{ 
                  borderColor: "red.500",
                  boxShadow: "0 0 30px rgba(255, 0, 80, 0.2)",
                  transform: "translateY(-8px)",
                  transition: "all 0.3s"
                }}
                transition="all 0.3s"
              >
                <VStack align="start" gap={4}>
                  <Box 
                    bg="rgba(255, 0, 80, 0.1)" 
                    p={3} 
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="red.500"
                  >
                    <Text fontSize="2xl">🚨</Text>
                  </Box>
                  <Heading size="md" color="white">Smart Assignment</Heading>
                  <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                    AI-powered incident assignment based on proximity, equipment, and current workload
                  </Text>
                  <Text color="red.400" fontSize="sm" fontWeight="semibold" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                    Learn more →
                  </Text>
                </VStack>
              </Box>

              {/* Card 3 */}
              <Box 
                bg="rgba(10, 10, 20, 0.8)" 
                border="1px solid" 
                borderColor="rgba(255, 0, 80, 0.3)"
                borderRadius="xl"
                p={8}
                backdropFilter="blur(10px)"
                _hover={{ 
                  borderColor: "red.500",
                  boxShadow: "0 0 30px rgba(255, 0, 80, 0.2)",
                  transform: "translateY(-8px)",
                  transition: "all 0.3s"
                }}
                transition="all 0.3s"
              >
                <VStack align="start" gap={4}>
                  <Box 
                    bg="rgba(255, 0, 80, 0.1)" 
                    p={3} 
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="red.500"
                  >
                    <Text fontSize="2xl">📊</Text>
                  </Box>
                  <Heading size="md" color="white">Analytics Dashboard</Heading>
                  <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                    Comprehensive metrics and KPIs to monitor performance and improve operations
                  </Text>
                  <Text color="red.400" fontSize="sm" fontWeight="semibold" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                    Learn more →
                  </Text>
                </VStack>
              </Box>

              {/* Card 4 */}
              <Box 
                bg="rgba(10, 10, 20, 0.8)" 
                border="1px solid" 
                borderColor="rgba(255, 0, 80, 0.3)"
                borderRadius="xl"
                p={8}
                backdropFilter="blur(10px)"
                _hover={{ 
                  borderColor: "red.500",
                  boxShadow: "0 0 30px rgba(255, 0, 80, 0.2)",
                  transform: "translateY(-8px)",
                  transition: "all 0.3s"
                }}
                transition="all 0.3s"
              >
                <VStack align="start" gap={4}>
                  <Box 
                    bg="rgba(255, 0, 80, 0.1)" 
                    p={3} 
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="red.500"
                  >
                    <Text fontSize="2xl">🚑</Text>
                  </Box>
                  <Heading size="md" color="white">Fleet Management</Heading>
                  <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                    Complete oversight of vehicle status, maintenance schedules, and crew assignments
                  </Text>
                  <Text color="red.400" fontSize="sm" fontWeight="semibold" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                    Learn more →
                  </Text>
                </VStack>
              </Box>

            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={24}>
        <Container maxW="1200px">
          <Box 
            textAlign="center" 
            p={16} 
            bg="linear-gradient(135deg, rgba(255, 0, 80, 0.1) 0%, rgba(255, 0, 80, 0.05) 100%)"
            border="2px solid"
            borderColor="red.500"
            borderRadius="2xl"
            position="relative"
            overflow="hidden"
          >
            {/* Background Glow */}
            <Box 
              position="absolute" 
              top="50%" 
              left="50%" 
              transform="translate(-50%, -50%)"
              w="400px" 
              h="400px" 
              bg="red.500" 
              opacity={0.05} 
              borderRadius="full"
              filter="blur(100px)"
            />
            
            <VStack gap={6} position="relative" zIndex={1}>
              <Heading size="2xl" color="white">
                Ready to Transform Emergency Response?
              </Heading>
              <Text color="gray.400" fontSize="lg" maxW="600px">
                Join healthcare organizations worldwide using ResQ to save lives every day
              </Text>
              <HStack gap={4} pt={4}>
                <Button 
                  size="lg" 
                  bg="red.500" 
                  color="white"
                  px={10}
                  py={7}
                  fontSize="lg"
                  _hover={{ bg: "red.600", boxShadow: "0 0 30px rgba(255, 0, 80, 0.6)" }}
                  fontWeight="bold"
                >
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  borderColor="gray.600"
                  color="gray.300"
                  px={10}
                  py={7}
                  fontSize="lg"
                  borderWidth="2px"
                  _hover={{ borderColor: "gray.500", bg: "rgba(255, 255, 255, 0.05)" }}
                >
                  Contact Sales
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
