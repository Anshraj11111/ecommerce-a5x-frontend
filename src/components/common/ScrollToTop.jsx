import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Don't scroll to top on admin edit/new pages — preserve scroll position
    if (pathname.startsWith('/admin/')) return;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default ScrollToTop;
