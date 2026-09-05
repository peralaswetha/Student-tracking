import React, { useState } from 'react';
import { 
  Flame, 
  Play, 
  Pause, 
  Plus, 
  RotateCcw, 
  Zap, 
  Star, 
  X 
} from 'lucide-react';
import type { StudySession } from '../types';

interface StudyTimerLoggerProps {
  studySessions: StudySession[];
  timerSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onAddStudySession: (session: Omit<StudySession, 'id'>) => void;
}

export const StudyTimerLogger: React.FC<StudyTimerLoggerProps> = ({
  studySessions,
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  onAddStudySession
}) => {
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [logSubject, setLogSubject] = useState<string>('CS501');
  const [logMinutes, setLogMinutes] = useState<number>(60);
  const [logRating, setLogRating] = useState<number>(5);
  const [logNotes, setLogNotes] = useState<string>('');

  const weeklyGoalHours = 28.0;
  
  // Calculate total study hours logged from study sessions + live timer
  const totalMinutes = studySessions.reduce((acc, curr) => acc + curr.durationMinutes, 0) + Math.floor(timerSeconds / 60);
  const totalHoursLogged = parseFloat((totalMinutes / 60).toFixed(1));
  const progressPct = Math.min(100, Math.round((totalHoursLogged / weeklyGoalHours) * 100));

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSaveManualLog = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudySession({
      subjectCode: logSubject,
      durationMinutes: Number(logMinutes),
      date: new Date().toISOString().split('T')[0],
      mode: 'MANUAL',
      focusRating: logRating,
      notes: logNotes || "Self-study session"
    });

    setLogNotes('');
    setShowLogModal(false);
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 md:p-6 backdrop-blur-md flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-slate-700/80 transition-all">
      
      {/* Background radial highlight */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Study Hours & Performance Correlation</h2>
              <p className="text-xs text-slate-400">Weekly Target: {weeklyGoalHours} hrs/week</p>
            </div>
          </div>

          <button
            onClick={() => setShowLogModal(true)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Hours</span>
          </button>
        </div>

        {/* Live Timer & Goal Progress Split */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
          
          {/* Active Pomodoro Focus Box */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                Live Focus Clock
              </span>
              <span className={`w-2 h-2 rounded-full ${isTimerRunning ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
            </div>

            <div className="my-3 text-center">
              <span className="text-3xl font-extrabold font-mono text-indigo-300 tracking-tight">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={onToggleTimer}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isTimerRunning
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                }`}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isTimerRunning ? 'Pause Session' : 'Start Focus'}</span>
              </button>
              <button
                onClick={onResetTimer}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                title="Reset session"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Goal Progress Bar */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400">Weekly Goal Progress</span>
                <span className="font-mono text-amber-400 font-bold">{progressPct}%</span>
              </div>
              <div className="text-xl font-extrabold font-mono text-slate-100">
                {totalHoursLogged} <span className="text-xs text-slate-500 font-normal">/ {weeklyGoalHours} hrs</span>
              </div>
            </div>

            <div className="my-2">
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <span className="text-[11px] text-slate-400">
              {(weeklyGoalHours - totalHoursLogged) > 0 ? (
                <span>{(weeklyGoalHours - totalHoursLogged).toFixed(1)} hrs needed to hit weekly study streak</span>
              ) : (
                <span className="text-emerald-400 font-bold">Goal achieved! +350 XP awarded</span>
              )}
            </span>
          </div>

        </div>

        {/* Statistical Academic Correlation Insights */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-800/40 border border-slate-800/80 rounded-2xl">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Study-to-GPA Correlation
            </div>
            <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
              +0.84 (Strong)
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Data shows +4 hrs/week study correlated with +0.32 SGPA lift.
            </p>
          </div>

          <div className="p-3 bg-slate-800/40 border border-slate-800/80 rounded-2xl">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Most Focused Subject
            </div>
            <div className="text-base font-bold font-mono text-indigo-300 mt-0.5">
              CS501 (8.5h)
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Top internal score (36/40) aligns with highest logged focus time.
            </p>
          </div>
        </div>

      </div>

      {/* MANUAL STUDY LOG MODAL */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <form onSubmit={handleSaveManualLog} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100">Log Study Session</h3>
              <button type="button" onClick={() => setShowLogModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Subject</label>
                <select
                  value={logSubject}
                  onChange={(e) => setLogSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                >
                  <option value="CS501">CS501 (Dist Systems)</option>
                  <option value="CS502">CS502 (DB Internals)</option>
                  <option value="CS503">CS503 (Compiler Des)</option>
                  <option value="CS504">CS504 (Networks)</option>
                  <option value="CS505">CS505 (ML Lab)</option>
                  <option value="CS302">CS302 (Backlog Prep)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  min="5"
                  step="5"
                  value={logMinutes}
                  onChange={(e) => setLogMinutes(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Focus Rating (1 - 5)</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setLogRating(star)}
                    className={`p-2 rounded-xl border ${
                      logRating >= star ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-slate-800 text-slate-600 border-slate-700'
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Session Notes</label>
              <input
                type="text"
                placeholder="e.g. Solved 15 practice problems on B-Trees"
                value={logNotes}
                onChange={(e) => setLogNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowLogModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30"
              >
                Save Log
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
