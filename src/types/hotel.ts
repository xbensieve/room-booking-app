export interface HotelImage {
  id: number;
  hotelId: number;
  imageUrl: string;
  isMain: boolean;
}

export interface RoomImage {
  id: number;
  roomId: number;
  imageUrl: string;
  isMain: boolean;
}

export interface Room {
  id: number;
  hotelId: number;
  roomNumber: string;
  type: "Standard" | "Deluxe" | "Suite" | "Premium";
  pricePerNight: number;
  capacity: number;
  description: string;
  imageUrl?: string | null;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  images: RoomImage[];
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  description: string;
  starRating?: number | null;
  createdAt: string;
  updatedAt: string;
  rooms: Room[];
  images: HotelImage[];
}

export interface CreateHotelData {
  name: string;
  address: string;
  city: string;
  country: string;
  description: string;
  starRating?: number;
}

export interface UpdateHotelData extends CreateHotelData {
  id: number;
}

export interface CreateRoomData {
  hotelId: number;
  roomNumber: string;
  type: "Standard" | "Deluxe" | "Suite" | "Premium";
  pricePerNight: number;
  capacity: number;
  description: string;
  isAvailable: boolean;
}

export interface UpdateRoomData extends CreateRoomData {
  id: number;
}
