import StatsCard from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle,
  Clock,
  GraduationCap,
  TrendingUp,
  Users,
  Activity,
  AlertTriangle,
  Settings,
} from "lucide-react";

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Quản trị
          </h1>
          <p className="text-gray-600">
            Tổng quan hệ thống ONYX Learning Platform
          </p>
        </div>
        <Button>Xuất báo cáo</Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tổng số người dùng"
          value="2,847"
          change="+12% so với tháng trước"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Khóa học hoạt động"
          value="156"
          change="+8 khóa học mới"
          changeType="positive"
          icon={BookOpen}
        />
        <StatsCard
          title="Học sinh đang học"
          value="2,341"
          change="+5.2% so với tuần trước"
          changeType="positive"
          icon={GraduationCap}
        />
        <StatsCard
          title="Tỷ lệ hoàn thành"
          value="87.3%"
          change="+2.1% cải thiện"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Trạng thái hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Server chính</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">Hoạt động</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Cơ sở dữ liệu</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">Hoạt động</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Video streaming</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-yellow-600">Bảo trì</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email service</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">Hoạt động</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm">
                  Khóa học &quot;Toán học cơ bản&quot; được tạo
                </p>
                <p className="text-xs text-gray-500">2 giờ trước</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm">50 học sinh mới đăng ký</p>
                <p className="text-xs text-gray-500">4 giờ trước</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm">Cập nhật hệ thống v2.1.0</p>
                <p className="text-xs text-gray-500">1 ngày trước</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm">Báo cáo lỗi từ giáo viên</p>
                <p className="text-xs text-gray-500">2 ngày trước</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Cảnh báo hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">
                Dung lượng lưu trữ
              </p>
              <p className="text-xs text-yellow-700">
                Đã sử dụng 85% dung lượng
              </p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">
                Cập nhật bảo mật
              </p>
              <p className="text-xs text-blue-700">Có bản cập nhật mới</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">
                Sao lưu hoàn tất
              </p>
              <p className="text-xs text-green-700">
                Sao lưu tự động thành công
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <Users className="w-6 h-6" />
              Quản lý người dùng
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <BookOpen className="w-6 h-6" />
              Tạo khóa học
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <Activity className="w-6 h-6" />
              Xem báo cáo
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <Settings className="w-6 h-6" />
              Cài đặt hệ thống
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default AdminDashboard;
