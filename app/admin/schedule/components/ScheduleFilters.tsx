"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Undo2 } from "lucide-react";
import { toast } from "sonner";
import type { Course, Run, Teacher, SessionStatus, Mode } from "../lib/types";
import { fmtDate, addDays } from "../lib/utils";

type Props = {
  weekStart: Date;
  setWeekStart: (d: Date) => void;

  courses: Course[];
  runs: Run[];
  teachers: Teacher[];

  filterCourse: string; setFilterCourse: (v: string) => void;
  filterRun: string; setFilterRun: (v: string) => void;
  filterTeacher: string; setFilterTeacher: (v: string) => void;
  filterMode: Mode | "all"; setFilterMode: (v: Mode | "all") => void;
  filterStatus: SessionStatus | "all"; setFilterStatus: (v: SessionStatus | "all") => void;
};

export default function ScheduleFilters({
  weekStart, setWeekStart,
  courses, runs, teachers,
  filterCourse, setFilterCourse,
  filterRun, setFilterRun,
  filterTeacher, setFilterTeacher,
  filterMode, setFilterMode,
  filterStatus, setFilterStatus,
}: Props) {
  const runsForCourse = filterCourse === "all"
    ? runs
    : runs.filter(r => r.courseId === filterCourse);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Bộ lọc</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="h-9"
                  onClick={() => setWeekStart(addDays(weekStart, -7))}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Tuần trước
          </Button>
          <div className="px-3 py-2 rounded-md bg-muted text-sm font-medium">
            Bắt đầu: {fmtDate(weekStart)}
          </div>
          <Button variant="outline" className="h-9"
                  onClick={() => setWeekStart(addDays(weekStart, 7))}>
            Tuần sau
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <div className="grow" />
          <Button
            variant="ghost"
            className="h-9"
            onClick={() => {
              setFilterCourse("all");
              setFilterRun("all");
              setFilterTeacher("all");
              setFilterMode("all");
              setFilterStatus("all");
              toast.message("Đã reset bộ lọc");
            }}
          >
            <Undo2 className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div>
            <Label className="mb-1 block">Khóa học</Label>
            <Select
              value={filterCourse}
              onValueChange={(v) => {
                setFilterCourse(v);
                setFilterRun("all");
              }}
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Chọn khóa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {courses.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1 block">Lớp (Run)</Label>
            <Select value={filterRun} onValueChange={setFilterRun}>
              <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Chọn lớp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {runsForCourse.map((r) => (
                  <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1 block">Giảng viên</Label>
            <Select value={filterTeacher} onValueChange={setFilterTeacher}>
              <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Chọn GV" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {teachers.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1 block">Chế độ</Label>
            <Select value={filterMode} onValueChange={(v: Mode | "all") => setFilterMode(v)}>
              <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Online/Onsite" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Onsite">Onsite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1 block">Trạng thái</Label>
            <Select value={filterStatus} onValueChange={(v: SessionStatus | "all") => setFilterStatus(v)}>
              <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="scheduled">scheduled</SelectItem>
                <SelectItem value="completed">completed</SelectItem>
                <SelectItem value="canceled">canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
