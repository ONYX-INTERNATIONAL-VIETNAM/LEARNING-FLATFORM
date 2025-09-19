"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Download, Calendar as CalendarIcon } from "lucide-react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    Line,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import { Input } from "@/components/ui/input";
import type { PieLabelRenderProps } from "recharts";

const stats = [
    { title: "Tổng học sinh", value: 120, change: "+8 so với tháng trước" },
    { title: "Lớp đang dạy", value: 6, change: "2 lớp hôm nay" },
    { title: "Giờ dạy tuần này", value: 22, change: "Mục tiêu: 25h" },
    { title: "Tỷ lệ hoàn thành", value: "89%", change: "+5% so với tháng trước" },
];

const attendanceData = [
    { day: "Thứ 2", attendance: 95 },
    { day: "Thứ 3", attendance: 88 },
    { day: "Thứ 4", attendance: 92 },
    { day: "Thứ 5", attendance: 85 },
    { day: "Thứ 6", attendance: 90 },
];

const progressData = [
    { week: "Tuần 1", progress: 60 },
    { week: "Tuần 2", progress: 72 },
    { week: "Tuần 3", progress: 78 },
    { week: "Tuần 4", progress: 85 },
];

const engagementData = [
    { name: "Hoàn thành bài tập", value: 45 },
    { name: "Tham gia thảo luận", value: 30 },
    { name: "Xem tài liệu", value: 15 },
    { name: "Khác", value: 10 },
];
const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#a855f7"];

const studentTable = [
    { id: 1, name: "Nguyễn Văn A", class: "Toán 3A", progress: "85%", status: "Đang học" },
    { id: 2, name: "Trần Thị B", class: "Anh văn 4B", progress: "92%", status: "Hoàn thành" },
    { id: 3, name: "Lê Văn C", class: "Khoa học 5C", progress: "70%", status: "Đang học" },
    { id: 4, name: "Phạm Thị D", class: "Toán 3A", progress: "50%", status: "Cần hỗ trợ" },
];

export default function TeacherReportsPage() {
    const [selectedClass, setSelectedClass] = useState("all");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const filteredStudents =
        selectedClass === "all"
            ? studentTable
            : studentTable.filter((s) => s.class === selectedClass);

    return (
        <div className="p-6 space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Báo cáo giảng dạy</h1>
                    <p className="text-muted-foreground">
                        Theo dõi kết quả lớp học, tiến độ học sinh và mức độ tham gia
                    </p>
                </div>
                <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" /> Xuất báo cáo
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-full lg:w-[200px] bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                        <SelectValue placeholder="Chọn lớp học" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả lớp</SelectItem>
                        <SelectItem value="Toán 3A">Toán 3A</SelectItem>
                        <SelectItem value="Anh văn 4B">Anh văn 4B</SelectItem>
                        <SelectItem value="Khoa học 5C">Khoa học 5C</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <Input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="w-full lg:w-[180px] bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                    />
                    <span className="text-sm text-muted-foreground">đến</span>
                    <Input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="w-full lg:w-[180px] bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                    />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, idx) => (
                    <Card key={idx} className="shadow-sm hover:shadow-md transition">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">{s.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-accent">{s.value}</div>
                            <p className="text-xs text-muted-foreground">{s.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Điểm danh theo ngày</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={attendanceData}>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Tương tác học tập</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={engagementData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    labelLine={false}
                                    label={({ cx = 0, cy = 0, midAngle = 0 as number, innerRadius = 0, outerRadius = 0, percent = 0 }: PieLabelRenderProps) => {
                                        const RADIAN = Math.PI / 180;
                                        const radius = (innerRadius as number) + ((outerRadius as number) - (innerRadius as number)) / 2;
                                        const x = Number(cx) + radius * Math.cos(-(midAngle as number) * RADIAN);
                                        const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);
                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                fill="white"
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                fontSize={12}
                                                fontWeight="bold"
                                            >
                                                {`${(Number(percent ?? 0) * 100).toFixed(0)}%`}
                                            </text>
                                        );
                                    }}
                                >
                                    {engagementData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>

                                <Legend
                                    layout="horizontal"
                                    verticalAlign="bottom"
                                    align="center"
                                    wrapperStyle={{ marginTop: "12px" }}
                                />

                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Tiến độ học sinh theo tuần</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={progressData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="progress" stroke="#22c55e" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Student Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Chi tiết học sinh</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left">Họ tên</th>
                                    <th className="px-4 py-2 text-left">Lớp</th>
                                    <th className="px-4 py-2 text-left">Tiến độ</th>
                                    <th className="px-4 py-2 text-left">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((s) => (
                                    <tr key={s.id} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-2">{s.name}</td>
                                        <td className="px-4 py-2">{s.class}</td>
                                        <td className="px-4 py-2">{s.progress}</td>
                                        <td className="px-4 py-2">{s.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
