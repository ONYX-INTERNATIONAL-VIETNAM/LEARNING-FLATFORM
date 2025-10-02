"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { authenticateUser, setCurrentUser } from "@/lib/fake-auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = authenticateUser(formData.email, formData.password);

      if (user) {
        setCurrentUser(user);

        // Redirect based on user role
        switch (user.role) {
          case "Student":
            router.push("/student");
            break;
          case "Teacher":
            router.push("/teacher");
            break;
          case "Admin":
            router.push("/admin");
            break;
          default:
            router.push("/");
            break;
        }
      } else {
        setError("Email hoặc mật khẩu không đúng.");
      }
    } catch (error) {
      console.log(error);
      
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-[var(--primary-color)]/80 text-white font-montserrat">
      <CardHeader className="space-y-1">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Chào mừng trở lại!</h3>
          <p className="text-sm">
            Đăng nhập để tiếp tục hành trình học tập
          </p>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-medium text-blue-800 mb-2">
            Tài khoản demo:
          </p>
          <div className="text-xs text-blue-700 space-y-1">
            <div>Học sinh: student@onyx.edu / Student123!</div>
            <div>Giáo viên: teacher@onyx.edu / Teacher123!</div>
            <div>Admin: admin@onyx.edu / Admin123!</div>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
               className="bg-white text-gray-900 placeholder:text-gray-500 border-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="bg-white text-gray-900 placeholder:text-gray-500 border-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.remember}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, remember: checked as boolean })
                }
              />
              <Label htmlFor="remember" className="text-sm text-white font-bold">
                Ghi nhớ đăng nhập
              </Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-[var(--secondary-color)] font-bold hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 mt-4">
          <Button
            type="submit"
            className="w-full bg-[var(--secondary-color)] text-white"
            disabled={!formData.email || !formData.password}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-white font-bold">Chưa có tài khoản? </span>
            <Link
              href="/register"
              className="text-[var(--secondary-color)] font-bold hover:underline"
            >
              Đăng ký ngay
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
