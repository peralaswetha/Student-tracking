import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Plus, 
  UploadCloud, 
  MessageSquare, 
  Columns, 
  List,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { AssignmentItem } from '../types';

interface AssignmentKanbanProps {
  assignments: AssignmentItem[];
  onStatusChange: (id: string, newStatus: AssignmentItem['status']) => void;
  onAddAssignment: (assignment: Omit<AssignmentItem, 'id'>) => void;
}

export const AssignmentKanban: React.FC<AssignmentKanbanProps> = ({
  assignments,
  onStatusChange,
  onAddAssignment
}) => {
  const [viewMode, setViewMode] = useState<'KANBAN' | 'LIST'>('KANBAN');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New assignment form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('CS501');
  const [newDueDate, setNewDueDate] = useState('');
  const [newMaxScore, setNewMaxScore] = useState(100);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddAssignment({
      title: newTitle,
      subjectCode: newSubject,
      subjectName: newSubject,
      description: "Custom self-tracked course deliverable.",
      dueDate: newDueDate || "In 5 days",
      rawDueDate: new Date().toISOString(),
      status: 'TODO',
      priority: 'MEDIUM',
      maxScore: newMaxScore
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  const handleMarkSubmitted = (id: string) => {
    onStatusChange(id, 'SUBMITTED');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const filtered = assignments.filter(a => selectedSubject === 'ALL' || a.subjectCode === selectedSubject);

  const todoItems = filtered.filter(a => a.status === 'TODO');
  const inProgressItems = filtered.filter(a => a.status === 'IN_PROGRESS');
  const submittedItems = filtered.filter(a => a.status === 'SUBMITTED');
  const gradedItems = filtered.filter(a => a.status === 'GRADED');

  const uniqueSubjects = Array.from(new Set(assignments.map(a => a.subjectCode)));

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 md:p-6 backdrop-blur-md shadow-xl relative overflow-hidden group hover:border-slate-700/80 transition-all">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Assignment Delivery Pipeline</h2>
            <p className="text-xs text-slate-400">Deadlines, submissions, rubrics, and feedback</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 font-mono"
          >
            <option value="ALL">All Subjects</option>
            {uniqueSubjects.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('KANBAN')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'KANBAN' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Kanban Board View"
            >
              <Columns className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('LIST')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'LIST' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add Assignment CTA */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'KANBAN' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
          
          {/* COLUMN 1: TO DO */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-3.5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                To Do ({todoItems.length})
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {todoItems.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                  No pending assignments
                </div>
              ) : (
                todoItems.map(item => (
                  <div key={item.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/90 shadow-md hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-mono text-[11px] font-bold text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">
                        {item.subjectCode}
                      </span>
                      <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.dueDate}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 leading-snug">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                    
                    <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">Max {item.maxScore} pts</span>
                      <button
                        onClick={() => onStatusChange(item.id, 'IN_PROGRESS')}
                        className="text-[11px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                      >
                        Start →
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 2: IN PROGRESS */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-3.5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                In Progress ({inProgressItems.length})
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {inProgressItems.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                  No active work
                </div>
              ) : (
                inProgressItems.map(item => (
                  <div key={item.id} className="p-3.5 rounded-xl bg-slate-900 border border-indigo-500/30 shadow-md hover:border-indigo-500/50 transition-all">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-mono text-[11px] font-bold text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">
                        {item.subjectCode}
                      </span>
                      <span className="text-[10px] text-indigo-400 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.dueDate}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 leading-snug">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                    
                    <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">Max {item.maxScore} pts</span>
                      <button
                        onClick={() => handleMarkSubmitted(item.id)}
                        className="text-[11px] px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1"
                      >
                        <UploadCloud className="w-3 h-3" /> Submit
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 3: SUBMITTED */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-3.5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Submitted ({submittedItems.length})
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {submittedItems.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                  No items under review
                </div>
              ) : (
                submittedItems.map(item => (
                  <div key={item.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-mono text-[11px] font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                        {item.subjectCode}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-semibold">Under Evaluation</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 leading-snug">{item.title}</h4>
                    <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                      <span>Attachment: {item.submissionAttachment || 'project_final.zip'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 4: GRADED */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-3.5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Graded ({gradedItems.length})
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {gradedItems.map(item => (
                <div key={item.id} className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/20 shadow-md">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.subjectCode}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {item.scoreAwarded} / {item.maxScore}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 leading-snug">{item.title}</h4>
                  {item.feedback && (
                    <div className="mt-2 p-2 rounded-lg bg-slate-950 text-[11px] text-slate-300 border border-slate-800 flex items-start gap-1.5">
                      <MessageSquare className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                      <span>"{item.feedback}"</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* LIST VIEW */
        <div className="mt-4 divide-y divide-slate-800">
          {filtered.map(item => (
            <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 mt-0.5">
                  {item.subjectCode}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                    <span>Due: {item.dueDate}</span>
                    <span>•</span>
                    <span>Max {item.maxScore} pts</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {item.status === 'GRADED' ? (
                  <span className="font-mono font-bold text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Score: {item.scoreAwarded} / {item.maxScore}
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Status: {item.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD TASK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <form onSubmit={handleCreateAssignment} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100">Add New Assignment</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Distributed Storage Engine Lab"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Subject</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                >
                  <option value="CS501">CS501 (Dist Systems)</option>
                  <option value="CS502">CS502 (DB Internals)</option>
                  <option value="CS503">CS503 (Compiler Des)</option>
                  <option value="CS504">CS504 (Networks)</option>
                  <option value="CS505">CS505 (ML Lab)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Max Score</label>
                <input
                  type="number"
                  value={newMaxScore}
                  onChange={(e) => setNewMaxScore(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Deadline</label>
              <input
                type="text"
                placeholder="e.g. Next Monday, 5:00 PM"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
