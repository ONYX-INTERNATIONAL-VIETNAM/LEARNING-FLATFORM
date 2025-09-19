"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AssignmentFilters from "./components/AssignmentFilters";
import AssignmentTable, { Assignment } from "./components/AssignmentTable";
import AssignmentForm from "./components/AssignmentForm";

const assignments: Assignment[] = Array.from({ length: 18 }, (_, i) => ({
    id: String(i + 1),
    title: `Bài tập số ${i + 1}`,
    class: i % 2 === 0 ? "Toán 3A" : "Anh văn 4B",
    startDate: "2025-09-10",
    dueDate: "2025-09-17",
    submitted: Math.floor(Math.random() * 20),
    total: 20,
    status: i % 3 === 0 ? "open" : i % 3 === 1 ? "closed" : "grading",
}));

export default function TeacherAssignmentsPage() {
    const [selectedClass, setSelectedClass] = useState("all");
    const [search, setSearch] = useState("");
    const [openDialog, setOpenDialog] = useState(false);


    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Quản lý bài tập</h1>
                    <p className="text-muted-foreground">
                        Tạo, quản lý và chấm điểm bài tập cho học sinh
                    </p>
                </div>
                <Button className="flex items-center gap-2" onClick={() => setOpenDialog(true)}>
                    <Plus className="h-4 w-4" /> Tạo bài tập mới
                </Button>
            </div>

            {/* Filters */}
            <AssignmentFilters
                selectedClass={selectedClass}
                onClassChange={setSelectedClass}
                search={search}
                onSearchChange={setSearch}
            />

            {/* Table */}
            <AssignmentTable data={assignments} />


            {/* Dialog Form */}
            <AssignmentForm open={openDialog} onOpenChange={setOpenDialog} />
        </div>
    );
}
