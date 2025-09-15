"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, FileText, Calendar, Users } from "lucide-react";

import type { Assignment } from "@/types";

interface AssignmentManagerProps {
  assignments: Assignment[];
  onCreateAssignment: (
    assignment: Omit<Assignment, "id" | "submissions">
  ) => void;
}

const typeColors = {
  homework: "bg-blue-100 text-blue-800",
  quiz: "bg-green-100 text-green-800",
  project: "bg-purple-100 text-purple-800",
  exam: "bg-red-100 text-red-800",
};

const typeLabels = {
  homework: "Bài tập",
  quiz: "Kiểm tra",
  project: "Dự án",
  exam: "Bài thi",
};

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  published: "bg-green-100 text-green-800",
};

const statusLabels = {
  draft: "Nháp",
  published: "Đã giao",
};

const AssignmentManager = ({
  assignments,
  onCreateAssignment,
}: AssignmentManagerProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    type: "homework" as Assignment["type"],
    status: "draft" as Assignment["status"],
    maxScore: 100,
    totalStudents: 25,
  });

  const handleCreateAssignment = () => {
    if (newAssignment.title && newAssignment.dueDate) {
      onCreateAssignment(newAssignment);
      setNewAssignment({
        title: "",
        description: "",
        dueDate: "",
        type: "homework",
        status: "draft",
        maxScore: 100,
        totalStudents: 25,
      });
      setIsCreateDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quản lý bài tập</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="h-4 w-4 mr-2" />
              Tạo bài tập mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tạo bài tập mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề bài tập</Label>
                <Input
                  id="title"
                  value={newAssignment.title}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      title: e.target.value,
                    })
                  }
                  placeholder="Nhập tiêu đề bài tập"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={newAssignment.description}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      description: e.target.value,
                    })
                  }
                  placeholder="Mô tả chi tiết bài tập"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Loại bài tập</Label>
                  <Select
                    value={newAssignment.type}
                    onValueChange={(value: Assignment["type"]) =>
                      setNewAssignment({ ...newAssignment, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homework">Bài tập</SelectItem>
                      <SelectItem value="quiz">Kiểm tra</SelectItem>
                      <SelectItem value="project">Dự án</SelectItem>
                      <SelectItem value="exam">Bài thi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Hạn nộp</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        dueDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button onClick={handleCreateAssignment}>Tạo bài tập</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map((assignment) => (
          <Card
            key={assignment.id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg line-clamp-2">
                    {assignment.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {assignment.description}
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <Badge className={statusColors[assignment.status]}>
                    {statusLabels[assignment.status]}
                  </Badge>
                  <Badge className={typeColors[assignment.type]}>
                    {typeLabels[assignment.type]}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(assignment.dueDate).toLocaleDateString("vi-VN")}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  {assignment.submissions}/{assignment.totalStudents}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tỷ lệ nộp bài</span>
                  <span className="font-medium">
                    {Math.round(
                      (assignment.submissions / assignment.totalStudents) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        (assignment.submissions / assignment.totalStudents) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Xem bài nộp
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Chỉnh sửa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssignmentManager;
