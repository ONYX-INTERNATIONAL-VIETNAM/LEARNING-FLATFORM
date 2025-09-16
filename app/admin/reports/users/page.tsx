"use client";

import { useState } from "react";
import ReportFilterBar, { ReportFilter } from "@/components/admin/reports/ReportFilterBar";
import StatCards from "@/components/admin/reports/StatCards";
import ActiveUsersChart from "@/components/admin/reports/charts/ActiveUsersChart";
import UserReportTable from "@/components/admin/reports/tables/UserReportTable";
import ExportCSV from "@/components/admin/reports/exports/ExportCSV";
import { Users, LogIn, Target } from "lucide-react";

export default function ReportsUsersPage() {
  const [filter, setFilter] = useState<ReportFilter>({
    from: new Date(Date.now() - 29 * 24 * 3600 * 1000).toISOString().slice(0,10),
    to: new Date().toISOString().slice(0,10),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Báo cáo người dùng</h1>
          <p className="text-gray-600">Theo dõi hoạt động & hiệu suất học tập</p>
        </div>
      </div>

      <ReportFilterBar
        value={filter}
        onChange={setFilter}
        extras={<ExportCSV getData={() => [{ demo: "users" }]} filename="users.csv" />}
      />

      <StatCards
        items={[
          { title: "Tổng người dùng", value: "12,431", hint: "+5% MoM", icon: <Users className="w-4 h-4 text-gray-400" /> },
          { title: "Đăng nhập hôm nay", value: "842", icon: <LogIn className="w-4 h-4 text-gray-400" /> },
          { title: "Hoàn thành TB", value: "82.1%", icon: <Target className="w-4 h-4 text-gray-400" /> },
          { title: "Giờ học TB/người", value: "14.6h" },
        ]}
      />

      <ActiveUsersChart />
      <UserReportTable />
    </div>
  );
}
