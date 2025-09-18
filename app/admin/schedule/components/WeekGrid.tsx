"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Course, Session, Teacher } from "../lib/types";
import { HOUR_END, HOUR_START, ROW_PX, fmtDate } from "../lib/utils";
import SessionBlock from "./SessionBlock";

type Props = {
  weekDays: Date[];
  dayBuckets: Session[][];
  courses: Course[];
  teachers: Teacher[];
  onEdit: (s: Session) => void;
  onCommitTime: (id: string, nextStartISO: string, nextEndISO: string) => void;
};

const TIME_AXIS_PX = 88;

export default function WeekGrid({
  weekDays,
  dayBuckets,
  courses,
  teachers,
  onEdit,
  onCommitTime,
}: Props) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const getDayIndexByClientX = React.useCallback(
    (clientX: number) => {
      const grid = gridRef.current;
      const scroller = scrollRef.current;
      if (!grid || !scroller) return -1;
      const rect = grid.getBoundingClientRect();
      const scrollLeft = scroller.scrollLeft ?? 0;
      const usableWidth = rect.width - TIME_AXIS_PX;
      if (usableWidth <= 0) return -1;
      const x = clientX - rect.left + scrollLeft - TIME_AXIS_PX;
      const colWidth = usableWidth / 7;
      const idx = Math.floor(x / colWidth);
      if (idx < 0 || idx > 6) return -1;
      return idx;
    },
    []
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Lịch tuần</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Header row */}
        <div
          className="grid rounded-md border bg-muted/60 text-sm font-medium"
          style={{ gridTemplateColumns: `${TIME_AXIS_PX}px repeat(7, minmax(0, 1fr))` }}
        >
          <div className="px-3 py-2">Giờ</div>
          {weekDays.map((d, i) => (
            <div key={i} className="px-2 py-2 text-center">
              {fmtDate(d)}
            </div>
          ))}
        </div>

        {/* Scroll container for both axis + days */}
        <div ref={scrollRef} className="rounded-md border overflow-auto max-h-[640px]">
          <div
            ref={gridRef}
            className="grid relative isolate"
            style={{ gridTemplateColumns: `${TIME_AXIS_PX}px repeat(7, minmax(0, 1fr))` }}
          >
            {/* Sticky time axis */}
            <div className="relative sticky left-0 top-0 z-50 bg-background border-r">
              <div
                className="relative"
                style={{ height: (HOUR_END - HOUR_START) * ROW_PX }}
              >
                {Array.from({ length: HOUR_END - HOUR_START + 1 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute -translate-y-1/2 text-[11px] text-muted-foreground px-3"
                    style={{ top: `${i * ROW_PX}px` }}
                  >
                    {String(HOUR_START + i).padStart(2, "0")}:00
                  </div>
                ))}
              </div>
            </div>

            {/* 7 day columns */}
            {weekDays.map((_, di) => (
              <div key={di} className="relative border-l">
                <div
                  className="relative"
                  style={{ height: (HOUR_END - HOUR_START) * ROW_PX }}
                >
                  {/* hour lines */}
                  {Array.from({ length: HOUR_END - HOUR_START + 1 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-full border-t border-dashed border-muted-foreground/30 z-0"
                      style={{ top: `${i * ROW_PX}px` }}
                    />
                  ))}
                  {/* sessions */}
                  <div className="absolute inset-0 z-0">
                    {dayBuckets[di].map((s) => (
                      <SessionBlock
                        key={s.id}
                        s={s}
                        dayIndex={di}
                        weekDays={weekDays}
                        courses={courses}
                        teachers={teachers}
                        onEdit={onEdit}
                        onCommitTime={onCommitTime}
                        getDayIndexByClientX={getDayIndexByClientX}
                        timeAxisPx={TIME_AXIS_PX}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
