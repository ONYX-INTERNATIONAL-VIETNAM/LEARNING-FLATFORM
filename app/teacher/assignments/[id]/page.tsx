"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import GradeDialog from "../components/GradeDialog";
import { toast } from "sonner";

// Fake data demo
const fakeAssignments = [
  {
    id: "1",
    title: "Bài tập Toán 1",
    class: "Toán 3A",
    startDate: "2025-09-10",
    dueDate: "2025-09-17",
    submitted: 3,
    total: 20,
    status: "open" as const,
    description: "Giải 10 bài toán cộng trừ trong SGK.",
  },
];

// Fake submissions
const fakeSubmissions = [
  { id: 1, student: "Nguyễn Văn A", submittedAt: "2025-09-12", grade: 8 },
  { id: 2, student: "Trần Thị B", submittedAt: "2025-09-13", grade: null },
  { id: 3, student: "Lê Văn C", submittedAt: "2025-09-14", grade: 9 },
];

export default function AssignmentDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const assignment = fakeAssignments.find((a) => a.id === id);

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(assignment?.title || "");
  const [dueDate, setDueDate] = useState(assignment?.dueDate || "");
  const [description, setDescription] = useState(assignment?.description || "");

  // Submissions state
  const [submissions, setSubmissions] = useState(fakeSubmissions);

  // GradeDialog state
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{
    id: number;
    name: string;
    grade: number | null;
  } | null>(null);

  if (!assignment) {
    return <p className="p-6">Không tìm thấy bài tập</p>;
  }

  const handleSave = () => {
    console.log("Đã lưu:", { id, title, dueDate, description });
    setEditMode(false);
    toast.success("Đã lưu thay đổi bài tập!");
    // TODO: gọi API update assignment
  };

  const handleSubmitGrades = () => {
    console.log("Đã chấm điểm:", submissions);
    toast.success("Đã lưu điểm cho tất cả học sinh!");
    // TODO: gọi API lưu điểm
  };

  const exportToCSV = () => {
    const header = ["Học sinh", "Ngày nộp", "Điểm"];
    const rows = submissions.map((s) => [
      s.student,
      new Date(s.submittedAt).toLocaleDateString("vi-VN"),
      s.grade !== null ? s.grade : "",
    ]);

    let csvContent =
      header.join(",") +
      "\n" +
      rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cham-diem-baitap-${id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Đã xuất CSV thành công!");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header với nút Back */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.push("/teacher/assignments")}
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>

        {!editMode && (
          <Button onClick={() => setEditMode(true)}>Chỉnh sửa</Button>
        )}
      </div>

      {/* Thông tin Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {editMode ? "Chỉnh sửa bài tập" : assignment.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {editMode ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="title">Tên bài tập</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Hạn nộp</Label>
                <Input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSave}>Lưu thay đổi</Button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Lớp học</p>
                <p className="font-medium">{assignment.class}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ngày giao</p>
                <p className="font-medium">{assignment.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hạn nộp</p>
                <p className="font-medium">{assignment.dueDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nộp</p>
                <p className="font-medium">
                  {assignment.submitted}/{assignment.total}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trạng thái</p>
                <Badge variant="outline">{assignment.status}</Badge>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Mô tả</p>
                <p className="font-medium whitespace-pre-line">
                  {assignment.description}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bảng submissions */}
      <Card id="grading">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Danh sách học sinh nộp bài</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportToCSV}>
              Xuất CSV
            </Button>
            <Button size="sm" onClick={handleSubmitGrades}>
              Lưu tất cả điểm
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Học sinh</th>
                  <th className="px-4 py-2 text-left">Ngày nộp</th>
                  <th className="px-4 py-2 text-left">Điểm</th>
                  <th className="px-4 py-2 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-2">{s.student}</td>
                    <td className="px-4 py-2">
                      {new Date(s.submittedAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-2">{s.grade ?? "-"}</td>
                    <td className="px-4 py-2 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedStudent({
                            id: s.id,
                            name: s.student,
                            grade: s.grade,
                          });
                          setGradeDialogOpen(true);
                        }}
                      >
                        Chấm
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Grade Dialog */}
      {selectedStudent && (
        <GradeDialog
          open={gradeDialogOpen}
          onOpenChange={setGradeDialogOpen}
          student={selectedStudent.name}
          currentGrade={selectedStudent.grade}
          onSave={(grade) => {
            setSubmissions((prev) =>
              prev.map((p) =>
                p.id === selectedStudent.id ? { ...p, grade } : p
              )
            );
            console.log("Lưu điểm cho:", selectedStudent.name, grade);
          }}
        />
      )}
    </div>
  );
}
