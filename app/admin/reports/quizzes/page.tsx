"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { JSX } from "react";

// ===== Types =====
type ScoreDistribution = { range: string; students: number };
type AverageScoreTrend = { week: string; avg: number };
type QuestionStat = { question: string; correct: number; incorrect: number };
type TopQuiz = { title: string; attempts: number; avgScore: number };

// ===== Mock Data =====
const scoreDistribution: ScoreDistribution[] = [
  { range: "0-20", students: 5 },
  { range: "21-40", students: 12 },
  { range: "41-60", students: 25 },
  { range: "61-80", students: 40 },
  { range: "81-100", students: 18 },
];

const avgScoreTrend: AverageScoreTrend[] = [
  { week: "Tuần 1", avg: 62 },
  { week: "Tuần 2", avg: 68 },
  { week: "Tuần 3", avg: 70 },
  { week: "Tuần 4", avg: 74 },
];

const questionStats: QuestionStat[] = [
  { question: "Q1", correct: 85, incorrect: 15 },
  { question: "Q2", correct: 60, incorrect: 40 },
  { question: "Q3", correct: 72, incorrect: 28 },
  { question: "Q4", correct: 50, incorrect: 50 },
  { question: "Q5", correct: 90, incorrect: 10 },
];

const topQuizzes: TopQuiz[] = [
  { title: "Quiz React Basics", attempts: 120, avgScore: 78 },
  { title: "Quiz Next.js Routing", attempts: 90, avgScore: 71 },
  { title: "Quiz PostgreSQL Indexes", attempts: 75, avgScore: 65 },
  { title: "Quiz GraphQL Fundamentals", attempts: 60, avgScore: 69 },
];

const COLORS = ["#22c55e", "#ef4444"];

// ===== Component =====
export default function QuizzesReportPage(): JSX.Element {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Báo cáo Quiz</h1>
        <p className="text-gray-600">
          Phân tích kết quả quiz: phân bố điểm số, xu hướng điểm trung bình,
          thống kê câu hỏi và top quiz phổ biến.
        </p>
      </div>

      {/* Score Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Phân bố điểm số</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Average Score Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Xu hướng điểm trung bình (theo tuần)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={avgScoreTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avg" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Question Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Thống kê theo câu hỏi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Câu hỏi</TableHead>
                <TableHead>Tỷ lệ đúng</TableHead>
                <TableHead>Tỷ lệ sai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questionStats.map((q) => {
                const total = q.correct + q.incorrect;
                const correctPct = Math.round((q.correct / total) * 100);
                return (
                  <TableRow key={q.question}>
                    <TableCell>{q.question}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="bg-green-500 text-white">{q.correct}%</Badge>
                        <Progress value={correctPct} className="h-2 w-32" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">{q.incorrect}%</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Quizzes */}
      <Card>
        <CardHeader>
          <CardTitle>Top Quiz phổ biến</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên Quiz</TableHead>
                <TableHead>Lượt làm</TableHead>
                <TableHead>Điểm trung bình</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topQuizzes.map((quiz) => (
                <TableRow key={quiz.title}>
                  <TableCell className="font-medium">{quiz.title}</TableCell>
                  <TableCell>{quiz.attempts}</TableCell>
                  <TableCell>{quiz.avgScore}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Overall Correct/Incorrect Pie */}
      <Card>
        <CardHeader>
          <CardTitle>Tỷ lệ đúng/sai toàn hệ thống</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Đúng", value: questionStats.reduce((a, b) => a + b.correct, 0) },
                  { name: "Sai", value: questionStats.reduce((a, b) => a + b.incorrect, 0) },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {COLORS.map((c, i) => (
                  <Cell key={i} fill={c} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
