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
import { AdminLayout } from "./components/layout/AdminLayout";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { HotelsPage } from "./pages/admin/HotelsPage";
import { RoomsPage } from "./pages/admin/RoomsPage";
import RequireAdmin from "./pages/admin/RequireAdmin";
const App = () => (
  <>
    <GoogleOneTap />
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="bottom-right" />
        <ScrollToTop />
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
          <Route path="/admin" element={<RequireAdmin />}>
            <Route element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="hotels" element={<HotelsPage />} />
              <Route path="rooms" element={<RoomsPage />} />
              <Route
                path="settings"
                element={
                  <div className="p-8 text-center text-gray-500">
                    Trang cài đặt đang được phát triển
                  </div>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </>
);

export default App;
