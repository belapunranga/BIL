/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { theoryTopics, TheoryTopic } from '../data/theory';
import { BookOpen, Search, HelpCircle, AlertCircle, FileText, CheckCircle } from 'lucide-react';

export default function TheorySection() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('reading-comprehension');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTopics = theoryTopics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTopic = theoryTopics.find((t) => t.id === selectedTopicId) || theoryTopics[0];

  // Helper to parse markdown paragraphs, bold markings, and lists into HTML
  const formatContent = (text: string) => {
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-2"></div>;

      // Classify Headings
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="mb-3 mt-6 font-serif text-lg font-black italic text-editorial-ink dark:text-editorial-cream border-b border-editorial-ink/15 dark:border-editorial-cream/15 pb-2">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="mb-4 mt-8 font-serif text-xl font-black italic text-editorial-rust">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      // Check Bullet Lists
      if (trimmed.startsWith('*')) {
        const processed = trimmed.replace(/^\*\s*/, '');
        // Highlight bold sub-parts inside lists
        const boldSplit = processed.split('**');
        return (
          <li key={idx} className="ml-5 list-disc mb-2 font-sans text-sm leading-relaxed text-editorial-ink/80 dark:text-[#A7A6A0]">
            {boldSplit.map((chunk, cIdx) => (cIdx % 2 === 1 ? <strong key={cIdx} className="text-editorial-ink dark:text-editorial-white font-bold">{chunk}</strong> : chunk))}
          </li>
        );
      }

      // Check bullet lists of sub-elements
      if (trimmed.startsWith('-')) {
        const processed = trimmed.replace(/^-\s*/, '');
        const boldSplit = processed.split('**');
        return (
          <li key={idx} className="ml-8 list-circle mb-1.5 font-sans text-xs sm:text-sm leading-relaxed text-editorial-ink/70 dark:text-[#A7A6A0]/80">
            {boldSplit.map((chunk, cIdx) => (cIdx % 2 === 1 ? <strong key={cIdx} className="text-editorial-ink dark:text-editorial-white font-bold">{chunk}</strong> : chunk))}
          </li>
        );
      }

      // Format standard paragraphs with internal bold supports
      const boldSplit = line.split('**');
      
      // Simplifying inline styling parsing for clean layout:
      return (
        <p key={idx} className="mb-4 font-serif text-base leading-relaxed text-editorial-ink/90 dark:text-editorial-cream/90 text-justify">
          {boldSplit.map((chunk, cIdx) => {
            if (cIdx % 2 === 1) {
              // Highlight code blocks or italics
              if (chunk.includes('_')) {
                return <em key={cIdx} className="text-editorial-rust font-bold italic underline underline-offset-2">{chunk.replace(/_/g, '')}</em>;
              }
              return <strong key={cIdx} className="text-editorial-ink dark:text-white font-black">{chunk}</strong>;
            }
            return chunk;
          })}
        </p>
      );
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id="theory-section">
      {/* Heading */}
      <div className="mb-8 text-center lg:text-left">
        <div className="inline-flex items-center border border-editorial-rust bg-editorial-rust/5 px-2.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-widest text-editorial-rust">
          <BookOpen className="h-3 w-3 mr-1.5" />
          <span>Materi Komprehensif Persiapan UTBK</span>
        </div>
        <h1 className="mt-2 font-serif text-2xl font-black italic tracking-tighter text-editorial-ink dark:text-editorial-cream sm:text-3xl">
          Complete Theory Deck
        </h1>
        <p className="mt-2 font-sans text-sm text-editorial-ink/75 dark:text-[#A7A6A0]">
          Pelajari strategi pengerjaan soal Reading Comprehension, struktur teks Analisis Eksplanasi, serta perbendaharaan kosakata tingkat mahir (CEFR B2–C1).
        </p>
      </div>

      {/* Grid Layout: Sidebar & Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Index */}
        <div className="flex flex-col space-y-4 lg:col-span-1">
          {/* Search bar inside Sidebar */}
          <div className="relative">
            <Search className="absolute top-3 left-3 h-4 w-4 text-editorial-ink/50 dark:text-editorial-cream/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari materi..."
              className="w-full border border-editorial-ink/25 bg-editorial-white py-2.5 pl-10 pr-4 font-sans text-xs focus:ring-1 focus:ring-editorial-rust focus:border-editorial-rust dark:border-editorial-cream/25 dark:bg-zinc-900 dark:text-white focus:outline-none"
              id="theory-search-input"
            />
          </div>

          {/* Quick List */}
          <div className="flex flex-row overflow-x-auto gap-2 pb-2 lg:flex-col lg:overflow-visible lg:pb-0 scrollbar-none" id="theory-topic-list">
            {filteredTopics.map((topic) => {
              const isSelected = topic.id === selectedTopic.id;
              return (
                <button
                  key={topic.id}
                  id={`theory-btn-${topic.id}`}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`flex shrink-0 items-center justify-between border px-4 py-3 text-left font-sans transition-all duration-150 cursor-pointer lg:shrink lg:w-full ${
                    isSelected
                      ? 'border-editorial-ink bg-editorial-ink font-bold text-editorial-cream dark:bg-editorial-cream dark:text-editorial-ink dark:border-editorial-cream'
                      : 'border-editorial-ink/15 bg-editorial-white font-medium text-editorial-ink/85 hover:bg-editorial-egg dark:border-editorial-cream/15 dark:bg-zinc-900/10 dark:text-[#E2E0D5]/80 dark:hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm">{topic.title}</span>
                    <span className={`text-[9px] font-mono uppercase tracking-wider ${isSelected ? 'text-editorial-rust' : 'text-editorial-ink/50 dark:text-editorial-cream/55'}`}>
                      {topic.category}
                    </span>
                  </div>
                </button>
              );
            })}
            {filteredTopics.length === 0 && (
              <div className="py-8 text-center font-sans text-xs text-editorial-ink/50 dark:text-editorial-[#A7A6A0]/50">
                Materi tidak ditemukan.
              </div>
            )}
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden border border-editorial-ink/25 bg-editorial-white shadow-none dark:border-editorial-cream/25 dark:bg-zinc-900/30">
            {/* Header of Content Panel */}
            <div className="border-b border-editorial-ink/15 bg-[#F2F0E9] px-6 py-5 sm:px-8 dark:border-editorial-cream/20 dark:bg-zinc-900/50">
              <span className="font-mono text-[10px] font-black uppercase tracking-widest text-editorial-rust">
                {selectedTopic.category}
              </span>
              <h2 className="mt-1 font-serif text-xl sm:text-2xl font-black text-editorial-ink dark:text-editorial-cream tracking-tight" id="active-theory-title">
                {selectedTopic.title}
              </h2>
              <p className="mt-1 font-sans text-xs sm:text-sm text-editorial-ink/65 dark:text-editorial-cream/65">
                {selectedTopic.subtitle}
              </p>
            </div>

            {/* Document Body */}
            <div className="px-6 py-6 sm:px-8 sm:py-8 lg:max-h-[60vh] lg:overflow-y-auto scrollbar-thin scrollbar-thumb-editorial-rust/35" id="theory-text-body">
              <div className="prose prose-stone max-w-none dark:prose-invert">
                {formatContent(selectedTopic.content)}
              </div>
            </div>

            {/* Micro Quick Warning Block for exams */}
            <div className="border-t border-editorial-ink/10 bg-editorial-egg px-6 py-4 sm:px-8 dark:border-editorial-cream/10 dark:bg-[#1C1C1C]">
              <div className="flex items-start space-x-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-editorial-rust" />
                <div className="font-sans text-xs text-editorial-ink/95 dark:text-editorial-cream/95 leading-relaxed">
                  <strong className="font-bold">Tips Ujian UTBK:</strong> Jangan mengandalkan teknik membaca memindai (scanning) cepat pada soal inferensi tingkat C1. Catat keyword transisi seperti <code className="bg-editorial-rust/10 border border-editorial-rust/30 text-editorial-rust font-mono text-[10px] px-1 py-0.5">conversely</code> atau <code className="bg-editorial-rust/10 border border-editorial-rust/30 text-editorial-rust font-mono text-[10px] px-1 py-0.5">precipitated by</code> yang mengubah validitas sebab-akibat kalimat.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
