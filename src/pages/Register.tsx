import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { AuthFormData } from "../types/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <Card className="w-full max-w-md border-none shadow-none bg-transparent">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-3xl font-bold text-gray-800 font-roboto">
            Đăng ký
          </CardTitle>
          <p className="text-center text-sm text-gray-600 mt-1">
            Tạo tài khoản để trải nghiệm dịch vụ đặt phòng cao cấp
          </p>
        </CardHeader>

        <CardContent className="mt-4 space-y-5">
          {error && (
            <div className="flex items-start gap-2 text-sm text-red-700 bg-red-100 p-3 rounded-lg">
              <AlertCircle size={20} className="mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button
              type="submit"
              className="w-full bg-amber-500 text-gray-900 font-semibold py-3 rounded-lg hover:bg-amber-400 transition"
            >
              Đăng ký
            </Button>
          </form>

          <Separator className="bg-gray-200" />

          <p className="text-center text-sm text-gray-600 mt-2">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-amber-500 font-medium hover:text-amber-400 hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
