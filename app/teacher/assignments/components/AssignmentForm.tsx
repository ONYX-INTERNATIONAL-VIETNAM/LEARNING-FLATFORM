"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export interface AssignmentFormProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}

export default function AssignmentForm({ open, onOpenChange }: AssignmentFormProps) {
  const [title, setTitle] = useState("");
  const [classId, setClassId] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [maxScore, setMaxScore] = useState(10);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Tạo bài tập mới</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Tên bài tập */}
          <div className="space-y-1">
            <Label htmlFor="title">Tên bài tập</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề bài tập"
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>

          {/* Lớp áp dụng */}
          <div className="space-y-1">
            <Label>Lớp học</Label>
            <Select value={classId} onValueChange={setClassId}>
              <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Chọn lớp học" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toan3a">Toán 3A</SelectItem>
                <SelectItem value="anh4b">Anh văn 4B</SelectItem>
                <SelectItem value="khoa5c">Khoa học 5C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ngày giao & hạn nộp */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="startDate">Ngày giao</Label>
              <Input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="dueDate">Hạn nộp</Label>
              <Input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Điểm tối đa */}
          <div className="space-y-1">
            <Label htmlFor="maxScore">Điểm tối đa</Label>
            <Input
              type="number"
              id="maxScore"
              value={maxScore}
              onChange={(e) => setMaxScore(Number(e.target.value))}
              min={1}
              max={100}
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>

          {/* Mô tả */}
          <div className="space-y-1">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả chi tiết..."
              rows={4}
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={() => onOpenChange(false)}>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
