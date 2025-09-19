"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    UserPlus,
    Eye,
    Users,
    Filter,
} from "lucide-react";
import Link from "next/link";
import { ConfirmDialog } from "@/components/common";
import Pagination from "@/components/common/Pagination";

// ====================== TYPES ======================
interface User {
    id: number;
    name: string;
    email: string;
    role: "Học sinh" | "Giáo viên" | "Admin";
    avatar?: string;
    status: "active" | "inactive";
    lastLogin: string;
}

// ====================== DATA ======================
// ====================== DATA ======================
const initialUsers: User[] = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        email: "vana@example.com",
        role: "Học sinh",
        status: "active",
        lastLogin: "2024-01-15",
    },
    {
        id: 2,
        name: "Trần Thị B",
        email: "thib@example.com",
        role: "Giáo viên",
        status: "active",
        lastLogin: "2024-01-16",
    },
    {
        id: 3,
        name: "Lê Văn C",
        email: "vanc@example.com",
        role: "Admin",
        status: "inactive",
        lastLogin: "2024-01-10",
    },
    {
        id: 4,
        name: "Hoàng Thị D",
        email: "duyenh@example.com",
        role: "Học sinh",
        status: "active",
        lastLogin: "2024-01-14",
    },
    {
        id: 5,
        name: "Phạm Minh E",
        email: "minhe@example.com",
        role: "Giáo viên",
        status: "active",
        lastLogin: "2024-01-12",
    },
    {
        id: 6,
        name: "Vũ Thị F",
        email: "fvu@example.com",
        role: "Học sinh",
        status: "inactive",
        lastLogin: "2024-01-08",
    },
    {
        id: 7,
        name: "Đặng Văn G",
        email: "gvdang@example.com",
        role: "Học sinh",
        status: "active",
        lastLogin: "2024-01-11",
    },
    {
        id: 8,
        name: "Ngô Thị H",
        email: "hngo@example.com",
        role: "Giáo viên",
        status: "inactive",
        lastLogin: "2024-01-09",
    },
    {
        id: 9,
        name: "Bùi Văn I",
        email: "ibuivn@example.com",
        role: "Học sinh",
        status: "active",
        lastLogin: "2024-01-16",
    },
    {
        id: 10,
        name: "Đỗ Thị K",
        email: "kdothi@example.com",
        role: "Admin",
        status: "active",
        lastLogin: "2024-01-15",
    },
    {
        id: 11,
        name: "Nguyễn Văn L",
        email: "lnv@example.com",
        role: "Giáo viên",
        status: "active",
        lastLogin: "2024-01-13",
    },
    {
        id: 12,
        name: "Trần Thị M",
        email: "mtran@example.com",
        role: "Học sinh",
        status: "inactive",
        lastLogin: "2024-01-07",
    },
    {
        id: 13,
        name: "Phan Văn N",
        email: "nphan@example.com",
        role: "Học sinh",
        status: "active",
        lastLogin: "2024-01-12",
    },
    {
        id: 14,
        name: "Vũ Thị O",
        email: "ovu@example.com",
        role: "Giáo viên",
        status: "active",
        lastLogin: "2024-01-14",
    },
    {
        id: 15,
        name: "Hoàng Văn P",
        email: "phoang@example.com",
        role: "Admin",
        status: "inactive",
        lastLogin: "2024-01-05",
    },
];


const roleColors: Record<User["role"], string> = {
    "Học sinh": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "Giáo viên": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Admin: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

const statusColors: Record<User["status"], string> = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

// ====================== MAIN PAGE ======================
export default function UsersPage() {
    const [users] = useState<User[]>(initialUsers);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("Tất cả");
    const [statusFilter, setStatusFilter] = useState("Tất cả");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    // Lọc dữ liệu
    const filteredUsers = users.filter((u) => {
        const matchSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === "Tất cả" || u.role === roleFilter;
        const matchStatus = statusFilter === "Tất cả" || u.status === statusFilter;
        return matchSearch && matchRole && matchStatus;
    });

    // Phân trang
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const getInitials = (name: string) =>
        name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <Users className="h-8 w-8" />
                            Quản lý Người dùng
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Quản lý thông tin và quyền hạn của tất cả người dùng trong hệ thống
                        </p>
                    </div>
                    <Link href="/admin/users/create">
                        <Button>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Thêm người dùng
                        </Button>
                    </Link>
                </div>

                {/* Bộ lọc */}
                <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                                Danh sách người dùng ({filteredUsers.length})
                            </CardTitle>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Tìm kiếm theo tên hoặc email..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="pl-10 sm:w-64 border-gray-300 dark:border-gray-600"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <Select
                                        value={roleFilter}
                                        onValueChange={(v) => {
                                            setRoleFilter(v);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <SelectTrigger className="sm:w-40 border-gray-300 dark:border-gray-600">
                                            <Filter className="h-4 w-4 mr-1" />
                                            <SelectValue placeholder="Vai trò" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Tất cả">Tất cả vai trò</SelectItem>
                                            <SelectItem value="Học sinh">Học sinh</SelectItem>
                                            <SelectItem value="Giáo viên">Giáo viên</SelectItem>
                                            <SelectItem value="Admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        value={statusFilter}
                                        onValueChange={(v) => {
                                            setStatusFilter(v);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <SelectTrigger className="sm:w-40 border-gray-300 dark:border-gray-600">
                                            <SelectValue placeholder="Trạng thái" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Tất cả">Tất cả</SelectItem>
                                            <SelectItem value="active">Hoạt động</SelectItem>
                                            <SelectItem value="inactive">Không hoạt động</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    {/* Bảng */}
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-slate-700">
                                    <tr>
                                        {[
                                            "Avatar",
                                            "Thông tin",
                                            "Vai trò",
                                            "Trạng thái",
                                            "Đăng nhập cuối",
                                            "Hành động",
                                        ].map((h) => (
                                            <th
                                                key={h}
                                                className={`px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase ${h === "Hành động" ? "text-right" : ""
                                                    }`}
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {paginatedUsers.length > 0 ? (
                                        paginatedUsers.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-gray-50 dark:hover:bg-slate-700"
                                            >
                                                <td className="px-6 py-4">
                                                    <Avatar className="h-10 w-10">
                                                        {user.avatar ? (
                                                            <AvatarImage src={user.avatar} alt={user.name} />
                                                        ) : (
                                                            <AvatarFallback className="bg-gray-200 text-gray-700 font-medium">
                                                                {getInitials(user.name)}
                                                            </AvatarFallback>
                                                        )}
                                                    </Avatar>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="font-medium">{user.name}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge className={`${roleColors[user.role]} border-0`}>
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        className={`${statusColors[user.status]} border-0`}
                                                    >
                                                        {user.status === "active"
                                                            ? "Hoạt động"
                                                            : "Không hoạt động"}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    {new Date(user.lastLogin).toLocaleDateString("vi-VN")}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={`/admin/users/${user.id}`}>
                                                            <ActionButton icon={<Eye className="h-4 w-4" />} />
                                                        </Link>
                                                        {/* Dropdown menu cho More actions */}
                                                        <ConfirmDialog
                                                            title="Xóa người dùng"
                                                            description={`Bạn có chắc chắn muốn xóa ${user.name}? Hành động này không thể hoàn tác.`}
                                                            onConfirm={() => {
                                                                console.log("Đã xóa user:", user.id);
                                                                // TODO: gọi API xóa user
                                                            }}
                                                            triggerVariant="ghost"
                                                            triggerLabel="" // chỉ hiện icon
                                                        />

                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center">
                                                <Users className="h-12 w-12 mb-4 opacity-50 mx-auto" />
                                                <p className="text-lg">Không tìm thấy người dùng nào</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                page={currentPage}
                                total={filteredUsers.length}
                                pageSize={pageSize}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Action Button
const ActionButton = ({
    icon,
    color = "blue",
}: {
    icon: React.ReactNode;
    color?: "blue" | "green" | "gray";
}) => {
    const colorMap = {
        blue: "hover:bg-blue-50 hover:text-blue-600",
        green: "hover:bg-green-50 hover:text-green-600",
        gray: "hover:bg-gray-50 hover:text-gray-600",
    };
    return (
        <Button
            size="sm"
            variant="ghost"
            className={`h-8 w-8 p-0 ${colorMap[color]}`}
        >
            {icon}
        </Button>
    );
};
