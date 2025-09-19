import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentList } from "@/components";
import { ClassCard } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Clock,
  MessageCircle,
} from "lucide-react";

const recentClasses = [
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
];

const recentStudents = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    email: "an.nguyen@student.onyx.edu",
    progress: 85,
    lastActive: "2 phút trước",
    status: "online" as const,
  },
  {
    id: "2",
    name: "Trần Thị Bình",
    email: "binh.tran@student.onyx.edu",
    progress: 92,
    lastActive: "15 phút trước",
    status: "away" as const,
  },
  {
    id: "3",
    name: "Lê Minh Cường",
    email: "cuong.le@student.onyx.edu",
    progress: 78,
    lastActive: "1 giờ trước",
    status: "offline" as const,
  },
];

const TeacherDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          Chào mừng trở lại, Giáo viên!
        </h1>
        <p className="text-muted-foreground">
          Hôm nay bạn có 3 lớp học và 15 bài tập cần chấm. Hãy bắt đầu ngày làm
          việc hiệu quả!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng học sinh</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">63</div>
            <p className="text-xs text-muted-foreground">+5 từ tuần trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lớp học đang dạy
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">5</div>
            <p className="text-xs text-muted-foreground">2 lớp hôm nay</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Giờ dạy tuần này
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">18</div>
            <p className="text-xs text-muted-foreground">Mục tiêu: 20 giờ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tỷ lệ hoàn thành
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">87%</div>
            <p className="text-xs text-muted-foreground">+12% từ tháng trước</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes Section */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Lớp học gần đây</h2>
              <Button variant="outline" size="sm">
                Xem tất cả
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentClasses.slice(0, 2).map((classItem) => (
                <ClassCard key={classItem.id} {...classItem} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hành động nhanh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  className="h-20 flex-col bg-transparent"
                >
                  <BookOpen className="h-6 w-6 mb-2" />
                  <span className="text-xs">Tạo khóa học</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col bg-transparent"
                >
                  <Users className="h-6 w-6 mb-2" />
                  <span className="text-xs">Thêm lớp học</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col bg-transparent"
                >
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-xs">Lên lịch</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col bg-transparent"
                >
                  <MessageCircle className="h-6 w-6 mb-2" />
                  <span className="text-xs">Gửi thông báo</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Section */}
        <div className="space-y-6">
          <StudentList
            students={recentStudents}
            title="Học sinh hoạt động gần đây"
          />

          {/* Upcoming Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lịch hôm nay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10">
                  <div>
                    <p className="font-medium">Toán học lớp 3A</p>
                    <p className="text-sm text-muted-foreground">8:00 - 9:30</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Sắp tới</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">Tiếng Anh lớp 4B</p>
                    <p className="text-sm text-muted-foreground">
                      10:00 - 11:30
                    </p>
                  </div>
                  <Badge variant="secondary">Chờ</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">Khoa học lớp 5C</p>
                    <p className="text-sm text-muted-foreground">
                      14:00 - 15:30
                    </p>
                  </div>
                  <Badge variant="secondary">Chờ</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
