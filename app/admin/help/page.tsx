"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Mail, FileText, LifeBuoy, Send } from "lucide-react";

export default function HelpPage() {
  const [form, setForm] = useState({
    email: "",
    subject: "",
    message: "",
    file: null as File | null,
  });

  const handleSubmit = () => {
    console.log("Support request:", form);
    toast.success("Yêu cầu hỗ trợ đã được gửi thành công ✅");
    setForm({ email: "", subject: "", message: "", file: null });
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Trợ giúp & Hỗ trợ</h1>
      <p className="text-gray-600 text-sm">
        Tài liệu, hướng dẫn và kênh liên hệ hỗ trợ cho quản trị viên và người dùng.
      </p>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Câu hỏi thường gặp (FAQ)</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger>Làm sao để đặt lại mật khẩu người dùng?</AccordionTrigger>
              <AccordionContent>
                Vào mục <strong>Quản lý người dùng</strong>, chọn người cần đặt lại mật khẩu
                và nhấn <em>&quot;Reset password&quot;</em>. Hệ thống sẽ gửi email đặt lại mật khẩu.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>Hệ thống hỗ trợ những phương thức thanh toán nào?</AccordionTrigger>
              <AccordionContent>
                Hiện tại hệ thống hỗ trợ <strong>Stripe, PayPal, VNPay, MoMo</strong>.
                Bạn có thể cấu hình trong phần <em>Cài đặt → Thanh toán</em>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>Làm thế nào để khôi phục dữ liệu từ bản sao lưu?</AccordionTrigger>
              <AccordionContent>
                Vào mục <strong>Sao lưu dữ liệu</strong>, chọn bản backup muốn khôi phục
                và nhấn nút <em>&quot;Khôi phục&quot;</em>. Hệ thống sẽ tự động thực hiện.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Guides */}
      <Card>
        <CardHeader>
          <CardTitle>Hướng dẫn & Tài liệu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <a
              href="/docs/admin-guide.pdf"
              target="_blank"
              className="hover:underline"
            >
            Tài liệu quản trị hệ thống
            </a>
          </div>
          <div className="flex items-center gap-2">
            <LifeBuoy className="h-5 w-5 text-green-600" />
            <a
              href="https://support.example.com"
              target="_blank"
              className="hover:underline"
            >
            Trung tâm hỗ trợ trực tuyến
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-purple-600" />
            <a
              href="mailto:support@example.com"
              className="hover:underline"
            >
              Liên hệ qua email: support@example.com
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Liên hệ hỗ trợ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <Label>Tiêu đề</Label>
            <Input
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Nhập tiêu đề yêu cầu"
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <Label>Nội dung</Label>
            <Textarea
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <Label>File đính kèm (tùy chọn)</Label>
            <Input
              type="file"
              onChange={(e) =>
                setForm({ ...form, file: e.target.files?.[0] || null })
              }
              className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit}>
              <Send className="h-4 w-4 mr-2" /> Gửi yêu cầu
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin hệ thống</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <strong>Phiên bản:</strong> v1.0.0
          </p>
          <p>
            <strong>Uptime:</strong> 12 ngày
          </p>
          <p>
            <strong>Database:</strong> PostgreSQL 16
          </p>
          <p>
            <strong>Liên hệ khẩn:</strong> admin@example.com
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
