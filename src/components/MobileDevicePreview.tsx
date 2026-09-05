import React, { useState } from 'react';
import { 
  Home, 
  BarChart2, 
  Clock, 
  CheckSquare, 
  User, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronRight
} from 'lucide-react';
import type { StudentProfile, SemesterData, GpaHistory } from '../types';

interface MobileDevicePreviewProps {
  student: StudentProfile;
  semesterData: SemesterData;
  gpaProgression: GpaHistory[];
  timerSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
}

export const MobileDevicePreview: React.FC<MobileDevicePreviewProps> = ({
  student,
  semesterData,
  gpaProgression,
  timerSeconds,
  isTimerRunning,
  onToggleTimer
}) => {
  const [activeTab, setActiveTab] = useState<'HOME' | 'MARKS' | 'TIMER' | 'TASKS' | 'PROFILE'>('HOME');

  const totalHeld = semesterData.attendance.reduce((sum, item) => sum + item.total, 0);
  const totalAttended = semesterData.attendance.reduce((sum, item) => sum + item.attended, 0);
  const attendancePct = totalHeld > 0 ? ((totalAttended / totalHeld) * 100).toFixed(1) : "0";

  const latestGpa = gpaProgression[gpaProgression.length - 1];

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-6 bg-slate-950/60 rounded-3xl border border-slate-800">
      
      <div className="mb-4 text-center">
        <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/30">
          📱 Native Mobile Simulation (iOS / Android Viewport)
        </span>
      </div>

      {/* Device Frame */}
      <div className="w-full max-w-[390px] h-[780px] bg-slate-900 border-4 border-slate-700 rounded-[44px] shadow-2xl overflow-hidden flex flex-col relative ring-1 ring-slate-600/50">
        
        {/* Dynamic Island / Notch */}
        <div className="bg-slate-950 pt-3 pb-2 px-6 flex items-center justify-between z-20">
          <span className="text-xs font-mono font-bold text-slate-300">09:41</span>
          <div className="w-24 h-4 bg-slate-800 rounded-full" />
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950 text-slate-100">
          
          {/* TAB 1: HOME / SMART GLANCE */}
          {activeTab === 'HOME' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Profile Card */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-11 h-11 rounded-2xl object-cover ring-2 ring-indigo-500"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{student.name}</h3>
                    <p className="text-[11px] text-slate-400 font-mono">Sem {student.currentSemester} • CGPA {student.currentCgpa}</p>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                  Active
                </span>
              </div>

              {/* Backlog Alert if any */}
              {semesterData.backlogs.length > 0 && (
                <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-2xl flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-rose-300">Backlog Notice: {semesterData.backlogs[0].subjectCode}</div>
                    <div className="text-[11px] text-slate-400">Exam: {semesterData.backlogs[0].examDate} (43d left)</div>
                  </div>
                </div>
              )}

              {/* Attendance Hero Widget */}
              <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Attendance Score</span>
                  <div className="text-2xl font-extrabold font-mono text-emerald-400 mt-0.5">{attendancePct}%</div>
                  <span className="text-[11px] text-slate-400">{totalAttended}/{totalHeld} lectures</span>
                </div>
                <div className="w-16 h-16 relative flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="3.8"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3.8"
                      strokeDasharray={`${attendancePct}, 100`}
                    />
                  </svg>
                  <ShieldCheck className="w-5 h-5 text-emerald-400 absolute" />
                </div>
              </div>

              {/* Focus Quick Session */}
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div className="text-xs font-bold text-indigo-200">Study Session</div>
                    <div className="text-xs font-mono text-slate-300">{formatTimer(timerSeconds)}</div>
                  </div>
                </div>
                <button
                  onClick={onToggleTimer}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
              </div>

              {/* Upcoming Deliverables Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Imminent Deadlines</span>
                  <span className="text-indigo-400 text-[11px]">View all</span>
                </div>
                {semesterData.assignments.slice(0, 2).map((a) => (
                  <div key={a.id} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/80 px-1.5 py-0.5 rounded">
                        {a.subjectCode}
                      </span>
                      <h4 className="text-xs font-semibold text-slate-200 mt-1">{a.title}</h4>
                      <p className="text-[10px] text-amber-400 mt-0.5">{a.dueDate}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MARKS & ACADEMICS */}
          {activeTab === 'MARKS' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-100">Marks & Benchmark</h3>
                <span className="text-xs font-mono text-emerald-400">SGPA: {latestGpa.sgpa}</span>
              </div>

              <div className="space-y-3">
                {semesterData.marks.map((sub) => (
                  <div key={sub.subjectId} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">{sub.code}</span>
                      <span className="font-mono text-indigo-300 font-bold">{sub.totalInternalScore} / {sub.maxInternalScore}</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                        style={{ width: `${(sub.totalInternalScore / sub.maxInternalScore) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Class Avg: {sub.classAverageTotal}</span>
                      <span className="text-emerald-400 font-medium">{sub.gradeEstimate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FOCUS TIMER */}
          {activeTab === 'TIMER' && (
            <div className="space-y-6 text-center pt-8 animate-in fade-in duration-150">
              <div className="w-48 h-48 mx-auto rounded-full bg-slate-900 border-4 border-indigo-500/40 flex flex-col items-center justify-center shadow-2xl">
                <span className="text-4xl font-extrabold font-mono text-indigo-300">{formatTimer(timerSeconds)}</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Pomodoro Focus</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={onToggleTimer}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-sm shadow-xl shadow-indigo-600/30"
                >
                  {isTimerRunning ? 'Pause Session' : 'Start Focus'}
                </button>
              </div>

              <p className="text-xs text-slate-400 px-6">
                24.5 hrs logged this week. Strong correlation (+0.84) with Semester 5 GPA growth!
              </p>
            </div>
          )}

          {/* TAB 4: TASKS */}
          {activeTab === 'TASKS' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h3 className="text-sm font-bold text-slate-100 mb-2">Assignment Tasks</h3>
              {semesterData.assignments.map((a) => (
                <div key={a.id} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded">
                      {a.subjectCode}
                    </span>
                    <h4 className="text-xs font-bold text-slate-200 mt-1">{a.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{a.dueDate}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                    a.status === 'GRADED' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : a.status === 'SUBMITTED'
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: PROFILE */}
          {activeTab === 'PROFILE' && (
            <div className="space-y-4 text-center pt-4 animate-in fade-in duration-150">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-20 h-20 rounded-3xl mx-auto object-cover ring-4 ring-indigo-500/40"
              />
              <div>
                <h3 className="text-base font-bold text-slate-100">{student.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{student.rollNumber}</p>
                <p className="text-xs text-slate-500">{student.department}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target CGPA</span>
                  <span className="font-mono text-amber-400 font-bold">{student.targetCgpa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current CGPA</span>
                  <span className="font-mono text-emerald-400 font-bold">{student.currentCgpa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Academic Advisor</span>
                  <span className="text-slate-200">{student.advisorName}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Tab Bar Navigation */}
        <div className="bg-slate-900 border-t border-slate-800 py-2 px-4 flex items-center justify-around z-20">
          <button
            onClick={() => setActiveTab('HOME')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${
              activeTab === 'HOME' ? 'text-indigo-400' : 'text-slate-500'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <button
            onClick={() => setActiveTab('MARKS')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${
              activeTab === 'MARKS' ? 'text-indigo-400' : 'text-slate-500'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Marks</span>
          </button>
          <button
            onClick={() => setActiveTab('TIMER')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${
              activeTab === 'TIMER' ? 'text-indigo-400' : 'text-slate-500'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Timer</span>
          </button>
          <button
            onClick={() => setActiveTab('TASKS')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${
              activeTab === 'TASKS' ? 'text-indigo-400' : 'text-slate-500'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Tasks</span>
          </button>
          <button
            onClick={() => setActiveTab('PROFILE')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold ${
              activeTab === 'PROFILE' ? 'text-indigo-400' : 'text-slate-500'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Me</span>
          </button>
        </div>

        {/* Home Indicator bar */}
        <div className="bg-slate-900 pb-1 flex justify-center">
          <div className="w-32 h-1 bg-slate-700 rounded-full" />
        </div>

      </div>

    </div>
  );
};
