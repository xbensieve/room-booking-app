import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerWithEmail } from "@/api/authApi";
import { AuthFormData } from "../types/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
const Register: React.FC = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      const result = await registerWithEmail(formData.email, formData.password);
      if (result) {
        setFormData({ email: "", password: "" });
        setConfirmPassword("");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {" "}
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
              {/* Email */}
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

              {/* Mật khẩu */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Xác nhận mật khẩu */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm text-gray-700 mb-1"
                >
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
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
    </motion.div>
  );
};

export default Register;
