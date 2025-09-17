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
import { UserPlus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
    router.push("/admin/users");
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Thêm người dùng mới
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Điền đầy đủ thông tin để tạo người dùng trong hệ thống
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/users")}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </div>

        {/* Form */}
        <Card className="shadow-lg border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <UserPlus className="h-5 w-5" />
              Thông tin người dùng
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
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  {...register("email")}
                  placeholder="example@email.com"
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Mật khẩu */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Mật khẩu</label>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">
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
                  <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
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
                  <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
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
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>

              {/* Ngày tham gia */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Ngày tham gia</label>
                <Input
                  {...register("joinDate")}
                  type="date"
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>

              {/* Nút lưu */}
              <div className="md:col-span-2 flex justify-end gap-3 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/users")}
                >
                  Hủy
                </Button>
                <Button type="submit" className="shadow-md">
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
