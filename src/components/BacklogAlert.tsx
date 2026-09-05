import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckSquare, 
  Square, 
  FileText, 
  ChevronRight, 
  X, 
  ShieldAlert, 
  Clock, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { BacklogItem } from '../types';

interface BacklogAlertProps {
  backlogs: BacklogItem[];
  onToggleTopic: (backlogId: string, topicIndex: number) => void;
  onClearBacklog?: (backlogId: string) => void;
}

export const BacklogAlert: React.FC<BacklogAlertProps> = ({ 
  backlogs, 
  onToggleTopic,
  onClearBacklog 
}) => {
  const [activeModalBacklog, setActiveModalBacklog] = useState<BacklogItem | null>(null);

  if (!backlogs || backlogs.length === 0) {
    return (
      <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between text-xs text-emerald-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span><strong>Zero Standing Backlogs:</strong> All previous semester course credits cleared!</span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono font-bold">
          Clear Record
        </span>
      </div>
    );
  }

  const primaryBacklog = backlogs[0];
  const completedCount = primaryBacklog.syllabusTopics.filter(t => t.completed).length;
  const totalTopics = primaryBacklog.syllabusTopics.length;
  const readinessPct = Math.round((completedCount / totalTopics) * 100);

  // Calculate days remaining dynamically
  const examDate = new Date(primaryBacklog.examDate);
  const now = new Date("2026-09-05T00:00:00");
  const diffTime = Math.max(0, examDate.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const handleResolve = (id: string) => {
    if (onClearBacklog) {
      onClearBacklog(id);
    }
    setActiveModalBacklog(null);
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-900 border border-rose-500/40 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl shadow-rose-950/30">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start gap-4">
          <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30 shadow-inner mt-0.5 animate-pulse">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500 text-slate-950">
                Backlog Remedial Notice
              </span>
              <span className="text-xs font-mono font-bold text-rose-300">
                {primaryBacklog.subjectCode} — {primaryBacklog.name}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 mt-1.5">
              Semester {primaryBacklog.failedSemester} Arrear. Clearance Supplementary Exam on{' '}
              <strong className="text-white underline decoration-rose-500 underline-offset-4">
                {primaryBacklog.examDate}
              </strong>.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                Hall Ticket: <span className="font-mono text-slate-300">{primaryBacklog.hallTicketNumber}</span>
              </span>
              <span>•</span>
              <span className="text-rose-300 font-medium">
                Revision Readiness: <strong className="text-white font-mono">{readinessPct}%</strong> ({completedCount}/{totalTopics} units)
              </span>
            </div>
          </div>
        </div>

        {/* Right Action & Countdown */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
          <div className="text-left md:text-right">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Exam Countdown</div>
            <div className="text-xl font-mono font-extrabold text-rose-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{diffDays} Days</span>
            </div>
          </div>

          <button
            onClick={() => setActiveModalBacklog(primaryBacklog)}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center gap-1.5"
          >
            <span>Study Checklist</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* SYLLABUS REVISION CHECKLIST MODAL */}
      {activeModalBacklog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    {activeModalBacklog.subjectCode} Syllabus Roadmap
                  </h3>
                  <p className="text-xs text-slate-400">
                    Exam Date: {activeModalBacklog.examDate} • Attempt #{activeModalBacklog.attemptsCount}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalBacklog(null)}
                className="p-2 text-slate-400 hover:text-slate-100 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Syllabus Progress Bar & Checklist */}
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-400">Revision Completion</span>
                  <span className="font-mono text-emerald-400 font-bold">{readinessPct}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${readinessPct}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Key Topics & Practical Units
                </div>
                {activeModalBacklog.syllabusTopics.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => onToggleTopic(activeModalBacklog.id, idx)}
                    className={`w-full text-left p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      item.completed
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {item.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <span className={`text-xs ${item.completed ? 'line-through text-slate-400' : 'font-medium'}`}>
                      {item.topic}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
              {onClearBacklog ? (
                <button
                  onClick={() => handleResolve(activeModalBacklog.id)}
                  className="px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Simulate Exam Passed</span>
                </button>
              ) : <div />}
              
              <button
                onClick={() => setActiveModalBacklog(null)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all"
              >
                Save & Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
