"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export default function SecuritySettingsPage() {
  const [form, setForm] = useState({
    strongPassword: true,
    minPasswordLength: 8,
    requireSpecialChar: true,
    maxLoginAttempts: 5,
    enable2FA: false,
    sessionTimeout: 30, // phút
  });

  const [ipWhitelist, setIpWhitelist] = useState<string[]>(["192.168.1.10"]);
  const [newIp, setNewIp] = useState("");

  const handleSave = () => {
    console.log("Security settings:", form, ipWhitelist);
    toast.success("Đã lưu cài đặt bảo mật");
  };

  const handleAddIp = () => {
    if (newIp && !ipWhitelist.includes(newIp)) {
      setIpWhitelist([...ipWhitelist, newIp]);
      setNewIp("");
      toast.success("Đã thêm IP whitelist");
    }
  };

  const handleDeleteIp = (ip: string) => {
    setIpWhitelist(ipWhitelist.filter((item) => item !== ip));
    toast.success("Đã xóa IP");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Cài đặt bảo mật</h1>
      <p className="text-gray-600 text-sm">
        Quản lý mật khẩu, 2FA, session, whitelist IP và các chính sách bảo mật.
      </p>

      {/* Chính sách mật khẩu */}
      <Card>
        <CardHeader>
          <CardTitle>Chính sách mật khẩu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border p-3 rounded-md">
            <span>Bắt buộc mật khẩu mạnh</span>
            <Switch
              checked={form.strongPassword}
              onCheckedChange={(v) => setForm({ ...form, strongPassword: v })}
            />
          </div>
          <div className="space-y-2">
            <Label>Độ dài tối thiểu</Label>
            <Input
              type="number"
              value={form.minPasswordLength}
              onChange={(e) =>
                setForm({ ...form, minPasswordLength: Number(e.target.value) })
              }
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>
          <div className="flex items-center justify-between border p-3 rounded-md">
            <span>Bắt buộc ký tự đặc biệt</span>
            <Switch
              checked={form.requireSpecialChar}
              onCheckedChange={(v) => setForm({ ...form, requireSpecialChar: v })}
            />
          </div>
          <div className="space-y-2">
            <Label>Số lần đăng nhập sai tối đa</Label>
            <Input
              type="number"
              value={form.maxLoginAttempts}
              onChange={(e) =>
                setForm({ ...form, maxLoginAttempts: Number(e.target.value) })
              }
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* 2FA & Session */}
      <Card>
        <CardHeader>
          <CardTitle>Xác thực & Session</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border p-3 rounded-md">
            <span>Bật xác thực 2 lớp (2FA)</span>
            <Switch
              checked={form.enable2FA}
              onCheckedChange={(v) => setForm({ ...form, enable2FA: v })}
            />
          </div>
          <div className="space-y-2">
            <Label>Thời gian session (phút)</Label>
            <Input
              type="number"
              value={form.sessionTimeout}
              onChange={(e) =>
                setForm({ ...form, sessionTimeout: Number(e.target.value) })
              }
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* IP Whitelist */}
      <Card>
        <CardHeader>
          <CardTitle>Whitelist IP</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Nhập IP cần whitelist"
              value={newIp}
              onChange={(e) => setNewIp(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
            <Button onClick={handleAddIp}>
              <Plus className="h-4 w-4 mr-1" /> Thêm
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Địa chỉ IP</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ipWhitelist.map((ip) => (
                <TableRow key={ip}>
                  <TableCell>{ip}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteIp(ip)}
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

      <div className="flex justify-end">
        <Button onClick={handleSave}>Lưu thay đổi</Button>
      </div>
    </div>
  );
}
