/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TheoryTopic {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  content: string;
}

export const theoryTopics: TheoryTopic[] = [
  {
    id: 'reading-comprehension',
    title: 'Reading Comprehension Strategies',
    subtitle: 'Advanced tactics for master-level reasoning (B2–C1)',
    category: 'Reading Strategies',
    content: `
### 1. Main Idea & Author's Purpose
*   **Main Idea (Gagasan Utama):** In advanced texts, the main idea is rarely stated verbatim in the opening sentence. Instead, it is synthesized across the text. You must distinguish between the *topic* (a broad subject like "microplastics"), the *thesis* (the author's specific assertion about microplastics), and the *supporting details*.
    *   *Strategic Rule:* Locate the pivotal transition words (*however, nevertheless, conversely, on the contrary*) that indicate a shift in the argument. The main idea is often found immediately after these markers.
*   **Author’s Purpose (Tujuan Penulis):** The goal go beyond mere "to inform" or "to describe". At C1 level, authors write to *substantiate*, *demur*, *advocate*, *debunk*, *explicate*, or *reconcile* competing viewpoints.
    *   *Advanced Verbs to Know:* **Explicate** (explain in detail), **Demur** (raise objections), **Vindicate** (clear of blame/justify), **Deprecate** (express disapproval), **Substantiate** (provide evidence to support).

### 2. Tone & Author Attitude
*   **Tone Identification:** The author's emotional stance. High-level texts rarely use straightforward tones like "happy" or "sad". Instead, expect tones like *detached*, *clinical*, *facetious* (humorous, often inappropriately so), *sardonic* (grimly mocking), *laudatory* (expressing praise), *guardedly optimistic*, or *scathing* (bitterly harsh).
*   **Attitude Analysis:** To determine attitude, analyze the adjectives and adverbs. An author who writes "the plan was *ambitious but fraught with structural flaws*" holds a *critical yet appreciative* attitude.

### 3. Inference, Assumption, and Implication
*   **Inference (Kesimpulan Tersirat):** An inference is an unstated truth that *must* hold true based solely on the explicit evidence in the text.
    *   *Example:* If the passage states, "No domestic automobile manufacturer has survived without heavy state subsidies," you can infer that "Any surviving domestic carmaker has received government subsidies."
*   **Assumption (Asumsi Dasaran):** An assumption is an unstated premise upon which the author's logic depends. It precedes the conclusion.
    *   *The Denial Test:* To find the core assumption, negate the option. If the negated option completely collapses the author's argument, that option is the correct assumption.
*   **Implication (Implikasi):** What lies ahead as a natural consequence. If the rupiah's value plunges and import dependencies remain high, the *implication* is imminent domestic cost-push inflation.

### 4. Reference & Vocabulary in Context
*   **Pronoun Reference:** Advanced sentences have highly complex clauses. To find what a pronoun like "its" or "former" refers to, trace back through the parallel syntactic structure of the previous lines.
*   **Vocabulary in Context:** Test questions will use words with multiple meanings. Do not use your prior dictionary definition; instead, perform *semantic substitution* with the surrounding sentences.

### 5. Critical Reading & Logic Analysis
*   **Fact vs. Opinion:** Facts are empirically verifiable; opinions contain value-laden qualifiers ("unjustifiably", "ideal", "detrimental").
*   **Evaluating Arguments:** Assess the strength of the premises. Strong arguments are inductive or deductive without logical gaps.
*   **Common Logical Fallacies in Exams:**
    *   *Post hoc ergo propter hoc:* Confusing correlation with causation.
    *   *Straw Man:* Over-simplifying or misrepresenting an opponent's argument to make it easier to attack.
    *   *Ad Hominem:* Attacking the character of the disputant rather than their thesis.
    *   *Begging the Question (Circular Reasoning):* The premise assumes the truth of the conclusion.
    *   *False Dichotomy:* Presenting only two choices when multiple options exist.
*   **Bias Detection:** Look for selective data presentation, heavy emotional appeal, or systematic omission of counter-arguments.
*   **Cause-Effect and Comparative Analysis:** Map the connections using logical flowcharts.
    `
  },
  {
    id: 'analytical-explanation',
    title: 'Analytical Explanation Text',
    subtitle: 'Deconstructing structural frameworks and linguistic features',
    category: 'Text Analysis',
    content: `
### 1. Definition and Social Function
An **Analytical Explanation Text** aims to explain the 'how' or 'why' behind a specific social, scientific, economical, or logical phenomenon by providing a rigorous multi-sided analysis. Unlike a simple exposition, it deepens the reader's systemic understanding of complex causal pathways.

### 2. Generic Structure
Advanced analytical explanation texts follow a strict structural hierarchy:
1.  **General Statement (Introduction):** Introduces and contextualizes the complex phenomenon. It establishes the scope and why the topic is worth analyzing.
2.  **Causal Chains (Body Paragraphs):** This is where the core analysis happens. Each paragraph details a separate logical process or causal link.
3.  **Synthesis/Conclusion:** Summarizes the entire chain of interactions, drawing a comprehensive logical conclusion representation without introducing unproven remarks.

### 3. Language Features & Signal Words
To analyze these texts under exam conditions, study their specific rhetorical markers:
*   **Causal Connectives:** *consequently, in consequence of, on account of, as a direct consequence, thereby, resulting in, precipitated by, is contingent upon.*
*   **Linguistic Register:** Primarily high academic (passive voice structures, abstract nominalizations).
    *   *Example of nominalization:* Instead of "when soil erodes," academic texts use "the acceleration of soil erosion...".

### 4. Sample Analysis: The Mechanisms of Cost-Push Devaluation
"When a monetary authority decides to devalue its sovereign currency to stimulate exports, it inadvertently recalibrates the domestic cost structure. Because imported intermediate goods suddenly command higher domestic nominal prices, industrial sectors utilizing foreign supply networks face an instant compression of operating margins. Consequently, these supply-side shocks propagate downstream, leading to cost-push inflation. This cycle is critical because it reveals how nominal devaluations can fail if not supplemented by strict monetary tightening..."

### 5. Common Exam Traps
*   **The Oversimplification Trap:** Opciones matching simple causes while ignoring systemic feedback loops.
*   **The Temporal vs. Causal Trap:** Confusing events that happen sequentially as having a direct cause-and-effect link.
*   **The Scope Grab:** Distractors that present an argument that is true for a single sentence but incorrect as an explanation for the overall passage.
    `
  },
  {
    id: 'advanced-vocabulary-skills',
    title: 'Advanced Vocabulary Skills',
    subtitle: 'Morphology, context clues, and registers (B2–C1)',
    category: 'Vocabulary Theory',
    content: `
### 1. Context Clues (Petunjuk Konteks)
When encountering unfamiliar words in C1 exams, there are five major prompt patterns:
*   **Definition/Illustration:** The text supplies the definition directly using punctuation (dashes, parentheses) or appositives.
*   **Synonym/Contrast:** The author pairs a hard word with an easier synonym, or contrasts it with an antonym (*"Her **laconic** speech, unlike the long-winded tirades of her predecessor, pleased the audience"* -> laconic means brief).
*   **Syntactic Shift:** Connectives like *although, while, despite* hint at the opposite meaning.

### 2. Morphology & Word Formation
Deconstructing words into their component parts is an absolute superpower for scaling B2 to C1 vocabulary rapidly:
*   **Key Prefixes:**
    *   **Anti- / Contra- / Counter-:** Against (e.g., *counterproductive, contravene*).
    *   **An- / A-:** Without (e.g., *anomaly, amorphous*).
    *   **E- / Ex-:** Out of, away from (e.g., *exculpate, exacerbate* - literally "to make very sharp/harsh").
*   **Key Roots:**
    *   **VAL- / VALE-:** Worth, strength (e.g., *valiant, ambivalent, prevailing, devaluation*).
    *   **FID-:** Trust, faith (e.g., *diffident, fiducial*).
    *   **VIV- / VIT-:** Life, lively (e.g., *convivial, vitalize*).
    *   **CRIT-:** Separate, judge (e.g., *criterion, hypercritical*).

### 3. Academic Vocabulary Register
UTBK questions evaluate whether you can discern subtle differences between academic/formal writing and casual registers.
*   *Informal:* "This shows that the budget is bad."
*   *Academic:* "This trend **corroborates** the hypothesis that the fiscal budget is **suboptimal**."
    `
  },
  {
    id: 'slang-and-register',
    title: 'Slang Vocabulary and Register Theory',
    subtitle: 'Understanding contemporary linguistic shifts and situational registers',
    category: 'Vocabulary Theory',
    content: `
### 1. Modern & Casual Slang
Slang represent highly dynamic language registers originating from specific subcultures, modern internet communities, or regional colloquialisms. While not typical academic content, C1 candidates must evaluate how language adapts.
*   **Examples:**
    *   **Framing:** The way information is selectively highlighted to shape specific perceptions.
    *   **Echo Chamber:** An environment where a person only encounters information or opinions that reflect and reinforce their own.
Based on contemporary discourse, informal and casual phrasing should be studied via their structural sociolinguistic registers.

### 2. Context Appropriateness and Register Awareness
Language exists in specific "registers" or levels of formality:
*   **Frozen:** Historical texts, oaths, formal treaties.
*   **Formal:** Academic journals, state speeches, UTBK passages.
*   **Consultative:** Professional interactions, teacher-student dialogues.
*   **Casual:** Conversational chats with peers.
*   **Intimate:** Family and partner dialogues.

### 3. Exam Target: Register Incongruity
A common C1 exam question tests your ability to detect when a casual term disrupts an otherwise academic passage.
*   *Incorrect Example:* "While the central bank is aiming to restructure sovereign bonds, their current fiscal policies are totally **cooked**."
*   *Correct Modification:* "While the central bank is striving to restructure sovereign bonds, its contemporary fiscal policies are **highly flawed** and **financially untenable**."
    `
  }
];
