import { Button } from "~/components/ui/button";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronRight, Scale, Shield, Award, Users, 
  Phone, Mail, MapPin, Star, Quote, ArrowRight, 
  CheckCircle, Calendar, MessageSquare, Gavel,
  TrendingUp, Eye, Clock, Globe
} from 'lucide-react';

interface CtaProps {
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

const Cta = ({
  heading = "Contact us",
  description = "Contact us today to learn more about how our accounting services can benefit your business. We look forward to hearing from you and helping you achieve financial success!",
  buttons = {
    primary: {
      text: "Get in touch",
      url: "https://www.shadcnblocks.com",
    },
  },
}: CtaProps) => {
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="flex flex-col items-center rounded-lg bg-accent p-8 text-center md:rounded-xl lg:p-16">
          <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            {heading}
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            {description}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            {buttons.primary && (
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const CtaWithSecondary = ()=> {
  return (
    <div className="relative py-24 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ready to Fight for 
                </span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Your Rights?
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Don't wait. Every moment counts in legal matters. Get your free consultation today 
                and let's build your winning strategy together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-blue-500/25 flex items-center justify-center">
                  <Calendar className="mr-2 w-5 h-5" />
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-gray-600 hover:border-blue-500 text-white hover:text-blue-400 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center">
                  <MessageSquare className="mr-2 w-5 h-5" />
                  Live Chat Available
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export { Cta, CtaWithSecondary };
