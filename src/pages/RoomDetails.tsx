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

const RoomDetails = () => {
  const room = {
    id: 1,
    name: "Phòng Deluxe Giường Đôi",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Thông tin phòng */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Hình ảnh phòng */}
              <div className="relative">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-600 text-white">
                    Phổ biến nhất
                  </Badge>
                </div>
              </div>

              {/* Grid hình ảnh nhỏ */}
              <div className="grid grid-cols-3 gap-2 p-4">
                {room.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${room.name} ${index + 2}`}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>

              <div className="p-6">
                {/* Tiêu đề và đánh giá */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      {room.name}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users size={16} />
                        <span>{room.capacity} khách</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bed size={16} />
                        <span>{room.bedType}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>📐 {room.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{room.rating}</span>
                      <span className="text-gray-500">
                        ({room.reviews} đánh giá)
                      </span>
                    </div>
                    <div>
                      <span className="text-3xl font-bold text-blue-600">
                        {room.price.toLocaleString("vi-VN")}₫
                      </span>
                      <span className="text-gray-500">/đêm</span>
                    </div>
                  </div>
                </div>

                {/* Mô tả */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Mô tả phòng</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                {/* Tiện nghi */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Tiện nghi phòng
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {room.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="text-blue-600">{amenity.icon}</div>
                        <span className="text-sm font-medium">
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
            <div className="sticky top-4">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
