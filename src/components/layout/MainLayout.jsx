import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";
import AuthModal from "../auth/AuthModal";
import { AuroraBackground, TwinkleField, FloatingOrbs, CustomCursor } from "../common/AnimationComponents";

function MainLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';
  const showCursor = true;

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
    </>
  );
}

export default MainLayout;
