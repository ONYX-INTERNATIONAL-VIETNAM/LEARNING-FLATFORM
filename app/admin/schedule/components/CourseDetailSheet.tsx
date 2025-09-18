"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, GraduationCap, ListChecks, Tags, Users } from "lucide-react";
import type { Course, Session, Teacher } from "../lib/types";
import { fmtDate, fmtRange } from "../lib/utils";
import { courseMeta } from "../lib/courseMeta";

type Props = {
  open: boolean;
  onOpenChange: (b: boolean) => void;
  courseId: string | null;

  weekDays: Date[];
  dayBuckets: Session[][];
  courses: Course[];
  teachers: Teacher[];
};

export default function CourseDetailSheet({
  open, onOpenChange, courseId, dayBuckets, courses, teachers,
}: Props) {
  const meta = courseId ? courseMeta[courseId] : undefined;
  const courseName =
    courseId ? (courses.find((c) => c.id === courseId)?.name ?? "Khóa học") : "Khóa học";

  // gom session của khóa trong tuần
  const sessions = React.useMemo(() => {
    if (!courseId) return [];
    return dayBuckets
      .flat()
      .filter((s) => s.courseId === courseId)
      .sort((a, b) => +new Date(a.startISO) - +new Date(b.startISO));
  }, [courseId, dayBuckets]);

  const teacherNames = React.useMemo(() => {
    const ids = Array.from(new Set(sessions.map((s) => s.teacherId)));
    return ids
      .map((id) => teachers.find((t) => t.id === id)?.name)
      .filter(Boolean) as string[];
  }, [sessions, teachers]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[520px] sm:w-[640px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">{courseName}</SheetTitle>
          <SheetDescription>
            Thông tin chi tiết khóa học & lịch dạy trong tuần.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-6">
          {/* Meta */}
          <section className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span>{meta?.level ?? "—"}</span>
              <Clock className="h-4 w-4 ml-3" />
              <span>{meta?.durationHours ? `${meta.durationHours} giờ` : "—"}</span>
              <BookOpen className="h-4 w-4 ml-3" />
              <span>{meta?.lessons ? `${meta.lessons} bài` : "—"}</span>
            </div>

            {meta?.tags?.length ? (
              <div className="flex flex-wrap gap-1">
                {meta.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="rounded-md">
                    {t}
                  </Badge>
                ))}
              </div>
            ) : null}

            <p className="text-sm text-muted-foreground leading-relaxed">
              {meta?.description ?? "Chưa có mô tả cho khóa học này."}
            </p>
          </section>

          {/* Outcomes / Prereq */}
          {(meta?.outcomes?.length || meta?.prerequisites?.length) ? (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meta?.outcomes?.length ? (
                <div>
                  <div className="flex items-center gap-2 mb-2 font-medium">
                    <ListChecks className="h-4 w-4" />
                    Kết quả đạt được
                  </div>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {meta.outcomes.map((o, i) => (
                      <li key={i}>{o}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {meta?.prerequisites?.length ? (
                <div>
                  <div className="flex items-center gap-2 mb-2 font-medium">
                    <Tags className="h-4 w-4" />
                    Yêu cầu đầu vào
                  </div>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {meta.prerequisites.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ) : null}

          {/* GV tuần này */}
          <section className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <Users className="h-4 w-4" />
              Giảng viên tuần này
            </div>
            <div className="text-sm text-muted-foreground">
              {teacherNames.length ? teacherNames.join(", ") : "—"}
            </div>
          </section>

          {/* Lịch tuần */}
          <section className="space-y-2">
            <div className="font-medium">Lịch dạy trong tuần</div>
            {sessions.length ? (
              <ul className="text-sm space-y-2">
                {sessions.map((s) => (
                  <li key={s.id} className="rounded-md border p-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{s.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {fmtDate(new Date(s.startISO))} — {fmtRange(s.startISO, s.endISO)}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {teachers.find((t) => t.id === s.teacherId)?.name} • {s.mode}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-muted-foreground">
                Không có buổi nào của khóa trong tuần này.
              </div>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
