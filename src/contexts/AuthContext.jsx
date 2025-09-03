import { createContext, useState } from "react";
import { toast } from "sonner";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [signingUp, setSigningUp] = useState(false);
  const [logingIn, setLoginIn] = useState(false);

  // Use backend URL from environment, fallback to localhost for dev
  const baseUrl =
    import.meta.env.VITE_BASE_URL || "http://localhost:4000";

  // SIGN UP
  const signup = async (data) => {
    if (data.confirmPassword !== data.password) {
      toast.error("Passwords do not match");
      return;
    }

    setSigningUp(true);
    try {
      const res = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      console.log(resData);

      if (res.ok) {
        toast.success("Welcome to SQI Flash Card. Redirecting...");
        // Example: redirect to login page after signup
        // navigate("/login");
      } else {
        toast.error(resData.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Unable to sign up");
    } finally {
      setSigningUp(false);
    }
  };

  // LOGIN
  const login = async (data) => {
    setLoginIn(true);
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      console.log(resData);

      if (res.ok) {
        toast.success("Login successful!");
        // store token if backend returns it
        // localStorage.setItem("token", resData.token);
      } else {
        toast.error(resData.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Unable to login");
    } finally {
      setLoginIn(false);
    }
  };

  const value = { logingIn, signingUp, signup, login };

  return (
    <authContext.Provider value={value}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
