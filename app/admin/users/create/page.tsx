"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";

// ====================== SCHEMA ======================
const userSchema = z.object({
  name: z.string().min(3, { message: "Họ và tên phải có ít nhất 3 ký tự" }),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, { message: "Mật khẩu tối thiểu 6 ký tự" }),
  role: z.enum(["Học sinh", "Giáo viên", "Admin"]),
  status: z.enum(["active", "inactive"]),
  className: z.string().optional(),
  joinDate: z.string().optional(),
});

type UserForm = z.infer<typeof userSchema>;

// ====================== PAGE ======================
export default function CreateUserPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "Học sinh",
      status: "active",
    },
  });

  const onSubmit = (data: UserForm) => {
    console.log("New user:", data);
    alert("Người dùng mới đã được tạo!");
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <UserPlus className="h-5 w-5" />
              Thêm người dùng mới
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Họ tên */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Họ và tên</label>
                <Input
                  {...register("name")}
                  placeholder="Nhập họ tên"
                  className="bg-white border border-gray-300 text-gray-900 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             rounded-md shadow-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  {...register("email")}
                  placeholder="example@email.com"
                  className="bg-white border border-gray-300 text-gray-900 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             rounded-md shadow-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Mật khẩu */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Mật khẩu</label>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="bg-white border border-gray-300 text-gray-900 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             rounded-md shadow-sm"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Vai trò */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Vai trò</label>
                <Select
                  onValueChange={(v) =>
                    setValue("role", v as UserForm["role"], {
                      shouldValidate: true,
                    })
                  }
                  defaultValue="Học sinh"
                >
                  <SelectTrigger className="bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm">
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Học sinh">Học sinh</SelectItem>
                    <SelectItem value="Giáo viên">Giáo viên</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Trạng thái */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Trạng thái</label>
                <Select
                  onValueChange={(v) =>
                    setValue("status", v as UserForm["status"], {
                      shouldValidate: true,
                    })
                  }
                  defaultValue="active"
                >
                  <SelectTrigger className="bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lớp */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Lớp</label>
                <Input
                  {...register("className")}
                  placeholder="VD: 10A1"
                  className="bg-white border border-gray-300 text-gray-900 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             rounded-md shadow-sm"
                />
              </div>

              {/* Ngày tham gia */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Ngày tham gia</label>
                <Input
                  {...register("joinDate")}
                  type="date"
                  className="bg-white border border-gray-300 text-gray-900 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             rounded-md shadow-sm"
                />
              </div>

              {/* Nút lưu */}
              <div className="md:col-span-2 flex justify-end pt-4">
                <Button
                  type="submit"
                  className="text-white shadow-md"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Lưu người dùng
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
