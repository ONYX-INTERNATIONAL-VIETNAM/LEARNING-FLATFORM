import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Users, Clock, BookOpen, Share, Heart } from "lucide-react";
import Image from "next/image";

interface CourseHeaderProps {
  title: string;
  description: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  level: string;
  progress: number;
  image: string;
}

const CourseHeader = ({
  title,
  description,
  instructor,
  rating,
  students,
  duration,
  lessons,
  level,
  progress,
  image,
}: CourseHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent rounded-lg p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-100 text-blue-800">{level}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              {rating} ({students.toLocaleString()} đánh giá)
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-3">{title}</h1>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {students.toLocaleString()} học sinh
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {duration}
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              {lessons} bài học
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">Giảng viên:</span>
            <span className="text-sm text-accent font-medium">
              {instructor}
            </span>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tiến độ học tập</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        {/* Course Image & Actions */}
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover"
              width={400}
              height={225}
            />
          </div>

          <div className="space-y-2">
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Tiếp tục học
            </Button>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
              >
                <Share className="h-4 w-4 mr-2" />
                Chia sẻ
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
              >
                <Heart className="h-4 w-4 mr-2" />
                Yêu thích
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
