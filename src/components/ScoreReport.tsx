/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Passage, Question, UserAnswers } from '../types';
import { questions } from '../data/questions';
import { passages } from '../data/passages';
import { Award, Compass, RefreshCw, Eye, BookOpen, Clock, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

interface ScoreReportProps {
  userAnswers: UserAnswers;
  timeRemainingSeconds: number;
  totalTimeSeconds: number;
  onResetExam: () => void;
  onViewReview: () => void;
}

export default function ScoreReport({
  userAnswers,
  timeRemainingSeconds,
  totalTimeSeconds,
  onResetExam,
  onViewReview,
}: ScoreReportProps) {
  // Grading logic
  const isCorrect = (q: Question): boolean => {
    const ans = userAnswers[q.id];
    if (ans === undefined || ans === null) return false;

    if (q.type === 'single') {
      return ans === q.correctAnswer;
    }

    if (q.type === 'complex') {
      if (!Array.isArray(ans)) return false;
      const sortedAns = [...ans].sort();
      const sortedCorr = [...(q.correctAnswer as string[])].sort();
      return JSON.stringify(sortedAns) === JSON.stringify(sortedCorr);
    }

    if (q.type === 'tf') {
      const answersMap = ans as { [stmtId: string]: boolean };
      const statements = q.tfStatements || [];
      if (statements.length === 0) return false;
      return statements.every((s) => answersMap[s.id] === s.isCorrect);
    }

    if (q.type === 'short') {
      if (typeof ans !== 'string') return false;
      return ans.trim().toLowerCase() === (q.correctAnswer as string).trim().toLowerCase();
    }

    return false;
  };

  const totalQuestionsList = questions;
  const numCorrect = totalQuestionsList.filter((q) => isCorrect(q)).length;
  const scorePct = Math.round((numCorrect / totalQuestionsList.length) * 100);

  // Categorized performance
  const categories = ['Oil Palm', 'Rupiah Devaluation', 'State Budget', 'Media Framing & Political Communication'];

  const categoryStats = categories.map((cat) => {
    // Collect passage ids sharing this theme
    const passageIds = passages.filter((p) => p.theme === cat).map((p) => p.id);
    const catQuestions = questions.filter((q) => passageIds.includes(q.passageId));
    const catCorrect = catQuestions.filter((q) => isCorrect(q)).length;
    const pct = catQuestions.length > 0 ? Math.round((catCorrect / catQuestions.length) * 100) : 0;

    return {
      name: cat,
      total: catQuestions.length,
      correct: catCorrect,
      percentage: pct,
    };
  });

  // Calculate weak / strong categories
  const sortedStats = [...categoryStats].sort((a, b) => b.percentage - a.percentage);
  const strongestCategory = sortedStats[0];
  const weakestCategory = sortedStats[sortedStats.length - 1];

  // Duration
  const timeTakenSeconds = totalTimeSeconds - timeRemainingSeconds;
  const formatTakenTime = (sec: number) => {
    const min = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${min} menit ${secs} detik`;
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8" id="scorereport-section">
      {/* Visual Badge Card */}
      <div className="overflow-hidden border border-editorial-ink/25 bg-editorial-white dark:border-editorial-cream/25 dark:bg-zinc-900/20">
        <div className="relative border-b border-editorial-ink/15 bg-editorial-ink px-6 py-12 text-center text-editorial-cream select-none sm:px-12 dark:bg-editorial-cream dark:text-editorial-ink">
          <div className="relative flex flex-col items-center justify-center">
            <div className="inline-flex h-12 w-12 items-center justify-center border border-editorial-cream/30 bg-editorial-cream/5 text-editorial-cream mb-4 dark:border-editorial-ink/30 dark:bg-editorial-ink/5 dark:text-editorial-ink">
              <Award className="h-6 w-6 text-editorial-rust animate-bounce" />
            </div>
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-editorial-rust">
              Score Report Released
            </span>
            <h1 className="mt-2 font-serif text-3xl font-black italic tracking-tighter sm:text-4xl">
              Ujian Selesai!
            </h1>
            <p className="mt-2 max-w-md mx-auto font-sans text-xs sm:text-sm text-editorial-cream/75 dark:text-editorial-ink/75 leading-relaxed">
              Anda telah menyelesaikan simulasi ujian Bahasa Inggris Lanjutan level B2-C1 CEFR dengan hasil berikut:
            </p>

            {/* Score Ring */}
            <div className="relative mt-8 flex h-40 w-40 items-center justify-center border border-editorial-cream/20 dark:border-editorial-ink/20">
              <svg className="absolute inset-0 h-full w-full rotate-270 transform">
                <circle
                  cx="80"
                  cy="80"
                  r="72"
                  className="stroke-current text-editorial-cream/10 dark:text-editorial-ink/10"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="72"
                  className="stroke-current text-editorial-rust"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={452}
                  strokeDashoffset={452 - (452 * scorePct) / 100}
                />
              </svg>
              <div className="text-center z-10">
                <span className="block font-mono text-3.5xl font-black">{numCorrect}/{totalQuestionsList.length}</span>
                <span className="block font-sans text-[10px] uppercase font-extrabold tracking-wider text-editorial-rust">Akurasi {scorePct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Statistics */}
        <div className="grid grid-cols-1 divide-y divide-editorial-ink/15 bg-[#F2F0E9] md:grid-cols-3 md:divide-x md:divide-y-0 dark:divide-editorial-cream/15 dark:bg-zinc-900/40" id="report-summary-counts">
          <div className="flex items-center space-x-4 p-6 justify-center md:justify-start">
            <CheckCircle className="h-6 w-6 text-editorial-rust shrink-0" />
            <div className="font-sans text-left">
              <span className="block text-[10px] uppercase font-black text-editorial-ink/50 dark:text-editorial-cream/50">Total Benar</span>
              <span className="font-serif text-lg font-black italic text-editorial-ink dark:text-editorial-cream">{numCorrect} Soal</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-6 justify-center md:justify-start">
            <Clock className="h-6 w-6 text-editorial-ink/60 dark:text-editorial-cream/60 shrink-0" />
            <div className="font-sans text-left">
              <span className="block text-[10px] uppercase font-black text-editorial-ink/50 dark:text-editorial-cream/50">Durasi Pengerjaan</span>
              <span className="font-serif text-sm font-black italic text-editorial-ink dark:text-editorial-cream leading-tight block">{formatTakenTime(timeTakenSeconds)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-6 justify-center md:justify-start">
            <AlertTriangle className="h-6 w-6 text-editorial-rust shrink-0" />
            <div className="font-sans text-left">
              <span className="block text-[10px] uppercase font-black text-editorial-ink/50 dark:text-editorial-cream/50">Predikat</span>
              <span className="font-serif text-sm font-black italic text-editorial-ink dark:text-editorial-cream leading-snug">
                {scorePct >= 85 ? 'Highly Advanced (C1)' : scorePct >= 65 ? 'Advanced (B2)' : 'Intermediate (B1)'}
              </span>
            </div>
          </div>
        </div>

        {/* Topic Breakdown Panels */}
        <div className="px-6 py-8 sm:px-12 sm:py-10 bg-editorial-white dark:bg-transparent">
          <h2 className="font-sans text-xs font-black text-editorial-ink/50 dark:text-editorial-cream/50 uppercase tracking-widest border-b border-editorial-ink/10 pb-3 mb-6 dark:border-editorial-cream/10">
            Performance Breakdown by Subject Area
          </h2>

          <div className="space-y-6" id="report-categorized-progress">
            {categoryStats.map((cat) => (
              <div key={cat.name} className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-sans text-xs sm:text-sm font-bold text-editorial-ink dark:text-[#E2E0D5]">{cat.name}</span>
                  <span className="font-mono text-xs text-editorial-ink/60 dark:text-editorial-cream/60">
                    {cat.correct}/{cat.total} benar ({cat.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-[#F2F0E9] border border-editorial-ink/5 dark:bg-zinc-900">
                  <div
                    className={`h-full transition-all duration-300 ${
                      cat.percentage >= 75 ? 'bg-editorial-ink dark:bg-editorial-cream' : 'bg-editorial-rust'
                    }`}
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Strength Weakness summary grids card and buttons */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 border-t border-editorial-ink/10 pt-8 dark:border-editorial-cream/10">
            <div className="border border-editorial-ink/15 bg-editorial-egg p-5 dark:border-editorial-cream/15 dark:bg-zinc-900/30">
              <span className="font-mono text-[9px] uppercase font-black text-editorial-rust">Strongest Area</span>
              <h3 className="font-serif text-base font-black italic text-editorial-ink dark:text-editorial-cream mt-1 leading-snug">
                {strongestCategory.name}
              </h3>
              <p className="mt-1 font-sans text-xs text-editorial-ink/80 dark:text-editorial-cream/80">
                Akurasi pengerjaan Anda: <strong className="font-bold text-editorial-rust">{strongestCategory.percentage}%</strong>. Bagus! Pertahankan penguasaan materi ini.
              </p>
            </div>

            <div className="border border-editorial-rust/35 bg-editorial-rust/5 p-5">
              <span className="font-mono text-[9px] uppercase font-black text-[#C2410C]">Area of Improvement</span>
              <h3 className="font-serif text-base font-black italic text-editorial-ink dark:text-editorial-cream mt-1 leading-snug">
                {weakestCategory.name}
              </h3>
              <p className="mt-1 font-sans text-xs text-editorial-ink/80 dark:text-editorial-cream/80">
                Akurasi pengerjaan Anda: <strong className="font-bold text-editorial-rust">{weakestCategory.percentage}%</strong>. Disarankan untuk membaca kembali materi teori dan pembahasannya.
              </p>
            </div>
          </div>

          {/* Navigational actions */}
          <div className="mt-10 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 items-center justify-center">
            <button
              onClick={onViewReview}
              className="w-full sm:w-auto flex items-center justify-center space-x-1.5 border border-editorial-ink bg-editorial-ink text-editorial-cream font-bold px-6 py-3 font-sans text-xs transition-all dark:bg-editorial-cream dark:text-editorial-ink cursor-pointer"
              id="report-review-answers-btn"
            >
              <Eye className="h-4 w-4" />
              <span>Review Pembahasan Detail</span>
            </button>

            <button
              onClick={onResetExam}
              className="w-full sm:w-auto flex items-center justify-center space-x-1.5 border border-editorial-ink/25 bg-editorial-white text-editorial-ink hover:bg-editorial-egg font-bold px-6 py-3 font-sans text-xs transition-all dark:border-editorial-cream/20 dark:bg-zinc-900/10 dark:text-[#E2E0D5]/80 dark:hover:bg-zinc-900 cursor-pointer"
              id="report-retake-btn"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Ulangi Ujian (Reset)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
