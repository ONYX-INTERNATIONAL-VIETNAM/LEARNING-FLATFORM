"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, FileText, Download } from "lucide-react";
import { VideoPlayer } from "@/components/course";
import { QuizComponent } from "@/components/features";
import { CourseHeader } from "@/components/course";
import { LessonSidebar } from "@/components/layout";

type LessonType = "video" | "quiz" | "assignment";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: LessonType;
  completed: boolean;
  locked: boolean;
  current?: boolean;
}

const courseData = {
  title: "Toán học cơ bản",
  description:
    "Học toán một cách vui nhộn với trò chơi và hình ảnh sinh động, phù hợp cho trẻ em từ 6-10 tuổi",
  instructor: "Cô Nguyễn Thị Lan",
  rating: 4.8,
  students: 1250,
  duration: "4 tuần",
  lessons: 20,
  level: "Cơ bản",
  progress: 65,
  image: "/colorful-math-learning-for-kids.jpg",
};

const lessons: Lesson[] = [
  {
    id: "1",
    title: "Giới thiệu về số học",
    duration: "10 phút",
    type: "video",
    completed: true,
    locked: false,
  },
  {
    id: "2",
    title: "Đếm từ 1 đến 10",
    duration: "15 phút",
    type: "video",
    completed: true,
    locked: false,
  },
  {
    id: "3",
    title: "Kiểm tra: Đếm số",
    duration: "5 phút",
    type: "quiz",
    completed: true,
    locked: false,
  },
  {
    id: "4",
    title: "Phép cộng đơn giản",
    duration: "20 phút",
    type: "video",
    completed: false,
    locked: false,
    current: true,
  },
  {
    id: "5",
    title: "Bài tập phép cộng",
    duration: "10 phút",
    type: "assignment",
    completed: false,
    locked: false,
  },
  {
    id: "6",
    title: "Phép trừ cơ bản",
    duration: "18 phút",
    type: "video",
    completed: false,
    locked: true,
  },
];

const quizQuestions = [
  {
    id: "q1",
    question: "2 + 3 bằng bao nhiêu?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 1,
    explanation: "2 + 3 = 5",
  },
  {
    id: "q2",
    question:
      "Nếu bạn có 3 quả táo và mẹ cho thêm 2 quả, bạn có tất cả bao nhiêu quả?",
    options: ["4 quả", "5 quả", "6 quả", "3 quả"],
    correctAnswer: 1,
    explanation: "3 + 2 = 5 quả táo",
  },
];

function CoursePage() {
  const [currentLesson, setCurrentLesson] = useState("4");

  const getCurrentLessonContent = () => {
    const lesson = lessons.find((l) => l.id === currentLesson);
    if (!lesson) return null;

    switch (lesson.type) {
      case "video":
        return <VideoPlayer title={lesson.title} duration={lesson.duration} />;
      case "quiz":
        return (
          <QuizComponent
            title={lesson.title}
            questions={quizQuestions}
            onComplete={(score) =>
              console.log("Quiz completed with score:", score)
            }
          />
        );
      case "assignment":
        return (
          <Card>
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Hoàn thành các bài tập sau để củng cố kiến thức về phép cộng.
              </p>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Bài tập 1: Tính tổng</h4>
                  <p className="text-sm text-muted-foreground">
                    Tính các phép cộng sau: 1+1, 2+2, 3+3, 4+4, 5+5
                  </p>
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Bắt đầu làm bài
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">{lesson.title}</h3>
              <p className="text-muted-foreground">
                Nội dung bài học sẽ được cập nhật sớm.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      <CourseHeader {...courseData} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {getCurrentLessonContent()}

          {/* Course Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="notes">Ghi chú</TabsTrigger>
              <TabsTrigger value="resources">Tài liệu</TabsTrigger>
              <TabsTrigger value="discussion">Thảo luận</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Về khóa học này</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Khóa học Toán học cơ bản được thiết kế đặc biệt cho trẻ em
                    từ 6-10 tuổi. Chúng tôi sử dụng phương pháp học tập tương
                    tác với hình ảnh sinh động, trò chơi giáo dục và các bài tập
                    thực hành thú vị để giúp các em yêu thích môn toán.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ghi chú của tôi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Bạn chưa có ghi chú nào. Hãy bắt đầu ghi chú trong quá trình
                    học!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tài liệu tham khảo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Bảng cửu chương</p>
                      <p className="text-sm text-muted-foreground">
                        PDF - 2.5 MB
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Tải về
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Bài tập thực hành</p>
                      <p className="text-sm text-muted-foreground">
                        PDF - 1.8 MB
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Tải về
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Thảo luận</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Chưa có thảo luận nào. Hãy là người đầu tiên đặt câu hỏi!
                    </p>
                    <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                      Đặt câu hỏi
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <LessonSidebar
            lessons={lessons}
            progress={courseData.progress}
            onLessonSelect={setCurrentLesson}
          />
        </div>
      </div>
    </div>
  );
}
export default CoursePage;
