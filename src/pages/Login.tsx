import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { AuthFormData } from "../types/auth";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 px-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-gray-200 animate-fade-in">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-3xl font-serif font-bold text-gray-800">
            Đăng nhập
          </CardTitle>
          <p className="text-center text-sm text-gray-600 mt-2">
            Truy cập tài khoản của bạn để trải nghiệm dịch vụ cao cấp
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-100 p-3 rounded-lg">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email của bạn"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-500 text-gray-900 font-semibold py-3 rounded-lg hover:bg-amber-400 transition-colors duration-300"
            >
              Đăng nhập
            </Button>
          </form>

          <Separator className="my-6 bg-gray-200" />

          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-800 font-semibold py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.554,9.586-11.772H12.545z"
              />
            </svg>
            Đăng nhập bằng Google
          </Button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-amber-500 font-medium hover:text-amber-400 hover:underline transition-all duration-300"
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
