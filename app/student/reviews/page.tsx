"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";

// Fake data khóa học
const courses = [
  { id: "math101", name: "Toán học cơ bản" },
  { id: "eng201", name: "Tiếng Anh nâng cao" },
  { id: "sci301", name: "Khoa học thú vị" },
];

// Fake data review ban đầu
const initialReviews = [
  {
    id: 1,
    course: "Toán học cơ bản",
    rating: 5,
    comment: "Khoá học rất hay, giảng viên nhiệt tình!",
    author: "Nguyễn Văn A",
    date: "12/09/2025",
  },
  {
    id: 2,
    course: "Tiếng Anh nâng cao",
    rating: 4,
    comment: "Bài giảng dễ hiểu, nhưng cần thêm bài tập luyện tập.",
    author: "Trần Thị B",
    date: "10/09/2025",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!selectedCourse || rating === 0 || !comment.trim()) return;

    const newReview = {
      id: Date.now(),
      course: courses.find((c) => c.id === selectedCourse)?.name || "",
      rating,
      comment,
      author: "Bạn",
      date: new Date().toLocaleDateString("vi-VN"),
    };

    setReviews([newReview, ...reviews]);
    setSelectedCourse("");
    setRating(0);
    setComment("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Form đánh giá */}
      <Card>
        <CardHeader>
          <CardTitle>Đánh giá khoá học</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chọn khóa học */}
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn khóa học" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-6 w-6 cursor-pointer ${
                  i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(i)}
              />
            ))}
            <span className="text-sm text-muted-foreground">({rating} / 5)</span>
          </div>

          {/* Comment */}
          <Textarea
            placeholder="Viết nhận xét của bạn..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* Submit */}
          <Button onClick={handleSubmit} disabled={!selectedCourse || rating === 0 || !comment.trim()}>
            Gửi đánh giá
          </Button>
        </CardContent>
      </Card>

      {/* Danh sách đánh giá */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Đánh giá gần đây</h2>
        {reviews.map((r) => (
          <Card key={r.id} className="hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">{r.course}</CardTitle>
                <p className="text-sm text-muted-foreground">bởi {r.author} • {r.date}</p>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i <= r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{r.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
