"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  Users,
  BookOpen,
  DollarSign,
  Activity,
  Repeat,
  FileText,
  Video,
  Shield,
  Download,
  ArrowRight,
} from "lucide-react";

type ReportLink = {
  title: string;
  href: string;
  desc: string;
  icon: React.ElementType;
  accent?: string; // tailwind text color
};

const links: ReportLink[] = [
  {
    title: "Tổng quan",
    href: "/admin/reports/overview",
    desc: "Ảnh tổng thể về người dùng, khóa học, tiến độ và doanh thu.",
    icon: BarChart3,
    accent: "text-blue-600",
  },
  {
    title: "Người dùng",
    href: "/admin/reports/users",
    desc: "Hoạt động, tăng trưởng, tỷ lệ giữ chân, mức độ tương tác.",
    icon: Users,
    accent: "text-emerald-600",
  },
  {
    title: "Khóa học",
    href: "/admin/reports/courses",
    desc: "Ghi danh, mức độ hoàn thành, tỉ lệ bỏ học theo khóa.",
    icon: BookOpen,
    accent: "text-indigo-600",
  },
  {
    title: "Doanh thu",
    href: "/admin/reports/revenue",
    desc: "Biểu đồ doanh thu, ARPU, LTV, phân tách theo nguồn.",
    icon: DollarSign,
    accent: "text-amber-600",
  },
  {
    title: "Tương tác",
    href: "/admin/reports/engagement",
    desc: "Active users, thời lượng học, DAU/WAU/MAU, phiên học.",
    icon: Activity,
    accent: "text-pink-600",
  },
  {
    title: "Giữ chân",
    href: "/admin/reports/retention",
    desc: "Cohort retention, churn, quay lại theo tuần/tháng.",
    icon: Repeat,
    accent: "text-teal-600",
  },
  {
    title: "Bài kiểm tra",
    href: "/admin/reports/quizzes",
    desc: "Phân phối điểm, câu hỏi khó/dễ, tỉ lệ qua môn.",
    icon: FileText,
    accent: "text-purple-600",
  },
  {
    title: "Nội dung/Video",
    href: "/admin/reports/content",
    desc: "Hiệu suất bài học, video completion, CTR, lượt xem.",
    icon: Video,
    accent: "text-rose-600",
  },
  {
    title: "Hệ thống",
    href: "/admin/reports/system",
    desc: "Sức khỏe hệ thống, lỗi, SLA, thời gian phản hồi.",
    icon: Shield,
    accent: "text-slate-600",
  },
  {
    title: "Xuất dữ liệu",
    href: "/admin/reports/exports",
    desc: "Tải CSV/PDF, thiết lập báo cáo định kỳ.",
    icon: Download,
    accent: "text-gray-700",
  },
];

export default function ReportsIndexPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
          <p className="text-gray-600">
            Chọn một mục bên dưới để xem báo cáo chi tiết.
          </p>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(({ title, href, desc, icon: Icon, accent }) => (
          <Link key={href} href={href} className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-0.5">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className={`p-2 rounded-lg bg-gray-50 ${accent ?? ""}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <CardTitle className="text-base font-semibold text-gray-900">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-start justify-between">
                <p className="text-sm text-gray-600 pr-6">{desc}</p>
                <ArrowRight className="w-4 h-4 text-gray-400 mt-1 transition-transform group-hover:translate-x-0.5" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
