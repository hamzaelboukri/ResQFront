// src/pages/Register.tsx
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validation/authSchemas";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "regulator"
    }
  });

  async function onSubmit(values: RegisterForm) {
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role ?? "regulator"
      });

      navigate("/login");
    } catch (err: any) {
      alert(err.message || "Registration error");
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
          w={{ base: "100%", md: "480px" }}
        >
          <Heading mb={4} textAlign="center" color="red.400" textShadow="0 0 10px rgba(255, 0, 80, 0.5)">
            Create Account
          </Heading>
          <Text mb={6} textAlign="center" color="gray.400">
            Register to access the system
          </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={4} align="stretch">

            {/* Full Name */}
            <Box>
              <Text fontWeight="medium" mb={2} color="gray.300">Full Name</Text>
              <Input 
                placeholder="John Doe" 
                {...register("name")} 
                bg="rgba(10, 10, 20, 0.6)"
                border="1px solid"
                borderColor="gray.700"
                color="white"
                _placeholder={{ color: "gray.500" }}
                _hover={{ borderColor: "red.500" }}
                _focus={{ borderColor: "red.500", boxShadow: "0 0 10px rgba(255, 0, 80, 0.3)" }}
              />
              {errors.name && (
                <Text color="red.400" fontSize="sm" mt={1}>{errors.name.message}</Text>
              )}
            </Box>

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

            {/* Confirm Password */}
            <Box>
              <Text fontWeight="medium" mb={2} color="gray.300">Confirm Password</Text>
              <Input 
                type="password" 
                placeholder="********" 
                {...register("confirmPassword")} 
                bg="rgba(10, 10, 20, 0.6)"
                border="1px solid"
                borderColor="gray.700"
                color="white"
                _placeholder={{ color: "gray.500" }}
                _hover={{ borderColor: "red.500" }}
                _focus={{ borderColor: "red.500", boxShadow: "0 0 10px rgba(255, 0, 80, 0.3)" }}
              />
              {errors.confirmPassword && (
                <Text color="red.400" fontSize="sm" mt={1}>{errors.confirmPassword.message}</Text>
              )}
            </Box>

            {/* Role Select */}
            <Box>
              <Text fontWeight="medium" mb={2} color="gray.300">Role</Text>
              <Box
                as="select"
                {...register("role")}
                p={2}
                borderWidth="1px"
                borderRadius="md"
                w="full"
                bg="rgba(10, 10, 20, 0.6)"
                borderColor="gray.700"
                color="white"
                _hover={{ borderColor: "red.500" }}
                _focus={{ borderColor: "red.500", boxShadow: "0 0 10px rgba(255, 0, 80, 0.3)" }}
              >
                <option value="regulator" style={{ background: "rgb(20, 20, 30)" }}>Regulator (Régulateur)</option>
                <option value="fleet_manager" style={{ background: "rgb(20, 20, 30)" }}>Fleet Manager</option>
                <option value="admin" style={{ background: "rgb(20, 20, 30)" }}>Admin</option>
              </Box>
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
              Register
            </Button>

            <Button 
              variant="plain" 
              color="gray.400"
              _hover={{ color: "red.400" }}
              onClick={() => navigate("/login")}
            >
              Already have an account? Sign In
            </Button>
          </VStack>
        </form>
      </Box>
      </Box>
    </Box>
  );
}
