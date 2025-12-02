// src/pages/Login.tsx
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/authSchemas";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  async function onSubmit(values: LoginForm) {
    try {
      const user = await loginUser(values.email, values.password);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate based on role
      if (user.role === "fleet_manager") {
        navigate("/fleet");
      } else if (user.role === "regulator") {
        navigate("/map");
      } else if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      alert(err.message || "Login error");
    }
  }

  return (
    <Box bg="rgb(5, 5, 15)" minH="100vh" w="100%">
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Box
          bg="rgba(20, 20, 30, 0.8)"
          p={8}
          rounded="lg"
          border="1px solid"
          borderColor="red.500"
          boxShadow="0 0 30px rgba(255, 0, 80, 0.3)"
          backdropFilter="blur(10px)"
          w={{ base: "100%", md: "420px" }}
        >
          <Heading mb={4} textAlign="center" color="red.400" textShadow="0 0 10px rgba(255, 0, 80, 0.5)">
            Login
          </Heading>
          <Text mb={6} textAlign="center" color="gray.400">
            Sign in to access your dashboard
          </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={4} align="stretch">

            {/* Email */}
            <Box>
              <Text fontWeight="medium" mb={2} color="gray.300">Email</Text>
              <Input 
                placeholder="email@example.com" 
                {...register("email")} 
                bg="rgba(10, 10, 20, 0.6)"
                border="1px solid"
                borderColor="gray.700"
                color="white"
                _placeholder={{ color: "gray.500" }}
                _hover={{ borderColor: "red.500" }}
                _focus={{ borderColor: "red.500", boxShadow: "0 0 10px rgba(255, 0, 80, 0.3)" }}
              />
              {errors.email && (
                <Text color="red.400" fontSize="sm" mt={1}>{errors.email.message}</Text>
              )}
            </Box>

            {/* Password */}
            <Box>
              <Text fontWeight="medium" mb={2} color="gray.300">Password</Text>
              <Input 
                type="password" 
                placeholder="********" 
                {...register("password")} 
                bg="rgba(10, 10, 20, 0.6)"
                border="1px solid"
                borderColor="gray.700"
                color="white"
                _placeholder={{ color: "gray.500" }}
                _hover={{ borderColor: "red.500" }}
                _focus={{ borderColor: "red.500", boxShadow: "0 0 10px rgba(255, 0, 80, 0.3)" }}
              />
              {errors.password && (
                <Text color="red.400" fontSize="sm" mt={1}>{errors.password.message}</Text>
              )}
            </Box>

            <Button 
              type="submit" 
              w="full"
              size="lg"
              bg="red.500" 
              color="white"
              _hover={{ bg: "red.600", boxShadow: "0 0 25px rgba(255, 0, 80, 0.6)" }}
              fontWeight="bold"
              py={6}
              loading={isSubmitting}
            >
              Sign In
            </Button>

            <Button 
              variant="plain" 
              color="gray.400"
              _hover={{ color: "red.400" }}
              onClick={() => navigate("/register")}
            >
              Don't have an account? Sign Up
            </Button>
          </VStack>
        </form>
        </Box>
      </Box>
    </Box>
  );
}
