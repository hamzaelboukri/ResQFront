import { Box, HStack, Text, Badge } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
  trend?: string;
  onClick?: () => void;
}

export default function KPICard({ title, value, icon, color, trend, onClick }: KPICardProps) {
  return (
    <Box
      bg="rgba(15, 15, 25, 0.98)"
      p={6}
      borderRadius="xl"
      border="2px solid"
      borderColor="gray.800"
      position="relative"
      overflow="hidden"
      cursor={onClick ? "pointer" : "default"}
      _hover={
        onClick
          ? {
              transform: "translateY(-8px) scale(1.02)",
              borderColor: color,
              boxShadow: `0 20px 40px ${color}40`,
            }
          : {}
      }
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      onClick={onClick}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="full"
        height="4px"
        bg={color}
      />

      <HStack justify="space-between" mb={4}>
        <Box bg={`${color}20`} p={3} borderRadius="lg" border="1px solid" borderColor={color}>
          {icon}
        </Box>
        {trend && (
          <Badge
            bg={trend.startsWith("+") ? "green.500" : "red.500"}
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontWeight="bold"
            fontSize="xs"
          >
            {trend}
          </Badge>
        )}
      </HStack>

      <Text fontSize="4xl" fontWeight="black" color="white" mb={2}>
        {value}
      </Text>
      <Text fontSize="sm" color="gray.400" fontWeight="semibold">
        {title}
      </Text>

      <Box
        position="absolute"
        bottom="-30px"
        right="-30px"
        opacity={0.05}
        fontSize="120px"
      >
        {icon}
      </Box>
    </Box>
  );
}
