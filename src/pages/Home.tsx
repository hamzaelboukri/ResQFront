import { Box } from "@chakra-ui/react";
import Header from "../components/header";
import Footer from "../components/footer";
import Ambulance3D  from '../components/Ambulance3D'
export default function Home() {
  return (
    <Box bg="rgb(5, 5, 15)" minH="100vh">
      <Header />
      <Box pt="24" pb="10" px={{ base: 4, md: 8 }} maxW="1400px" mx="auto">
        <Box 
          mb="6" 
          p="6" 
          bg="rgba(0, 255, 255, 0.05)" 
          borderRadius="lg" 
          border="1px solid" 
          borderColor="cyan.500"
        >
          <Ambulance3D/>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
