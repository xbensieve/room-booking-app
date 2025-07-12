import { Room } from "@/types";

export const rooms: Room[] = [
  {
    id: 1,
    hotelId: 1,
    roomNumber: "101",
    type: "Single",
    pricePerNight: 1200000,
    capacity: 1,
    description: "Standard single room with sea view.",
    imageUrl: "/images/room1.jpg",
    isAvailable: true,
    createdAt: new Date("2024-06-01T12:00:00Z"),
    updatedAt: new Date("2024-06-02T08:00:00Z"),
    images: [
      {
        id: 1,
        roomId: 1,
        imageUrl: "/images/room1.jpg",
        isMain: true,
      },
    ],
  },
  {
    id: 2,
    hotelId: 1,
    roomNumber: "202",
    type: "Double",
    pricePerNight: 1600000,
    capacity: 2,
    description: "Double room with garden view.",
    imageUrl: "/images/room2.jpg",
    isAvailable: false,
    createdAt: new Date("2024-06-01T12:00:00Z"),
    updatedAt: new Date("2024-06-02T08:00:00Z"),
    images: [],
  },
];
