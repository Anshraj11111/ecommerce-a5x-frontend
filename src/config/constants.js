// Global API URL
export const API_BASE = import.meta.env.VITE_API_URL || 'https://ecommerce-a5x-backend.onrender.com';

// Categories
export const categories = ["All", "MicroController", "Sensor", "Motors", "Display", "Connectors", "Motor Driver", "Battery", "Charger", "Cables", "Kits", "Remote", "Custom 3D Prints"];
export const courseCategories = ["All", "Beginner", "Intermediate", "Advanced", "Arduino", "ESP32", "Robotics", "IoT", "3D Printing"];

// Formatters
export const inr = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
export const seconds = (value) => `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
export const uid = () => Math.random().toString(36).slice(2, 9);
