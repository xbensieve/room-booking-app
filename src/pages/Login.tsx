import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  loginWithEmail,
  loginWithGoogle,
  logout,
  onAuthStateChanged,
} from "../api/authApi";
import { AuthFormData } from "../types/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { auth } from "../services/firebase";
const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithEmail(formData.email, formData.password);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đăng xuất thất bại.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <Card className="w-full max-w-md border-none shadow-none bg-transparent">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-3xl font-bold text-gray-800 font-roboto">
            Đăng nhập
          </CardTitle>
          <p className="text-center text-sm text-gray-600 mt-1">
            Truy cập tài khoản của bạn để trải nghiệm dịch vụ cao cấp
          </p>
        </CardHeader>

        <CardContent className="mt-4 space-y-5">
          {error && (
            <div className="flex items-start gap-2 text-sm text-red-700 bg-red-100 p-3 rounded-lg">
              <AlertCircle size={20} className="mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email của bạn"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 mb-1"
              >
                Mật khẩu
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <Link
                to="/reset-password"
                className="text-sm text-amber-500 hover:text-amber-400 hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-500 text-gray-900 font-semibold py-3 rounded-lg hover:bg-amber-400 transition"
            >
              Đăng nhập
            </Button>
          </form>

          <Separator className="bg-gray-200" />

          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-800 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.554,9.586-11.772H12.545z" />
            </svg>
            Đăng nhập bằng Google
          </Button>

          {isLoggedIn && (
            <Button
              type="button"
              onClick={handleLogout}
              className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition"
            >
              Đăng xuất
            </Button>
          )}

          <p className="text-center text-sm text-gray-600 mt-2">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-amber-500 font-medium hover:text-amber-400 hover:underline"
            >
              Đăng ký
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
