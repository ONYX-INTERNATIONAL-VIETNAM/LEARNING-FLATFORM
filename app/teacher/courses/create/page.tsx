"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseForm from "@/components/course-builder/CourseForm";
import SectionBuilder from "@/components/course-builder/SectionBuilder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Eye } from "lucide-react";
import Link from "next/link";

interface CourseFormData {
  title: string;
  shortName: string;
  category: string;
  description: string;
  summary: string;
  startDate: string;
  endDate: string;
  enrollmentKey: string;
  visible: boolean;
  selfEnrollment: boolean;
  maxStudents: string;
  tags: string[];
  image: string;
}

export default function CreateCoursePage() {
  const [activeTab, setActiveTab] = useState("basic");

  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    shortName: "",
    category: "",
    description: "",
    summary: "",
    startDate: "",
    endDate: "",
    enrollmentKey: "",
    visible: true,
    selfEnrollment: false,
    maxStudents: "",
    tags: [],
    image: "",
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
          <h1 className="text-3xl font-bold">Tạo khóa học mới</h1>
          <p className="text-gray-600">
            Thiết kế khóa học với các hoạt động và tài nguyên phong phú
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Xem trước
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Lưu khóa học
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
          <SectionBuilder />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt điểm số</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Cấu hình cách tính điểm và đánh giá trong khóa học
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Cấu hình thang điểm
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cài đặt hoàn thành</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Thiết lập điều kiện hoàn thành khóa học
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
                  Quản lý thông báo và email tự động
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
                  Sao lưu nội dung khóa học và cài đặt
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
