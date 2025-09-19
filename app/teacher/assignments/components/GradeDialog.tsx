"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface GradeDialogProps {
    open: boolean;
    onOpenChange: (val: boolean) => void;
    student: string;
    currentGrade: number | null;
    onSave: (grade: number | null) => void;
}

export default function GradeDialog({
    open,
    onOpenChange,
    student,
    currentGrade,
    onSave,
}: GradeDialogProps) {
    const [grade, setGrade] = useState<number | "">(currentGrade ?? "");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Chấm điểm cho {student}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 py-2">
                    <Input
                        type="number"
                        value={grade}
                        min={0}
                        max={10}
                        placeholder="Nhập điểm (0 - 10)"
                        onChange={(e) =>
                            setGrade(e.target.value ? Number(e.target.value) : "")
                        }
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Hủy
                    </Button>
                    <Button
                        onClick={() => {
                            onSave(grade === "" ? null : grade);
                            onOpenChange(false);
                            toast.success(`Đã lưu điểm cho ${student}`);
                        }}
                    >
                        Lưu điểm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
