import { Box, HStack, Text } from "@chakra-ui/react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

export default function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  return (
    <Box
      bg={`${color}10`}
      p={6}
      borderRadius="xl"
      border="2px solid"
      borderColor={`${color.replace("rgba", "").replace("0.1)", "700")}`}
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: `0 15px 30px ${color}30`,
      }}
      transition="all 0.3s"
    >
      <HStack justify="space-between" mb={3}>
        <HStack>
          {icon}
          <Text fontSize="md" fontWeight="bold" color={`${color.split("(")[0]}.300`}>
            {title}
          </Text>
        </HStack>
        <Text fontSize="2xl" fontWeight="black" color={`${color.split("(")[0]}.400`}>
          {value}
        </Text>
      </HStack>
      <Text fontSize="sm" color="gray.400">
        {subtitle}
      </Text>
    </Box>
  );
}
