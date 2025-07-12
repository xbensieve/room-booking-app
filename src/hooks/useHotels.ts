import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { hotelService, GetHotelsParams } from "@/services/hotelService";
import { useToast } from "@/hooks/use-toast";

export const useHotels = (params: GetHotelsParams = {}) => {
  return useQuery({
    queryKey: ["hotels", params],
    queryFn: () => hotelService.getHotels(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateHotel = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: hotelService.createHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
      toast({
        title: "Thành công",
        description: "Khách sạn đã được tạo mới",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể tạo khách sạn",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateHotel = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      hotelService.updateHotel(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
      toast({
        title: "Thành công",
        description: "Khách sạn đã được cập nhật",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể cập nhật khách sạn",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteHotel = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: hotelService.deleteHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
      toast({
        title: "Thành công",
        description: "Khách sạn đã được xóa",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể xóa khách sạn",
        variant: "destructive",
      });
    },
  });
};
