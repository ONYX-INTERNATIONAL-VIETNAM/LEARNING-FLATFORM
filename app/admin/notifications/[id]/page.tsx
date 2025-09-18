"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Edit, Save, Send } from "lucide-react";
import { toast } from "sonner"; // 👈 import sonner

// ====================== FAKE DATA ======================
const fakeNotification = {
  id: 1,
  title: "Bảo trì hệ thống",
  content: "Hệ thống sẽ bảo trì vào ngày 20/09/2025.",
  type: "system",
  target: "all",
  status: "nháp", // "nháp" | "hẹn giờ" | "đã gửi"
  isScheduled: false,
  scheduleDate: "",
  createdBy: "Admin",
  createdAt: "2025-09-15",
  sentAt: "-",
  recipients: 1000,
  read: 300,
};

export default function NotificationDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(fakeNotification);

  const handleSave = () => {
    try {
      console.log("Cập nhật:", form);
      // 👉 TODO: gọi API cập nhật
      toast.success("Thông báo đã được cập nhật");
      setEditMode(false);
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi khi cập nhật thông báo");
    }
  };

  const handleSend = () => {
    try {
      console.log("Gửi thông báo:", form);
      // 👉 TODO: gọi API gửi thông báo
      toast.success("Thông báo đã được gửi");
      router.push("/admin/notifications");
    } catch (err) {
      console.log(err);
      
      toast.error("Không thể gửi thông báo");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Chi tiết thông báo #{id}</h1>
          <p className="text-gray-600 text-sm">
            {editMode
              ? "Chỉnh sửa nội dung và cài đặt thông báo"
              : "Xem thông tin chi tiết thông báo"}
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

      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>
            {editMode ? "Chỉnh sửa thông báo" : "Thông tin thông báo"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tiêu đề */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tiêu đề</label>
            <Input
              disabled={!editMode}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>

          {/* Nội dung */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Nội dung</label>
            <Textarea
              disabled={!editMode}
              rows={5}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>

          {/* Loại thông báo */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Loại thông báo</label>
            <Select
              disabled={!editMode}
              value={form.type}
              onValueChange={(v) => setForm({ ...form, type: v })}
            >
              <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue />
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
            <label className="text-sm font-medium">Đối tượng nhận</label>
            <Select
              disabled={!editMode}
              value={form.target}
              onValueChange={(v) => setForm({ ...form, target: v })}
            >
              <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue />
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
              <label className="text-sm font-medium">Hẹn giờ gửi</label>
              <p className="text-xs text-gray-500">
                Nếu bật, bạn có thể chọn ngày giờ gửi thay vì gửi ngay
              </p>
            </div>
            <Switch
              disabled={!editMode}
              checked={form.isScheduled}
              onCheckedChange={(v) => setForm({ ...form, isScheduled: v })}
            />
          </div>
          {form.isScheduled && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Ngày giờ gửi</label>
              <Input
                disabled={!editMode}
                type="datetime-local"
                value={form.scheduleDate}
                onChange={(e) =>
                  setForm({ ...form, scheduleDate: e.target.value })
                }
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
          )}

          {/* Thống kê */}
          {!editMode && (
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <span className="font-medium">Người tạo:</span> {form.createdBy}
              </div>
              <div>
                <span className="font-medium">Ngày tạo:</span> {form.createdAt}
              </div>
              <div>
                <span className="font-medium">Ngày gửi:</span> {form.sentAt}
              </div>
              <div>
                <span className="font-medium">Đã đọc:</span>{" "}
                {form.read}/{form.recipients}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          {!editMode && form.status !== "đã gửi" ? (
            <Button variant="outline" onClick={() => setEditMode(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </Button>
          ) : null}

          {editMode ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Hủy
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Lưu thay đổi
              </Button>
            </div>
          ) : form.status !== "đã gửi" ? (
            <Button onClick={handleSend}>
              <Send className="h-4 w-4 mr-2" />
              Gửi thông báo
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
}
