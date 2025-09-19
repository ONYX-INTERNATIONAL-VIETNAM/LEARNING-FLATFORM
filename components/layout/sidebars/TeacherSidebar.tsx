import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Users,
  Calendar,
  MessageCircle,
  Settings,
  LogOut,
  Home,
  BarChart3,
  FileText,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: "Trang chủ", href: "/teacher", icon: Home },
  { name: "Lớp học của tôi", href: "/teacher/classes", icon: Users },
  { name: "Khóa học", href: "/teacher/courses", icon: BookOpen },
  { name: "Lịch dạy", href: "/teacher/schedule", icon: Calendar },
  { name: "Báo cáo", href: "/teacher/reports", icon: BarChart3 },
  { name: "Bài tập", href: "/teacher/assignments", icon: FileText },
  { name: "Tin nhắn", href: "/teacher/messages", icon: MessageCircle },
];

const TeacherSidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn("flex h-full w-64 flex-col bg-card border-r", className)}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b">
        <Link href="/teacher" className="flex items-center space-x-2">
          <Image
            src="/images/onyx-logo.webp"
            alt="ONYX"
            width={100}
            height={32}
            className="h-auto w-auto"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent/10 hover:text-accent transition-colors"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}

        {/* Quick Actions */}
        <div className="pt-4 mt-4 border-t">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Tạo mới
          </p>
          <Link
            href="/teacher/courses/new"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent/10 hover:text-accent transition-colors"
          >
            <Plus className="mr-3 h-4 w-4" />
            Khóa học mới
          </Link>
          <Link
            href="/teacher/classes/new"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent/10 hover:text-accent transition-colors"
          >
            <Plus className="mr-3 h-4 w-4" />
            Lớp học mới
          </Link>
        </div>
      </nav>

      {/* User section */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-accent">GV</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Giáo viên</p>
            <p className="text-xs text-muted-foreground truncate">
              teacher@onyx.edu
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <Link
            href="/teacher/settings"
            className="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-accent/10 hover:text-accent transition-colors"
          >
            <Settings className="mr-3 h-4 w-4" />
            Cài đặt
          </Link>
          <Button className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors">
            <LogOut className="mr-3 h-4 w-4" />
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;
