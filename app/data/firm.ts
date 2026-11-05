/**
 * SINGLE SOURCE OF TRUTH for all firm content.
 *
 * Components must read every fact (phone, address, stats, practice areas,
 * claims) from here — never hardcode them. Re-skinning this template for a
 * different business is a data swap in this file plus `ACTIVE_THEME_ID`.
 *
 * Anything marked `TODO(attorney)` is unverified and is a LAUNCH BLOCKER
 * (see TASKS.md → "Client inputs needed"). Never replace a TODO with an
 * invented-but-realistic value.
 */
import type {
  AssessmentTopic,
  CaseResult,
  ContactInfo,
  Credential,
  FaqItem,
  FeePlan,
  FirmStat,
  JourneyMilestone,
  PracticeArea,
  Testimonial,
  ThemeConfig,
  ThemePreset,
} from '~/types';

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export const CONTACT_INFO: ContactInfo = {
  officeName: 'The Law Offices of Osei K. Prempeh, P.A.',
  shortName: 'Osei K. Prempeh, P.A.',
  attorneyName: 'Osei K. Prempeh',
  attorneyTitle: 'Attorney, Mediator, and Counselor at Law',
  address: '3202 N. Howard Ave',
  city: 'Tampa',
  region: 'FL',
  postalCode: '33607',
  cityStateZip: 'Tampa, FL 33607',
  poBox: 'P.O. Box 27384, Tampa, FL 33623',
  // TODO(attorney): confirm (813) 879-5919 is the main office line. It is the
  // only real number known (from the previous site's metadata). The redesign's
  // (813) 555-0123 was a placeholder and must never ship.
  phone: '(813) 879-5919',
  phoneTel: '+18138795919',
  // TODO(attorney): provide real cell number (redesign placeholder was 555-0125). Hidden while null.
  cell: null,
  cellTel: null,
  // TODO(attorney): provide real fax number (redesign placeholder was 555-0124). Hidden while null.
  fax: null,
  // TODO(attorney): confirm this inbox receives consultation requests.
  email: 'info@oseiprempeh.com',
  // TODO(attorney): confirm office hours.
  hours: 'Mon - Sat: 8:00 AM - 8:00 PM',
  siteUrl: 'https://www.oseiprempeh.com',
  barAdmissionDate: '2004-03-26',
  licenseNotice: 'Licensed to practice law in the State of Florida (Florida Bar, admitted March 2004).',
};

// ---------------------------------------------------------------------------
// Practice areas
// ---------------------------------------------------------------------------

// TODO(attorney): verify every `casesCount` and `clientOutcomes` figure
// (bar-advertising compliance) or replace with non-numeric copy.
export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'immigration',
    title: 'Immigration Law',
    shortDesc: 'Navigate complex immigration processes with confidence, from visa applications to permanent residency and citizenship.',
    casesCount: '800+ cases handled',
    iconName: 'Globe',
    overview: 'Attorney Osei K. Prempeh brings personal understanding and seasoned expertise to federal immigration proceedings. As an immigrant himself, he understands the emotional weight and profound life impact of every petition.',
    keyServices: [
      'Family-Based Petitions (I-130, Adjustment of Status)',
      'Naturalization & U.S. Citizenship (N-400)',
      'Employment-Based Visas & Labor Certifications',
      'Asylum & Humanitarian Relief',
      'Deportation Defense & Removal Proceedings',
      'Consular Processing & Travel Waivers',
    ],
    clientOutcomes: 'Successfully guided over 800 individuals and families through USCIS approvals, green card issuances, and citizenship oaths.',
  },
  {
    id: 'personal-injury',
    title: 'Personal Injury',
    shortDesc: 'When life takes an unexpected turn, we fight for the full financial compensation and medical care you and your family deserve.',
    casesCount: '450+ cases handled',
    iconName: 'Shield',
    overview: 'Our personal injury practice is built on relentless advocacy. We stand between injured clients and aggressive insurance carriers to secure compensation for medical expenses, lost wages, and long-term suffering.',
    keyServices: [
      'Motor Vehicle & Truck Collisions',
      'Motorcycle & Pedestrian Accidents',
      'Slip, Trip & Fall Premises Liability',
      'Wrongful Death Representation',
      'Catastrophic Injury Settlements',
      'Insurance Bad Faith Negotiation',
    ],
    clientOutcomes: 'Recovered millions in financial settlements and verdicts for injured accident victims across Central Florida.',
  },
  {
    id: 'international-business',
    title: 'International Business',
    shortDesc: 'Expand and protect your enterprise globally with strategic cross-border transaction guidance and regulatory compliance.',
    casesCount: '300+ cases handled',
    iconName: 'Scale',
    overview: 'Holding a Master of Laws (LL.M.) in International Business Law from Stetson University, Attorney Prempeh advises multi-jurisdictional ventures on contract enforcement, trade regulations, and international partnerships.',
    keyServices: [
      'Cross-Border Commercial Contracts',
      'International Joint Ventures & Distributorships',
      'U.S. Market Entry & Foreign Entity Formation',
      'Regulatory Compliance & Trade Guidelines',
      'International Dispute Resolution & Arbitration',
      'Import / Export Licensing and Due Diligence',
    ],
    clientOutcomes: 'Counseled international entrepreneurs and multinational firms in structuring multi-million dollar cross-border deals.',
  },
  {
    id: 'family-law',
    title: 'Family Law',
    shortDesc: 'Protecting what matters most during life transitions with compassionate, dignified counsel through divorce, custody, and adoption.',
    casesCount: '600+ cases handled',
    iconName: 'Users',
    overview: 'Family disputes require legal acumen tempered with empathy and dispute mediation skills. Attorney Prempeh provides level-headed guidance aimed at preserving familial relationships and child well-being.',
    keyServices: [
      'Contested & Uncontested Dissolution of Marriage',
      'Child Custody & Timesharing Agreements',
      'Child Support & Alimony Determinations',
      'Domestic & International Adoption Proceedings',
      'Pre-Nuptial & Post-Nuptial Agreements',
      'Family Mediation & Alternative Dispute Resolution',
    ],
    clientOutcomes: 'Resolved hundreds of complex domestic matters with an emphasis on equitable solutions and minimizing courtroom trauma.',
  },
  {
    id: 'contract-disputes',
    title: 'Contract Disputes',
    shortDesc: 'When business agreements break down, we step in to resolve complex commercial disputes efficiently, safeguarding your bottom line.',
    casesCount: '350+ cases handled',
    iconName: 'Gavel',
    overview: 'Commercial contracts form the backbone of your enterprise. When a party fails to uphold contractual terms, our litigation and mediation expertise protects your financial interests and business reputation.',
    keyServices: [
      'Breach of Commercial Agreement Litigation',
      'Partnership & Shareholder Disputes',
      'Vendor & Supplier Contract Enforcement',
      'Non-Compete & NDA Enforcement',
      'Debt Recovery & Settlement Negotiations',
      'Pre-Litigation Strategic Mediation',
    ],
    clientOutcomes: 'Protected commercial assets and secured favorable outcomes for Tampa Bay entrepreneurs and mid-sized enterprises.',
  },
  {
    id: 'criminal-defense',
    title: 'Criminal Defense',
    shortDesc: 'Your freedom and future are our top priority. Aggressive advocacy and meticulous preparation against all state and federal charges.',
    casesCount: '500+ cases handled',
    iconName: 'ShieldAlert',
    overview: 'Facing criminal allegations is one of the most frightening experiences in life. We scrutinize evidence, challenge improper police procedures, and fight tirelessly for charge dismissals, reductions, or acquittals.',
    keyServices: [
      'DUI & Traffic Offenses',
      'Misdemeanors & Felony Offense Defense',
      'Drug Possession & Trafficking Allegations',
      'Assault & Battery Charges',
      'Probation Violation Hearings',
      'Record Sealing & Expungement Petitions',
    ],
    clientOutcomes: 'Defended hundreds of individuals in Florida courts, achieving dismissals, acquitted charges, and favorable plea alternatives.',
  },
];

export const DEFAULT_PRACTICE_AREA_ID = PRACTICE_AREAS[0].id;

/** Practice-area filter groups used by the PracticeAreas section. */
export const PRACTICE_FILTERS = [
  { id: 'all', label: 'All Practice Areas', areaIds: null },
  { id: 'individual', label: 'Immigration & Families', areaIds: ['immigration', 'personal-injury', 'family-law'] },
  { id: 'business', label: 'Corporate & Business', areaIds: ['international-business', 'contract-disputes'] },
  { id: 'defense', label: 'Trial & Defense', areaIds: ['criminal-defense', 'personal-injury'] },
] as const satisfies ReadonlyArray<{ id: string; label: string; areaIds: readonly string[] | null }>;

export type PracticeFilterId = (typeof PRACTICE_FILTERS)[number]['id'];

/** Simplified labels for the QuickAssessment navigator (ids map to PRACTICE_AREAS). */
export const ASSESSMENT_TOPICS: AssessmentTopic[] = [
  { id: 'immigration', label: 'Immigration & Green Card', desc: 'Visas, USCIS interviews, citizenship or deportation defense' },
  { id: 'personal-injury', label: 'Personal Injury / Accident', desc: 'Auto crash, slip & fall, medical bills, insurance claims' },
  { id: 'international-business', label: 'Business & Contracts', desc: 'Cross-border deals, LLC setup, commercial agreements' },
  { id: 'family-law', label: 'Family Law & Custody', desc: 'Divorce, child custody, support or mediation' },
  { id: 'criminal-defense', label: 'Criminal Defense', desc: 'DUI, misdemeanor, felony or court representation' },
];

export const URGENCY_OPTIONS = [
  { id: 'immediate', label: 'Urgent / Immediate', sub: 'Deadline or court date within 14 days' },
  { id: 'soon', label: 'Within 30 Days', sub: 'Active matter needing attorney review' },
  { id: 'planning', label: 'General Consultation', sub: 'Exploring legal rights & long-term planning' },
] as const;

export type UrgencyId = (typeof URGENCY_OPTIONS)[number]['id'];

// ---------------------------------------------------------------------------
// Headline stats & highlights
// ---------------------------------------------------------------------------

// TODO(attorney): verify "1,000+ matters resolved" (or replace with non-numeric copy).
export const FIRM_STATS: FirmStat[] = [
  { id: 'years', value: '20+', label: 'Years of Experience', detail: 'Continuously licensed since March 2004' },
  { id: 'matters', value: '1,000+', label: 'Matters Resolved', detail: 'Across state, federal & immigration courts' },
  { id: 'areas', value: String(PRACTICE_AREAS.length), label: 'Core Practice Areas', detail: 'Immigration, Injury, Business & Family' },
  { id: 'access', value: 'Direct', label: 'Attorney Access', detail: 'You work with Attorney Prempeh personally' },
];

// TODO(attorney): confirm federal-court admission and the "1,000+" figure.
export const HERO_HIGHLIGHTS: string[] = [
  'Admitted to The Florida Bar (2004)',
  'Stetson Law LL.M. in International Business',
  '1,000+ Successfully Resolved Matters',
  'Personal Injury: No Fee Unless We Win',
];

export const FIRM_MOTTO = 'Committed to providing excellent, ethical, and effective legal representation.';

// ---------------------------------------------------------------------------
// Attorney background
// ---------------------------------------------------------------------------

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'arrival',
    period: '1981',
    title: 'Arrival in the United States',
    description: 'Born in Kumasi, Ghana, Attorney Prempeh immigrated to the Washington, D.C. metropolitan area, setting out with ambition, work ethic, and determination to pursue the American dream.',
    badge: 'Immigrant Roots',
  },
  {
    id: 'work',
    period: '1981 — 1992',
    title: 'Grounded in Community & Hard Work',
    description: 'Worked as a cab driver for six years and served with the United States Postal Service for five years. These working years instilled an enduring empathy for working-class families and the daily challenges they face.',
    badge: 'Public Service & Labor',
  },
  {
    id: 'bs',
    period: '1997',
    title: 'B.S. in Administration of Justice',
    description: 'Earned undergraduate degree at George Mason University in Virginia, focusing on criminal justice, constitutional guarantees, and judicial administration.',
    badge: 'George Mason Univ.',
  },
  {
    id: 'jd',
    period: '2000',
    title: 'Juris Doctor (J.D.) from Stetson Law',
    description: 'Graduated from Stetson University College of Law in Florida, celebrated nationally for premier trial advocacy, litigation preparation, and ethics.',
    badge: 'Stetson Law',
  },
  {
    id: 'llm',
    period: '2004',
    title: 'Master of Laws (LL.M.) & Florida Bar Admission',
    description: 'Completed postgraduate Master of Laws in International Business Law at Stetson, and was formally admitted to The Florida Bar on March 26, 2004.',
    badge: 'Florida Bar Admitted',
  },
  {
    id: 'practice',
    period: '2004 — Present',
    title: '20+ Years of Dedicated Advocacy',
    description: 'Two decades serving clients across Tampa Bay and nationwide in immigration, personal injury, international business, and family disputes with unwavering integrity.',
    badge: '20+ Years Practice',
  },
];

export const CREDENTIALS: Credential[] = [
  {
    institution: 'George Mason University',
    degree: 'Bachelor of Science in Administration of Justice',
    year: '1997',
    type: 'education',
    detail: 'Undergraduate foundation in criminological theory, constitutional rights, and public administration.',
  },
  {
    institution: 'Stetson University College of Law',
    degree: 'Juris Doctor (J.D.)',
    year: '2000',
    type: 'education',
    detail: "Earned law degree from Florida's premier institution renowned for nationally ranked trial advocacy.",
  },
  {
    institution: 'Stetson University College of Law',
    degree: 'Master of Laws (LL.M.) in International Business Law',
    year: '2004',
    type: 'education',
    detail: 'Advanced postgraduate specialization in cross-border transactions, trade law, and global treaties.',
  },
  {
    institution: 'The Florida Bar',
    degree: 'Licensed Attorney & Counselor at Law',
    year: 'March 26, 2004',
    type: 'license',
    // TODO(attorney): confirm federal district court admission(s) before keeping that claim.
    detail: 'Licensed in good standing to practice before all Florida State Courts. Over 20 years of continuous active practice.',
  },
  {
    institution: 'Tampa Bay Law Offices',
    degree: 'Primary Practice Office',
    year: 'Tampa, FL',
    type: 'location',
    detail: `Located at ${CONTACT_INFO.address}, ${CONTACT_INFO.cityStateZip}. Accessible to clients across Hillsborough, Pinellas, and surrounding counties.`,
  },
];

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

// These are the client reviews published on the previous site, verbatim.
// The AI-Studio redesign replaced them with invented quotes/outcomes (e.g. a
// "Sarah M." I-275 settlement mirroring a fabricated case result), which must
// not ship. Outcomes/years are omitted because none are known.
// TODO(attorney): confirm each review is real and consented to for use.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'christabel-a',
    clientName: 'Christabel A.',
    caseType: 'Immigration',
    quote: 'He is very professional and knowledgeable along with his staff. During my very stressful immigration issues with school and work, he provided professional assistance.',
    rating: 5,
  },
  {
    id: 'georgetta-b',
    clientName: 'Georgetta B.',
    quote: 'Did a wonderful job for both me and my son.',
    rating: 5,
  },
  {
    id: 'tmk-w',
    clientName: 'Tmk W.',
    quote: 'I highly recommend his services.',
    rating: 5,
  },
  {
    id: 'kym-h',
    clientName: 'Kym H.',
    quote: 'Great lawyer.',
    rating: 5,
  },
];

// TODO(attorney): verify or remove the client-count / rating claims.
export const TESTIMONIAL_HIGHLIGHTS: string[] = [
  'Over 1,000 clients served in Florida',
  'Clients consistently praise clear, responsive communication',
  'Direct attorney access — not handed off to case managers',
];

// ---------------------------------------------------------------------------
// Case results
// ---------------------------------------------------------------------------

// TODO(attorney): verify EVERY result below (dollar figures, outcomes,
// tribunals) against real, closed matters — or replace/remove. These came from
// the AI-generated redesign and are unverified. Florida Bar Rule 4-7.13/4-7.14
// requires past results to be objectively verifiable.
export const CASE_RESULTS: CaseResult[] = [
  {
    id: 'res-1',
    category: 'Personal Injury',
    practiceAreaId: 'personal-injury',
    headline: '$750,000 Recovery', // TODO(attorney): verify
    matter: 'Severe rear-end highway collision on I-275 requiring spinal treatment.',
    outcome: 'Full insurance policy limit settlement secured without protracted trial.',
    courtOrAgency: 'Hillsborough County Circuit Court',
  },
  {
    id: 'res-2',
    category: 'Immigration Law',
    practiceAreaId: 'immigration',
    headline: 'Asylum & Residency Approved', // TODO(attorney): verify
    matter: 'Complex humanitarian asylum petition pending over 3 years.',
    outcome: 'Successful USCIS interview defense and issuance of permanent residency.',
    courtOrAgency: 'USCIS Tampa Field Office',
  },
  {
    id: 'res-3',
    category: 'International Business',
    practiceAreaId: 'international-business',
    headline: '$1,800,000 Trade Contract Enforced', // TODO(attorney): verify
    matter: 'Cross-border supplier dispute between multinational exporter and Florida distributor.',
    outcome: 'Arbitration award in client’s favor with full restitution and contract reaffirmation.',
    courtOrAgency: 'International Dispute Panel / Commercial ADR',
  },
  {
    id: 'res-4',
    category: 'Criminal Defense',
    practiceAreaId: 'criminal-defense',
    headline: 'Complete Charge Dismissal', // TODO(attorney): verify
    matter: 'Client facing felony allegations based on questionable traffic stop and vehicle search.',
    outcome: 'Court granted motion to suppress unconstitutional evidence; all charges dropped.',
    courtOrAgency: '13th Judicial Circuit Court of Florida',
  },
  {
    id: 'res-5',
    category: 'Family Law & Mediation',
    practiceAreaId: 'family-law',
    headline: 'High-Asset Amicable Resolution', // TODO(attorney): verify
    matter: 'Contested multi-property dissolution of marriage and parental timesharing.',
    outcome: 'Private mediation secured full asset protection and balanced custody plan.',
    courtOrAgency: 'Tampa Bay Family Court Mediation',
  },
  {
    id: 'res-6',
    category: 'Immigration Law',
    practiceAreaId: 'immigration',
    headline: 'Deportation Proceedings Terminated', // TODO(attorney): verify
    matter: 'Individual facing deportation under complex statutory grounds.',
    outcome: 'Cancellation of removal granted; path to permanent legal residency restored.',
    courtOrAgency: 'Executive Office for Immigration Review (EOIR)',
  },
];

// ---------------------------------------------------------------------------
// Fees
// ---------------------------------------------------------------------------

// TODO(attorney): confirm each fee arrangement (contingency terms, flat fees,
// payment plans, free evaluations) matches actual firm practice.
export const FEE_PLANS: FeePlan[] = [
  {
    id: 'contingency',
    practiceAreaId: 'personal-injury',
    badge: '0%',
    eyebrow: 'Personal Injury & Collisions',
    title: 'Contingency Fee',
    description: 'For accident and collision victims, there are no upfront attorney fees. Fees are paid only from a recovery, as set out in a written contingency agreement.',
    points: [
      'No attorney fee unless we win or settle your case',
      'Free initial accident evaluation',
      'Direct negotiation with insurance adjusters',
    ],
    cta: 'Inquire on Injury Claim',
  },
  {
    id: 'flat-fee',
    practiceAreaId: 'immigration',
    badge: '$',
    eyebrow: 'Immigration Law & USCIS',
    title: 'Predictable Flat-Fee Retainers',
    description: 'Know the legal fee for your family visa, green card, naturalization, or waiver before filing.',
    points: [
      'Fixed upfront quote in a written retainer',
      'Flexible monthly payment plans available',
      'Complete document preparation & interview prep',
    ],
    cta: 'Get Immigration Fee Quote',
    featured: true,
  },
  {
    id: 'hourly',
    practiceAreaId: 'family-law',
    badge: '★',
    eyebrow: 'Business & Family Law',
    title: 'Transparent Hourly & Mediation',
    description: 'Tailored representation with clear statements, detailed time accounting, and alternative dispute resolution options.',
    points: [
      'Emphasis on pre-trial mediation to cut costs',
      'Itemized billing statements provided regularly',
      'Strategic cross-border business counsel',
    ],
    cta: 'Discuss Retainer Options',
  },
];

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What legal areas does Attorney Osei K. Prempeh practice?',
    answer: `Attorney Prempeh practices in ${PRACTICE_AREAS.length} core areas: Immigration Law (visas, green cards, naturalization, deportation defense), Personal Injury (motor vehicle collisions, slip and fall), International Business Law (cross-border contracts, trade agreements), Family Law (divorce, custody, mediation), Contract Disputes, and Criminal Defense.`,
    category: 'general',
  },
  {
    id: 'faq-2',
    question: 'How do I schedule an initial consultation?',
    answer: `You can request a consultation through this website by clicking "Schedule Consultation", by calling our office at ${CONTACT_INFO.phone}, or by email at ${CONTACT_INFO.email}. We offer in-person consultations at our Tampa office, video conferences, or phone evaluations.`,
    category: 'consultation',
  },
  {
    id: 'faq-3',
    question: 'What is your fee structure and do you offer payment arrangements?',
    answer: 'Our fee structure depends on the legal matter. Personal Injury cases are handled on a contingency fee basis — you pay no attorney fee unless we win or settle your case. Immigration, Business, and Family matters are handled with flat fees or hourly rates discussed upfront during your consultation, with payment plans available.',
    category: 'fees',
  },
  {
    id: 'faq-4',
    question: 'Do you offer remote consultations if I cannot visit the Tampa office?',
    answer: 'Yes. We regularly conduct video consultations and phone meetings for clients throughout Florida, out-of-state, and internationally. Many immigration and international business matters can be handled remotely.',
    category: 'consultation',
  },
  {
    id: 'faq-5',
    question: 'How long does a typical legal case take from start to finish?',
    answer: 'Timelines vary widely based on the court, jurisdiction, and federal processing times. For instance, immigration petitions may take anywhere from 4 to 18 months depending on USCIS backlogs, while personal injury claims often resolve within 6 to 12 months once medical treatment is concluded. Attorney Prempeh provides honest, realistic milestone projections from day one.',
    category: 'process',
  },
  {
    id: 'faq-6',
    question: 'What should I prepare for my first appointment?',
    answer: 'Please bring any relevant documents related to your matter: for immigration, bring passports, previous USCIS notices, visas, and I-94 records; for personal injury, bring police reports, medical records, insurance cards, and photographs; for business disputes, bring executed contracts, email communications, and invoices.',
    category: 'process',
  },
];

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'consultation', label: 'Consultations & Appointments' },
  { id: 'fees', label: 'Fees & Retainers' },
  { id: 'process', label: 'Process & Documents' },
] as const;

export type FaqFilterId = (typeof FAQ_CATEGORIES)[number]['id'];

// ---------------------------------------------------------------------------
// Consultation scheduling
// ---------------------------------------------------------------------------

export const CONSULTATION_TIME_SLOTS = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'];

// ---------------------------------------------------------------------------
// Legal notices
// ---------------------------------------------------------------------------

export const LEGAL_NOTICES = {
  resultsDisclaimer:
    'Prior results do not guarantee a similar outcome. Every case is different, and results depend on the specific facts and law involved in each matter.',
  testimonialsDisclaimer:
    'Testimonials reflect individual client experiences and do not guarantee a similar outcome in any future matter.',
  advertising:
    'The hiring of a lawyer is an important decision that should not be based solely upon advertisements. Before you decide, ask us to send you free written information about our qualifications and experience. The information on this site is for general information purposes only and should not be construed as formal legal advice or the formation of a lawyer/client relationship.',
  formNotice:
    'Submitting this form does not create an attorney-client relationship. Do not include sensitive case details until representation is established.',
};

// ---------------------------------------------------------------------------
// Theme presets (only ACTIVE_THEME_ID is used; others kept for template reuse)
// ---------------------------------------------------------------------------

/** TODO(attorney): confirm final theme (default Executive Navy & Gold). */
export const ACTIVE_THEME_ID: ThemePreset = 'heritage-navy';

export const THEME_CONFIGS: Record<ThemePreset, ThemeConfig> = {
  'heritage-navy': {
    id: 'heritage-navy',
    name: 'Executive Navy & Gold',
    subtitle: 'Classic White-Shoe & Trial Tradition',
    primaryBg: '#0A1628',
    primarySurface: '#12233C',
    accentColor: '#C5A059',
    accentHover: '#DFBA6E',
    accentText: '#C5A059',
    accentInk: '#7D5D1F',
    cardBg: '#FFFFFF',
    cardBorder: '#E2E8F0',
    heroGradient: 'from-[#0A1628] via-[#0F1E36] to-[#08101E]',
    bodyCanvas: '#F8FAFC',
    badgeBg: '#132845',
  },
  'modern-obsidian': {
    id: 'modern-obsidian',
    name: 'Modern Obsidian & Brass',
    subtitle: 'Contemporary Wall Street Boutique',
    primaryBg: '#0D1117',
    primarySurface: '#161B22',
    accentColor: '#D4AF37',
    accentHover: '#E8C55A',
    accentText: '#D4AF37',
    accentInk: '#7A6014',
    cardBg: '#FFFFFF',
    cardBorder: '#E5E7EB',
    heroGradient: 'from-[#0D1117] via-[#161B22] to-[#090C10]',
    bodyCanvas: '#F9FAFB',
    badgeBg: '#1F242C',
  },
  'slate-copper': {
    id: 'slate-copper',
    name: 'Architectural Slate & Copper',
    subtitle: 'Award-Winning Editorial Aesthetic',
    primaryBg: '#141A24',
    primarySurface: '#1E2634',
    accentColor: '#C46D3B',
    accentHover: '#DE7F47',
    accentText: '#C46D3B',
    accentInk: '#8E481F',
    cardBg: '#FFFFFF',
    cardBorder: '#E2E8F0',
    heroGradient: 'from-[#141A24] via-[#1C2432] to-[#0E131A]',
    bodyCanvas: '#F7F6F3',
    badgeBg: '#252F40',
  },
};
