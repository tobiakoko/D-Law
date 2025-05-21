import type { Route } from "./+types/home";
import { Hero } from "~/components/hero-section";
import { Specialization } from "~/components/specialization"
import { About } from "~/components/about"
import { Feature } from "~/components/feature"
import { Faq } from "~/components/faq";
import { Gallery } from "~/components/gallery";
import { Cta } from "~/components/cta";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Osei K. Prempeh - Attorney, Mediator and Counselot at law" },
    { name: "description", content: "Call (813) 879-5919 for a free case consultation with The Law Offices of Osei K. Prempeh, P.A. today to get justice and compensation you deserve." },
    {}
  ];
}

export default function Home() {
  return (
      <main className="px-10">
        <Hero 
            heading={"EXPERT LEGAL SOLUTIONS"} 
            description={"We are committed to excellence and have a deep understanding of the law. Our aim is to provide you with real world solutions."} 
        />
        <About />
        <Gallery />
        <Feature />
        
        <Faq />
        <Cta 
            heading={"Contact Us"} 
            description={"Contact us today to learn more about how our accounting services can benefit your business. We look forward to hearing from you and helping you achieve financial success!"} 
        />
      </main>
  );
}
