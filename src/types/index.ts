export interface StudentProfile {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  currentSemester: number;
  avatar: string;
  email: string;
  currentCgpa: number;
  targetCgpa: number;
  institution: string;
  advisorName: string;
}

export interface SubjectAttendance {
  id: string;
  code: string;
  name: string;
  instructor: string;
  attended: number;
  total: number;
  minRequiredPct: number;
  credits: number;
  history: {
    date: string;
    status: 'PRESENT' | 'ABSENT' | 'EXCUSED';
  }[];
}

export interface AssessmentBreakdown {
  id: string;
  title: string;
  maxScore: number;
  weightage: number;
  studentScore: number;
  classAverage: number;
  classHighest: number;
}

export interface SubjectMarks {
  subjectId: string;
  code: string;
  name: string;
  assessments: AssessmentBreakdown[];
  totalInternalScore: number;
  maxInternalScore: number;
  classAverageTotal: number;
  gradeEstimate: string;
}

export interface AssignmentItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  description: string;
  dueDate: string;
  rawDueDate: string;
  status: 'TODO' | 'IN_PROGRESS' | 'SUBMITTED' | 'GRADED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  maxScore: number;
  scoreAwarded?: number;
  feedback?: string;
  submissionAttachment?: string;
}

export interface GpaHistory {
  semester: number;
  academicYear: string;
  sgpa: number;
  cgpa: number;
  creditsEarned: number;
  totalCredits: number;
  rankInBatch: number;
}

export interface BacklogItem {
  id: string;
  subjectCode: string;
  name: string;
  credits: number;
  failedSemester: number;
  examDate: string;
  registrationStatus: 'REGISTERED' | 'PENDING_PAYMENT' | 'HALL_TICKET_ISSUED';
  hallTicketNumber?: string;
  syllabusTopics: {
    topic: string;
    completed: boolean;
  }[];
  attemptsCount: number;
}

export interface StudySession {
  id: string;
  subjectCode: string;
  durationMinutes: number;
  date: string;
  mode: 'POMODORO' | 'MANUAL' | 'STOPWATCH';
  focusRating: number;
  notes?: string;
}

export interface SemesterData {
  semesterNumber: number;
  academicYear: string;
  attendance: SubjectAttendance[];
  marks: SubjectMarks[];
  assignments: AssignmentItem[];
  backlogs: BacklogItem[];
  studySessions: StudySession[];
}
