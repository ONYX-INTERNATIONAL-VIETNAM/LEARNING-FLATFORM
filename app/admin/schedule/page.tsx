"use client";

import * as React from "react";
import { toast } from "sonner";

import ScheduleHeader from "./components/ScheduleHeader";
import ScheduleFilters from "./components/ScheduleFilters";
import WeekGrid from "./components/WeekGrid";
import UpcomingTable from "./components/UpcomingTable";
import EditSessionDialog from "./components/EditSessionDialog";

import { courses, runs, teachers, mockSessions } from "./lib/mock";
import {
  addDays,
  computedStatus,
  startOfWeek,
  withinWeek,
} from "./lib/utils";
import type { Mode, Session, SessionStatus } from "./lib/types";
import { JSX } from "react";

export default function AdminCalendarPage(): JSX.Element {
  const [weekStart, setWeekStart] = React.useState<Date>(startOfWeek(new Date()));
  const [items, setItems] = React.useState<Session[]>(mockSessions);

  // filters
  const [filterCourse, setFilterCourse] = React.useState<string>("all");
  const [filterRun, setFilterRun] = React.useState<string>("all");
  const [filterTeacher, setFilterTeacher] = React.useState<string>("all");
  const [filterStatus, setFilterStatus] = React.useState<SessionStatus | "all">("all");
  const [filterMode, setFilterMode] = React.useState<Mode | "all">("all");

  const weekDays = React.useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const filtered = React.useMemo(() => {
    return items.filter((s) => {
      if (!withinWeek(s.startISO, weekStart)) return false;
      if (filterCourse !== "all" && s.courseId !== filterCourse) return false;
      if (filterRun !== "all" && s.runId !== filterRun) return false;
      if (filterTeacher !== "all" && s.teacherId !== filterTeacher) return false;
      if (filterMode !== "all" && s.mode !== filterMode) return false;
      if (filterStatus !== "all" && computedStatus(s) !== filterStatus) return false;
      return true;
    });
  }, [items, weekStart, filterCourse, filterRun, filterTeacher, filterMode, filterStatus]);

  // buckets cho WeekGrid
  const dayBuckets = React.useMemo(() => {
    const buckets: Session[][] = Array.from({ length: 7 }, () => []);
    filtered.forEach((s) => {
      const d = new Date(s.startISO);
      const idx = (d.getDay() + 6) % 7; // Mon..Sun -> 0..6
      buckets[idx].push(s);
    });
    buckets.forEach((arr) => arr.sort((a, b) => +new Date(a.startISO) - +new Date(b.startISO)));
    return buckets;
  }, [filtered]);

  // CRUD
  function upsertSession(next: Session) {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === next.id);
      if (idx === -1) return [next, ...prev];
      const copy = [...prev];
      copy[idx] = next;
      return copy;
    });
    toast.success("Đã lưu buổi học");
  }
  function cancelSession(idToCancel: string, canceled: boolean) {
    setItems((prev) =>
      prev.map((s) => (s.id === idToCancel ? { ...s, status: canceled ? "canceled" : "scheduled" } : s))
    );
    toast.success(canceled ? "Đã hủy buổi học" : "Đã khôi phục buổi học");
  }
  function exportCSV() {
    const rows = items
      .filter((s) => withinWeek(s.startISO, weekStart))
      .map((s) => ({
        title: s.title,
        course: courses.find((c) => c.id === s.courseId)?.name ?? "",
        run: runs.find((r) => r.id === s.runId)?.name ?? "",
        teacher: teachers.find((t) => t.id === s.teacherId)?.name ?? "",
        start: new Date(s.startISO).toISOString(),
        end: new Date(s.endISO).toISOString(),
        mode: s.mode,
        location: s.location ?? "",
        meetingUrl: s.meetingUrl ?? "",
        capacity: s.capacity ?? "",
        enrolled: s.enrolled ?? "",
        status: computedStatus(s),
      }));
    if (rows.length === 0) {
      toast.message("Không có dữ liệu tuần này để xuất");
      return;
    }
    const header = Object.keys(rows[0]).join(",") + "\n";
    const body = rows.map((r) => Object.values(r).join(",")).join("\n");
    const csv = header + body;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `schedule_${weekStart.toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Đã export CSV lịch tuần");
  }

  // Dialog state
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Session | null>(null);

  const [isRecurring, setIsRecurring] = React.useState(false);
  const [repeatDays, setRepeatDays] = React.useState<boolean[]>([false, true, false, false, true, false, false]);
  const [repeatUntil, setRepeatUntil] = React.useState<string>("");

  function onEdit(s: Session) {
    setEditing(s);
    setIsRecurring(false);
    setRepeatDays([false, false, false, false, false, false, false]);
    setRepeatUntil("");
    setOpen(true);
  }

  function onCreateNew(prefill?: Partial<Session>) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0, 0);
    const base: Session = {
      id: Math.random().toString(36).slice(2, 10),
      title: prefill?.title ?? "New Session",
      courseId: prefill?.courseId ?? courses[0].id,
      runId: prefill?.runId ?? runs[0].id,
      teacherId: prefill?.teacherId ?? teachers[0].id,
      startISO: (prefill?.startISO ? new Date(prefill.startISO) : start).toISOString(),
      endISO: (prefill?.endISO ? new Date(prefill.endISO) : end).toISOString(),
      mode: prefill?.mode ?? "Online",
      meetingUrl: prefill?.meetingUrl ?? "",
      location: prefill?.location ?? "",
      capacity: prefill?.capacity ?? 60,
      enrolled: prefill?.enrolled ?? 0,
      status: "scheduled",
    };
    setEditing(base);
    setIsRecurring(false);
    setRepeatDays([false, false, false, false, false, false, false]);
    setRepeatUntil("");
    setOpen(true);
  }

  function handleSave() {
    if (!editing) return;
    if (!editing.title?.trim()) {
      toast.error("Vui lòng nhập tiêu đề buổi học");
      return;
    }
    const s = new Date(editing.startISO);
    const e = new Date(editing.endISO);
    if (e <= s) {
      toast.error("Thời gian kết thúc phải sau thời gian bắt đầu");
      return;
    }

    // save main
    upsertSession(editing);

    // recurrence
    if (isRecurring && repeatUntil) {
      const until = new Date(repeatUntil);
      const created: Session[] = [];
      let day = new Date(s);
      while (day <= until) {
        const idx = (day.getDay() + 6) % 7;
        if (repeatDays[idx]) {
          const startClone = new Date(day);
          startClone.setHours(s.getHours(), s.getMinutes(), 0, 0);
          const endClone = new Date(day);
          endClone.setHours(e.getHours(), e.getMinutes(), 0, 0);
          if (startClone.toISOString() !== editing.startISO) {
            created.push({
              ...editing,
              id: Math.random().toString(36).slice(2, 10),
              startISO: startClone.toISOString(),
              endISO: endClone.toISOString(),
            });
          }
        }
        day = addDays(day, 1);
      }
      if (created.length) {
        setItems((prev) => [...created, ...prev]);
        toast.success(`Đã tạo lặp ${created.length} buổi`);
      }
    }
    setOpen(false);
  }

  function commitTime(id: string, nextStartISO: string, nextEndISO: string) {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, startISO: nextStartISO, endISO: nextEndISO } : x))
    );
  }

  return (
    <div className="p-6 space-y-8">
      <ScheduleHeader onExport={exportCSV} onCreate={() => onCreateNew()} />

      <ScheduleFilters
        weekStart={weekStart}
        setWeekStart={setWeekStart}
        courses={courses}
        runs={runs}
        teachers={teachers}
        filterCourse={filterCourse}
        setFilterCourse={setFilterCourse}
        filterRun={filterRun}
        setFilterRun={setFilterRun}
        filterTeacher={filterTeacher}
        setFilterTeacher={setFilterTeacher}
        filterMode={filterMode}
        setFilterMode={setFilterMode}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <WeekGrid
        weekDays={weekDays}
        dayBuckets={dayBuckets}
        courses={courses}
        teachers={teachers}
        onEdit={onEdit}
        onCommitTime={commitTime}   // kéo–thả/resize commit về đây
      />

      <UpcomingTable
        sessions={filtered}
        courses={courses}
        runs={runs}
        teachers={teachers}
        onEdit={onEdit}
        onToggleCancel={cancelSession}
      />

      <EditSessionDialog
        open={open}
        setOpen={setOpen}
        courses={courses}
        runs={runs}
        teachers={teachers}
        editing={editing}
        setEditing={(s) => s && setEditing(s)}
        isRecurring={isRecurring}
        setIsRecurring={setIsRecurring}
        repeatDays={repeatDays}
        setRepeatDays={setRepeatDays}
        repeatUntil={repeatUntil}
        setRepeatUntil={setRepeatUntil}
        onSave={handleSave}
      />

      {/* Quick FAB */}
      <div className="fixed bottom-6 right-6">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm shadow"
          onClick={() => onCreateNew()}
        >
          + Buổi học
        </button>
      </div>
    </div>
  );
}
