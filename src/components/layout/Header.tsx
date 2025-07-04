import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserLocation } from "@/hooks/useUserLocation";
import Logo from "@/../public/logo.png";
interface NavItem {
  href: string;
  label: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isToggleClicked, setIsToggleClicked] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsToggleClicked(true);
    setTimeout(() => setIsToggleClicked(false), 300);
  };

  const navItems: NavItem[] = [
    { href: "/", label: "Trang chủ" },
    { href: "#rooms", label: "Phòng" },
    { href: "#services", label: "Dịch vụ" },
    { href: "#contact", label: "Liên hệ" },
    { href: "/login", label: "Đăng nhập" },
    { href: "/register", label: "Đăng ký" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-[#003580] text-white shadow-lg sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "py-1" : "py-2"
      }`}
    >
      {/* Main header content */}
      <div
        className={`container mx-auto px-4 transition-all duration-500 ease-in-out ${
          isScrolled ? "py-1" : "py-2"
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo and brand */}
          <div className="flex items-center gap-2 group">
            <div
              className={`bg-[#feba02] p-2 rounded-full shadow-md transition-all duration-500 ease-in-out group-hover:animate-pulse`}
            >
              <img
                src={Logo}
                alt="Logo"
                className={`${
                  isScrolled ? "w-6 h-6" : "w-8 h-8"
                } object-contain transition-all duration-500 ease-in-out`}
              />
            </div>
            <div className="text-center">
              <h1
                className={`font-roboto font-extrabold tracking-tight bg-clip-text text-transparent bg-white transition-all duration-500 ease-in-out ${
                  isScrolled ? "text-base" : "text-lg"
                }`}
              >
                Happy Travel
              </h1>
              <p
                className={`text-[#7c90a6] font-roboto font-medium transition-all duration-500 ease-in-out ${
                  isScrolled ? "text-[10px]" : "text-xs"
                }`}
              >
                Premium Hotel Booking
              </p>
            </div>
          </div>

          {/* Toggle button for mobile */}
          <Button
            variant="default"
            size="icon"
            className={`bg-transparent lg:hidden text-[#f2f6fa] ${
              isToggleClicked ? "opacity-50" : "opacity-100"
            }`}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative text-[#f2f6fa] font-roboto font-medium hover:brightness-125 transition-all duration-500 ease-in-out group ${
                  isScrolled ? "text-sm" : "text-base"
                } ${item.label === "Đăng ký" ? "text-[#feba02]" : ""}`}
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#feba02] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav
            className={`lg:hidden mt-2 bg-[#003580]/95 backdrop-blur-sm rounded-lg py-2 px-2 animate-slide-down transition-all duration-500 ease-in-out`}
          >
            <div className="flex flex-col items-center gap-1.5">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`w-full text-center py-2 text-sm text-[#f2f6fa] font-roboto font-medium hover:Text-white hover:bg-[#009fe3]/50 rounded-lg transition-all duration-300 ${
                    item.label === "Đăng ký" ? "text-[#feba02]" : ""
                  }`}
                  onClick={toggleMenu}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
