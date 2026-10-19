import { WritingModule, WritingSection } from '../types';
import { SRC } from './writingSources';

/**
 * "Write like a lawyer" — model documents with anatomy notes.
 *
 * Every model document is fictional (parties, numbers, addresses) but follows the
 * structure, headings, numbering and boilerplate of a real published document listed
 * in `modelledOn`. Legal statements are checked against the pages listed in `sources`
 * (see qa/writing-lab-audit.md for the audit trail).
 */

/** Strip the light layout markers used in sampleText. */
export const stripMarkers = (text: string): string =>
  text
    .split('\n')
    .map((line) => line.replace(/^(# |## |\^|>)/, ''))
    .join('\n');

const buildFull = (sections: WritingSection[]): string =>
  sections.map((s) => stripMarkers(s.sampleText)).join('\n\n');

/* ======================================================================
   1. LEGAL MEMORANDUM
   ====================================================================== */
const memoSections: WritingSection[] = [
  {
    sectionName: 'Heading',
    indonesianName: 'Kepala Memorandum',
    purpose:
      'Tells the reader who asked, who answered, when, and exactly which client and question the memo covers, so it can be filed and found later.',
    standardPhrases: [
      { en: 'MEMORANDUM', id: 'MEMORANDUM', notes: 'Title, centred. Some firms add “PRIVILEGED & CONFIDENTIAL — ATTORNEY WORK PRODUCT”.' },
      { en: 'TO: / FROM: / CC: / DATE: / RE:', id: 'KEPADA: / DARI: / TEMBUSAN: / TANGGAL: / PERIHAL:', notes: '“RE” (regarding) is used at CUNY and Columbia; Georgetown uses “SUBJECT”.' },
      { en: '[Client] — [legal issue in a few words] (Matter No. [ ])', id: '[Klien] — [isu hukum singkat] (No. Perkara [ ])', notes: 'The RE line names the client and the issue, not just the client.' },
    ],
    sampleText: `# MEMORANDUM
TO: Ratna Wijaya, Partner, Disputes Practice Group
FROM: Bima Prasetyo, Associate
CC: Andreas Lim, Senior Associate
DATE: 15 October 2026
RE: PT Nusantara Samudra Logistik — right to terminate the Tug Services Agreement with Selat Marine Pte Ltd and recover liquidated damages (Matter No. 2026-117)`,
    templateText: `# MEMORANDUM
TO: [Name], [Title]
FROM: [Your name], [Title]
CC: [Name or “File”]
DATE: [Day Month Year]
RE: [Client] — [legal question in one line] (Matter No. [ ])`,
    tips: [
      'Write the date in full (15 October 2026). “10/11/26” reads differently in Jakarta and New York.',
      'If the memo is confidential legal advice, mark it so at the top; do not rely on the reader to guess.',
    ],
    notes: [
      { quote: 'PT Nusantara Samudra Logistik — right to terminate the Tug Services Agreement', why: 'The subject line states the client and the question. A partner scanning a file of 40 memos should know what this one answers without opening it.' },
      { quote: 'Matter No. 2026-117', why: 'Firms file and bill by matter number. Including it is routine in practice even though school checklists only require To/From/Date/Re.' },
    ],
    sources: [SRC.cunyMemo, SRC.georgetownMemo, SRC.columbiaMemo],
  },
  {
    sectionName: 'Question Presented',
    indonesianName: 'Pertanyaan Hukum',
    purpose:
      'States the precise legal question in one sentence: the governing law, the legal issue, and the key facts that decide it, phrased so it can be answered yes or no.',
    standardPhrases: [
      { en: 'Under [law], does/may [party] [legal consequence] when [key facts]?', id: 'Berdasarkan [hukum], apakah [pihak] dapat [akibat hukum] apabila [fakta kunci]?', notes: '“Under–does–when” format (Columbia). Name the governing law first.' },
      { en: 'Whether [party] may [action] under [law] where [facts].', id: 'Apakah [pihak] dapat [tindakan] berdasarkan [hukum] dalam hal [fakta].', notes: 'Older “Whether…” format; still accepted, ends with a full stop or question mark.' },
      { en: 'without first serving the notice required by Clause [ ]', id: 'tanpa terlebih dahulu menyampaikan pemberitahuan yang disyaratkan Klausul [ ]', notes: 'Put the fact that creates the doubt into the question.' },
    ],
    sampleText: `# QUESTION PRESENTED
Under Singapore law, which governs the Tug Services Agreement, may PT Nusantara Samudra Logistik terminate the Agreement with immediate effect, without first serving the thirty-day cure notice described in Clause 14.1, when Selat Marine Pte Ltd withdrew both contracted tugs from Merak Port on 31 August 2026 to work a spot charter in Malaysia and has provided no services for forty-five consecutive days?`,
    templateText: `# QUESTION PRESENTED
Under [governing law], may [client] [legal action] [without/despite the obstacle], when [decisive fact 1], [decisive fact 2] and [decisive fact 3]?`,
    tips: [
      'Name the jurisdiction. A tug contract under Singapore law and one under Indonesian law can give different answers to the same facts.',
      'Keep it to about three or four lines (Georgetown). If it runs longer, you are arguing, not asking.',
      'Include the unfavourable fact that creates the doubt (here, the cure-notice clause). An objective memo does not hide it.',
    ],
    notes: [
      { quote: 'Under Singapore law, which governs the Tug Services Agreement,', why: 'Governing law comes first because it decides which rules apply. CUNY’s sample opens the same way: “Under New York law, did…”.' },
      { quote: 'without first serving the thirty-day cure notice described in Clause 14.1', why: 'This is the obstacle the client is worried about. Putting it in the question shows the reader you are not avoiding the hard point.' },
      { quote: 'has provided no services for forty-five consecutive days?', why: 'Ends with the decisive facts and a question mark, so the Brief Answer can start with “Yes” or “No”.' },
    ],
    sources: [SRC.columbiaMemo, SRC.georgetownMemo, SRC.cunyMemo, SRC.oregonMemo],
  },
  {
    sectionName: 'Brief Answer',
    indonesianName: 'Jawaban Singkat',
    purpose:
      'Answers the question first (yes / no / probably yes), then gives the reasons in a few sentences, usually without citations.',
    standardPhrases: [
      { en: 'Probably yes. [Reason], because [key fact].', id: 'Kemungkinan besar ya. [Alasan], karena [fakta kunci].', notes: 'An objective memo predicts; use “probably” when the law is not certain.' },
      { en: 'No. Where, as here, [facts], [rule] does not apply.', id: 'Tidak. Dalam hal seperti perkara ini, yaitu [fakta], [kaidah] tidak berlaku.', notes: '“Where, as here,” is taken from CUNY’s sample short answer.' },
      { en: 'is likely to be enforced because', id: 'kemungkinan besar akan ditegakkan karena', notes: 'The “because” clause (Columbia) links the rule to the facts.' },
    ],
    sampleText: `# BRIEF ANSWER
Probably yes. Clause 14.2(b) gives the Company a separate right to terminate “with immediate effect” if the Contractor suspends the Services for more than thirty consecutive days, and the cure procedure in Clause 14.1 is limited to breaches “capable of remedy”. Even apart from the contract, a deliberate withdrawal of every contracted vessel for the Contractor’s own profit is likely to be treated as a repudiation that the Company may accept. The daily liquidated damages in Clause 16.1 are likely to be enforced because Singapore courts still ask only whether the sum was a genuine pre-estimate of loss when the contract was made.`,
    templateText: `# BRIEF ANSWER
[Yes / No / Probably yes / Probably no]. [Rule in plain words], because [decisive fact]. [Second reason or alternative ground]. [Short answer to any second issue].`,
    tips: [
      'The first word is the answer. Busy partners often read only this paragraph.',
      'No case citations here; save them for the Discussion (CUNY, Georgetown).',
      'Do not write a bare “Yes” if the outcome depends on facts you have not verified. “Probably yes” is honest, not weak.',
    ],
    notes: [
      { quote: 'Probably yes.', why: 'A memo predicts how a tribunal will rule; it does not advocate. “Probably” signals the level of certainty, as CUNY recommends for each conclusion.' },
      { quote: 'is limited to breaches “capable of remedy”', why: 'Quoting the exact contract words lets the reader check the reasoning against the document.' },
      { quote: 'because Singapore courts still ask only whether the sum was a genuine pre-estimate', why: 'One “because” clause per conclusion. It names the rule without citing the case yet (the case appears in the Discussion).' },
    ],
    sources: [SRC.cunyMemo, SRC.columbiaMemo, SRC.georgetownMemo],
  },
  {
    sectionName: 'Facts',
    indonesianName: 'Fakta-Fakta',
    purpose:
      'Sets out every legally relevant fact, favourable or not, in a neutral and usually chronological order, plus the background needed to understand them.',
    standardPhrases: [
      { en: 'On [date], [Party A] and [Party B] entered into [agreement] (the “Agreement”).', id: 'Pada [tanggal], [Pihak A] dan [Pihak B] menandatangani [perjanjian] (“Perjanjian”).', notes: 'Define each party and document once, then use the defined term.' },
      { en: 'Under Clause [ ], the Contractor must…', id: 'Berdasarkan Klausul [ ], Kontraktor wajib…', notes: 'Quote the operative words of the clause.' },
      { en: 'The Contractor replied once, on [date], stating that…', id: 'Kontraktor hanya sekali membalas, pada [tanggal], dengan menyatakan bahwa…', notes: 'Report what was said without characterising it.' },
    ],
    sampleText: `# FACTS
PT Nusantara Samudra Logistik (the “Company”) runs bulk cargo handling at Merak Port, Banten. On 15 January 2026 it signed a five-year Tug Services Agreement (the “Agreement”) with Selat Marine Pte Ltd (the “Contractor”), a Singapore company. Under Clause 4.1, the Contractor must keep two harbour tugs “in continuous readiness at Merak Port, twenty-four hours a day”. Clause 25 provides that the Agreement is governed by Singapore law, and Clause 26 refers disputes to arbitration administered by the Singapore International Arbitration Centre (SIAC).
Clause 14.1 allows either party to terminate for a breach “capable of remedy” only if the breach is not remedied within thirty days after written notice. Clause 14.2(b) allows the Company to terminate “with immediate effect by written notice” if the Contractor “abandons or suspends the Services for more than thirty (30) consecutive days”. Clause 16.1 provides for liquidated damages of USD 5,000 for each day on which the Services are suspended. The negotiation file shows that this figure was the Company’s average daily cost of chartering replacement cover in 2025.
On 31 August 2026 the Contractor withdrew both tugs and their crews and sent them to a spot charter in Johor, Malaysia. The Company wrote to the Contractor on 2, 9 and 23 September 2026 asking when the tugs would return. The Contractor replied once, on 24 September 2026, that the tugs would return “when commercially feasible”. No services have been provided since 31 August 2026, a period of forty-five days at the date of this memorandum. The Company is paying USD 5,400 per day for replacement tugs.`,
    templateText: `# FACTS
[Client] (the “Company”) [what it does]. On [date] it signed [agreement] (the “Agreement”) with [counterparty] (the “[short name]”). Under Clause [ ], [obligation, quoted]. Clause [ ] provides that the Agreement is governed by [law] and Clause [ ] refers disputes to [forum].
[Quote the clauses the analysis turns on.]
On [date], [what happened]. [Client’s response, with dates]. [Counterparty’s response, quoted]. [Current position and any loss figures].`,
    tips: [
      'Every fact you use in the Discussion must first appear here (CUNY).',
      'Include the bad facts. A partner who learns them later from the other side will not trust the memo.',
      'No adjectives that argue (“blatantly”, “unlawfully”). Let the dates and quotations do the work.',
    ],
    notes: [
      { quote: 'Clause 25 provides that the Agreement is governed by Singapore law', why: 'The governing-law and dispute clauses are facts too. They explain why the Discussion relies on Singapore cases and why the next step is SIAC, not a district court.' },
      { quote: 'The negotiation file shows that this figure was the Company’s average daily cost', why: 'This is the fact that decides the penalty issue later. Stating its source (the negotiation file) tells the partner what evidence exists.' },
      { quote: 'that the tugs would return “when commercially feasible”', why: 'Quoted, not paraphrased. Whether this is a repudiation is for the Discussion; the Facts only record what was said.' },
    ],
    sources: [SRC.cunyMemo, SRC.oregonMemo],
  },
  {
    sectionName: 'Discussion',
    indonesianName: 'Pembahasan (Analisis)',
    purpose:
      'The analysis. Opens with a short roadmap, then takes each issue in turn using CREAC: Conclusion, Rule, Rule explanation, Application (including counter-arguments), Conclusion.',
    standardPhrases: [
      { en: 'This memorandum first considers [issue I] and then [issue II].', id: 'Memorandum ini pertama-tama membahas [isu I], kemudian [isu II].', notes: 'Roadmap / umbrella paragraph (Columbia, CUNY).' },
      { en: 'Read together, Clauses [ ] and [ ] create two separate routes to termination.', id: 'Dibaca bersama-sama, Klausul [ ] dan [ ] mengatur dua jalur pengakhiran yang terpisah.', notes: 'Rule from the contract itself.' },
      { en: 'The Contractor may argue that… This argument is weak because…', id: 'Kontraktor mungkin berdalil bahwa… Dalil ini lemah karena…', notes: 'Counter-argument, then why it probably fails.' },
      { en: 'In [case], the Court of Appeal held that…', id: 'Dalam perkara [nama perkara], Court of Appeal memutuskan bahwa…', notes: 'Rule explanation from authority.' },
    ],
    sampleText: `# DISCUSSION
The Company probably may terminate the Agreement now and claim USD 225,000 in liquidated damages. This memorandum first considers the right to terminate (Part I) and then the enforceability of Clause 16.1 (Part II).
## I. The Company may terminate under Clause 14.2(b) without a cure notice.
Read together, Clauses 14.1 and 14.2 create two separate routes to termination. Clause 14.1 is expressly limited to breaches “capable of remedy” and requires thirty days’ notice. Clause 14.2(b) is triggered by a single fact, suspension of the Services “for more than thirty (30) consecutive days”, and allows termination “with immediate effect”. Nothing in Clause 14.2 makes it subject to Clause 14.1. The suspension has now lasted forty-five days, so the trigger is met on the plain words of the clause.
The Contractor may argue that it can still cure by bringing the tugs back. This argument is weak. The days on which no tug was available cannot be restored, and Clause 14.2(b) does not require any further notice. In any event, a party may also terminate at common law when the other side’s conduct shows that it will not perform. In Denka Advantech Pte Ltd v Seraya Energy Pte Ltd [2020] SGCA 119, the Court of Appeal treated a letter stating that supply “shall cease” as a repudiation that the innocent party was entitled to accept. The Contractor’s removal of both tugs for its own profit, followed by an open-ended reply, is likely to be viewed in the same way.
## II. Clause 16.1 is likely to be enforced as liquidated damages.
Singapore has not followed the reformulated penalty test in Cavendish Square Holding BV v Makdessi [2015] UKSC 67. In Denka, the Court of Appeal kept the test from Dunlop Pneumatic Tyre Co Ltd v New Garage and Motor Co Ltd [1915] AC 79: a clause is enforceable if the stipulated sum was a genuine pre-estimate of likely loss at the time of contracting, and penal if it was extravagant compared with the greatest loss that could conceivably follow. The USD 5,000 daily rate was taken from the Company’s actual 2025 replacement costs and is below the USD 5,400 the Company is now paying. A tribunal is therefore likely to find it a genuine pre-estimate. The Contractor could argue that the Company’s real loss is lower, but the test looks at the position when the contract was made, not with hindsight.`,
    templateText: `# DISCUSSION
[One-sentence overall conclusion]. This memorandum first considers [issue I] (Part I) and then [issue II] (Part II).
## I. [Conclusion on issue I, as a full sentence.]
[Rule: contract wording / statute / case.] [Rule explanation: how courts have applied it.] [Application to our facts.]
[Counter-argument the other side will run.] [Why it probably fails.]
## II. [Conclusion on issue II, as a full sentence.]
[Rule.] [Explanation.] [Application.] [Counter-argument and response.]`,
    tips: [
      'Write each heading as a conclusion (“The Company may terminate…”), not a topic (“Termination”). A reader who skims only the headings still gets the answer.',
      'Cite the governing law’s cases. Here, a Singapore-law contract is analysed with Singapore Court of Appeal authority; an English case is mentioned only to explain why it is not followed.',
      'If the contract were governed by Indonesian law, the analysis would change: Pasal 1266 KUHPerdata requires termination through a court unless validly waived, and penalty clauses are governed by Pasal 1249 and 1304–1309.',
    ],
    notes: [
      { quote: 'This memorandum first considers the right to terminate (Part I) and then the enforceability of Clause 16.1 (Part II).', why: 'The umbrella (roadmap) paragraph. Columbia and CUNY both expect the Discussion to open with the overall answer and the order of issues.' },
      { quote: 'I. The Company may terminate under Clause 14.2(b) without a cure notice.', why: 'A point heading: it is the “C” of CREAC. The partner can read the headings alone and know the outcome.' },
      { quote: 'The Contractor may argue that it can still cure by bringing the tugs back.', why: 'An objective memo must state and test the other side’s best argument (Georgetown checklist). This is the counter-argument step.' },
      { quote: 'In Denka, the Court of Appeal kept the test from Dunlop', why: 'The penalty test depends on the governing law. Singapore kept the Dunlop “genuine pre-estimate” test in Denka (2020); English law replaced it with the “legitimate interest” test in Makdessi (2015). Using the wrong one is a common student error.' },
    ],
    sources: [SRC.denka, SRC.makdessi, SRC.columbiaMemo, SRC.cunyMemo, SRC.oregonMemo, SRC.georgetownMemo, SRC.kuhperdata, SRC.waiver1266],
  },
  {
    sectionName: 'Conclusion',
    indonesianName: 'Kesimpulan',
    purpose:
      'Restates the answer with its level of certainty and turns it into concrete next steps. No new arguments.',
    standardPhrases: [
      { en: 'The Company is probably entitled to…', id: 'Perusahaan kemungkinan besar berhak untuk…', notes: 'Same certainty level as the Brief Answer.' },
      { en: 'I recommend that the Company (1)…; (2)…; and (3)…', id: 'Saya menyarankan agar Perusahaan (1)…; (2)…; dan (3)…', notes: 'Numbered, actionable steps.' },
      { en: 'Before [step], we should confirm that…', id: 'Sebelum [langkah], kita perlu memastikan bahwa…', notes: 'Flag what still needs checking.' },
    ],
    sampleText: `# CONCLUSION
The Company is probably entitled to terminate the Agreement with immediate effect under Clause 14.2(b) and, in the alternative, to accept the Contractor’s conduct as a repudiation. Clause 16.1 is likely to be enforced, giving a claim of USD 225,000 (45 days × USD 5,000) to the date of this memorandum. I recommend that the Company (1) serve a termination notice under Clause 14.2(b), in the manner required by Clause 27 (Notices), stating in the alternative that it accepts the Contractor’s repudiation; (2) demand payment of the accrued liquidated damages within fourteen (14) days; and (3) prepare a Notice of Arbitration under the SIAC Rules 2025 in case payment is not made. Before the notice is sent, we should confirm that the Agreement contains no force majeure provision or negotiation step that the Contractor could rely on.`,
    templateText: `# CONCLUSION
[Client] is [probably] entitled to [result] under [ground] and, in the alternative, [second ground]. [Second issue result, with figures]. I recommend that [client] (1) [step]; (2) [step]; and (3) [step]. Before [step], we should confirm [open point].`,
    tips: [
      'No citations and no new ideas in the Conclusion (Columbia, CUNY).',
      'Show the arithmetic (45 × USD 5,000). The reader should not need a calculator to check your number.',
      'Use calendar days or business days consistently, and say which.',
    ],
    notes: [
      { quote: 'in the alternative, to accept the Contractor’s conduct as a repudiation', why: 'Relying on two grounds protects the client if a tribunal reads Clause 14.2(b) narrowly.' },
      { quote: '(45 days × USD 5,000)', why: 'Showing the calculation lets the partner check it at a glance and reuse it in the demand letter.' },
      { quote: 'Before the notice is sent, we should confirm', why: 'Good memos say what has not been checked. The partner decides whether to wait or to send.' },
    ],
    sources: [SRC.columbiaMemo, SRC.cunyMemo, SRC.siacRules],
  },
];

/* ======================================================================
   2. LEGAL OPINION
   ====================================================================== */
const opinionSections: WritingSection[] = [
  {
    sectionName: 'Letterhead, date & addressee',
    indonesianName: 'Kop surat, tanggal & penerima',
    purpose:
      'Identifies the firm giving the opinion, the date at which it speaks, the person entitled to rely on it, and the transaction.',
    standardPhrases: [
      { en: 'Re: [Company] — [transaction]', id: 'Perihal: Pendapat Hukum sehubungan dengan [transaksi] [Perseroan]', notes: 'Indonesian opinions use “Perihal:” and “Kepada Yth.”' },
      { en: 'Ladies and Gentlemen:', id: 'Dengan hormat,', notes: 'Salutation used in the SSEK opinion filed with the SEC; avoids “Dear Sirs”.' },
    ],
    sampleText: `^WIDJAJA SANTOSO & PARTNERS
^Indonesian Legal Consultants
^Menara Kuningan, 18th Floor · Jl. H.R. Rasuna Said Kav. 5 · Jakarta 12940
Ref. No.: 0918/WSP-CORP/IX/2026
15 September 2026
Meridian Infrastructure Partners Fund II LP
10 Collyer Quay, #40-01
Singapore 049315
## Re: PT Surya Energi Lestari — Subscription for New Shares
Ladies and Gentlemen:`,
    templateText: `^[FIRM NAME]
^Indonesian Legal Consultants
^[Address]
Ref. No.: [ ]
[Date]
[Addressee entitled to rely]
[Address]
## Re: [Company] — [Transaction]
Ladies and Gentlemen:`,
    tips: [
      'The date matters: the opinion speaks only as of that day. Later changes in law or facts are excluded expressly at the end.',
      'Address the opinion to the party who will rely on it (here, the investor), not to the company’s own board.',
    ],
    notes: [
      { quote: 'Ladies and Gentlemen:', why: 'This is the salutation in SSEK’s Indonesian-law opinion filed on SEC EDGAR. “Dear Sirs” is now avoided in international practice.' },
      { quote: 'Ref. No.: 0918/WSP-CORP/IX/2026', why: 'Indonesian firms number opinions with a reference that includes the month in Roman numerals, as in the MMI opinion (“8268/MMI-SKD/XI/2022”).' },
    ],
    sources: [SRC.ssekOpinion, SRC.mmiOpinion],
  },
  {
    sectionName: 'Introduction & purpose',
    indonesianName: 'Pendahuluan & maksud',
    purpose:
      'States who the lawyers are and that they are qualified in Indonesian law, whom they act for, and the single purpose for which the opinion is given.',
    standardPhrases: [
      { en: 'We are qualified lawyers of the Republic of Indonesia and as such are qualified to issue this opinion…', id: 'Kami adalah konsultan hukum yang berkualifikasi di Republik Indonesia dan karenanya berwenang memberikan pendapat hukum ini…', notes: 'Wording from the SSEK opinion.' },
      { en: 'This Opinion is delivered to you solely for your benefit in connection with…', id: 'Pendapat Hukum ini diberikan semata-mata untuk kepentingan Anda sehubungan dengan…', notes: 'Limits who may rely and for what.' },
    ],
    sampleText: `## A. Introduction
We are qualified lawyers of the Republic of Indonesia (“Indonesia”) and as such are qualified to issue this opinion (this “Opinion”) on the Indonesian Laws in effect as of the date hereof.
## B. Purpose
We act as Indonesian counsel to PT Surya Energi Lestari, a limited liability company (perseroan terbatas) established under the laws of Indonesia (the “Company”). This Opinion is delivered to you solely for your benefit in connection with the Share Subscription Agreement dated 1 September 2026 between the Company and you (the “Subscription Agreement”), under which you will subscribe for 4,900 new shares in the Company (the “New Shares”).`,
    templateText: `## A. Introduction
We are qualified lawyers of the Republic of Indonesia and as such are qualified to issue this opinion (this “Opinion”) on the Indonesian Laws in effect as of the date hereof.
## B. Purpose
We act as Indonesian counsel to [Company], a limited liability company established under the laws of Indonesia (the “Company”). This Opinion is delivered to you solely for your benefit in connection with [transaction document] dated [ ] (the “[Defined Term]”).`,
    tips: [
      'Define every term on first use with (the “Term”) and use it consistently. Opinions are read clause by clause by the other side’s lawyers.',
      'Keep the Indonesian term in brackets the first time (perseroan terbatas) so foreign readers know the legal form.',
    ],
    notes: [
      { quote: 'qualified to issue this opinion (this “Opinion”) on the Indonesian Laws in effect as of the date hereof', why: 'Three limits in one sentence: who (Indonesian lawyers), which law (Indonesian only), and when (the opinion date). Taken from the structure of SSEK’s published opinion.' },
      { quote: 'solely for your benefit in connection with the Share Subscription Agreement', why: 'Limits reliance to one addressee and one transaction, so the firm is not liable to strangers who later read the letter.' },
    ],
    sources: [SRC.ssekOpinion],
  },
  {
    sectionName: 'Documents & definitions',
    indonesianName: 'Dokumen & definisi',
    purpose:
      'Lists exactly what the lawyers examined and defines the laws and bodies the opinion refers to, so the reader knows the factual base and the legal frame.',
    standardPhrases: [
      { en: 'In rendering this Opinion, we have examined originals or copies of the documents listed in Appendix 1…', id: 'Dalam memberikan Pendapat Hukum ini, kami telah memeriksa asli atau salinan dokumen-dokumen sebagaimana tercantum dalam Lampiran 1…', notes: 'The full list goes in an appendix.' },
      { en: '“Company Law” means Law No. 40 of 2007 on Limited Liability Companies, as amended.', id: '“UUPT” berarti Undang-Undang No. 40 Tahun 2007 tentang Perseroan Terbatas sebagaimana telah diubah.', notes: 'Always “as amended” — latest by UU No. 6 Tahun 2023.' },
    ],
    sampleText: `## C. Documents
In rendering this Opinion, we have examined originals or copies of the documents provided to us by the Company or obtained by us from Governmental Agencies and listed in Appendix 1 (the “Documents”), including the Company’s deed of establishment No. 12 dated 6 March 2023, approved by the Minister of Law and Human Rights by Decree No. AHU-0021457.AH.01.01.Tahun 2023, and the Company’s current articles of association.
## D. Key Definitions
“Company Law” means Law No. 40 of 2007 on Limited Liability Companies, as amended, most recently by Law No. 6 of 2023.
“Indonesian Laws” means the published and publicly available statutes and regulations of Indonesia having general effect and the force of law on the date of this Opinion.
“MOL” means the Ministry of Law of Indonesia (Kementerian Hukum) established under Presidential Regulation No. 155 of 2024, which administers company approvals formerly handled by the Ministry of Law and Human Rights.
“Positive List” means Presidential Regulation No. 10 of 2021 on Investment Business Fields, as amended by Presidential Regulation No. 49 of 2021.`,
    templateText: `## C. Documents
In rendering this Opinion, we have examined originals or copies of the documents listed in Appendix 1 (the “Documents”), including [deed of establishment No. [ ] dated [ ], approved by Decree No. AHU-[ ].AH.01.01.Tahun [ ]].
## D. Key Definitions
“Company Law” means Law No. 40 of 2007 on Limited Liability Companies, as amended.
“Indonesian Laws” means [ ].
“[Regulator]” means [ ].`,
    tips: [
      'Cite AHU decrees accurately: …AH.01.01.Tahun… approves establishment; …AH.01.02.Tahun… approves an amendment of the articles; AHU-AH.01.03-… is a notification receipt.',
      'Kemenkumham no longer exists: Perpres 155/2024 (5 November 2024) set up the Kementerian Hukum, whose functions include administrasi hukum umum, and revoked Perpres 18/2023 on the Kementerian Hukum dan HAM. Decrees issued before the change still name the Minister of Law and Human Rights.',
    ],
    notes: [
      { quote: 'approved by the Minister of Law and Human Rights by Decree No. AHU-0021457.AH.01.01.Tahun 2023', why: 'The 2023 decree is described with the ministry’s name at that time. The “AH.01.01” code marks an establishment approval, as in the deeds listed in the SSEK opinion.' },
      { quote: 'as amended, most recently by Law No. 6 of 2023', why: 'The Company Law has been amended by the Cipta Kerja legislation (UU 11/2020, Perpu 2/2022, UU 6/2023). An opinion citing it without “as amended” is out of date.' },
      { quote: 'established under Presidential Regulation No. 155 of 2024', why: 'Cite the instrument, not a news report: Perpres 155/2024 establishes the Kementerian Hukum with administrasi hukum umum among its functions. Using “Kemenkumham” for a 2026 act would be an error.' },
    ],
    sources: [SRC.ssekOpinion, SRC.uupt, SRC.perpres155, SRC.perpres10],
  },
  {
    sectionName: 'Assumptions',
    indonesianName: 'Asumsi-asumsi',
    purpose:
      'Lists the facts the lawyers have taken as true without checking them. If an assumption is wrong, the opinion does not cover the consequences.',
    standardPhrases: [
      { en: 'the genuineness of all signatures, stamps and seals on, and the authenticity of, all Documents;', id: 'keaslian seluruh tanda tangan, meterai dan cap pada, serta keautentikan, seluruh Dokumen;', notes: 'KBBI standard spelling is “autentik/keautentikan”; practice often writes “otentik”.' },
      { en: 'the conformity with the originals of all Documents submitted to us as copies;', id: 'kesesuaian seluruh Dokumen yang diserahkan kepada kami dalam bentuk salinan dengan aslinya;', notes: 'MMI: “fotokopi atau salinan lain adalah sesuai dengan aslinya”.' },
      { en: 'the absence of any other document that would affect our opinions;', id: 'tidak adanya dokumen lain yang dapat mempengaruhi pendapat kami;', notes: 'Closing “catch-all” assumption.' },
    ],
    sampleText: `## E. Assumptions
For the purpose of this Opinion, we have assumed:
>(i) the genuineness of all signatures, stamps and seals on, and the authenticity of, all Documents;
>(ii) the conformity with the originals of all Documents submitted to us as copies;
>(iii) the legal capacity of each individual who signed any of the Documents;
>(iv) the truth, accuracy and completeness of all statements made to us by the directors of the Company; and
>(v) that there are no documents other than the Documents that would affect the opinions expressed below.`,
    templateText: `## E. Assumptions
For the purpose of this Opinion, we have assumed:
>(i) the genuineness of all signatures and the authenticity of all Documents;
>(ii) the conformity with the originals of all Documents submitted as copies;
>(iii) [capacity / authority assumption];
>(iv) [accuracy of officers’ statements]; and
>(v) [no other documents].`,
    tips: [
      'Never assume the very thing you are opining on. If you opine that the shares were duly authorised, do not also assume the resolutions were valid.',
      'Number assumptions with roman numerals so qualifications can refer back to them.',
    ],
    notes: [
      { quote: '(i) the genuineness of all signatures, stamps and seals on, and the authenticity of, all Documents;', why: 'The standard first assumption. SSEK’s published opinion opens its list with the same words; the MMI opinion says “tanda tangan … adalah asli … dokumen-dokumen asli … adalah otentik”.' },
      { quote: '(v) that there are no documents other than the Documents', why: 'The “catch-all”. Lawyers can only opine on what they were shown.' },
    ],
    sources: [SRC.ssekOpinion, SRC.mmiOpinion, SRC.kbbi],
  },
  {
    sectionName: 'Opinions',
    indonesianName: 'Pendapat Hukum',
    purpose:
      'The operative statements: short, numbered conclusions of law that the addressee will rely on.',
    standardPhrases: [
      { en: 'Based on our review of the Documents and subject to the assumptions and qualifications contained herein, we are of the opinion that:', id: 'Berdasarkan pemeriksaan kami atas Dokumen dan dengan tunduk pada asumsi serta kualifikasi dalam Pendapat Hukum ini, Pendapat Hukum kami adalah sebagai berikut:', notes: 'Lead-in from SSEK; Indonesian closing phrase from MMI.' },
      { en: 'The Company has been duly established and is validly existing as a limited liability company under Indonesian Laws.', id: 'Perseroan adalah badan hukum Indonesia berbentuk perseroan terbatas yang telah didirikan secara sah dan masih berdiri menurut hukum Indonesia.', notes: '“Validly existing” = still in existence on the opinion date, not “active”.' },
      { en: 'constitutes valid and binding obligations of the Company, enforceable against it in accordance with its terms', id: 'merupakan kewajiban yang sah dan mengikat Perseroan serta dapat dilaksanakan terhadap Perseroan sesuai dengan ketentuannya', notes: '“Legal” in “legal, valid and binding” is usually treated as redundant.' },
    ],
    sampleText: `## F. Opinions
Based on our review of the Documents and subject to the assumptions and qualifications contained herein, we are of the opinion that:
>(a) The Company has been duly established and is validly existing as a limited liability company under Indonesian Laws.
>(b) The Company has the corporate power to enter into and perform the Subscription Agreement, and its execution of the Subscription Agreement has been duly authorized by a resolution of its General Meeting of Shareholders dated 28 August 2026.
>(c) Upon payment of the subscription price in full and registration of the New Shares in the Company’s share register, the New Shares will be validly issued and fully paid.
>(d) The foreign shareholding in the Company immediately after the issue of the New Shares will comply with the foreign shareholding limitations applicable to the Company’s line of business under the Positive List.
>(e) The Subscription Agreement constitutes valid and binding obligations of the Company, enforceable against it in accordance with its terms.`,
    templateText: `## F. Opinions
Based on our review of the Documents and subject to the assumptions and qualifications contained herein, we are of the opinion that:
>(a) [Company] has been duly established and is validly existing as a limited liability company under Indonesian Laws.
>(b) [Corporate power and authorisation].
>(c) [Shares / assets].
>(d) [Regulatory compliance point].
>(e) [Document] constitutes valid and binding obligations of [Company], enforceable against it in accordance with its terms.`,
    tips: [
      'Each opinion is one sentence. If it needs a “but”, the “but” belongs in the Qualifications.',
      'Translate “validly existing” as existing/still standing at the opinion date. Translating it as “berstatus aktif” changes the meaning.',
      'Prefer “valid and binding”. Many opinion reports treat the extra word “legal” as adding nothing.',
    ],
    notes: [
      { quote: 'subject to the assumptions and qualifications contained herein', why: 'Ties every opinion to Parts E and G. Without this phrase, a reader could quote an opinion out of context.' },
      { quote: 'has been duly established and is validly existing', why: 'The classic first opinion. “Validly existing” speaks to existence on the opinion date and is customarily supported by a public official’s certificate; “duly established” looks back to the incorporation steps (TriBar 1998 Report, §§ 1.2(f), 6.1).' },
      { quote: 'Upon payment of the subscription price in full and registration of the New Shares', why: 'A forward-looking opinion states its conditions. The lawyers cannot confirm shares are fully paid before the money arrives.' },
      { quote: 'constitutes valid and binding obligations of the Company, enforceable against it', why: 'The “remedies opinion”. Note it says “valid and binding”, not “legal, valid and binding”: opinion reports treat “legal” as redundant.' },
    ],
    sources: [SRC.ssekOpinion, SRC.mmiOpinion, SRC.tribar, SRC.perpres10],
  },
  {
    sectionName: 'Qualifications',
    indonesianName: 'Kualifikasi',
    purpose:
      'Limits and exceptions to the opinions: legal rules that may prevent enforcement as written, and matters the lawyers could not verify.',
    standardPhrases: [
      { en: 'The opinions expressed above are subject to the following qualifications:', id: 'Pendapat Hukum di atas tunduk pada kualifikasi-kualifikasi berikut:', notes: 'Lead-in.' },
      { en: '…subject to the principle of good faith, which may limit or preclude the reliance on, or enforcement of, contractual terms.', id: '…tunduk pada asas itikad baik, yang dapat membatasi atau meniadakan pelaksanaan ketentuan perjanjian.', notes: 'Pasal 1338 ayat (3) KUHPerdata.' },
      { en: 'Indonesian Laws require that an agreement to which an Indonesian party is party be made in the Indonesian language…', id: 'Hukum Indonesia mewajibkan perjanjian yang melibatkan pihak Indonesia dibuat dalam bahasa Indonesia…', notes: 'UU 24/2009 Pasal 31; Perpres 63/2019 Pasal 26.' },
    ],
    sampleText: `## G. Qualifications
The opinions expressed above are subject to the following qualifications:
>(1) We have not reviewed any documents other than the Documents. The company profile issued by the MOL is based on information reported by the Company and is not conclusive.
>(2) The enforcement of the Subscription Agreement may be limited by laws on bankruptcy and suspension of debt payment obligations (PKPU) and other laws affecting creditors’ rights generally.
>(3) Rights and obligations under any agreement governed by Indonesian Laws are subject to the principle of good faith under Article 1338 of the Indonesian Civil Code, which may limit or preclude the enforcement of contractual terms.
>(4) Law No. 24 of 2009 and Presidential Regulation No. 63 of 2019 require that an agreement involving an Indonesian party be made in the Indonesian language and, where a foreign party is involved, also in that party’s language or English. The Subscription Agreement has been signed in Indonesian and English. Some Indonesian courts have held agreements made in breach of this requirement to be void.
>(5) We express no opinion on any law other than Indonesian Laws, and we assume no obligation to advise you of any change in Indonesian Laws after the date of this Opinion.`,
    templateText: `## G. Qualifications
The opinions expressed above are subject to the following qualifications:
>(1) [Limits of review / registry not conclusive].
>(2) [Bankruptcy / PKPU / creditors’ rights].
>(3) [Good faith — Art. 1338 Civil Code].
>(4) [Language requirement — UU 24/2009, Perpres 63/2019].
>(5) [No other law; no duty to update].`,
    tips: [
      'The language qualification is specific to Indonesia and foreign readers rely on it. State how the agreement was actually signed.',
      'Indonesian practice is not settled: SEMA No. 3 Tahun 2023 gives room for agreements to stand despite language defects, and the question reached the Constitutional Court in Perkara 127/PUU-XXIII/2025. Qualify rather than promise.',
    ],
    notes: [
      { quote: 'is based on information reported by the Company and is not conclusive', why: 'SSEK’s opinion warns that Indonesia has no conclusive public company registry. Saying so protects the firm if the AHU data turns out to be wrong.' },
      { quote: 'subject to the principle of good faith under Article 1338 of the Indonesian Civil Code', why: 'Pasal 1338 ayat (3): agreements must be performed in good faith. Courts can use it to refuse enforcement of a term as written, so opinions qualify for it.' },
      { quote: 'Some Indonesian courts have held agreements made in breach of this requirement to be void.', why: 'The single most important Indonesia-specific qualification for cross-border deals. It mirrors qualification (18) in SSEK’s filed opinion.' },
    ],
    sources: [SRC.ssekOpinion, SRC.kuhperdata, SRC.uu24, SRC.perpres63, SRC.mk127],
  },
  {
    sectionName: 'Reliance, governing law & signature',
    indonesianName: 'Batasan penggunaan, hukum yang berlaku & tanda tangan',
    purpose:
      'Limits who else may see or rely on the opinion, states the law governing the opinion itself, and is signed in the firm’s name.',
    standardPhrases: [
      { en: 'This Opinion is strictly limited to the matters stated herein as of the date hereof…', id: 'Pendapat Hukum ini terbatas pada hal-hal yang dinyatakan di dalamnya per tanggal Pendapat Hukum ini…', notes: 'No implied opinions.' },
      { en: 'This Opinion shall not be quoted nor shall a copy be given to any person without our express prior written consent…', id: 'Pendapat Hukum ini tidak boleh dikutip atau diberikan salinannya kepada pihak mana pun tanpa persetujuan tertulis terlebih dahulu dari kami…', notes: 'Non-disclosure.' },
      { en: 'Very truly yours,', id: 'Hormat kami,', notes: 'Sign-off in SSEK (EN) and MMI (ID) opinions.' },
    ],
    sampleText: `This Opinion is strictly limited to the matters stated herein as of the date hereof and may not be read as extending by implication to any other matter. It shall not be quoted, nor shall a copy be given to any person other than the addressee, without our express prior written consent, except where disclosure is required by applicable law.
This Opinion is governed by and shall be construed in accordance with Indonesian Laws.
Very truly yours,
/s/ WIDJAJA SANTOSO & PARTNERS
WIDJAJA SANTOSO & PARTNERS`,
    templateText: `This Opinion is strictly limited to the matters stated herein as of the date hereof and may not be read as extending by implication to any other matter. It shall not be quoted or disclosed without our prior written consent, except where required by law.
This Opinion is governed by and shall be construed in accordance with Indonesian Laws.
Very truly yours,
/s/ [FIRM NAME]
[FIRM NAME]`,
    tips: [
      'Opinions are signed in the firm’s name, not by an individual associate.',
      'Capital-market opinions filed with OJK follow HKHPM standards and add the partner’s STTD and advocate numbers under the signature (see the MMI opinion).',
    ],
    notes: [
      { quote: 'may not be read as extending by implication to any other matter', why: 'Stops a reader from arguing that silence on a point is an implied clean opinion. Wording follows SSEK’s closing paragraph.' },
      { quote: '/s/ WIDJAJA SANTOSO & PARTNERS', why: '“/s/” is how a signature appears on a document filed electronically, as in EDGAR filings.' },
    ],
    sources: [SRC.ssekOpinion, SRC.mmiOpinion],
  },
];

/* ======================================================================
   3. DEMAND LETTER (SOMASI)
   Modelled on a redacted somasi published by DHP Lawyers and on the somasi
   letters pleaded and exhibited in PN Malang No. 100/Pdt.G/2026/PN Mlg.
   ====================================================================== */
const somasiSections: WritingSection[] = [
  {
    sectionName: 'Letterhead, number & addressee',
    indonesianName: 'Kop surat, Nomor, Lampiran, Perihal & Kepada Yth.',
    purpose:
      'Shows which firm is writing, the letter number, how many attachments travel with it, what it is about, how it was delivered and to whom. A somasi is later filed as evidence, so every one of these lines matters.',
    standardPhrases: [
      { en: 'Malang, 14 August 2026', id: 'Malang, 14 Agustus 2026', notes: 'Place and date, top right, as Indonesian letters do.' },
      { en: 'No.: 031/NK-SOM/VIII/2026', id: 'Nomor: 031/NK-SOM/VIII/2026', notes: 'Running number / firm code / letter type / month in Roman numerals / year — the pattern of the somasi numbers exhibited in 100/Pdt.G/2026 (e.g. 194/EPM-Legal/S/XII/2025).' },
      { en: 'Attachments: 3 (three) documents', id: 'Lampiran: 3 (tiga) berkas', notes: 'Count the attachments; list them in the body.' },
      { en: 'Re: Somasi (Legal Warning) I', id: 'Perihal: Somasi I / Teguran Hukum I', notes: 'Number the somasi: I, II, “terakhir”.' },
      { en: 'To: The Board of Directors, PT [ ]', id: 'Kepada Yth. Direksi PT [ ]', notes: 'A PT is represented by its Direksi.' },
    ],
    sampleText: `^NUGROHO KINANTI LAW OFFICE
^Advocates & Legal Consultants
^Jl. Ijen No. 25, Malang 65119 · office@nugrohokinanti.example
^Malang, 14 August 2026
No.: 031/NK-SOM/VIII/2026
Attachments: 3 (three) documents
Re: Somasi (Legal Warning) I — unpaid invoices under Supply Agreement No. 014/ABN-BKM/III/2026
BY HAND AGAINST SIGNED RECEIPT, AND BY EMAIL (legal@brantaskonstruksi.example)
To:
The Board of Directors
PT BRANTAS KONSTRUKSI MANDIRI
Jl. Soekarno-Hatta No. 88
Malang`,
    templateText: `^[FIRM NAME]
^Advocates & Legal Consultants
^[Address] · [email]
^[City], [Date]
No.: [number]/[firm code]-SOM/[month in Roman numerals]/[year]
Attachments: [number] ([in words]) documents
Re: Somasi (Legal Warning) [I / II / Final] — [subject]
BY HAND AGAINST SIGNED RECEIPT, AND BY EMAIL ([address])
To:
The Board of Directors
PT [DEBTOR]
[Address]
[City]`,
    tips: [
      'Deliver by hand and get the receipt signed and dated. In 100/Pdt.G/2026 the creditor filed the first somasi, the signed receipt (“Tanda Terima Somasi”) and the second somasi as evidence.',
      'Address a PT through its Board of Directors (Direksi): under Pasal 98(1) UUPT the Direksi represents the company in and out of court, as PN Malang applied in 216/Pdt.G/2025.',
      'A real somasi to an Indonesian company is written in Bahasa Indonesia. This English rendering keeps the Indonesian order of lines so that you can switch back easily.',
    ],
    notes: [
      { quote: 'No.: 031/NK-SOM/VIII/2026', why: 'Indonesian firms number letters as number / unit code / type / Roman month / year. The somasi exhibited in 100/Pdt.G/2026 were numbered “194/EPM-Legal/S/XII/2025” and “009/EPM-Legal/S/I/2026”.' },
      { quote: 'Attachments: 3 (three) documents', why: '“Lampiran” — the power of attorney, the agreement and the interest calculation. The DHP draft attaches the surat kuasa (“terlampir”) and the agreement (“bukti terlampir”).' },
      { quote: 'BY HAND AGAINST SIGNED RECEIPT, AND BY EMAIL', why: 'Proof of delivery. In 100/Pdt.G/2026 the signed receipt of the somasi (“Tanda Terima Somasi”) was filed as a separate piece of evidence; without it the debtor can deny ever being warned.' },
      { quote: 'The Board of Directors', why: 'The Direksi is the organ that represents a PT (Pasal 98(1) UUPT), so the warning reaches the people who can decide to pay.' },
    ],
    sources: [SRC.putusan100, SRC.dhpSomasi, SRC.putusan216, SRC.uupt],
  },
  {
    sectionName: 'Opening & authority to act',
    indonesianName: 'Pembukaan & dasar kuasa',
    purpose:
      'States who the advocates are, that they act under a special power of attorney (attached), and for which client — the first thing the recipient will check.',
    standardPhrases: [
      { en: 'Dear Members of the Board of Directors,', id: 'Dengan hormat,', notes: 'Neutral salutation; avoids “Dear Sirs”.' },
      { en: 'acting under a Special Power of Attorney dated [ ] (Attachment 1)', id: 'bertindak berdasarkan Surat Kuasa Khusus tertanggal [ ] (terlampir)', notes: 'Wording of the DHP draft.' },
      { en: 'are therefore authorised to act for and on behalf of our client', id: 'dari dan oleh karena itu berwenang bertindak untuk dan atas nama Klien kami', notes: 'The standard authority formula.' },
      { en: 'On our Client’s instructions we set out the following:', id: 'Bahwa terlebih dahulu kami menjelaskan hal-hal sebagai berikut:', notes: 'Lead-in to the numbered facts.' },
    ],
    sampleText: `Dear Members of the Board of Directors,
We, the undersigned, Arief Nugroho, S.H., M.H. and Laras Kinanti, S.H., Advocates at NUGROHO KINANTI LAW OFFICE, acting under a Special Power of Attorney dated 12 August 2026 (Attachment 1), are therefore authorised to act for and on behalf of our client, PT ARJUNA BAJA NUSANTARA, a limited liability company domiciled in Surabaya (“our Client”). On our Client’s instructions we set out the following:`,
    templateText: `Dear Members of the Board of Directors,
We, the undersigned, [names and titles], Advocates at [FIRM], acting under a Special Power of Attorney dated [ ] (Attachment 1), are therefore authorised to act for and on behalf of our client, [CLIENT], [legal form and domicile] (“our Client”). On our Client’s instructions we set out the following:`,
    tips: [
      'Attach the power of attorney. A debtor’s first reply is often “show us your authority”.',
      'Name every advocate who will sign; only they should sign the letter.',
      'Do not mark a somasi “without prejudice”. It is meant to be shown to a court later, and in Indonesian practice it is filed as evidence. (Comparative: Singapore protects only genuine settlement offers as “without prejudice” — [2016] SGHC 259.)',
    ],
    notes: [
      { quote: 'acting under a Special Power of Attorney dated 12 August 2026 (Attachment 1)', why: 'The DHP draft opens with exactly this: “bertindak berdasarkan Surat Kuasa Khusus tertanggal … (terlampir)”. Attaching the kuasa answers the authority question before it is asked.' },
      { quote: 'are therefore authorised to act for and on behalf of our client', why: '“dari dan oleh karena itu berwenang bertindak untuk dan atas nama Klien kami” — the formula that links the power of attorney to the demand that follows.' },
      { quote: 'On our Client’s instructions we set out the following:', why: 'Indonesian somasi move straight into numbered facts (“Bahwa terlebih dahulu kami menjelaskan hal-hal sebagai berikut”). No pleasantries.' },
    ],
    sources: [SRC.dhpSomasi, SRC.hir, SRC.sghcLod],
  },
  {
    sectionName: 'Facts',
    indonesianName: 'Uraian fakta (“Bahwa …”)',
    purpose:
      'Numbered paragraphs, each starting “That …”, setting out the agreement, the client’s performance, the unpaid invoices and the reminders already sent.',
    standardPhrases: [
      { en: 'That on [date] our Client and [debtor] entered into [agreement] (the “Agreement”, Attachment 2)…', id: 'Bahwa pada tanggal [ ] Klien kami dan [debitur] telah menandatangani [perjanjian] (“Perjanjian”, terlampir)…', notes: 'Name the agreement by number and date.' },
      { en: 'That the following invoices remain unpaid:', id: 'Bahwa tagihan-tagihan berikut belum dibayar:', notes: 'List invoice number, date, due date and amount.' },
      { en: 'That you have never disputed the deliveries…', id: 'Bahwa Saudara tidak pernah menyangkal penyerahan barang…', notes: 'Closes off later excuses.' },
    ],
    sampleText: `1. That on 2 March 2026 our Client and PT BRANTAS KONSTRUKSI MANDIRI (“you”) entered into Supply Agreement No. 014/ABN-BKM/III/2026 (the “Agreement”, Attachment 2) for the supply of reinforcing steel bars to your project in Kepanjen, Malang Regency.
2. That our Client delivered the goods in four shipments between 10 March and 30 June 2026, and your site representatives signed every delivery order.
3. That under Clause 5.2 of the Agreement you must pay each invoice within thirty (30) days of its date, and that the following invoices remain unpaid:
>(a) Invoice No. ABN/INV/2026/0517 dated 31 May 2026, due 30 June 2026: Rp450,000,000;
>(b) Invoice No. ABN/INV/2026/0611 dated 15 June 2026, due 15 July 2026: Rp380,000,000;
>(c) Invoice No. ABN/INV/2026/0630 dated 1 July 2026, due 31 July 2026: Rp420,000,000;
>a total of Rp1,250,000,000 (one billion two hundred and fifty million Rupiah).
4. That our Client’s reminders by email of 5 and 7 August 2026 have gone unanswered, and that you have never disputed the deliveries, the quality of the goods or the amounts invoiced.`,
    templateText: `1. That on [date] our Client and [DEBTOR] (“you”) entered into [agreement No. and date] (the “Agreement”, Attachment 2) for [subject].
2. That our Client [performed: delivered / provided] [what] on [dates], [evidence of performance].
3. That under Clause [ ] of the Agreement you must [obligation], and that the following invoices remain unpaid:
>(a) Invoice No. [ ] dated [ ], due [ ]: Rp[ ];
>(b) Invoice No. [ ] dated [ ], due [ ]: Rp[ ];
>a total of Rp[ ] ([amount in words] Rupiah).
4. That [earlier reminders and the debtor’s response, if any].`,
    tips: [
      'One fact per paragraph, each opening “That …” (“Bahwa …”), as in the DHP draft and in the claims PN Malang reproduced in 100/Pdt.G/2026 and 216/Pdt.G/2025.',
      'Reconcile the account before you write the total. In 100/Pdt.G/2026 the creditor’s figure was cut because the debtor proved Rp9.1 million of transfers the creditor had not credited.',
      'Write amounts in figures and in words. Check every date: 31 May + 30 days = 30 June; 15 June + 30 = 15 July; 1 July + 30 = 31 July.',
    ],
    notes: [
      { quote: 'Supply Agreement No. 014/ABN-BKM/III/2026', why: 'Identify the contract by its number and date, as the plaintiff did in 216/Pdt.G/2025 (“Surat Perjanjian Kerjasama (Kontrak) Nomor: 894/PPA/SPK/…”). It ties the somasi to one legal relationship.' },
      { quote: 'Invoice No. ABN/INV/2026/0517 dated 31 May 2026, due 30 June 2026: Rp450,000,000;', why: 'Invoice number, date, due date and amount for each debt — the same columns as the table of unpaid invoices in the claim reproduced in 100/Pdt.G/2026.' },
      { quote: 'you have never disputed the deliveries, the quality of the goods or the amounts invoiced', why: 'Narrows the dispute. Whatever the debtor does not deny when warned is hard to deny later, when the creditor must prove its claim (Pasal 163 HIR).' },
    ],
    sources: [SRC.dhpSomasi, SRC.putusan100, SRC.putusan216],
  },
  {
    sectionName: 'Legal basis',
    indonesianName: 'Dasar hukum',
    purpose:
      'Briefly connects the facts to the law: the binding force of the agreement, default after a warning, and the right to costs, damages and interest.',
    standardPhrases: [
      { en: 'you are in default (wanprestasi) of Clause [ ] of the Agreement', id: 'Saudara telah melakukan wanprestasi atas Pasal [ ] Perjanjian', notes: 'Legal conclusion.' },
      { en: 'a debtor is in default once declared so by a written order or a similar deed', id: 'debitur dinyatakan lalai dengan surat perintah, atau dengan akta sejenis itu', notes: 'Pasal 1238 KUHPerdata.' },
      { en: 'must compensate costs, damages and interest', id: 'wajib mengganti biaya, kerugian dan bunga', notes: 'Pasal 1243 KUHPerdata.' },
    ],
    sampleText: `5. That by failing to pay those invoices when due you are in default (wanprestasi) of Clause 5.2 of the Agreement. Under Article 1338 paragraph (1) of the Indonesian Civil Code the Agreement binds you as law; under Article 1238 a debtor is in default once declared so by a written order or a similar deed — which this letter is — or by the agreement itself when the time fixed has passed; and under Article 1243 a debtor who, having been declared in default, remains in default must compensate costs, damages and interest.
6. That Clause 5.4 of the Agreement entitles our Client to late-payment interest of one per cent (1%) per month on each overdue invoice from its due date. The calculation to the date of this letter is set out in Attachment 3.`,
    templateText: `5. That by failing to [perform] you are in default (wanprestasi) of Clause [ ] of the Agreement. Under Article 1338 paragraph (1) of the Indonesian Civil Code the Agreement binds you as law; under Article 1238 [default by this letter / by lapse of time]; and under Article 1243 [costs, damages and interest].
6. That Clause [ ] of the Agreement [interest / penalty clause]. The calculation is set out in Attachment 3.`,
    tips: [
      'Keep the law to one or two paragraphs. A somasi is not a pleading.',
      'Claim interest only on a contractual basis you can point to. In 100/Pdt.G/2026 PN Malang refused 6% a year “based on Supreme Court case law” because the parties had no agreement on interest.',
      'A somasi need not be an authentic deed or be served by a bailiff (MA 852 K/Sip/1972), and a claim is not automatically inadmissible without one — but it fixes the date of default and the start of interest.',
    ],
    notes: [
      { quote: 'a debtor is in default once declared so by a written order or a similar deed', why: 'Pasal 1238 KUHPerdata: “Debitur dinyatakan lalai dengan surat perintah, atau dengan akta sejenis itu, atau berdasarkan kekuatan dari perikatan sendiri…”. This letter is that “surat perintah”.' },
      { quote: 'a debtor who, having been declared in default, remains in default must compensate costs, damages and interest', why: 'Pasal 1243: compensation “mulai diwajibkan, bila debitur, walaupun telah dinyatakan lalai, tetap lalai”. That is why the warning comes before the claim.' },
      { quote: 'The calculation to the date of this letter is set out in Attachment 3.', why: 'Puts the arithmetic where the debtor can check it, without cluttering the letter. The interest rests on Clause 5.4, not on a general rate.' },
    ],
    sources: [SRC.kuhperdata, SRC.putusan100, SRC.maSomasi],
  },
  {
    sectionName: 'Demand & deadline',
    indonesianName: 'Teguran & tenggat waktu',
    purpose:
      'The operative warning: what must be paid, where, and by which date and time.',
    standardPhrases: [
      { en: 'Based on the foregoing, we hereby formally warn (somasi) [debtor] to pay…', id: 'Berdasarkan hal-hal tersebut di atas, bersama ini kami memperingatkan (SOMASI) [debitur] untuk membayar…', notes: 'DHP draft wording.' },
      { en: 'no later than 16.00 WIB on [day], [date]', id: 'selambat-lambatnya pukul 16.00 WIB pada hari [ ], tanggal [ ]', notes: 'Date, weekday, time and zone.' },
      { en: 'being fourteen (14) calendar days from the date of this letter', id: 'yaitu 14 (empat belas) hari kalender sejak tanggal surat ini', notes: 'Say how the deadline was counted.' },
    ],
    sampleText: `Based on the foregoing, we hereby formally warn (somasi) PT BRANTAS KONSTRUKSI MANDIRI to pay our Client Rp1,250,000,000 (one billion two hundred and fifty million Rupiah), together with interest under Clause 5.4 up to the date of payment, into our Client’s account stated in the invoices, no later than 16.00 WIB on Friday, 28 August 2026, being fourteen (14) calendar days from the date of this letter.`,
    templateText: `Based on the foregoing, we hereby formally warn (somasi) [DEBTOR] to [pay Rp[ ] ([in words]) / perform [obligation]], [together with interest under Clause [ ]], [into account / at place], no later than [time] WIB on [day], [date], being [number] ([in words]) calendar days from the date of this letter.`,
    tips: [
      'Fourteen calendar days, as in the second somasi pleaded in 100/Pdt.G/2026, is easy to defend. The DHP draft’s “3 × 24 jam” is common but leaves the debtor almost no time to pay.',
      'Give a calendar date, weekday, time and zone. 14 August + 14 days = Friday, 28 August 2026.',
    ],
    notes: [
      { quote: 'we hereby formally warn (somasi)', why: 'The DHP draft: “bersama ini kami memperingatkan (SOMASI) PT … untuk SEGERA melakukan pembayaran”. The verb is the point of the letter — it is the warning Pasal 1238 speaks of.' },
      { quote: 'no later than 16.00 WIB on Friday, 28 August 2026, being fourteen (14) calendar days from the date of this letter', why: 'In 100/Pdt.G/2026 the creditor pleaded a somasi giving “14 (empat belas) hari kalender”, ending on a stated date, and treated non-payment by that date as proof of default. A fixed date removes any argument about when time ran out.' },
    ],
    sources: [SRC.dhpSomasi, SRC.putusan100],
  },
  {
    sectionName: 'Consequences & room to settle',
    indonesianName: 'Akibat hukum & ruang penyelesaian',
    purpose:
      'Says what the client will do if the debtor does not comply, in the forum the law actually gives, and leaves a door open to settle.',
    standardPhrases: [
      { en: 'If you do not pay in full by that time, we shall … take legal action by filing a civil claim…', id: 'Apabila Saudara tidak memenuhi somasi ini dalam tenggat tersebut, maka kami akan menempuh upaya hukum dengan mengajukan gugatan…', notes: 'Name the forum.' },
      { en: 'Our Client nevertheless remains open to settling this matter amicably.', id: 'Namun demikian, Klien kami masih membuka ruang untuk menyelesaikan permasalahan ini secara kekeluargaan.', notes: 'DHP draft: “secara mediasi dan/atau kekeluargaan”.' },
      { en: 'Our Client reserves all its other rights and remedies.', id: 'Klien kami mencadangkan seluruh hak dan upaya hukum lainnya.', notes: 'Reservation of rights.' },
    ],
    sampleText: `If you do not pay in full by that time, we shall, on our Client’s instructions and without further notice, take legal action by filing a civil claim for breach of contract (gugatan wanprestasi) against you in the Malang District Court, claiming the principal, the contractual interest and the costs of the proceedings.
Our Client nevertheless remains open to settling this matter amicably. Should you wish to discuss payment before the deadline, please contact the undersigned at the address above.
Our Client reserves all its other rights and remedies.`,
    templateText: `If you do not [comply] by that time, we shall, on our Client’s instructions and without further notice, take legal action by [filing a civil claim in the [ ] District Court / commencing arbitration under Clause [ ]], claiming [heads of claim].
Our Client nevertheless remains open to settling this matter amicably. Should you wish to discuss [payment] before the deadline, please contact the undersigned at the address above.
Our Client reserves all its other rights and remedies.`,
    tips: [
      'Threaten only the forum you can use. Check the contract for an arbitration clause first; without one, a claim goes to the court where the defendant is domiciled (Pasal 118(1) HIR) or a domicile chosen in writing (Pasal 118(4) HIR).',
      'The DHP draft threatens criminal, civil and bankruptcy routes in one sentence. For an unpaid invoice, one specific, credible next step reads better.',
    ],
    notes: [
      { quote: 'we shall, on our Client’s instructions and without further notice, take legal action', why: 'The “apabila … upaya hukum” sentence of every somasi. The DHP draft: “Bahwa apabila Saudara tidak melaksanakan tuntutan kami … maka kami akan menempuh dan mempergunakan semua jalur hukum yang diperlukan”.' },
      { quote: 'in the Malang District Court', why: 'The debtor is domiciled in Malang, so under Pasal 118(1) HIR the claim goes to the Chief Judge of the Malang District Court. Naming the court shows the threat is real.' },
      { quote: 'Our Client nevertheless remains open to settling this matter amicably.', why: 'The DHP draft keeps the same door open (“kami masih membuka ruang untuk menyelesaikan permasalahan ini secara mediasi dan/atau kekeluargaan”). Courts will try mediation anyway before hearing the case.' },
    ],
    sources: [SRC.hir, SRC.dhpSomasi, SRC.putusan100],
  },
  {
    sectionName: 'Closing & signatures',
    indonesianName: 'Penutup, tanda tangan & tembusan',
    purpose: 'Closes in the Indonesian way, is signed by the advocates named in the power of attorney and lists who receives copies.',
    standardPhrases: [
      { en: 'Thus we convey this somasi. Thank you for your attention.', id: 'Demikian somasi ini kami sampaikan. Atas perhatiannya kami ucapkan terima kasih.', notes: 'Standard closing line.' },
      { en: 'Yours faithfully, / Counsel for [Client]', id: 'Hormat kami, / Kuasa Hukum [Klien]', notes: 'Sign-off of the DHP draft.' },
      { en: 'cc: 1. [Client]; 2. File', id: 'Tembusan: 1. Klien; 2. Arsip', notes: 'Copy list.' },
    ],
    sampleText: `Thus we convey this somasi. Thank you for your attention.
Yours faithfully,
Counsel for PT ARJUNA BAJA NUSANTARA
/s/ Arief Nugroho
Arief Nugroho, S.H., M.H.
/s/ Laras Kinanti
Laras Kinanti, S.H.
cc: 1. PT Arjuna Baja Nusantara (our Client); 2. File`,
    templateText: `Thus we convey this somasi. Thank you for your attention.
Yours faithfully,
Counsel for [CLIENT]
/s/ [Advocate 1]
[Name, titles]
/s/ [Advocate 2]
[Name, titles]
cc: 1. [Client]; 2. File`,
    tips: [
      'Only advocates named in the power of attorney should sign.',
      'Keep the receipt and a copy of everything sent. If the debtor still does not pay, these become exhibits to the gugatan (see the Civil claim module).',
    ],
    notes: [
      { quote: 'Thus we convey this somasi. Thank you for your attention.', why: 'A close rendering of “Demikianlah kami sampaikan Somasi ini, dan atas perhatian dan kerjasama yang baik, kami ucapkan terima kasih” in the DHP draft.' },
      { quote: 'cc: 1. PT Arjuna Baja Nusantara (our Client); 2. File', why: '“Tembusan: 1. Klien 2. File” — the DHP draft’s copy list. Do not copy third parties (banks, customers, the press) on a somasi.' },
    ],
    sources: [SRC.dhpSomasi],
  },
];

/* ======================================================================
   4. CONTRACT CLAUSES (cross-border)
   ====================================================================== */
const clauseSections: WritingSection[] = [
  {
    sectionName: 'Termination for default',
    indonesianName: 'Pengakhiran karena wanprestasi',
    purpose:
      'Lets a party end the contract when the other defaults, and — under Indonesian law — deals with Pasal 1266 KUHPerdata, which otherwise requires a court decision to terminate.',
    standardPhrases: [
      { en: 'may terminate this Agreement with immediate effect by written notice', id: 'dapat mengakhiri Perjanjian ini seketika dengan pemberitahuan tertulis', notes: 'Immediate termination right.' },
      { en: 'if such breach is capable of remedy, fails to remedy it within thirty (30) days', id: 'apabila pelanggaran tersebut dapat diperbaiki, tidak memperbaikinya dalam waktu tiga puluh (30) hari', notes: 'Cure period.' },
      { en: 'the Parties waive the provisions of Articles 1266 and 1267 of the Indonesian Civil Code to the extent that a court decision is required', id: 'Para Pihak sepakat mengesampingkan ketentuan Pasal 1266 dan 1267 KUHPerdata sepanjang disyaratkan adanya putusan pengadilan', notes: 'Standard waiver; courts mostly, not always, uphold it.' },
    ],
    sampleText: `## 14. TERMINATION
14.1 Either Party may terminate this Agreement by written notice if the other Party commits a material breach of this Agreement and, if such breach is capable of remedy, fails to remedy it within thirty (30) days after receiving written notice specifying the breach.
14.2 The Buyer may terminate this Agreement with immediate effect by written notice if the Supplier suspends the supply of the Goods for more than thirty (30) consecutive days.
14.3 For the purposes of this Clause 14, the Parties waive the provisions of Articles 1266 and 1267 of the Indonesian Civil Code to the extent that a court decision is required to terminate this Agreement.`,
    templateText: `## [ ]. TERMINATION
[ ].1 Either Party may terminate this Agreement by written notice if the other Party commits a material breach and, if such breach is capable of remedy, fails to remedy it within [ ] days after receiving written notice specifying the breach.
[ ].2 [Party] may terminate this Agreement with immediate effect by written notice if [specific event].
[ ].3 The Parties waive the provisions of Articles 1266 and 1267 of the Indonesian Civil Code to the extent that a court decision is required to terminate this Agreement.`,
    tips: [
      'Pasal 1266 says termination for default “harus dimintakan kepada Pengadilan”. Without a waiver, unilateral termination under Indonesian law is open to challenge.',
      'The waiver is usual but not bulletproof: a 2023 UI study found most courts uphold it under Pasal 1338(1), while at least one district court held it void. Keep a clear default and a proper notice trail anyway.',
      'Limit the waiver to the court-decision requirement; do not write that the Parties waive “all rights”.',
    ],
    notes: [
      { quote: 'if such breach is capable of remedy, fails to remedy it within thirty (30) days', why: 'The cure period applies only to curable breaches. That limit is what lets Clause 14.2 operate immediately — the same structure analysed in the memo module.' },
      { quote: 'suspends the supply of the Goods for more than thirty (30) consecutive days', why: 'A specific, factual trigger is easier to prove than “material breach”.' },
      { quote: 'waive the provisions of Articles 1266 and 1267 of the Indonesian Civil Code', why: 'Real Indonesian contracts use this formula (e.g. “berakhir tanpa menggunakan ketentuan Pasal 1266 dan 1267 KUH Perdata”, quoted in court decisions studied by Rahmadita & Cahyono). An Indonesian bank’s assignment agreement filed on SEC EDGAR waives “article 1266 of the Indonesian Civil Code so that this Agreement can be terminated without the need for judicial order”.' },
    ],
    sources: [SRC.kuhperdata, SRC.waiver1266, SRC.edgarIdLaw],
  },
  {
    sectionName: 'Liquidated damages',
    indonesianName: 'Ganti rugi yang ditetapkan (denda)',
    purpose:
      'Fixes in advance the sum payable for a specific breach (usually delay), so the innocent party does not have to prove its loss.',
    standardPhrases: [
      { en: 'the Supplier shall pay to the Buyer, as liquidated damages and not as a penalty, [amount] for each day of delay', id: 'Pemasok wajib membayar kepada Pembeli, sebagai ganti rugi yang telah ditetapkan dan bukan sebagai hukuman, sebesar [jumlah] untuk setiap hari keterlambatan', notes: 'Label helps but does not decide enforceability.' },
      { en: 'up to a maximum of [ ] per cent of the Contract Price', id: 'dengan jumlah maksimum [ ] persen dari Harga Kontrak', notes: 'A cap supports proportionality.' },
      { en: 'The Parties agree that this amount is a genuine pre-estimate of the loss…', id: 'Para Pihak sepakat bahwa jumlah ini merupakan perkiraan yang wajar atas kerugian…', notes: 'Recital of the basis.' },
    ],
    sampleText: `## 16. LIQUIDATED DAMAGES FOR DELAY
16.1 If the Supplier fails to deliver any Goods by the Delivery Date, the Supplier shall pay to the Buyer, as liquidated damages and not as a penalty, an amount equal to 0.1% of the price of the delayed Goods for each day of delay, up to a maximum of 10% of the Contract Price.
16.2 The Parties agree that the amount in Clause 16.1 is a genuine pre-estimate of the loss the Buyer is likely to suffer from late delivery.
16.3 Payment of liquidated damages under this Clause 16 does not relieve the Supplier of its obligation to deliver the Goods.`,
    templateText: `## [ ]. LIQUIDATED DAMAGES FOR DELAY
[ ].1 If [Party] fails to [obligation] by [date], [Party] shall pay, as liquidated damages and not as a penalty, [rate] for each day of delay, up to a maximum of [cap].
[ ].2 The Parties agree that this amount is a genuine pre-estimate of the loss [other Party] is likely to suffer.
[ ].3 Payment does not relieve [Party] of its obligation to [perform].`,
    tips: [
      'Which test applies depends on the governing law: Singapore keeps the “genuine pre-estimate” test (Denka, 2020); English law asks whether the sum is out of all proportion to a legitimate interest (Makdessi, 2015).',
      'Under Indonesian law, an agreed sum binds the court (Pasal 1249), but a penalty (hukuman, Pasal 1304–1307) may be reduced by the judge if the main obligation was partly performed (Pasal 1309).',
      'Pasal 1307: a creditor cannot claim both performance and the penalty, unless the penalty is only for delay — which is why Clause 16.3 keeps the delivery obligation alive.',
    ],
    notes: [
      { quote: 'as liquidated damages and not as a penalty', why: 'Traditional wording. Courts look at substance, not the label, but the phrase shows what the parties intended.' },
      { quote: 'up to a maximum of 10% of the Contract Price', why: 'A cap makes the clause look proportionate under either the Singapore or the English test.' },
      { quote: 'does not relieve the Supplier of its obligation to deliver the Goods', why: 'Pasal 1307 KUHPerdata allows the creditor to claim both performance and the penalty only when the penalty is for delay. This sentence makes that clear.' },
    ],
    sources: [SRC.denka, SRC.makdessi, SRC.kuhperdata],
  },
  {
    sectionName: 'Governing law',
    indonesianName: 'Hukum yang berlaku',
    purpose: 'Chooses the law that governs the contract and its interpretation.',
    standardPhrases: [
      { en: 'This Agreement shall be governed by and construed in accordance with the laws of the Republic of Indonesia.', id: 'Perjanjian ini diatur oleh dan ditafsirkan sesuai dengan hukum Negara Republik Indonesia.', notes: 'Standard wording in filed contracts governed by Indonesian law.' },
    ],
    sampleText: `## 18. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the Republic of Indonesia.`,
    templateText: `## [ ]. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of [jurisdiction].`,
    tips: [
      'The SIAC model clause recommends a separate applicable-law clause — the arbitration clause does not choose the law of the contract by itself.',
      'If the governing law is Indonesian, Pasal 1266, 1338 and the language law apply; draft the other clauses with that in mind.',
      'Make the forum clauses agree with each other. A contract filed on EDGAR (PT Kinerja Pay Indonesia, 2016) gives Indonesian courts “exclusive jurisdiction” in one sub-clause and sends “all claims and disputes” to arbitration in the next — an invitation to fight about the forum before the merits.',
    ],
    notes: [
      { quote: 'shall be governed by and construed in accordance with the laws of', why: 'The standard formula in filed contracts, e.g. “This Agreement is governed by and construed in accordance with the laws of the Republic of Indonesia” in an Indonesian bank’s assignment agreement filed on SEC EDGAR.' },
    ],
    sources: [SRC.edgarIdLaw, SRC.edgarKpay, SRC.siacModel],
  },
  {
    sectionName: 'Dispute resolution (SIAC)',
    indonesianName: 'Penyelesaian sengketa (SIAC)',
    purpose:
      'Sends disputes to arbitration and fixes the institution, rules, seat, number of arbitrators, language and the law of the arbitration agreement.',
    standardPhrases: [
      { en: 'Any dispute arising out of or in connection with this contract, including any question regarding its existence, validity or termination, shall be referred to and finally resolved by arbitration…', id: 'Setiap sengketa yang timbul dari atau sehubungan dengan perjanjian ini, termasuk setiap pertanyaan mengenai keberadaan, keabsahan atau pengakhirannya, akan dirujuk ke dan diselesaikan secara final melalui arbitrase…', notes: 'SIAC model clause wording.' },
      { en: 'The seat of the arbitration shall be Singapore.', id: 'Tempat kedudukan arbitrase adalah Singapura.', notes: '“Seat” is the legal place, not just the hearing venue.' },
      { en: 'The Tribunal shall consist of three arbitrators.', id: 'Majelis arbitrase terdiri atas tiga orang arbiter.', notes: 'SIAC: state one or three.' },
    ],
    sampleText: `## 19. DISPUTE RESOLUTION
19.1 Any dispute arising out of or in connection with this contract, including any question regarding its existence, validity or termination, shall be referred to and finally resolved by arbitration administered by the Singapore International Arbitration Centre (“SIAC”) in accordance with the Arbitration Rules of the Singapore International Arbitration Centre (“SIAC Rules”) for the time being in force, which rules are deemed to be incorporated by reference in this clause.
19.2 The seat of the arbitration shall be Singapore.
19.3 The Tribunal shall consist of three (3) arbitrators.
19.4 The language of the arbitration shall be English.
19.5 The law governing this arbitration agreement shall be the law of Singapore.`,
    templateText: `## [ ]. DISPUTE RESOLUTION
[ ].1 Any dispute arising out of or in connection with this contract, including any question regarding its existence, validity or termination, shall be referred to and finally resolved by arbitration administered by the Singapore International Arbitration Centre (“SIAC”) in accordance with the SIAC Rules for the time being in force, which rules are deemed to be incorporated by reference in this clause.
[ ].2 The seat of the arbitration shall be [Singapore].
[ ].3 The Tribunal shall consist of [one / three] arbitrator(s).
[ ].4 The language of the arbitration shall be [ ].
[ ].5 The law governing this arbitration agreement shall be [ ].`,
    tips: [
      'Copy the institution’s model clause exactly and fill every blank. Home-made variations cause jurisdiction fights.',
      '“For the time being in force” means the rules current when the arbitration starts — today the SIAC Rules 2025.',
      'The SIAC model clause (revised 9 December 2024) recommends stating the law of the arbitration agreement separately from the law of the contract.',
    ],
    notes: [
      { quote: 'including any question regarding its existence, validity or termination', why: 'Wide wording so that even a claim that the contract is void goes to arbitration. This is SIAC’s own model text.' },
      { quote: 'for the time being in force', why: 'Picks up whichever SIAC Rules apply when the case starts. The 2025 Rules apply to arbitrations commenced on or after 1 January 2025.' },
      { quote: 'The law governing this arbitration agreement shall be the law of Singapore.', why: 'Added to the SIAC model clause in its December 2024 revision; it avoids arguments about which law decides whether the arbitration clause is valid.' },
    ],
    sources: [SRC.siacModel, SRC.siacRules],
  },
  {
    sectionName: 'Language',
    indonesianName: 'Bahasa',
    purpose:
      'Complies with the Indonesian language law and says which version prevails if the Indonesian and English texts differ.',
    standardPhrases: [
      { en: 'This Agreement is made in the Indonesian language and the English language.', id: 'Perjanjian ini dibuat dalam bahasa Indonesia dan bahasa Inggris.', notes: 'UU 24/2009 Pasal 31(2).' },
      { en: 'In the event of any inconsistency or difference in interpretation, the [ ] version shall prevail.', id: 'Dalam hal terdapat ketidaksesuaian atau perbedaan penafsiran, versi bahasa [ ] yang berlaku.', notes: 'Perpres 63/2019 Pasal 26(4).' },
    ],
    sampleText: `## 21. LANGUAGE
21.1 This Agreement is made in the Indonesian language and the English language, and both versions are signed by the Parties on the same date.
21.2 In the event of any inconsistency or difference in interpretation between the two versions, the English version shall prevail, as agreed by the Parties under Article 26(4) of Presidential Regulation No. 63 of 2019.`,
    templateText: `## [ ]. LANGUAGE
[ ].1 This Agreement is made in the Indonesian language and the [English] language, and both versions are signed by the Parties on the same date.
[ ].2 In the event of any inconsistency or difference in interpretation, the [ ] version shall prevail.`,
    tips: [
      'Sign both versions at the same time. Whether a later translation cures the defect is disputed — the petitioners in Perkara MK 127/PUU-XXIII/2025 asked the Court to require both versions to be made simultaneously.',
      'Perpres 63/2019 Pasal 26(4) lets the parties choose which language governs if interpretations differ — use that power expressly.',
      'The question of what happens when the Indonesian version is missing remains contested (see SEMA 3/2023 and Perkara MK 127/PUU-XXIII/2025).',
    ],
    notes: [
      { quote: 'both versions are signed by the Parties on the same date', why: 'Addresses the main litigation risk under UU 24/2009 Pasal 31: an agreement with an Indonesian party must be in Indonesian. Signing both texts together removes the argument that the Indonesian version came later.' },
      { quote: 'as agreed by the Parties under Article 26(4) of Presidential Regulation No. 63 of 2019', why: 'Pasal 26(4): where interpretations differ, the language agreed in the agreement is used. Citing it shows the choice is made under the regulation itself.' },
    ],
    sources: [SRC.uu24, SRC.perpres63, SRC.mk127, SRC.ssekOpinion],
  },
  {
    sectionName: 'Execution block',
    indonesianName: 'Bagian penandatanganan',
    purpose: 'Records that each party signed through an authorised representative.',
    standardPhrases: [
      { en: 'IN WITNESS WHEREOF, the Parties have caused this Agreement to be signed by their duly authorised representatives on the date first written above.', id: 'DEMIKIANLAH, Perjanjian ini ditandatangani oleh wakil-wakil Para Pihak yang berwenang pada tanggal sebagaimana disebutkan pada awal Perjanjian ini.', notes: 'Traditional attestation clause.' },
      { en: 'Name: / Title:', id: 'Nama: / Jabatan:', notes: 'Show the signatory’s authority.' },
    ],
    sampleText: `IN WITNESS WHEREOF, the Parties have caused this Agreement to be signed by their duly authorised representatives on the date first written above.
PT PACIFIC LOGAM MULIA — Name: Hendra Kusuma — Title: President Director
APEX MACHINERY PTE LTD — Name: Lim Wei Jie — Title: Director`,
    templateText: `IN WITNESS WHEREOF, the Parties have caused this Agreement to be signed by their duly authorised representatives on the date first written above.
[PARTY 1] — Name: [ ] — Title: [ ]
[PARTY 2] — Name: [ ] — Title: [ ]`,
    tips: [
      'For a PT, check the articles of association: some transactions need Board of Commissioners or GMS approval before the director signs.',
      'Indonesian practice often adds a stamp duty (meterai) to the signed original.',
    ],
    notes: [
      { quote: 'by their duly authorised representatives', why: 'Puts authority on the record. Whether the director was in fact authorised is something a legal opinion will check against the articles.' },
    ],
    sources: [SRC.ssekOpinion],
  },
];

/* ======================================================================
   5. CIVIL CLAIM (GUGATAN WANPRESTASI) — PN MALANG
   Modelled on the claims reproduced in Putusan PN Malang
   No. 100/Pdt.G/2026/PN Mlg and No. 216/Pdt.G/2025/PN Mlg.
   ====================================================================== */
const gugatanSections: WritingSection[] = [
  {
    sectionName: 'Date, subject & addressee',
    indonesianName: 'Tempat & tanggal, perihal, Kepada Yth. Ketua Pengadilan Negeri',
    purpose:
      'A gugatan is a letter to the Chief Judge of the competent district court. The opening lines fix the date, the subject and the court.',
    standardPhrases: [
      { en: 'Re: Claim for Breach of Contract (Gugatan Wanprestasi)', id: 'Perihal: Gugatan Wanprestasi', notes: 'Name the cause of action.' },
      { en: 'To: The Honourable Chief Judge of the [ ] District Court', id: 'Kepada Yth. Ketua Pengadilan Negeri [ ]', notes: 'Pasal 118(1) HIR: the claim is addressed to the Chief Judge.' },
      { en: 'at [City]', id: 'di [Kota]', notes: 'Second line of the address.' },
    ],
    sampleText: `^Malang, 7 December 2026
Re: Claim for Breach of Contract (Gugatan Wanprestasi)
To:
The Honourable Chief Judge of the Malang District Court
at
>Malang`,
    templateText: `^[City], [Date]
Re: Claim for Breach of Contract (Gugatan Wanprestasi)
To:
The Honourable Chief Judge of the [ ] District Court
at
>[City]`,
    tips: [
      'File with the court where the defendant is domiciled (Pasal 118(1) HIR). If the contract chooses a domicile in writing, you may file there instead (Pasal 118(4) HIR): in 216/Pdt.G/2025 the defendant was in Balikpapan, but the contracts chose “the clerk’s office of the Malang District Court”, so the plaintiff filed in Malang and pleaded that clause.',
      'Check for an arbitration clause before filing. If there is one, the district court is the wrong forum.',
    ],
    notes: [
      { quote: 'The Honourable Chief Judge of the Malang District Court', why: 'Pasal 118(1) HIR: a claim is filed by a signed letter “kepada ketua pengadilan negeri di tempat diam si tergugat”. The defendant here is domiciled in Malang.' },
      { quote: 'Re: Claim for Breach of Contract (Gugatan Wanprestasi)', why: 'Name the cause of action. Wanprestasi (breach of contract) and perbuatan melawan hukum (tort) are different claims with different elements; mixing them invites an objection that the claim is unclear (obscuur libel).' },
    ],
    sources: [SRC.hir, SRC.putusan216, SRC.hukumonlineGugatan],
  },
  {
    sectionName: 'Parties (identity)',
    indonesianName: 'Identitas para pihak',
    purpose:
      'Identifies the advocates and their authority, the plaintiff and who represents it, and the defendant, with the defined labels used in the rest of the claim.',
    standardPhrases: [
      { en: 'who for this matter choose their office as legal domicile', id: 'yang dalam hal ini memilih domisili hukum di kantor kuasanya', notes: 'Address for service on the plaintiff.' },
      { en: 'acting under a Special Power of Attorney dated [ ]', id: 'berdasarkan Surat Kuasa Khusus tertanggal [ ]', notes: 'Pasal 123(1) HIR.' },
      { en: 'hereinafter referred to as the PLAINTIFF', id: 'selanjutnya disebut sebagai PENGGUGAT', notes: 'Capitalised defined label.' },
      { en: 'hereby respectfully file a claim against:', id: 'dengan ini mengajukan gugatan terhadap:', notes: 'Indonesian: “Lawan”.' },
    ],
    sampleText: `The undersigned, Arief Nugroho, S.H., M.H. and Laras Kinanti, S.H., Advocates at NUGROHO KINANTI LAW OFFICE, Jl. Ijen No. 25, Malang, who for this matter choose their office as legal domicile, acting under a Special Power of Attorney dated 1 December 2026 for and on behalf of:
PT ARJUNA BAJA NUSANTARA, a limited liability company domiciled at Jl. Rungkut Industri III No. 17, Surabaya, represented by Yudha Pratama in his capacity as President Director, hereinafter referred to as the PLAINTIFF;
hereby respectfully file a claim against:
PT BRANTAS KONSTRUKSI MANDIRI, a limited liability company domiciled at Jl. Soekarno-Hatta No. 88, Malang, represented by its Board of Directors, hereinafter referred to as the DEFENDANT.`,
    templateText: `The undersigned, [advocates’ names and titles], Advocates at [FIRM], [address], who for this matter choose their office as legal domicile, acting under a Special Power of Attorney dated [ ] for and on behalf of:
[PLAINTIFF], a [legal form] domiciled at [full address], represented by [name] in [his/her] capacity as [position], hereinafter referred to as the PLAINTIFF;
hereby respectfully file a claim against:
[DEFENDANT], a [legal form] domiciled at [full address], represented by [its Board of Directors / name, position], hereinafter referred to as the DEFENDANT.`,
    tips: [
      'Give the defendant’s full current address. Summonses go there, and a wrong address delays the case or ends in a judgment the defendant can set aside.',
      'Sue the right legal person. A PT is represented by its Board of Directors (Pasal 98(1) UUPT); in 216/Pdt.G/2025 PN Malang rejected an objection to the plaintiff’s in-house representatives on exactly that basis.',
      'In 100/Pdt.G/2026 the claim recites the number and date of the special power of attorney and its registration at the court clerk’s office. Register yours before the first hearing.',
    ],
    notes: [
      { quote: 'who for this matter choose their office as legal domicile', why: 'Mirrors “memilih … sebagai domisili hukumnya” in the claim reproduced in 100/Pdt.G/2026: the court and the other side serve documents on the plaintiff at counsel’s office.' },
      { quote: 'acting under a Special Power of Attorney dated 1 December 2026', why: 'Pasal 123(1) HIR: a party may be represented by someone holding a surat kuasa khusus. 100/Pdt.G/2026 cites the kuasa by number and date.' },
      { quote: 'represented by Yudha Pratama in his capacity as President Director', why: 'A company acts through its organ; name the person and the capacity (“selaku Direktur Utama”), as both PN Malang claims do.' },
      { quote: 'hereinafter referred to as the DEFENDANT', why: 'Indonesian claims capitalise PENGGUGAT and TERGUGAT throughout (both PN Malang claims do). Keep the labels identical to the end.' },
    ],
    sources: [SRC.putusan100, SRC.putusan216, SRC.hir, SRC.uupt],
  },
  {
    sectionName: 'Grounds of claim — facts',
    indonesianName: 'Posita (fundamentum petendi) — uraian fakta',
    purpose:
      'Numbered “That …” paragraphs telling the story in date order, each fact tied to an exhibit (P-1, P-2…).',
    standardPhrases: [
      { en: 'The grounds of the PLAINTIFF’s claim are as follows:', id: 'Adapun dalil-dalil gugatan PENGGUGAT adalah sebagai berikut:', notes: 'Lead-in to the posita.' },
      { en: 'That on [date] the PLAINTIFF and the DEFENDANT entered into … (Exhibit P-1).', id: 'Bahwa pada tanggal [ ] PENGGUGAT dan TERGUGAT telah menandatangani … (Bukti P-1).', notes: 'Every fact gets an exhibit number.' },
      { en: 'warned the DEFENDANT in writing by Somasi I … and by Somasi II…', id: 'telah memperingatkan TERGUGAT secara tertulis melalui Somasi I … dan Somasi II…', notes: 'Plead the warnings: Pasal 1238.' },
    ],
    sampleText: `## GROUNDS OF THE CLAIM
The grounds of the PLAINTIFF’s claim are as follows:
1. That the PLAINTIFF is a company engaged in the distribution of construction steel, and the DEFENDANT is a construction contractor and a customer of the PLAINTIFF.
2. That on 2 March 2026 the PLAINTIFF and the DEFENDANT entered into Supply Agreement No. 014/ABN-BKM/III/2026 (the “Agreement”) for the supply of reinforcing steel bars for the DEFENDANT’s project in Kepanjen, Malang Regency (Exhibit P-1).
3. That the PLAINTIFF delivered all the goods in four shipments between 10 March and 30 June 2026, as shown by delivery orders signed by the DEFENDANT’s representatives (Exhibits P-2a to P-2d).
4. That Clause 5.2 of the Agreement provides that “the Buyer shall pay each invoice in full within thirty (30) days of the invoice date”, and that the following invoices remain unpaid:
>(a) Invoice No. ABN/INV/2026/0517 dated 31 May 2026, due 30 June 2026: Rp450,000,000;
>(b) Invoice No. ABN/INV/2026/0611 dated 15 June 2026, due 15 July 2026: Rp380,000,000;
>(c) Invoice No. ABN/INV/2026/0630 dated 1 July 2026, due 31 July 2026: Rp420,000,000;
>totalling Rp1,250,000,000 (one billion two hundred and fifty million Rupiah) (Exhibits P-3a to P-3c).
5. That the PLAINTIFF, through its counsel, warned the DEFENDANT in writing by Somasi I No. 031/NK-SOM/VIII/2026 dated 14 August 2026, received by the DEFENDANT on the same day against a signed receipt and giving fourteen (14) calendar days to pay, that is, until 28 August 2026, and again by Somasi II dated 1 September 2026, but the DEFENDANT has paid nothing (Exhibits P-4 to P-6).`,
    templateText: `## GROUNDS OF THE CLAIM
The grounds of the PLAINTIFF’s claim are as follows:
1. That the PLAINTIFF is [description], and the DEFENDANT is [description].
2. That on [date] the PLAINTIFF and the DEFENDANT entered into [agreement No. and date] (the “Agreement”) for [subject] (Exhibit P-1).
3. That the PLAINTIFF [performed its obligations: what, when], as shown by [document] (Exhibit P-2).
4. That Clause [ ] of the Agreement provides that “[quote]”, and that the following invoices remain unpaid:
>(a) Invoice No. [ ] dated [ ], due [ ]: Rp[ ];
>(b) Invoice No. [ ] dated [ ], due [ ]: Rp[ ];
>totalling Rp[ ] ([amount in words] Rupiah) (Exhibit P-3).
5. That the PLAINTIFF warned the DEFENDANT in writing by Somasi I No. [ ] dated [ ], received on [ ] and giving [ ] days to [pay], and by Somasi II dated [ ], but the DEFENDANT [did not perform] (Exhibits P-4 to P-[ ]).`,
    tips: [
      'Quote the clause that was breached instead of paraphrasing it; 216/Pdt.G/2025 quotes each contract clause in full and gives every document a “Bukti P-” number.',
      'Reconcile before you file. In 100/Pdt.G/2026 PN Malang granted Rp24,665,334 instead of the Rp26,661,330 claimed after the defendant proved Rp9.1 million of transfers.',
      'Plead the somasi with number, date, receipt and deadline. A missing somasi does not automatically make the claim inadmissible (MA 852 K/Sip/1972; MA 117 K/Sip/1956), but it fixes the date of default.',
    ],
    notes: [
      { quote: 'The grounds of the PLAINTIFF’s claim are as follows:', why: 'The posita (fundamentum petendi): first the facts, then the legal grounds. Pasal 8(3) Rv, as explained by Hukumonline, requires both parts.' },
      { quote: '(Exhibit P-1)', why: '216/Pdt.G/2025 ties each fact to its exhibit in the posita itself (“… (Bukti P-1)”). The judge can check the claim against the evidence line by line.' },
      { quote: 'Invoice No. ABN/INV/2026/0517 dated 31 May 2026, due 30 June 2026: Rp450,000,000;', why: 'The claim in 100/Pdt.G/2026 lists the unpaid invoices by number, invoice date, due date and amount. Items make the total easy to check.' },
      { quote: 'giving fourteen (14) calendar days to pay, that is, until 28 August 2026', why: 'Copied from the structure of paragraph 6 of the claim in 100/Pdt.G/2026: the somasi’s number, date, the 14 calendar days and the end date, followed by the conclusion that the debtor is in default.' },
    ],
    sources: [SRC.putusan100, SRC.putusan216, SRC.maSomasi, SRC.hukumonlineGugatan],
  },
  {
    sectionName: 'Grounds of claim — law',
    indonesianName: 'Posita — dasar hukum (rechtsgronden)',
    purpose:
      'Connects the facts to the Civil Code articles and pleads every accessory request (interest, provisional enforcement, costs) so that the petitum has a basis.',
    standardPhrases: [
      { en: 'all agreements lawfully made bind those who made them as law', id: 'semua persetujuan yang dibuat sesuai dengan undang-undang berlaku sebagai undang-undang bagi mereka yang membuatnya', notes: 'Pasal 1338(1).' },
      { en: 'has committed default (wanprestasi)', id: 'telah melakukan wanprestasi / ingkar janji', notes: 'Legal conclusion.' },
      { en: 'declared provisionally enforceable notwithstanding appeal or cassation (uitvoerbaar bij voorraad)', id: 'dapat dilaksanakan terlebih dahulu meskipun ada upaya hukum banding atau kasasi (uitvoerbaar bij voorraad)', notes: 'Pasal 180(1) HIR; plead the ground.' },
    ],
    sampleText: `6. That under Article 1338 paragraph (1) of the Indonesian Civil Code all agreements lawfully made bind those who made them as law, so the DEFENDANT is bound to pay the price agreed in the Agreement.
7. That under Article 1238 of the Civil Code a debtor is in default when declared so by a written order or a similar deed, or by the agreement itself when the time fixed has passed; the DEFENDANT, declared in default by the somasi referred to in paragraph 5, still has not paid and has therefore committed default (wanprestasi).
8. That under Article 1243 of the Civil Code a debtor who, having been declared in default, remains in default must compensate costs, damages and interest. Clause 5.4 of the Agreement fixes late-payment interest at one per cent (1%) per month, which the PLAINTIFF claims on Rp1,250,000,000 from 1 August 2026, the day after the last due date, until payment in full.
9. That this claim rests on the Agreement and on delivery orders and invoices signed or received by the DEFENDANT and never disputed, so the PLAINTIFF requests that the judgment be declared provisionally enforceable notwithstanding appeal or cassation (uitvoerbaar bij voorraad) under Article 180 paragraph (1) HIR.
10. That because the DEFENDANT is the party in default, it is just that the DEFENDANT be ordered to pay the costs of these proceedings.`,
    templateText: `6. That under Article 1338 paragraph (1) of the Indonesian Civil Code [binding force of the Agreement].
7. That under Article 1238 of the Civil Code [default after warning / by lapse of time]; the DEFENDANT [facts] and has therefore committed default (wanprestasi).
8. That under Article 1243 of the Civil Code [damages / interest]. Clause [ ] of the Agreement [interest or penalty], which the PLAINTIFF claims on Rp[ ] from [date] until payment in full.
9. [Optional] That [ground under Article 180(1) HIR], so the PLAINTIFF requests that the judgment be declared provisionally enforceable (uitvoerbaar bij voorraad).
10. That because the DEFENDANT is the party in default, it is just that the DEFENDANT be ordered to pay the costs of these proceedings.`,
    tips: [
      'Every item in the petitum needs a paragraph in the posita. A request with no basis (interest, attachment, provisional enforcement) is simply refused.',
      'Base interest on the contract. In 100/Pdt.G/2026 PN Malang refused 6% a year claimed “under Supreme Court case law” because there was no specific agreement on interest.',
      'Do not ask for a coercive fine (dwangsom) on top of a money judgment: under MA 791 K/Sip/1972 dwangsom does not apply to an order to pay money. The plaintiff in 216/Pdt.G/2025 asked for Rp1,000,000 a day anyway.',
      'Ask for conservatory attachment (sita jaminan) only if you can show a well-founded suspicion that the defendant is hiding or moving assets, and list the assets (Pasal 227(1) HIR). Neither PN Malang claim asked for it.',
    ],
    notes: [
      { quote: 'declared in default by the somasi referred to in paragraph 5', why: 'Connects the warning (fact, para 5) to Pasal 1238 (law). 216/Pdt.G/2025 cites Pasal 1238 jo. 1243 KUHPerdata at this point.' },
      { quote: 'Clause 5.4 of the Agreement fixes late-payment interest at one per cent (1%) per month', why: 'The lesson of 100/Pdt.G/2026: interest without an agreed basis was refused. Pleading the clause gives the court something to grant. Starting from 1 August for the whole sum is conservative, since two invoices fell due earlier.' },
      { quote: 'under Article 180 paragraph (1) HIR', why: 'Pasal 180(1) HIR lets the court order enforcement despite appeal only on listed grounds (e.g. an authentic title or a document admissible as evidence). 216/Pdt.G/2025 asked for it without stating any ground; state one, or leave the request out.' },
    ],
    sources: [SRC.kuhperdata, SRC.hir, SRC.putusan100, SRC.putusan216, SRC.maDwangsom],
  },
  {
    sectionName: 'Relief sought (petitum)',
    indonesianName: 'Petitum — primair & subsidair',
    purpose:
      'The exact orders the court is asked to make. The court may not grant more than is asked (Pasal 178(3) HIR), so each request must be precise and match the posita.',
    standardPhrases: [
      { en: 'Based on the foregoing, the PLAINTIFF respectfully requests the Chief Judge of the [ ] District Court, through the Panel of Judges examining and deciding this case, to render a judgment as follows:', id: 'Berdasarkan hal-hal tersebut di atas, PENGGUGAT mohon kepada Ketua Pengadilan Negeri [ ] melalui Majelis Hakim yang memeriksa dan memutus perkara ini berkenan memutuskan:', notes: 'Formula of 100/Pdt.G/2026.' },
      { en: 'To grant the PLAINTIFF’s claim in its entirety;', id: 'Mengabulkan gugatan PENGGUGAT untuk seluruhnya;', notes: 'Always item 1.' },
      { en: 'To order the DEFENDANT to pay the costs of the proceedings.', id: 'Menghukum TERGUGAT untuk membayar biaya perkara.', notes: 'Always the last item.' },
      { en: 'a judgment that is as just as possible (ex aequo et bono)', id: 'putusan yang seadil-adilnya (ex aequo et bono)', notes: 'The subsidair request.' },
    ],
    sampleText: `## RELIEF SOUGHT
Based on the foregoing, the PLAINTIFF respectfully requests the Chief Judge of the Malang District Court, through the Panel of Judges examining and deciding this case, to render a judgment as follows:
Primary (primair):
>1. To grant the PLAINTIFF’s claim in its entirety;
>2. To declare that Supply Agreement No. 014/ABN-BKM/III/2026 dated 2 March 2026 is valid and binding on the PLAINTIFF and the DEFENDANT;
>3. To declare that the DEFENDANT has committed default (wanprestasi) against the PLAINTIFF;
>4. To order the DEFENDANT to pay the PLAINTIFF Rp1,250,000,000 (one billion two hundred and fifty million Rupiah);
>5. To order the DEFENDANT to pay the PLAINTIFF interest of one per cent (1%) per month on Rp1,250,000,000 from 1 August 2026 until payment in full;
>6. To declare that this judgment may be enforced first notwithstanding appeal or cassation (uitvoerbaar bij voorraad);
>7. To order the DEFENDANT to pay the costs of the proceedings.
Alternative (subsidair):
Should the Panel of Judges be of another opinion, the PLAINTIFF requests a judgment that is as just as possible (ex aequo et bono).`,
    templateText: `## RELIEF SOUGHT
Based on the foregoing, the PLAINTIFF respectfully requests the Chief Judge of the [ ] District Court, through the Panel of Judges examining and deciding this case, to render a judgment as follows:
Primary (primair):
>1. To grant the PLAINTIFF’s claim in its entirety;
>2. To declare that [agreement] is valid and binding on the PLAINTIFF and the DEFENDANT;
>3. To declare that the DEFENDANT has committed default (wanprestasi) against the PLAINTIFF;
>4. To order the DEFENDANT to pay the PLAINTIFF Rp[ ] ([in words] Rupiah);
>5. [To order the DEFENDANT to pay interest of [ ] per [month] on Rp[ ] from [date] until payment in full;]
>6. [To declare that this judgment may be enforced first notwithstanding appeal or cassation (uitvoerbaar bij voorraad);]
>7. To order the DEFENDANT to pay the costs of the proceedings.
Alternative (subsidair):
Should the Panel of Judges be of another opinion, the PLAINTIFF requests a judgment that is as just as possible (ex aequo et bono).`,
    tips: [
      'Write each item as the order you want the court to copy into its judgment, e.g. “Menyatakan TERGUGAT telah lalai dalam melaksanakan kewajiban pembayaran (Wanprestasi) terhadap PENGGUGAT” in the claim reproduced in 100/Pdt.G/2026.',
      'Declaratory items (“to declare…”) come before condemnatory ones (“to order… to pay”); costs come last. Both PN Malang claims follow this order.',
      'The court cannot award more than you ask (Pasal 178(3) HIR). State the principal and the interest rate, base and start date precisely.',
    ],
    notes: [
      { quote: 'through the Panel of Judges examining and deciding this case', why: '“melalui Majelis Hakim yang memeriksa dan memutus perkara ini” — the lead-in of the petitum in 100/Pdt.G/2026.' },
      { quote: 'To grant the PLAINTIFF’s claim in its entirety;', why: '“Mengabulkan gugatan PENGGUGAT untuk seluruhnya” is item 1 in both PN Malang claims. If only part is granted, the court says “sebagian”, as it did in 100/Pdt.G/2026.' },
      { quote: 'To declare that the DEFENDANT has committed default (wanprestasi) against the PLAINTIFF;', why: 'The declaration on which the money orders rest. The claim in 100/Pdt.G/2026 asks for it in almost these words (“Menyatakan TERGUGAT telah lalai … (Wanprestasi) terhadap PENGGUGAT”).' },
      { quote: 'a judgment that is as just as possible (ex aequo et bono)', why: 'The subsidair request in both claims: “mohon putusan yang seadil-adilnya (Ex Aequo Et Bono)”. It lets the court grant less, or something close to what is asked, if the primary items fail.' },
    ],
    sources: [SRC.putusan100, SRC.putusan216, SRC.hir],
  },
  {
    sectionName: 'Closing & signatures',
    indonesianName: 'Penutup & tanda tangan kuasa hukum',
    purpose: 'Closes the claim and is signed by the advocates named in the power of attorney (Pasal 118(1) and 123(1) HIR).',
    standardPhrases: [
      { en: 'Respectfully submitted,', id: 'Hormat kami,', notes: 'Formal close.' },
      { en: 'Counsel for the PLAINTIFF', id: 'Kuasa Hukum PENGGUGAT', notes: 'Capacity of the signatories.' },
    ],
    sampleText: `Respectfully submitted,
Counsel for the PLAINTIFF
/s/ Arief Nugroho
Arief Nugroho, S.H., M.H.
/s/ Laras Kinanti
Laras Kinanti, S.H.`,
    templateText: `Respectfully submitted,
Counsel for the PLAINTIFF
/s/ [Advocate 1]
[Name, titles]
/s/ [Advocate 2]
[Name, titles]`,
    tips: [
      'Only the advocates named in the special power of attorney sign. The claim is signed by the plaintiff or its representative under Pasal 123 HIR (Pasal 118(1) HIR).',
      'After filing, the court first sends the parties to mediation under Perma No. 1 of 2016, as it did in 216/Pdt.G/2025. Prepare a settlement position before the first hearing.',
      'Photocopied exhibits must bear sufficient stamp duty and be matched with the originals at the evidence hearing, as recorded in 216/Pdt.G/2025.',
    ],
    notes: [
      { quote: 'Counsel for the PLAINTIFF', why: '“Kuasa Hukum PENGGUGAT”: the signatories sign in a representative capacity, consistent with the power of attorney recited in the parties section.' },
    ],
    sources: [SRC.hir, SRC.putusan216],
  },
];

/* ======================================================================
   MODULE LIST
   ====================================================================== */
export const writingModulesList: WritingModule[] = [
  {
    id: 'module-legal-memo',
    title: 'Legal memorandum',
    subtitle: 'An objective office memo that predicts an outcome — Question Presented, Brief Answer, Facts, Discussion (CREAC), Conclusion.',
    documentType: 'Legal Memorandum',
    documentTypeId: 'Memorandum Hukum',
    purposeEn:
      'An internal, objective analysis written for a supervising lawyer: it predicts how the law applies to the client’s facts, tests the other side’s arguments and recommends next steps.',
    purposeId:
      'Analisis internal yang objektif untuk advokat senior: memprediksi penerapan hukum pada fakta klien, menguji argumen pihak lawan, dan merekomendasikan langkah berikutnya.',
    sections: memoSections,
    fullExample: buildFull(memoSections),
    modelledOn: [SRC.cunyMemo, SRC.columbiaMemo],
    sources: [SRC.cunyMemo, SRC.oregonMemo, SRC.georgetownMemo, SRC.columbiaMemo, SRC.denka, SRC.makdessi, SRC.siacRules, SRC.kuhperdata, SRC.waiver1266],
    disclaimer: 'Fictional client, parties and figures. Structure modelled on law-school sample memos.',
  },
  {
    id: 'module-legal-opinion',
    title: 'Legal opinion letter',
    subtitle: 'Indonesian counsel’s opinion to a foreign investor — Documents, Assumptions, Opinions, Qualifications, in the form filed on SEC EDGAR.',
    documentType: 'Legal Opinion',
    documentTypeId: 'Pendapat Hukum',
    purposeEn:
      'A formal letter in which Indonesian counsel confirms, as of a date and on stated assumptions, that a company exists, has authorised a transaction and is bound by its terms, so that the addressee can rely on it.',
    purposeId:
      'Surat resmi di mana konsultan hukum Indonesia menyatakan, per tanggal tertentu dan berdasarkan asumsi yang disebutkan, bahwa perseroan berdiri secara sah, telah menyetujui transaksi, dan terikat pada ketentuannya, sehingga penerima dapat mengandalkannya.',
    sections: opinionSections,
    fullExample: buildFull(opinionSections),
    modelledOn: [SRC.ssekOpinion, SRC.mmiOpinion],
    sources: [SRC.ssekOpinion, SRC.mmiOpinion, SRC.tribar, SRC.uupt, SRC.perpres10, SRC.perpres155, SRC.kuhperdata, SRC.uu24, SRC.perpres63, SRC.mk127, SRC.kbbi],
    disclaimer: 'Fictional firm, company and decree numbers. Structure modelled on SSEK’s Indonesian-law opinion filed with the SEC.',
  },
  {
    id: 'module-demand-letter',
    title: 'Demand letter (somasi)',
    subtitle: 'An advocate’s somasi for unpaid invoices in the Indonesian format — kop, Nomor, Lampiran, Perihal, kuasa, uraian, dasar hukum, tenggat, tembusan — rendered in English.',
    documentType: 'Letter of Demand',
    documentTypeId: 'Somasi',
    purposeEn:
      'The written warning (surat perintah, Pasal 1238 KUHPerdata) that declares the debtor in default, demands payment by a fixed date and states what will follow. It is later filed as evidence with the gugatan.',
    purposeId:
      'Surat advokat yang mencatat wanprestasi, menuntut pemenuhan atau pembayaran sampai tanggal tertentu, dan menyatakan langkah selanjutnya, sehingga debitur secara resmi dinyatakan lalai dan kreditur dapat membuktikannya.',
    sections: somasiSections,
    fullExample: buildFull(somasiSections),
    modelledOn: [SRC.dhpSomasi, SRC.putusan100],
    sources: [SRC.dhpSomasi, SRC.putusan100, SRC.putusan216, SRC.maSomasi, SRC.kuhperdata, SRC.hir, SRC.uupt, SRC.sghcLod],
    disclaimer: 'Fictional firm, parties and invoices. Format modelled on a somasi draft published by DHP Lawyers and the somasi pleaded in PN Malang No. 100/Pdt.G/2026; a real somasi to an Indonesian company is written in Bahasa Indonesia.',
  },
  {
    id: 'module-contract-clauses',
    title: 'Contract clauses',
    subtitle: 'Termination, liquidated damages, governing law, SIAC arbitration and language — the clauses Indonesian cross-border contracts get wrong.',
    documentType: 'Contract (excerpt)',
    documentTypeId: 'Klausul Perjanjian',
    purposeEn:
      'An excerpt from a supply agreement between an Indonesian buyer and a Singapore supplier, showing the boilerplate that decides what happens when things go wrong.',
    purposeId:
      'Kutipan perjanjian pasokan antara pembeli Indonesia dan pemasok Singapura, yang menunjukkan klausul standar yang menentukan akibat hukum ketika terjadi sengketa.',
    sections: clauseSections,
    fullExample: buildFull(clauseSections),
    modelledOn: [SRC.siacModel, SRC.edgarIdLaw],
    sources: [SRC.siacModel, SRC.siacRules, SRC.kuhperdata, SRC.waiver1266, SRC.edgarIdLaw, SRC.edgarKpay, SRC.denka, SRC.makdessi, SRC.uu24, SRC.perpres63, SRC.mk127],
    disclaimer: 'Fictional parties. Arbitration clause reproduces the SIAC model clause (Dec 2024).',
  },
  {
    id: 'module-gugatan',
    title: 'Civil claim (gugatan) in English',
    subtitle: 'A wanprestasi claim before the Malang District Court — identitas, posita, petitum primair/subsidair — modelled on two real PN Malang claims and rendered in English.',
    documentType: 'Statement of Claim',
    documentTypeId: 'Surat Gugatan',
    purposeEn:
      'The document that starts a civil case in an Indonesian district court. It must identify the parties, set out the facts and legal grounds (posita) and list the orders sought (petitum).',
    purposeId:
      'Dokumen yang memulai perkara perdata di Pengadilan Negeri. Gugatan wajib memuat identitas para pihak, dasar fakta dan dasar hukum (posita), serta tuntutan (petitum).',
    sections: gugatanSections,
    fullExample: buildFull(gugatanSections),
    modelledOn: [SRC.putusan100, SRC.putusan216],
    sources: [SRC.putusan100, SRC.putusan216, SRC.hir, SRC.kuhperdata, SRC.maSomasi, SRC.maDwangsom, SRC.uupt, SRC.hukumonlineGugatan],
    disclaimer: 'Fictional parties. Structure, headings and petitum follow the claims reproduced in PN Malang Nos. 100/Pdt.G/2026 and 216/Pdt.G/2025; a real gugatan is filed in Bahasa Indonesia.',
  },
];
