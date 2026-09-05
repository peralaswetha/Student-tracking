import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Sliders, 
  Plus, 
  Minus, 
  RotateCcw
} from 'lucide-react';
import type { SubjectAttendance } from '../types';

interface AttendanceTrackerProps {
  attendanceList: SubjectAttendance[];
  onSimulateClass: (subjectId: string, type: 'ATTEND' | 'MISS') => void;
  onResetSimulation: () => void;
}

export const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({
  attendanceList,
  onSimulateClass,
  onResetSimulation,
}) => {
  const [showSimulator, setShowSimulator] = useState<boolean>(false);

  // Aggregated Overall Attendance
  const overallStats = useMemo(() => {
    const totalHeld = attendanceList.reduce((sum, item) => sum + item.total, 0);
    const totalAttended = attendanceList.reduce((sum, item) => sum + item.attended, 0);
    const percentage = totalHeld > 0 ? (totalAttended / totalHeld) * 100 : 0;
    const roundedPct = parseFloat(percentage.toFixed(1));

    // Calculate classes needed to achieve safe 80% or safe miss margin
    let neededFor80 = 0;
    let safeToMiss75 = 0;

    if (roundedPct < 80) {
      neededFor80 = Math.max(0, Math.ceil((0.8 * totalHeld - totalAttended) / (1 - 0.8)));
    }
    if (roundedPct >= 75) {
      safeToMiss75 = Math.max(0, Math.floor((totalAttended - 0.75 * totalHeld) / 0.75));
    }

    return {
      totalHeld,
      totalAttended,
      percentage: roundedPct,
      neededFor80,
      safeToMiss75,
      isShortage: roundedPct < 75
    };
  }, [attendanceList]);

  // Color dynamics based on 75% threshold
  const statusColor = useMemo(() => {
    if (overallStats.percentage >= 80) {
      return {
        stroke: '#10B981',
        text: 'text-emerald-400',
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        label: 'Safe Tier (≥80%)'
      };
    }
    if (overallStats.percentage >= 75) {
      return {
        stroke: '#F59E0B',
        text: 'text-amber-400',
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        label: 'Moderate (75%–79%)'
      };
    }
    return {
      stroke: '#EF4444',
      text: 'text-rose-400',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      label: 'Detention Risk (<75%)'
    };
  }, [overallStats.percentage]);

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 md:p-6 backdrop-blur-md flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-slate-700/80 transition-all">
      
      {/* Background radial highlight */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Live Attendance Tracker</h2>
              <p className="text-xs text-slate-400">Institutional 75.0% threshold requirement</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSimulator(!showSimulator)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                showSimulator
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showSimulator ? 'Close Sim' : 'What-If Sim'}</span>
            </button>
            <span className={`text-xs px-2.5 py-1 rounded-xl border font-bold ${statusColor.badge}`}>
              {statusColor.label}
            </span>
          </div>
        </div>

        {/* Circular Progress & Quick Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-6">
          
          {/* Circular SVG Gauge (5 cols) */}
          <div className="sm:col-span-5 flex justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-800/80"
                  fill="transparent"
                />
                {/* Active Progress Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={statusColor.stroke}
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - Math.min(100, overallStats.percentage) / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                  {overallStats.percentage}%
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Aggregate
                </span>
              </div>
            </div>
          </div>

          {/* Key Stat Cards (7 cols) */}
          <div className="sm:col-span-7 grid grid-cols-2 gap-2.5">
            <div className="bg-slate-800/40 border border-slate-800/80 p-3 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Attended Classes</span>
              <span className="text-lg font-mono font-bold text-slate-100">{overallStats.totalAttended}</span>
              <span className="text-[11px] text-slate-500 block">of {overallStats.totalHeld} conducted</span>
            </div>

            <div className="bg-slate-800/40 border border-slate-800/80 p-3 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Minimum Cutoff</span>
              <span className="text-lg font-mono font-bold text-indigo-300">75.0%</span>
              <span className="text-[11px] text-slate-500 block">University Mandate</span>
            </div>

            <div className="col-span-2 bg-slate-950/60 border border-slate-800/90 p-3 rounded-2xl">
              <div className="flex items-start gap-2 text-xs">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-slate-300">
                  {overallStats.percentage >= 80 ? (
                    <span>
                      You have a safe buffer of{' '}
                      <strong className="text-emerald-400 font-bold font-mono">
                        {overallStats.safeToMiss75} {overallStats.safeToMiss75 === 1 ? 'class' : 'classes'}
                      </strong>{' '}
                      before dropping to the 75% cutoff.
                    </span>
                  ) : (
                    <span>
                      Alert: You must attend{' '}
                      <strong className="text-amber-400 font-bold font-mono">
                        {overallStats.neededFor80} consecutive classes
                      </strong>{' '}
                      to enter the safe 80% zone.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* What-If Interactive Simulator Section */}
        {showSimulator && (
          <div className="mb-6 p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-500/20">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-indigo-200">What-If Attendance Predictor</span>
              </div>
              <button
                onClick={onResetSimulation}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Sim</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-300 mt-2">
              Use the <span className="text-emerald-400 font-bold">+ Attend</span> and <span className="text-rose-400 font-bold">+ Miss</span> buttons below on individual subjects to preview how future attendance changes will affect your eligibility!
            </p>
          </div>
        )}

        {/* Subject-Wise Attendance Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Subject Breakdown</span>
            <span>Attended / Total (%)</span>
          </div>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {attendanceList.map((sub) => {
              const subPct = sub.total > 0 ? parseFloat(((sub.attended / sub.total) * 100).toFixed(1)) : 100;
              const isShort = subPct < sub.minRequiredPct;

              return (
                <div 
                  key={sub.id} 
                  className={`p-3 rounded-2xl border transition-all ${
                    isShort 
                      ? 'bg-rose-950/20 border-rose-500/30' 
                      : 'bg-slate-800/30 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-200">{sub.code}</span>
                      <span className="text-slate-400 hidden sm:inline text-[11px]">{sub.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-300">{sub.attended}/{sub.total}</span>
                      <span className={`font-bold ${isShort ? 'text-rose-400' : 'text-emerald-400'}`}>
                        ({subPct}%)
                      </span>
                    </div>
                  </div>

                  {/* Mini Progress Bar */}
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isShort ? 'bg-rose-500' : subPct >= 85 ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${Math.min(100, subPct)}%` }}
                    />
                  </div>

                  {/* Simulator Controls if Active */}
                  {showSimulator && (
                    <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-slate-800/60">
                      <span className="text-[10px] text-slate-400">Simulate:</span>
                      <button
                        onClick={() => onSimulateClass(sub.id, 'ATTEND')}
                        className="px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold flex items-center gap-1 border border-emerald-500/30"
                      >
                        <Plus className="w-3 h-3" /> Attend +1
                      </button>
                      <button
                        onClick={() => onSimulateClass(sub.id, 'MISS')}
                        className="px-2 py-0.5 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[10px] font-bold flex items-center gap-1 border border-rose-500/30"
                      >
                        <Minus className="w-3 h-3" /> Miss +1
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
