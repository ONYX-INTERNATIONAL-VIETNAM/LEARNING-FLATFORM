"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

// icons
import {
  Globe,
  Lock,
  Mail,
  CreditCard,
  BookOpen,
  Palette,
  Server,
  Shield,
  Plus,
  Trash2,
} from "lucide-react";

export default function SystemSettingsPage() {
  const [form, setForm] = useState({
    siteName: "Onyx E-Learning",
    defaultLang: "vi",
    timezone: "Asia/Ho_Chi_Minh",
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPass: "",
    allowRegister: true,
    strongPassword: true,
    enable2FA: false,
    paymentGateway: "stripe",
    currency: "VND",
    defaultCoursePaid: true,
    allowScholarship: true,
    themeColor: "#2563eb",
    maxUploadSize: "100",
    storage: "local",
    logLevel: "info",
  });

  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["manage_users", "manage_courses", "settings"] },
    { id: 2, name: "Teacher", permissions: ["create_course", "grade_students"] },
    { id: 3, name: "Student", permissions: ["enroll_course", "view_content"] },
  ]);

  const handleSave = () => {
    console.log("Save settings:", form);
    toast.success("Cài đặt đã được lưu thành công ✅");
  };

  const handleAddRole = () => {
    const newRole = { id: Date.now(), name: "New Role", permissions: [] as string[] };
    setRoles([...roles, newRole]);
    toast.success("Đã thêm vai trò mới");
  };

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter((r) => r.id !== id));
    toast.success("Đã xóa vai trò");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Cài đặt hệ thống</h1>
      <p className="text-gray-600 text-sm">
        Quản lý toàn bộ cấu hình và tuỳ chỉnh hệ thống e-learning
      </p>

      <Tabs defaultValue="general" className="w-full">
        {/* TabsList responsive */}
        <TabsList className="flex flex-wrap gap-2 overflow-x-auto p-1 rounded-md border">
          <TabsTrigger value="general">
            <Globe className="h-4 w-4 mr-1" /> Chung
          </TabsTrigger>
          <TabsTrigger value="auth">
            <Lock className="h-4 w-4 mr-1" /> Bảo mật
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-1" /> Email
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="h-4 w-4 mr-1" /> Thanh toán
          </TabsTrigger>
          <TabsTrigger value="learning">
            <BookOpen className="h-4 w-4 mr-1" /> Học tập
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-1" /> Giao diện
          </TabsTrigger>
          <TabsTrigger value="system">
            <Server className="h-4 w-4 mr-1" /> Hệ thống
          </TabsTrigger>
          <TabsTrigger value="admin">
            <Shield className="h-4 w-4 mr-1" /> Quản trị
          </TabsTrigger>
        </TabsList>

        {/* Tab: Chung */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tên hệ thống</Label>
                <Input
                  value={form.siteName}
                  onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>Ngôn ngữ mặc định</Label>
                <Select
                  value={form.defaultLang}
                  onValueChange={(v) => setForm({ ...form, defaultLang: v })}
                >
                  <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Múi giờ</Label>
                <Input
                  value={form.timezone}
                  onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Bảo mật */}
        <TabsContent value="auth">
          <Card>
            <CardHeader>
              <CardTitle>Bảo mật & Xác thực</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border rounded-md p-3">
                <span>Cho phép đăng ký tự do</span>
                <Switch
                  checked={form.allowRegister}
                  onCheckedChange={(v) => setForm({ ...form, allowRegister: v })}
                />
              </div>
              <div className="flex items-center justify-between border rounded-md p-3">
                <span>Yêu cầu mật khẩu mạnh</span>
                <Switch
                  checked={form.strongPassword}
                  onCheckedChange={(v) => setForm({ ...form, strongPassword: v })}
                />
              </div>
              <div className="flex items-center justify-between border rounded-md p-3">
                <span>Bật xác thực 2 lớp (2FA)</span>
                <Switch
                  checked={form.enable2FA}
                  onCheckedChange={(v) => setForm({ ...form, enable2FA: v })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Email */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email & SMTP</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>SMTP Host</Label>
                <Input
                  value={form.smtpHost}
                  onChange={(e) => setForm({ ...form, smtpHost: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>SMTP Port</Label>
                <Input
                  value={form.smtpPort}
                  onChange={(e) => setForm({ ...form, smtpPort: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>SMTP Username</Label>
                <Input
                  value={form.smtpUser}
                  onChange={(e) => setForm({ ...form, smtpUser: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>SMTP Password</Label>
                <Input
                  type="password"
                  value={form.smtpPass}
                  onChange={(e) => setForm({ ...form, smtpPass: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Thanh toán */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Cổng thanh toán</Label>
                <Select
                  value={form.paymentGateway}
                  onValueChange={(v) => setForm({ ...form, paymentGateway: v })}
                >
                  <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                    <SelectValue placeholder="Chọn cổng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="vnpay">VNPay</SelectItem>
                    <SelectItem value="momo">MoMo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tiền tệ</Label>
                <Input
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Học tập */}
        <TabsContent value="learning">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt học tập</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border rounded-md p-3">
                <span>Mặc định khóa học trả phí</span>
                <Switch
                  checked={form.defaultCoursePaid}
                  onCheckedChange={(v) => setForm({ ...form, defaultCoursePaid: v })}
                />
              </div>
              <div className="flex items-center justify-between border rounded-md p-3">
                <span>Cho phép học bổng / miễn phí</span>
                <Switch
                  checked={form.allowScholarship}
                  onCheckedChange={(v) => setForm({ ...form, allowScholarship: v })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Giao diện */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Giao diện & Thương hiệu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Màu chủ đạo</Label>
                <Input
                  type="color"
                  value={form.themeColor}
                  onChange={(e) => setForm({ ...form, themeColor: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm w-20 h-10 p-1"
                />
              </div>
              <div className="space-y-2">
                <Label>Logo URL</Label>
                <Input
                  placeholder="https://example.com/logo.png"
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Hệ thống */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình hệ thống</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Giới hạn upload (MB)</Label>
                <Input
                  value={form.maxUploadSize}
                  onChange={(e) => setForm({ ...form, maxUploadSize: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>Lưu trữ</Label>
                <Select
                  value={form.storage}
                  onValueChange={(v) => setForm({ ...form, storage: v })}
                >
                  <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                    <SelectValue placeholder="Chọn storage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="s3">Amazon S3</SelectItem>
                    <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Log level</Label>
                <Select
                  value={form.logLevel}
                  onValueChange={(v) => setForm({ ...form, logLevel: v })}
                >
                  <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                    <SelectValue placeholder="Chọn mức log" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Quản trị */}
        <TabsContent value="admin">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Quản trị hệ thống</CardTitle>
              <Button size="sm" onClick={handleAddRole}>
                <Plus className="h-4 w-4 mr-1" /> Thêm vai trò
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Vai trò</TableHead>
                    <TableHead>Quyền hạn</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <Input
                          value={role.name}
                          onChange={(e) =>
                            setRoles(
                              roles.map((r) =>
                                r.id === role.id
                                  ? { ...r, name: e.target.value }
                                  : r
                              )
                            )
                          }
                          className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={role.permissions.join(", ")}
                          onChange={(e) =>
                            setRoles(
                              roles.map((r) =>
                                r.id === role.id
                                  ? {
                                      ...r,
                                      permissions: e.target.value
                                        .split(",")
                                        .map((p) => p.trim()),
                                    }
                                  : r
                              )
                            )
                          }
                          placeholder="Nhập quyền, cách nhau bằng dấu phẩy"
                          className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteRole(role.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Lưu thay đổi</Button>
      </div>
    </div>
  );
}
