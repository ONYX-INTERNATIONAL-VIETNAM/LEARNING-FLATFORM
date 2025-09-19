"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface AssignmentFiltersProps {
  selectedClass: string;
  onClassChange: (val: string) => void;
  search: string;
  onSearchChange: (val: string) => void;
}

export default function AssignmentFilters({
  selectedClass,
  onClassChange,
  search,
  onSearchChange,
}: AssignmentFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm bài tập..."
          className="pl-10 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Select value={selectedClass} onValueChange={onClassChange}>
        <SelectTrigger className="w-[180px] bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
          <SelectValue placeholder="Chọn lớp học" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả lớp</SelectItem>
          <SelectItem value="Toán 3A">Toán 3A</SelectItem>
          <SelectItem value="Anh văn 4B">Anh văn 4B</SelectItem>
          <SelectItem value="Khoa học 5C">Khoa học 5C</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
