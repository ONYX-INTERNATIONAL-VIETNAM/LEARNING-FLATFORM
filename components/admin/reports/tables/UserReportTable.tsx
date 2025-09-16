"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const rows = [
  { name: "Nguyễn Văn A", email: "a@example.com", role: "Học sinh", courses: 5, completion: 92, lastLogin: "2025-09-10" },
  { name: "Trần Thị B", email: "b@example.com", role: "Giáo viên", courses: 3, completion: 88, lastLogin: "2025-09-13" },
  { name: "Lê Văn C", email: "c@example.com", role: "Học sinh", courses: 7, completion: 61, lastLogin: "2025-09-12" },
];

export default function UserReportTable() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Hiệu suất người dùng</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Họ tên", "Email", "Vai trò", "Số khóa", "Hoàn thành TB", "Đăng nhập cuối"].map((h) => (
                <th key={h} className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-700">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.email} className="hover:bg-gray-50">
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2 text-gray-600">{r.email}</td>
                <td className="px-4 py-2">{r.role}</td>
                <td className="px-4 py-2">{r.courses}</td>
                <td className="px-4 py-2">{r.completion}%</td>
                <td className="px-4 py-2">{new Date(r.lastLogin).toLocaleDateString("vi-VN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
