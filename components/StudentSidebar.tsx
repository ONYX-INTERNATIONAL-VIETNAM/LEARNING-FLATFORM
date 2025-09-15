import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Trophy,
  Calendar,
  MessageCircle,
  Settings,
  LogOut,
  Home,
  Star,
} from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: "Trang chủ", href: "/student", icon: Home },
  { name: "Khóa học của tôi", href: "/student/courses", icon: BookOpen },
  { name: "Lịch học", href: "/student/schedule", icon: Calendar },
  { name: "Thành tích", href: "/student/achievements", icon: Trophy },
  { name: "Đánh giá", href: "/student/reviews", icon: Star },
  { name: "Tin nhắn", href: "/student/messages", icon: MessageCircle },
];

const StudentSidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn("flex h-full w-64 flex-col bg-card border-r", className)}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b">
        <Link href="/student" className="flex items-center space-x-2">
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
      </nav>

      {/* User section */}
      <Link href="/student/profile" className="border-t p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-accent">HS</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Học sinh</p>
            <p className="text-xs text-muted-foreground truncate">
              student@onyx.edu
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <Link
            href="/student/settings"
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
      </Link>
    </div>
  );
};

export default StudentSidebar;
