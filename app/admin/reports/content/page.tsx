"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const completionData = [
  { name: "Bài 1", value: 75 },
  { name: "Bài 2", value: 62 },
  { name: "Bài 3", value: 90 },
];

const ctrData = [
  { day: "Mon", ctr: 2.1 },
  { day: "Tue", ctr: 3.4 },
  { day: "Wed", ctr: 1.9 },
  { day: "Thu", ctr: 4.0 },
  { day: "Fri", ctr: 2.7 },
];

const viewsData = [
  { day: "Mon", views: 120 },
  { day: "Tue", views: 340 },
  { day: "Wed", views: 210 },
  { day: "Thu", views: 420 },
  { day: "Fri", views: 300 },
];

const topContent = [
  { title: "Video: React cơ bản", views: 1200, completion: "82%" },
  { title: "Bài học: Next.js Routing", views: 950, completion: "76%" },
  { title: "Video: PostgreSQL Indexes", views: 870, completion: "65%" },
  { title: "Bài học: GraphQL Queries", views: 650, completion: "71%" },
];

const COLORS = ["#4CAF50", "#2196F3", "#FFC107"];

export default function ContentReportPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Báo cáo Nội dung & Video
        </h1>
        <p className="text-gray-600">
          Hiệu suất bài học, tỷ lệ hoàn thành video, CTR và lượt xem chi tiết.
        </p>
      </div>

      {/* Completion Chart */}
      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Tỷ lệ hoàn thành video</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={completionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {completionData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* CTR Chart */}
      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">
          CTR (Click-through Rate) theo ngày
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={ctrData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="ctr" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Views Chart */}
      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Lượt xem chi tiết</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={viewsData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Top Content */}
      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Top nội dung nổi bật</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nội dung</TableHead>
              <TableHead>Lượt xem</TableHead>
              <TableHead>Tỷ lệ hoàn thành</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topContent.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.views}</TableCell>
                <TableCell>{item.completion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
