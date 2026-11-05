export interface PracticeArea {
  id: string;
  title: string;
  shortDesc: string;
  casesCount: string;
  iconName: string;
  overview: string;
  keyServices: string[];
  clientOutcomes: string;
}

export interface Credential {
  institution: string;
  degree: string;
  year?: string;
  detail?: string;
  type: 'education' | 'license' | 'location';
}

export interface Testimonial {
  id: string;
  clientName: string;
  caseType?: string;
  quote: string;
  outcome?: string;
  rating: number;
  year?: string;
}

export type FaqCategory = 'general' | 'fees' | 'process' | 'consultation';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}

export type ConsultationType = 'in-person' | 'phone' | 'video';

export interface ConsultationRequest {
  fullName: string;
  phone: string;
  email: string;
  practiceArea: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: ConsultationType;
  briefNotes: string;
}

export interface CaseResult {
  id: string;
  category: string;
  headline: string;
  matter: string;
  outcome: string;
  courtOrAgency: string;
  practiceAreaId: string;
}

export type ThemePreset = 'heritage-navy' | 'modern-obsidian' | 'slate-copper';

export interface ThemeConfig {
  id: ThemePreset;
  name: string;
  subtitle: string;
  primaryBg: string;
  primarySurface: string;
  accentColor: string;
  accentHover: string;
  accentText: string;
  /** Darker accent for small text on light backgrounds (WCAG AA ≥ 4.5:1 on white). */
  accentInk: string;
  cardBg: string;
  cardBorder: string;
  heroGradient: string;
  bodyCanvas: string;
  badgeBg: string;
}

export interface ContactInfo {
  officeName: string;
  shortName: string;
  attorneyName: string;
  attorneyTitle: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  cityStateZip: string;
  poBox: string;
  phone: string;
  phoneTel: string;
  /** null until the attorney confirms a real number; UI hides it when null. */
  cell: string | null;
  cellTel: string | null;
  fax: string | null;
  email: string;
  hours: string;
  siteUrl: string;
  barAdmissionDate: string;
  licenseNotice: string;
}

export interface FirmStat {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface JourneyMilestone {
  id: string;
  period: string;
  title: string;
  description: string;
  badge: string;
}

export interface AssessmentTopic {
  id: string;
  label: string;
  desc: string;
}

export interface FeePlan {
  id: string;
  practiceAreaId: string;
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  cta: string;
  featured?: boolean;
}
