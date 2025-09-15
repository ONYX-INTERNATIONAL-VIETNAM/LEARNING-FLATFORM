import CourseCard from "@/components/CourseCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const allCourses = [
  {
    id: "1",
    title: "Toán học cơ bản",
    description:
      "Học toán một cách vui nhộn với trò chơi và hình ảnh sinh động",
    image: "/colorful-math-learning-for-kids.jpg",
    progress: 0,
    totalLessons: 20,
    completedLessons: 0,
    duration: "4 tuần",
    students: 1250,
    level: "Cơ bản",
    levelColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "2",
    title: "Tiếng Anh cho trẻ em",
    description: "Phát triển kỹ năng tiếng Anh qua câu chuyện và bài hát",
    image: "/english-learning-for-children-with-books.jpg",
    progress: 0,
    totalLessons: 25,
    completedLessons: 0,
    duration: "6 tuần",
    students: 980,
    level: "Sơ cấp",
    levelColor: "bg-green-100 text-green-800",
  },
  {
    id: "3",
    title: "Khoa học thú vị",
    description: "Khám phá thế giới khoa học qua thí nghiệm đơn giản",
    image: "/fun-science-experiments-for-kids.jpg",
    progress: 0,
    totalLessons: 15,
    completedLessons: 0,
    duration: "5 tuần",
    students: 756,
    level: "Trung cấp",
    levelColor: "bg-purple-100 text-purple-800",
  },
  {
    id: "4",
    title: "Lịch sử Việt Nam",
    description: "Tìm hiểu lịch sử dân tộc qua những câu chuyện thú vị",
    image: "/placeholder.svg?key=history",
    progress: 0,
    totalLessons: 18,
    completedLessons: 0,
    duration: "4 tuần",
    students: 642,
    level: "Cơ bản",
    levelColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "5",
    title: "Âm nhạc cho trẻ",
    description: "Học nhạc cụ và hát những bài hát vui nhộn",
    image: "/placeholder.svg?key=music",
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    duration: "3 tuần",
    students: 523,
    level: "Sơ cấp",
    levelColor: "bg-green-100 text-green-800",
  },
  {
    id: "6",
    title: "Vẽ và tô màu",
    description: "Phát triển khả năng sáng tạo qua hội họa",
    image: "/placeholder.svg?key=art",
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    duration: "4 tuần",
    students: 789,
    level: "Cơ bản",
    levelColor: "bg-blue-100 text-blue-800",
  },
];

const CoursesPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Khám phá khóa học</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tìm kiếm và tham gia các khóa học phù hợp với độ tuổi và sở thích
            của bạn
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Tìm kiếm khóa học..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Cấp độ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả cấp độ</SelectItem>
              <SelectItem value="basic">Cơ bản</SelectItem>
              <SelectItem value="intermediate">Trung cấp</SelectItem>
              <SelectItem value="advanced">Nâng cao</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Môn học" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả môn học</SelectItem>
              <SelectItem value="math">Toán học</SelectItem>
              <SelectItem value="english">Tiếng Anh</SelectItem>
              <SelectItem value="science">Khoa học</SelectItem>
              <SelectItem value="history">Lịch sử</SelectItem>
              <SelectItem value="art">Nghệ thuật</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {allCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Xem thêm khóa học
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
