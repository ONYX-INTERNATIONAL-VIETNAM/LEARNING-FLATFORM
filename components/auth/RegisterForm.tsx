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
import { Eye, EyeOff, Check, X } from "lucide-react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    emailConfirm: "",
    password: "",
    confirmPassword: "",
    city: "",
    country: "",
    agreeTerms: false,
  });

  const validatePassword = (password: string) => {
    const checks = {
      length: password.length >= 8,
      digit: /\d/.test(password),
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      special: /[*\-#@!$%^&+=]/.test(password),
    };
    return checks;
  };

  const passwordChecks = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email !== formData.emailConfirm) {
      alert("Email addresses do not match!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!isPasswordValid) {
      alert("Password does not meet requirements!");
      return;
    }

    console.log("Registration attempt:", formData);
  };

  return (
    <Card className="w-full my-8 bg-[var(--primary-color)]/80 text-white font-montserrat">
      <CardHeader className="space-y-1">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Tạo tài khoản mới</h3>
          <p className="text-sm">Tham gia cộng đồng học tập ONYX ngay hôm nay</p>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit} className="max-h-[350px] overflow-y-auto">
        <CardContent className="space-y-4 px-6 py-4">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a unique username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              className="
                bg-white text-gray-900 placeholder:text-gray-500
                border border-transparent
                focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                focus:border-[var(--secondary-color)]
              "
            />
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                className="
                  bg-white text-gray-900 placeholder:text-gray-500
                  border border-transparent
                  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                  focus:border-[var(--secondary-color)]
                "
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                className="
                  bg-white text-gray-900 placeholder:text-gray-500
                  border border-transparent
                  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                  focus:border-[var(--secondary-color)]
                "
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="
                bg-white text-gray-900 placeholder:text-gray-500
                border border-transparent
                focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                focus:border-[var(--secondary-color)]
              "
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailConfirm">Email (again)</Label>
            <Input
              id="emailConfirm"
              type="email"
              placeholder="Confirm your email address"
              value={formData.emailConfirm}
              onChange={(e) => setFormData({ ...formData, emailConfirm: e.target.value })}
              className={`
                bg-white text-gray-900 placeholder:text-gray-500
                focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                ${formData.emailConfirm && formData.email !== formData.emailConfirm
                  ? "border border-red-500"
                  : "border border-transparent focus:border-[var(--secondary-color)]"
                }
              `}
              required
            />
            {formData.emailConfirm && formData.email !== formData.emailConfirm && (
              <p className="text-sm text-red-300">Email addresses do not match</p>
            )}
          </div>

          {/* City/Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City/town</Label>
              <Input
                id="city"
                type="text"
                placeholder="Your city or town"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
                className="
                  bg-white text-gray-900 placeholder:text-gray-500
                  border border-transparent
                  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                  focus:border-[var(--secondary-color)]
                "
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                placeholder="Your country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
                className="
                  bg-white text-gray-900 placeholder:text-gray-500
                  border border-transparent
                  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                  focus:border-[var(--secondary-color)]
                "
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="
                  bg-white text-gray-900 placeholder:text-gray-500
                  border border-transparent
                  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                  focus:border-[var(--secondary-color)]
                "
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="
                  absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent
                  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                "
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            {formData.password && (
              <div className="text-sm space-y-1 p-3 rounded-md bg-white/10">
                <p className="font-medium text-white/80 mb-2">Password requirements:</p>
                <div className="space-y-1">
                  <div className={`flex items-center gap-2 ${passwordChecks.length ? "text-green-300" : "text-red-300"}`}>
                    {passwordChecks.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`flex items-center gap-2 ${passwordChecks.digit ? "text-green-300" : "text-red-300"}`}>
                    {passwordChecks.digit ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    <span>At least 1 digit</span>
                  </div>
                  <div className={`flex items-center gap-2 ${passwordChecks.lowercase ? "text-green-300" : "text-red-300"}`}>
                    {passwordChecks.lowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    <span>At least 1 lower case letter</span>
                  </div>
                  <div className={`flex items-center gap-2 ${passwordChecks.uppercase ? "text-green-300" : "text-red-300"}`}>
                    {passwordChecks.uppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    <span>At least 1 upper case letter</span>
                  </div>
                  <div className={`flex items-center gap-2 ${passwordChecks.special ? "text-green-300" : "text-red-300"}`}>
                    {passwordChecks.special ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    <span>At least 1 special character (*, -, #, @, !, $, %, ^, &, +, =)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={`
                  bg-white text-gray-900 placeholder:text-gray-500
                  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                  ${formData.confirmPassword && formData.password !== formData.confirmPassword
                    ? "border border-red-500"
                    : "border border-transparent focus:border-[var(--secondary-color)]"
                  }
                `}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="
                  absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent
                  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                "
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-sm text-red-300">Passwords do not match</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreeTerms: checked as boolean })
                }
                required
                className="bg-white border"
              />
              <Label htmlFor="agreeTerms" className="text-sm font-bold text-white">
                <Link href="/terms" className="text-[var(--secondary-color)] hover:underline">
                  Điều khoản sử dụng
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="text-[var(--secondary-color)] hover:underline">
                  Chính sách bảo mật
                </Link>
              </Label>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-[var(--secondary-color)] text-white"
            disabled={
              !formData.agreeTerms ||
              !isPasswordValid ||
              formData.email !== formData.emailConfirm ||
              formData.password !== formData.confirmPassword
            }
          >
            Tạo tài khoản
          </Button>

          <div className="text-center text-sm">
            <span className="text-white font-bold">Đã có tài khoản? </span>
            <Link href="/login" className="text-[var(--secondary-color)] font-bold hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
