import {
  Box,
  Container,
  VStack,
  Grid,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  Ambulance,
  Activity,
  AlertCircle,
  Clock,
  TrendingUp,
  Users,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/ui/Loader";
import Sidebar from "../components/dashboard/Sidebar";
import KPICard from "../components/dashboard/KPICard";
import StatCard from "../components/dashboard/StatCard";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import CriticalIncidents from "../components/dashboard/CriticalIncidents";
import HeroSection from "../components/dashboard/HeroSection";
import QuickActions from "../components/dashboard/QuickActions";

const API_URL = "http://localhost:3000";

export default function DashboardNew() {
  const navigate = useNavigate();

  const { data: ambulances, isLoading: loadingAmbulances } = useQuery({
    queryKey: ["ambulances"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/ambulances`);
      return res.json();
    },
  });

  const { data: incidents, isLoading: loadingIncidents } = useQuery({
    queryKey: ["incidents"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/incidents`);
      return res.json();
    },
  });

  const { data: activity, isLoading: loadingActivity } = useQuery({
    queryKey: ["activity"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/activity`);
      const data = await res.json();
      return data.slice(0, 8);
    },
  });

  const { data: crews } = useQuery({
    queryKey: ["crews"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/crews`);
      return res.json();
    },
  });

  if (loadingAmbulances || loadingIncidents) {
    return <Loader />;
  }

  const availableAmbulances = ambulances?.filter((a: any) => a.status === "available").length || 0;
  const activeIncidents = incidents?.filter((i: any) => i.status === "in_progress" || i.status === "pending").length || 0;
  const criticalIncidents = incidents?.filter((i: any) => i.severity === "critical" && i.status !== "completed").length || 0;
  const completedToday = incidents?.filter((i: any) => i.status === "completed").length || 0;
  const totalCrews = crews?.length || 0;

  // Calculate average response time
  const avgResponseTime = incidents?.length > 0 ? "8.5 min" : "N/A";

  return (
    <Box bg="rgb(5, 5, 15)" minH="100vh">
      <Sidebar 
        activeIncidents={activeIncidents} 
        availableAmbulances={availableAmbulances}
      />

      <Box ml="280px">
        
        <Container maxW="1600px" pt="24" pb="12" px={{ base: 4, md: 8 }}>
        <VStack align="stretch" gap={8}>
          {/* Hero Section */}
          <HeroSection
            onMapClick={() => navigate("/map")}
            onHistoryClick={() => navigate("/incidents")}
          />

          {/* KPI Grid */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
            <KPICard
              title="Ambulances Disponibles"
              value={availableAmbulances}
              icon={<Ambulance size={32} />}
              color="#10b981"
              trend="+2"
              onClick={() => navigate("/fleet")}
            />
            <KPICard
              title="Incidents Actifs"
              value={activeIncidents}
              icon={<Activity size={32} />}
              color="#3b82f6"
              onClick={() => navigate("/incidents")}
            />
            <KPICard
              title="Cas Critiques"
              value={criticalIncidents}
              icon={<AlertCircle size={32} />}
              color="#ef4444"
              trend={criticalIncidents > 0 ? `${criticalIncidents}` : "0"}
              onClick={() => navigate("/incidents")}
            />
            <KPICard
              title="Temps Réponse Moyen"
              value={avgResponseTime}
              icon={<Clock size={32} />}
              color="#a855f7"
              trend="-12%"
            />
          </Grid>

          {/* Secondary KPIs */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            <StatCard
              title="Interventions Terminées"
              value={completedToday}
              subtitle="Aujourd'hui • Taux de résolution: 98%"
              icon={<CheckCircle size={24} color="#10b981" />}
              color="rgba(16, 185, 129"
            />
            <StatCard
              title="Équipages en Service"
              value={totalCrews}
              subtitle="Effectif total • 100% opérationnel"
              icon={<Users size={24} color="#3b82f6" />}
              color="rgba(59, 130, 246"
            />
            <StatCard
              title="Performance Globale"
              value="94%"
              subtitle="Score de satisfaction • +5% ce mois"
              icon={<TrendingUp size={24} color="#a855f7" />}
              color="rgba(168, 85, 247"
            />
          </Grid>

          {/* Activity Feed & Recent Incidents */}
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
            <ActivityFeed activities={activity || []} isLoading={loadingActivity} />
            <CriticalIncidents
              incidents={incidents || []}
              onIncidentClick={() => navigate("/incidents")}
            />
          </Grid>

          {/* Quick Actions */}
          <QuickActions
            onMapClick={() => navigate("/map")}
            onFleetClick={() => navigate("/fleet")}
            onIncidentsClick={() => navigate("/incidents")}
            onStatsClick={() => {}}
          />
        </VStack>
      </Container>
      </Box>
    </Box>
  );
}
