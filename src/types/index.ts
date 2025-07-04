export interface Room {
  id: string;
  name: string;
  image: string;
  price: number;
  location: string;
}

export interface SearchParams {
  people: number;
  checkIn: string;
  checkOut: string;
  destination: string;
}
