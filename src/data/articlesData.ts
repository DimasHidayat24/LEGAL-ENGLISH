import { EditorialArticle } from '../types';

export const editorialArticlesList: EditorialArticle[] = [
  {
    id: 'art-why-legal-english-difficult',
    title: 'Why Legal English is Not Just English with "Big Words"',
    titleId: 'Mengapa Bahasa Inggris Hukum Bukan Sekadar Bahasa Inggris dengan Kata-Kata Sulit',
    author: 'Adv. Nadia Prasetyo, LL.M. (Harvard / Cambridge)',
    readTime: '7 min read',
    publishDate: 'October 15, 2024',
    category: 'Pedagogy & Foundations',
    summary: 'Understanding that Legal English is an autonomous linguistic and doctrinal sub-system rooted in historical common law conventions, precision drafting, and strict risk allocation.',
    contentMarkdown: `### The Great Misconception

Many Indonesian law students begin their journey assuming that becoming fluent in Legal English is simply a matter of memorizing a dictionary of esoteric vocabulary—words like *indemnify*, *heretofore*, and *interlocutory*.

However, Legal English is not merely standard English adorned with archaic Latin and French words. It is **a specialized cognitive and drafting architecture**. Every syntactic choice, every comma, and every modal verb serves a single fundamental function: **the precise allocation of legal risk and the minimization of judicial ambiguity**.

---

### 1. Ordinary English vs. Legal Register

In conversational English, synonyms can be interchanged freely to create variety and style. In Legal English, **variation is dangerous**.

* In ordinary English: "shall", "must", "will", and "should" all express expectations.
* In contract drafting:
  * **SHALL** imposes an enforceable legal duty on a person.
  * **MUST** imposes an indispensable condition precedent.
  * **MAY** grants a discretionary right.
  * **WILL** merely expresses a prediction of future fact without covenant.

If an Indonesian lawyer writes *"The Buyer will pay the invoice within 10 days"*, an adversarial common law litigator might argue that the sentence expresses a mere prediction rather than an actionable binding obligation (*covenant*).

---

### 2. The Civil Law vs. Common Law Conceptual Gap

Indonesian law is grounded in the Dutch-Roman **Civil Law tradition** (*Burgerlijk Wetboek / KUHPerdata*). In a civil law system:
* The civil code provides a comprehensive statutory background of default rules (e.g., *Pasal 1338, 1243, 1365*).
* Contracts can often be relatively concise because unstated general principles are supplied by the statutory code and codified good faith (*itikad baik*).

In contrast, **Anglo-American Common Law** evolved from adversarial court judgments (*stare decisis*). Contracts in common law jurisdictions must be **exhaustive self-contained legal universes**. If a risk is not expressly allocated in the four corners of the document, the common law court will generally refuse to imply it.

This explains why English contracts contain exhaustive clauses such as:
* *Indemnity and Hold Harmless*
* *Limitation of Liability & Waiver of Consequential Damages*
* *Severability & Entire Agreement (Boilerplate)*

---

### 3. The Path Forward for Indonesian Jurists

To excel in international commercial law firms, multinational in-house counsel, and diplomatic arbitration, Indonesian jurists must shift from **passive translation** to **doctrinal deconstruction**:

1. **Read Authentic Documents**: Never rely solely on textbook snippets. Read actual SIAC arbitration awards, CISG cross-border sales contracts, and SEC filings.
2. **Understand the Drafting Rationale**: Always ask: *"Why did the lawyer choose 'notwithstanding' here instead of 'subject to'?"*
3. **Bridge the Jurisdictional Divide**: Always map the English term to its Indonesian civil law counterpart, while critically noting where the legal concepts diverge.`,
    keyTakeaways: [
      'Legal English is a risk-allocation system where syntactic consistency overrides aesthetic variety.',
      'Common law contracts must be comprehensive because courts rarely imply statutory default terms.',
      'Indonesian lawyers must deconstruct the drafting rationale behind clauses, not just translate vocabulary.'
    ]
  },
  {
    id: 'art-five-traps-common-law',
    title: '5 Fatal Traps Indonesian Law Students Fall Into When Reading Common Law Contracts',
    titleId: '5 Jebakan Fatal Mahasiswa Hukum Indonesia Saat Membaca Kontrak Common Law',
    author: 'Dr. Arya Wicaksono, S.H., LL.M. (Partner, International Arbitration)',
    readTime: '9 min read',
    publishDate: 'October 8, 2024',
    category: 'Comparative Law & Drafting',
    summary: 'Analyzing common pitfalls from false friends like "Consideration" and "Damages" to over-reliance on literal translations in cross-border dispute resolution.',
    contentMarkdown: `### Navigating the False Friends of Cross-Border Law

When Indonesian law graduates review English commercial contracts for the first time, false cognates and misleading terminology can create serious legal vulnerabilities. Here are the five most critical traps to watch for.

---

### Trap 1: Confusing "Consideration" with "Pertimbangan"

* **The Mistake**: Translating "in consideration of" as mere *pertimbangan* (deliberation).
* **The Legal Reality**: In common law contract doctrine, **Consideration** is the mandatory requirement of a *quid pro quo*—something of economic value exchanged between the parties that makes a promise legally enforceable.
* **Practical Impact**: If an agreement lacks consideration (e.g., an uncompensated promise to extend a deadline), it is unenforceable under English law unless executed as a formal **Deed under seal**.

---

### Trap 2: Treating "Damages" as Physical Damage

* **The Mistake**: Confusing *damage* (kerusakan fisik) with *damages* (uang kompensasi ganti rugi).
* **The Legal Reality**: In legal terminology, **Damages** (always plural) is monetary compensation awarded by a court to make good an injured party's financial loss.
* **Classification**:
  * *Compensatory Damages*: Restores the claimant to the position they would have enjoyed had the contract been performed.
  * *Liquidated Damages*: Pre-agreed sums for specific defaults (e.g. delay penalties).
  * *Punitive Damages*: Penal sums designed to punish malicious wrongdoing (not recognized in Indonesian civil courts).

---

### Trap 3: Assuming "Wanprestasi" Always Requires a "Somasi"

* **The Mistake**: Believing that an English "breach of contract" cannot be sued upon without first issuing a formal default letter (*somasi* under Article 1238 KUHPerdata).
* **The Legal Reality**: Under common law, unless the contract specifically includes a mandatory "notice and cure clause", a breach occurs the exact second the performance deadline lapses. If the contract stipulates *"Time is of the essence"*, late delivery by even one hour is an immediate repudiatory breach allowing instant termination.

---

### Trap 4: Misinterpreting "Notwithstanding" vs. "Subject To"

* **The Mistake**: Mixing up which clause triumphs when two provisions appear to conflict.
* **The Golden Rule**:
  * **NOTWITHSTANDING Clause X**: *"This clause is the BOSS; it overrides and trumps Clause X."*
  * **SUBJECT TO Clause X**: *"This clause is SUBORDINATE; Clause X takes precedence over this clause."*

---

### Trap 5: Overlooking the "Entire Agreement" Clause

* **The Mistake**: Assuming that promises made during preliminary zoom meetings or WhatsApp negotiations remain binding after the final contract is signed.
* **The Legal Reality**: The **Entire Agreement Clause** (*klausul integrasi*) invokes the *Parol Evidence Rule*, rendering all prior oral promises completely dead and unenforceable in court.`,
    keyTakeaways: [
      'Consideration is the required exchange of legal value, not mere contemplation.',
      'Damages (plural) means court-awarded monetary compensation.',
      'Notwithstanding creates a trump card, while Subject to indicates subordination.',
      'The Entire Agreement clause extinguishes all pre-contractual verbal promises.'
    ]
  },
  {
    id: 'art-archaic-trio-explained',
    title: 'The Archaic Trio: Hereby, Thereof, and Wherein Demystified',
    titleId: 'Trio Pronominal Kuno: Mengurai Rahasia Hereby, Thereof, dan Wherein',
    author: 'LEXA Academic Editorial Board',
    readTime: '6 min read',
    publishDate: 'September 28, 2024',
    category: 'Drafting Techniques',
    summary: 'A step-by-step masterclass on how pronominal adverbs operate as spatial pointers in Anglo-American commercial drafting.',
    contentMarkdown: `### The Logic of Compound Spatial Adverbs

Law students often roll their eyes at words like *hereby*, *thereof*, *therein*, and *thereto*. While modern plain English advocates sometimes discourage their overuse, they remain ubiquitous in international agreements because of their unmatched ability to serve as **precise spatial pointers**.

---

### The "Here" Family (Points to THIS Document)

* **HEREBY** = *By means of this document* ("The parties hereby agree...")
* **HEREOF** = *Of this agreement* ("Subject to the terms hereof...")
* **HEREIN** = *In this agreement* ("Except as otherwise provided herein...")
* **HERETO** = *To this agreement* ("Schedule 1 attached hereto...")
* **HEREUNDER** = *Under this agreement* ("Obligations arising hereunder...")

---

### The "There" Family (Points to THAT External Item/Clause)

* **THEREOF** = *Of that thing / Of that clause* ("The equipment and all spare parts thereof...")
* **THEREIN** = *Inside that document/schedule* ("Reviewed the report and the data contained therein...")
* **THERETO** = *Attached to that document* ("The Master Lease and all addenda thereto...")
* **THEREUNDER** = *Under that referenced law/statute* ("Pursuant to Law No. 40/2007 and the regulations issued thereunder...")

---

### Modern Best Practices

When drafting in international practice:
1. **Never use them indiscriminately** as decorative filler.
2. **Ensure unambiguous antecedents**: If a paragraph mentions three different agreements, using "thereof" can create litigation-inducing ambiguity. When in doubt, repeat the defined term: *"of the Supply Agreement"* instead of *"thereof"*.`,
    keyTakeaways: [
      '"Here-" always refers to the immediate document you are reading.',
      '"There-" always refers to an external document, clause, or item previously mentioned.',
      'Use pronominal adverbs strictly when the antecedent noun is indisputably clear.'
    ]
  },
  {
    id: 'art-wanprestasi-vs-breach',
    title: 'Wanprestasi is Not Simply Breach: Nuances in Transnational Dispute Resolution',
    titleId: 'Wanprestasi Bukan Sekadar Breach: Nuansa dalam Penyelesaian Sengketa Transnasional',
    author: 'Prof. Faisal R. Anwar, S.H., LL.M., Ph.D.',
    readTime: '8 min read',
    publishDate: 'September 20, 2024',
    category: 'Comparative Law',
    summary: 'Examining why civil law default under KUHPerdata and common law breach of contract lead to radically different remedies and procedural prerequisites.',
    contentMarkdown: `### Bridging KUHPerdata with Transnational Litigation

In standard bilingual dictionaries, the Indonesian word **wanprestasi** is translated as *breach of contract*. While this is functionally acceptable for general discourse, in high-stakes transnational arbitration, conflating the two concepts can lead to flawed case strategy.

---

### 1. The Structure of Wanprestasi in Indonesian Law

Under Article 1238 and Article 1243 of the Indonesian Civil Code (*KUHPerdata*), wanprestasi is manifested in four distinct factual forms:
1. *Tidak melakukan apa yang disanggupi akan dilakukannya* (Complete non-performance).
2. *Melaksanakan apa yang dijanjikannya, tetapi tidak sebagaimana dijanjikan* (Defective performance).
3. *Melakukan apa yang dijanjikannya tetapi terlambat* (Delayed performance).
4. *Melakukan sesuatu yang menurut perjanjian tidak boleh dilakukannya* (Violating a negative covenant).

Crucially, under Indonesian civil procedure, a debtor is generally not in default *ipso jure* (by law alone) unless they have been served with a formal **Somasi** (default notice) putting them in a state of *in mora* (*in gebreke gesteld*).

---

### 2. The Structure of Breach in Common Law

Common law looks not at categories of action, but at the **gravity of the broken term**:

* **Condition**: A core term going to the root of the contract. Breach of a condition gives the innocent party the automatic right to terminate (*repudiate*) the contract and sue for full expectation damages.
* **Warranty**: A subsidiary term. Breach of a warranty allows only a claim for financial damages; the innocent party **cannot terminate** the contract and must continue performing their own obligations.
* **Innominate Term** (*The Hong Kong Fir Doctrine*): The court looks at the factual consequences of the breach to determine if the innocent party was deprived of substantially the whole benefit of the contract.

---

### 3. Practical Takeaway for Indonesian Lawyers

When drafting cross-border agreements for Indonesian clients:
* Explicitly define which breaches constitute a **Material Breach** giving rise to immediate termination rights.
* If your client wants the right to cure before being sued, draft an express **30-Day Written Cure Period** into the agreement. Do not rely on Indonesian statutory somasi rules if the contract is governed by English or Singapore law.`,
    keyTakeaways: [
      'Indonesian wanprestasi categorizes forms of failure and traditionally relies on somasi.',
      'Common law categorizes terms by their gravity (Conditions vs. Warranties).',
      'Always draft express notice and cure periods in cross-border agreements.'
    ]
  },
  {
    id: 'art-shall-vs-must-plain-english',
    title: 'Shall vs. Must vs. Will in Commercial Drafting: The Modern Plain English Debate',
    titleId: 'Shall vs. Must vs. Will dalam Perancangan Komersial: Perdebatan Plain English Modern',
    author: 'Adv. Helena Siregar, S.H., LL.M.',
    readTime: '7 min read',
    publishDate: 'September 12, 2024',
    category: 'Drafting Techniques',
    summary: 'Evaluating the transition from archaic "shall" to modern precision drafting rules promoted by Bryan Garner and Kenneth Adams.',
    contentMarkdown: `### The Crisis of the Word "Shall"

For centuries, "shall" was the undisputed king of contractual drafting. However, leading modern drafting authorities—including Bryan Garner (*Garner's Modern English Usage*) and Kenneth Adams (*A Manual of Style for Contract Drafting*)—have documented how courts worldwide have interpreted "shall" in over five contradictory ways:

1. As a mandatory command (*must*)
2. As directory/permissive guidance (*may*)
3. As a future tense marker (*will*)
4. As a condition precedent (*is required to*)
5. As an entitlement (*is entitled to*)

---

### The Adams "Rule of Shall"

To eliminate ambiguity, elite international law firms follow strict drafting conventions:

* **Rule 1: Use "Shall" ONLY for human/corporate duty.**
  * ✅ *"The Seller shall deliver the Goods."* (The Seller has a duty to deliver).
  * ❌ *"This Agreement shall be governed by English law."* (The agreement is not a person with a duty. Write: *"This Agreement is governed by English law."*)
  * ❌ *"The term 'Affiliate' shall mean..."* (Write: *"'Affiliate' means..."*)

* **Rule 2: Use "Must" for conditions precedent.**
  * ✅ *"To be effective, notices must be delivered in writing."*

* **Rule 3: Use "May" for discretionary options.**
  * ✅ *"The Lender may accelerate the loan upon an Event of Default."*

* **Rule 4: Use "Will" only for mutual future statements of fact.**
  * ✅ *"The Parties acknowledge that the factory will undergo scheduled maintenance in July."*

---

### Conclusion

Precision in legal language is not about sounding archaic or intimidating. It is about **clarity, predictability, and eliminating loopholes that opposing counsel can exploit in a dispute**.`,
    keyTakeaways: [
      'Never use "shall" for definitions, conditions, or governing law statements.',
      'Reserve "shall" exclusively for binding contractual duties of parties.',
      'Adopt the modern plain English standard to prevent court misinterpretation.'
    ]
  }
];
