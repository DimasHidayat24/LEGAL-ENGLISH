import { SourceRef } from '../types';

/**
 * Every URL here was opened and read when this content was written (October 2026).
 * Keep notes to what the page actually supports.
 */
export const SRC = {
  // ---- Memo writing guides (law schools) ----
  cunyMemo: {
    label: 'CUNY School of Law — Drafting a Law Office Memorandum (incl. annotated sample memo)',
    url: 'https://www.law.cuny.edu/academics/academic-resources-support/legal-writing-center/student-resources/drafting-a-law-office-memorandum',
    note: 'Six sections (heading, question presented, brief answer, facts, discussion, conclusion); "Under New York law, did…when…?" sample; brief answer opens with yes/no and usually has no citations.',
  },
  oregonMemo: {
    label: 'University of Oregon — Legal Research & Writing, ch. 13 “Objective Communication”',
    url: 'https://opentext.uoregon.edu/undergrad-legal-research/chapter/chapter-13-objective-communication/',
    note: 'Memo parts; Discussion organised by CREAC/IRAC; question presented usually begins “does/could/whether”.',
  },
  georgetownMemo: {
    label: 'Georgetown Law Writing Center — Checklist for the Memorandum (2026)',
    url: 'https://www.law.georgetown.edu/academics/wp-content/uploads/sites/58/2026/08/Checklist-for-the-Memorandum_fcd.pdf',
    note: 'To/From/Date/Subject heading; QP names the law, the question and key facts in 3–4 lines; brief answer without formal citations; objective, addresses counter-arguments.',
  },
  columbiaMemo: {
    label: 'Columbia Law School Writing Center — Memo Checklist',
    url: 'https://www.law.columbia.edu/sites/default/files/2022-08/WC%20Memo%20Checklist.pdf',
    note: '“Under/does/when” QP format answerable yes/no; brief answer with a “because” clause; CREAC with umbrella paragraph; conclusion adds no new ideas.',
  },
  // ---- Singapore / English law on penalties and repudiation ----
  denka: {
    label: 'Denka Advantech Pte Ltd v Seraya Energy Pte Ltd [2020] SGCA 119 (case summary, Supreme Court of Singapore)',
    url: 'https://www.judiciary.gov.sg/docs/default-source/judgments-docs/denka-advantech-pte-ltd-and-another-v-seraya-energy-pte-ltd-and-another-and-other-appeals.pdf',
    note: 'Singapore keeps the Dunlop “genuine pre-estimate” test and declines to follow Cavendish v Makdessi; penalty rule applies only to sums payable on breach; letter that supply “shall cease” was a repudiation.',
  },
  makdessi: {
    label: 'Cavendish Square Holding BV v Makdessi [2015] UKSC 67 (UK Supreme Court judgment)',
    url: 'https://supremecourt.uk/uploads/uksc_2013_0280_judgment_c7f37dda32.pdf',
    note: 'English law test (para 32): is the detriment “out of all proportion to any legitimate interest of the innocent party”.',
  },
  // ---- Arbitration ----
  siacRules: {
    label: 'SIAC Rules 2025 (7th edition), Singapore International Arbitration Centre',
    url: 'https://siac.org.sg/siac-rules-2025',
    note: 'In force 1 January 2025 for arbitrations commenced on or after that date (Rule 1.5); Notice of Arbitration under Rule 6.',
  },
  siacModel: {
    label: 'SIAC Model Clause (revised 9 December 2024)',
    url: 'https://siac.org.sg/siac-model-clause',
    note: 'Recommended clause text: seat, number of arbitrators (one or three), language, law of the arbitration agreement, separate applicable-law clause.',
  },
  // ---- Legal opinions ----
  ssekOpinion: {
    label: 'SSEK Indonesian Legal Consultants — Indonesian law opinion filed as Exhibit 99.4 to Grab Holdings Ltd Form F-1 (SEC EDGAR, 30 Dec 2021)',
    url: 'https://www.sec.gov/Archives/edgar/data/1855612/000119312521370586/d260181dex994.htm',
    note: 'Real Indonesian-counsel opinion: A. Introduction, B. Purpose, C. Documents, D. Key Definitions, E. Assumptions, F. Opinions, G. Qualifications; “duly incorporated and is validly existing”; language-law and good-faith qualifications; AHU decree formats (…AH.01.01 = establishment approval, …AH.01.02 = amendment approval, AHU-AH.01.03-… = notification receipt).',
  },
  mmiOpinion: {
    label: 'Marsinih Martoatmodjo Iskandar Law Office — Pendapat Hukum, PT Pradiksi Gunatama Tbk (9 Nov 2022)',
    url: 'https://pradiksi.co.id/upload/files/1668396630_PendapatHukumMergerPGSA.pdf',
    note: 'Real Indonesian-language opinion under HKHPM standards: Asumsi-Asumsi; Kualifikasi; “Pendapat Hukum kami adalah sebagai berikut”; “sah dan mengikat”; “Hormat kami”.',
  },
  tribar: {
    label: 'TriBar Opinion Committee — Third-Party “Closing” Opinions, 53 Bus. Law. 591 (1998), hosted by the ABA Business Law Section',
    url: 'https://qa.americanbar.org/content/dam/aba/administrative/business_law/opinions/tribar/materials/20050303000003.pdf',
    note: '§1.4: “legal, valid, binding and enforceable” together or separately mean “enforceable” used alone; §1.2(f) and §6.1: “validly existing” is established as of the opinion date (e.g. from a public official’s certificate), while “duly incorporated” looks back to the incorporation steps.',
  },
  // ---- Indonesian statutes ----
  kuhperdata: {
    label: 'Kitab Undang-Undang Hukum Perdata (Burgerlijk Wetboek voor Indonesie) — full text published by the Ministry of Law (Balai Harta Peninggalan Jakarta, kemenkum.go.id)',
    url: 'https://bhpjakarta.kemenkum.go.id/attachments/KUH_Perdata.pdf',
    note: 'Unofficial Indonesian translation (the authentic text is Dutch, Staatsblad 1847 No. 23), hosted on a government site. Checked: Pasal 1238, 1243, 1246, 1249, 1266, 1267, 1304, 1307, 1309, 1338.',
  },
  waiver1266: {
    label: 'Rahmadita & Cahyono, “Pengesampingan Pasal 1266 KUH Perdata … Studi Putusan-Putusan Pengadilan”, Lex Patrimonium 2(1) (UI, 2023)',
    url: 'https://scholarhub.ui.ac.id/cgi/viewcontent.cgi?article=1044&context=lexpatri',
    note: 'Most decisions studied uphold a waiver of Pasal 1266 under Pasal 1338(1); at least one (5/Pdt.G.S/2018/PN WSB) held the waiver void.',
  },
  uu24: {
    label: 'UU No. 24 Tahun 2009 tentang Bendera, Bahasa, dan Lambang Negara, serta Lagu Kebangsaan — official text (peraturan.go.id; JDIH BPK record 38661)',
    url: 'https://peraturan.go.id/files/UU%2024%20Tahun%202009.pdf',
    note: 'Pasal 31(1): Indonesian is mandatory in agreements involving Indonesian private institutions or citizens; 31(2): with a foreign party, also written in that party’s language and/or English.',
  },
  perpres63: {
    label: 'Perpres No. 63 Tahun 2019 tentang Penggunaan Bahasa Indonesia — Lembaran Negara 2019 No. 180 (peraturan.go.id; JDIH BPK record 121661)',
    url: 'https://peraturan.go.id/files/ps63-2019.pdf',
    note: 'Pasal 26(3): the foreign-language text is a padanan/terjemahan of the Indonesian; 26(4): if interpretations differ, the language agreed in the agreement governs.',
  },
  mk127: {
    label: 'Mahkamah Konstitusi — press release on Perkara No. 127/PUU-XXIII/2025 (28 Aug 2025)',
    url: 'https://www.mkri.id/public/content/infoumum/press/pdf/press_1756373777_54fff4b6bb2f605eeb0f.pdf',
    note: 'Describes the conflicting readings of Pasal 31 UU 24/2009 and SEMA No. 3 Tahun 2023, which gives room for agreements to stand despite language defects.',
  },
  uupt: {
    label: 'UU No. 40 Tahun 2007 tentang Perseroan Terbatas — JDIH BPK (status: amended by UU 11/2020, Perpu 2/2022, UU 6/2023)',
    url: 'http://peraturan.bpk.go.id/Details/39965/uu-no-40-tahun-2007',
    note: 'Company Law is cited “as amended”, latest by UU No. 6 Tahun 2023 (Cipta Kerja).',
  },
  perpres10: {
    label: 'Perpres No. 10 Tahun 2021 tentang Bidang Usaha Penanaman Modal — JDIH BPK (amended by Perpres 49/2021)',
    url: 'https://peraturan.bpk.go.id/Details/161806/perpres-no-10-tahun-2021',
    note: 'Positive investment list; in force 4 March 2021; amended by Perpres No. 49 Tahun 2021.',
  },
  perpres155: {
    label: 'Perpres No. 155 Tahun 2024 tentang Kementerian Hukum — JDIH BPK',
    url: 'https://peraturan.bpk.go.id/Details/306674/perpres-no-155-tahun-2024',
    note: 'Set 5 Nov 2024 (LN 2024 No. 351); functions include administrasi hukum umum; revokes Perpres 18/2023 on the Kementerian Hukum dan HAM.',
  },
  // ---- Demand letters (somasi) & civil claims (gugatan) ----
  sghcLod: {
    label: 'The Enterprise Fund II Ltd v Jong Hee Sen [2016] SGHC 259 (Singapore High Court) — comparative',
    url: 'https://www.elitigation.sg/gd/s/2016_SGHC_259',
    note: 'Quotes a real solicitors’ letter of demand (“TAKE NOTE that if you fail…”); “without prejudice” privilege needs a dispute and a genuine settlement attempt; Evidence Act s 23.',
  },
  putusan100: {
    label: 'Putusan PN Malang No. 100/Pdt.G/2026/PN Mlg (14 Jul 2026), PT Enseval Putera Megatrading Tbk v Ferdinal Budiyanto — Direktori Putusan MA',
    url: 'https://putusan3.mahkamahagung.go.id/direktori/putusan/zaf181805a9757ee8b56303833393330.html',
    note: 'Gugatan wanprestasi for unpaid invoices, reproduced in “Tentang Duduk Perkara”: numbered “Bahwa” posita, two somasi (the second giving 14 calendar days), PETITUM PRIMAIR 1–5 and SUBSIDAIR ex aequo et bono. Granted in part: the court deducted transfers the defendant proved and refused 6% interest because no specific agreement provided for it.',
  },
  putusan216: {
    label: 'Putusan PN Malang No. 216/Pdt.G/2025/PN Mlg (5 Mar 2026), PT Pesta Pora Abadi v PT Brilliant Jaya — Direktori Putusan MA',
    url: 'https://putusan3.mahkamahagung.go.id/direktori/putusan/zaf1446461a2dd32b659313431353335.html',
    note: 'Company-v-company construction claim: contract numbers and clauses quoted, Surat Teguran → Surat Peringatan → Somasi I and II, competence pleaded under a choice-of-domicile clause, uitvoerbaar bij voorraad and dwangsom requested; PRIMAIR 1–16, SUBSIDAIR. Exceptions rejected (Pasal 98(1) UUPT); claim rejected because the dispute had been settled.',
  },
  hir: {
    label: 'Herzien Inlandsch Reglement (HIR / RIB), Staatsblad 1941 No. 44 — JDIH Mahkamah Agung',
    url: 'https://jdih.mahkamahagung.go.id/legal-product/herzien-inlandsch-reglement-hir/download/dokumen',
    note: 'Pasal 118(1) and (4) (claim filed with the Chief Judge of the court where the defendant lives, or the chosen domicile); 123(1) (special power of attorney); 163 (burden of proof); 178(3) (no ultra petita); 180(1) (provisional enforcement); 227 (conservatory attachment).',
  },
  maDwangsom: {
    label: 'MARINews (Mahkamah Agung) — “Yurisprudensi MA: Dasar Penjatuhan Uang Paksa (Dwangsom)” (15 Sep 2025)',
    url: 'https://marinews.mahkamahagung.go.id/putusan/yurisprudensi-ma-dasar-penjatuhan-uang-paksa-dwangsom-0zm',
    note: 'Putusan MA No. 791 K/Sip/1972: dwangsom does not apply to an order to pay a sum of money; consistent with Pasal 606a–606b Rv.',
  },
  maSomasi: {
    label: 'MARINews (Mahkamah Agung) — “Yurisprudensi MA RI: Bentuk Somasi dan Kedudukannya dalam Gugatan Perdata” (14 Aug 2025)',
    url: 'https://marinews.mahkamahagung.go.id/putusan/bentuk-somasi-dan-kedudukannya-dalam-gugatan-perdata-0ud',
    note: 'MA 852 K/Sip/1972 and 117 K/Sip/1956: a somasi need not be an authentic deed or be served by a bailiff; a claim is not automatically inadmissible for lack of a prior somasi; a served claim itself counts as a demand.',
  },
  dhpSomasi: {
    label: 'DHP Lawyers (Jakarta) — published somasi draft with names left blank, “SOMASI / PERINGATAN” (draft dated 10 Apr 2018)',
    url: 'https://www.dhplawyers.com/userfiles/cache/downloads/2020/04/dhp-lawyers--contoh.pdf',
    note: 'A law firm’s own working format: Ref. No., Kepada Yth., Perihal; “bertindak berdasarkan Surat Kuasa Khusus … (terlampir), dari dan oleh karena itu berwenang bertindak untuk dan atas nama Klien kami”; “Bahwa terlebih dahulu kami menjelaskan…”; numbered “Bahwa” facts; “memperingatkan (SOMASI)” with a 3 × 24-hour deadline; “apabila … kami akan menempuh … semua jalur hukum”; mediation left open; Hormat kami, Kuasa Hukum; Tembusan: Klien, File.',
  },
  hukumonlineGugatan: {
    label: 'Hukumonline Klinik — Cara Membuat Surat Gugatan Perdata yang Memenuhi Syarat (updated 26 Mar 2026) — secondary',
    url: 'https://www.hukumonline.com/klinik/a/membuat-surat-gugatan-cl2871/',
    note: 'Secondary explainer for Pasal 8(3) Rv (identitas, posita = feitelijke + rechtsgronden, petitum primair/subsidair) and the obscuur libel risk; the structure itself is taken from the two PN Malang judgments.',
  },
  // ---- Language, dictionary, filed contracts ----
  kbbi: {
    label: 'KBBI VI Daring (Badan Bahasa, Kemendikdasmen) — entri “otentik”',
    url: 'https://kbbi.kemendikdasmen.go.id/entri/otentik',
    note: '“otentik” → refers to the standard form “autentik”. Perpres 63/2019 Pasal 4(5) itself writes “keautentikan”.',
  },
  edgarIdLaw: {
    label: 'Assignment Agreement, PT Rabobank Duta Indonesia – Everbloom International Technology Pte Ltd (21 Aug 2000), Exhibit 10.9 filed on SEC EDGAR',
    url: 'https://www.sec.gov/Archives/edgar/data/1203457/000102670002000279/ex109_f20.txt',
    note: 'Cl. 9: “This Agreement is governed by and construed in accordance with the laws of the Republic of Indonesia”, with non-exclusive jurisdiction of the South Jakarta courts; cl. 3.3 waives “article 1266 of the Indonesian Civil Code so that this Agreement can be terminated without the need for judicial order”.',
  },
  edgarKpay: {
    label: 'Cooperation and Service Agreement, PT Kinerja Pay Indonesia – PT Indonesia Enam Dua (8 Sep 2016), Exhibit 10.31 filed on SEC EDGAR',
    url: 'https://www.sec.gov/Archives/edgar/data/1494162/000129534516000681/exh10_31.htm',
    note: 'Cl. 9(ii) gives Indonesian courts “exclusive jurisdiction” while cl. 9(iii) sends all disputes to arbitration — a real example of two dispute clauses that contradict each other.',
  },
} satisfies Record<string, SourceRef>;
