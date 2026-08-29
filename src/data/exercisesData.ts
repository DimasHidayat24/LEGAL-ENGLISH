import { ExerciseItem } from '../types';

export const practiceExercisesList: ExerciseItem[] = [
  {
    id: 'ex-1',
    type: 'drafting',
    title: 'Contractual Obligation Drafting (Shall vs May)',
    scenario: 'You are drafting an international sales agreement between an Indonesian coal exporter and a Japanese power utility company.',
    promptEn: 'The Buyer ______ pay the purchase price within thirty (30) days following receipt of the original Bill of Lading.',
    promptId: 'Pembeli ______ membayar harga pembelian dalam waktu tiga puluh (30) hari setelah menerima Konosemen (Bill of Lading) asli.',
    options: ['shall', 'hereby', 'whereas', 'therein'],
    correctIndex: 0,
    explanationEn: 'Correct! "Shall" is the mandatory modal verb used in contract drafting to impose a binding legal obligation upon a party.',
    explanationId: 'Benar! "Shall" adalah kata kerja modal yang tepat dalam perancangan kontrak untuk membebankan kewajiban hukum yang mengikat (wajib bayar) kepada subjek (The Buyer).',
    relatedTermId: 'shall'
  },
  {
    id: 'ex-2',
    type: 'vocabulary',
    title: 'Proviso and Hierarchy Markers',
    scenario: 'Resolving conflict between general limitation of liability and intellectual property warranties.',
    promptEn: '__________ anything to the contrary contained in this Agreement, neither party excludes liability for fraud or gross negligence.',
    promptId: '__________ ketentuan yang bertentangan dalam Perjanjian ini, tidak ada pihak yang mengecualikan tanggung jawab atas penipuan atau kelalaian berat.',
    options: ['Subject to', 'Notwithstanding', 'Pursuant to', 'In witness whereof'],
    correctIndex: 1,
    explanationEn: 'Correct! "Notwithstanding" acts as a supremacy clause that overrides any conflicting provisions elsewhere in the contract.',
    explanationId: 'Benar! "Notwithstanding" (mengesampingkan / terlepas dari) berfungsi sebagai klausul supremasi yang mengalahkan setiap ketentuan lain yang bertentangan.',
    relatedTermId: 'notwithstanding'
  },
  {
    id: 'ex-3',
    type: 'translation',
    title: 'Legal Translation: Wanprestasi in English Contracts',
    scenario: 'Translating a formal notice of dispute under Indonesian Civil Code Pasal 1243.',
    promptEn: 'How should the sentence "Kegagalan pemasok untuk menyerahkan peralatan tepat waktu merupakan wanprestasi material atas kontrak" be translated into professional Legal English?',
    promptId: 'Bagaimanakah terjemahan yang paling tepat dan profesional untuk kalimat hukum tersebut?',
    options: [
      'The failure of the supplier to deliver the equipment on time is an ordinary bad English mistake.',
      'The supplier’s failure to deliver the equipment on time constitutes a material breach of contract.',
      'The supplier’s late delivery shall be an ultra vires tort against the buyer.',
      'The delivery delay of the supplier makes a consideration voidable.'
    ],
    correctIndex: 1,
    explanationEn: 'Correct! "Constitutes a material breach of contract" is the standard, authoritative phrasing used in cross-border disputes.',
    explanationId: 'Benar! Frasa "constitutes a material breach of contract" adalah padanan baku hukum untuk "merupakan wanprestasi material atas kontrak".',
    relatedTermId: 'breach'
  },
  {
    id: 'ex-4',
    type: 'context',
    title: 'Understanding Pronominal Spatial Adverbs',
    scenario: 'Reviewing a software master services agreement with attached technical schedules.',
    promptEn: 'In the clause "The Parties agree to the Master Agreement and all Schedules attached ________", which spatial adverb must be used to mean "attached to it"?',
    promptId: 'Dalam klausul tersebut, kata keterangan manakah yang berarti "yang dilekatkan padanya / terhadapnya"?',
    options: ['thereof', 'therein', 'thereto', 'hereby'],
    correctIndex: 2,
    explanationEn: 'Correct! "Thereto" means "to that / to it", specifically used for attachments and schedules attached to a contract.',
    explanationId: 'Benar! "Thereto" berarti "to that" (padanya / terhadapnya), yang merupakan istilah baku untuk merujuk lampiran yang dilekatkan pada perjanjian pokok.',
    relatedTermId: 'thereto'
  },
  {
    id: 'ex-5',
    type: 'reading',
    title: 'Indemnity vs Damages Clause Comprehension',
    scenario: 'Reading an IP indemnity clause in a cross-border SaaS agreement.',
    promptEn: 'Read: "Licensor shall defend, indemnify, and hold harmless Licensee from any third-party patent claims." What is the legal effect of this wording?',
    promptId: 'Baca: "Licensor shall defend, indemnify, and hold harmless Licensee from any third-party patent claims." Apakah akibat hukum dari perumusan ini?',
    options: [
      'The Licensee must pay for the Licensor’s criminal defense.',
      'The Licensor must provide legal defense, compensate all monetary losses, and shield the Licensee from liability regarding third-party patent lawsuits.',
      'The contract is automatically terminated upon any patent complaint.',
      'The Licensee waives all rights to use the software.'
    ],
    correctIndex: 1,
    explanationEn: 'Correct! The tripartite formula "defend, indemnify, and hold harmless" imposes defense, reimbursement, and liability immunity.',
    explanationId: 'Benar! Formula tritunggal tersebut mewajibkan pemberi lisensi membela di pengadilan, membayar ganti rugi moneter, dan membebaskan penerima lisensi dari beban tanggung jawab.',
    relatedTermId: 'indemnity'
  },
  {
    id: 'ex-6',
    type: 'drafting',
    title: 'Discretionary Entitlement Clause (May vs Shall)',
    scenario: 'Drafting an optional early termination right for a commercial tenant.',
    promptEn: 'The Tenant ______ terminate this Lease upon giving sixty (60) days advance written notice to the Landlord.',
    promptId: 'Penyewa ______ mengakhiri Sewa ini dengan memberikan pemberitahuan tertulis enam puluh (60) hari sebelumnya kepada Pemilik.',
    options: ['shall', 'must', 'may', 'hereby'],
    correctIndex: 2,
    explanationEn: 'Correct! "May" expresses a discretionary right or option, meaning the Tenant has the choice to terminate but is not compelled to do so.',
    explanationId: 'Benar! "May" digunakan untuk memberikan hak fakultatif (opsi) di mana penyewa berhak mengakhiri tetapi tidak diwajibkan untuk melakukannya.',
    relatedTermId: 'may'
  },
  {
    id: 'ex-7',
    type: 'translation',
    title: 'Indonesian Legal Translation: Asas Kepastian Kontrak',
    scenario: 'Translating the principle of Pacta Sunt Servanda in an international investment dispute.',
    promptEn: 'Translate into Indonesian: "The arbitral tribunal upheld the doctrine of pacta sunt servanda, ruling that valid agreements are binding upon the parties as law."',
    promptId: 'Terjemahkan ke dalam bahasa Indonesia hukum yang tepat:',
    options: [
      'Majelis arbitrase menegakkan doktrin pacta sunt servanda, memutuskan bahwa perjanjian yang sah mengikat para pihak sebagaimana undang-undang.',
      'Majelis hakim menolak kontrak karena tidak ada kausa halal dari para pihak.',
      'Pengadilan negeri membatalkan putusan arbitrase karena melanggar ketertiban umum.',
      'Para pihak sepakat untuk mengubah perjanjian secara lisan di hadapan notaris.'
    ],
    correctIndex: 0,
    explanationEn: 'Correct! In Indonesian jurisprudence, Pacta Sunt Servanda is codified in Article 1338(1) KUHPerdata as agreements binding as law.',
    explanationId: 'Benar! Dalam hukum Indonesia, asas Pacta Sunt Servanda termaktub dalam Pasal 1338 ayat (1) KUHPerdata bahwa persetujuan yang sah berlaku sebagai undang-undang bagi mereka yang membuatnya.',
    relatedTermId: 'pacta-sunt-servanda'
  },
  {
    id: 'ex-8',
    type: 'vocabulary',
    title: 'Latin Maxims in Corporate Authority',
    scenario: 'Examining whether a CEO acted within their authorized powers under company bylaws.',
    promptEn: 'A corporate transaction executed by a director outside the scope of powers granted in the company’s Articles of Association is considered __________.',
    promptId: 'Transaksi korporasi yang dilakukan oleh seorang direktur di luar lingkup kewenangan Anggaran Dasar diklasifikasikan sebagai tindakan __________.',
    options: ['bona fide', 'ultra vires', 'prima facie', 'mutatis mutandis'],
    correctIndex: 1,
    explanationEn: 'Correct! "Ultra vires" means beyond the powers or outside the legal authority of a corporation or officer.',
    explanationId: 'Benar! "Ultra vires" berarti melampaui wewenang atau perbuatan di luar batas maksud dan tujuan yang diatur dalam Anggaran Dasar perseroan.',
    relatedTermId: 'ultra-vires'
  },
  {
    id: 'ex-9',
    type: 'context',
    title: 'Civil Procedure & Equitable Remedies',
    scenario: 'Seeking an emergency court order to halt trademark infringement.',
    promptEn: 'When monetary damages are inadequate to prevent ongoing irreparable harm, a commercial litigant will file a petition for an ________.',
    promptId: 'Ketika ganti rugi uang tidak memadai untuk mencegah kerugian yang tidak terpulihkan, pihak yang dirugikan akan memohon penetapan ________.',
    options: ['Injunction', 'Consideration', 'Affirmative Covenant', 'Ultra Vires'],
    correctIndex: 0,
    explanationEn: 'Correct! An Injunction is an equitable court order compelling a party to cease doing a harmful act.',
    explanationId: 'Benar! Injunction (Perintah Pengadilan / Penetapan Sela) adalah putusan ekuitas yang memerintahkan pihak lain untuk menghentikan suatu perbuatan yang merugikan.',
    relatedTermId: 'injunction'
  },
  {
    id: 'ex-10',
    type: 'drafting',
    title: 'Entire Agreement Boilerplate Completion',
    scenario: 'Drafting the integration clause of a share purchase contract.',
    promptEn: 'This Agreement constitutes the entire agreement between the Parties and supersedes all prior negotiations, understandings, and representations __________.',
    promptId: 'Perjanjian ini merupakan keseluruhan kesepakatan antara Para Pihak dan menggantikan seluruh negosiasi, kesepahaman, dan pernyataan __________.',
    options: ['thereto', 'relating thereto', 'hereby', 'therein'],
    correctIndex: 1,
    explanationEn: 'Correct! "Relating thereto" (relating to that / to this subject matter) accurately connects the prior representations to the agreement.',
    explanationId: 'Benar! "Relating thereto" (terkait dengan hal tersebut) adalah frasa drafting standar untuk merujuk pada hal yang berkaitan dengan pokok perjanjian.',
    relatedTermId: 'thereto'
  }
];
