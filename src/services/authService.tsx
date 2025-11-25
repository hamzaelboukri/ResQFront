// src/services/authService.ts
export const API = "http://localhost:5000"; // Adjust port if needed

export type User = {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
};

// Register
export async function registerUser(user: User) {
  // Check if email already exists
  const exists = await fetch(`${API}/users?email=${encodeURIComponent(user.email)}`);
  const data = await exists.json();
  if (data.length > 0) {
    throw new Error("This email is already registered");
  }

  const res = await fetch(`${API}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (!res.ok) throw new Error("Server error. Please try again later.");
  return await res.json();
}

// Login
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  const data = await res.json();
  if (data.length === 1) return data[0];
  throw new Error("Invalid email or password");
}
