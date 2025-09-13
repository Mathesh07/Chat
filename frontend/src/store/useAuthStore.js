import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// Use Render backend URL in production
const SOCKET_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://chat-1-qs27.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Error in checkAuth:", error);
      }
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      await axiosInstance.post("/auth/signup", data);
      toast.success(
        "Account created successfully! Please check your email to verify your account."
      );
      return { success: true, email: data.email };
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      return { success: false };
    } finally {
      set({ isSigningUp: false });
    }
  },

  verifyEmail: async (token) => {
    try {
      const res = await axiosInstance.post("/auth/verify-email", { token });
      set({ authUser: res.data.user });
      get().connectSocket();
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser) return;

    // Prevent duplicate socket initialization
    if (socket?.connected) return;

    const newSocket = io(SOCKET_URL, {
      query: { userId: authUser._id },
      transports: ["websocket"],
      withCredentials: true,
    });

    newSocket.connect();

    // Clear old listeners before adding new ones
    newSocket.removeAllListeners();

    // Now safely add listeners
    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    newSocket.on("newMessage", (message) => {
      console.log("Received message:", message);
      // Update your message store here
    });

    set({ socket: newSocket });
  },


  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.removeAllListeners(); // prevent duplicate events
      socket.disconnect();
      set({ socket: null });
    }
  },

}));
