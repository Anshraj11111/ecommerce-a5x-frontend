import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API_BASE, uid } from "../config/constants";

// Courses seed data
const coursesSeed = [
  {
    id: "robotics-zero",
    title: "Robotics Zero to Hero",
    description: "Complete beginner course covering Arduino, sensors, motors, and building your first robot from scratch.",
    level: "BEGINNER",
    category: "Robotics",
    thumbnailUrl: "",
    instructor: "A5X Team",
    tags: ["Arduino", "Sensors", "Motors", "Beginner"],
    isPublished: true,
    isFeatured: true,
    videos: [
      { id: "v1", title: "Introduction to Robotics", duration: 480, youtubeId: "dQw4w9WgXcQ", description: "Overview of robotics and what you'll build in this course." },
      { id: "v2", title: "Setting Up Arduino IDE", duration: 720, youtubeId: "dQw4w9WgXcQ", description: "Install and configure Arduino IDE for development." },
      { id: "v3", title: "Your First LED Blink", duration: 600, youtubeId: "dQw4w9WgXcQ", description: "Write your first Arduino program to blink an LED." }
    ]
  },
  {
    id: "esp32-iot",
    title: "ESP32 IoT Masterclass",
    description: "Build connected devices with ESP32. WiFi, Bluetooth, MQTT, and cloud integration.",
    level: "INTERMEDIATE",
    category: "IoT",
    thumbnailUrl: "",
    instructor: "A5X Team",
    tags: ["ESP32", "IoT", "WiFi", "MQTT"],
    isPublished: true,
    isFeatured: false,
    videos: [
      { id: "v1", title: "ESP32 Overview", duration: 540, youtubeId: "dQw4w9WgXcQ", description: "Introduction to ESP32 capabilities." },
      { id: "v2", title: "WiFi Connection", duration: 660, youtubeId: "dQw4w9WgXcQ", description: "Connect ESP32 to WiFi networks." }
    ]
  }
];

const useAdminStore = create(persist((set, get) => ({
  products: [],
  kits: [],
  courses: coursesSeed,
  productsLoaded: false,
  kitsLoaded: false,
  error: null,

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  getErrorMessage: (response, error) => {
    if (!response) return "Network error. Please check your connection and try again.";
    if (response.status === 401) return "Authentication required. Please log in again.";
    if (response.status === 403) return "Insufficient permissions. Admin access required.";
    if (response.status === 404) return "Resource not found.";
    if (response.status >= 500) return "Server error. Please try again later.";
    try {
      const parsed = typeof error === 'string' ? JSON.parse(error) : error;
      return parsed.error || parsed.message || "An error occurred.";
    } catch {
      return error || "An error occurred.";
    }
  },

  loadProducts: async () => {
    try {
      const response = await fetch(`${API_BASE}/api/products?limit=1000`);
      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        set({ products: data.data, productsLoaded: true });
      }
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  },

  addProduct: async (product) => {
    const token = localStorage.getItem('a5x-admin-token');
    if (!token) {
      const errorMsg = "Authentication required. Please log in again.";
      set({ error: errorMsg });
      throw new Error(errorMsg);
    }
    try {
      const response = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(product)
      });
      if (response.ok) {
        const created = await response.json();
        set((state) => ({ products: [created, ...state.products], error: null }));
        return created;
      } else {
        const errorText = await response.text();
        const errorMsg = get().getErrorMessage(response, errorText);
        set({ error: errorMsg });
        throw new Error(errorMsg);
      }
    } catch (error) {
      if (!error.message.includes('Authentication required')) {
        const errorMsg = get().getErrorMessage(null, error.message);
        set({ error: errorMsg });
      }
      throw error;
    }
  },

  updateProduct: async (id, product) => {
    const token = localStorage.getItem('a5x-admin-token');
    if (!token) {
      const errorMsg = "Authentication required. Please log in again.";
      set({ error: errorMsg });
      throw new Error(errorMsg);
    }
    try {
      const response = await fetch(`${API_BASE}/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(product)
      });
      if (response.ok) {
        const updated = await response.json();
        set((state) => ({ products: state.products.map((item) => item.id === id ? updated : item), error: null }));
        return updated;
      } else {
        const errorText = await response.text();
        const errorMsg = get().getErrorMessage(response, errorText);
        set({ error: errorMsg });
        throw new Error(errorMsg);
      }
    } catch (error) {
      if (!error.message.includes('Authentication required')) {
        const errorMsg = get().getErrorMessage(null, error.message);
        set({ error: errorMsg });
      }
      throw error;
    }
  },

  deleteProduct: async (id) => {
    const token = localStorage.getItem('a5x-admin-token');
    if (!token) {
      const errorMsg = "Authentication required. Please log in again.";
      set({ error: errorMsg });
      throw new Error(errorMsg);
    }
    try {
      const response = await fetch(`${API_BASE}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        set((state) => ({ products: state.products.filter((item) => item.id !== id), error: null }));
      } else {
        const errorText = await response.text();
        const errorMsg = get().getErrorMessage(response, errorText);
        set({ error: errorMsg });
        throw new Error(errorMsg);
      }
    } catch (error) {
      if (!error.message.includes('Authentication required')) {
        const errorMsg = get().getErrorMessage(null, error.message);
        set({ error: errorMsg });
      }
      throw error;
    }
  },

  addKit: async (kit) => {
    const token = localStorage.getItem('a5x-admin-token');
    if (!token) {
      const errorMsg = "Authentication required. Please log in again.";
      set({ error: errorMsg });
      throw new Error(errorMsg);
    }
    try {
      const response = await fetch(`${API_BASE}/api/kits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(kit)
      });
      if (response.ok) {
        const created = await response.json();
        set((state) => ({ kits: [created, ...state.kits], error: null }));
        return created;
      } else {
        const errorText = await response.text();
        const errorMsg = get().getErrorMessage(response, errorText);
        set({ error: errorMsg });
        throw new Error(errorMsg);
      }
    } catch (error) {
      if (!error.message.includes('Authentication required')) {
        const errorMsg = get().getErrorMessage(null, error.message);
        set({ error: errorMsg });
      }
      throw error;
    }
  },

  updateKit: async (id, kit) => {
    const token = localStorage.getItem('a5x-admin-token');
    if (!token) {
      const errorMsg = "Authentication required. Please log in again.";
      set({ error: errorMsg });
      throw new Error(errorMsg);
    }
    console.log('=== UPDATE KIT - REQUEST PAYLOAD ===');
    console.log('Kit ID:', id);
    console.log('Payload images:', kit.images);
    console.log('Payload images length:', kit.images?.length);
    try {
      const response = await fetch(`${API_BASE}/api/kits/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(kit)
      });
      if (response.ok) {
        const updated = await response.json();
        console.log('=== UPDATE KIT - API RESPONSE ===');
        console.log('Updated kit images:', updated.images);
        set((state) => {
          const updatedKits = state.kits.map((item) => item.id === id ? updated : item);
          return { kits: updatedKits, error: null };
        });
        return updated;
      } else {
        const errorText = await response.text();
        const errorMsg = get().getErrorMessage(response, errorText);
        set({ error: errorMsg });
        throw new Error(errorMsg);
      }
    } catch (error) {
      if (!error.message.includes('Authentication required')) {
        const errorMsg = get().getErrorMessage(null, error.message);
        set({ error: errorMsg });
      }
      throw error;
    }
  },

  deleteKit: async (id) => {
    const token = localStorage.getItem('a5x-admin-token');
    if (!token) {
      const errorMsg = "Authentication required. Please log in again.";
      set({ error: errorMsg });
      throw new Error(errorMsg);
    }
    try {
      const response = await fetch(`${API_BASE}/api/kits/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        set((state) => ({ kits: state.kits.filter((item) => item.id !== id), error: null }));
      } else {
        const errorText = await response.text();
        const errorMsg = get().getErrorMessage(response, errorText);
        set({ error: errorMsg });
        throw new Error(errorMsg);
      }
    } catch (error) {
      if (!error.message.includes('Authentication required')) {
        const errorMsg = get().getErrorMessage(null, error.message);
        set({ error: errorMsg });
      }
      throw error;
    }
  },

  bulkUploadProducts: async (products) => {
    const token = localStorage.getItem('a5x-admin-token');
    if (!token) {
      const errorMsg = 'Authentication required. Please log in again.';
      set({ error: errorMsg });
      throw new Error(errorMsg);
    }
    try {
      const response = await fetch(`${API_BASE}/api/products/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ products })
      });
      if (response.ok) {
        const data = await response.json();
        await get().loadProducts();
        set({ error: null });
        return data;
      } else {
        const errorText = await response.text();
        const errorMsg = get().getErrorMessage(response, errorText);
        set({ error: errorMsg });
        throw new Error(errorMsg);
      }
    } catch (error) {
      if (!error.message.includes('Authentication required')) {
        const errorMsg = get().getErrorMessage(null, error.message);
        set({ error: errorMsg });
      }
      throw error;
    }
  },

  loadKits: async () => {
    try {
      const response = await fetch(`${API_BASE}/api/kits?limit=1000`);
      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        set({ kits: data.data, kitsLoaded: true });
      }
    } catch (error) {
      console.error('Failed to load kits:', error);
    }
  },

  addCourse: (course) => set((state) => ({ courses: [{ ...course, id: course.id || uid(), videos: course.videos || [] }, ...state.courses] })),
  updateCourse: (id, course) => set((state) => ({ courses: state.courses.map((item) => item.id === id ? { ...item, ...course } : item) })),
  deleteCourse: (id) => set((state) => ({ courses: state.courses.filter((item) => item.id !== id) })),
  addVideo: (courseId, video) => set((state) => ({ courses: state.courses.map((course) => course.id === courseId ? { ...course, videos: [...course.videos, { ...video, id: video.id || uid() }] } : course) })),
}), {
  name: "a5x-admin-data",
  partialPersist: true,
  partialize: (state) => ({
    courses: state.courses
  })
}));

export default useAdminStore;
