import { Course, Run, Teacher, Session } from "./types";
import { startOfWeek, uid } from "./utils";

export const courses: Course[] = [
  { id: "c1", name: "React Basics" },
  { id: "c2", name: "Next.js Routing" },
  { id: "c3", name: "PostgreSQL Indexes" },
];

export const runs: Run[] = [
  { id: "r1", courseId: "c1", name: "Run A (Morning)" },
  { id: "r2", courseId: "c1", name: "Run B (Evening)" },
  { id: "r3", courseId: "c2", name: "Run C" },
  { id: "r4", courseId: "c3", name: "Run D" },
];

export const teachers: Teacher[] = [
  { id: "t1", name: "Alice Nguyen" },
  { id: "t2", name: "Bob Tran" },
  { id: "t3", name: "Charlie Pham" },
];

const baseWeek = startOfWeek(new Date());

export const mockSessions: Session[] = [
  {
    id: uid(),
    title: "Intro to Components",
    courseId: "c1",
    runId: "r1",
    teacherId: "t1",
    startISO: new Date(baseWeek.getFullYear(), baseWeek.getMonth(), baseWeek.getDate() + 1, 9, 0, 0).toISOString(),
    endISO:   new Date(baseWeek.getFullYear(), baseWeek.getMonth(), baseWeek.getDate() + 1, 11, 0, 0).toISOString(),
    mode: "Online",
    meetingUrl: "https://example.com/meet/abc",
    capacity: 60,
    enrolled: 48,
    status: "scheduled",
  },
  {
    id: uid(),
    title: "Routing Deep Dive",
    courseId: "c2",
    runId: "r3",
    teacherId: "t2",
    startISO: new Date(baseWeek.getFullYear(), baseWeek.getMonth(), baseWeek.getDate() + 2, 14, 0, 0).toISOString(),
    endISO:   new Date(baseWeek.getFullYear(), baseWeek.getMonth(), baseWeek.getDate() + 2, 16, 30, 0).toISOString(),
    mode: "Onsite",
    location: "Room 402",
    capacity: 30,
    enrolled: 28,
    status: "scheduled",
  },
  {
    id: uid(),
    title: "Index & Query Plan",
    courseId: "c3",
    runId: "r4",
    teacherId: "t3",
    startISO: new Date(baseWeek.getFullYear(), baseWeek.getMonth(), baseWeek.getDate() - 1, 19, 0, 0).toISOString(),
    endISO:   new Date(baseWeek.getFullYear(), baseWeek.getMonth(), baseWeek.getDate() - 1, 21, 0, 0).toISOString(),
    mode: "Online",
    meetingUrl: "https://example.com/meet/xyz",
    capacity: 80,
    enrolled: 65,
    status: "scheduled",
  },
];
