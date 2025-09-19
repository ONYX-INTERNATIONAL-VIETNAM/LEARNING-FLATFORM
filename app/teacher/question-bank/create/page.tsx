"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const QuestionForm = dynamic(
  () => import("@/components/features").then(mod => ({ default: mod.QuestionForm })),
  { ssr: false }
);

const TeacherCreateQuestionPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/teacher/question-bank">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Tạo câu hỏi mới</h1>
          <p className="text-gray-600">Thêm câu hỏi vào ngân hàng câu hỏi</p>
        </div>
      </div>

      <QuestionForm />
    </div>
  );
};

export default TeacherCreateQuestionPage;
