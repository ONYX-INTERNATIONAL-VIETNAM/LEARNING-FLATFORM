"use client";

import { useState } from "react";
import ReportFilterBar, { ReportFilter } from "@/components/admin/reports/ReportFilterBar";
import StatCards from "@/components/admin/reports/StatCards";
import QuestionReportTable from "@/components/admin/reports/tables/QuestionReportTable";
import { HelpCircle, CheckCircle, FileText } from "lucide-react";

export default function ReportsQuestionsPage() {
  const [filter, setFilter] = useState<ReportFilter>({
    from: new Date(Date.now() - 29 * 24 * 3600 * 1000).toISOString().slice(0,10),
    to: new Date().toISOString().slice(0,10),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Báo cáo câu hỏi / kiểm tra</h1>
        <p className="text-gray-600">Phân tích ngân hàng câu hỏi & kết quả làm bài</p>
      </div>

      <ReportFilterBar value={filter} onChange={setFilter} />

      <StatCards
        items={[
          { title: "Tổng câu hỏi", value: "1,247", icon: <HelpCircle className="w-4 h-4 text-gray-400" /> },
          { title: "Trắc nghiệm", value: "856", icon: <CheckCircle className="w-4 h-4 text-gray-400" /> },
          { title: "Tự luận", value: "234", icon: <FileText className="w-4 h-4 text-gray-400" /> },
          { title: "Điểm TB", value: "7.8/10" },
        ]}
      />

      <QuestionReportTable />
    </div>
  );
}
