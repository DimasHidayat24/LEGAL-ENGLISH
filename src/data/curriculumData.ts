import { CurriculumTopic } from '../types';

export const curriculumLessons: CurriculumTopic[] = [
  {
    id: 'lesson-pronominal-connectors',
    categoryId: 'foundation',
    title: 'The Pronominal Connectors: Hereby, Thereof, Therein & Thereto',
    titleId: 'Kata Penghubung Pronominal: Hereby, Thereof, Therein & Thereto',
    subtitle: 'Master the formal archaic spatial adverbs that define operative contractual language.',
    durationMinutes: 20,
    difficulty: 'Fundamental',
    overviewEn: 'One of the first hurdles Indonesian law students face in commercial contracts is deciphering pronominal compound adverbs (words formed with "here-" and "there-"). Rather than arbitrary legalese, these words function as precise spatial references to eliminate repetitive naming in binding agreements.',
    overviewId: 'Salah satu tantangan awal mahasiswa hukum Indonesia saat membaca kontrak bisnis internasional adalah memahami kata keterangan majemuk pronominal (kombinasi "here-" dan "there-"). Kata-kata ini bukan sekadar bahasa kuno tanpa makna, melainkan alat penunjuk rujukan yang presisi untuk menghindari pengulangan nama dokumen atau klausul.',
    coreConcepts: [
      {
        term: 'HEREBY',
        meaningId: 'Dengan ini / Melalui dokumen ini',
        legalFunction: 'Marks the exact moment of legal execution and operative declaration.',
        explanationEn: 'Combines "here" (this document) + "by" (by means of). It indicates that the legal consequence is happening right now through the execution of this written document.',
        explanationId: 'Gabungan dari "here" (dokumen ini) + "by" (melalui). Menegaskan bahwa perbuatan hukum tersebut terjadi seketika melalui penandatanganan dokumen ini.',
        authenticExample: 'The Licensor hereby grants to the Licensee an exclusive, non-transferable license.',
        indonesianTranslation: 'Pemberi Lisensi dengan ini memberikan lisensi eksklusif yang tidak dapat dialihkan kepada Penerima Lisensi.',
        draftingTip: 'Use "hereby" only in operative clauses that create instant legal effect, not in historical background narratives.'
      },
      {
        term: 'THEREOF',
        meaningId: 'Dari hal tersebut / Daripadanya / Terkait hal itu',
        legalFunction: 'Replaces "of that" or "of it" referring back to a previously identified noun or clause.',
        explanationEn: 'Derived from "there" (that thing/document) + "of". Used to refer to a part, provision, or consequence of a previously stated item.',
        explanationId: 'Berasal dari "there" (hal itu/dokumen itu) + "of". Dipakai untuk merujuk pada bagian, ketentuan, atau unsur dari hal yang baru saja disebut.',
        authenticExample: 'The Lessee shall maintain the Leased Premises and all fixtures and fittings thereof.',
        indonesianTranslation: 'Penyewa wajib memelihara Tempat Sewa beserta seluruh perabotan dan perlengkapan daripadanya.',
        draftingTip: 'Ensure the antecedent noun is crystal clear so there is no dispute over what "thereof" refers to.'
      },
      {
        term: 'THEREIN',
        meaningId: 'Di dalamnya / Termaktub di dalamnya',
        legalFunction: 'Replaces "in that place, document, or clause".',
        explanationEn: 'Derived from "there" + "in". Pinpoints provisions, declarations, or schedules contained inside a previously cited document.',
        explanationId: 'Berasal dari "there" + "in". Merujuk langsung pada ketentuan atau lampiran yang tercantum di dalam suatu dokumen tertentu.',
        authenticExample: 'The Buyer has inspected Schedule C and agrees to the pricing models specified therein.',
        indonesianTranslation: 'Pembeli telah memeriksa Lampiran C dan menyetujui model penetapan harga yang ditentukan di dalamnya.',
        draftingTip: 'Use "therein" when pointing to tables, annexes, or clauses inside a separate document.'
      },
      {
        term: 'THERETO',
        meaningId: 'Terhadapnya / Padanya / Berkaitan dengannya',
        legalFunction: 'Replaces "to that thing or document", frequently used for attachments or parties.',
        explanationEn: 'Derived from "there" + "to". Commonly applied when discussing schedules attached to a contract or signatories bound to an agreement.',
        explanationId: 'Berasal dari "there" + "to". Sering digunakan saat menyebut lampiran yang dilekatkan pada perjanjian pokok atau pihak yang terikat pada kontrak.',
        authenticExample: 'This Agreement and all amendments thereto shall constitute the entire understanding between the Parties.',
        indonesianTranslation: 'Perjanjian ini beserta seluruh perubahannya merupakan keseluruhan kesepahaman antara Para Pihak.',
        draftingTip: 'Pair "thereto" with schedules, exhibits, and subsequent addenda.'
      }
    ],
    comparativeLawNote: {
      indonesianTerm: 'Dengan ini / daripadanya / di dalamnya / padanya',
      englishTerm: 'Hereby / Thereof / Therein / Thereto',
      distinction: 'Dalam bahasa hukum Indonesia (KUHPerdata dan akta notaris), kita menggunakan "dengan ini menyatakan", "beserta segala turunan daripadanya", dan "sebagaimana termaktub di dalamnya". Pola pronominal Inggris mencerminkan tradisi hukum perancangan yang sama.'
    },
    sampleExcerpt: {
      title: 'Commercial Supply Master Clause Excerpt',
      text: 'The Supplier hereby agrees to deliver the industrial units and all spare components thereof in accordance with the specifications set forth in Exhibit A attached thereto, and warrants that all representations contained therein remain true.',
      translationId: 'Pemasok dengan ini setuju untuk menyerahkan unit industri beserta seluruh komponen cadangan daripadanya sesuai dengan spesifikasi yang ditetapkan dalam Lampiran A yang dilekatkan padanya, dan menjamin bahwa seluruh pernyataan yang termaktub di dalamnya tetap benar.'
    },
    checkExercise: {
      questionEn: 'Choose the correct word: "The Tenant shall repair the roof of the building and any damages resulting from leaks ________."',
      questionId: 'Pilih kata yang tepat: "The Tenant shall repair the roof of the building and any damages resulting from leaks ________."',
      options: ['thereof', 'hereby', 'therein', 'thereto'],
      correctIndex: 0,
      explanationId: 'Jawaban yang tepat adalah "thereof" (dari hal tersebut / daripadanya), karena merujuk pada "kebocoran dari atap bangunan tersebut" (leaks of that / of it).'
    }
  },
  {
    id: 'lesson-shall-may-must',
    categoryId: 'foundation',
    title: 'Contractual Verbs: The Strict Architecture of Shall, May, and Must',
    titleId: 'Kata Kerja Kontraktual: Arsitektur Ketat Shall, May, dan Must',
    subtitle: 'Why a misplaced "shall" can cost millions in dispute resolution.',
    durationMinutes: 25,
    difficulty: 'Fundamental',
    overviewEn: 'In ordinary English, "shall" is rarely spoken. In contract drafting, however, "shall" is the most powerful modal verb, imposing a mandatory legal covenant on the subject. Misusing "shall" for declarations or definitions is one of the most common mistakes among Indonesian law students.',
    overviewId: 'Dalam bahasa Inggris umum sehari-hari, kata "shall" jarang digunakan. Namun dalam perancangan kontrak, "shall" adalah kata kerja paling kuat untuk membebankan kewajiban hukum (mandatory obligation). Kesalahan fatal mahasiswa hukum adalah menggunakan "shall" untuk menyatakan fakta atau definisi.',
    coreConcepts: [
      {
        term: 'SHALL (Mandatory Obligation)',
        meaningId: 'Wajib / Harus (Kewajiban Mengikat)',
        legalFunction: 'Imposes a strict duty of performance on a human or legal entity.',
        explanationEn: 'Only use "shall" when the subject of the sentence has an obligation to do something. Never use shall for definitions.',
        explanationId: 'Hanya gunakan "shall" jika subjek kalimat memikul kewajiban aktif. Jangan gunakan shall untuk mendefinisikan istilah ("The term shall mean... ❌ -> means ✅").',
        authenticExample: 'The Borrower shall repay the Principal Amount in four equal installments.',
        indonesianTranslation: 'Peminjam wajib membayar kembali Jumlah Pokok Pinjaman dalam empat kali angsuran berkala yang sama besarnya.',
        draftingTip: 'Test rule: Can you substitute "has a duty to"? If yes, "shall" is correct.'
      },
      {
        term: 'MAY (Discretionary Right)',
        meaningId: 'Dapat / Berhak (Hak Fakultatif / Opsi)',
        legalFunction: 'Grants permission or an optional entitlement without compulsion.',
        explanationEn: 'Gives the party the liberty or discretion to take an action, but failure to act does not constitute a breach.',
        explanationId: 'Memberikan hak atau keleluasaan kepada suatu pihak untuk melakukan suatu tindakan, tanpa ada sanksi wanprestasi jika tidak dilakukan.',
        authenticExample: 'The Landlord may enter the premises upon giving twenty-four (24) hours written notice.',
        indonesianTranslation: 'Pemilik Sewa dapat memasuki lokasi setelah memberikan pemberitahuan tertulis dua puluh empat (24) jam sebelumnya.',
        draftingTip: 'Use "may not" or "shall not" for prohibitions ("shall not" = dilarang keras).'
      },
      {
        term: 'MUST (Condition Precedent)',
        meaningId: 'Harus / Wajib sebagai Syarat Keabsahan',
        legalFunction: 'Imposes an indispensable prerequisite or condition for a right to take effect.',
        explanationEn: 'Often preferred for procedural conditions or third-party states of affairs where direct action is required.',
        explanationId: 'Digunakan untuk menetapkan syarat mutlak (syarat tangguh) yang harus terpenuhi agar suatu hak timbul.',
        authenticExample: 'To be valid, any notice of termination must be in writing and signed by an authorized director.',
        indonesianTranslation: 'Agar sah, setiap pemberitahuan pemutusan harus dibuat secara tertulis dan ditandatangani oleh direktur yang berwenang.',
        draftingTip: 'Use "must" for inanimate conditions: "Notices must be in writing", not "Notices shall be in writing".'
      }
    ],
    comparativeLawNote: {
      indonesianTerm: 'Wajib (Shall) vs Dapat (May) vs Harus Memenuhi Syarat (Must)',
      englishTerm: 'Shall vs May vs Must',
      distinction: 'Dalam KUHPerdata Pasal 1234, perikatan adalah untuk memberikan sesuatu, berbuat sesuatu, atau tidak berbuat sesuatu. "Shall" membebankan perikatan berbuat sesuatu, "Shall not" tidak berbuat sesuatu, dan "May" adalah hak opsi.'
    },
    sampleExcerpt: {
      title: 'Payment & Termination Clause Architecture',
      text: 'The Purchaser shall remit the Escrow Amount to the Bank within three days. If the Seller fails to deliver the Title Deeds, the Purchaser may terminate this Agreement immediately; provided that any notice of termination must be served via registered courier.',
      translationId: 'Pembeli wajib menyetorkan Dana Escrow ke Bank dalam waktu tiga hari. Apabila Penjual gagal menyerahkan Sertifikat Hak Milik, Pembeli dapat mengakhiri Perjanjian ini seketika; dengan ketentuan bahwa setiap surat pemberitahuan pemutusan harus disampaikan melalui kurir tercatat.'
    },
    checkExercise: {
      questionEn: 'Which sentence correctly drafts a corporate definition in modern legal drafting?',
      questionId: 'Manakah kalimat yang tepat untuk merumuskan definisi perseroan dalam legal drafting modern?',
      options: [
        '"Company" shall mean PT Maju Bersama.',
        '"Company" means PT Maju Bersama.',
        '"Company" may mean PT Maju Bersama.',
        '"Company" must mean PT Maju Bersama.'
      ],
      correctIndex: 1,
      explanationId: 'Gunakan bentuk waktu sekarang "means" untuk definisi. "Shall mean" adalah kesalahan legalese lama karena definisi bukanlah kewajiban yang dapat diingkari/wanprestasi.'
    }
  },
  {
    id: 'lesson-indemnity-hold-harmless',
    categoryId: 'documents',
    title: 'Deconstructing Indemnity and "Hold Harmless" Clauses',
    titleId: 'Membedah Klausul Indemnity dan "Hold Harmless"',
    subtitle: 'Understanding direct risk allocation versus ordinary breach of contract damages.',
    durationMinutes: 30,
    difficulty: 'Intermediate',
    overviewEn: 'Indemnity clauses are among the most heavily negotiated provisions in international M&A, procurement, and commercial agreements. Indonesian law students often mistakenly treat "indemnity" as identical to "ganti rugi perdata biasa" (damages). In reality, indemnity creates an independent primary debt obligation.',
    overviewId: 'Klausul indemnitas adalah salah satu pasal yang paling alot dinegosiasikan dalam transaksi M&A dan kontrak internasional. Mahasiswa hukum sering mengira indemnity sama persis dengan tuntutan ganti rugi wanprestasi biasa. Faktanya, indemnity adalah perikatan primer untuk menanggung risiko secara langsung.',
    coreConcepts: [
      {
        term: 'DEFEND',
        meaningId: 'Membela / Menanggung Biaya Bantuan Hukum',
        legalFunction: 'Requires the promisor to hire legal counsel and defend lawsuits filed by third parties.',
        explanationEn: 'The obligation to step into the litigation and pay legal representation costs from day one of a lawsuit.',
        explanationId: 'Kewajiban untuk menunjuk advokat dan menanggung seluruh ongkos pembelaan perkara jika ada pihak ketiga yang menggugat.',
        authenticExample: 'The Contractor shall defend the Owner in any patent infringement proceedings.',
        indonesianTranslation: 'Kontraktor wajib membela Pemilik Proyek dalam setiap proses persidangan pelanggaran paten.',
        draftingTip: 'Ensure defense rights give the indemnifier the right to manage settlement negotiations with consent.'
      },
      {
        term: 'INDEMNIFY',
        meaningId: 'Memberikan Ganti Rugi Finansial Penuh (Pound-for-Pound)',
        legalFunction: 'Primary obligation to compensate for specific economic losses or third-party liabilities.',
        explanationEn: 'Unlike ordinary breach damages which require proof of causation, foreseeability, and mitigation, an indemnity is payable as a debt.',
        explanationId: 'Berbeda dengan ganti rugi wanprestasi biasa yang menuntut pembuktian hubungan sebab-akibat (causation) dan mitigasi kerugian, ganti rugi indemnity ditagih sebagai utang pasti.',
        authenticExample: 'The Vendor shall indemnify the Buyer against all pre-closing environmental penalties.',
        indonesianTranslation: 'Penjual wajib mengganti rugi Pembeli atas seluruh denda lingkungan hidup sebelum penutupan transaksi.',
        draftingTip: 'Always check if indemnity is capped under the Limitation of Liability clause.'
      },
      {
        term: 'HOLD HARMLESS',
        meaningId: 'Membebaskan dari Beban Tanggung Jawab Hukum',
        legalFunction: 'Exonerates and shields the protected party from liability.',
        explanationEn: 'An express covenant not to sue the protected party and to insulate them from legal exposure.',
        explanationId: 'Janji tegas untuk tidak menuntut pihak yang dilindungi dan membebaskannya dari setiap beban pertanggungjawaban yuridis.',
        authenticExample: 'The Client agrees to hold harmless the Advisory Firm from third-party investor claims.',
        indonesianTranslation: 'Klien setuju untuk membebaskan Kantor Penasihat dari tuntutan investor pihak ketiga.',
        draftingTip: 'Commonly paired as the historic tripartite formula: "defend, indemnify, and hold harmless".'
      }
    ],
    comparativeLawNote: {
      indonesianTerm: 'Ganti Rugi (Damages / Pasal 1243 KUHPer) vs Vrijwaring / Jaminan Bebas Tuntutan (Indemnity)',
      englishTerm: 'Damages vs Indemnity',
      distinction: 'Dalam hukum perdata Indonesia, ganti rugi wanprestasi menuntut adanya kelalaian/ingkar janji dan somasi. Dalam klausul Indemnity gaya Anglo-Saxon, kewajiban membayar timbul seketika begitu kerugian terwujud, terlepas dari apakah ada kesalahan subjektif.'
    },
    sampleExcerpt: {
      title: 'Full Intellectual Property Indemnity Formulation',
      text: 'Supplier shall defend, indemnify, and hold harmless Customer and its officers, directors, and agents against any and all claims, liabilities, losses, damages, and expenses (including reasonable attorneys’ fees) arising out of any claim that the Deliverables infringe any patent, copyright, or trademark.',
      translationId: 'Pemasok wajib membela, mengganti rugi, dan membebaskan Pelanggan beserta para pejabat, direktur, dan agennya dari dan terhadap setiap dan seluruh klaim, liabilitas, kerugian, ganti kerugian, dan pengeluaran (termasuk biaya advokat yang wajar) yang timbul dari klaim bahwa Hasil Kerja melanggar paten, hak cipta, atau merek dagang.'
    },
    checkExercise: {
      questionEn: 'What is the primary advantage of an "Indemnity" claim over a standard "Breach of Contract Damages" claim in cross-border law?',
      questionId: 'Apa keunggulan utama klaim "Indemnity" dibandingkan klaim ganti rugi wanprestasi standar dalam hukum lintas batas?',
      options: [
        'An indemnity requires criminal proceedings first.',
        'An indemnity is recoverable as a direct debt without proving foreseeability or strict duty to mitigate in the same manner as common law damages.',
        'An indemnity can only be granted by the Supreme Court of Indonesia.',
        'An indemnity applies only to physical property damage.'
      ],
      correctIndex: 1,
      explanationId: 'Indemnity ditagih sebagai utang pasti (action for debt) sehingga pihak yang dirugikan tidak terbebani aturan ketat pembuktian perkiraan kerugian (foreseeability) sebagaimana ganti rugi wanprestasi biasa.'
    }
  },
  {
    id: 'lesson-latin-legal-maxims',
    categoryId: 'foundation',
    title: 'Essential Latin Maxims in International Legal Practice',
    titleId: 'Maksim Latin Esensial dalam Praktik Hukum Internasional',
    subtitle: 'From Pacta Sunt Servanda to Mutatis Mutandis and Ultra Vires.',
    durationMinutes: 25,
    difficulty: 'Intermediate',
    overviewEn: 'Latin maxims are not relics of the past; they form the universal shorthand of international arbitration, commercial litigation, and civil law jurisprudence. Understanding their exact doctrinal weight is essential for any aspiring transnational lawyer.',
    overviewId: 'Pepatah hukum Latin bukanlah barang kuno yang usang, melainkan bahasa universal para arbiter internasional, hakim, dan konsultan hukum korporasi. Memahami bobot doktrinnya sangat penting bagi mahasiswa hukum.',
    coreConcepts: [
      {
        term: 'PACTA SUNT SERVANDA',
        meaningId: 'Perjanjian Mengikat Sebagai Undang-Undang',
        legalFunction: 'The bedrock foundation of treaty compliance and commercial contract sanctity.',
        explanationEn: 'Affirms that agreements lawfully entered into are strictly binding and must be performed in good faith.',
        explanationId: 'Menegaskan bahwa perjanjian yang dibuat secara sah berlaku mengikat mutlak layaknya undang-undang (Pasal 1338 ayat 1 KUHPerdata).',
        authenticExample: 'The tribunal reaffirmed pacta sunt servanda, holding the state liable for canceling the energy concession.',
        indonesianTranslation: 'Majelis arbitrase menegaskan kembali asas pacta sunt servanda, menyatakan negara bertanggung jawab atas pembatalan konsesi energi.',
        draftingTip: 'Cited in dispute submissions to counter unilateral contract modifications.'
      },
      {
        term: 'ULTRA VIRES',
        meaningId: 'Melampaui Batas Kewenangan yang Sah',
        legalFunction: 'Invalidates acts performed beyond the scope of corporate or statutory authority.',
        explanationEn: 'Used in corporate law when directors enter contracts outside the company’s stated object in its Articles of Association.',
        explanationId: 'Digunakan dalam hukum perseroan saat direksi melakukan perbuatan hukum yang melampaui maksud dan tujuan dalam Anggaran Dasar.',
        authenticExample: 'The guarantee issued by the CEO was held ultra vires due to absence of board approval.',
        indonesianTranslation: 'Jaminan yang diterbitkan oleh CEO dinyatakan melampaui kewenangan (ultra vires) karena ketiadaan persetujuan dewan komisaris/direksi.',
        draftingTip: 'Include representations in agreements that the signer has full power and authority (not ultra vires).'
      },
      {
        term: 'MUTATIS MUTANDIS',
        meaningId: 'Berlaku Sama Dengan Perubahan-Perubahan yang Diperlukan',
        legalFunction: 'Incorporates rules from one section to another with necessary contextual adjustments.',
        explanationEn: 'Saves drafting space by applying existing dispute or notice procedures to supplementary schedules without re-writing.',
        explanationId: 'Menerapkan pasal yang ada pada dokumen/jadwal tambahan dengan penyesuaian teknis yang diperlukan tanpa harus menulis ulang.',
        authenticExample: 'The provisions of Clause 18 shall apply mutatis mutandis to all Sub-Contracts.',
        indonesianTranslation: 'Ketentuan Pasal 18 berlaku secara mutatis mutandis terhadap seluruh Perjanjian Sub-Kontrak.',
        draftingTip: 'Use when drafting addenda, sub-leases, or side letters.'
      }
    ],
    sampleExcerpt: {
      title: 'Corporate Guarantee Authorization Excerpt',
      text: 'The Guarantor warrants that the execution, delivery, and performance of this Deed is within its corporate capacity and does not violate any law or its Articles of Association, and is in no manner ultra vires.',
      translationId: 'Penjamin menjamin bahwa penandatanganan, penyerahan, dan pelaksanaan Akta ini berada dalam kapasitas badan hukumnya dan tidak melanggar undang-undang atau Anggaran Dasarnya, serta sama sekali bukan merupakan perbuatan yang melampaui wewenang (ultra vires).'
    },
    checkExercise: {
      questionEn: 'If a provision states: "Clause 7 (Arbitration) shall apply mutatis mutandis to the Escrow Agreement", what does this mean in Indonesian legal practice?',
      questionId: 'Jika klausul menyatakan: "Clause 7 (Arbitration) shall apply mutatis mutandis to the Escrow Agreement", apa artinya dalam praktik hukum Indonesia?',
      options: [
        'Klausul arbitrase dibatalkan demi hukum.',
        'Klausul arbitrase Pasal 7 berlaku terhadap Perjanjian Escrow dengan penyesuaian istilah yang diperlukan.',
        'Perjanjian Escrow harus diadili di pengadilan negeri.',
        'Kedua pihak harus membuat kontrak baru dari awal.'
      ],
      correctIndex: 1,
      explanationId: 'Mutatis mutandis berarti ketentuan tersebut diberlakukan terhadap dokumen kedua dengan penyesuaian yang relevan (misal mengganti nama pihak menjadi Pihak Escrow).'
    }
  },
  {
    id: 'lesson-contract-boilerplate',
    categoryId: 'documents',
    title: 'Anatomy of Boilerplate Clauses: Severability, Entire Agreement, and Notices',
    titleId: 'Anatomi Klausul Standar (Boilerplate): Severability, Entire Agreement, dan Notices',
    subtitle: 'Why the back end of every contract protects against catastrophic disputes.',
    durationMinutes: 25,
    difficulty: 'Fundamental',
    overviewEn: 'Often dismissed as "standard legalese", boilerplate clauses located at the end of agreements govern the interpretation, survival, and enforcement of all preceding operative covenants.',
    overviewId: 'Sering disepelekan sebagai "klausul formalitas belaka", klausul boilerplate di bagian akhir kontrak sejatinya mengatur cara penafsiran, keberlakuan jangka panjang, dan eksekusi seluruh isi perjanjian.',
    coreConcepts: [
      {
        term: 'ENTIRE AGREEMENT (Merger Clause)',
        meaningId: 'Keseluruhan Perjanjian / Klausul Penggabungan',
        legalFunction: 'Excludes all prior oral discussions, emails, drafts, and representations not written in the final contract.',
        explanationEn: 'Invokes the Parol Evidence Rule, preventing parties from introducing past email negotiations to contradict the signed document.',
        explanationId: 'Mengesampingkan seluruh perundingan lisan, surat menyurat, atau draft sebelumnya agar hanya dokumen tertulis final ini yang mengikat.',
        authenticExample: 'This Agreement supersedes all prior negotiations and agreements between the Parties.',
        indonesianTranslation: 'Perjanjian ini menggantikan seluruh negosiasi dan kesepakatan terdahulu antara Para Pihak.',
        draftingTip: 'Crucial for preventing claims based on preliminary negotiation chatter or MoU promises.'
      },
      {
        term: 'SEVERABILITY',
        meaningId: 'Klausul Keterpisahan',
        legalFunction: 'Ensures the contract survives if a court strikes down one illegal clause.',
        explanationEn: 'If a non-compete clause or penalty interest rate is declared void by a judge, the rest of the contract stays in full force.',
        explanationId: 'Menyelamatkan keabsahan sisa perjanjian apabila salah satu pasal dinyatakan batal demi hukum oleh pengadilan.',
        authenticExample: 'The invalidity of any provision shall not affect the remaining provisions hereof.',
        indonesianTranslation: 'Ketidakabsahan suatu ketentuan tidak akan mempengaruhi ketentuan-ketentuan lain dalam perjanjian ini.',
        draftingTip: 'Add an obligation to negotiate a valid replacement clause with equivalent commercial intent.'
      }
    ],
    sampleExcerpt: {
      title: 'Standard Master Boilerplate Provision',
      text: 'This Agreement constitutes the entire agreement between the Parties with respect to its subject matter and supersedes all prior representations. If any provision is deemed void by a court of competent jurisdiction, such provision shall be severed without invalidating the remainder.',
      translationId: 'Perjanjian ini merupakan keseluruhan kesepakatan antara Para Pihak sehubungan dengan pokok perkaranya dan menggantikan seluruh pernyataan terdahulu. Apabila suatu ketentuan dianggap batal oleh pengadilan yang berwenang, ketentuan tersebut akan dipisahkan tanpa membatalkan sisa perjanjian.'
    },
    checkExercise: {
      questionEn: 'Why do corporate lawyers insert an "Entire Agreement" clause into an asset purchase contract?',
      questionId: 'Mengapa pengacara korporasi mencantumkan klausul "Entire Agreement" dalam kontrak pembelian aset?',
      options: [
        'To allow parties to negotiate more terms verbally.',
        'To prevent the other party from claiming that prior verbal promises or emails form part of the binding agreement.',
        'To automatically double the purchase price.',
        'To submit the contract to international human rights courts.'
      ],
      correctIndex: 1,
      explanationId: 'Klausul Entire Agreement membatasi hak para pihak agar tidak dapat mendalilkan janji-janji lisan atau korespondensi email pra-kontrak di luar akta tertulis.'
    }
  },
  {
    id: 'lesson-litigation-courtroom',
    categoryId: 'practical',
    title: 'Litigation Vocabulary: Pleadings, Injunctions, and Burden of Proof',
    titleId: 'Kosakata Litigasi: Gugatan, Jawaban, Injunksi, dan Beban Pembuktian',
    subtitle: 'Navigate court filings, evidentiary standards, and interlocutory relief in English.',
    durationMinutes: 30,
    difficulty: 'Intermediate',
    overviewEn: 'International commercial dispute resolution requires fluency in litigation terminology. Learn how common law court stages (Statement of Claim, Defense, Discovery, Summary Judgment) compare with Indonesian civil procedure (Gugatan, Jawaban, Replik, Duplik, Pembuktian, Kesimpulan).',
    overviewId: 'Penyelesaian sengketa bisnis internasional membutuhkan kefasihan dalam kosakata litigasi pengadilan. Pelajari perbandingan tahapan persidangan common law dengan hukum acara perdata Indonesia (HIR/RBg).',
    coreConcepts: [
      {
        term: 'PLEADINGS',
        meaningId: 'Surat-Surat Berkas Perkara / Surat Gugatan dan Jawaban',
        legalFunction: 'The formal written statements of the facts and claims submitted to the court.',
        explanationEn: 'Encompasses the Plaintiff’s Statement of Claim (Gugatan), Defendant’s Defense and Counterclaim (Jawaban & Rekonvensi), and Reply (Replik).',
        explanationId: 'Kumpulan berkas tertulis formal yang diajukan ke persidangan yang memuat dalil gugatan, sangkalan, dan eksepsi.',
        authenticExample: 'The judge ordered both parties to close the pleadings and proceed to witness discovery.',
        indonesianTranslation: 'Hakim memerintahkan kedua belah pihak untuk menutup tahap berkas gugatan-jawaban dan melanjutkan ke pemeriksaan saksi.',
        draftingTip: 'Pleadings must state facts, not legal arguments.'
      },
      {
        term: 'SUMMARY JUDGMENT',
        meaningId: 'Putusan Cepat Tanpa Sidang Pembuktian Penuh',
        legalFunction: 'A judgment entered by a court for one party without a full trial because there is no genuine dispute of material fact.',
        explanationEn: 'Allows a claimant with overwhelming written proof (like an unpaid promissory note) to obtain immediate judgment without months of oral witness testimony.',
        explanationId: 'Putusan yang dijatuhkan hakim secara cepat tanpa menggelar persidangan pembuktian panjang karena faktanya sudah sangat jelas dan tidak ada bantahan material yang sah.',
        authenticExample: 'The bank applied for summary judgment against the defaulting borrower.',
        indonesianTranslation: 'Pihak bank mengajukan permohonan putusan cepat (summary judgment) terhadap debitur yang macet.',
        draftingTip: 'Used in debt recovery litigation when defendant has no viable defense.'
      }
    ],
    sampleExcerpt: {
      title: 'High Court Civil Order Excerpt',
      text: 'Upon hearing counsel for the Plaintiff and the Defendant, IT IS ORDERED that the Defendant’s defense be struck out, and Summary Judgment be entered in favor of the Plaintiff for the claimed debt plus statutory interest.',
      translationId: 'Setelah mendengarkan penasihat hukum Penggugat dan Tergugat, DIPERINTAHKAN bahwa pembelaan Tergugat dicoret, dan Putusan Cepat (Summary Judgment) dijatuhkan untuk kemenangan Penggugat atas jumlah utang yang dituntut ditambah bunga menurut undang-undang.'
    },
    checkExercise: {
      questionEn: 'In Indonesian Civil Procedure, the equivalent of a "Statement of Claim" filed by the Plaintiff is:',
      questionId: 'Dalam Hukum Acara Perdata Indonesia, padanan dari "Statement of Claim" yang diajukan oleh Plaintiff adalah:',
      options: ['Surat Duplik', 'Surat Gugatan', 'Memori Kasasi', 'Eksepsi Kompetensi'],
      correctIndex: 1,
      explanationId: 'Statement of Claim adalah surat gugatan resmi yang diajukan oleh penggugat untuk mendalilkan posita dan petitumnya.'
    }
  },
  {
    id: 'lesson-case-briefing-irac',
    categoryId: 'practical',
    title: 'Case Briefing and Legal Analysis Using the IRAC Method',
    titleId: 'Menganalisis Putusan Hukum Menggunakan Metode IRAC',
    subtitle: 'Issue, Rule, Application, and Conclusion: The gold standard of legal reasoning.',
    durationMinutes: 30,
    difficulty: 'Intermediate',
    overviewEn: 'The IRAC framework (Issue, Rule, Application, Conclusion) is the universal structure used in common-law legal education, judicial reasoning, and international law firm advisory memoranda. Indonesian law students can dramatically elevate their legal writing by mastering IRAC.',
    overviewId: 'Metode IRAC (Issue, Rule, Application, Conclusion) adalah standar emas analisis hukum yang digunakan di fakultas hukum global dan kantor hukum internasional. Memahami IRAC membantu mahasiswa menyusun argumen hukum yang runtut dan meyakinkan.',
    coreConcepts: [
      {
        term: 'ISSUE (Question Presented)',
        meaningId: 'Pokok Masalah Hukum / Masalah yang Harus Dijawab',
        legalFunction: 'Identifies the precise legal question that the court or counsel must resolve.',
        explanationEn: 'Framed concisely: "Whether a party can terminate a supply contract without formal cure notice when a material breach has occurred?"',
        explanationId: 'Pertanyaan hukum yang terfokus dan tajam mengenai penerapan aturan hukum terhadap fakta spesifik.',
        authenticExample: 'The threshold issue is whether the indemnity clause covers gross negligence.',
        indonesianTranslation: 'Pokok masalah utamanya adalah apakah klausul indemnitas mencakup kelalaian berat.',
        draftingTip: 'Start with "Whether..." followed by the specific facts and legal rule.'
      },
      {
        term: 'RULE (Governing Principle)',
        meaningId: 'Aturan / Dasar Hukum yang Mengatur',
        legalFunction: 'States the relevant statutory articles, case law precedents, or contractual provisions.',
        explanationEn: 'Cites the positive law or leading precedent establishing the test that must be applied.',
        explanationId: 'Menyebutkan pasal perundang-undangan, preseden putusan mahkamah, atau doktrin hukum yang menjadi tolok ukur.',
        authenticExample: 'Under Article 1243 of the Indonesian Civil Code, damages require a prior default notice (somasi).',
        indonesianTranslation: 'Berdasarkan Pasal 1243 KUHPerdata, penuntutan ganti rugi mensyaratkan adanya somasi keterlambatan terlebih dahulu.',
        draftingTip: 'Keep the rule abstract and objective before applying it to the facts.'
      },
      {
        term: 'APPLICATION / ANALYSIS',
        meaningId: 'Penerapan Hukum / Analisis Fakta',
        legalFunction: 'The heart of legal reasoning: applying the legal rule directly to the concrete facts.',
        explanationEn: 'Matches each element of the rule to the factual evidence of the case.',
        explanationId: 'Mencocokkan setiap unsur dalam pasal hukum dengan alat bukti dan fakta konkret yang terjadi.',
        authenticExample: 'Here, the Seller failed to deliver for 45 days, thereby exceeding the 30-day cure window.',
        indonesianTranslation: 'Dalam kasus ini, Penjual tidak melakukan penyerahan selama 45 hari, sehingga melampaui tenggang waktu perbaikan 30 hari.',
        draftingTip: 'Use transitional anchor words like "Here,", "In the present case,", "Applying this test,".'
      },
      {
        term: 'CONCLUSION',
        meaningId: 'Kesimpulan Yuridis',
        legalFunction: 'Gives the definitive legal outcome or recommendation.',
        explanationEn: 'Answers the original Issue question with precision based on the analysis.',
        explanationId: 'Menjawab pokok masalah awal secara tegas dan memberikan rekomendasi tindakan hukum.',
        authenticExample: 'Therefore, the Purchaser is entitled to terminate the contract and claim liquidated damages.',
        indonesianTranslation: 'Oleh karena itu, Pembeli berhak mengakhiri kontrak dan menuntut ganti rugi yang telah disepakati.',
        draftingTip: 'Never introduce new facts or rules in the conclusion.'
      }
    ],
    sampleExcerpt: {
      title: 'Sample IRAC Legal Memorandum Paragraph',
      text: 'ISSUE: Whether the Contractor is liable for delay liquidated damages where severe weather impeded crane operations. RULE: Under Clause 8.4, liquidated damages accrue unless the contractor serves a Force Majeure notice within 7 days. APPLICATION: Here, the Contractor encountered gale-force winds on October 12, but failed to deliver written notice until October 29 (17 days later). CONCLUSION: Because timely notice is an express condition precedent, the Contractor remains liable for USD 150,000 in liquidated damages.',
      translationId: 'MASALAH: Apakah Kontraktor bertanggung jawab atas denda keterlambatan saat cuaca buruk menghalangi operasi crane. ATURAN: Berdasarkan Klausul 8.4, denda berjalan kecuali kontraktor mengirimkan notis Keadaan Kahar dalam 7 hari. PENERAPAN: Dalam kasus ini, Kontraktor mengalami angin kencang pada 12 Oktober, namun baru mengirimkan notis tertulis pada 29 Oktober (17 hari kemudian). KESIMPULAN: Karena pemberitahuan tepat waktu merupakan syarat mutlak, Kontraktor tetap bertanggung jawab membayar denda USD 150.000.'
    },
    checkExercise: {
      questionEn: 'In the IRAC methodology, which section contains the explanation of how specific evidence matches the elements of a statute?',
      questionId: 'Dalam metode IRAC, bagian manakah yang memuat penjelasan tentang bagaimana bukti konkret mencocokkan unsur-unsur dalam pasal perundang-undangan?',
      options: ['Issue', 'Rule', 'Application / Analysis', 'Conclusion'],
      correctIndex: 2,
      explanationId: 'Bagian Application / Analysis adalah inti dari penalaran hukum tempat kita menerapkan kaidah hukum pada fakta konkret.'
    }
  },
  {
    id: 'lesson-international-arbitration',
    categoryId: 'advanced',
    title: 'International Commercial Arbitration: Drafting Enforceable Clauses',
    titleId: 'Arbitrase Komersial Internasional: Merancang Klausul yang Dapat Dieksekusi',
    subtitle: 'Seat of arbitration, institutional rules, and the New York Convention 1958.',
    durationMinutes: 35,
    difficulty: 'Advanced',
    overviewEn: 'International arbitration is the default dispute resolution mechanism for cross-border investments in Southeast Asia. Learn the vocabulary of arbitration agreements, pathological clauses to avoid, and the enforcement of foreign arbitral awards in Indonesia under the New York Convention.',
    overviewId: 'Arbitrase internasional adalah mekanisme penyelesaian sengketa utama untuk investasi asing di Indonesia. Pelajari kosakata perjanjian arbitrase, cara menghindari "pathological clauses" (klausul cacat), serta eksekusi putusan arbitrase asing di Indonesia (Pengadilan Negeri Jakarta Pusat).',
    coreConcepts: [
      {
        term: 'SEAT OF ARBITRATION (Lex Arbitri)',
        meaningId: 'Tempat Kedudukan Hukum Arbitrase',
        legalFunction: 'Determines the procedural law governing the arbitration and which national court has supervisory jurisdiction.',
        explanationEn: 'The "Seat" is a legal concept, not merely the physical hearing room. Choosing Singapore or London as the seat means Singapore or English arbitration law governs procedure.',
        explanationId: 'Seat bukan sekadar lokasi fisik ruang sidang, melainkan domisili hukum yang menentukan pengadilan mana yang berwenang mengawasi arbitrase dan membatalkan putusan.',
        authenticExample: 'The seat of arbitration shall be Singapore, and the proceedings shall be conducted in English.',
        indonesianTranslation: 'Tempat kedudukan hukum arbitrase adalah Singapura, dan persidangan diselenggarakan dalam bahasa Inggris.',
        draftingTip: 'Never omit the seat of arbitration; doing so causes jurisdictional chaos.'
      },
      {
        term: 'NEW YORK CONVENTION 1958',
        meaningId: 'Konvensi New York 1958 tentang Pengakuan dan Eksekusi Putusan Arbitrase Asing',
        legalFunction: 'Multilateral treaty enabling arbitral awards to be enforced in over 170 contracting states (including Indonesia via Keppres 34/1981 and UU 30/1999).',
        explanationEn: 'Ensures that a Singapore or ICC arbitration award against an Indonesian corporate debtor can be registered and executed through the Central Jakarta District Court.',
        explanationId: 'Konvensi internasional yang menjamin putusan arbitrase asing dapat dieksekusi di Indonesia melalui penetapan eksekuatur Pengadilan Negeri Jakarta Pusat dan Mahkamah Agung.',
        authenticExample: 'The award is final, binding, and enforceable pursuant to the 1958 New York Convention.',
        indonesianTranslation: 'Putusan tersebut bersifat final, mengikat, dan dapat dieksekusi berdasarkan Konvensi New York 1958.',
        draftingTip: 'Specify that awards may be entered and enforced in any court having jurisdiction.'
      }
    ],
    sampleExcerpt: {
      title: 'Model SIAC International Arbitration Clause',
      text: 'Any dispute arising out of or in connection with this contract, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by arbitration administered by the Singapore International Arbitration Centre ("SIAC") in accordance with the Arbitration Rules of the SIAC for the time being in force. The seat of the arbitration shall be Singapore. The Tribunal shall consist of three arbitrators. The language of the arbitration shall be English.',
      translationId: 'Setiap sengketa yang timbul dari atau sehubungan dengan kontrak ini, termasuk setiap pertanyaan mengenai keberadaan, keabsahan, atau pengakhirannya, harus dirujuk ke dan diselesaikan secara final melalui arbitrase yang diadministrasikan oleh Singapore International Arbitration Centre ("SIAC") sesuai dengan Peraturan Arbitrase SIAC yang berlaku. Tempat kedudukan hukum arbitrase adalah Singapura. Majelis Arbitrase terdiri dari tiga orang arbiter. Bahasa yang digunakan dalam arbitrase adalah bahasa Inggris.'
    },
    checkExercise: {
      questionEn: 'In Indonesia, which judicial institution is statutorily designated to grant exequatur (enforcement orders) for foreign arbitral awards?',
      questionId: 'Di Indonesia, lembaga peradilan manakah yang berwenang memberikan penetapan eksekuatur atas putusan arbitrase internasional?',
      options: [
        'Pengadilan Tata Usaha Negara (PTUN)',
        'Pengadilan Negeri Jakarta Pusat / Ketua Pengadilan Negeri Jakarta Pusat',
        'Mahkamah Konstitusi',
        'Komisi Yudisial'
      ],
      correctIndex: 1,
      explanationId: 'Berdasarkan UU No. 30 Tahun 1999 Pasal 65, pendaftaran dan permohonan eksekuatur putusan arbitrase internasional wajib diajukan ke Pengadilan Negeri Jakarta Pusat.'
    }
  },
  {
    id: 'lesson-corporate-governance',
    categoryId: 'advanced',
    title: 'Cross-Border M&A and Corporate Governance Terminology',
    titleId: 'Terminologi M&A Lintas Batas dan Tata Kelola Perusahaan',
    subtitle: 'Shareholder pacts, drag-along/tag-along rights, and closing conditions.',
    durationMinutes: 30,
    difficulty: 'Advanced',
    overviewEn: 'M&A transactions involve specialized terminology governing equity transfers, minority shareholder protections, representations & warranties disclosure letters, and closing deliverables under Indonesian Company Law and English common law frameworks.',
    overviewId: 'Transaksi akuisisi saham dan merger melibatkan kosakata khusus mengenai pengalihan kepemilikan modal, perlindungan pemegang saham minoritas (drag-along / tag-along), serta kondisi prasyarat penutupan transaksi (closing conditions).',
    coreConcepts: [
      {
        term: 'DRAG-ALONG RIGHT',
        meaningId: 'Hak Menyeret Pemegang Saham Minoritas (Hak Jual Bersama Paksa)',
        legalFunction: 'Enables a majority shareholder selling to an outside buyer to force minority shareholders to sell on identical terms.',
        explanationEn: 'Ensures that a strategic acquirer can purchase 100% of the company’s equity without being blocked by a holdout minority investor.',
        explanationId: 'Hak pemegang saham mayoritas untuk memaksa pemegang saham minoritas ikut menjual seluruh sahamnya kepada pembeli baru dengan syarat dan harga yang sama.',
        authenticExample: 'If a bona fide third party offers to acquire 100% of the Shares, the Majority Shareholders may exercise Drag-Along Rights.',
        indonesianTranslation: 'Apabila ada pihak ketiga beritikad baik menawarkan untuk mengakuisisi 100% Saham, Pemegang Saham Mayoritas dapat menggunakan Hak Drag-Along.',
        draftingTip: 'Ensure price protections (minimum valuation floor) for minority shareholders.'
      },
      {
        term: 'TAG-ALONG RIGHT (Co-Sale Right)',
        meaningId: 'Hak Ikut Menjual Saham (Perlindungan Pemegang Saham Minoritas)',
        legalFunction: 'Protects minority shareholders if founders or major investors sell their controlling stake.',
        explanationEn: 'Allows minority investors to "tag along" and sell their pro-rata shares at the exact same high valuation negotiated by the majority.',
        explanationId: 'Hak pemegang saham minoritas untuk ikut serta menjual sahamnya jika pemegang saham pendiri/mayoritas menjual saham kendali mereka.',
        authenticExample: 'Minority shareholders shall have Tag-Along Rights in the event of any change of control.',
        indonesianTranslation: 'Pemegang saham minoritas memiliki Hak Tag-Along dalam hal terjadi perubahan pengendalian perusahaan.',
        draftingTip: 'Essential clause in venture capital term sheets and joint ventures.'
      }
    ],
    sampleExcerpt: {
      title: 'Shareholders Agreement Transfer Restriction Excerpt',
      text: 'No Shareholder shall pledge, encumber, or transfer any Shares without the prior written consent of the Board, save and except for transfers made pursuant to the Right of First Refusal, Tag-Along Rights, or Drag-Along Rights set forth in Article 6.',
      translationId: 'Tidak ada Pemegang Saham yang boleh menggadaikan, membebani hak tanggungan, atau mengalihkan Saham apa pun tanpa persetujuan tertulis terlebih dahulu dari Direksi, kecuali dan mengesampingkan pengalihan yang dilakukan berdasarkan Hak Membeli Terlebih Dahulu (ROFR), Hak Tag-Along, atau Hak Drag-Along yang ditetapkan dalam Pasal 6.'
    },
    checkExercise: {
      questionEn: 'Which shareholder right protects a venture capital minority investor when the founding founders decide to sell their shares to a large competitor?',
      questionId: 'Hak pemegang saham manakah yang melindungi investor minoritas saat pendiri perusahaan memutuskan menjual seluruh saham kendalinya ke pesaing besar?',
      options: ['Drag-Along Right', 'Tag-Along Right', 'Ultra Vires Action', 'Specific Performance'],
      correctIndex: 1,
      explanationId: 'Tag-Along Right (Hak Ikut Menjual) memberikan hak kepada pemegang saham minoritas untuk ikut menjual sahamnya pada harga dan kondisi yang sama.'
    }
  }
];
