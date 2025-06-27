import React from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import RoomCard from "@/components/RoomCard";
import { Star, Shield, Award, Headphones } from "lucide-react";

const Index = () => {
  const featuredRooms = [
    {
      id: 1,
      name: "Phòng Deluxe Giường Đôi",
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
      price: 2500000,
      rating: 4.9,
      reviews: 56,
      features: ["WiFi miễn phí", "Bữa sáng", "Đỗ xe miễn phí"],
      capacity: 4,
      bedType: "1 giường đôi + 1 sofa bed",
    },
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Đặt phòng an toàn",
      description: "Hệ thống đặt phòng bảo mật với mã hóa SSL",
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Chất lượng đảm bảo",
      description: "Khách sạn 5 sao với dịch vụ chuyên nghiệp",
    },
    {
      icon: <Headphones className="w-8 h-8 text-blue-600" />,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ chăm sóc khách hàng luôn sẵn sàng",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Khám Phá Những Trải Nghiệm
            <span className="block text-yellow-400">Tuyệt Vời</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Đặt phòng khách sạn cao cấp với giá tốt nhất. Trải nghiệm dịch vụ 5
            sao cùng không gian sang trọng.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.8/5 Đánh giá</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white opacity-30"></div>
            <span>Hơn 1000+ khách hàng hài lòng</span>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="container mx-auto px-4">
        <SearchBar />
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm đặt phòng tuyệt vời nhất
              với dịch vụ chuyên nghiệp
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section id="rooms" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Phòng nổi bật
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn sàng cho chuyến đi của bạn?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Đặt phòng ngay hôm nay để nhận ưu đãi đặc biệt và trải nghiệm dịch
            vụ tuyệt vời
          </p>
          <button className="bg-yellow-400 text-blue-800 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors">
            Đặt phòng ngay
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">HotelLuxury</h3>
              <p className="text-gray-400">
                Khách sạn cao cấp với dịch vụ chuyên nghiệp và không gian sang
                trọng tại trung tâm thành phố.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liên kết nhanh</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a
                    href="#rooms"
                    className="hover:text-white transition-colors"
                  >
                    Phòng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Dịch vụ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Spa & Wellness</li>
                <li>Nhà hàng</li>
                <li>Hội nghị</li>
                <li>Đưa đón sân bay</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liên hệ</h4>
              <div className="space-y-2 text-gray-400">
                <p>📍 123 Đường ABC, Hà Nội</p>
                <p>📞 +84 123 456 789</p>
                <p>✉️ info@hoteluxury.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HotelLuxury. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
