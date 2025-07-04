import React from "react";
import { Star, Wifi, Coffee, Car, Users, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface RoomCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  features: string[];
  capacity: number;
  bedType: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
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

  const getFeatureIcon = (feature: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      "WiFi miễn phí": <Wifi size={16} />,
      "Bữa sáng": <Coffee size={16} />,
      "Đỗ xe miễn phí": <Car size={16} />,
    };
    return icons[feature] || null;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 sm:h-56 object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-amber-500 text-white text-xs">Phổ biến</Badge>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span>{rating}</span>
            <span className="text-gray-500">({reviews})</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{capacity} khách</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span>{bedType}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <span
              key={index}
              className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
            >
              {getFeatureIcon(feature)}
              {feature}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div>
            <span className="text-xl font-bold text-blue-700">
              {price.toLocaleString("vi-VN")}₫
            </span>
            <span className="text-sm text-gray-500"> /đêm</span>
          </div>
          <Button
            onClick={() => navigate(`/rooms/${id}`)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm"
          >
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
