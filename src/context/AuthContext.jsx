import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  getProfile,
} from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token =
        localStorage.getItem("travora_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();

        setUser(data.user || data);
      } catch (error) {
        console.error(
          "Session restoration failed:",
          error
        );

        localStorage.removeItem("travora_token");
        localStorage.removeItem("travora_user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    localStorage.setItem(
      "travora_token",
      data.token
    );

    localStorage.setItem(
      "travora_user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    return data;
  };

  const signup = async (userData) => {
    const data = await registerUser(userData);

    localStorage.setItem(
      "travora_token",
      data.token
    );

    localStorage.setItem(
      "travora_user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("travora_token");
    localStorage.removeItem("travora_user");

    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}