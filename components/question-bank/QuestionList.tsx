"use client";

import { useState } from "react";
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
  Trash2,
  Copy,
  Eye,
  Download,
  Upload,
  Plus,
  HelpCircle,
  CheckCircle,
  FileText,
  MessageSquare,
} from "lucide-react";

const questions = [
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
];

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

const QuestionList = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const toggleQuestion = (questionId: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const toggleAll = () => {
    setSelectedQuestions(
      selectedQuestions.length === questions.length
        ? []
        : questions.map((q) => q.id)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ngân hàng câu hỏi</h2>
          <p className="text-gray-600">
            Quản lý và tổ chức câu hỏi cho các bài kiểm tra
          </p>
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
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tạo câu hỏi
          </Button>
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm câu hỏi..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tất cả danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                <SelectItem value="math">Toán học</SelectItem>
                <SelectItem value="science">Khoa học</SelectItem>
                <SelectItem value="language">Ngôn ngữ</SelectItem>
                <SelectItem value="geography">Địa lý</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
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
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 bg-transparent"
                >
                  Xóa
                </Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedQuestions.length === questions.length}
                    onCheckedChange={toggleAll}
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
              {questions.map((question) => {
                const TypeIcon =
                  questionTypeIcons[
                    question.type as keyof typeof questionTypeIcons
                  ];
                return (
                  <TableRow key={question.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedQuestions.includes(question.id)}
                        onCheckedChange={() => toggleQuestion(question.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{question.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-md">
                          {question.content}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {question.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
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
                          {question.type === "multiple-choice"
                            ? "Trắc nghiệm"
                            : question.type === "true-false"
                            ? "Đúng/Sai"
                            : question.type === "short-answer"
                            ? "Trả lời ngắn"
                            : "Khác"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{question.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          difficultyColors[
                            question.difficulty as keyof typeof difficultyColors
                          ]
                        }
                      >
                        {question.difficulty === "easy"
                          ? "Dễ"
                          : question.difficulty === "medium"
                          ? "TB"
                          : "Khó"}
                      </Badge>
                    </TableCell>
                    <TableCell>{question.points}</TableCell>
                    <TableCell>{question.used} lần</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Sao chép
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionList;
