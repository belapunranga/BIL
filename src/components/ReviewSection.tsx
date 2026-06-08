/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Passage, Question, UserAnswers } from '../types';
import { questions } from '../data/questions';
import { passages } from '../data/passages';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, BookOpen, AlertCircle, HelpCircle } from 'lucide-react';

interface ReviewSectionProps {
  userAnswers: UserAnswers;
}

export default function ReviewSection({ userAnswers }: ReviewSectionProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const currentQuestion = questions[activeIdx];
  const associatedPassage = passages.find((p) => p.id === currentQuestion.passageId) || passages[0];

  const ans = userAnswers[currentQuestion.id];

  const isCorrect = (q: Question): boolean => {
    const activeAns = userAnswers[q.id];
    if (activeAns === undefined || activeAns === null) return false;

    if (q.type === 'single') {
      return activeAns === q.correctAnswer;
    }

    if (q.type === 'complex') {
      if (!Array.isArray(activeAns)) return false;
      const sortedAns = [...activeAns].sort();
      const sortedCorr = [...(q.correctAnswer as string[])].sort();
      return JSON.stringify(sortedAns) === JSON.stringify(sortedCorr);
    }

    if (q.type === 'tf') {
      const answersMap = activeAns as { [stmtId: string]: boolean };
      const statements = q.tfStatements || [];
      if (statements.length === 0) return false;
      return statements.every((s) => answersMap[s.id] === s.isCorrect);
    }

    if (q.type === 'short') {
      if (typeof activeAns !== 'string') return false;
      return activeAns.trim().toLowerCase() === (q.correctAnswer as string).trim().toLowerCase();
    }

    return false;
  };

  const getFormatUserAnsStr = (q: Question) => {
    const activeAns = userAnswers[q.id];
    if (activeAns === undefined || activeAns === null) return 'Unanswered (Tidak dijawab)';
    if (q.type === 'single') return `Anda Memilih: ${activeAns}`;
    if (q.type === 'complex') return `Anda Memilih: ${[...(activeAns as string[])].sort().join(', ')}`;
    if (q.type === 'tf') {
      const statementList = q.tfStatements || [];
      const answersMap = activeAns as { [stmtId: string]: boolean };
      return statementList
        .map((s, idx) => `Pernyataan ${idx + 1}: ${answersMap[s.id] === undefined ? 'Tidak diisi' : answersMap[s.id] ? 'TRUE' : 'FALSE'}`)
        .join(' | ');
    }
    if (q.type === 'short') return `Anda Mengetik: "${activeAns}"`;
    return 'Unanswered';
  };

  const getFormatCorrectAnsStr = (q: Question) => {
    if (q.type === 'single') return `Jawaban Benar: ${q.correctAnswer}`;
    if (q.type === 'complex') return `Jawaban Benar: ${[...(q.correctAnswer as string[])].sort().join(', ')}`;
    if (q.type === 'tf') {
      return q.tfStatements?.map((s, idx) => `Pernyataan ${idx + 1}: ${s.isCorrect ? 'TRUE' : 'FALSE'}`).join(' | ');
    }
    if (q.type === 'short') return `Jawaban Benar: "${q.correctAnswer}"`;
    return '';
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id="review-section-main">
      {/* Header */}
      <div className="mb-8 border-b border-editorial-ink/15 pb-6 dark:border-editorial-cream/15">
        <span className="inline-flex items-center border border-editorial-rust bg-editorial-rust/5 px-2.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-widest text-editorial-rust">
          <BookOpen className="h-3 w-3 mr-1.5" />
          <span>Analytical Explanation & Review</span>
        </span>
        <h1 className="mt-2 font-serif text-2xl font-black italic tracking-tighter text-editorial-ink dark:text-editorial-cream sm:text-3xl">
          Review Pembahasan & Analisis Soal
        </h1>
        <p className="mt-2 font-sans text-xs sm:text-sm text-editorial-ink/75 dark:text-[#A7A6A0]">
          Saring dan evaluasi performa Anda pada masing-masing dari 45 soal. Tinjau kesalahan pilihan opsi distraktor, peta bacaan, strategi kritis, dan kosa kata context clues.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Left column: Grid of items with Correct (green) / Wrong (red) icons */}
        <div className="lg:col-span-1">
          <div className="border border-editorial-ink/25 bg-editorial-white p-5 dark:border-editorial-cream/25 dark:bg-zinc-900/35">
            <h2 className="font-sans text-xs font-black text-editorial-ink/50 dark:text-editorial-cream/50 uppercase tracking-widest mb-3">
              Indeks Pembahasan
            </h2>
            <div className="grid grid-cols-5 gap-2" id="review-indeks-grid">
              {questions.map((q, idx) => {
                const isActive = activeIdx === idx;
                const correct = isCorrect(q);
                const answered = userAnswers[q.id] !== undefined;

                let cellBg = 'border-editorial-ink/15 text-editorial-ink/55 bg-editorial-white dark:bg-zinc-900/30 dark:border-editorial-cream/15 dark:text-[#A7A6A0]/80';
                if (isActive) {
                  cellBg = 'border-editorial-ink bg-editorial-ink text-editorial-cream dark:bg-editorial-cream dark:text-editorial-ink dark:border-editorial-cream font-black scale-105';
                } else if (answered) {
                  cellBg = correct
                    ? 'border-editorial-ink bg-editorial-egg text-editorial-ink font-bold hover:bg-[#EAE8E2] dark:bg-zinc-700/30'
                    : 'border-editorial-rust/40 bg-editorial-rust/5 text-editorial-rust font-bold hover:bg-editorial-rust/10';
                }

                return (
                  <button
                    key={q.id}
                    id={`review-idx-cell-${q.id}`}
                    onClick={() => setActiveIdx(idx)}
                    className={`flex h-9 w-full items-center justify-center border text-xs font-mono transition-all cursor-pointer ${cellBg}`}
                  >
                    {q.questionNumber}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Pembahasan Card and Linked passage snippets */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <div className="border border-editorial-ink/25 bg-editorial-white p-6 sm:p-8 dark:border-editorial-cream/25 dark:bg-zinc-900/35 shadow-none">
            {/* Nav and state panel heading */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-editorial-ink/15 dark:border-editorial-cream/15 mb-6 space-y-2 sm:space-y-0">
              <div>
                <span className="font-sans text-xs font-extrabold text-editorial-rust select-none">
                  PEMBAHASAN SOAL {currentQuestion.questionNumber}
                </span>
                <span className="block font-mono text-[9px] text-[#A7A6A0] uppercase tracking-wider mt-0.5 select-none">
                  Tema passage: {associatedPassage.theme}
                </span>
              </div>

              {/* Status block badge */}
              <div className="flex items-center space-x-2">
                {isCorrect(currentQuestion) ? (
                  <span className="inline-flex items-center space-x-1.5 border border-editorial-ink/20 bg-editorial-egg px-3 py-1 font-sans text-xs font-bold text-editorial-ink dark:border-editorial-cream/30 dark:text-editorial-cream">
                    <CheckCircle className="h-3.5 w-3.5 text-editorial-rust" />
                    <span>Jawaban Anda Benar</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 border border-editorial-rust/20 bg-editorial-rust/5 px-3 py-1 font-sans text-xs font-bold text-editorial-rust">
                    <XCircle className="h-3.5 w-3.5 text-editorial-rust" />
                    <span>Jawaban Anda Salah/Kosong</span>
                  </span>
                )}
              </div>
            </div>

            {/* Content Display */}
            <h3 className="font-serif text-lg sm:text-xl font-black text-editorial-ink dark:text-editorial-cream leading-snug mb-6">
              {currentQuestion.questionText}
            </h3>

            {/* Select responses values box */}
            <div className="border border-editorial-ink/15 bg-editorial-egg p-4 dark:border-editorial-cream/15 dark:bg-zinc-900/40 mb-6 space-y-2">
              <div className="font-serif text-sm font-black italic text-editorial-ink dark:text-editorial-cream flex items-start space-x-2">
                <span className={`h-2.5 w-2.5 mt-1.5 shrink-0 ${isCorrect(currentQuestion) ? 'bg-editorial-ink dark:bg-editorial-cream' : 'bg-editorial-rust'}`}></span>
                <span className="leading-tight">{getFormatUserAnsStr(currentQuestion)}</span>
              </div>
              <div className="font-serif text-sm font-black italic text-[#C2410C] flex items-start space-x-2 border-t border-editorial-ink/10 dark:border-editorial-cream/10 pt-2">
                <span className="h-2.5 w-2.5 mt-1.5 bg-editorial-rust shrink-0"></span>
                <span className="leading-tight">{getFormatCorrectAnsStr(currentQuestion)}</span>
              </div>
            </div>

            {/* Pedagogical Micro divisions */}
            <div className="space-y-6" id="pedagogical-analysis-suite">
              {/* 1. Correct Response detailed analysis */}
              <div>
                <h4 className="font-serif text-sm font-black italic uppercase text-editorial-rust mb-1.5">
                  1. CORRECT RESPONSE AND LOGIC EVIDENCE
                </h4>
                <p className="font-sans text-sm text-editorial-ink/90 dark:text-[#E2E0D5] leading-relaxed text-justify mb-4">
                  {currentQuestion.explanation.correctResponse}
                </p>
              </div>

              {/* 2. Why distractors are wrong */}
              <div>
                <h4 className="font-serif text-sm font-black italic uppercase text-editorial-rust mb-1.5">
                  2. DISTRACTOR ANALYSIS (Mengapa Opsi Lain Salah)
                </h4>
                <p className="font-sans text-sm text-editorial-ink/90 dark:text-[#E2E0D5] leading-relaxed text-justify mb-4">
                  {currentQuestion.explanation.distractorAnalysis}
                </p>
              </div>

              {/* 3. Reading Strategy Used */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-editorial-ink/10 pt-5 dark:border-editorial-cream/10">
                <div className="border border-editorial-ink/15 bg-editorial-white p-4 dark:border-editorial-cream/15 dark:bg-zinc-900/10">
                  <h5 className="font-mono text-[9px] font-black uppercase text-editorial-rust mb-1.5 tracking-wider">
                    3. READING STRATEGY
                  </h5>
                  <p className="font-sans text-xs text-editorial-ink/80 dark:text-editorial-cream/80 leading-relaxed">
                    {currentQuestion.explanation.strategy}
                  </p>
                </div>

                <div className="border border-editorial-ink/15 bg-editorial-white p-4 dark:border-editorial-cream/15 dark:bg-zinc-900/10">
                  <h5 className="font-mono text-[9px] font-black uppercase text-editorial-rust mb-1.5 tracking-wider">
                    4. VOCABULARY DIGEST
                  </h5>
                  <p className="font-sans text-xs text-[#C2410C] font-semibold leading-relaxed">
                    {currentQuestion.explanation.vocabAnalysis}
                  </p>
                </div>

                <div className="border border-editorial-[#3C3836]/15 bg-editorial-white p-4 dark:border-editorial-cream/15 dark:bg-zinc-900/10">
                  <h5 className="font-mono text-[9px] font-black uppercase text-editorial-rust mb-1.5 tracking-wider">
                    5. CRITICAL REASONING
                  </h5>
                  <p className="font-sans text-xs text-editorial-ink/80 dark:text-editorial-cream/80 leading-relaxed">
                    {currentQuestion.explanation.criticalThinking}
                  </p>
                </div>
              </div>
            </div>

            {/* Steppers row */}
            <div className="mt-8 flex items-center justify-between border-t border-editorial-ink/10 pt-4 dark:border-editorial-cream/10">
              <button
                disabled={activeIdx === 0}
                onClick={() => setActiveIdx(activeIdx - 1)}
                className="flex items-center space-x-1.5 border border-editorial-ink bg-[#F2F0E9] hover:bg-editorial-ink hover:text-editorial-cream cursor-pointer text-editorial-ink transition-all dark:border-editorial-cream dark:bg-zinc-900 text-xs font-bold px-4 py-2 disabled:opacity-35"
                id="review-prev-btn"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Sebelumnya</span>
              </button>

              <button
                disabled={activeIdx === questions.length - 1}
                onClick={() => setActiveIdx(activeIdx + 1)}
                className="flex items-center space-x-1.5 border border-editorial-ink bg-[#F2F0E9] hover:bg-editorial-ink hover:text-editorial-cream cursor-pointer text-editorial-ink transition-all dark:border-editorial-cream dark:bg-zinc-900 text-xs font-bold px-4 py-2 disabled:opacity-35"
                id="review-next-btn"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
