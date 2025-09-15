"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Search, Filter } from "lucide-react";

import type { Assignment, StudentGrade } from "@/types";

interface GradeBookProps {
  students: StudentGrade[];
  assignments: Assignment[];
  onUpdateGrade: (
    studentId: string,
    assignmentId: string,
    grade: number
  ) => void;
}

const GradeBook = ({
  students,
  assignments,
  onUpdateGrade,
}: GradeBookProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState<string>("all");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGradeColor = (grade: number | null, maxScore: number) => {
    if (grade === null) return "text-muted-foreground";
    const percentage = (grade / maxScore) * 100;
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getAverageColor = (average: number) => {
    if (average >= 90) return "bg-green-100 text-green-800";
    if (average >= 80) return "bg-blue-100 text-blue-800";
    if (average >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Sổ điểm</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất Excel
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm học sinh..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={selectedAssignment}
          onValueChange={setSelectedAssignment}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Chọn bài tập" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả bài tập</SelectItem>
            {assignments.map((assignment) => (
              <SelectItem key={assignment.id} value={assignment.id}>
                {assignment.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grade Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bảng điểm chi tiết</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Học sinh</th>
                  {assignments.map((assignment) => (
                    <th
                      key={assignment.id}
                      className="text-center p-3 font-medium min-w-24"
                    >
                      <div className="space-y-1">
                        <div className="text-sm">{assignment.name}</div>
                        <div className="text-xs text-muted-foreground">
                          /{assignment.maxScore}
                        </div>
                      </div>
                    </th>
                  ))}
                  <th className="text-center p-3 font-medium">Trung bình</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
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
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    {assignments.map((assignment) => {
                      const grade = student.assignments[assignment.id];
                      return (
                        <td key={assignment.id} className="p-3 text-center">
                          <Input
                            type="number"
                            min="0"
                            max={assignment.maxScore}
                            value={grade || ""}
                            onChange={(e) => {
                              const newGrade = e.target.value
                                ? Number.parseFloat(e.target.value)
                                : null;
                              if (newGrade !== null) {
                                onUpdateGrade(
                                  student.id,
                                  assignment.id,
                                  newGrade
                                );
                              }
                            }}
                            className={`w-16 text-center ${getGradeColor(
                              grade,
                              assignment.maxScore
                            )}`}
                            placeholder="-"
                          />
                        </td>
                      );
                    })}
                    <td className="p-3 text-center">
                      <Badge className={getAverageColor(student.average)}>
                        {student.average.toFixed(1)}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Class Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {(
                students.reduce((sum, s) => sum + s.average, 0) /
                students.length
              ).toFixed(1)}
              %
            </div>
            <p className="text-sm text-muted-foreground">Điểm trung bình lớp</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {students.filter((s) => s.average >= 80).length}
            </div>
            <p className="text-sm text-muted-foreground">Học sinh giỏi</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {students.filter((s) => s.average >= 70 && s.average < 80).length}
            </div>
            <p className="text-sm text-muted-foreground">Học sinh khá</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {students.filter((s) => s.average < 70).length}
            </div>
            <p className="text-sm text-muted-foreground">Cần cải thiện</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GradeBook;
