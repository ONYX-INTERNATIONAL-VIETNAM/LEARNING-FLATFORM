"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Send, Save } from "lucide-react";
import { toast } from "sonner"; // 👈 import sonner

export default function CreateNotificationPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    content: "",
    type: "",
    target: "",
    isScheduled: false,
    scheduleDate: "",
  });

  const handleSubmit = (mode: "draft" | "send") => {
    console.log("Notification data:", { ...form, mode });

    // 👉 TODO: Gọi API để lưu/gửi thông báo
    // await fetch("/api/notifications", { method: "POST", body: JSON.stringify({ ...form, mode }) })

    if (mode === "draft") {
      toast.success("Thông báo đã lưu nháp");
    } else {
      toast.success("Thông báo đã được gửi thành công");
    }

    router.push("/admin/notifications");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tạo thông báo mới</h1>
          <p className="text-gray-600 text-sm">
            Nhập thông tin chi tiết để gửi đến người dùng
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/notifications")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
      </div>

      {/* Form */}
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>Thông tin thông báo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tiêu đề */}
          <div className="space-y-2">
            <Label>Tiêu đề</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Nhập tiêu đề thông báo"
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>

          {/* Nội dung */}
          <div className="space-y-2">
            <Label>Nội dung</Label>
            <Textarea
              rows={6}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Nhập nội dung chi tiết..."
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>

          {/* Loại thông báo */}
          <div className="space-y-2">
            <Label>Loại thông báo</Label>
            <Select
              value={form.type}
              onValueChange={(v) => setForm({ ...form, type: v })}
            >
              <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Chọn loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">Hệ thống</SelectItem>
                <SelectItem value="learning">Học tập</SelectItem>
                <SelectItem value="commerce">Thương mại</SelectItem>
                <SelectItem value="warning">Cảnh báo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Đối tượng nhận */}
          <div className="space-y-2">
            <Label>Đối tượng nhận</Label>
            <Select
              value={form.target}
              onValueChange={(v) => setForm({ ...form, target: v })}
            >
              <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Chọn đối tượng nhận" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả người dùng</SelectItem>
                <SelectItem value="teachers">Giáo viên</SelectItem>
                <SelectItem value="students">Học sinh</SelectItem>
                <SelectItem value="class">Theo lớp cụ thể</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hẹn giờ gửi */}
          <div className="flex items-center justify-between border rounded-md p-3">
            <div>
              <Label>Hẹn giờ gửi</Label>
              <p className="text-xs text-gray-500">
                Nếu bật, bạn có thể chọn ngày giờ gửi thay vì gửi ngay
              </p>
            </div>
            <Switch
              checked={form.isScheduled}
              onCheckedChange={(v) => setForm({ ...form, isScheduled: v })}
            />
          </div>
          {form.isScheduled && (
            <div className="space-y-2">
              <Label>Ngày giờ gửi</Label>
              <Input
                type="datetime-local"
                value={form.scheduleDate}
                onChange={(e) =>
                  setForm({ ...form, scheduleDate: e.target.value })
                }
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => handleSubmit("draft")}>
            <Save className="h-4 w-4 mr-2" />
            Lưu nháp
          </Button>
          <Button onClick={() => handleSubmit("send")}>
            <Send className="h-4 w-4 mr-2" />
            Gửi thông báo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
