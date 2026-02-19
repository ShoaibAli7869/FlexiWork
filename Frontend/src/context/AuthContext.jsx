import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { demoUsers } from "../data/demoData";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Find user in demo data
    const foundUser = demoUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password; // Don't store password
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      toast.success(`Welcome back, ${userData.name}!`);
      return { success: true, user: userData };
    } else {
      toast.error("Invalid email or password");
      return { success: false, error: "Invalid credentials" };
    }
  };

  const register = async (userData) => {
    // Check if email already exists
    const exists = demoUsers.find((u) => u.email === userData.email);
    if (exists) {
      toast.error("Email already registered");
      return { success: false, error: "Email already exists" };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: null,
      rating: 0,
      reviews: 0,
      completedJobs: 0,
      skills: [],
      bio: "",
      hourlyRate: 0,
      location: "",
    };

    // Add to demo users (in real app, this would be API call)
    demoUsers.push({ ...newUser, password: userData.password });

    const userDataToStore = { ...newUser };
    delete userDataToStore.password;

    setUser(userDataToStore);
    localStorage.setItem("currentUser", JSON.stringify(userDataToStore));
    toast.success("Account created successfully!");
    return { success: true, user: userDataToStore };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully");
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    toast.success("Profile updated successfully!");
    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
