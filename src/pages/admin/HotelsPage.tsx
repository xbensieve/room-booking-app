import { useState } from "react";
import { Plus, Search, Edit, Trash2, MapPin, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { HotelForm } from "@/components/hotels/HotelForm";
import { Hotel } from "@/types/hotel";
import { useToast } from "@/hooks/use-toast";
import {
  useHotels,
  useCreateHotel,
  useUpdateHotel,
  useDeleteHotel,
} from "@/hooks/useHotels";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { HotelCardSkeleton } from "@/components/hotels/HotelCardSkeleton";
import { Badge } from "@/components/ui/badge";

export const HotelsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const debouncedSearch = useDebounce(searchQuery, 500);
  const pageSize = 9;

  const {
    data: hotelsData,
    isLoading,
    error,
  } = useHotels({
    page: currentPage,
    pageSize,
    search: debouncedSearch || undefined,
  });

  const createHotelMutation = useCreateHotel();
  const updateHotelMutation = useUpdateHotel();
  const deleteHotelMutation = useDeleteHotel();

  const hotels = hotelsData?.data || [];
  const totalPages = hotelsData?.totalPages || 1;
  const totalCount = hotelsData?.totalCount || 0;

  const handleCreateHotel = async (data: any, images: string[]) => {
    const hotelData = {
      ...data,
      images: images.map((url, index) => ({
        imageUrl: url,
        isMain: index === 0,
      })),
    };

    await createHotelMutation.mutateAsync(hotelData);
    setIsFormOpen(false);
  };

  const handleUpdateHotel = async (data: any, images: string[]) => {
    if (!selectedHotel) return;

    const hotelData = {
      ...data,
      images: images.map((url, index) => ({
        imageUrl: url,
        isMain: index === 0,
      })),
    };

    await updateHotelMutation.mutateAsync({
      id: selectedHotel.id,
      data: hotelData,
    });
    setIsFormOpen(false);
    setSelectedHotel(null);
  };

  const handleDeleteHotel = async (id: number) => {
    await deleteHotelMutation.mutateAsync(id);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Reset to page 1 when searching
    if (searchQuery !== debouncedSearch) {
      setCurrentPage(1);
    }
  };

  const formatStarRating = (rating: number | null) => {
    if (!rating) return "Chưa xếp hạng";
    return `${rating} sao`;
  };
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Lỗi tải dữ liệu
            </h3>
            <p className="text-muted-foreground">
              Không thể tải danh sách khách sạn. Vui lòng thử lại sau.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="container mx-auto max-w-7xl px-4 py-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Quản Lý Khách Sạn
            </h1>
            <p className="text-muted-foreground text-lg">
              Thêm, sửa, xóa thông tin khách sạn một cách dễ dàng
            </p>
          </div>

          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setSelectedHotel(null)}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Thêm Khách Sạn Mới
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  {selectedHotel ? "Chỉnh Sửa Khách Sạn" : "Thêm Khách Sạn Mới"}
                </DialogTitle>
              </DialogHeader>
              <HotelForm
                hotel={selectedHotel || undefined}
                onSubmit={selectedHotel ? handleUpdateHotel : handleCreateHotel}
                loading={
                  createHotelMutation.isPending || updateHotelMutation.isPending
                }
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div
          className="max-w-md mx-auto animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Tìm kiếm theo tên khách sạn, thành phố..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-2 focus:border-primary transition-all duration-300 hover:border-primary/50"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {totalCount}
              </div>
              <div className="text-sm text-muted-foreground">
                Tổng số khách sạn
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-green-500/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {hotels.filter((h: any) => h.rooms?.length > 0).length}
              </div>
              <div className="text-sm text-muted-foreground">Có phòng</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-orange-500/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {hotels.reduce(
                  (total: number, hotel: any) =>
                    total + (hotel.rooms?.length || 0),
                  0
                )}
              </div>
              <div className="text-sm text-muted-foreground">Tổng số phòng</div>
            </CardContent>
          </Card>
        </div>

        {/* Hotels Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {Array.from({ length: 6 }).map((_, index) => (
              <HotelCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {hotels.map((hotel: any, index: number) => {
              const isDeleting = deleteHotelMutation.isPending;
              const mainImage =
                hotel.images?.find((img: any) => img.isMain)?.imageUrl ||
                hotel.images?.[0]?.imageUrl ||
                "https://images.unsplash.com/photo-1566073771259-6a8506099945";

              return (
                <Card
                  key={hotel.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 border-2 hover:border-primary/20 animate-fade-in group"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={mainImage}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-3 left-3">
                      <Badge
                        variant="secondary"
                        className="shadow-lg backdrop-blur-sm"
                      >
                        {formatStarRating(hotel.starRating)}
                      </Badge>
                    </div>

                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setSelectedHotel(hotel)}
                            className="shadow-lg backdrop-blur-sm hover:scale-110 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                            disabled={isDeleting}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="shadow-lg backdrop-blur-sm hover:scale-110 transition-all duration-300"
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="animate-scale-in">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bạn có chắc chắn muốn xóa khách sạn "{hotel.name}
                              "? Hành động này không thể hoàn tác.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="hover:scale-105 transition-transform duration-200">
                              Hủy
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteHotel(hotel.id)}
                              className="hover:scale-105 transition-transform duration-200"
                            >
                              Xóa
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg font-semibold line-clamp-1">
                        {hotel.name}
                      </span>
                      {hotel.starRating && (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="ml-1 text-sm">
                            {hotel.starRating}
                          </span>
                        </div>
                      )}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">
                        {hotel.city}, {hotel.country}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 hover:text-foreground transition-colors duration-300">
                      {hotel.description}
                    </p>

                    <div className="flex justify-between items-center pt-2 text-xs text-muted-foreground border-t">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {hotel.rooms?.length || 0} phòng
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        {hotel.images?.length || 0} ảnh
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center animate-fade-in">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer hover:scale-105 transition-transform duration-200"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNum)}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer hover:scale-105 transition-transform duration-200"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer hover:scale-105 transition-transform duration-200"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && hotels.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Không tìm thấy khách sạn nào
            </h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Thử thay đổi từ khóa tìm kiếm"
                : "Bắt đầu bằng cách thêm khách sạn mới"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
