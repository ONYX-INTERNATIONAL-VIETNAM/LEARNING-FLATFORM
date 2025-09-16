"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    BookOpen,
    Users,
    CheckCircle,
    Edit,
    Trash2,
    Save,
    X,
} from "lucide-react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Fake data
const initialCourse = {
    id: "MATH101",
    title: "Toán học cơ bản lớp 1",
    category: "Toán học",
    teacher: "Trần Thị Bình",
    students: 45,
    status: "active", // "active" | "draft" | "inactive"
    created: "2024-01-15",
    description:
        "Khóa học giúp học sinh lớp 1 nắm vững các kiến thức toán học cơ bản: cộng, trừ, nhân, chia, hình học cơ bản và giải toán thực tế.",
    stats: {
        lessons: 25,
        completed: 18,
        progress: 72,
    },
};

const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
    inactive: "bg-gray-100 text-gray-800",
};

const categories = ["Toán học", "Khoa học", "Ngôn ngữ", "Lập trình"];

const teachers = [
    "Trần Thị Bình",
    "Nguyễn Văn Cường",
    "Lê Thị Dung",
    "Phạm Văn An",
    "Hoàng Thị Mai",
  ];

export default function CourseDetailPage() {
    const [course, setCourse] = useState(initialCourse);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        console.log("Đã lưu:", course);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                    {isEditing ? (
                        <Input
                            value={course.title}
                            onChange={(e) => setCourse({ ...course, title: e.target.value })}
                            className="text-3xl font-bold bg-white border border-gray-300 text-gray-900 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             rounded-md shadow-sm"
                        />
                    ) : (
                        <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                    )}

                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <Button
                                    onClick={handleSave}
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Lưu
                                </Button>
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    <X className="h-4 w-4 mr-2" />
                                    Hủy
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" onClick={() => setIsEditing(true)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Chỉnh sửa
                                </Button>
                                <ConfirmDialog
                                    title="Xóa khóa học"
                                    description={`Bạn có chắc chắn muốn xóa khóa học "${course.title}"?`}
                                    onConfirm={() => console.log("Đã xóa:", course.id)}
                                    triggerLabel="Xóa"
                                    triggerVariant="destructive"
                                />
                            </>
                        )}
                    </div>
                </div>

                {/* Thông tin tổng quan */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Thông tin khóa học</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs text-gray-500">Mã khóa học</p>
                            {isEditing ? (
                                <Input
                                    value={course.id}
                                    onChange={(e) => setCourse({ ...course, id: e.target.value })}
                                    className="font-medium bg-white border border-gray-300 text-gray-900 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             rounded-md shadow-sm"
                                />
                            ) : (
                                <div className="px-3 py-2 border rounded-md bg-gray-50 text-sm font-mono text-gray-700 inline-block">
                                    {course.id}
                                </div>
                            )}
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">Danh mục</p>
                            {isEditing ? (
                                <Select
                                    value={course.category}
                                    onValueChange={(v) => setCourse({ ...course, category: v })}
                                >
                                    <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm">
                                        <SelectValue placeholder="Chọn danh mục" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p className="font-medium">{course.category}</p>
                            )}
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">Giáo viên phụ trách</p>
                            {isEditing ? (
                                <Select
                                    value={course.teacher}
                                    onValueChange={(v) => setCourse({ ...course, teacher: v })}
                                >
                                    <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm">
                                        <SelectValue placeholder="Chọn giáo viên" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teachers.map((t) => (
                                            <SelectItem key={t} value={t}>
                                                {t}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p className="font-medium">{course.teacher}</p>
                            )}
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">Ngày tạo</p>
                            <p className="font-medium">
                                {new Date(course.created).toLocaleDateString("vi-VN")}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">Trạng thái</p>
                            {isEditing ? (
                                <Select
                                    value={course.status}
                                    onValueChange={(v) => setCourse({ ...course, status: v })}
                                >
                                    <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm">
                                        <SelectValue placeholder="Chọn trạng thái" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Hoạt động</SelectItem>
                                        <SelectItem value="draft">Nháp</SelectItem>
                                        <SelectItem value="inactive">Ngưng hoạt động</SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Badge className={`${statusColors[course.status]} border-0`}>
                                    {course.status === "active"
                                        ? "Hoạt động"
                                        : course.status === "draft"
                                            ? "Nháp"
                                            : "Ngưng hoạt động"}
                                </Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            <CardTitle className="text-sm font-medium">Học sinh</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-blue-600">{course.students}</p>
                            <p className="text-xs text-gray-500">Đang tham gia</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-purple-600" />
                            <CardTitle className="text-sm font-medium">Bài học</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-purple-600">
                                {course.stats.lessons}
                            </p>
                            <p className="text-xs text-gray-500">Tổng số bài học</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <CardTitle className="text-sm font-medium">Tiến độ</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-green-600">
                                {course.stats.progress}%
                            </p>
                            <p className="text-xs text-gray-500">
                                {course.stats.completed}/{course.stats.lessons} bài học
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Mô tả */}
                <Card>
                    <CardHeader>
                        <CardTitle>Mô tả khóa học</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isEditing ? (
                            <Textarea
                                value={course.description}
                                onChange={(e) =>
                                    setCourse({ ...course, description: e.target.value })
                                }
                                rows={5}
                            />
                        ) : (
                            <p className="text-sm text-gray-700">{course.description}</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
