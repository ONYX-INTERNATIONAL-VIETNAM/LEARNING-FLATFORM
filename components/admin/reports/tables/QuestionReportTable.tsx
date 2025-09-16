"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const rows = [
  { id: "Q1001", title: "Phép cộng cơ bản", type: "Trắc nghiệm", attempts: 1200, correctRate: 78 },
  { id: "Q2033", title: "Địa lý VN", type: "Đúng/Sai", attempts: 540, correctRate: 52 },
  { id: "Q1109", title: "Tiếng Anh A1", type: "Tự luận", attempts: 210, correctRate: 69 },
];

export default function QuestionReportTable() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Phân tích câu hỏi</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Mã", "Tiêu đề", "Loại", "Lượt làm", "Tỉ lệ đúng"].map((h) => (
                <th key={h} className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-700">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-mono text-sm">{r.id}</td>
                <td className="px-4 py-2">{r.title}</td>
                <td className="px-4 py-2">{r.type}</td>
                <td className="px-4 py-2">{r.attempts.toLocaleString("vi-VN")}</td>
                <td className="px-4 py-2">{r.correctRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
