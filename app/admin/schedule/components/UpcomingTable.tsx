"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, PencilLine, Undo2, XCircle } from "lucide-react";
import { toast } from "sonner";
import type { Course, Run, Session, SessionStatus, Teacher } from "../lib/types";
import { computedStatus, fmtDate, fmtRange } from "../lib/utils";
import { Badge } from "@/components/ui/badge";

type Props = {
  sessions: Session[];
  courses: Course[];
  runs: Run[];
  teachers: Teacher[];
  onEdit: (s: Session) => void;
  onToggleCancel: (id: string, cancel: boolean) => void;
};

export default function UpcomingTable({
  sessions, courses, runs, teachers, onEdit, onToggleCancel
}: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Sắp diễn ra</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thời gian</TableHead>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Khóa/Lớp</TableHead>
              <TableHead>GV</TableHead>
              <TableHead>Chế độ</TableHead>
              <TableHead>Sức chứa</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions
              .slice()
              .sort((a, b) => +new Date(a.startISO) - +new Date(b.startISO))
              .map((s) => {
                const stt: SessionStatus = computedStatus(s);
                return (
                  <TableRow key={s.id}>
                    <TableCell className="whitespace-nowrap">
                      {fmtDate(new Date(s.startISO))} — {fmtRange(s.startISO, s.endISO)}
                    </TableCell>
                    <TableCell className="font-medium">{s.title}</TableCell>
                    <TableCell>
                      {courses.find((c) => c.id === s.courseId)?.name} /{" "}
                      {runs.find((r) => r.id === s.runId)?.name}
                    </TableCell>
                    <TableCell>{teachers.find((t) => t.id === s.teacherId)?.name}</TableCell>
                    <TableCell>{s.mode}</TableCell>
                    <TableCell>{s.enrolled ?? 0}/{s.capacity ?? "-"}</TableCell>
                    <TableCell><StatusBadge status={stt} /></TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => onEdit(s)}>
                        <PencilLine className="mr-2 h-4 w-4" />
                        Sửa
                      </Button>
                      <Button
                        variant={s.status === "canceled" ? "default" : "destructive"}
                        size="sm"
                        onClick={() => onToggleCancel(s.id, s.status !== "canceled")}
                      >
                        {s.status === "canceled" ? (
                          <>
                            <Undo2 className="mr-2 h-4 w-4" />
                            Khôi phục
                          </>
                        ) : (
                          <>
                            <XCircle className="mr-2 h-4 w-4" />
                            Hủy
                          </>
                        )}
                      </Button>
                      {s.meetingUrl ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={async () => {
                            await navigator.clipboard.writeText(s.meetingUrl!);
                            toast.success("Đã sao chép link");
                          }}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy link
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: "scheduled" | "completed" | "canceled" }) {
  if (status === "canceled") return <Badge className="bg-rose-600 text-white">canceled</Badge>;
  if (status === "completed") return <Badge className="bg-emerald-600 text-white">completed</Badge>;
  return <Badge className="bg-sky-600 text-white">scheduled</Badge>;
}
