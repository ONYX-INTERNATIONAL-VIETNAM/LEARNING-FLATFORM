import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  lastActive: string;
  status: "online" | "offline" | "away";
}

interface StudentListProps {
  students: Student[];
  title: string;
}

const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-yellow-500",
};

const StudentList = ({ students, title }: StudentListProps) => {
  return (
    <Card className="h-auto flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="space-y-3">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-3 rounded-lg border gap-4"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="relative flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-accent/20 text-accent">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                      statusColors[student.status]
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-shrink">
                  <p className="font-medium truncate">{student.name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {student.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <Badge
                    variant="secondary"
                    className="text-xs whitespace-nowrap"
                  >
                    {student.progress}% hoàn thành
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
                    {student.lastActive}
                  </p>
                </div>

                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="flex-shrink-0">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-shrink-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Xem hồ sơ</DropdownMenuItem>
                      <DropdownMenuItem>Gửi tin nhắn</DropdownMenuItem>
                      <DropdownMenuItem>Xem tiến độ</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentList;
