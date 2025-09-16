"use client";

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];
const data = [
  { name: ">= 80%", value: 45 },
  { name: "50-79%", value: 35 },
  { name: "< 50%", value: 20 },
];

export default function CompletionRateChart() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Phân bố tỉ lệ hoàn thành</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
              {data.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
