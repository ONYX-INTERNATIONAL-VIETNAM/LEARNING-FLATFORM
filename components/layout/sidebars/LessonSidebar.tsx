"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Play, Lock, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "quiz" | "assignment" | "reading";
  completed: boolean;
  locked: boolean;
  current?: boolean;
}

interface LessonSidebarProps {
  lessons: Lesson[];
  progress: number;
  onLessonSelect: (lessonId: string) => void;
}

const typeIcons = {
  video: Play,
  quiz: CheckCircle,
  assignment: Circle,
  reading: Clock,
};

const typeColors = {
  video: "bg-blue-100 text-blue-800",
  quiz: "bg-green-100 text-green-800",
  assignment: "bg-purple-100 text-purple-800",
  reading: "bg-orange-100 text-orange-800",
};

const typeLabels = {
  video: "Video",
  quiz: "Kiểm tra",
  assignment: "Bài tập",
  reading: "Đọc hiểu",
};

const LessonSidebar = ({
  lessons,
  progress,
  onLessonSelect,
}: LessonSidebarProps) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Nội dung khóa học</CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tiến độ</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {lessons.map((lesson) => {
            const Icon = typeIcons[lesson.type];
            return (
              <button
                key={lesson.id}
                onClick={() => !lesson.locked && onLessonSelect(lesson.id)}
                disabled={lesson.locked}
                className={cn(
                  "w-full p-3 text-left hover:bg-muted/50 transition-colors border-l-4 border-transparent",
                  lesson.current && "bg-accent/10 border-l-accent",
                  lesson.locked && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {lesson.locked ? (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    ) : lesson.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {lesson.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant="secondary"
                        className={cn("text-xs", typeColors[lesson.type])}
                      >
                        {typeLabels[lesson.type]}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
export default LessonSidebar;
