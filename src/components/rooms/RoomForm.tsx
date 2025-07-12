import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/common/ImageUpload";
import { Room } from "@/types/hotel";
import { useState } from "react";

const roomSchema = z.object({
  hotelId: z.number().min(1, "Vui lòng chọn khách sạn"),
  roomNumber: z.string().min(1, "Số phòng là bắt buộc"),
  type: z.enum(["Standard", "Deluxe", "Suite", "Premium"]),
  pricePerNight: z.number().min(1, "Giá phòng phải lớn hơn 0"),
  capacity: z.number().min(1, "Sức chứa phải lớn hơn 0"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  isAvailable: z.boolean(),
});

type RoomFormData = z.infer<typeof roomSchema>;

interface RoomFormProps {
  room?: Room;
  onSubmit: (data: RoomFormData, images: string[]) => void;
  loading?: boolean;
  hotelOptions: { id: number; name: string }[];
}

const roomTypes = [
  { value: "Standard", label: "Phòng Tiêu Chuẩn" },
  { value: "Deluxe", label: "Phòng Deluxe" },
  { value: "Suite", label: "Phòng Suite" },
  { value: "Premium", label: "Phòng Premium" },
];

export const RoomForm = ({
  room,
  onSubmit,
  loading,
  hotelOptions,
}: RoomFormProps) => {
  const [images, setImages] = useState<string[]>(
    room?.images.map((img) => img.imageUrl) || []
  );

  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      hotelId: room?.hotelId || 0,
      roomNumber: room?.roomNumber || "",
      type: room?.type || "Standard",
      pricePerNight: room?.pricePerNight || 0,
      capacity: room?.capacity || 1,
      description: room?.description || "",
      isAvailable: room?.isAvailable ?? true,
    },
  });

  const handleSubmit = (data: RoomFormData) => {
    onSubmit(data, images);
  };

  const formatPrice = (value: string) => {
    const number = parseInt(value.replace(/\D/g, ""));
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="hotelId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khách Sạn</FormLabel>
                <Select
                  value={field.value.toString()}
                  onValueChange={(value) => field.onChange(parseInt(value))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khách sạn" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hotelOptions.map((hotel) => (
                      <SelectItem key={hotel.id} value={hotel.id.toString()}>
                        {hotel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roomNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số Phòng</FormLabel>
                <FormControl>
                  <Input placeholder="VD: 101, A1, ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại Phòng</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại phòng" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sức Chứa</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Số người"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="pricePerNight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá Mỗi Đêm (VNĐ)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập giá phòng"
                  value={field.value ? formatPrice(field.value.toString()) : ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    field.onChange(parseInt(value) || 0);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô Tả</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập mô tả phòng..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Trạng Thái Phòng</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Phòng có sẵn để đặt hay không
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <label className="block text-sm font-medium mb-2">
            Hình Ảnh Phòng
          </label>
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            maxImages={8}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Đang xử lý..." : room ? "Cập Nhật" : "Tạo Mới"}
        </Button>
      </form>
    </Form>
  );
};
