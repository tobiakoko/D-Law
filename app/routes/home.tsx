import type { Route } from "./+types/home";
import Testimonials from "~/components/Testimonials";
import HeroSection from "~/components/herosection";
import FAQSection from "~/components/faq";
import PracticeAreas from "~/components/PracticeArea";
import { AboutSection } from "~/components/about";

import { Scale, Shield, Award, Users, Gavel, TrendingUp, Clock, Globe } from 'lucide-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Osei K. Prempeh - Attorney, Mediator and Counselot at law" },
    { name: "description", content: "Call (813) 879-5919 for a case consultation with The Law Offices of Osei K. Prempeh, P.A. today to get justice and compensation you deserve." },
    
    // Open Graph Tags
    { property: "og:title", content: "Osei K. Prempeh | Attorney, Mediator and Counselor at law" },
    {
      property: "og:description",
      content: "Dedicated legal representation with integrity and expertise. Call (813) 879-5919 for a case consultation with The Law Offices of Osei K. Prempeh, P.A. today to get justice and compensation you deserve."
    },
    {
      property: "og:image",
      content: "https://opengraph.b-cdn.net/production/images/646ae1b5-5d60-4a4c-9e16-9526f1ca8e2a.png?token=0AR2opKrjU4NnLS589B9lQEz4y_xrPqvyVq5EJvwsn8&height=500&width=500&expires=33285185786"
    },
    { property: "og:image:alt", content: "Osei K. Prempeh Law Firm Logo" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "John Doe Law Firm" },
    { property: "og:url", content: "https://www.oseiprempeh.com/" },
    { property: "og:type", content: "website" },

    // Twitter Card Tags (Optional, but good for social sharing)
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: "@ArkoTobi" },
    { name: "twitter:title", content: "Osei K. Prempeh | Attorney, Mediator and Counselor at law" },
    { name: "twitter:description", content: "Dedicated legal representation with integrity and expertise. Call (813) 879-5919 for a case consultation with The Law Offices of Osei K. Prempeh, P.A. today to get justice and compensation you deserve." },
    { 
      name: "twitter:image", 
      content: "https://opengraph.b-cdn.net/production/images/646ae1b5-5d60-4a4c-9e16-9526f1ca8e2a.png?token=0AR2opKrjU4NnLS589B9lQEz4y_xrPqvyVq5EJvwsn8&height=500&width=500&expires=33285185786"
    },
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
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Personal Injury",
    description: "When life takes an unexpected turn, we fight for the compensation you deserve. Our proven track record includes securing thousands in settlements for accident victims and their families.",
    cases: "450+",
  },
  {
    icon: <Scale className="w-8 h-8" />,
    title: "International Business",
    description: "Expand your business globally with strategic legal support. We specialize in cross-border transactions, international contracts, and regulatory compliance across multiple jurisdictions.",
    cases: "300+",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Family Law",
    description: "Protecting what matters most during life's transitions. Our compassionate approach ensures your family's interests are safeguarded through divorce, custody, and adoption proceedings.",
    cases: "600+",
  },
  {
    icon: <Gavel className="w-8 h-8" />,
    title: "Contract Disputes",
    description: "When business relationships break down, we step in. Our litigation experts resolve complex commercial disputes efficiently, protecting your business interests and bottom line.",
    cases: "350+",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Criminal Defense",
    description: "Your freedom and future are our priority. With aggressive advocacy and meticulous preparation, we defend your rights against all criminal charges with a proven success record.",
    cases: "500+",
  }
];

  const testimonials = [
    {
      name: "Christabel A",
      role: "CEO, TechStart Inc.",
      content: "He is very professional and knowledgeable along with his staff. During my very stressful immigration issues with school and work, he provided professional assistance.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face"
    },
    {
      name: "Georgetta B",
      role: "Small Business Owner",
      content: "Did a wonderful job for both me and my son",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face"
    },
    {
      name: "Tmk W",
      role: "Former Client",
      content: "I highly recommend his services.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face"
    },
    {
      name: "Kym H",
      role: "Former Client",
      content: "Great Lawyer..",
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
      <main className="min-h-screen overflow-x-hidden bg-body-bg font-raleway">
        <HeroSection />
        <AboutSection />
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
