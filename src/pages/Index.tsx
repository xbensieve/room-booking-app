import React, { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import WhyUsSection from "@/components/WhyUsSection";
import RoomCard from "@/components/RoomCard";
import ScrollReveal from "@/components/ScrollReveal";
const Index: React.FC = () => {
  const featuredRooms = [
    {
      id: 1,
      name: "Phòng Deluxe Giường Đôi",
      image:
        "https://www.cet.edu.vn/wp-content/uploads/2018/01/phong-deluxe-la-gi.jpg",
      price: 1500000,
      rating: 4.8,
      reviews: 127,
      features: ["WiFi miễn phí", "Bữa sáng", "Đỗ xe miễn phí"],
      capacity: 2,
      bedType: "Giường đôi King",
    },
    {
      id: 2,
      name: "Phòng Superior Twin",
      image:
        "https://nhuminhplazahotel.com/wp-content/uploads/2018/12/image-1-2.png",
      price: 1200000,
      rating: 4.6,
      reviews: 89,
      features: ["WiFi miễn phí", "Đỗ xe miễn phí"],
      capacity: 2,
      bedType: "2 giường đơn",
    },
    {
      id: 3,
      name: "Suite Gia Đình",
      image:
        "https://ezcloud.vn/wp-content/uploads/2023/10/family-suite-la-gi.webp",
      price: 2500000,
      rating: 4.9,
      reviews: 56,
      features: ["WiFi miễn phí", "Bữa sáng", "Đỗ xe miễn phí"],
      capacity: 4,
      bedType: "1 giường đôi + 1 sofa bed",
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ScrollReveal delay={0.1}>
        <section className="container mx-auto px-4">
          <SearchBar />
        </section>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <WhyUsSection />
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <section id="rooms" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-roboto font-bold text-gray-800 mb-4">
                Phòng nổi bật
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Khám phá các phòng được khách hàng yêu thích nhất với thiết kế
                sang trọng và tiện nghi hiện đại
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRooms.map((room) => (
                <RoomCard key={room.id} {...room} />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default Index;
