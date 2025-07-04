import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Star,
  Shield,
  Award,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";

const SearchBar: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg -mt-12 relative z-10">
      <form className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Điểm đến
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
            placeholder="Hà Nội, Việt Nam"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Ngày nhận phòng
          </label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Ngày trả phòng
          </label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Số khách
          </label>
          <input
            type="number"
            min="1"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
            placeholder="2"
          />
        </div>
        <div className="flex items-end">
          <Button className="w-full bg-amber-500 text-gray-900 hover:bg-amber-400 rounded-lg py-3">
            Tìm kiếm
          </Button>
        </div>
      </form>
    </div>
  );
};

const RoomCard: React.FC<{
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  features: string[];
  capacity: number;
  bedType: string;
}> = ({
  id,
  name,
  image,
  price,
  rating,
  reviews,
  features,
  capacity,
  bedType,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/room/${id}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover hover:opacity-90 transition-opacity duration-300"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <div className="flex items-center mb-2">
          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          <span className="ml-1 font-medium">
            {rating} ({reviews} đánh giá)
          </span>
        </div>
        <p className="text-gray-600 mb-2">Sức chứa: {capacity} người</p>
        <p className="text-gray-600 mb-2">Loại giường: {bedType}</p>
        <ul className="text-gray-600 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="text-sm">
              • {feature}
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-amber-500">
            {price.toLocaleString()} VNĐ
          </span>
          <Button
            className="bg-amber-500 text-gray-900 hover:bg-amber-400"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click from triggering
              navigate(`/room/${id}`);
            }}
          >
            Đặt ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

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

  const features = [
    {
      icon: <Shield className="w-10 h-10 text-amber-500" />,
      title: "Đặt phòng an toàn",
      description: "Hệ thống đặt phòng bảo mật với mã hóa SSL",
    },
    {
      icon: <Award className="w-10 h-10 text-amber-500" />,
      title: "Chất lượng đảm bảo",
      description: "Khách sạn 5 sao với dịch vụ chuyên nghiệp",
    },
    {
      icon: <Headphones className="w-10 h-10 text-amber-500" />,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ chăm sóc khách hàng luôn sẵn sàng",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-fade-in">
            Khám Phá Những Trải Nghiệm
            <span className="block text-amber-400 mt-2">Tuyệt Vời</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-up">
            Đặt phòng khách sạn cao cấp với giá tốt nhất. Trải nghiệm dịch vụ 5
            sao cùng không gian sang trọng.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <a href="/login">
              <Button className="bg-amber-500 text-gray-900 hover:bg-amber-400 px-6 py-3 rounded-full font-semibold transition-colors duration-300">
                Đăng nhập
              </Button>
            </a>
            <a href="/register">
              <Button className="bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900 px-6 py-3 rounded-full font-semibold transition-colors duration-300">
                Đăng ký
              </Button>
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
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
                className="text-center p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4 transform hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section id="rooms" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
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
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4 animate-fade-in">
            Sẵn sàng cho chuyến đi của bạn?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Đặt phòng ngay hôm nay để nhận ưu đãi đặc biệt và trải nghiệm dịch
            vụ tuyệt vời
          </p>
          <Button className="bg-amber-500 text-gray-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-amber-400 transition-colors duration-300">
            Đặt phòng ngay
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">HotelLuxury</h3>
              <p className="text-gray-400">
                Khách sạn cao cấp với dịch vụ chuyên nghiệp và không gian sang
                trọng tại trung tâm thành phố.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liên kết nhanh</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a
                    href="#rooms"
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
                    Phòng
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
                    Dịch vụ
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
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
                <p className="flex items-center gap-2">
                  <MapPin size={16} /> 123 Đường ABC, Hà Nội
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} /> +84 123 456 789
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={16} /> info@hoteluxury.com
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 HotelLuxury. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
