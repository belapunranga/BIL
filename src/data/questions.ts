/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from '../types';

export const questions: Question[] = [
  // =========================================================================
  // SINGLE CHOICE MULTIPLE CHOICE (1-25)
  // =========================================================================
  {
    id: 'q1',
    passageId: 'passage1',
    type: 'single',
    questionNumber: 1,
    questionText: 'What is the primary thesis of Passage 1 regarding the expansion of Elaeis guineensis?',
    options: [
      { key: 'A', text: 'It is a highly destructive economic hazard that should be globally boycotted.' },
      { key: 'B', text: 'It presents a deeply polarized dynamic, balancing exceptional agro-economic benefits with severe ecological costs.' },
      { key: 'C', text: 'It represents the triumph of Bumiputera smallholders over corporate multinational conglomerates.' },
      { key: 'D', text: 'It is a completely green, sustainable crop certified by international bodies like the RSPO and ISPO.' },
      { key: 'E', text: 'It is primarily causing the destruction of marine aquifers and historical riverine populations.' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B is correct because the passage explicitly describes oil palm as "one of the most polarizing developments," presenting its economic efficiency and poverty reduction alongside its severe environmental costs like peatland degradation and biodiversity loss.',
      distractorAnalysis: 'A is too extreme and one-sided; the text highlights its massive poverty-reduction benefits. C misrepresents the dynamic; the text argues that smallholders are actually marginalized, not triumphant. D is incorrect because the passage notes certification frameworks are hindered by friction and under-adopted. E is a distortion; the text mentions soil siltation and riverine eutrophication, but they are not the primary thesis of the overall crop expansion.',
      strategy: 'Synthesis of main idea by analyzing contrasting text markers ("veritable miracle" vs. "inextricably tethered to deep ecological degradation").',
      vocabAnalysis: 'Polarizing (causing split into opposing camps), Veritable (true/actual), Inextricably (inseparable).',
      criticalThinking: 'Distinguishing between balanced systemic overview option and extreme, biased, or narrow options.'
    }
  },
  {
    id: 'q2',
    passageId: 'passage1',
    type: 'single',
    questionNumber: 2,
    questionText: 'According to paragraph 2, what is the sequence of events that leads to transboundary haze?',
    options: [
      { key: 'A', text: 'Monoculture planting -> peatland flooding -> aerobic decomposition -> respiratory emergencies.' },
      { key: 'B', text: 'Aquifer drainage -> organic peat moisture deletion -> aerobic decomposition -> subterranean fires.' },
      { key: 'C', text: 'Monoculture planting -> industrial logging -> peat swamp conversion -> carbon sink optimization.' },
      { key: 'D', text: 'Greenhouse gas emissions -> global warming -> peatland aquifer drying -> spontaneous combustion.' },
      { key: 'E', text: 'Forest clearance moratorium -> channel construction -> riverine siltation -> respiratory haze.' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B matches the clear causal chain in paragraph 2: empty of moisture due to drainage channels, peat becomes subject to aerobic decomposition and subterranean fires which cause the haze.',
      distractorAnalysis: 'A is incorrect because peatlands are drained, not flooded, for planting. C claims carbon sink is optimized, which is the opposite of reality. D introduces global warming as the start of the sequence, whereas the text blames active soil prep (drainage channels). E mentions forest moratoriums, which are policy blocks, not elements in the fire chain.',
      strategy: 'Chronological and causal sequence tracking utilizing text-mapping.',
      vocabAnalysis: 'Locus (center/position), Sustenance (support/maintenance), Aquifer (underground water-bearing layer).',
      criticalThinking: 'Isolating direct physical sequences of environmental phenomena over political policies.'
    }
  },
  {
    id: 'q3',
    passageId: 'passage1',
    type: 'single',
    questionNumber: 3,
    questionText: 'What does the author imply about independent smallholders in the fourth paragraph?',
    options: [
      { key: 'A', text: 'They are more adept at obtaining international green certifications than large-scale corporate entities.' },
      { key: 'B', text: 'They intentionally reject eco-friendly fertilizers to maximize short-term profit margins.' },
      { key: 'C', text: 'They face systemic market disadvantages due to the financial and technical hurdles of ecological audits.' },
      { key: 'D', text: 'They are protected from economic marginalization by the Indonesian Sustainable Palm Oil standard.' },
      { key: 'E', text: 'They are the primary drivers of lobby-guided primary forest clearance.' }
    ],
    correctAnswer: 'C',
    explanation: {
      correctResponse: 'Option C is implied because the text states that navigating the audits presents a "formidable hurdle," leading to their selling of FFB at a "suboptimal discount" and perpetuating their "economic marginalization."',
      distractorAnalysis: 'A is the exact opposite of the text. B is too critical; the text says they "lack capital" and "technical training," not that they act out of malice. D is wrong because they are "relegated to suboptimal discounts," so they are not protected. E is wrong because corporations, not family smallholders, are described as commanding primary industrial plantation concessions.',
      strategy: 'Inference based on socioeconomic details and contrast markers ("This division creates a fragmented market...").',
      vocabAnalysis: 'Formidable (inspiring fear or respect through size/capability), Convoluted (extremely complex), Suboptimal (below standard).',
      criticalThinking: 'Identifying systemic structural barriers as the cause of economic inequality.'
    }
  },
  {
    id: 'q4',
    passageId: 'passage1',
    type: 'single',
    questionNumber: 4,
    questionText: 'In Paragraph 5, the word "sustenance" is closest in meaning to...',
    options: [
      { key: 'A', text: 'nourishment and survival' },
      { key: 'B', text: 'economic compensation' },
      { key: 'C', text: 'political advocacy' },
      { key: 'D', text: 'soil filtration' },
      { key: 'E', text: 'demographic stratification' }
    ],
    correctAnswer: 'A',
    explanation: {
      correctResponse: 'Option A is correct; in this context, "sustenance of riverine populations" means their nourishment, vital food intake, and biological survival which is disrupted by algal blooms.',
      distractorAnalysis: 'B, C, D, and E are unrelated to biological, ecological survival in the context of aquatic habitats.',
      strategy: 'Vocabulary in context through synonym substitution.',
      vocabAnalysis: 'Sustenance (food received to preserve livelihood), Eutrophication (nutrient overload causing oxygen depletion).',
      criticalThinking: 'Avoiding generic figurative definitions and choosing the most context-appropriate literal meaning.'
    }
  },
  {
    id: 'q5',
    passageId: 'passage1',
    type: 'single',
    questionNumber: 5,
    questionText: 'Which of the following describes the author’s tone in discussing palm oil certified standards?',
    options: [
      { key: 'A', text: 'Highly sarcastic and dismissive' },
      { key: 'B', text: 'Unconditionally supportive and proud' },
      { key: 'C', text: 'Balanced, yet critical of administrative barriers' },
      { key: 'D', text: 'Completely indifferent and hands-off' },
      { key: 'E', text: 'Vindictive and vengeful' }
    ],
    correctAnswer: 'C',
    explanation: {
      correctResponse: 'Option C is correct because the author acknowledges that these certifications "seek to codify environmentally benign practices" (positive/balanced) but notes that "administrative and financial friction continues to hamper their universal adoption" (critical).',
      distractorAnalysis: 'A is too cynical; the author lists positive goals of the certifications. B is too extreme; the author notes their faults. D is incorrect as the author devotes extensive details to the certification breakdown. E is completely off-target as no aggressive emotional terms are used.',
      strategy: 'Discerning author attitude and mood based on balanced structural adjectives.',
      vocabAnalysis: 'Benign (gentle, kind, harmless), Friction (conflict/resistance).',
      criticalThinking: 'Differentiating between absolute/extreme feelings and academic/nuanced positions.'
    }
  },
  {
    id: 'q6',
    passageId: 'passage2',
    type: 'single',
    questionNumber: 6,
    questionText: 'What is the classical macroeconomic goal of devaluing a sovereign currency?',
    options: [
      { key: 'A', text: 'To increase the purchase power of domestic citizens buying foreign luxury items.' },
      { key: 'B', text: 'To artificially inflate foreign corporate debt values to trigger global capital default.' },
      { key: 'C', text: 'To stimulate export sectors and restore balance-of-payments equilibrium.' },
      { key: 'D', text: 'To lower domestic nominal wages to prevent labor unions from organizing protests.' },
      { key: 'E', text: 'To completely decouple the economy from the United States Dollar.' }
    ],
    correctAnswer: 'C',
    explanation: {
      correctResponse: 'Option C is directly stated in paragraph 1: "a calculated attempt to stimulate lagging export sectors and restore balance-of-payments equilibrium."',
      distractorAnalysis: 'A is incorrect because devaluation makes foreign items more expensive, decreasing purchasing power. B is unmentioned and illogical. D is not a stated macroeconomic goal of devaluation. E is extreme and incorrect.',
      strategy: 'Direct scanning and matching of analytical explanations in the text.',
      vocabAnalysis: 'Lagging (failing to keep up), Devaluation (official lowering of book value of currency).',
      criticalThinking: 'Isolating primary theoretical targets of economic policy over secondary side effects.'
    }
  },
  {
    id: 'q7',
    passageId: 'passage2',
    type: 'single',
    questionNumber: 7,
    questionText: 'Which of the following is identified in Passage 2 as a reason why currency devaluation can fail?',
    options: [
      { key: 'A', text: 'A sudden decline in national tourism rates and airline capacities.' },
      { key: 'B', text: 'The immediate shift from agricultural output to tech-centered manufacturing.' },
      { key: 'C', text: 'Escalating cost-push inflation driven by the increased cost of imported intermediate goods.' },
      { key: 'D', text: 'The rejection of the J-Curve model by contemporary IMF economists.' },
      { key: 'E', text: 'The stabilization of sovereign creditworthiness across international bond networks.' }
    ],
    correctAnswer: 'C',
    explanation: {
      correctResponse: 'Option C is correct because the second paragraph discusses how industrial sectors relying on imported intermediate inputs experience cost hikes, creating an upward price spiral that erodes the currency\'s competitive edge.',
      distractorAnalysis: 'A and B are not mentioned in parallel with devaluation failures. D is wrong; the text discusses the J-Curve as an actual phenomenon, not a rejected model. E is positive and wouldn\'t cause failure.',
      strategy: 'Analyzing structural feedback loops and scanning for cause-effect transitions ("Consequently", "Compelled to").',
      vocabAnalysis: 'Intermediate inputs (goods used in production of other goods), Runaway inflation (extremely rapid price rises).',
      criticalThinking: 'Tracing chains of events that connect nominal currency actions to real domestic pricing indices.'
    }
  },
  {
    id: 'q8',
    passageId: 'passage2',
    type: 'single',
    questionNumber: 8,
    questionText: 'What must accompany a devaluation to prevent nominal gains from failing, as argued by the author?',
    options: [
      { key: 'A', text: 'Substantial subsidies for fossil fuel consumption.' },
      { key: 'B', text: 'Strict fiscal discipline and targeted monetary tightening.' },
      { key: 'C', text: 'The systematic deregulation of all commercial aviation banks.' },
      { key: 'D', text: 'An immediate lowering of defensive tariffs on foreign micro-machinery.' },
      { key: 'E', text: 'A sovereign default on all foreign currency-denominated bonds.' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B is directly stated in the final sentence of the passage: "central banking authorities must accompany any devaluation with strict fiscal discipline and targeted monetary tightening."',
      distractorAnalysis: 'A is incorrect because fuel subsidies are criticized in subsequent sections as highly regressive. C is from unrelated vocabulary contexts. D is incorrect as lowering tariffs is not suggested. E is wrong because a sovereign default is described as a catastrophic risk, not a solution.',
      strategy: 'Locating concluding logical requirements in the passage.',
      vocabAnalysis: 'Tightening (making more restrictive), Contingent (dependent on).',
      criticalThinking: 'Synthesizing recommendations for policy containment on inflation.'
    }
  },
  {
    id: 'q9',
    passageId: 'passage2',
    type: 'single',
    questionNumber: 9,
    questionText: 'What is the "Marshall-Lerner condition" discussed in the passage?',
    options: [
      { key: 'A', text: 'A mathematical condition stating that devaluation only improves trade balances if the sum of price elasticities of exports and imports is greater than one.' },
      { key: 'B', text: 'A banking standard requiring reserves to equal foreign sovereign debt.' },
      { key: 'C', text: 'An agricultural paradigm correlating peat depth with CPO values.' },
      { key: 'D', text: 'A regulatory framework tracking the Gini coefficient of regional farmers.' },
      { key: 'E', text: 'A political strategy that uses media framing to bypass public audits.' }
    ],
    correctAnswer: 'A',
    explanation: {
      correctResponse: 'Option A matches the literal definition provided in paragraph 4: indicating that trade balance improvement is contingent on the sum of elasticities exceeding unity.',
      distractorAnalysis: 'B, C, D, and E are fabricated distractors that cross-contaminate terms from other passages in this exam.',
      strategy: 'Precise textual matching of academic definitions.',
      vocabAnalysis: 'Elasticity (degree of responsiveness of supply/demand to pricing), Nominate (appoint/designate).',
      criticalThinking: 'Maintaining strict boundaries between context-specific scientific models.'
    }
  },
  {
    id: 'q10',
    passageId: 'passage2',
    type: 'single',
    questionNumber: 10,
    questionText: 'What would occur if a country devalued its currency but had extremely inelastic import demand for oil?',
    options: [
      { key: 'A', text: 'The trade deficit would immediately improve due to lower energy demand.' },
      { key: 'B', text: 'Foreign investors would instantly inject capital to bail out the domestic treasury.' },
      { key: 'C', text: 'The nation\'s trade balance would deteriorate in the short term, widening the deficit.' },
      { key: 'D', text: 'Domestic manufacturers would experience immediate relief from cost-push factors.' },
      { key: 'E', text: 'Spontaneous deflation would occur due to reduced domestic consumption.' }
    ],
    correctAnswer: 'C',
    explanation: {
      correctResponse: 'Option C is correct because the fourth paragraph outlines that if import demand is inelastic, citizens continue to purchase imports despite higher costs, widening the trade deficit (explained by the J-Curve effect).',
      distractorAnalysis: 'A is wrong because inelastic means demand does not drop, so costs go up, worsening the balance. B is unmentioned and illogical. D is false; cost-push factors would worsen. E is false because prices rise, causing inflation, not deflation.',
      strategy: 'Deductive application of a defined model (Marshall-Lerner/J-Curve) to a hypothetical condition.',
      vocabAnalysis: 'Inelastic (insensitive to price changes), Deterioration (process of becoming progressively worse).',
      criticalThinking: 'Understanding pricing sensitivities and trade flows.'
    }
  },
  {
    id: 'q11',
    passageId: 'passage3',
    type: 'single',
    questionNumber: 11,
    questionText: 'Proponents of fiscal austerity argue that spending cuts are primarily necessary to...',
    options: [
      { key: 'A', text: 'defend the Gini coefficient of remote agricultural families' },
      { key: 'B', text: 'restore sovereign creditworthiness and bolster investor confidence' },
      { key: 'C', text: 'finance large-scale public forestry moratorium concessions' },
      { key: 'D', text: 'create massive consumer fuel consumption networks' },
      { key: 'E', text: 'disseminate satirical media memes about mineral regulators' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B is directly stated in paragraph 1: "streamlining state bureaucracy are essential steps to restore sovereign creditworthiness, bolster investor confidence..."',
      distractorAnalysis: 'A, C, D, and E are misleading options referencing content from Palm Oil, Rupiah, or Political Communication passages.',
      strategy: 'Direct comprehension scan with emphasis on political arguments.',
      vocabAnalysis: 'Consolidation (strengthening/bringing together), Austerity (government budget-tightening).',
      criticalThinking: 'Distinguishing the core fiscal goals of austerity from progressive socioeconomic goals.'
    }
  },
  {
    id: 'q12',
    passageId: 'passage3',
    type: 'single',
    questionNumber: 12,
    questionText: 'According to opponents of fiscal austerity, what is a primary danger of premature contraction?',
    options: [
      { key: 'A', text: 'It instantly creates hyper-deflationary spirals across agricultural zones.' },
      { key: 'B', text: 'It compresses aggregate demand, potentially worsening the debt-to-GDP ratio.' },
      { key: 'C', text: 'It encourages excessive foreign immigration into municipal hospital circuits.' },
      { key: 'D', text: 'It triggers spontaneous sovereign bond appreciation without domestic oversight.' },
      { key: 'E', text: 'It eliminates the halo effect of charismatic technocrats.' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B is found in paragraph 2: "premature fiscal contraction... compresses aggregate demand... which can paradoxically worsen the debt-to-GDP ratio."',
      distractorAnalysis: 'A is incorrect; the text mentions worsening debt, not hyper-deflation. C is unmentioned. D is an economic contradiction. E brings in terminology from the political communication passage.',
      strategy: 'Contrasting divergent perspectives using text-structure map.',
      vocabAnalysis: 'Paradoxically (in a seemingly absurd or self-contradictory way), Contraction (shrinking).',
      criticalThinking: 'Evaluating the Keynesian critiques of fiscal retrenchment.'
    }
  },
  {
    id: 'q13',
    passageId: 'passage3',
    type: 'single',
    questionNumber: 13,
    questionText: 'Why do economists criticize fuel consumption subsidies as "regressive"?',
    options: [
      { key: 'A', text: 'Because they are only accessible to indigent smallholders in Papua.' },
      { key: 'B', text: 'Because their consumption-based design disproportionately benefits affluent vehicle owners.' },
      { key: 'C', text: 'Because they cause direct eutrophication of deep peat aquifers.' },
      { key: 'D', text: 'Because they prevent the central bank from devaluing sovereign exchange rates.' },
      { key: 'E', text: 'Because they are mandated by international bodies like the RSPO.' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B matches the text in paragraph 2: "economists criticize these subsidies as highly regressive. Because of their consumption-based design, these subsidies disproportionately benefit affluent demographic groups..."',
      distractorAnalysis: 'A, C, D, and E are incorrect and cross-mix themes from the ecological or political passages.',
      strategy: 'Extracting semantic explanations from text details.',
      vocabAnalysis: 'Regressive (taking a larger percentage of income from low-income earners than from high-income earners), Affluent (wealthy/rich).',
      criticalThinking: 'Analyzing the distributional equity of state transfer mechanisms.'
    }
  },
  {
    id: 'q14',
    passageId: 'passage3',
    type: 'single',
    questionNumber: 14,
    questionText: 'Which of the following represents a recommended solution in paragraph 4 for achieving budget efficiency?',
    options: [
      { key: 'A', text: 'Relying exclusively on prestige-driven executive procurement.' },
      { key: 'B', text: 'Phasing out universal healthcare and primary education models.' },
      { key: 'C', text: 'Moving toward performance-based budgeting tied to measurable outcomes.' },
      { key: 'D', text: 'Forbidding independent audits to expedite regional port approvals.' },
      { key: 'E', text: 'Devaluing the sovereign currency by a minimum of thirty percent.' }
    ],
    correctAnswer: 'C',
    explanation: {
      correctResponse: 'Option C is stated in the final paragraph: "This requires moving away from rigid, legacy-driven budgeting models toward performance-based budgeting, where resource allocation is tied directly to measurable public outcomes."',
      distractorAnalysis: 'A is the opposite of the author\'s recommendation. B is contrary to the text which champions "preservation of essential public services" like healthcare and education. D is incorrect as the author explicitly advocates for independent auditing. E is a cross-contamination from the Rupiah passage.',
      strategy: 'Author recommendation tracking.',
      vocabAnalysis: 'Performance-based (linked to results/outcomes), Strategic (long-term planning).',
      criticalThinking: 'Recognizing constructive public administrative reforms.'
    }
  },
  {
    id: 'q15',
    passageId: 'passage3',
    type: 'single',
    questionNumber: 15,
    questionText: 'What risk does the text highlight regarding large-scale capital infrastructure projects?',
    options: [
      { key: 'A', text: 'They cause instant capital flight of local agrarian deposits.' },
      { key: 'B', text: 'They are inherently unable to expand long-term productive capacity.' },
      { key: 'C', text: 'They are highly prone to delays, cost overruns, and corrupt procurement.' },
      { key: 'D', text: 'They systematically decrease the national sovereign Gini coefficient.' },
      { key: 'E', text: 'They trigger transboundary haze as massive forests are drained.' }
    ],
    correctAnswer: 'C',
    explanation: {
      correctResponse: 'Option C is directly found in paragraph 3: "Large-scale public works are highly prone to delays, cost overruns, and, in worst-case scenarios, corrupt procurement procedures."',
      distractorAnalysis: 'A is inaccurate; capital flight is tied to currency devaluation in Passage 2. B is false; the text admits they "can expand a nation\'s long-term productive capacity." D is unmentioned. E is from the palm oil passage.',
      strategy: 'Direct detail extraction and hazard analysis within text structures.',
      vocabAnalysis: 'Overruns (exceeding planned budget), Procurement (the action of obtaining goods or services).',
      criticalThinking: 'Identifying systemic hurdles in government-led industrialization.'
    }
  },
  {
    id: 'q16',
    passageId: 'passage4',
    type: 'single',
    questionNumber: 16,
    questionText: 'What is the "halo effect" in the context of the social campaign analyzed in Passage 4?',
    options: [
      { key: 'A', text: 'A meteorological phenomenon causing rings around drained peatlands.' },
      { key: 'B', text: 'A cognitive bias where a perceived positive trait like charisma influences the overall evaluation of a figure’s competence.' },
      { key: 'C', text: 'A policy framework ensuring that gold mines are certified as green and carbon-neutral.' },
      { key: 'D', text: 'An algorithmic filtering technique that blocks political communication online.' },
      { key: 'E', text: 'The natural consequence of Marshall-Lerner trade deficits.' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B matches the clear psychological explanation in paragraph 2: "the \'halo effect,\' a cognitive bias where a positive trait in one area... is unconsciously transferred by the observer to influence their overall evaluation..."',
      distractorAnalysis: 'A, C, D, and E are distractors using vocabulary from other unrelated contexts.',
      strategy: 'Deconstructing academic terminology context clues.',
      vocabAnalysis: 'Halo Effect (cognitive bias of general impression), Charisma (compelling attractiveness).',
      criticalThinking: 'Evaluating how psychological constructs are operationalized in electoral politics.'
    }
  },
  {
    id: 'q17',
    passageId: 'passage4',
    type: 'single',
    questionNumber: 17,
    questionText: 'How does the phrase "Mas Bahlil Ganteng" function as a "red herring," according to paragraph 4?',
    options: [
      { key: 'A', text: 'It acts as an indicator of actual, verifiable physiological improvements of the cabinet.' },
      { key: 'B', text: 'It systematically distracts the public and prevents deep scrutiny of complex socioeconomic decisions.' },
      { key: 'C', text: 'It directly supports the central bank’s attempts to tighten fiscal expenditures.' },
      { key: 'D', text: 'It draws international attention to Sumatra\'s orangutan conservation zones.' },
      { key: 'E', text: 'It enforces a strict administrative moratorium on corrupt procurement licenses.' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B is correct because paragraph 4 explains that focusing public attention on the humorous, casual appeal of a political figure backgrounds complex socioeconomic debates, crowding out serious critical journalistic scrutiny.',
      distractorAnalysis: 'A is wrong; it is not a literal physical description. C is empty; it has no relation to central banking. D is from the palm oil passage. E is wrong as it doesn\'t enforce any moratorium.',
      strategy: 'Analyzing logical fallacies and functional rhetoric in text.',
      vocabAnalysis: 'Red Herring (something that misleads or distracts from a relevant or important issue), Scrutiny (critical observation).',
      criticalThinking: 'Recognizing how entertainment-driven social media trends can stifle democratic accountability.'
    }
  },
  {
    id: 'q18',
    passageId: 'passage4',
    type: 'single',
    questionNumber: 18,
    questionText: 'What does critical network analysis reveal about the Spontaneous appearance of the meme, as detailed in Paragraph 5?',
    options: [
      { key: 'A', text: 'It is a genuine grassroots movement of organic teenage fans.' },
      { key: 'B', text: 'It is a highly coordinated structure of digital advocates and automated systems (astroturfing).' },
      { key: 'C', text: 'It emerged as a consequence of rising transboundary haze indices.' },
      { key: 'D', text: 'It was created by independent agrarian smallholders to demand land concessions.' },
      { key: 'E', text: 'It is completely un-algorithmic, spreading purely through traditional consultative networks.' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B is correct; the fifth paragraph discusses how the campaign is a simulated grassroots campaign ("astroturfing") managed by digital advocates, media managers, and automated accounts.',
      distractorAnalysis: 'A is incorrect because the text calls it a "simulated reality" rather than a genuine spontaneous surge. C is from the environmental passage. D is false. E is contradicted by the text, which asserts it is heavily algorithmic.',
      strategy: 'Analyzing political communication and sociolinguistic manipulation patterns.',
      vocabAnalysis: 'Astroturfing (falsely representing a corporate/political campaign as grassroots), Simulated (imitative/manufactured).',
      criticalThinking: 'Distinguishing between organic public trends and institutional communication campaigns.'
    }
  },
  {
    id: 'q19',
    passageId: 'passage4',
    type: 'single',
    questionNumber: 19,
    questionText: 'What is the "halo effect" most closely aligned with in classical persuasion terms?',
    options: [
      { key: 'A', text: 'Pathos-driven logical validation' },
      { key: 'B', text: 'An emotional or aesthetic transference bypass' },
      { key: 'C', text: 'Rational-legal bureaucratic authorization' },
      { key: 'D', text: 'Quantitative cost-push calculations' },
      { key: 'E', text: 'Sovereign agrarian hegemony' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B is correct because the "halo effect" acts as an emotional, aesthetic transfer where positive feelings toward physical features are transposed onto general competence, bypassing intellectual critical logic.',
      distractorAnalysis: 'A is incorrect because it is not a logical validation. C is incorrect; it is psychological, not legal. D and E are concepts from other passages.',
      strategy: 'Applying rhetorical definitions and tracking the mechanics of persuasion.',
      vocabAnalysis: 'Transference (shifting of feelings), Competence (efficiency/capability).',
      criticalThinking: 'Decoding cognitive biases that underpin political theater.'
    }
  },
  {
    id: 'q20',
    passageId: 'passage1',
    type: 'single',
    questionNumber: 20,
    questionText: 'Which of the following, if true, would most weaken the industrial lobby’s argument in paragraph 3 of Passage 1?',
    options: [
      { key: 'A', text: 'Cloned hybrid cultivars are shown to increase FFB yield by fifty percent.' },
      { key: 'B', text: 'Sumatran orangutans are found to migrate more successfully across multi-tiered canopy networks.' },
      { key: 'C', text: 'Genetic studies confirm that isolated biodiversity corridors of uniform monoculture grids fail to prevent fatal inbreeding.' },
      { key: 'D', text: 'Peatland drainage channels are completely rehabilitated to prevent methane emissions.' },
      { key: 'E', text: 'The Gini coefficient of Bumiputera family smallholders drops beneath zero.' }
    ],
    correctAnswer: 'C',
    explanation: {
      correctResponse: 'Option C is correct because the industrial lobby argues that "agro-forestry configurations and corridor designs can mitigate biodiversity losses." If genetic studies prove that isolated corridors within uniform grids fail to stop terminal inbreeding, their argument collapses.',
      distractorAnalysis: 'A focuses on yield, which is economic, not biodiversity related. B of canals is supportive of environmentalists, but doesn\'t directly weaken the corridors claims. D relates to peatlands, not forest habitat corridors. E relates to income inequality.',
      strategy: 'Critical thinking/Evaluating arguments by identifying claims and finding weakening evidence.',
      vocabAnalysis: 'Inbreeding (breeding from closely related individuals), Mitigate (aggravate antonym).',
      criticalThinking: 'Understanding biological limitations of artificial conservation structures.'
    }
  },
  {
    id: 'q21',
    passageId: 'passage1',
    type: 'single',
    questionNumber: 21,
    questionText: 'Based on the first passage, what is the primary source of carbon emissions in drained peatlands?',
    options: [
      { key: 'A', text: 'The burning of Palm Oil Mill Effluent (POME) by local family smallholders.' },
      { key: 'B', text: 'Aerobic organic decomposition and subterranean peatland fires.' },
      { key: 'C', text: 'The emission of ozone from uniform cloned monoculture hybrid grids.' },
      { key: 'D', text: 'The expansion of industrial shipping networks along Sumatran waterways.' },
      { key: 'E', text: 'Deforestation-free certification audits mandated by Genevan councils.' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B is correct; the second paragraph states that once drained, peat becomes highly susceptible to "aerobic decomposition and... subterranean peat fires," releasing carbon.',
      distractorAnalysis: 'A is incorrect; POME is liquid waste, not the source of subterranean soil combustion. C is unmentioned science-fiction. D is from unrelated transport sections. E is a administrative process, not a physical carbon emitter.',
      strategy: 'Explanatory detail matching and cause-effect mapping.',
      vocabAnalysis: 'Decomposition (rotting/decay), Subterranean (underground).',
      criticalThinking: 'Separating policy factors from biogeochemical release triggers.'
    }
  },
  {
    id: 'q22',
    passageId: 'passage2',
    type: 'single',
    questionNumber: 22,
    questionText: 'What is the implied consequence of a country possessing a heavily foreign-denominated public debt apparatus when it devalues?',
    options: [
      { key: 'A', text: 'The national debt will spontaneously convert into domestic currency at zero cost.' },
      { key: 'B', text: 'The nominal cost of servicing that debt will surge instantly, potentially exhausting the state treasury.' },
      { key: 'C', text: 'Central banks will be forced to eliminate all performance-based budgeting audits.' },
      { key: 'D', text: 'International lenders will voluntarily write off the remaining balance to boost liquidity.' },
      { key: 'E', text: 'Charismatic demagogues will experience a spontaneous halo enhancement.' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B is directly stated in paragraph 3: "devaluation instantly inflates the domestic nominal cost of servicing that debt. This sudden increase can exhaust state treasuries..."',
      distractorAnalysis: 'A is financial nonsense. C is a policy choice from the budget passage, not a debt consequence. D is naive; banks do not write off debts spontaneously. E mixes in slang/rhetorical ideas.',
      strategy: 'Inference and detail tracking in financial passages.',
      vocabAnalysis: 'Servicing debt (making scheduled interest payments), Denominated (expressed in a specific monetary unit).',
      criticalThinking: 'Tracing standard exchange rate effects on balance sheet Liabilities.'
    }
  },
  {
    id: 'q23',
    passageId: 'passage3',
    type: 'single',
    questionNumber: 23,
    questionText: 'What does the author of Passage 3 mean by describing fuel subsidies as "consumption-based design"?',
    options: [
      { key: 'A', text: 'They are only distributed to individuals who consume agricultural fresh fruit bunches.' },
      { key: 'B', text: 'Their disbursement corresponds with fuel consumption volume, meaning wealthier citizens with more cars get more state aid.' },
      { key: 'C', text: 'They are paid out directly to public mass transport drivers in Jakarta.' },
      { key: 'D', text: 'They are calculated based on Gini coefficient indices rather than market equilibrium prices.' },
      { key: 'E', text: 'They stimulate aggregate demand with a multiplier effect of zero.' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B matches paragraph 2: "Because of their consumption-based design, these subsidies disproportionately benefit affluent demographic groups who own personal vehicles...", which represents a regressive transfer.',
      distractorAnalysis: 'A is absurd. C is not the general definition or issue of fuel subsidies. D and E use technical jargon incorrectly; consumption-based means benefits scale with volume used, which naturally favors high consumers.',
      strategy: 'Decoding academic descriptions through semantic decomposition.',
      vocabAnalysis: 'Regressive (disproportionately taxing or leaving poor worse off), Disbursement (paying out/distribution).',
      criticalThinking: 'Analyzing structural flaws inside broad-based wealth transfer systems.'
    }
  },
  {
    id: 'q24',
    passageId: 'passage4',
    type: 'single',
    questionNumber: 24,
    questionText: 'According to paragraph 3 of Passage 4, how does media framing of political memes affect a younger, cynical electorate?',
    options: [
      { key: 'A', text: 'It prompts them to abandon social networks and read formal legislative drafts.' },
      { key: 'B', text: 'It transforms complex policy debates into engaging, participatory pop culture, increasing social currency.' },
      { key: 'C', text: 'It triggers immediate capital flight out of municipal state treasuries.' },
      { key: 'D', text: 'It isolates them inside echo chambers where coal emissions are highly praised.' },
      { key: 'E', text: 'It forces them to establish joint smallholder agricultural cooperatives.' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B is directly stated in paragraph 3: "For a younger electorate... this slightly ironic, casual framing functions as an effective bridge. It transforms dull, technocratic policy discussions into engaging, participatory pop culture..."',
      distractorAnalysis: 'A is unrealistic and contrary to text. C, D, and E are distractors cross-contaminating other passages.',
      strategy: 'Detail extraction guided by structural indicators.',
      vocabAnalysis: 'Technocratic (experts running systems), Participatory (allowing integration with community).',
      criticalThinking: 'Evaluating media consumption mechanics on democratic behavior.'
    }
  },
  {
    id: 'q25',
    passageId: 'passage4',
    type: 'single',
    questionNumber: 25,
    questionText: 'The primary concern raised in critical language analysis regarding political viral memes is that they...',
    options: [
      { key: 'A', text: 'cause a sudden drop in the Gini coefficient of remote areas' },
      { key: 'B', text: 'crowd out serious journalistic scrutiny and background essential policy debates' },
      { key: 'C', text: 'prevent central banks from checking the Marshall-Lerner trade conditions' },
      { key: 'D', text: 'undermine the ability of smallholders to acquire ISPO eco-credentials' },
      { key: 'E', text: 'directly increase the rate of transboundary peatland aquifer drainage' }
    ],
    correctAnswer: 'B',
    explanation: {
      correctResponse: 'Option B is correct; paragraph 4 describes the viral campaign as a "sophisticated red herring" that backgrounds highly complex socioeconomic debates and crowds out serious, critical journalistic scrutiny.',
      distractorAnalysis: 'A, C, D, and E are fake combinations of terms from other passages.',
      strategy: 'Evaluating arguments and logical conclusions of rhetoric.',
      vocabAnalysis: 'Backgrounded (treated as less important/hidden), Scrutiny (critical analysis), Crowd out (displace/push away).',
      criticalThinking: 'Identifying the high democratic cost of prioritizing entertainment over serious public policy debates.'
    }
  },

  // =========================================================================
  // MULTIPLE CHOICE COMPLEX - SELECT EXACTLY 3 CORRECT (26-30)
  // =========================================================================
  {
    id: 'q26',
    passageId: 'passage1',
    type: 'complex',
    questionNumber: 26,
    questionText: 'According to Passage 1, which of the following statements are TRUE regarding the sustainable certifications (ISPO/RSPO) and smallholders? (Select exactly 3 options)',
    options: [
      { key: 'A', text: 'They seek to implement deforestation-free supply chains and prohibit primary forest clearance.' },
      { key: 'B', text: 'Independent smallholders easily secure certified labels due to automated capital grants provided by mills.' },
      { key: 'C', text: 'Navigating audit assessments represents a formidable administrative and financial hurdle for family smallholders.' },
      { key: 'D', text: 'The certification split results in well-capitalized multinational corporations dominating certified export channels.' },
      { key: 'E', text: 'Uncertified smallholders are compensated with premium fresh fruit bunch pricing by central governments.' }
    ],
    correctAnswer: ['A', 'C', 'D'],
    explanation: {
      correctResponse: 'A, C, and D are correct. Paragraph 4 details that certifications seek deforestation-free supply chains (A); audits are formidable hurdles for smallholders (C); and well-capitalized players control certified export channels while smallholders are relegated to selling uncertified crops (D).',
      distractorAnalysis: 'B is false; the text states smallholders lack capital and technical training. E is false; the text states uncertified smallholders are relegated to selling at a "suboptimal discount."',
      strategy: 'Multi-statement verification with passage checks.',
      vocabAnalysis: 'Audit (official inspection), Relegated (dismissed to a lower rank).',
      criticalThinking: 'Synthesizing how structural certification rules affect unequal economic actors.'
    }
  },
  {
    id: 'q27',
    passageId: 'passage2',
    type: 'complex',
    questionNumber: 27,
    questionText: 'Select THREE direct structural consequences of a major sovereign currency devaluation as described in Passage 2:',
    options: [
      { key: 'A', text: 'Inward trade volume adjustments occur instantly, preventing any J-Curve balance deterioration.' },
      { key: 'B', text: 'Escalation of cost-push inflationary pressure driven by expensive foreign intermediate inputs.' },
      { key: 'C', text: 'Instant inflation of the domestic nominal cost of servicing sovereign bonds denominated in foreign currencies.' },
      { key: 'D', text: 'Potential capital flight triggered by foreign investors liquidating assets to avoid dilution.' },
      { key: 'E', text: 'The immediate elimination of standard credit rating default risks across state treasuries.' }
    ],
    correctAnswer: ['B', 'C', 'D'],
    explanation: {
      correctResponse: 'B, C, and D are correct. Paragraph 2 highlights cost-push inflation spikes from imported inputs (B). Paragraph 3 outlines servicing costs surging for foreign debt assets (C) and capital flight triggered by assets liquidation (D).',
      distractorAnalysis: 'A is false; trade balances deteriorate first (J-Curve) before adjusting. E is incorrect; default risks increase, they are not eliminated.',
      strategy: 'Negative constraint elimination and cause-effect mapping.',
      vocabAnalysis: 'Servicing (payment of interest/debts), Capital flight (investor cash exodus).',
      criticalThinking: 'Correlating micro-supply costs and macro-sovereign liabilities with exchange dynamics.'
    }
  },
  {
    id: 'q28',
    passageId: 'passage3',
    type: 'complex',
    questionNumber: 28,
    questionText: 'According to Passage 3, which of the following statements are correct about fuel consumption subsidies and public investment? (Select exactly 3 options)',
    options: [
      { key: 'A', text: 'Fuel subsidies are considered progressive because they benefit indigent walking classes.' },
      { key: 'B', text: 'Fuel subsidies benefit wealthier vehicle-owning populations disproportionately due to consumption scaling.' },
      { key: 'C', text: 'Reallocating funds from subsidies to capital projects can expand a nation\'s long-term productive capacity.' },
      { key: 'D', text: 'Large-scale capital infrastructure works are vulnerable to project delays, cost overruns, and corrupt procurement.' },
      { key: 'E', text: 'Subsidies are universally banned under standard IMF credit directives.' }
    ],
    correctAnswer: ['B', 'C', 'D'],
    explanation: {
      correctResponse: 'B, C, and D are correct. Paragraph 2 states that fuel subsidies disproportionately benefit affluent demographic groups who own personal vehicles (B). Paragraph 3 confirms reallocating to infrastructure expands long-term productive capacity (C) but notes these works are highly prone to delays, cost overruns, and corrupt procurement (D).',
      distractorAnalysis: 'A is incorrect; fuel subsidies are regressive, not progressive. E is a fabricated distractor not mentioned anywhere.',
      strategy: 'Analytical text evaluation against explicit assertions.',
      vocabAnalysis: 'Disbursement (distribution), Overrun (cost inflation), Regressive (harmful to poorer cohorts).',
      criticalThinking: 'Balancing the benefits of structural reallocations against the real risking of administrative corruption.'
    }
  },
  {
    id: 'q29',
    passageId: 'passage4',
    type: 'complex',
    questionNumber: 29,
    questionText: 'Based on the analysis of modern political communication in Passage 4, select THREE correct observations regarding the "Mas Bahlil Ganteng" campaign:',
    options: [
      { key: 'A', text: 'It leverages the "halo effect," transposing visual charisma onto perceived professional competence.' },
      { key: 'B', text: 'It functions as an unintentional grassroots movement devoid of digital management.' },
      { key: 'C', text: 'Its casual, ironic framing acts as an effective bridge to connect with a cynical younger electorate.' },
      { key: 'D', text: 'It can act as a "red herring," shifting media focus away from contentious policies and audits.' },
      { key: 'E', text: 'It results in immediate currency appreciation according to the Marshall-Lerner models.' }
    ],
    correctAnswer: ['A', 'C', 'D'],
    explanation: {
      correctResponse: 'A, C, and D are correct. Paragraph 2 explicitly outlines how physical/charismatic traits bypass rational logic through the halo effect (A). Paragraph 3 details its appeal to a cynical younger cohort by transforming policy into pop culture (C). Paragraph 4 explains its function as a red herring blocking critical journalistic audits (D).',
      distractorAnalysis: 'B is false because the passage labels it "astroturfing" managed by digital networks and bots. E is a nonsensical mix of terms from the currency passage.',
      strategy: 'Rhetorical strategy analysis and cross-verification of digital networks studies.',
      vocabAnalysis: 'Halo effect (cognitive transposition), Red herring (logical bypass/distraction), Cynical (distrustful).',
      criticalThinking: 'Tracing communication tactics designed to insulate elites from accountability.'
    }
  },
  {
    id: 'q30',
    passageId: 'passage4',
    type: 'complex',
    questionNumber: 30,
    questionText: 'Select THREE techniques mentioned in Passage 4 as components in constructing simulated digital public support (astroturfing):',
    options: [
      { key: 'A', text: 'Coordinated cascading of target phrases across multiple social software networks.' },
      { key: 'B', text: 'Utilizing automated accounts (bots) and dedicated media managers.' },
      { key: 'C', text: 'Promising legal land grant concessions directly to local Bumiputera family members.' },
      { key: 'D', text: 'Leveraging traditional newspapers\' economic reliance on trending content for ad revenue.' },
      { key: 'E', text: 'Deploying maritime patrols to secure deep aquifers from international logging.' }
    ],
    correctAnswer: ['A', 'B', 'D'],
    explanation: {
      correctResponse: 'A, B, and D are correct. Paragraph 5 describes the astroturfing machine: a coordinated structure of advocates, media managers, and automated accounts cascading target phrases (A & B), which traditional newspapers are forced to pick up and report to capture trending ad revenue (D).',
      distractorAnalysis: 'C is from the palm oil concession context. E is a distraction using terms from the marine protection section in Passage 1.',
      strategy: 'Structural identification of a defined sociolinguistic process.',
      vocabAnalysis: 'Cascade (pour down rapidly), Automated accounts (bots).',
      criticalThinking: 'Tracing the self-perpetuating media feedback loop between algorithmic trends and news journalism.'
    }
  },

  // =========================================================================
  // TRUE / FALSE QUESTIONS (31-40)
  // Each contains exactly 4 statements. Composition: 2 True, 2 False.
  // =========================================================================
  {
    id: 'q31',
    passageId: 'passage1',
    type: 'tf',
    questionNumber: 31,
    questionText: 'Verify the truth-value of these statements regarding the ecological and agricultural arguments in Passage 1:',
    tfStatements: [
      { id: 'q31_s1', text: 'Elaeis guineensis produces a significantly lower oil yield per unit area than soybean crops.', isCorrect: false },
      { id: 'q31_s2', text: 'Peatland swamps in their original water-soaked state serve as efficient carbon sinks.', isCorrect: true },
      { id: 'q31_s3', text: 'Draining peatlands creates soil conditions highly vulnerable to aerobic decomposition.', isCorrect: true },
      { id: 'q31_s4', text: 'The environmental standards automatically insulate poor smallholders from local mills.', isCorrect: false }
    ],
    explanation: {
      correctResponse: 'Statements 2 and 3 are TRUE; statements 1 and 4 are FALSE.',
      distractorAnalysis: 'Statement 1 is false because palm yields 5-10 times *more* than soybean. Statement 4 is false because smallholders are actually marginalized and forced to sell at suboptimal discounts.',
      strategy: 'Logical checking of biological and socio-agricultural factors.',
      vocabAnalysis: 'Carbon sink (storage), Saturated (soaked with water).',
      criticalThinking: 'Rejecting options with inverted ratios or overly ideal social protections.'
    }
  },
  {
    id: 'q32',
    passageId: 'passage1',
    type: 'tf',
    questionNumber: 32,
    questionText: 'Determine the validity of the following statements based on Passage 1:',
    tfStatements: [
      { id: 'q32_s1', text: 'Sumatran orangutans and tigers are completely unaffected by agricultural canopy fragmentation.', isCorrect: false },
      { id: 'q32_s2', text: 'ISPO stands for Indonesian Sustainable Palm Oil, which is a domestic certified standard.', isCorrect: true },
      { id: 'q32_s3', text: 'Siltation of rivers is mainly caused by the immediate cessation of peat drainage.', isCorrect: false },
      { id: 'q32_s4', text: 'Palm Oil Mill Effluent (POME) is highly toxic to local aquatic life if discharged in an untreated state.', isCorrect: true }
    ],
    explanation: {
      correctResponse: 'Statements 2 and 4 are TRUE; statements 1 and 3 are FALSE.',
      distractorAnalysis: 'Statement 1 is false because canopy fragmentation is described as "terminal" for gene pools. Statement 3 is false because siltation is caused by topsoil runoff from deforestation, not from stopping drainage.',
      strategy: 'Synthesizing ecological impact vectors.',
      vocabAnalysis: 'Canopy (overhead rainforest layer), Effluent (industrial liquid waste).',
      criticalThinking: 'Isolating biological cause-effects from physical industrial activities.'
    }
  },
  {
    id: 'q33',
    passageId: 'passage2',
    type: 'tf',
    questionNumber: 33,
    questionText: 'Assess the validity of these core macroeconomic assertions in Passage 2:',
    tfStatements: [
      { id: 'q33_s1', text: 'Devaluation instantly decreases the domestic nominal price of foreign imported items.', isCorrect: false },
      { id: 'q33_s2', text: 'A significant currency devaluation can trigger cost-push inflation in sectors relying on imported components.', isCorrect: true },
      { id: 'q33_s3', text: 'Devaluation reduces the domestic nominal cost of servicing sovereign debt denominated in foreign currencies.', isCorrect: false },
      { id: 'q33_s4', text: 'The J-Curve effect represents a temporary worsening of the trade balance before volumes adjust.', isCorrect: true }
    ],
    explanation: {
      correctResponse: 'Statements 2 and 4 are TRUE; statements 1 and 3 are FALSE.',
      distractorAnalysis: 'Statement 1 is false because devaluation makes imports *more* expensive (prohibitively expensive). Statement 3 is false because it *inflates* (increases) the nominal cost of servicing foreign-denominated debt.',
      strategy: 'Verifying directional financial statements (increase/decrease, inflate/deflate).',
      vocabAnalysis: 'Servicing (paying interest), J-Curve (lagged trade adjustment model).',
      criticalThinking: 'Recognizing balance sheet impacts on liabilities when the domestic exchange asset drops.'
    }
  },
  {
    id: 'q34',
    passageId: 'passage2',
    type: 'tf',
    questionNumber: 34,
    questionText: 'Verify the truth of these statements concerning foreign investment and mathematical trade rules:',
    tfStatements: [
      { id: 'q34_s1', text: 'The Marshall-Lerner condition states that devaluation always succeeds regardless of price elasticities.', isCorrect: false },
      { id: 'q34_s2', text: 'Foreign investors may pull capital blockages out of a devaluing country if they fear their assets are diluting.', isCorrect: true },
      { id: 'q34_s3', text: 'Inelastic import demand means citizens instantly stop buying goods when prices fluctuate.', isCorrect: false },
      { id: 'q34_s4', text: 'Central bank monetary tightening is a recommended strategy to contain inflation after devaluation.', isCorrect: true }
    ],
    explanation: {
      correctResponse: 'Statements 2 and 4 are TRUE; statements 1 and 3 are FALSE.',
      distractorAnalysis: 'Statement 1 is false because the Marshall-Lerner condition argues that success is *highly contingent* (only succeeds if elasticities sum to > 1). Statement 3 is false because inelastic means they *continue* to buy regardless of cost.',
      strategy: 'Evaluating logical assumptions behind quantitative models.',
      vocabAnalysis: 'Dilute (make weaker/reduce value), Tightening (raising interest rates/limiting credit).',
      criticalThinking: 'Identifying when market rigidities block theoretical economic adjustments.'
    }
  },
  {
    id: 'q35',
    passageId: 'passage3',
    type: 'tf',
    questionNumber: 35,
    questionText: 'Analyze the truth-values of the arguments for and against austerity policies in Passage 3:',
    tfStatements: [
      { id: 'q35_s1', text: 'Proponents of austerity argue that balancing budgets reduces the long-term cost of borrowing.', isCorrect: true },
      { id: 'q35_s2', text: 'Opponents argue that cutting state budgets can compress aggregate demand and hurt GDP ratios.', isCorrect: true },
      { id: 'q35_s3', text: 'Fiscal contraction during severe downturns is universally proven to expand corporate tax revenues instantly.', isCorrect: false },
      { id: 'q35_s4', text: 'Streamlining state bureaucracy has been officially shown to crowd out private-sector investments.', isCorrect: false }
    ],
    explanation: {
      correctResponse: 'Statements 1 and 2 are TRUE; statements 3 and 4 are FALSE.',
      distractorAnalysis: 'Statement 3 is false because opponents highlight it *lower* tax revenues. Statement 4 is false because proponents argue budget cuts *prevent* crowding out, not cause it.',
      strategy: 'Mapping opposing macroeconomic schools of thought (Keynesian vs Neoliberal/Austerian).',
      vocabAnalysis: 'Aggregate demand (total spending), Crowding out (sovereign debt taking up pool of capital).',
      criticalThinking: 'Differentiating between ideological hypotheses and empirical verified rules.'
    }
  },
  {
    id: 'q36',
    passageId: 'passage3',
    type: 'tf',
    questionNumber: 36,
    questionText: 'Assess the validity of these statements regarding budget sub-factors and infrastructure projects:',
    tfStatements: [
      { id: 'q36_s1', text: 'Fuel subsidies are called "progressive" because they disproportionately benefit impoverished citizens.', isCorrect: false },
      { id: 'q36_s2', text: 'Large-scale capital infrastructure works are highly vulnerable to delays, cost overruns, and procurement issues.', isCorrect: true },
      { id: 'q36_s3', text: 'A performance-based budgeting model allocates financial resources based on legacy files rather than outcomes.', isCorrect: false },
      { id: 'q36_s4', text: 'Auditing bodies must be independent to effectively mitigate corruption in public infrastructure bidding.', isCorrect: true }
    ],
    explanation: {
      correctResponse: 'Statements 2 and 4 are TRUE; statements 1 and 3 are FALSE.',
      distractorAnalysis: 'Statement 1 is false because fuel subsidies are "regressive," not progressive. Statement 3 is false because performance budgeting ties money to *measurable outcomes*, whereas legacy files describe traditional rigid budgeting.',
      strategy: 'Differentiating administrative operational standards.',
      vocabAnalysis: 'Procurement (bidding/purchase operations), Legacy-driven (historically based).',
      criticalThinking: 'Linking bureaucratic accountability with program-level design modifications.'
    }
  },
  {
    id: 'q37',
    passageId: 'passage4',
    type: 'tf',
    questionNumber: 37,
    questionText: 'Verify the truth-value of these rhetorical framing analyses in Passage 4:',
    tfStatements: [
      { id: 'q37_s1', text: '"Mas Bahlil Ganteng" acts as a literal, physical certification of a politician’s cosmetic metrics.', isCorrect: false },
      { id: 'q37_s2', text: ' charismatically humanizing a politician can help bypass public skepticism of corporate policies via the halo effect.', isCorrect: true },
      { id: 'q37_s3', text: 'Ironic, casual framing acts to distance younger voters, making them highly hostile to media campaigns.', isCorrect: false },
      { id: 'q37_s4', text: 'Meme-based political strategies can succeed in transforming technocratic decisions into engaging pop culture.', isCorrect: true }
    ],
    explanation: {
      correctResponse: 'Statements 2 and 4 are TRUE; statements 1 and 3 are FALSE.',
      distractorAnalysis: 'Statement 1 is false because it is a rhetorical device, not a literal health/cosmetic certification. Statement 3 is false because casual framing is an *effective bridge* that attracts and socializes cynical youth, not distances them.',
      strategy: 'Rhetorical strategy analysis and vocabulary-link tracking.',
      vocabAnalysis: 'Skepticism (unwillingness to believe), Humanize (make relatable).',
      criticalThinking: 'Recognizing how visual, lightweight media formats exploit human emotional filters.'
    }
  },
  {
    id: 'q38',
    passageId: 'passage4',
    type: 'tf',
    questionNumber: 38,
    questionText: 'Determine the validity of the following statements based on Passage 4:',
    tfStatements: [
      { id: 'q38_s1', text: 'Focusing public attention on simple humorous memes actively encourages deeper research on mineral concessions.', isCorrect: false },
      { id: 'q38_s2', text: 'A "red herring" is an argument or device that distracts focus from high-stakes structural issues.', isCorrect: true },
      { id: 'q38_s3', text: 'The volume of viral contents can crowd out serious critical investigative journalism.', isCorrect: true },
      { id: 'q38_s4', text: 'Gatekeeping describes the total removal of all communication barriers in democratic square grids.', isCorrect: false }
    ],
    explanation: {
      correctResponse: 'Statements 2 and 3 are TRUE; statements 1 and 4 are FALSE.',
      distractorAnalysis: 'Statement 1 is false because focusing on memes *backgrounds* and distracts from deep policy, not encourages it. Statement 4 is false because gatekeeping refers to *filtering* or restricting access, not removing barriers.',
      strategy: 'Tracing logical fallacies and administrative filtering terms.',
      vocabAnalysis: 'Gatekeeping (controlling dissemination of ideas), Red herring (decoy).',
      criticalThinking: 'Analyzing systemic side-effects of an amusement-based media environment on public policy literacy.'
    }
  },
  {
    id: 'q39',
    passageId: 'passage4',
    type: 'tf',
    questionNumber: 39,
    questionText: 'Verify these assertions regarding digital network dynamics and fake support patterns:',
    tfStatements: [
      { id: 'q39_s1', text: 'Astroturfing campaigns are organic public surges that emerge without coordinate central management.', isCorrect: false },
      { id: 'q39_s2', text: 'Network analysis can reveal highly planned patterns of automated accounts in a viral trend.', isCorrect: true },
      { id: 'q39_s3', text: 'Traditional print media outlets are completely isolated from and unaffected by what trend on social media apps.', isCorrect: false },
      { id: 'q39_s4', text: 'Traditional news outlets may repeat social memes because they are compelled to capture trending traffic for ad receipts.', isCorrect: true }
    ],
    explanation: {
      correctResponse: 'Statements 2 and 4 are TRUE; statements 1 and 3 are FALSE.',
      distractorAnalysis: 'Statement 1 is false because astroturfing is *synthetic* (manufactured grassroots support), not organic. Statement 3 is false because traditional media outlets are heavily integrated with digital trends to capture ad revenue.',
      strategy: 'Analyzing communications-industry incentives and platform mechanics.',
      vocabAnalysis: 'Synthetic (artificial), Organic (natural/spontaneous).',
      criticalThinking: 'Identifying commercial dependencies of news platforms in digital ecosystems.'
    }
  },
  {
    id: 'q40',
    passageId: 'passage1',
    type: 'tf',
    questionNumber: 40,
    questionText: 'Verify the systemic balances outlined in Passage 1:',
    tfStatements: [
      { id: 'q40_s1', text: 'A major peat fire generally burns visible on the tree canopy, causing instant forest replanting.', isCorrect: false },
      { id: 'q40_s2', text: 'Draining peat aquifers empties them of moisture, leading to rapid aerobic decomposition.', isCorrect: true },
      { id: 'q40_s3', text: 'Peatland forest rehabilitation relies solely on devaluating local sovereign exchange rates.', isCorrect: false },
      { id: 'q40_s4', text: 'Optimizing outputs from pre-existing concessions through cloned hybrids is a recommended balancing practice.', isCorrect: true }
    ],
    explanation: {
      correctResponse: 'Statements 2 and 4 are TRUE; statements 1 and 3 are FALSE.',
      distractorAnalysis: 'Statement 1 is false because peat fires are *subterranean* (burning underground out of sight), not on the canopy. Statement 3 is an absurd cross-mixing of economic and ecological policies.',
      strategy: 'Synthesis recommendation tracking.',
      vocabAnalysis: 'Cloned hybrids (cloned variety cultivars), Rejuvenating (bringing back to health).',
      criticalThinking: 'Distinguishing practical horticultural optimizations from systemic macro-policies.'
    }
  },

  // =========================================================================
  // SHORT ANSWER QUESTIONS (41-45)
  // Exact lower-case single word or short phrase response required.
  // =========================================================================
  {
    id: 'q41',
    passageId: 'passage1',
    type: 'short',
    questionNumber: 41,
    questionText: 'What is the full Latin botanical scientific name of the African oil palm discussed in Passage 1?',
    correctAnswer: 'elaeis guineensis',
    explanation: {
      correctResponse: 'The correct answer is "elaeis guineensis".',
      distractorAnalysis: 'No alternatives are permitted as this is a strict botanical taxon match.',
      strategy: 'Exact fact extraction.',
      vocabAnalysis: 'Elaeis guineensis (scientific nomenclature).',
      criticalThinking: 'Standardizing scientific nomenclature in lower-case format.'
    }
  },
  {
    id: 'q42',
    passageId: 'passage2',
    type: 'short',
    questionNumber: 42,
    questionText: 'What mathematical condition dictates whether currency devaluation will successfully improve a country’s trade balance?',
    correctAnswer: 'marshall-lerner condition',
    explanation: {
      correctResponse: 'The correct answer is "marshall-lerner condition".',
      distractorAnalysis: 'Any other theoretical model is incorrect for this context.',
      strategy: 'Scanning and matching a capitalized mathematical model.',
      vocabAnalysis: 'Condition (prerequisite logical state).',
      criticalThinking: 'Isolating trade elasticity threshold requirements.'
    }
  },
  {
    id: 'q43',
    passageId: 'passage2',
    type: 'short',
    questionNumber: 43,
    questionText: 'What graphic graphical concept describes the pattern where a nation\'s trade balance temporarily worsens before improving after devaluation?',
    correctAnswer: 'j-curve effect',
    explanation: {
      correctResponse: 'The correct answer is "j-curve effect". "j-curve" is also highly common.',
      distractorAnalysis: 'Other curves like the Phillips curve or Lorenz curve are irrelevant.',
      strategy: 'Isolating specific graphical representations in macroeconomics.',
      vocabAnalysis: 'J-curve (lagged adjustment geometry).',
      criticalThinking: 'Visualizing temporal adjustments of physical quantities versus exchange value shifts.'
    }
  },
  {
    id: 'q44',
    passageId: 'passage3',
    type: 'short',
    questionNumber: 44,
    questionText: 'What type of regression term is used in Passage 3 to describe broad consumption subsidies because they disproportionately benefit wealthier subsets?',
    correctAnswer: 'regressive',
    explanation: {
      correctResponse: 'The correct answer is "regressive".',
      distractorAnalysis: 'Opposite of progressive, showing wealth transfer inefficiencies.',
      strategy: 'Extracting fiscal adjectives.',
      vocabAnalysis: 'Regressive (distributional skew toward rich).',
      criticalThinking: 'Converting equity principles into scientific adjectives.'
    }
  },
  {
    id: 'q45',
    passageId: 'passage4',
    type: 'short',
    questionNumber: 45,
    questionText: 'In political science, what term is used to describe a highly planned public-relations initiative made to simulate spontaneous, organic grassroots support?',
    correctAnswer: 'astroturfing',
    explanation: {
      correctResponse: 'The correct answer is "astroturfing".',
      distractorAnalysis: 'Spontaneous is grassroots; simulated is astroturfing.',
      strategy: 'Extracting nomenclature representing political deception.',
      vocabAnalysis: 'Astroturfing (synthetic public consensus synthesis).',
      criticalThinking: 'Evaluating systemic manipulation of public perception indicators in digital frames.'
    }
  }
];
