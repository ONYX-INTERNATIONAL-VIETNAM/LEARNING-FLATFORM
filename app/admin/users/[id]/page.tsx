"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Mail,
    Shield,
    Activity,
    BookOpen,
    Trophy,
    Clock,
    Pencil,
    KeyRound,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ================= Schema =================
const userSchema = z.object({
    name: z.string().min(3, "Tên phải có ít nhất 3 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    role: z.enum(["Học sinh", "Giáo viên", "Admin"]),
    status: z.enum(["active", "inactive"]),
});

type UserFormData = z.infer<typeof userSchema>;

// ================= Fake Data =================
const initialUser = {
    id: 1,
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    role: "Học sinh",
    status: "active",
    avatar: "",
    lastLogin: "2024-01-15",
    joinedDate: "2023-09-01",
    stats: {
        courses: 8,
        achievements: 12,
        hours: 245,
    },
};

const roleColors: Record<string, string> = {
    "Học sinh": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "Giáo viên": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Admin: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

// ================= Component =================
export default function UserDetailPage() {
    const [user, setUser] = useState(initialUser);
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            role: user.role as UserFormData["role"],
            status: user.status as UserFormData["status"],
        },
    });

    const getInitials = (name: string) =>
        name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

    const handleSave = (data: UserFormData) => {
        setUser({ ...user, ...data });
        setIsEditing(false);
        console.log("Updated user:", data);
    };

    const handleDelete = () => {
        console.log("Xóa user:", user.id);
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Chi tiết người dùng
                    </h1>
                    <div className="flex gap-2">
                        {!isEditing ? (
                            <Button variant="outline" onClick={() => setIsEditing(true)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Chỉnh sửa
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="default"
                                    onClick={form.handleSubmit(handleSave)}
                                >
                                    Lưu
                                </Button>
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    Hủy
                                </Button>
                            </>
                        )}
                        <ConfirmDialog
                            title="Xóa tài khoản"
                            description={`Bạn có chắc chắn muốn xóa "${user.name}"?`}
                            onConfirm={handleDelete}
                            triggerLabel="Xóa tài khoản"
                            triggerVariant="destructive"
                        />
                    </div>
                </div>

                {/* Thông tin cơ bản */}
                <Card className="shadow-lg">
                    <CardHeader className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            {user.avatar ? (
                                <AvatarImage src={user.avatar} />
                            ) : (
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <div className="w-full space-y-2">
                            {!isEditing ? (
                                <>
                                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <Mail className="h-4 w-4" /> {user.email}
                                    </p>
                                    <div className="flex gap-2 mt-2">
                                        <Badge className={`${roleColors[user.role]} border-0`}>
                                            <Shield className="h-3 w-3 mr-1" /> {user.role}
                                        </Badge>
                                        <Badge className={`${statusColors[user.status]} border-0`}>
                                            <Activity className="h-3 w-3 mr-1" />
                                            {user.status === "active"
                                                ? "Hoạt động"
                                                : "Không hoạt động"}
                                        </Badge>
                                    </div>
                                </>
                            ) : (
                                <form className="space-y-3">
                                    <div className="flex gap-2">
                                        <Input placeholder="Tên" {...form.register("name")} className="w-1/2 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"/>
                                        <Input placeholder="Email" {...form.register("email")} className="w-1/2 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"/>
                                    </div>

                                    <div className="flex gap-2">
                                        <Select
                                            onValueChange={(v) =>
                                                form.setValue("role", v as UserFormData["role"])
                                            }
                                            defaultValue={user.role}
                                        >
                                            <SelectTrigger className="w-1/2 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                                                <SelectValue placeholder="Vai trò" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Học sinh">Học sinh</SelectItem>
                                                <SelectItem value="Giáo viên">Giáo viên</SelectItem>
                                                <SelectItem value="Admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Select
                                            onValueChange={(v) =>
                                                form.setValue("status", v as UserFormData["status"])
                                            }
                                            defaultValue={user.status}
                                        >
                                            <SelectTrigger className="w-1/2 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                                                <SelectValue placeholder="Trạng thái" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Hoạt động</SelectItem>
                                                <SelectItem value="inactive">Không hoạt động</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </form>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-gray-500">Mã người dùng</p>
                            <p className="font-medium">#{user.id}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Ngày tham gia</p>
                            <p className="font-medium">
                                {new Date(user.joinedDate).toLocaleDateString("vi-VN")}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Đăng nhập cuối</p>
                            <p className="font-medium">
                                {new Date(user.lastLogin).toLocaleDateString("vi-VN")}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Thống kê */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="shadow-md">
                        <CardHeader className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                            <CardTitle className="text-sm font-medium">Khóa học</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-blue-600">
                                {user.stats.courses}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardHeader className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-yellow-600" />
                            <CardTitle className="text-sm font-medium">Huy hiệu</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-yellow-600">
                                {user.stats.achievements}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardHeader className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-green-600" />
                            <CardTitle className="text-sm font-medium">Giờ học</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-green-600">
                                {user.stats.hours}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
