"use client";

import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  Database,
  FileText,
  HelpCircle,
  MessageSquare,
  Settings,
  Shield,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavItems = [
  {
    title: "Tổng quan",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "Quản lý người dùng",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Quản lý khóa học",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Ngân hàng câu hỏi",
    href: "/admin/question-bank",
    icon: FileText,
  },
  {
    title: "Quản lý video",
    href: "/admin/videos",
    icon: Video,
  },
  {
    title: "Báo cáo & Thống kê",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Tin nhắn hệ thống",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "Lịch học",
    href: "/admin/calendar",
    icon: Calendar,
  },
  {
    title: "Thông báo",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "Cài đặt hệ thống",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Bảo mật",
    href: "/admin/security",
    icon: Shield,
  },
  {
    title: "Sao lưu dữ liệu",
    href: "/admin/backup",
    icon: Database,
  },
  {
    title: "Trợ giúp",
    href: "/admin/help",
    icon: HelpCircle,
  },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex items-center gap-2 p-6 border-b border-gray-200">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Admin Panel</h2>
          <p className="text-xs text-gray-500">System Management</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-accent text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
export default AdminSidebar;
