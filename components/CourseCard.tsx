import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  students: number;
  level: string;
  levelColor: string;
}

const CourseCard = ({
  id,
  title,
  description,
  image,
  progress,
  totalLessons,
  completedLessons,
  duration,
  students,
  level,
  levelColor,
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
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

        {/* Course info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {duration}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {students.toLocaleString()}
          </div>
        </div>

        <Link href={`/student/courses/${id}`}>
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Play className="h-4 w-4 mr-2" />
            Tiếp tục học
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
