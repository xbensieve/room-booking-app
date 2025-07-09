import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import RoomDetails from "./pages/RoomDetails";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ResetPassword from "./pages/ResetPassword";
import RouteChangeLoader from "./components/RouteChangeLoader";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import GoogleOneTap from "./components/GoogleOneTapLogin";
const App = () => (
  <>
    <GoogleOneTap />
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <ScrollToTop />
        <RouteChangeLoader />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/rooms" element={<Index />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </>
);

export default App;
