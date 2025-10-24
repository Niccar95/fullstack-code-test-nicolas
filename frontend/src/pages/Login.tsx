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
    } else if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      hasError = true;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
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
    <>
      <div className="flex items-center h-20 mx-auto w-full md:w-[1200px]">
        <div className="flex flex-row justify-center md:justify-start items-center w-full">
          <p className="text-xl md:text-2xl font-bold text-[#4B4A7F] group-hover:text-[#3d3a66] transition-colors">
            It
          </p>
          <p className="text-xl md:text-2xl font-bold text-[#6B6A9F] group-hover:text-[#5d5a86] transition-colors">
            Makes
          </p>
          <p className="text-xl md:text-2xl font-bold text-[#4B4A7F] group-hover:text-[#3d3a66] transition-colors">
            Sense
          </p>
        </div>
      </div>
      <section className="mx-auto flex flex-col items-center h-screen w-screen md:w-[1200px] p-2 md:p-0">
        <h1 className="text-3xl md:text-4xl font-bold text-[#4B4A7F] mt-10 mb-2 text-center">
          Sense You've Been Gone
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          We missed you and your sensors
        </p>

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
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="mt-4 text-[#4B4A7F] hover:text-[#3d3a66] cursor-pointer text-sm"
        >
          Don't have an account? Sign up →
        </button>
      </section>
    </>
  );
};

export default Login;
