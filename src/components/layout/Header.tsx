import React, { useState } from "react";
import { Phone, Mail, MapPin, Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserLocation } from "@/hooks/useUserLocation";
import Logo from "../../../public/logo.png";

interface NavItem {
  href: string;
  label: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const location: string = useUserLocation();

  const navItems: NavItem[] = [
    { href: "/", label: "Trang chủ" },
    { href: "#rooms", label: "Phòng" },
    { href: "#services", label: "Dịch vụ" },
    { href: "#contact", label: "Liên hệ" },
    { href: "#contact", label: "Đăng nhập" },
    { href: "#contact", label: "Liên hệ" },
  ];

  return (
    <header className="bg-[#003580] text-white shadow-xl sticky top-0 z-50">
      <div className="bg-[#003580]/30 py-2 sm:py-3">
        <div className="container mx-auto px-2 sm:px-4 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-2 sm:mb-0">
            <a
              href="tel:+84336407016"
              className="flex items-center gap-1 sm:gap-2 hover:opacity-75 duration-300 group"
            >
              <Phone
                size={12}
                className="group-hover:opacity-75 transition-transform"
              />
              <span>+84 336 407 016</span>
            </a>
            <a
              href="mailto:bennguyen.contact@gmail.com"
              className="flex items-center gap-1 sm:gap-2 hover:opacity-75 duration-300 group"
            >
              <Mail
                size={12}
                className="group-hover:opacity-75 transition-transform"
              />
              <span>bennguyen.contact@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 hover:opacity-75 duration-300 group">
            <MapPin
              size={12}
              className="group-hover:opacity-75 transition-transform"
            />
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="bg-[#feba02] p-2 sm:p-3 rounded-full shadow-lg transform hover:scale-105 hover:rotate-3 transition-all duration-300">
              <img
                src={Logo}
                alt="Logo"
                className="w-6 h-6 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
              />
            </div>
            <div className="text-center sm:text-left mt-2 sm:mt-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-roboto font-extrabold tracking-tight bg-clip-text text-transparent bg-white">
                Happy Travel
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-[#7c90a6] font-roboto font-medium mt-1">
                Premium Hotel Booking
              </p>
            </div>
          </div>
          <nav className="w-full lg:w-auto">
            <div className="hidden lg:flex items-center gap-6 sm:gap-8 md:gap-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-[#f2f6fa] font-roboto font-medium text-base sm:text-lg hover:text-white transition-colors duration-300 group"
                >
                  {item.label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#feba02] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <Button className="bg-[#feba02] text-[#003580] font-roboto font-semibold px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-[#009fe3] hover:scale-105 transition-all duration-300 shadow-md">
                Đặt phòng ngay
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden w-full mt-2 text-[#f2f6fa] hover:text-[#feba02]"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </nav>
        </div>
        {isMenuOpen && (
          <nav className="lg:hidden mt-3 bg-[#003580]/95 backdrop-blur-sm rounded-xl py-3 px-2 shadow-2xl animate-slide-down">
            <div className="flex flex-col items-center gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="w-full text-center py-2 text-[#f2f6fa] font-roboto font-medium text-base hover:text-white hover:bg-[#009fe3]/50 rounded-lg transition-all duration-300"
                  onClick={toggleMenu}
                >
                  {item.label}
                </a>
              ))}
              <Button
                className="w-full bg-[#feba02] text-[#003580] font-roboto font-semibold px-4 py-1.5 rounded-full hover:bg-[#009fe3] hover:scale-105 transition-all duration-300"
                onClick={toggleMenu}
              >
                Đặt phòng ngay
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
