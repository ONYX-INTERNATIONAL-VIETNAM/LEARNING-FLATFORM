"use client";

import { useState } from "react";
import { Trophy, Star, Award, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const achievements = [
  {
    id: 1,
    title: "Học sinh xuất sắc",
    description: "Hoàn thành 5 khóa học",
    icon: Trophy,
    color: "text-yellow-500",
    date: "15/12/2024",
    course: "Math 101",
  },
  {
    id: 2,
    title: "Siêu sao toán học",
    description: "Đạt 100% bài kiểm tra toán",
    icon: Star,
    color: "text-blue-500",
    date: "10/12/2024",
    course: "Math 201",
  },
  {
    id: 3,
    title: "Nhà thám hiểm",
    description: "Khám phá 10 chủ đề mới",
    icon: Award,
    color: "text-green-500",
    date: "08/11/2024",
    course: "Science 202",
  },
  {
    id: 4,
    title: "Mục tiêu tuần",
    description: "Học 5 ngày liên tiếp",
    icon: Target,
    color: "text-red-500",
    date: "05/12/2024",
    course: "English 104",
  },
];

export default function AchievementsPage() {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Tiêu đề */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Thành tích của bạn</h1>
        <p className="text-muted-foreground">
          Đây là danh sách các huy hiệu mà bạn đã nhận được từ các khóa học.
        </p>
      </div>

      {/* Grid Achievements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((a) => (
          <Card
            key={a.id}
            className="hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedAchievement(a)}
          >
            <CardHeader className="flex flex-row items-center gap-3">
              <div
                className={`p-2 rounded-full bg-muted flex items-center justify-center`}
              >
                <a.icon className={`h-6 w-6 ${a.color}`} />
              </div>
              <CardTitle>{a.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{a.description}</p>
              <p className="text-xs text-muted-foreground">
                Khóa học: <span className="font-medium">{a.course}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Đạt được: {a.date}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog chi tiết */}
      <Dialog
        open={!!selectedAchievement}
        onOpenChange={() => setSelectedAchievement(null)}
      >
        <DialogContent className="sm:max-w-md">
          {selectedAchievement && (
            <>
              <DialogHeader className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 rounded-full bg-muted w-fit">
                  <selectedAchievement.icon
                    className={`h-10 w-10 ${selectedAchievement.color}`}
                  />
                </div>
                <DialogTitle className="text-xl font-bold">
                  {selectedAchievement.title}
                </DialogTitle>
                <DialogDescription>
                  {selectedAchievement.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium">Khóa học:</span>{" "}
                  {selectedAchievement.course}
                </p>
                <p>
                  <span className="font-medium">Ngày đạt được:</span>{" "}
                  {selectedAchievement.date}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
