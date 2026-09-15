import { ExerciseItem } from '../../types';

export const readingQuestions: ExerciseItem[] = [
  {
    id: 'read-1',
    type: 'reading',
    category: 'reading',
    difficulty: 'Foundation',
    questionType: 'reading-comprehension',
    title: 'Reading: Parol Evidence Rule and Contra Proferentem',
    scenario: 'Read the following legal commentary on contractual interpretation rules:',
    passage: `Under the classical common law Parol Evidence Rule, where a written contract is intended by the parties to be the final and complete expression of their agreement (an integrated agreement), extrinsic evidence—such as prior oral statements, preliminary draft negotiations, or informal emails—is strictly inadmissible to contradict, alter, or add to the clear terms of the written instrument. 

However, when a specific contractual clause is genuinely ambiguous and capable of two or more plausible meanings, courts apply the interpretive canon of contra proferentem. Under this ancient doctrine, any lingering textual ambiguity is construed strictly against the party that drafted or proposed the ambiguous provision. In modern commercial contracting between sophisticated corporate entities of equal bargaining power, drafters frequently include express clauses disclaiming contra proferentem to ensure that courts do not penalize either party during dispute resolution.`,
    promptEn: 'According to the passage, when does a court apply the doctrine of "contra proferentem"?',
    promptId: 'Berdasarkan kutipan di atas, kapankah pengadilan memberlakukan doktrin penafsiran "contra proferentem"?',
    options: [
      'When a contractual clause is genuinely ambiguous, construing the meaning against the party that drafted it.',
      'Whenever extrinsic evidence shows that both parties agreed orally before signing.',
      'Only when a contract involves criminal fraud or money laundering.',
      'Automatically in every contract regardless of whether ambiguity exists.'
    ],
    correctIndex: 0,
    correctAnswer: 'When a contractual clause is genuinely ambiguous, construing the meaning against the party that drafted it.',
    explanationEn: 'The passage expressly states that contra proferentem applies when a clause is "genuinely ambiguous", directing the court to construe that ambiguity strictly against the drafting party.',
    explanationId: 'Kutipan menyatakan secara tegas bahwa doktrin contra proferentem diterapkan saat klausul kontrak benar-benar ambigu/bermakna ganda, di mana penafsiran diarahkan untuk merugikan pihak yang merancang klausul tersebut.',
    legalConcept: 'Contra Proferentem & Parol Evidence (Doktrin Contra Proferentem dan Aturan Bukti Lisan Ekstrinsik)',
    indonesianEquivalent: 'Penafsiran yang Merugikan Pihak Perancang (Contra Proferentem)',
    relatedTermId: 'contra-proferentem',
    relatedTerms: ['parol-evidence', 'ambiguity', 'construction']
  },
  {
    id: 'read-2',
    type: 'reading',
    category: 'reading',
    difficulty: 'Foundation',
    questionType: 'reading-comprehension',
    title: 'Reading: Anticipatory Repudiation of Contract',
    scenario: 'Read the following excerpt from a commercial law treatise on breach:',
    passage: `Anticipatory repudiation occurs when an obligor, prior to the scheduled performance date, unequivocally communicates by words or conduct that they will not perform their vital contractual obligations. The renunciation must be clear, absolute, and unequivocal; a mere expression of doubt, market difficulty, or request for contract renegotiation does not suffice to constitute anticipatory breach.

Upon such repudiation, the non-breaching promisee is confronted with an immediate legal election. The promisee may either: (1) accept the repudiation, treat the entire contract as immediately terminated, and sue instantly for full expectation damages without waiting for the actual performance date; or (2) reject the repudiation, hold the contract open, urge performance, and await the arrival of the contractually specified performance date to see if the repudiating party recants and performs. However, if the promisee elects to terminate, they are duty-bound to take reasonable measures to mitigate their resulting commercial losses.`,
    promptEn: 'What immediate right does the innocent promisee obtain upon an unequivocal anticipatory repudiation?',
    promptId: 'Hak seketika apakah yang diperoleh pihak yang tidak bersalah saat terjadi pembangkangan kontrak dini (anticipatory repudiation)?',
    options: [
      'The right to treat the contract as terminated and sue immediately for damages without waiting for the performance date.',
      'The obligation to pay the repudiating party a statutory cancellation fee.',
      'An automatic criminal judgment issued by the police.',
      'The requirement to wait until five years after the original contract expiry date.'
    ],
    correctIndex: 0,
    correctAnswer: 'The right to treat the contract as terminated and sue immediately for damages without waiting for the performance date.',
    explanationEn: 'The text explains that the promisee may "accept the repudiation, treat the entire contract as immediately terminated, and sue instantly for full expectation damages without waiting for the actual performance date."',
    explanationId: 'Kutipan menjelaskan bahwa pihak yang tidak bersalah berhak menganggap kontrak seketika berakhir dan langsung menuntut ganti rugi tanpa harus menunggu tanggal pelaksanaan prestasi tiba.',
    legalConcept: 'Anticipatory Repudiation (Pembangkangan Kontrak Sebelum Jatuh Tempo)',
    indonesianEquivalent: 'Pengingkaran / Pembangkangan Kewajiban Kontrak Dini (Anticipatory Breach)',
    relatedTermId: 'breach',
    relatedTerms: ['repudiation', 'mitigation', 'expectation-damages']
  },
  {
    id: 'read-3',
    type: 'reading',
    category: 'reading',
    difficulty: 'Intermediate',
    questionType: 'reading-comprehension',
    title: 'Reading: Kompetenz-Kompetenz and Clause Separability',
    scenario: 'Read the following legal text on international arbitration doctrine:',
    passage: `Two fundamental cornerstones govern modern international arbitration jurisprudence: the Doctrine of Separability and the Principle of Kompetenz-Kompetenz. 

Under the separability doctrine, an arbitration agreement contained within a broader commercial contract is treated as a separate, autonomous agreement legally distinct from the underlying "container" contract. Consequently, an allegation that the underlying commercial contract is null, void ab initio, or terminated does not automatically invalidate or extinguish the arbitration clause itself.

Working symbiotically with separability is the principle of Kompetenz-Kompetenz. This principle empowers the arbitral tribunal to rule on its own jurisdiction, including resolving any objections regarding the existence, validity, or scope of the arbitration agreement. Rather than permitting a recalcitrant party to derail arbitration by rushing to a domestic court alleging that the contract never existed, modern arbitration statutes require national courts to stay litigation and refer the jurisdictional challenge directly to the arbitral tribunal.`,
    promptEn: 'What does the "Doctrine of Separability" establish regarding an arbitration clause?',
    promptId: 'Apakah yang ditetapkan oleh "Doktrin Keterpisahan" (Doctrine of Separability) terkait klausul arbitrase?',
    options: [
      'The arbitration clause is an autonomous agreement that survives even if the underlying contract is alleged to be void.',
      'Arbitration must be separated into two trials held in two different nations.',
      'The parties are legally separated from their corporate subsidiaries.',
      'Domestic judges are permanently forbidden from reading commercial agreements.'
    ],
    correctIndex: 0,
    correctAnswer: 'The arbitration clause is an autonomous agreement that survives even if the underlying contract is alleged to be void.',
    explanationEn: 'The passage explicitly clarifies that the arbitration clause is treated as an autonomous, distinct agreement, so that the invalidity of the main container contract does not extinguish the arbitration clause.',
    explanationId: 'Doktrin keterpisahan (separability) menetapkan bahwa klausul arbitrase merupakan kesepakatan otonom tersendiri yang tetap hidup dan berlaku meskipun perjanjian pokok dipermasalahkan atau dinyatakan batal.',
    legalConcept: 'Separability of Arbitration Clause (Doktrin Keterpisahan Klausul Arbitrase)',
    indonesianEquivalent: 'Doktrin Keterpisahan Klausul Arbitrase (Separability)',
    relatedTermId: 'arbitration',
    relatedTerms: ['kompetenz-kompetenz', 'separability', 'jurisdiction']
  },
  {
    id: 'read-4',
    type: 'reading',
    category: 'reading',
    difficulty: 'Intermediate',
    questionType: 'reading-comprehension',
    title: 'Reading: R&W Insurance in Corporate Acquisitions',
    scenario: 'Read the following analysis of modern M&A deal structures:',
    passage: `In contemporary private equity acquisitions, Representations and Warranties Insurance (R&W Insurance) has fundamentally reshaped the allocation of post-closing liability. Historically, buyers insisted on large cash escrows—frequently 10% to 15% of the enterprise value held for up to 24 months—to fund potential breach of warranty claims against the seller. Sellers resisted these escrows because they locked up liquidity.

Under a buy-side R&W policy, the insurer steps into the seller's shoes as the primary indemnitor for breaches of the seller's representations and warranties. This allows the parties to execute a "clean exit" or "nil-recourse" deal, where the seller's liability is capped at a nominal sum (such as $1.00), except in cases of actual fraud. However, insurers conduct rigorous underwriting of the buyer's due diligence reports, and policies invariably exclude known issues identified in due diligence, as well as specific risks such as forward-looking statements, transfer pricing liabilities, and environmental contamination.`,
    promptEn: 'Why do corporate sellers favor "buy-side R&W insurance" in an M&A transaction?',
    promptId: 'Mengapa pihak penjual korporasi sangat menyukai struktur "R&W Insurance" dalam transaksi akuisisi?',
    options: [
      'It enables a "clean exit" without large cash escrows locking up liquidity, shifting warranty breach indemnity to the insurer.',
      'It guarantees that the company will never have to pay employee salaries.',
      'It excuses the seller from ever answering questions during due diligence.',
      'It eliminates all corporate income tax on the share sale proceeds.'
    ],
    correctIndex: 0,
    correctAnswer: 'It enables a "clean exit" without large cash escrows locking up liquidity, shifting warranty breach indemnity to the insurer.',
    explanationEn: 'The text highlights that R&W insurance allows sellers to execute a "clean exit" without tying up 10-15% of enterprise value in escrow, shifting financial indemnity to the commercial insurer.',
    explanationId: 'Teks menjelaskan bahwa asuransi R&W memungkinkan penjual melakukan "clean exit" tanpa perlu menahan 10-15% dana hasil penjualan di rekening escrow, karena risiko ganti rugi dialihkan kepada perusahaan asuransi.',
    legalConcept: 'Representations & Warranties Insurance (Asuransi Pernyataan dan Jaminan M&A)',
    indonesianEquivalent: 'Asuransi Jaminan Transaksi M&A (R&W Insurance)',
    relatedTermId: 'warranty',
    relatedTerms: ['r&w-insurance', 'escrow', 'clean-exit']
  },
  {
    id: 'read-5',
    type: 'reading',
    category: 'reading',
    difficulty: 'Foundation',
    questionType: 'reading-comprehension',
    title: 'Reading: Constructive Dismissal vs Summary Dismissal',
    scenario: 'Read the following employment law comparison:',
    passage: `In employment jurisprudence, the termination of employment may occur through unilateral employer action, mutual consent, or by constructive operation of law. 

Summary dismissal occurs when an employer discharges an employee with immediate effect without notice or payment in lieu of notice. Because it deprives the employee of notice pay, summary dismissal is legally justified only in instances of "gross misconduct"—such as theft, workplace violence, or egregious breach of confidentiality—that repudiates the fundamental employment relationship.

In stark contrast, "constructive dismissal" arises when the employer does not formally fire the employee, but instead unilaterally breaches a fundamental term of the employment contract (such as drastically cutting compensation, imposing demotion without cause, or tolerating severe workplace harassment). This breach makes continuing employment intolerable, forcing the employee to resign. In the eyes of the law, such a forced resignation is treated not as a voluntary departure, but as an unlawful dismissal entitling the employee to severance pay and wrongful termination damages.`,
    promptEn: 'How does the law treat an employee’s resignation in a case of "constructive dismissal"?',
    promptId: 'Bagaimanakah hukum memandang pengunduran diri karyawan dalam kasus "constructive dismissal"?',
    options: [
      'As an unlawful dismissal by the employer entitling the employee to wrongful termination damages and severance.',
      'As a completely voluntary departure where the employee forfeits all statutory claims.',
      'As a criminal resignation requiring the employee to pay a fine to the state.',
      'As an automatic retirement with immediate lifetime pension.'
    ],
    correctIndex: 0,
    correctAnswer: 'As an unlawful dismissal by the employer entitling the employee to wrongful termination damages and severance.',
    explanationEn: 'The passage explicitly states: "In the eyes of the law, such a forced resignation is treated not as a voluntary departure, but as an unlawful dismissal entitling the employee to severance pay and wrongful termination damages."',
    explanationId: 'Kutipan menyatakan secara tegas bahwa pengunduran diri karena kondisi yang diciptakan pemberi kerja (constructive dismissal) diperlakukan oleh hukum sebagai pemutusan hubungan kerja tidak sah/sepihak oleh majikan yang menimbulkan hak pesangon dan ganti rugi.',
    legalConcept: 'Constructive Dismissal Doctrine (Doktrin PHK Konstruktif)',
    indonesianEquivalent: 'Pemutusan Hubungan Kerja Konstruktif (Constructive Dismissal)',
    relatedTermId: 'employment',
    relatedTerms: ['summary-dismissal', 'gross-misconduct', 'severance']
  },
  {
    id: 'read-6',
    type: 'reading',
    category: 'reading',
    difficulty: 'Intermediate',
    questionType: 'reading-comprehension',
    title: 'Reading: CISG Notice Requirements for Non-Conformity',
    scenario: 'Read the following passage on the UN Convention on Contracts for the International Sale of Goods (CISG):',
    passage: `Article 38 and Article 39 of the United Nations Convention on Contracts for the International Sale of Goods (CISG) govern the buyer's obligations upon receiving goods in international commerce. Under Article 38, the buyer is required to examine the goods, or cause them to be examined, within as short a period as is practicable in the circumstances.

If the goods fail to conform to the contract specifications, Article 39(1) imposes a stringent procedural hurdle: the buyer loses the right to rely on a lack of conformity of the goods if he does not give notice to the seller specifying the nature of the lack of conformity within a reasonable time after he has discovered it or ought to have discovered it. Furthermore, Article 39(2) establishes an absolute two-year cut-off period from the date on which the goods were handed over to the buyer. If the buyer fails to provide timely, sufficiently specific notice, the buyer is completely barred from claiming remedies, including price reduction, damages, or contract avoidance.`,
    promptEn: 'Under CISG Article 39, what is the consequence if a buyer fails to notify the seller of non-conforming goods within a reasonable time?',
    promptId: 'Berdasarkan Pasal 39 CISG, apakah konsekuensi hukum jika pembeli lalai memberitahukan ketidaksesuaian barang dalam waktu yang wajar?',
    options: [
      'The buyer loses the legal right to rely on the non-conformity and is barred from remedies like damages or price reduction.',
      'The buyer automatically becomes the owner of the seller\'s shipping company.',
      'The seller must refund 100% of the price automatically.',
      'The dispute is automatically referred to the International Court of Justice in The Hague.'
    ],
    correctIndex: 0,
    correctAnswer: 'The buyer loses the legal right to rely on the non-conformity and is barred from remedies like damages or price reduction.',
    explanationEn: 'The passage explicitly states that "the buyer loses the right to rely on a lack of conformity... [and] is completely barred from claiming remedies, including price reduction, damages, or contract avoidance."',
    explanationId: 'Berdasarkan Pasal 39 CISG, pembeli yang lalai menyampaikan pemberitahuan spesifik dalam waktu wajar kehilangan hak hukum untuk mendalilkan ketidaksesuaian barang dan dilarang menuntut ganti rugi atau penurunan harga.',
    legalConcept: 'CISG Notice of Non-Conformity (Pemberitahuan Cacat Barang Berdasarkan CISG)',
    indonesianEquivalent: 'Kewajiban Pemeriksaan dan Pemberitahuan Cacat Barang (CISG)',
    relatedTermId: 'cisg',
    relatedTerms: ['non-conformity', 'examination', 'remedies']
  },
  {
    id: 'read-7',
    type: 'reading',
    category: 'reading',
    difficulty: 'Intermediate',
    questionType: 'reading-comprehension',
    title: 'Reading: Change of Control in Debt Financing',
    scenario: 'Read the following legal commentary on banking covenants:',
    passage: `In corporate finance agreements, lenders invariably incorporate a "Change of Control" clause into the credit facility covenants. This provision typically defines a change of control as occurring when any person or group acquires beneficial ownership of more than 50% of the voting shares of the borrower, or gains the power to appoint the majority of the board of directors.

The commercial justification for this clause is evident: lenders extend credit based upon creditworthiness assessments of the existing management and controlling shareholders. A change in ownership might introduce a high-risk management philosophy or aggressive debt restructuring. Upon the occurrence of an unapproved Change of Control, the clause triggers mandatory prepayment: the borrower must notify the lenders promptly, and the lenders retain the option to cancel the facility and demand immediate acceleration and repayment in full of all outstanding principal, accrued interest, and break-funding fees.`,
    promptEn: 'Why do commercial bank lenders insist on including a "Change of Control" covenant in loan agreements?',
    promptId: 'Mengapa bank kreditur komersial mensyaratkan pencantuman kovenan "Change of Control" dalam perjanjian kredit?',
    options: [
      'To protect the loan from risk profile shifts caused by new owners and management, giving the bank the right to demand full early repayment.',
      'To guarantee that bank executives receive 50% of the borrower\'s annual profits.',
      'To prevent the borrower from hiring employees of foreign nationalities.',
      'To eliminate the borrower\'s need to maintain bookkeeping records.'
    ],
    correctIndex: 0,
    correctAnswer: 'To protect the loan from risk profile shifts caused by new owners and management, giving the bank the right to demand full early repayment.',
    explanationEn: 'The text explains that lenders base credit on existing management and shareholding; a change of control protects lenders from new high-risk owners by granting the right to demand mandatory loan prepayment.',
    explanationId: 'Kovenan Change of Control melindungi kreditur dari perubahan profil risiko peminjam akibat masuknya pemilik baru, memberi hak kepada bank untuk menuntut percepatan pelunasan seluruh utang.',
    legalConcept: 'Change of Control Covenant (Kovenan Perubahan Kendali Perusahaan / Change of Control)',
    indonesianEquivalent: 'Klausul Perubahan Pengendali (Change of Control)',
    relatedTermId: 'change-of-control',
    relatedTerms: ['acceleration', 'credit-facility', 'covenants']
  },
  {
    id: 'read-8',
    type: 'reading',
    category: 'reading',
    difficulty: 'Advanced',
    questionType: 'reading-comprehension',
    title: 'Reading: Residual Knowledge Carve-Out in NDAs',
    scenario: 'Read the following contract drafting analysis on proprietary information:',
    passage: `In non-disclosure agreements negotiated between technology firms and venture capital investors, a major point of friction involves the "Residual Knowledge" (or residuals) clause. While the disclosing party seeks to protect all confidential proprietary information shared during evaluations, recipient tech firms and investors resist restrictions that would prevent their engineers or partners from working on similar technologies in the future.

A residual knowledge clause stipulates that nothing in the NDA will prevent the receiving party from utilizing "residuals"—defined as intangible ideas, concepts, know-how, and techniques retained in the unaided memories of personnel who had lawful access to the confidential data. To protect the discloser, sophisticated drafting limits this exception by explicitly barring the memorization of trade secrets, prohibiting the use of written or recorded confidential materials, and emphasizing that the residual clause does not grant any express or implied patent or copyright license.`,
    promptEn: 'What is the specific purpose of a "residual knowledge" clause in a technology NDA?',
    promptId: 'Apakah tujuan spesifik dari klausul "residual knowledge" dalam perjanjian kerahasiaan teknologi?',
    options: [
      'To permit recipient personnel to use general ideas and know-how retained in their unaided memory without breaching the NDA.',
      'To transfer patent ownership from the disclosing startup to the investor for free.',
      'To allow the recipient to copy and publish the discloser\'s source code on the internet.',
      'To cancel all intellectual property protections in the country.'
    ],
    correctIndex: 0,
    correctAnswer: 'To permit recipient personnel to use general ideas and know-how retained in their unaided memory without breaching the NDA.',
    explanationEn: 'The text explains that the residuals clause allows personnel to utilize intangible ideas, concepts, and know-how retained in their unaided memories without incurring breach liability.',
    explanationId: 'Klausul "residual knowledge" melindungi pihak penerima informasi agar karyawannya tetap dapat memanfaatkan keahlian, konsep, dan pemahaman umum yang tersisa dalam ingatan tanpa dianggap melanggar NDA.',
    legalConcept: 'Residuals Clause in Trade Secret Law (Klausul Pengetahuan yang Tersisa / Residuals)',
    indonesianEquivalent: 'Pengecualian Pengetahuan yang Tersisa dalam Ingatan (Residual Knowledge)',
    relatedTermId: 'confidentiality',
    relatedTerms: ['residuals', 'trade-secrets', 'nda']
  },
  {
    id: 'read-9',
    type: 'reading',
    category: 'reading',
    difficulty: 'Advanced',
    questionType: 'reading-comprehension',
    title: 'Reading: Sanctions and Force Majeure vs Frustration',
    scenario: 'Read the following analysis of geopolitical disruption in international trade:',
    passage: `When international economic sanctions or export embargoes are imposed by sovereign governments, commercial parties are frequently prevented from shipping contracted goods or transferring payments. Parties seeking to excuse non-performance typically invoke either the contractual Force Majeure clause or the common law Doctrine of Frustration of Purpose.

Under standard force majeure clauses, governmental acts or embargoes are often listed as qualifying events. However, the party seeking relief must prove that the sanction rendered performance legally or physically impossible, rather than merely commercially unprofitable or onerous. Mere economic hardship—such as paying triple the freight rate to reroute cargo through neutral ports—does not constitute force majeure. 

Under the common law doctrine of frustration, a contract is discharged by operation of law only if a supervening, unforeseen event fundamentally strikes at the root of the contract, rendering performance something radically different from what was undertaken. If a valid force majeure clause explicitly addresses government embargoes, courts will generally apply the contractual clause and decline to invoke frustration.`,
    promptEn: 'Under established legal doctrine, why does "mere economic hardship" fail to qualify as force majeure?',
    promptId: 'Berdasarkan doktrin hukum yang mapan, mengapa "kesulitan ekonomi semata" tidak dapat dikualifikasikan sebagai force majeure?',
    options: [
      'Because force majeure requires legal or physical impossibility, not merely an increase in expense or reduced profitability.',
      'Because economic hardships are strictly prohibited by international maritime law.',
      'Because only natural disasters like volcanoes can ever be mentioned in contracts.',
      'Because the doctrine of frustration only applies to royal family members.'
    ],
    correctIndex: 0,
    correctAnswer: 'Because force majeure requires legal or physical impossibility, not merely an increase in expense or reduced profitability.',
    explanationEn: 'The passage explicitly clarifies that the party seeking relief must prove legal or physical impossibility; mere unprofitability or increased expense (economic hardship) is insufficient.',
    explanationId: 'Kutipan menjelaskan bahwa force majeure mensyaratkan adanya ketidakmungkinan fisik atau hukum yang mutlak, bukan sekadar kenaikan biaya atau berkurangnya keuntungan (economic hardship).',
    legalConcept: 'Force Majeure vs Commercial Hardship (Keadaan Memaksa vs Kesulitan Ekonomi Komersial)',
    indonesianEquivalent: 'Batas Impossibility vs Economic Hardship dalam Force Majeure',
    relatedTermId: 'force-majeure',
    relatedTerms: ['frustration', 'impossibility', 'hardship']
  },
  {
    id: 'read-10',
    type: 'reading',
    category: 'reading',
    difficulty: 'Intermediate',
    questionType: 'reading-comprehension',
    title: 'Reading: Third-Party Indemnity Claims and Defense',
    scenario: 'Read the following contract clause commentary on indemnification procedures:',
    passage: `In commercial contracts containing indemnification provisions, the procedural mechanics governing third-party claims are as critical as the substantive indemnity itself. When a third party files a lawsuit against the indemnified party (e.g., alleging patent infringement), the indemnified party must give prompt written notice of the claim to the indemnifying party. Failure to give timely notice may relieve the indemnitor of its defense obligations to the extent that it suffered actual prejudice from the delay.

Upon receiving notice, the indemnifying party generally possesses the contractual right to assume the defense of the claim with legal counsel of its own choosing, at its sole expense. If the indemnitor assumes defense, it has control over litigation strategy. Crucially, however, standard drafting prevents the indemnitor from entering into any settlement that imposes any financial liability or admission of wrongdoing upon the indemnified party without that party’s express prior written consent.`,
    promptEn: 'When an indemnitor assumes the legal defense of a third-party claim, what settlement restriction applies?',
    promptId: 'Saat pihak pemberi ganti rugi (indemnitor) mengambil alih pembelaan perkara hukum, pembatasan perdamaian (settlement) apakah yang berlaku?',
    options: [
      'The indemnitor cannot settle the claim if the settlement imposes liability or admits wrongdoing on the indemnified party without its consent.',
      'The indemnitor must pay the judge cash before signing any settlement.',
      'All settlements must be appealed to the International Criminal Court.',
      'No settlement is ever allowed under indemnification clauses.'
    ],
    correctIndex: 0,
    correctAnswer: 'The indemnitor cannot settle the claim if the settlement imposes liability or admits wrongdoing on the indemnified party without its consent.',
    explanationEn: 'The passage expressly notes that the indemnitor cannot enter into any settlement that "imposes any financial liability or admission of wrongdoing upon the indemnified party without that party’s express prior written consent."',
    explanationId: 'Kutipan menyatakan bahwa pemberi ganti rugi dilarang membuat kesepakatan damai (settlement) yang membebankan kewajiban finansial atau pengakuan bersalah pada pihak yang diganti rugi tanpa persetujuan tertulisnya.',
    legalConcept: 'Indemnification Defense & Settlement Consent (Prosedur Pembelaan dan Batasan Perdamaian Indemnitas)',
    indonesianEquivalent: 'Ketentuan Pengambilan Alih Pembelaan dan Batasan Perdamaian',
    relatedTermId: 'indemnity',
    relatedTerms: ['settlement', 'third-party-claim', 'defense']
  },
  {
    id: 'read-11',
    type: 'reading',
    category: 'reading',
    difficulty: 'Intermediate',
    questionType: 'reading-comprehension',
    title: 'Reading: Reserved Matters in Corporate Governance',
    scenario: 'Read the following legal text on shareholders\' agreements and minority protection:',
    passage: `In joint ventures and venture-capital financed companies, minority investors protect their economic and strategic interests through the inclusion of "Reserved Matters" (also known as veto matters or negative controls). Under the default statutory corporate governance framework, ordinary board or shareholder decisions require a simple majority vote (50% + 1 share), which would leave a 25% or 30% minority shareholder vulnerable to dilution or asset stripping by the majority.

A Reserved Matters schedule elevates fundamental corporate actions to require the affirmative vote of the minority shareholder (or their board nominee), regardless of share percentage. Classic reserved matters include: amending the articles of association, issuing new shares or granting share options, incurring capital expenditures above a designated dollar threshold, entering into related-party transactions, approving annual business plans, and initiating bankruptcy or liquidation. By contractually establishing veto powers over these critical items, minority investors preserve control over existential corporate events.`,
    promptEn: 'What is the primary function of a "Reserved Matters" schedule in a shareholders\' agreement?',
    promptId: 'Apakah fungsi utama dari daftar "Reserved Matters" dalam perjanjian pemegang saham?',
    options: [
      'To provide minority shareholders with veto rights over major corporate decisions that could otherwise dilute or harm their interests.',
      'To force minority shareholders to pay double the tax of majority owners.',
      'To prevent the company from ever hiring external legal counsel.',
      'To ensure that the company goes into automatic annual liquidation.'
    ],
    correctIndex: 0,
    correctAnswer: 'To provide minority shareholders with veto rights over major corporate decisions that could otherwise dilute or harm their interests.',
    explanationEn: 'The text states that Reserved Matters elevate fundamental corporate decisions to require the affirmative consent of minority investors, protecting them against dilution and unilateral majority actions.',
    explanationId: 'Kutipan menjelaskan bahwa "Reserved Matters" memberikan hak veto kepada pemegang saham minoritas atas keputusan-keputusan korporasi fundamental guna mencegah dilusi saham atau tindakan merugikan oleh mayoritas.',
    legalConcept: 'Reserved Matters / Minority Veto (Hak Veto Pemegang Saham Minoritas / Reserved Matters)',
    indonesianEquivalent: 'Hak Veto Hal-Hal Tertentu (Reserved Matters)',
    relatedTermId: 'shareholders-agreement',
    relatedTerms: ['veto-rights', 'minority-protection', 'joint-venture']
  },
  {
    id: 'read-12',
    type: 'reading',
    category: 'reading',
    difficulty: 'Advanced',
    questionType: 'reading-comprehension',
    title: 'Reading: Financial Maintenance Ratios and Equity Cures',
    scenario: 'Read the following debt facility covenant analysis:',
    passage: `Syndicated credit agreements routinely impose financial maintenance covenants that require the borrower to satisfy objective financial health metrics tested quarterly. The most prominent ratios are the Leverage Ratio (Total Net Debt to EBITDA) and the Interest Coverage Ratio (EBITDA to Net Interest Expense). If a sudden revenue drop causes the borrower to breach its maximum leverage ratio, a financial covenant default occurs, entitling lenders to accelerate the debt.

To mitigate this existential risk, private equity sponsors negotiate an "Equity Cure" provision. An equity cure allows the financial sponsor or shareholders to inject new equity capital (cash) into the borrower within a short grace period (e.g., 10 business days following the delivery of quarterly financial statements). The injected cash is deemed to increase EBITDA or reduce debt for covenant testing purposes, retroactively curing the breach. However, credit agreements strictly regulate equity cures by capping the total number of cures allowed over the loan life and prohibiting back-to-back cures in consecutive quarters.`,
    promptEn: 'How does an "Equity Cure" mechanism prevent an immediate loan default?',
    promptId: 'Bagaimanakah mekanisme "Equity Cure" mencegah terjadinya wanprestasi pinjaman seketika?',
    options: [
      'By allowing shareholders to inject fresh cash capital to retroactively recalculate financial ratios within a grace period.',
      'By changing the official interest rate of the national central bank.',
      'By forgiving the borrower’s principal debt without any cash payment.',
      'By turning the borrower into a registered charitable non-profit foundation.'
    ],
    correctIndex: 0,
    correctAnswer: 'By allowing shareholders to inject fresh cash capital to retroactively recalculate financial ratios within a grace period.',
    explanationEn: 'The passage explains that an Equity Cure allows shareholders to inject fresh equity cash into the borrower within a grace period, which is credited to retroactively cure the ratio breach.',
    explanationId: 'Mekanisme Equity Cure memungkinkan pemegang saham menyuntikkan modal segar ke dalam kas perusahaan dalam masa tenggang untuk menghitung ulang rasio keuangan secara retroaktif sehingga wanprestasi terhindarkan.',
    legalConcept: 'Equity Cure Rights (Hak Penyuntikan Modal Pemulih Rasio Keuangan / Equity Cure)',
    indonesianEquivalent: 'Hak Penambahan Modal Pemulih Rasio Utang (Equity Cure)',
    relatedTermId: 'covenant',
    relatedTerms: ['ebitda', 'leverage-ratio', 'acceleration']
  },
  {
    id: 'read-13',
    type: 'reading',
    category: 'reading',
    difficulty: 'Advanced',
    questionType: 'reading-comprehension',
    title: 'Reading: Successor Liability and Environmental Contamination',
    scenario: 'Read the following environmental law review on asset versus share acquisitions:',
    passage: `In transactional corporate law, structuring a corporate transaction as an asset purchase is traditionally perceived as a shield against inheriting historical liabilities of the target entity. Under the general corporate rule of non-liability for asset purchasers, the acquiring entity acquires designated assets and specified assumed liabilities, leaving unassumed pre-closing liabilities with the corporate seller.

However, environmental law constitutes a dramatic exception to this shield. Under environmental statutory regimes (such as the US CERCLA / Superfund doctrine and strict liability under Indonesian Environmental Protection Law No. 32/2009), liability for hazardous substance remediation attaches strictly to the current "owner or operator" of the contaminated facility. Thus, an asset purchaser that acquires contaminated industrial real estate becomes strictly and jointly liable for historical contamination, even if the dumping occurred decades earlier under prior owners. Consequently, environmental due diligence (Phase I & II environmental site assessments) and comprehensive indemnities backed by escrows are critical in brownfield asset deals.`,
    promptEn: 'Why does an asset purchase structure fail to completely shield a buyer from environmental contamination liabilities?',
    promptId: 'Mengapa struktur pembelian aset (asset purchase) gagal melindungi pembeli sepenuhnya dari tanggung jawab pemulihan pencemaran lingkungan?',
    options: [
      'Because environmental statutory regimes attach strict liability to the current owner or operator of contaminated real estate regardless of who caused it.',
      'Because all asset sales are automatically converted into criminal cases.',
      'Because purchasers of assets are prohibited from conducting environmental audits.',
      'Because real estate deeds are non-binding under international law.'
    ],
    correctIndex: 0,
    correctAnswer: 'Because environmental statutory regimes attach strict liability to the current owner or operator of contaminated real estate regardless of who caused it.',
    explanationEn: 'The passage explains that statutory environmental regimes impose strict liability on the current "owner or operator" of contaminated land, meaning the asset buyer becomes liable for historical pollution upon acquiring title.',
    explanationId: 'Hukum lingkungan hidup menganut pertanggungjawaban mutlak yang melekat pada "pemilik atau pengelola" aset saat ini, sehingga pembeli aset tanah tercemar tetap bertanggung jawab merehabilitasi lahan meski pencemaran terjadi di masa lampau.',
    legalConcept: 'Environmental Successor Liability (Tanggung Jawab Lingkungan Hidup Pembeli Aset / Successor Liability)',
    indonesianEquivalent: 'Tanggung Jawab Hukum Lingkungan atas Aset Tercemar',
    relatedTermId: 'liability',
    relatedTerms: ['strict-liability', 'environmental-law', 'due-diligence']
  },
  {
    id: 'read-14',
    type: 'reading',
    category: 'reading',
    difficulty: 'Foundation',
    questionType: 'reading-comprehension',
    title: 'Reading: Work-Made-For-Hire vs Express IP Assignment',
    scenario: 'Read the following intellectual property guide for technology companies:',
    passage: `A pervasive misconception in startup companies is that paying an independent software developer or freelance contractor automatically vests copyright ownership in the paying company. Under copyright jurisprudence, the author of a work is the initial owner of the copyright.

While the "Work-Made-For-Hire" doctrine automatically vests copyright in an employer for works created by regular employees within the scope of their employment, it applies to independent contractors only in very narrow statutory categories and only if supported by an express written agreement. For general custom software or logo development by outside contractors, the work does not qualify as work-for-hire. 

Therefore, absent a clear, written "present assignment" containing operative conveyance language ("hereby assigns, transfers, and conveys all right, title, and interest"), the independent contractor retains legal copyright ownership, and the hiring company receives merely an implied non-exclusive license. To ensure absolute IP ownership, companies must execute comprehensive IP Assignment Agreements before work commences.`,
    promptEn: 'What happens to copyright ownership if a company pays an independent contractor without executing an express written IP assignment?',
    promptId: 'Apakah yang terjadi pada hak cipta jika sebuah perusahaan membayar konsultan/kontraktor lepas tanpa perjanjian pengalihan HKI tertulis?',
    options: [
      'The independent contractor retains copyright ownership, and the paying company receives only an implied non-exclusive license.',
      'The software automatically becomes public domain property.',
      'The company becomes the global copyright owner automatically upon paying the invoice.',
      'The copyright is transferred directly to the government patent office.'
    ],
    correctIndex: 0,
    correctAnswer: 'The independent contractor retains copyright ownership, and the paying company receives only an implied non-exclusive license.',
    explanationEn: 'The text clearly states that without an express written assignment, "the independent contractor retains legal copyright ownership, and the hiring company receives merely an implied non-exclusive license."',
    explanationId: 'Kutipan menjelaskan bahwa tanpa perjanjian pengalihan tertulis yang tegas, hak cipta tetap dimiliki oleh konsultan/kontraktor independen yang membuatnya, dan perusahaan yang membayar hanya memperoleh lisensi non-eksklusif secara tersirat.',
    legalConcept: 'IP Assignment vs Work-Made-for-Hire (Pengalihan HKI vs Doktrin Karya Cipta Karyawan)',
    indonesianEquivalent: 'Pengalihan Hak Kekayaan Intelektual (IP Assignment)',
    relatedTermId: 'assignment',
    relatedTerms: ['work-for-hire', 'copyright', 'conveyance']
  },
  {
    id: 'read-15',
    type: 'reading',
    category: 'reading',
    difficulty: 'Advanced',
    questionType: 'reading-comprehension',
    title: 'Reading: Article V Public Policy Exception in the New York Convention',
    scenario: 'Read the following international arbitration excerpt on cross-border enforcement:',
    passage: `The 1958 New York Convention on the Recognition and Enforcement of Foreign Arbitral Awards provides a pro-enforcement framework across 170+ member states. Under Article V of the Convention, domestic courts are required to recognize and enforce foreign arbitral awards unless the resisting party proves one of the narrow, exhaustive grounds for refusal.

Among these grounds, Article V(2)(b) permits a national court to refuse enforcement on its own motion if it finds that recognition or enforcement of the award would be contrary to the "public policy" (ketertiban umum) of that country. International arbitration jurisprudence establishes that the public policy defense must be construed narrowly: it applies only where enforcement would violate the forum state’s most basic, fundamental notions of morality and justice, such as awards involving bribery, corruption, or violations of human rights. It is not an invitation for domestic judges to review the substantive legal merits or factual correctness of the arbitral award.`,
    promptEn: 'How should national courts interpret the "public policy" defense under Article V(2)(b) of the New York Convention?',
    promptId: 'Bagaimanakah pengadilan nasional seharusnya menafsirkan eksepsi "ketertiban umum" (public policy) berdasarkan Pasal V(2)(b) Konvensi New York 1958?',
    options: [
      'Narrowly, applying only to violations of fundamental justice and morality (e.g., corruption), and never as an excuse to re-examine the substantive merits.',
      'Broadly, allowing judges to overturn any award if they disagree with the arbitrator\'s legal reasoning.',
      'As an automatic requirement to refuse any foreign award involving more than $1,000,000.',
      'As a criminal statute designed to punish foreign arbitral institutions.'
    ],
    correctIndex: 0,
    correctAnswer: 'Narrowly, applying only to violations of fundamental justice and morality (e.g., corruption), and never as an excuse to re-examine the substantive merits.',
    explanationEn: 'The passage explicitly states that the public policy defense must be construed narrowly—applying only to basic notions of morality and justice (like bribery), and never as an invitation to review the legal or factual merits of the award.',
    explanationId: 'Teks menjelaskan bahwa alasan penolakan ketertiban umum (public policy) harus ditafsirkan secara sempit dan restriktif, hanya untuk pelanggaran asas keadilan fundamental (seperti suap), bukan sebagai dalih pengadilan untuk memeriksa ulang pokok perkara.',
    legalConcept: 'Public Policy Exception in International Arbitration (Eksepsi Ketertiban Umum Konvensi New York 1958)',
    indonesianEquivalent: 'Pengecualian Ketertiban Umum Eksekusi Putusan Arbitrase Asing',
    relatedTermId: 'arbitration',
    relatedTerms: ['new-york-convention', 'public-policy', 'enforcement']
  }
];
