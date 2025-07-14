import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Layout = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-grow bg-[#f4f7fb] ">
        <Outlet />
      </main>
      <Footer />

      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out transform ${
          showScrollTop
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <Button
          onClick={scrollToTop}
          className="bg-amber-500 text-white p-3 rounded-full shadow-xl hover:bg-amber-600"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Layout;
