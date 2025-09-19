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
import { Input } from "@/components/ui/input";
import {
  Clock,
  Calendar as CalendarIcon,
  GraduationCap,
  Plus,
  Pencil,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import type { CalendarApi } from "@fullcalendar/core";

// ==== Fake Events (initial) ====
const initialEvents = [
  {
    id: "1",
    title: "Toán - Buổi 1",
    start: "2025-10-03T09:00:00",
    end: "2025-10-03T10:30:00",
    course: "math",
    courseName: "Math 101",
    backgroundColor: "#3b82f6",
    type: "Buổi dạy",
  },
  {
    id: "2",
    title: "English A2 Writing",
    start: "2025-10-07T14:00:00",
    end: "2025-10-07T15:30:00",
    course: "english",
    courseName: "English 104",
    backgroundColor: "#22c55e",
    type: "Buổi dạy",
  },
];

interface ScheduleEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  course: string;
  courseName: string;
  backgroundColor: string;
  type: string;
}

const SchedulePage = () => {
  const [events, setEvents] = useState<ScheduleEvent[]>(initialEvents);
  const [courseFilter, setCourseFilter] = useState("all");
  const [calendarView, setCalendarView] = useState("dayGridMonth");
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [newEvent, setNewEvent] = useState<Partial<ScheduleEvent>>({
    title: "",
    start: "",
    end: "",
    course: "math",
    courseName: "",
    backgroundColor: "#3b82f6",
    type: "Buổi dạy",
  });

  const [editEvent, setEditEvent] = useState<Partial<ScheduleEvent> | null>(null);

  const calendarRef = useRef<FullCalendar | null>(null);

  const filteredEvents =
    courseFilter === "all"
      ? events
      : events.filter((e) => e.course === courseFilter);

  useEffect(() => {
    if (calendarRef.current) {
      const api: CalendarApi = calendarRef.current.getApi();
      api.changeView(calendarView);
    }
  }, [calendarView]);

  // Style header FullCalendar
  const styleHeader = () => {
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
    document.querySelectorAll(".fc-toolbar-title").forEach((el) => {
      el.classList.add("text-lg", "font-bold", "text-gray-800", "mx-4");
    });
    document.querySelectorAll(".fc-toolbar-chunk").forEach((chunk) => {
      chunk.classList.add("flex", "items-center", "justify-center", "gap-2");
    });
  };

  // Thêm event mới
  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) return;
    const event: ScheduleEvent = {
      id: Date.now().toString(),
      title: newEvent.title!,
      start: newEvent.start!,
      end: newEvent.end!,
      course: newEvent.course || "other",
      courseName: newEvent.courseName || "Khóa học mới",
      backgroundColor: newEvent.backgroundColor || "#3b82f6",
      type: "Buổi dạy",
    };
    setEvents((prev) => [...prev, event]);
    setOpenCreateDialog(false);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      course: "math",
      courseName: "",
      backgroundColor: "#3b82f6",
      type: "Buổi dạy",
    });
  };

  // Xóa event
  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setSelectedEvent(null);
  };

  // Lưu chỉnh sửa event
  const handleUpdateEvent = () => {
    if (!editEvent || !editEvent.id) return;
    setEvents((prev) =>
      prev.map((e) => (e.id === editEvent.id ? { ...e, ...editEvent } as ScheduleEvent : e))
    );
    setOpenEditDialog(false);
    setSelectedEvent(null);
    setEditEvent(null);
  };

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lịch dạy</h1>
        <Button onClick={() => setOpenCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" /> Thêm buổi dạy
        </Button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        <Select value={calendarView} onValueChange={(val) => setCalendarView(val)}>
          <SelectTrigger className="w-[120px] bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
            <SelectValue placeholder="Chế độ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dayGridMonth">Tháng</SelectItem>
            <SelectItem value="timeGridWeek">Tuần</SelectItem>
            <SelectItem value="timeGridDay">Ngày</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all" onValueChange={(val) => setCourseFilter(val)}>
          <SelectTrigger className="w-[200px] bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm">
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
              click: () => calendarRef.current?.getApi().today(),
            },
          }}
          titleFormat={{ year: "numeric", month: "long" }}
          events={filteredEvents}
          height="auto"
          eventClick={(info) => {
            const event = events.find((e) => e.id === info.event.id);
            if (event) setSelectedEvent(event);
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
                  {new Date(selectedEvent.end).toLocaleString("vi-VN")}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  {selectedEvent.courseName}
                </div>
              </div>
              <DialogFooter className="flex justify-between">
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                >
                  Xóa
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditEvent(selectedEvent);
                    setOpenEditDialog(true);
                  }}
                >
                  <Pencil className="h-4 w-4 mr-2" /> Chỉnh sửa
                </Button>
                <Button variant="secondary" onClick={() => setSelectedEvent(null)}>
                  Đóng
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm buổi dạy mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="title">Tên buổi học</Label>
              <Input
                id="title"
                placeholder="Tên buổi học"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="start">Thời gian bắt đầu</Label>
              <Input
                id="start"
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="end">Thời gian kết thúc</Label>
              <Input
                id="end"
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="course">Tên khóa học</Label>
              <Input
                id="course"
                placeholder="Tên khóa học"
                value={newEvent.courseName}
                onChange={(e) => setNewEvent({ ...newEvent, courseName: e.target.value })}
                className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveEvent}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa buổi dạy</DialogTitle>
          </DialogHeader>
          {editEvent && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="edit-title">Tên buổi học</Label>
                <Input
                  id="edit-title"
                  placeholder="Tên buổi học"
                  value={editEvent.title}
                  onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-start">Thời gian bắt đầu</Label>
                <Input
                  id="edit-start"
                  type="datetime-local"
                  value={editEvent.start}
                  onChange={(e) => setEditEvent({ ...editEvent, start: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-end">Thời gian kết thúc</Label>
                <Input
                  id="edit-end"
                  type="datetime-local"
                  value={editEvent.end}
                  onChange={(e) => setEditEvent({ ...editEvent, end: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-course">Tên khóa học</Label>
                <Input
                  id="edit-course"
                  placeholder="Tên khóa học"
                  value={editEvent.courseName}
                  onChange={(e) => setEditEvent({ ...editEvent, courseName: e.target.value })}
                  className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateEvent}>Cập nhật</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchedulePage;
