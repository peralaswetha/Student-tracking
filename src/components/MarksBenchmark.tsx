import React, { useState } from 'react';
import { 
  BarChart3, 
  Award, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import type { SubjectMarks } from '../types';

interface MarksBenchmarkProps {
  marksList: SubjectMarks[];
}

export const MarksBenchmark: React.FC<MarksBenchmarkProps> = ({ marksList }) => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const toggleExpand = (code: string) => {
    setExpandedSubject(prev => prev === code ? null : code);
  };

  // Aggregated Score
  const aggregateScore = marksList.reduce((acc, curr) => acc + curr.totalInternalScore, 0);
  const aggregateMax = marksList.reduce((acc, curr) => acc + curr.maxInternalScore, 0);
  const aggregatePct = aggregateMax > 0 ? ((aggregateScore / aggregateMax) * 100).toFixed(1) : "0";

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 md:p-6 backdrop-blur-md flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-slate-700/80 transition-all">
      
      {/* Background radial highlight */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Subject-wise Marks vs Cohort Average</h2>
              <p className="text-xs text-slate-400">Continuous Assessment & Internal Exam Analytics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="w-3 h-3 rounded bg-gradient-to-r from-indigo-500 to-indigo-400" />
              <span>Student Score</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-3 h-3 rounded bg-slate-700" />
              <span>Class Avg</span>
            </div>
          </div>
        </div>

        {/* Aggregate Banner */}
        <div className="my-5 p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-800/40 to-slate-900/40 border border-indigo-500/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-300">
              Internal Marks Aggregate: <strong className="text-white font-mono">{aggregateScore} / {aggregateMax} ({aggregatePct}%)</strong>
            </span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold font-mono">
            Top 5% of CSE Cohort
          </span>
        </div>

        {/* Subject Comparison List */}
        <div className="space-y-4">
          {marksList.map((subject) => {
            const isExpanded = expandedSubject === subject.code;
            const diff = subject.totalInternalScore - subject.classAverageTotal;
            const isAhead = diff >= 0;
            const studentPct = (subject.totalInternalScore / subject.maxInternalScore) * 100;
            const avgPct = (subject.classAverageTotal / subject.maxInternalScore) * 100;

            return (
              <div 
                key={subject.code}
                className="p-3.5 rounded-2xl bg-slate-800/30 border border-slate-800 hover:border-slate-700/80 transition-all"
              >
                <div 
                  onClick={() => toggleExpand(subject.code)}
                  className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded-lg border border-indigo-500/30">
                      {subject.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-200">{subject.name}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-100">
                      {subject.totalInternalScore} <span className="text-slate-500 font-normal">/ {subject.maxInternalScore}</span>
                    </span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      isAhead ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {isAhead ? `+${diff.toFixed(1)} vs avg` : `${diff.toFixed(1)} vs avg`}
                    </span>
                    <button className="text-slate-400 hover:text-slate-200">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Comparative Double Bars */}
                <div className="mt-3 space-y-1.5">
                  <div className="relative h-3 bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    {/* Class Avg Ghost Bar */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-slate-700/80 rounded-full"
                      style={{ width: `${avgPct}%` }}
                      title={`Class Average: ${subject.classAverageTotal}/${subject.maxInternalScore}`}
                    />
                    {/* Student Score Bar */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-emerald-400 rounded-full shadow-lg transition-all duration-700"
                      style={{ width: `${studentPct}%` }}
                      title={`Your Score: ${subject.totalInternalScore}/${subject.maxInternalScore}`}
                    />
                  </div>
                </div>

                {/* Assessment Drilldown if Expanded */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 animate-in fade-in duration-150">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Assessment Breakdown
                    </div>
                    {subject.assessments.map((a) => (
                      <div key={a.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                        <span className="text-slate-300 font-medium">{a.title}</span>
                        <div className="flex items-center gap-4 font-mono text-[11px]">
                          <span>Mine: <strong className="text-indigo-300">{a.studentScore}/{a.maxScore}</strong></span>
                          <span className="text-slate-500">Avg: {a.classAverage}</span>
                          <span className="text-emerald-400">Top: {a.classHighest}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
