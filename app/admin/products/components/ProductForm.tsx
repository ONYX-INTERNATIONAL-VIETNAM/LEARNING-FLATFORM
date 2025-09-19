"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import RichTextEditor from "@/components/common/forms/RichTextEditor";
import type { ProductFormData } from "../components/product";

export type ProductFormProps = {
  mode: "create" | "edit";
  defaultValues?: {
    name?: string;
    type?: string;
    price?: number | null;
    description?: string;
    isPublished?: boolean;
    tags?: string[];
    language?: string;
    level?: string;
    duration?: string;
  };
  onSubmit: (data: ProductFormData) => void | Promise<void>;
  onCancel: () => void;
};

export function ProductForm({
  mode,
  defaultValues,
  onSubmit,
}: ProductFormProps) {
  const [types, setTypes] = useState(["Course", "Document"]);
  const [form, setForm] = useState({
    name: defaultValues?.name || "",
    type: defaultValues?.type || "",
    price: defaultValues?.price || null,
    description: defaultValues?.description || "",
    isPublished: defaultValues?.isPublished || false,
    tags: defaultValues?.tags || [],
    language: defaultValues?.language || "vi",
    level: defaultValues?.level || "beginner",
    duration: defaultValues?.duration || "",
  });

  const [file, setFile] = useState<File | null>(null);

  // Dialog thêm loại sản phẩm
  const [openDialog, setOpenDialog] = useState(false);
  const [newType, setNewType] = useState("");

  const handleAddType = () => {
    if (newType && !types.includes(newType)) {
      setTypes([...types, newType]);
      setForm({ ...form, type: newType });
      setNewType("");
      setOpenDialog(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onSubmit({ ...form, file });
  };

  return (
    <Card className="max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Tạo sản phẩm mới" : "Chỉnh sửa sản phẩm"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Section: Thông tin cơ bản */}
        <div className="space-y-2">
          <Label>Tên sản phẩm</Label>
          <Input
            className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nhập tên khóa học hoặc tài liệu"
          />
        </div>

        {/* Loại sản phẩm */}
        <div className="space-y-2">
          <Label>Loại sản phẩm</Label>
          <Select
            value={form.type}
            onValueChange={(v) => {
              if (v === "__add_new__") {
                setOpenDialog(true);
              } else {
                setForm({ ...form, type: v });
              }
            }}
          >
            <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
              <SelectValue placeholder="Chọn loại" />
            </SelectTrigger>
            <SelectContent>
              {/* Option đặc biệt */}
              <SelectItem value="__add_new__">
                <span className="flex items-center text-blue-600 font-medium">
                  <Plus className="h-4 w-4 mr-1" /> Thêm loại mới
                </span>
              </SelectItem>
              {/* Danh sách loại */}
              {types.map((t) => (
                <SelectItem key={t} value={t}>
                  {t === "Course"
                    ? "Khóa học"
                    : t === "Document"
                      ? "Tài liệu"
                      : t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Giá</Label>
          <Input
            type="number"
            className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            placeholder="Để trống nếu miễn phí"
            value={form.price ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value ? parseInt(e.target.value) : null,
              })
            }
          />
        </div>

        <div className="flex items-center justify-between border rounded-md p-3">
          <div>
            <Label>Xuất bản ngay</Label>
            <p className="text-xs text-gray-500">Hiển thị công khai sau khi lưu</p>
          </div>
          <Switch
            checked={form.isPublished}
            onCheckedChange={(v) => setForm({ ...form, isPublished: v })}
          />
        </div>

        {/* Section: Nội dung */}
        <div className="space-y-2">
          <Label>Mô tả</Label>
          <RichTextEditor
            value={form.description}
            onChange={(html) => setForm({ ...form, description: html })}
            placeholder="Mô tả nội dung sản phẩm..."
          />
        </div>

        <div className="space-y-2">
          <Label>Tệp đính kèm (thumbnail hoặc tài liệu)</Label>
          <Input
            type="file"
            className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            onChange={handleFileChange}
          />
          {file && <p className="text-sm text-gray-500">Đã chọn: {file.name}</p>}
        </div>

        {/* Section: Metadata */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Ngôn ngữ</Label>
            <Select
              value={form.language}
              onValueChange={(v) => setForm({ ...form, language: v })}
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Chọn ngôn ngữ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="en">Tiếng Anh</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Cấp độ</Label>
            <Select
              value={form.level}
              onValueChange={(v) => setForm({ ...form, level: v })}
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Chọn cấp độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Cơ bản</SelectItem>
                <SelectItem value="intermediate">Trung cấp</SelectItem>
                <SelectItem value="advanced">Nâng cao</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Thời lượng</Label>
          <Input
            placeholder="Ví dụ: 10 giờ, 5 buổi học..."
            className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onSubmit({ ...form, isPublished: false })}>
            Lưu nháp
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "create" ? "Tạo sản phẩm" : "Cập nhật"}
          </Button>
        </div>
      </CardFooter>

      {/* Dialog thêm loại mới */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm loại sản phẩm</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="newType">Tên loại</Label>
            <Input
              id="newType"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              placeholder="Ví dụ: Ebook, Video, Bundle..."
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddType}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}