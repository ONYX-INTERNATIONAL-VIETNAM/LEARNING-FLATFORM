"use client";

import { useState } from "react";
import ReportFilterBar, { ReportFilter } from "@/components/admin/reports/ReportFilterBar";
import StatCards from "@/components/admin/reports/StatCards";
import RevenueChart from "@/components/admin/reports/charts/RevenueChart";
import ExportCSV from "@/components/admin/reports/exports/ExportCSV";
import { DollarSign, CreditCard, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsRevenuePage() {
  const [filter, setFilter] = useState<ReportFilter>({
    from: new Date(Date.now() - 29 * 24 * 3600 * 1000).toISOString().slice(0,10),
    to: new Date().toISOString().slice(0,10),
  });

  const orders = [
    { id: "INV-001", buyer: "Nguyễn Văn A", course: "Toán 1", amount: 299000, date: "2025-09-12" },
    { id: "INV-002", buyer: "Trần Thị B", course: "Tiếng Anh", amount: 399000, date: "2025-09-13" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Báo cáo doanh thu</h1>
        <p className="text-gray-600">Theo dõi doanh thu & đơn hàng</p>
      </div>

      <ReportFilterBar
        value={filter}
        onChange={setFilter}
        extras={<ExportCSV getData={() => orders} filename="orders.csv" />}
      />

      <StatCards
        items={[
          { title: "Doanh thu (tháng)", value: "₫ 126,4M", icon: <DollarSign className="w-4 h-4 text-gray-400" /> },
          { title: "Đơn hàng", value: "342", icon: <CreditCard className="w-4 h-4 text-gray-400" /> },
          { title: "ARPU", value: "₫ 38,900", icon: <Users className="w-4 h-4 text-gray-400" /> },
          { title: "Tăng trưởng", value: "+12% MoM" },
        ]}
      />

      <RevenueChart />

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Đơn hàng gần đây</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Mã đơn", "Người mua", "Khóa học", "Số tiền", "Ngày"].map((h) => (
                  <th key={h} className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-mono text-sm">{o.id}</td>
                  <td className="px-4 py-2">{o.buyer}</td>
                  <td className="px-4 py-2">{o.course}</td>
                  <td className="px-4 py-2">₫ {o.amount.toLocaleString("vi-VN")}</td>
                  <td className="px-4 py-2">{new Date(o.date).toLocaleDateString("vi-VN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
