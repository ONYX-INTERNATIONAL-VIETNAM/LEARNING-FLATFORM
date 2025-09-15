"use client";

import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import viLocale from "@fullcalendar/core/locales/vi";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Clock,
  Calendar as CalendarIcon,
  GraduationCap,
  Plus,
} from "lucide-react";

// Fake events
const allEvents = [
  {
    id: "1",
    title: "Toán - Buổi 1",
    start: "2025-10-03T09:00:00",
    end: "2025-10-03T10:30:00",
    course: "math",
    courseName: "Math 101",
    backgroundColor: "#3b82f6",
    type: "Sự kiện khóa học",
  },
  {
    id: "2",
    title: "English A2 Writing",
    start: "2025-10-07T14:00:00",
    end: "2025-10-07T15:30:00",
    course: "english",
    courseName: "English 104",
    backgroundColor: "#22c55e",
    type: "Deadline",
  },
  {
    id: "3",
    title: "Khoa học vui",
    start: "2025-10-11T08:00:00",
    end: "2025-10-11T09:30:00",
    course: "science",
    courseName: "Science 202",
    backgroundColor: "#f97316",
    type: "Sự kiện khóa học",
  },
];

const SchedulePage = () => {
  const [courseFilter, setCourseFilter] = useState("all");
  const [calendarView, setCalendarView] = useState("dayGridMonth");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const calendarRef = useRef<FullCalendar | null>(null);

  const filteredEvents =
    courseFilter === "all"
      ? allEvents
      : allEvents.filter((e) => e.course === courseFilter);

  useEffect(() => {
    if (calendarRef.current) {
      const api = (calendarRef.current as any).getApi();
      api.changeView(calendarView);
    }
  }, [calendarView]);

  // Hàm style lại các nút header
  const styleHeader = () => {
    // style buttons
    document.querySelectorAll(".fc-button").forEach((btn) => {
      btn.classList.add(
        "bg-accent",
        "text-white",
        "rounded-md",
        "px-3",
        "py-1",
        "text-sm",
        "font-medium",
        "shadow",
        "hover:bg-accent/80",
        "transition"
      );
    });

    // style title
    document.querySelectorAll(".fc-toolbar-title").forEach((el) => {
      el.classList.add("text-lg", "font-bold", "text-gray-800", "mx-4");
    });

    // ép prev-title-next nằm ngang
    document.querySelectorAll(".fc-toolbar-chunk").forEach((chunk) => {
      chunk.classList.add("flex", "items-center", "justify-center", "gap-2");
    });
  };

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lịch học</h1>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {/* View mode */}
        <Select
          value={calendarView}
          onValueChange={(val) => setCalendarView(val)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Chế độ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dayGridMonth">Tháng</SelectItem>
            <SelectItem value="timeGridWeek">Tuần</SelectItem>
            <SelectItem value="timeGridDay">Ngày</SelectItem>
          </SelectContent>
        </Select>

        {/* Course filter */}
        <Select
          defaultValue="all"
          onValueChange={(val) => setCourseFilter(val)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn khóa học" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả khóa học</SelectItem>
            <SelectItem value="math">Toán</SelectItem>
            <SelectItem value="english">Tiếng Anh</SelectItem>
            <SelectItem value="science">Khoa học</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg shadow p-4">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={calendarView}
          locale={viLocale}
          headerToolbar={{
            left: "",
            center: "prev title next",
            right: "today",
          }}
          customButtons={{
            today: {
              text: "Hôm nay",
              click: () => (calendarRef.current as any).getApi().today(),
            },
          }}
          titleFormat={{ year: "numeric", month: "long" }}
          events={filteredEvents}
          height="auto"
          eventClick={(info) => {
            const event = allEvents.find((e) => e.id === info.event.id);
            setSelectedEvent(event);
          }}
          viewDidMount={styleHeader}
        />
      </div>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <DialogDescription>{selectedEvent.type}</DialogDescription>
              </DialogHeader>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {new Date(selectedEvent.start).toLocaleString("vi-VN")}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  {selectedEvent.type}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  {selectedEvent.courseName}
                </div>
              </div>

              <DialogFooter>
                <Button variant="link" className="ml-auto">
                  Thêm bài nộp
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchedulePage;
