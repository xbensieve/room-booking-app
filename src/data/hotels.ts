// src/data/hotels.ts
import { Hotel } from "@/types";

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Sunshine Paradise Hotel",
    address: "123 Beachside Road",
    city: "Da Nang",
    country: "Vietnam",
    description: "A beachfront hotel with full luxury amenities.",
    starRating: 4.7,
    createdAt: new Date("2024-06-01T10:00:00Z"),
    updatedAt: new Date("2024-06-02T10:00:00Z"),
    images: [
      {
        id: 1,
        hotelId: 1,
        imageUrl: "/images/hotel1-main.jpg",
        isMain: true,
      },
      {
        id: 2,
        hotelId: 1,
        imageUrl: "/images/hotel1-side.jpg",
        isMain: false,
      },
    ],
    rooms: [],
  },
  {
    id: 2,
    name: "Green Leaf Resort",
    address: "456 Mountain View",
    city: "Da Lat",
    country: "Vietnam",
    description: "A relaxing getaway in the heart of pine forests.",
    starRating: 4.2,
    createdAt: new Date("2024-05-20T08:30:00Z"),
    updatedAt: new Date("2024-06-01T14:15:00Z"),
    images: [],
    rooms: [],
  },
];
