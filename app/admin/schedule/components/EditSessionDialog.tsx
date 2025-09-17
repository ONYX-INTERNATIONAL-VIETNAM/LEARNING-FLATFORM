"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { Course, Run, Session, Teacher, Mode } from "../lib/types";
import { fromLocalInput, toLocalInput } from "../lib/utils";

type Props = {
  open: boolean; setOpen: (b: boolean) => void;

  courses: Course[]; runs: Run[]; teachers: Teacher[];

  editing: Session | null; setEditing: (s: Session) => void;

  isRecurring: boolean; setIsRecurring: (b: boolean) => void;

  repeatDays: boolean[]; setRepeatDays: (arr: boolean[]) => void;

  repeatUntil: string; setRepeatUntil: (v: string) => void;

  onSave: () => void;
};

export default function EditSessionDialog({
  open, setOpen,
  courses, runs, teachers,
  editing, setEditing,
  isRecurring, setIsRecurring,
  repeatDays, setRepeatDays,
  repeatUntil, setRepeatUntil,
  onSave,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editing ? "Sửa buổi học" : "Tạo buổi học"}</DialogTitle>
        </DialogHeader>

        {editing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1">
              <Label>Tiêu đề</Label>
              <Input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <Label>Khóa học</Label>
              <Select
                value={editing.courseId}
                onValueChange={(v) => {
                  const firstRun = runs.find((r) => r.courseId === v)?.id ?? editing.runId;
                  setEditing({ ...editing, courseId: v, runId: firstRun });
                }}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Lớp (Run)</Label>
              <Select
                value={editing.runId}
                onValueChange={(v) => setEditing({ ...editing, runId: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {runs
                    .filter((r) => r.courseId === editing.courseId)
                    .map((r) => (
                      <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Giảng viên</Label>
              <Select
                value={editing.teacherId}
                onValueChange={(v) => setEditing({ ...editing, teacherId: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {teachers.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Chế độ</Label>
              <Select
                value={editing.mode}
                onValueChange={(v: Mode) => setEditing({ ...editing, mode: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Onsite">Onsite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Bắt đầu</Label>
                <Input
                  type="datetime-local"
                  value={toLocalInput(editing.startISO)}
                  onChange={(e) =>
                    setEditing({ ...editing, startISO: fromLocalInput(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Kết thúc</Label>
                <Input
                  type="datetime-local"
                  value={toLocalInput(editing.endISO)}
                  onChange={(e) =>
                    setEditing({ ...editing, endISO: fromLocalInput(e.target.value) })
                  }
                />
              </div>
            </div>

            {editing.mode === "Online" ? (
              <div className="md:col-span-2 space-y-1">
                <Label>Meeting URL</Label>
                <Input
                  placeholder="https://..."
                  value={editing.meetingUrl ?? ""}
                  onChange={(e) => setEditing({ ...editing, meetingUrl: e.target.value })}
                />
              </div>
            ) : (
              <div className="md:col-span-2 space-y-1">
                <Label>Địa điểm</Label>
                <Input
                  placeholder="Phòng / Địa chỉ"
                  value={editing.location ?? ""}
                  onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-1">
              <Label>Sức chứa</Label>
              <Input
                type="number"
                value={editing.capacity ?? 0}
                onChange={(e) =>
                  setEditing({ ...editing, capacity: Number(e.target.value || 0) })
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Đã đăng ký</Label>
              <Input
                type="number"
                value={editing.enrolled ?? 0}
                onChange={(e) =>
                  setEditing({ ...editing, enrolled: Number(e.target.value || 0) })
                }
              />
            </div>

            {/* Recurring */}
            <div className="md:col-span-2 border rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">Lặp hàng tuần</div>
                <Switch checked={isRecurring} onCheckedChange={setIsRecurring} />
              </div>
              {isRecurring && (
                <>
                  <div className="text-sm text-muted-foreground">
                    Chọn ngày trong tuần cần lặp (Thứ 2 → Chủ nhật)
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {["T2","T3","T4","T5","T6","T7","CN"].map((lbl, i) => (
                      <Button
                        key={lbl}
                        type="button"
                        variant={repeatDays[i] ? "default" : "outline"}
                        onClick={() => {
                          const next = repeatDays.slice();
                          next[i] = !next[i];
                          setRepeatDays(next);
                        }}
                      >
                        {lbl}
                      </Button>
                    ))}
                  </div>
                  <div>
                    <Label>Đến ngày</Label>
                    <Input
                      type="date"
                      value={repeatUntil}
                      onChange={(e) => setRepeatUntil(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant="secondary">Đóng</Button>
          </DialogClose>
          <Button onClick={onSave}>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
