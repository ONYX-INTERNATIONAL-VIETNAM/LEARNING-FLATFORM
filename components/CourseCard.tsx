import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  students: number;
  level: string;
  levelColor: string;
  price?: number;
  progress?: number;
  totalLessons?: number;
  completedLessons?: number;
  footer?: ReactNode; // nút hành động tuỳ chỉnh
}

export default function CourseCard({
  id,
  title,
  description,
  image,
  duration,
  students,
  level,
  levelColor,
  price,
  progress,
  totalLessons,
  completedLessons,
  footer,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Ảnh */}
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
          width={400}
          height={300}
        />
        <div className="absolute top-2 left-2">
          <Badge className={levelColor}>{level}</Badge>
        </div>
      </div>

      {/* Tiêu đề + mô tả */}
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Nếu có tiến độ thì hiển thị */}
        {typeof progress === "number" && totalLessons ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tiến độ</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {completedLessons}/{totalLessons} bài học
            </p>
          </div>
        ) : null}

        {/* Thông tin chung */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {duration}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {students.toLocaleString("vi-VN")}
          </div>
        </div>

        {/* Nếu có giá */}
        {price !== undefined && (
          <p className="text-base font-semibold text-primary">
            {price.toLocaleString("vi-VN")}₫
          </p>
        )}

        {/* Footer: tuỳ chọn nút hành động */}
        {footer ?? (
          <Link href={`/student/courses/${id}`}>
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Vào học ngay
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
