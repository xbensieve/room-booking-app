import React, { useState } from "react";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  const handleSearch = () => {
    console.log("Tìm kiếm với dữ liệu:", searchData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 -mt-8 relative z-10 mx-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Địa điểm
          </label>
          <Input
            placeholder="Nhập địa điểm..."
            value={searchData.location}
            onChange={(e) =>
              setSearchData({ ...searchData, location: e.target.value })
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            Ngày nhận phòng
          </label>
          <Input
            type="date"
            value={searchData.checkIn}
            onChange={(e) =>
              setSearchData({ ...searchData, checkIn: e.target.value })
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            Ngày trả phòng
          </label>
          <Input
            type="date"
            value={searchData.checkOut}
            onChange={(e) =>
              setSearchData({ ...searchData, checkOut: e.target.value })
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="inline w-4 h-4 mr-1" />
            Số khách
          </label>
          <Select
            value={searchData.guests}
            onValueChange={(value) =>
              setSearchData({ ...searchData, guests: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
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

        <Button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 h-12"
        >
          <Search className="w-4 h-4 mr-2" />
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
