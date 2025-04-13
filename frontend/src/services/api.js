// src/services/api.js
const API_URL = "http://localhost:8000/api/auth";

export async function signup(payload) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  if (!res.ok) throw new Error((await res.json()).message || "Signup failed");
}

export async function login(payload) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include", // This sends cookies, useful for session management
  });
  if (!res.ok) throw new Error((await res.json()).message || "Login failed");
}
