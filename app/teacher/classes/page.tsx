import ClassCard from "@/components/common/cards/ClassCard"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import Link from "next/link";

const allClasses = [
  {
    id: "1",
    name: "Toán học lớp 3A",
    subject: "Toán học",
    students: 25,
    schedule: "Thứ 2, 4, 6",
    nextClass: "Thứ 2, 8:00 - 9:30",
    status: "active" as const,
  },
  {
    id: "2",
    name: "Tiếng Anh lớp 4B",
    subject: "Tiếng Anh",
    students: 20,
    schedule: "Thứ 3, 5, 7",
    nextClass: "Thứ 3, 10:00 - 11:30",
    status: "upcoming" as const,
  },
  {
    id: "3",
    name: "Khoa học lớp 5C",
    subject: "Khoa học",
    students: 18,
    schedule: "Thứ 2, 4",
    nextClass: "Thứ 4, 14:00 - 15:30",
    status: "active" as const,
  },
  {
    id: "4",
    name: "Toán học lớp 2A",
    subject: "Toán học",
    students: 22,
    schedule: "Thứ 3, 5",
    nextClass: "Đã kết thúc học kỳ",
    status: "completed" as const,
  },
];

const TeacherClassesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Quản lý lớp học</h1>
          <p className="text-muted-foreground">
            Theo dõi và quản lý tất cả lớp học của bạn
          </p>
        </div>
        <Link href="/teacher/classes/create">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4 mr-2" />
            Tạo lớp học mới
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Tìm kiếm lớp học..." className="pl-10 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-48 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
            <SelectValue placeholder="Lọc theo môn học" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả môn học</SelectItem>
            <SelectItem value="math">Toán học</SelectItem>
            <SelectItem value="english">Tiếng Anh</SelectItem>
            <SelectItem value="science">Khoa học</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-48 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Đang diễn ra</SelectItem>
            <SelectItem value="upcoming">Sắp tới</SelectItem>
            <SelectItem value="completed">Đã kết thúc</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allClasses.map((classItem) => (
          <ClassCard key={classItem.id} {...classItem} />
        ))}
      </div>
    </div>
  );
};

export default TeacherClassesPage;
