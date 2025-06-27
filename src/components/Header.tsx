import React from "react";
import { Calendar, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone size={14} />
              <span>+84 123 456 789</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail size={14} />
              <span>info@hoteluxury.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin size={14} />
            <span>Hà Nội, Việt Nam</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Calendar size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">HotelLuxury</h1>
              <p className="text-sm text-gray-600">Premium Hotel Booking</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Trang chủ
            </a>
            <a
              href="#rooms"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Phòng
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Dịch vụ
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Liên hệ
            </a>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Đặt phòng ngay
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
