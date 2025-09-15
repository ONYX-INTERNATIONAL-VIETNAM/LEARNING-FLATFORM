export type Status = 'present' | 'absent' | 'late' | 'excused';

export interface Student {
  id: string;
  name: string;
  email?: string;
  status: Status;
}

export type AssignmentType = 'homework' | 'quiz' | 'project' | 'exam';
export type AssignmentStatus = 'published' | 'draft';

export interface Assignment {
  id: string;
  title: string;
  name?: string;
  description: string;
  dueDate: string;
  type: AssignmentType;
  status: AssignmentStatus;
  maxScore: number;
  submissions: number;
  totalStudents: number;
}

export interface StudentGrade {
  id: string;
  name: string;
  email: string;
  assignments: { [key: string]: number | null };
  average: number;
}

export interface GradeData {
  students: StudentGrade[];
  assignments: Assignment[];
}