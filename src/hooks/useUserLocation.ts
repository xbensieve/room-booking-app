import { useEffect, useState } from "react";

export const useUserLocation = () => {
  const [location, setLocation] = useState("Getting your location...");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "Unknown";
            const country = data.address.country || "Unknown";
            setLocation(`${city}, ${country}`);
          } catch {
            setLocation("Failed to fetch location");
          }
        },
        (error) => {
          console.error("Location error:", error);
          setLocation("Location access denied");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return location;
};
