import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Users,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const suggestedLocations = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Nha Trang",
  "Vũng Tàu",
  "Đà Lạt",
];

const SearchBar = () => {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: today,
    checkOut: tomorrow,
    guests: "2",
    roomType: "",
    priceRange: "",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);

  const handleSearch = () => {
    console.log("Search with:", searchData);
  };

  const handleLocationChange = (value: string) => {
    setSearchData({ ...searchData, location: value });
    const keyword = value.toLowerCase();
    const filtered = suggestedLocations.filter((loc) =>
      loc.toLowerCase().includes(keyword)
    );
    setLocationSuggestions(filtered);
  };

  return (
    <div className="bg-white border-2 border-[#feba02] rounded-xl shadow-xl p-4 sm:p-6 -mt-10 relative z-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <div className="flex flex-col relative">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Địa điểm
          </label>
          <Input
            placeholder="Nhập địa điểm..."
            value={searchData.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="h-11"
          />
          {searchData.location && locationSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border mt-1 rounded shadow-md z-10">
              {locationSuggestions.map((loc) => (
                <div
                  key={loc}
                  className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                  onClick={() => {
                    setSearchData({ ...searchData, location: loc });
                    setLocationSuggestions([]);
                  }}
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Nhận phòng
          </label>
          <Input
            type="date"
            value={searchData.checkIn}
            onChange={(e) =>
              setSearchData({ ...searchData, checkIn: e.target.value })
            }
            className="h-11"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Trả phòng
          </label>
          <Input
            type="date"
            value={searchData.checkOut}
            onChange={(e) =>
              setSearchData({ ...searchData, checkOut: e.target.value })
            }
            className="h-11"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Users className="w-4 h-4" />
            Số khách
          </label>
          <Select
            value={searchData.guests}
            onValueChange={(value) =>
              setSearchData({ ...searchData, guests: value })
            }
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Chọn số khách" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 khách</SelectItem>
              <SelectItem value="2">2 khách</SelectItem>
              <SelectItem value="3">3 khách</SelectItem>
              <SelectItem value="4">4 khách</SelectItem>
              <SelectItem value="5">5+ khách</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            className="w-full bg-blue-600 hover:bg-blue-700 h-11 font-semibold flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Tìm kiếm
          </Button>
        </div>
      </div>

      {/* Nút mở nâng cao */}
      <div className="mt-4 text-right">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          {showAdvanced ? (
            <>
              Ẩn bộ lọc nâng cao <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Hiển thị bộ lọc nâng cao <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Bộ lọc nâng cao */}
      {showAdvanced && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 transition-all">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Loại phòng
            </label>
            <Select
              value={searchData.roomType}
              onValueChange={(value) =>
                setSearchData({ ...searchData, roomType: value })
              }
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Chọn loại phòng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Khoảng giá
            </label>
            <Select
              value={searchData.priceRange}
              onValueChange={(value) =>
                setSearchData({ ...searchData, priceRange: value })
              }
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Chọn khoảng giá" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-500">0 - 500.000đ</SelectItem>
                <SelectItem value="500-1000">500.000đ - 1.000.000đ</SelectItem>
                <SelectItem value="1000+">Trên 1.000.000đ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
