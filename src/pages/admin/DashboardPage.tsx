import { BarChart3, Hotel, Bed, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Tổng Khách Sạn",
    value: "12",
    icon: Hotel,
    change: "+2 tuần này",
    changeType: "positive" as const,
  },
  {
    title: "Tổng Phòng",
    value: "156",
    icon: Bed,
    change: "+8 tuần này",
    changeType: "positive" as const,
  },
  {
    title: "Đặt Phòng Hôm Nay",
    value: "23",
    icon: Users,
    change: "+12% so với hôm qua",
    changeType: "positive" as const,
  },
  {
    title: "Doanh Thu Tháng",
    value: "₫125M",
    icon: TrendingUp,
    change: "+15% so với tháng trước",
    changeType: "positive" as const,
  },
];

const recentBookings = [
  {
    id: 1,
    guest: "Nguyễn Văn A",
    room: "101",
    hotel: "Grand Hotel",
    status: "Đã xác nhận",
  },
  {
    id: 2,
    guest: "Trần Thị B",
    room: "205",
    hotel: "Royal Hotel",
    status: "Đang chờ",
  },
  {
    id: 3,
    guest: "Lê Văn C",
    room: "301",
    hotel: "Palace Hotel",
    status: "Đã xác nhận",
  },
  {
    id: 4,
    guest: "Phạm Thị D",
    room: "102",
    hotel: "Grand Hotel",
    status: "Đã hủy",
  },
];

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tổng Quan</h1>
        <p className="text-gray-600">
          Xem tổng quan về hệ thống quản lý khách sạn
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <p
                className={`text-xs ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Đặt Phòng Gần Đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{booking.guest}</p>
                    <p className="text-sm text-gray-600">
                      {booking.hotel} - Phòng {booking.room}
                    </p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === "Đã xác nhận"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "Đang chờ"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Thao Tác Nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <Hotel className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">
                    Thêm Khách Sạn Mới
                  </p>
                  <p className="text-sm text-gray-600">
                    Tạo thông tin khách sạn mới
                  </p>
                </div>
              </button>

              <button className="flex items-center p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <Bed className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Thêm Phòng Mới</p>
                  <p className="text-sm text-gray-600">
                    Tạo phòng cho khách sạn
                  </p>
                </div>
              </button>

              <button className="flex items-center p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <Users className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Xem Đặt Phòng</p>
                  <p className="text-sm text-gray-600">
                    Kiểm tra tình trạng đặt phòng
                  </p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
