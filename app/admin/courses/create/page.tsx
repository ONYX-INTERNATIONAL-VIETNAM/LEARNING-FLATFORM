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
import { BookPlus } from "lucide-react";

// ====================== SCHEMA ======================
const courseSchema = z.object({
  title: z.string().min(3, { message: "Tên khóa học phải có ít nhất 3 ký tự" }),
  shortName: z
    .string()
    .min(2, { message: "Mã khóa học phải có ít nhất 2 ký tự" })
    .max(10, { message: "Mã khóa học tối đa 10 ký tự" }),
  category: z.string().min(1, { message: "Vui lòng chọn danh mục" }),
  teacher: z.string().min(3, { message: "Tên giáo viên phải có ít nhất 3 ký tự" }),
  status: z.enum(["active", "draft", "inactive"]),
  createdDate: z.string().optional(),
});

type CourseForm = z.infer<typeof courseSchema>;

// ====================== PAGE ======================
export default function CreateCoursePage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CourseForm>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      status: "active",
    },
  });

  const onSubmit = (data: CourseForm) => {
    console.log("New course:", data);
    alert("Khóa học mới đã được tạo!");
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <BookPlus className="h-5 w-5" />
              Tạo khóa học mới
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Tên khóa học */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Tên khóa học</label>
                <Input
                  {...register("title")}
                  placeholder="Nhập tên khóa học"
                  className="bg-white border border-gray-300 text-gray-900 
                              
                             rounded-md shadow-sm"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              {/* Mã khóa học */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Mã khóa học</label>
                <Input
                  {...register("shortName")}
                  placeholder="VD: MATH101"
                  className="bg-white border border-gray-300 text-gray-900 
                              
                             rounded-md shadow-sm"
                />
                {errors.shortName && (
                  <p className="text-red-500 text-sm">{errors.shortName.message}</p>
                )}
              </div>

              {/* Danh mục */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Danh mục</label>
                <Select
                  onValueChange={(v) =>
                    setValue("category", v, { shouldValidate: true })
                  }
                >
                  <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900  rounded-md shadow-sm">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Toán học">Toán học</SelectItem>
                    <SelectItem value="Khoa học">Khoa học</SelectItem>
                    <SelectItem value="Ngôn ngữ">Ngôn ngữ</SelectItem>
                    <SelectItem value="Công nghệ">Công nghệ</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category.message}</p>
                )}
              </div>

              {/* Giáo viên phụ trách */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Giáo viên phụ trách</label>
                <Input
                  {...register("teacher")}
                  placeholder="Tên giáo viên"
                  className="bg-white border border-gray-300 text-gray-900 
                             focus:ring-2
                             rounded-md shadow-sm"
                />
                {errors.teacher && (
                  <p className="text-red-500 text-sm">{errors.teacher.message}</p>
                )}
              </div>

              {/* Trạng thái */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Trạng thái</label>
                <Select
                  onValueChange={(v) =>
                    setValue("status", v as CourseForm["status"], {
                      shouldValidate: true,
                    })
                  }
                  defaultValue="active"
                >
                  <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="draft">Nháp</SelectItem>
                    <SelectItem value="inactive">Ngưng hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ngày tạo */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Ngày tạo</label>
                <Input
                  {...register("createdDate")}
                  type="date"
                  className="bg-white border border-gray-300 text-gray-900 
                              
                             rounded-md shadow-sm"
                />
              </div>

              {/* Nút lưu */}
              <div className="md:col-span-2 flex justify-end pt-4">
                <Button type="submit" className="text-white shadow-md">
                  <BookPlus className="h-4 w-4 mr-2" />
                  Lưu khóa học
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
