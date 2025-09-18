"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";

// Mock data
const dauWauMauData = [
  { month: "Jan", dau: 120, wau: 450, mau: 1800 },
  { month: "Feb", dau: 150, wau: 520, mau: 2000 },
  { month: "Mar", dau: 180, wau: 600, mau: 2300 },
  { month: "Apr", dau: 200, wau: 700, mau: 2500 },
  { month: "May", dau: 220, wau: 750, mau: 2700 },
];

const sessionDurationData = [
  { label: "0-5 phút", users: 320 },
  { label: "5-15 phút", users: 450 },
  { label: "15-30 phút", users: 210 },
  { label: "30+ phút", users: 120 },
];

// Heatmap mock data: số giờ học trong ngày (0–23h)
const heatmapData = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => ({
    day,
    hour,
    value: Math.floor(Math.random() * 20),
  }))
).flat();

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function EngagementReportPage() {
  // Heatmap rows by day
  const groupedHeatmap = useMemo(() => {
    return days.map((label, i) => ({
      label,
      values: heatmapData.filter((d) => d.day === i),
    }));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Báo cáo Tương tác
        </h1>
        <p className="text-gray-600">
          Thống kê về hoạt động người dùng, thời lượng học, DAU/WAU/MAU và mức độ
          tương tác theo thời gian.
        </p>
      </div>

      {/* DAU/WAU/MAU */}
      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">DAU / WAU / MAU</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dauWauMauData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="dau" stroke="#4CAF50" />
            <Line type="monotone" dataKey="wau" stroke="#2196F3" />
            <Line type="monotone" dataKey="mau" stroke="#FFC107" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Session duration */}
      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">
          Phân bố thời lượng phiên học
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sessionDurationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Heatmap */}
      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">
          Heatmap hoạt động theo giờ
        </h2>
        <div className="overflow-x-auto">
          <table className="border-collapse text-sm">
            <thead>
              <tr>
                <th className="p-2 border">Day</th>
                {Array.from({ length: 24 }, (_, i) => (
                  <th key={i} className="p-1 border text-center">
                    {i}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groupedHeatmap.map((row, rIdx) => (
                <tr key={rIdx}>
                  <td className="p-1 border font-medium">{row.label}</td>
                  {row.values.map((cell, cIdx) => {
                    return (
                      <td
                        key={cIdx}
                        className="w-6 h-6 border text-center"
                        style={{
                          backgroundColor: `rgba(76, 175, 80, ${
                            cell.value / 20
                          })`,
                          color: cell.value > 12 ? "white" : "black",
                        }}
                      >
                        {cell.value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
