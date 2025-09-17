"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data
const reportData = [
  { id: 1, user: "Alice", course: "React Basics", progress: "80%" },
  { id: 2, user: "Bob", course: "Next.js Routing", progress: "65%" },
  { id: 3, user: "Charlie", course: "Postgres Indexes", progress: "92%" },
];

// Hàm tải file chung
function downloadFile(content: string, fileName: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

// Export CSV
function exportCSV() {
  const header = Object.keys(reportData[0]).join(",") + "\n";
  const rows = reportData.map((row) => Object.values(row).join(",")).join("\n");
  downloadFile(header + rows, "report.csv", "text/csv;charset=utf-8;");
  toast.success("Đã xuất báo cáo CSV thành công!");
}

// Export PDF (mock text-only)
function exportPDF() {
  const content = reportData
    .map((row) => `${row.id}. ${row.user} - ${row.course} (${row.progress})`)
    .join("\n");
  downloadFile(content, "report.pdf", "application/pdf");
  toast.success("Đã xuất báo cáo PDF thành công!");
}

export default function ExportsReportPage() {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("weekly");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Xuất dữ liệu</h1>
        <p className="text-gray-600">
          Tải báo cáo dưới dạng CSV/PDF hoặc thiết lập lịch gửi định kỳ qua email.
        </p>
      </div>

      {/* Export buttons */}
      <section className="bg-white rounded-xl shadow p-4 space-y-4">
        <h2 className="text-lg font-semibold">Tải xuống ngay</h2>
        <div className="flex gap-3">
          <Button onClick={exportCSV} className="bg-blue-600 hover:bg-blue-700">
            Export CSV
          </Button>
          <Button onClick={exportPDF} className="bg-red-600 hover:bg-red-700">
            Export PDF
          </Button>
        </div>
      </section>

      {/* Recurring Reports */}
      <section className="bg-white rounded-xl shadow p-4 space-y-4">
        <h2 className="text-lg font-semibold">Thiết lập báo cáo định kỳ</h2>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Email nhận báo cáo</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border p-2"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Tần suất</label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger className="w-full rounded-lg border p-2">
              <SelectValue placeholder="Chọn tần suất" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Hàng ngày</SelectItem>
              <SelectItem value="weekly">Hàng tuần</SelectItem>
              <SelectItem value="monthly">Hàng tháng</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => {
            if (!email) {
              toast.error("Vui lòng nhập email trước khi lưu!");
              return;
            }
            toast.success(`Đã lưu cài đặt: ${frequency} gửi tới ${email}`);
          }}
          className="bg-green-600 hover:bg-green-700"
        >
          Lưu cài đặt
        </Button>
      </section>
    </div>
  );
}
