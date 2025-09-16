"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const courses = [
  {
    id: "1",
    title: "Toán học cơ bản lớp 1",
    shortName: "MATH101",
    category: "Toán học",
    teacher: "Trần Thị Bình",
    students: 45,
    status: "active",
    created: "2024-01-15",
  },
  {
    id: "2",
    title: "Khoa học tự nhiên lớp 2",
    shortName: "SCI201",
    category: "Khoa học",
    teacher: "Nguyễn Văn Cường",
    students: 38,
    status: "active",
    created: "2024-01-20",
  },
  {
    id: "3",
    title: "Tiếng Anh cho trẻ em",
    shortName: "ENG101",
    category: "Ngôn ngữ",
    teacher: "Lê Thị Dung",
    students: 52,
    status: "draft",
    created: "2024-02-01",
  },
  // 👉 thêm dữ liệu giả nhiều hơn để test phân trang
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: `${i + 4}`,
    title: `Khóa học giả lập ${i + 4}`,
    shortName: `FAKE${i + 4}`,
    category: i % 2 === 0 ? "Khoa học" : "Ngôn ngữ",
    teacher: `Giáo viên ${i + 4}`,
    students: 20 + i,
    status: i % 3 === 0 ? "active" : i % 3 === 1 ? "draft" : "inactive",
    created: "2024-02-10",
  })),
];

const AdminCoursesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // số khóa học mỗi trang

  const totalPages = Math.ceil(courses.length / pageSize);
  const paginatedCourses = courses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý khóa học</h1>
          <p className="text-gray-600">Quản lý tất cả khóa học trong hệ thống</p>
        </div>
        <Link href="/admin/courses/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tạo khóa học mới
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng khóa học</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">+8 khóa học mới tháng này</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.filter((c) => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Khóa học đang mở</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng học sinh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce((acc, c) => acc + c.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Tổng học sinh tham gia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ hoàn thành</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <p className="text-xs text-muted-foreground">+2.1% cải thiện</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khóa học</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Tìm kiếm khóa học..." className="pl-10 bg-white border border-gray-300 text-gray-900 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             rounded-md shadow-sm" />
            </div>
            <Button variant="outline">Bộ lọc</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khóa học</TableHead>
                <TableHead>Giáo viên</TableHead>
                <TableHead>Học sinh</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-gray-500">
                        {course.shortName} • {course.category}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{course.teacher}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      {course.students}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={course.status === "active" ? "default" : "secondary"}
                    >
                      {course.status === "active"
                        ? "Hoạt động"
                        : course.status === "draft"
                          ? "Nháp"
                          : "Ngưng hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.created}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/admin/courses/${course.id}`} >
                          <DropdownMenuItem className="mb-1">
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                        </Link>
                        <ConfirmDialog
                          title="Xóa khóa học"
                          description={`Bạn có chắc chắn muốn xóa ${course.title}? Hành động này không thể hoàn tác.`}
                          onConfirm={() => {
                            console.log("Đã xóa khóa học:", course.id);
                            // TODO: gọi API hoặc setUsers(users.filter(u => u.id !== user.id))
                          }}
                          triggerLabel="Xóa khóa học"
                        />
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
              Trang {currentPage} / {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCoursesPage;
