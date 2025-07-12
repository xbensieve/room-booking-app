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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/common/ImageUpload";
import { Hotel } from "@/types/hotel";
import { useState } from "react";

const hotelSchema = z.object({
  name: z.string().min(1, "Tên khách sạn là bắt buộc"),
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
  city: z.string().min(1, "Thành phố là bắt buộc"),
  country: z.string().min(1, "Quốc gia là bắt buộc"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  starRating: z.number().min(1).max(5).optional(),
});

type HotelFormData = z.infer<typeof hotelSchema>;

interface HotelFormProps {
  hotel?: Hotel;
  onSubmit: (data: HotelFormData, images: string[]) => void;
  loading?: boolean;
}

export const HotelForm = ({ hotel, onSubmit, loading }: HotelFormProps) => {
  const [images, setImages] = useState<string[]>(
    hotel?.images.map((img) => img.imageUrl) || []
  );

  const form = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      name: hotel?.name || "",
      address: hotel?.address || "",
      city: hotel?.city || "",
      country: hotel?.country || "",
      description: hotel?.description || "",
      starRating: hotel?.starRating || undefined,
    },
  });

  const handleSubmit = (data: HotelFormData) => {
    onSubmit(data, images);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên Khách Sạn</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên khách sạn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="starRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xếp Hạng Sao</FormLabel>
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(parseInt(value))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn số sao" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <SelectItem key={star} value={star.toString()}>
                        {star} Sao
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa Chỉ</FormLabel>
              <FormControl>
                <Input placeholder="Nhập địa chỉ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thành Phố</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập thành phố" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quốc Gia</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập quốc gia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô Tả</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập mô tả khách sạn..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <label className="block text-sm font-medium mb-2">Hình Ảnh</label>
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            maxImages={10}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Đang xử lý..." : hotel ? "Cập Nhật" : "Tạo Mới"}
        </Button>
      </form>
    </Form>
  );
};
