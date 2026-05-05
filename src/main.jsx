import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  BadgeIndianRupee,
  Brain,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
  Cpu,
  Eye,
  Filter,
  Grid2X2,
  Heart,
  Layers,
  LayoutDashboard,
  List,
  ListVideo,
  LogOut,
  Menu,
  MessageSquare,
  Minus,
  Package,
  Pencil,
  Play,
  PlayCircle,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  Trash2,
  Truck,
  Upload,
  User,
  X,
  Zap
} from "lucide-react";
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import heroRobot from "./assets/hero-robot.jpg";
import shopWave from "./assets/shop-wave.jpg";
import shopBlur from "./assets/shop-blur.jpg";
import kitRing from "./assets/kit-ring.jpg";
import learnCorridor from "./assets/learn-corridor.jpg";
import aboutArc from "./assets/about-arc.jpg";
import darkSpheres from "./assets/dark-spheres.jpg";
import a5xCarKit from "./assets/a5x-car-kit.jpg";
import heroCarRobot from "./assets/ChatGPT Image May 5, 2026, 10_52_52 AM.png";
import roboCentre from "./assets/team/robocentre.jpeg";
import unit003Hero from "./assets/team/unit003.jpeg";
import robotHands from "./assets/robot-hands.jpg";
import gridInnovation from "./assets/grid-innovation.jpg";
import neonFigure from "./assets/neon-figure.jpg";
import motorDriver from "./assets/motor-driver.jpg";
import aboutWorkshop from "./assets/about-workshop.jpg";
import learnGrid from "./assets/learn-grid.jpg";
import robotHandshake from "./assets/robot-handshake.jpg";
import kitsHeroBg from "./assets/kits-hero-bg.jpg";
import kitInnovation from "./assets/kit-innovation.jpg";
import holoHead from "./assets/holo-head.jpg";
import kitSpin035 from "./assets/kit-spin-035.jpg";
import kitSpin050 from "./assets/kit-spin-050.jpg";
import kitSpin065 from "./assets/kit-spin-065.jpg";
import kitSpin076 from "./assets/kit-spin-076.jpg";
import kitSpin080 from "./assets/kit-spin-080.jpg";
import kitSpin095 from "./assets/kit-spin-095.jpg";
import kitSpin110 from "./assets/kit-spin-110.jpg";
import kitSpin125 from "./assets/kit-spin-125.jpg";
import kitSpin140 from "./assets/kit-spin-140.jpg";
import kitSpin155 from "./assets/kit-spin-155.jpg";
import kitSpin170 from "./assets/kit-spin-170.jpg";
import kitSpin185 from "./assets/kit-spin-185.jpg";
import kitSpin200 from "./assets/kit-spin-200.jpg";
import kitSpin215 from "./assets/kit-spin-215.jpg";
import kitSpin230 from "./assets/kit-spin-230.jpg";
import robot003 from "./assets/robot-003.png";
import silhouetteFigure from "./assets/silhouette-figure.png";
import cyberPurple from "./assets/cyber-purple.png";
import robot003HQ from "./assets/robot-003-hq.jpg";
import holoPrismHead from "./assets/holo-prism-head.jpg";
import holoPrism from "./assets/holo-prism.png";
import robotUnit003 from "./assets/robot-unit-003.jpg";
import cyberAndroid from "./assets/cyber-android.jpg";
import carousel1 from "./assets/team/crausel 1.png";
import bgImage from "./assets/team/bgimage.png";
import teamAnsh from "./assets/team/Ansh.png";
import teamAnupam from "./assets/team/Anupam.png";
import teamChris from "./assets/team/Chris.JPG";
import teamAmit from "./assets/team/Amit.jpg";
import teamAditya from "./assets/team/Aditya.jpg";
import "./styles.css";
import "./home-premium.css";
import "./hero-v4.css";
import "./shop-amazon.css";
import "./learn-watch.css";

const kitSpinFrames = [kitSpin035, kitSpin050, kitSpin065, kitSpin076, kitSpin080, kitSpin095, kitSpin110, kitSpin125, kitSpin140, kitSpin155, kitSpin170, kitSpin185, kitSpin200, kitSpin215, kitSpin230];


const inr = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
const seconds = (value) => `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
const uid = () => Math.random().toString(36).slice(2, 9);

// Global API URL - uses env variable in production, localhost in development
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const categories = ["All", "MicroController", "Sensor", "Motors", "Display", "Connectors", "Motor Driver", "Battery", "Charger", "Cables", "Kits", "Remote", "Custom 3D Prints"];
const courseCategories = ["All", "Beginner", "Intermediate", "Advanced", "Arduino", "ESP32", "Robotics", "IoT", "3D Printing"];

const productsSeed = [
  { id: "esp32", name: "ESP32 Devkit V1", price: 350, mrp: 499, minQty: 1, category: "MicroController", sku: "A5X-MC-001", rating: 4.8, reviewCount: 124, inStock: true, stockCount: 45, quickDelivery: true, shortDescription: "Dual-core 240MHz with Wi-Fi + Bluetooth. The go-to board for IoT.", features: ["Dual-core Xtensa 240MHz", "Wi-Fi 802.11 b/g/n", "Bluetooth 4.2 + BLE", "34 GPIO pins", "Ultra-low power co-processor"], specs: { "CPU": "Xtensa LX6 Dual-Core 240MHz", "Flash": "4MB", "SRAM": "520KB", "GPIO": "34 pins", "ADC": "18 channels", "Voltage": "3.3V", "USB": "Micro-USB", "Dimensions": "55 x 28 mm" }, compatibility: ["Arduino IDE", "MicroPython", "ESP-IDF", "PlatformIO"], bulkPricing: [{ min: 1, max: 9, price: 350 }, { min: 10, max: 49, price: 320 }, { min: 50, max: 999, price: 290 }], badges: ["Best Seller", "IoT Ready"], frequentlyBoughtWith: ["oled", "hcsr04"], relatedIds: ["esp8266", "esp32cam", "uno-r3"] },
  { id: "uno-r3", name: "Arduino Uno R3 Compatible", price: 300, mrp: 450, minQty: 1, category: "MicroController", sku: "A5X-MC-002", rating: 4.6, reviewCount: 89, inStock: true, stockCount: 60, quickDelivery: true, shortDescription: "Classic ATmega328P board. Perfect for beginners and prototyping.", features: ["ATmega328P processor", "14 digital I/O pins", "6 analog inputs", "USB Type-B", "Extensive library support"], specs: { "CPU": "ATmega328P 16MHz", "Flash": "32KB", "SRAM": "2KB", "GPIO": "14 digital + 6 analog", "Voltage": "5V", "USB": "Type-B", "Dimensions": "68.6 x 53.4 mm" }, compatibility: ["Arduino IDE", "PlatformIO"], bulkPricing: [{ min: 1, max: 9, price: 300 }, { min: 10, max: 49, price: 270 }, { min: 50, max: 999, price: 240 }], badges: ["Beginner Friendly"], frequentlyBoughtWith: ["l298n", "hcsr04"], relatedIds: ["nano", "mega", "uno-smd"] },
  { id: "uno-smd", name: "Arduino UNO R3 SMD ATmega328", price: 249, mrp: 399, minQty: 1, category: "MicroController", sku: "A5X-MC-003", rating: 4.5, reviewCount: 56, inStock: true, stockCount: 30, shortDescription: "SMD variant of the classic Uno. Compact and reliable.", features: ["SMD ATmega328P", "Same pinout as Uno R3", "Compact form factor"], specs: { "CPU": "ATmega328P 16MHz", "Flash": "32KB", "SRAM": "2KB", "Voltage": "5V" }, compatibility: ["Arduino IDE"], bulkPricing: [{ min: 1, max: 9, price: 249 }, { min: 10, max: 49, price: 220 }], badges: [], frequentlyBoughtWith: ["lcd16"], relatedIds: ["uno-r3", "nano"] },
  { id: "esp8266", name: "ESP8266 NodeMCU", price: 190, mrp: 299, minQty: 1, category: "MicroController", sku: "A5X-MC-004", rating: 4.7, reviewCount: 203, inStock: true, stockCount: 80, quickDelivery: true, shortDescription: "Wi-Fi enabled microcontroller. Best value for IoT projects.", features: ["ESP8266 Wi-Fi SoC", "80/160MHz clock", "4MB Flash", "GPIO, I2C, SPI, ADC"], specs: { "CPU": "Tensilica L106 80MHz", "Flash": "4MB", "GPIO": "11 pins", "ADC": "1 channel (10-bit)", "Voltage": "3.3V", "WiFi": "802.11 b/g/n" }, compatibility: ["Arduino IDE", "MicroPython", "NodeMCU Lua"], bulkPricing: [{ min: 1, max: 9, price: 190 }, { min: 10, max: 49, price: 165 }], badges: ["Value Pick"], frequentlyBoughtWith: ["oled", "tp4056"], relatedIds: ["esp32", "esp32cam"] },
  { id: "esp32cam", name: "ESP32 CAM Module", price: 599, mrp: 849, minQty: 1, category: "MicroController", sku: "A5X-MC-005", rating: 4.9, reviewCount: 78, inStock: true, stockCount: 12, shortDescription: "ESP32 with 2MP camera. Stream video over Wi-Fi.", features: ["OV2640 2MP Camera", "ESP32-S chip", "MicroSD slot", "Wi-Fi + BT", "Face detection support"], specs: { "CPU": "ESP32-S 240MHz", "Camera": "OV2640 2MP", "Flash": "4MB", "PSRAM": "4MB", "MicroSD": "Up to 4GB", "Voltage": "5V" }, compatibility: ["Arduino IDE", "ESP-IDF"], bulkPricing: [{ min: 1, max: 9, price: 599 }, { min: 10, max: 49, price: 540 }], badges: ["New Arrival", "Camera"], frequentlyBoughtWith: ["18650", "tp4056"], relatedIds: ["esp32", "esp8266"] },
  { id: "nano", name: "Arduino Nano V3", price: 199, mrp: 349, minQty: 1, category: "MicroController", sku: "A5X-MC-006", rating: 4.5, reviewCount: 145, inStock: true, stockCount: 90, shortDescription: "Compact ATmega328P board. Breadboard-friendly form factor.", features: ["ATmega328P", "Mini-USB", "Breadboard compatible", "30 pins"], specs: { "CPU": "ATmega328P 16MHz", "Flash": "32KB", "SRAM": "2KB", "GPIO": "22 pins", "Voltage": "5V", "Dimensions": "45 x 18 mm" }, compatibility: ["Arduino IDE", "PlatformIO"], bulkPricing: [{ min: 1, max: 9, price: 199 }, { min: 10, max: 49, price: 175 }], badges: ["Compact"], frequentlyBoughtWith: ["l298n", "mpu6050"], relatedIds: ["uno-r3", "mega"] },
  { id: "mega", name: "Arduino Mega 2560", price: 999, mrp: 1499, minQty: 1, category: "MicroController", sku: "A5X-MC-007", rating: 4.8, reviewCount: 67, inStock: true, stockCount: 8, shortDescription: "54 I/O pins, 256KB flash. For complex robotics projects.", features: ["ATmega2560", "54 digital I/O pins", "16 analog inputs", "4 UARTs", "256KB flash"], specs: { "CPU": "ATmega2560 16MHz", "Flash": "256KB", "SRAM": "8KB", "GPIO": "54 digital + 16 analog", "Voltage": "5V", "Dimensions": "101.5 x 53.3 mm" }, compatibility: ["Arduino IDE", "PlatformIO"], bulkPricing: [{ min: 1, max: 9, price: 999 }, { min: 10, max: 49, price: 899 }], badges: ["Pro Choice"], frequentlyBoughtWith: ["l298n", "oled"], relatedIds: ["uno-r3", "pico"] },
  { id: "pico", name: "Raspberry Pi Pico", price: 549, mrp: 799, minQty: 1, category: "MicroController", sku: "A5X-MC-008", rating: 4.7, reviewCount: 92, inStock: true, stockCount: 25, shortDescription: "RP2040 dual-core ARM. The future of microcontrollers.", features: ["RP2040 dual-core ARM Cortex-M0+", "264KB SRAM", "2MB Flash", "26 GPIO", "PIO state machines"], specs: { "CPU": "RP2040 Dual-Core 133MHz", "Flash": "2MB", "SRAM": "264KB", "GPIO": "26 pins", "ADC": "3 channels (12-bit)", "Voltage": "3.3V" }, compatibility: ["MicroPython", "C/C++", "CircuitPython"], bulkPricing: [{ min: 1, max: 9, price: 549 }, { min: 10, max: 49, price: 490 }], badges: ["Trending"], frequentlyBoughtWith: ["oled", "mpu6050"], relatedIds: ["esp32", "nano"] },
  { id: "l298n", name: "L298N Motor Driver", price: 85, mrp: 149, minQty: 1, category: "Motor Driver", sku: "A5X-MD-001", rating: 4.8, reviewCount: 312, inStock: true, stockCount: 150, quickDelivery: true, imageUrl: motorDriver, shortDescription: "Dual H-Bridge driver. Control 2 DC motors or 1 stepper.", features: ["Dual H-Bridge", "Up to 2A per channel", "5V–35V operating", "Built-in 5V regulator", "PWM speed control"], specs: { "Channels": "2", "Max Current": "2A per channel", "Voltage": "5V–35V", "Logic": "5V", "Dimensions": "43 x 43 x 27 mm" }, compatibility: ["Arduino", "ESP32", "Raspberry Pi"], bulkPricing: [{ min: 1, max: 9, price: 85 }, { min: 10, max: 49, price: 72 }, { min: 50, max: 999, price: 60 }], badges: ["Best Seller"], frequentlyBoughtWith: ["uno-r3", "18650"], relatedIds: ["a4988"] },
  { id: "a4988", name: "A4988 Stepper Driver", price: 120, mrp: 199, minQty: 1, category: "Motor Driver", sku: "A5X-MD-002", rating: 4.6, reviewCount: 87, inStock: true, stockCount: 40, shortDescription: "Microstepping stepper motor driver. Up to 1/16 step.", features: ["Up to 1/16 microstepping", "Adjustable current limiting", "Automatic current decay", "3.3V/5V compatible"], specs: { "Max Current": "2A (with heatsink)", "Voltage": "8V–35V", "Step Modes": "Full, 1/2, 1/4, 1/8, 1/16", "Logic": "3.3V–5V" }, compatibility: ["Arduino", "GRBL", "Marlin"], bulkPricing: [{ min: 1, max: 9, price: 120 }, { min: 10, max: 49, price: 100 }], badges: ["3D Printing"], frequentlyBoughtWith: ["mega", "18650"], relatedIds: ["l298n"] },
  { id: "hcsr04", name: "HC-SR04 Ultrasonic Sensor", price: 45, mrp: 89, minQty: 1, category: "Sensor", sku: "A5X-SN-001", rating: 4.7, reviewCount: 267, inStock: true, stockCount: 200, quickDelivery: true, shortDescription: "2cm–400cm distance measurement. Essential for obstacle avoidance.", features: ["2cm–400cm range", "3mm accuracy", "15° beam angle", "Trigger/Echo pins"], specs: { "Range": "2–400 cm", "Accuracy": "±3mm", "Beam Angle": "15°", "Voltage": "5V", "Current": "15mA", "Frequency": "40kHz" }, compatibility: ["Arduino", "ESP32", "Raspberry Pi", "MicroPython"], bulkPricing: [{ min: 1, max: 9, price: 45 }, { min: 10, max: 49, price: 38 }, { min: 50, max: 999, price: 30 }], badges: ["Essential"], frequentlyBoughtWith: ["uno-r3", "l298n"], relatedIds: ["mpu6050"] },
  { id: "mpu6050", name: "MPU-6050 IMU 6DOF", price: 120, mrp: 199, minQty: 1, category: "Sensor", sku: "A5X-SN-002", rating: 4.8, reviewCount: 156, inStock: true, stockCount: 35, shortDescription: "3-axis accelerometer + 3-axis gyroscope. For motion tracking.", features: ["3-axis accelerometer", "3-axis gyroscope", "Digital motion processor", "I2C interface", "16-bit ADC"], specs: { "Accelerometer": "±2/4/8/16g", "Gyroscope": "±250/500/1000/2000°/s", "Interface": "I2C (400kHz)", "Voltage": "3.3V–5V", "Current": "3.9mA" }, compatibility: ["Arduino", "ESP32", "Raspberry Pi"], bulkPricing: [{ min: 1, max: 9, price: 120 }, { min: 10, max: 49, price: 100 }], badges: ["Motion"], frequentlyBoughtWith: ["esp32", "nano"], relatedIds: ["hcsr04"] },
  { id: "oled", name: "OLED 0.96 I2C Display", price: 180, mrp: 299, minQty: 1, category: "Display", sku: "A5X-DI-001", rating: 4.9, reviewCount: 198, inStock: true, stockCount: 55, shortDescription: "128x64 pixel OLED. Crystal clear display over I2C.", features: ["128x64 pixels", "SSD1306 driver", "I2C interface", "Self-emitting — no backlight", "Wide viewing angle"], specs: { "Resolution": "128 x 64", "Driver": "SSD1306", "Interface": "I2C", "Voltage": "3.3V–5V", "Size": "0.96 inch", "Dimensions": "27 x 27 x 4 mm" }, compatibility: ["Arduino", "ESP32", "Raspberry Pi", "MicroPython"], bulkPricing: [{ min: 1, max: 9, price: 180 }, { min: 10, max: 49, price: 155 }], badges: ["Popular"], frequentlyBoughtWith: ["esp32", "nano"], relatedIds: ["lcd16"] },
  { id: "lcd16", name: "16x2 LCD with I2C", price: 70, mrp: 129, minQty: 1, category: "Display", sku: "A5X-DI-002", rating: 4.5, reviewCount: 134, inStock: true, stockCount: 70, shortDescription: "16x2 character LCD with I2C backpack. Only 2 wires needed.", features: ["16x2 character display", "I2C backpack included", "Blue backlight", "Adjustable contrast"], specs: { "Characters": "16 x 2", "Interface": "I2C (PCF8574)", "Backlight": "Blue LED", "Voltage": "5V", "Dimensions": "80 x 36 x 12 mm" }, compatibility: ["Arduino", "ESP32"], bulkPricing: [{ min: 1, max: 9, price: 70 }, { min: 10, max: 49, price: 58 }], badges: [], frequentlyBoughtWith: ["uno-r3"], relatedIds: ["oled"] },
  { id: "18650", name: "18650 LiPo Battery 3000mAh", price: 220, mrp: 349, minQty: 1, category: "Battery", sku: "A5X-BA-001", rating: 4.6, reviewCount: 89, inStock: true, stockCount: 100, shortDescription: "3.7V rechargeable lithium cell. Powers your robots.", features: ["3000mAh capacity", "3.7V nominal", "Rechargeable 500+ cycles", "Protected circuit"], specs: { "Capacity": "3000mAh", "Voltage": "3.7V nominal", "Max Discharge": "2A", "Dimensions": "18 x 65 mm", "Weight": "48g" }, compatibility: ["All boards (with regulator)"], bulkPricing: [{ min: 1, max: 9, price: 220 }, { min: 10, max: 49, price: 190 }], badges: ["Power"], frequentlyBoughtWith: ["tp4056", "l298n"], relatedIds: ["tp4056"] },
  { id: "tp4056", name: "TP4056 Charger Module", price: 35, mrp: 69, minQty: 1, category: "Charger", sku: "A5X-CH-001", rating: 4.7, reviewCount: 210, inStock: true, stockCount: 180, shortDescription: "Micro-USB Li-Ion charger with protection circuit.", features: ["1A charge current", "Micro-USB input", "Overcharge protection", "Over-discharge protection", "LED indicators"], specs: { "Input": "5V Micro-USB", "Charge Current": "1A max", "Battery": "3.7V Li-Ion/LiPo", "Protection": "Overcharge + Overdischarge", "Dimensions": "25 x 19 mm" }, compatibility: ["18650 cells", "LiPo packs"], bulkPricing: [{ min: 1, max: 9, price: 35 }, { min: 10, max: 49, price: 28 }, { min: 50, max: 999, price: 22 }], badges: ["Essential"], frequentlyBoughtWith: ["18650"], relatedIds: ["18650"] }
];

const kitsSeed = [
  { id: "starter", name: "Starter Robotics Kit", tier: "STARTER KIT", price: 1499, description: "Build your first robot. Motors, sensors, Arduino, and step-by-step guide.", includes: ["Arduino Uno", "L298N Driver", "2x DC Motors", "HC-SR04", "Jumper wires"], rating: 4.7 },
  { id: "line-follower", name: "Line Follower Kit", tier: "PRO KIT", price: 1999, description: "Complete autonomous line-follower with IR array, code, and chassis.", includes: ["Arduino Nano", "IR Array Sensor", "L298N", "Chassis", "LiPo Battery"], rating: 4.8 },
  { id: "obstacle", name: "Obstacle Avoidance Kit", tier: "PRO KIT", price: 2299, description: "Ultrasonic navigation, ESP32, chassis, and full production code.", includes: ["ESP32", "3x HC-SR04", "Motor Driver", "Chassis", "Code Package"], rating: 4.9 },
  { id: "motor-drive", name: "Dual Motor Drive Pack", tier: "PRO KIT", price: 3499, imageUrl: a5xCarKit, description: "Matched motors, driver, wiring, mounts, and calibration notes.", includes: ["2x N20 Motors", "L298N", "Encoder Set", "Mounts", "Wiring Harness"], rating: 4.7 },
  { id: "arm-builder", name: "Arm Builder Pack", tier: "ELITE KIT", price: 5999, description: "Servo-based 4-DOF robot arm with controller board and full mounts.", includes: ["4x MG996R Servo", "Controller Board", "Acrylic Frame", "PSU", "Code"], rating: 4.9 },
  { id: "iot-starter", name: "IOT Starter Pack", tier: "STARTER KIT", price: 1799, description: "ESP8266, sensors, cloud dashboard setup, and complete tutorial.", includes: ["ESP8266", "DHT22", "Relay", "OLED", "Cloud Dashboard Tutorial"], rating: 4.6 }
];

const coursesSeed = [
  {
    id: "robotics-zero",
    title: "Robotics From Zero",
    description: "Start with LEDs, sensors, motor drivers, then finish with a complete autonomous rover.",
    level: "BEGINNER",
    category: "Robotics",
    thumbnailUrl: a5xCarKit,
    instructor: "Aarav Menon",
    tags: ["Arduino", "Motors", "Sensors"],
    isPublished: true,
    isFeatured: true,
    createdAt: "2026-04-01",
    videos: [
      { id: "intro", title: "Parts, Power, and Safety", description: "A calm first bench setup for new builders.", videoUrl: "", thumbnailUrl: a5xCarKit, duration: 512, relatedProducts: ["uno-r3", "l298n"], publishedAt: "2026-04-01" },
      { id: "driver", title: "Driving DC Motors with L298N", description: "Wire the driver, set PWM, and test direction.", videoUrl: "", thumbnailUrl: motorDriver, duration: 634, relatedProducts: ["l298n", "18650"], publishedAt: "2026-04-02" },
      { id: "avoid", title: "Obstacle Avoidance Logic", description: "Use ultrasonic distance readings to steer.", videoUrl: "", thumbnailUrl: a5xCarKit, duration: 706, relatedProducts: ["hcsr04", "esp32"], publishedAt: "2026-04-03" }
    ]
  },
  { id: "esp32-iot", title: "ESP32 IoT Control Lab", description: "Wi-Fi control, dashboards, and sensor telemetry for robotics.", level: "INTERMEDIATE", category: "ESP32", thumbnailUrl: neonFigure, instructor: "Nisha Rao", tags: ["ESP32", "IoT"], isPublished: true, isFeatured: false, createdAt: "2026-04-05", videos: [{ id: "wifi", title: "ESP32 Wi-Fi Basics", description: "Connect, publish, and monitor device state.", videoUrl: "", thumbnailUrl: neonFigure, duration: 588, relatedProducts: ["esp32", "oled"], publishedAt: "2026-04-05" }] },
  { id: "printing", title: "3D Printed Robot Frames", description: "Design printable mounts and durable chassis geometry.", level: "ADVANCED", category: "3D Printing", thumbnailUrl: gridInnovation, instructor: "Dev Patel", tags: ["CAD", "Frames"], isPublished: true, isFeatured: false, createdAt: "2026-04-08", videos: [{ id: "mounts", title: "Motor Mount Tolerances", description: "Make parts that assemble cleanly.", videoUrl: "", thumbnailUrl: gridInnovation, duration: 420, relatedProducts: ["l298n"], publishedAt: "2026-04-08" }] },
  { id: "arduino-basics", title: "Arduino Maker Basics", description: "Inputs, outputs, displays, and readable code habits.", level: "BEGINNER", category: "Arduino", thumbnailUrl: robotHands, instructor: "Meera Iyer", tags: ["Arduino", "Display"], isPublished: true, isFeatured: false, createdAt: "2026-04-10", videos: [{ id: "display", title: "LCD and OLED Output", description: "Show clean robot state on small displays.", videoUrl: "", thumbnailUrl: robotHands, duration: 480, relatedProducts: ["uno-r3", "oled", "lcd16"], publishedAt: "2026-04-10" }] }
];

const useCartStore = create(persist((set, get) => ({
  open: false,
  items: [],
  toggle: () => set((state) => ({ open: !state.open })),
  add: (item) => set((state) => {
    const found = state.items.find((line) => line.id === item.id);
    return { open: true, items: found ? state.items.map((line) => line.id === item.id ? { ...line, qty: line.qty + 1 } : line) : [...state.items, { ...item, qty: 1 }] };
  }),
  inc: (id) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item) })),
  dec: (id) => set((state) => ({ items: state.items.flatMap((item) => item.id === id ? (item.qty > 1 ? [{ ...item, qty: item.qty - 1 }] : []) : [item]) })),
  remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.qty, 0)
}), { name: "a5x-cart" }));

const useWishlistStore = create(persist((set, get) => ({
  ids: [],
  toggle: (id) => set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
  has: (id) => get().ids.includes(id),
}), { name: "a5x-wishlist" }));

const useCompareStore = create((set, get) => ({
  ids: [],
  toggle: (id) => set((s) => {
    if (s.ids.includes(id)) return { ids: s.ids.filter((x) => x !== id) };
    if (s.ids.length >= 3) return s;
    return { ids: [...s.ids, id] };
  }),
  has: (id) => get().ids.includes(id),
  clear: () => set({ ids: [] }),
}));

const useRecentlyViewedStore = create(persist((set) => ({
  ids: [],
  add: (id) => set((s) => ({ ids: [id, ...s.ids.filter((x) => x !== id)].slice(0, 10) })),
}), { name: "a5x-recent" }));

const useAdminStore = create(persist((set) => ({
  products: productsSeed,
  kits: kitsSeed,
  courses: coursesSeed,
  addProduct: (product) => set((state) => ({ products: [{ ...product, id: product.id || uid() }, ...state.products] })),
  updateProduct: (id, product) => set((state) => ({ products: state.products.map((item) => item.id === id ? { ...item, ...product } : item) })),
  deleteProduct: (id) => set((state) => ({ products: state.products.filter((item) => item.id !== id) })),
  addKit: (kit) => set((state) => ({ kits: [{ ...kit, id: kit.id || uid() }, ...state.kits] })),
  updateKit: (id, kit) => set((state) => ({ kits: state.kits.map((item) => item.id === id ? { ...item, ...kit } : item) })),
  deleteKit: (id) => set((state) => ({ kits: state.kits.filter((item) => item.id !== id) })),
  addCourse: (course) => set((state) => ({ courses: [{ ...course, id: course.id || uid(), videos: course.videos || [] }, ...state.courses] })),
  updateCourse: (id, course) => set((state) => ({ courses: state.courses.map((item) => item.id === id ? { ...item, ...course } : item) })),
  deleteCourse: (id) => set((state) => ({ courses: state.courses.filter((item) => item.id !== id) })),
  addVideo: (courseId, video) => set((state) => ({ courses: state.courses.map((course) => course.id === courseId ? { ...course, videos: [...course.videos, { ...video, id: video.id || uid() }] } : course) }))
}), { name: "a5x-admin-data" }));

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function useWatchProgress(course) {
  const key = "a5x-watch-progress";
  const [data, setData] = useState(() => JSON.parse(localStorage.getItem(key) || "{}"));
  const save = (next) => { setData(next); localStorage.setItem(key, JSON.stringify(next)); };
  const videos = course?.videos || [];
  return {
    isWatched: (videoId) => Boolean(data[course?.id]?.includes(videoId)),
    markWatched: (videoId) => { if (course?.id) save({ ...data, [course.id]: Array.from(new Set([...(data[course.id] || []), videoId])) }); },
    getCourseProgress: () => course && videos.length ? Math.round(((data[course.id] || []).length / videos.length) * 100) : 0
  };
}

function useFileUpload({ types = [], maxMb = 5 } = {}) {
  const [state, setState] = useState({ progress: 0, previewUrl: "", storedKey: "", error: "", duration: 0 });
  const upload = (file) => {
    if (!file) return;
    if (types.length && !types.some((type) => file.type.includes(type))) return setState({ progress: 0, previewUrl: "", storedKey: "", error: "Unsupported file type", duration: 0 });
    if (file.size > maxMb * 1024 * 1024) return setState({ progress: 0, previewUrl: "", storedKey: "", error: `Max ${maxMb}MB`, duration: 0 });
    const previewUrl = URL.createObjectURL(file);
    const storedKey = `a5x-upload-${Date.now()}-${file.name}`;
    setState({ progress: 12, previewUrl, storedKey, error: "", duration: 0 });
    const timer = setInterval(() => setState((current) => current.progress >= 100 ? current : { ...current, progress: Math.min(100, current.progress + 18) }), 220);
    setTimeout(() => clearInterval(timer), 1600);
    if (file.type.includes("video")) {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => setState((current) => ({ ...current, duration: Math.round(video.duration || 0) }));
      video.src = previewUrl;
    }
    // Replace with actual S3/Cloudinary upload in production.
  };
  return { ...state, upload };
}

function Navbar() {
  const scrolled = useScrolled();
  const [mobile, setMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.qty, 0));
  const wishCount = useWishlistStore((state) => state.ids.length);
  const toggle = useCartStore((state) => state.toggle);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop", dropdown: ["All Products", "Microcontrollers", "Sensors", "Motor Drivers"] },
    { label: "Kits", to: "/kits", dropdown: ["Starter Kit", "Pro Kits", "Elite Kits"] },
    { label: "Learn", to: "/learn", dropdown: ["All Courses", "Robotics", "IoT"] },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) { navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`); setMobile(false); }
  };

  return (
    <>
      <header className={`nav-v2 ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="nav-v2-logo" to="/" onClick={() => setMobile(false)}>
          <span>A5X</span><small>ROBOTICS</small>
        </Link>
        <nav className="nav-v2-links">
          {navItems.map(({ label, to, dropdown }) => (
            <div key={label} className={`nav-v2-item ${dropdown ? "has-dropdown" : ""}`}>
              <NavLink className={({ isActive }) => `nav-v2-link ${isActive ? "active" : ""}`} to={to}>
                {label}{dropdown && <ChevronDown size={13} className="nav-v2-chevron" />}
              </NavLink>
              {dropdown && (
                <div className="nav-v2-dropdown">
                  {dropdown.map((item) => (
                    <Link key={item} className="nav-v2-dropdown-item" to={to}>{item}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <form className="nav-v2-search" onSubmit={handleSearch}>
          <Search size={15} className="nav-v2-search-icon" />
          <input type="text" placeholder="Search for products, kits..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} aria-label="Search" />
        </form>
        <div className="nav-v2-actions">
          <button className="nav-v2-action-btn" onClick={() => navigate('/wishlist')} aria-label="Wishlist">
            <Heart size={18} /><span>Wishlist</span>
            {wishCount > 0 && <b className="nav-v2-badge">{wishCount}</b>}
          </button>
          <button className="nav-v2-action-btn" onClick={toggle} aria-label="Cart">
            <ShoppingCart size={18} /><span>Cart</span>
            {count > 0 && <b className="nav-v2-badge">{count}</b>}
          </button>
          <button className="nav-v2-action-btn nav-v2-profile" onClick={() => navigate('/account')} aria-label="Account">
            <User size={18} />
          </button>
          <button className="icon-btn mobile-only" onClick={() => setMobile(true)} aria-label="Open menu" aria-expanded={mobile}>
            <Menu size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobile && (
          <motion.div className="mobile-menu-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <motion.div className="mobile-menu-backdrop" onClick={() => setMobile(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div className="mobile-menu-panel" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 300 }}>
              <div className="mobile-menu-header">
                <Link className="logo" to="/" onClick={() => setMobile(false)}><span>A5X</span><small>ROBOTICS</small></Link>
                <button className="mobile-menu-close" onClick={() => setMobile(false)} aria-label="Close menu"><X size={22} /></button>
              </div>
              <form className="mobile-search" onSubmit={handleSearch}>
                <Search size={15} />
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </form>
              <nav className="mobile-menu-nav">
                {navItems.map(({ label, to }, index) => (
                  <motion.div key={label} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.05 + 0.1 }}>
                    <NavLink className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} to={to} onClick={() => setMobile(false)}>
                      <span className="mobile-nav-label">{label}</span>
                      <ChevronRight size={16} className="mobile-nav-arrow" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <motion.div className="mobile-menu-footer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <button className="btn" onClick={() => { toggle(); setMobile(false); }} style={{ width: '100%', justifyContent: 'center' }}>
                  <ShoppingCart size={16} /> Cart {count > 0 && `(${count})`}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MainLayout() {
  return <><AuroraBackground /><TwinkleField /><FloatingOrbs /><CustomCursor /><Navbar /><Outlet /><Footer /><CartDrawer /></>;
}

function ButtonLink({ to, children, ghost }) {
  return <Link className={ghost ? "btn ghost" : "btn"} to={to}>{children}</Link>;
}

function CategoryTabs({ tabs, active, onChange }) {
  return <div className="tabs">{tabs.map((tab) => <button className={active === tab ? "active" : ""} key={tab} onClick={() => onChange(tab)}>{tab}</button>)}</div>;
}

function StarRating({ rating, size = 14 }) {
  return <span className="star-rating">{[1,2,3,4,5].map(i => <Star key={i} size={size} className={i <= Math.round(rating) ? "star-filled" : "star-empty"} />)}</span>;
}

function StockBadge({ stock, count }) {
  if (!stock) return <span className="stock-badge out">Out of Stock</span>;
  if (count <= 10) return <span className="stock-badge low">Low Stock ({count} left)</span>;
  return <span className="stock-badge in">In Stock</span>;
}

function ProductCard({ product, compact, onQuickView }) {
  const add = useCartStore((s) => s.add);
  const wishToggle = useWishlistStore((s) => s.toggle);
  const wishlisted = useWishlistStore((s) => s.ids.includes(product.id));
  const compToggle = useCompareStore((s) => s.toggle);
  const compared = useCompareStore((s) => s.ids.includes(product.id));
  const discount = product.mrp ? Math.round((1 - product.price / product.mrp) * 100) : 0;
  return (
    <motion.article className={`product-card glass-card ${compact ? "compact" : ""}`} layout whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div className="product-image">
        <img src={product.imageUrl || motorDriver} alt={product.name} />
        <span className="category-pill">{product.category}</span>
        <button className={`wishlist-btn ${wishlisted ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); wishToggle(product.id); }} aria-label="Wishlist"><Heart size={18} /></button>
        {product.badges?.length > 0 && <span className="product-badge">{product.badges[0]}</span>}
        <div className="quick-view-overlay"><button className="quick-view-btn" onClick={() => onQuickView?.(product)}><Eye size={16} /> Quick View</button></div>
      </div>
      <div className="product-body">
        <Link to={`/shop/${product.id}`} className="product-name-link"><h3>{product.name}</h3></Link>
        <p className="sku">{product.sku}</p>
        <div className="rating-row"><StarRating rating={product.rating} /><span className="review-count">({product.reviewCount || 0})</span></div>
        <div className="price-row"><strong>{inr(product.price)}</strong><span>/pcs</span>{product.mrp && <><s className="mrp">{inr(product.mrp)}</s><span className="discount-badge">{discount}% off</span></>}</div>
        <StockBadge stock={product.inStock} count={product.stockCount} />
        <p className="delivery-est"><Truck size={13} /> Ships in 2–3 days</p>
        <div className="card-actions">
          <button className="add-quote-btn" onClick={() => add(product)} disabled={!product.inStock}>Add to Quote</button>
          <label className="compare-check"><input type="checkbox" checked={compared} onChange={() => compToggle(product.id)} /><span>Compare</span></label>
        </div>
      </div>
    </motion.article>
  );
}

function Kit3DSpin({ size = 320 }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setFrame((f) => (f + 1) % kitSpinFrames.length), 120);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="kit-3d-spin" style={{ width: size, height: size * 0.6 }}>
      {kitSpinFrames.map((src, i) => <img key={i} src={src} alt="" style={{ opacity: i === frame ? 1 : 0, position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', transition: 'opacity .1s ease' }} />)}
    </div>
  );
}

function KitCard({ kit }) {
  const add = useCartStore((state) => state.add);
  return (
    <Link to={`/kits/${kit.id}`} className="kit-card glass-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="kit-image">
        <img src={kit.imageUrl || kitInnovation} alt={kit.name} />
        <span className={`tier ${kit.tier.toLowerCase().split(" ")[0]}`}>{kit.tier}</span>
        <span className="rating">★ {kit.rating}</span>
        <div className="kit-image-glow" />
      </div>
      <div className="kit-body">
        <h3>{kit.name}</h3>
        <p>{kit.description}</p>
        <div className="tag-row">{kit.includes.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>
        <div className="kit-price">{inr(Number(kit.price))}</div>
        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); add({ ...kit, category: "Kits", sku: kit.tier }); }}>Add to Cart</button>
      </div>
    </Link>
  );
}

function CourseMiniCard({ course }) {
  const videos = course.videos || [];
  const total = videos.reduce((sum, video) => sum + (video.duration || 0), 0);
  const firstVideoId = videos[0]?.id || "";
  const linkTo = firstVideoId ? `/learn/${course.id}/${firstVideoId}` : `/learn/${course.id}`;
  return (
    <article className="course-mini glass-card">
      <Link to={linkTo} className="course-thumb">
        <img src={course.thumbnailUrl} alt={course.title} />
        <motion.span whileHover={{ scale: 1.08 }}><Play size={20} fill="currentColor" /></motion.span>
        <b className={`level ${(course.level || "beginner").toLowerCase()}`}>{course.level || "BEGINNER"}</b>
        {course.createdAt > "2026-04-07" && <em>NEW</em>}
      </Link>
      <div>
        <h3>{course.title}</h3>
        <p><ListVideo size={14} /> {videos.length} videos · {Math.round(total / 60)}m</p>
        <Link className="mini-btn" to={linkTo}>Watch Course</Link>
      </div>
    </article>
  );
}

function LargeCourseCard({ course }) {
  const videos = course.videos || [];
  const tags = course.tags || [];
  const firstVideoId = videos[0]?.id || "";
  const linkTo = firstVideoId ? `/learn/${course.id}/${firstVideoId}` : `/learn/${course.id}`;
  return (
    <article className="large-course glass-card">
      <div className="large-thumb">
        <img src={course.thumbnailUrl} alt={course.title} />
        <span><Play size={28} fill="currentColor" /></span>
        <b className={`level ${(course.level || "beginner").toLowerCase()}`}>{course.level || "BEGINNER"}</b>
        <em>{Math.round(videos.reduce((sum, video) => sum + (video.duration || 0), 0) / 60)}m</em>
      </div>
      <div className="large-copy">
        <h3>{course.title}</h3>
        <p className="byline">By {course.instructor}</p>
        <p>{course.description}</p>
        <div className="tag-row">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <p><ListVideo size={16} /> {videos.length} videos</p>
        <ButtonLink to={linkTo}>Start Course</ButtonLink>
      </div>
    </article>
  );
}

function useParallax(speed = 0.3) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * speed);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return offset;
}

function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef(null);
  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnView]);
  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, end, duration]);
  return { count, ref };
}

function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; ctx.scale(2, 2); };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 255, ${p.alpha})`;
        ctx.fill();
      });
      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 200, 255, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="hero-particles" />;
}

function TypewriterText({ texts, speed = 80, pause = 2000 }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[textIndex];
    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => setCharIndex(charIndex + 1), speed);
      return () => clearTimeout(t);
    } else if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    } else if (deleting && charIndex > 0) {
      const t = setTimeout(() => setCharIndex(charIndex - 1), speed / 2);
      return () => clearTimeout(t);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    }
  }, [charIndex, deleting, textIndex, texts, speed, pause]);
  return <span>{texts[textIndex].slice(0, charIndex)}<span className="blink-cursor">|</span></span>;
}

/* ─── SCI-FI ANIMATION INFRASTRUCTURE ─── */

function AuroraBackground() {
  return <div className="aurora-bg" />;
}

function TwinkleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const resize = () => { canvas.width = window.innerWidth * 2; canvas.height = window.innerHeight * 2; ctx.scale(2, 2); };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.1,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005,
      });
    }
    const draw = (time) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        const alpha = p.baseAlpha * (0.5 + 0.5 * Math.sin(time * p.speed + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="twinkle-field" />;
}

function FloatingOrbs() {
  const orbs = [
    { size: 300, color: "rgba(0,245,255,.08)", top: "10%", left: "5%", dur: 8 },
    { size: 250, color: "rgba(124,58,237,.07)", top: "60%", left: "80%", dur: 10 },
    { size: 200, color: "rgba(240,4,127,.05)", top: "30%", left: "50%", dur: 12 },
    { size: 180, color: "rgba(0,245,255,.06)", top: "80%", left: "20%", dur: 9 },
    { size: 220, color: "rgba(124,58,237,.05)", top: "15%", left: "70%", dur: 11 },
    { size: 160, color: "rgba(0,245,255,.04)", top: "50%", left: "35%", dur: 14 },
  ];
  return orbs.map((orb, i) => (
    <div key={i} className="floating-orb" style={{
      width: orb.size, height: orb.size, top: orb.top, left: orb.left,
      background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
      animation: `orb-drift-${(i % 3) + 1} ${orb.dur}s ease-in-out infinite`,
    }} />
  ));
}

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const lerp = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (dotRef.current) { dotRef.current.style.left = mouseX + "px"; dotRef.current.style.top = mouseY + "px"; }
      if (ringRef.current) { ringRef.current.style.left = ringX + "px"; ringRef.current.style.top = ringY + "px"; }
      requestAnimationFrame(lerp);
    };
    window.addEventListener("mousemove", onMove);
    requestAnimationFrame(lerp);
    // Hover detection
    const onOver = (e) => {
      if (e.target.closest("a, button, .interactive")) {
        document.body.classList.add("cursor-hover");
      }
    };
    const onOut = (e) => {
      if (e.target.closest("a, button, .interactive")) {
        document.body.classList.remove("cursor-hover");
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);
  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}

function MagneticButton({ children, to, onClick }) {
  const btnRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
  };
  const handleMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "";
  };
  const handleClick = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    onClick?.(e);
  };
  const inner = (
    <button ref={btnRef} className="magnetic-btn interactive" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={handleClick}>
      {children}
      {ripples.map((r) => <span key={r.id} className="ripple" style={{ left: r.x, top: r.y, width: 60, height: 60, marginLeft: -30, marginTop: -30 }} />)}
    </button>
  );
  return to ? <Link to={to}>{inner}</Link> : inner;
}

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("is-visible"); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function StaggerReveal({ children, className = "", delay = 0 }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`scroll-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function LetterReveal({ text, className = "" }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span key={i} initial={{ opacity: 0, y: 30, rotateX: -90 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function HeroTilt({ children }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0)"; };
  return <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ transition: "transform .2s ease-out" }}>{children}</div>;
}

function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <PopularCategories />
      <ImageShowcase />
      <GatewayCards />
      <WhyRobotics />
      <HomeAboutA5X />
      <HomeStatsBar />
      <Testimonials />
    </main>
  );
}
function Hero() {
  return (
    <section className="hero-v4" style={{
      backgroundImage: `linear-gradient(135deg, rgba(3,3,13,0.75) 0%, rgba(5,5,21,0.70) 50%, rgba(3,3,13,0.75) 100%), url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      {/* Animated background */}
      <div className="hero-v4-bg">
        <div className="hero-v4-grid" />
        <div className="hero-v4-orbs" />
      </div>

      {/* Left content */}
      <div className="hero-v4-left">
        <div className="hero-v4-eyebrow">
          <span className="hero-v4-dot" />
          <span>A5X ROBOTICS — NEXT GEN</span>
        </div>

        <h1 className="hero-v4-title">
          <span className="hero-v4-title-line1">BUILD</span>
          <span className="hero-v4-title-line2">THE FUTURE</span>
          <span className="hero-v4-title-line3">WITH <em>ROBOTS</em></span>
        </h1>

        <p className="hero-v4-desc">
          Premium robotics kits, components, and courses for builders who want to create something real.
        </p>

        <div className="hero-v4-actions">
          <Link to="/shop" className="hero-v4-btn-primary">
            <Rocket size={16} />
            Shop Now
          </Link>
          <Link to="/kits" className="hero-v4-btn-secondary">
            <Zap size={16} />
            Explore Kits
          </Link>
        </div>

        <div className="hero-v4-stats">
          <div className="hero-v4-stat">
            <strong>750+</strong>
            <span>Happy Builders</span>
          </div>
          <div className="hero-v4-stat-divider" />
          <div className="hero-v4-stat">
            <strong>4.9★</strong>
            <span>Avg Rating</span>
          </div>
          <div className="hero-v4-stat-divider" />
          <div className="hero-v4-stat">
            <strong>50+</strong>
            <span>Components</span>
          </div>
        </div>
      </div>

      {/* Right — robot image with effects */}
      <div className="hero-v4-right">
        <div className="hero-v4-img-glow" />
        <div className="hero-v4-img-ring hero-v4-ring-1" />
        <div className="hero-v4-img-ring hero-v4-ring-2" />
        <img src="/assets/robot-head.jpg" alt="A5X Robot" className="hero-v4-robot-img" />
        <div className="hero-v4-img-ground" />

        {/* Floating badge */}
        <div className="hero-v4-badge">
          <div className="hero-v4-badge-icon"><CircuitBoard size={18} /></div>
          <div>
            <strong>ESP32 + AI Ready</strong>
            <span>Next-gen hardware</span>
          </div>
        </div>

        {/* Floating stat chip */}
        <div className="hero-v4-chip">
          <Star size={14} className="hero-v4-chip-star" />
          <span>Rated #1 Robotics Store in India</span>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-v4-scroll">
        <div className="hero-v4-scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: <Truck size={22} />, title: "Free Shipping", sub: "On all orders above ₹999" },
    { icon: <Shield size={22} />, title: "Secure Payments", sub: "100% secure & trusted" },
    { icon: <RefreshCw size={22} />, title: "7 Days Return", sub: "Hassle free returns" },
    { icon: <MessageSquare size={22} />, title: "24/7 Support", sub: "We're here to help" },
  ];
  return (
    <section className="trust-bar-v2">
      {items.map(({ icon, title, sub }) => (
        <div key={title} className="trust-bar-v2-item">
          <span className="trust-bar-v2-icon">{icon}</span>
          <div>
            <strong>{title}</strong>
            <span>{sub}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

function PopularCategories() {
  const categories = [
    { label: "Robotics Kits", sub: "Build. Experiment. Innovate.", img: heroCarRobot, to: "/kits" },
    { label: "Microcontrollers", sub: "Power your ideas.", img: motorDriver, to: "/shop" },
    { label: "Sensors", sub: "Sense. Measure. Act.", img: motorDriver, to: "/shop" },
    { label: "Motors & Drivers", sub: "Move your projects.", img: motorDriver, to: "/shop" },
    { label: "Tools & Accessories", sub: "Everything you need.", img: motorDriver, to: "/shop" },
  ];
  return (
    <section className="popular-cats">
      <div className="popular-cats-header">
        <div>
          <p className="popular-cats-eyebrow">BROWSE CATEGORIES</p>
          <h2 className="popular-cats-title">Popular Categories</h2>
        </div>
        <Link className="popular-cats-viewall" to="/shop">View All Categories →</Link>
      </div>
      <div className="popular-cats-grid">
        {categories.map(({ label, sub, img, to }) => (
          <Link key={label} className="popular-cat-card" to={to}>
            <div className="popular-cat-img">
              <img src={img} alt={label} />
            </div>
            <div className="popular-cat-body">
              <strong>{label}</strong>
              <span>{sub}</span>
              <span className="popular-cat-link">Shop Now →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ImageShowcase() {
  const showcaseItems = [
    { img: unit003Hero, label: "UNIT 003", sublabel: "Next-Gen Humanoid" },
    { img: holoPrism, label: "NEURAL", sublabel: "AI Core Processing" },
    { img: silhouetteFigure, label: "CYBER", sublabel: "Autonomous Systems" },
  ];
  return (
    <motion.section className="image-showcase" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={staggerContainer}>
      {showcaseItems.map((item, i) => (
        <motion.div key={item.label} className="showcase-item holo-shimmer scan-lines corner-brackets float-sine" variants={scrollReveal} whileHover={{ scale: 1.02 }} style={{ animationDelay: `${i * 0.4}s` }}>
          <motion.img src={item.img} alt={item.label} initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [.22,1,.36,1] }} />
          <div className="showcase-overlay" />
          <div className="showcase-content">
            <span className="showcase-num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="showcase-label">{item.label}</h3>
            <p className="showcase-sublabel">{item.sublabel}</p>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const scrollReveal = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [.22,1,.36,1] } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

function GatewayCards() {
  const cards = [
    ["01", "Shop", "Precision components, modules, sensors, and electronics for serious robotics builds.", "/shop"],
    ["02", "Kits", "Complete matched robotics kits for classrooms, clubs, and competition teams.", "/kits"],
    ["03", "Learn", "Free A5X Academy courses that turn curiosity into practical build skills.", "/learn"]
  ];
  return (
    <motion.section className="gateway-section" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
      {cards.map(([num, title, text, to], i) => (
        <motion.div key={title} variants={scrollReveal} custom={i}>
          <Link className="gateway-card glass-panel holo-shimmer" to={to}>
            <div className="gw-corner" />
            <div className="gw-shine" />
            <span className="gw-num">{num}</span>
            <h2>{title}</h2>
            <p>{text}</p>
            <span className="gw-link">Explore <span>→</span></span>
          </Link>
        </motion.div>
      ))}
    </motion.section>
  );
}

function WhyRobotics() {
  const cards = [
    [Cpu, "The Future is Autonomous", "By 2030, over 20 million robots will be deployed globally. Robotics is reshaping every industry."],
    [Brain, "AI Is the New Literacy", "Students who learn AI and robotics today will lead tomorrow's world in medicine, engineering, and beyond."],
    [Rocket, "Build. Learn. Innovate.", "Our kits and workshops are designed to turn curiosity into capability through hands-on building."]
  ];
  return (
    <section className="why-robotics">
      <motion.div className="why-content" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
        <motion.p className="eyebrow" variants={scrollReveal}>WHY ROBOTICS & AI?</motion.p>
        <motion.h2 variants={scrollReveal}>Technology students can <em>touch</em>.</motion.h2>
        <div className="why-cards">
          {cards.map(([Icon, title, text], i) => (
            <motion.article key={title} variants={scrollReveal} whileHover={{ x: 8, transition: { duration: 0.25 } }}>
              <div className="why-icon"><Icon size={22} /></div>
              <div><h3>{title}</h3><p>{text}</p></div>
            </motion.article>
          ))}
        </div>
      </motion.div>
      <motion.div className="why-visual" initial={{ opacity: 0, scale: 0.85, rotate: -3 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [.22,1,.36,1] }}>
        <img src={cyberAndroid} alt="Cyberpunk robot" />
        <div className="why-visual-glow" />
        <span className="why-unit-tag">[ UNIT.NEURAL ]</span>
      </motion.div>
    </section>
  );
}

function HomeAboutA5X() {
  const points = ["4-day intensive hands-on workshops", "Lab setup and curriculum support", "Trusted by schools across Jabalpur", "Components + complete kits available", "Learn online or offline"];
  return (
    <section className="home-about-a5x">
      <motion.div className="about-content" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
        <motion.p className="eyebrow" variants={scrollReveal}>ABOUT A5X</motion.p>
        <motion.h2 variants={scrollReveal}>Jabalpur's Hub for Robotics & AI Education</motion.h2>
        <motion.p className="about-body" variants={scrollReveal}>A5X Industries conducts hands-on AI and Robotics workshops for school students across Tier 2 India. We offer 4-day programs, lab setup support, and curriculum integration.</motion.p>
        <motion.div className="about-checklist" variants={staggerContainer}>
          {points.map((point) => <motion.p key={point} variants={scrollReveal}><span>{"\u25b8"}</span>{point}</motion.p>)}
        </motion.div>
        <motion.div variants={scrollReveal}>
          <ButtonLink to="/contact">Partner With Us {"\u2192"}</ButtonLink>
        </motion.div>
      </motion.div>
      <motion.div className="about-image-panel" initial={{ opacity: 0, y: 60, rotate: 2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [.22,1,.36,1] }} whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}>
        <img src={silhouetteFigure} alt="Silhouette figure" />
        <span className="about-unit-label">[ UNIT 001 ]</span>
      </motion.div>
    </section>
  );
}

function HomeStatsBar() {
  const stat1 = useCountUp(20, 2000);
  const stat2 = useCountUp(4, 1500);
  const stat3 = useCountUp(500, 2500);
  const statsData = [
    { ref: stat1.ref, display: `${stat1.count}M+`, label: "ROBOTS PROJECTED BY 2030" },
    { ref: stat2.ref, display: `${stat2.count} Days`, label: "HANDS-ON WORKSHOP FORMAT" },
    { ref: stat3.ref, display: `${stat3.count}+`, label: "COMPONENTS AVAILABLE" },
  ];
  return (
    <motion.section className="home-stats-bar" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut" }}>
      {statsData.map((stat, i) => (
        <React.Fragment key={stat.label}>
          {i > 0 && <div className="stat-divider" />}
          <motion.div className="stat-item" ref={stat.ref} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}>
            <strong>{stat.display}</strong><span>{stat.label}</span>
          </motion.div>
        </React.Fragment>
      ))}
    </motion.section>
  );
}

function QuickViewModal({ product, onClose }) {
  const add = useCartStore((s) => s.add);
  const [qty, setQty] = useState(1);
  if (!product) return null;
  return (
    <AnimatePresence>
      <motion.div className="qv-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div className="qv-modal glass-card" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
          <button className="qv-close" onClick={onClose}><X size={20} /></button>
          <div className="qv-body">
            <div className="qv-image"><img src={product.imageUrl || motorDriver} alt={product.name} /></div>
            <div className="qv-info">
              <h2>{product.name}</h2>
              <p className="sku">{product.sku}</p>
              <div className="rating-row"><StarRating rating={product.rating} /><span>({product.reviewCount})</span></div>
              <div className="price-row"><strong>{inr(product.price)}</strong>{product.mrp && <s className="mrp">{inr(product.mrp)}</s>}</div>
              <p className="qv-desc">{product.shortDescription}</p>
              <div className="qty-selector"><button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button><span>{qty}</span><button onClick={() => setQty(qty + 1)}><Plus size={16} /></button></div>
              <button className="add-quote-btn full" onClick={() => { for (let i = 0; i < qty; i++) add(product); onClose(); }}>Add to Quote</button>
              <Link to={`/shop/${product.id}`} className="qv-detail-link" onClick={onClose}>View Full Details →</Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CompareBar({ products }) {
  const { ids, clear } = useCompareStore();
  const navigate = useNavigate();
  const items = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  if (items.length < 2) return null;
  return (
    <motion.div className="compare-bar glass-card" initial={{ y: 80 }} animate={{ y: 0 }}>
      <div className="compare-items">{items.map((p) => <div key={p.id} className="compare-item"><img src={p.imageUrl || motorDriver} alt={p.name} /><span>{p.name}</span></div>)}</div>
      <div className="compare-actions"><button className="btn" onClick={() => navigate("/shop/compare")}>Compare Now</button><button className="btn ghost" onClick={clear}>Clear</button></div>
    </motion.div>
  );
}

function FilterSidebar({ filters, setFilters, onClear, categories: cats }) {
  const [open, setOpen] = useState(false);
  const compatOptions = ["Arduino", "ESP32", "Raspberry Pi", "MicroPython", "PlatformIO"];
  return (
    <>
      <button className="filter-toggle-mobile" onClick={() => setOpen(!open)}><Filter size={16} /> Filters</button>
      <aside className={`filter-sidebar glass-card ${open ? "open" : ""}`}>
        <div className="filter-header"><h3><SlidersHorizontal size={16} /> Filters</h3><button onClick={onClear}>Clear All</button></div>
        <div className="filter-group"><h4>Category</h4>{cats.map((c) => <label key={c}><input type="radio" name="cat" checked={filters.category === c} onChange={() => setFilters((f) => ({ ...f, category: c }))} />{c}</label>)}</div>
        <div className="filter-group"><h4>Price Range</h4><div className="price-inputs"><input type="number" placeholder="Min ₹" value={filters.priceMin} onChange={(e) => setFilters((f) => ({ ...f, priceMin: e.target.value }))} /><span>–</span><input type="number" placeholder="Max ₹" value={filters.priceMax} onChange={(e) => setFilters((f) => ({ ...f, priceMax: e.target.value }))} /></div></div>
        <div className="filter-group"><h4>Rating</h4>{[4, 3, 2].map((r) => <label key={r}><input type="radio" name="rating" checked={filters.minRating === r} onChange={() => setFilters((f) => ({ ...f, minRating: r }))} />★ {r}.0+</label>)}</div>
        <div className="filter-group"><h4>Compatibility</h4>{compatOptions.map((c) => <label key={c}><input type="checkbox" checked={filters.compat.includes(c)} onChange={() => setFilters((f) => ({ ...f, compat: f.compat.includes(c) ? f.compat.filter((x) => x !== c) : [...f.compat, c] }))} />{c}</label>)}</div>
        <div className="filter-group"><label className="stock-toggle"><input type="checkbox" checked={filters.inStockOnly} onChange={() => setFilters((f) => ({ ...f, inStockOnly: !f.inStockOnly }))} />In Stock Only</label></div>
      </aside>
    </>
  );
}

function ShopSection() {
  const products = useAdminStore((s) => s.products);
  const defaultFilters = { category: "All", priceMin: "", priceMax: "", minRating: 0, compat: [], inStockOnly: false, deliveryType: "all" };
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [qvProduct, setQvProduct] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    { image: carousel1, title: "A5X ROBOTICS KIT", subtitle: "Complete Kit with Servo, Sensors & Motors", tag: "FEATURED KIT" },
    { image: kitInnovation, title: "PREMIUM COMPONENTS", subtitle: "High-Quality Microcontrollers & Modules", tag: "BEST SELLERS" },
    { image: gridInnovation, title: "BUILD & INNOVATE", subtitle: "Everything You Need for Your Next Project", tag: "NEW ARRIVALS" }
  ];
  
  // Auto-play hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const filtered = useMemo(() => {
    let r = [...products];
    if (searchQuery.trim()) r = r.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()) || (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase())));
    if (filters.category !== "All") r = r.filter((p) => p.category === filters.category);
    if (filters.priceMin) r = r.filter((p) => p.price >= Number(filters.priceMin));
    if (filters.priceMax) r = r.filter((p) => p.price <= Number(filters.priceMax));
    if (filters.minRating) r = r.filter((p) => p.rating >= filters.minRating);
    if (filters.inStockOnly) r = r.filter((p) => p.inStock);
    if (filters.compat.length) r = r.filter((p) => p.compatibility?.some((c) => filters.compat.includes(c)));
    // Delivery filter: Quick (1 day) or Scheduled (1 week)
    if (filters.deliveryType === "quick") r = r.filter((p) => p.quickDelivery === true);
    if (filters.deliveryType === "scheduled") r = r.filter((p) => p.quickDelivery !== true);
    if (sort === "price-asc") r.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") r.sort((a, b) => b.price - a.price);
    else if (sort === "rating") r.sort((a, b) => b.rating - a.rating);
    else if (sort === "newest") r.sort((a, b) => b.id.localeCompare(a.id));
    return r;
  }, [products, filters, sort, searchQuery]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, filtered.length);

  return (
    <div className="shop-page-redesign">

      {/* Hero Carousel */}
      <div className="shop-hero-carousel">
        <div className="shop-hero-slides">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`shop-hero-slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="shop-hero-overlay" />
              <div className="shop-hero-content">
                <span className="shop-hero-tag">{slide.tag}</span>
                <h1 className="shop-hero-title">{slide.title}</h1>
                <p className="shop-hero-subtitle">{slide.subtitle}</p>
                <button className="shop-hero-btn" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
                  Shop Now <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Indicators */}
        <div className="shop-hero-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`shop-hero-indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button 
          className="shop-hero-nav shop-hero-nav-prev" 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          className="shop-hero-nav shop-hero-nav-next" 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          aria-label="Next slide"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Search + Categories Section */}
      <div className="shop-search-section">
        {/* Search Bar */}
        <div className="shop-search-bar-wrapper">
          <div className="shop-search-input-wrap">
            <input
              type="text"
              className="shop-search-input"
              placeholder="Search products, categories, SKUs..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            />
            {searchQuery && (
              <button className="shop-search-clear" onClick={() => { setSearchQuery(""); setPage(1); }} aria-label="Clear search">
                <X size={18} />
              </button>
            )}
            <Search size={20} className="shop-search-icon" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="shop-category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`shop-cat-pill ${filters.category === cat ? "active" : ""}`}
              onClick={() => { setFilters({ ...filters, category: cat }); setPage(1); }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Compact Header: Search + Categories + Deals */}
      <div className="shop-compact-header" style={{display: 'none'}}>
        {/* Search Bar */}
        <div className="shop-top-search-bar">
          <div className="shop-search-input-wrap">
            <Search size={18} className="shop-search-icon" />
            <input
              type="text"
              className="shop-search-input"
              placeholder="Search products, categories, SKUs..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            />
            {searchQuery && (
              <button className="shop-search-clear" onClick={() => { setSearchQuery(""); setPage(1); }} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="shop-category-bar">
          <div className="shop-category-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`shop-cat-pill ${filters.category === cat ? "active" : ""}`}
                onClick={() => { setFilters({ ...filters, category: cat }); setPage(1); }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Deal Banners */}
        <div className="shop-deal-banners">
          <div className="shop-deal-card shop-deal-blue">
            <div className="shop-deal-text">
              <span className="shop-deal-tag">BEST SELLER</span>
              <h3>Arduino Starter Kit</h3>
              <p>Complete kit for beginners</p>
              <strong>₹2,499 <s>₹3,499</s></strong>
            </div>
            <div className="shop-deal-badge">-29%</div>
          </div>
          <div className="shop-deal-card shop-deal-purple">
            <div className="shop-deal-text">
              <span className="shop-deal-tag">TOP RATED</span>
              <h3>Motor Driver L298N</h3>
              <p>Dual H-Bridge controller</p>
              <strong>₹349 <s>₹499</s></strong>
            </div>
            <div className="shop-deal-badge">-30%</div>
          </div>
          <div className="shop-deal-card shop-deal-teal">
            <div className="shop-deal-text">
              <span className="shop-deal-tag">HOT DEAL</span>
              <h3>Ultrasonic Sensor</h3>
              <p>HC-SR04 distance sensor</p>
              <strong>₹149 <s>₹249</s></strong>
            </div>
            <div className="shop-deal-badge">-40%</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="shop-body">
        {/* Sidebar */}
        <aside className={`shop-sidebar-new ${showMobileFilter ? "open" : ""}`}>
          <div className="shop-sidebar-header">
            <span className="shop-sidebar-title"><SlidersHorizontal size={16} /> Filters</span>
            <button className="shop-sidebar-clear" onClick={() => { setFilters(defaultFilters); setPage(1); }}>Clear All</button>
          </div>

          <div className="shop-filter-group">
            <p className="shop-filter-label">PRICE RANGE</p>
            <div className="shop-price-inputs">
              <input type="number" placeholder="Min ₹" value={filters.priceMin} onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })} />
              <span>—</span>
              <input type="number" placeholder="Max ₹" value={filters.priceMax} onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })} />
            </div>
          </div>

          <div className="shop-filter-group">
            <p className="shop-filter-label">MIN RATING</p>
            <div className="shop-rating-btns">
              {[0, 3, 4, 4.5].map((r) => (
                <button key={r} className={`shop-rating-btn ${filters.minRating === r ? "active" : ""}`} onClick={() => setFilters({ ...filters, minRating: r })}>
                  {r === 0 ? "All" : `${r}★+`}
                </button>
              ))}
            </div>
          </div>

          <div className="shop-filter-group">
            <label className="shop-toggle-label">
              <span>In Stock Only</span>
              <div className={`shop-toggle ${filters.inStockOnly ? "on" : ""}`} onClick={() => setFilters({ ...filters, inStockOnly: !filters.inStockOnly })}>
                <div className="shop-toggle-knob" />
              </div>
            </label>
          </div>

          <div className="shop-filter-group">
            <p className="shop-filter-label">DELIVERY OPTIONS</p>
            <div className="shop-delivery-btns">
              <button 
                className={`shop-delivery-btn ${filters.deliveryType === "all" ? "active" : ""}`} 
                onClick={() => setFilters({ ...filters, deliveryType: "all" })}
              >
                <Truck size={16} /> All
              </button>
              <button 
                className={`shop-delivery-btn ${filters.deliveryType === "quick" ? "active" : ""}`} 
                onClick={() => setFilters({ ...filters, deliveryType: "quick" })}
              >
                <Zap size={16} /> Quick (1 Day)
              </button>
              <button 
                className={`shop-delivery-btn ${filters.deliveryType === "scheduled" ? "active" : ""}`} 
                onClick={() => setFilters({ ...filters, deliveryType: "scheduled" })}
              >
                <Package size={16} /> Scheduled (1 Week)
              </button>
            </div>
          </div>

          <button className="shop-sidebar-close-btn" onClick={() => setShowMobileFilter(false)}>
            <X size={18} /> Close Filters
          </button>
        </aside>

        {showMobileFilter && <div className="shop-filter-overlay" onClick={() => setShowMobileFilter(false)} />}

        {/* Products Area */}
        <div className="shop-products-area">
          <div className="shop-toolbar">
            <div className="shop-toolbar-left">
              <button className="shop-filter-toggle-btn" onClick={() => setShowMobileFilter(true)}>
                <Filter size={16} /> Filters
              </button>
              <span className="shop-count-text">
                Showing <strong>{start}–{end}</strong> of <strong>{filtered.length}</strong> products
              </span>
            </div>
            <div className="shop-toolbar-right">
              <select className="shop-sort-select" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low–High</option>
                <option value="price-desc">Price: High–Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
              <select className="shop-sort-select" value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
                <option value={12}>12 / page</option>
                <option value={24}>24 / page</option>
                <option value={48}>48 / page</option>
              </select>
              <div className="shop-view-btns">
                <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}><Grid2X2 size={16} /></button>
                <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}><List size={16} /></button>
              </div>
            </div>
          </div>

          {paged.length === 0 ? (
            <div className="shop-empty">
              <Search size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
              <h3>No products found</h3>
              <p>Try adjusting your filters</p>
              <button className="btn" onClick={() => { setFilters(defaultFilters); setPage(1); }}>Clear Filters</button>
            </div>
          ) : (
            <div className={view === "grid" ? "shop-products-grid" : "shop-products-list"}>
              {paged.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQvProduct} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="shop-pagination">
              <button className="shop-page-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`shop-page-btn ${page === i + 1 ? "active" : ""}`} onClick={() => setPage(i + 1)}>
                  {i + 1}
                </button>
              ))}
              <button className="shop-page-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <CompareBar products={products} />
      {qvProduct && <QuickViewModal product={qvProduct} onClose={() => setQvProduct(null)} />}
    </div>
  );
}

function KitsSection() {
  const kits = useAdminStore((state) => state.kits);
  return (
    <section className="kits-section neon-kits" id="kits">
      <div className="kits-premium-hero">
        <img className="kits-hero-art" src={kitInnovation} alt="" />
        <div className="kits-hero-overlay" />
        <div className="kits-hero-content">
          <p className="eyebrow">A5X ROBOTICS</p>
          <h1>PREMIUM<br /><em>ROBOTICS</em> KITS</h1>
          <p className="kits-hero-sub">Engineered for builders. Every component matched, tested, and documented for real-world robotics.</p>
          <div className="kits-hero-stats">
            <div className="glass-card"><strong>{kits.length}</strong><span>Kits Available</span></div>
            <div className="glass-card"><strong>100%</strong><span>Tested & Matched</span></div>
            <div className="glass-card"><strong>24hr</strong><span>Dispatch Time</span></div>
          </div>
        </div>

      </div>
      <div className="kits-grid">{kits.map((kit) => <KitCard key={kit.id} kit={kit} />)}</div>
      <div className="custom-kit"><img src={robotHands} alt="" /><div><h3>Need a custom kit?</h3><p>Tell us your build goal, classroom size, or competition spec. We will bundle the right components.</p><ButtonLink to="/contact">Request Custom Build</ButtonLink></div></div>
    </section>
  );
}

function KitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const kits = useAdminStore((state) => state.kits);
  const kit = kits.find((k) => k.id === id);
  const add = useCartStore((state) => state.add);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const galleryImages = [kit?.imageUrl || a5xCarKit, kitInnovation, ...kitSpinFrames.filter((_, i) => i % 3 === 0)];
  useEffect(() => {
    const t = setInterval(() => setActiveSlide((s) => (s + 1) % galleryImages.length), 3000);
    return () => clearInterval(t);
  }, [galleryImages.length]);
  if (!kit) return <main className="page"><section style={{textAlign:'center',paddingTop:'120px'}}><h1>Kit Not Found</h1><button className="btn" onClick={() => navigate('/kits')}>Back to Kits</button></section></main>;
  
  const hasVideo = kit.videoUrl && kit.videoUrl.trim() !== '';
  
  return (
    <main className="page kit-detail-page">
      <section className="kit-detail-hero">
        <div className="kit-detail-gallery">
          <AnimatePresence mode="wait">
            <motion.img key={activeSlide} src={galleryImages[activeSlide]} alt={kit.name} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }} />
          </AnimatePresence>
          <div className="kit-gallery-dots">
            {galleryImages.slice(0, 8).map((_, i) => <button key={i} className={i === activeSlide % 8 ? 'active' : ''} onClick={() => setActiveSlide(i)} />)}
          </div>
          <div className="kit-gallery-glow" />
          {hasVideo && (
            <button 
              className="kit-video-play-btn" 
              onClick={() => setShowVideo(true)}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s ease'
              }}
            >
              <Play size={32} style={{marginLeft: '4px'}} />
            </button>
          )}
        </div>
        <div className="kit-detail-info">
          <span className={`tier ${kit.tier.toLowerCase().split(' ')[0]}`}>{kit.tier}</span>
          <h1>{kit.name}</h1>
          <p className="kit-detail-desc">{kit.description}</p>
          <div className="kit-detail-price">{inr(Number(kit.price))}</div>
          <div className="kit-detail-rating">{'★'.repeat(Math.round(kit.rating))} <span>{kit.rating}/5</span></div>
          {hasVideo && (
            <button 
              className="btn ghost" 
              onClick={() => setShowVideo(true)}
              style={{marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}
            >
              <PlayCircle size={20} /> Watch Demo Video
            </button>
          )}
          <h3>What's Included</h3>
          <div className="kit-detail-includes">{kit.includes.map((item) => <div key={item} className="glass-card"><CheckCircle size={16} />{item}</div>)}</div>
          <button className="btn" onClick={() => add({ ...kit, category: 'Kits', sku: kit.tier })}>Add to Cart — {inr(Number(kit.price))}</button>
          <ButtonLink to="/contact" ghost>Request Custom Version</ButtonLink>
        </div>
      </section>
      
      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && hasVideo && (
          <motion.div 
            className="video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.95)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <motion.div 
              className="video-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1200px',
                background: '#000',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => setShowVideo(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={24} />
              </button>
              <video 
                controls 
                autoPlay 
                style={{width: '100%', height: 'auto', display: 'block'}}
              >
                <source src={kit.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <section className="kit-detail-spin-section">
        <h2>360° View</h2>
        <Kit3DSpin size={560} />
      </section>
    </main>
  );
}

function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const plans = [["MAKER", 0, ["Access to tutorials", "1 quote/month", "Community forum"]], ["BUILDER", 499, ["Unlimited quotes", "Bulk discount 5%", "Priority support", "Project showcase"]], ["PRO", 999, ["API access", "Dedicated manager", "10% bulk discount", "Custom kits", "Beta products"]]];
  return <section className="pricing"><h2>PRICING</h2><h3>Choose Your Plan</h3><button className="toggle" onClick={() => setYearly(!yearly)}>{yearly ? "Yearly" : "Monthly"}</button><div className="plans">{plans.map(([name, price, list]) => <article key={name}><h4>{name}</h4><AnimatePresence mode="wait"><motion.strong key={`${name}-${yearly}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{price ? inr(yearly ? price * 10 : price) : "Free"}<span>{price ? yearly ? "/yr" : "/mo" : ""}</span></motion.strong></AnimatePresence>{yearly && price > 0 && <p><s>{inr(price * 12)}</s> 2 months free</p>}{list.map((item) => <p key={item}><CheckCircle size={15} />{item}</p>)}<button>Choose Plan</button></article>)}</div></section>;
}

function AboutSection() {
  const features = ["India-made quality, globally tested", "Sourced directly, no middlemen", "Every component documentation-backed", "Built by makers, for makers"];
  return <section className="about" id="about" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,8,16,.94), rgba(5,8,16,.72)), url(${aboutArc})` }}><img src={robotHands} alt="" /><div><p className="eyebrow">WHY A5X?</p><h2>Robotics for Everyone</h2>{features.map((feature) => <p className="feature" key={feature}><CircuitBoard size={18} />{feature}</p>)}<ButtonLink to="/about" ghost>Our Story</ButtonLink></div></section>;
}

function HowItWorks() {
  const steps = [[ShoppingCart, "Browse & Quote", "Add items, set quantities, submit quote"], [CheckCircle, "Confirm & Pay", "We verify stock, confirm price, accept payment"], [Package, "Build & Ship", "Packed securely, dispatched same/next business day"]];
  return <section className="how"><div className="section-head"><div><h2>HOW IT WORKS</h2><p>From component selection to dispatch in three practical steps.</p></div></div><div className="steps">{steps.map(([Icon, title, text], index) => <article key={title}><span>{index + 1}</span><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></section>;
}

function Testimonials() {
  const quotes = [["AM", "Anika M.", "Engineering Student", "The kit list finally made sense. I could build the rover without mystery parts."], ["RK", "Rohan K.", "Lab Coordinator", "Bulk quotes are clean and the components are documented enough for class use."], ["SP", "Sara P.", "Maker", "The L298N and sensor bundles saved me from compatibility guesswork."]];
  return <section className="testimonials" style={{ backgroundImage: `linear-gradient(rgba(5,8,16,.78), rgba(5,8,16,.84)), url(${darkSpheres})` }}><h2>What Makers Say</h2><div>{quotes.map(([initials, name, role, quote]) => <article key={name}><b>{initials}</b><h3>{name}</h3><p>{role}</p><span>★★★★★</span><blockquote>{quote}</blockquote></article>)}</div></section>;
}

function LearnPreview() {
  const courses = useAdminStore((state) => state.courses).filter((course) => course.isPublished).slice(0, 4);
  if (!courses.length) return null;
  return <section className="learn-preview"><div className="section-head"><div><p className="eyebrow">A5X ACADEMY</p><h2>Learn robotics by building.</h2><p>Free public videos, structured courses, and practical product context.</p></div><ButtonLink to="/learn" ghost>See All Courses</ButtonLink></div><div className="course-row">{courses.map((course) => <CourseMiniCard key={course.id} course={course} />)}</div></section>;
}

function Newsletter() {
  return <section className="newsletter" style={{ backgroundImage: `linear-gradient(rgba(5,8,16,.88), rgba(5,8,16,.9)), url(${aboutArc})` }}><h2>Join 10,000+ Makers</h2><form><input placeholder="maker@domain.com" /><button>Subscribe</button></form><div><button>GitHub</button><button>Instagram</button><button>YouTube</button><button>Discord</button></div></section>;
}

function LearnPage() {
  const courses = useAdminStore((state) => state.courses).filter((course) => course.isPublished);
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? courses : courses.filter((course) => course.level === active.toUpperCase() || course.category === active);
  const featured = courses.find((course) => course.isFeatured) || courses[0];
  const featuredLink = featured ? (featured.videos?.length ? `/learn/${featured.id}/${featured.videos[0].id}` : `/learn/${featured.id}`) : "/learn";
  const totalVideos = courses.reduce((sum, c) => sum + (c.videos?.length || 0), 0);

  return (
    <main className="learn-page-new">
      {/* Hero */}
      <div className="learn-hero-new">
        <div className="learn-hero-bg">
          <div className="learn-hero-orb learn-hero-orb-1" />
          <div className="learn-hero-orb learn-hero-orb-2" />
          <div className="learn-hero-grid" />
        </div>
        <div className="learn-hero-content">
          <p className="learn-eyebrow">A5X ACADEMY</p>
          <h1 className="learn-hero-title">
            <span className="learn-title-main">LEARN</span>
            <span className="learn-title-sub">ROBOTICS & AI</span>
          </h1>
          <p className="learn-hero-desc">Step-by-step video courses built by engineers. From blinking an LED to building a full autonomous robot.</p>
          <div className="learn-hero-stats">
            <div className="learn-stat"><span className="learn-stat-num">{totalVideos}+</span><span className="learn-stat-label">Videos</span></div>
            <div className="learn-stat-div" />
            <div className="learn-stat"><span className="learn-stat-num">{courses.length}</span><span className="learn-stat-label">Courses</span></div>
            <div className="learn-stat-div" />
            <div className="learn-stat"><span className="learn-stat-num">Free</span><span className="learn-stat-label">Forever</span></div>
          </div>
          {featured && (
            <Link to={featuredLink} className="learn-start-btn">
              <Play size={18} /> Start Learning Free
            </Link>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="learn-filter-bar">
        <div className="learn-filter-scroll">
          {courseCategories.map((cat) => (
            <button
              key={cat}
              className={`learn-filter-pill ${active === cat ? "active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Course */}
      {featured && (
        <div className="learn-featured-section">
          <p className="learn-section-label">⭐ FEATURED COURSE</p>
          <div className="learn-featured-card">
            <div className="learn-featured-img">
              <img src={featured.thumbnailUrl || learnGrid} alt={featured.title} />
              <div className="learn-featured-play"><Play size={32} /></div>
              <span className="learn-featured-level">{featured.level}</span>
            </div>
            <div className="learn-featured-info">
              <span className="learn-featured-category">{featured.category}</span>
              <h2 className="learn-featured-title">{featured.title}</h2>
              <p className="learn-featured-desc">{featured.description}</p>
              <div className="learn-featured-meta">
                <span><ListVideo size={14} /> {featured.videos?.length || 0} videos</span>
                <span>By {featured.instructor}</span>
                <span className="learn-featured-tags">{featured.tags?.map(t => <span key={t} className="learn-tag">{t}</span>)}</span>
              </div>
              <div className="learn-featured-cta">
                {featured.youtubeUrl ? (
                  <a href={featured.youtubeUrl} target="_blank" rel="noopener noreferrer" className="learn-cta-btn">
                    <Play size={16} /> Watch Now
                  </a>
                ) : featured.videos?.length > 0 ? (
                  <Link to={`/learn/${featured.id}/${featured.videos[0].id}`} className="learn-cta-btn">
                    <Play size={16} /> Watch Now
                  </Link>
                ) : (
                  <span className="learn-cta-btn" style={{ opacity: 0.5 }}>Coming Soon</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Courses Grid */}
      <div className="learn-courses-section">
        <div className="learn-section-header">
          <p className="learn-section-label">ALL COURSES</p>
          <span className="learn-count">{filtered.length} courses</span>
        </div>
        {filtered.length === 0 ? (
          <div className="learn-empty">
            <p>No courses found in this category.</p>
          </div>
        ) : (
          <div className="learn-courses-grid">
            {filtered.map((course) => (
              <div key={course.id} className="learn-course-card">
                <div className="learn-course-thumb">
                  <img src={course.thumbnailUrl || learnGrid} alt={course.title} />
                  <div className="learn-course-play"><Play size={20} /></div>
                  <span className="learn-course-level-badge">{course.level}</span>
                </div>
                <div className="learn-course-body">
                  <span className="learn-course-category">{course.category}</span>
                  <h3 className="learn-course-title">{course.title}</h3>
                  <p className="learn-course-desc">{course.description}</p>
                  <div className="learn-course-footer">
                    <span className="learn-course-videos"><ListVideo size={13} /> {course.videos?.length || 0} videos</span>
                    <span className="learn-course-instructor">By {course.instructor}</span>
                  </div>
                  <div className="learn-course-tags">
                    {course.tags?.slice(0, 3).map(t => <span key={t} className="learn-tag">{t}</span>)}
                  </div>
                  {/* Watch Now Button */}
                  {course.youtubeUrl ? (
                    <a
                      href={course.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="learn-watch-now-btn"
                      onClick={e => e.stopPropagation()}
                    >
                      <Play size={15} /> Watch Now
                    </a>
                  ) : course.videos?.length > 0 ? (
                    <Link
                      to={`/learn/${course.id}/${course.videos[0].id}`}
                      className="learn-watch-now-btn"
                    >
                      <Play size={15} /> Watch Now
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function VideoPlayer({ videoUrl, poster, youtubeId }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const controlsTimer = useRef(null);

  // Extract YouTube ID from various URL formats
  const getYoutubeId = (url) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m) return m[1];
    }
    return null;
  };

  const ytId = youtubeId || getYoutubeId(videoUrl);
  const isYoutube = Boolean(ytId);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) { video.pause(); setPlaying(false); }
    else { video.play().catch(() => {}); setPlaying(true); }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100 || 0);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  // YouTube embed
  if (isYoutube) {
    return (
      <div className="vp-wrapper vp-youtube">
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="vp-iframe"
        />
      </div>
    );
  }

  // No video
  if (!videoUrl) {
    return (
      <div className="vp-wrapper">
        <div className="vp-no-video">
          <div className="vp-no-video-inner">
            <Play size={48} style={{ opacity: 0.3 }} />
            <p>No video available for this lesson</p>
          </div>
        </div>
      </div>
    );
  }

  // Regular video
  return (
    <div className="vp-wrapper" onMouseMove={handleMouseMove} onClick={togglePlay}>
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster || a5xCarKit}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onEnded={() => setPlaying(false)}
        className="vp-video"
      />
      {!playing && (
        <div className="vp-play-overlay">
          <div className="vp-play-btn"><Play size={36} /></div>
        </div>
      )}
      <div className={`vp-controls ${showControls || !playing ? 'visible' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="vp-progress" onClick={handleSeek}>
          <div className="vp-progress-fill" style={{ width: `${progress}%` }} />
          <div className="vp-progress-thumb" style={{ left: `${progress}%` }} />
        </div>
        <div className="vp-controls-row">
          <div className="vp-controls-left">
            <button className="vp-btn" onClick={togglePlay}>
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              ) : <Play size={16} />}
            </button>
            <span className="vp-time">{fmt(currentTime)} / {fmt(duration)}</span>
          </div>
          <div className="vp-controls-right">
            <select className="vp-speed" value={speed} onChange={(e) => {
              const s = Number(e.target.value);
              setSpeed(s);
              if (videoRef.current) videoRef.current.playbackRate = s;
            }}>
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
            <button className="vp-btn" onClick={() => videoRef.current?.requestFullscreen?.()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoPlayerPage() {
  const { courseId, videoId } = useParams();
  const navigate = useNavigate();
  const courses = useAdminStore((state) => state.courses);
  const course = courses.find((item) => item.id === courseId) || courses[0];
  const videos = course?.videos || [];
  const video = videos.find((item) => item.id === videoId) || videos[0];
  const watchProgress = useWatchProgress(course);
  const relatedIds = video?.relatedProducts || [];
  const products = useAdminStore((state) => state.products).filter((product) => relatedIds.includes(product.id));
  const hasPDF = course?.pdfUrl && course.pdfUrl.trim() !== '';

  if (!course || !videos.length || !video) return (
    <main className="page player-page">
      <section style={{ textAlign: "center", paddingTop: "120px" }}>
        <h1>No Videos Available</h1>
        <p style={{ color: "var(--brand-steel)" }}>This course has no videos yet.</p>
        <button className="btn" onClick={() => navigate("/learn")}>Back to Courses</button>
      </section>
    </main>
  );

  const currentIndex = videos.findIndex(v => v.id === video.id);
  const prevVideo = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const nextVideo = currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;

  return (
    <main className="watch-page">
      {/* Breadcrumb */}
      <div className="watch-breadcrumb">
        <Link to="/learn">Learn</Link>
        <span>›</span>
        <Link to={`/learn/${course.id}/${videos[0]?.id}`}>{course.title}</Link>
        <span>›</span>
        <span>{video.title}</span>
      </div>

      <div className="watch-layout-new">
        {/* Main Content */}
        <div className="watch-main">
          {/* Video Player */}
          <div className="watch-player-wrap">
            <VideoPlayer videoUrl={video.videoUrl} poster={video.thumbnailUrl || course.thumbnailUrl} youtubeId={video.youtubeId} />
          </div>

          {/* Video Info */}
          <div className="watch-video-info">
            <div className="watch-video-header">
              <div>
                <span className="watch-video-num">Lesson {currentIndex + 1} of {videos.length}</span>
                <h1 className="watch-video-title">{video.title}</h1>
                <p className="watch-video-desc">{video.description}</p>
              </div>
              <div className="watch-video-actions">
                <button
                  className={`watch-mark-btn ${watchProgress.isWatched(video.id) ? 'watched' : ''}`}
                  onClick={() => watchProgress.markWatched(video.id)}
                >
                  <Check size={16} />
                  {watchProgress.isWatched(video.id) ? 'Watched' : 'Mark as Watched'}
                </button>
                {hasPDF && (
                  <a href={course.pdfUrl} download className="watch-pdf-btn">
                    <Upload size={16} /> {course.pdfName || 'Download PDF'}
                  </a>
                )}
              </div>
            </div>

            {/* Prev/Next Navigation */}
            <div className="watch-nav-btns">
              {prevVideo ? (
                <Link to={`/learn/${course.id}/${prevVideo.id}`} className="watch-nav-btn">
                  <ChevronLeft size={16} /> Previous
                </Link>
              ) : <div />}
              {nextVideo && (
                <Link to={`/learn/${course.id}/${nextVideo.id}`} className="watch-nav-btn next">
                  Next <ChevronRight size={16} />
                </Link>
              )}
            </div>
          </div>

          {/* Related Products */}
          {products.length > 0 && (
            <div className="watch-products">
              <h3 className="watch-section-title">🛒 Products Used in This Lesson</h3>
              <div className="watch-products-grid">
                {products.map((p) => <ProductCard key={p.id} product={p} compact />)}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Course Playlist */}
        <aside className="watch-sidebar">
          {/* Course Info */}
          <div className="watch-sidebar-header">
            <img src={course.thumbnailUrl || learnGrid} alt={course.title} className="watch-sidebar-thumb" />
            <div>
              <h3 className="watch-sidebar-title">{course.title}</h3>
              <p className="watch-sidebar-instructor">By {course.instructor}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="watch-progress-bar">
            <div className="watch-progress-info">
              <span>Progress</span>
              <span>{watchProgress.getCourseProgress()}%</span>
            </div>
            <div className="watch-progress-track">
              <div className="watch-progress-fill" style={{ width: `${watchProgress.getCourseProgress()}%` }} />
            </div>
          </div>

          {/* Video List */}
          <div className="watch-playlist">
            {videos.map((item, index) => (
              <Link
                key={item.id}
                to={`/learn/${course.id}/${item.id}`}
                className={`watch-playlist-item ${item.id === video.id ? 'active' : ''} ${watchProgress.isWatched(item.id) ? 'watched' : ''}`}
              >
                <div className="watch-playlist-num">
                  {watchProgress.isWatched(item.id) ? (
                    <Check size={14} />
                  ) : item.id === video.id ? (
                    <Play size={14} />
                  ) : (
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  )}
                </div>
                <div className="watch-playlist-info">
                  <span className="watch-playlist-title">{item.title}</span>
                  <span className="watch-playlist-dur">{seconds(item.duration || 0)}</span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}

function GenericPage({ title, text, children }) {
  return <main className="page generic"><h1>{title}</h1><p>{text}</p>{children}</main>;
}

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useAdminStore((s) => s.products);
  const product = products.find((p) => p.id === id);
  const add = useCartStore((s) => s.add);
  const addRecent = useRecentlyViewedStore((s) => s.add);
  const wishToggle = useWishlistStore((s) => s.toggle);
  const wishlisted = useWishlistStore((s) => s.ids.includes(id));
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  useEffect(() => { if (id) addRecent(id); window.scrollTo(0, 0); }, [id]);
  if (!product) return <main className="page"><section style={{ textAlign: "center", paddingTop: 120 }}><h1>Product Not Found</h1><button className="btn" onClick={() => navigate("/shop")}>Back to Shop</button></section></main>;
  const discount = product.mrp ? Math.round((1 - product.price / product.mrp) * 100) : 0;
  const relatedProducts = (product.relatedIds || []).map((rid) => products.find((p) => p.id === rid)).filter(Boolean);
  const boughtTogether = (product.frequentlyBoughtWith || []).map((rid) => products.find((p) => p.id === rid)).filter(Boolean);
  const recentIds = useRecentlyViewedStore((s) => s.ids);
  const recentProducts = recentIds.filter((rid) => rid !== id).map((rid) => products.find((p) => p.id === rid)).filter(Boolean).slice(0, 6);
  const tabs = ["Overview", "Specifications", "Compatibility"];
  const handleImgMouse = (e) => { const r = e.currentTarget.getBoundingClientRect(); setZoomPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); };
  return (
    <main className="page product-detail-page">
      <nav className="breadcrumb"><Link to="/shop">Shop</Link><span>›</span><Link to={`/shop?cat=${product.category}`}>{product.category}</Link><span>›</span><span>{product.name}</span></nav>
      <section className="pd-hero">
        <div className="pd-gallery">
          <div className={`pd-main-image ${zoomed ? "zoomed" : ""}`} onMouseEnter={() => setZoomed(true)} onMouseLeave={() => setZoomed(false)} onMouseMove={handleImgMouse}>
            <img src={product.imageUrl || motorDriver} alt={product.name} style={zoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transform: "scale(2)" } : {}} />
          </div>
        </div>
        <div className="pd-info">
          <h1>{product.name}</h1>
          <p className="sku">{product.sku}</p>
          <div className="rating-row"><StarRating rating={product.rating} size={18} /><span className="review-count">{product.reviewCount} ratings</span></div>
          <div className="pd-badges">{product.badges?.map((b) => <span key={b} className="pd-badge">{b}</span>)}{product.compatibility?.map((c) => <span key={c} className="compat-tag">{c}</span>)}</div>
          <div className="pd-price-block">
            <div className="pd-price">{inr(product.price)} <small>/pcs</small></div>
            {product.mrp && <div className="pd-mrp"><s>{inr(product.mrp)}</s><span className="discount-badge">{discount}% off</span></div>}
          </div>
          {product.bulkPricing && <table className="bulk-table"><thead><tr><th>Qty</th><th>Price/pc</th></tr></thead><tbody>{product.bulkPricing.map((bp) => <tr key={bp.min}><td>{bp.min}–{bp.max === 999 ? "∞" : bp.max}</td><td>{inr(bp.price)}</td></tr>)}</tbody></table>}
          <div className="qty-row"><div className="qty-selector"><button onClick={() => setQty(Math.max(product.minQty || 1, qty - 1))}><Minus size={16} /></button><span>{qty}</span><button onClick={() => setQty(qty + 1)}><Plus size={16} /></button></div><small>Min order: {product.minQty || 1} pcs</small></div>
          <button className="add-quote-btn full" onClick={() => { for (let i = 0; i < qty; i++) add(product); }}><ShoppingCart size={16} /> Add to Quote</button>
          <div className="pd-secondary"><button onClick={() => wishToggle(product.id)} className={wishlisted ? "active" : ""}><Heart size={16} /> {wishlisted ? "Wishlisted" : "Add to Wishlist"}</button></div>
          <div className="pd-delivery glass-card"><div><Truck size={16} /><div><strong>Estimated dispatch:</strong> 2–3 business days</div></div><div><Zap size={16} /><div><strong>Free shipping</strong> above ₹999</div></div><div><Shield size={16} /><div><strong>Sold by:</strong> A5X Robotics ✓</div></div></div>
        </div>
      </section>
      <section className="pd-tabs">
        <div className="tab-headers">{tabs.map((t, i) => <button key={t} className={activeTab === i ? "active" : ""} onClick={() => setActiveTab(i)}>{t}</button>)}</div>
        <div className="tab-content glass-card">
          {activeTab === 0 && <div className="tab-overview"><p>{product.shortDescription}</p>{product.features && <><h4>Key Features</h4><ul>{product.features.map((f) => <li key={f}><Check size={14} /> {f}</li>)}</ul></>}</div>}
          {activeTab === 1 && <div className="tab-specs"><table className="specs-table"><tbody>{product.specs && Object.entries(product.specs).map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}</tbody></table></div>}
          {activeTab === 2 && <div className="tab-compat">{product.compatibility?.map((c) => <span key={c} className="compat-tag lg">{c}</span>)}</div>}
        </div>
      </section>
      {boughtTogether.length > 0 && <section className="pd-recs"><h3>Frequently Bought Together</h3><div className="recs-row">{boughtTogether.map((p) => <Link key={p.id} to={`/shop/${p.id}`} className="rec-card glass-card"><img src={p.imageUrl || motorDriver} alt={p.name} /><span>{p.name}</span><strong>{inr(p.price)}</strong></Link>)}</div></section>}
      {relatedProducts.length > 0 && <section className="pd-recs"><h3>Similar Products</h3><div className="recs-row">{relatedProducts.map((p) => <Link key={p.id} to={`/shop/${p.id}`} className="rec-card glass-card"><img src={p.imageUrl || motorDriver} alt={p.name} /><span>{p.name}</span><strong>{inr(p.price)}</strong></Link>)}</div></section>}
      {recentProducts.length > 0 && <section className="pd-recs"><h3>Recently Viewed</h3><div className="recs-row">{recentProducts.map((p) => <Link key={p.id} to={`/shop/${p.id}`} className="rec-card glass-card"><img src={p.imageUrl || motorDriver} alt={p.name} /><span>{p.name}</span><strong>{inr(p.price)}</strong></Link>)}</div></section>}
    </main>
  );
}

function ShopPage() { return <main className="shop-page-main"><ShopSection /></main>; }
function KitsPage() { return <main className="kits-page-wrap"><KitsSection /></main>; }
function PricingPage() { return <main><PricingSection /></main>; }
function AboutPage() {
  const stats = [
    { num: "500+", label: "Happy Makers" },
    { num: "50+", label: "Products" },
    { num: "10+", label: "Courses" },
    { num: "24hr", label: "Dispatch" },
  ];

  const values = [
    { icon: CircuitBoard, title: "India-Made Quality", desc: "Every component is sourced directly and tested to meet global standards before reaching your hands." },
    { icon: Zap, title: "No Middlemen", desc: "We work directly with manufacturers to give you the best prices without compromising on quality." },
    { icon: Shield, title: "Documentation Backed", desc: "Every product comes with full documentation, datasheets, and code examples to get you started fast." },
    { icon: Brain, title: "Built by Makers", desc: "Our team consists of engineers and robotics enthusiasts who understand exactly what builders need." },
    { icon: Rocket, title: "Fast Dispatch", desc: "Orders are packed and dispatched within 24 hours so your projects never have to wait." },
    { icon: Star, title: "Community First", desc: "We support schools, colleges, and maker communities with special pricing and workshop support." },
  ];

  const team = [
    {
      name: "Ansh Raj Baghel",
      role: "Co-Founder & Full-Stack Lead",
      desc: "💻 Turns caffeine into clean code. The backbone of every digital magic we create. ✨",
      photo: teamAnsh,
      initial: "A"
    },
    {
      name: "Anupam Mishra",
      role: "Co-Founder & AI/ML Software Lead",
      desc: "Predicts the future before algorithms even learn it. Brains + Machine = Innovation. 🤖 ✨",
      photo: teamAnupam,
      initial: "A"
    },
    {
      name: "Chris Alex Francis",
      role: "Co-Founder & IoT + Robotics Lead",
      desc: "Makes ideas move, blink & fly. If it's hardware, Chris already cracked it. ⚡ 🤖",
      photo: teamChris,
      initial: "C"
    },
    {
      name: "Amit Payasi",
      role: "Co-Founder & Hardware Lead",
      desc: "🔧 Soldering, circuits, sensors — if it's noisy & technical, Amit loves it. 🔥 💡",
      photo: teamAmit,
      initial: "A"
    },
    {
      name: "Aditya Mishra",
      role: "Co-Founder & Software Dev",
      desc: "🧠 Writes code so smooth, even bugs give up. UI? Logic? Speed? He owns it. ⚡ 💻",
      photo: teamAditya,
      initial: "A"
    },
  ];

  const timeline = [
    { year: "2024", title: "Founded", desc: "A5X Industries started with a vision to democratize robotics education in India." },
    { year: "2024", title: "First Products", desc: "Launched our first range of robotics components, reaching makers and students across India." },
    { year: "2025", title: "Academy Launch", desc: "Launched A5X Academy with free video courses for students and hobbyists." },
    { year: "2026", title: "Scaling Up", desc: "Expanding product range, adding premium kits, and building India's largest robotics community." },
  ];

  return (
    <main className="about-page-new">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-bg">
          <div className="about-hero-orb about-orb-1" />
          <div className="about-hero-orb about-orb-2" />
          <div className="about-hero-grid" />
        </div>
        <div className="about-hero-content">
          <p className="about-eyebrow">ABOUT A5X INDUSTRIES</p>
          <h1 className="about-hero-title">
            <span className="about-title-line1">BUILDING</span>
            <span className="about-title-line2">THE FUTURE</span>
          </h1>
          <p className="about-hero-desc">
            A5X Industries is India's premier destination for robotics components, kits, and education. 
            We believe every student deserves access to quality robotics tools and knowledge.
          </p>
          <div className="about-hero-stats">
            {stats.map(({ num, label }) => (
              <div key={label} className="about-stat">
                <span className="about-stat-num">{num}</span>
                <span className="about-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-hero-img">
          <img src={aboutArc} alt="A5X Robotics" />
          <div className="about-hero-img-glow" />
        </div>
      </div>

      {/* Mission */}
      <div className="about-mission">
        <div className="about-mission-inner">
          <div className="about-mission-text">
            <p className="about-eyebrow">OUR MISSION</p>
            <h2>Robotics for <em>Everyone</em></h2>
            <p>We started A5X Industries because we saw a gap — students and makers in India had brilliant ideas but couldn't find quality components at fair prices. We're here to change that.</p>
            <p>From a single Arduino to a complete robotics lab setup, we provide everything you need to bring your ideas to life. Our team of engineers personally tests every product we sell.</p>
            <Link to="/shop" className="btn" style={{ marginTop: '24px', display: 'inline-flex' }}>Explore Products</Link>
          </div>
          <div className="about-mission-img">
            <img src={robotHands} alt="Robot hands" />
            <div className="about-mission-badge">
              <Rocket size={20} />
              <span>Made for Makers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="about-values">
        <div className="about-section-header">
          <p className="about-eyebrow">WHY CHOOSE US</p>
          <h2>Our Core Values</h2>
          <p>What makes A5X different from every other electronics store</p>
        </div>
        <div className="about-values-grid">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="about-value-card">
              <div className="about-value-icon"><Icon size={24} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="about-timeline-section">
        <div className="about-section-header">
          <p className="about-eyebrow">OUR JOURNEY</p>
          <h2>How We Got Here</h2>
        </div>
        <div className="about-timeline">
          {timeline.map(({ year, title, desc }, i) => (
            <div key={year} className={`about-timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="about-timeline-content">
                <span className="about-timeline-year">{year}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <div className="about-timeline-dot" />
            </div>
          ))}
          <div className="about-timeline-line" />
        </div>
      </div>

      {/* Team */}
      <div className="about-team">
        <div className="about-section-header">
          <p className="about-eyebrow">THE TEAM</p>
          <h2>People Behind A5X</h2>
          <p>The co-founders building India's robotics future</p>
        </div>
        {/* Row 1: 3 cards */}
        <div className="about-team-row-3">
          {team.slice(0, 3).map(({ name, role, desc, photo, initial }) => (
            <div key={name} className="about-team-card">
              <div className="about-team-photo-wrap">
                <img src={photo} alt={name} className="about-team-photo" style={{ position: 'relative', zIndex: 2 }} />
                <div className="about-team-avatar-fallback" style={{ zIndex: 1 }}>{initial}</div>
              </div>
              <div className="about-team-card-body">
                <h3>{name}</h3>
                <span className="about-team-role">{role}</span>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Row 2: 2 cards centered */}
        <div className="about-team-row-2">
          {team.slice(3, 5).map(({ name, role, desc, photo, initial }) => (
            <div key={name} className="about-team-card">
              <div className="about-team-photo-wrap">
                <img src={photo} alt={name} className="about-team-photo" style={{ position: 'relative', zIndex: 2 }} />
                <div className="about-team-avatar-fallback" style={{ zIndex: 1 }}>{initial}</div>
              </div>
              <div className="about-team-card-body">
                <h3>{name}</h3>
                <span className="about-team-role">{role}</span>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="about-cta">
        <div className="about-cta-inner">
          <h2>Ready to Build Something Amazing?</h2>
          <p>Join 500+ makers, students, and engineers who trust A5X for their robotics projects.</p>
          <div className="about-cta-btns">
            <Link to="/shop" className="btn">Shop Components</Link>
            <Link to="/learn" className="btn ghost">Free Courses</Link>
            <Link to="/contact" className="btn ghost">Contact Us</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', organization: '', email: '', phone: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Phone validation - max 10 digits
    if (formData.phone && formData.phone.replace(/\D/g, '').length > 10) {
      alert('Phone number cannot exceed 10 digits');
      setLoading(false);
      return;
    }

    const contactData = { ...formData, id: Date.now().toString(), createdAt: new Date().toISOString(), status: 'new' };

    try {
      const res = await fetch('http://localhost:3001/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        // Also save to localStorage for admin panel
        const contacts = JSON.parse(localStorage.getItem('a5x-contacts') || '[]');
        contacts.unshift(contactData);
        localStorage.setItem('a5x-contacts', JSON.stringify(contacts));
        setSubmitted(true);
        setFormData({ name: '', organization: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Server error');
      }
    } catch {
      // Fallback: save to localStorage directly
      const contacts = JSON.parse(localStorage.getItem('a5x-contacts') || '[]');
      contacts.unshift(contactData);
      localStorage.setItem('a5x-contacts', JSON.stringify(contacts));
      setSubmitted(true);
      setFormData({ name: '', organization: '', email: '', phone: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <main className="contact-page">
      <section className="contact-form glass-card" style={{ textAlign: 'center', padding: '60px 40px' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
        <h2 style={{ color: 'var(--brand-cyan)', marginBottom: '12px' }}>Message Sent!</h2>
        <p style={{ color: 'var(--brand-steel)', marginBottom: '28px' }}>We'll get back to you within 24 hours.</p>
        <button className="btn" onClick={() => setSubmitted(false)}>Send Another Message</button>
      </section>
      <section className="contact-image"><img src={robotHandshake} alt="" /></section>
    </main>
  );

  return (
    <main className="contact-page">
      <section className="contact-form glass-card">
        <p className="eyebrow">CONTACT</p>
        <h1>Let's Build Together</h1>
        <p style={{ color: 'var(--brand-steel)', marginBottom: '28px' }}>Partner with A5X Industries for robotics workshops, lab setup, or bulk component orders.</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name *" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', padding: '12px 16px', fontSize: '14px' }} />
          <input name="organization" value={formData.organization} onChange={handleChange} placeholder="School / Organization" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', padding: '12px 16px', fontSize: '14px' }} />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address *" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', padding: '12px 16px', fontSize: '14px' }} />
          <input name="phone" value={formData.phone} onChange={(e) => {
            // Only allow digits, max 10
            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
            setFormData({ ...formData, phone: val });
          }} placeholder="Phone Number (10 digits)" maxLength={10} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', padding: '12px 16px', fontSize: '14px' }} />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message *" rows={5} required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', padding: '12px 16px', fontSize: '14px', resize: 'vertical' }} />
          <button type="submit" className="btn" disabled={loading} style={{ marginTop: '4px' }}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>
      <section className="contact-image"><img src={robotHandshake} alt="Robot and human hand with cyan ring" /></section>
    </main>
  );
}
function QuotePage() { return <GenericPage title="Request Quote" text="Your cart drawer holds quote items. Submit your build list and we will verify stock and pricing."><button className="btn" onClick={useCartStore.getState().toggle}>Open Quote Drawer</button></GenericPage>; }

function CartDrawer() {
  const navigate = useNavigate();
  const { open, items, toggle, inc, dec, remove, subtotal } = useCartStore();
  
  const handleCheckout = () => {
    toggle();
    navigate('/checkout');
  };
  
  return <AnimatePresence>{open && <motion.aside className="cart-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}><button className="icon-btn close" onClick={toggle}><X /></button><h2>Cart</h2><div className="cart-items">{items.length === 0 && <p className="empty-cart">Your cart is empty.</p>}{items.map((item) => <div className="cart-line" key={item.id}><img src={item.imageUrl || a5xCarKit} alt="" /><div><b>{item.name}</b><p>{inr(Number(item.price))}</p><div className="qty-control"><button onClick={() => dec(item.id)} aria-label={`Decrease ${item.name}`}>-</button><span>{item.qty}</span><button onClick={() => inc(item.id)} aria-label={`Increase ${item.name}`}>+</button></div></div><button className="icon-btn remove-btn" onClick={() => remove(item.id)} aria-label={`Remove ${item.name}`} title="Remove from cart"><Trash2 size={18} /></button></div>)}</div><footer><p>Subtotal <strong>{inr(subtotal())}</strong></p><button className="btn" disabled={!items.length} onClick={handleCheckout}>Checkout</button></footer></motion.aside>}</AnimatePresence>;
}

// Checkout Page
function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [qrTimer, setQrTimer] = useState(120); // 2 minutes
  const [qrExpired, setQrExpired] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false); // UPI scan confirmation
  const timerRef = useRef(null);

  // Get UPI ID set by admin
  const upiId = localStorage.getItem('a5x-upi-id') || '';
  const upiQrUrl = upiId
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(`upi://pay?pa=${upiId}&pn=A5X+Robotics&am=${subtotal()}&cu=INR`)}`
    : '';

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    customerNotes: '',
    paymentMethod: 'cod'
  });

  // Start QR timer when online payment selected
  useEffect(() => {
    if (formData.paymentMethod === 'online' && upiId) {
      setShowQR(true);
      setQrTimer(120);
      setQrExpired(false);
      setPaymentConfirmed(false); // reset confirmation when switching
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setQrTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setQrExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setShowQR(false);
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [formData.paymentMethod, upiId]);

  const refreshQR = () => {
    setQrExpired(false);
    setQrTimer(120);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setQrTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setQrExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Limit phone to 10 digits only
    if (name === 'customerPhone') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, customerPhone: digits });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.customerPhone.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    // If online payment with QR, user must confirm they've scanned and paid
    if (formData.paymentMethod === 'online' && upiId && !paymentConfirmed) {
      alert('Please scan the QR code and tick "I have completed the payment" before placing your order.');
      return;
    }
    setLoading(true);

    try {
      const orderData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          landmark: formData.landmark
        },
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty,
          imageUrl: item.imageUrl
        })),
        subtotal: subtotal(),
        shippingCost: 0,
        tax: 0,
        total: subtotal(),
        paymentMethod: formData.paymentMethod,
        customerNotes: formData.customerNotes
      };

      const response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (data.success) {
        clearInterval(timerRef.current);
        setSuccess(true);
        setOrderNumber(data.order.orderNumber);
        useCartStore.setState({ items: [] });
        setTimeout(() => navigate('/'), 5000);
      } else {
        alert('Order failed. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const qrMins = String(Math.floor(qrTimer / 60)).padStart(2, '0');
  const qrSecs = String(qrTimer % 60).padStart(2, '0');

  if (items.length === 0 && !success) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty glass-card">
          <ShoppingCart size={56} style={{ opacity: 0.4, marginBottom: 16 }} />
          <h2>Your cart is empty</h2>
          <p>Add some products before checking out</p>
          <Link to="/shop" className="btn" style={{ marginTop: 24 }}>Go to Shop</Link>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="checkout-page">
        <motion.div className="checkout-success glass-card" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="success-icon"><CheckCircle size={64} color="#00ff88" /></div>
          <h2>Order Placed!</h2>
          <p className="order-num">#{orderNumber}</p>
          <p className="success-msg">Thank you! We'll send a confirmation to your email shortly.</p>
          <Link to="/" className="btn" style={{ marginTop: 24 }}>Back to Home</Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <motion.div
        className="checkout-container"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        {/* ── LEFT: FORM ── */}
        <div className="checkout-form glass-card">
          <div className="checkout-header">
            <Shield size={28} color="#00ff88" />
            <h1>Secure Checkout</h1>
            <p className="checkout-subtitle">Complete your order in a few simple steps</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Contact */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon"><MessageSquare size={18} /></div>
                <h3>Contact Information</h3>
              </div>
              <div className="input-group">
                <span className="input-prefix-icon">👤</span>
                <input type="text" name="customerName" placeholder="Full Name" value={formData.customerName} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <span className="input-prefix-icon">📧</span>
                <input type="email" name="customerEmail" placeholder="Email Address" value={formData.customerEmail} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <span className="input-prefix-icon">📱</span>
                <input
                  type="tel"
                  name="customerPhone"
                  placeholder="10-digit Phone Number"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  maxLength={10}
                  pattern="\d{10}"
                  inputMode="numeric"
                  required
                />
                <span className="phone-counter" style={{ color: formData.customerPhone.length === 10 ? '#00ff88' : 'rgba(255,255,255,0.4)' }}>
                  {formData.customerPhone.length}/10
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon"><Truck size={18} /></div>
                <h3>Shipping Address</h3>
              </div>
              <div className="input-group">
                <span className="input-prefix-icon">🏠</span>
                <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="input-group">
                  <span className="input-prefix-icon">🏙️</span>
                  <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <span className="input-prefix-icon">📍</span>
                  <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <span className="input-prefix-icon">📮</span>
                  <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <span className="input-prefix-icon">🗺️</span>
                  <input type="text" name="landmark" placeholder="Landmark (Optional)" value={formData.landmark} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon"><BadgeIndianRupee size={18} /></div>
                <h3>Payment Method</h3>
              </div>
              <div className="payment-options">
                {[
                  { value: 'cod', icon: <Truck size={22} />, label: 'Cash on Delivery', sub: 'Pay when you receive' },
                  { value: 'online', icon: <Zap size={22} />, label: 'Online Payment', sub: 'UPI, Cards, Net Banking' },
                  { value: 'bank_transfer', icon: <BadgeIndianRupee size={22} />, label: 'Bank Transfer', sub: 'Direct bank transfer' },
                ].map(opt => (
                  <label key={opt.value} className={`payment-option ${formData.paymentMethod === opt.value ? 'active' : ''}`}>
                    <input type="radio" name="paymentMethod" value={opt.value} checked={formData.paymentMethod === opt.value} onChange={handleChange} />
                    <div className="payment-content">
                      <span className="pay-icon">{opt.icon}</span>
                      <div>
                        <strong>{opt.label}</strong>
                        <p>{opt.sub}</p>
                      </div>
                      {formData.paymentMethod === opt.value && <Check size={16} className="pay-check" />}
                    </div>
                  </label>
                ))}
              </div>

              {/* QR Code Panel */}
              <AnimatePresence>
                {showQR && upiId && (
                  <motion.div
                    className="qr-panel glass-card"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="qr-title">Scan to Pay via UPI</p>
                    <p className="qr-upi-id">{upiId}</p>
                    <div className="qr-image-wrap" style={{ position: 'relative' }}>
                      {qrExpired ? (
                        <div className="qr-expired-overlay">
                          <p>QR Expired</p>
                          <button type="button" className="btn" onClick={refreshQR} style={{ marginTop: 10, padding: '8px 20px', fontSize: 13 }}>Refresh QR</button>
                        </div>
                      ) : (
                        <img src={upiQrUrl} alt="UPI QR Code" className="qr-image" />
                      )}
                    </div>
                    <div className={`qr-timer ${qrTimer <= 30 ? 'urgent' : ''}`}>
                      <span>⏱ QR expires in </span>
                      <strong>{qrMins}:{qrSecs}</strong>
                    </div>
                    <p className="qr-note">After payment, place your order below</p>
                    {/* Payment confirmation checkbox */}
                    <label className="qr-confirm-label">
                      <input
                        type="checkbox"
                        checked={paymentConfirmed}
                        onChange={e => setPaymentConfirmed(e.target.checked)}
                        disabled={qrExpired}
                      />
                      <span>I have completed the payment ✅</span>
                    </label>
                  </motion.div>
                )}
                {formData.paymentMethod === 'online' && !upiId && (
                  <motion.div className="qr-panel glass-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '20px' }}>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>UPI payment QR not configured yet. Please use COD or Bank Transfer.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notes */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon"><MessageSquare size={18} /></div>
                <h3>Order Notes <span style={{ fontWeight: 400, opacity: 0.5, fontSize: 13 }}>(Optional)</span></h3>
              </div>
              <textarea name="customerNotes" placeholder="Any special instructions for your order?" value={formData.customerNotes} onChange={handleChange} rows="3" className="notes-textarea" />
            </div>

            <motion.button
              type="submit"
              className="checkout-btn"
              disabled={loading || (formData.paymentMethod === 'online' && upiId && !paymentConfirmed)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title={formData.paymentMethod === 'online' && upiId && !paymentConfirmed ? 'Please scan QR and confirm payment first' : ''}
            >
              {loading ? <><div className="spinner" />Processing...</> : <><Shield size={18} />Place Secure Order — {inr(subtotal())}</>}
            </motion.button>

            <div className="secure-badge">
              <Shield size={14} />
              <span>Secure SSL Encrypted Checkout</span>
            </div>
          </form>
        </div>

        {/* ── RIGHT: ORDER SUMMARY ── */}
        <div className="order-summary glass-card">
          <div className="summary-header">
            <ShoppingCart size={20} />
            <h3>Order Summary</h3>
            <span className="summary-count">{items.reduce((s, i) => s + i.qty, 0)} item{items.reduce((s, i) => s + i.qty, 0) !== 1 ? 's' : ''}</span>
          </div>
          <div className="summary-items">
            {items.map(item => (
              <motion.div key={item.id} className="summary-item" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                <img src={item.imageUrl || a5xCarKit} alt={item.name} />
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-qty">Qty: {item.qty} × {inr(item.price)}</p>
                </div>
                <p className="item-total">{inr(item.price * item.qty)}</p>
              </motion.div>
            ))}
          </div>
          <div className="summary-divider" />
          <div className="summary-totals">
            <div className="summary-row"><span>Subtotal</span><span>{inr(subtotal())}</span></div>
            <div className="summary-row shipping"><span><Truck size={14} /> Shipping</span><span className="free-badge">FREE</span></div>
            <div className="summary-row total"><span>Total</span><span>{inr(subtotal())}</span></div>
          </div>
          <div className="trust-badges">
            <div className="trust-badge"><Shield size={16} /><span>Secure Payment</span></div>
            <div className="trust-badge"><Truck size={16} /><span>Fast Delivery</span></div>
            <div className="trust-badge"><CheckCircle size={16} /><span>Easy Returns</span></div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

// Admin Orders Component
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null); // tracks which order is being updated

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('a5x-admin-token');
      const url = filter === 'all'
        ? `${API_BASE}/api/orders`
        : `${API_BASE}/api/orders?status=${filter}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    setUpdatingId(orderId + status);
    try {
      const token = localStorage.getItem('a5x-admin-token');
      const response = await fetch(`${API_BASE}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state immediately — no need to refetch
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
        setSelectedOrder(prev => prev ? { ...prev, status } : null);
        const label = status === 'confirmed' ? 'confirmed ✅ — confirmation email sent to customer'
          : status === 'shipped' ? 'marked as shipped 🚚 — shipping email sent'
          : status === 'delivered' ? 'marked as delivered 🎉'
          : 'cancelled ❌';
        alert(`Order ${label}`);
      } else {
        alert(data.error || 'Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order. Check your connection.');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffa500',
      confirmed: '#00ff88',
      processing: '#00bfff',
      shipped: '#9370db',
      delivered: '#32cd32',
      cancelled: '#ff4444'
    };
    return colors[status] || '#888';
  };

  if (loading) {
    return <div className="admin-page"><p>Loading orders...</p></div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Orders Management</h1>
        <div className="filter-buttons">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
          <button className={filter === 'confirmed' ? 'active' : ''} onClick={() => setFilter('confirmed')}>Confirmed</button>
          <button className={filter === 'shipped' ? 'active' : ''} onClick={() => setFilter('shipped')}>Shipped</button>
          <button className={filter === 'delivered' ? 'active' : ''} onClick={() => setFilter('delivered')}>Delivered</button>
        </div>
      </div>

      <div className="orders-grid">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map(order => (
            <div key={order._id} className="order-card glass-card" onClick={() => setSelectedOrder(order)}>
              <div className="order-header">
                <h3>#{order.orderNumber}</h3>
                <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                  {order.status}
                </span>
              </div>
              <div className="order-info">
                <p><strong>{order.customerName}</strong></p>
                <p>{order.customerPhone}</p>
                <p>{order.customerEmail}</p>
                <p className="order-date">{new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              <div className="order-summary">
                <p>{order.items.length} item(s)</p>
                <p><strong>{inr(order.total)}</strong></p>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="icon-btn close" onClick={() => setSelectedOrder(null)}><X /></button>
            
            <h2>Order Details - #{selectedOrder.orderNumber}</h2>
            
            <div className="order-details">
              <div className="detail-section">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
              </div>

              <div className="detail-section">
                <h3>Shipping Address</h3>
                <p>{selectedOrder.address.street}</p>
                <p>{selectedOrder.address.city}, {selectedOrder.address.state}</p>
                <p>Pincode: {selectedOrder.address.pincode}</p>
                {selectedOrder.address.landmark && <p>Landmark: {selectedOrder.address.landmark}</p>}
              </div>

              <div className="detail-section">
                <h3>Order Items</h3>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <img src={item.imageUrl || a5xCarKit} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div>
                      <p><strong>{item.name}</strong></p>
                      <p>Qty: {item.quantity} × {inr(item.price)}</p>
                    </div>
                    <p><strong>{inr(item.price * item.quantity)}</strong></p>
                  </div>
                ))}
              </div>

              <div className="detail-section">
                <h3>Payment</h3>
                <p><strong>Method:</strong> {selectedOrder.paymentMethod.toUpperCase()}</p>
                <p><strong>Total:</strong> {inr(selectedOrder.total)}</p>
              </div>

              {selectedOrder.customerNotes && (
                <div className="detail-section">
                  <h3>Customer Notes</h3>
                  <p>{selectedOrder.customerNotes}</p>
                </div>
              )}

              <div className="detail-section">
                <h3>Update Status</h3>
                <div className="status-buttons">
                  {selectedOrder.status === 'pending' && (
                    <button
                      className="btn btn-success"
                      disabled={!!updatingId}
                      onClick={() => updateOrderStatus(selectedOrder._id, 'confirmed')}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 160 }}
                    >
                      {updatingId === selectedOrder._id + 'confirmed'
                        ? <><div className="spinner" style={{ borderTopColor: '#0a0a0f' }} />Confirming...</>
                        : <>✅ Confirm Order</>}
                    </button>
                  )}
                  {selectedOrder.status === 'confirmed' && (
                    <button
                      className="btn btn-primary"
                      disabled={!!updatingId}
                      onClick={() => updateOrderStatus(selectedOrder._id, 'shipped')}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 160 }}
                    >
                      {updatingId === selectedOrder._id + 'shipped'
                        ? <><div className="spinner" style={{ borderTopColor: '#fff' }} />Updating...</>
                        : <>🚚 Mark as Shipped</>}
                    </button>
                  )}
                  {selectedOrder.status === 'shipped' && (
                    <button
                      className="btn btn-success"
                      disabled={!!updatingId}
                      onClick={() => updateOrderStatus(selectedOrder._id, 'delivered')}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 160 }}
                    >
                      {updatingId === selectedOrder._id + 'delivered'
                        ? <><div className="spinner" style={{ borderTopColor: '#0a0a0f' }} />Updating...</>
                        : <>🎉 Mark as Delivered</>}
                    </button>
                  )}
                  {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                    <button
                      className="btn btn-danger"
                      disabled={!!updatingId}
                      onClick={() => updateOrderStatus(selectedOrder._id, 'cancelled')}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 140 }}
                    >
                      {updatingId === selectedOrder._id + 'cancelled'
                        ? <><div className="spinner" style={{ borderTopColor: '#fff' }} />Cancelling...</>
                        : <>❌ Cancel Order</>}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer-pro">
      {/* Top glow line */}
      <div className="footer-glow-line" />

      <div className="footer-inner">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="footer-logo-text">A5X</span>
            <span className="footer-logo-sub">ROBOTICS</span>
          </div>
          <p className="footer-brand-desc">
            Premium robotics components, kits, and courses for engineers, students, and makers. Building the future, one circuit at a time.
          </p>
          <div className="footer-social-row">
            <Link to="/contact" className="footer-social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </Link>
            <Link to="/contact" className="footer-social-btn" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>
            </Link>
            <Link to="/contact" className="footer-social-btn" aria-label="Twitter/X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </Link>
            <Link to="/contact" className="footer-social-btn" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </Link>
          </div>
          <div className="footer-badge-row">
            <span className="footer-badge"><Check size={12} /> Secure Payments</span>
            <span className="footer-badge"><Truck size={12} /> Fast Dispatch</span>
          </div>
        </div>

        {/* Products Column */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Products</h4>
          <ul className="footer-link-list">
            <li><Link to="/shop">Microcontrollers</Link></li>
            <li><Link to="/shop">Sensors</Link></li>
            <li><Link to="/shop">Motors</Link></li>
            <li><Link to="/shop">Motor Drivers</Link></li>
            <li><Link to="/shop">Displays</Link></li>
            <li><Link to="/shop">Batteries</Link></li>
            <li><Link to="/kits">Robotics Kits</Link></li>
          </ul>
        </div>

        {/* Learn Column */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Learn</h4>
          <ul className="footer-link-list">
            <li><Link to="/learn">All Courses</Link></li>
            <li><Link to="/learn">Beginner Guides</Link></li>
            <li><Link to="/learn">Arduino Tutorials</Link></li>
            <li><Link to="/learn">ESP32 Projects</Link></li>
            <li><Link to="/learn">Robotics Academy</Link></li>
            <li><Link to="/learn">IoT & Cloud</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Company</h4>
          <ul className="footer-link-list">
            <li><Link to="/about">About A5X</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/contact">Shipping Policy</Link></li>
            <li><Link to="/contact">Return Policy</Link></li>
            <li><Link to="/contact">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footer-newsletter-col">
          <h4 className="footer-col-title">Stay Updated</h4>
          <p className="footer-newsletter-desc">Get new product launches, tutorials, and exclusive deals.</p>
          <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="footer-contact-info">
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📧</span>
              <span>support@a5xindustries.com</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📱</span>
              <span>+91 82698 58259</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📍</span>
              <span>India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            © {currentYear} <strong>A5X Industries</strong>. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/contact">Terms of Service</Link>
            <span className="footer-dot" />
            <Link to="/contact">Privacy Policy</Link>
            <span className="footer-dot" />
            <Link to="/contact">Cookie Policy</Link>
          </div>
          <p className="footer-made-with">
            Made with <span style={{color:'#ef4444'}}>♥</span> for makers
          </p>
        </div>
      </div>
    </footer>
  );
}

function AdminAuthGuard() {
  return localStorage.getItem("a5x-admin-token") ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Get API URL
  const API_URL = API_BASE;
  
  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    
    const data = Object.fromEntries(new FormData(event.currentTarget));
    
    console.log('Submitting login with:', { email: data.email, password: '***' });
    console.log('API URL:', API_URL);
    
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password })
      });
      
      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);
      
      if (response.ok && result.token) {
        // Check if user is admin
        if (result.user.role === "admin") {
          localStorage.setItem("a5x-admin-token", result.token);
          localStorage.setItem("a5x-admin-user", JSON.stringify(result.user));
          navigate("/admin/dashboard");
        } else {
          setError("Access denied. Admin privileges required.");
        }
      } else {
        setError(result.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Connection error. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <>
      <CustomCursor />
      <main className="admin-login">
        <form onSubmit={submit}>
          <h1>A5X Admin</h1>
          <input 
            name="email" 
            type="email"
            placeholder="admin@a5xrobotics.com" 
            required 
            disabled={loading}
            defaultValue="admin@a5xrobotics.com"
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            required 
            disabled={loading}
            defaultValue="Admin@123456"
          />
          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="error-message" style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
          <small style={{ marginTop: '1rem', opacity: 0.7 }}>
            Default: admin@a5xrobotics.com / Admin@123456
          </small>
        </form>
      </main>
    </>
  );
}

function AdminLayout() {
  const navigate = useNavigate();
  const items = [
    [LayoutDashboard, "Dashboard", "/admin/dashboard"],
    [Package, "Products", "/admin/products"],
    [Layers, "Kits", "/admin/kits"],
    [PlayCircle, "Courses & Videos", "/admin/courses"],
    [ShoppingCart, "Orders", "/admin/orders"],
    [MessageSquare, "Contacts", "/admin/contacts"],
    [Settings, "Settings", "/admin/settings"]
  ];
  return <><CustomCursor /><div className="admin-shell"><aside><Link className="logo" to="/"><span>A5X</span><small>ADMIN PANEL</small></Link>{items.map(([Icon, label, to]) => <NavLink key={to} to={to}><Icon size={18} />{label}</NavLink>)}<button onClick={() => { localStorage.removeItem("a5x-admin-token"); navigate("/admin/login"); }}><LogOut size={18} />Logout</button></aside><main><Outlet /></main></div></>;
}

function AdminDashboard() {
  const { products, kits, courses } = useAdminStore();
  const stats = [["Total Products", products.length], ["Total Kits", kits.length], ["Total Courses", courses.length], ["Total Videos", courses.reduce((sum, course) => sum + (course.videos?.length || 0), 0)]];
  return <AdminPage title="Dashboard"><div className="stat-cards">{stats.map(([label, value]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div><div className="quick-actions"><Link to="/admin/products/new">+ Add Product</Link><Link to="/admin/kits/new">+ Add Kit</Link><Link to="/admin/courses/new">+ Add Course</Link></div><AdminProducts compact /></AdminPage>;
}

function AdminPage({ title, children }) { return <section className="admin-page"><p>Admin / {title}</p><h1>{title}</h1>{children}</section>; }

function AdminProducts({ compact }) {
  const { products, deleteProduct } = useAdminStore();
  const [query, setQuery] = useState("");
  const filtered = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
  return <AdminPage title={compact ? "Recently Added Products" : "Products"}>{!compact && <div className="admin-tools"><input placeholder="Search products" value={query} onChange={(event) => setQuery(event.target.value)} /><Link to="/admin/products/new">+ Add New Product</Link></div>}<table><tbody>{filtered.slice(0, compact ? 5 : filtered.length).map((product) => <tr key={product.id}><td><img src={product.imageUrl || motorDriver} alt="" /></td><td>{product.name}<small>{product.sku}</small></td><td>{product.category}</td><td>{inr(Number(product.price))}</td><td>{product.inStock ? "In Stock" : "Out"}</td><td><Link to={`/admin/products/${product.id}`}><Pencil size={16} /></Link><button onClick={() => confirm("Delete product?") && deleteProduct(product.id)}><Trash2 size={16} /></button></td></tr>)}</tbody></table></AdminPage>;
}

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useAdminStore();
  const product = products.find((item) => item.id === id);
  const upload = useFileUpload({ types: ["image"], maxMb: 5 });
  const [deliveryType, setDeliveryType] = useState(product?.quickDelivery === true ? 'quick' : product?.quickDelivery === false ? 'scheduled' : 'all');
  
  function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const quickDeliveryValue = data.deliveryType === 'all' ? undefined : data.deliveryType === 'quick';
    const payload = { ...product, ...data, price: Number(data.price), minQty: Number(data.minQty || 1), rating: Number(data.rating || 4.7), inStock: data.inStock === "on", quickDelivery: quickDeliveryValue, imageUrl: upload.previewUrl || product?.imageUrl };
    product ? updateProduct(product.id, payload) : addProduct(payload);
    navigate("/admin/products");
  }
  
  return <AdminPage title={product ? "Edit Product" : "Add Product"}><form className="admin-form" onSubmit={submit}><input name="name" defaultValue={product?.name} placeholder="Product Name*" required /><input name="sku" defaultValue={product?.sku || "A5X-XX-000"} placeholder="SKU*" required /><select name="category" defaultValue={product?.category || "MicroController"}>{categories.slice(1).map((category) => <option key={category}>{category}</option>)}</select><input name="price" type="number" defaultValue={product?.price} placeholder="Price" required /><input name="minQty" type="number" defaultValue={product?.minQty || 1} /><label><input type="checkbox" name="inStock" defaultChecked={product?.inStock ?? true} /> In Stock</label><div style={{marginTop: '16px', marginBottom: '16px'}}><p style={{marginBottom: '8px', fontWeight: 600, color: '#0066FF'}}>Delivery Type:</p><label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer'}}><input type="radio" name="deliveryType" value="all" checked={deliveryType === 'all'} onChange={(e) => setDeliveryType(e.target.value)} /><Package size={16} style={{color: '#718096'}} /> All (Show in both filters)</label><label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer'}}><input type="radio" name="deliveryType" value="quick" checked={deliveryType === 'quick'} onChange={(e) => setDeliveryType(e.target.value)} /><Zap size={16} style={{color: '#0066FF'}} /> Quick Delivery (1 Day)</label><label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}><input type="radio" name="deliveryType" value="scheduled" checked={deliveryType === 'scheduled'} onChange={(e) => setDeliveryType(e.target.value)} /><Truck size={16} style={{color: '#718096'}} /> Scheduled Delivery (1 Week)</label></div><textarea name="description" placeholder="Short Description" /><input name="tags" placeholder="Tags, comma-separated" /><input name="rating" type="number" step=".1" defaultValue={product?.rating || 4.7} /><FileDrop upload={upload} accept="image/*" /><button>Save Product</button><Link to="/admin/products">Cancel</Link></form></AdminPage>;
}

function FileDrop({ upload, accept = "image/*,video/*" }) {
  return <label className="drop"><Upload /><span>{upload.previewUrl ? "Uploaded preview ready" : "Drop or click to upload"}</span><input type="file" accept={accept} onChange={(event) => upload.upload(event.target.files[0])} />{upload.progress > 0 && <i style={{ width: `${upload.progress}%` }} />}{upload.previewUrl && <img src={upload.previewUrl} alt="" />}{upload.error && <p>{upload.error}</p>}</label>;
}

function AdminKits() {
  const { kits, deleteKit } = useAdminStore();
  return <AdminPage title="Kits"><div className="admin-tools"><Link to="/admin/kits/new">+ Add New Kit</Link></div><table><thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Items</th><th>Video</th><th>Actions</th></tr></thead><tbody>{kits.map((kit) => <tr key={kit.id}><td><img src={kit.imageUrl || a5xCarKit} alt="" /></td><td>{kit.name}<small>{kit.tier}</small></td><td>{inr(Number(kit.price))}</td><td>{kit.includes.length} items</td><td>{kit.videoUrl ? <span style={{color: '#0f0', display: 'flex', alignItems: 'center', gap: '4px'}}><PlayCircle size={14} /> Yes</span> : <span style={{opacity: 0.5}}>No</span>}</td><td><Link to={`/admin/kits/${kit.id}`}><Pencil size={16} /></Link><button onClick={() => confirm("Delete kit?") && deleteKit(kit.id)}><Trash2 size={16} /></button></td></tr>)}</tbody></table></AdminPage>;
}

function KitForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { kits, addKit, updateKit } = useAdminStore();
  const kit = kits.find((item) => item.id === id);
  const videoUpload = useFileUpload({ types: ["video"], maxMb: 500 });
  const imageUpload = useFileUpload({ types: ["image"], maxMb: 5 });
  
  function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = { 
      ...kit, 
      ...data, 
      price: Number(data.price), 
      rating: Number(data.rating || 4.8), 
      includes: data.includes.split(",").map((item) => item.trim()).filter(Boolean),
      imageUrl: imageUpload.previewUrl || kit?.imageUrl || data.imageUrl,
      videoUrl: videoUpload.previewUrl || kit?.videoUrl || "",
      videoDuration: videoUpload.duration || kit?.videoDuration || 0
    };
    kit ? updateKit(kit.id, payload) : addKit(payload);
    navigate("/admin/kits");
  }
  
  return <AdminPage title={kit ? "Edit Kit" : "Add Kit"}><form className="admin-form" onSubmit={submit}>
    <input name="name" defaultValue={kit?.name} placeholder="Kit Name" required />
    <select name="tier" defaultValue={kit?.tier || "STARTER KIT"}>
      <option>STARTER KIT</option>
      <option>PRO KIT</option>
      <option>ELITE KIT</option>
    </select>
    <input name="price" type="number" defaultValue={kit?.price} placeholder="Price" />
    <textarea name="description" defaultValue={kit?.description} placeholder="Description" />
    <input name="includes" defaultValue={kit?.includes?.join(", ")} placeholder="What's included (comma separated)" />
    <input name="rating" type="number" step=".1" defaultValue={kit?.rating || 4.8} />
    
    <h4 style={{marginTop: '2rem', marginBottom: '1rem'}}>Kit Image</h4>
    <FileDrop upload={imageUpload} accept="image/*" />
    <input name="imageUrl" defaultValue={kit?.imageUrl} placeholder="Or image URL" />
    
    <h4 style={{marginTop: '2rem', marginBottom: '1rem'}}>Premium Kit Video (Optional)</h4>
    <FileDrop upload={videoUpload} accept="video/mp4,video/webm,video/quicktime" />
    
    <button>Save Kit</button>
  </form></AdminPage>;
}

function AdminCourses() {
  const { courses, deleteCourse, updateCourse } = useAdminStore();
  return (
    <AdminPage title="Courses & Videos">
      <div className="admin-tools">
        <Link to="/admin/courses/new" className="btn">+ New Course</Link>
      </div>
      <div className="admin-courses-grid">
        {courses.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: 'var(--brand-steel)' }}>
            <p>No courses yet. Create your first course!</p>
          </div>
        )}
        {courses.map((course) => (
          <div key={course.id} className="admin-course-card">
            {/* Thumbnail */}
            <div className="admin-course-thumb">
              <img src={course.thumbnailUrl || a5xCarKit} alt={course.title} />
              <span className={`admin-course-status ${course.isPublished ? 'published' : 'draft'}`}>
                {course.isPublished ? 'Published' : 'Draft'}
              </span>
              <span className="admin-course-level-tag">{course.level}</span>
            </div>

            {/* Info */}
            <div className="admin-course-info">
              <h3 className="admin-course-title">{course.title}</h3>
              <p className="admin-course-meta">
                <span>{course.category}</span>
                <span>·</span>
                <span>{course.videos?.length || 0} videos</span>
                <span>·</span>
                <span>By {course.instructor || 'Unknown'}</span>
              </p>
              {course.youtubeUrl && (
                <a href={course.youtubeUrl} target="_blank" rel="noopener noreferrer" className="admin-course-yt-link">
                  🔗 YouTube Link
                </a>
              )}
            </div>

            {/* Actions */}
            <div className="admin-course-actions">
              <label className="admin-course-toggle">
                <input
                  type="checkbox"
                  checked={course.isPublished}
                  onChange={(e) => updateCourse(course.id, { isPublished: e.target.checked })}
                />
                <span>{course.isPublished ? 'Published' : 'Draft'}</span>
              </label>
              <div className="admin-course-btns">
                <Link to={`/admin/courses/${course.id}`} className="admin-course-edit-btn">
                  <Pencil size={14} /> Edit
                </Link>
                <button className="admin-course-delete-btn" onClick={() => {
                  if (confirm(`Delete "${course.title}"?`)) deleteCourse(course.id);
                }}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminPage>
  );
}

function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, addCourse, updateCourse } = useAdminStore();
  const course = courses.find((item) => item.id === id);
  const [thumbnailPreview, setThumbnailPreview] = useState(course?.thumbnailUrl || '');

  function handleThumbnailChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Convert to base64 so it persists in localStorage
    const reader = new FileReader();
    reader.onload = (ev) => setThumbnailPreview(ev.target.result);
    reader.readAsDataURL(file);
  }

  function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = {
      ...course,
      ...data,
      thumbnailUrl: thumbnailPreview || course?.thumbnailUrl || a5xCarKit,
      youtubeUrl: data.youtubeUrl || course?.youtubeUrl || '',
      tags: data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      isFeatured: data.isFeatured === "on",
      isPublished: data.isPublished === "on",
      videos: course?.videos || [],
      createdAt: course?.createdAt || new Date().toISOString().slice(0, 10),
    };
    course ? updateCourse(course.id, payload) : addCourse(payload);
    navigate("/admin/courses");
  }

  return (
    <AdminPage title={course ? "Edit Course" : "New Course"}>
      <form className="admin-form" onSubmit={submit}>
        <div className="admin-form-group">
          <label className="admin-label">Course Title *</label>
          <input name="title" defaultValue={course?.title} placeholder="e.g. Robotics From Zero" required />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Description</label>
          <textarea name="description" defaultValue={course?.description} placeholder="What will students learn?" rows={3} />
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Level</label>
            <select name="level" defaultValue={course?.level || "BEGINNER"}>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Category</label>
            <input name="category" defaultValue={course?.category || "Robotics"} placeholder="e.g. Arduino, ESP32" />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Instructor Name</label>
            <input name="instructor" defaultValue={course?.instructor} placeholder="Instructor name" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Tags (comma separated)</label>
            <input name="tags" defaultValue={course?.tags?.join(", ")} placeholder="Arduino, Motors, Sensors" />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Course Thumbnail Image</label>
          <input type="file" accept="image/*" onChange={handleThumbnailChange} />
          {thumbnailPreview && (
            <img src={thumbnailPreview} alt="Thumbnail preview" style={{ width: '200px', height: '120px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' }} />
          )}
        </div>

        <div className="admin-form-group">
          <label className="admin-label">🎬 YouTube Video Link (Direct Watch Link)</label>
          <input
            name="youtubeUrl"
            defaultValue={course?.youtubeUrl}
            placeholder="https://www.youtube.com/watch?v=... (students click Watch Now → opens this)"
          />
          <small style={{ color: 'var(--brand-steel)', fontSize: '12px', marginTop: '4px' }}>
            Paste your YouTube video URL here. When students click "Watch Now", this link will open directly.
          </small>
        </div>

        <div className="admin-form-row">
          <label className="admin-checkbox-label">
            <input type="checkbox" name="isFeatured" defaultChecked={course?.isFeatured} />
            <span>Featured Course</span>
          </label>
          <label className="admin-checkbox-label">
            <input type="checkbox" name="isPublished" defaultChecked={course?.isPublished ?? true} />
            <span>Published</span>
          </label>
        </div>

        <button type="submit" className="admin-save-btn">
          {course ? "Update Course" : "Create Course"}
        </button>
      </form>

      {/* Videos Section */}
      {course && (
        <div className="admin-videos-section">
          <div className="admin-videos-header">
            <h3>Course Videos ({course.videos?.length || 0})</h3>
            <Link to={`/admin/courses/${course.id}/videos/new`} className="btn">+ Add Video</Link>
          </div>
          {course.videos?.length > 0 ? (
            <div className="admin-videos-list">
              {course.videos.map((video, index) => (
                <div key={video.id} className="admin-video-item">
                  <span className="admin-video-num">{String(index + 1).padStart(2, '0')}</span>
                  <img src={video.thumbnailUrl || a5xCarKit} alt="" className="admin-video-thumb" />
                  <div className="admin-video-info">
                    <strong>{video.title}</strong>
                    <span>{video.videoUrl ? '🔗 YouTube Link' : '📁 No video'} • {seconds(video.duration || 0)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--brand-steel)', padding: '20px 0' }}>No videos yet. Add your first video!</p>
          )}
        </div>
      )}
    </AdminPage>
  );
}

function AdminVideoUpload() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addVideo = useAdminStore((state) => state.addVideo);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeId, setYoutubeId] = useState('');

  function extractYoutubeId(url) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return '';
  }

  function handleYoutubeChange(e) {
    const url = e.target.value;
    setYoutubeUrl(url);
    const ytId = extractYoutubeId(url);
    setYoutubeId(ytId);
    // Auto-set thumbnail from YouTube
    if (ytId && !thumbnailPreview) {
      setThumbnailPreview(`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`);
    }
  }

  function handleThumbnailChange(e) {
    const file = e.target.files?.[0];
    if (file) setThumbnailPreview(URL.createObjectURL(file));
  }

  function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const ytId = extractYoutubeId(youtubeUrl || data.videoUrl || '');
    const embedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : (data.videoUrl || '');
    const autoThumb = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '';

    addVideo(id, {
      ...data,
      videoUrl: embedUrl || data.videoUrl || '',
      youtubeId: ytId,
      thumbnailUrl: thumbnailPreview || autoThumb || a5xCarKit,
      duration: Number(data.duration || 300),
      relatedProducts: data.relatedProducts ? data.relatedProducts.split(",").map((item) => item.trim()).filter(Boolean) : [],
      publishedAt: new Date().toISOString().slice(0, 10)
    });
    navigate(`/admin/courses/${id}`);
  }

  return (
    <AdminPage title="Add Video to Course">
      <form className="admin-form" onSubmit={submit}>

        <div className="admin-form-group">
          <label className="admin-label">Video Title *</label>
          <input name="title" placeholder="e.g. Introduction to Motors" required />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Description</label>
          <textarea name="description" placeholder="What will students learn in this video?" rows={3} />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">🎬 YouTube Video URL *</label>
          <input
            name="videoUrl"
            placeholder="https://www.youtube.com/watch?v=..."
            value={youtubeUrl}
            onChange={handleYoutubeChange}
          />
          {youtubeId && (
            <div style={{ marginTop: '12px', borderRadius: '10px', overflow: 'hidden', maxWidth: '400px' }}>
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                alt="YouTube thumbnail"
                style={{ width: '100%', borderRadius: '10px' }}
              />
              <p style={{ color: '#10b981', fontSize: '13px', marginTop: '6px' }}>✅ YouTube video detected! ID: {youtubeId}</p>
            </div>
          )}
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Custom Thumbnail (Optional - auto-fetched from YouTube)</label>
          <input type="file" accept="image/*" onChange={handleThumbnailChange} />
          {thumbnailPreview && !youtubeId && (
            <img src={thumbnailPreview} alt="Thumbnail" style={{ width: '200px', height: '120px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' }} />
          )}
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Duration (seconds)</label>
            <input name="duration" type="number" placeholder="e.g. 600 (10 min)" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Related Product IDs</label>
            <input name="relatedProducts" placeholder="esp32, l298n (comma separated)" />
          </div>
        </div>

        <button type="submit" className="admin-save-btn">Save Video</button>
      </form>
    </AdminPage>
  );
}

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load from localStorage (fallback) + try API
    const loadContacts = async () => {
      try {
        const token = localStorage.getItem('a5x-admin-token');
        const res = await fetch('http://localhost:3001/api/contacts', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setContacts(data.contacts || []);
          return;
        }
      } catch {}
      // Fallback to localStorage
      const local = JSON.parse(localStorage.getItem('a5x-contacts') || '[]');
      setContacts(local);
    };
    loadContacts();
  }, []);

  const markRead = (id) => {
    const updated = contacts.map(c => c.id === id ? { ...c, status: 'read' } : c);
    setContacts(updated);
    localStorage.setItem('a5x-contacts', JSON.stringify(updated));
  };

  const deleteContact = (id) => {
    if (!confirm('Delete this contact?')) return;
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    localStorage.setItem('a5x-contacts', JSON.stringify(updated));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = filter === 'all' ? contacts : contacts.filter(c => c.status === filter || (!c.status && filter === 'new'));
  const newCount = contacts.filter(c => !c.status || c.status === 'new').length;

  return (
    <AdminPage title="Contact Messages">
      <div className="contacts-toolbar">
        <div className="contacts-filters">
          {[['all', 'All'], ['new', 'New'], ['read', 'Read']].map(([val, label]) => (
            <button key={val} className={`contacts-filter-btn ${filter === val ? 'active' : ''}`} onClick={() => setFilter(val)}>
              {label} {val === 'new' && newCount > 0 && <span className="contacts-badge">{newCount}</span>}
            </button>
          ))}
        </div>
        <span className="contacts-count">{filtered.length} messages</span>
      </div>

      {filtered.length === 0 ? (
        <div className="contacts-empty">
          <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
          <p>No contact messages yet</p>
        </div>
      ) : (
        <div className="contacts-layout">
          {/* List */}
          <div className="contacts-list">
            {filtered.map(contact => (
              <div
                key={contact.id}
                className={`contact-item ${selected?.id === contact.id ? 'active' : ''} ${!contact.status || contact.status === 'new' ? 'unread' : ''}`}
                onClick={() => { setSelected(contact); markRead(contact.id); }}
              >
                <div className="contact-item-avatar">{contact.name?.[0]?.toUpperCase() || '?'}</div>
                <div className="contact-item-info">
                  <div className="contact-item-name">{contact.name}</div>
                  <div className="contact-item-preview">{contact.message?.slice(0, 50)}...</div>
                  <div className="contact-item-time">{new Date(contact.createdAt).toLocaleDateString('en-IN')}</div>
                </div>
                {(!contact.status || contact.status === 'new') && <div className="contact-unread-dot" />}
              </div>
            ))}
          </div>

          {/* Detail */}
          <div className="contact-detail">
            {selected ? (
              <>
                <div className="contact-detail-header">
                  <div className="contact-detail-avatar">{selected.name?.[0]?.toUpperCase()}</div>
                  <div>
                    <h3 className="contact-detail-name">{selected.name}</h3>
                    <p className="contact-detail-org">{selected.organization || 'No organization'}</p>
                  </div>
                  <button className="contact-delete-btn" onClick={() => deleteContact(selected.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="contact-detail-fields">
                  <div className="contact-field">
                    <span className="contact-field-label">📧 Email</span>
                    <a href={`mailto:${selected.email}`} className="contact-field-value contact-link">{selected.email || '—'}</a>
                  </div>
                  <div className="contact-field">
                    <span className="contact-field-label">📱 Phone</span>
                    <a href={`tel:${selected.phone}`} className="contact-field-value contact-link">{selected.phone || '—'}</a>
                  </div>
                  <div className="contact-field">
                    <span className="contact-field-label">🏢 Organization</span>
                    <span className="contact-field-value">{selected.organization || '—'}</span>
                  </div>
                  <div className="contact-field">
                    <span className="contact-field-label">📅 Date</span>
                    <span className="contact-field-value">{new Date(selected.createdAt).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="contact-message-box">
                  <p className="contact-field-label">💬 Message</p>
                  <p className="contact-message-text">{selected.message}</p>
                </div>
                <div className="contact-reply-actions">
                  <a href={`mailto:${selected.email}?subject=Re: Your inquiry to A5X Robotics`} className="btn">
                    Reply via Email
                  </a>
                  {selected.phone && (
                    <a href={`https://wa.me/91${selected.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn ghost">
                      WhatsApp
                    </a>
                  )}
                </div>
              </>
            ) : (
              <div className="contact-detail-empty">
                <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminPage>
  );
}

function AdminSettings() {
  const [upiId, setUpiId] = useState(() => localStorage.getItem('a5x-upi-id') || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('a5x-upi-id', upiId.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const previewQr = upiId.trim()
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`upi://pay?pa=${upiId.trim()}&pn=A5X+Robotics&cu=INR`)}`
    : '';

  return (
    <AdminPage title="Settings">
      <form className="admin-form" onSubmit={handleSave}>
        <input placeholder="Site name" defaultValue="A5X Robotics" />
        <input placeholder="Tagline" defaultValue="Build the Future" />
        <input placeholder="Contact email" defaultValue="support@a5x.in" />
        <input placeholder="Phone" />
        <textarea placeholder="Address" />
        <input placeholder="Meta title" />
        <textarea placeholder="SEO description" />

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 24, paddingTop: 24 }}>
          <h3 style={{ marginBottom: 12, color: '#00ff88', fontSize: 16 }}>💳 UPI Payment Settings</h3>
          <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 12 }}>
            Enter your UPI ID. Customers who select "Online Payment" at checkout will see a QR code to scan.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <input
                type="text"
                placeholder="yourname@upi (e.g. ansh@paytm)"
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
                style={{ width: '100%' }}
              />
              <p style={{ fontSize: 12, opacity: 0.5, marginTop: 6 }}>
                Supports: @paytm, @gpay, @phonepe, @ybl, @okaxis, etc.
              </p>
            </div>
            {previewQr && (
              <div style={{ textAlign: 'center' }}>
                <img src={previewQr} alt="UPI QR Preview" style={{ borderRadius: 8, border: '2px solid rgba(0,255,136,0.3)', display: 'block' }} />
                <p style={{ fontSize: 11, opacity: 0.5, marginTop: 6 }}>QR Preview</p>
              </div>
            )}
          </div>
        </div>

        <button type="submit" style={{ marginTop: 16 }}>
          {saved ? '✅ Saved!' : 'Save Settings'}
        </button>
      </form>
    </AdminPage>
  );
}

// ── SCROLL TO TOP ON ROUTE CHANGE ──
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ProductDetailPage />} />
          <Route path="/kits" element={<KitsPage />} />
          <Route path="/kits/:id" element={<KitDetailPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/:courseId" element={<LearnPage />} />
          <Route path="/learn/:courseId/:videoId" element={<VideoPlayerPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route element={<AdminAuthGuard />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/new" element={<ProductForm />} />
            <Route path="/admin/products/:id" element={<ProductForm />} />
            <Route path="/admin/kits" element={<AdminKits />} />
            <Route path="/admin/kits/new" element={<KitForm />} />
            <Route path="/admin/kits/:id" element={<KitForm />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/admin/courses/new" element={<CourseForm />} />
            <Route path="/admin/courses/:id" element={<CourseForm />} />
            <Route path="/admin/courses/:id/videos/new" element={<AdminVideoUpload />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
