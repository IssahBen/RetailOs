import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [email, setEmail] = useState();
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function login(obj) {
    try {
      const res = await fetch(
        "https://3006-99-230-98-234.ngrok-free.app/api/v1/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        }
      );

      const data = await res.json();

      if (res.ok && data.token) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));

        setToken(data.token);
        setUser(data.user);
        setEmail(data.user.email);
        setIsLoggedIn(true);
        return "success";
      } else {
        const error = data.error || "Login failed";
        setErrorMessage(error);
        setVisible(true);
        return "failed";
      }
    } catch (error) {
      setErrorMessage("Server Offline");
      setVisible(true);
      return "failed";
    }
  }

  async function signup(obj) {
    try {
      const res = await fetch(
        "https://3006-99-230-98-234.ngrok-free.app/api/v1/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        }
      );

      const data = await res.json();

      if (res.ok && data.token) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));

        setToken(data.token);
        setUser(data.user);
        setEmail(data.user.email);
        setIsLoggedIn(true);
        return "success";
      } else {
        const errors = data.errors || "Signup failed";
        setErrorMessage(errors);
        setVisible(true);
        return "failed";
      }
    } catch (error) {
      setErrorMessage("Server Offline");
      setVisible(true);
      return "failed";
    }
  }

  async function logout() {
    try {
      const res = await fetch(
        "https://3006-99-230-98-234.ngrok-free.app/api/v1/logout",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-User-Token": token,
            "X-User-Email": email,
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.message) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        setIsLoggedIn(false);
        setToken(null);
        setUser(null);
        setEmail(null);

        return "success";
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      setErrorMessage("Server Offline");
      setVisible(true);
      return "failed";
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        visible,
        setVisible,
        errorMessage,
        user,
        token,
        isLoggedIn,
        setErrorMessage,
        email,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
