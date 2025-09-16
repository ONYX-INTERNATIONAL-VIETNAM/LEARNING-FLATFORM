import QuestionForm from "@/components/question-bank/QuestionForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CreateQuestionPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Left: title + description */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Tạo câu hỏi mới
          </h1>
          <p className="text-gray-600 text-sm">
            Thêm câu hỏi vào ngân hàng câu hỏi
          </p>
        </div>

        {/* Right: back button (centered vertically) */}
        <Link href="/admin/question-bank">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-white border border-gray-300 
                       text-gray-700 rounded-md shadow-sm hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>
        </Link>
      </div>

      {/* Form */}
      <QuestionForm />
    </div>
  );
};

export default CreateQuestionPage;
