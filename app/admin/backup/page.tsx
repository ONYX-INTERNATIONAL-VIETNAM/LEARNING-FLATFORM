"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Download, RefreshCw, Trash2, Database, Plus } from "lucide-react";

export default function BackupSettingsPage() {
  const [form, setForm] = useState({
    autoBackup: true,
    schedule: "daily",
    retention: 7,
    storage: "local",
  });

  const [backups, setBackups] = useState([
    {
      id: 1,
      date: "2025-09-10 02:00",
      size: "120MB",
      status: "Thành công",
    },
    {
      id: 2,
      date: "2025-09-12 02:00",
      size: "125MB",
      status: "Thành công",
    },
    {
      id: 3,
      date: "2025-09-15 02:00",
      size: "128MB",
      status: "Thành công",
    },
  ]);

  const handleSave = () => {
    console.log("Backup settings:", form);
    toast.success("Đã lưu cài đặt sao lưu");
  };

  const handleCreateBackup = () => {
    const newBackup = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      size: "130MB",
      status: "Thành công",
    };
    setBackups([newBackup, ...backups]);
    toast.success("Đã tạo bản sao lưu mới");
  };

  const handleRestore = (id: number) => {
    const backup = backups.find((b) => b.id === id);
    toast.info(`Khôi phục từ bản backup ngày ${backup?.date}...`);
    console.log("Restore backup:", backup);
  };

  const handleDelete = (id: number) => {
    setBackups(backups.filter((b) => b.id !== id));
    toast.success("Đã xóa bản sao lưu");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Quản lý sao lưu dữ liệu</h1>
      <p className="text-gray-600 text-sm">
        Cấu hình và quản lý các bản sao lưu dữ liệu hệ thống
      </p>

      {/* Backup Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt sao lưu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border rounded-md p-3">
            <span>Tự động sao lưu</span>
            <Switch
              checked={form.autoBackup}
              onCheckedChange={(v) => setForm({ ...form, autoBackup: v })}
            />
          </div>

          <div className="space-y-2">
            <Label>Lịch sao lưu</Label>
            <Select
              value={form.schedule}
              onValueChange={(v) => setForm({ ...form, schedule: v })}
            >
              <SelectTrigger className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Hằng ngày</SelectItem>
                <SelectItem value="weekly">Hằng tuần</SelectItem>
                <SelectItem value="monthly">Hằng tháng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Số bản backup giữ lại</Label>
            <Input
              type="number"
              value={form.retention}
              onChange={(e) =>
                setForm({ ...form, retention: Number(e.target.value) })
              }
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
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Local</SelectItem>
                <SelectItem value="s3">Amazon S3</SelectItem>
                <SelectItem value="gcs">Google Cloud Storage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave}>
              <Database className="h-4 w-4 mr-2" /> Lưu cài đặt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Lịch sử backup</CardTitle>
          <Button onClick={handleCreateBackup}>
            <Plus className="h-4 w-4 mr-1" /> Tạo bản sao lưu mới
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày giờ</TableHead>
                <TableHead>Kích thước</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backups.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.date}</TableCell>
                  <TableCell>{b.size}</TableCell>
                  <TableCell>{b.status}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toast.success("Bắt đầu tải xuống...")}
                    >
                      <Download className="h-4 w-4 mr-1" /> Tải xuống
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRestore(b.id)}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" /> Khôi phục
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(b.id)}
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
    </div>
  );
}
