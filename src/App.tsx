// src/App.tsx
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home";
import DashboardNew from "./pages/DashboardNew";
import DispatchMap from "./pages/DispatchMap";
import Fleet from "./pages/Fleet";
import Incidents from "./pages/Incidents";

export default function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardNew />} />
            <Route path="/map" element={<DispatchMap />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
