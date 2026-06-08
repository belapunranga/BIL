/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Award, FileText, LayoutDashboard, Compass, Eye, ShieldAlert, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  scoreReleased: boolean;
  totalAnswered: number;
  totalQuestions: number;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  scoreReleased,
  totalAnswered,
  totalQuestions,
}: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'theory', label: 'Complete Theory', icon: BookOpen },
    { id: 'vbank', label: 'Vocabulary Bank', icon: LayoutDashboard },
    { id: 'practice', label: 'Practice Test', icon: FileText },
    { id: 'report', label: 'Score Report', icon: Award, locked: !scoreReleased },
    { id: 'review', label: 'Review Answers', icon: Eye, locked: !scoreReleased },
  ];

  const answeredPercentage = Math.round((totalAnswered / totalQuestions) * 100);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-editorial-ink/25 bg-editorial-cream/95 backdrop-blur-md transition-colors duration-200 dark:border-editorial-cream/25 dark:bg-editorial-ink/95" id="app-navbar">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center border border-editorial-ink bg-editorial-rust text-editorial-cream dark:border-editorial-cream dark:bg-editorial-rust">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <span className="text-md block font-serif font-black tracking-tight leading-none text-editorial-ink dark:text-editorial-cream sm:text-lg">
                ADVANCED ENGLISH
              </span>
              <span className="block font-sans text-[10px] uppercase tracking-widest font-bold leading-3 text-editorial-rust dark:text-editorial-rust">
                Prep Level: B2–C1 CEFR / UTBK
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              if (item.locked) {
                return (
                  <button
                    key={item.id}
                    disabled
                    id={`nav-${item.id}`}
                    className="flex cursor-not-allowed items-center space-x-2 px-3 py-2 font-sans text-xs uppercase tracking-widest font-black text-editorial-ink/30 dark:text-editorial-cream/30"
                    title="Selesaikan ujian terlebih dahulu untuk membuka menu ini"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    <ShieldAlert className="h-3 w-3 text-editorial-rust" />
                  </button>
                );
              }
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 font-sans text-xs uppercase tracking-widest font-black transition-all duration-150 border border-transparent ${
                    isActive
                      ? 'bg-editorial-ink text-editorial-cream border-editorial-ink dark:bg-editorial-cream dark:text-editorial-ink dark:border-editorial-cream'
                      : 'text-editorial-ink/80 hover:bg-editorial-egg dark:text-editorial-cream/80 dark:hover:bg-editorial-cream/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Controls: Theme & Progress */}
          <div className="flex items-center space-x-4">
            {/* Quick Progress Bar for exam */}
            <div className="hidden md:flex md:flex-col md:items-end">
              <span className="font-mono text-[10px] font-bold text-editorial-ink/75 dark:text-editorial-cream/75">
                PROGRESS: {totalAnswered}/{totalQuestions} ({answeredPercentage}%)
              </span>
              <div className="mt-1 h-1 w-32 border border-editorial-ink/20 bg-editorial-accent dark:border-editorial-cream/20 dark:bg-editorial-accent/20">
                <div
                  className="h-full bg-editorial-rust transition-all duration-300"
                  style={{ width: `${answeredPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="border border-editorial-ink/20 hover:border-editorial-ink bg-transparent p-2 text-editorial-ink dark:border-editorial-cream/20 dark:bg-transparent dark:text-editorial-cream transition-all"
              aria-label="Toggle dark mode"
              id="theme-toggler"
            >
              {darkMode ? <Sun className="h-4 w-4 text-editorial-rust" /> : <Moon className="h-4 w-4 text-editorial-rust" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Sub-menu (Scrollable Row) */}
      <div className="flex items-center justify-start overflow-x-auto border-t border-editorial-ink/25 bg-editorial-egg px-4 py-2 lg:hidden dark:border-editorial-cream/25 dark:bg-editorial-ink scrollbar-none">
        <div className="flex space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            if (item.locked) {
              return (
                <div
                  key={item.id}
                  className="flex shrink-0 items-center space-x-1.5 border border-dashed border-editorial-ink/20 px-3 py-1 font-sans text-[11px] uppercase tracking-wider font-extrabold text-editorial-ink/35 dark:border-editorial-cream/20 dark:text-editorial-cream/35"
                >
                  <Icon className="h-3 w-3" />
                  <span>{item.label}</span>
                </div>
              );
            }
            return (
              <button
                key={item.id}
                id={`nav-mob-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex shrink-0 items-center space-x-1.5 border px-3 py-1 font-sans text-[11px] uppercase tracking-wider font-black transition-all duration-150 ${
                  isActive
                    ? 'bg-editorial-ink text-editorial-cream border-editorial-ink dark:bg-editorial-cream dark:text-editorial-ink dark:border-editorial-cream'
                    : 'bg-editorial-white text-editorial-ink border-editorial-ink/30 dark:bg-editorial-ink dark:text-editorial-cream dark:border-editorial-cream/30'
                }`}
              >
                <Icon className="h-3 w-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
