/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { vocabularyBank } from '../data/vocabulary';
import { VocabItem } from '../types';
import { Search, RotateCw, ChevronLeft, ChevronRight, Play, Eye, ListFilter, Trash2 } from 'lucide-react';

export default function VocabularySection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'table' | 'flashcard'>('table');
  
  // Flashcard states
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // List of categories derived dynamically
  const categories = ['All', 'Academic', 'Economics', 'Government', 'Environmental', 'Palm Oil', 'Financial', 'Social Issues', 'Advanced Verbs', 'Advanced Adjectives', 'Slang'];

  // Filter items
  const filteredVocab = vocabularyBank.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.synonym.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const currentFlashcard: VocabItem | undefined = filteredVocab[currentCardIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % filteredVocab.length);
    }, 150);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev === 0 ? filteredVocab.length - 1 : prev - 1));
    }, 150);
  };

  const resetFlashcards = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id="vocabulary-section">
      {/* Header */}
      <div className="flex flex-col justify-between border-b border-editorial-ink/15 pb-6 lg:flex-row lg:items-end dark:border-editorial-cream/15">
        <div>
          <div className="inline-flex items-center border border-editorial-rust bg-editorial-rust/5 px-2.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-widest text-editorial-rust">
            <span>Bank Kosakata C1 Advanced</span>
          </div>
          <h1 className="mt-2 font-serif text-2xl font-black italic tracking-tighter text-editorial-ink dark:text-editorial-cream sm:text-3xl">
            Sovereign Vocabulary Hub
          </h1>
          <p className="mt-2 font-sans text-xs sm:text-sm text-editorial-ink/75 dark:text-[#A7A6A0]">
            Akses {vocabularyBank.length} kosakata esensial B2–C1 untuk menganalisis bacaan akademik, teks eksplanasi, hingga wacana sosial & politik.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="mt-4 flex items-center space-x-2 lg:mt-0">
          <button
            onClick={() => { setViewMode('table'); resetFlashcards(); }}
            className={`px-4 py-2 font-sans text-xs font-bold tracking-tight cursor-pointer transition-all border ${
              viewMode === 'table'
                ? 'border-editorial-ink bg-editorial-ink text-editorial-cream dark:bg-editorial-cream dark:text-editorial-ink dark:border-editorial-cream'
                : 'border-editorial-ink/25 bg-editorial-white text-editorial-ink/80 hover:bg-editorial-egg dark:border-editorial-cream/15 dark:bg-zinc-900/10 dark:text-[#E2E0D5]/80 dark:hover:bg-zinc-900'
            }`}
            id="vbank-table-mode-btn"
          >
            Table View ({filteredVocab.length})
          </button>
          <button
            onClick={() => { setViewMode('flashcard'); resetFlashcards(); }}
            className={`px-4 py-2 font-sans text-xs font-bold tracking-tight cursor-pointer transition-all border ${
              viewMode === 'flashcard'
                ? 'border-editorial-ink bg-editorial-ink text-editorial-cream dark:bg-editorial-cream dark:text-editorial-ink dark:border-editorial-cream'
                : 'border-editorial-ink/25 bg-editorial-white text-editorial-ink/80 hover:bg-editorial-egg dark:border-editorial-cream/15 dark:bg-zinc-900/10 dark:text-[#E2E0D5]/80 dark:hover:bg-zinc-900'
            }`}
            id="vbank-flashcard-mode-btn"
          >
            Flashcard Mode
          </button>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute top-3.5 left-3.5 h-4 w-4 text-editorial-ink/50 dark:text-editorial-cream/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentCardIndex(0); }}
            placeholder="Cari kata, arti, atau sinonim..."
            className="w-full border border-editorial-ink/25 bg-editorial-white py-3 pl-11 pr-4 font-sans text-xs sm:text-sm focus:ring-1 focus:ring-editorial-rust focus:border-editorial-rust dark:border-editorial-cream/25 dark:bg-zinc-900 dark:text-white focus:outline-none"
            id="vocab-search-input"
          />
        </div>

        {/* Category Filters */}
        <div className="relative md:col-span-2">
          <div className="flex h-full items-center space-x-2 overflow-x-auto border border-editorial-ink/15 bg-[#F2F0E9] p-1.5 dark:border-editorial-cream/10 dark:bg-zinc-900/50 scrollbar-none" id="vocab-category-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentCardIndex(0); }}
                className={`shrink-0 px-3 py-1.5 font-sans text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-editorial-ink text-editorial-cream dark:bg-editorial-cream dark:text-editorial-ink'
                    : 'text-editorial-ink/65 hover:text-editorial-ink dark:text-editorial-cream/65 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Workspace Mode conditional layout */}
      {viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="mt-8 border border-editorial-ink/25 bg-editorial-white dark:border-editorial-cream/25 dark:bg-[#1E1E1E]/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left" id="vocab-table">
              <thead>
                <tr className="border-b border-editorial-ink/15 bg-editorial-egg text-xs font-black uppercase tracking-widest text-[#57534E] dark:border-editorial-cream/15 dark:bg-zinc-900/70">
                  <th className="px-6 py-4 font-sans">Word</th>
                  <th className="px-6 py-4 font-sans">Meaning</th>
                  <th className="px-6 py-4 font-sans">Example</th>
                  <th className="px-6 py-4 font-sans">Synonym</th>
                  <th className="px-6 py-4 font-sans text-right">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-editorial-ink/10 dark:divide-editorial-cream/10 font-sans text-sm text-editorial-ink/90 dark:text-[#E2E0D5]">
                {filteredVocab.map((item) => (
                  <tr key={item.id} className="hover:bg-editorial-egg/40 dark:hover:bg-zinc-900/20 transition-colors" id={`vocab-row-${item.id}`}>
                    <td className="px-6 py-4 font-serif font-black text-editorial-ink dark:text-editorial-cream text-base">
                      {item.word}
                    </td>
                    <td className="px-6 py-4 leading-relaxed text-xs sm:text-sm">
                      {item.meaning}
                    </td>
                    <td className="px-6 py-4 font-serif text-xs italic leading-relaxed text-editorial-ink/60 dark:text-[#A7A6A0]/85">
                      "{item.example}"
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-editorial-rust font-bold">
                      {item.synonym}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center border border-editorial-rust/20 bg-editorial-rust/5 px-2.5 py-0.5 font-sans text-[10px] font-bold text-editorial-rust">
                        {item.category}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredVocab.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-editorial-ink/50 dark:text-editorial-cream/55 font-sans text-sm">
                      Tidak ada kosakata yang cocok dengan filter pencarian tersebut.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* INSTANT FLASHCARD MODE */
        <div className="mt-10 flex flex-col items-center justify-center" id="flashcard-deck">
          {filteredVocab.length > 0 && currentFlashcard ? (
            <div className="w-full max-w-lg">
              {/* Flashing Box */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`relative h-80 w-full cursor-pointer border transition-all duration-300 select-none [perspective:1000px] ${
                  isFlipped
                    ? 'border-editorial-rust bg-editorial-rust/5 shadow-none'
                    : 'border-editorial-ink/20 bg-editorial-white dark:border-editorial-cream/20 dark:bg-zinc-900/60'
                }`}
                id="active-flashcard"
              >
                <div className={`relative h-full w-full duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                  {/* FRONT SIDE */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center [backface-visibility:hidden] ${isFlipped ? 'pointer-events-none' : ''}`}>
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#C2410C]">
                      Kategori: {currentFlashcard.category}
                    </span>
                    <h2 className="mt-4 font-serif text-3xl font-black italic tracking-tighter text-editorial-ink dark:text-editorial-cream sm:text-4xl">
                      {currentFlashcard.word}
                    </h2>
                    <p className="mt-8 flex items-center space-x-1.5 font-sans text-xs font-bold text-editorial-ink/50 dark:text-editorial-cream/50 hover:text-editorial-rust transition-all">
                      <RotateCw className="h-3 w-3 animate-spin mr-1 text-editorial-rust" />
                      <span>Klik untuk melihat arti kata</span>
                    </p>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8 text-left [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div>
                      <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#C2410C]">
                        {currentFlashcard.word} - {currentFlashcard.category}
                      </span>
                      <h3 className="mt-3 font-serif text-base font-bold leading-normal text-editorial-ink dark:text-editorial-cream sm:text-lg">
                        {currentFlashcard.meaning}
                      </h3>
                      <p className="mt-4 font-serif text-xs italic leading-relaxed text-editorial-ink/65 dark:text-editorial-cream/65">
                        "{currentFlashcard.example}"
                      </p>
                    </div>

                    <div className="border-t border-editorial-ink/10 pt-4 dark:border-editorial-cream/10">
                      <span className="block font-mono text-[10px] uppercase font-black text-editorial-ink/45 dark:text-editorial-cream/45">
                        Synonyms:
                      </span>
                      <span className="font-mono text-sm font-black text-[#C2410C]">
                        {currentFlashcard.synonym}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Count & Buttons */}
              <div className="mt-6 flex items-center justify-between px-2">
                <span className="font-mono text-xs text-editorial-ink/60 dark:text-editorial-cream/60">
                  Kartu ke: {currentCardIndex + 1} dari {filteredVocab.length}
                </span>

                <div className="flex space-x-3">
                  <button
                    onClick={handlePrevCard}
                    className="flex h-10 w-10 items-center justify-center border border-editorial-ink bg-[#F2F0E9] hover:bg-editorial-ink hover:text-editorial-cream cursor-pointer text-editorial-ink transition-all dark:border-editorial-cream dark:bg-zinc-900"
                    id="flashcard-prev-btn"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextCard}
                    className="flex h-10 w-10 items-center justify-center border border-editorial-ink bg-[#F2F0E9] hover:bg-editorial-ink hover:text-editorial-cream cursor-pointer text-editorial-ink transition-all dark:border-editorial-cream dark:bg-zinc-900"
                    id="flashcard-next-btn"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center font-sans text-sm text-editorial-ink/50 dark:text-editorial-cream/55">
              Tidak ada kartu yang cocok untuk dipelajari. Silakan filter ulang pencarian Anda.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
