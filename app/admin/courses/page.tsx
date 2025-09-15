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
} from "lucide-react";
import Link from "next/link";

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
];

const AdminCoursesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý khóa học</h1>
          <p className="text-gray-600">
            Quản lý tất cả khóa học trong hệ thống
          </p>
        </div>
        <Link href="/teacher/courses/create">
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
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +8 khóa học mới tháng này
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Đang hoạt động
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              91% tổng số khóa học
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng học sinh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,341</div>
            <p className="text-xs text-muted-foreground">
              +12% so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tỷ lệ hoàn thành
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <p className="text-xs text-muted-foreground">+2.1% cải thiện</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khóa học</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Tìm kiếm khóa học..." className="pl-10" />
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
              {courses.map((course) => (
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
                      variant={
                        course.status === "active" ? "default" : "secondary"
                      }
                    >
                      {course.status === "active" ? "Hoạt động" : "Nháp"}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.created}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCoursesPage;
