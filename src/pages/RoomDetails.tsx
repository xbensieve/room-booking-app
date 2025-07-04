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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-amber-500 text-gray-900 hover:text-white px-3 py-1 font-medium">
                  Phổ biến nhất
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 p-4">
                {room.images.slice(1).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${room.name} ${i + 2}`}
                    className="w-full h-20 md:h-24 object-cover rounded-md cursor-pointer hover:opacity-80 transition"
                  />
                ))}
              </div>

              <div className="px-4 pb-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-serif">
                      {room.name}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users size={16} className="text-amber-500" />
                        <span>{room.capacity} khách</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bed size={16} className="text-amber-500" />
                        <span>{room.bedType}</span>
                      </div>
                      <div>📐 {room.size}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-sm mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{room.rating}</span>
                      <span className="text-gray-500">({room.reviews})</span>
                    </div>
                    <div>
                      <span className="text-xl font-bold text-amber-500">
                        {room.price.toLocaleString("vi-VN")}₫
                      </span>
                      <span className="text-sm text-gray-500"> /đêm</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Mô tả phòng
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {room.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Tiện nghi phòng
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {room.amenities.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-amber-500">{item.icon}</span>
                        <span className="text-sm text-gray-700">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking form */}
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
