import { ComparativeConcept } from '../types';

export const comparativeLawList: ComparativeConcept[] = [
  {
    id: 'comp-wanprestasi-breach',
    englishTerm: 'Breach of Contract (Default / Repudiation)',
    indonesianTerm: 'Wanprestasi (Ingkar Janji / Cidera Janji)',
    category: 'Contract',
    civilLawNuance: 'Diatur dalam Pasal 1238, 1243 KUHPerdata. Memerlukan adanya perikatan yang sah, debitur lalai, dan umumnya membutuhkan "Somasi" (surat peringatan tertulis) untuk menyatakan debitur dalam keadaan lalai (in mora), kecuali dinyatakan tegas dalam perjanjian.',
    commonLawNuance: 'Terjadi seketika saat salah satu pihak gagal melaksanakan kewajibannya tanpa alasan sah. Diklasifikasikan menjadi Material Breach (pelanggaran pokok), Minor Breach, Anticipatory Breach, dan Repudiatory Breach.',
    whyContextMatters: 'Jangan berasumsi "Breach of Contract" selalu otomatis memerlukan Somasi seperti di hukum Indonesia. Di Common Law, kegagalan memenuhi "Time of the Essence" langsung menjadi pelanggaran fatal tanpa perlu somasi.',
    exampleScenario: 'Dalam kontrak internasional pilihan hukum Inggris, jika penjual telat 1 hari pada klausul "time is of the essence", pembeli dapat langsung membatalkan kontrak tanpa perlu somasi 3 kali seperti kebiasaan litigasi di PN Indonesia.'
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
    indonesianTerm: 'Kausa yang Halal / Prestasi Timbal Balik (Pasal 1320 ayat 4 KUHPer)',
    category: 'Contract',
    civilLawNuance: 'Syarat sahnya perjanjian ke-4 dalam Pasal 1320 KUHPerdata mensyaratkan "suatu sebab yang halal" (geoorloofde oorzaak) — yaitu isi dan tujuan kontrak tidak boleh bertentangan dengan undang-undang, kesusilaan, atau ketertiban umum.',
    commonLawNuance: 'Syarat mutlak di mana setiap janji harus dibeli dengan nilai ekonomis atau pengorbanan hak (detriment to promisee / benefit to promisor). Janji tanpa pertukaran nilai (gratuitous promise) tidak mengikat di pengadilan, kecuali dibuat dalam bentuk "Deed under seal".',
    whyContextMatters: 'Banyak mahasiswa mengira "Consideration" sama dengan "Kausa Halal". Padahal, hibah atau perjanjian sepihak bisa sah di Indonesia dengan akta notaris, sedangkan di Common Law hibah bukan kontrak sah tanpa deed.',
    exampleScenario: 'Dalam klausul pembuka kontrak Inggris selalu ada kalimat: "NOW THEREFORE, in consideration of the sum of $1.00 and other good and valuable consideration...". Ini dicantumkan demi memenuhi doktrin Consideration Common Law.'
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
