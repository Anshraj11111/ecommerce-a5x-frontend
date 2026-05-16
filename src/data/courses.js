import a5xCarKit from "../assets/a5x-car-kit.jpg";
import motorDriver from "../assets/motor-driver.jpg";
import neonFigure from "../assets/neon-figure.jpg";
import gridInnovation from "../assets/grid-innovation.jpg";
import robotHands from "../assets/robot-hands.jpg";

export const coursesSeed = [
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