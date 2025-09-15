"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, Upload, ImageIcon } from "lucide-react";

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback?: string;
}

interface Question {
  id: string;
  type:
    | "multiple-choice"
    | "true-false"
    | "short-answer"
    | "essay"
    | "matching"
    | "fill-blank";
  title: string;
  content: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  tags: string[];
  answers: Answer[];
  explanation?: string;
  image?: string;
}

const QuestionForm = () => {
  const [question, setQuestion] = useState<Question>({
    id: "",
    type: "multiple-choice",
    title: "",
    content: "",
    category: "",
    difficulty: "medium",
    points: 1,
    tags: [],
    answers: [
      { id: "1", text: "", isCorrect: false },
      { id: "2", text: "", isCorrect: false },
    ],
    explanation: "",
  });

  const [newTag, setNewTag] = useState("");

  const addAnswer = () => {
    const newAnswer: Answer = {
      id: Date.now().toString(),
      text: "",
      isCorrect: false,
    };
    setQuestion({
      ...question,
      answers: [...question.answers, newAnswer],
    });
  };

  const updateAnswer = (
    answerId: string,
    field: keyof Answer,
    value: string | boolean
  ) => {
    setQuestion({
      ...question,
      answers: question.answers.map((answer) =>
        answer.id === answerId ? { ...answer, [field]: value } : answer
      ),
    });
  };

  const removeAnswer = (answerId: string) => {
    setQuestion({
      ...question,
      answers: question.answers.filter((answer) => answer.id !== answerId),
    });
  };

  const addTag = () => {
    if (newTag.trim() && !question.tags.includes(newTag.trim())) {
      setQuestion({
        ...question,
        tags: [...question.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setQuestion({
      ...question,
      tags: question.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Question data:", question);
    // Handle question creation
  };

  const renderAnswerSection = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Các lựa chọn</Label>
              <Button
                type="button"
                onClick={addAnswer}
                variant="outline"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm lựa chọn
              </Button>
            </div>
            {question.answers.map((answer, index) => (
              <div
                key={answer.id}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <Switch
                    checked={answer.isCorrect}
                    onCheckedChange={(checked) =>
                      updateAnswer(answer.id, "isCorrect", checked)
                    }
                  />
                  <span className="text-xs text-gray-500">Đúng</span>
                </div>
                <Input
                  value={answer.text}
                  onChange={(e) =>
                    updateAnswer(answer.id, "text", e.target.value)
                  }
                  placeholder="Nhập nội dung lựa chọn"
                  className="flex-1"
                />
                {question.answers.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAnswer(answer.id)}
                    className="text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        );

      case "true-false":
        return (
          <div className="space-y-4">
            <Label>Đáp án đúng</Label>
            <Select
              value={question.answers[0]?.isCorrect ? "true" : "false"}
              onValueChange={(value) => {
                const updatedAnswers = [
                  { id: "1", text: "Đúng", isCorrect: value === "true" },
                  { id: "2", text: "Sai", isCorrect: value === "false" },
                ];
                setQuestion({ ...question, answers: updatedAnswers });
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Đúng</SelectItem>
                <SelectItem value="false">Sai</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case "short-answer":
        return (
          <div className="space-y-4">
            <Label>Đáp án mẫu</Label>
            <Textarea
              value={question.answers[0]?.text || ""}
              onChange={(e) => {
                const updatedAnswers = [
                  { id: "1", text: e.target.value, isCorrect: true },
                ];
                setQuestion({ ...question, answers: updatedAnswers });
              }}
              placeholder="Nhập đáp án mẫu hoặc từ khóa chấm điểm"
              rows={3}
            />
          </div>
        );

      case "essay":
        return (
          <div className="space-y-4">
            <Label>Hướng dẫn chấm điểm</Label>
            <Textarea
              value={question.answers[0]?.text || ""}
              onChange={(e) => {
                const updatedAnswers = [
                  { id: "1", text: e.target.value, isCorrect: true },
                ];
                setQuestion({ ...question, answers: updatedAnswers });
              }}
              placeholder="Nhập hướng dẫn chấm điểm cho giáo viên"
              rows={4}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="answers">Đáp án</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin câu hỏi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="type">Loại câu hỏi *</Label>
                  <Select
                    value={question.type}
                    onValueChange={(value: Question["type"]) =>
                      setQuestion({ ...question, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">
                        Trắc nghiệm
                      </SelectItem>
                      <SelectItem value="true-false">Đúng/Sai</SelectItem>
                      <SelectItem value="short-answer">
                        Câu trả lời ngắn
                      </SelectItem>
                      <SelectItem value="essay">Tự luận</SelectItem>
                      <SelectItem value="matching">Nối câu</SelectItem>
                      <SelectItem value="fill-blank">
                        Điền vào chỗ trống
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Select
                    value={question.category}
                    onValueChange={(value) =>
                      setQuestion({ ...question, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Toán học</SelectItem>
                      <SelectItem value="science">Khoa học</SelectItem>
                      <SelectItem value="language">Ngôn ngữ</SelectItem>
                      <SelectItem value="history">Lịch sử</SelectItem>
                      <SelectItem value="geography">Địa lý</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề câu hỏi</Label>
                <Input
                  id="title"
                  value={question.title}
                  onChange={(e) =>
                    setQuestion({ ...question, title: e.target.value })
                  }
                  placeholder="Nhập tiêu đề ngắn gọn cho câu hỏi"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Nội dung câu hỏi *</Label>
                <Textarea
                  id="content"
                  value={question.content}
                  onChange={(e) =>
                    setQuestion({ ...question, content: e.target.value })
                  }
                  placeholder="Nhập nội dung câu hỏi"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Hình ảnh (tùy chọn)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="mt-2">
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Tải lên hình ảnh
                    </Button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF tối đa 5MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="answers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình đáp án</CardTitle>
            </CardHeader>
            <CardContent>{renderAnswerSection()}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Giải thích đáp án</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={question.explanation || ""}
                onChange={(e) =>
                  setQuestion({ ...question, explanation: e.target.value })
                }
                placeholder="Nhập giải thích cho đáp án (hiển thị sau khi học sinh trả lời)"
                rows={3}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt điểm số</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="points">Điểm số</Label>
                    <Input
                      id="points"
                      type="number"
                      min="0"
                      step="0.1"
                      value={question.points}
                      onChange={(e) =>
                        setQuestion({
                          ...question,
                          points: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Độ khó</Label>
                    <Select
                      value={question.difficulty}
                      onValueChange={(value: Question["difficulty"]) =>
                        setQuestion({ ...question, difficulty: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Dễ</SelectItem>
                        <SelectItem value="medium">Trung bình</SelectItem>
                        <SelectItem value="hard">Khó</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thẻ từ khóa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Thêm thẻ từ khóa"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline">
          Xem trước
        </Button>
        <Button type="submit">Lưu câu hỏi</Button>
      </div>
    </form>
  );
};

export default QuestionForm;
