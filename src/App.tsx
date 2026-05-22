import { useState, useEffect, useRef, createContext, useContext } from 'react';
import {
  LayoutDashboard,
  FileSearch,
  Radio,
  Scale,
  Send,
  ClipboardCheck,
  Camera,
  Mic,
  FileText,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Activity,
  AlertCircle,
  Building2,
  User,
  Calendar,
  Bell,
  Lock,
  Wifi,
  WifiOff,
  PenLine,
  Mail,
  Printer,
  FileCheck,
  Sparkles,
  Eye,
  Edit3,
  CircleDot,
  ArrowRight,
  Stamp,
  Hash,
  Briefcase,
  BarChart3,
  Users,
  ShieldCheck,
  Award,
  Zap,
  LogOut,
  Settings,
  UserPlus,
  Search,
  Globe,
  ArrowUp,
  Network,
  Trophy,
  Gauge,
  X,
  Check,
  Menu,
  Download,
  Pause,
  Play,
  Square,
  Bot,
  MessageSquarePlus,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const C = {
  darkest: '#460073',
  dark: '#7500C0',
  core: '#A100FF',
  light: '#C2A3FF',
  lightest: '#E6DCFF',
};
const FONT =
  "'Graphik', 'Graphik Web', 'Inter', system-ui, -apple-system, sans-serif";

const LANGUAGES = [
  { code: 'en', native: 'English', label: 'English' },
  { code: 'ja', native: '日本語', label: 'Japanese' },
  { code: 'zh', native: '中文', label: 'Chinese' },
  { code: 'ko', native: '한국어', label: 'Korean' },
  { code: 'vi', native: 'Tiếng Việt', label: 'Vietnamese' },
];

const TR = {
  signIn: 'Sign in',
  signInSecurely: 'Sign in securely',
  authPersonnel: 'Authorized personnel only',
  inspector: 'Inspector',
  administrator: 'Administrator',
  badgeId: 'Badge ID',
  password: 'Password',
  forgotPwd: 'Forgot password?',
  rememberDev: 'Remember device 30 days',
  demoCreds: 'Demo credentials',
  platform: 'Inspection Intelligence Platform',
  platformDesc:
    'Multimodal AI decision support for end-to-end labour standards enforcement.',
  caseQueue: 'Case Queue',
  allCases: 'All cases',
  preInspBriefing: 'Pre-Inspection Briefing',
  planning: 'Planning',
  liveInspection: 'Live Inspection',
  onSite: 'On-site',
  violationReview: 'Violation Review',
  enforcement: 'Enforcement',
  documentIssuance: 'Document Issuance',
  delivery: 'Delivery',
  followUpClosure: 'Follow-Up & Closure',
  verification: 'Verification',
  analytics: 'Analytics',
  insights: 'Insights',
  profile: 'Profile',
  myAccount: 'My account',
  officeOverview: 'Office Overview',
  dashboard: 'Dashboard',
  approvals: 'Approvals',
  criminalRef: 'Criminal referrals',
  inspRoster: 'Inspector Roster',
  manageTeam: 'Manage team',
  regAnalytics: 'Regional Analytics',
  performance: 'Performance',
  approve: 'Approve',
  reject: 'Reject',
  confirm: 'Confirm',
  cancel: 'Cancel',
  edit: 'Edit',
  view: 'View',
  back: 'Back',
  viewReport: 'View Report',
  approveAndSign: 'Approve & Sign',
  approved: 'Approved',
  rejected: 'Rejected',
  download: 'Download',
  print: 'Print',
  search: 'Search',
  active: 'Active',
  onLeave: 'On leave',
  pending: 'Pending',
  draft: 'Draft',
  online: 'Online',
  offline: 'Offline',
  case: 'Case',
  save: 'Save',
  cancelEdit: 'Cancel edit',
  goodMorning: 'Good morning',
  todayInsp: "Today's Inspections",
  pendingCorr: 'Pending Corrections',
  overdueRpt: 'Overdue Reports',
  reInspDue: 'Re-Inspections Due',
  dailyPlan: 'Daily Plan',
  apprByChief: 'Approved by Chief',
  todaysCases: "Today's Cases",
  highPri: 'HIGH PRIORITY',
  medPri: 'MEDIUM PRIORITY',
  lowPri: 'LOW PRIORITY',
  upNext: 'Up next',
  openBriefing: 'Open Briefing',
  riskScore: 'Risk Score',
  industry: 'Industry',
  workers: 'Workers',
  trigger: 'Trigger',
  lastInsp: 'Last inspection',
  aiBriefing: 'AI Briefing Pack',
  syncedOff: 'Synced offline',
  entProfile: 'Enterprise Profile',
  prevViol: 'Previous Violation History',
  repeatRisk: 'Repeat risk',
  industryRegs: 'Industry Regulations',
  suggQs: 'Suggested Questions',
  aiGen: 'AI generated',
  recTiming: 'Recommended Timing',
  beginInsp: 'Begin Inspection',
  evidCapture: 'Evidence Capture',
  aiAssist: 'AI-assisted',
  scanDoc: 'Scan Document',
  voiceNote: 'Voice Note',
  photoWp: 'Photo / Video: Workplace',
  capturedEv: 'Captured Evidence',
  detViol: 'Detected Violations',
  rtAlerts: 'Real-Time Alerts',
  recording: 'RECORDING',
  noEvid: 'No evidence captured yet',
  noViol: 'No violations detected yet',
  waitCap: 'Waiting for capture...',
  alerts: 'alerts',
  completeProc: 'Complete & Proceed',
  decMatrix: 'Decision Matrix',
  draftDocs: 'Draft Enforcement Documents',
  genaiDr: 'GenAI auto-drafted',
  procIssue: 'Proceed to Issuance',
  awaitRev: 'Awaiting review',
  issuedOnSite: 'Issued on-site',
  article: 'Article',
  violation: 'Violation',
  severity: 'Severity',
  recAct: 'Recommended Action',
  deadline: 'Deadline',
  status: 'Status',
  finDocs: 'Finalize & Deliver Documents',
  docsToDel: 'Documents to Deliver',
  delMethod: 'Delivery Method',
  onSiteDel: 'On-site delivery',
  emailMail: 'Secure email + mailed original',
  mailFromOff: 'Mail from office',
  digSign: 'Digital signature & seal',
  tapSign: 'Tap to sign all documents',
  signFin: 'Sign & Finalize',
  docsDel: 'Documents delivered & acknowledged',
  reminder: 'Reminder',
  reInsp: 'Re-Inspection',
  contFollow: 'Continue to Follow-Up',
  verifClos: 'Verification & Closure',
  caseClosure: 'Follow-Up & Case Closure',
  daysSince: 'Day 47 since issuance',
  corrRecv: 'Correction report received',
  caseClosed: 'Case closed',
  corrVerif: 'Correction Report Verification',
  autoEval: 'Auto-evaluated',
  adequate: 'Adequate',
  reInspRec: 'Re-inspection recommended',
  reqSupp: 'Request supplemental info',
  schedReInsp: 'Schedule Re-Inspection',
  reInspComp: 'Re-Inspection Completed',
  genFinal: 'Generate Final Report',
  finalRpt: 'Final Inspection Report',
  awaitChief: 'Awaiting Chief approval',
  submitClose: 'Submit & Close Case',
  retQueue: 'Return to Case Queue',
  suppReqd: 'Supplemental info requested — 15 day extension',
  protoDemo: 'Prototype demo',
  reportStruct: 'Reporting Structure',
  directRep: 'Direct Reports',
  acctSettings: 'Account Settings',
  permsAcc: 'Permissions & Access',
  inspectors: 'inspectors',
  ytdCases: 'YTD cases',
  signOut: 'Sign out',
  exportRep: 'Export',
  correctiveRec: 'CORRECTIVE RECOMMENDATION',
  prohibOrder: 'SUSPENSION OF USE ORDER',
  guidanceDoc: 'GUIDANCE REPORT',
  documentNo: 'Document No.',
  issueDate: 'Issue Date',
  issuingAuth: 'ISSUING AUTHORITY',
  to: 'TO',
  legalAuth: 'LEGAL AUTHORITY',
  inspDetails: 'INSPECTION DETAILS',
  violsIdent: 'VIOLATIONS IDENTIFIED',
  legalProv: 'Legal Provision Violated',
  factualFind: 'Factual Findings',
  reqActions: 'Required Corrective Actions',
  corrDeadline: 'Correction Deadline',
  importantNotice: 'IMPORTANT NOTICE — LEGAL CONSEQUENCES',
  contactInfo: 'Contact Information',
  officialSeal: 'Official Seal',
  inspLabel: 'Labour Standards Inspector',
  reprDir: 'Representative Director',
  sampleNote:
    'Sample document for demo only — Not an official government document',
  askAiAgent: 'Ask AI Agent',
  askAiSub: 'Get expert guidance for this inspection',
};

const LangCtx = createContext({ lang: 'en', t: (k) => k, setLang: () => {} });
const useT = () => useContext(LangCtx);
const tFor = (lang) => (key) => TR[key] ?? key;

const CASE = {
  id: 'INS-2026-04827',
  company: 'Hanamura Kikai Co., Ltd.',
  companyJa: '花村機械株式会社',
  address: '2-15-3 Kawaguchi, Saitama Prefecture',
  industry: 'Metal Press Manufacturing',
  employees: 87,
  riskScore: 78,
  priority: 'HIGH',
  trigger: 'Worker complaint (Apr 18) + risk model flag',
  lastInspection: '2023-06-12',
  representative: 'Hanamura Soutarou-san',
};
const INSP = {
  name: 'Mochizuki Ren-san',
  nameJa: '望月 蓮 さん',
  title: 'Senior Labour Standards Inspector',
  titleJa: '主任労働基準監督官',
  office: 'Higashino Labour Standards Inspection Office',
  officeJa: '東野労働基準監督署',
  badge: 'LSI-11-4827',
  joined: '2018-04-01',
  email: 'mochizuki.r@mhlw.go.jp',
};
const ADMIN = {
  name: 'Kirishima Aoi-san',
  nameJa: '霧島 葵 さん',
  title: 'Chief, Higashino LSI Office',
  titleJa: '東野労働基準監督署長',
  office: 'Higashino Labour Standards Inspection Office',
  officeJa: '東野労働基準監督署',
  badge: 'LSI-CHF-2104',
  email: 'kirishima.a@mhlw.go.jp',
};

const Pill = ({ tone = 'slate', children, className = '' }) => {
  const tones = {
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: '',
    purpleSolid: '',
  };
  const inline =
    tone === 'purple'
      ? { background: C.lightest, color: C.darkest, borderColor: C.light }
      : tone === 'purpleSolid'
      ? { background: C.core, color: 'white', borderColor: C.core }
      : {};
  return (
    <span
      style={inline}
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium border rounded ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
};
const Card = ({ children, className = '', style = {} }) => (
  <div
    style={style}
    className={`bg-white border border-slate-200 rounded-md ${className}`}
  >
    {children}
  </div>
);
const SectionTitle = ({ icon: Icon, title, ja, right }) => (
  <div className="flex items-end justify-between mb-3 pb-2 border-b border-slate-200 gap-2">
    <div className="flex items-center gap-2 min-w-0">
      {Icon && (
        <Icon className="w-4 h-4 flex-shrink-0" style={{ color: C.core }} />
      )}
      <h3 className="text-xs sm:text-sm font-semibold text-slate-800 tracking-wide uppercase truncate">
        {title}
      </h3>
      {ja && (
        <span className="text-xs text-slate-500 hidden sm:inline">{ja}</span>
      )}
    </div>
    {right && <div className="flex-shrink-0">{right}</div>}
  </div>
);
const KV = ({ k, v }) => (
  <div className="flex justify-between gap-4 py-1.5 text-sm border-b border-slate-100 last:border-0">
    <div className="text-slate-500">{k}</div>
    <div className="text-slate-800 font-medium text-right">{v}</div>
  </div>
);
const PrimaryBtn = ({ children, className = '', ...props }) => (
  <button
    style={{ background: C.core }}
    onMouseEnter={(e) => {
      if (!e.currentTarget.disabled) e.currentTarget.style.background = C.dark;
    }}
    onMouseLeave={(e) => {
      if (!e.currentTarget.disabled) e.currentTarget.style.background = C.core;
    }}
    className={`px-4 py-2 text-white text-sm font-medium rounded flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition ${className}`}
    {...props}
  >
    {children}
  </button>
);
const SecondaryBtn = ({ children, className = '', ...props }) => (
  <button
    style={{ borderColor: C.core, color: C.core }}
    className={`px-4 py-2 border text-sm font-medium rounded flex items-center justify-center gap-2 hover:bg-purple-50 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);
const RejectBtn = ({ children, className = '', ...props }) => (
  <button
    className={`px-3 py-2 border border-slate-300 hover:border-red-400 hover:text-red-600 text-slate-700 text-xs rounded flex items-center justify-center gap-1 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const DecisionButtons = ({ onConfirm, onReject, status, confirmLabel }) => {
  const { t } = useT();
  if (status === 'confirmed' || status === 'approved')
    return (
      <Pill tone="green">
        <CheckCircle2 className="w-3 h-3" />
        {t('approved')}
      </Pill>
    );
  if (status === 'rejected')
    return (
      <Pill tone="slate">
        <X className="w-3 h-3" />
        {t('rejected')}
      </Pill>
    );
  if (status === 'order_issued')
    return (
      <Pill tone="red">
        <Stamp className="w-3 h-3" />
        {t('issuedOnSite')}
      </Pill>
    );
  return (
    <div className="flex gap-1.5">
      <button
        onClick={onConfirm}
        style={{ background: C.core }}
        onMouseEnter={(e) => (e.currentTarget.style.background = C.dark)}
        onMouseLeave={(e) => (e.currentTarget.style.background = C.core)}
        className="px-2.5 py-1.5 text-white text-xs rounded flex items-center gap-1 transition"
      >
        <Check className="w-3 h-3" />
        {confirmLabel || t('confirm')}
      </button>
      <RejectBtn onClick={onReject} className="px-2.5 py-1.5">
        <X className="w-3 h-3" />
        {t('reject')}
      </RejectBtn>
    </div>
  );
};

const Seal = ({ size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={{ transform: 'rotate(-10deg)' }}
  >
    <circle
      cx="50"
      cy="50"
      r="46"
      fill="none"
      stroke="#dc2626"
      strokeWidth="2.5"
    />
    <circle
      cx="50"
      cy="50"
      r="38"
      fill="none"
      stroke="#dc2626"
      strokeWidth="1.5"
    />
    <text
      x="50"
      y="38"
      fontSize="8"
      fill="#dc2626"
      textAnchor="middle"
      fontWeight="bold"
    >
      SAITAMA
    </text>
    <text x="50" y="49" fontSize="7" fill="#dc2626" textAnchor="middle">
      労働基準
    </text>
    <text x="50" y="59" fontSize="7" fill="#dc2626" textAnchor="middle">
      監督署
    </text>
    <text x="50" y="72" fontSize="6" fill="#dc2626" textAnchor="middle">
      OFFICIAL
    </text>
  </svg>
);

const DC = {
  correctiveRec: {
    legalAuthBody:
      'In accordance with Article 101, Paragraph 1 of the Labour Standards Act, we hereby issue the following corrective recommendation.',
    legalProv:
      'Labour Standards Act Article 37: When an employer extends working hours or has workers work on days off, the employer must pay premium wages calculated at a rate not less than 25% above ordinary wages.',
    findings:
      'Upon review of wage ledgers and time cards for March 2026, overtime premium wages were not properly paid to 30 workers in the Manufacturing Department.',
    shortfall:
      'Total unpaid overtime premium: Approximately ¥1,500,000 affecting 30 workers.',
    actions: [
      'Promptly pay the unpaid overtime premium totaling approximately ¥1,500,000 to the 30 affected workers.',
      'Modify the payroll calculation system to automatically apply the correct premium wage rate for overtime hours.',
      'Inspect wage payment records for all workers for the past six months and confirm whether similar underpayments exist.',
    ],
    notice:
      'Failure to comply may result in penalties under Article 120 of the Labour Standards Act (fine up to ¥300,000) or referral to the Public Prosecutor for criminal prosecution.',
    deadline: 'June 26, 2026 (60 days)',
  },
  prohibOrder: {
    legalAuthBody:
      'Pursuant to Article 98 of the Industrial Safety and Health Act, this Suspension of Use Order is issued due to imminent danger to worker safety.',
    legalProv:
      'ISHA Article 20 + Ordinance Article 130: Press machines must be equipped with safety guards meeting prescribed standards to prevent worker injury.',
    findings:
      'Press machine ABC-2000 (Serial 12345) on Production Line 3 was operating without required safety guard. Workers actively using equipment — risk of amputation injury.',
    actions: [
      'Immediately cease all use of press machine ABC-2000 (S/N 12345).',
      'Install safety guard meeting ISHA Ordinance Article 130 standards before resuming operation.',
      'Contact this office for re-inspection before resuming use of the equipment.',
    ],
    notice:
      'Non-compliance constitutes a criminal offense under ISHA Article 119, punishable by imprisonment up to 6 months or fine up to ¥500,000.',
    deadline: 'Immediate (re-inspection within 30 days)',
  },
};

const PDFViewerModal = ({ doc, onClose }) => {
  const { t } = useT();
  if (!doc) return null;
  const data = DC[doc.docKey] || DC.correctiveRec;
  const isOrder = doc.docKey === 'prohibOrder';
  const titleKey = isOrder ? 'prohibOrder' : 'correctiveRec';
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-md shadow-2xl max-h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-3 md:px-5 py-2.5"
          style={{ background: C.darkest, color: 'white' }}
        >
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium min-w-0">
            <FileText className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {t(titleKey)} · {doc.no}
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button className="p-1.5 hover:bg-white/15 rounded">
              <Printer className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-white/15 rounded">
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/15 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto p-4 md:p-10 bg-slate-100">
          <div
            className="bg-white max-w-3xl mx-auto p-6 md:p-12 shadow-md relative"
            style={{
              fontFamily: '"Times New Roman", Georgia, serif',
              minHeight: '70vh',
            }}
          >
            <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-90">
              <Seal size={90} />
            </div>
            <div
              className="border-b-4 pb-3 mb-5"
              style={{ borderColor: C.darkest }}
            >
              <h1
                className="text-xl md:text-3xl font-bold tracking-wide"
                style={{ color: C.darkest }}
              >
                {t(titleKey)}
              </h1>
              <div className="text-xs md:text-sm text-slate-600 mt-2 grid grid-cols-2 gap-2">
                <div>
                  <strong>{t('documentNo')}:</strong> {doc.no}
                </div>
                <div>
                  <strong>{t('issueDate')}:</strong> April 27, 2026
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div
                className="text-xs font-bold tracking-wider mb-1"
                style={{ color: C.darkest }}
              >
                {t('issuingAuth')}:
              </div>
              <div className="text-sm">{INSP.office}</div>
              <div className="text-sm text-slate-600">{INSP.officeJa}</div>
              <div className="text-sm mt-1">
                <em>{t('inspLabel')}:</em> {INSP.name} ({INSP.nameJa})
              </div>
            </div>
            <div className="mb-4">
              <div
                className="text-xs font-bold tracking-wider mb-1"
                style={{ color: C.darkest }}
              >
                {t('to')}:
              </div>
              <div className="text-sm font-semibold">{CASE.company}</div>
              <div className="text-sm text-slate-600">{CASE.companyJa}</div>
              <div className="text-sm">
                {t('reprDir')}: {CASE.representative}
              </div>
              <div className="text-sm">Address: {CASE.address}</div>
            </div>
            <div className="mb-4">
              <div
                className="text-xs font-bold tracking-wider mb-1"
                style={{ color: C.darkest }}
              >
                {t('legalAuth')}:
              </div>
              <p className="text-sm leading-relaxed">{data.legalAuthBody}</p>
            </div>
            <div
              className="mb-4 border-t-2 pt-3"
              style={{ borderColor: C.lightest }}
            >
              <div
                className="text-sm font-bold tracking-wider mb-2 text-center"
                style={{ color: C.darkest }}
              >
                {t('violsIdent')}
              </div>
              <div
                className="text-sm font-semibold mb-1"
                style={{ color: C.darkest }}
              >
                Item 1:{' '}
                {isOrder
                  ? 'ISHA Article 20 + Ordinance Art. 130'
                  : 'LSA Article 37'}
              </div>
              <div className="ml-2 mb-2">
                <div className="text-xs font-bold mt-2">{t('legalProv')}:</div>
                <p className="text-xs italic text-slate-700 leading-relaxed">
                  {data.legalProv}
                </p>
              </div>
              <div className="ml-2 mb-2">
                <div className="text-xs font-bold mt-2">
                  {t('factualFind')}:
                </div>
                <p className="text-xs leading-relaxed">{data.findings}</p>
                {data.shortfall && (
                  <p className="text-xs font-semibold mt-1">{data.shortfall}</p>
                )}
              </div>
              <div className="ml-2 mb-2">
                <div className="text-xs font-bold mt-2">{t('reqActions')}:</div>
                <ol className="list-decimal list-inside text-xs space-y-1 ml-2 leading-relaxed">
                  {data.actions.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ol>
              </div>
              <div className="ml-2 text-xs">
                <strong>{t('corrDeadline')}:</strong> {data.deadline}
              </div>
            </div>
            <div
              className="border-2 p-3 mb-4 rounded text-xs leading-relaxed"
              style={{ borderColor: '#dc2626', background: '#fef2f2' }}
            >
              <div className="font-bold mb-1" style={{ color: '#dc2626' }}>
                ⚠ {t('importantNotice')}:
              </div>
              <p className="text-slate-700">{data.notice}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-300">
              <div
                className="text-xs font-bold tracking-wider mb-1"
                style={{ color: C.darkest }}
              >
                {t('contactInfo')}:
              </div>
              <div className="text-xs text-slate-600">{INSP.office}</div>
              <div className="text-xs text-slate-600">
                3-15-1 Shintoshin, Chuo-ku, Saitama City 330-0081 · Tel:
                048-600-6204
              </div>
              <div className="flex items-end justify-between mt-6">
                <div>
                  <div className="text-xs text-slate-500 mb-1">
                    {t('inspLabel')}
                  </div>
                  <div
                    className="text-sm italic border-b border-slate-400 pb-1 pr-12"
                    style={{ fontFamily: 'cursive', color: C.darkest }}
                  >
                    {INSP.name}
                  </div>
                  <div className="text-xs mt-1">{INSP.badge}</div>
                </div>
                <div className="text-center">
                  <Seal size={70} />
                  <div className="text-[10px] text-slate-500 mt-1">
                    {t('officialSeal')}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center text-[10px] text-slate-400 italic border-t border-slate-200 pt-2">
              {t('sampleNote')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginScreen = ({ onLogin, lang, setLang }) => {
  const [role, setRole] = useState('inspector');
  const [badge, setBadge] = useState('LSI-11-4827');
  const [pw, setPw] = useState('demo');
  const t = tFor(lang);
  useEffect(() => {
    setBadge(role === 'inspector' ? 'LSI-11-4827' : 'LSI-CHF-2104');
  }, [role]);
  const submit = () => {
    if (badge && pw) onLogin(role);
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center p-3 md:p-6"
      style={{
        fontFamily: FONT,
        background: `linear-gradient(135deg, ${C.lightest} 0%, white 50%, ${C.lightest} 100%)`,
      }}
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white shadow-2xl rounded-lg overflow-hidden">
        <div
          className="hidden lg:flex flex-col justify-between p-10 text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${C.darkest} 0%, ${C.dark} 60%, ${C.core} 100%)`,
          }}
        >
          <div
            className="absolute -right-20 -top-20 w-72 h-72 rounded-full opacity-20"
            style={{ background: C.light }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded bg-white/15 flex items-center justify-center">
                <Stamp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-wide">
                  JAPAN LSB
                </div>
                <div className="text-[10px] opacity-80">労働基準監督</div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold leading-tight">
              {t('platform')}
            </h1>
            <p className="text-sm opacity-90 mt-3 max-w-sm">
              {t('platformDesc')}
            </p>
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-3 text-xs">
            <div className="border border-white/20 rounded p-3">
              <div className="text-2xl font-semibold">75%</div>
              <div className="opacity-80">Time savings</div>
            </div>
            <div className="border border-white/20 rounded p-3">
              <div className="text-2xl font-semibold">+22%</div>
              <div className="opacity-80">Accuracy gain</div>
            </div>
          </div>
        </div>
        <div
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          className="p-6 md:p-10 flex flex-col justify-center"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 lg:hidden">
              <div
                style={{ background: C.core }}
                className="w-8 h-8 rounded text-white flex items-center justify-center"
              >
                <Stamp className="w-4 h-4" />
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: C.darkest }}
              >
                Japan LSB
              </div>
            </div>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="ml-auto text-xs border rounded px-2 py-1.5"
              style={{ borderColor: C.core, color: C.core }}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native}
                </option>
              ))}
            </select>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">
            {t('signIn')}
          </h2>
          <p className="text-sm text-slate-500 mt-1">{t('authPersonnel')}</p>
          <div
            className="mt-6 grid grid-cols-2 gap-0 border rounded overflow-hidden"
            style={{ borderColor: C.core }}
          >
            {[
              { id: 'inspector', label: t('inspector'), icon: User },
              { id: 'admin', label: t('administrator'), icon: ShieldCheck },
            ].map((r) => {
              const Icon = r.icon,
                active = role === r.id;
              return (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  style={active ? { background: C.core, color: 'white' } : {}}
                  className={`flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition ${
                    active ? '' : 'text-slate-600 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-700 uppercase tracking-wider">
                {t('badgeId')}
              </label>
              <input
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                style={{ borderColor: C.light }}
                className="mt-1 w-full px-3 py-2.5 border rounded text-sm focus:outline-none font-mono"
              />
            </div>
            <div>
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-medium text-slate-700 uppercase tracking-wider">
                  {t('password')}
                </label>
                <a
                  className="text-xs hover:underline cursor-pointer"
                  style={{ color: C.core }}
                >
                  {t('forgotPwd')}
                </a>
              </div>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                style={{ borderColor: C.light }}
                className="mt-1 w-full px-3 py-2.5 border rounded text-sm focus:outline-none"
              />
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                defaultChecked
                style={{ accentColor: C.core }}
              />
              {t('rememberDev')}
            </label>
            <button
              type="button"
              onClick={submit}
              style={{ background: C.core }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.dark)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.core)}
              className="w-full py-3 text-white font-medium rounded text-sm flex items-center justify-center gap-2 transition"
            >
              <Lock className="w-4 h-4" />
              {t('signInSecurely')}
            </button>
          </div>
          <div className="mt-6 pt-5 border-t border-slate-200 text-[11px] text-slate-500">
            <strong>{t('demoCreds')}</strong> — {t('inspector')}:{' '}
            <code className="bg-slate-100 px-1 rounded">LSI-11-4827</code> ·{' '}
            {t('administrator')}:{' '}
            <code className="bg-slate-100 px-1 rounded">LSI-CHF-2104</code> ·{' '}
            {t('password')}:{' '}
            <code className="bg-slate-100 px-1 rounded">demo</code>
          </div>
        </div>
      </div>
    </div>
  );
};

const LanguageDropdown = () => {
  const ctx = useContext(LangCtx);
  const { lang } = ctx;
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs px-2 md:px-2.5 py-1.5 border rounded hover:bg-purple-50"
        style={{ borderColor: C.core, color: C.core }}
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="font-medium hidden sm:inline">{current.native}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-full mt-1 bg-white border rounded shadow-lg z-20 w-44"
            style={{ borderColor: C.light }}
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  ctx.setLang(l.code);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex justify-between items-center hover:bg-purple-50 ${
                  lang === l.code ? 'font-semibold' : ''
                }`}
                style={
                  lang === l.code
                    ? { background: C.lightest, color: C.darkest }
                    : {}
                }
              >
                <span>{l.native}</span>
                <span className="text-slate-400">{l.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProfileDropdown = ({ user, role, goto, onLogout }) => {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const initial = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-1.5 py-1 rounded hover:bg-purple-50"
      >
        <div
          style={{ background: C.core }}
          className="w-7 h-7 rounded-full text-white text-xs font-semibold flex items-center justify-center"
        >
          {initial}
        </div>
        <ChevronDown className="w-3 h-3 text-slate-500 hidden md:block" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-full mt-1 bg-white border rounded shadow-lg z-20 w-64"
            style={{ borderColor: C.light }}
          >
            <div
              className="p-3 border-b"
              style={{ borderColor: C.lightest, background: C.lightest + '40' }}
            >
              <div className="flex items-center gap-2">
                <div
                  style={{ background: C.core }}
                  className="w-9 h-9 rounded-full text-white text-sm font-semibold flex items-center justify-center"
                >
                  {initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-900 truncate">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {user.title}
                  </div>
                </div>
              </div>
              <Pill tone="purple" className="mt-2">
                {role === 'admin' ? t('administrator') : t('inspector')} ·{' '}
                {user.badge}
              </Pill>
            </div>
            <button
              onClick={() => {
                goto('profile');
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-purple-50 flex items-center gap-2"
            >
              <User className="w-3.5 h-3.5" />
              {t('profile')}
            </button>
            <button className="w-full text-left px-3 py-2 text-xs hover:bg-purple-50 flex items-center gap-2">
              <Settings className="w-3.5 h-3.5" />
              Settings
            </button>
            <button
              onClick={onLogout}
              className="w-full text-left px-3 py-2 text-xs hover:bg-red-50 text-red-600 flex items-center gap-2 border-t"
              style={{ borderColor: C.lightest }}
            >
              <LogOut className="w-3.5 h-3.5" />
              {t('signOut')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const INSPECTOR_NAV = [
  { id: 'home', label: 'caseQueue', sub: 'allCases', icon: LayoutDashboard },
  {
    id: 'briefing',
    label: 'preInspBriefing',
    sub: 'planning',
    icon: FileSearch,
  },
  { id: 'live', label: 'liveInspection', sub: 'onSite', icon: Radio },
  { id: 'review', label: 'violationReview', sub: 'enforcement', icon: Scale },
  { id: 'issue', label: 'documentIssuance', sub: 'delivery', icon: Send },
  {
    id: 'followup',
    label: 'followUpClosure',
    sub: 'verification',
    icon: ClipboardCheck,
  },
  { id: 'analytics', label: 'analytics', sub: 'insights', icon: BarChart3 },
  { id: 'profile', label: 'profile', sub: 'myAccount', icon: User },
];
const ADMIN_NAV = [
  {
    id: 'admin-home',
    label: 'officeOverview',
    sub: 'dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'approvals',
    label: 'approvals',
    sub: 'criminalRef',
    icon: ShieldCheck,
    badge: 3,
  },
  { id: 'inspectors', label: 'inspRoster', sub: 'manageTeam', icon: Users },
  {
    id: 'admin-analytics',
    label: 'regAnalytics',
    sub: 'performance',
    icon: BarChart3,
  },
  { id: 'profile', label: 'profile', sub: 'myAccount', icon: User },
];

const Sidebar = ({
  phase,
  setPhase,
  completed,
  role,
  mobileOpen,
  setMobileOpen,
}) => {
  const { t } = useT();
  const nav = role === 'admin' ? ADMIN_NAV : INSPECTOR_NAV;
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        style={{ background: C.darkest }}
        className={`text-white flex flex-col flex-shrink-0 fixed md:static z-40 h-full w-60 transition-transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
              <Stamp className="w-4 h-4" style={{ color: C.darkest }} />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">
                Japan LSB
              </div>
              <div className="text-[10px] opacity-70 leading-tight">
                労働基準監督
              </div>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1 hover:bg-white/10 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {nav.map((p) => {
            const Icon = p.icon,
              isActive = phase === p.id,
              isDone = completed.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => {
                  setPhase(p.id);
                  setMobileOpen(false);
                }}
                style={
                  isActive
                    ? {
                        background: 'rgba(255,255,255,0.1)',
                        borderLeftColor: C.core,
                      }
                    : { borderLeftColor: 'transparent' }
                }
                className={`w-full flex items-center gap-3 px-5 py-3 text-left transition border-l-2 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="relative">
                  <Icon
                    className="w-4 h-4"
                    style={isActive ? { color: C.core } : {}}
                  />
                  {isDone && (
                    <CheckCircle2
                      className="w-3 h-3 absolute -bottom-1 -right-1 text-emerald-300 rounded-full"
                      style={{ background: C.darkest }}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate flex items-center gap-2">
                    {t(p.label)}
                    {p.badge && (
                      <span
                        className="text-[10px] px-1.5 rounded-full font-semibold"
                        style={{ background: C.core }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] opacity-60">{t(p.sub)}</div>
                </div>
                {isActive && (
                  <CircleDot className="w-3 h-3" style={{ color: C.core }} />
                )}
              </button>
            );
          })}
        </nav>
        <div className="px-5 py-3 border-t border-white/10 text-[10px] opacity-80">
          <div>v2.4 · Multimodal Intelligence</div>
          <div className="opacity-70">© MHLW · 厚生労働省</div>
        </div>
      </aside>
    </>
  );
};

const TopBar = ({
  phase,
  online,
  setOnline,
  user,
  role,
  goto,
  onLogout,
  setMobileOpen,
}) => {
  const { t } = useT();
  const allNav = [...INSPECTOR_NAV, ...ADMIN_NAV];
  const current = allNav.find((p) => p.id === phase) || allNav[0];
  const homeId = role === 'admin' ? 'admin-home' : 'home';
  const isHome = phase === homeId;
  const backMap = {
    briefing: 'home',
    live: 'briefing',
    review: 'live',
    issue: 'review',
    followup: 'issue',
    analytics: 'home',
    profile: homeId,
    approvals: 'admin-home',
    inspectors: 'admin-home',
    'admin-analytics': 'admin-home',
  };
  const backTarget = backMap[phase] || homeId;
  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-2 md:px-4 flex-shrink-0 gap-2">
      <div className="flex items-center gap-1 md:gap-1.5 min-w-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 hover:bg-purple-50 rounded transition flex-shrink-0"
        >
          <Menu className="w-5 h-5" style={{ color: C.darkest }} />
        </button>
        <button
          onClick={() => goto(homeId)}
          className="flex items-center gap-1.5 px-1.5 py-1 hover:bg-purple-50 rounded transition flex-shrink-0"
        >
          <div
            style={{ background: C.darkest }}
            className="w-7 h-7 rounded text-white flex items-center justify-center flex-shrink-0"
          >
            <Stamp className="w-3.5 h-3.5" />
          </div>
          <div className="hidden md:block leading-tight text-left">
            <div className="text-xs font-semibold" style={{ color: C.darkest }}>
              Japan LSB
            </div>
            <div className="text-[9px] text-slate-500">労働基準監督</div>
          </div>
        </button>
        {!isHome && (
          <button
            onClick={() => goto(backTarget)}
            className="flex items-center gap-0.5 ml-1 px-2 py-1 hover:bg-purple-50 rounded text-xs transition flex-shrink-0"
            style={{ color: C.core }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">{t('back')}</span>
          </button>
        )}
        <ChevronRight className="w-3 h-3 text-slate-400 mx-0.5 hidden md:block flex-shrink-0" />
        <div className="text-sm font-semibold text-slate-800 truncate">
          {t(current.label)}
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        <button
          onClick={() => setOnline(!online)}
          className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded border ${
            online
              ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
              : 'border-amber-200 text-amber-700 bg-amber-50'
          }`}
        >
          {online ? (
            <Wifi className="w-3 h-3" />
          ) : (
            <WifiOff className="w-3 h-3" />
          )}
          <span className="hidden sm:inline">
            {online ? t('online') : t('offline')}
          </span>
        </button>
        <LanguageDropdown />
        <button className="relative text-slate-400 hover:text-slate-700 hidden sm:block">
          <Bell className="w-4 h-4" />
          <span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
            style={{ background: C.core }}
          />
        </button>
        <ProfileDropdown
          user={user}
          role={role}
          goto={goto}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
};

const HomeScreen = ({ goto }) => {
  const { t } = useT();
  const cases = [
    { ...CASE },
    {
      id: 'INS-2026-04812',
      company: 'Sakuragi Logistics K.K.',
      companyJa: '桜木ロジスティクス',
      address: 'Higashino Ward, Saitama',
      industry: 'Warehousing',
      employees: 142,
      riskScore: 64,
      priority: 'MEDIUM',
      trigger: 'Annual cycle',
    },
    {
      id: 'INS-2026-04795',
      company: 'Tonan Foods Inc.',
      companyJa: '東南食品株式会社',
      address: 'Higashino Ward, Saitama',
      industry: 'Food Processing',
      employees: 56,
      riskScore: 41,
      priority: 'LOW',
      trigger: 'Annual cycle',
    },
  ];
  const stats = [
    { l: t('todayInsp'), v: 3, sub: '1 high priority', icon: Radio },
    { l: t('pendingCorr'), v: 7, sub: '2 due this week', icon: Clock },
    { l: t('overdueRpt'), v: 1, sub: 'Escalation needed', icon: AlertTriangle },
    {
      l: t('reInspDue'),
      v: 2,
      sub: 'Verification phase',
      icon: ClipboardCheck,
    },
  ];
  return (
    <div className="p-4 md:p-6 space-y-5 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
          {t('goodMorning')}, {INSP.name}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {INSP.officeJa} · {INSP.office}
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.l} className="p-3 md:p-4">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider truncate">
                    {s.l}
                  </div>
                  <div className="text-2xl md:text-3xl font-semibold text-slate-900 mt-1 md:mt-2">
                    {s.v}
                  </div>
                  <div className="text-[10px] md:text-xs text-slate-500 mt-1">
                    {s.sub}
                  </div>
                </div>
                <div
                  style={{ background: C.core }}
                  className="w-7 h-7 md:w-8 md:h-8 rounded flex items-center justify-center text-white flex-shrink-0"
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <Card
        className="p-4 border-l-4"
        style={{
          borderLeftColor: C.core,
          background: `linear-gradient(90deg, ${C.lightest}40 0%, white 100%)`,
        }}
      >
        <div className="flex items-start gap-3">
          <div
            style={{ background: C.core }}
            className="w-8 h-8 rounded text-white flex items-center justify-center flex-shrink-0"
          >
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-sm font-semibold text-slate-800">
                {t('dailyPlan')}
              </span>
              <Pill tone="green">{t('apprByChief')}</Pill>
            </div>
            <p className="text-xs text-slate-600">
              3 inspections assigned for today based on ML risk scoring,
              complaint records, and workload balancing.
            </p>
          </div>
        </div>
      </Card>
      <div>
        <SectionTitle
          icon={Briefcase}
          title={t('todaysCases')}
          ja="本日の担当案件"
        />
        <div className="space-y-3">
          {cases.map((c, i) => {
            const isPrimary = i === 0;
            const tone =
              c.priority === 'HIGH'
                ? 'red'
                : c.priority === 'MEDIUM'
                ? 'amber'
                : 'slate';
            const priLabel =
              c.priority === 'HIGH'
                ? t('highPri')
                : c.priority === 'MEDIUM'
                ? t('medPri')
                : t('lowPri');
            return (
              <Card
                key={c.id}
                className="p-4 md:p-5"
                style={isPrimary ? { boxShadow: `0 0 0 2px ${C.core}` } : {}}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Pill tone={tone}>{priLabel}</Pill>
                      <Pill tone="slate">
                        <Hash className="w-3 h-3" />
                        {c.id}
                      </Pill>
                      {isPrimary && (
                        <Pill tone="purpleSolid">{t('upNext')}</Pill>
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-slate-900">
                      {c.company}
                    </h4>
                    <div className="text-xs text-slate-500">{c.companyJa}</div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-3 text-xs">
                      <div>
                        <span className="text-slate-400">
                          {t('industry')}:{' '}
                        </span>
                        <span className="text-slate-700">{c.industry}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">{t('workers')}: </span>
                        <span className="text-slate-700">{c.employees}</span>
                      </div>
                      <div className="col-span-2">
                        <MapPin className="w-3 h-3 inline mr-1 text-slate-400" />
                        <span className="text-slate-700">{c.address}</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-slate-500">
                      <span className="text-slate-400">{t('trigger')}: </span>
                      {c.trigger} ·{' '}
                      <span className="text-slate-400">{t('lastInsp')}: </span>
                      {c.lastInspection || '—'}
                    </div>
                  </div>
                  <div className="flex md:flex-col items-center md:items-end gap-3 justify-between">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                        {t('riskScore')}
                      </div>
                      <div
                        className={`text-2xl md:text-3xl font-bold ${
                          c.riskScore >= 70
                            ? 'text-red-600'
                            : c.riskScore >= 50
                            ? 'text-amber-600'
                            : 'text-slate-700'
                        }`}
                      >
                        {c.riskScore}
                      </div>
                    </div>
                    {isPrimary ? (
                      <PrimaryBtn onClick={() => goto('briefing')}>
                        {t('openBriefing')}
                        <ArrowRight className="w-4 h-4" />
                      </PrimaryBtn>
                    ) : (
                      <button className="px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs rounded">
                        {t('view')}
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const BriefingScreen = ({ goto }) => {
  const { t } = useT();
  return (
    <div className="p-4 md:p-6 space-y-5 max-w-6xl">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <Pill tone="purpleSolid" className="mb-2">
            <Sparkles className="w-3 h-3" />
            {t('aiBriefing')}
          </Pill>
          <h2 className="text-lg md:text-xl font-semibold text-slate-900">
            {CASE.company}
          </h2>
          <p className="text-sm text-slate-500">
            {CASE.companyJa} · {CASE.address}
          </p>
        </div>
        <Pill tone="green">
          <Wifi className="w-3 h-3" />
          {t('syncedOff')}
        </Pill>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        <Card className="p-4">
          <SectionTitle title={t('entProfile')} ja="事業所情報" />
          <KV k="Representative" v={CASE.representative} />
          <KV k={t('industry')} v={CASE.industry} />
          <KV k={t('workers')} v={CASE.employees} />
          <KV
            k={t('riskScore')}
            v={
              <span className="text-red-600 font-semibold">
                {CASE.riskScore} / 100
              </span>
            }
          />
          <KV k={t('lastInsp')} v={CASE.lastInspection} />
        </Card>
        <Card className="p-4 md:col-span-2">
          <SectionTitle
            icon={AlertTriangle}
            title={t('prevViol')}
            ja="過去の違反歴"
            right={<Pill tone="amber">⚠ {t('repeatRisk')}</Pill>}
          />
          <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-amber-900">
                  LSA Article 37 (2023) — Unpaid Overtime Premium
                </div>
                <div className="text-amber-800 mt-1">
                  Employer submitted correction report claiming compliance.{' '}
                  <strong>Verify during this inspection.</strong> If same
                  violation recurs, system will recommend criminal referral
                  (送検).
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-4">
          <SectionTitle icon={FileCheck} title={t('industryRegs')} />
          <ul className="text-sm space-y-2">
            {[
              { code: 'LSA Art. 32', text: 'Working hours (40 hr/week max)' },
              { code: 'LSA Art. 36', text: '36 Agreement (45 hr/mo cap)' },
              { code: 'LSA Art. 37', text: 'Overtime premium (≥1.25×)' },
              { code: 'LSA Art. 89', text: 'Work rules filed with LSI office' },
              { code: 'ISHA Art. 20', text: 'Machinery safety guards' },
            ].map((r) => (
              <li key={r.code} className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1"
                  defaultChecked
                  style={{ accentColor: C.core }}
                />
                <div>
                  <span
                    className="font-mono text-xs text-slate-700 px-1.5 py-0.5 rounded"
                    style={{ background: C.lightest }}
                  >
                    {r.code}
                  </span>
                  <span className="ml-2 text-slate-600">{r.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-4">
          <SectionTitle
            icon={Sparkles}
            title={t('suggQs')}
            right={<Pill tone="purple">{t('aiGen')}</Pill>}
          />
          <ol className="text-sm space-y-2 text-slate-700">
            {[
              'Has the 2023 overtime premium correction been sustained?',
              'Current 36 Agreement — what overtime hour limit is specified?',
              'Are work rules currently filed with this office?',
              'Walk me through press machine operations on Production Line 3.',
              'When were annual health examinations last conducted?',
            ].map((q, i) => (
              <li key={i} className="flex gap-2">
                <span
                  className="font-mono font-semibold flex-shrink-0 px-1.5 rounded text-xs flex items-center"
                  style={{ background: C.lightest, color: C.darkest }}
                >
                  {i + 1}
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
      <Card className="p-4">
        <SectionTitle icon={Calendar} title={t('recTiming')} />
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="text-sm text-slate-700">
              System suggests <strong>Today, 10:00 – 11:30 AM</strong>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Manufacturing most active 10am–3pm · ~22 min travel
            </div>
          </div>
          <Pill tone="amber">
            ⚠ Inspector decides: announced vs unannounced
          </Pill>
        </div>
      </Card>
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={() => goto('home')}
          className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('back')}
        </button>
        <PrimaryBtn onClick={() => goto('live')}>
          <Radio className="w-4 h-4" />
          {t('beginInsp')}
        </PrimaryBtn>
      </div>
    </div>
  );
};

const LiveInspectionScreen = ({
  goto,
  alerts,
  setAlerts,
  violations,
  setViolations,
  captures,
  setCaptures,
  danger,
  setDanger,
  dangerStatus,
  setDangerStatus,
  elapsed,
  paused,
  setPaused,
  stopped,
  setStopped,
}) => {
  const { t } = useT();
  const [showStopConfirm, setShowStopConfirm] = useState(false);
  const autoTriggeredRef = useRef(false);

  const triggerPhotoDoc = () => {
    setCaptures((c) => [
      ...c,
      { type: 'doc', label: 'Wage ledger Mar 2026', time: '+0:42' },
    ]);
    setTimeout(() => {
      setAlerts((a) => [
        {
          id: Date.now(),
          level: 'amber',
          source: 'Document Analysis',
          time: '+0:46',
          title: 'LSA Article 37 — Unpaid Overtime Premium',
          body: 'Cross-check shows overtime premium underpaid by ~¥1,500,000 across 30 manufacturing workers.',
        },
        ...a,
      ]);
      setViolations((v) => [
        ...v,
        {
          id: 'v1',
          code: 'LSA Art. 37',
          sev: 'substantive',
          title: 'Unpaid overtime premium',
          amount: '¥1,500,000',
          workers: 30,
          status: 'pending',
        },
      ]);
    }, 600);
  };
  const triggerVoice36 = () => {
    setCaptures((c) => [
      ...c,
      { type: 'voice', label: '36 Agreement interview (1:24)', time: '+2:12' },
    ]);
    setTimeout(() => {
      setAlerts((a) => [
        {
          id: Date.now(),
          level: 'amber',
          source: 'Voice Analysis',
          time: '+2:18',
          title: 'LSA Article 36 — Overtime Cap Exceeded',
          body: '36 Agreement on file specifies 100 hr/month limit. Legal max is 45 hr/month.',
        },
        ...a,
      ]);
      setViolations((v) => [
        ...v,
        {
          id: 'v2',
          code: 'LSA Art. 36',
          sev: 'substantive',
          title: '36 Agreement exceeds legal cap',
          amount: '100 hr vs 45 hr',
          status: 'pending',
        },
      ]);
    }, 600);
  };
  const triggerDanger = () => {
    setCaptures((c) => [
      ...c,
      { type: 'photo', label: 'Press machine ABC-2000, Line 3', time: '+4:08' },
    ]);
    setTimeout(() => {
      setAlerts((a) => [
        {
          id: Date.now(),
          level: 'red',
          source: 'Hazard Detection',
          time: '+4:11',
          title: '🚨 IMMINENT DANGER — Unguarded Press Machine',
          body: 'Computer vision detected press machine without safety guard. Workers using it — amputation risk. ISHA Art. 20.',
        },
        ...a,
      ]);
      setViolations((v) => [
        ...v,
        {
          id: 'v3',
          code: 'ISHA Art. 20',
          sev: 'imminent',
          title: 'Unguarded press machine',
          equipment: 'ABC-2000 S/N 12345',
          location: 'Line 3',
          status: 'pending',
        },
      ]);
      setDanger(true);
    }, 600);
  };
  const triggerWorkRules = () => {
    setCaptures((c) => [
      ...c,
      {
        type: 'doc',
        label: 'Auto: Enterprise DB query (work rules)',
        time: '+1:24',
        auto: true,
      },
    ]);
    setTimeout(() => {
      setAlerts((a) => [
        {
          id: Date.now(),
          level: 'blue',
          source: 'Auto DB Check',
          time: '+1:26',
          title: 'LSA Article 89 — Work Rules Not on File',
          body: 'Background check: No work rules registered with Higashino LSI office (87 workers, ≥10 required).',
        },
        ...a,
      ]);
      setViolations((v) => [
        ...v,
        {
          id: 'v4',
          code: 'LSA Art. 89',
          sev: 'minor',
          title: 'Work rules not filed',
          status: 'pending',
        },
      ]);
    }, 600);
  };

  // Auto-trigger enterprise database query on screen mount
  useEffect(() => {
    if (autoTriggeredRef.current) return;
    const tm = setTimeout(() => {
      if (autoTriggeredRef.current) return;
      autoTriggeredRef.current = true;
      triggerWorkRules();
    }, 1800);
    return () => clearTimeout(tm);
    // eslint-disable-next-line
  }, []);

  const handleAskAI = () => {
    alert('Ask AI Agent — destination to be configured in next step');
  };

  const setVStatus = (id, status) =>
    setViolations((vs) => vs.map((v) => (v.id === id ? { ...v, status } : v)));
  const issueOrder = () => {
    setVStatus('v3', 'order_issued');
    setDangerStatus('issued');
    setDanger(false);
  };
  const rejectOrder = () => {
    setVStatus('v3', 'rejected');
    setDangerStatus('rejected');
    setDanger(false);
  };
  const allDecided =
    violations.length >= 4 && violations.every((v) => v.status !== 'pending');
  const aiActive = !paused && !stopped;

  return (
    <div className="flex flex-col md:flex-row md:h-full md:overflow-hidden">
      <style>{`
        @keyframes aiGlowPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(161, 0, 255, 0.55), 0 0 24px 4px rgba(161, 0, 255, 0.45), 0 0 48px 8px rgba(117, 0, 192, 0.25), inset 0 0 20px rgba(255, 255, 255, 0.08);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(161, 0, 255, 0), 0 0 36px 8px rgba(161, 0, 255, 0.75), 0 0 72px 16px rgba(117, 0, 192, 0.45), inset 0 0 30px rgba(255, 255, 255, 0.18);
          }
        }
        @keyframes aiShimmer {
          0% { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(220%) skewX(-20deg); }
        }
        @keyframes aiSparkleRotate {
          0%, 100% { transform: rotate(0deg) scale(1); opacity: 1; }
          50% { transform: rotate(180deg) scale(1.15); opacity: 0.85; }
        }
        @keyframes aiFloatDot {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-3px) scale(1.3); opacity: 1; }
        }
        @keyframes aiGradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <div className="flex-1 min-w-0 p-4 md:p-6 overflow-y-auto">
        <div
          style={{ background: C.darkest }}
          className="text-white rounded-md p-3 flex items-center justify-between mb-4 flex-wrap gap-2"
        >
          <div className="flex items-center gap-2 md:gap-4 text-xs flex-wrap">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" style={{ color: C.core }} />
              35.83°N, 139.72°E
            </span>
            <span className="opacity-50 hidden md:inline">·</span>
            <span className="hidden md:inline">GPS: Hanamura Kikai site</span>
            <span className="opacity-50">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {elapsed}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {!stopped && (
              <>
                <span
                  className={`w-2 h-2 rounded-full ${
                    paused ? 'bg-amber-300' : 'bg-red-400 animate-pulse'
                  }`}
                />
                <span className="text-xs font-semibold tracking-wider">
                  {paused ? 'PAUSED' : t('recording')}
                </span>
                <button
                  onClick={() => setPaused(!paused)}
                  className="ml-2 flex items-center gap-1 px-2 py-1 bg-white/15 hover:bg-white/25 rounded text-xs transition"
                >
                  {paused ? (
                    <>
                      <Play className="w-3 h-3" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3" />
                      Pause
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowStopConfirm(true)}
                  className="flex items-center gap-1 px-2 py-1 bg-red-500/80 hover:bg-red-500 rounded text-xs transition"
                >
                  <Square className="w-3 h-3 fill-white" />
                  Stop
                </button>
              </>
            )}
            {stopped && (
              <>
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="text-xs font-semibold tracking-wider">
                  STOPPED
                </span>
              </>
            )}
          </div>
        </div>

        {showStopConfirm && (
          <div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => setShowStopConfirm(false)}
          >
            <Card
              className="p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Square className="w-5 h-5 text-red-600 fill-red-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Stop the inspection?
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Recording will end. You can still review and confirm
                    captured violations, but no new evidence can be captured.
                    This cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <RejectBtn
                  onClick={() => setShowStopConfirm(false)}
                  className="px-4 py-2"
                >
                  {t('cancel')}
                </RejectBtn>
                <button
                  onClick={() => {
                    setStopped(true);
                    setPaused(false);
                    setShowStopConfirm(false);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded flex items-center gap-2"
                >
                  <Square className="w-4 h-4 fill-white" />
                  Stop inspection
                </button>
              </div>
            </Card>
          </div>
        )}

        <SectionTitle
          icon={Camera}
          title={t('evidCapture')}
          right={<Pill tone="purpleSolid">{t('aiAssist')}</Pill>}
        />
        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
          {[
            {
              onClick: triggerPhotoDoc,
              Icon: FileText,
              label: t('scanDoc'),
              sub: 'Ledger / agreement',
            },
            {
              onClick: triggerVoice36,
              Icon: Mic,
              label: t('voiceNote'),
              sub: 'NLP scan',
            },
            {
              onClick: triggerDanger,
              Icon: Camera,
              label: t('photoWp'),
              sub: 'Photo/video hazard scan',
              danger: true,
            },
          ].map((b, i) => {
            const Icon = b.Icon;
            const disabled = paused || stopped;
            return (
              <button
                key={i}
                onClick={b.onClick}
                disabled={disabled}
                className={`bg-white border-2 rounded-md p-3 md:p-5 flex flex-col items-center gap-1 md:gap-2 transition disabled:opacity-40 disabled:cursor-not-allowed ${
                  b.danger
                    ? 'border-red-300 hover:border-red-600 hover:bg-red-50'
                    : 'hover:bg-purple-50'
                }`}
                style={!b.danger ? { borderColor: C.core } : {}}
              >
                <Icon
                  className="w-5 h-5 md:w-6 md:h-6"
                  style={{ color: b.danger ? '#dc2626' : C.core }}
                />
                <div
                  className={`text-xs md:text-sm font-semibold ${
                    b.danger ? 'text-red-800' : 'text-slate-800'
                  }`}
                >
                  {b.label}
                </div>
                <div
                  className={`text-[10px] text-center ${
                    b.danger ? 'text-red-600' : 'text-slate-500'
                  } hidden md:block`}
                >
                  {b.sub}
                </div>
              </button>
            );
          })}
        </div>

        {/* ★ ASK AI AGENT — Hero CTA */}
        <div className="relative mb-6 mt-2">
          <div
            className="absolute -top-2 left-4 z-10 px-2 py-0.5 text-[9px] font-bold tracking-widest rounded-full text-white flex items-center gap-1"
            style={{
              background: C.darkest,
              boxShadow: '0 2px 8px rgba(70, 0, 115, 0.4)',
            }}
          >
            <Sparkles className="w-2.5 h-2.5" /> RECOMMENDED
          </div>
          <button
            onClick={handleAskAI}
            disabled={!aiActive}
            className="w-full relative overflow-hidden rounded-xl disabled:opacity-40 disabled:cursor-not-allowed group transition-transform hover:scale-[1.01] active:scale-[0.99]"
            style={{
              animation: aiActive
                ? 'aiGradientShift 6s ease-in-out infinite'
                : 'none',
              background: `linear-gradient(120deg, ${C.darkest} 0%, ${C.dark} 35%, ${C.core} 65%, ${C.dark} 100%)`,
              backgroundSize: '300% 300%',
              padding: '20px 24px',
            }}
          >
            {aiActive && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full w-1/3"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                    animation: 'aiShimmer 3.2s linear infinite',
                  }}
                />
              </div>
            )}
            {aiActive && (
              <>
                <span
                  className="absolute top-3 left-8 w-1 h-1 rounded-full bg-white pointer-events-none"
                  style={{ animation: 'aiFloatDot 2s ease-in-out infinite' }}
                />
                <span
                  className="absolute top-5 right-12 w-1.5 h-1.5 rounded-full bg-white pointer-events-none"
                  style={{
                    animation: 'aiFloatDot 2.5s ease-in-out infinite',
                    animationDelay: '0.4s',
                  }}
                />
                <span
                  className="absolute bottom-3 left-1/3 w-1 h-1 rounded-full bg-white pointer-events-none"
                  style={{
                    animation: 'aiFloatDot 2.2s ease-in-out infinite',
                    animationDelay: '0.8s',
                  }}
                />
                <span
                  className="absolute bottom-4 right-1/4 w-0.5 h-0.5 rounded-full bg-white pointer-events-none"
                  style={{
                    animation: 'aiFloatDot 1.8s ease-in-out infinite',
                    animationDelay: '1.2s',
                  }}
                />
              </>
            )}
            <div className="relative flex items-center justify-center gap-3 md:gap-4 text-white">
              <div className="relative flex-shrink-0">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                />
                <div
                  className="relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(255,255,255,0.4)',
                  }}
                >
                  <Bot
                    className="w-6 h-6 md:w-7 md:h-7"
                    style={{
                      animation: aiActive
                        ? 'aiSparkleRotate 4s ease-in-out infinite'
                        : 'none',
                    }}
                  />
                </div>
                <Sparkles
                  className="w-3.5 h-3.5 absolute -top-1 -right-1 text-yellow-200"
                  style={{
                    animation: aiActive
                      ? 'aiFloatDot 1.5s ease-in-out infinite'
                      : 'none',
                    filter: 'drop-shadow(0 0 4px rgba(255,255,150,0.8))',
                  }}
                />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base md:text-lg font-bold tracking-wide">
                    {t('askAiAgent')}
                  </span>
                  <span
                    className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded font-semibold"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                  >
                    BETA
                  </span>
                </div>
                <div className="text-[11px] md:text-xs opacity-90 mt-0.5 truncate">
                  {t('askAiSub')} · Live regulations, precedent cases, decision
                  support
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <MessageSquarePlus className="w-4 h-4 opacity-70 hidden sm:block" />
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </button>
          {!aiActive && (
            <div className="text-[10px] text-slate-500 text-center mt-1.5 italic">
              AI Agent paused while recording is stopped
            </div>
          )}
        </div>

        <SectionTitle icon={FileText} title={t('capturedEv')} />
        {captures.length === 0 ? (
          <div
            className="text-xs text-slate-400 italic py-4 text-center border border-dashed rounded"
            style={{ borderColor: C.light }}
          >
            {t('noEvid')}
          </div>
        ) : (
          <div className="space-y-2 mb-5">
            {captures.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white border border-slate-200 rounded p-2.5 text-sm"
              >
                {c.type === 'photo' && (
                  <Camera className="w-4 h-4" style={{ color: C.core }} />
                )}
                {c.type === 'voice' && (
                  <Mic className="w-4 h-4" style={{ color: C.core }} />
                )}
                {c.type === 'doc' && (
                  <FileText className="w-4 h-4" style={{ color: C.core }} />
                )}
                <span className="flex-1 text-slate-700 truncate">
                  {c.label}
                </span>
                <span className="text-xs text-slate-400">{c.time}</span>
                {c.auto ? (
                  <Pill tone="purple">
                    <Sparkles className="w-3 h-3" />
                    Auto
                  </Pill>
                ) : (
                  <Pill tone="green">OCR'd</Pill>
                )}
              </div>
            ))}
          </div>
        )}

        <SectionTitle icon={Scale} title={t('detViol')} />
        {violations.length === 0 ? (
          <div
            className="text-xs text-slate-400 italic py-4 text-center border border-dashed rounded"
            style={{ borderColor: C.light }}
          >
            {t('noViol')}
          </div>
        ) : (
          <div className="space-y-2">
            {violations.map((v) => {
              const tone =
                v.sev === 'imminent'
                  ? 'red'
                  : v.sev === 'substantive'
                  ? 'amber'
                  : 'blue';
              return (
                <Card
                  key={v.id}
                  className={`p-3 border-l-4 ${
                    v.sev === 'imminent'
                      ? 'border-l-red-600'
                      : v.sev === 'substantive'
                      ? 'border-l-amber-500'
                      : 'border-l-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Pill tone={tone}>{v.code}</Pill>
                        <Pill tone="slate">{v.sev.toUpperCase()}</Pill>
                      </div>
                      <div className="text-sm font-medium text-slate-800">
                        {v.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {v.amount && <span>{v.amount} </span>}
                        {v.workers && <span>· {v.workers} workers </span>}
                        {v.equipment && <span>· {v.equipment} </span>}
                        {v.location && <span>· {v.location}</span>}
                      </div>
                    </div>
                    <DecisionButtons
                      onConfirm={() => setVStatus(v.id, 'confirmed')}
                      onReject={() => setVStatus(v.id, 'rejected')}
                      status={v.status}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        <div className="flex justify-between items-center pt-6 mt-4 border-t border-slate-200">
          <button
            onClick={() => goto('briefing')}
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('back')}
          </button>
          <PrimaryBtn disabled={!allDecided} onClick={() => goto('review')}>
            {t('completeProc')}
            <ArrowRight className="w-4 h-4" />
          </PrimaryBtn>
        </div>
      </div>

      <div
        className="w-full md:w-80 xl:w-96 border-t md:border-t-0 md:border-l flex flex-col flex-shrink-0 md:h-full md:overflow-hidden"
        style={{ background: C.lightest + '40', borderColor: C.light }}
      >
        <div
          className="px-5 py-3 border-b bg-white"
          style={{ borderColor: C.light }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" style={{ color: C.core }} />
              <span className="text-sm font-semibold text-slate-800">
                {t('rtAlerts')}
              </span>
            </div>
            <Pill tone="purpleSolid">
              {alerts.length} {t('alerts')}
            </Pill>
          </div>
        </div>
        {danger && (
          <div className="bg-red-600 text-white p-4 m-3 rounded-md border border-red-700">
            <div className="flex items-start gap-2 mb-2">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 animate-pulse" />
              <div>
                <div className="text-sm font-bold tracking-wide">
                  🚨 EMERGENCY RESPONSE
                </div>
                <div className="text-xs opacity-90 mt-0.5">
                  Suspension of Use Order draft prepared
                </div>
              </div>
            </div>
            <div className="bg-red-700 rounded p-2 text-xs mb-2">
              <div className="font-semibold">Verbal script ready:</div>
              <div className="italic mt-1">
                "You must immediately cease use of this equipment under ISHA
                Article 98."
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={issueOrder}
                className="flex-1 bg-white text-red-700 hover:bg-red-50 font-semibold text-xs py-2 rounded flex items-center justify-center gap-1.5"
              >
                <Stamp className="w-3.5 h-3.5" />
                {t('approve')} & Issue
              </button>
              <button
                onClick={rejectOrder}
                className="flex-1 bg-red-700 text-white hover:bg-red-800 font-semibold text-xs py-2 rounded flex items-center justify-center gap-1.5 border border-red-300"
              >
                <X className="w-3.5 h-3.5" />
                {t('reject')}
              </button>
            </div>
          </div>
        )}
        {dangerStatus === 'issued' && (
          <div className="m-3 rounded-md border border-emerald-300 bg-emerald-50 p-3 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div>
                <div className="font-semibold text-emerald-900">
                  Emergency Order Issued
                </div>
                <div className="text-emerald-700">
                  Suspension of Use Order delivered on-site at +4:23
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {alerts.length === 0 && (
            <div className="text-center py-12 text-xs text-slate-400">
              <Radio className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <div>{t('waitCap')}</div>
              <div className="mt-1 opacity-70">
                Tap capture buttons to simulate
              </div>
            </div>
          )}
          {alerts.map((a) => {
            const styles = {
              red: 'border-red-300 bg-red-50',
              amber: 'border-amber-300 bg-amber-50',
              blue: 'border-blue-300 bg-blue-50',
            }[a.level];
            const iconCol = {
              red: 'text-red-600',
              amber: 'text-amber-600',
              blue: 'text-blue-600',
            }[a.level];
            return (
              <div
                key={a.id}
                className={`border ${styles} rounded p-3 text-xs`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    {a.level === 'red' ? (
                      <ShieldAlert className={`w-3.5 h-3.5 ${iconCol}`} />
                    ) : (
                      <AlertTriangle className={`w-3.5 h-3.5 ${iconCol}`} />
                    )}
                    <span className="font-semibold text-slate-700">
                      {a.source}
                    </span>
                  </div>
                  <span className="text-slate-500">{a.time}</span>
                </div>
                <div className="font-semibold text-slate-900 mb-1">
                  {a.title}
                </div>
                <div className="text-slate-700 leading-relaxed">{a.body}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ViolationReviewScreen = ({
  goto,
  docStatuses,
  setDocStatuses,
  docTexts,
  setDocTexts,
}) => {
  const { t } = useT();
  const [pdfDoc, setPdfDoc] = useState(null);
  const [editingIdx, setEditingIdx] = useState(null);
  const matrix = [
    {
      code: 'LSA Art. 37',
      title: 'Unpaid overtime premium',
      sev: 'Substantive',
      action: 'Corrective Recommendation',
      actionJa: '是正勧告書',
      deadline: '60 days',
      tone: 'amber',
    },
    {
      code: 'LSA Art. 36',
      title: '36 Agreement exceeds legal cap',
      sev: 'Substantive',
      action: 'Corrective Recommendation',
      actionJa: '是正勧告書',
      deadline: '30 days',
      tone: 'amber',
    },
    {
      code: 'ISHA Art. 20',
      title: 'Unguarded press machine',
      sev: 'Imminent Danger',
      action: 'Suspension of Use Order',
      actionJa: '使用停止命令書',
      deadline: 'Immediate',
      tone: 'red',
      issued: true,
    },
    {
      code: 'LSA Art. 89',
      title: 'Work rules not on file',
      sev: 'Minor',
      action: 'Guidance Report',
      actionJa: '指導票',
      deadline: 'Voluntary',
      tone: 'blue',
    },
  ];
  const docs = [
    {
      idx: 0,
      title: 'Corrective Recommendation',
      ja: '是正勧告書',
      no: 'SAI-2026-04827-01',
      code: 'LSA Art. 37',
      docKey: 'correctiveRec',
    },
    {
      idx: 1,
      issued: true,
      title: 'Suspension of Use Order',
      ja: '使用停止命令書',
      no: 'SAI-2026-04827-02',
      code: 'ISHA Art. 20',
      docKey: 'prohibOrder',
    },
    {
      idx: 2,
      title: 'Corrective Recommendation',
      ja: '是正勧告書',
      no: 'SAI-2026-04827-03',
      code: 'LSA Art. 36',
      docKey: 'correctiveRec',
    },
    {
      idx: 3,
      title: 'Guidance Report',
      ja: '指導票',
      no: 'SAI-2026-04827-04',
      code: 'LSA Art. 89',
      docKey: 'correctiveRec',
    },
  ];
  const defaultBody = {
    0: 'Inspection of wage ledgers and time cards (Mar 2026) revealed overtime premium calculated at 1.0× regular rate rather than statutory ≥1.25× for 30 manufacturing workers. Total shortfall: ¥1,500,000.',
    1: 'Press machine ABC-2000 S/N 12345 on Production Line 3. Cease use until safety guard installed.',
    2: '36 Agreement on file specifies 100 hr/month overtime ceiling. Statutory limit: 45 hr/month. Renegotiate and refile within 30 days.',
    3: 'Employers with ≥10 workers must file work rules (就業規則). Please prepare and submit rules covering wages, working hours, leave, and termination.',
  };
  const setStatus = (idx, status) =>
    setDocStatuses((s) => ({ ...s, [idx]: status }));
  const approvedCount = Object.values(docStatuses).filter(
    (s) => s === 'approved'
  ).length;
  return (
    <div className="p-4 md:p-6 space-y-5 max-w-7xl">
      <div>
        <Pill tone="purpleSolid" className="mb-2">
          <Scale className="w-3 h-3" />
          {t('enforcement')}
        </Pill>
        <h2 className="text-lg md:text-xl font-semibold text-slate-900">
          {t('decMatrix')}
        </h2>
        <p className="text-sm text-slate-500">
          Review system recommendations. You must approve every document before
          issuance.
        </p>
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead
            style={{ background: C.lightest + '60' }}
            className="text-xs uppercase tracking-wider text-slate-600"
          >
            <tr>
              <th className="px-4 py-3 text-left">{t('article')}</th>
              <th className="px-4 py-3 text-left">{t('violation')}</th>
              <th className="px-4 py-3 text-left">{t('severity')}</th>
              <th className="px-4 py-3 text-left">{t('recAct')}</th>
              <th className="px-4 py-3 text-left">{t('deadline')}</th>
              <th className="px-4 py-3 text-left">{t('status')}</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((m, i) => {
              const docStat = docStatuses[i];
              return (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <Pill tone={m.tone}>{m.code}</Pill>
                  </td>
                  <td className="px-4 py-3 text-slate-800">{m.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium ${
                        m.tone === 'red'
                          ? 'text-red-700'
                          : m.tone === 'amber'
                          ? 'text-amber-700'
                          : 'text-blue-700'
                      }`}
                    >
                      {m.sev}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-800">{m.action}</div>
                    <div className="text-xs text-slate-500">{m.actionJa}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{m.deadline}</td>
                  <td className="px-4 py-3">
                    {m.issued ? (
                      <Pill tone="red">
                        <Stamp className="w-3 h-3" />
                        {t('issuedOnSite')}
                      </Pill>
                    ) : docStat === 'approved' ? (
                      <Pill tone="green">
                        <CheckCircle2 className="w-3 h-3" />
                        {t('approved')}
                      </Pill>
                    ) : docStat === 'rejected' ? (
                      <Pill tone="slate">
                        <X className="w-3 h-3" />
                        {t('rejected')}
                      </Pill>
                    ) : (
                      <Pill tone="slate">{t('awaitRev')}</Pill>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <Card className="p-4 border-l-4 border-l-amber-500 bg-amber-50/50">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-amber-900 text-sm">
              ⚠ Repeat Violation Risk Note
            </div>
            <p className="text-xs text-amber-800 mt-1">
              LSA Article 37 was previously violated (2023). Today's evidence
              shows continued underpayment.{' '}
              <strong>
                System will escalate to criminal referral (送検) if pattern
                continues.
              </strong>
            </p>
          </div>
        </div>
      </Card>
      <SectionTitle
        icon={FileText}
        title={t('draftDocs')}
        ja="行政指導文書(下書き)"
        right={<Pill tone="purple">{t('genaiDr')}</Pill>}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {docs.map((d, i) => {
          const stat = docStatuses[d.idx];
          const isApproved = stat === 'approved';
          const isRejected = stat === 'rejected';
          const isIssued = d.issued;
          const body = docTexts[d.idx] || defaultBody[d.idx];
          const isEditing = editingIdx === d.idx;
          return (
            <Card
              key={i}
              className="p-4 md:p-5"
              style={isIssued ? { borderColor: '#fecaca' } : {}}
            >
              <div className="flex items-start justify-between mb-3 gap-2 flex-wrap">
                <div className="min-w-0">
                  <div
                    className="text-[10px] uppercase tracking-wider"
                    style={{ color: isIssued ? '#dc2626' : C.core }}
                  >
                    Document #{i + 1} {isIssued && '· Issued On-Site'}
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {d.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    {d.ja} · {d.no} · {d.code}
                  </div>
                </div>
                {isIssued ? (
                  <Pill tone="red">
                    <Stamp className="w-3 h-3" />
                    Issued
                  </Pill>
                ) : isApproved ? (
                  <Pill tone="green">✓ {t('approved')}</Pill>
                ) : isRejected ? (
                  <Pill tone="slate">
                    <X className="w-3 h-3" />
                    {t('rejected')}
                  </Pill>
                ) : (
                  <Pill tone="slate">{t('draft')}</Pill>
                )}
              </div>
              {isEditing ? (
                <textarea
                  value={body}
                  onChange={(e) =>
                    setDocTexts((prev) => ({
                      ...prev,
                      [d.idx]: e.target.value,
                    }))
                  }
                  className="w-full text-xs border rounded p-3 min-h-[140px] font-mono"
                  style={{ borderColor: C.core }}
                  autoFocus
                />
              ) : (
                <div
                  className={`border rounded p-3 text-xs font-mono text-slate-700 max-h-40 overflow-y-auto ${
                    isIssued
                      ? 'bg-red-50 border-red-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="font-semibold mb-1">{d.code} Violation</div>
                  <div className="text-[11px] leading-relaxed whitespace-pre-wrap">
                    {body}
                  </div>
                </div>
              )}
              {!isIssued &&
                (isEditing ? (
                  <div className="flex gap-2 mt-3">
                    <RejectBtn
                      onClick={() => setEditingIdx(null)}
                      className="flex-1"
                    >
                      <X className="w-3 h-3" />
                      {t('cancelEdit')}
                    </RejectBtn>
                    <button
                      onClick={() => setEditingIdx(null)}
                      style={{ background: C.core, color: 'white' }}
                      className="flex-1 px-3 py-2 text-xs rounded flex items-center justify-center gap-1 hover:opacity-90"
                    >
                      <Check className="w-3 h-3" />
                      {t('save')}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <button
                      onClick={() => setEditingIdx(d.idx)}
                      className="flex-1 min-w-[80px] px-3 py-2 border hover:bg-slate-50 text-slate-700 text-xs rounded flex items-center justify-center gap-1"
                      style={{ borderColor: '#cbd5e1' }}
                    >
                      <Edit3 className="w-3 h-3" />
                      {t('edit')}
                    </button>
                    {isApproved ? (
                      <button
                        onClick={() => setPdfDoc({ ...d })}
                        style={{ background: C.core, color: 'white' }}
                        className="flex-1 min-w-[110px] px-3 py-2 text-xs rounded flex items-center justify-center gap-1 hover:opacity-90"
                      >
                        <Eye className="w-3 h-3" />
                        {t('viewReport')}
                      </button>
                    ) : isRejected ? (
                      <button
                        onClick={() => setStatus(d.idx, null)}
                        className="flex-1 min-w-[80px] px-3 py-2 border border-slate-300 text-slate-700 text-xs rounded hover:bg-slate-50"
                      >
                        Reset
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setStatus(d.idx, 'approved')}
                          style={{ background: C.core, color: 'white' }}
                          className="flex-1 min-w-[100px] px-3 py-2 text-xs rounded flex items-center justify-center gap-1 hover:opacity-90"
                        >
                          <PenLine className="w-3 h-3" />
                          {t('approveAndSign')}
                        </button>
                        <RejectBtn onClick={() => setStatus(d.idx, 'rejected')}>
                          <X className="w-3 h-3" />
                          {t('reject')}
                        </RejectBtn>
                      </>
                    )}
                  </div>
                ))}
              {isIssued && (
                <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Issued at +4:23 · Acknowledged
                  </div>
                  <button
                    onClick={() => setPdfDoc({ ...d })}
                    style={{ background: C.core, color: 'white' }}
                    className="px-3 py-1.5 text-xs rounded flex items-center gap-1 hover:opacity-90"
                  >
                    <Eye className="w-3 h-3" />
                    {t('viewReport')}
                  </button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={() => goto('live')}
          className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('back')}
        </button>
        <PrimaryBtn onClick={() => goto('issue')} disabled={approvedCount < 2}>
          {t('procIssue')}
          <ArrowRight className="w-4 h-4" />
        </PrimaryBtn>
      </div>
      {pdfDoc && (
        <PDFViewerModal doc={pdfDoc} onClose={() => setPdfDoc(null)} />
      )}
    </div>
  );
};

const IssuanceScreen = ({ goto, delivered, setDelivered }) => {
  const { t } = useT();
  const [method, setMethod] = useState('onsite');
  const [signed, setSigned] = useState(false);
  const [pdfDoc, setPdfDoc] = useState(null);
  const finalize = () => {
    setSigned(true);
    setTimeout(() => setDelivered(true), 800);
  };
  const docs = [
    {
      n: '1',
      title: 'Corrective Recommendation',
      ja: '是正勧告書',
      code: 'LSA Art. 37',
      docKey: 'correctiveRec',
      no: 'SAI-2026-04827-01',
    },
    {
      n: '2',
      title: 'Suspension of Use Order',
      ja: '使用停止命令書',
      code: 'ISHA Art. 20',
      delivered: true,
      docKey: 'prohibOrder',
      no: 'SAI-2026-04827-02',
    },
    {
      n: '3',
      title: 'Corrective Recommendation',
      ja: '是正勧告書',
      code: 'LSA Art. 36',
      docKey: 'correctiveRec',
      no: 'SAI-2026-04827-03',
    },
    {
      n: '4',
      title: 'Guidance Report',
      ja: '指導票',
      code: 'LSA Art. 89',
      docKey: 'correctiveRec',
      no: 'SAI-2026-04827-04',
    },
  ];
  return (
    <div className="p-4 md:p-6 space-y-5 max-w-5xl">
      <div>
        <Pill tone="purpleSolid" className="mb-2">
          <Send className="w-3 h-3" />
          {t('delivery')}
        </Pill>
        <h2 className="text-lg md:text-xl font-semibold text-slate-900">
          {t('finDocs')}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-4 md:p-5">
          <SectionTitle title={t('docsToDel')} />
          <div className="space-y-2">
            {docs.map((d) => (
              <div
                key={d.n}
                className="flex items-center gap-3 p-2.5 border border-slate-200 rounded"
              >
                <div
                  style={{ background: C.lightest, color: C.darkest }}
                  className="w-7 h-7 rounded flex items-center justify-center text-xs font-mono font-semibold flex-shrink-0"
                >
                  {d.n}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-800 truncate">
                    {d.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    {d.ja} · {d.code}
                  </div>
                </div>
                {(d.delivered || delivered) && (
                  <button
                    onClick={() => setPdfDoc(d)}
                    className="px-2 py-1 text-xs flex items-center gap-1 hover:bg-purple-50 rounded"
                    style={{ color: C.core }}
                  >
                    <Eye className="w-3 h-3" />
                    PDF
                  </button>
                )}
                {d.delivered ? (
                  <Pill tone="green">{t('issuedOnSite')}</Pill>
                ) : (
                  <Pill tone="slate">{t('pending')}</Pill>
                )}
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4 md:p-5">
          <SectionTitle title={t('delMethod')} />
          <div className="space-y-2 mb-4">
            {[
              {
                id: 'onsite',
                icon: Printer,
                t: t('onSiteDel'),
                sub: 'Bluetooth printer + tablet',
              },
              {
                id: 'email',
                icon: Mail,
                t: t('emailMail'),
                sub: 'PDF + sealed paper post',
              },
              {
                id: 'office',
                icon: Building2,
                t: t('mailFromOff'),
                sub: 'Issue from office',
              },
            ].map((o) => {
              const Icon = o.icon,
                active = method === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => setMethod(o.id)}
                  style={
                    active
                      ? { borderColor: C.core, background: C.lightest + '50' }
                      : { borderColor: '#e2e8f0' }
                  }
                  className="w-full text-left p-3 border rounded flex gap-3 transition hover:bg-purple-50"
                >
                  <Icon
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: active ? C.core : '#64748b' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-800">
                      {o.t}
                    </div>
                    <div className="text-xs text-slate-500">{o.sub}</div>
                  </div>
                  <input
                    type="radio"
                    checked={active}
                    onChange={() => {}}
                    style={{ accentColor: C.core }}
                    className="mt-0.5"
                  />
                </button>
              );
            })}
          </div>
          <div className="border-t border-slate-200 pt-4">
            <div className="text-xs text-slate-500 mb-2">{t('digSign')}</div>
            <div
              className={`border-2 border-dashed rounded p-4 text-center transition ${
                signed ? 'border-emerald-300 bg-emerald-50' : ''
              }`}
              style={!signed ? { borderColor: C.core } : {}}
            >
              {signed ? (
                <div>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-emerald-800">
                    Signed: {INSP.name}
                  </div>
                  <div className="text-[10px] text-emerald-700">
                    Tamper-proof PDF generated
                  </div>
                </div>
              ) : (
                <div>
                  <PenLine
                    className="w-6 h-6 mx-auto mb-1"
                    style={{ color: C.core }}
                  />
                  <div className="text-xs text-slate-500">{t('tapSign')}</div>
                </div>
              )}
            </div>
            {!signed && (
              <PrimaryBtn onClick={finalize} className="w-full mt-3">
                <Lock className="w-4 h-4" />
                {t('signFin')}
              </PrimaryBtn>
            )}
          </div>
        </Card>
      </div>
      {delivered && (
        <Card className="p-5 border-l-4 border-l-emerald-500">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-slate-900">{t('docsDel')}</div>
              <div className="text-xs text-slate-500 mt-0.5">
                Hanamura-san signed at{' '}
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    l: t('reminder'),
                    tt: 'Correction deadline (LSA 37)',
                    s: 'In 60 days',
                  },
                  {
                    l: t('reminder'),
                    tt: 'Correction deadline (LSA 36)',
                    s: 'In 30 days',
                  },
                  {
                    l: t('reInsp'),
                    tt: 'Verify safety guard',
                    s: 'Suggested: 14 days',
                  },
                ].map((r) => (
                  <div
                    key={r.tt}
                    style={{
                      background: C.lightest + '50',
                      borderColor: C.core,
                    }}
                    className="border rounded p-3"
                  >
                    <div
                      className="text-[10px] uppercase font-semibold"
                      style={{ color: C.core }}
                    >
                      {r.l}
                    </div>
                    <div className="text-sm font-medium text-slate-800 mt-1">
                      {r.tt}
                    </div>
                    <div className="text-xs text-slate-600">{r.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={() => goto('review')}
          className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('back')}
        </button>
        <PrimaryBtn onClick={() => goto('followup')} disabled={!delivered}>
          {t('contFollow')}
          <ArrowRight className="w-4 h-4" />
        </PrimaryBtn>
      </div>
      {pdfDoc && (
        <PDFViewerModal doc={pdfDoc} onClose={() => setPdfDoc(null)} />
      )}
    </div>
  );
};

const FollowUpScreen = ({ goto }) => {
  const { t } = useT();
  const [step, setStep] = useState(1);
  const [closed, setClosed] = useState(false);
  const [supplemental, setSupplemental] = useState(false);
  const [reportApprovals, setReportApprovals] = useState({});
  const [chiefApproved, setChiefApproved] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);
  const items = [
    {
      code: 'LSA Art. 37',
      title: 'Unpaid overtime premium',
      tone: 'amber',
      status: 'adequate',
      requires: 'Pay ¥1,500,000 to 30 workers',
    },
    {
      code: 'ISHA Art. 20',
      title: 'Press machine safety guard',
      tone: 'red',
      status: 'reinsp',
      requires: 'Install guard on press ABC-2000',
    },
    {
      code: 'LSA Art. 36',
      title: '36 Agreement renegotiation',
      tone: 'amber',
      status: 'adequate',
      requires: 'Refile within statutory limits',
    },
    {
      code: 'LSA Art. 89',
      title: 'Work rules filing',
      tone: 'blue',
      status: 'adequate',
      requires: 'File 就業規則 with this office',
    },
  ];
  const setItemStatus = (code, status) =>
    setReportApprovals((s) => ({ ...s, [code]: status }));
  const allItemsDecided = items.every((it) => reportApprovals[it.code]);
  const finalCloseCase = () => {
    setShowCloseConfirm(false);
    setClosed(true);
    setShowSubmitted(true);
  };
  return (
    <div className="p-4 md:p-6 space-y-5 max-w-6xl">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <Pill tone="purpleSolid" className="mb-2">
            <ClipboardCheck className="w-3 h-3" />
            {t('verifClos')}
          </Pill>
          <h2 className="text-lg md:text-xl font-semibold text-slate-900">
            {t('caseClosure')}
          </h2>
          <p className="text-sm text-slate-500">
            {t('daysSince')} · {t('corrRecv')}
          </p>
        </div>
        {closed && (
          <Pill tone="green">
            <CheckCircle2 className="w-3 h-3" />
            {t('caseClosed')}
          </Pill>
        )}
      </div>
      {supplemental && (
        <Card className="p-4 border-l-4 border-l-amber-500 bg-amber-50">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-amber-900 text-sm">
                {t('suppReqd')}
              </div>
              <p className="text-xs text-amber-800 mt-1">
                Notice sent to Hanamura-san. New deadline: Jun 25, 2026.
              </p>
            </div>
            <button
              onClick={() => setSupplemental(false)}
              className="text-amber-700 hover:text-amber-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </Card>
      )}
      <Card className="p-4">
        <div className="flex items-center justify-between text-xs flex-wrap gap-2">
          {[
            { n: 1, label: 'Documents issued', date: 'Apr 27', done: true },
            { n: 2, label: t('corrRecv'), date: 'Jun 10', done: step >= 1 },
            { n: 3, label: 'AI verification', date: 'Jun 11', done: step >= 1 },
            { n: 4, label: t('reInsp'), date: 'Jun 14', done: step >= 2 },
            { n: 5, label: t('caseClosed'), date: 'Jun 15', done: closed },
          ].map((s, i, arr) => (
            <div key={s.n} className="flex items-center flex-1 min-w-[140px]">
              <div
                style={
                  s.done
                    ? { background: C.core, color: 'white' }
                    : { background: '#e2e8f0', color: '#64748b' }
                }
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
              >
                {s.done ? <CheckCircle2 className="w-4 h-4" /> : s.n}
              </div>
              <div className="ml-2 flex-1 min-w-0">
                <div
                  className={`font-medium truncate ${
                    s.done ? 'text-slate-800' : 'text-slate-500'
                  }`}
                >
                  {s.label}
                </div>
                <div className="text-slate-400">{s.date}</div>
              </div>
              {i < arr.length - 1 && (
                <div
                  className="h-px flex-1 mx-1"
                  style={{ background: s.done ? C.core : '#e2e8f0' }}
                />
              )}
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-4 md:p-5">
        <SectionTitle
          icon={FileCheck}
          title={t('corrVerif')}
          ja="是正報告書 検証"
          right={<Pill tone="purple">{t('autoEval')}</Pill>}
        />
        <div className="space-y-3">
          {items.map((it) => {
            const decided = reportApprovals[it.code];
            const sevBefore =
              it.status === 'adequate' ? (
                <Pill tone="green">
                  <CheckCircle2 className="w-3 h-3" />
                  {t('adequate')}
                </Pill>
              ) : (
                <Pill tone="amber">
                  <Eye className="w-3 h-3" />
                  {t('reInspRec')}
                </Pill>
              );
            return (
              <div
                key={it.code}
                className={`border rounded p-4 ${
                  it.status === 'reinsp'
                    ? 'border-amber-300 bg-amber-50/30'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2 gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Pill tone={it.tone}>{it.code}</Pill>
                      <span className="text-sm font-medium text-slate-800">
                        {it.title}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Required: {it.requires}
                    </div>
                  </div>
                  {sevBefore}
                </div>
                {it.code === 'ISHA Art. 20' && (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-white rounded border border-slate-200 p-2">
                      <div className="text-[10px] text-slate-500 uppercase mb-1">
                        Before (Apr 27)
                      </div>
                      <div className="aspect-video bg-gradient-to-br from-red-100 to-red-200 rounded flex items-center justify-center">
                        <div className="text-center text-red-800 text-xs">
                          <AlertTriangle className="w-6 h-6 mx-auto mb-1" />
                          Unguarded press
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded border border-slate-200 p-2">
                      <div className="text-[10px] text-slate-500 uppercase mb-1">
                        After (Jun 8 — claimed)
                      </div>
                      <div className="aspect-video bg-gradient-to-br from-emerald-100 to-emerald-200 rounded flex items-center justify-center">
                        <div className="text-center text-emerald-800 text-xs">
                          <ShieldCheck className="w-6 h-6 mx-auto mb-1" />
                          Guard visible
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-slate-100">
                  <div className="text-xs text-slate-600">
                    {decided === 'approved' ? (
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        You marked this adequate
                      </span>
                    ) : decided === 'rejected' ? (
                      <span className="text-red-700 font-medium flex items-center gap-1">
                        <X className="w-3 h-3" />
                        You rejected employer's correction
                      </span>
                    ) : (
                      <span>Inspector decision required</span>
                    )}
                  </div>
                  {!decided ? (
                    <DecisionButtons
                      onConfirm={() => setItemStatus(it.code, 'approved')}
                      onReject={() => setItemStatus(it.code, 'rejected')}
                      status={null}
                      confirmLabel={t('approve')}
                    />
                  ) : (
                    <button
                      onClick={() => setItemStatus(it.code, null)}
                      className="text-xs hover:underline"
                      style={{ color: C.core }}
                    >
                      Reset decision
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {step === 1 && (
          <div className="mt-4 flex flex-wrap gap-3">
            <SecondaryBtn onClick={() => setSupplemental(true)}>
              <Mail className="w-4 h-4" />
              {t('reqSupp')}
            </SecondaryBtn>
            <PrimaryBtn onClick={() => setStep(2)} disabled={!allItemsDecided}>
              <Calendar className="w-4 h-4" />
              {t('schedReInsp')}
            </PrimaryBtn>
          </div>
        )}
      </Card>
      {step >= 2 && (
        <Card className="p-5 border-l-4 border-l-emerald-500">
          <SectionTitle
            icon={CheckCircle2}
            title={t('reInspComp')}
            ja="再監督完了"
          />
          <p className="text-sm text-slate-700">
            Jun 14 site visit confirmed safety guard installed to ISHA standard
            with operational interlock.
          </p>
          {step === 2 && (
            <PrimaryBtn onClick={() => setStep(3)} className="mt-3">
              <FileText className="w-4 h-4" />
              {t('genFinal')}
            </PrimaryBtn>
          )}
        </Card>
      )}
      {step >= 3 && (
        <Card className="p-5">
          <SectionTitle
            icon={FileText}
            title={t('finalRpt')}
            ja="監督復命書"
            right={<Pill tone="purple">{t('genaiDr')}</Pill>}
          />
          <div className="bg-slate-50 border border-slate-200 rounded p-4 text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-200 pb-2 flex-wrap gap-2">
              <div className="font-semibold text-slate-800">
                監督復命書 · Inspection Completion Report
              </div>
              <div className="text-slate-500">SAI-2026-04827-FINAL</div>
            </div>
            <KV k="Enterprise" v={`${CASE.company} (${CASE.companyJa})`} />
            <KV k="Inspection Period" v="Apr 27 – Jun 14, 2026" />
            <KV k="Violations Found" v="4 (3 substantive + 1 minor)" />
            <KV
              k="Outcome"
              v={
                <span className="text-emerald-700 font-semibold">
                  All corrections verified — Compliant
                </span>
              }
            />
            <KV k="Compliance Rating" v="Fair (improved from Poor)" />
          </div>
          {!chiefApproved && !closed && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded p-3 text-xs">
              <div className="flex items-start gap-2 flex-wrap">
                <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-amber-900">
                    {t('awaitChief')}
                  </div>
                  <div className="text-amber-800">
                    Chief must review and approve before case closure.
                  </div>
                </div>
                <button
                  onClick={() => setChiefApproved(true)}
                  className="text-[10px] underline hover:no-underline ml-auto"
                  style={{ color: C.darkest }}
                >
                  (Demo: simulate Chief approval)
                </button>
              </div>
            </div>
          )}
          {chiefApproved && !closed && (
            <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded p-3 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-emerald-900">
                    Chief has approved the final report
                  </div>
                  <div className="text-emerald-800">
                    You may now submit to close the case.
                  </div>
                </div>
              </div>
            </div>
          )}
          {!closed ? (
            <PrimaryBtn
              onClick={() => setShowCloseConfirm(true)}
              disabled={!chiefApproved}
              className="mt-4 w-full"
            >
              <Stamp className="w-4 h-4" />
              {t('submitClose')}
            </PrimaryBtn>
          ) : (
            <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-emerald-900">
                {t('caseClosed')}
              </div>
              <div className="text-xs text-emerald-700 mt-1">
                All inspection records securely stored. Risk score updated.
              </div>
            </div>
          )}
        </Card>
      )}
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={() => goto('issue')}
          className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('back')}
        </button>
        {closed && (
          <PrimaryBtn onClick={() => goto('home')}>
            {t('retQueue')}
            <ArrowRight className="w-4 h-4" />
          </PrimaryBtn>
        )}
      </div>
      {showCloseConfirm && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setShowCloseConfirm(false)}
        >
          <Card
            className="p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                style={{ background: C.lightest }}
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <AlertCircle className="w-5 h-5" style={{ color: C.darkest }} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Submit and close case?
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  This submits the final report to MHLW e-Gov and archives all
                  evidence. <strong>This cannot be undone.</strong>
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <RejectBtn
                onClick={() => setShowCloseConfirm(false)}
                className="px-4 py-2"
              >
                {t('cancel')}
              </RejectBtn>
              <PrimaryBtn onClick={finalCloseCase}>
                <Stamp className="w-4 h-4" />
                Confirm & Close
              </PrimaryBtn>
            </div>
          </Card>
        </div>
      )}
      {showSubmitted && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <Card className="p-6 max-w-md w-full text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ background: C.lightest }}
            >
              <CheckCircle2 className="w-9 h-9" style={{ color: C.core }} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Successfully Submitted
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Submitted to <strong>MHLW e-Gov</strong> and saved to the central
              database.
            </p>
            <div className="bg-slate-50 rounded p-3 mt-4 text-xs space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  Submission ID:{' '}
                  <code className="bg-white px-1 rounded font-mono">
                    EGV-2026-0427-91482
                  </code>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  Filed at{' '}
                  {new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
            <PrimaryBtn
              onClick={() => {
                setShowSubmitted(false);
                goto('home');
              }}
              className="w-full mt-5"
            >
              Return to Case Queue
            </PrimaryBtn>
          </Card>
        </div>
      )}
    </div>
  );
};

const InspectorAnalyticsScreen = () => {
  const { t } = useT();
  const monthly = [
    { m: 'Nov', insp: 12, clos: 9 },
    { m: 'Dec', insp: 14, clos: 12 },
    { m: 'Jan', insp: 11, clos: 10 },
    { m: 'Feb', insp: 15, clos: 13 },
    { m: 'Mar', insp: 18, clos: 15 },
    { m: 'Apr', insp: 21, clos: 17 },
  ];
  const violationMix = [
    { name: 'LSA 37', value: 42 },
    { name: 'LSA 36', value: 28 },
    { name: 'ISHA 20', value: 18 },
    { name: 'LSA 89', value: 14 },
    { name: 'Other', value: 11 },
  ];
  const skills = [
    { skill: 'Wage', value: 92 },
    { skill: 'Safety', value: 87 },
    { skill: 'Hours', value: 78 },
    { skill: 'Health', value: 82 },
    { skill: 'Foreign', value: 65 },
    { skill: 'Construction', value: 71 },
  ];
  const timeBreakdown = [
    { phase: 'Manual', site: 120, report: 360, follow: 180 },
    { phase: 'AI-assisted', site: 90, report: 25, follow: 45 },
  ];
  const kpis = [
    { l: 'Inspections (YTD)', v: '91', d: '+18%', sub: 'vs 2025' },
    { l: 'Avg. Case Time', v: '2.3 hr', d: '−68%', sub: 'from 7.2 hr' },
    { l: 'Compliance Rate', v: '83%', d: '+11pp', sub: 'full correction' },
    { l: 'Detection Accuracy', v: '94%', d: '+22pp', sub: 'vs solo' },
  ];
  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-slate-900">
            My Performance & Insights
          </h2>
          <p className="text-sm text-slate-500">YTD 2026 · {INSP.officeJa}</p>
        </div>
        <SecondaryBtn>{t('exportRep')} PDF</SecondaryBtn>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {kpis.map((k) => (
          <Card key={k.l} className="p-3 md:p-4">
            <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">
              {k.l}
            </div>
            <div className="flex items-baseline gap-2 mt-2 flex-wrap">
              <div
                className="text-2xl md:text-3xl font-semibold"
                style={{ color: C.core }}
              >
                {k.v}
              </div>
              <div className="text-xs font-semibold flex items-center gap-0.5 text-emerald-600">
                <ArrowUp className="w-3 h-3" />
                {k.d}
              </div>
            </div>
            <div className="text-[10px] md:text-[11px] text-slate-500 mt-1">
              {k.sub}
            </div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-4 md:p-5">
          <SectionTitle title="Inspections vs Closures" />
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.core} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={C.core} stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.darkest} stopOpacity={0.5} />
                  <stop
                    offset="100%"
                    stopColor={C.darkest}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="m" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area
                type="monotone"
                dataKey="insp"
                name="Inspections"
                stroke={C.core}
                fill="url(#g1)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="clos"
                name="Closures"
                stroke={C.darkest}
                fill="url(#g2)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4 md:p-5">
          <SectionTitle title="Violation Type Mix" />
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={violationMix}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
              >
                {violationMix.map((_, i) => (
                  <Cell
                    key={i}
                    fill={[C.darkest, C.dark, C.core, C.light, C.lightest][i]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4 md:p-5">
          <SectionTitle title="Time per Inspection: Manual vs AI" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={timeBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis
                dataKey="phase"
                type="category"
                tick={{ fontSize: 11 }}
                stroke="#94a3b8"
                width={90}
              />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="site" name="On-site" stackId="a" fill={C.darkest} />
              <Bar dataKey="report" name="Reports" stackId="a" fill={C.core} />
              <Bar
                dataKey="follow"
                name="Follow-up"
                stackId="a"
                fill={C.light}
              />
            </BarChart>
          </ResponsiveContainer>
          <div
            className="mt-2 text-xs p-2 rounded"
            style={{ background: C.lightest + '80', color: C.darkest }}
          >
            <strong>Net saving: 8.3 hours per case</strong> — equivalent to +1.3
            cases per day.
          </div>
        </Card>
        <Card className="p-4 md:p-5">
          <SectionTitle title="Specialization Profile" />
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={skills}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fontSize: 11, fill: '#475569' }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 9 }}
              />
              <Radar
                name="Inspector"
                dataKey="value"
                stroke={C.core}
                fill={C.core}
                fillOpacity={0.4}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card className="p-4 md:p-5">
        <SectionTitle icon={Trophy} title="Recent Achievements" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              i: Award,
              t: 'Hundred Inspections',
              s: '100 lifetime inspections',
              date: 'Apr 12, 2026',
            },
            {
              i: Zap,
              t: 'Rapid Response',
              s: '3 emergency orders <30 min',
              date: 'Mar 2026',
            },
            {
              i: Gauge,
              t: 'Top Quartile Detection',
              s: 'Top 25% accuracy',
              date: 'Q1 2026',
            },
          ].map((a) => {
            const Icon = a.i;
            return (
              <div
                key={a.t}
                className="border rounded p-3"
                style={{ borderColor: C.core, background: C.lightest + '40' }}
              >
                <Icon className="w-5 h-5 mb-2" style={{ color: C.core }} />
                <div className="text-sm font-semibold text-slate-900">
                  {a.t}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">{a.s}</div>
                <div className="text-[10px] text-slate-500 mt-1">{a.date}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

const ProfileScreen = ({ role }) => {
  const { t } = useT();
  const user = role === 'admin' ? ADMIN : INSP;
  const initial = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);
  const chain =
    role === 'admin'
      ? [
          {
            lvl: 'MHLW',
            name: 'Ministry of Health, Labour & Welfare',
            ja: '厚生労働省',
          },
          {
            lvl: 'PLB',
            name: 'Saitama Prefectural Labour Bureau',
            ja: '埼玉労働局',
          },
          { lvl: 'You', name: `${ADMIN.name} — Chief`, ja: 'さいたま署長' },
        ]
      : [
          {
            lvl: 'MHLW',
            name: 'Ministry of Health, Labour & Welfare',
            ja: '厚生労働省',
          },
          {
            lvl: 'PLB',
            name: 'Saitama Prefectural Labour Bureau',
            ja: '埼玉労働局',
          },
          {
            lvl: 'LSI',
            name: `${ADMIN.name} — Chief, Saitama LSI`,
            ja: 'さいたま署長',
          },
          {
            lvl: 'You',
            name: `${INSP.name} — ${INSP.title}`,
            ja: '主任監督官',
          },
        ];
  const team =
    role === 'admin'
      ? [
          { name: 'Mochizuki Ren-san', title: 'Senior Inspector', cases: 21 },
          { name: 'Asahina Mio-san', title: 'Inspector', cases: 18 },
          { name: 'Sakuragi Daichi-san', title: 'Inspector', cases: 17 },
          { name: 'Hoshino Kenta-san', title: 'Junior Inspector', cases: 11 },
        ]
      : [];
  return (
    <div className="p-4 md:p-6 space-y-5 max-w-6xl">
      <Card
        className="p-4 md:p-6"
        style={{
          background: `linear-gradient(135deg, ${C.lightest}80 0%, white 60%)`,
        }}
      >
        <div className="flex items-start gap-4 md:gap-5 flex-wrap">
          <div
            style={{ background: C.core }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full text-white text-xl md:text-2xl font-semibold flex items-center justify-center flex-shrink-0"
          >
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                {user.name}
              </h2>
              <Pill tone="purple">{user.nameJa || ''}</Pill>
            </div>
            <div className="text-sm text-slate-600 mt-0.5">
              {user.title} · {user.titleJa || ''}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {user.office} ({user.officeJa || ''})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
              <div>
                <span className="text-slate-500">Badge ID</span>
                <div className="font-mono font-medium">{user.badge}</div>
              </div>
              <div>
                <span className="text-slate-500">Email</span>
                <div className="font-medium truncate">{user.email}</div>
              </div>
              {user.joined && (
                <div>
                  <span className="text-slate-500">Joined</span>
                  <div className="font-medium">{user.joined}</div>
                </div>
              )}
            </div>
          </div>
          <SecondaryBtn>
            <Edit3 className="w-3 h-3" />
            {t('edit')}
          </SecondaryBtn>
        </div>
      </Card>
      <Card className="p-4 md:p-5">
        <SectionTitle icon={Network} title={t('reportStruct')} />
        <div className="space-y-2">
          {chain.map((r, i) => {
            const isYou = r.lvl === 'You';
            return (
              <div
                key={i}
                className="flex items-center gap-3"
                style={{ marginLeft: `${i * 20}px` }}
              >
                <div
                  style={
                    isYou
                      ? {
                          background: C.core,
                          color: 'white',
                          borderColor: C.core,
                        }
                      : {
                          borderColor: C.core,
                          color: C.core,
                          background: C.lightest + '50',
                        }
                  }
                  className="w-8 h-8 rounded border flex items-center justify-center text-[10px] font-semibold flex-shrink-0"
                >
                  {r.lvl}
                </div>
                <div
                  className={`flex-1 px-3 py-2 rounded ${
                    isYou ? 'border-2' : 'border'
                  }`}
                  style={
                    isYou
                      ? { borderColor: C.core, background: C.lightest + '40' }
                      : { borderColor: '#e2e8f0' }
                  }
                >
                  <div className="text-sm font-medium text-slate-800">
                    {r.name}
                  </div>
                  <div className="text-xs text-slate-500">{r.ja}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      {role === 'admin' && team.length > 0 && (
        <Card className="p-4 md:p-5">
          <SectionTitle
            icon={Users}
            title={t('directRep')}
            right={
              <Pill tone="purple">
                {team.length} {t('inspectors')}
              </Pill>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {team.map((tm) => (
              <div
                key={tm.name}
                className="flex items-center gap-3 p-3 border rounded"
                style={{ borderColor: C.lightest }}
              >
                <div
                  style={{ background: C.core, color: 'white' }}
                  className="w-9 h-9 rounded-full text-sm font-semibold flex items-center justify-center"
                >
                  {tm.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-800">
                    {tm.name}
                  </div>
                  <div className="text-xs text-slate-500">{tm.title}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">{t('ytdCases')}</div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: C.core }}
                  >
                    {tm.cases}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-4 md:p-5">
          <SectionTitle title={t('acctSettings')} />
          {[
            'Change password',
            '2FA',
            'Notifications',
            'Language',
            'Sync settings',
          ].map((s) => (
            <button
              key={s}
              className="w-full flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0 text-sm text-slate-700 hover:bg-purple-50 px-2 -mx-2 rounded"
            >
              <span>{s}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </Card>
        <Card className="p-4 md:p-5">
          <SectionTitle title={t('permsAcc')} />
          <div className="space-y-2 text-sm">
            {(role === 'admin'
              ? [
                  { p: 'Approve criminal referrals (送検)', g: true },
                  { p: 'Add/remove inspectors', g: true },
                  { p: 'Approve annual inspection plan', g: true },
                  { p: 'View regional analytics', g: true },
                ]
              : [
                  { p: 'Conduct inspections (LSA Art. 101)', g: true },
                  { p: 'Issue Corrective Recommendations', g: true },
                  { p: 'Issue Suspension of Use Orders', g: true },
                  { p: 'Approve criminal referrals', g: false },
                ]
            ).map((p) => (
              <div
                key={p.p}
                className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0"
              >
                <span className="text-slate-700">{p.p}</span>
                {p.g ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <X className="w-4 h-4 text-slate-300" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const AdminOverview = ({ goto }) => {
  const monthly = [
    { m: 'Nov', val: 102 },
    { m: 'Dec', val: 95 },
    { m: 'Jan', val: 88 },
    { m: 'Feb', val: 110 },
    { m: 'Mar', val: 108 },
    { m: 'Apr', val: 127 },
  ];
  const referrals = [
    {
      id: 'CR-26-0014',
      co: 'Tachibana Kogyo Co., Ltd.',
      vio: 'LSA Art. 37 (3rd repeat)',
      urg: 'high',
    },
    {
      id: 'CR-26-0015',
      co: 'Kurosawa Kensetsu K.K.',
      vio: 'ISHA Art. 20 — fatal injury',
      urg: 'critical',
    },
    {
      id: 'CR-26-0016',
      co: 'Hanamura Kikai Co., Ltd.',
      vio: 'LSA Art. 37 repeat',
      urg: 'high',
    },
  ];
  return (
    <div className="p-4 md:p-6 space-y-5">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
          Welcome, {ADMIN.name}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {ADMIN.titleJa} · {ADMIN.office}
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { l: 'Active Inspectors', v: '14', sub: '2 on leave' },
          { l: 'Cases (Apr)', v: '127', sub: '+18% vs Mar' },
          { l: 'Pending Approvals', v: '3', sub: 'Criminal refs' },
          { l: 'Compliance Rate', v: '81%', sub: 'Region avg' },
        ].map((k) => (
          <Card key={k.l} className="p-3 md:p-4">
            <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">
              {k.l}
            </div>
            <div
              className="text-2xl md:text-3xl font-semibold mt-2"
              style={{ color: C.core }}
            >
              {k.v}
            </div>
            <div className="text-[10px] md:text-xs text-slate-500 mt-1">
              {k.sub}
            </div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="p-4 md:p-5 lg:col-span-2">
          <SectionTitle
            title="Monthly Inspection Volume"
            right={<Pill tone="purple">Office-wide</Pill>}
          />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="m" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="val" name="Inspections" radius={[6, 6, 0, 0]}>
                {monthly.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i === monthly.length - 1 ? C.core : C.dark}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4 md:p-5">
          <SectionTitle
            icon={ShieldCheck}
            title="Pending Approvals"
            right={<Pill tone="red">{referrals.length} new</Pill>}
          />
          <div className="space-y-2">
            {referrals.map((r) => (
              <div
                key={r.id}
                className="border rounded p-2.5 hover:bg-purple-50 cursor-pointer"
                style={{ borderColor: C.light }}
                onClick={() => goto('approvals')}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-slate-500">
                    {r.id}
                  </span>
                  <Pill tone={r.urg === 'critical' ? 'red' : 'amber'}>
                    {r.urg}
                  </Pill>
                </div>
                <div className="text-sm font-medium text-slate-800">{r.co}</div>
                <div className="text-xs text-slate-500">{r.vio}</div>
              </div>
            ))}
          </div>
          <PrimaryBtn className="w-full mt-3" onClick={() => goto('approvals')}>
            Review All <ArrowRight className="w-4 h-4" />
          </PrimaryBtn>
        </Card>
      </div>
      <Card className="p-4 md:p-5">
        <SectionTitle
          icon={Users}
          title="Top Performers This Quarter"
          right={
            <button
              onClick={() => goto('inspectors')}
              className="text-xs hover:underline"
              style={{ color: C.core }}
            >
              View all →
            </button>
          }
        />
        <div className="space-y-2">
          {[
            {
              n: 'Mochizuki Ren-san',
              t: 'Senior Inspector',
              cases: 21,
              comp: 89,
            },
            { n: 'Asahina Mio-san', t: 'Inspector', cases: 18, comp: 86 },
            { n: 'Sakuragi Daichi-san', t: 'Inspector', cases: 17, comp: 81 },
          ].map((p, i) => (
            <div
              key={p.n}
              className="flex items-center gap-4 p-3 border rounded"
              style={{ borderColor: C.lightest }}
            >
              <div
                style={{
                  background: i === 0 ? C.core : C.dark,
                  color: 'white',
                }}
                className="w-8 h-8 rounded-full text-sm font-semibold flex items-center justify-center"
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-800">
                  {p.n}
                </div>
                <div className="text-xs text-slate-500">{p.t}</div>
              </div>
              <div className="text-right text-xs">
                <div className="font-semibold text-slate-900">
                  {p.cases} cases
                </div>
                <div className="text-slate-500">{p.comp}% compliance</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const AdminApprovals = () => {
  const { t } = useT();
  const [list, setList] = useState([
    {
      id: 'CR-26-0014',
      co: 'Tachibana Kogyo Co., Ltd.',
      coJa: '橘工業株式会社',
      insp: 'Asahina Mio-san',
      date: 'Apr 23',
      vio: 'LSA Art. 37 — 3rd repeat (2021, 2023, 2026)',
      sev: 'High',
      body: 'Three consecutive inspections found same unpaid overtime premium violation. Total unpaid: ¥4.2M. Recommend criminal prosecution under LSA Art. 120.',
      evidence: 14,
    },
    {
      id: 'CR-26-0015',
      co: 'Kurosawa Kensetsu K.K.',
      coJa: '黒沢建設株式会社',
      insp: 'Tachibana Yui-san',
      date: 'Apr 25',
      vio: 'ISHA Art. 20 — fatal scaffold collapse',
      sev: 'Critical',
      body: 'Worker fatality at construction site (Apr 22). Recommend dual prosecution: ISHA + Penal Code Art. 211.',
      evidence: 31,
    },
    {
      id: 'CR-26-0016',
      co: 'Hanamura Kikai Co., Ltd.',
      coJa: '花村機械株式会社',
      insp: 'Mochizuki Ren-san',
      date: 'Apr 27',
      vio: 'LSA Art. 37 repeat (2nd cycle)',
      sev: 'High',
      body: 'Same violation as 2023 inspection. ¥1.5M shortfall to 30 workers.',
      evidence: 18,
    },
  ]);
  const decide = (id, action) =>
    setList((l) =>
      l.map((x) => (x.id === id ? { ...x, decision: action } : x))
    );
  return (
    <div className="p-4 md:p-6 space-y-5">
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-slate-900">
          Criminal Referral Approvals
        </h2>
        <p className="text-sm text-slate-500">
          Review and approve cases for prosecutor referral (送検)
        </p>
      </div>
      <div className="space-y-4">
        {list.map((r) => (
          <Card key={r.id} className="p-4 md:p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Pill tone="purple">
                    <Hash className="w-3 h-3" />
                    {r.id}
                  </Pill>
                  <Pill tone={r.sev === 'Critical' ? 'red' : 'amber'}>
                    {r.sev}
                  </Pill>
                  <Pill tone="slate">By {r.insp}</Pill>
                  <span className="text-xs text-slate-500">· {r.date}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mt-2">
                  {r.co}
                </h3>
                <div className="text-xs text-slate-500">{r.coJa}</div>
                <div
                  className="text-sm font-medium mt-2"
                  style={{ color: C.core }}
                >
                  {r.vio}
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {r.body}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs flex-wrap">
                  <Pill tone="slate">{r.evidence} evidence items</Pill>
                  <button className="hover:underline" style={{ color: C.core }}>
                    View case file →
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-44">
                {!r.decision ? (
                  <>
                    <PrimaryBtn onClick={() => decide(r.id, 'approved')}>
                      <Stamp className="w-4 h-4" />
                      {t('approve')} & Refer
                    </PrimaryBtn>
                    <RejectBtn
                      onClick={() => decide(r.id, 'rejected')}
                      className="px-4 py-2"
                    >
                      <X className="w-4 h-4" />
                      Send back
                    </RejectBtn>
                  </>
                ) : r.decision === 'approved' ? (
                  <Pill tone="green">
                    <CheckCircle2 className="w-3 h-3" />
                    {t('approved')} & forwarded
                  </Pill>
                ) : (
                  <Pill tone="amber">Returned to inspector</Pill>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AdminInspectors = () => {
  const { t } = useT();
  const [showAdd, setShowAdd] = useState(false);
  const [newInsp, setNewInsp] = useState({
    name: '',
    title: 'Junior Inspector',
    email: '',
    spec: 'General',
  });
  const [team, setTeam] = useState([
    {
      name: 'Mochizuki Ren-san',
      title: 'Senior Inspector',
      badge: 'LSI-11-4827',
      cases: 21,
      comp: 89,
      status: 'active',
      joined: '2018',
    },
    {
      name: 'Asahina Mio-san',
      title: 'Inspector',
      badge: 'LSI-11-5012',
      cases: 18,
      comp: 86,
      status: 'active',
      joined: '2020',
    },
    {
      name: 'Sakuragi Daichi-san',
      title: 'Inspector',
      badge: 'LSI-11-5103',
      cases: 17,
      comp: 81,
      status: 'active',
      joined: '2021',
    },
    {
      name: 'Hoshino Kenta-san',
      title: 'Junior Inspector',
      badge: 'LSI-11-5288',
      cases: 11,
      comp: 76,
      status: 'active',
      joined: '2024',
    },
    {
      name: 'Tachibana Yui-san',
      title: 'Specialist (Construction)',
      badge: 'LSI-11-4956',
      cases: 14,
      comp: 84,
      status: 'active',
      joined: '2019',
    },
    {
      name: 'Aizawa Riku-san',
      title: 'Inspector',
      badge: 'LSI-11-5051',
      cases: 0,
      comp: 0,
      status: 'leave',
      joined: '2020',
    },
  ]);
  const addInspector = () => {
    if (!newInsp.name.trim() || !newInsp.email.trim()) return;
    setTeam((tm) => [
      ...tm,
      {
        name: newInsp.name,
        title: newInsp.title,
        badge: 'LSI-11-' + Math.floor(5300 + Math.random() * 200),
        cases: 0,
        comp: 0,
        status: 'active',
        joined: new Date().getFullYear().toString(),
      },
    ]);
    setNewInsp({
      name: '',
      title: 'Junior Inspector',
      email: '',
      spec: 'General',
    });
    setShowAdd(false);
  };
  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-slate-900">
            Inspector Roster
          </h2>
          <p className="text-sm text-slate-500">
            {team.length} total ·{' '}
            {team.filter((tm) => tm.status === 'active').length} active
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              placeholder={t('search') + '...'}
              className="pl-8 pr-3 py-2 border rounded text-sm w-44 md:w-56"
              style={{ borderColor: C.light }}
            />
          </div>
          <PrimaryBtn onClick={() => setShowAdd(true)}>
            <UserPlus className="w-4 h-4" />
            Add Inspector
          </PrimaryBtn>
        </div>
      </div>
      {showAdd && (
        <Card
          className="p-4 md:p-5"
          style={{ borderColor: C.core, borderWidth: 2 }}
        >
          <SectionTitle title="Add New Inspector" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-600 uppercase">
                Full name
              </label>
              <input
                value={newInsp.name}
                onChange={(e) =>
                  setNewInsp((p) => ({ ...p, name: e.target.value }))
                }
                className="mt-1 w-full px-3 py-2 border rounded text-sm"
                style={{ borderColor: C.light }}
                placeholder="e.g. Yamamoto Akira"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 uppercase">
                Title
              </label>
              <select
                value={newInsp.title}
                onChange={(e) =>
                  setNewInsp((p) => ({ ...p, title: e.target.value }))
                }
                className="mt-1 w-full px-3 py-2 border rounded text-sm"
                style={{ borderColor: C.light }}
              >
                <option>Junior Inspector</option>
                <option>Inspector</option>
                <option>Senior Inspector</option>
                <option>Specialist</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 uppercase">
                Email
              </label>
              <input
                type="email"
                value={newInsp.email}
                onChange={(e) =>
                  setNewInsp((p) => ({ ...p, email: e.target.value }))
                }
                className="mt-1 w-full px-3 py-2 border rounded text-sm"
                style={{ borderColor: C.light }}
                placeholder="@mhlw.go.jp"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 uppercase">
                Specialization
              </label>
              <select
                value={newInsp.spec}
                onChange={(e) =>
                  setNewInsp((p) => ({ ...p, spec: e.target.value }))
                }
                className="mt-1 w-full px-3 py-2 border rounded text-sm"
                style={{ borderColor: C.light }}
              >
                <option>General</option>
                <option>Construction</option>
                <option>Manufacturing</option>
                <option>Foreign Workers</option>
              </select>
            </div>
            <div
              className="md:col-span-2 flex justify-end gap-2 pt-2 border-t"
              style={{ borderColor: C.lightest }}
            >
              <RejectBtn
                onClick={() => setShowAdd(false)}
                className="px-4 py-2"
              >
                {t('cancel')}
              </RejectBtn>
              <PrimaryBtn
                onClick={addInspector}
                disabled={!newInsp.name.trim() || !newInsp.email.trim()}
              >
                <Check className="w-4 h-4" />
                Create Account
              </PrimaryBtn>
            </div>
          </div>
        </Card>
      )}
      <Card className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead
            style={{ background: C.lightest + '60' }}
            className="text-xs uppercase tracking-wider text-slate-600"
          >
            <tr>
              <th className="px-4 py-3 text-left">Inspector</th>
              <th className="px-4 py-3 text-left">Badge</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">{t('ytdCases')}</th>
              <th className="px-4 py-3 text-left">Compliance</th>
              <th className="px-4 py-3 text-left">{t('status')}</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {team.map((tm) => (
              <tr
                key={tm.badge}
                className="border-t border-slate-100 hover:bg-purple-50/50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      style={{ background: C.core, color: 'white' }}
                      className="w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center"
                    >
                      {tm.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">
                        {tm.name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Since {tm.joined}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{tm.badge}</td>
                <td className="px-4 py-3 text-slate-700">{tm.title}</td>
                <td className="px-4 py-3 font-medium">{tm.cases}</td>
                <td className="px-4 py-3">
                  {tm.comp ? (
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full"
                          style={{ width: `${tm.comp}%`, background: C.core }}
                        />
                      </div>
                      <span className="text-xs">{tm.comp}%</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {tm.status === 'active' ? (
                    <Pill tone="green">{t('active')}</Pill>
                  ) : (
                    <Pill tone="amber">{t('onLeave')}</Pill>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    className="text-xs hover:underline"
                    style={{ color: C.core }}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const AdminAnalytics = () => {
  const { t } = useT();
  const trend = [
    { m: 'Nov', insp: 102, viol: 187, comp: 76 },
    { m: 'Dec', insp: 95, viol: 168, comp: 78 },
    { m: 'Jan', insp: 88, viol: 152, comp: 79 },
    { m: 'Feb', insp: 110, viol: 198, comp: 80 },
    { m: 'Mar', insp: 108, viol: 172, comp: 81 },
    { m: 'Apr', insp: 127, viol: 215, comp: 81 },
  ];
  const industries = [
    { name: 'Manufacturing', value: 38 },
    { name: 'Construction', value: 28 },
    { name: 'Logistics', value: 14 },
    { name: 'Food', value: 12 },
    { name: 'Other', value: 8 },
  ];
  const enforcement = [
    { type: 'Guidance', count: 142 },
    { type: 'Recommendation', count: 89 },
    { type: 'Order', count: 24 },
    { type: 'Criminal Ref', count: 7 },
  ];
  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-slate-900">
            Regional Analytics
          </h2>
          <p className="text-sm text-slate-500">{ADMIN.officeJa} · YTD 2026</p>
        </div>
        <SecondaryBtn>{t('exportRep')} to MHLW</SecondaryBtn>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { l: 'Inspections (YTD)', v: '630', d: '+22%' },
          { l: 'Violations Found', v: '1,092', d: '+18%' },
          { l: 'Compliance Rate', v: '81%', d: '+5pp' },
          { l: 'Avg. Case Time', v: '2.1 hr', d: '−71%' },
        ].map((k) => (
          <Card key={k.l} className="p-3 md:p-4">
            <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">
              {k.l}
            </div>
            <div className="flex items-baseline gap-2 mt-2 flex-wrap">
              <div
                className="text-xl md:text-2xl font-semibold"
                style={{ color: C.core }}
              >
                {k.v}
              </div>
              <div className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                <ArrowUp className="w-3 h-3" />
                {k.d}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="p-4 md:p-5 lg:col-span-2">
          <SectionTitle title="Inspections, Violations & Compliance" />
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="m" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11 }}
                stroke="#94a3b8"
                domain={[60, 100]}
              />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="insp"
                stroke={C.core}
                strokeWidth={2.5}
                name="Inspections"
                dot={{ fill: C.core, r: 4 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="viol"
                stroke={C.dark}
                strokeWidth={2.5}
                name="Violations"
                dot={{ fill: C.dark, r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="comp"
                stroke="#059669"
                strokeWidth={2.5}
                name="Compliance %"
                strokeDasharray="4 2"
                dot={{ fill: '#059669', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4 md:p-5">
          <SectionTitle title="By Industry" />
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={industries}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={85}
                paddingAngle={2}
              >
                {industries.map((_, i) => (
                  <Cell
                    key={i}
                    fill={[C.darkest, C.dark, C.core, C.light, C.lightest][i]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4 md:p-5 lg:col-span-2">
          <SectionTitle title="Enforcement Action Mix" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={enforcement} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis
                dataKey="type"
                type="category"
                tick={{ fontSize: 11 }}
                stroke="#94a3b8"
                width={120}
              />
              <Tooltip />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {enforcement.map((_, i) => (
                  <Cell
                    key={i}
                    fill={
                      [C.lightest, C.light, C.core, C.darkest][i] || C.darkest
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4 md:p-5">
          <SectionTitle title="ILO Ratio Bridge" />
          <div className="text-xs text-slate-500 mb-3">
            Closing the inspector ratio gap
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart
              data={[
                { x: 'Site time', manual: 60, ai: 90 },
                { x: 'Reports', manual: 25, ai: 95 },
                { x: 'Detection', manual: 70, ai: 94 },
                { x: 'Follow-up', manual: 55, ai: 92 },
                { x: 'Throughput', manual: 50, ai: 88 },
              ]}
            >
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis
                dataKey="x"
                tick={{ fontSize: 10, fill: '#475569' }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 9 }}
              />
              <Radar
                name="Manual"
                dataKey="manual"
                stroke="#94a3b8"
                fill="#94a3b8"
                fillOpacity={0.2}
              />
              <Radar
                name="AI-assisted"
                dataKey="ai"
                stroke={C.core}
                fill={C.core}
                fillOpacity={0.4}
              />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card
        className="p-4 md:p-5"
        style={{
          background: `linear-gradient(135deg, ${C.lightest}80 0%, white 100%)`,
        }}
      >
        <div className="flex items-start gap-4">
          <Trophy className="w-6 h-6 flex-shrink-0" style={{ color: C.core }} />
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Productivity Impact Summary
            </div>
            <p className="text-sm text-slate-700 mt-1 leading-relaxed">
              Office throughput up{' '}
              <strong style={{ color: C.core }}>+22%</strong> YTD with same
              headcount. Average case time reduced from <strong>7.2 hr</strong>{' '}
              to <strong>2.1 hr</strong>.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [phase, setPhase] = useState('home');
  const [online, setOnline] = useState(true);
  const [completed, setCompleted] = useState([]);
  const [lang, setLang] = useState('en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [violations, setViolations] = useState([]);
  const [captures, setCaptures] = useState([]);
  const [danger, setDanger] = useState(false);
  const [dangerStatus, setDangerStatus] = useState(null);
  const [elapsed, setElapsed] = useState('00:00');
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [docStatuses, setDocStatuses] = useState({});
  const [docTexts, setDocTexts] = useState({});
  const [delivered, setDelivered] = useState(false);

  const startTime = useRef(null);
  const accumRef = useRef(0);
  const lastTickRef = useRef(null);
  useEffect(() => {
    if (phase === 'live' && !startTime.current) startTime.current = Date.now();
    if (phase !== 'live') return;
    const tick = setInterval(() => {
      if (paused || stopped) {
        lastTickRef.current = Date.now();
        return;
      }
      if (!lastTickRef.current) lastTickRef.current = Date.now();
      const now = Date.now();
      accumRef.current += now - lastTickRef.current;
      lastTickRef.current = now;
      const sec = Math.floor(accumRef.current / 1000);
      setElapsed(
        `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(
          sec % 60
        ).padStart(2, '0')}`
      );
    }, 250);
    return () => clearInterval(tick);
  }, [phase, paused, stopped]);

  const goto = (next) => {
    if (phase !== next) setCompleted((c) => [...new Set([...c, phase])]);
    setPhase(next);
  };
  const handleLogin = (role) => {
    setUser(role);
    setPhase(role === 'admin' ? 'admin-home' : 'home');
    setCompleted([]);
  };
  const handleLogout = () => {
    setUser(null);
    setPhase('home');
    setCompleted([]);
    setAlerts([]);
    setViolations([]);
    setCaptures([]);
    setDanger(false);
    setDangerStatus(null);
    setDocStatuses({});
    setDocTexts({});
    setDelivered(false);
    startTime.current = null;
    setPaused(false);
    setStopped(false);
    accumRef.current = 0;
    lastTickRef.current = null;
  };

  const t = tFor(lang);
  const ctxValue = { lang, setLang, t };

  if (!user) {
    return (
      <LangCtx.Provider value={ctxValue}>
        <LoginScreen onLogin={handleLogin} lang={lang} setLang={setLang} />
      </LangCtx.Provider>
    );
  }

  const currentUser = user === 'admin' ? ADMIN : INSP;

  return (
    <LangCtx.Provider value={ctxValue}>
      <div
        className="h-screen flex bg-slate-50 text-slate-900"
        style={{ fontFamily: FONT }}
      >
        <Sidebar
          phase={phase}
          setPhase={setPhase}
          completed={completed}
          role={user}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar
            phase={phase}
            online={online}
            setOnline={setOnline}
            user={currentUser}
            role={user}
            goto={goto}
            onLogout={handleLogout}
            setMobileOpen={setMobileOpen}
          />
          <div
            style={{ background: C.lightest + '60', borderColor: C.light }}
            className="border-b px-3 md:px-6 py-1.5 text-[11px] flex items-center justify-between flex-shrink-0 gap-2"
          >
            <div
              className="flex items-center gap-2 min-w-0"
              style={{ color: C.core }}
            >
              <Sparkles className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">
                <strong>{t('protoDemo')}</strong> —{' '}
                {user === 'inspector' && phase === 'live'
                  ? 'Tap capture buttons to simulate.'
                  : `Signed in as ${
                      user === 'admin' ? t('administrator') : t('inspector')
                    }.`}
              </span>
            </div>
          </div>
          <main
            className={`flex-1 ${
              phase === 'live' && user === 'inspector'
                ? 'overflow-y-auto md:overflow-hidden'
                : 'overflow-y-auto'
            }`}
          >
            {user === 'inspector' && phase === 'home' && (
              <HomeScreen goto={goto} />
            )}
            {user === 'inspector' && phase === 'briefing' && (
              <BriefingScreen goto={goto} />
            )}
            {user === 'inspector' && phase === 'live' && (
              <LiveInspectionScreen
                goto={goto}
                alerts={alerts}
                setAlerts={setAlerts}
                violations={violations}
                setViolations={setViolations}
                captures={captures}
                setCaptures={setCaptures}
                danger={danger}
                setDanger={setDanger}
                dangerStatus={dangerStatus}
                setDangerStatus={setDangerStatus}
                elapsed={elapsed}
                paused={paused}
                setPaused={setPaused}
                stopped={stopped}
                setStopped={setStopped}
              />
            )}
            {user === 'inspector' && phase === 'review' && (
              <ViolationReviewScreen
                goto={goto}
                docStatuses={docStatuses}
                setDocStatuses={setDocStatuses}
                docTexts={docTexts}
                setDocTexts={setDocTexts}
              />
            )}
            {user === 'inspector' && phase === 'issue' && (
              <IssuanceScreen
                goto={goto}
                delivered={delivered}
                setDelivered={setDelivered}
              />
            )}
            {user === 'inspector' && phase === 'followup' && (
              <FollowUpScreen goto={goto} />
            )}
            {user === 'inspector' && phase === 'analytics' && (
              <InspectorAnalyticsScreen />
            )}
            {user === 'admin' && phase === 'admin-home' && (
              <AdminOverview goto={goto} />
            )}
            {user === 'admin' && phase === 'approvals' && <AdminApprovals />}
            {user === 'admin' && phase === 'inspectors' && <AdminInspectors />}
            {user === 'admin' && phase === 'admin-analytics' && (
              <AdminAnalytics />
            )}
            {phase === 'profile' && <ProfileScreen role={user} />}
          </main>
        </div>
      </div>
    </LangCtx.Provider>
  );
}
