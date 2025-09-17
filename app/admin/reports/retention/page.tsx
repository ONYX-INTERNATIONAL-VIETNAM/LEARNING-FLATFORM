"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { JSX } from "react";

type ChurnPoint = {
  month: string;
  churn: number;
};

type CohortRow = {
  cohort: string;
  w0: number;
  w1: number;
  w2: number;
  w3: number;
  w4: number;
};

// Mock data churn rate theo tháng
const churnData: ChurnPoint[] = [
  { month: "Jan", churn: 12 },
  { month: "Feb", churn: 10 },
  { month: "Mar", churn: 15 },
  { month: "Apr", churn: 8 },
  { month: "May", churn: 11 },
];

// Mock cohort retention (% người dùng quay lại theo tuần)
const cohortData: CohortRow[] = [
  { cohort: "Tuần 1", w0: 100, w1: 60, w2: 45, w3: 35, w4: 28 },
  { cohort: "Tuần 2", w0: 100, w1: 55, w2: 42, w3: 30, w4: 25 },
  { cohort: "Tuần 3", w0: 100, w1: 58, w2: 46, w3: 33, w4: 27 },
  { cohort: "Tuần 4", w0: 100, w1: 62, w2: 50, w3: 36, w4: 30 },
];

export default function RetentionReportPage(): JSX.Element {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Báo cáo Giữ chân</h1>
        <p className="text-gray-600">
          Phân tích cohort retention, churn rate và tỷ lệ quay lại theo tuần/tháng.
        </p>
      </div>

      {/* Cohort Retention Table */}
      <Card>
        <CardHeader>
          <CardTitle>Cohort Retention (theo tuần)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cohort</TableHead>
                  <TableHead>Tuần 0</TableHead>
                  <TableHead>Tuần 1</TableHead>
                  <TableHead>Tuần 2</TableHead>
                  <TableHead>Tuần 3</TableHead>
                  <TableHead>Tuần 4</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cohortData.map((row) => (
                  <TableRow key={row.cohort}>
                    <TableCell className="font-medium">{row.cohort}</TableCell>
                    {(["w0", "w1", "w2", "w3", "w4"] as const).map((key) => {
                      const value = row[key];
                      const intensity = value / 100;
                      return (
                        <TableCell
                          key={key}
                          className="text-center"
                          style={{
                            backgroundColor: `rgba(34,197,94,${intensity})`, // xanh lá gradient
                            color: value > 50 ? "white" : "black",
                          }}
                        >
                          {value}%
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Churn Rate Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Churn Rate theo tháng</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={churnData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="churn"
                stroke="#EF4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
