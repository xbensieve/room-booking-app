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
import { toast } from "sonner";
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
      const response = await loginWithEmail(formData.email, formData.password);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Đã xảy ra lỗi không xác định.");
      }
      toast.error(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập."
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await loginWithGoogle();
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Đã xảy ra lỗi không xác định.");
      }
      toast.error(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập."
      );
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
                className="focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Mật khẩu</label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                className="focus:ring-2 focus:ring-amber-400 transition"
                required
              />
              <div className="flex justify-end">
                <a
                  href="/forgot-password"
                  className="text-sm text-amber-400 hover:underline"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-500 text-gray-900 font-semibold py-3 rounded-lg hover:bg-amber-400 transition duration-200 ease-in-out focus:ring-2 focus:ring-amber-300 active:scale-95"
            >
              Đăng nhập
            </Button>
          </form>

          <Separator className="bg-gray-200" />

          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-800 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 transition duration-200 ease-in-out focus:ring-2 focus:ring-gray-300 active:scale-95 group"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="group-hover:text-amber-600 transition">
              Đăng nhập bằng Google
            </span>
          </Button>

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
