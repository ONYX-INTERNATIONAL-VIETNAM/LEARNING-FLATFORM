"use client";

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mock = Array.from({ length: 12 }).map((_, i) => ({
  month: `T${i + 1}`,
  active: Math.round(200 + Math.random() * 300),
}));

export default function ActiveUsersChart() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Người dùng hoạt động theo tháng</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mock}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="active" stroke="#2563eb" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
