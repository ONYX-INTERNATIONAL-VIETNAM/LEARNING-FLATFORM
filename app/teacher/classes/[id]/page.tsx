"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendanceTracker, AssignmentManager, GradeBook, StudentList } from "@/components/features";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  BookOpen,
  TrendingUp,
  MessageCircle,
  Settings,
} from "lucide-react";
import type {
  Assignment,
  Student,
  Status,
  GradeData,
  AssignmentType,
  AssignmentStatus,
} from "@/types";
const classData = {
  id: "1",
  name: "Toán học lớp 3A",
  subject: "Toán học",
  grade: "Lớp 3",
  schedule: "Thứ 2, 4, 6 - 8:00-9:30",
  room: "Phòng A101",
  students: 25,
  description:
    "Lớp học toán cơ bản dành cho học sinh lớp 3, tập trung vào các phép tính cơ bản và tư duy logic.",
};

const studentsData = [
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

const attendanceData = [
  { id: "1", name: "Nguyễn Văn An", status: "present" as const },
  { id: "2", name: "Trần Thị Bình", status: "present" as const },
  { id: "3", name: "Lê Minh Cường", status: "late" as const },
  { id: "4", name: "Phạm Thị Dung", status: "absent" as const },
  { id: "5", name: "Hoàng Văn Em", status: "present" as const },
];

const assignmentsData = [
  {
    id: "1",
    title: "Bài tập phép cộng",
    description: "Thực hành các phép cộng trong phạm vi 100",
    dueDate: "2024-12-20",
    type: "homework" as const,
    status: "published" as const,
    submissions: 18,
    totalStudents: 25,
  },
  {
    id: "2",
    title: "Kiểm tra giữa kỳ",
    description: "Kiểm tra kiến thức toán học đã học",
    dueDate: "2024-12-25",
    type: "quiz" as const,
    status: "draft" as const,
    submissions: 0,
    totalStudents: 25,
  },
];

const gradeData = {
  students: [
    {
      id: "1",
      name: "Nguyễn Văn An",
      email: "an.nguyen@student.onyx.edu",
      assignments: { "1": 85, "2": 90 },
      average: 87.5,
    },
    {
      id: "2",
      name: "Trần Thị Bình",
      email: "binh.tran@student.onyx.edu",
      assignments: { "1": 95, "2": 88 },
      average: 91.5,
    },
    {
      id: "3",
      name: "Lê Minh Cường",
      email: "cuong.le@student.onyx.edu",
      assignments: { "1": 75, "2": null },
      average: 75,
    },
  ],
  assignments: [
    { id: "1", name: "Bài tập 1", maxScore: 100, type: "homework" as const },
    { id: "2", name: "Kiểm tra", maxScore: 100, type: "quiz" as const },
  ],
};

// Convert mock data to match types
const typedAttendanceStudents: Student[] = attendanceData.map((student) => ({
  ...student,
  status: student.status as Status,
}));

const typedAssignments: Assignment[] = assignmentsData.map((assignment) => ({
  ...assignment,
  maxScore: 100,
  title: assignment.title,
  description: assignment.description || "",
  type: assignment.type as AssignmentType,
  status: assignment.status as AssignmentStatus,
}));

export default function ClassDetailPage() {
  const [attendanceStudents, setAttendanceStudents] = useState<Student[]>(
    typedAttendanceStudents
  );
  const [assignments, setAssignments] =
    useState<Assignment[]>(typedAssignments);
  const [grades, setGrades] = useState<GradeData>({
    students: gradeData.students,
    assignments: gradeData.assignments.map((a) => ({
      ...a,
      title: a.name || "",
      description: "",
      dueDate: new Date().toISOString().split("T")[0],
      type: a.type as AssignmentType,
      status: "published" as AssignmentStatus,
      submissions: 0,
      totalStudents: classData.students,
    })),
  });

  const handleUpdateAttendance = (studentId: string, status: Status) => {
    setAttendanceStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const handleCreateAssignment = (
    newAssignment: Omit<Assignment, "id" | "submissions">
  ) => {
    const assignment: Assignment = {
      ...newAssignment,
      id: Date.now().toString(),
      submissions: 0,
    };
    setAssignments((prev) => [...prev, assignment]);
  };

  const handleUpdateGrade = (
    studentId: string,
    assignmentId: string,
    grade: number
  ) => {
    setGrades((prev) => ({
      ...prev,
      students: prev.students.map((student) =>
        student.id === studentId
          ? {
              ...student,
              assignments: { ...student.assignments, [assignmentId]: grade },
              average:
                Object.values({ ...student.assignments, [assignmentId]: grade })
                  .filter((g: number | null): g is number => g !== null)
                  .reduce((sum: number, g: number) => sum + g, 0) /
                Object.values({
                  ...student.assignments,
                  [assignmentId]: grade,
                }).filter((g) => g !== null).length,
            }
          : student
      ),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Class Header */}
      <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{classData.name}</h1>
              <p className="text-lg text-muted-foreground">
                {classData.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Badge variant="secondary">{classData.subject}</Badge>
              <Badge variant="secondary">{classData.grade}</Badge>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                {classData.schedule}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                {classData.students} học sinh
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Cài đặt lớp
            </Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <MessageCircle className="h-4 w-4 mr-2" />
              Gửi thông báo
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng học sinh</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {classData.students}
            </div>
            <p className="text-xs text-muted-foreground">Đang hoạt động</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bài tập đã giao
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {assignments.length}
            </div>
            <p className="text-xs text-muted-foreground">Tuần này</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Điểm trung bình
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {(
                grades.students.reduce((sum, s) => sum + s.average, 0) /
                grades.students.length
              ).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Điểm</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ có mặt</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {Math.round(
                (attendanceStudents.filter((s) => s.status === "present")
                  .length /
                  attendanceStudents.length) *
                  100
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Hôm nay</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="students">Học sinh</TabsTrigger>
          <TabsTrigger value="attendance">Điểm danh</TabsTrigger>
          <TabsTrigger value="assignments">Bài tập</TabsTrigger>
          <TabsTrigger value="grades">Sổ điểm</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StudentList
              students={studentsData}
              title="Học sinh hoạt động gần đây"
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">Bài tập phép cộng</p>
                      <p className="text-sm text-muted-foreground">
                        18/25 học sinh đã nộp
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Hoàn thành
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">Điểm danh hôm nay</p>
                      <p className="text-sm text-muted-foreground">
                        22/25 học sinh có mặt
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      Đã cập nhật
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students">
          <StudentList students={studentsData} title="Danh sách học sinh" />
        </TabsContent>

        <TabsContent value="attendance">
          <AttendanceTracker
            students={attendanceStudents}
            date={new Date().toLocaleDateString("vi-VN")}
            onUpdateAttendance={handleUpdateAttendance}
          />
        </TabsContent>

        <TabsContent value="assignments">
          <AssignmentManager
            assignments={assignments}
            onCreateAssignment={handleCreateAssignment}
          />
        </TabsContent>

        <TabsContent value="grades">
          <GradeBook
            students={grades.students}
            assignments={grades.assignments}
            onUpdateGrade={handleUpdateGrade}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
