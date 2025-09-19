"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ConfirmDialog } from "@/components/common/dialogs";
import Pagination from "@/components/common/Pagination";

export interface Assignment {
  id: string;
  title: string;
  class: string;
  startDate: string;
  dueDate: string;
  submitted: number;
  total: number;
  status: "open" | "closed" | "grading";
}

export interface AssignmentTableProps {
  data: Assignment[];
  pageSize?: number;
}

const statusMap: Record<Assignment["status"], { label: string; color: string }> = {
  open: { label: "Đang mở", color: "bg-green-100 text-green-700" },
  closed: { label: "Đã đóng", color: "bg-gray-200 text-gray-700" },
  grading: { label: "Đang chấm", color: "bg-blue-100 text-blue-700" },
};

export default function AssignmentTable({ data, pageSize = 5 }: AssignmentTableProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginated = data.slice(start, end);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách bài tập</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Tên bài tập</th>
                <th className="px-4 py-2 text-left">Lớp</th>
                <th className="px-4 py-2 text-left">Ngày giao</th>
                <th className="px-4 py-2 text-left">Hạn nộp</th>
                <th className="px-4 py-2 text-left">Nộp/Tổng</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((a) => (
                <tr key={a.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-2 font-medium">{a.title}</td>
                  <td className="px-4 py-2">{a.class}</td>
                  <td className="px-4 py-2">{a.startDate}</td>
                  <td className="px-4 py-2">{a.dueDate}</td>
                  <td className="px-4 py-2">
                    {a.submitted}/{a.total}
                  </td>
                  <td className="px-4 py-2">
                    <Badge className={statusMap[a.status].color}>
                      {statusMap[a.status].label}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/teacher/assignments/${a.id}`}>Xem chi tiết</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/teacher/assignments/${a.id}#grading`}>Chấm bài</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/teacher/assignments/${a.id}/edit`}>Chỉnh sửa</Link>
                        </DropdownMenuItem>

                        <div className="py-1">
                          <ConfirmDialog
                            title="Xóa bài tập"
                            description={`Bạn có chắc chắn muốn xóa "${a.title}" không? Hành động này không thể hoàn tác.`}
                            onConfirm={() => {
                              console.log("Đã xóa bài tập:", a.id);
                              // TODO: gọi API xóa assignment
                            }}
                            triggerLabel="Xóa bài tập"
                            triggerVariant="destructive"
                          />
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                    Không có bài tập nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <Pagination
            page={page}
            total={data.length}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        )}
      </CardContent>
    </Card>
  );
}
