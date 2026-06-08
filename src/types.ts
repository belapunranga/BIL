/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VocabItem {
  id: string;
  word: string;
  meaning: string;
  example: string;
  synonym: string;
  category:
    | 'Academic'
    | 'Economics'
    | 'Government'
    | 'Environmental'
    | 'Palm Oil'
    | 'Financial'
    | 'Social Issues'
    | 'Advanced Verbs'
    | 'Advanced Adjectives'
    | 'Slang'
    | string;
}

export interface QuestionOption {
  key: string;
  text: string;
}

export type QuestionType = 'single' | 'complex' | 'tf' | 'short';

export interface TFStatement {
  id: string;
  text: string;
  isCorrect: boolean; // true = True, false = False
}

export interface Question {
  id: string;
  passageId: string;
  type: QuestionType;
  questionNumber: number;
  questionText: string;
  options?: QuestionOption[]; // for single and complex
  correctAnswer?: string | string[]; // single (string e.g. "A"), complex (array e.g. ["A","B","D"]), short (string)
  tfStatements?: TFStatement[]; // for tf (4 statements)
  correctTfAnswers?: boolean[]; // matching index of tfStatements
  explanation: {
    correctResponse: string;
    distractorAnalysis: string; // analysis of other options
    strategy: string;
    vocabAnalysis: string;
    criticalThinking: string;
  };
}

export interface Passage {
  id: string;
  title: string;
  theme: 'Oil Palm' | 'Rupiah Devaluation' | 'State Budget' | 'Media Framing & Political Communication';
  text: string;
  wordCount: number;
}

export interface UserAnswers {
  [questionId: string]: any; // single: string, complex: string[], tf: boolean[], short: string
}

export interface FlaggedQuestions {
  [questionId: string]: boolean;
}
