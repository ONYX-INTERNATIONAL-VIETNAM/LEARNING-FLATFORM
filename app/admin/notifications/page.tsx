"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Filter,
  MoreHorizontal,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ====================== FAKE DATA ======================
const fakeNotifications = Array.from({ length: 23 }).map((_, i) => ({
  id: i + 1,
  title: i % 2 === 0 ? "Bảo trì hệ thống" : "Cập nhật khóa học",
  type: i % 2 === 0 ? "Hệ thống" : "Học tập",
  target: i % 2 === 0 ? "Tất cả người dùng" : "Học sinh lớp 10A1",
  status: i % 3 === 0 ? "Đã gửi" : i % 3 === 1 ? "Nháp" : "Hẹn giờ",
  createdBy: "Admin",
  createdAt: "2025-09-15",
  sentAt: i % 3 === 0 ? "2025-09-16" : "-",
  recipients: 1000,
  read: Math.floor(Math.random() * 900),
}));

// ====================== COMPONENT ======================
export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Lọc dữ liệu
  const filteredData = useMemo(() => {
    return fakeNotifications.filter((n) => {
      const matchSearch = n.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchType =
        typeFilter === "all" || n.type.toLowerCase() === typeFilter;

      const matchStatus =
        statusFilter === "all" || n.status.toLowerCase() === statusFilter;

      return matchSearch && matchType && matchStatus;
    });
  }, [searchTerm, typeFilter, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Thông báo</h1>
          <p className="text-gray-600">
            Quản lý thông báo hệ thống và gửi đến người dùng
          </p>
        </div>
        <Link href="/admin/notifications/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tạo thông báo
          </Button>
        </Link>
      </div>

      {/* Bộ lọc */}
      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc và tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Input
                placeholder="Tìm theo tiêu đề..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm pl-10"
              />
              <Bell className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <Select
              value={typeFilter}
              onValueChange={(v) => {
                setTypeFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-48 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Loại thông báo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="hệ thống">Hệ thống</SelectItem>
                <SelectItem value="học tập">Học tập</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-48 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="đã gửi">Đã gửi</SelectItem>
                <SelectItem value="nháp">Nháp</SelectItem>
                <SelectItem value="hẹn giờ">Hẹn giờ</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Lọc nâng cao
            </Button>
          </div>

          {/* Bảng danh sách */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Đối tượng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Người tạo</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Ngày gửi</TableHead>
                <TableHead>Đã đọc</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((n) => (
                <TableRow key={n.id}>
                  <TableCell className="font-medium">{n.title}</TableCell>
                  <TableCell>{n.type}</TableCell>
                  <TableCell>{n.target}</TableCell>
                  <TableCell>{n.status}</TableCell>
                  <TableCell>{n.createdBy}</TableCell>
                  <TableCell>{n.createdAt}</TableCell>
                  <TableCell>{n.sentAt}</TableCell>
                  <TableCell>
                    {n.read}/{n.recipients}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/notifications/${n.id}`}>
                            Xem chi tiết
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Trang {page} / {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
