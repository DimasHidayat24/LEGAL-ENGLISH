import { ComparativeConcept } from '../types';

export const comparativeLawList: ComparativeConcept[] = [
  {
    id: 'comp-wanprestasi-breach',
    englishTerm: 'Breach of Contract (Default / Repudiation)',
    indonesianTerm: 'Wanprestasi (Ingkar Janji / Cidera Janji)',
    category: 'Contract',
    sourceRef: 'Pasal 1238, 1243 KUHPerdata',
    relationship: 'functional',
    civilLawNuance: 'Wanprestasi adalah keadaan debitur tidak memenuhi prestasi yang diperjanjikan — tidak memenuhi sama sekali, terlambat, atau memenuhi secara tidak baik. Penggantian biaya, kerugian, dan bunga baru wajib setelah debitur dinyatakan lalai dan tetap lalai. Kelalaian itu umumnya dinyatakan dengan somasi (peringatan tertulis / ingebrekestelling), kecuali tenggat waktu pelaksanaan sudah ditentukan secara tegas dalam perjanjian (Pasal 1238, 1243 KUHPerdata).',
    commonLawNuance: 'Di common law umumnya tidak disyaratkan somasi sebelum wanprestasi dianggap terjadi: kegagalan memenuhi kewajiban pada waktunya sudah dapat menjadi breach. Breach diklasifikasikan menjadi Material Breach (pelanggaran pokok), Minor Breach, Anticipatory Breach, dan Repudiatory Breach — tetapi pengakhiran kontrak tetap membutuhkan pilihan (election) dari pihak yang dirugikan, bukan akibat otomatis.',
    whyContextMatters: 'Jangan berasumsi "breach of contract" selalu otomatis mengakhiri kontrak atau selalu memerlukan somasi seperti di hukum Indonesia. Di common law, kegagalan atas klausul "time of the essence" dapat menjadi pelanggaran yang bersifat repudiatory, tetapi pihak yang dirugikan tetap harus memilih untuk mengakhiri kontrak. Sebaliknya, satu somasi yang sah sudah cukup di Indonesia — "somasi 3 kali" hanya kebiasaan praktik, bukan syarat hukum.',
    exampleScenario: 'Dalam kontrak internasional dengan pilihan hukum Inggris, jika penjual terlambat 1 hari atas klausul "time is of the essence", pembeli dapat memilih untuk mengakhiri kontrak tanpa somasi terlebih dahulu — bukan karena keterlambatan itu sendiri otomatis membatalkan kontrak, melainkan karena keterlambatan tersebut tergolong repudiatory dan pembeli memilih (elect) untuk mengakhirinya.',
    sayIt: {
      preferredExpression: 'failure to perform; breach of contract',
      collocations: ['be in default', 'declare the debtor in default (in mora)', 'written notice of default', 'time is of the essence', 'cure the breach'],
      modelSentenceEn: 'If a Party fails to perform any obligation under this Agreement, the other Party may give written notice of default and, if the failure is not cured within 14 days, declare the Party in default.',
      modelSentenceId: 'Apabila suatu Pihak gagal memenuhi kewajibannya berdasarkan Perjanjian ini, Pihak lainnya dapat menyampaikan pemberitahuan wanprestasi tertulis dan, apabila kegagalan tersebut tidak diperbaiki dalam 14 hari, menyatakan Pihak tersebut lalai.',
      doNotSay: 'Breach automatically terminates the contract.',
      doNotSayWhy: 'Pengakhiran membutuhkan pilihan dari pihak yang dirugikan dan pemenuhan syaratnya (pelanggaran material atau repudiatory) — bukan akibat otomatis dari setiap keterlambatan.',
    },
    exercise: {
      task: 'Terjemahkan ke bahasa Inggris: "Apabila Debitur lalai memenuhi kewajibannya, Kreditur akan menyampaikan somasi tertulis sebelum menuntut ganti rugi."',
      hint: 'Pakai "notice of default" untuk somasi, dan ingat ganti rugi menuntut debitur dinyatakan lalai terlebih dahulu.',
      modelAnswer: 'If the Debtor fails to perform its obligations, the Creditor shall serve a written notice of default before claiming damages.',
    },
  },
  {
    id: 'comp-pmh-tort',
    englishTerm: 'Tort (Negligence, Intentional Torts, Strict Liability)',
    indonesianTerm: 'Perbuatan Melawan Hukum (PMH / Onrechtmatige Daad)',
    category: 'Torts/PMH',
    civilLawNuance: 'Diatur dalam satu payung besar Pasal 1365 KUHPerdata ("Tiap perbuatan melanggar hukum yang membawa kerugian kepada orang lain, mewajibkan orang yang karena salahnya menerbitkan kerugian itu, mengganti kerugian tersebut"). Unsur: perbuatan, melawan hukum, kesalahan (schuld), kerugian, dan hubungan kausalitas.',
    commonLawNuance: 'Bukan satu aturan tunggal, melainkan rumpun berbagai gugatan tort terpisah (causes of action) seperti Negligence (kelalaian), Trespass (gangguan fisik), Nuisance (gangguan ketentraman), Defamation (pencemaran nama baik), Conversion (penguasaan barang tanpa hak), dan Strict Liability.',
    whyContextMatters: 'Di Indonesia, hampir semua gugatan non-kontraktual diajukan dengan dalil Pasal 1365 KUHPerdata (PMH). Di sistem Anglo-Saxon, penggugat harus memilih "Tort of Negligence" atau "Tort of Deceit" yang masing-masing memiliki elemen pembuktian spesifik.',
    exampleScenario: 'Jika pabrik membocorkan limbah ke sungai, di Indonesia digugat atas PMH Pasal 1365 KUHPerdata jo. UU Lingkungan Hidup. Di Common Law, digugat atas "Tort of Nuisance" atau "Rule in Rylands v Fletcher" (strict liability).'
  },
  {
    id: 'comp-consideration-kausa',
    englishTerm: 'Consideration (Bargained-for Exchange / Quid Pro Quo)',
    indonesianTerm: 'Kausa yang Halal',
    category: 'Contract',
    sourceRef: 'Pasal 1320, 1335, 1337 KUHPerdata',
    relationship: 'false-friend',
    civilLawNuance: 'Kausa yang halal adalah syarat keempat sahnya perjanjian (Pasal 1320 KUHPerdata): isi dan tujuan perjanjian itu sendiri harus halal. Perjanjian tanpa kausa, atau dengan kausa palsu atau terlarang, tidak mempunyai kekuatan (Pasal 1335). Kausa terlarang adalah kausa yang dilarang undang-undang, bertentangan dengan kesusilaan, atau ketertiban umum (Pasal 1337). Kausa bukan soal timbal balik prestasi, dan bukan motif pribadi para pihak.',
    commonLawNuance: 'Di common law, consideration — sesuatu yang bernilai yang dipertukarkan sebagai harga suatu janji — umumnya disyaratkan agar janji dapat dipaksakan, dan janji cuma-cuma umumnya tidak dapat dipaksakan kecuali dibuat dalam bentuk deed. Itu aturan sistem lain, bukan syarat Pasal 1320.',
    whyContextMatters: 'Jangan samakan consideration dengan kausa halal: sahnya perjanjian di Indonesia tidak bergantung pada timbal balik prestasi, dan perjanjian sepihak yang kausanya halal dapat sah. Akta notaris hanya disyaratkan untuk jenis perjanjian tertentu — misalnya hibah, kecuali hibah benda bergerak berwujud yang sah dengan penyerahan belaka (Pasal 1682 jo. 1687).',
    exampleScenario: 'Dalam klausul pembuka kontrak Inggris selalu ada kalimat: "NOW THEREFORE, in consideration of the sum of $1.00 and other good and valuable consideration...". Ini dicantumkan demi memenuhi doktrin Consideration Common Law.',
    sayIt: {
      preferredExpression: 'lawful cause; lawful purpose',
      collocations: ['lawful cause', 'for a lawful purpose', 'the agreement shall be void if its cause is unlawful', 'recitals state the purpose of this Agreement'],
      modelSentenceEn: 'The Parties enter into this Agreement for a lawful purpose, and the obligations herein are binding upon execution, without any requirement of consideration under Indonesian law.',
      modelSentenceId: 'Para Pihak mengadakan Perjanjian ini untuk tujuan yang halal, dan kewajiban-kewajiban di dalamnya mengikat sejak penandatanganan, tanpa syarat consideration menurut hukum Indonesia.',
      doNotSay: 'This Agreement is valid because there is consideration / reciprocal performance.',
      doNotSayWhy: 'Sahnya perjanjian tidak bergantung pada timbal balik prestasi. Yang menentukan adalah kausa yang halal (Pasal 1320); syarat bentuk seperti akta notaris hanya berlaku untuk jenis perjanjian tertentu, misalnya hibah (Pasal 1682 jo. 1687).',
    },
    exercise: {
      task: 'Perbaiki kalimat ini: "The donation is enforceable because the donor received consideration in return."',
      hint: 'Ganti alasan sahnya — bukan timbal balik, melainkan kausa yang halal dan syarat bentuk akta notaris untuk hibah.',
      modelAnswer: 'The gift is enforceable because it was made for a lawful cause — not because consideration was given. Any formal requirement, such as a notarial deed for certain gifts, depends on the type of gift and the property involved.',
    },
  },
  {
    id: 'comp-damages-gantirugi',
    englishTerm: 'Damages (Compensatory, Liquidated, Consequential, Punitive)',
    indonesianTerm: 'Ganti Rugi (Biaya, Rugi, dan Bunga / Kosten, Schade en Interessen)',
    category: 'Remedies',
    civilLawNuance: 'Berdasarkan Pasal 1243-1250 KUHPerdata, ganti rugi terdiri dari: Biaya (ongkos nyata yang keluar), Rugi (kerugian fisik/kehilangan aset), dan Bunga (keuntungan yang sedianya diharapkan/lost profit), ditambah bunga moratoir jika ada keterlambatan uang.',
    commonLawNuance: 'Terbagi dalam: Expectation Damages (menempatkan korban seolah kontrak terlaksana), Reliance Damages (mengganti ongkos persiapan), Consequential Damages (kerugian beruntun yang wajar diperkirakan), dan Punitive Damages (ganti rugi hukuman).',
    whyContextMatters: 'Hukum Indonesia tidak mengenal konsep "Punitive Damages" (ganti rugi yang berlipat ganda untuk menghukum pelaku). Pengadilan Indonesia hanya mengabulkan kerugian riil yang dapat dibuktikan secara materiil (kerugian materiil dan immateriil).',
    exampleScenario: 'Dalam kontrak bisnis dengan perusahaan AS, mereka sering meminta pengesampingan "punitive and consequential damages". Bagi hukum Indonesia, klausul ini melindungi dari tuntutan kerugian spekulatif.'
  },
  {
    id: 'comp-injunction-perintah',
    englishTerm: 'Injunction (Interlocutory, Mandatory, Prohibitory)',
    indonesianTerm: 'Perintah Pengadilan / Penetapan Sela / Putusan Provisi / Sita Jaminan',
    category: 'Civil Procedure',
    civilLawNuance: 'Hukum acara perdata Indonesia mengenal "Tuntutan Provisi" (Pasal 180 HIR) atau permohonan "Sita Jaminan" (Conservatoir Beslag) untuk membekukan aset tergugat agar tidak dialihkan selama persidangan.',
    commonLawNuance: 'Perintah pengadilan yang berakar pada doktrin Equity (keadilan substantif), di mana hakim dapat memerintahkan seseorang untuk berhenti melakukan tindakan tertentu (prohibitory) atau melakukan tindakan spesifik (mandatory) di bawah ancaman pidana Contempt of Court.',
    whyContextMatters: 'Di Common Law, melanggar injunction adalah perbuatan "Contempt of Court" (penghinaan pengadilan) yang bisa dipenjara seketika. Di Indonesia, pelanggaran penetapan provisi diselesaikan melalui eksekusi perdata atau laporan pidana Pasal 216/231 KUHP.',
    exampleScenario: 'Dalam sengketa pembocoran rahasia dagang, pengacara di Singapura langsung memohon "Mareva Injunction" atau "Anton Piller Order" untuk membekukan rekening dan menyita bukti digital seketika.'
  },
  {
    id: 'comp-judicial-review',
    englishTerm: 'Judicial Review (Constitutional Review vs Administrative Review)',
    indonesianTerm: 'Pengujian Yudisial (Uji Materiil UU di MK & Peraturan di MA)',
    category: 'Public & Constitutional',
    civilLawNuance: 'Indonesia menerapkan sistem terpisah (bifurcated system): Mahkamah Konstitusi menguji Undang-Undang terhadap UUD 1945 (Constitutional Review), sedangkan Mahkamah Agung menguji peraturan di bawah UU terhadap UU (Hierarchical Review).',
    commonLawNuance: 'Di AS, doktrin Judicial Review (Marbury v. Madison) memungkinkan pengadilan umum federal mana pun untuk menguji konstitusionalitas suatu undang-undang. Di UK, Judicial Review utamanya adalah pengujian tindakan administratif pemerintah oleh High Court.',
    whyContextMatters: 'Ketika membaca literatur hukum Inggris (UK), istilah "Judicial Review" hampir selalu berarti gugatan terhadap keputusan badan eksekutif pemerintah (mirip gugatan PTUN di Indonesia), bukan pengujian UU oleh MK.',
    exampleScenario: 'Artikel UK berjudul "Judicial Review against the Home Office" setara dengan "Gugatan Pembatalan KTUN di PTUN Jakarta terhadap Kementerian", bukan perkara uji materiil konstitusi.'
  },
  {
    id: 'comp-director-duties',
    englishTerm: 'Fiduciary Duties (Duty of Care & Duty of Loyalty)',
    indonesianTerm: 'Tanggung Jawab Direksi dengan Itikad Baik & Penuh Tanggung Jawab',
    category: 'Corporate',
    civilLawNuance: 'Diatur dalam Pasal 97 UU Perseroan Terbatas No. 40/2007: "Setiap anggota Direksi bertanggung jawab penuh secara pribadi atas kerugian Perseroan apabila yang bersangkutan bersalah atau lalai menjalankan tugasnya...".',
    commonLawNuance: 'Prinsip hukum ekuitas yang sangat ketat membagi kewajiban menjadi: Duty of Care, Skill, and Diligence (kehati-hatian) dan Fiduciary Duty of Loyalty (loyalitas tanpa pamrih, dilarang mengambil corporate opportunity untuk kepentingan pribadi).',
    whyContextMatters: 'Kedua sistem kini mengadopsi doktrin yang serupa, termasuk "Business Judgment Rule" (Pasal 97 ayat 5 UU PT) yang melindungi direksi dari tanggung jawab pribadi jika keputusan bisnis diambil secara jujur, hati-hati, dan tanpa benturan kepentingan.',
    exampleScenario: 'Ketika direksi Indonesia dituduh melakukan tindakan yang merugikan perseroan, penasihat hukum asing akan menganalisis apakah terdapat pelanggaran "Duty of Loyalty" (konflik kepentingan pribadi).'
  }
];
