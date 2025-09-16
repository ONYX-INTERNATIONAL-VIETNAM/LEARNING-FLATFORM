"use client";

import { useState } from "react";
import ReportFilterBar, { ReportFilter } from "@/components/admin/reports/ReportFilterBar";
import StatCards from "@/components/admin/reports/StatCards";
import EnrollmentChart from "@/components/admin/reports/charts/EnrollmentChart";
import CompletionRateChart from "@/components/admin/reports/charts/CompletionRateChart";
import CourseReportTable from "@/components/admin/reports/tables/CourseReportTable";
import ExportCSV from "@/components/admin/reports/exports/ExportCSV";
import { BookOpen, Target, Users } from "lucide-react";

export default function ReportsCoursesPage() {
  const [filter, setFilter] = useState<ReportFilter>({
    from: new Date(Date.now() - 29 * 24 * 3600 * 1000).toISOString().slice(0,10),
    to: new Date().toISOString().slice(0,10),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Báo cáo khóa học</h1>
          <p className="text-gray-600">Theo dõi hiệu suất từng khóa</p>
        </div>
      </div>

      <ReportFilterBar
        value={filter}
        onChange={setFilter}
        extras={<ExportCSV getData={() => [{ demo: "courses" }]} filename="courses.csv" />}
      />

      <StatCards
        items={[
          { title: "Khóa học đang mở", value: "142", icon: <BookOpen className="w-4 h-4 text-gray-400" /> },
          { title: "Học viên/khóa (TB)", value: "78", icon: <Users className="w-4 h-4 text-gray-400" /> },
          { title: "Hoàn thành TB", value: "86.9%", icon: <Target className="w-4 h-4 text-gray-400" /> },
          { title: "Giờ học đã tiêu thụ", value: "12,340h" },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <EnrollmentChart />
        <CompletionRateChart />
      </div>

      <CourseReportTable />
    </div>
  );
}
