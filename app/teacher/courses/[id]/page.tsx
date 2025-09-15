"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseForm from "@/components/course-builder/CourseForm";
import SectionBuilder from "@/components/course-builder/SectionBuilder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Eye } from "lucide-react";
import Link from "next/link";

export default function EditCoursePage() {

    const [activeTab, setActiveTab] = useState("basic");

  const [formData, setFormData] = useState({
    title: "Toán Tiểu học",
    shortName: "MATH-PRI",
    category: "math",
    description:
      "Khóa học Toán Tiểu học giúp học sinh rèn luyện tư duy logic và kỹ năng tính toán cơ bản.",
    summary: "Ôn tập cộng, trừ, nhân, chia và các bài toán cơ bản.",
    startDate: "2025-09-01",
    endDate: "2026-05-31",
    enrollmentKey: "math2025",
    visible: true,
    selfEnrollment: true,
    maxStudents: "50",
    tags: ["toán", "tiểu học", "cơ bản"],
    image: "/images/math-course.png",
  });


  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/teacher/courses">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Chỉnh sửa khóa học</h1>
          <p className="text-gray-600">
            Cập nhật thông tin khóa học Toán Tiểu học
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Xem trước
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="content">Nội dung khóa học</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt nâng cao</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <CourseForm formData={formData} setFormData={setFormData} />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <SectionBuilder
            // sections={[
            //   { title: "Chương 1: Số tự nhiên và phép cộng", lessons: [] },
            //   { title: "Chương 2: Phép trừ và so sánh số", lessons: [] },
            //   { title: "Chương 3: Phép nhân và phép chia", lessons: [] },
            //   { title: "Chương 4: Hình học cơ bản", lessons: [] },
            // ]}
          />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt điểm số</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Cấu hình cách tính điểm cho môn Toán Tiểu học
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Cấu hình thang điểm 10
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cài đặt hoàn thành</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Thiết lập học sinh phải hoàn thành tất cả bài tập Toán mới được coi là hoàn thành khóa học
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Cấu hình điều kiện
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cài đặt thông báo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Gửi thông báo khi có bài tập hoặc kỳ kiểm tra mới
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Cấu hình thông báo
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sao lưu & Khôi phục</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Sao lưu toàn bộ nội dung khóa học Toán Tiểu học
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Tạo bản sao lưu
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
