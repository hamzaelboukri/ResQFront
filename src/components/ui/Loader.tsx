// src/components/ui/Loader.tsx
import { Flex, Spinner, Text } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="rgb(5,5,15)"
      direction="column"
      gap={4}
    >
      <Spinner
        size="xl"
        color="#ff0050"
      />
      <Text
        color="white"
        fontSize="lg"
        fontWeight="medium"
        bgGradient="to-r"
        gradientFrom="#ff0050"
        gradientTo="#8a2be2"
        bgClip="text"
      >
        Loading ResQ...
      </Text>
    </Flex>
  );
}
