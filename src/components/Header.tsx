import React, { useState } from "react";
import { Calendar, Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 text-white shadow-lg">
      {/* Top bar */}
      <div className="bg-black bg-opacity-20 py-3">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-2 sm:mb-0">
            <div className="flex items-center gap-2 hover:text-blue-300 transition-colors duration-300">
              <Phone size={16} />
              <span>+84 123 456 789</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-300 transition-colors duration-300">
              <Mail size={16} />
              <span>info@hoteluxury.com</span>
            </div>
          </div>
          <div className="flex items-center gap-2 hover:text-blue-300 transition-colors duration-300">
            <MapPin size={16} />
            <span>Hà Nội, Việt Nam</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          {/* Logo and Branding */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-3 rounded-full shadow-md transform hover:scale-105 transition-transform duration-300">
              <Calendar size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold tracking-tight">
                HotelLuxury
              </h1>
              <p className="text-sm text-blue-200">Premium Hotel Booking</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="/"
              className="text-blue-100 font-medium hover:text-white hover:border-b-2 border-blue-300 transition-all duration-300"
            >
              Trang chủ
            </a>
            <a
              href="#rooms"
              className="text-blue-100 font-medium hover:text-white hover:border-b-2 border-blue-300 transition-all duration-300"
            >
              Phòng
            </a>
            <a
              href="#services"
              className="text-blue-100 font-medium hover:text-white hover:border-b-2 border-blue-300 transition-all duration-300"
            >
              Dịch vụ
            </a>
            <a
              href="#contact"
              className="text-blue-100 font-medium hover:text-white hover:border-b-2 border-blue-300 transition-all duration-300"
            >
              Liên hệ
            </a>
            <Button className="bg-amber-500 text-gray-900 font-semibold px-6 py-2 rounded-full hover:bg-amber-400 transition-colors duration-300">
              Đặt phòng ngay
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 bg-blue-900 bg-opacity-90 rounded-lg py-4 animate-slide-down">
            <div className="flex flex-col items-center gap-4">
              <a
                href="/"
                className="text-blue-100 font-medium hover:text-white hover:bg-blue-700 w-full text-center py-2 rounded transition-all duration-300"
                onClick={toggleMenu}
              >
                Trang chủ
              </a>
              <a
                href="#rooms"
                className="text-blue-100 font-medium hover:text-white hover:bg-blue-700 w-full text-center py-2 rounded transition-all duration-300"
                onClick={toggleMenu}
              >
                Phòng
              </a>
              <a
                href="#services"
                className="text-blue-100 font-medium hover:text-white hover:bg-blue-700 w-full text-center py-2 rounded transition-all duration-300"
                onClick={toggleMenu}
              >
                Dịch vụ
              </a>
              <a
                href="#contact"
                className="text-blue-100 font-medium hover:text-white hover:bg-blue-700 w-full text-center py-2 rounded transition-all duration-300"
                onClick={toggleMenu}
              >
                Liên hệ
              </a>
              <Button
                className="bg-amber-500 text-gray-900 font-semibold px-6 py-2 rounded-full hover:bg-amber-400 transition-colors duration-300"
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
