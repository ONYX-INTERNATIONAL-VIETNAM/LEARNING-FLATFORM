"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Save,
  X,
  Edit,
  Plus,
} from "lucide-react";
import { ConfirmDialog } from "@/components/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RichTextEditor from "@/components/common/forms/RichTextEditor";
const difficultyColors: Record<string, string> = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

const categories = ["Toán học", "Khoa học", "Ngôn ngữ", "Địa lý"];
const types = [
  { value: "multiple-choice", label: "Trắc nghiệm" },
  { value: "true-false", label: "Đúng/Sai" },
  { value: "short-answer", label: "Trả lời ngắn" },
  { value: "essay", label: "Tự luận" },
];

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export default function QuestionDetailPage() {
  const [isEditing, setIsEditing] = useState(false);

  const [question, setQuestion] = useState({
    id: "1",
    title: "Phép cộng cơ bản",
    content: "<p>2 + 3 = ?</p>",
    type: "multiple-choice",
    category: "Toán học",
    difficulty: "easy",
    points: 1,
    tags: ["cộng", "số học"],
    explanation: "Đây là phép cộng cơ bản trong toán học.",
    answers: [
      { id: "a", text: "4", isCorrect: false },
      { id: "b", text: "5", isCorrect: true },
    ] as Answer[],
    created: "2024-01-15",
    used: 15,
  });

  const [newTag, setNewTag] = useState("");

  const handleSave = () => {
    console.log("Đã lưu:", question);
    setIsEditing(false);
  };

  const addTag = () => {
    if (newTag.trim() && !question.tags.includes(newTag.trim())) {
      setQuestion({ ...question, tags: [...question.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setQuestion({
      ...question,
      tags: question.tags.filter((t) => t !== tag),
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          {isEditing ? (
            <Input
              value={question.title}
              onChange={(e) =>
                setQuestion({ ...question, title: e.target.value })
              }
              className="text-2xl md:text-xl font-bold bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          ) : (
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {question.title}
            </h1>
          )}

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="ml-2">
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
                <Button variant="outline" onClick={() => setIsEditing(true)} >
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Button>
                <ConfirmDialog
                  title="Xóa câu hỏi"
                  description={`Bạn có chắc chắn muốn xóa câu hỏi "${question.title}"?`}
                  onConfirm={() => console.log("Đã xóa:", question.id)}
                  triggerLabel="Xóa"
                  triggerVariant="destructive"
                />
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value="answers">Đáp án</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          {/* Tab: Basic */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin câu hỏi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Loại */}
                  <div>
                    <p className="text-xs text-gray-500">Loại</p>
                    {isEditing ? (
                      <Select
                        value={question.type}
                        onValueChange={(v) => setQuestion({ ...question, type: v })}
                      >
                        <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {types.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="font-medium">
                        {types.find((t) => t.value === question.type)?.label}
                      </p>
                    )}
                  </div>

                  {/* Danh mục */}
                  <div>
                    <p className="text-xs text-gray-500">Danh mục</p>
                    {isEditing ? (
                      <Select
                        value={question.category}
                        onValueChange={(v) =>
                          setQuestion({ ...question, category: v })
                        }
                      >
                        <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                          <SelectValue />
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
                      <p className="font-medium">{question.category}</p>
                    )}
                  </div>
                </div>

                {/* Nội dung */}
                <div>
                  <p className="text-xs text-gray-500">Nội dung</p>
                  {isEditing ? (
                    <RichTextEditor
                      value={question.content}
                      onChange={(html) =>
                        setQuestion({ ...question, content: html })
                      }
                    />
                  ) : (
                    <div
                      className="prose prose-sm text-gray-700"
                      dangerouslySetInnerHTML={{ __html: question.content }}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Answers */}
          <TabsContent value="answers">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cấu hình đáp án</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {question.answers.map((ans) => (
                    <div
                      key={ans.id}
                      className="flex items-center justify-between border rounded-md p-2"
                    >
                      {isEditing ? (
                        <Input
                          value={ans.text}
                          onChange={(e) =>
                            setQuestion({
                              ...question,
                              answers: question.answers.map((a) =>
                                a.id === ans.id ? { ...a, text: e.target.value } : a
                              ),
                            })
                          }
                          className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                        />
                      ) : (
                        <p>{ans.text}</p>
                      )}
                      {ans.isCorrect && (
                        <Badge variant="secondary" className="ml-2">
                          Đúng
                        </Badge>
                      )}
                    </div>
                  ))}

                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setQuestion({
                          ...question,
                          answers: [
                            ...question.answers,
                            { id: Date.now().toString(), text: "", isCorrect: false },
                          ],
                        })
                      }
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm đáp án
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Giải thích</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={question.explanation}
                      onChange={(e) =>
                        setQuestion({ ...question, explanation: e.target.value })
                      }
                    />
                  ) : (
                    <p>{question.explanation}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {/* Điểm */}
                <div>
                  <p className="text-xs text-gray-500">Điểm</p>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={question.points}
                      onChange={(e) =>
                        setQuestion({
                          ...question,
                          points: Number(e.target.value),
                        })
                      }
                      className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                    />
                  ) : (
                    <p className="font-medium">{question.points}</p>
                  )}
                </div>

                {/* Độ khó */}
                <div>
                  <p className="text-xs text-gray-500">Độ khó</p>
                  {isEditing ? (
                    <Select
                      value={question.difficulty}
                      onValueChange={(v) =>
                        setQuestion({ ...question, difficulty: v })
                      }
                    >
                      <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Dễ</SelectItem>
                        <SelectItem value="medium">Trung bình</SelectItem>
                        <SelectItem value="hard">Khó</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={difficultyColors[question.difficulty]}>
                      {question.difficulty === "easy"
                        ? "Dễ"
                        : question.difficulty === "medium"
                          ? "Trung bình"
                          : "Khó"}
                    </Badge>
                  )}
                </div>

                {/* Tags */}
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Tags</p>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Thêm tag..."
                        className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm flex-grow"
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        Thêm
                      </Button>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-2 mt-2">
                    {question.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        {isEditing && (
                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() => removeTag(tag)}
                          />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
