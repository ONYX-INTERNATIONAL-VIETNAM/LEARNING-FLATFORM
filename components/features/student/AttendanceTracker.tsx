"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Clock, Calendar } from "lucide-react";

interface Student {
  id: string;
  name: string;
  status: "present" | "absent" | "late" | "excused";
}

interface AttendanceTrackerProps {
  students: Student[];
  date: string;
  onUpdateAttendance: (studentId: string, status: Student["status"]) => void;
}

const statusColors = {
  present: "bg-green-100 text-green-800",
  absent: "bg-red-100 text-red-800",
  late: "bg-yellow-100 text-yellow-800",
  excused: "bg-blue-100 text-blue-800",
};

const statusLabels = {
  present: "Có mặt",
  absent: "Vắng mặt",
  late: "Muộn",
  excused: "Có phép",
};

const statusIcons = {
  present: CheckCircle,
  absent: XCircle,
  late: Clock,
  excused: Calendar,
};

const AttendanceTracker = ({
  students,
  date,
  onUpdateAttendance,
}: AttendanceTrackerProps) => {


  const handleStatusChange = (studentId: string, status: Student["status"]) => {
    onUpdateAttendance(studentId, status);
  };

  const getAttendanceStats = () => {
    const stats = students.reduce(
      (acc, student) => {
        acc[student.status]++;
        return acc;
      },
      { present: 0, absent: 0, late: 0, excused: 0 }
    );
    return stats;
  };

  const stats = getAttendanceStats();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Điểm danh - {date}</CardTitle>
          <div className="flex space-x-2">
            <Badge variant="secondary">{students.length} học sinh</Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {Object.entries(stats).map(([status, count]) => {
            const Icon = statusIcons[status as keyof typeof statusIcons];
            return (
              <div
                key={status}
                className="text-center p-2 rounded-lg bg-muted/50"
              >
                <Icon className="h-4 w-4 mx-auto mb-1" />
                <div className="text-sm font-medium">{count}</div>
                <div className="text-xs text-muted-foreground">
                  {statusLabels[status as keyof typeof statusLabels]}
                </div>
              </div>
            );
          })}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-accent/20 text-accent text-xs">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{student.name}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Badge className={statusColors[student.status]}>
                  {statusLabels[student.status]}
                </Badge>

                <div className="flex space-x-1">
                  {(["present", "absent", "late", "excused"] as const).map(
                    (status) => {
                      const Icon = statusIcons[status];
                      return (
                        <Button
                          key={status}
                          variant={
                            student.status === status ? "default" : "outline"
                          }
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => handleStatusChange(student.id, status)}
                        >
                          <Icon className="h-3 w-3" />
                        </Button>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            Lưu điểm danh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceTracker;
