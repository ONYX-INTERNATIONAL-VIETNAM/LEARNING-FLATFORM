"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload, ImageIcon } from "lucide-react";

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

interface CourseFormProps {
  formData: CourseFormData;
  setFormData: React.Dispatch<React.SetStateAction<CourseFormData>>;
}

const CourseForm: React.FC<CourseFormProps> = ({ formData, setFormData }) => {
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Course data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tên khóa học *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Nhập tên khóa học"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortName">Tên viết tắt *</Label>
              <Input
                id="shortName"
                value={formData.shortName}
                onChange={(e) =>
                  setFormData({ ...formData, shortName: e.target.value })
                }
                placeholder="VD: MATH101"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Danh mục</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Toán học</SelectItem>
                  <SelectItem value="science">Khoa học</SelectItem>
                  <SelectItem value="language">Ngôn ngữ</SelectItem>
                  <SelectItem value="art">Nghệ thuật</SelectItem>
                  <SelectItem value="technology">Công nghệ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Tóm tắt khóa học</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                placeholder="Mô tả ngắn gọn về khóa học"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Course Image */}
        <Card>
          <CardHeader>
            <CardTitle>Hình ảnh khóa học</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <Button type="button" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Tải lên hình ảnh
                </Button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                PNG, JPG, GIF tối đa 10MB
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Mô tả chi tiết</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Mô tả chi tiết về nội dung, mục tiêu và yêu cầu của khóa học"
            rows={6}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Course Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt khóa học</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Ngày bắt đầu</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Ngày kết thúc</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxStudents">Số học sinh tối đa</Label>
              <Input
                id="maxStudents"
                type="number"
                value={formData.maxStudents}
                onChange={(e) =>
                  setFormData({ ...formData, maxStudents: e.target.value })
                }
                placeholder="Để trống nếu không giới hạn"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="enrollmentKey">Mã đăng ký (tùy chọn)</Label>
              <Input
                id="enrollmentKey"
                value={formData.enrollmentKey}
                onChange={(e) =>
                  setFormData({ ...formData, enrollmentKey: e.target.value })
                }
                placeholder="Mã để học sinh tự đăng ký"
              />
            </div>
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card>
          <CardHeader>
            <CardTitle>Quyền truy cập</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Hiển thị khóa học</Label>
                <p className="text-sm text-gray-500">
                  Cho phép học sinh thấy khóa học
                </p>
              </div>
              <Switch
                checked={formData.visible}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, visible: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tự đăng ký</Label>
                <p className="text-sm text-gray-500">
                  Học sinh có thể tự đăng ký khóa học
                </p>
              </div>
              <Switch
                checked={formData.selfEnrollment}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, selfEnrollment: checked })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Thẻ từ khóa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Thêm thẻ từ khóa"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
              />
              <Button type="button" onClick={addTag} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline">
          Lưu nháp
        </Button>
        <Button type="submit">Tạo khóa học</Button>
      </div>
    </form>
  );
};

export default CourseForm;