import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressCard from "@/components/ProgressCard";
import CourseCard from "@/components/CourseCard";
import AchievementBadge from "@/components/AchievementBadge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Trophy, Calendar } from "lucide-react";

const recentCourses = [
  {
    id: "1",
    title: "Toán học cơ bản",
    description:
      "Học toán một cách vui nhộn với trò chơi và hình ảnh sinh động",
    image: "/colorful-math-learning-for-kids.jpg",
    progress: 65,
    totalLessons: 20,
    completedLessons: 13,
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
    progress: 40,
    totalLessons: 25,
    completedLessons: 10,
    duration: "6 tuần",
    students: 980,
    level: "Sơ cấp",
    levelColor: "bg-green-100 text-green-800",
  },
];

const achievements = [
  {
    title: "Học sinh xuất sắc",
    description: "Hoàn thành 5 khóa học",
    type: "trophy" as const,
    earned: true,
    date: "15/12/2024",
  },
  {
    title: "Siêu sao toán học",
    description: "Đạt 100% bài kiểm tra toán",
    type: "star" as const,
    earned: true,
    date: "10/12/2024",
  },
  {
    title: "Nhà thám hiểm",
    description: "Khám phá 10 chủ đề mới",
    type: "award" as const,
    earned: false,
  },
  {
    title: "Mục tiêu tuần",
    description: "Học 5 ngày liên tiếp",
    type: "target" as const,
    earned: true,
    date: "08/12/2024",
  },
];

const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          Chào mừng trở lại, Học sinh!
        </h1>
        <p className="text-muted-foreground">
          Hôm nay là một ngày tuyệt vời để học những điều mới. Hãy tiếp tục hành
          trình học tập của bạn!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Khóa học đang học
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">3</div>
            <p className="text-xs text-muted-foreground">+1 từ tuần trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Giờ học tuần này
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">12.5</div>
            <p className="text-xs text-muted-foreground">Mục tiêu: 15 giờ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Thành tích đạt được
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">8</div>
            <p className="text-xs text-muted-foreground">+2 tuần này</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ngày học liên tiếp
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">7</div>
            <p className="text-xs text-muted-foreground">Kỷ lục cá nhân!</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProgressCard title="Toán học cơ bản" progress={13} total={20} />
        <ProgressCard title="Tiếng Anh" progress={10} total={25} />
        <ProgressCard title="Khoa học thú vị" progress={8} total={15} />
      </div>

      {/* Recent Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Khóa học gần đây</h2>
          <Button variant="outline" size="sm">
            Xem tất cả
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Thành tích</h2>
          <Button variant="outline" size="sm">
            Xem tất cả
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <AchievementBadge key={index} {...achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
