"use client";

import { useState } from "react";
import {
    Plus,
    Eye,
    BookOpen,
    FileText,
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { ConfirmDialog } from "@/components/common";
import Pagination from "@/components/common/Pagination";

type Product = {
    id: string;
    name: string;
    type: "Course" | "Document";
    price?: number;
    status: "draft" | "published";
    createdAt: string;
    author: string;
    thumbnail?: string;
};

// fake 30 sản phẩm
const MOCK_PRODUCTS: Product[] = Array.from({ length: 30 }).map((_, i) => ({
    id: `${i + 1}`,
    name: `Sample Product ${i + 1}`,
    type: i % 2 === 0 ? "Course" : "Document",
    price: i % 3 === 0 ? undefined : (i + 1) * 10000,
    status: i % 4 === 0 ? "draft" : "published",
    createdAt: "2025-09-12",
    author: i % 2 === 0 ? "Alice Teacher" : "Bob Teacher",
    thumbnail: "/images/avatar.jpg",
}));

export default function ProductListPage() {
    const [products] = useState(MOCK_PRODUCTS);

    // state phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const paginatedProducts = products.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <TooltipProvider>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Quản lý sản phẩm
                    </h1>
                    <Link href="/admin/products/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
                        </Button>
                    </Link>
                </div>

                {/* Filter bar */}
                <div className="flex flex-wrap gap-3 items-center">
                    <Input placeholder="Search product..." className="max-w-2xl bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm" />
                    <Select>
                        <SelectTrigger className="w-[230px] bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                            <SelectValue placeholder="Loại" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="Course">Khóa học</SelectItem>
                            <SelectItem value="Document">Tài liệu</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-[230px] bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                            <SelectValue placeholder="Trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="published">Đã xuất bản</SelectItem>
                            <SelectItem value="draft">Nháp</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Product table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Tất cả sản phẩm</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Hình ảnh</TableHead>
                                    <TableHead>Tên</TableHead>
                                    <TableHead>Loại</TableHead>
                                    <TableHead>Giá</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                    <TableHead>Người tạo</TableHead>
                                    <TableHead>Ngày tạo</TableHead>
                                    <TableHead className="text-right">Hành động</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedProducts.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell>
                                            {p.thumbnail ? (
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={p.thumbnail}
                                                    alt={p.name}
                                                    className="w-14 h-14 rounded-md object-cover border"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 flex items-center justify-center rounded-md bg-muted text-gray-500">
                                                    {p.type === "Course" ? (
                                                        <BookOpen className="h-5 w-5" />
                                                    ) : (
                                                        <FileText className="h-5 w-5" />
                                                    )}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{p.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{p.type}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {p.price !== undefined ? (
                                                <span className="font-semibold text-gray-700">
                                                    {p.price.toLocaleString()}₫
                                                </span>
                                            ) : (
                                                <Badge>Free</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {p.status === "published" ? (
                                                <Badge className="bg-green-600">Published</Badge>
                                            ) : (
                                                <Badge variant="outline">Draft</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{p.author}</TableCell>
                                        <TableCell>{p.createdAt}</TableCell>
                                        <TableCell className="flex justify-end gap-2">
                                            {/* View */}
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link href={`/admin/products/${p.id}`}>
                                                        <Button size="sm" variant="ghost">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>Xem</TooltipContent>
                                            </Tooltip>

                                            {/* Delete */}
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <ConfirmDialog
                                                        title="Xóa sản phẩm"
                                                        description="Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác."
                                                        triggerVariant="ghost"
                                                        triggerLabel="" // chỉ hiện icon
                                                        onConfirm={() => {
                                                            // TODO: gọi API xoá ở đây
                                                        }}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent>Xóa</TooltipContent>
                                            </Tooltip>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <Pagination
                            page={currentPage}
                            total={products.length}
                            pageSize={pageSize}
                            onPageChange={setCurrentPage}
                        />
                    </CardContent>
                </Card>
            </div>
        </TooltipProvider>
    );
}
