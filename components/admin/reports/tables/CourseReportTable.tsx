"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const rows = [
  { id: "MATH101", title: "Toán 1", students: 120, completion: 87, hours: 540 },
  { id: "SCI201", title: "Khoa học 2", students: 98, completion: 81, hours: 420 },
  { id: "ENG101", title: "Tiếng Anh", students: 156, completion: 73, hours: 690 },
  { id: "GEO101", title: "Địa lý", students: 72, completion: 66, hours: 300 },
];

export default function CourseReportTable() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Hiệu suất khóa học</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Mã", "Khóa học", "Học viên", "Hoàn thành", "Giờ học"].map((h) => (
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
                <td className="px-4 py-2">{r.students}</td>
                <td className="px-4 py-2">{r.completion}%</td>
                <td className="px-4 py-2">{r.hours.toLocaleString("vi-VN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
