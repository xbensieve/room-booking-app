import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingPage from "@/pages/Loading";

const RouteChangeLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [location]);

  return loading ? <LoadingPage /> : null;
};

export default RouteChangeLoader;
