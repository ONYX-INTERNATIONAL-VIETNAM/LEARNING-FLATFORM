"use client";

import { useState } from "react";
import ReportFilterBar, { ReportFilter } from "@/components/admin/reports/ReportFilterBar";
import StatCards from "@/components/admin/reports/StatCards";
import ActiveUsersChart from "@/components/admin/reports/charts/ActiveUsersChart";
import EnrollmentChart from "@/components/admin/reports/charts/EnrollmentChart";
import CompletionRateChart from "@/components/admin/reports/charts/CompletionRateChart";
import CourseReportTable from "@/components/admin/reports/tables/CourseReportTable";
import ExportCSV from "@/components/admin/reports/exports/ExportCSV";
import ExportPDF from "@/components/admin/reports/exports/ExportPDF";
import { Users, BookOpen, Target, DollarSign } from "lucide-react";

export default function ReportsOverviewPage() {
  const [filter, setFilter] = useState<ReportFilter>({
    from: new Date(Date.now() - 29 * 24 * 3600 * 1000).toISOString().slice(0,10),
    to: new Date().toISOString().slice(0,10),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tổng quan hệ thống</h1>
          <p className="text-gray-600">Ảnh tổng thể về người dùng, khóa học và tiến độ</p>
        </div>
      </div>

      <ReportFilterBar
        value={filter}
        onChange={setFilter}
        extras={
          <div className="flex gap-2">
            <ExportCSV getData={() => [{ demo: "overview" }]} filename="overview.csv" />
            <ExportPDF />
          </div>
        }
      />

      <StatCards
        items={[
          { title: "Active Users", value: "1,482", hint: "+8% so với tháng trước", icon: <Users className="w-4 h-4 text-gray-400" /> },
          { title: "Khóa học mở", value: "142", hint: "91% tổng số", icon: <BookOpen className="w-4 h-4 text-gray-400" /> },
          { title: "Tỉ lệ hoàn thành TB", value: "86.9%", hint: "+2.1% cải thiện", icon: <Target className="w-4 h-4 text-gray-400" /> },
          { title: "Doanh thu tháng", value: "₫ 126,4M", hint: "+12% MoM", icon: <DollarSign className="w-4 h-4 text-gray-400" /> },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <ActiveUsersChart />
        <CompletionRateChart />
      </div>

      <EnrollmentChart />
      <CourseReportTable />
    </div>
  );
}
