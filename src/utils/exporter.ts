/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { passages } from '../data/passages';
import { questions } from '../data/questions';
import { vocabularyBank } from '../data/vocabulary';
import { theoryTopics } from '../data/theory';

export function generateSingleFileHtml(): string {
  // Serialize our data structures
  const passagesJson = JSON.stringify(passages);
  const questionsJson = JSON.stringify(questions);
  const vocabJson = JSON.stringify(vocabularyBank);
  const theoryJson = JSON.stringify(theoryTopics);

  return `<!DOCTYPE html>
<html lang="en" class="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced English Prep Portal (B2–C1 CEFR / UTBK)</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Custom Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap">
  
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>
  <style>
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }
    .dark ::-webkit-scrollbar-thumb {
      background: #334155;
    }
    .list-circle {
      list-style-type: circle;
    }
  </style>
</head>
<body class="bg-gray-50 text-gray-900 transition-colors duration-150 dark:bg-gray-950 dark:text-gray-100 min-h-screen flex flex-col font-sans">

  <!-- INJECTED MASTER DATABASES -->
  <script id="data-passages" type="application/json">${passagesJson}</script>
  <script id="data-questions" type="application/json">${questionsJson}</script>
  <script id="data-vocab" type="application/json">${vocabJson}</script>
  <script id="data-theory" type="application/json">${theoryJson}</script>

  <!-- APP STATE CONTROLLER -->
  <script>
    // Load databases
    const passages = JSON.parse(document.getElementById('data-passages').textContent);
    const questions = JSON.parse(document.getElementById('data-questions').textContent);
    const vocabularyList = JSON.parse(document.getElementById('data-vocab').textContent);
    const theoryTopics = JSON.parse(document.getElementById('data-theory').textContent);

    // Dynamic state
    let state = {
      activeTab: 'home',
      darkMode: false,
      userAnswers: {}, // questionId -> response value
      flaggedQuestions: {}, // questionId -> boolean
      timerSeconds: 10800, // 3 hours
      examSubmitted: false,
      activeQuestionIdx: 0,
      
      // Vocab bank filters
      vocabSearch: '',
      vocabCategory: 'All',
      vocabMode: 'table', // 'table' | 'flashcard'
      flashcardIdx: 0,
      flashcardFlipped: false,

      // Theory index
      theoryTopicId: 'reading-comprehension',
      theorySearch: '',
    };

    let timerInterval = null;

    // UI Redraw & Dispatch
    function dispatch(key, value) {
      state[key] = value;
      render();
    }

    function toggleDarkMode() {
      state.darkMode = !state.darkMode;
      const html = document.documentElement;
      if (state.darkMode) {
        html.classList.add('dark');
        html.classList.remove('light');
      } else {
        html.classList.add('light');
        html.classList.remove('dark');
      }
      render();
    }

    function handleTabClick(tabId) {
      if ((tabId === 'report' || tabId === 'review') && !state.examSubmitted) {
        alert('Selesaikan simulasi ujian Anda terlebih dahulu untuk mengakses menu laporan skor!');
        return;
      }
      state.activeTab = tabId;
      render();
    }

    function startTimer() {
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        if (state.examSubmitted) {
          clearInterval(timerInterval);
          return;
        }
        if (state.timerSeconds <= 0) {
          clearInterval(timerInterval);
          submitExam();
          return;
        }
        state.timerSeconds--;
        updateTimerDisplay();
      }, 1000);
    }

    function parseTime(sec) {
      const hours = Math.floor(sec / 3600);
      const mins = Math.floor((sec % 3600) / 60);
      const secs = sec % 60;
      return \`\${hours.toString().padStart(2, '0')}:\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
    }

    function updateTimerDisplay() {
      const timerLabel = document.getElementById('timer-count-label');
      if (timerLabel) {
        timerLabel.textContent = parseTime(state.timerSeconds);
      }
    }

    function submitExam() {
      state.examSubmitted = true;
      state.activeTab = 'report';
      clearInterval(timerInterval);
      render();
    }

    function resetExam() {
      state.userAnswers = {};
      state.flaggedQuestions = {};
      state.timerSeconds = 10800;
      state.examSubmitted = false;
      state.activeQuestionIdx = 0;
      state.activeTab = 'practice';
      startTimer();
      render();
    }

    // Checking if specified question is answered
    function isQuestionAnswered(q) {
      const ans = state.userAnswers[q.id];
      if (ans === undefined || ans === null) return false;
      if (q.type === 'single') return typeof ans === 'string' && ans !== '';
      if (q.type === 'complex') return Array.isArray(ans) && ans.length > 0;
      if (q.type === 'tf') {
        const statements = q.tfStatements || [];
        return statements.every(s => ans[s.id] !== undefined);
      }
      if (q.type === 'short') return typeof ans === 'string' && ans.trim() !== '';
      return false;
    }

    function isCorrect(q) {
      const ans = state.userAnswers[q.id];
      if (ans === undefined || ans === null) return false;
      if (q.type === 'single') return ans === q.correctAnswer;
      if (q.type === 'complex') {
        if (!Array.isArray(ans)) return false;
        const sortedAns = [...ans].sort();
        const sortedCorr = [...q.correctAnswer].sort();
        return JSON.stringify(sortedAns) === JSON.stringify(sortedCorr);
      }
      if (q.type === 'tf') {
        const statements = q.tfStatements || [];
        return statements.every(s => ans[s.id] === s.isCorrect);
      }
      if (q.type === 'short') return ans.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
      return false;
    }
  </script>

  <!-- NAVIGATION HEADER -->
  <header class="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md transition-colors dark:border-gray-800 dark:bg-gray-950/95">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <div>
            <span class="block text-md font-bold text-gray-900 dark:text-white uppercase tracking-tight">ADVANCED ENGLISH</span>
            <span class="block text-[10px] font-mono leading-none text-indigo-600 dark:text-indigo-400">Offline Master File - UTBK / C1</span>
          </div>
        </div>

        {/* Tab row */}
        <div class="hidden lg:flex space-x-1" id="tab-desktop-row"></div>

        <div class="flex items-center space-x-4">
          <button onclick="toggleDarkMode()" class="rounded-xl bg-gray-50 p-2 border border-gray-150 dark:bg-gray-900 dark:border-gray-800 hover:opacity-80">
            <svg id="theme-icon" class="h-4 w-4 text-indigo-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20"></svg>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- MOBILE TAB ROW -->
  <div class="lg:hidden flex overflow-x-auto border-b border-gray-150 bg-gray-50 px-4 py-2 dark:border-gray-900 dark:bg-gray-950 scrollbar-none" id="tab-mobile-row"></div>

  <!-- CONTAINER FRAME -->
  <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8" id="view-panel"></main>

  <!-- GLOBAL FOOTER -->
  <footer class="border-t border-gray-200 py-6 text-center text-xs text-gray-400 dark:border-gray-800">
    <div class="mx-auto max-w-7xl px-4 font-mono">
      © 2026 Sovereign English Advanced Preparation Platform. Compiled Single-File Build. Fully Functional Offline.
    </div>
  </footer>

  <script>
    // HTML RENDERING ENGINE
    function render() {
      // 1. Theme icon update
      const themeIcon = document.getElementById('theme-icon');
      if (themeIcon) {
        if (state.darkMode) {
          // Sun Icon paths
          themeIcon.innerHTML = \`<path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 2.293a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM17 10a1 1 0 110 2h-1a1 1 0 110-2h1zm-2.293 4.707a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 17a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.707-2.293a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM3 10a1 1 0 110-2h1a1 1 0 110 2H3zm2.293-4.707a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />\`;
        } else {
          // Moon Icon paths
          themeIcon.innerHTML = \`<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />\`;
        }
      }

      // 2. Render desktop navigation controls
      const navRowHtml = \`
        <button onclick="handleTabClick('home')" class="px-3 py-2 text-xs font-bold rounded-lg \${state.activeTab === 'home' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300'}\">Home</button>
        <button onclick="handleTabClick('theory')" class="px-3 py-2 text-xs font-bold rounded-lg \${state.activeTab === 'theory' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300'}\">Complete Theory</button>
        <button onclick="handleTabClick('vbank')" class="px-3 py-2 text-xs font-bold rounded-lg \${state.activeTab === 'vbank' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300'}\">Vocabulary Bank</button>
        <button onclick="handleTabClick('practice')" class="px-3 py-2 text-xs font-bold rounded-lg \${state.activeTab === 'practice' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300'}\">Practice Test</button>
        <button onclick="handleTabClick('report')" class="\${state.examSubmitted ? '' : 'opacity-40 cursor-not-allowed'} px-3 py-2 text-xs font-bold rounded-lg \${state.activeTab === 'report' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300'}\">Score Report</button>
        <button onclick="handleTabClick('review')" class="\${state.examSubmitted ? '' : 'opacity-40 cursor-not-allowed'} px-3 py-2 text-xs font-bold rounded-lg \${state.activeTab === 'review' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300'}\">Review Answers</button>
      \`;
      document.getElementById('tab-desktop-row').innerHTML = navRowHtml;
      document.getElementById('tab-mobile-row').innerHTML = navRowHtml;

      // 3. Select panel loader
      const viewPanel = document.getElementById('view-panel');
      if (state.activeTab === 'home') {
        renderHome(viewPanel);
      } else if (state.activeTab === 'theory') {
        renderTheory(viewPanel);
      } else if (state.activeTab === 'vbank') {
        renderVocabulary(viewPanel);
      } else if (state.activeTab === 'practice') {
        renderPractice(viewPanel);
      } else if (state.activeTab === 'report') {
        renderReport(viewPanel);
      } else if (state.activeTab === 'review') {
        renderReview(viewPanel);
      }
    }

    // HOME TAB VIEWER
    function renderHome(container) {
      container.innerHTML = \`
        <div class="text-center py-10">
          <div class="inline-flex items-center space-x-2 rounded-full bg-indigo-50 px-3 py-1 font-mono text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400">
            <span>Ujian Bahasa Inggris Lanjutan Mandiri (Offline)</span>
          </div>
          <h1 class="mt-4 font-sans text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Sovereign Advanced Prep Portal
          </h1>
          <p class="mt-3 max-w-xl mx-auto font-sans text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Selamat datang di bundel mandiri persiapan ujian Bahasa Inggris Lanjutan level B2-C1 CEFR. File tunggal ini berisi materi teori komprehensif, puluhan simulasi soal tingkat tinggi (UTBK), dan bank ratusan data kosakata lengkap.
          </p>

          <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            <div onclick="handleTabClick('theory')" class="cursor-pointer rounded-2xl border border-gray-150 bg-white p-6 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 text-left transition-all">
              <div class="text-indigo-600 font-bold mb-2">📚 1. Complete Theory</div>
              <p class="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Kupas tuntas 15 strategi analisis reading, text design analytical explanation, morphology, dan casual slang register.</p>
            </div>
            <div onclick="handleTabClick('vbank')" class="cursor-pointer rounded-2xl border border-gray-150 bg-white p-6 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 text-left transition-all">
              <div class="text-indigo-600 font-bold mb-2">💡 2. Vocabulary Bank</div>
              <p class="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Akses lebih dari 250 kosa kata esensial akademik, lingkungan, minyak sawit, keuangan, slang, lengkap dengan sinonim & flashcard.</p>
            </div>
            <div onclick="handleTabClick('practice')" class="cursor-pointer rounded-2xl border border-gray-150 bg-white p-6 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 text-left transition-all">
              <div class="text-indigo-600 font-bold mb-2">⚡ 3. Practice Test</div>
              <p class="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Uji batas kemampuan logika berpikir Anda dengan 45 soal UTBK multi-part (single, complex, True/False, short).</p>
            </div>
          </div>

          <div class="mt-12">
            <button onclick="handleTabClick('practice')" class="rounded-xl bg-indigo-600 px-8 py-3 text-sm font-black text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20">
              Mulai Simulasi Soal UTBK (45 Soal)
            </button>
          </div>
        </div>
      \`;
    }

    // THEORY RENDERING
    function renderTheory(container) {
      const activeTopic = theoryTopics.find(t => t.id === state.theoryTopicId) || theoryTopics[0];
      const itemsHtml = theoryTopics.map(t => \`
        <button onclick="state.theoryTopicId='\${t.id}'; render();" class="shrink-0 text-left rounded-xl px-4 py-3 border \${t.id === activeTopic.id ? 'bg-indigo-600 text-white border-indigo-600 font-bold' : 'bg-white border-gray-150 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300'}\">
          <span class="block text-sm">\${t.title}</span>
          <span class="block text-[9px] uppercase font-mono tracking-wider font-bold \${t.id === activeTopic.id ? 'text-indigo-200' : 'text-gray-400'}">\${t.category}</span>
        </button>
      \`).join('');

      // Simple markdown format handler
      const lines = activeTopic.content.split('\\n');
      const formattedContent = lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '<div class="h-2"></div>';
        if (trimmed.startsWith('### ')) {
          return \`<h3 class="font-bold text-md text-gray-900 dark:text-white border-b border-gray-150 dark:border-gray-800 pb-1 mt-5 mb-2">\${trimmed.replace('### ', '')}</h3>\`;
        }
        if (trimmed.startsWith('## ')) {
          return \`<h2 class="font-bold text-lg text-indigo-700 dark:text-indigo-400 mt-6 mb-3">\${trimmed.replace('## ', '')}</h2>\`;
        }
        if (trimmed.startsWith('*')) {
          return \`<li class="ml-5 list-disc text-sm py-0.5 text-gray-700 dark:text-gray-300">\${trimmed.replace(/^\*\\s*/, '')}</li>\`;
        }
        if (trimmed.startsWith('-')) {
          return \`<li class="ml-8 list-circle text-xs text-gray-500 dark:text-gray-400 py-0.5">\${trimmed.replace(/^-\\s*/, '')}</li>\`;
        }
        return \`<p class="text-xs sm:text-sm leading-relaxed mb-3 text-gray-600 dark:text-gray-400">\${trimmed}</p>\`;
      }).join('');

      container.innerHTML = \`
        <div>
          <h1 class="text-2xl font-black mb-1">Curriculum & Theory</h1>
          <p class="text-xs text-gray-400 mb-6">Materi dan kisi-kisi strategi membaca kritis paling lengkap.</p>
          
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div class="flex flex-col space-y-2 col-span-1 border-r border-gray-100 pr-4 dark:border-gray-900">
              \${itemsHtml}
            </div>
            
            <div class="col-span-3 bg-white p-6 rounded-2xl border border-gray-200 dark:bg-gray-900 dark:border-gray-800 shadow-sm max-h-[60vh] overflow-y-auto">
              \${formattedContent}
            </div>
          </div>
        </div>
      \`;
    }

    // VOCABULARY VIEW
    function renderVocabulary(container) {
      // Filters
      const filtered = vocabularyList.filter(item => {
        const query = state.vocabSearch.toLowerCase();
        const matchesQuery = item.word.toLowerCase().includes(query) || item.meaning.toLowerCase().includes(query) || item.synonym.toLowerCase().includes(query);
        const matchesCategory = state.vocabCategory === 'All' || item.category === state.vocabCategory;
        return matchesQuery && matchesCategory;
      });

      const categories = ['All', 'Academic', 'Economics', 'Government', 'Environmental', 'Palm Oil', 'Financial', 'Social Issues', 'Advanced Verbs', 'Advanced Adjectives', 'Slang'];
      
      const filterRow = categories.map(cat => \`
        <button onclick="state.vocabCategory='\${cat}'; state.flashcardIdx=0; render();" class="shrink-0 px-3 py-1 font-bold rounded-lg text-xs \${state.vocabCategory === cat ? 'bg-indigo-600 text-white' : 'text-gray-500 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300'}">\${cat}</button>
      \`).join('');

      let subLayout = '';
      if (state.vocabMode === 'table') {
        const rows = filtered.map(item => \`
          <tr class="border-b border-gray-100 hover:bg-gray-50/50 dark:border-gray-900 dark:hover:bg-gray-900/10">
            <td class="px-6 py-4 font-black dark:text-white text-xs sm:text-sm">\${item.word}</td>
            <td class="px-6 py-4 text-xs sm:text-sm">\${item.meaning}</td>
            <td class="px-6 py-4 text-xs italic text-gray-400 dark:text-gray-500 font-sans">"\${item.example}"</td>
            <td class="px-6 py-4 text-xs font-mono text-indigo-500">\${item.synonym}</td>
            <td class="px-6 py-4 text-right"><span class="px-2 py-0.5 rounded text-[9px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-500">\${item.category}</span></td>
          </tr>
        \`).join('');

        subLayout = \`
          <div class="border border-gray-200 rounded-2xl bg-white dark:bg-gray-950 dark:border-gray-800 overflow-x-auto shadow-sm">
            <table class="w-full min-w-[700px] border-collapse text-left text-sm text-gray-600 dark:text-gray-300">
              <thead class="bg-gray-50/50 dark:bg-gray-900/30 text-xs font-bold text-gray-400">
                <tr class="border-b border-gray-200 dark:border-gray-900">
                  <th class="px-6 py-3">Word</th>
                  <th class="px-6 py-3">Meaning</th>
                  <th class="px-6 py-3">Example Sentence</th>
                  <th class="px-6 py-3">Synonym</th>
                  <th class="px-6 py-3 text-right">Category</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-900">
                \${rows || '<tr><td colspan="5" class="py-8 text-center text-gray-400">Kosakata tidak ditemukan</td></tr>'}
              </tbody>
            </table>
          </div>
        \`;
      } else {
        // Flashcard rendering
        const card = filtered[state.flashcardIdx];
        if (card) {
          subLayout = \`
            <div class="max-w-lg mx-auto mt-6">
              <div onclick="state.flashcardFlipped = !state.flashcardFlipped; render();" class="cursor-pointer border border-gray-150 rounded-3xl p-8 bg-white dark:bg-gray-900 dark:border-gray-800 shadow-md text-center h-72 flex flex-col justify-between transition-all">
                \${state.flashcardFlipped ? \`
                  <div class="text-left py-2">
                    <span class="block text-[9px] uppercase font-mono tracking-widest text-indigo-500 font-bold">\${card.word} - \${card.category}</span>
                    <h3 class="font-sans text-sm sm:text-base font-black text-gray-900 mt-2 dark:text-white leading-normal">\${card.meaning}</h3>
                    <p class="text-xs italic text-gray-400 dark:text-gray-500 mt-3 font-sans">"\${card.example}"</p>
                    <div class="border-t border-gray-100 pt-4 dark:border-gray-800/80 mt-6">
                      <span class="block font-mono text-[9px] uppercase font-bold text-gray-400">Synonyms:</span>
                      <span class="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">\${card.synonym}</span>
                    </div>
                  </div>
                \` : \`
                  <div class="flex flex-col items-center justify-center my-auto">
                    <span class="text-[9px] uppercase font-mono tracking-widest text-indigo-500 font-bold">\${card.category}</span>
                    <h2 class="text-3xl font-black mt-2 dark:text-white">\${card.word}</h2>
                    <span class="block text-[10px] text-gray-400 mt-8">Klik untuk melihat arti</span>
                  </div>
                \`}
              </div>
              
              <div class="flex items-center justify-between px-3 mt-4 text-xs font-mono text-gray-400">
                <span>Kartu \${state.flashcardIdx + 1} of \${filtered.length}</span>
                <div class="flex space-x-2">
                  <button onclick="state.flashcardFlipped=false; state.flashcardIdx = (state.flashcardIdx === 0 ? \${filtered.length - 1} : state.flashcardIdx - 1); render();" class="p-2 border border-gray-150 bg-white dark:bg-gray-900 dark:border-gray-800 rounded-xl hover:bg-gray-50"><- Back</button>
                  <button onclick="state.flashcardFlipped=false; state.flashcardIdx = (state.flashcardIdx + 1) % \${filtered.length}; render();" class="p-2 border border-gray-150 bg-white dark:bg-gray-900 dark:border-gray-800 rounded-xl hover:bg-gray-50">Next -></button>
                </div>
              </div>
            </div>
          \`;
        } else {
          subLayout = '<div class="py-12 text-center text-gray-400">Silakan perkecil filter pencarian Anda.</div>';
        }
      }

      container.innerHTML = \`
        <div>
          <div class="flex flex-col justify-between border-b border-gray-100 dark:border-gray-900 pb-5 md:flex-row md:items-end">
            <div>
              <h1 class="text-2xl font-black">Sovereign Vocabulary Hub</h1>
              <p class="text-xs text-gray-400">Akses list perbendaharaan kosa kata advanced level C1 secara komprehensif.</p>
            </div>
            <div class="flex space-x-2 mt-4 md:mt-0">
              <button onclick="state.vocabMode='table'; state.flashcardIdx=0; render();" class="px-3 py-1.5 rounded-lg text-xs font-bold \${state.vocabMode === 'table' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-400'}\">Table View (\${filtered.length})</button>
              <button onclick="state.vocabMode='flashcard'; state.flashcardIdx=0; render();" class="px-3 py-1.5 rounded-lg text-xs font-bold \${state.vocabMode === 'flashcard' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-400'}\">Flashcards</button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6 mb-8">
            <input type="text" value="\${state.vocabSearch}" oninput="state.vocabSearch=this.value; state.flashcardIdx=0; render();" placeholder="Cari kata, arti, atau sinonim..." class="p-3 border border-gray-200 dark:border-gray-800 dark:bg-gray-950 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600" />
            <div class="md:col-span-2 flex items-center space-x-2 overflow-x-auto py-1 scrollbar-none">\${filterRow}</div>
          </div>

          \${subLayout}
        </div>
      \`;
    }

    // PRACTICE EXAM VIEWER
    function renderPractice(container) {
      if (state.examSubmitted) {
        container.innerHTML = \`
          <div class="py-12 text-center font-sans">
            <div class="text-5xl mb-4">🏆</div>
            <h2 class="text-xl font-black">Ujian Telah Disubmit!</h2>
            <p class="text-xs text-gray-500 mt-2 mb-6">Hasil dan akurasi skor Anda dapat diakses di menu Score Report.</p>
            <button onclick="handleTabClick('report')" class="px-6 py-2.5 rounded-xl bg-indigo-600 font-bold text-white text-xs hover:bg-indigo-500 shadow-md">Buka Laporan Skor (Score Report)</button>
          </div>
        \`;
        return;
      }

      // If timer is not running, start it
      if (!timerInterval) {
        startTimer();
      }

      const q = questions[state.activeQuestionIdx];
      const p = passages.find(pass => pass.id === q.passageId) || passages[0];

      // Cells grid mapping
      const cellsHtml = questions.map((it, idx) => {
        const active = state.activeQuestionIdx === idx;
        const ans = isQuestionAnswered(it);
        const flagged = state.flaggedQuestions[it.id];

        let bg = 'bg-white border-gray-200 text-gray-800 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-300';
        if (active) {
          bg = 'bg-indigo-600 text-white border-indigo-600';
        } else if (flagged) {
          bg = 'bg-amber-400 border-amber-400 text-gray-950';
        } else if (ans) {
          bg = 'bg-indigo-100 text-indigo-800 border-indigo-100 dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-900';
        }

        return \`
          <button onclick="state.activeQuestionIdx=\${idx}; render();" class="flex h-9 w-full items-center justify-center rounded-lg border font-mono text-xs font-black transition-all \${bg}">
            \${it.questionNumber}
          </button>
        \`;
      }).join('');

      // Render Active Choices choices panel template
      let choiceHtml = '';
      if (q.type === 'single') {
        choiceHtml = q.options.map(opt => {
          const selected = state.userAnswers[q.id] === opt.key;
          return \`
            <button onclick="state.userAnswers['\${q.id}']='\${opt.key}'; render();" class="flex w-full items-start space-x-3 rounded-xl border p-3.5 text-left transition-all \${selected ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/20 dark:text-white' : 'border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300'}\">
              <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-black border \${selected ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-800'}">\${opt.key}</span>
              <span class="text-xs sm:text-sm pt-0.5 leading-tight font-sans">\${opt.text}</span>
            </button>
          \`;
        }).join('');
      } else if (q.type === 'complex') {
        const currentList = state.userAnswers[q.id] || [];
        choiceHtml = \`
          <div class="mb-2 font-mono text-[9px] text-indigo-600 dark:text-indigo-400 font-bold">*Pilihlah TEPAT 3 opsi yang Anda anggap benar:</div>
        \` + q.options.map(opt => {
          const selected = currentList.includes(opt.key);
          const clickHandler = \`
            const lst = state.userAnswers['\${q.id}'] || [];
            let updated;
            if(lst.includes('\${opt.key}')) {
              updated = lst.filter(x => x !== '\${opt.key}');
            } else {
              updated = [...lst, '\${opt.key}'];
            }
            state.userAnswers['\${q.id}'] = updated;
            render();
          \`;
          return \`
            <button onclick="\${clickHandler}" class="flex w-full items-start space-x-3 rounded-xl border p-3.5 text-left transition-all \${selected ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/20 dark:text-white' : 'border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300'}\">
              <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-black border \${selected ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-800'}">\${opt.key}</span>
              <span class="text-xs sm:text-sm pt-0.5 leading-tight font-sans">\${opt.text}</span>
            </button>
          \`;
        }).join('');
      } else if (q.type === 'tf') {
        const answersMap = state.userAnswers[q.id] || {};
        choiceHtml = \`<div class="mb-2 font-mono text-[9px] text-indigo-600 dark:text-indigo-400 font-bold">*Tentukan Benar (True) atau Salah (False) untuk tiap poin pernyataan:</div>\` + q.tfStatements.map(stmt => {
          const selectedVal = answersMap[stmt.id];
          const trHandler = \`
            const mapp = state.userAnswers['\${q.id}'] || {};
            mapp['\${stmt.id}'] = true;
            state.userAnswers['\${q.id}'] = mapp;
            render();
          \`;
          const flHandler = \`
            const mapp = state.userAnswers['\${q.id}'] || {};
            mapp['\${stmt.id}'] = false;
            state.userAnswers['\${q.id}'] = mapp;
            render();
          \`;
          return \`
            <div class="rounded-xl border border-gray-150 p-3 bg-gray-50/30 dark:border-gray-800 dark:bg-gray-900/10 flex flex-col justify-between mb-2">
              <p class="font-sans text-xs text-gray-800 dark:text-gray-300 mb-2 leading-relaxed">\${stmt.text}</p>
              <div class="flex space-x-2">
                <button onclick="\${trHandler}" class="flex-1 rounded-lg py-1.5 font-mono text-[10px] sm:text-[11px] font-black border \${selectedVal === true ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800'}\">TRUE</button>
                <button onclick="\${flHandler}" class="flex-1 rounded-lg py-1.5 font-mono text-[10px] sm:text-[11px] font-black border \${selectedVal === false ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800'}\">FALSE</button>
              </div>
            </div>
          \`;
        }).join('');
      } else if (q.type === 'short') {
        const currentTextVal = state.userAnswers[q.id] || '';
        choiceHtml = \`
          <span class="block text-[9px] font-mono font-bold text-indigo-500">*Gunakan huruf kecil secara keseluruhan.</span>
          <input type="text" value="\${currentTextVal}" oninput="state.userAnswers['\${q.id}']=this.value; render();" placeholder="Ketik jawaban singkat Anda di sini..." class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-950 focus:outline-none dark:text-white" />
        \`;
      }

      const activeFlagged = state.flaggedQuestions[q.id];

      container.innerHTML = \`
        <div>
          <!-- TIMER BAR WORKSPACE -->
          <div class="mb-6 flex flex-col justify-between items-center rounded-2xl bg-indigo-900 px-6 py-4 text-white sm:flex-row dark:bg-indigo-950 shadow-md">
            <div class="flex items-center space-x-3 mb-3 sm:mb-0">
              <span class="block font-mono text-[9px] uppercase tracking-wider text-indigo-300">UTBK Simulation Countdown</span>
              <span id="timer-count-label" class="font-mono text-xl sm:text-2xl font-black">\${parseTime(state.timerSeconds)}</span>
            </div>
            
            <div class="flex items-center space-x-3">
              <button onclick="state.flaggedQuestions['\${q.id}']=!state.flaggedQuestions['\${q.id}']; render();" class="flex items-center space-x-1.5 rounded-xl border px-4 py-2 font-sans text-xs font-bold \${activeFlagged ? 'border-amber-400 bg-amber-400/20 text-amber-300' : 'border-white/20 hover:bg-white/10 text-white'}\">
                <span>\${activeFlagged ? 'Flagged Flag' : 'Tandai Ragu-Ragu'}</span>
              </button>
              <button onclick="submitExam()" class="flex items-center space-x-1.5 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-black text-white hover:bg-emerald-500 shadow-md">
                Kirim Ujian
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <!-- Left reading piece -->
            <div class="lg:col-span-2 bg-white p-6 sm:p-8 border border-gray-200 dark:bg-gray-950 dark:border-gray-900 shadow-sm rounded-2xl">
              <span class="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50">Tema: \${p.theme}</span>
              <h2 class="text-lg font-black dark:text-white mt-1 mb-1">\${p.title}</h2>
              <span class="block font-mono text-[10px] text-gray-400 mb-4">Word Count: \${p.wordCount} words</span>
              
              <div class="max-h-[50vh] overflow-y-auto font-sans text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-400">
                \${p.text.split('\\n\\n').map(paragraph => \`<p class="mb-3" style="text-indent: 1.5rem;">\${paragraph}</p>\`).join('')}
              </div>
            </div>

            <!-- Right Question grids & choices row -->
            <div class="flex flex-col space-y-4">
              <div class="rounded-xl border border-gray-200 p-4 bg-white dark:bg-gray-950 dark:border-gray-900 shadow-sm">
                <h3 class="font-sans text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Exam Navigation Grid</h3>
                <div class="grid grid-cols-5 gap-1.5">\${cellsHtml}</div>
              </div>

              <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:bg-gray-950 dark:border-gray-900 shadow-sm flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-900 mb-3 text-xs text-gray-400">
                    <span>Soal \${q.questionNumber} of \${questions.length}</span>
                    <span class="uppercase font-mono font-bold text-indigo-500 text-[9px]">\${q.type}</span>
                  </div>
                  <h3 class="font-sans text-sm font-black leading-snug text-gray-900 dark:text-white mb-6">\${q.questionText}</h3>
                  <div class="space-y-2">\${choiceHtml}</div>
                </div>

                <div class="flex justify-between items-center border-t border-gray-50 pt-4 dark:border-gray-900 mt-6">
                  <button \${state.activeQuestionIdx === 0 ? 'disabled' : ''} onclick="state.activeQuestionIdx--; render();" class="px-3 py-1.5 text-xs font-bold border border-gray-150 rounded-lg bg-white dark:bg-gray-900 dark:border-gray-800 hover:bg-gray-50 disabled:opacity-40"><- Kembali</button>
                  <button \${state.activeQuestionIdx === questions.length - 1 ? 'disabled' : ''} onclick="state.activeQuestionIdx++; render();" class="px-3 py-1.5 text-xs font-bold border border-gray-150 rounded-lg bg-white dark:bg-gray-900 dark:border-gray-800 hover:bg-gray-50 disabled:opacity-40">Lanjut -></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      \`;

      // Start counting down timer if not already active
      updateTimerDisplay();
    }

    // SCORE REPORT VIEW
    function renderReport(container) {
      const correctList = questions.filter(q => isCorrect(q));
      const numCorrect = correctList.length;
      const pct = Math.round((numCorrect / questions.length) * 100);

      // Category metrics
      const categories = ['Oil Palm', 'Rupiah Devaluation', 'State Budget', 'Media Framing & Political Communication'];
      const detailsHtml = categories.map(cat => {
        const passageIds = passages.filter(p => p.theme === cat).map(p => p.id);
        const catQuestions = questions.filter(q => passageIds.includes(q.passageId));
        const catCorrect = catQuestions.filter(q => isCorrect(q)).length;
        const catPct = catQuestions.length > 0 ? Math.round((catCorrect / catQuestions.length) * 100) : 0;
        
        return \`
          <div class="flex flex-col py-1.5">
            <div class="flex justify-between items-center text-xs font-sans mb-1">
              <span class="font-bold text-gray-800 dark:text-gray-200">\${cat}</span>
              <span class="text-gray-400 font-mono font-bold">\${catCorrect}/\${catQuestions.length} (\${catPct}%)</span>
            </div>
            <div class="h-1.5 w-full bg-gray-100 rounded-full dark:bg-gray-800">
              <div class="h-full rounded-full bg-indigo-600" style="width: \${catPct}%"></div>
            </div>
          </div>
        \`;
      }).join('');

      container.innerHTML = \`
        <div class="max-w-3xl mx-auto rounded-3xl overflow-hidden border border-gray-150 bg-white dark:bg-gray-950 dark:border-gray-900 shadow-xl">
          <div class="bg-indigo-900 px-8 py-10 text-center text-white dark:bg-indigo-950">
            <span class="text-[9px] uppercase font-mono tracking-widest text-indigo-300 font-bold">UTBK Performance Report Card</span>
            <h1 class="text-3xl font-black mt-2">Simulasi Ujian Selesai!</h1>
            
            <div class="relative flex items-center justify-center h-32 w-32 rounded-full border border-white/10 bg-white/5 mx-auto mt-6">
              <div class="text-center">
                <span class="block text-3xl font-mono font-black">\${numCorrect}/\${questions.length}</span>
                <span class="block text-[10px] font-bold text-indigo-200">Akurasi \${pct}%</span>
              </div>
            </div>
          </div>

          <div class="p-8">
            <h2 class="font-sans text-xs font-black uppercase tracking-wider text-gray-400 mb-3 border-b border-gray-100 pb-2 dark:border-gray-900">Performance Category Analysis</h2>
            <div class="space-y-4">\${detailsHtml}</div>

            <div class="mt-8 flex justify-center space-x-3">
              <button onclick="handleTabClick('review')" class="px-6 py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-500 shadow-md">Review Pembahasan Detail</button>
              <button onclick="resetExam()" class="px-6 py-2.5 rounded-xl border border-gray-150 bg-white dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 font-bold text-xs hover:bg-gray-50">Ulangi Ujian (Reset)</button>
            </div>
          </div>
        </div>
      \`;
    }

    // INTERACTIVE REVIEW VIEW
    function renderReview(container) {
      const q = questions[state.activeQuestionIdx];
      const p = passages.find(it => it.id === q.passageId) || passages[0];
      const correct = isCorrect(q);
      const userAnsStr = state.userAnswers[q.id] || 'Unanswered (Tidak diisi)';

      // Indeks grid
      const gridHtml = questions.map((it, idx) => {
        const active = state.activeQuestionIdx === idx;
        const right = isCorrect(it);
        const answered = state.userAnswers[it.id] !== undefined;

        let cellStyle = 'bg-gray-50 text-gray-500 border-gray-100 dark:bg-gray-900 dark:border-gray-800';
        if (active) {
          cellStyle = 'border-indigo-600 bg-indigo-600 text-white font-black';
        } else if (answered) {
          cellStyle = right
            ? 'border-emerald-100 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400'
            : 'border-rose-100 bg-rose-50 text-red-800 dark:bg-rose-950/20 dark:text-red-400';
        }

        return \`
          <button onclick="state.activeQuestionIdx=\${idx}; render();" class="flex h-9 w-full items-center justify-center rounded-lg border font-mono text-xs font-bold transition-all \${cellStyle}">
            \${it.questionNumber}
          </button>
        \`;
      }).join('');

      // Simple answers formats for displays
      let ansStrDisplay = '';
      if (q.type === 'complex') {
        ansStrDisplay = Array.isArray(userAnsStr) ? [...userAnsStr].sort().join(', ') : 'Tidak diisi';
      } else if (q.type === 'tf') {
        ansStrDisplay = Object.entries(userAnsStr).map(([k,v]) => \`Poin \${k.split('_s')[1] || 'Klaim'}: \${v ? 'TRUE' : 'FALSE'}\`).join(' | ') || 'Tidak diisi';
      } else {
        ansStrDisplay = userAnsStr;
      }

      let correctAnsDisplay = '';
      if (q.type === 'complex') {
        correctAnsDisplay = [...q.correctAnswer].sort().join(', ');
      } else if (q.type === 'tf') {
        correctAnsDisplay = q.tfStatements.map((it, i) => \`Poin \${i+1}: \${it.isCorrect ? 'TRUE' : 'FALSE'}\`).join(' | ');
      } else {
        correctAnsDisplay = q.correctAnswer;
      }

      container.innerHTML = \`
        <div>
          <h1 class="text-2xl font-black mb-1">Review Pembahasan & Analisis Soal</h1>
          <p class="text-xs text-gray-400 mb-6">Pecah dan pelajari logis dibalik masing-masing pilihan opsi.</p>

          <div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div class="col-span-1 rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-950">
              <h3 class="text-xs uppercase font-bold text-gray-400 mb-2">Daftar Soal</h3>
              <div class="grid grid-cols-5 gap-1.5">\${gridHtml}</div>
            </div>

            <div class="col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
              <div class="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800 mb-4 text-xs font-bold uppercase">
                <span class="text-indigo-600 uppercase">Soal \${q.questionNumber} - \${q.type}</span>
                <span class="\${correct ? 'text-emerald-500' : 'text-rose-500'} font-bold animate-pulse">\${correct ? '● Benar' : '● Salah/Belum Terjawab'}</span>
              </div>

              <h2 class="text-sm sm:text-base font-black mb-4 dark:text-white leading-snug">\${q.questionText}</h2>

              <div class="rounded-xl bg-gray-50/50 p-4 border border-gray-150 dark:bg-gray-950 dark:border-gray-800 text-xs sm:text-sm space-y-2 mb-6">
                <div><span class="font-bold text-gray-400">Jawaban Anda:</span> <span class="font-bold \${correct ? 'text-emerald-600' : 'text-rose-600'}">\${ansStrDisplay}</span></div>
                <div class="border-t border-gray-100/60 pt-2 dark:border-gray-800"><span class="font-bold text-gray-400 font-sans">Jawaban Benar:</span> <span class="font-bold text-emerald-600">\${correctAnsDisplay}</span></div>
              </div>

              <div class="space-y-4">
                <div>
                  <h4 class="text-[10px] uppercase font-mono tracking-wider font-bold text-indigo-500 mb-0.5">1. Analisis Kunci Jawaban</h4>
                  <p class="text-xs text-gray-700 dark:text-gray-400 leading-relaxed">\${q.explanation.correctResponse}</p>
                </div>
                <div>
                  <h4 class="text-[10px] uppercase font-mono tracking-wider font-bold text-indigo-500 mb-0.5">2. Analisis Distraktor</h4>
                  <p class="text-xs text-gray-700 dark:text-gray-400 leading-relaxed">\${q.explanation.distractorAnalysis}</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2 border-t border-gray-50 pt-4 dark:border-gray-800">
                  <div class="p-3 bg-gray-50/50 dark:bg-gray-950 rounded-xl">
                    <h5 class="text-[8px] font-bold text-indigo-500 font-mono tracking-wide uppercase">Reading Strategy</h5>
                    <p class="text-[11px] text-gray-600 dark:text-gray-400 leading-tight mt-1">\${q.explanation.strategy}</p>
                  </div>
                  <div class="p-3 bg-gray-50/50 dark:bg-gray-950 rounded-xl">
                    <h5 class="text-[8px] font-bold text-indigo-500 font-mono tracking-wide uppercase">Lexical Digest</h5>
                    <p class="text-[11px] text-gray-600 dark:text-gray-400 leading-tight mt-1">\${q.explanation.vocabAnalysis}</p>
                  </div>
                  <div class="p-3 bg-gray-50/50 dark:bg-gray-950 rounded-xl">
                    <h5 class="text-[8px] font-bold text-indigo-500 font-mono tracking-wide uppercase">Critical reasoning</h5>
                    <p class="text-[11px] text-gray-600 dark:text-gray-400 leading-tight mt-1">\${q.explanation.criticalThinking}</p>
                  </div>
                </div>
              </div>

              <div class="mt-8 flex justify-between items-center border-t border-gray-50 dark:border-gray-800/80 pt-4">
                <button \${state.activeQuestionIdx === 0 ? 'disabled' : ''} onclick="state.activeQuestionIdx--; render();" class="px-3 py-1.5 text-xs font-bold border border-gray-150 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-500 rounded-lg disabled:opacity-40"><- Back</button>
                <button \${state.activeQuestionIdx === questions.length - 1 ? 'disabled' : ''} onclick="state.activeQuestionIdx++; render();" class="px-3 py-1.5 text-xs font-bold border border-gray-150 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-500 rounded-lg disabled:opacity-40">Next -></button>
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    // BOOT
    startTimer();
    render();
  </script>
</body>
</html>`;
}
