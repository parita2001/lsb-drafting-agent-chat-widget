import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, FileText, CheckCircle, Loader2, Download, AlertCircle, Sparkles, Edit3, Save, ArrowLeft, Trash2, AlertTriangle, ShieldCheck, Info, HelpCircle, Clock, MessageSquarePlus, X, Globe } from 'lucide-react';

// =============================================================================
// LSB REPORT DRAFTER
//
// Features:
//   • Generation timer + post-download toast
//   • Session timer in footer
//   • New Chat button — resets all state and clears the conversation
//   • Bilingual EN/JA — top-right toggle switches both UI and agent output
//     - UI labels translated via local dictionary
//     - Agent output (report content, MCQs, verification items) generated
//       in target language via prompt instruction
//     - Structural markers (DOCUMENT, HEADERS, SEVERITY, etc.) stay English
//       so the parser remains robust across languages
//     - DOCX uses a Japanese seal stamp when language=ja
// =============================================================================

type AnyFn = (...args: unknown[]) => unknown;
type AnyObj = { [key: string]: unknown };

// Base64-encoded PNG of the official LSIO seal (200x200 px, ~4.3 KB).
// Embedded inline so the DOCX renders the actual image stamp in the
// signature block without needing a network round-trip.
const SEAL_PNG_BASE64_JA = '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';

// =============================================================================
// Bilingual support — UI strings + agent-output language directive
// =============================================================================

type Lang = 'en' | 'ja';

interface TranslationDict {
  [key: string]: string;
}

const TRANSLATIONS: Record<Lang, TranslationDict> = {
  en: {
    // Header
    appTitle: 'LSB Report Drafter',
    appSubtitle: 'Identifies LSA & ISHA article violations from inspection notes',
    pocBadge: 'POC',
    newChat: 'New chat',
    newChatShort: 'New',
    confirmNewChat: 'Start a new chat? This will clear the current conversation.',
    // Empty state
    emptyHeading: 'What did you observe during the inspection?',
    emptyDescription: 'Describe the conditions in your own words. The agent will read your notes, ask clarifying questions if anything is ambiguous, then identify the specific LSA or ISHA articles violated and draft the appropriate report.',
    // Input bar
    inputPlaceholder: 'Describe what you observed during the inspection…',
    pocFooterNote: 'POC mode: dashboard metadata auto-populated',
    sessionLabel: 'Session',
    poweredBy: 'Powered by Claude · Anthropic',
    // Loader
    loaderReading: 'Agent reading notes',
    loaderReadingSub: 'Checking whether clarifications are needed…',
    loaderDrafting: 'Agent drafting reports',
    loaderDraftingSub: 'Cross-referencing LSA & ISHA articles, populating tables…',
    // Clarify
    clarifyHeading: 'A few clarifications to identify the right articles',
    otherOption: 'Other',
    pleaseSpecify: 'Please specify…',
    continueDraft: 'Continue and draft',
    clarifySubmitted: 'Clarifications submitted — see drafts below.',
    // Reports list
    oneDraftGenerated: '1 draft generated. Tap to review and approve.',
    nDraftsGenerated: '{n} drafts generated. Tap any card to review.',
    generatedIn: 'Generated in',
    confirmPill: 'Confirm',
    allDeleted: 'All drafts in this batch were deleted.',
    open: 'Open →',
    findingCount: 'finding',
    findingCountPlural: 'findings',
    // Drill-in
    backToDrafts: 'Back to drafts',
    backShort: 'Back',
    editFields: 'Edit fields',
    editShort: 'Edit',
    doneEditing: 'Done editing',
    doneShort: 'Done',
    deleteAction: 'Delete',
    deleteConfirm: 'Delete this draft? It will be removed from this session.',
    approveDownload: 'Approve & download .docx',
    downloadShort: 'Download',
    approved: 'Approved & sent',
    sentShort: 'Sent',
    dateLabel: 'Date:',
    docNumLabel: 'Doc #:',
    toLabel: 'To',
    attnLabel: 'Attn:',
    issuedByLabel: 'Issued By',
    badgeLabel: 'Badge:',
    inspectorSignature: 'Inspector signature',
    severityLabel: 'SEVERITY:',
    // Verification
    verificationHeading: 'Inspector — please confirm before finalising',
    verificationDescription: 'The provisional draft below uses placeholders for the items below. Please provide the actual values before the report is finalised.',
    verificationPlaceholder: 'Type the confirmed value…',
    verificationApply: 'Apply & finalise draft',
    verificationFinalising: 'Agent finalising draft…',
    // Escalation
    escalationLabel: 'Escalation Required',
    // Download toast
    downloadedTitle: 'Word document downloaded',
    downloadedSub: '{name}.docx saved to your downloads',
    // Generation popup
    genPopupTitle: 'Agent created the report in {time}',
    genPopupSub: 'Includes triage, RAG, and draft generation',
    // Severity display
    sev_IMMINENT_DANGER: 'IMMINENT DANGER',
    sev_SUBSTANTIVE: 'SUBSTANTIVE',
    sev_MINOR: 'MINOR',
    sev_ESCALATION: 'ESCALATION',
    // Document type display
    doc_SUSPENSION: 'SUSPENSION OF USE ORDER',
    doc_CORRECTIVE: 'CORRECTIVE RECOMMENDATION',
    doc_GUIDANCE: 'GUIDANCE NOTICE',
    doc_ESCALATION: 'ESCALATION REQUIRED',
    // Language switcher
    langSwitchLabel: 'Language'
  },
  ja: {
    appTitle: '労働基準監督署 報告書ドラフター',
    appSubtitle: '労働基準法・労働安全衛生法違反を点検記録から特定します',
    pocBadge: 'POC',
    newChat: '新規チャット',
    newChatShort: '新規',
    confirmNewChat: '新規チャットを開始しますか？現在の会話は削除されます。',
    emptyHeading: '点検中に確認した状況をご記入ください',
    emptyDescription: 'ご自身の言葉で状況を記述してください。エージェントが内容を読み取り、不明確な点があれば追加質問を行います。その後、該当する労働基準法または労働安全衛生法の条文を特定し、適切な報告書を作成します。',
    inputPlaceholder: '点検中に確認した状況を記述してください…',
    pocFooterNote: 'POC モード:ダッシュボードメタデータが自動入力されます',
    sessionLabel: 'セッション',
    poweredBy: 'Claude · Anthropic 提供',
    loaderReading: 'エージェントが記録を確認中',
    loaderReadingSub: '追加情報の必要性を確認しています…',
    loaderDrafting: 'エージェントが報告書を作成中',
    loaderDraftingSub: '労働基準法・労働安全衛生法の条文を照合し、表を作成しています…',
    clarifyHeading: '適切な条文を特定するための追加確認',
    otherOption: 'その他',
    pleaseSpecify: '詳細をご記入ください…',
    continueDraft: '続行して作成',
    clarifySubmitted: '追加情報が送信されました。下の草稿をご確認ください。',
    oneDraftGenerated: '1件の草稿が作成されました。タップして確認・承認してください。',
    nDraftsGenerated: '{n}件の草稿が作成されました。カードをタップしてご確認ください。',
    generatedIn: '作成時間:',
    confirmPill: '要確認',
    allDeleted: 'このバッチの草稿はすべて削除されました。',
    open: '開く →',
    findingCount: '件の指摘事項',
    findingCountPlural: '件の指摘事項',
    backToDrafts: '草稿一覧に戻る',
    backShort: '戻る',
    editFields: '項目を編集',
    editShort: '編集',
    doneEditing: '編集完了',
    doneShort: '完了',
    deleteAction: '削除',
    deleteConfirm: 'この草稿を削除しますか？このセッションから削除されます。',
    approveDownload: '承認して .docx をダウンロード',
    downloadShort: 'ダウンロード',
    approved: '承認・送信済み',
    sentShort: '送信済',
    dateLabel: '発行日:',
    docNumLabel: '文書番号:',
    toLabel: '宛先',
    attnLabel: '担当:',
    issuedByLabel: '発行者',
    badgeLabel: 'バッジ番号:',
    inspectorSignature: '監督官署名',
    severityLabel: '重大度:',
    verificationHeading: '監督官による確認 — 最終確定の前に',
    verificationDescription: '下記の暫定版報告書には仮の値が記載されています。最終確定の前に正確な情報をご記入ください。',
    verificationPlaceholder: '確認済みの値をご記入ください…',
    verificationApply: '適用して報告書を確定',
    verificationFinalising: 'エージェントが報告書を確定中…',
    escalationLabel: '上申必要',
    downloadedTitle: 'Word 文書がダウンロードされました',
    downloadedSub: '{name}.docx がダウンロードフォルダに保存されました',
    genPopupTitle: 'エージェントは {time} で報告書を作成しました',
    genPopupSub: 'トリアージ、RAG、ドラフト生成を含む',
    sev_IMMINENT_DANGER: '緊急危険',
    sev_SUBSTANTIVE: '実質的違反',
    sev_MINOR: '軽微',
    sev_ESCALATION: '上申必要',
    doc_SUSPENSION: '使用停止命令',
    doc_CORRECTIVE: '是正勧告書',
    doc_GUIDANCE: '指導通知書',
    doc_ESCALATION: '上申必要',
    langSwitchLabel: '言語'
  }
};

const t = (key: string, lang: Lang, vars?: Record<string, string | number>): string => {
  let s = TRANSLATIONS[lang][key] ?? TRANSLATIONS.en[key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      s = s.replace(`{${k}}`, String(v));
    });
  }
  return s;
};

// Map English document-type token (emitted by agent) to display label
const docTypeDisplay = (docType: string, lang: Lang): string => {
  const up = docType.toUpperCase();
  if (up.includes('SUSPENSION')) return t('doc_SUSPENSION', lang);
  if (up.includes('CORRECTIVE')) return t('doc_CORRECTIVE', lang);
  if (up.includes('GUIDANCE')) return t('doc_GUIDANCE', lang);
  if (up.includes('ESCALATION')) return t('doc_ESCALATION', lang);
  return docType;
};

// Map severity token to display label
const sevDisplay = (sev: string | null, lang: Lang): string => {
  if (!sev) return '';
  if (sev === 'IMMINENT DANGER') return t('sev_IMMINENT_DANGER', lang);
  if (sev === 'SUBSTANTIVE') return t('sev_SUBSTANTIVE', lang);
  if (sev === 'MINOR') return t('sev_MINOR', lang);
  if (sev === 'ESCALATION') return t('sev_ESCALATION', lang);
  return sev;
};

// Language directive appended to the agent system prompt
const langDirective = (lang: Lang): string => {
  if (lang === 'ja') {
    return `

==============================================================================
LANGUAGE — RESPOND IN JAPANESE
==============================================================================

You MUST emit ALL content values in formal Japanese (敬体). This includes:
  • NARRATIVE paragraph — formal business Japanese
  • All TABLE_SECTION TITLE values — Japanese names
  • All HEADERS values (except the literal "#" symbol) — Japanese column names
  • All ROW cell values — Japanese
  • All VERIFICATION ITEM values — Japanese
  • All MCQ question text and option text — Japanese
  • TO_BUSINESS_NAME, TO_BUSINESS_ADDRESS, TO_REPRESENTATIVE — Japanese
  • ISSUING_OFFICE — Japanese name (e.g. "足立労働基準監督署")
  • Inspector name dummy: "山田 太郎 監督官"

HOWEVER, these structural tokens MUST remain in literal English so the
parser still works:
  • Section markers: DOCUMENT:, DATE:, DOCUMENT_NUMBER:, ISSUING_OFFICE:,
    TO_BUSINESS_NAME:, TO_BUSINESS_ADDRESS:, TO_REPRESENTATIVE:, NARRATIVE:,
    INSPECTOR_NAME:, INSPECTOR_BADGE:, SEVERITY:, ITEM:, ROW:, HEADERS:,
    TITLE:
  • [TABLE_SECTION_1], [TABLE_SECTION_2], [TABLE_SECTION_3], [VERIFICATION]
  • DOCUMENT type values stay English: "SUSPENSION OF USE ORDER",
    "CORRECTIVE RECOMMENDATION", "GUIDANCE NOTICE"
  • SEVERITY values stay English: "IMMINENT DANGER", "SUBSTANTIVE", "MINOR"
  • ESCALATION marker stays English: "ESCALATION REQUIRED"
  • Article citation FORMAT: cite as "労働基準法第37条" or "労働安全衛生法第22条"
    (Japanese form when language=ja). Use Article numbers exactly.
  • The first column header in every table is the literal "#" character

Dates in Japanese form: "2026年5月20日" not "20 May 2026".

For JSON triage output, keep keys in English ("decision", "questions", "id",
"question", "options") but question text and option text must be Japanese.`;
  }
  return '';
};



const TRIAGE_PROMPT = `You are the LSB Report Drafter triage stage. The inspector has submitted vague field notes. Decide ONE of two things:

A) Notes have enough detail to draft a defensible report immediately.
B) Notes have specific ambiguities that, if clarified by 1–3 quick questions, would substantially improve article identification or document type selection.

If (B), ask up to THREE multiple-choice questions. Each must:
  • Be a real ambiguity in the inspector's notes — not generic "tell me more"
  • Have exactly 3 concrete options + a 4th "Other" option
  • Help cite the right LSA or ISHA article OR pick the right document type

Output strict JSON, nothing else:
{
  "decision": "ask" | "draft",
  "questions": [
    { "id": "q1", "question": "...", "options": ["...", "...", "..."] }
  ]
}

Decide ASK when a hazard is generic and the specific category materially changes the article cited.
Decide DRAFT when the notes name specific equipment / specific violation. Bias toward DRAFT.

DO NOT ask for things the dashboard auto-populates:
  • Exact employer address / business registration
  • Exact worker headcount
  • Inspector identity / badge number
  • Date of inspection`;

const DRAFT_PROMPT = `You are the LSB Report Drafter. Transform inspector field notes into formal draft enforcement documents.

==============================================================================
PRIMARY MOTIVE — METICULOUS ARTICLE IDENTIFICATION
==============================================================================

Identify SPECIFIC LSA or ISHA articles violated. Name the exact article.
If you cannot match a specific article write "[article to be confirmed]" and
add to verification. Never invent article numbers.

==============================================================================
RECIPIENT — addresses the BUSINESS, not the LSIO
==============================================================================

The recipient block addresses the BUSINESS (employer). The LSIO appears only
in the "ISSUED BY" footer.

==============================================================================
LEGAL CORPUS (LSA + ISHA only)
==============================================================================

LSA: 15, 24, 32, 34, 35, 36, 37, 89, 90, 106, 107, 108, 109
ISHA: 20, 21, 22, 23, 59, 61, 65, 66, 100

If a violation doesn't match these write "[article to be confirmed]".
NEVER cite OISH or other ordinances.

==============================================================================
SEVERITY RUBRIC
==============================================================================

IMMINENT DANGER → SUSPENSION OF USE ORDER (immediate)
SUBSTANTIVE → CORRECTIVE RECOMMENDATION (14–30 days)
MINOR → GUIDANCE NOTICE (30–60 days)

ESCALATION (do NOT draft) when input describes falsification, retaliation,
fatality, hospitalisation, forced labour, obstruction, willful violation.

==============================================================================
MULTIPLE REPORTS
==============================================================================

When findings span different severities, produce SEPARATE complete reports.
Separator (own line): ===END_REPORT===
Order: highest severity first.

==============================================================================
OUTPUT FORMAT
==============================================================================

DOCUMENT: SUSPENSION OF USE ORDER | CORRECTIVE RECOMMENDATION | GUIDANCE NOTICE
DATE: {date}
DOCUMENT_NUMBER: LSB-2025-DRAFT-{4-digit}
ISSUING_OFFICE: {LSIO name}

TO_BUSINESS_NAME: {employer name}
TO_BUSINESS_ADDRESS: {address}
TO_REPRESENTATIVE: {name, title}

NARRATIVE: {one paragraph}

[TABLE_SECTION_1]
TITLE: ...
HEADERS: ...
ROW: ...

(see CRITICAL ROW FORMAT below)

[TABLE_SECTION_2]
TITLE: ...
HEADERS: ...
ROW: ...

[TABLE_SECTION_3]
TITLE: ...
HEADERS: ...
ROW: ...

[VERIFICATION]
ITEM: ...

INSPECTOR_NAME: Inspector Taro Yamada
INSPECTOR_BADGE: LSB-INS-1138

SEVERITY: IMMINENT DANGER | SUBSTANTIVE | MINOR

==============================================================================
CRITICAL — ROW FORMAT (read carefully)
==============================================================================

HEADERS uses COMMAS to separate column names.
ROW uses the PIPE CHARACTER ("|") to separate cell values — NOT commas.
This is because cell values frequently contain commas (e.g. addresses, dates
with "JST", premium pay descriptions). The parser splits ROW values on "|".

Every ROW must have EXACTLY the same number of pipe-separated values as
there are commas-plus-one headers. If HEADERS has 7 columns, every ROW
must contain exactly 6 pipe characters.

The FIRST COLUMN is always literally "#" in HEADERS and a sequence number
(1, 2, 3, ...) in each ROW.

COMPLETE WORKED EXAMPLE (study this carefully):

  [TABLE_SECTION_1]
  TITLE: Findings and Required Corrections
  HEADERS: #, Legal Article, Factual Finding, Workers Affected, Required Correction, Deadline, Evidence to Submit
  ROW: 1 | LSA Article 37 | Workers performed overtime hours for which premium wages were not paid at the legally required rate (minimum 25% premium for hours exceeding the statutory limit). | 6 line operators | Calculate and pay all outstanding overtime premium wages owed; establish a compliant payroll process ensuring premium rates are applied to all future overtime hours. | 20 May 2026 (14 days from issue date) | Wage ledger extracts showing recalculated payments; payroll records confirming retrospective payments; written confirmation of revised payroll procedure.
  ROW: 2 | ISHA Article 22 | Accumulation of waste, debris, and lead was observed obstructing walkways in the main work area, creating a risk of exposure to hazardous substances and impeding safe egress. | 12 production workers | Remove all waste, debris, and lead from walkways; implement a documented housekeeping schedule to prevent recurrence. | 05 June 2026 (30 days from issue date) | Photographic evidence of cleared walkways; copy of housekeeping schedule signed by responsible manager.

Notice:
  • HEADERS row uses commas
  • Each ROW uses pipes to separate cells
  • The "#" header is literally the hash character — nothing else
  • The "#" value in each row is just the row number (1, 2, 3...)
  • Cells freely contain commas inside them — that's fine, only pipes split

NEVER use commas to separate ROW values. NEVER omit pipes. NEVER use any
other delimiter (semicolon, tab, etc.).

==============================================================================
SECTION TITLES — use proper section names
==============================================================================

TITLE should be the descriptive name of the section, not "SCHEDULE 1" or
"Section 1". Suggested titles per document type:

SUSPENSION OF USE ORDER:
  Section 1: "Items Suspended from Use"
  Section 2: "Factual Basis for Suspension"
  Section 3: "Instructions to the Employer"

CORRECTIVE RECOMMENDATION:
  Section 1: "Findings and Required Corrections"
  Section 2: "Reporting Requirement"
  Section 3: "Consequences of Non-Compliance"

GUIDANCE NOTICE:
  Section 1: "Areas Recommended for Improvement"
  Section 2: "Related Legal Context"
  (no Section 3)

==============================================================================
COLUMN STRUCTURES
==============================================================================

SUSPENSION OF USE ORDER:
  S1: #, Equipment/Area/Process, Location, Hazard Type, Legal Basis, Required Action, Verification Method
  S2: #, Inspector Observation, Workers Affected, Time of Observation
  S3: #, Instruction

CORRECTIVE RECOMMENDATION:
  S1: #, Legal Article, Factual Finding, Workers Affected, Required Correction, Deadline, Evidence to Submit
  S2: #, Reporting Requirement
  S3: #, Consequence of Non-Compliance

GUIDANCE NOTICE:
  S1: #, Subject, Observation, Suggested Improvement, Suggested Timeframe
  S2: #, Article (informational only), Relevance
  S3: omit

==============================================================================
DUMMY VALUES — every cell concrete and plausible
==============================================================================

NEVER write "[from employer DB]", "[to be confirmed]", or similar in cells.
Always populate.

  date:                    use input date, else "06 May 2026"
  document_number:         "LSB-2025-DRAFT-0042"
  issuing_office:          plausible name from input, else "Adachi Labour
                           Standards Inspection Office"
  to_business_name:        from input, else "Sample Industries Co., Ltd."
  to_business_address:     "1-2-3 Sample-cho, Adachi-ku, Tokyo 121-0001"
  to_representative:       "Mr. Hiroshi Tanaka, Representative Director"
  workers_affected:        plausible specific count e.g. "3 production workers"
  time_of_observation:     plausible time e.g. "14:30 JST during floor walkthrough"
  inspector_name:          "Inspector Taro Yamada"
  inspector_badge:         "LSB-INS-1138"

==============================================================================
[VERIFICATION] section — STRICT RULES
==============================================================================

ASK ONLY about:
  • Specific equipment serial/model numbers / asset IDs
  • Specific worker names tied to a finding (injured worker name)
  • Specific incident dates (when something occurred — not inspection date)
  • Specific quantities tied to a finding (unpaid amounts, overtime hours)
  • Identification of specific witnesses

DO NOT ASK about:
  ✗ Date of inspection — dashboard auto-fills
  ✗ Time of observation — you already filled
  ✗ Business name, address, representative name/title — you filled with dummies
  ✗ Inspector name or badge — dashboard fills
  ✗ Issuing office — dashboard fills
  ✗ Document number — system generates
  ✗ Anything you've already populated with a plausible value

Cap [VERIFICATION] at 3 items maximum. If nothing genuinely needs verification,
emit zero items. Quality over quantity.

==============================================================================
NON-NEGOTIABLE RULES
==============================================================================

• Recipient block addresses BUSINESS, not LSIO
• Cite ONLY LSA and ISHA articles — never invent
• Every cell concrete value — no "[bracketed placeholders]" in cells
• English only
• Reports end at SEVERITY:
• When multiple reports, separate with ===END_REPORT===`;

const REDRAFT_PROMPT = `You are finalising a provisional draft. You will receive:
  1. The PROVISIONAL DRAFT
  2. The inspector's CONFIRMED ANSWERS

Regenerate the SAME report with the confirmed answers substituted into the
appropriate cells. Output identical format EXCEPT:
  • [VERIFICATION] section MUST be EMPTY (just the marker, no ITEMs)
  • Update cells where confirmed answers change values
  • Preserve everything else exactly — severity, articles, narrative, deadlines

Output the complete report. No commentary, no preamble.`;

// =============================================================================
// Types & parsing
// =============================================================================

interface TableSection {
  title: string;
  headers: string[];
  rows: string[][];
}

interface ParsedReport {
  documentType: string;
  date: string;
  documentNumber: string;
  issuingOffice: string;
  businessName: string;
  businessAddress: string;
  representative: string;
  narrative: string;
  sections: TableSection[];
  verificationItems: string[];
  inspectorName: string;
  inspectorBadge: string;
  severity: 'IMMINENT DANGER' | 'SUBSTANTIVE' | 'MINOR' | 'ESCALATION' | null;
  rawText: string;
}

interface ClarifyQuestion {
  id: string;
  question: string;
  options: string[];
}

interface Message {
  role: 'user' | 'assistant';
  type: 'text' | 'clarify' | 'reports' | 'escalation';
  content: string;
  questions?: ClarifyQuestion[];
  reports?: ParsedReport[];
  timestamp: Date;
  originalNotes?: string;
  generationMs?: number; // for reports/escalation messages
}

const parseReport = (text: string): ParsedReport => {
  const get = (key: string): string => {
    const re = new RegExp(`^${key}:\\s*(.+?)$`, 'mi');
    const m = text.match(re);
    return m ? m[1].trim() : '';
  };

  const sections: TableSection[] = [];
  const sectionRegex = /\[TABLE_SECTION_\d+\]([\s\S]*?)(?=\[TABLE_SECTION_\d+\]|\[VERIFICATION\]|INSPECTOR_NAME:|SEVERITY:|$)/g;
  let match;

  // Parse a single ROW value string into cells. Prefer pipe delimiter; fall
  // back to comma if the pipe split yields fewer columns than expected. This
  // makes the parser resilient to the agent emitting either delimiter.
  const parseRowValues = (raw: string, expectedCols: number): string[] => {
    const pipeSplit = raw.split('|').map(c => c.trim());
    if (pipeSplit.length >= expectedCols) return pipeSplit;

    // Fall back to comma split — but be aware that legitimate cell content
    // may contain commas (e.g. dates "20 May 2026, JST"). Use a quote-aware
    // splitter: commas inside parens or quotes don't separate columns.
    const out: string[] = [];
    let cur = '';
    let depth = 0;
    let inQuote = false;
    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i];
      if (ch === '"' || ch === '\'') { inQuote = !inQuote; cur += ch; continue; }
      if (ch === '(' || ch === '[') { depth++; cur += ch; continue; }
      if (ch === ')' || ch === ']') { depth--; cur += ch; continue; }
      if (ch === ',' && depth === 0 && !inQuote && out.length < expectedCols - 1) {
        out.push(cur.trim());
        cur = '';
        continue;
      }
      cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  };

  while ((match = sectionRegex.exec(text)) !== null) {
    const block = match[1];
    const titleMatch = block.match(/TITLE:\s*(.+?)$/m);
    const headersMatch = block.match(/HEADERS:\s*(.+?)$/m);
    if (!titleMatch || !headersMatch) continue;
    const title = titleMatch[1].trim();
    const headers = headersMatch[1].split(',').map(h => h.trim());
    const rowMatches = [...block.matchAll(/^ROW:\s*(.+?)$/gm)];
    const rows = rowMatches.map(r => {
      const cells = parseRowValues(r[1], headers.length);
      // Pad with empty strings if too few; truncate if too many
      while (cells.length < headers.length) cells.push('');
      return cells.slice(0, headers.length);
    });
    sections.push({ title, headers, rows });
  }

  const verificationItems: string[] = [];
  const vMatch = text.match(/\[VERIFICATION\]([\s\S]*?)(?=INSPECTOR_NAME:|SEVERITY:|$)/);
  if (vMatch) {
    const itemMatches = [...vMatch[1].matchAll(/^ITEM:\s*(.+?)$/gm)];
    itemMatches.forEach(im => verificationItems.push(im[1].trim()));
  }

  let severity: ParsedReport['severity'] = null;
  if (/SEVERITY:\s*IMMINENT DANGER/i.test(text)) severity = 'IMMINENT DANGER';
  else if (/SEVERITY:\s*SUBSTANTIVE/i.test(text)) severity = 'SUBSTANTIVE';
  else if (/SEVERITY:\s*MINOR/i.test(text)) severity = 'MINOR';
  else if (/ESCALATION REQUIRED/i.test(text)) severity = 'ESCALATION';

  return {
    documentType: get('DOCUMENT'),
    date: get('DATE'),
    documentNumber: get('DOCUMENT_NUMBER'),
    issuingOffice: get('ISSUING_OFFICE'),
    businessName: get('TO_BUSINESS_NAME'),
    businessAddress: get('TO_BUSINESS_ADDRESS'),
    representative: get('TO_REPRESENTATIVE'),
    narrative: get('NARRATIVE'),
    sections,
    verificationItems,
    inspectorName: get('INSPECTOR_NAME') || 'Inspector Taro Yamada',
    inspectorBadge: get('INSPECTOR_BADGE') || 'LSB-INS-1138',
    severity,
    rawText: text
  };
};

const splitReports = (text: string): ParsedReport[] => {
  if (text.includes('ESCALATION REQUIRED')) {
    return [{ ...parseReport(''), severity: 'ESCALATION', rawText: text, documentType: 'ESCALATION REQUIRED', narrative: text }];
  }
  return text.split(/^===END_REPORT===\s*$/m).map(s => s.trim()).filter(Boolean).map(parseReport);
};

const formatDuration = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`;
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(1)}s`;
  const m = Math.floor(s / 60);
  const rem = (s - m * 60).toFixed(0);
  return `${m}m ${rem}s`;
};

// =============================================================================
// Logos
// =============================================================================

const LSIOSeal = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="seal-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#A100FF" /><stop offset="100%" stopColor="#460073" />
      </linearGradient>
      <path id="seal-top-curve" d="M 8 50 A 42 42 0 0 1 92 50" />
      <path id="seal-bottom-curve" d="M 12 55 A 38 38 0 0 0 88 55" />
    </defs>
    <circle cx="50" cy="50" r="46" fill="none" stroke="url(#seal-grad)" strokeWidth="2" />
    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#seal-grad)" strokeWidth="0.5" />
    <path d="M50 22 L66 30 L66 50 C66 60 58 68 50 72 C42 68 34 60 34 50 L34 30 Z" fill="url(#seal-grad)" />
    <path d="M42 49 L48 55 L58 43" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <text fontSize="6.5" fill="#460073" fontWeight="700" letterSpacing="2">
      <textPath href="#seal-top-curve" startOffset="50%" textAnchor="middle">LABOUR STANDARDS BUREAU</textPath>
    </text>
    <text fontSize="5" fill="#460073" fontWeight="600" letterSpacing="1.5">
      <textPath href="#seal-bottom-curve" startOffset="50%" textAnchor="middle">★ OFFICIAL ★ JAPAN ★</textPath>
    </text>
  </svg>
);

const LSBLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1.5L3 5v7c0 5.5 3.8 10.7 9 11.5 5.2-.8 9-6 9-11.5V5l-9-3.5z" fill="#FFFFFF" />
    <path d="M8 12.5l2.8 2.8L16 10" stroke="#460073" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const severityTheme = (sev: ParsedReport['severity']) => {
  switch (sev) {
    case 'IMMINENT DANGER': return { bg: '#FEF2F2', border: '#FCA5A5', text: '#991B1B', accent: '#DC2626', tableHeader: '#FEE2E2', icon: AlertTriangle };
    case 'SUBSTANTIVE':     return { bg: '#FFFBEB', border: '#FCD34D', text: '#92400E', accent: '#D97706', tableHeader: '#FEF3C7', icon: AlertCircle };
    case 'MINOR':           return { bg: '#ECFDF5', border: '#6EE7B7', text: '#065F46', accent: '#059669', tableHeader: '#D1FAE5', icon: Info };
    case 'ESCALATION':      return { bg: '#F5F0FA', border: '#A100FF', text: '#460073', accent: '#A100FF', tableHeader: '#EDE0F7', icon: ShieldCheck };
    default:                return { bg: '#F8FAFC', border: '#CBD5E1', text: '#475569', accent: '#64748B', tableHeader: '#F1F5F9', icon: FileText };
  }
};

// =============================================================================
// DOCX generation
// =============================================================================

const ensureScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if ((existing as HTMLScriptElement & { _loaded?: boolean })._loaded) return resolve();
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error(`Failed: ${src}`)));
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.crossOrigin = 'anonymous';
    s.onload = () => { (s as HTMLScriptElement & { _loaded?: boolean })._loaded = true; resolve(); };
    s.onerror = () => reject(new Error(`Failed: ${src}`));
    document.head.appendChild(s);
  });
};

const findDocxLib = (): AnyObj | null => {
  const w = window as unknown as AnyObj;
  if (w.docx && (w.docx as AnyObj).Document) return w.docx as AnyObj;
  if ((w as AnyObj).Docx && ((w as AnyObj).Docx as AnyObj).Document) return (w as AnyObj).Docx as AnyObj;
  return null;
};

const loadDocxLib = async (): Promise<AnyObj> => {
  const cdnUrls = [
    'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.min.js',
    'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js',
    'https://unpkg.com/docx@8.5.0/build/index.umd.js'
  ];
  let lastErr: Error | null = null;
  for (const url of cdnUrls) {
    try {
      await ensureScript(url);
      const lib = findDocxLib();
      if (lib) return lib;
    } catch (e) {
      lastErr = e instanceof Error ? e : new Error(String(e));
    }
  }
  throw new Error(`docx.js failed to load: ${lastErr?.message ?? 'unknown'}`);
};

const generateDOCX = async (report: ParsedReport, edits: Record<string, string>, lang: Lang = 'en') => {
  const D = await loadDocxLib() as AnyObj & {
    Document: AnyFn; Paragraph: AnyFn; TextRun: AnyFn; Table: AnyFn; TableRow: AnyFn; TableCell: AnyFn;
    Packer: AnyObj; AlignmentType: AnyObj; HeadingLevel: AnyObj; BorderStyle: AnyObj;
    WidthType: AnyObj; ShadingType: AnyObj;
  };

  const merge = (key: string, fallback: string) => edits[key] ?? fallback;
  const accentHex = report.severity === 'IMMINENT DANGER' ? 'B91C1C'
                  : report.severity === 'SUBSTANTIVE' ? 'B45309'
                  : report.severity === 'MINOR' ? '047857' : '460073';

  // Decode the appropriate-language seal PNG into a Uint8Array for ImageRun.
  // Wrapped in try/catch so a failed decode doesn't kill the whole DOCX.
  let sealBytes: Uint8Array | null = null;
  try {
    const sealBase64 = lang === 'ja' ? SEAL_PNG_BASE64_JA : SEAL_PNG_BASE64;
    const binStr = atob(sealBase64);
    sealBytes = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) sealBytes[i] = binStr.charCodeAt(i);
  } catch (e) {
    console.warn('Seal image decode failed; DOCX will render without stamp', e);
  }

  // Per-language fixed strings inside the DOCX letterhead/closing
  const ds = lang === 'ja' ? {
    letterheadTop: '労働基準監督署',
    dateOfIssue: '発行日:',
    referenceNo: '整理番号:',
    to: '宛先,',
    attention: '担当者:',
    subject: '件名: ',
    issuedUnder1: ' (',
    issuedUnder2: '労働基準法',
    issuedUnder3: ' および ',
    issuedUnder4: '労働安全衛生法',
    issuedUnder5: ' に基づき発行)',
    sirMadam: '拝啓',
    closingPara: '本通知の内容を確認し、記載された是正措置および期限に従って対応してください。本通知に従わない場合、関係法令に基づきさらなる措置がとられる可能性があります。',
    yoursFaithfully: '敬具',
    onBehalf: '労働基準監督署を代表して、',
    signatureCaption: '(監督官署名)',
    issuedBy: '発行者',
    badgeNo: '監督官バッジ番号: ',
    classification: '分類 — 重大度: ',
    documentTypeDisplay: docTypeDisplay(report.documentType, 'ja'),
    severityDisplay: sevDisplay(report.severity, 'ja')
  } : {
    letterheadTop: 'LABOUR STANDARDS INSPECTION BUREAU',
    dateOfIssue: 'Date of Issue: ',
    referenceNo: 'Reference No: ',
    to: 'TO,',
    attention: 'Attention: ',
    subject: 'SUBJECT: ',
    issuedUnder1: ' issued under the ',
    issuedUnder2: 'Labour Standards Act ',
    issuedUnder3: 'and the ',
    issuedUnder4: 'Industrial Safety and Health Act',
    issuedUnder5: '.',
    sirMadam: 'Sir/Madam,',
    closingPara: 'You are required to take note of the contents of this notice and act in accordance with the corrective measures and timelines specified herein. Failure to comply may result in further action under the applicable legal provisions.',
    yoursFaithfully: 'Yours faithfully,',
    onBehalf: 'For and on behalf of the Labour Standards Inspection Bureau,',
    signatureCaption: '(Signature of Inspector)',
    issuedBy: 'ISSUED BY',
    badgeNo: 'Inspector Badge No.: ',
    classification: 'CLASSIFICATION — SEVERITY: ',
    documentTypeDisplay: report.documentType,
    severityDisplay: report.severity ?? 'UNKNOWN'
  };


  const { Document, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, BorderStyle, WidthType, ShadingType, Packer } = D;

  const blank = (before = 0, after = 0) => new (Paragraph as AnyFn)({ children: [], spacing: { before, after } });
  const ruleLine = () => new (Paragraph as AnyFn)({
    border: { bottom: { color: '460073', size: 8, style: (BorderStyle as AnyObj).SINGLE, space: 1 } },
    spacing: { after: 200 }
  });
  const centeredRun = (text: string, opts: AnyObj = {}) =>
    new (Paragraph as AnyFn)({
      alignment: (AlignmentType as AnyObj).CENTER,
      children: [new (TextRun as AnyFn)({ text, ...opts })]
    });

  const letterhead: AnyObj[] = [
    centeredRun(ds.letterheadTop, { bold: true, size: 22, color: '460073', characterSpacing: 30 }),
    centeredRun(merge('issuingOffice', report.issuingOffice).toUpperCase(), { size: 16, color: '6B7280', characterSpacing: 20 }),
    blank(80, 0),
    ruleLine(),
    centeredRun(ds.documentTypeDisplay, { bold: true, size: 36, color: '111827' }),
    blank(80, 240)
  ];

  const metaTable = new (Table as AnyFn)({
    width: { size: 100, type: (WidthType as AnyObj).PERCENTAGE },
    rows: [
      new (TableRow as AnyFn)({
        children: [
          new (TableCell as AnyFn)({
            children: [new (Paragraph as AnyFn)({
              children: [
                new (TextRun as AnyFn)({ text: ds.dateOfIssue, size: 18, color: '6B7280' }),
                new (TextRun as AnyFn)({ text: merge('date', report.date), size: 18, color: '111827', bold: true })
              ]
            })],
            borders: { top: { style: (BorderStyle as AnyObj).NONE }, bottom: { style: (BorderStyle as AnyObj).NONE }, left: { style: (BorderStyle as AnyObj).NONE }, right: { style: (BorderStyle as AnyObj).NONE } }
          }),
          new (TableCell as AnyFn)({
            children: [new (Paragraph as AnyFn)({
              alignment: (AlignmentType as AnyObj).RIGHT,
              children: [
                new (TextRun as AnyFn)({ text: ds.referenceNo, size: 18, color: '6B7280' }),
                new (TextRun as AnyFn)({ text: report.documentNumber, size: 18, color: '111827', bold: true })
              ]
            })],
            borders: { top: { style: (BorderStyle as AnyObj).NONE }, bottom: { style: (BorderStyle as AnyObj).NONE }, left: { style: (BorderStyle as AnyObj).NONE }, right: { style: (BorderStyle as AnyObj).NONE } }
          })
        ]
      })
    ]
  });

  const recipientBlock: AnyObj[] = [
    blank(200, 0),
    new (Paragraph as AnyFn)({ children: [new (TextRun as AnyFn)({ text: ds.to, size: 22, bold: true, color: '111827' })] }),
    new (Paragraph as AnyFn)({ indent: { left: 240 }, children: [new (TextRun as AnyFn)({ text: merge('businessName', report.businessName), bold: true, size: 22, color: '111827' })] }),
    new (Paragraph as AnyFn)({ indent: { left: 240 }, children: [new (TextRun as AnyFn)({ text: merge('businessAddress', report.businessAddress), size: 18, color: '374151' })] }),
    new (Paragraph as AnyFn)({
      indent: { left: 240 },
      children: [
        new (TextRun as AnyFn)({ text: ds.attention, size: 18, color: '6B7280' }),
        new (TextRun as AnyFn)({ text: merge('representative', report.representative), size: 18, color: '111827', italics: true })
      ]
    }),
    blank(200, 0)
  ];

  const subjectLine = [
    new (Paragraph as AnyFn)({
      children: [
        new (TextRun as AnyFn)({ text: ds.subject, size: 20, bold: true, color: '111827' }),
        new (TextRun as AnyFn)({ text: ds.documentTypeDisplay + ds.issuedUnder1, size: 20, color: '111827' }),
        new (TextRun as AnyFn)({ text: ds.issuedUnder2, size: 20, italics: true, color: '111827' }),
        new (TextRun as AnyFn)({ text: ds.issuedUnder3, size: 20, color: '111827' }),
        new (TextRun as AnyFn)({ text: ds.issuedUnder4, size: 20, italics: true, color: '111827' }),
        new (TextRun as AnyFn)({ text: ds.issuedUnder5, size: 20, color: '111827' })
      ]
    }),
    blank(120, 0)
  ];

  const narrativeBlock: AnyObj[] = [
    new (Paragraph as AnyFn)({ children: [new (TextRun as AnyFn)({ text: ds.sirMadam, size: 20, color: '111827' })] }),
    blank(80, 0),
    new (Paragraph as AnyFn)({
      alignment: (AlignmentType as AnyObj).JUSTIFIED,
      indent: { firstLine: 360 },
      children: [new (TextRun as AnyFn)({ text: report.narrative, size: 20, color: '111827' })]
    }),
    blank(80, 0),
    new (Paragraph as AnyFn)({
      alignment: (AlignmentType as AnyObj).JUSTIFIED,
      indent: { firstLine: 360 },
      children: [new (TextRun as AnyFn)({ text: lang === 'ja' ? '本通知の根拠となる事実認定、必要な是正措置、および不遵守の結果は、下記の各表に記載されています。' : 'The findings on which this notice is based, the corrective measures required, and the consequences of non-compliance are set out in the schedules below.', size: 20, color: '111827' })]
    }),
    blank(160, 0)
  ];

  const tableBlocks: AnyObj[] = [];
  report.sections.forEach((section) => {
    tableBlocks.push(new (Paragraph as AnyFn)({
      children: [new (TextRun as AnyFn)({ text: section.title.toUpperCase(), bold: true, size: 20, color: '460073' })],
      spacing: { before: 200, after: 100 }
    }));
    const editedRows = section.rows.map((row, ri) => row.map((cell, ci) => merge(`${section.title}-${ri}-${ci}`, cell)));
    const headerCells = section.headers.map((h: string) =>
      new (TableCell as AnyFn)({
        shading: { fill: accentHex, type: (ShadingType as AnyObj).CLEAR },
        children: [new (Paragraph as AnyFn)({ children: [new (TextRun as AnyFn)({ text: h, color: 'FFFFFF', bold: true, size: 16 })] })],
        margins: { top: 100, bottom: 100, left: 120, right: 120 }
      })
    );
    const bodyRows = editedRows.map((row: string[], rIdx: number) =>
      new (TableRow as AnyFn)({
        children: row.map((cell: string) =>
          new (TableCell as AnyFn)({
            shading: { fill: rIdx % 2 === 0 ? 'FFFFFF' : 'FAF7FE', type: (ShadingType as AnyObj).CLEAR },
            children: [new (Paragraph as AnyFn)({ children: [new (TextRun as AnyFn)({ text: cell, size: 16, color: '111827' })] })],
            margins: { top: 100, bottom: 100, left: 120, right: 120 }
          })
        )
      })
    );
    tableBlocks.push(new (Table as AnyFn)({
      width: { size: 100, type: (WidthType as AnyObj).PERCENTAGE },
      rows: [new (TableRow as AnyFn)({ children: headerCells, tableHeader: true }), ...bodyRows]
    }));
    tableBlocks.push(blank(120, 0));
  });

  const closingBlock: AnyObj[] = [
    blank(240, 0),
    new (Paragraph as AnyFn)({
      alignment: (AlignmentType as AnyObj).JUSTIFIED,
      indent: { firstLine: 360 },
      children: [new (TextRun as AnyFn)({ text: ds.closingPara, size: 20, color: '111827' })]
    }),
    blank(120, 0),
    new (Paragraph as AnyFn)({ children: [new (TextRun as AnyFn)({ text: ds.yoursFaithfully, size: 20, color: '111827' })] }),
    blank(80, 0),
    new (Paragraph as AnyFn)({ children: [new (TextRun as AnyFn)({ text: ds.onBehalf, size: 18, italics: true, color: '4B5563' })] })
  ];

  const signatureLinePara = new (Paragraph as AnyFn)({
    border: { bottom: { color: '111827', size: 8, style: (BorderStyle as AnyObj).SINGLE, space: 1 } },
    spacing: { before: 600, after: 80 },
    children: [new (TextRun as AnyFn)({ text: '', size: 20 })]
  });

  const signatureBlock = new (Table as AnyFn)({
    width: { size: 100, type: (WidthType as AnyObj).PERCENTAGE },
    columnWidths: [5400, 4000],
    rows: [
      new (TableRow as AnyFn)({
        children: [
          new (TableCell as AnyFn)({
            children: [
              signatureLinePara,
              new (Paragraph as AnyFn)({ children: [new (TextRun as AnyFn)({ text: ds.signatureCaption, size: 14, color: '6B7280', italics: true })] }),
              blank(80, 0),
              new (Paragraph as AnyFn)({ children: [new (TextRun as AnyFn)({ text: report.inspectorName, bold: true, size: 22, color: '111827' })] }),
              new (Paragraph as AnyFn)({ children: [new (TextRun as AnyFn)({ text: `${ds.badgeNo}${report.inspectorBadge}`, size: 16, color: '4B5563' })] }),
              new (Paragraph as AnyFn)({ children: [new (TextRun as AnyFn)({ text: merge('issuingOffice', report.issuingOffice), size: 16, color: '4B5563' })] })
            ],
            borders: { top: { style: (BorderStyle as AnyObj).NONE }, bottom: { style: (BorderStyle as AnyObj).NONE }, left: { style: (BorderStyle as AnyObj).NONE }, right: { style: (BorderStyle as AnyObj).NONE } }
          }),
          new (TableCell as AnyFn)({
            children: (sealBytes && (D as AnyObj).ImageRun)
              ? [
                  blank(200, 0),
                  new (Paragraph as AnyFn)({
                    alignment: (AlignmentType as AnyObj).CENTER,
                    children: [
                      new ((D as AnyObj).ImageRun as AnyFn)({
                        data: sealBytes,
                        transformation: { width: 110, height: 110 }
                      })
                    ]
                  })
                ]
              : [
                  // Text-stamp fallback if image embedding isn't available
                  blank(400, 0),
                  new (Paragraph as AnyFn)({ alignment: (AlignmentType as AnyObj).CENTER, children: [new (TextRun as AnyFn)({ text: '◆', size: 32, color: '460073', bold: true })] }),
                  new (Paragraph as AnyFn)({ alignment: (AlignmentType as AnyObj).CENTER, children: [new (TextRun as AnyFn)({ text: 'OFFICIAL SEAL', size: 16, color: '460073', bold: true, characterSpacing: 30 })] }),
                  new (Paragraph as AnyFn)({ alignment: (AlignmentType as AnyObj).CENTER, children: [new (TextRun as AnyFn)({ text: 'LABOUR STANDARDS', size: 12, color: '460073', bold: true })] }),
                  new (Paragraph as AnyFn)({ alignment: (AlignmentType as AnyObj).CENTER, children: [new (TextRun as AnyFn)({ text: 'BUREAU OF JAPAN', size: 12, color: '460073', bold: true })] })
                ],
            borders: {
              top: { style: (BorderStyle as AnyObj).NONE },
              bottom: { style: (BorderStyle as AnyObj).NONE },
              left: { style: (BorderStyle as AnyObj).NONE },
              right: { style: (BorderStyle as AnyObj).NONE }
            },
            margins: { top: 100, bottom: 100, left: 100, right: 100 }
          })
        ]
      })
    ],
    borders: {
      top: { style: (BorderStyle as AnyObj).NONE }, bottom: { style: (BorderStyle as AnyObj).NONE },
      left: { style: (BorderStyle as AnyObj).NONE }, right: { style: (BorderStyle as AnyObj).NONE },
      insideHorizontal: { style: (BorderStyle as AnyObj).NONE }, insideVertical: { style: (BorderStyle as AnyObj).NONE }
    }
  });

  const severityBlock = [
    blank(240, 0),
    new (Table as AnyFn)({
      width: { size: 100, type: (WidthType as AnyObj).PERCENTAGE },
      rows: [
        new (TableRow as AnyFn)({
          children: [
            new (TableCell as AnyFn)({
              shading: { fill: accentHex, type: (ShadingType as AnyObj).CLEAR },
              children: [new (Paragraph as AnyFn)({
                alignment: (AlignmentType as AnyObj).CENTER,
                children: [new (TextRun as AnyFn)({ text: `${ds.classification}${ds.severityDisplay}`, color: 'FFFFFF', bold: true, size: 22, characterSpacing: 30 })]
              })],
              margins: { top: 150, bottom: 150, left: 200, right: 200 }
            })
          ]
        })
      ]
    })
  ];

  const doc = new (Document as AnyFn)({
    creator: 'LSB Report Drafter',
    title: report.documentType,
    sections: [{
      properties: { page: { margin: { top: 900, right: 900, bottom: 900, left: 900 } } },
      children: [...letterhead, metaTable, ...recipientBlock, ...subjectLine, ...narrativeBlock, ...tableBlocks, ...closingBlock, signatureBlock, ...severityBlock]
    }]
  });

  const packer = Packer as AnyObj & { toBlob?: AnyFn };
  if (typeof packer.toBlob !== 'function') throw new Error('docx Packer.toBlob is not a function');
  const blob = await (packer.toBlob as AnyFn)(doc) as Blob;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LSB-${report.documentType.replace(/\s+/g, '-')}-${Date.now()}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

// =============================================================================
// Editable field
// =============================================================================

interface EditableFieldProps {
  fieldKey: string;
  value: string;
  multiline?: boolean;
  isEditing: boolean;
  edits: Record<string, string>;
  onChange: (k: string, v: string) => void;
}

const EditableField = ({ fieldKey, value, multiline = false, isEditing, edits, onChange }: EditableFieldProps) => {
  const current = edits[fieldKey] ?? value;
  if (!isEditing) return <span>{current}</span>;
  if (multiline) {
    return (
      <textarea value={current} onChange={(e) => onChange(fieldKey, e.target.value)}
        className="w-full px-2 py-1 text-xs border rounded resize-none focus:outline-none"
        style={{ borderColor: '#A100FF', color: '#1E293B' }} rows={2} />
    );
  }
  return (
    <input value={current} onChange={(e) => onChange(fieldKey, e.target.value)}
      className="w-full px-2 py-1 text-xs border rounded focus:outline-none"
      style={{ borderColor: '#A100FF', color: '#1E293B' }} />
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function LSBReportDrafter() {
  const [language, setLanguage] = useState<Lang>('en');
  const tr = (k: string, vars?: Record<string, string | number>) => t(k, language, vars);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState({ title: 'Agent reading notes', sub: 'Identifying LSA/ISHA articles, classifying severity…' });

  const [reportEdits, setReportEdits] = useState<Record<string, Record<string, string>>>({});
  const [verificationAnswers, setVerificationAnswers] = useState<Record<string, Record<number, string>>>({});
  const [verificationResolved, setVerificationResolved] = useState<Record<string, boolean>>({});
  const [verificationLoading, setVerificationLoading] = useState<Record<string, boolean>>({});
  const [reportApproved, setReportApproved] = useState<Record<string, boolean>>({});
  const [reportDeleted, setReportDeleted] = useState<Record<string, boolean>>({});
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [drillDown, setDrillDown] = useState<{ messageIdx: number; reportIdx: number } | null>(null);
  const [clarifyAnswers, setClarifyAnswers] = useState<Record<string, { answers: Record<string, string>; otherTexts: Record<string, string>; submitted: boolean }>>({});

  // Timer: tracks elapsed ms for the *current* report generation cycle
  const generationStart = useRef<number | null>(null);

  // Cumulative timer per chat session — resets on new chat
  const [sessionElapsed, setSessionElapsed] = useState<number>(0);
  const [sessionStart, setSessionStart] = useState<number>(Date.now());

  // Generation-time popup — shown briefly after each report set arrives
  const [genTimePopup, setGenTimePopup] = useState<{ show: boolean; ms: number }>({ show: false, ms: 0 });

  // Post-download toast — shown briefly after DOCX downloads
  const [downloadToast, setDownloadToast] = useState<{ show: boolean; reportName: string }>({ show: false, reportName: '' });

  // Update session elapsed time every second
  useEffect(() => {
    const tick = setInterval(() => setSessionElapsed(Date.now() - sessionStart), 1000);
    return () => clearInterval(tick);
  }, [sessionStart]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!drillDown) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating, drillDown]);

  const handleNewChat = () => {
    if (messages.length > 0 && !confirm(tr('confirmNewChat'))) return;
    setMessages([]);
    setReportEdits({});
    setVerificationAnswers({});
    setVerificationResolved({});
    setVerificationLoading({});
    setReportApproved({});
    setReportDeleted({});
    setEditMode({});
    setClarifyAnswers({});
    setDrillDown(null);
    setSessionStart(Date.now());
    setSessionElapsed(0);
  };

  const callAgent = async (systemPrompt: string, userMessage: string): Promise<string> => {
    const fullSystemPrompt = systemPrompt + langDirective(language);
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8192,
        system: fullSystemPrompt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data.content.map((c: { type: string; text?: string }) => c.type === 'text' ? c.text : '').filter(Boolean).join('\n');
  };

  const handleSubmit = useCallback(async (textOverride?: string) => {
    const userText = textOverride ?? input;
    if (!userText.trim() || isGenerating) return;

    const newUserMessage: Message = { role: 'user', type: 'text', content: userText, timestamp: new Date() };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsGenerating(true);
    setLoaderMessage({ title: tr('loaderReading'), sub: tr('loaderReadingSub') });
    generationStart.current = Date.now();

    try {
      const triageRaw = await callAgent(TRIAGE_PROMPT, userText);
      let triage: { decision: 'ask' | 'draft'; questions: ClarifyQuestion[] };
      try {
        const jsonMatch = triageRaw.match(/\{[\s\S]*\}/);
        triage = JSON.parse(jsonMatch ? jsonMatch[0] : triageRaw);
      } catch {
        triage = { decision: 'draft', questions: [] };
      }

      if (triage.decision === 'ask' && triage.questions.length > 0) {
        const questionsWithOther = triage.questions.slice(0, 3).map(q => ({
          ...q,
          options: [...q.options.slice(0, 3), 'Other']
        }));
        setMessages(prev => [...prev, {
          role: 'assistant', type: 'clarify', content: '',
          questions: questionsWithOther, originalNotes: userText, timestamp: new Date()
        }]);
        setIsGenerating(false);
        // Don't reset generationStart — measurement continues across clarifications
      } else {
        await draftReports(userText);
      }
    } catch (err) {
      const errorText = err instanceof Error ? err.message : 'Unknown error';
      setMessages(prev => [...prev, { role: 'assistant', type: 'text', content: `⚠ Failed: ${errorText}`, timestamp: new Date() }]);
      setIsGenerating(false);
      generationStart.current = null;
    }
  }, [input, isGenerating]);

  const draftReports = async (combinedNotes: string) => {
    setIsGenerating(true);
    setLoaderMessage({ title: tr('loaderDrafting'), sub: tr('loaderDraftingSub') });
    try {
      const draftRaw = await callAgent(DRAFT_PROMPT, combinedNotes);
      const reports = splitReports(draftRaw);
      const isEscalation = reports.length === 1 && reports[0].severity === 'ESCALATION';

      // Compute elapsed
      const elapsed = generationStart.current ? Date.now() - generationStart.current : 0;
      generationStart.current = null;

      setMessages(prev => [...prev, {
        role: 'assistant', type: isEscalation ? 'escalation' : 'reports',
        content: draftRaw, reports, timestamp: new Date(),
        generationMs: elapsed
      }]);

      // Show generation-time popup
      if (elapsed > 0) {
        setGenTimePopup({ show: true, ms: elapsed });
        setTimeout(() => setGenTimePopup(prev => ({ ...prev, show: false })), 5000);
      }
    } catch (err) {
      const errorText = err instanceof Error ? err.message : 'Unknown error';
      setMessages(prev => [...prev, { role: 'assistant', type: 'text', content: `⚠ Failed: ${errorText}`, timestamp: new Date() }]);
      generationStart.current = null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClarifySubmit = async (messageIdx: number) => {
    const msg = messages[messageIdx];
    if (!msg || !msg.questions || !msg.originalNotes) return;
    const state = clarifyAnswers[messageIdx];
    if (!state) return;
    const enriched = msg.questions.map(q => {
      const ans = state.answers[q.id];
      if (!ans) return null;
      const finalAns = ans === 'Other' ? (state.otherTexts[q.id] || '(no detail provided)') : ans;
      return `${q.question} → ${finalAns}`;
    }).filter(Boolean).join('\n');
    setClarifyAnswers(prev => ({ ...prev, [messageIdx]: { ...state, submitted: true } }));
    const combined = `${msg.originalNotes}\n\nAdditional clarifications:\n${enriched}`;
    await draftReports(combined);
  };

  const setAnswer = (messageIdx: number, qid: string, value: string) => {
    setClarifyAnswers(prev => ({
      ...prev,
      [messageIdx]: {
        answers: { ...(prev[messageIdx]?.answers || {}), [qid]: value },
        otherTexts: { ...(prev[messageIdx]?.otherTexts || {}) },
        submitted: false
      }
    }));
  };

  const setOtherText = (messageIdx: number, qid: string, value: string) => {
    setClarifyAnswers(prev => ({
      ...prev,
      [messageIdx]: {
        answers: { ...(prev[messageIdx]?.answers || {}) },
        otherTexts: { ...(prev[messageIdx]?.otherTexts || {}), [qid]: value },
        submitted: false
      }
    }));
  };

  const updateVerification = (reportKey: string, idx: number, value: string) => {
    setVerificationAnswers(prev => ({ ...prev, [reportKey]: { ...(prev[reportKey] || {}), [idx]: value } }));
  };

  const handleVerificationSubmit = async (reportKey: string, messageIdx: number, reportIdx: number) => {
    const msg = messages[messageIdx];
    const report = msg?.reports?.[reportIdx];
    if (!report) return;
    setVerificationLoading(prev => ({ ...prev, [reportKey]: true }));
    try {
      const answers = verificationAnswers[reportKey] || {};
      const enriched = report.verificationItems.map((item, i) => `${item} → ${answers[i] || '(no answer)'}`).join('\n');
      const redraftInput = `PROVISIONAL DRAFT:\n${report.rawText}\n\nINSPECTOR'S CONFIRMED ANSWERS:\n${enriched}`;
      const redraftedRaw = await callAgent(REDRAFT_PROMPT, redraftInput);
      const redraftedReports = splitReports(redraftedRaw);
      const updated = redraftedReports[0] || report;
      setMessages(prev => prev.map((m, mi) => {
        if (mi !== messageIdx || !m.reports) return m;
        const newReports = [...m.reports];
        newReports[reportIdx] = { ...updated, verificationItems: [] };
        return { ...m, reports: newReports };
      }));
      setVerificationResolved(prev => ({ ...prev, [reportKey]: true }));
    } catch (err) {
      console.error('Re-draft failed:', err);
      setMessages(prev => prev.map((m, mi) => {
        if (mi !== messageIdx || !m.reports) return m;
        const newReports = [...m.reports];
        newReports[reportIdx] = { ...newReports[reportIdx], verificationItems: [] };
        return { ...m, reports: newReports };
      }));
      setVerificationResolved(prev => ({ ...prev, [reportKey]: true }));
    } finally {
      setVerificationLoading(prev => ({ ...prev, [reportKey]: false }));
    }
  };

  const updateEdit = (reportKey: string, fieldKey: string, value: string) => {
    setReportEdits(prev => ({ ...prev, [reportKey]: { ...(prev[reportKey] || {}), [fieldKey]: value } }));
  };

  const handleApprove = async (reportKey: string, report: ParsedReport) => {
    try {
      await generateDOCX(report, reportEdits[reportKey] || {}, language);
      setReportApproved(prev => ({ ...prev, [reportKey]: true }));
      setDownloadToast({ show: true, reportName: report.documentType });
      setTimeout(() => setDownloadToast({ show: false, reportName: '' }), 4500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      alert(`DOCX download failed: ${msg}`);
    }
  };

  const handleDelete = (reportKey: string) => {
    if (confirm(tr('deleteConfirm'))) {
      setReportDeleted(prev => ({ ...prev, [reportKey]: true }));
      setDrillDown(null);
    }
  };

  // ===========================================================================
  // DRILL-IN VIEW
  // ===========================================================================

  if (drillDown) {
    const msg = messages[drillDown.messageIdx];
    const report = msg?.reports?.[drillDown.reportIdx];
    if (!report) { setDrillDown(null); return null; }
    const reportKey = `${drillDown.messageIdx}-${drillDown.reportIdx}`;
    const approved = reportApproved[reportKey];
    const isEditing = !!editMode[reportKey];
    const theme = severityTheme(report.severity);
    const edits = reportEdits[reportKey] || {};
    const onFieldChange = (k: string, v: string) => updateEdit(reportKey, k, v);
    const vAnsState = verificationAnswers[reportKey] || {};
    const needsVerification = report.verificationItems.length > 0 && !verificationResolved[reportKey];
    const vLoading = !!verificationLoading[reportKey];
    const allVAnswered = report.verificationItems.every((_, i) => (vAnsState[i] || '').trim().length > 0);

    return (
      <div className="flex flex-col h-screen font-sans" style={{ background: 'linear-gradient(135deg, #FAFAFB 0%, #F5F0FA 100%)' }}>
        <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-10" style={{ borderColor: 'rgba(161,0,255,0.1)' }}>
          <div className="max-w-5xl mx-auto px-3 sm:px-6 py-3">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-0">
              <button onClick={() => setDrillDown(null)} className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium" style={{ color: '#460073', background: 'rgba(161,0,255,0.06)' }}>
                <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">{tr('backToDrafts')}</span><span className="sm:hidden">{tr('backShort')}</span>
              </button>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#A100FF' }}>{sevDisplay(report.severity, language)}</div>
                <div className="text-sm font-bold text-slate-900 truncate">{docTypeDisplay(report.documentType, language)}</div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:hidden">
              <button onClick={() => setEditMode(prev => ({ ...prev, [reportKey]: !prev[reportKey] }))} disabled={approved || needsVerification} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all disabled:opacity-50" style={{ background: isEditing ? '#460073' : 'rgba(161,0,255,0.06)', color: isEditing ? '#fff' : '#460073', border: '1px solid rgba(161,0,255,0.2)' }}>
                {isEditing ? <><Save className="w-3 h-3" /> {tr('doneShort')}</> : <><Edit3 className="w-3 h-3" /> {tr('editShort')}</>}
              </button>
              <button onClick={() => handleDelete(reportKey)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-rose-700" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                <Trash2 className="w-3 h-3" /> {tr('deleteAction')}
              </button>
              <button onClick={() => handleApprove(reportKey, report)} disabled={approved || isEditing || needsVerification} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed flex-1 justify-center" style={{ background: approved ? '#10B981' : 'linear-gradient(135deg, #A100FF 0%, #460073 100%)' }}>
                {approved ? <><CheckCircle className="w-3 h-3" /> {tr('sentShort')}</> : <><Download className="w-3 h-3" /> {tr('downloadShort')}</>}
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-2 absolute top-3 right-6">
              <button onClick={() => setEditMode(prev => ({ ...prev, [reportKey]: !prev[reportKey] }))} disabled={approved || needsVerification} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-50" style={{ background: isEditing ? '#460073' : 'rgba(161,0,255,0.06)', color: isEditing ? '#fff' : '#460073', border: '1px solid rgba(161,0,255,0.2)' }}>
                {isEditing ? <><Save className="w-3.5 h-3.5" /> {tr('doneEditing')}</> : <><Edit3 className="w-3.5 h-3.5" /> {tr('editFields')}</>}
              </button>
              <button onClick={() => handleDelete(reportKey)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-700" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                <Trash2 className="w-3.5 h-3.5" /> {tr('deleteAction')}
              </button>
              <button onClick={() => handleApprove(reportKey, report)} disabled={approved || isEditing || needsVerification} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed" style={{ background: approved ? '#10B981' : 'linear-gradient(135deg, #A100FF 0%, #460073 100%)', boxShadow: approved ? 'none' : '0 4px 12px rgba(161,0,255,0.25)' }}>
                {approved ? <><CheckCircle className="w-3.5 h-3.5" /> {tr('approved')}</> : <><Download className="w-3.5 h-3.5" /> {tr('approveDownload')}</>}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
            {needsVerification && (
              <div className="mb-4 sm:mb-6 rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#A100FF', boxShadow: '0 8px 30px rgba(161,0,255,0.15)' }}>
                <div className="px-4 sm:px-5 py-3 flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #A100FF 0%, #460073 100%)' }}>
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">{tr('verificationHeading')}</div>
                </div>
                <div className="p-4 sm:p-5 bg-white">
                  <div className="text-[11px] sm:text-xs text-slate-600 mb-4">{tr('verificationDescription')}</div>
                  <div className="space-y-3 sm:space-y-4">
                    {report.verificationItems.map((item, vi) => (
                      <div key={vi}>
                        <div className="text-xs sm:text-sm text-slate-800 font-medium mb-1.5">
                          <span className="inline-block w-5 h-5 rounded-full text-white text-[10px] font-bold leading-5 text-center mr-2" style={{ background: '#A100FF' }}>{vi + 1}</span>
                          {item}
                        </div>
                        <input value={vAnsState[vi] || ''} onChange={(e) => updateVerification(reportKey, vi, e.target.value)} placeholder={tr('verificationPlaceholder')} disabled={vLoading} className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-2 disabled:bg-slate-50" style={{ borderColor: 'rgba(161,0,255,0.3)', color: '#1E293B' }} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button onClick={() => handleVerificationSubmit(reportKey, drillDown.messageIdx, drillDown.reportIdx)} disabled={!allVAnswered || vLoading} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(135deg, #A100FF 0%, #460073 100%)', boxShadow: '0 4px 12px rgba(161,0,255,0.3)' }}>
                      {vLoading ? (<><Loader2 className="w-4 h-4 animate-spin" /> {tr('verificationFinalising')}</>) : (<><Sparkles className="w-4 h-4" /> {tr('verificationApply')}</>)}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(70,0,115,0.06)', opacity: needsVerification || vLoading ? 0.55 : 1, pointerEvents: needsVerification || vLoading ? 'none' : 'auto', transition: 'opacity 0.3s' }}>
              <div className="px-4 sm:px-6 py-4 sm:py-5" style={{ background: 'linear-gradient(135deg, #460073 0%, #A100FF 100%)' }}>
                <div className="text-base sm:text-xl font-bold text-white text-center tracking-wide">{docTypeDisplay(report.documentType, language)}</div>
              </div>

              <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 pb-3 border-b border-slate-100 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 mr-1.5">{tr('dateLabel')}</span>
                    <EditableField fieldKey="date" value={report.date} isEditing={isEditing} edits={edits} onChange={onFieldChange} />
                  </div>
                  <div className="text-slate-500">{tr('docNumLabel')} <span className="font-mono text-slate-700">{report.documentNumber}</span></div>
                </div>

                <div className="rounded-lg p-4 sm:p-5" style={{ background: '#FAF7FE', border: '1px solid rgba(161,0,255,0.1)' }}>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-2 sm:mb-3" style={{ color: '#A100FF' }}>{tr('toLabel')}</div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2">
                    <EditableField fieldKey="businessName" value={report.businessName} isEditing={isEditing} edits={edits} onChange={onFieldChange} />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 mb-1 sm:mb-1.5">
                    <EditableField fieldKey="businessAddress" value={report.businessAddress} isEditing={isEditing} edits={edits} onChange={onFieldChange} />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600">
                    <span className="text-slate-400 mr-1">{tr('attnLabel')}</span>
                    <EditableField fieldKey="representative" value={report.representative} isEditing={isEditing} edits={edits} onChange={onFieldChange} />
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed italic px-1 sm:px-2">{report.narrative}</div>

                {report.sections.map((section, si) => (
                  <div key={si}>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#460073' }}>{section.title}</div>
                    <div className="rounded-lg overflow-x-auto border border-slate-200">
                      <table className="w-full text-xs sm:text-sm" style={{ minWidth: '500px' }}>
                        <thead>
                          <tr style={{ background: theme.tableHeader }}>
                            {section.headers.map((h, hi) => (
                              <th key={hi} className="text-left px-2 sm:px-3 py-2 sm:py-2.5 font-semibold text-[10px] sm:text-xs whitespace-nowrap" style={{ color: theme.text }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="border-t border-slate-100" style={{ background: rIdx % 2 === 0 ? 'white' : '#FAF7FE' }}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-2 sm:px-3 py-2 sm:py-3 align-top text-slate-700 text-[11px] sm:text-xs">
                                  <EditableField fieldKey={`${section.title}-${rIdx}-${cIdx}`} value={cell} multiline={cell.length > 60} isEditing={isEditing} edits={edits} onChange={onFieldChange} />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-4 sm:pt-6 border-t border-slate-100">
                  <div className="order-2 sm:order-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">{tr('issuedByLabel')}</div>
                    <div className="text-sm font-semibold text-slate-900">{report.inspectorName}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{tr('badgeLabel')} {report.inspectorBadge}</div>
                    <div className="text-xs text-slate-500">
                      <EditableField fieldKey="issuingOffice" value={report.issuingOffice} isEditing={isEditing} edits={edits} onChange={onFieldChange} />
                    </div>
                    <div className="mt-3 sm:mt-4 pt-1 border-t border-slate-300 w-48 sm:w-56">
                      <div className="text-[9px] text-slate-400 uppercase tracking-wider">{tr('inspectorSignature')}</div>
                    </div>
                  </div>
                  <div className="order-1 sm:order-2 self-center sm:self-end">
                    <LSIOSeal size={80} />
                  </div>
                </div>

                {report.severity && (
                  <div className="rounded-lg py-2.5 sm:py-3 px-4 text-center font-bold text-white text-xs sm:text-sm tracking-widest" style={{ background: theme.accent }}>
                    {tr('severityLabel')} {sevDisplay(report.severity, language)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Download success toast */}
        {downloadToast.show && (
          <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm bg-white border rounded-xl p-3 sm:p-4 animate-bounce-in" style={{ borderColor: 'rgba(161,0,255,0.25)', boxShadow: '0 10px 40px rgba(70,0,115,0.15)' }}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #A100FF 0%, #460073 100%)' }}>
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-semibold text-slate-900">{tr('downloadedTitle')}</div>
                <div className="text-[11px] sm:text-xs text-slate-600 mt-0.5 truncate">{tr('downloadedSub', { name: downloadToast.reportName })}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ===========================================================================
  // MAIN CHAT VIEW
  // ===========================================================================

  return (
    <div className="flex flex-col h-screen font-sans" style={{ background: 'linear-gradient(135deg, #FAFAFB 0%, #F5F0FA 100%)' }}>
      <header className="border-b bg-white/90 backdrop-blur-sm" style={{ borderColor: 'rgba(161,0,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #A100FF 0%, #460073 100%)', boxShadow: '0 4px 14px rgba(161,0,255,0.35)' }}>
              <LSBLogo className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate">{tr('appTitle')}</h1>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 truncate hidden sm:block">{tr('appSubtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Language toggle */}
            <div className="flex items-center rounded-full border overflow-hidden" style={{ borderColor: 'rgba(161,0,255,0.25)' }}>
              <button onClick={() => setLanguage('en')} className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold transition-colors" style={{ background: language === 'en' ? 'linear-gradient(135deg, #A100FF 0%, #460073 100%)' : 'white', color: language === 'en' ? '#fff' : '#460073' }}>
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                EN
              </button>
              <button onClick={() => setLanguage('ja')} className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold transition-colors" style={{ background: language === 'ja' ? 'linear-gradient(135deg, #A100FF 0%, #460073 100%)' : 'white', color: language === 'ja' ? '#fff' : '#460073' }}>
                日本語
              </button>
            </div>
            <button onClick={handleNewChat} className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border text-[10px] sm:text-xs font-semibold transition-all hover:scale-105" style={{ background: 'white', borderColor: 'rgba(161,0,255,0.25)', color: '#460073' }}>
              <MessageSquarePlus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">{tr('newChat')}</span>
              <span className="sm:hidden">{tr('newChatShort')}</span>
            </button>
            <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border" style={{ background: 'rgba(161,0,255,0.06)', borderColor: 'rgba(161,0,255,0.2)' }}>
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: '#A100FF' }} />
              <span className="text-[10px] sm:text-xs font-semibold whitespace-nowrap" style={{ color: '#460073' }}>{tr('pocBadge')}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
          {messages.length === 0 && !isGenerating && (
            <div className="text-center py-8 sm:py-16 px-2">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mb-4 sm:mb-6" style={{ background: 'linear-gradient(135deg, #A100FF 0%, #460073 100%)', boxShadow: '0 12px 32px rgba(161,0,255,0.3)' }}>
                <LSBLogo className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 tracking-tight">{tr('emptyHeading')}</h2>
              <p className="text-xs sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
                {tr('emptyDescription')}
              </p>
            </div>
          )}

          {messages.map((msg, idx) => {
            if (msg.role === 'user') {
              return (
                <div key={idx} className="mb-4 sm:mb-6 flex justify-end">
                  <div className="max-w-[85%] sm:max-w-3xl rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 text-white" style={{ background: 'linear-gradient(135deg, #460073 0%, #5C0091 100%)', boxShadow: '0 4px 12px rgba(70,0,115,0.25)' }}>
                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              );
            }

            if (msg.type === 'clarify' && msg.questions) {
              const state = clarifyAnswers[idx];
              const submitted = state?.submitted;
              const allAnswered = msg.questions.every(q => {
                const a = state?.answers[q.id];
                if (!a) return false;
                if (a === 'Other') return !!(state?.otherTexts[q.id]?.trim());
                return true;
              });
              return (
                <div key={idx} className="mb-4 sm:mb-6">
                  <div className="rounded-2xl border bg-white overflow-hidden" style={{ borderColor: 'rgba(161,0,255,0.2)', boxShadow: '0 4px 20px rgba(70,0,115,0.06)' }}>
                    <div className="px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2" style={{ background: 'linear-gradient(135deg, rgba(161,0,255,0.08) 0%, rgba(70,0,115,0.05) 100%)' }}>
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: '#A100FF' }} />
                      <div className="text-xs sm:text-sm font-semibold" style={{ color: '#460073' }}>{tr('clarifyHeading')}</div>
                    </div>
                    <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
                      {msg.questions.map(q => {
                        const selected = state?.answers[q.id];
                        const otherText = state?.otherTexts[q.id] || '';
                        return (
                          <div key={q.id}>
                            <div className="text-xs sm:text-sm font-semibold text-slate-800 mb-2.5 sm:mb-3">{q.question}</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.options.map(opt => {
                                const active = selected === opt;
                                return (
                                  <button key={opt} onClick={() => !submitted && setAnswer(idx, q.id, opt)} disabled={submitted} className="text-left px-3 py-2.5 rounded-lg border text-[11px] sm:text-xs transition-all disabled:cursor-not-allowed" style={{ borderColor: active ? '#A100FF' : 'rgba(161,0,255,0.15)', background: active ? 'rgba(161,0,255,0.08)' : 'white', color: active ? '#460073' : '#334155', fontWeight: active ? 600 : 400, boxShadow: active ? '0 0 0 3px rgba(161,0,255,0.1)' : 'none' }}>
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                            {selected === 'Other' && (
                              <input value={otherText} onChange={(e) => setOtherText(idx, q.id, e.target.value)} disabled={submitted} placeholder={tr('pleaseSpecify')} className="mt-2 w-full px-3 py-2 rounded-lg border text-xs focus:outline-none disabled:bg-slate-50" style={{ borderColor: '#A100FF', color: '#1E293B' }} />
                            )}
                          </div>
                        );
                      })}
                      {!submitted && (
                        <div className="pt-2 flex justify-end">
                          <button onClick={() => handleClarifySubmit(idx)} disabled={!allAnswered || isGenerating} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(135deg, #A100FF 0%, #460073 100%)', boxShadow: '0 4px 12px rgba(161,0,255,0.3)' }}>
                            <Send className="w-3.5 h-3.5" /> {tr('continueDraft')}
                          </button>
                        </div>
                      )}
                      {submitted && (<div className="text-xs text-slate-500 italic pt-2">{tr('clarifySubmitted')}</div>)}
                    </div>
                  </div>
                </div>
              );
            }

            if (msg.type === 'escalation' && msg.reports) {
              const r = msg.reports[0];
              const theme = severityTheme('ESCALATION');
              return (
                <div key={idx} className="mb-4 sm:mb-6">
                  <div className="rounded-2xl border-2 p-4 sm:p-5" style={{ background: theme.bg, borderColor: theme.accent }}>
                    <div className="flex items-center gap-2 mb-3">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.accent }} />
                      <div className="text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ color: theme.text }}>{tr('escalationLabel')}</div>
                    </div>
                    <pre className="text-[11px] sm:text-xs leading-relaxed whitespace-pre-wrap font-mono" style={{ color: theme.text }}>{r.rawText}</pre>
                  </div>
                </div>
              );
            }

            if (msg.type === 'reports' && msg.reports) {
              const visibleReports = msg.reports.map((r, ri) => ({ r, ri })).filter(({ ri }) => !reportDeleted[`${idx}-${ri}`]);
              if (visibleReports.length === 0) {
                return (<div key={idx} className="mb-6 text-center text-xs text-slate-400 italic">{tr('allDeleted')}</div>);
              }
              return (
                <div key={idx} className="mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[11px] sm:text-xs text-slate-500 mb-2 sm:mb-3 px-1">
                    <span>{visibleReports.length === 1 ? tr('oneDraftGenerated') : tr('nDraftsGenerated', { n: visibleReports.length })}</span>
                    {msg.generationMs && (
                      <span className="inline-flex items-center gap-1 self-start sm:self-auto" style={{ color: '#460073' }}>
                        <Clock className="w-3 h-3" /> {tr('generatedIn')} {formatDuration(msg.generationMs)}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                    {visibleReports.map(({ r, ri }) => {
                      const reportKey = `${idx}-${ri}`;
                      const approved = reportApproved[reportKey];
                      const needsV = r.verificationItems.length > 0 && !verificationResolved[reportKey];
                      const theme = severityTheme(r.severity);
                      const Icon = theme.icon;
                      const findingsCount = r.sections[0]?.rows.length ?? 0;
                      return (
                        <button key={ri} onClick={() => setDrillDown({ messageIdx: idx, reportIdx: ri })} className="text-left bg-white rounded-xl border overflow-hidden transition-all hover:shadow-lg active:scale-[0.98] relative" style={{ borderColor: 'rgba(161,0,255,0.15)' }}>
                          {needsV && (
                            <div className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: '#A100FF' }}>
                              <HelpCircle className="w-2.5 h-2.5" /> {tr('confirmPill')}
                            </div>
                          )}
                          <div className="px-4 py-2.5 sm:py-3 flex items-center gap-2" style={{ background: theme.bg, borderBottom: `1px solid ${theme.border}` }}>
                            <Icon className="w-4 h-4" style={{ color: theme.accent }} />
                            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: theme.text }}>{sevDisplay(r.severity, language)}</div>
                            {approved && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 ml-auto" />}
                          </div>
                          <div className="p-3 sm:p-4">
                            <div className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5 sm:mb-2 leading-snug">{docTypeDisplay(r.documentType, language)}</div>
                            <div className="text-[11px] sm:text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2 sm:mb-3">{r.businessName} · {findingsCount} {findingsCount === 1 ? tr('findingCount') : tr('findingCountPlural')}</div>
                            <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
                              <span className="text-slate-400 font-mono truncate">{r.documentNumber}</span>
                              <span style={{ color: '#A100FF' }} className="font-semibold flex-shrink-0 ml-2">{tr('open')}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <div key={idx} className="mb-4 sm:mb-6">
                <div className="bg-white border border-slate-200 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 shadow-sm">
                  <pre className="text-[11px] sm:text-xs leading-relaxed whitespace-pre-wrap font-mono text-slate-700">{msg.content}</pre>
                </div>
              </div>
            );
          })}

          {isGenerating && (
            <div className="flex justify-start mb-4 sm:mb-6">
              <div className="bg-white border border-slate-200 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#A100FF' }} />
                  <div className="text-xs sm:text-sm">
                    <div className="font-semibold text-slate-900">{loaderMessage.title}</div>
                    <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{loaderMessage.sub}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="border-t bg-white" style={{ borderColor: 'rgba(161,0,255,0.1)' }}>
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="relative">
            <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }} placeholder={tr('inputPlaceholder')} rows={3} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-12 sm:pr-14 rounded-xl border bg-slate-50/50 text-xs sm:text-sm resize-none transition-all outline-none focus:bg-white" style={{ borderColor: 'rgba(161,0,255,0.18)' }} onFocus={(e) => { e.currentTarget.style.borderColor = '#A100FF'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(161,0,255,0.1)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(161,0,255,0.18)'; e.currentTarget.style.boxShadow = 'none'; }} disabled={isGenerating} />
            <button onClick={() => handleSubmit()} disabled={!input.trim() || isGenerating} className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 p-2 rounded-lg text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(135deg, #A100FF 0%, #460073 100%)', boxShadow: '0 2px 8px rgba(161,0,255,0.3)' }} aria-label="Send">
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[10px] sm:text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{tr('pocFooterNote')}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-slate-500 font-mono">
                <Clock className="w-3 h-3" />
                <span>{tr('sessionLabel')}: {formatDuration(sessionElapsed)}</span>
              </div>
            </div>
            <span style={{ color: '#460073' }} className="font-medium">{tr('poweredBy')}</span>
          </div>
          {/* Mobile session timer below */}
          <div className="sm:hidden mt-1 flex items-center gap-1 text-[10px] text-slate-500 font-mono">
            <Clock className="w-3 h-3" />
            <span>{tr('sessionLabel')}: {formatDuration(sessionElapsed)}</span>
          </div>
        </div>
      </footer>

      {/* Generation-time popup */}
      {genTimePopup.show && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30 max-w-sm bg-white rounded-xl border-2 px-4 py-3 animate-bounce-in" style={{ borderColor: '#A100FF', boxShadow: '0 12px 36px rgba(161,0,255,0.25)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #A100FF 0%, #460073 100%)' }}>
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">{tr('genPopupTitle', { time: formatDuration(genTimePopup.ms) })}</div>
              <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{tr('genPopupSub')}</div>
            </div>
            <button onClick={() => setGenTimePopup({ show: false, ms: 0 })} className="ml-2 p-1 rounded hover:bg-slate-100">
              <X className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      )}

      {/* Download success toast */}
      {downloadToast.show && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm bg-white border rounded-xl p-3 sm:p-4 animate-bounce-in" style={{ borderColor: 'rgba(161,0,255,0.25)', boxShadow: '0 10px 40px rgba(70,0,115,0.15)' }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #A100FF 0%, #460073 100%)' }}>
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-semibold text-slate-900">{tr('downloadedTitle')}</div>
              <div className="text-[11px] sm:text-xs text-slate-600 mt-0.5 truncate">{tr('downloadedSub', { name: downloadToast.reportName })}</div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce-in {
          0% { opacity: 0; transform: translate(-50%, -20px) scale(0.95); }
          60% { opacity: 1; transform: translate(-50%, 4px) scale(1.02); }
          100% { transform: translate(-50%, 0) scale(1); }
        }
        .animate-bounce-in { animation: bounce-in 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>
    </div>
  );
}

