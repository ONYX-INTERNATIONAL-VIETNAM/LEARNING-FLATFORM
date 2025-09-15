import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, BookOpen, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface ClassCardProps {
  id: string;
  name: string;
  subject: string;
  students: number;
  schedule: string;
  nextClass: string;
  status: "active" | "upcoming" | "completed";
}

const statusColors = {
  active: "bg-green-100 text-green-800",
  upcoming: "bg-blue-100 text-blue-800",
  completed: "bg-gray-100 text-gray-800",
};

const statusLabels = {
  active: "Đang diễn ra",
  upcoming: "Sắp tới",
  completed: "Đã kết thúc",
};

const ClassCard = ({
  id,
  name,
  subject,
  students,
  schedule,
  nextClass,
  status,
}: ClassCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="text-sm text-muted-foreground">{subject}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={statusColors[status]}>
              {statusLabels[status]}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                <DropdownMenuItem>Xem báo cáo</DropdownMenuItem>
                <DropdownMenuItem>Gửi thông báo</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Xóa lớp
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            {students} học sinh
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {schedule}
          </div>
        </div>

        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium mb-1">Buổi học tiếp theo</p>
          <p className="text-sm text-muted-foreground">{nextClass}</p>
        </div>

        <div className="flex space-x-2">
          <Link href={`/teacher/classes/${id}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              <BookOpen className="h-4 w-4 mr-2" />
              Quản lý lớp
            </Button>
          </Link>
          <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
            Vào lớp học
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
