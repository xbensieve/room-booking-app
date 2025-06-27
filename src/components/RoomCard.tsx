import React from "react";
import { Star, Wifi, Coffee, Car, Users, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  const getFeatureIcon = (feature: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      "WiFi miễn phí": <Wifi size={16} />,
      "Bữa sáng": <Coffee size={16} />,
      "Đỗ xe miễn phí": <Car size={16} />,
    };
    return icons[feature] || null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-blue-600 text-white">Phổ biến</Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{capacity} khách</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bed size={16} />
            <span>{bedType}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded"
            >
              {getFeatureIcon(feature)}
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              {price.toLocaleString("vi-VN")}₫
            </span>
            <span className="text-sm text-gray-500">/đêm</span>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
