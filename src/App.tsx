import React, { useState, useEffect } from 'react';
import { 
  INITIAL_STUDENT_PROFILE, 
  GPA_PROGRESSION, 
  SEMESTER_DATASET 
} from './mock/data';
import { Header } from './components/Header';
import { BacklogAlert } from './components/BacklogAlert';
import { AttendanceTracker } from './components/AttendanceTracker';
import { MarksBenchmark } from './components/MarksBenchmark';
import { AssignmentKanban } from './components/AssignmentKanban';
import { GpaTrendChart } from './components/GpaTrendChart';
import { StudyTimerLogger } from './components/StudyTimerLogger';
import { MobileDevicePreview } from './components/MobileDevicePreview';
import type { AssignmentItem, StudySession } from './types';

export const App: React.FC = () => {
  // Application State
  const [student] = useState(INITIAL_STUDENT_PROFILE);
  const [selectedSemester, setSelectedSemester] = useState<number>(5);
  const [semesterDataMap, setSemesterDataMap] = useState(SEMESTER_DATASET);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Live Focus Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(1420); // ~23m 40s
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Active Semester Data
  const currentSemesterData = semesterDataMap[selectedSemester] || semesterDataMap[5];

  // Timer Tick Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Handler: Toggle Study Timer
  const handleToggleTimer = () => {
    setIsTimerRunning(prev => !prev);
  };

  // Handler: Reset Study Timer
  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  // Handler: Toggle Backlog Syllabus Topic
  const handleToggleBacklogTopic = (backlogId: string, topicIndex: number) => {
    setSemesterDataMap(prev => {
      const current = { ...prev };
      const semData = current[selectedSemester];
      if (!semData) return prev;

      const updatedBacklogs = semData.backlogs.map(bk => {
        if (bk.id === backlogId) {
          const updatedTopics = [...bk.syllabusTopics];
          updatedTopics[topicIndex] = {
            ...updatedTopics[topicIndex],
            completed: !updatedTopics[topicIndex].completed
          };
          return { ...bk, syllabusTopics: updatedTopics };
        }
        return bk;
      });

      return {
        ...prev,
        [selectedSemester]: {
          ...semData,
          backlogs: updatedBacklogs
        }
      };
    });
  };

  // Handler: Clear / Resolve Backlog (Simulate passing exam)
  const handleClearBacklog = (backlogId: string) => {
    setSemesterDataMap(prev => {
      const current = { ...prev };
      const semData = current[selectedSemester];
      if (!semData) return prev;

      return {
        ...prev,
        [selectedSemester]: {
          ...semData,
          backlogs: semData.backlogs.filter(bk => bk.id !== backlogId)
        }
      };
    });
  };

  // Handler: Simulate Class Attended / Missed
  const handleSimulateClass = (subjectId: string, type: 'ATTEND' | 'MISS') => {
    setSemesterDataMap(prev => {
      const current = { ...prev };
      const semData = current[selectedSemester];
      if (!semData) return prev;

      const updatedAttendance = semData.attendance.map(sub => {
        if (sub.id === subjectId) {
          if (type === 'ATTEND') {
            return { ...sub, attended: sub.attended + 1, total: sub.total + 1 };
          } else {
            return { ...sub, total: sub.total + 1 };
          }
        }
        return sub;
      });

      return {
        ...prev,
        [selectedSemester]: {
          ...semData,
          attendance: updatedAttendance
        }
      };
    });
  };

  // Handler: Reset Simulation
  const handleResetSimulation = () => {
    setSemesterDataMap(SEMESTER_DATASET);
  };

  // Handler: Change Assignment Status
  const handleAssignmentStatusChange = (assignmentId: string, newStatus: AssignmentItem['status']) => {
    setSemesterDataMap(prev => {
      const current = { ...prev };
      const semData = current[selectedSemester];
      if (!semData) return prev;

      const updatedAssignments = semData.assignments.map(a => {
        if (a.id === assignmentId) {
          return { ...a, status: newStatus };
        }
        return a;
      });

      return {
        ...prev,
        [selectedSemester]: {
          ...semData,
          assignments: updatedAssignments
        }
      };
    });
  };

  // Handler: Add New Assignment
  const handleAddAssignment = (newAssignment: Omit<AssignmentItem, 'id'>) => {
    setSemesterDataMap(prev => {
      const current = { ...prev };
      const semData = current[selectedSemester];
      if (!semData) return prev;

      const created: AssignmentItem = {
        ...newAssignment,
        id: `asg-${Date.now()}`
      };

      return {
        ...prev,
        [selectedSemester]: {
          ...semData,
          assignments: [created, ...semData.assignments]
        }
      };
    });
  };

  // Handler: Add Study Session
  const handleAddStudySession = (newSession: Omit<StudySession, 'id'>) => {
    setSemesterDataMap(prev => {
      const current = { ...prev };
      const semData = current[selectedSemester];
      if (!semData) return prev;

      const created: StudySession = {
        ...newSession,
        id: `ss-${Date.now()}`
      };

      return {
        ...prev,
        [selectedSemester]: {
          ...semData,
          studySessions: [created, ...semData.studySessions]
        }
      };
    });
  };

  const pendingAssignmentsCount = currentSemesterData.assignments.filter(a => a.status === 'TODO').length;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. TOP APP HEADER */}
      <Header
        student={student}
        selectedSemester={selectedSemester}
        onSemesterChange={setSelectedSemester}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
        onToggleTimer={handleToggleTimer}
        onResetTimer={handleResetTimer}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(prev => prev === 'desktop' ? 'mobile' : 'desktop')}
        backlogCount={currentSemesterData.backlogs.length}
        pendingAssignmentCount={pendingAssignmentsCount}
      />

      {/* 2. MAIN VIEW CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {viewMode === 'mobile' ? (
          /* MOBILE PHONE SIMULATOR VIEW */
          <MobileDevicePreview
            student={student}
            semesterData={currentSemesterData}
            gpaProgression={GPA_PROGRESSION}
            timerSeconds={timerSeconds}
            isTimerRunning={isTimerRunning}
            onToggleTimer={handleToggleTimer}
          />
        ) : (
          /* DESKTOP RESPONSIVE BENTO GRID VIEW */
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* TERM STATUS / ARCHIVED NOTICE */}
            {selectedSemester !== student.currentSemester && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-md">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  <span>
                    Viewing <strong>Archived Academic Records</strong> for <strong>Semester {selectedSemester} ({currentSemesterData.academicYear})</strong>. All course grades, assignments, and exam credits for this term are officially finalized.
                  </span>
                </div>
                <button
                  onClick={() => setSelectedSemester(student.currentSemester)}
                  className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl font-bold transition-all text-[11px] shrink-0"
                >
                  Return to Active Sem {student.currentSemester} →
                </button>
              </div>
            )}

            {/* BACKLOG ALERT BANNER */}
            <BacklogAlert
              backlogs={currentSemesterData.backlogs}
              onToggleTopic={handleToggleBacklogTopic}
              onClearBacklog={handleClearBacklog}
            />

            {/* TOP ROW: ATTENDANCE & MARKS BENCHMARK */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Attendance Tracker (5 cols on large screens) */}
              <div className="lg:col-span-5">
                <AttendanceTracker
                  attendanceList={currentSemesterData.attendance}
                  onSimulateClass={handleSimulateClass}
                  onResetSimulation={handleResetSimulation}
                />
              </div>

              {/* Marks vs Cohort Average (7 cols on large screens) */}
              <div className="lg:col-span-7">
                <MarksBenchmark
                  marksList={currentSemesterData.marks}
                />
              </div>

            </div>

            {/* MIDDLE ROW: GPA PROGRESSION CURVE & STUDY HOURS CORRELATION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* GPA Progression (6 cols) */}
              <div className="lg:col-span-6">
                <GpaTrendChart
                  history={GPA_PROGRESSION}
                  targetCgpa={student.targetCgpa}
                />
              </div>

              {/* Study Hours & Correlation (6 cols) */}
              <div className="lg:col-span-6">
                <StudyTimerLogger
                  studySessions={currentSemesterData.studySessions}
                  timerSeconds={timerSeconds}
                  isTimerRunning={isTimerRunning}
                  onToggleTimer={handleToggleTimer}
                  onResetTimer={handleResetTimer}
                  onAddStudySession={handleAddStudySession}
                />
              </div>

            </div>

            {/* BOTTOM ROW: ASSIGNMENT PIPELINE & KANBAN (FULL 12 COLS) */}
            <div>
              <AssignmentKanban
                assignments={currentSemesterData.assignments}
                onStatusChange={handleAssignmentStatusChange}
                onAddAssignment={handleAddAssignment}
              />
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>StudentSphere Academic ERP & Intelligence Platform</span>
          <span className="font-mono">Semester {selectedSemester} • Active Session 2025-2026</span>
        </div>
      </footer>

    </div>
  );
};

export default App;
