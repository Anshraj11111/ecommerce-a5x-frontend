import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";
import AuthModal from "../auth/AuthModal";
import AxieWidget from "../ai/AxieWidget";
import { AuroraBackground, TwinkleField, FloatingOrbs, CustomCursor } from "../effects/BackgroundEffects";

function MainLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';
  const showCursor = true; // Always show cursor
  
  return (
    <>
      <AuroraBackground />
      <TwinkleField />
      <FloatingOrbs />
      {showCursor && <CustomCursor />}
      {!hideNavbar && <Navbar />}
      <Outlet />
      {!hideNavbar && <Footer />}
      <CartDrawer />
      <AuthModal />
      <AxieWidget />
    </>
  );
}

export default MainLayout;