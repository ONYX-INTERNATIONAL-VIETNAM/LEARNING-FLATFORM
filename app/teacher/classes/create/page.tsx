"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { ArrowLeft, Save, Plus } from "lucide-react";

export default function CreateClassPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    subject: "",
    grade: "",
    teacher: "",
    capacity: "",
    schedule: "",
    room: "",
    startDate: "",
    endDate: "",
    description: "",
    allowComments: true,
    autoAttendance: false,
    notifyReminder: true,
  });

  const handleSubmit = (mode: "draft" | "create") => {
    console.log("Class data:", { ...form, mode });

    // 👉 TODO: gọi API backend để lưu lớp học
    // await fetch("/api/classes", { method: "POST", body: JSON.stringify({ ...form, mode }) })

    toast.success(
      mode === "draft" ? "Lớp học đã được lưu nháp!" : "Tạo lớp học thành công!"
    );

    router.push("/teacher/classes");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tạo lớp học mới</h1>
          <p className="text-gray-600 text-sm">
            Nhập thông tin chi tiết để tạo một lớp học trong hệ thống
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push("/teacher/classes")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
      </div>

      {/* Form */}
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>Thông tin lớp học</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tên lớp học */}
          <div className="space-y-2">
            <Label>Tên lớp học</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nhập tên lớp học (VD: Toán học lớp 3A)"
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>

          {/* Môn học + Khối lớp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Môn học</Label>
              <Select
                value={form.subject}
                onValueChange={(v) => setForm({ ...form, subject: v })}
              >
                <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                  <SelectValue placeholder="Chọn môn học" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Toán học</SelectItem>
                  <SelectItem value="english">Tiếng Anh</SelectItem>
                  <SelectItem value="science">Khoa học</SelectItem>
                  <SelectItem value="history">Lịch sử</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Khối/Lớp</Label>
              <Select
                value={form.grade}
                onValueChange={(v) => setForm({ ...form, grade: v })}
              >
                <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                  <SelectValue placeholder="Chọn khối/lớp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Lớp 1</SelectItem>
                  <SelectItem value="2">Lớp 2</SelectItem>
                  <SelectItem value="3">Lớp 3</SelectItem>
                  <SelectItem value="4">Lớp 4</SelectItem>
                  <SelectItem value="5">Lớp 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Giáo viên + Số lượng */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Giáo viên phụ trách</Label>
              <Input
                value={form.teacher}
                onChange={(e) => setForm({ ...form, teacher: e.target.value })}
                placeholder="Nhập tên giáo viên phụ trách"
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Số lượng học sinh tối đa</Label>
              <Input
                type="number"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                placeholder="VD: 30"
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Lịch học + Phòng học */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Lịch học</Label>
              <Input
                value={form.schedule}
                onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                placeholder="VD: Thứ 2, 4, 6 - 8:00-9:30"
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Phòng học / Link học online</Label>
              <Input
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                placeholder="VD: Phòng A101 hoặc Zoom link"
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Ngày bắt đầu - kết thúc */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ngày bắt đầu</Label>
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Ngày kết thúc</Label>
              <Input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Mô tả */}
          <div className="space-y-2">
            <Label>Mô tả chi tiết</Label>
            <Textarea
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Mô tả chi tiết về lớp học..."
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>

          {/* Tùy chọn nâng cao */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between border rounded-md p-3">
              <Label>Cho phép học viên bình luận</Label>
              <Switch
                checked={form.allowComments}
                onCheckedChange={(v) => setForm({ ...form, allowComments: v })}
              />
            </div>
            <div className="flex items-center justify-between border rounded-md p-3">
              <Label>Điểm danh tự động</Label>
              <Switch
                checked={form.autoAttendance}
                onCheckedChange={(v) => setForm({ ...form, autoAttendance: v })}
              />
            </div>
            <div className="flex items-center justify-between border rounded-md p-3">
              <Label>Gửi thông báo nhắc nhở</Label>
              <Switch
                checked={form.notifyReminder}
                onCheckedChange={(v) => setForm({ ...form, notifyReminder: v })}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => handleSubmit("draft")}>
            <Save className="h-4 w-4 mr-2" />
            Lưu nháp
          </Button>
          <Button onClick={() => handleSubmit("create")}>
            <Plus className="h-4 w-4 mr-2" />
            Tạo lớp học
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
