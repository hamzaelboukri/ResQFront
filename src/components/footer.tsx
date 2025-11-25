// src/components/Footer.tsx
import { Box, Flex, VStack, HStack, Text, Link, Heading } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" bg="rgb(10, 10, 20)" color="gray.400" mt={16} py={10} borderTop="1px solid" borderColor="red.500" boxShadow="0 -5px 20px rgba(255, 0, 80, 0.2)">
      <Flex maxW="1200px" mx="auto" px={6} direction={{ base: "column", md: "row" }} justify="space-between" gap={10}>
        
        {/* Brand */}
        <VStack align="start">
          <Heading size="md" color="red.400" textShadow="0 0 10px rgba(255, 0, 80, 0.5)">ResQ Dispatch</Heading>
          <Text fontSize="sm" color="gray.500">
            Advanced platform for ambulance routing and emergency management.
          </Text>
        </VStack>

        {/* Navigation */}
        <VStack align="start">
          <Heading size="sm" color="red.300">Navigation</Heading>
          <Link href="/" color="gray.400" _hover={{ color: "red.400", textShadow: "0 0 8px rgba(255, 0, 80, 0.6)" }}>Home</Link>
          <Link href="/map" color="gray.400" _hover={{ color: "red.400", textShadow: "0 0 8px rgba(255, 0, 80, 0.6)" }}>Dispatch Map</Link>
          <Link href="/fleet" color="gray.400" _hover={{ color: "red.400", textShadow: "0 0 8px rgba(255, 0, 80, 0.6)" }}>Fleet</Link>
          <Link href="/incidents" color="gray.400" _hover={{ color: "red.400", textShadow: "0 0 8px rgba(255, 0, 80, 0.6)" }}>Incidents</Link>
          <Link href="/dashboard" color="gray.400" _hover={{ color: "red.400", textShadow: "0 0 8px rgba(255, 0, 80, 0.6)" }}>Dashboard</Link>
        </VStack>

        {/* Contact */}
        <VStack align="start">
          <Heading size="sm" color="cyan.300">Contact</Heading>
          <Text fontSize="sm" color="gray.500">Email: support@resq-app.com</Text>
          <Text fontSize="sm" color="gray.500">Phone: +33 6 20 45 87 11</Text>
          <Text fontSize="sm" color="gray.500">Address: Paris, France</Text>
        </VStack>

      </Flex>

      <Box borderTop="1px" borderColor="rgba(255, 0, 80, 0.3)" mt={10} pt={5} textAlign="center" fontSize="sm" color="gray.600">
        © {new Date().getFullYear()} ResQ. All rights reserved.
      </Box>
    </Box>
  );
}
