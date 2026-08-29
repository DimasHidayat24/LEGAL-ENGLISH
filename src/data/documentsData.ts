import { LegalDocument } from '../types';

export const sampleLegalDocuments: LegalDocument[] = [
  {
    id: 'doc-cross-border-sales',
    title: 'International Sale of Goods & Supply Agreement',
    documentType: 'Contract',
    jurisdiction: 'Singapore / International (CISG)',
    governingLaw: 'Singapore Law & CISG',
    difficulty: 'Intermediate',
    readingTimeMinutes: 18,
    keyTermIds: ['whereas', 'hereby', 'shall', 'pursuant-to', 'breach', 'indemnity', 'notwithstanding', 'force-majeure', 'liquidated-damages'],
    abstractEn: 'A master cross-border commercial sales agreement governing high-value industrial machinery supply, delivery warranties, delay liquidated damages, and third-party indemnity.',
    abstractId: 'Perjanjian pasokan dan jual beli barang komersial lintas batas yang mengatur penyerahan mesin industri bernilai tinggi, garansi mutu, ganti rugi denda keterlambatan, dan klausul pembebasan ganti rugi pihak ketiga.',
    parties: ['Apex Global Manufacturing Pte. Ltd. (Seller)', 'PT Nusantara Industri Sejahtera (Buyer)'],
    downloadableFilename: 'International_Sale_of_Goods_Agreement_Apex_Nusantara.pdf',
    paragraphs: [
      {
        id: 'p-1',
        paragraphNumber: 'PREAMBLE',
        text: 'THIS INTERNATIONAL SALE OF GOODS AGREEMENT (this "Agreement") is entered into on this 15th day of October, 2024, by and between Apex Global Manufacturing Pte. Ltd., a company organized under the laws of Singapore ("Seller"), and PT Nusantara Industri Sejahtera, a limited liability company incorporated under the laws of the Republic of Indonesia ("Buyer").',
        highlightedTermIds: [],
        indonesianSummary: 'Pembukaan perjanjian (Preamble) yang mengidentifikasi para pihak dan tanggal efektif penandatanganan.'
      },
      {
        id: 'p-2',
        paragraphNumber: 'RECITALS',
        text: 'WHEREAS, the Seller is engaged in the engineering, fabrication, and export of specialized turbine assembly units; and WHEREAS, the Buyer desires to purchase such machinery pursuant to the technical specifications set forth in Schedule A hereto, and the Seller agrees to supply the same subject to the terms and conditions herein contained;',
        highlightedTermIds: ['whereas', 'pursuant-to', 'thereto'],
        indonesianSummary: 'Konsiderans / Premis yang menjelaskan latar belakang transaksi sebelum klausul operatif dimulai.'
      },
      {
        id: 'p-3',
        paragraphNumber: 'OPERATIVE CLAUSE 1.1',
        text: 'NOW, THEREFORE, in consideration of the mutual covenants, premises, and promises herein contained, the Parties hereby agree as follows: The Seller shall manufacture, pack, and sell, and the Buyer shall purchase and accept delivery of the equipment, subject to the inspection protocols set forth therein.',
        highlightedTermIds: ['consideration', 'covenant', 'hereby', 'shall', 'subject-to', 'therein'],
        indonesianSummary: 'Klausul operatif penegasan kesepakatan jual beli dengan pertukaran nilai dan kewajiban mengikat (shall).'
      },
      {
        id: 'p-4',
        paragraphNumber: 'DELIVERY & DELAY CLAUSE 4.2',
        text: 'The Seller shall deliver the Goods DAP (Incoterms 2020) to the Port of Tanjung Priok no later than March 31, 2025. If the Seller fails to deliver the Goods by the scheduled delivery date, the Seller shall pay Liquidated Damages at the rate of zero point five percent (0.5%) of the total invoice value per week of delay, provided that such liquidated damages shall not exceed eight percent (8%) of the total contract price in the aggregate.',
        highlightedTermIds: ['shall', 'liquidated-damages', 'provided-that'],
        indonesianSummary: 'Ketentuan penyerahan barang dan perhitungan ganti rugi yang telah ditentukan (liquidated damages) dengan batas maksimal.'
      },
      {
        id: 'p-5',
        paragraphNumber: 'WARRANTY & DEFECTS CLAUSE 7.1',
        text: 'The Seller warrants that for a period of twenty-four (24) months from commissioning, the Goods shall be free from material defects in design, material, and workmanship. The Seller’s sole liability under this warranty shall be to repair or replace any defective components thereof at its own cost.',
        highlightedTermIds: ['warranty', 'shall', 'liability', 'thereof'],
        indonesianSummary: 'Jaminan garansi cacat tersembunyi selama 24 bulan dan batasan pertanggungjawaban perbaikan.'
      },
      {
        id: 'p-6',
        paragraphNumber: 'INDEMNITY CLAUSE 11.1',
        text: 'The Seller shall defend, indemnify, and hold harmless the Buyer, its directors, officers, and employees against any third-party claims, liabilities, damages, and legal costs arising out of any actual or alleged infringement of intellectual property rights associated with the Goods.',
        highlightedTermIds: ['shall', 'indemnity', 'hold-harmless', 'liability', 'damages'],
        indonesianSummary: 'Klausul ganti rugi khusus (indemnity) untuk melindungi pembeli dari klaim sengketa hak kekayaan intelektual.'
      },
      {
        id: 'p-7',
        paragraphNumber: 'LIMITATION OF LIABILITY 12.1',
        text: 'Notwithstanding anything to the contrary in this Agreement, in no event shall either party be liable to the other for any loss of profit, loss of business, or consequential damages. The total aggregate liability of the Seller arising under or in connection with this Agreement shall be limited to one hundred percent (100%) of the Contract Price.',
        highlightedTermIds: ['notwithstanding', 'liability', 'damages'],
        indonesianSummary: 'Klausul pembatasan tanggung jawab tertinggi (liability cap) dan pengesampingan kerugian konsekuensial.'
      },
      {
        id: 'p-8',
        paragraphNumber: 'FORCE MAJEURE CLAUSE 15.1',
        text: 'Neither Party shall be in breach of this Agreement nor liable for delay in performing, or failure to perform, any of its obligations hereunder if such delay or failure results from an event of Force Majeure, including acts of God, flood, armed conflict, trade embargoes, or government expropriation.',
        highlightedTermIds: ['breach', 'liability', 'force-majeure'],
        indonesianSummary: 'Klausul keadaan kahar yang membebaskan pihak dari wanprestasi jika terjadi peristiwa tak terduga di luar kendali wajar.'
      }
    ]
  },
  {
    id: 'doc-nda-bilateral',
    title: 'Bilateral Non-Disclosure and Proprietary Information Agreement',
    documentType: 'Contract',
    jurisdiction: 'England and Wales / Cross-Border',
    governingLaw: 'English Common Law',
    difficulty: 'Fundamental',
    readingTimeMinutes: 12,
    keyTermIds: ['whereas', 'hereby', 'shall', 'injunction', 'breach', 'without-prejudice', 'severability'],
    abstractEn: 'A high-grade mutual confidentiality contract drafted under English law governing trade secrets protection, proprietary source code exchange, and injunction remedies.',
    abstractId: 'Perjanjian kerahasiaan timbal balik berstandar hukum Inggris yang mengatur perlindungan rahasia dagang, pertukaran data teknologi, dan hak memohon penetapan injunksi pengadilan.',
    parties: ['Horizon AI Technologies Ltd. (Discloser)', 'PT Finansial Solusi Digital (Recipient)'],
    downloadableFilename: 'Mutual_Non_Disclosure_Agreement_Horizon_PTFSD.pdf',
    paragraphs: [
      {
        id: 'nda-1',
        paragraphNumber: 'RECITAL A',
        text: 'WHEREAS, the Parties are exploring potential commercial collaboration regarding cross-border banking infrastructure (the "Permitted Purpose"); and in connection therewith, each Party may disclose to the other Party certain non-public, proprietary, and confidential information.',
        highlightedTermIds: ['whereas', 'therewith'],
        indonesianSummary: 'Latar belakang penjajakan kerjasama bisnis dan pembukaan data rahasia.'
      },
      {
        id: 'nda-2',
        paragraphNumber: 'CONFIDENTIALITY COVENANT 2.1',
        text: 'The Recipient shall hold all Confidential Information in strict confidence and shall not, without the prior written consent of the Discloser, publish, reproduce, or disclose any part thereof to any third party, save as expressly permitted under this Agreement.',
        highlightedTermIds: ['covenant', 'shall', 'thereof'],
        indonesianSummary: 'Kewajiban utama menjaga kerahasiaan dan larangan membocorkan tanpa persetujuan tertulis.'
      },
      {
        id: 'nda-3',
        paragraphNumber: 'INJUNCTIVE RELIEF 5.1',
        text: 'The Parties hereby acknowledge and agree that any unauthorized use or disclosure of Confidential Information will cause irreparable injury for which monetary damages alone would not be an adequate remedy. Accordingly, the Discloser shall be entitled to seek an Injunction, Specific Performance, or other equitable relief without the necessity of proving actual damages or posting bond.',
        highlightedTermIds: ['hereby', 'damages', 'injunction', 'specific-performance', 'shall'],
        indonesianSummary: 'Pengakuan bahwa pembocoran rahasia menimbulkan kerugian tak terpulihkan sehingga pihak berhak memohon perintah pengadilan (injunction).'
      },
      {
        id: 'nda-4',
        paragraphNumber: 'SEVERABILITY 8.1',
        text: 'If any provision of this Agreement is declared by a court of competent jurisdiction to be invalid, void, or unenforceable, the validity of the remaining provisions shall not be affected thereby, and such provision shall be severed from the remainder of this Agreement.',
        highlightedTermIds: ['jurisdiction', 'severability'],
        indonesianSummary: 'Klausul keterpisahan (severability) untuk menjamin validitas sisa perjanjian jika satu ketentuan batal.'
      }
    ]
  },
  {
    id: 'doc-arbitration-award',
    title: 'International Commercial Arbitration Award Excerpt (SIAC)',
    documentType: 'Arbitration Award',
    jurisdiction: 'Singapore International Arbitration Centre (SIAC)',
    governingLaw: 'Singapore International Arbitration Act',
    difficulty: 'Advanced',
    readingTimeMinutes: 22,
    keyTermIds: ['arbitration', 'plaintiff', 'defendant', 'breach', 'damages', 'bona-fide', 'pacta-sunt-servanda', 'preponderance-of-evidence'],
    abstractEn: 'A redacted excerpt from a final binding arbitral award rendered under the SIAC Rules addressing repudiatory breach of contract, cross-border damages valuation, and the doctrine of pacta sunt servanda.',
    abstractId: 'Petikan putusan final arbitrase internasional di bawah Peraturan SIAC mengenai pemutusan kontrak sepihak, perhitungan ganti rugi lintas batas, dan penegakan asas pacta sunt servanda.',
    parties: ['Claimant: Ocean Energy Logistics Ltd.', 'Respondent: PT Tambang Mineral Perkasa'],
    downloadableFilename: 'SIAC_Final_Arbitral_Award_Redacted_Excerpt.pdf',
    paragraphs: [
      {
        id: 'arb-1',
        paragraphNumber: 'PROCEDURAL HISTORY ¶14',
        text: 'Pursuant to Clause 19 of the Coal Off-Take Agreement, the Claimant filed its Notice of Arbitration on 12 January 2023, seeking damages in excess of USD 14,500,000 for alleged repudiatory breach of contract arising from the Respondent’s failure to deliver the agreed shipments.',
        highlightedTermIds: ['pursuant-to', 'arbitration', 'damages', 'breach'],
        indonesianSummary: 'Riwayat pengajuan notis arbitrase oleh Pemohon atas dasar wanprestasi penyerahan kargo batu bara.'
      },
      {
        id: 'arb-2',
        paragraphNumber: 'TRIBUNAL FINDINGS ¶88',
        text: 'The Arbitral Tribunal observes that international commercial contracts are anchored in the venerable maxim of Pacta Sunt Servanda. The Respondent’s assertion that a sudden surge in domestic coal prices constituted force majeure is without merit, as mere economic hardship does not relieve a party of its contractual performance.',
        highlightedTermIds: ['arbitration', 'pacta-sunt-servanda', 'force-majeure'],
        indonesianSummary: 'Pertimbangan majelis arbitrase menegakkan asas pacta sunt servanda dan menolak dalih bahwa kenaikan harga pasar adalah force majeure.'
      },
      {
        id: 'arb-3',
        paragraphNumber: 'STANDARD OF PROOF & LIABILITY ¶112',
        text: 'Having examined the expert testimony and contemporaneous email records, the Tribunal concludes that the Claimant has established by a Preponderance of the Evidence that the Respondent acted in bad faith (mala fide) in reallocating the vessel quotas to a third-party purchaser at a higher spot rate.',
        highlightedTermIds: ['preponderance-of-evidence', 'bona-fide', 'liability'],
        indonesianSummary: 'Penerapan standar beban pembuktian perdata (preponderance of evidence) atas adanya itikad buruk pengalihan kuota kapal.'
      },
      {
        id: 'arb-4',
        paragraphNumber: 'OPERATIVE DISPOSITIF ¶145',
        text: 'THE TRIBUNAL HEREBY ORDERS AND AWARDS that the Respondent shall pay to the Claimant: (a) Compensatory damages in the sum of USD 11,240,000; (b) Pre-award interest at 5.3% per annum; and (c) The Claimant’s legal fees and costs of the arbitration pursuant to the SIAC Schedule of Fees.',
        highlightedTermIds: ['hereby', 'shall', 'damages', 'pursuant-to', 'arbitration'],
        indonesianSummary: 'Amar putusan arbitrase yang memerintahkan Tergugat membayar ganti rugi kompensasi, bunga, dan biaya penasehat hukum.'
      }
    ]
  },
  {
    id: 'doc-legal-opinion',
    title: 'Formal Legal Opinion: Foreign Direct Investment & Mining Concessions',
    documentType: 'Legal Opinion',
    jurisdiction: 'Republic of Indonesia / Foreign Investment Framework',
    governingLaw: 'Indonesian Positive Law (UU PT No. 40/2007, UU Cipta Kerja)',
    difficulty: 'Advanced',
    readingTimeMinutes: 16,
    keyTermIds: ['pursuant-to', 'ultra-vires', 'due-diligence', 'fiduciary-duty', 'articles-of-association', 'shareholder'],
    abstractEn: 'A formal legal opinion issued by senior Indonesian legal counsel to international private equity investors evaluating regulatory compliance, BKPM positive investment list, and corporate authorization.',
    abstractId: 'Pendapat hukum formal (Legal Opinion) yang diterbitkan oleh konsultan hukum Indonesia untuk investor asing mengenai kepatuhan hukum investasi, daftar positif investasi, dan keabsahan organ perseroan.',
    parties: ['Client: Global Resource Capital Partners LP (London)', 'Counsel: Hadiputro & Partners Law Chambers (Jakarta)'],
    downloadableFilename: 'Legal_Opinion_Mining_Investment_BKPM_Indonesia.pdf',
    paragraphs: [
      {
        id: 'lo-1',
        paragraphNumber: 'SECTION 1: SCOPE OF INQUIRY',
        text: 'We have acted as Indonesian legal counsel to Global Resource Capital Partners LP in connection with the proposed acquisition of a 49% equity interest in PT Tambang Emas Borneo. Pursuant to your instructions, we have conducted extensive Legal Due Diligence on the Target Company’s corporate status, concession permits (IUP), and employment compliance.',
        highlightedTermIds: ['pursuant-to', 'due-diligence', 'shareholder'],
        indonesianSummary: 'Ruang lingkup pemeriksaan hukum dan pelaksanaan uji tuntas hukum (LDD) atas rencana akuisisi saham.'
      },
      {
        id: 'lo-2',
        paragraphNumber: 'SECTION 2: CORPORATE CAPACITY & ULTRA VIRES',
        text: 'We have reviewed the deed of establishment, the Articles of Association, and all amendments thereto. We confirm that the execution of the Share Subscription Agreement by the Board of Directors is within the corporate powers of the Company and does not constitute an ultra vires act, provided that the required approval of the General Meeting of Shareholders is duly obtained.',
        highlightedTermIds: ['articles-of-association', 'thereto', 'ultra-vires', 'fiduciary-duty', 'provided-that', 'shareholder'],
        indonesianSummary: 'Analisis kapasitas hukum perseroan dan kepastian bahwa tindakan direksi bukan merupakan perbuatan ultra vires.'
      },
      {
        id: 'lo-3',
        paragraphNumber: 'SECTION 3: LEGAL CONCLUSION & OPINION',
        text: 'Subject to the qualifications and assumptions set forth herein, we are of the opinion that: (1) The Target Company is a duly incorporated and validly existing limited liability company under Indonesian law; (2) The Mining Concession is valid and unencumbered; and (3) The transaction will create a legally binding and enforceable obligation against the Sellers.',
        highlightedTermIds: ['subject-to', 'herein'],
        indonesianSummary: 'Kesimpulan pendapat hukum bahwa perseroan berbadan hukum sah dan transaksi mengikat secara hukum.'
      }
    ]
  },
  {
    id: 'doc-share-purchase-m-a',
    title: 'Cross-Border Share Purchase Agreement & Indemnity Deed (M&A)',
    documentType: 'Corporate',
    jurisdiction: 'Hong Kong / Republic of Indonesia',
    governingLaw: 'Hong Kong Law with Indonesian Property Subordination',
    difficulty: 'Advanced',
    readingTimeMinutes: 25,
    keyTermIds: ['whereas', 'hereby', 'representation', 'warranty', 'covenant', 'indemnity', 'goodwill', 'in-rem', 'hold-harmless'],
    abstractEn: 'A high-complexity mergers and acquisitions contract covering transfer of controlling shares, representations & warranties disclosure, escrow accounts, and tax indemnity covenants.',
    abstractId: 'Perjanjian jual beli saham dan pengalihan kendali perseroan lintas batas yang mencakup pernyataan dan jaminan (Reps & Warranties), perlindungan goodwill, dan ganti rugi pajak.',
    parties: ['Solaris Holding Corp (Seller)', 'PT Nusantara Energi Terbarukan (Purchaser)'],
    downloadableFilename: 'Cross_Border_Share_Purchase_Agreement_Solaris_NET.pdf',
    paragraphs: [
      {
        id: 'spa-1',
        paragraphNumber: 'RECITALS',
        text: 'WHEREAS, the Seller is the beneficial and record owner of 10,000,000 Ordinary Shares, representing 100% of the issued share capital of PT Solaria Indonesia; and WHEREAS, the Purchaser desires to purchase all of said Shares, together with all associated brand Goodwill and proprietary licenses thereof...',
        highlightedTermIds: ['whereas', 'goodwill', 'thereof', 'shareholder'],
        indonesianSummary: 'Konsiderans kepemilikan 100% saham dan maksud pembelian seluruh modal perseroan beserta goodwill.'
      },
      {
        id: 'spa-2',
        paragraphNumber: 'SECTION 3: REPRESENTATIONS AND WARRANTIES',
        text: 'The Seller hereby represents and warrants to the Purchaser that each warranty set forth in Schedule 3 is true, complete, and accurate in all material respects as of the date hereof and as of the Closing Date. The Company owns clear, marketable, and unencumbered title in rem to all real estate assets.',
        highlightedTermIds: ['hereby', 'representation', 'warranty', 'in-rem'],
        indonesianSummary: 'Pernyataan dan jaminan (Reps & Warranties) penjual mengenai kepemilikan hak kebendaan (in rem) atas seluruh aset tanah.'
      },
      {
        id: 'spa-3',
        paragraphNumber: 'SECTION 7: TAX INDEMNIFICATION COVENANT',
        text: 'The Seller unconditionally covenants to defend, indemnify, and hold harmless the Purchaser from and against any Tax Liabilities, reassessments, penalties, or interest imposed by the Indonesian Directorate General of Taxes relating to any accounting period prior to the Closing Date.',
        highlightedTermIds: ['covenant', 'indemnity', 'hold-harmless', 'liability'],
        indonesianSummary: 'Kewajiban ganti rugi khusus atas seluruh potensi utang pajak masa lalu sebelum tanggal penutupan transaksi.'
      }
    ]
  }
];
