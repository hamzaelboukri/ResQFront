import { Box, Flex, Heading, Spacer, Button, HStack, Image, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  
  return (
    <Box as="header" position="fixed" top={0} width="100%" bg="rgba(10, 10, 20, 0.95)" backdropFilter="saturate(180%) blur(10px)" zIndex={50} boxShadow="0 0 20px rgba(255, 0, 80, 0.3)" borderBottom="1px solid" borderColor="red.500">
      <Flex maxW="1200px" mx="auto" px={6} h={16} align="center">
        {/* Logo */}
        <HStack gap={3}>
          <Image src="/logo.png" alt="ResQ Logo" boxSize="8" />
          <Heading size="md" color="red.400" textShadow="0 0 10px rgba(255, 0, 80, 0.5)">ResQ Dispatch</Heading>
        </HStack>

        <Spacer />

        {/* Navigation Links */}
        <HStack as="nav" gap={6} display={{ base: "none", md: "flex" }}>
          <Link href="/" fontWeight="medium" color="gray.300" _hover={{ color: "red.400", textShadow: "0 0 8px rgba(255, 0, 80, 0.6)" }}>Home</Link>
          <Link href="/map" fontWeight="medium" color="gray.300" _hover={{ color: "red.400", textShadow: "0 0 8px rgba(255, 0, 80, 0.6)" }}>Dispatch Map</Link>
          <Link href="/fleet" fontWeight="medium" color="gray.300" _hover={{ color: "red.400", textShadow: "0 0 8px rgba(255, 0, 80, 0.6)" }}>Fleet</Link>
          <Link href="/incidents" fontWeight="medium" color="gray.300" _hover={{ color: "red.400", textShadow: "0 0 8px rgba(255, 0, 80, 0.6)" }}>Incidents</Link>
          <Link href="/dashboard" fontWeight="medium" color="gray.300" _hover={{ color: "red.400", textShadow: "0 0 8px rgba(255, 0, 80, 0.6)" }}>Dashboard</Link>
        </HStack>

        {/* Login Button */}
        <Button 
          ml={4} 
          bg="red.500" 
          color="white" 
          _hover={{ bg: "red.600", boxShadow: "0 0 15px rgba(255, 0, 80, 0.6)" }} 
          fontWeight="bold"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Flex>
    </Box>
  );
}
