import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  DollarSign,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RoomForm } from "@/components/rooms/RoomForm";
import { Room } from "@/types/hotel";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockRooms: Room[] = [
  {
    id: 1,
    hotelId: 1,
    roomNumber: "101",
    type: "Standard",
    pricePerNight: 500000,
    capacity: 2,
    description: "Phòng tiêu chuẩn với view thành phố",
    imageUrl: null,
    isAvailable: true,
    createdAt: "2025-07-11T02:24:32.2658988",
    updatedAt: "2025-07-11T02:27:43.4367319",
    images: [
      {
        id: 1,
        roomId: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
        isMain: true,
      },
    ],
  },
];

const mockHotels = [
  { id: 1, name: "Grand Hotel Saigon" },
  { id: 2, name: "Royal Hotel Hanoi" },
];

const roomTypeLabels = {
  Standard: "Tiêu Chuẩn",
  Deluxe: "Deluxe",
  Suite: "Suite",
  Premium: "Premium",
};

export const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const filteredRooms = rooms.filter(
    (room) =>
      room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateRoom = async (data: any, images: string[]) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newRoom: Room = {
        id: Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        images: images.map((url, index) => ({
          id: Date.now() + index,
          roomId: Date.now(),
          imageUrl: url,
          isMain: index === 0,
        })),
      };

      setRooms([...rooms, newRoom]);
      setIsFormOpen(false);
      toast({
        title: "Thành công",
        description: "Phòng đã được tạo mới",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tạo phòng",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRoom = async (data: any, images: string[]) => {
    if (!selectedRoom) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedRoom: Room = {
        ...selectedRoom,
        ...data,
        updatedAt: new Date().toISOString(),
        images: images.map((url, index) => ({
          id: Date.now() + index,
          roomId: selectedRoom.id,
          imageUrl: url,
          isMain: index === 0,
        })),
      };

      setRooms(rooms.map((r) => (r.id === selectedRoom.id ? updatedRoom : r)));
      setIsFormOpen(false);
      setSelectedRoom(null);
      toast({
        title: "Thành công",
        description: "Phòng đã được cập nhật",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật phòng",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async (id: number) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setRooms(rooms.filter((r) => r.id !== id));
      toast({
        title: "Thành công",
        description: "Phòng đã được xóa",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa phòng",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Phòng</h1>
          <p className="text-gray-600">Thêm, sửa, xóa thông tin phòng</p>
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedRoom(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm Phòng
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedRoom ? "Chỉnh Sửa Phòng" : "Thêm Phòng Mới"}
              </DialogTitle>
            </DialogHeader>
            <RoomForm
              room={selectedRoom || undefined}
              onSubmit={selectedRoom ? handleUpdateRoom : handleCreateRoom}
              loading={loading}
              hotelOptions={mockHotels}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Tìm kiếm theo số phòng hoặc loại phòng..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Rooms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => {
          const hotelName =
            mockHotels.find((h) => h.id === room.hotelId)?.name ||
            "Unknown Hotel";

          return (
            <Card key={room.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={
                    room.images.find((img) => img.isMain)?.imageUrl ||
                    room.images[0]?.imageUrl ||
                    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304"
                  }
                  alt={`Phòng ${room.roomNumber}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant={room.isAvailable ? "default" : "secondary"}>
                    {room.isAvailable ? "Có sẵn" : "Không có sẵn"}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setSelectedRoom(room)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bạn có chắc chắn muốn xóa phòng "{room.roomNumber}"?
                          Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteRoom(room.id)}
                        >
                          Xóa
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Phòng {room.roomNumber}</span>
                  <Badge variant="outline">{roomTypeLabels[room.type]}</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="line-clamp-1">{hotelName}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{room.capacity} người</span>
                    </div>
                    <div className="flex items-center text-sm font-semibold text-green-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>{formatPrice(room.pricePerNight)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex justify-between items-center pt-2 text-xs text-gray-500">
                    <span>{room.images.length} ảnh</span>
                    <span>ID: {room.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy phòng nào</p>
        </div>
      )}
    </div>
  );
};
