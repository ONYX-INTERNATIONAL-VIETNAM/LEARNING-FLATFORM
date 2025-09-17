import type { Session, SessionStatus } from "./types";

export const HOUR_START = 7 as const;
export const HOUR_END = 22 as const;
export const ROW_PX = 40 as const;

export function fmtDate(d: Date): string {
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  }).format(d);
}
export function fmtTime(d: Date): string {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}
export function fmtRange(sISO: string, eISO: string): string {
  const s = new Date(sISO);
  const e = new Date(eISO);
  return `${fmtTime(s)}–${fmtTime(e)}`;
}

export function startOfWeek(d: Date): Date {
  const day = (d.getDay() + 6) % 7; // Mon=0
  const res = new Date(d);
  res.setHours(0, 0, 0, 0);
  res.setDate(d.getDate() - day);
  return res;
}
export function addDays(d: Date, days: number): Date {
  const res = new Date(d);
  res.setDate(res.getDate() + days);
  return res;
}
export function withinWeek(sISO: string, weekStart: Date): boolean {
  const d = new Date(sISO);
  const ws = startOfWeek(weekStart);
  const we = addDays(ws, 7);
  return d >= ws && d < we;
}
export function dayIndex(d: Date): number {
  return (d.getDay() + 6) % 7;
}
export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
export function computedStatus(session: Session, now: Date = new Date()): SessionStatus {
  if (session.status === "canceled") return "canceled";
  const end = new Date(session.endISO);
  if (end < now) return "completed";
  return "scheduled";
}
export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

// local datetime helpers
export function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}
export function fromLocalInput(local: string): string {
  return new Date(local).toISOString();
}
