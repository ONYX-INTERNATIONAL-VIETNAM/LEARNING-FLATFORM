"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Video } from "lucide-react";
import type { Course, Session, Teacher } from "../lib/types";
import {
  HOUR_END, HOUR_START, ROW_PX,
  clamp, computedStatus, fmtRange,
} from "../lib/utils";

type Props = {
  s: Session;
  dayIndex: number;           // cột ngày hiện tại (0..6)
  weekDays: Date[];
  courses: Course[];
  teachers: Teacher[];
  onEdit: (s: Session) => void;
  onCommitTime: (id: string, nextStartISO: string, nextEndISO: string) => void;
  getDayIndexByClientX: (clientX: number) => number;
  timeAxisPx?: number;
};

const STEP_MIN = 15;          // snap 15'
const MIN_DURATION_MIN = 30;
const HOURS_TOTAL = HOUR_END - HOUR_START;

export default function SessionBlock({
  s, dayIndex, weekDays, courses, teachers,
  onEdit, onCommitTime, getDayIndexByClientX,
}: Props) {
  // vị trí gốc
  const start = new Date(s.startISO);
  const end = new Date(s.endISO);
  const startOffsetMin = (start.getHours() - HOUR_START) * 60 + start.getMinutes();
  const durationMin = Math.max(15, (end.getTime() - start.getTime()) / 60000);
  const baseTop = (startOffsetMin / 60) * ROW_PX;
  const baseHeight = (durationMin / 60) * ROW_PX;

  const [dragging, setDragging] = React.useState<null | {
    mode: "move" | "resizeStart" | "resizeEnd";
    startPointer: { x: number; y: number };
    init: { day: number; startMin: number; durMin: number };
    visual: { day: number; topPx: number; heightPx: number };
  }>(null);

  const snap = (m: number) => Math.round(m / STEP_MIN) * STEP_MIN;
  const clampStart = (m: number) => clamp(m, 0, HOURS_TOTAL * 60 - MIN_DURATION_MIN);
  const clampEnd = (m: number) => clamp(m, MIN_DURATION_MIN, HOURS_TOTAL * 60);

  const buildISO = (day: number, offsetMin: number): string => {
    const base = new Date(weekDays[day]);
    const d = new Date(base.getFullYear(), base.getMonth(), base.getDate(), HOUR_START, 0, 0, 0);
    d.setMinutes(offsetMin);
    return d.toISOString();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>, mode: "move" | "resizeStart" | "resizeEnd") => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
    setDragging({
      mode,
      startPointer: { x: e.clientX, y: e.clientY },
      init: { day: dayIndex, startMin: startOffsetMin, durMin: durationMin },
      visual: { day: dayIndex, topPx: baseTop, heightPx: baseHeight },
    });
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const dyPx = e.clientY - dragging.startPointer.y;
    const dyMin = (dyPx / ROW_PX) * 60;

    let nextDay = dragging.init.day;
    if (dragging.mode === "move") {
      const di = getDayIndexByClientX(e.clientX);
      if (di >= 0) nextDay = di;
    }

    let nextStartMin = dragging.init.startMin;
    let nextDurMin = dragging.init.durMin;

    if (dragging.mode === "move") {
      nextStartMin = clampStart(snap(dragging.init.startMin + dyMin));
    } else if (dragging.mode === "resizeStart") {
      const candidate = snap(dragging.init.startMin + dyMin);
      const maxStart = dragging.init.startMin + dragging.init.durMin - MIN_DURATION_MIN;
      nextStartMin = clamp(candidate, 0, maxStart);
      nextDurMin = dragging.init.durMin + (dragging.init.startMin - nextStartMin);
    } else if (dragging.mode === "resizeEnd") {
      const candidateEnd = snap(dragging.init.startMin + dragging.init.durMin + dyMin);
      const clampedEnd = clampEnd(candidateEnd);
      nextDurMin = Math.max(MIN_DURATION_MIN, clampedEnd - dragging.init.startMin);
    }

    setDragging((prev) =>
      prev && {
        ...prev,
        visual: {
          day: nextDay,
          topPx: (nextStartMin / 60) * ROW_PX,
          heightPx: (nextDurMin / 60) * ROW_PX,
        },
        init: { ...prev.init, startMin: nextStartMin, durMin: nextDurMin },
      }
    );
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);

    const v = dragging.visual;
    const startMin = Math.round((v.topPx / ROW_PX) * 60);
    const durMin = Math.round((v.heightPx / ROW_PX) * 60);

    const nextStartISO = buildISO(v.day, startMin);
    const nextEndISO = buildISO(v.day, startMin + durMin);

    setDragging(null);
    onCommitTime(s.id, nextStartISO, nextEndISO);
  };

  const status = computedStatus(s);
  const baseColor =
    status === "canceled"
      ? "border-rose-300 bg-rose-50"
      : s.mode === "Online"
      ? "border-sky-300 bg-sky-50"
      : "border-emerald-300 bg-emerald-50";

  const topPx = dragging ? dragging.visual.topPx : baseTop;
  const heightPx = dragging ? dragging.visual.heightPx : baseHeight;

  return (
    <div
      className={`absolute left-2 right-2 rounded-lg border shadow-sm transition-shadow ${baseColor} ${
        dragging ? "shadow-md" : "hover:shadow-md"
      }`}
      style={{ top: `${topPx}px`, height: `${heightPx}px`, touchAction: "none" }}
      onPointerDown={(e) => onPointerDown(e, "move")}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="button"
    >
      {/* Top resize handle */}
      <div
        onPointerDown={(e) => { e.stopPropagation(); onPointerDown(e, "resizeStart"); }}
        className="absolute inset-x-1 top-0 h-2 cursor-ns-resize rounded-t-md"
      />

      {/* Content */}
      <div
        className="p-2 h-full flex flex-col gap-1 cursor-grab active:cursor-grabbing select-none"
        onDoubleClick={() => onEdit(s)}
      >
        <div className="flex items-center justify-between">
          <div className="font-medium truncate">{s.title}</div>
          <StatusBadge status={status} />
        </div>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{fmtRange(s.startISO, s.endISO)}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          {s.mode === "Online" ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
          <span className="truncate">
            {s.mode === "Online" ? s.meetingUrl : s.location || "—"}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between text-[11px]">
          <span className="truncate">
            {teachers.find((t) => t.id === s.teacherId)?.name} •{" "}
            {courses.find((c) => c.id === s.courseId)?.name}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {s.enrolled ?? 0}/{s.capacity ?? "-"}
          </span>
        </div>
      </div>

      {/* Bottom resize handle */}
      <div
        onPointerDown={(e) => { e.stopPropagation(); onPointerDown(e, "resizeEnd"); }}
        className="absolute inset-x-1 bottom-0 h-2 cursor-ns-resize rounded-b-md"
      />
    </div>
  );
}

function StatusBadge({ status }: { status: "scheduled" | "completed" | "canceled" }) {
  if (status === "canceled") return <Badge className="bg-rose-600 text-white">canceled</Badge>;
  if (status === "completed") return <Badge className="bg-emerald-600 text-white">completed</Badge>;
  return <Badge className="bg-sky-600 text-white">scheduled</Badge>;
}
