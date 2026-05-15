import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Styles
import "./styles.css";
import "./home-premium.css";
import "./hero-v4.css";
import "./shop-amazon.css";
import "./learn-watch.css";
import "./cart-modern.css";

// Config
import { API_BASE } from "./config/constants";

// Stores
import useAdminStore from "./stores/useAdminStore";

// Layout components
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";

// Auth components
import GoogleAuthSuccess from "./components/auth/GoogleAuthSuccess";

// Pages
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import WishlistPage from "./pages/WishlistPage";
import LoginPage from "./pages/LoginPage";
import KitsPage, { KitDetailPage } from "./pages/KitsPage";
import LearnPage, { VideoPlayerPage } from "./pages/LearnPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";
import QuotePage from "./pages/misc/QuotePage";
import PricingPage from "./pages/misc/PricingPage";

// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminAuthGuard from "./admin/AdminAuthGuard";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminKits from "./admin/AdminKits";
import AdminCourses from "./admin/AdminCourses";
import AdminOrders from "./admin/AdminOrders";
import AdminContacts from "./admin/AdminContacts";
import AdminSettings from "./admin/AdminSettings";
import ProductForm from "./admin/forms/ProductForm";
import KitForm from "./admin/forms/KitForm";
import CourseForm from "./admin/forms/CourseForm";
import AdminVideoUpload from "./admin/forms/AdminVideoUpload";

function App() {
  const loadProducts = useAdminStore((s) => s.loadProducts);
  const loadKits = useAdminStore((s) => s.loadKits);

  useEffect(() => {
    fetch(`${API_BASE}/api/health`).catch(() => {});
    loadProducts();
    loadKits();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ProtectedRoute><ShopPage /></ProtectedRoute>} />
          <Route path="/shop/:id" element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/google/success" element={<GoogleAuthSuccess />} />
          <Route path="/kits" element={<ProtectedRoute><KitsPage /></ProtectedRoute>} />
          <Route path="/kits/:id" element={<ProtectedRoute><KitDetailPage /></ProtectedRoute>} />
          <Route path="/learn" element={<ProtectedRoute><LearnPage /></ProtectedRoute>} />
          <Route path="/learn/:courseId" element={<ProtectedRoute><LearnPage /></ProtectedRoute>} />
          <Route path="/learn/:courseId/:videoId" element={<ProtectedRoute><VideoPlayerPage /></ProtectedRoute>} />
          <Route path="/pricing" element={<ProtectedRoute><PricingPage /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
          <Route path="/quote" element={<ProtectedRoute><QuotePage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
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

export default App;
