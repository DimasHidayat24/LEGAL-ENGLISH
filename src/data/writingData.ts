import { WritingModule } from '../types';

export const writingModulesList: WritingModule[] = [
  {
    id: 'module-legal-memo',
    title: 'How to Draft an Internal Legal Memorandum',
    subtitle: 'The gold-standard IRAC format used by top corporate law firms and judicial clerks.',
    documentType: 'Legal Memorandum',
    purposeEn: 'An objective internal document analyzing legal issues, evaluating risks, and advising supervising partners on case strategy.',
    purposeId: 'Dokumen analisis internal yang objektif untuk membedah masalah hukum, mengevaluasi risiko, dan memberi masukan yuridis kepada senior partner.',
    sections: [
      {
        sectionName: 'HEADER (Caption)',
        indonesianName: 'Kepala Memorandum',
        purpose: 'Identifies the recipient, author, date, and client/matter reference.',
        standardPhrases: [
          { en: 'MEMORANDUM', id: 'MEMORANDUM', notes: 'Top title' },
          { en: 'TO: Managing Partner', id: 'KEPADA: Managing Partner', notes: 'Recipient' },
          { en: 'FROM: Associate Counsel', id: 'DARI: Associate Counsel', notes: 'Author' },
          { en: 'DATE: October 24, 2024', id: 'TANGGAL: 24 Oktober 2024', notes: 'Date of dispatch' },
          { en: 'RE: PT Nusantara Supply Agreement – Right of Early Termination', id: 'PERIHAL: Perjanjian Pasokan PT Nusantara – Hak Pengakhiran Dini', notes: 'Subject Matter' }
        ],
        sampleText: 'MEMORANDUM\nTO: Senior Partner, Dispute Resolution Practice Group\nFROM: Junior Associate\nDATE: 24 October 2024\nRE: PT Nusantara Offshore Logistics – Evaluation of Material Breach and Liquidated Damages Claim',
        tips: ['Always state the specific client and matter code.', 'Keep the RE line concise and descriptive.']
      },
      {
        sectionName: 'QUESTION PRESENTED (Issue)',
        indonesianName: 'Pokok Permasalahan Hukum',
        purpose: 'Frames the core legal question combining rule and specific facts.',
        standardPhrases: [
          { en: 'Whether [Party A] has a lawful right to [action] under [Law/Contract] where [Facts]?', id: 'Apakah [Pihak A] memiliki hak sah untuk [tindakan] berdasarkan [Hukum/Kontrak] dalam hal [Fakta]?', notes: 'Standard framing formula' },
          { en: 'The threshold issue is whether...', id: 'Pokok masalah utamanya adalah apakah...', notes: 'Introductory phrase' }
        ],
        sampleText: 'QUESTION PRESENTED:\nWhether PT Nusantara has the legal right to terminate the Master Services Agreement under Clause 14.2 without a prior 30-day cure notice, where the Contractor intentionally abandoned vessel maintenance for forty-five (45) consecutive days?',
        tips: ['Frame the issue so it can be answered with a yes/no and brief explanation.', 'Include key facts that determine the outcome.']
      },
      {
        sectionName: 'BRIEF ANSWER (Short Answer)',
        indonesianName: 'Jawaban Ringkas',
        purpose: 'Gives the direct answer and summary reasoning in 2-4 sentences.',
        standardPhrases: [
          { en: 'Yes. Under Clause 14.2, intentional abandonment constitutes an incurable repudiatory breach...', id: 'Ya. Berdasarkan Klausul 14.2, pengabaian yang disengaja merupakan wanprestasi repudiatoir...', notes: 'Direct affirmative' },
          { en: 'Likely yes, provided that...', id: 'Kemungkinan besar ya, dengan ketentuan bahwa...', notes: 'Qualified answer' }
        ],
        sampleText: 'BRIEF ANSWER:\nYes. Under Clause 14.2(b), intentional cessation of services exceeding thirty days constitutes an immediate Event of Default. Because the breach is incurable in nature, PT Nusantara is entitled to deliver an immediate notice of termination without observing the standard 30-day cure period, and may initiate an action for liquidated damages.',
        tips: ['State "Yes", "No", or "Likely yes/no" as the very first word.', 'Provide the core legal rationale immediately.']
      },
      {
        sectionName: 'STATEMENT OF FACTS',
        indonesianName: 'Kronologi Fakta Relevan',
        purpose: 'Provides a chronological, objective narrative of all legally relevant facts.',
        standardPhrases: [
          { en: 'On or about [Date], the Parties entered into...', id: 'Pada atau sekitar [Tanggal], Para Pihak menandatangani...', notes: 'Chronological anchor' },
          { en: 'Pursuant to Section 3 of the Agreement, the Contractor was obligated to...', id: 'Berdasarkan Pasal 3 Perjanjian, Kontraktor berkewajiban untuk...', notes: 'Obligation narrative' }
        ],
        sampleText: 'STATEMENT OF FACTS:\nOn 15 January 2024, PT Nusantara ("Client") and Maritime Solutions Pte Ltd ("Contractor") executed a five-year Master Logistics Agreement. Under Section 4.1, Contractor was obligated to maintain two tugboats in continuous readiness at Merak Port. On 1 September 2024, Contractor unilaterally withdrew all crew and demobilized the tugboats to accept a spot charter in Malaysia. Despite three written inquiries from Client, Contractor has performed zero services for 45 days.',
        tips: ['Maintain strict objectivity — do not omit unfavorable facts.', 'Organize chronologically with precise dates.']
      },
      {
        sectionName: 'DISCUSSION / ANALYSIS (IRAC)',
        indonesianName: 'Analisis Yuridis & Penerapan Kaidah',
        purpose: 'Deconstructs the law and applies each element to the case facts.',
        standardPhrases: [
          { en: 'Under governing law, a material breach occurs when...', id: 'Berdasarkan hukum yang berlaku, wanprestasi material terjadi ketika...', notes: 'Rule articulation' },
          { en: 'Applying this rule to the present facts, ...', id: 'Menerapkan kaidah ini terhadap fakta yang ada, ...', notes: 'Analysis transition' },
          { en: 'The counterparty may argue that... However, this argument fails because...', id: 'Pihak lawan mungkin berargumen bahwa... Namun, dalil ini gugur karena...', notes: 'Counter-argument refutation' }
        ],
        sampleText: 'DISCUSSION:\nI. Clause 14.2(b) Authorizes Immediate Termination for Incurable Default\nUnder the governing law of the contract, contractual cure periods apply exclusively to breaches capable of remedy. In the present case, forty-five days of lost vessel readiness cannot be cured retroactively. Therefore, the failure constitutes a repudiatory breach under common law principles and Section 14.2(b).\n\nII. Calculation of Delay Damages\nClause 16.1 stipulates liquidated damages at USD 5,000 per day. Because this rate reflects a genuine pre-estimate of dock rental loss, it is enforceable as valid liquidated damages and is not an unenforceable penalty clause.',
        tips: ['Use clear sub-headings for each distinct legal issue.', 'Address and dismantle potential opposing arguments.']
      },
      {
        sectionName: 'CONCLUSION & RECOMMENDATIONS',
        indonesianName: 'Kesimpulan & Rekomendasi Langkah',
        purpose: 'Provides actionable next steps for the client.',
        standardPhrases: [
          { en: 'In conclusion, we recommend that Client issue a formal Notice of Termination...', id: 'Sebagai kesimpulan, kami menyarankan agar Klien menerbitkan Surat Pemutusan Resmi...', notes: 'Action recommendation' },
          { en: 'Simultaneously, counsel should file an application for...', id: 'Secara bersamaan, penasihat hukum harus mengajukan permohonan...', notes: 'Procedural step' }
        ],
        sampleText: 'CONCLUSION:\nPT Nusantara holds strong legal grounds to terminate the Agreement immediately and demand USD 225,000 in accrued delay liquidated damages. We recommend issuing a formal Default and Termination Notice pursuant to Clause 18 (Notices), demanding payment within fourteen (14) business days, failing which arbitration proceedings under SIAC Rules should be commenced.',
        tips: ['List concrete, numbered action items.', 'Highlight deadlines and notice mechanisms.']
      }
    ],
    fullExample: `MEMORANDUM
TO: Senior Partner, Dispute Resolution Practice Group
FROM: Junior Associate Counsel
DATE: 24 October 2024
RE: PT Nusantara Supply Agreement – Right of Immediate Termination

QUESTION PRESENTED:
Whether PT Nusantara is entitled under Clause 14.2 of the Master Agreement to terminate immediately and claim liquidated damages without issuing a 30-day cure notice, where the Contractor unilaterally abandoned performance?

BRIEF ANSWER:
Yes. Under Clause 14.2(b), deliberate cessation of operations constitutes an incurable Event of Default. PT Nusantara is entitled to terminate with immediate effect and demand USD 225,000 in liquidated damages.

STATEMENT OF FACTS:
On 15 January 2024, the Parties executed a five-year Master Logistics Agreement. Under Clause 4.1, Contractor agreed to maintain two tugboats continuously at Merak Port. On 1 September 2024, Contractor demobilized the vessels. Contractor has performed zero services for forty-five (45) consecutive days.

DISCUSSION:
1. Ground for Immediate Termination: Contractual cure periods apply only to curable defaults. The 45-day complete operational void is an incurable repudiatory breach.
2. Liquidated Damages Enforceability: Clause 16 provides for USD 5,000/day liquidated damages. This represents a genuine pre-estimate of lost berth revenue and is fully enforceable.

CONCLUSION & RECOMMENDATIONS:
1. Dispatch formal Termination Notice pursuant to Clause 18.
2. Demand payment of USD 225,000 within 14 calendar days.
3. Prepare SIAC Notice of Arbitration if settlement is not reached.`
  },
  {
    id: 'module-legal-opinion',
    title: 'How to Write a Formal Legal Opinion Letter',
    subtitle: 'Advising international investors on Indonesian regulatory compliance and validity of contracts.',
    documentType: 'Legal Opinion',
    purposeEn: 'A formal written advice letter from independent legal counsel confirming the validity, enforceability, and regulatory compliance of a corporate transaction.',
    purposeId: 'Surat pendapat hukum resmi dari kantor konsultan hukum independen yang menegaskan keabsahan, keberlakuan, dan kepatuhan transaksi korporasi terhadap hukum positif.',
    sections: [
      {
        sectionName: 'INTRODUCTION & SCOPE OF INQUIRY',
        indonesianName: 'Pendahuluan & Ruang Lingkup',
        purpose: 'Defines the counsel’s role, the client, and the specific documents examined.',
        standardPhrases: [
          { en: 'We have acted as special Indonesian legal counsel to [Client]...', id: 'Kami telah bertindak sebagai penasihat hukum khusus Indonesia untuk [Klien]...', notes: 'Role definition' },
          { en: 'For the purposes of rendering this opinion, we have examined the following documents...', id: 'Untuk tujuan pemberian pendapat hukum ini, kami telah memeriksa dokumen-dokumen berikut...', notes: 'Document schedule' }
        ],
        sampleText: 'We have acted as special Indonesian legal counsel to Global Infrastructure Fund LP in connection with the subscription of shares in PT Nusantara Energi Terbarukan. In rendering this opinion, we have examined executed copies of the Share Subscription Agreement, Company Articles of Association, and Ministry of Law and Human Rights Approvals.',
        tips: ['Explicitly list every document reviewed in an attached schedule.']
      },
      {
        sectionName: 'ASSUMPTIONS & QUALIFICATIONS',
        indonesianName: 'Asumsi & Kualifikasi Yuridis',
        purpose: 'Protects the law firm from liability by stating factual premises and legal reservations.',
        standardPhrases: [
          { en: 'We have assumed the genuineness of all signatures and the authenticity of all documents submitted to us as originals.', id: 'Kami mengasumsikan keaslian seluruh tanda tangan dan keotentikan seluruh dokumen yang diserahkan kepada kami.', notes: 'Standard assumption' },
          { en: 'Our opinion is qualified by applicable bankruptcy, insolvency, and moratorium laws.', id: 'Pendapat hukum kami dibatasi oleh undang-undang kepailitan, penundaan kewajiban pembayaran utang, dan insolvensi yang berlaku.', notes: 'Standard reservation' }
        ],
        sampleText: 'ASSUMPTIONS: We have assumed that all copy documents conform to original authentic records, and that all corporate resolutions were adopted at duly convened meetings.\nQUALIFICATIONS: The enforceability of the Agreement is subject to general principles of good faith (Pasal 1338 ayat 3 KUHPerdata) and the discretion of Indonesian courts.',
        tips: ['Always state that opinion is limited exclusively to Indonesian positive law as of the date of the letter.']
      },
      {
        sectionName: 'OPERATIVE OPINION STATEMENTS',
        indonesianName: 'Pernyataan Pendapat Hukum Utama',
        purpose: 'The core numbered findings of law.',
        standardPhrases: [
          { en: 'Based upon and subject to the foregoing, we are of the opinion that: ...', id: 'Berdasarkan dan dengan tunduk pada hal-hal di atas, kami berpendapat bahwa: ...', notes: 'Lead-in formula' },
          { en: 'The Company is a limited liability company duly incorporated and validly existing under the laws of the Republic of Indonesia.', id: 'Perseroan adalah perseroan terbatas yang didirikan secara sah dan berstatus aktif menurut hukum Negara Republik Indonesia.', notes: 'Corporate existence' },
          { en: 'The Agreement constitutes a legal, valid, and binding obligation enforceable against the Company.', id: 'Perjanjian tersebut merupakan kewajiban hukum yang sah, mengikat, dan dapat dipaksakan terhadap Perseroan.', notes: 'Binding enforceability' }
        ],
        sampleText: 'OPINION:\n1. The Company is duly incorporated and validly existing under Indonesian Law.\n2. The execution and delivery of the Agreement have been duly authorized by all requisite corporate action on the part of the Company.\n3. The Agreement creates valid, binding, and enforceable obligations under Indonesian Law.',
        tips: ['Use precise, affirmative language without ambiguity.']
      }
    ],
    fullExample: `HADIPUTRO & REKAN LAW CHAMBERS
Sudirman Central Business District, Jakarta 12190

24 October 2024

To: The Board of Directors
Global Infrastructure Fund LP
100 Bishopgate, London EC2N 4AG

Re: Legal Opinion – PT Nusantara Energi Terbarukan Series A Subscription

Dear Sirs,

We have acted as Indonesian legal counsel to Global Infrastructure Fund LP in connection with the USD 25,000,000 Series A Preferred Share Subscription in PT Nusantara Energi Terbarukan (the "Company").

1. SCOPE OF INQUIRY: We have examined the Share Subscription Agreement, Company Articles of Association, and Ministry of Law & Human Rights (Kemenkumham) Approval AHU-0019283.AH.01.02.Year 2023.

2. ASSUMPTIONS: We have assumed the authenticity of all original documents and that all signatories had full legal capacity.

3. OPINION: Subject to the qualifications set forth herein, we are of the opinion that:
   (a) The Company is a Perseroan Terbatas duly incorporated and validly existing under the laws of the Republic of Indonesia.
   (b) The execution of the Subscription Agreement does not violate Indonesian Company Law or the Foreign Investment Negative/Positive List (Perpres 10/2021).
   (c) The Subscription Agreement constitutes a legal, valid, and binding obligation enforceable in accordance with its terms.

Yours faithfully,
HADIPUTRO & REKAN`
  },
  {
    id: 'module-demand-letter',
    title: 'How to Write a Formal Pre-Litigation Demand Letter (Somasi in English)',
    subtitle: 'Drafting an enforceable English default notice and settlement demand.',
    documentType: 'Formal Notice',
    purposeEn: 'A formal letter putting a defaulting counterparty on notice of breach, demanding cure within a strict deadline, and reserving all litigation rights.',
    purposeId: 'Surat peringatan resmi (Somasi) yang memberitahukan terjadinya wanprestasi, menuntut pemenuhan kewajiban dalam tenggang waktu tertentu, dan mencadangkan seluruh hak gugatan hukum.',
    sections: [
      {
        sectionName: 'FORMAL NOTICE HEADER',
        indonesianName: 'Judul Surat Somasi',
        purpose: 'Provides formal notice classification and delivery tracking.',
        standardPhrases: [
          { en: 'STRICTLY PRIVATE & CONFIDENTIAL / WITHOUT PREJUDICE', id: 'SANGAT RAHASIA / TANPA MENGURANGI HAK', notes: 'Confidentiality banner' },
          { en: 'FORMAL NOTICE OF DEFAULT AND DEMAND FOR CURE', id: 'SURAT PERINGATAN RESMI WANPRESTASI DAN TUNTUTAN PEMENUHAN', notes: 'Title header' }
        ],
        sampleText: 'VIA REGISTERED COURIER & EMAIL\nSTRICTLY PRIVATE & CONFIDENTIAL\n\nDate: 24 October 2024\n\nTo: PT Pacific Logam Mulia\nAttn: Board of Directors\nWisma Mulia 28th Floor, Jakarta',
        tips: ['Always state the exact delivery mode (courier + email).']
      },
      {
        sectionName: 'THE BREACH STATEMENT',
        indonesianName: 'Pernyataan Fakta Wanprestasi',
        purpose: 'Cites the exact contract clause and describes the defaulting party’s failure.',
        standardPhrases: [
          { en: 'We write on behalf of our client, [Client Name], in reference to...', id: 'Kami menulis atas nama klien kami, [Nama Klien], merujuk pada...', notes: 'Representation opening' },
          { en: 'Pursuant to Clause 5.1 of the Agreement, you were required to...', id: 'Berdasarkan Klausul 5.1 Perjanjian, Anda diwajibkan untuk...', notes: 'Clause citation' },
          { en: 'To date, you have failed, neglected, or refused to perform said obligation.', id: 'Hingga saat ini, Anda telah gagal, lalai, atau menolak melaksanakan kewajiban tersebut.', notes: 'Default assertion' }
        ],
        sampleText: 'We represent Apex Machinery Pte Ltd ("Apex"). Pursuant to Clause 4.2 of the Purchase Agreement dated 1 June 2024, your company was required to remit the outstanding invoice of USD 450,000 on or before 1 September 2024. Despite our client’s reminders on 10 September and 1 October, you have failed, neglected, and refused to pay the outstanding balance.',
        tips: ['Be precise with dates, invoice numbers, and monetary figures.']
      },
      {
        sectionName: 'DEMAND & RESERVATION OF RIGHTS',
        indonesianName: 'Tuntutan Batas Waktu & Pencadangan Hak',
        purpose: 'Imposes a strict deadline (e.g. 7 or 14 days) and warns of immediate legal proceedings.',
        standardPhrases: [
          { en: 'TAKE NOTICE that we hereby demand that you pay the sum of [Amount] within seven (7) business days...', id: 'DENGAN INI DIPERINGATKAN bahwa kami menuntut Anda untuk membayar sejumlah [Jumlah] dalam waktu tujuh (7) hari kerja...', notes: 'Formal demand' },
          { en: 'Our client expressly reserves all rights and remedies, including the right to claim accrued interest and legal costs.', id: 'Klien kami secara tegas mencadangkan seluruh hak dan pemulihan hukum, termasuk hak menuntut bunga dan biaya penasihat hukum.', notes: 'Reservation clause' }
        ],
        sampleText: 'TAKE NOTICE that Apex hereby demands payment of the full sum of USD 450,000, together with accrued contractual interest at 8% per annum, within seven (7) business days of this letter, failing which our client will immediately commence SIAC arbitration without further notice. All rights and remedies are strictly reserved.',
        tips: ['Specify a precise deadline date and time.', 'Always include the full reservation of rights boilerplate.']
      }
    ],
    fullExample: `LAW OFFICES OF TAN & PARTNERS
One Raffles Place, Singapore 048616

VIA REGISTERED POST & EMAIL
24 October 2024

To:
The Board of Directors
PT Pacific Logam Mulia
Wisma Mulia, Jl. Gatot Subroto Kav. 42
Jakarta Selatan 12710, Indonesia

FORMAL NOTICE OF MATERIAL BREACH AND FINAL DEMAND FOR PAYMENT

Dear Sirs,

We act as legal counsel to Apex Machinery Pte Ltd ("Apex").

1. BACKGROUND & DEFAULT:
Under the Equipment Sales Contract dated 1 June 2024, our client delivered two industrial generators to your facility on 15 July 2024. Pursuant to Clause 4.2, payment of Invoice #APX-9921 in the amount of USD 450,000 was due on 1 September 2024. To date, you have failed and neglected to remit said sum.

2. FORMAL DEMAND:
TAKE NOTICE that our client hereby formally demands that you remit the full outstanding amount of USD 450,000, plus accrued interest, to our client's designated bank account within seven (7) business days from the date of this letter, namely on or before 4 November 2024.

3. COMMENCEMENT OF ARBITRATION:
Should you fail to comply with this final demand, our client has instructed us to immediately file a Notice of Arbitration with the Singapore International Arbitration Centre (SIAC) pursuant to Clause 19 of the Contract, claiming the principal debt, damages, pre-award interest, and full legal costs.

This letter is written with full reservation of all our client’s rights and remedies.

Yours faithfully,
TAN & PARTNERS`
  }
];
