"use client";

import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = Array.from({ length: 12 }).map((_, i) => ({
  month: `T${i + 1}`,
  revenue: Math.round(50_000_000 + Math.random() * 120_000_000),
}));

export default function RevenueChart() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Doanh thu theo tháng</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(v: number) => v.toLocaleString("vi-VN")} />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#rev)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
