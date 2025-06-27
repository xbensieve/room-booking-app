import React, { useState } from "react";
import { Calendar, Users, CreditCard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const BookingForm = () => {
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Đặt phòng với dữ liệu:", bookingData);
  };

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 1;
  };

  const roomPrice = 1500000;
  const nights = calculateNights();
  const totalPrice = roomPrice * nights;
  const tax = totalPrice * 0.1;
  const finalPrice = totalPrice + tax;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Đặt phòng khách sạn</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Thông tin đặt phòng */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày nhận phòng
                </label>
                <Input
                  type="date"
                  value={bookingData.checkIn}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, checkIn: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày trả phòng
                </label>
                <Input
                  type="date"
                  value={bookingData.checkOut}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, checkOut: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-1" />
                Số lượng khách
              </label>
              <Select
                value={bookingData.guests}
                onValueChange={(value) =>
                  setBookingData({ ...bookingData, guests: value })
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
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Thông tin khách hàng */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Thông tin khách hàng
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <Input
                  value={bookingData.fullName}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, fullName: e.target.value })
                  }
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, email: e.target.value })
                    }
                    placeholder="example@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <Input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, phone: e.target.value })
                    }
                    placeholder="0123456789"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yêu cầu đặc biệt (tùy chọn)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={bookingData.specialRequests}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      specialRequests: e.target.value,
                    })
                  }
                  placeholder="Ví dụ: Tầng cao, giường đôi, không hút thuốc..."
                />
              </div>
            </div>

            <Separator />

            {/* Tóm tắt giá */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">
                Tóm tắt đặt phòng
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Giá phòng ({nights} đêm)</span>
                  <span>{totalPrice.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between">
                  <span>Thuế và phí</span>
                  <span>{tax.toLocaleString("vi-VN")}₫</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Tổng cộng</span>
                  <span className="text-blue-600">
                    {finalPrice.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-3"
              size="lg"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Xác nhận đặt phòng
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
