"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { course: "Toán 1", enroll: 120 },
  { course: "Khoa học 2", enroll: 98 },
  { course: "Tiếng Anh", enroll: 156 },
  { course: "Địa lý", enroll: 72 },
  { course: "Lập trình", enroll: 80 },
];

export default function EnrollmentChart() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Ghi danh theo khóa học (Top 5)</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="course" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="enroll" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
