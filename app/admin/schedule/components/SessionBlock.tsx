"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Video } from "lucide-react";
import type { Course, Session, Teacher } from "../lib/types";
import {
  HOUR_END,
  HOUR_START,
  ROW_PX,
  clamp,
  computedStatus,
  fmtRange,
} from "../lib/utils";

type Props = {
  s: Session;
  dayIndex: number; // cột ngày 0..6
  weekDays: Date[];
  courses: Course[];
  teachers: Teacher[];
  onEdit: (s: Session) => void;
  onCommitTime: (id: string, nextStartISO: string, nextEndISO: string) => void;
  getDayIndexByClientX: (clientX: number) => number;
  getScrollEl: () => HTMLDivElement | null;
  timeAxisPx?: number;
  onOpenCourse?: (courseId: string) => void;
};

const DEFAULT_STEP = 15;
const FINE_STEP = 5;
const EDGE = 48;
const SCROLL_PER_FRAME = 18;
const DRAG_ACTIVATE_PX = 4;
const MIN_DURATION_MIN = 30;
const HOURS_TOTAL = HOUR_END - HOUR_START;

export default function SessionBlock({
  s,
  dayIndex,
  weekDays,
  courses,
  teachers,
  onEdit,
  onCommitTime,
  getDayIndexByClientX,
  getScrollEl,
  timeAxisPx = 88,
  onOpenCourse,
}: Props) {
  // vị trí gốc
  const start = new Date(s.startISO);
  const end = new Date(s.endISO);
  const startOffsetMin =
    (start.getHours() - HOUR_START) * 60 + start.getMinutes();
  const durationMin = Math.max(15, (end.getTime() - start.getTime()) / 60000);
  const baseTop = (startOffsetMin / 60) * ROW_PX;
  const baseHeight = (durationMin / 60) * ROW_PX;

  type DragState =
    | {
        mode: "move" | "resizeStart" | "resizeEnd";
        startPointer: { x: number; y: number };
        activated: boolean;
        init: { day: number; startMin: number; durMin: number };
        visual: { day: number; topPx: number; heightPx: number };
      }
    | null;

  const [dragging, setDragging] = React.useState<DragState>(null);
  const pendingRef =
    React.useRef<{ topPx: number; heightPx: number; day: number } | null>(
      null
    );
  const rafRef = React.useRef<number | null>(null);

  // ===== helpers =====
  const snapBy = (min: number, e: React.PointerEvent) => {
    if (e.altKey) return min;
    if (e.shiftKey) return Math.round(min / FINE_STEP) * FINE_STEP;
    return Math.round(min / DEFAULT_STEP) * DEFAULT_STEP;
  };
  const clampStart = (m: number) =>
    clamp(m, 0, HOURS_TOTAL * 60 - MIN_DURATION_MIN);
  const clampEnd = (m: number) => clamp(m, MIN_DURATION_MIN, HOURS_TOTAL * 60);

  const buildISO = (day: number, offsetMin: number): string => {
    const base = new Date(weekDays[day]);
    const d = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      HOUR_START,
      0,
      0,
      0
    );
    d.setMinutes(offsetMin);
    return d.toISOString();
  };

  const applyVisualRaf = (next: {
    day: number;
    topPx: number;
    heightPx: number;
  }) => {
    pendingRef.current = next;
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(() => {
        const p = pendingRef.current;
        if (p) setDragging((prev) => (prev ? { ...prev, visual: p } : prev));
        rafRef.current = null;
      });
    }
  };

  // KHÔNG khởi động drag nếu bấm vào phần tử tương tác
  const isInteractive = (el: EventTarget | null) =>
    !!(el && (el as HTMLElement).closest("button,a,input,select,textarea,[role='button'],[data-nodrag]"));

  const startDrag = (
    e: React.PointerEvent<HTMLDivElement>,
    mode: "move" | "resizeStart" | "resizeEnd"
  ) => {
    if (isInteractive(e.target)) return; // <- quan trọng
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
    document.body.style.userSelect = "none";
    document.body.style.cursor = mode === "move" ? "grabbing" : "ns-resize";
    setDragging({
      mode,
      startPointer: { x: e.clientX, y: e.clientY },
      activated: false,
      init: { day: dayIndex, startMin: startOffsetMin, durMin: durationMin },
      visual: { day: dayIndex, topPx: baseTop, heightPx: baseHeight },
    });
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    document.body.style.userSelect = "";
    document.body.style.cursor = "";

    const v = dragging.visual;
    const startMin = Math.round((v.topPx / ROW_PX) * 60);
    const durMin = Math.round((v.heightPx / ROW_PX) * 60);

    setDragging(null);
    pendingRef.current = null;

    const movedDist = Math.hypot(
      dragging.startPointer.x - e.clientX,
      dragging.startPointer.y - e.clientY
    );
    if (movedDist < DRAG_ACTIVATE_PX) return; // coi như click thường

    const nextStartISO = buildISO(v.day, startMin);
    const nextEndISO = buildISO(v.day, startMin + durMin);
    onCommitTime(s.id, nextStartISO, nextEndISO);
  };

  const maybeAutoScroll = (clientY: number) => {
    const scroller = getScrollEl();
    if (!scroller) return;
    const rect = scroller.getBoundingClientRect();
    if (clientY < rect.top + EDGE) scroller.scrollTop -= SCROLL_PER_FRAME;
    else if (clientY > rect.bottom - EDGE) scroller.scrollTop += SCROLL_PER_FRAME;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    maybeAutoScroll(e.clientY);

    const dx = e.clientX - dragging.startPointer.x;
    const dy = e.clientY - dragging.startPointer.y;
    const dist = Math.hypot(dx, dy);
    if (!dragging.activated && dist < DRAG_ACTIVATE_PX) return;
    if (!dragging.activated && dist >= DRAG_ACTIVATE_PX) {
      setDragging((prev) => (prev ? { ...prev, activated: true } : prev));
    }

    const dyMinRaw = (dy / ROW_PX) * 60;
    let nextDay = dragging.init.day;
    if (dragging.mode === "move") {
      const di = getDayIndexByClientX(e.clientX);
      if (di >= 0) nextDay = di;
    }

    let nextStartMin = dragging.init.startMin;
    let nextDurMin = dragging.init.durMin;

    if (dragging.mode === "move") {
      nextStartMin = clampStart(snapBy(dragging.init.startMin + dyMinRaw, e));
    } else if (dragging.mode === "resizeStart") {
      const candidate = snapBy(dragging.init.startMin + dyMinRaw, e);
      const maxStart =
        dragging.init.startMin + dragging.init.durMin - MIN_DURATION_MIN;
      nextStartMin = clamp(candidate, 0, maxStart);
      nextDurMin =
        dragging.init.durMin + (dragging.init.startMin - nextStartMin);
    } else if (dragging.mode === "resizeEnd") {
      const candidateEnd = snapBy(
        dragging.init.startMin + dragging.init.durMin + dyMinRaw,
        e
      );
      const clampedEnd = clampEnd(candidateEnd);
      nextDurMin = Math.max(
        MIN_DURATION_MIN,
        clampedEnd - dragging.init.startMin
      );
    }

    applyVisualRaf({
      day: nextDay,
      topPx: (nextStartMin / 60) * ROW_PX,
      heightPx: (nextDurMin / 60) * ROW_PX,
    });
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

  const liveLabel = React.useMemo(() => {
    if (!dragging) return fmtRange(s.startISO, s.endISO);
    const startMin = Math.round((dragging.visual.topPx / ROW_PX) * 60);
    const durMin = Math.round((dragging.visual.heightPx / ROW_PX) * 60);
    const si = buildISO(dragging.visual.day, startMin);
    const ei = buildISO(dragging.visual.day, startMin + durMin);
    return fmtRange(si, ei);
  }, [dragging, s.startISO, s.endISO]);

  const courseName = courses.find((c) => c.id === s.courseId)?.name ?? "Course";

  return (
    <div
      className={`absolute left-2 right-2 rounded-lg border shadow-sm transition-shadow ${baseColor} ${
        dragging ? "shadow-md" : "hover:shadow-md"
      }`}
      style={{
        top: `${topPx}px`,
        height: `${heightPx}px`,
        touchAction: "none",
        willChange: "top, height",
      }}
      onPointerDown={(e) => startDrag(e, "move")}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="button"
    >
      {/* Top resize handle */}
      <div
        onPointerDown={(e) => {
          e.stopPropagation();
          startDrag(e, "resizeStart");
        }}
        className="absolute inset-x-1 top-0 h-2 md:h-2.5 cursor-ns-resize rounded-t-md"
        style={{ touchAction: "none" }}
      />

      {/* Nội dung */}
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
          <span>{liveLabel}</span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          {s.mode === "Online" ? (
            <Video className="h-3.5 w-3.5" />
          ) : (
            <MapPin className="h-3.5 w-3.5" />
          )}
          <span className="truncate">
            {s.mode === "Online" ? s.meetingUrl : s.location || "—"}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between text-[11px]">
          <span className="truncate">
            {teachers.find((t) => t.id === s.teacherId)?.name} •{" "}
            {onOpenCourse ? (
              <button
                type="button"
                data-nodrag
                className="underline underline-offset-2 decoration-dotted hover:decoration-solid text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                onPointerDown={(e) => {
                  // chặn drag ngay từ pointerdown
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCourse(s.courseId);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    onOpenCourse(s.courseId);
                  }
                }}
                aria-label={`Mở chi tiết khóa ${courseName}`}
                title="Xem chi tiết khóa"
              >
                {courseName}
              </button>
            ) : (
              courseName
            )}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {s.enrolled ?? 0}/{s.capacity ?? "-"}
          </span>
        </div>
      </div>

      {/* Bottom resize handle */}
      <div
        onPointerDown={(e) => {
          e.stopPropagation();
          startDrag(e, "resizeEnd");
        }}
        className="absolute inset-x-1 bottom-0 h-2 md:h-2.5 cursor-ns-resize rounded-b-md"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "scheduled" | "completed" | "canceled";
}) {
  if (status === "canceled")
    return <Badge className="bg-rose-600 text-white">canceled</Badge>;
  if (status === "completed")
    return <Badge className="bg-emerald-600 text-white">completed</Badge>;
  return <Badge className="bg-sky-600 text-white">scheduled</Badge>;
}
