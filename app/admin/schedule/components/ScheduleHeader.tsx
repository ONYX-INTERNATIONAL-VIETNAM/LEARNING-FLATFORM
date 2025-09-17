"use client";

import { Button } from "@/components/ui/button";
import { CalendarDays, Download, Plus } from "lucide-react";

type Props = { onExport: () => void; onCreate: () => void };

export default function ScheduleHeader({ onExport, onCreate }: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-5 w-5" />
          <span className="text-sm">Admin • Schedule</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Lịch học</h1>
        <p className="text-gray-600">
          Quản lý buổi học theo tuần, tạo/sửa, hủy/khôi phục, xuất CSV, và cài đặt lặp.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV (tuần)
        </Button>
        <Button onClick={onCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo buổi học
        </Button>
      </div>
    </div>
  );
}
