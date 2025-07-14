import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, Mail } from "lucide-react";
import CountUp from "react-countup";
const HeroSection: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white py-16 sm:py-20 md:py-28 overflow-hidden -mt-16"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative container mx-auto px-4 text-center mt-6">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-inter font-bold leading-tight mb-4">
          Đặt Phòng Khách Sạn Cao Cấp
          <span className="block text-amber-400 mt-1">
            Nhanh Chóng & Tiện Lợi
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 text-white/90">
          Tìm và đặt phòng khách sạn lý tưởng cho kỳ nghỉ hoặc công tác của bạn.
          Hệ thống tiện nghi, giá cả minh bạch và hỗ trợ tận tình 24/7.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8">
          <a href="/register">
            <Button className="bg-amber-500 text-gray-900 hover:bg-amber-400 px-6 py-3 rounded-lg font-bold transition-all duration-300">
              Đặt phòng ngay
            </Button>
          </a>
          <a href="/contact">
            <Button className="bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300">
              Liên hệ hỗ trợ
            </Button>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8 text-left text-sm sm:text-base">
          <div className="flex items-start gap-2">
            <CheckCircle className="text-amber-400 w-5 h-5 mt-1" />
            <span>Hệ thống khách sạn đạt chuẩn 3-5 sao toàn quốc</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="text-amber-400 w-5 h-5 mt-1" />
            <span>Giao diện thân thiện, đặt phòng dễ dàng</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="text-amber-400 w-5 h-5 mt-1" />
            <span>Hỗ trợ khách hàng nhanh chóng, chuyên nghiệp</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto mt-6">
          <label htmlFor="email" className="sr-only">
            Nhập email để nhận ưu đãi
          </label>
          <div className="relative w-full sm:w-auto flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="email"
              type="email"
              placeholder="Nhập email để nhận ưu đãi"
              className="pl-10 pr-4 py-2 w-full rounded-full text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm transition"
            />
          </div>
          <Button className="bg-amber-500 text-gray-900 hover:bg-amber-400 px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow">
            Đăng ký
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mt-8 text-sm text-white/80">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span>4.9/5 đánh giá từ khách hàng</span>
          </div>
          <span className="hidden sm:inline-block w-px h-4 bg-white opacity-30"></span>
          <span>
            Đã phục vụ hơn{" "}
            <span className="text-amber-400 font-bold text-base sm:text-lg drop-shadow-glow gap-1">
              <CountUp end={10000} duration={2.5} separator="." />+
            </span>
            lượt đặt phòng thành công
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
