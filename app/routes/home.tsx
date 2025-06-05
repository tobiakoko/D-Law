import type { Route } from "./+types/home";
import Testimonials from "~/components/Testimonials";
import HeroSection from "~/components/HeroSection";
import FAQSection from "~/components/faq";
import PracticeAreas from "~/components/PracticeArea";

import { Scale, Shield, Award, Users, Gavel, TrendingUp, Clock, Globe } from 'lucide-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Osei K. Prempeh - Attorney, Mediator and Counselot at law" },
    { name: "description", content: "Call (813) 879-5919 for a free case consultation with The Law Offices of Osei K. Prempeh, P.A. today to get justice and compensation you deserve." },
    {}
  ];
}
const faqItems = [
  {
    question: "What legal areas do you specialize in?",
    answer: "Our firm specializes in Corporate Law, Criminal Defense, Family Law, and Personal Injury. We offer comprehensive legal solutions tailored to your specific needs."
  },
  {
    question: "How can I schedule a free consultation?",
    answer: "You can schedule a free consultation by clicking the 'Get Free Consultation' button on our homepage, or by calling us directly at (555) 123-4567. You can also use our live chat feature."
  },
  {
    question: "What are your fees?",
    answer: "Our fee structure varies depending on the complexity and type of case. We offer transparent billing and will discuss all fees upfront during your initial consultation so there are no surprises."
  },
  {
    question: "How long does a typical legal case take?",
    answer: "The duration of a legal case can vary widely based on its nature, complexity, and whether it goes to trial. We strive for efficient resolutions and will keep you informed throughout the entire process."
  },
  {
    question: "Do you offer remote consultations?",
    answer: "Yes, we offer remote consultations via video conference for clients who prefer or require this option. Please contact us to arrange a virtual meeting."
  },
];

const practiceAreas = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Immigration Law",
    description: "Navigate complex immigration processes with confidence. From visa applications to citizenship, we provide expert guidance for individuals and families seeking to build their American dream.",
    cases: "800+",
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Personal Injury",
    description: "When life takes an unexpected turn, we fight for the compensation you deserve. Our proven track record includes securing millions in settlements for accident victims and their families.",
    cases: "450+",
    gradient: "from-red-600 to-orange-600"
  },
  {
    icon: <Scale className="w-8 h-8" />,
    title: "International Business",
    description: "Expand your business globally with strategic legal support. We specialize in cross-border transactions, international contracts, and regulatory compliance across multiple jurisdictions.",
    cases: "300+",
    gradient: "from-purple-600 to-blue-600"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Family Law",
    description: "Protecting what matters most during life's transitions. Our compassionate approach ensures your family's interests are safeguarded through divorce, custody, and adoption proceedings.",
    cases: "600+",
    gradient: "from-green-600 to-teal-600"
  },
  {
    icon: <Gavel className="w-8 h-8" />,
    title: "Contract Disputes",
    description: "When business relationships break down, we step in. Our litigation experts resolve complex commercial disputes efficiently, protecting your business interests and bottom line.",
    cases: "350+",
    gradient: "from-orange-600 to-yellow-600"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Criminal Defense",
    description: "Your freedom and future are our priority. With aggressive advocacy and meticulous preparation, we defend your rights against all criminal charges with a proven success record.",
    cases: "500+",
    gradient: "from-gray-600 to-slate-600"
  }
];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "CEO, TechStart Inc.",
      content: "John's expertise in corporate law saved our startup millions. His strategic thinking is unmatched.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Small Business Owner",
      content: "Professional, responsive, and incredibly knowledgeable. John delivered results beyond expectations.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Former Client",
      content: "During my family's difficult time, John provided both legal excellence and genuine compassion.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face"
    }
   ];

  const stats = [
    { number: "15+", label: "Years Experience", icon: <Clock className="w-6 h-6" /> },
    { number: "1000+", label: "Cases Won", icon: <Award className="w-6 h-6" /> },
    { number: "98%", label: "Success Rate", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "$50M+", label: "Recovered", icon: <Globe className="w-6 h-6" /> }
  ];

export default function Home() {
  return (
      <main className="min-h-screen overflow-x-hidden">
        <HeroSection />
        <PracticeAreas practiceAreas={practiceAreas} />
        <Testimonials testimonials={testimonials} />
        <FAQSection faqItems={faqItems} />
      </main>
  );
}

{/*
  Header Section
  Hero Section
  About Section
  Practice Areas Section
  Testimonials Section
  FAQ Section
  Call to Action Section
  Footer Section
  */}
