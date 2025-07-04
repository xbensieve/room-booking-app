import React from "react";
import {
  Star,
  Wifi,
  Coffee,
  Car,
  Users,
  Bed,
  Bath,
  Tv,
  AirVent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";

const RoomDetails: React.FC = () => {
  const room = {
    id: 1,
    name: "Phòng Deluxe Giường Đôi",
    images: [
      "https://bizweb.dktcdn.net/100/514/927/products/phong-deluxe-giuong-doi-co-ban-cong-va-tam-nhin-ra-thanh-pho-khach-san-phan-van.jpg?v=1730963722513",
      "https://vinapad.com/wp-content/uploads/2019/03/phong-deluxe-2.jpg",
      "https://rosevalleydalat.com/wp-content/uploads/2018/03/deluxe-family-1.jpg",
      "https://www.lionhotel.vn/files/branch/room/f_69_IMG_5366.jpg",
    ],
    price: 1500000,
    rating: 4.8,
    reviews: 127,
    description:
      "Phòng Deluxe rộng rãi với thiết kế hiện đại, trang bị đầy đủ tiện nghi cao cấp. Phòng có view thành phố tuyệt đẹp và không gian thoải mái để nghỉ ngơi.",
    amenities: [
      { name: "WiFi miễn phí", icon: <Wifi size={20} /> },
      { name: "Bữa sáng miễn phí", icon: <Coffee size={20} /> },
      { name: "Đỗ xe miễn phí", icon: <Car size={20} /> },
      { name: "Phòng tắm riêng", icon: <Bath size={20} /> },
      { name: "TV màn hình phẳng", icon: <Tv size={20} /> },
      { name: "Điều hòa", icon: <AirVent size={20} /> },
    ],
    capacity: 2,
    bedType: "Giường đôi King",
    size: "35m²",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Thông tin phòng */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden animate-fade-in">
              {/* Hình ảnh phòng */}
              <div className="relative">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-72 md:h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-amber-500 text-gray-900 font-semibold px-3 py-1">
                    Phổ biến nhất
                  </Badge>
                </div>
              </div>

              {/* Grid hình ảnh nhỏ */}
              <div className="grid grid-cols-3 gap-3 p-6">
                {room.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${room.name} ${index + 2}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-90 hover:scale-105 transition-all duration-300"
                  />
                ))}
              </div>

              <div className="p-6">
                {/* Tiêu đề và đánh giá */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-800 mb-3">
                      {room.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-amber-500" />
                        <span>{room.capacity} khách</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bed size={18} className="text-amber-500" />
                        <span>{room.bedType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📐 {room.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-lg">
                        {room.rating}
                      </span>
                      <span className="text-gray-500">
                        ({room.reviews} đánh giá)
                      </span>
                    </div>
                    <div>
                      <span className="text-3xl font-bold text-amber-500">
                        {room.price.toLocaleString("vi-VN")}₫
                      </span>
                      <span className="text-gray-500">/đêm</span>
                    </div>
                  </div>
                </div>

                {/* Mô tả */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Mô tả phòng
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                {/* Tiện nghi */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Tiện nghi phòng
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {room.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors duration-300"
                      >
                        <div className="text-amber-500">{amenity.icon}</div>
                        <span className="text-sm font-medium text-gray-700">
                          {amenity.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form đặt phòng */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
