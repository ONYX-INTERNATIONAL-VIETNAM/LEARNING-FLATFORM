import QuestionForm from "@/components/question-bank/QuestionForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CreateQuestionPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/question-bank">
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

export default CreateQuestionPage;
