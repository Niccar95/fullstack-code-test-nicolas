"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    let hasError = false;
    if (!username) {
      setUsernameError("Username is required");
      hasError = true;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    const response = await login(username, password);
    if (response.success) {
      console.log("Login successful!");
      navigate("/dashboard");
    } else {
      return { success: false, error: "Login failed" };
    }
  };

  return (
    <section className="mx-auto flex flex-col items-center justify-center h-screen w-screen md:w-[1200px] p-2 md:p-0">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Welcome Back
      </h1>

      <form
        className="flex flex-col gap-6 w-full md:w-1/2 border border-gray-200 rounded-xl p-6 shadow-sm"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-2 font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            className="p-2 border-b border-b-gray-300 w-full"
          />
          {usernameError && (
            <div className="text-red-500 text-sm mt-1">{usernameError}</div>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="p-2 border-b border-b-gray-300 w-full"
          />
          {passwordError && (
            <div className="text-red-500 text-sm mt-1">{passwordError}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-[#4B4A7F] text-white font-semibold rounded hover:bg-[#3d3a66] transition focus:outline-none focus:ring-2 focus:ring-[#4B4A7F] focus:ring-offset-2 cursor-pointer"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
