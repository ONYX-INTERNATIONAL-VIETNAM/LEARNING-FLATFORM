export type ID = string;

export type Mode = "Online" | "Onsite";
export type SessionStatus = "scheduled" | "completed" | "canceled";

export type Course = { id: ID; name: string };
export type Run = { id: ID; courseId: ID; name: string };
export type Teacher = { id: ID; name: string };

export type Session = {
  id: ID;
  title: string;
  courseId: ID;
  runId: ID;
  teacherId: ID;
  startISO: string;
  endISO: string;
  mode: Mode;
  location?: string;
  meetingUrl?: string;
  capacity?: number;
  enrolled?: number;
  status: SessionStatus;
};
