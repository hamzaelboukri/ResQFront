// src/components/dashboard/Sidebar.tsx
import { Box, VStack, Text, Flex, Badge } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Ambulance,
  AlertCircle,
  Users,
  Settings,
  LogOut,
  Activity,
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: string | number;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, badge, isActive, onClick }: NavItemProps) {
  return (
    <Box
      as="button"
      w="full"
      p={4}
      borderRadius="xl"
      bg={isActive ? "rgba(255,0,80,0.1)" : "transparent"}
      border="1px solid"
      borderColor={isActive ? "#ff0050" : "transparent"}
      color={isActive ? "#ff0050" : "gray.400"}
      _hover={{
        bg: "rgba(255,0,80,0.1)",
        borderColor: "#ff0050",
        color: "#ff0050",
        transform: "translateX(8px)",
      }}
      transition="all 0.3s"
      onClick={onClick}
      position="relative"
      overflow="hidden"
    >
      {isActive && (
        <Box
          position="absolute"
          left={0}
          top={0}
          bottom={0}
          w="4px"
          bg="#ff0050"
          boxShadow="0 0 10px #ff0050"
        />
      )}

      <Flex align="center" gap={3} position="relative">
        <Box>{icon}</Box>
        <Text fontWeight={isActive ? "bold" : "medium"} fontSize="md">
          {label}
        </Text>
        {badge !== undefined && (
          <Badge
            ml="auto"
            bg={isActive ? "#ff0050" : "rgba(255,255,255,0.1)"}
            color="white"
            borderRadius="full"
            px={2}
            fontSize="xs"
            fontWeight="bold"
          >
            {badge}
          </Badge>
        )}
      </Flex>
    </Box>
  );
}

interface SidebarProps {
  activeIncidents?: number;
  availableAmbulances?: number;
}

export default function Sidebar({ activeIncidents = 0, availableAmbulances = 0 }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <Map size={20} />,
      label: "Carte",
      path: "/map",
    },
    {
      icon: <Ambulance size={20} />,
      label: "Flotte",
      path: "/fleet",
      badge: availableAmbulances,
    },
    {
      icon: <AlertCircle size={20} />,
      label: "Incidents",
      path: "/incidents",
      badge: activeIncidents > 0 ? activeIncidents : undefined,
    },
    {
      icon: <Users size={20} />,
      label: "Équipages",
      path: "/crews",
    },
    {
      icon: <Activity size={20} />,
      label: "Activité",
      path: "/activity",
    },
  ];

  const bottomItems = [
    {
      icon: <Settings size={20} />,
      label: "Paramètres",
      path: "/settings",
    },
  ];

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w="280px"
      bg="rgba(10,10,20,0.95)"
      borderRight="1px solid"
      borderColor="rgba(255,0,80,0.1)"
      backdropFilter="blur(20px)"
      zIndex={100}
      display="flex"
      flexDirection="column"
    >
      {/* Logo/Brand */}
      <Box p={6} borderBottom="1px solid" borderColor="rgba(255,0,80,0.1)">
        <Flex align="center" gap={3}>
          <Box
            p={2}
            bg="rgba(255,0,80,0.1)"
            borderRadius="lg"
            border="1px solid #ff0050"
          >
            <Ambulance size={24} color="#ff0050" />
          </Box>
          <Box>
            <Text
              fontSize="2xl"
              fontWeight="black"
              bgGradient="to-r"
              gradientFrom="#ff0050"
              gradientTo="#8a2be2"
              bgClip="text"
            >
              ResQ
            </Text>
            <Text fontSize="xs" color="gray.500" fontWeight="medium">
              Dispatch System
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* Main Navigation */}
      <VStack
        flex={1}
        p={4}
        gap={2}
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,0,80,0.3)",
            borderRadius: "4px",
          },
        }}
      >
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            badge={item.badge}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </VStack>

      {/* Bottom Navigation */}
      <Box p={4} borderTop="1px solid" borderColor="rgba(255,0,80,0.1)">
        <VStack gap={2}>
          {bottomItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
          <NavItem
            icon={<LogOut size={20} />}
            label="Déconnexion"
            path="/login"
            isActive={false}
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          />
        </VStack>
      </Box>
    </Box>
  );
}
