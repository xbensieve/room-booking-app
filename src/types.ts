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

export type RoomType = "Single" | "Double" | "Suite" | "Family";

export interface Room {
  id: number;
  hotelId: number;
  roomNumber: string;
  type: RoomType;
  pricePerNight: number;
  capacity: number;
  description?: string;
  imageUrl?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: RoomImage[];
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  description?: string;
  starRating: number;
  createdAt: Date;
  updatedAt: Date;
  images: HotelImage[];
  rooms: Room[];
}
