/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TheorySection from './components/TheorySection';
import VocabularySection from './components/VocabularySection';
import PracticeSection from './components/PracticeSection';
import ScoreReport from './components/ScoreReport';
import ReviewSection from './components/ReviewSection';
import { UserAnswers, FlaggedQuestions } from './types';
import { questions } from './data/questions';
import { generateSingleFileHtml } from './utils/exporter';
import { BookOpen, Award, FileText, Download, LayoutGrid, CheckCircle, Flame, ArrowRight, Play, Compass, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<FlaggedQuestions>({});
  
  // Timer: 3 Hours (10,800 seconds)
  const TOTAL_TIME = 10800;
  const [timerSeconds, setTimerSeconds] = useState<number>(TOTAL_TIME);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  
  // Question flow pointer
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);

  // Sync dark mode class
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleStartExam = () => {
    setActiveTab('practice');
  };

  const handleResetExam = () => {
    if (window.confirm('Apakah Anda yakin ingin menyetel ulang ujian? Seluruh jawaban tersimpan akan dihapus.')) {
      setUserAnswers({});
      setFlaggedQuestions({});
      setTimerSeconds(TOTAL_TIME);
      setExamSubmitted(false);
      setActiveQuestionIdx(0);
      setActiveTab('practice');
    }
  };

  const handleSubmitUjian = () => {
    setExamSubmitted(true);
    setActiveTab('report');
  };

  const handleDownloadSingleFile = () => {
    try {
      const htmlContent = generateSingleFileHtml();
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'advanced_english_prep_portal.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to export master html single file:', e);
      alert('Gagal mengekspor berkas HTML.');
    }
  };

  const numAnswered = Object.keys(userAnswers).filter((k) => {
    const v = userAnswers[k];
    if (v === undefined || v === null) return false;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'object') return Object.keys(v).length === 4; // True/False 4 statement count
    if (typeof v === 'string') return v.trim() !== '';
    return false;
  }).length;

  return (
    <div className="min-h-screen bg-editorial-cream text-editorial-ink transition-colors duration-150 dark:bg-[#121212] dark:text-[#E2E0D5] flex flex-col font-serif" id="app-root-container">
      {/* Dynamic Nav Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        scoreReleased={examSubmitted}
        totalAnswered={numAnswered}
        totalQuestions={questions.length}
      />

      {/* Primary Tab Switcher Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" id="home-dashboard">
            {/* Banner Call-out */}
            <div className="relative overflow-hidden border-4 border-double border-editorial-ink bg-editorial-white/40 px-6 py-12 text-editorial-ink dark:border-editorial-cream/40 dark:bg-zinc-900/40 dark:text-editorial-cream sm:px-12 shadow-none">
              <div className="relative max-w-3xl">
                <div className="inline-flex items-center space-x-2 border border-editorial-rust px-3 py-1 font-mono text-xs font-bold text-editorial-rust">
                  <Flame className="h-4 w-4 text-editorial-rust" />
                  <span>AKURASI TERTINGGI - LEVEL B2-C1 CEFR & UTBK</span>
                </div>
                
                <h1 className="mt-6 font-serif text-3xl font-black italic tracking-tighter sm:text-5xl leading-none">
                  Sovereign Advanced English
                </h1>
                <span className="block font-sans text-xs uppercase tracking-widest font-black text-editorial-rust/80 dark:text-editorial-rust mt-1">Prep System</span>
                
                <p className="mt-4 font-sans text-sm sm:text-base text-editorial-ink/80 dark:text-editorial-cream/80 leading-relaxed max-w-2xl font-medium">
                  Platform pembelajaran mandiri terlengkap untuk persiapan menghadapi ujian Bahasa Inggris Lanjutan. Kuasai bacaan bertekstur akademis, istilah kompleks, serta tata bahasa inferensial tingkat tinggi.
                </p>

                {/* Grid stats */}
                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4" id="home-analytics-counters">
                  <div className="border border-editorial-ink/25 p-4 bg-editorial-white/50 dark:border-editorial-cream/25 dark:bg-zinc-900/50">
                    <span className="block font-serif text-xl sm:text-2xl font-black text-editorial-rust italic">4 Topics</span>
                    <span className="font-sans text-[10px] uppercase font-bold tracking-wider text-editorial-ink/70 dark:text-editorial-cream/70">Materi Teori</span>
                  </div>
                  <div className="border border-editorial-ink/25 p-4 bg-editorial-white/50 dark:border-editorial-cream/25 dark:bg-zinc-900/50">
                    <span className="block font-serif text-xl sm:text-2xl font-black text-editorial-rust italic">250+ Words</span>
                    <span className="font-sans text-[10px] uppercase font-bold tracking-wider text-editorial-ink/70 dark:text-editorial-cream/70">Bank Kosakata B2-C1</span>
                  </div>
                  <div className="border border-editorial-ink/25 p-4 bg-editorial-white/50 dark:border-editorial-cream/25 dark:bg-zinc-900/50">
                    <span className="block font-serif text-xl sm:text-2xl font-black text-editorial-rust italic">45 Qs</span>
                    <span className="font-sans text-[10px] uppercase font-bold tracking-wider text-editorial-ink/70 dark:text-editorial-cream/70">Simulasi UTBK</span>
                  </div>
                  <div className="border border-editorial-ink/25 p-4 bg-editorial-white/50 dark:border-editorial-cream/25 dark:bg-zinc-900/50">
                    <span className="block font-serif text-xl sm:text-2xl font-black text-editorial-rust italic">3 Hours</span>
                    <span className="font-sans text-[10px] uppercase font-bold tracking-wider text-editorial-ink/70 dark:text-editorial-cream/70">Batas Waktu Timer</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={handleStartExam}
                    className="flex items-center space-x-1.5 border-2 border-editorial-ink bg-editorial-ink px-6 py-3 font-sans text-xs uppercase tracking-widest font-black text-editorial-cream hover:bg-editorial-rust hover:border-editorial-rust transition-colors duration-150 cursor-pointer"
                    id="btn-start-exam-home"
                  >
                    <Play className="h-4 w-4 text-editorial-cream fill-editorial-cream" />
                    <span>Mulai Simulasi UTBK Baru</span>
                  </button>

                  <button
                    onClick={handleDownloadSingleFile}
                    className="flex items-center space-x-1.5 border border-editorial-ink bg-transparent px-6 py-3 font-sans text-xs uppercase tracking-widest font-black text-editorial-ink hover:bg-editorial-ink hover:text-editorial-cream dark:border-editorial-cream dark:text-editorial-cream dark:hover:bg-editorial-cream dark:hover:text-editorial-ink transition-colors duration-150 cursor-pointer"
                    id="btn-download-offline-html"
                  >
                    <Download className="h-4 w-4" />
                    <span>Unduh Template Offline (Satu File HTML)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Curriculum Tracks */}
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Card 1: Critical Reading */}
              <div className="border border-editorial-ink/25 bg-editorial-white p-6 sm:p-8 dark:border-editorial-cream/25 dark:bg-zinc-900/30 flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center border border-editorial-rust/45 bg-editorial-rust/5 text-editorial-rust">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-black text-editorial-ink dark:text-editorial-cream leading-tight">
                    Critical Reading Passages
                  </h3>
                  <p className="mt-2 font-sans text-xs sm:text-sm text-editorial-ink/70 dark:text-[#A7A6A0] leading-relaxed font-medium">
                    Uraikan teks-teks akademis setebal 700–1200 kata mengenai agribisnis Minyak Sawit, Devaluasi Rupiah, Efisiensi APBN, hingga dinamika framing media.
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab('theory')}
                    className="inline-flex items-center space-x-1 font-sans text-xs uppercase tracking-widest font-black text-editorial-rust hover:text-editorial-ink dark:hover:text-white"
                  >
                    <span>Pelajari Teori Membaca</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Card 2: Vocabulary Drills & Flashcard */}
              <div className="border border-editorial-ink/25 bg-editorial-white p-6 sm:p-8 dark:border-editorial-cream/25 dark:bg-zinc-900/30 flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center border border-editorial-rust/45 bg-editorial-rust/5 text-editorial-rust">
                    <LayoutGrid className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-black text-editorial-ink dark:text-editorial-cream leading-tight">
                    Vocabulary Bank & Flashcards
                  </h3>
                  <p className="mt-2 font-sans text-xs sm:text-sm text-editorial-ink/70 dark:text-[#A7A6A0] leading-relaxed font-medium">
                    Kuasai lebih dari 250 kosakata akademis rumit (CEFR B2–C1), lengkap dengan definisi, sinonim, contoh kalimat, serta sistem kartu flashcard interaktif.
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab('vbank')}
                    className="inline-flex items-center space-x-1 font-sans text-xs uppercase tracking-widest font-black text-editorial-rust hover:text-editorial-ink dark:hover:text-white"
                  >
                    <span>Buka Flashcards Kosakata</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Card 3: Deep Review Keys */}
              <div className="border border-editorial-ink/25 bg-editorial-white p-6 sm:p-8 dark:border-editorial-cream/25 dark:bg-zinc-900/30 flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center border border-editorial-rust/45 bg-editorial-rust/5 text-editorial-rust">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-black text-editorial-ink dark:text-editorial-cream leading-tight">
                    In-depth Pedagogical Review
                  </h3>
                  <p className="mt-2 font-sans text-xs sm:text-sm text-editorial-ink/70 dark:text-[#A7A6A0] leading-relaxed font-medium">
                    Tinjau jawaban Anda secara detail pasca menyerahkan ujian. Setiap dari 45 soal dilengkapi ulasan logis distractor, strategi, dan lexical analysis.
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      if (!examSubmitted) {
                        alert('Silakan ikuti dan selesaikan ujian terlebih dahulu!');
                      } else {
                        setActiveTab('review');
                      }
                    }}
                    className={`inline-flex items-center space-x-1 font-sans text-xs uppercase tracking-widest font-black ${
                      examSubmitted
                        ? 'text-editorial-rust hover:text-editorial-ink dark:hover:text-white'
                        : 'text-editorial-ink/35 dark:text-[#A7A6A0]/30 cursor-not-allowed'
                    }`}
                  >
                    <span>Review Pembahasan Detail</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Offline notification card */}
            <div className="mt-8 border-l-4 border-editorial-rust bg-editorial-egg p-6 dark:bg-zinc-900/60 border-t border-r border-b border-editorial-ink/10 dark:border-editorial-cream/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start space-x-3 text-editorial-ink dark:text-[#E2E0D5]">
                  <Flame className="h-5 w-5 shrink-0 text-editorial-rust mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-black text-editorial-ink dark:text-editorial-cream">Dukungan Akses Offline (Offline Single-File HTML)</h4>
                    <p className="font-sans text-xs text-editorial-ink/75 dark:text-[#A7A6A0] leading-relaxed mt-0.5">
                      Anda dapat mengunduh aplikasi ini menjadi berkas <code className="font-mono text-editorial-rust font-bold bg-editorial-accent/40 dark:bg-zinc-800 px-1 py-0.5">.html</code> tunggal yang dapat dipindahkan ke flashdisk, dikirim via group chat, dan dibuka secara penuh langsung dari peramban HP maupun komputer tanpa membutuhkan kuota internet!
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadSingleFile}
                  className="border border-editorial-rust bg-editorial-rust px-5 py-2.5 font-sans text-xs uppercase tracking-widest font-black text-editorial-cream hover:bg-editorial-ink dark:hover:bg-editorial-white dark:hover:text-editorial-ink transition-colors duration-150 cursor-pointer"
                >
                  Unduh Sekarang (.html)
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'theory' && <TheorySection />}

        {activeTab === 'vbank' && <VocabularySection />}

        {activeTab === 'practice' && (
          <PracticeSection
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
            flaggedQuestions={flaggedQuestions}
            setFlaggedQuestions={setFlaggedQuestions}
            onSubmitUjian={handleSubmitUjian}
            timerSeconds={timerSeconds}
            setTimerSeconds={setTimerSeconds}
            examSubmitted={examSubmitted}
            activeQuestionIdx={activeQuestionIdx}
            setActiveQuestionIdx={setActiveQuestionIdx}
          />
        )}

        {activeTab === 'report' && (
          <ScoreReport
            userAnswers={userAnswers}
            timeRemainingSeconds={timerSeconds}
            totalTimeSeconds={TOTAL_TIME}
            onResetExam={handleResetExam}
            onViewReview={() => setActiveTab('review')}
          />
        )}

        {activeTab === 'review' && <ReviewSection userAnswers={userAnswers} />}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-editorial-ink/20 py-8 text-center text-xs text-editorial-ink/65 dark:border-editorial-cream/20 dark:text-editorial-cream/65 mt-12">
        <div className="mx-auto max-w-7xl px-4 font-mono uppercase tracking-widest font-bold">
          © 2026 Sovereign Preparation Platform. Built with React, Tailwind v4 and TypeScript.
        </div>
      </footer>
    </div>
  );
}
