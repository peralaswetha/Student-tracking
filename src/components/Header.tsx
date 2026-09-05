import React, { useState } from 'react';
import { 
  GraduationCap, 
  ChevronDown, 
  Bell, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Smartphone, 
  Monitor, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import type { StudentProfile } from '../types';

interface HeaderProps {
  student: StudentProfile;
  selectedSemester: number;
  onSemesterChange: (sem: number) => void;
  timerSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  viewMode: 'desktop' | 'mobile';
  onToggleViewMode: () => void;
  backlogCount: number;
  pendingAssignmentCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  selectedSemester,
  onSemesterChange,
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  viewMode,
  onToggleViewMode,
  backlogCount,
  pendingAssignmentCount
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSemDropdown, setShowSemDropdown] = useState(false);

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? `${hrs}:` : ''}${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalAlerts = backlogCount + (pendingAssignmentCount > 0 ? 1 : 0);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & Student Identity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  StudentSphere
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                {student.institution}
              </p>
            </div>
          </div>

          {/* Mobile Right Quick Action Icons */}
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={onToggleViewMode}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
              title="Toggle View Mode"
            >
              {viewMode === 'desktop' ? <Smartphone className="w-4 h-4 text-indigo-400" /> : <Monitor className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Center & Right Controls */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3">
          
          {/* Semester Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSemDropdown(!showSemDropdown)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-all shadow-sm"
            >
              <span className="text-slate-400 font-normal">Term:</span>
              <span className="text-indigo-300 font-bold">Semester {selectedSemester}</span>
              {selectedSemester === student.currentSemester && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {showSemDropdown && (
              <div className="absolute top-full mt-2 left-0 md:right-0 md:left-auto w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1.5 z-50 backdrop-blur-xl">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-500 border-b border-slate-800/80">
                  Select Academic Term
                </div>
                {[5, 4, 3, 2, 1].map((sem) => (
                  <button
                    key={sem}
                    onClick={() => {
                      onSemesterChange(sem);
                      setShowSemDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                      selectedSemester === sem
                        ? 'bg-indigo-600/20 text-indigo-300 font-semibold border-l-2 border-indigo-500'
                        : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <span>Semester {sem}</span>
                    {sem === student.currentSemester && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">
                        Current
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Live Focus / Study Timer Pill */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl shadow-inner">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isTimerRunning ? 'bg-indigo-400 animate-ping' : 'bg-slate-600'}`} />
              <Clock className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <span className="font-mono text-xs font-bold text-indigo-200 min-w-[55px]">
              {formatTimer(timerSeconds)}
            </span>
            <div className="flex items-center gap-1 pl-1 border-l border-slate-800">
              <button
                onClick={onToggleTimer}
                className={`p-1 rounded-lg transition-all ${
                  isTimerRunning
                    ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30'
                }`}
                title={isTimerRunning ? "Pause Study Timer" : "Start Study Timer"}
              >
                {isTimerRunning ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
              </button>
              <button
                onClick={onResetTimer}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                title="Reset Timer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Notification Center */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 relative transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {totalAlerts > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-bounce">
                  {totalAlerts}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3.5 z-50 backdrop-blur-xl">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-200">System Notifications</span>
                  <span className="text-[10px] text-slate-500 font-mono">{totalAlerts} unread</span>
                </div>
                <div className="space-y-2 mt-2.5">
                  {backlogCount > 0 && (
                    <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <div className="font-semibold text-rose-300">Active Arrear Clearance</div>
                        <p className="text-slate-400 text-[11px] mt-0.5">
                          CS302 Digital Electronics exam in 43 days. Hall ticket HT-2026-09412 ready.
                        </p>
                      </div>
                    </div>
                  )}
                  {pendingAssignmentCount > 0 && (
                    <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <div className="font-semibold text-indigo-300">Assignment Deadline</div>
                        <p className="text-slate-400 text-[11px] mt-0.5">
                          Raft Consensus Protocol simulation is due tomorrow at 11:59 PM.
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-semibold text-slate-300">Internal Marks Published</div>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Database Internals IA-2 marks (19/20) updated.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop/Mobile View Switcher Toggle */}
          <button
            onClick={onToggleViewMode}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 transition-all"
            title="Preview Layout Form Factor"
          >
            {viewMode === 'desktop' ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mobile Preview</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                <span>Desktop Grid</span>
              </>
            )}
          </button>

          {/* Student Profile Quick Badge */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/30"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-200">{student.name}</div>
              <div className="text-[10px] font-mono text-slate-400">{student.rollNumber}</div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
