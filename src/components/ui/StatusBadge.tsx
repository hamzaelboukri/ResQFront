// src/components/ui/StatusBadge.tsx
import { Badge } from "@chakra-ui/react";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md" | "lg";
}

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    // Ambulance statuses
    if (lowerStatus === "available") {
      return { label: "Available", colorScheme: "green" };
    }
    if (lowerStatus === "en_route" || lowerStatus === "en route") {
      return { label: "En Route", colorScheme: "yellow" };
    }
    if (lowerStatus === "on_scene" || lowerStatus === "on scene") {
      return { label: "On Scene", colorScheme: "blue" };
    }
    if (lowerStatus === "maintenance") {
      return { label: "Maintenance", colorScheme: "gray" };
    }
    
    // Incident severities
    if (lowerStatus === "critical") {
      return { label: "Critical", colorScheme: "red" };
    }
    if (lowerStatus === "high") {
      return { label: "High", colorScheme: "orange" };
    }
    if (lowerStatus === "medium") {
      return { label: "Medium", colorScheme: "yellow" };
    }
    if (lowerStatus === "low") {
      return { label: "Low", colorScheme: "green" };
    }
    
    // Incident statuses
    if (lowerStatus === "pending") {
      return { label: "Pending", colorScheme: "yellow" };
    }
    if (lowerStatus === "completed") {
      return { label: "Completed", colorScheme: "green" };
    }
    if (lowerStatus === "cancelled") {
      return { label: "Cancelled", colorScheme: "gray" };
    }
    
    // Activity types
    if (lowerStatus === "assignment") {
      return { label: "Assignment", colorScheme: "blue" };
    }
    if (lowerStatus === "incident_created") {
      return { label: "New Incident", colorScheme: "red" };
    }
    if (lowerStatus === "incident_completed") {
      return { label: "Completed", colorScheme: "green" };
    }
    if (lowerStatus === "status_change") {
      return { label: "Status Change", colorScheme: "purple" };
    }
    
    // Default
    return { label: status, colorScheme: "gray" };
  };

  const config = getStatusConfig(status);

  const sizeStyles = {
    sm: { fontSize: "2xs", px: 1.5, py: 0.5 },
    md: { fontSize: "xs", px: 2, py: 1 },
    lg: { fontSize: "sm", px: 3, py: 1.5 },
  };

  const styles = sizeStyles[size];

  return (
    <Badge
      colorScheme={config.colorScheme}
      fontSize={styles.fontSize}
      px={styles.px}
      py={styles.py}
      borderRadius="md"
      fontWeight="semibold"
      textTransform="uppercase"
    >
      {config.label}
    </Badge>
  );
}
