/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Passage, Question, UserAnswers, FlaggedQuestions } from '../types';
import { passages } from '../data/passages';
import { questions } from '../data/questions';
import { Timer, AlertTriangle, ArrowRight, ArrowLeft, Bookmark, CheckSquare, Eye, RefreshCw, Send } from 'lucide-react';

interface PracticeSectionProps {
  userAnswers: UserAnswers;
  setUserAnswers: React.Dispatch<React.SetStateAction<UserAnswers>>;
  flaggedQuestions: FlaggedQuestions;
  setFlaggedQuestions: React.Dispatch<React.SetStateAction<FlaggedQuestions>>;
  onSubmitUjian: () => void;
  timerSeconds: number;
  setTimerSeconds: React.Dispatch<React.SetStateAction<number>>;
  examSubmitted: boolean;
  activeQuestionIdx: number;
  setActiveQuestionIdx: (idx: number) => void;
}

export default function PracticeSection({
  userAnswers,
  setUserAnswers,
  flaggedQuestions,
  setFlaggedQuestions,
  onSubmitUjian,
  timerSeconds,
  setTimerSeconds,
  examSubmitted,
  activeQuestionIdx,
  setActiveQuestionIdx,
}: PracticeSectionProps) {
  const [showUnansweredWarning, setShowUnansweredWarning] = useState(false);

  // Timer loop
  useEffect(() => {
    if (examSubmitted || timerSeconds <= 0) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // auto submit on timer exhaust
          onSubmitUjian();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [examSubmitted, timerSeconds]);

  const formatTimer = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion: Question = questions[activeQuestionIdx];
  const associatedPassage: Passage = passages.find((p) => p.id === currentQuestion.passageId) || passages[0];

  // Answer handlers
  const handleSingleSelect = (val: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: val,
    }));
  };

  const handleComplexSelect = (val: string) => {
    const currentList: string[] = (userAnswers[currentQuestion.id] as string[]) || [];
    let updatedList: string[];
    if (currentList.includes(val)) {
      updatedList = currentList.filter((x) => x !== val);
    } else {
      updatedList = [...currentList, val];
    }
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: updatedList,
    }));
  };

  const handleTFSelect = (stmtId: string, val: boolean) => {
    // tfAnswers is an array or object in userAnswers for this question ID. Let's use an object mapping statement ID to boolean
    const prevTF = (userAnswers[currentQuestion.id] as { [stmtId: string]: boolean }) || {};
    const updatedTF = { ...prevTF, [stmtId]: val };
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: updatedTF,
    }));
  };

  const handleShortInput = (val: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: val,
    }));
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  // Counting answered state for visual feedback
  const isQuestionAnswered = (q: Question) => {
    const ans = userAnswers[q.id];
    if (ans === undefined || ans === null) return false;
    if (q.type === 'single') return typeof ans === 'string' && ans !== '';
    if (q.type === 'complex') return Array.isArray(ans) && ans.length > 0;
    if (q.type === 'tf') {
      const answersMap = ans as { [key: string]: boolean };
      const statementIds = q.tfStatements?.map((s) => s.id) || [];
      return statementIds.every((id) => answersMap[id] !== undefined);
    }
    if (q.type === 'short') return typeof ans === 'string' && ans.trim() !== '';
    return false;
  };

  const unansweredCount = questions.filter((q) => !isQuestionAnswered(q)).length;

  const preSubmitSubmit = () => {
    if (unansweredCount > 0) {
      setShowUnansweredWarning(true);
    } else {
      onSubmitUjian();
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id="practice-section">
      {/* Timer & Meta Header status row */}
      <div className="mb-6 flex flex-col justify-between items-center border-2 border-editorial-ink bg-[#F2F0E9] px-6 py-4 text-editorial-ink sm:flex-row dark:border-editorial-cream dark:bg-zinc-900 dark:text-[#E2E0D5]">
        <div className="flex items-center space-x-3 mb-3 sm:mb-0">
          <div className="flex h-10 w-10 items-center justify-center border border-editorial-ink/30 bg-editorial-white/80 dark:border-editorial-cream/30 dark:bg-zinc-800">
            <Timer className="h-5 w-5 text-editorial-rust" />
          </div>
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-wider text-editorial-ink/70 dark:text-[#A7A6A0]">UTBK Simulation Countdown</span>
            <span className="font-mono text-xl sm:text-2xl font-black">{formatTimer(timerSeconds)}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={toggleFlag}
            className={`flex items-center space-x-1.5 border px-4 py-2 font-sans text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
              flaggedQuestions[currentQuestion.id]
                ? 'border-[#D97706] bg-[#FEF3C7] text-[#92400E] dark:bg-[#78350F] dark:text-[#FEF3C7]'
                : 'border-editorial-ink hover:bg-editorial-ink hover:text-editorial-cream dark:border-editorial-cream dark:hover:bg-editorial-cream dark:hover:text-editorial-ink'
            }`}
            id="flag-active-question-btn"
          >
            <Bookmark className="h-4 w-4" />
            <span>{flaggedQuestions[currentQuestion.id] ? 'Tandai Ragu-Ragu (Flagged)' : 'Tandai Ragu-Ragu'}</span>
          </button>

          <button
            onClick={preSubmitSubmit}
            className="flex items-center space-x-1.5 border border-editorial-ink bg-editorial-ink px-5 py-2 font-sans text-xs uppercase tracking-widest font-black text-editorial-cream hover:bg-editorial-rust hover:border-editorial-rust dark:border-editorial-cream dark:bg-editorial-cream dark:text-editorial-ink dark:hover:bg-editorial-rust dark:hover:text-editorial-white transition-colors cursor-pointer"
            id="finish-exam-trigger-btn"
          >
            <Send className="h-4 w-4" />
            <span>Selesai & Submit Ujian</span>
          </button>
        </div>
      </div>

      {/* Main Examination Partition */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Side: Dynamic Linked Reading Passage */}
        <div className="lg:col-span-2 flex flex-col space-y-4 font-serif">
          <div className="border border-editorial-ink/25 bg-editorial-white p-6 sm:p-8 dark:border-editorial-cream/25 dark:bg-zinc-900/30 shadow-none flex-1 flex flex-col justify-start">
            <div className="pb-4 border-b border-editorial-ink/15 dark:border-editorial-cream/15 mb-6">
              <span className="inline-flex items-center border border-editorial-rust bg-editorial-rust/5 px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-widest text-editorial-rust">
                Tema: {associatedPassage.theme}
              </span>
              <h1 className="mt-2 font-serif text-2xl font-black italic tracking-tighter text-editorial-ink dark:text-editorial-cream sm:text-3xl leading-tight" id="passage-active-title">
                {associatedPassage.title}
              </h1>
              <span className="mt-2 block font-mono text-[11px] font-semibold text-editorial-ink/60 dark:text-[#A7A6A0]">
                Word Count: ~{associatedPassage.wordCount} words
              </span>
            </div>

            {/* Scrollable text box */}
            <div className="prose prose-stone max-w-none dark:prose-invert max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-editorial-rust/35" id="passage-active-text-box">
              {associatedPassage.text.split('\n\n').map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className="mb-4 font-serif text-sm sm:text-base leading-relaxed text-editorial-ink/90 dark:text-editorial-cream/90 antialiased text-justify hover:text-editorial-ink dark:hover:text-editorial-cream transition-colors duration-150"
                  style={{ textIndent: '1.5rem' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Navigation grid and Question panel */}
        <div className="flex flex-col space-y-4">
          {/* Question Navigator Panel card */}
          <div className="border border-editorial-ink/25 bg-editorial-white p-5 dark:border-editorial-cream/25 dark:bg-zinc-900/30">
            <h2 className="font-sans text-xs font-black text-editorial-ink/60 dark:text-editorial-cream/60 uppercase tracking-widest mb-3">
              Exam Navigation Grid
            </h2>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-9 lg:grid-cols-5" id="nav-question-grid">
              {questions.map((q, idx) => {
                const isActive = activeQuestionIdx === idx;
                const isAnswered = isQuestionAnswered(q);
                const isFlagged = flaggedQuestions[q.id];

                let cellBg = 'bg-transparent border-editorial-ink/20 text-editorial-ink dark:border-editorial-cream/20 dark:text-editorial-cream';
                if (isActive) {
                  cellBg = 'bg-editorial-ink text-editorial-cream border-editorial-ink dark:bg-editorial-cream dark:text-editorial-ink dark:border-editorial-cream';
                } else if (isFlagged) {
                  cellBg = 'bg-[#FEF3C7] border-[#D97706] text-[#92400E] dark:bg-[#78350F] dark:text-[#FEF3C7] dark:border-[#D97706]';
                } else if (isAnswered) {
                  cellBg = 'bg-editorial-rust border-editorial-rust text-editorial-cream';
                }

                return (
                  <button
                    key={q.id}
                    id={`grid-cell-${q.id}`}
                    onClick={() => setActiveQuestionIdx(idx)}
                    className={`flex h-9 w-full items-center justify-center border font-mono text-xs font-black transition-all cursor-pointer ${cellBg}`}
                  >
                    {q.questionNumber}
                  </button>
                );
              })}
            </div>
            {/* Legend indicators */}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 pt-3 border-t border-editorial-ink/15 dark:border-editorial-cream/15">
              <div className="flex items-center space-x-1.5">
                <div className="h-3 w-3 border border-editorial-ink bg-editorial-ink dark:bg-editorial-cream dark:border-editorial-cream"></div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-editorial-ink/60 dark:text-editorial-cream/60">Active</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="h-3 w-3 bg-editorial-rust"></div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-editorial-ink/60 dark:text-editorial-cream/60">Answered</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="h-3 w-3 bg-[#FEF3C7] border border-[#D97706]"></div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-editorial-ink/60 dark:text-editorial-cream/60">Flagged</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="h-3 w-3 border border-editorial-ink/20 bg-transparent dark:border-editorial-cream/20"></div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-editorial-ink/60 dark:text-editorial-cream/60">Empty</span>
              </div>
            </div>
          </div>

          {/* Core Active Question card */}
          <div className="border border-editorial-ink/25 bg-editorial-white p-6 dark:border-editorial-cream/25 dark:bg-zinc-900/30 shadow-none flex-1 flex flex-col justify-between font-serif">
            <div>
              {/* Question meta header */}
              <div className="flex items-center justify-between pb-3 border-b border-editorial-ink/15 dark:border-editorial-cream/15 mb-4">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-editorial-ink/50 dark:text-editorial-cream/50">
                  Question {currentQuestion.questionNumber} of {questions.length}
                </span>
                <span className="font-mono text-[9px] font-black uppercase tracking-wider text-editorial-rust px-2 py-0.5 border border-editorial-rust bg-editorial-rust/5">
                  {currentQuestion.type === 'single' && 'Single Choice (1 Ans)'}
                  {currentQuestion.type === 'complex' && 'Complex Choice (3 Ans)'}
                  {currentQuestion.type === 'tf' && 'True or False (2T, 2F)'}
                  {currentQuestion.type === 'short' && 'Short Answer'}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="font-serif text-md sm:text-lg font-extrabold leading-snug text-editorial-ink dark:text-editorial-cream mb-6" id="practice-question-text">
                {currentQuestion.questionText}
              </h3>

              {/* Input Choice options based on question type */}
              <div className="space-y-2.5" id="practice-choices-container">
                {/* 1. SINGLE CHOICE SECTION */}
                {currentQuestion.type === 'single' &&
                  currentQuestion.options?.map((opt) => {
                    const isSelected = userAnswers[currentQuestion.id] === opt.key;
                    return (
                      <button
                        key={opt.key}
                        id={`option-${currentQuestion.id}-${opt.key}`}
                        onClick={() => handleSingleSelect(opt.key)}
                        className={`flex w-full items-start space-x-3 border p-3.5 text-left transition-all ${
                          isSelected
                            ? 'border-editorial-rust bg-editorial-rust/5 text-editorial-ink dark:text-editorial-cream font-bold'
                            : 'border-editorial-ink/20 hover:bg-editorial-egg text-editorial-ink/90 dark:border-editorial-cream/20 dark:hover:bg-zinc-800 dark:text-editorial-cream/90'
                        }`}
                      >
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center font-mono text-xs font-black border transition-colors ${
                          isSelected ? 'bg-editorial-rust text-editorial-cream border-editorial-rust' : 'bg-editorial-white border-editorial-ink/25 text-editorial-ink dark:bg-zinc-800 dark:border-editorial-cream/25 dark:text-editorial-cream'
                        }`}>
                          {opt.key}
                        </span>
                        <span className="font-sans text-xs sm:text-sm pt-0.5 leading-snug">{opt.text}</span>
                      </button>
                    );
                  })}

                {/* 2. COMPLEX SELECTION SECTION */}
                {currentQuestion.type === 'complex' && (
                  <>
                    <div className="mb-2 font-mono text-[10px] text-editorial-rust font-bold uppercase tracking-wider">
                      *Silakan pilih tepat 3 jawaban yang Anda anggap benar:
                    </div>
                    {currentQuestion.options?.map((opt) => {
                      const selectedList = (userAnswers[currentQuestion.id] as string[]) || [];
                      const isSelected = selectedList.includes(opt.key);
                      return (
                        <button
                          key={opt.key}
                          id={`option-complex-${currentQuestion.id}-${opt.key}`}
                          onClick={() => handleComplexSelect(opt.key)}
                          className={`flex w-full items-start space-x-3 border p-3.5 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-editorial-rust bg-editorial-rust/5 text-editorial-ink dark:text-editorial-cream font-bold'
                              : 'border-editorial-ink/20 hover:bg-editorial-egg text-editorial-ink/90 dark:border-editorial-cream/20 dark:hover:bg-zinc-800 dark:text-editorial-cream/90'
                          }`}
                        >
                          <span className={`flex h-6 w-6 shrink-0 items-center justify-center font-mono text-xs font-black border transition-colors ${
                            isSelected ? 'bg-editorial-rust text-editorial-cream border-editorial-rust' : 'bg-editorial-white border-editorial-ink/20 dark:bg-zinc-800 dark:border-editorial-cream/20 text-editorial-ink'
                          }`}>
                            {opt.key}
                          </span>
                          <span className="font-sans text-xs sm:text-sm pt-0.5 leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </>
                )}

                {/* 3. TRUE / FALSE SECTION */}
                {currentQuestion.type === 'tf' && (
                  <div className="space-y-4" id="tf-grid-block">
                    <div className="mb-1.5 font-mono text-[10px] text-editorial-rust font-bold uppercase tracking-wider">
                      *Tentukan benar (True) atau salah (False) untuk setiap klaim berikut:
                    </div>
                    {currentQuestion.tfStatements?.map((stmt) => {
                      const answersMap = (userAnswers[currentQuestion.id] as { [id: string]: boolean }) || {};
                      const selectedVal = answersMap[stmt.id];

                      return (
                        <div
                          key={stmt.id}
                          className="border border-editorial-ink/15 p-3.5 bg-editorial-egg dark:border-editorial-cream/15 dark:bg-zinc-900/40 flex flex-col justify-between"
                        >
                          <p className="font-sans text-xs text-editorial-ink dark:text-editorial-cream mb-3 leading-relaxed font-semibold">
                            {stmt.text}
                          </p>
                          <div className="flex space-x-2">
                             <button
                              onClick={() => handleTFSelect(stmt.id, true)}
                              className={`flex-1 py-1.5 font-mono text-[11px] font-black tracking-widest transition-all border cursor-pointer ${
                                selectedVal === true
                                  ? 'bg-[#059669] text-editorial-cream border-[#059669]'
                                  : 'bg-editorial-white text-editorial-ink/65 border-editorial-ink/20 hover:bg-editorial-egg dark:bg-zinc-800 dark:text-editorial-cream/60 dark:border-editorial-cream/20'
                              }`}
                            >
                              TRUE
                            </button>
                            <button
                              onClick={() => handleTFSelect(stmt.id, false)}
                              className={`flex-1 py-1.5 font-mono text-[11px] font-black tracking-widest transition-all border cursor-pointer ${
                                selectedVal === false
                                  ? 'bg-[#E11D48] text-editorial-cream border-[#E11D48]'
                                  : 'bg-editorial-white text-editorial-ink/65 border-editorial-ink/20 hover:bg-editorial-egg dark:bg-zinc-800 dark:text-editorial-cream/60 dark:border-editorial-cream/20'
                              }`}
                            >
                              FALSE
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 4. SHORT ANSWER SECTION */}
                {currentQuestion.type === 'short' && (
                  <div className="space-y-2">
                    <div className="mb-1 font-mono text-[10px] text-editorial-rust font-bold uppercase tracking-wider">
                      *Gunakan huruf kecil secara keseluruhan. Contoh input: <code className="bg-editorial-egg dark:bg-zinc-800 px-1 py-0.5 border border-editorial-ink/10 dark:border-editorial-cream/10">j-curve</code>
                    </div>
                    <input
                      type="text"
                      value={(userAnswers[currentQuestion.id] as string) || ''}
                      onChange={(e) => handleShortInput(e.target.value)}
                      placeholder="Ketik jawaban singkat Anda di sini..."
                      className="w-full border border-editorial-ink/35 bg-editorial-white px-4 py-3 font-mono text-xs sm:text-sm focus:border-editorial-rust focus:ring-1 focus:ring-editorial-rust dark:border-editorial-cream/35 dark:bg-zinc-900 dark:text-emerald-50 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Steppers & Navigator Indicators row */}
            <div className="mt-8 flex items-center justify-between border-t border-editorial-ink/15 pt-4 dark:border-editorial-cream/15">
              <button
                disabled={activeQuestionIdx === 0}
                onClick={() => setActiveQuestionIdx(activeQuestionIdx - 1)}
                className="flex items-center space-x-1 border border-editorial-ink bg-transparent px-4 py-2 font-sans text-xs uppercase tracking-wider font-extrabold text-editorial-ink hover:bg-editorial-ink hover:text-editorial-cream disabled:opacity-30 dark:border-editorial-cream dark:text-editorial-cream dark:hover:bg-editorial-cream dark:hover:text-editorial-ink transition-colors cursor-pointer duration-150"
                id="exam-prev-question-btn"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Sebelumnya</span>
              </button>

              <button
                disabled={activeQuestionIdx === questions.length - 1}
                onClick={() => setActiveQuestionIdx(activeQuestionIdx + 1)}
                className="flex items-center space-x-1 border border-editorial-ink bg-transparent px-4 py-2 font-sans text-xs uppercase tracking-wider font-extrabold text-editorial-ink hover:bg-editorial-ink hover:text-editorial-cream disabled:opacity-30 dark:border-editorial-cream dark:text-editorial-cream dark:hover:bg-editorial-cream dark:hover:text-editorial-ink transition-colors cursor-pointer duration-150"
                id="exam-next-question-btn"
              >
                <span>Selanjutnya</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Unanswered warning modal */}
      {showUnansweredWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" id="unanswered-warning-modal">
          <div className="w-full max-w-md border-4 border-editorial-ink bg-editorial-cream p-6 dark:border-editorial-cream dark:bg-zinc-900 text-editorial-ink dark:text-editorial-cream font-serif">
            <div className="flex items-center space-x-3 text-editorial-rust">
              <AlertTriangle className="h-6 w-6 shrink-0" />
              <h3 className="font-serif text-lg font-black italic">Terdapat Soal Belum Terjawab!</h3>
            </div>
            <p className="mt-3 font-sans text-xs sm:text-sm text-editorial-ink/75 leading-relaxed dark:text-[#A7A6A0]">
              Anda memiliki <strong className="font-bold text-editorial-rust">{unansweredCount} soal</strong> yang masih belum terisi atau diisi tidak lengkap. Apakah Anda yakin ingin menyerahkan (submit) hasil ujian Anda sekarang? Soal kosong akan dianggap salah.
            </p>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowUnansweredWarning(false)}
                className="flex-1 border border-editorial-ink/50 bg-transparent py-2.5 font-sans text-xs uppercase tracking-widest font-black text-editorial-ink hover:bg-editorial-ink hover:text-editorial-cream dark:border-editorial-cream/50 dark:text-editorial-cream dark:hover:bg-editorial-cream dark:hover:text-editorial-ink cursor-pointer transition-colors"
              >
                Periksa Soal
              </button>
              <button
                onClick={() => {
                  setShowUnansweredWarning(false);
                  onSubmitUjian();
                }}
                className="flex-1 border border-editorial-ink bg-editorial-ink py-2.5 font-sans text-xs uppercase tracking-widest font-black text-editorial-cream hover:bg-editorial-rust hover:border-editorial-rust dark:border-editorial-cream dark:bg-editorial-cream dark:text-editorial-ink dark:hover:bg-editorial-rust dark:hover:text-[#FAFAFA] cursor-pointer transition-colors"
                id="force-submit-modal-btn"
              >
                Ya, Tetap Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
