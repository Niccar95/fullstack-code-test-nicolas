"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { registerService } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!username) {
      setUsernameError("Username is required");
      hasError = true;
    } else {
      setUsernameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    const response = await registerService(username, email, password);
    if (response.success) {
      console.log("User created succesfully!");
      navigate("/");
    } else {
      return { success: false, error: "Register failed" };
    }
  };

  return (
    <section className="mx-auto flex flex-col items-center justify-center h-screen w-screen md:w-[1200px] p-2 md:p-0">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Create Account
      </h1>

      <form
        className="flex flex-col gap-6 w-full md:w-1/2 border border-gray-200 rounded-xl p-6 shadow-sm"
        onSubmit={handleRegister}
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
          <label htmlFor="email" className="mb-2 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="p-2 border-b border-b-gray-300 w-full"
          />
          {emailError && (
            <div className="text-red-500 text-sm mt-1">{emailError}</div>
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
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default Register;
