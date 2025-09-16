"use client";

import { useState } from "react";
import ReportFilterBar, { ReportFilter } from "@/components/admin/reports/ReportFilterBar";
import StatCards from "@/components/admin/reports/StatCards";
import { Server, Timer, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const reqData = Array.from({ length: 12 }).map((_, i) => ({
  t: `T${i + 1}`,
  ok: 2000 + Math.round(Math.random() * 1000),
  err: 50 + Math.round(Math.random() * 120),
}));

export default function ReportsSystemPage() {
  const [filter, setFilter] = useState<ReportFilter>({
    from: new Date(Date.now() - 29 * 24 * 3600 * 1000).toISOString().slice(0,10),
    to: new Date().toISOString().slice(0,10),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Báo cáo hệ thống</h1>
        <p className="text-gray-600">Sức khỏe & hiệu năng hệ thống</p>
      </div>

      <ReportFilterBar value={filter} onChange={setFilter} />

      <StatCards
        items={[
          { title: "P95 Response", value: "420ms", hint: "ổn định", icon: <Timer className="w-4 h-4 text-gray-400" /> },
          { title: "Requests/ngày", value: "28,400", icon: <Server className="w-4 h-4 text-gray-400" /> },
          { title: "Error rate", value: "1.8%", icon: <AlertTriangle className="w-4 h-4 text-gray-400" /> },
          { title: "Uptime", value: "99.95%" },
        ]}
      />

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Requests OK vs Error</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reqData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ok" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="err" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
