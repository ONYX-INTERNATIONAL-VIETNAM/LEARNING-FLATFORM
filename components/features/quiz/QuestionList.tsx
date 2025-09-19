"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Copy,
  Eye,
  Download,
  Upload,
  Plus,
  HelpCircle,
  CheckCircle,
  FileText,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { ConfirmDialog } from "@/components/common";
import Link from "next/link";

// ====================== FAKE DATA ======================
const questions: Question[] = [
  {
    id: "1",
    title: "Phép cộng cơ bản",
    content: "2 + 3 = ?",
    type: "multiple-choice",
    category: "Toán học",
    difficulty: "easy",
    points: 1,
    tags: ["cộng", "số học"],
    created: "2024-01-15",
    used: 15,
  },
  {
    id: "2",
    title: "Trái đất quay quanh mặt trời",
    content: "Trái đất quay quanh mặt trời. Đúng hay sai?",
    type: "true-false",
    category: "Khoa học",
    difficulty: "easy",
    points: 1,
    tags: ["thiên văn", "hệ mặt trời"],
    created: "2024-01-16",
    used: 8,
  },
  {
    id: "3",
    title: "Thủ đô Việt Nam",
    content: "Thủ đô của Việt Nam là gì?",
    type: "short-answer",
    category: "Địa lý",
    difficulty: "easy",
    points: 2,
    tags: ["địa lý", "việt nam"],
    created: "2024-01-17",
    used: 12,
  },
  // 👉 thêm dữ liệu giả để test phân trang
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: `${i + 4}`,
    title: `Câu hỏi giả lập ${i + 4}`,
    content: `Nội dung câu hỏi số ${i + 4}`,
    type: (i % 2 === 0 ? "multiple-choice" : "true-false") as "multiple-choice" | "true-false",
    category: i % 3 === 0 ? "Toán học" : i % 3 === 1 ? "Khoa học" : "Ngôn ngữ",
    difficulty: (i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard") as "easy" | "medium" | "hard",
    points: 1 + (i % 5),
    tags: ["tag1", "tag2"],
    created: "2024-02-01",
    used: Math.floor(Math.random() * 20),
  })),
];

// ====================== CONFIG ======================
const questionTypeIcons = {
  "multiple-choice": HelpCircle,
  "true-false": CheckCircle,
  "short-answer": FileText,
  essay: MessageSquare,
  matching: Copy,
  "fill-blank": Edit,
};

const difficultyColors = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

interface Question {
  id: string;
  title: string;
  content: string;
  type: "multiple-choice" | "true-false" | "short-answer" | "essay" | "matching" | "fill-blank";
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  tags: string[];
  created: string;
  used: number;
}

// ====================== COMPONENT ======================
const QuestionList = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // ====================== FILTER + SEARCH ======================
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchSearch =
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        categoryFilter === "all" || q.category.toLowerCase() === categoryFilter;

      const matchType = typeFilter === "all" || q.type === typeFilter;

      return matchSearch && matchCategory && matchType;
    });
  }, [searchTerm, categoryFilter, typeFilter]);

  // ====================== PAGINATION ======================
  const totalPages = Math.ceil(filteredQuestions.length / pageSize);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ====================== TOGGLE ======================
  const toggleQuestion = (questionId: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const toggleAll = () => {
    setSelectedQuestions(
      selectedQuestions.length === filteredQuestions.length
        ? []
        : filteredQuestions.map((q) => q.id)
    );
  };

  const handleDelete = (id: string) => {
    console.log("Xóa câu hỏi với id:", id);

  };

  const handleDuplicate = (question: Question) => {
    console.log("Sao chép câu hỏi:", question);
  };

  // ====================== RENDER ======================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ngân hàng câu hỏi</h2>
          <p className="text-gray-600">Quản lý và tổ chức câu hỏi cho các bài kiểm tra</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link href={"/admin/question-bank/create"}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tạo câu hỏi
            </Button>
          </Link>

        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng câu hỏi</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +23 câu hỏi mới tuần này
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trắc nghiệm</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">
              68.6% tổng số câu hỏi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tự luận</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">
              18.8% tổng số câu hỏi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Được sử dụng</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">
              71.5% đã được sử dụng
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc và tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm câu hỏi..."
                className="pl-10 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm "
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Select
              value={categoryFilter}
              onValueChange={(v) => {
                setCategoryFilter(v);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-48 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Tất cả danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                <SelectItem value="toán học">Toán học</SelectItem>
                <SelectItem value="khoa học">Khoa học</SelectItem>
                <SelectItem value="ngôn ngữ">Ngôn ngữ</SelectItem>
                <SelectItem value="địa lý">Địa lý</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={typeFilter}
              onValueChange={(v) => {
                setTypeFilter(v);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-48 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Tất cả loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="multiple-choice">Trắc nghiệm</SelectItem>
                <SelectItem value="true-false">Đúng/Sai</SelectItem>
                <SelectItem value="short-answer">Câu trả lời ngắn</SelectItem>
                <SelectItem value="essay">Tự luận</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Lọc nâng cao
            </Button>
          </div>

          {/* Bulk actions */}
          {selectedQuestions.length > 0 && (
            <div className="flex items-center gap-4 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <span className="text-sm font-medium text-blue-800">
                Đã chọn {selectedQuestions.length} câu hỏi
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Tạo bài kiểm tra
                </Button>
                <Button size="sm" variant="outline">
                  Export
                </Button>
                <Button size="sm" variant="outline" className="text-red-600">
                  Xóa
                </Button>
              </div>
            </div>
          )}

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedQuestions.length > 0 &&
                      selectedQuestions.length === filteredQuestions.length
                    }
                    onCheckedChange={toggleAll}
                    className="bg-white border border-gray-300 text-gray-900"
                  />
                </TableHead>
                <TableHead>Câu hỏi</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Độ khó</TableHead>
                <TableHead>Điểm</TableHead>
                <TableHead>Sử dụng</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedQuestions.map((q) => {
                const TypeIcon = questionTypeIcons[q.type as keyof typeof questionTypeIcons];
                return (
                  <TableRow key={q.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedQuestions.includes(q.id)}
                        onCheckedChange={() => toggleQuestion(q.id)}
                        className="bg-white border border-gray-300 text-gray-900"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{q.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-md">{q.content}</div>
                        <div className="flex flex-wrap gap-1">
                          {q.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TypeIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          {q.type === "multiple-choice"
                            ? "Trắc nghiệm"
                            : q.type === "true-false"
                              ? "Đúng/Sai"
                              : q.type === "short-answer"
                                ? "Trả lời ngắn"
                                : "Khác"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{q.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={difficultyColors[q.difficulty as keyof typeof difficultyColors]}>
                        {q.difficulty === "easy"
                          ? "Dễ"
                          : q.difficulty === "medium"
                            ? "TB"
                            : "Khó"}
                      </Badge>
                    </TableCell>
                    <TableCell>{q.points}</TableCell>
                    <TableCell>{q.used} lần</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/question-bank/${q.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Xem chi tiết
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(q)} className="mb-1">
                            <Copy className="mr-2 h-4 w-4" />
                            Sao chép
                          </DropdownMenuItem>
                          <ConfirmDialog
                            title="Xóa câu hỏi"
                            description={`Bạn có chắc chắn muốn xóa "${q.title}"?`}
                            onConfirm={() => handleDelete(q.id)}
                            triggerLabel="Xóa câu hỏi"
                            triggerVariant="destructive"
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Trang {currentPage} / {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionList;
