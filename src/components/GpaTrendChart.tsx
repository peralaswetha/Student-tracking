import React, { useState } from 'react';
import { TrendingUp, Target } from 'lucide-react';
import type { GpaHistory } from '../types';

interface GpaTrendChartProps {
  history: GpaHistory[];
  targetCgpa: number;
}

export const GpaTrendChart: React.FC<GpaTrendChartProps> = ({ history, targetCgpa }) => {
  const [hoveredSem, setHoveredSem] = useState<GpaHistory | null>(null);

  const currentItem = history[history.length - 1];
  const firstItem = history[0];
  const delta = (currentItem.cgpa - firstItem.cgpa).toFixed(2);
  const totalCredits = currentItem.totalCredits;

  // Compute SVG paths for SGPA curve
  const width = 600;
  const height = 160;
  const paddingX = 40;
  const paddingY = 30;

  const minGpa = 7.0;
  const maxGpa = 10.0;

  const getX = (index: number) => {
    return paddingX + (index / (history.length - 1)) * (width - 2 * paddingX);
  };

  const getY = (val: number) => {
    const norm = (val - minGpa) / (maxGpa - minGpa);
    return height - paddingY - norm * (height - 2 * paddingY);
  };

  // Generate SVG path for SGPA
  const points = history.map((item, idx) => ({
    x: getX(idx),
    y: getY(item.sgpa),
    ...item
  }));

  const pathD = points.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = points[idx - 1];
    const cx = (prev.x + curr.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  // Target line Y coordinate
  const targetY = getY(targetCgpa);

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 md:p-6 backdrop-blur-md flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-slate-700/80 transition-all">
      
      {/* Background radial highlight */}
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Semester GPA Progression</h2>
              <p className="text-xs text-slate-400">Historical SGPA vs Cumulative CGPA trajectory</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Cumulative CGPA</span>
            <span className="text-xl font-extrabold font-mono text-emerald-400">{currentItem.cgpa}</span>
          </div>
        </div>

        {/* Milestone Statistics Cards */}
        <div className="grid grid-cols-3 gap-2.5 my-4">
          <div className="p-2.5 bg-slate-800/40 border border-slate-800/80 rounded-2xl">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Growth Delta</span>
            <span className="text-sm font-mono font-bold text-emerald-400">+{delta} CGPA</span>
            <span className="text-[10px] text-slate-500 block">Since Semester 1</span>
          </div>
          <div className="p-2.5 bg-slate-800/40 border border-slate-800/80 rounded-2xl">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Credits Cleared</span>
            <span className="text-sm font-mono font-bold text-indigo-300">{totalCredits} pts</span>
            <span className="text-[10px] text-slate-500 block">112 / 160 Total</span>
          </div>
          <div className="p-2.5 bg-slate-800/40 border border-slate-800/80 rounded-2xl">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Cohort Rank</span>
            <span className="text-sm font-mono font-bold text-amber-400">Top #{currentItem.rankInBatch}</span>
            <span className="text-[10px] text-slate-500 block">In CSE Batch</span>
          </div>
        </div>

        {/* Interactive SVG Chart */}
        <div className="relative my-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
            <defs>
              <linearGradient id="gpaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Horizontal Reference Lines */}
            {[7.5, 8.0, 8.5, 9.0, 9.5].map((level) => {
              const y = getY(level);
              return (
                <g key={level}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="#1e293b"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 10}
                    y={y + 3}
                    fill="#64748b"
                    fontSize="10"
                    textAnchor="end"
                    fontFamily="monospace"
                  >
                    {level.toFixed(1)}
                  </text>
                </g>
              );
            })}

            {/* Target Line */}
            <line
              x1={paddingX}
              y1={targetY}
              x2={width - paddingX}
              y2={targetY}
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <text
              x={width - paddingX + 8}
              y={targetY + 3}
              fill="#F59E0B"
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
            >
              Target ({targetCgpa})
            </text>

            {/* Gradient Area Fill */}
            <path d={areaD} fill="url(#gpaGradient)" />

            {/* Smooth Spline Stroke */}
            <path
              d={pathD}
              fill="none"
              stroke="#10B981"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {points.map((p, idx) => (
              <g 
                key={p.semester}
                onMouseEnter={() => setHoveredSem(history[idx])}
                onMouseLeave={() => setHoveredSem(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="5"
                  fill="#090d16"
                  stroke="#10B981"
                  strokeWidth="3"
                  className="transition-all hover:scale-150 hover:fill-emerald-400"
                />
                <text
                  x={p.x}
                  y={height - 8}
                  fill="#94a3b8"
                  fontSize="11"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontWeight="600"
                >
                  Sem {p.semester}
                </text>
              </g>
            ))}
          </svg>

          {/* Hover Tooltip Overlay */}
          {hoveredSem && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-slate-950/95 border border-indigo-500/40 px-3.5 py-2 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs z-20">
              <span className="font-bold text-slate-200">Semester {hoveredSem.semester}</span>
              <span className="font-mono text-emerald-400 font-bold">SGPA: {hoveredSem.sgpa}</span>
              <span className="font-mono text-slate-400">CGPA: {hoveredSem.cgpa}</span>
              <span className="text-[10px] text-amber-400 font-mono">Rank #{hoveredSem.rankInBatch}</span>
            </div>
          )}
        </div>

      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-amber-400" />
          <span>Required in Sem 6 for 8.80 CGPA: <strong className="text-amber-300 font-mono">9.24 SGPA</strong></span>
        </div>
        <span className="text-emerald-400 font-mono font-medium">Honor Roll Eligible</span>
      </div>

    </div>
  );
};
