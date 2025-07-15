import React from "react";
import { Star, Wifi, Coffee, Car, Users, Bed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

const featureIcons: { [key: string]: JSX.Element } = {
  "WiFi miễn phí": <Wifi className="w-4 h-4" />,
  "Bữa sáng": <Coffee className="w-4 h-4" />,
  "Đỗ xe miễn phí": <Car className="w-4 h-4" />,
};

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

  return (
    <div className="group border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-white">
      <div className="relative w-full h-48 sm:h-60 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-sm">
          Nổi bật
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="text-base font-semibold text-gray-900 leading-tight">
            {name}
          </div>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span>{rating}</span>
            <span className="text-gray-400">({reviews})</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 gap-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{capacity} khách</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{bedType}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-1">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {featureIcons[f]} <span>{f}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div>
            <span className="text-lg font-bold text-blue-700">
              {price.toLocaleString("vi-VN")}₫
            </span>
            <span className="text-sm text-gray-500"> /đêm</span>
          </div>
          <Button
            onClick={() => navigate(`/rooms/${id}`)}
            className="h-9 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded"
          >
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
