"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Filter, RotateCcw } from "lucide-react";

export type ReportFilter = {
  from: string; // YYYY-MM-DD
  to: string;
  role?: string;
  category?: string;
  status?: string;
};

export default function ReportFilterBar({
  value,
  onChange,
  extras,
}: {
  value: ReportFilter;
  onChange: (v: ReportFilter) => void;
  extras?: React.ReactNode; // nút export...
}) {
  const today = useMemo(
    () => new Date().toISOString().slice(0, 10),
    []
  );

  return (
    <div className="flex flex-col lg:flex-row lg:items-end gap-3 lg:gap-4">
      <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Từ ngày</label>
          <Input
            type="date"
            value={value.from}
            onChange={(e) => onChange({ ...value, from: e.target.value })}
            className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Đến ngày</label>
          <Input
            type="date"
            max={today}
            value={value.to}
            onChange={(e) => onChange({ ...value, to: e.target.value })}
            className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full lg:w-auto">
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Vai trò</label>
          <Select
            value={value.role ?? "all"}
            onValueChange={(v) => onChange({ ...value, role: v === "all" ? undefined : v })}
          >
            <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Học sinh">Học sinh</SelectItem>
              <SelectItem value="Giáo viên">Giáo viên</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Danh mục</label>
          <Select
            value={value.category ?? "all"}
            onValueChange={(v) => onChange({ ...value, category: v === "all" ? undefined : v })}
          >
            <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Toán học">Toán học</SelectItem>
              <SelectItem value="Khoa học">Khoa học</SelectItem>
              <SelectItem value="Ngôn ngữ">Ngôn ngữ</SelectItem>
              <SelectItem value="Địa lý">Địa lý</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600">Trạng thái</label>
          <Select
            value={value.status ?? "all"}
            onValueChange={(v) => onChange({ ...value, status: v === "all" ? undefined : v })}
          >
            <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
              <SelectItem value="draft">Nháp</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="bg-white border border-gray-300 rounded-md shadow-sm">
          <Filter className="w-4 h-4 mr-2" />
          Lọc
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            onChange({
              from: new Date(Date.now() - 29 * 24 * 3600 * 1000).toISOString().slice(0, 10),
              to: today,
              role: undefined,
              category: undefined,
              status: undefined,
            })
          }
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Đặt lại
        </Button>
        {extras}
      </div>
    </div>
  );
}
