"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Trophy, Clock } from "lucide-react";

// Fake data
const student = {
  id: "S12345",
  name: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  avatar: "/avatar.jpg",
  class: "10A1",
  role: "Học sinh",
  joinedDate: "01/09/2024",
  status: "Hoạt động",
  stats: {
    courses: 5,
    achievements: 8,
    hours: 120,
  },
};

export default function StudentProfilePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Thông tin cơ bản */}
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            {student.avatar ? (
              <AvatarImage src={student.avatar} />
            ) : (
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{student.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{student.email}</p>
            <Badge variant="secondary" className="mt-2">
              {student.role}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Mã học sinh</p>
            <p className="font-medium">{student.id}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Lớp</p>
            <p className="font-medium">{student.class}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Ngày tham gia</p>
            <p className="font-medium">{student.joinedDate}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Trạng thái</p>
            <Badge
              className={
                student.status === "Hoạt động"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            >
              {student.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Khoá học</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-accent">{student.stats.courses}</p>
            <p className="text-xs text-muted-foreground">Đã tham gia</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Huy hiệu</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-accent">{student.stats.achievements}</p>
            <p className="text-xs text-muted-foreground">Đã đạt được</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Giờ học</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-accent">{student.stats.hours}</p>
            <p className="text-xs text-muted-foreground">Tích luỹ</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
