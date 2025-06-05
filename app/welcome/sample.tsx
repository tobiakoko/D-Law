import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronRight, Scale, Shield, Award, Users, 
  Phone, Mail, MapPin, Star, Quote, ArrowRight, 
  CheckCircle, Calendar, MessageSquare, Gavel,
  TrendingUp, Eye, Clock, Globe
} from 'lucide-react';

const JohnDoeLawWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const practiceAreas = [
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Corporate Law",
      description: "Strategic legal counsel for businesses of all sizes, from startups to Fortune 500 companies.",
      cases: "500+",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Criminal Defense",
      description: "Aggressive representation protecting your rights with a 95% success rate in complex cases.",
      cases: "300+",
      gradient: "from-red-600 to-pink-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Law",
      description: "Compassionate guidance through life's most challenging legal matters with dignity.",
      cases: "400+",
      gradient: "from-green-600 to-teal-600"
    },
    {
      icon: <Gavel className="w-8 h-8" />,
      title: "Personal Injury",
      description: "Maximum compensation for accident victims with $50M+ recovered for clients.",
      cases: "250+",
      gradient: "from-orange-600 to-red-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "CEO, TechStart Inc.",
      content: "John's expertise in corporate law saved our startup millions. His strategic thinking is unmatched.",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      name: "Michael Chen",
      role: "Small Business Owner",
      content: "Professional, responsive, and incredibly knowledgeable. John delivered results beyond expectations.",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      name: "Emily Rodriguez",
      role: "Former Client",
      content: "During my family's difficult time, John provided both legal excellence and genuine compassion.",
      rating: 5,
      image: "/api/placeholder/80/80"
    }
  ];

  const stats = [
    { number: "15+", label: "Years Experience", icon: <Clock className="w-6 h-6" /> },
    { number: "1000+", label: "Cases Won", icon: <Award className="w-6 h-6" /> },
    { number: "98%", label: "Success Rate", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "$50M+", label: "Recovered", icon: <Globe className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
        <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
      `}</style>

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>


      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 transition-all duration-300">
        <div 
          className={`transition-all duration-300 ${
            scrollY > 50 ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center group cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                    <span className="text-white font-bold text-xl">JD</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                </div>
                <div className="ml-4">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    John Doe
                  </h1>
                  <p className="text-sm text-gray-400">Attorney at Law</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {['Home', 'About', 'Services', 'Cases', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="relative text-gray-300 hover:text-white transition-all duration-300 group py-2"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                  Free Consultation
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white hover:text-blue-400 transition-colors p-2"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700">
              <div className="px-4 py-6 space-y-4">
                {['Home', 'About', 'Services', 'Cases', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full font-medium mt-4">
                  Free Consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    ⚖️ Award-Winning Attorney
                  </span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Justice
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Delivered
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  15+ years of experience fighting for your rights. From corporate law to criminal defense, 
                  I deliver results that matter with a 98% success rate.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-blue-500/25 flex items-center justify-center">
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-gray-600 hover:border-blue-500 text-white hover:text-blue-400 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center">
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now: (555) 123-4567
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-2 text-blue-400 group-hover:text-purple-400 transition-colors">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Professional Image */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-10 animate-bounce"></div>
                
                {/* Main Image Container */}
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 transform hover:scale-105 transition-all duration-500 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
                  
                  {/* Professional Silhouette */}
                  <div className="relative w-64 h-80 bg-gradient-to-b from-slate-700 to-slate-800 rounded-2xl mx-auto overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="space-y-2">
                        <div className="h-3 bg-white/20 rounded w-3/4"></div>
                        <div className="h-2 bg-white/10 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Achievement Cards */}
                  <div className="absolute -right-6 top-12 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-slate-700 animate-float">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      <div>
                        <div className="text-xs text-gray-300">Success Rate</div>
                        <div className="text-lg font-bold text-white">98%</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -left-6 bottom-16 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-slate-700 animate-float-delayed">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-xs text-gray-300">Rating</div>
                        <div className="text-lg font-bold text-white">5.0★</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      

      {/* Practice Areas */}
      <div className="relative py-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Areas of 
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive legal solutions across multiple practice areas with proven track records
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceAreas.map((area, index) => (
              <div
                key={index}
                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-500 border border-slate-700/50 hover:border-slate-600/50 transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600"></div>
                
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${area.gradient} mb-6 text-white transform group-hover:scale-110 transition-transform duration-300`}>
                  {area.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {area.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {area.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="text-blue-400 font-semibold">{area.cases}</span> cases handled
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative py-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Client 
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-slate-900/70 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
              
              <div className="relative z-10">
                <Quote className="w-16 h-16 text-blue-400 mb-8 mx-auto opacity-50" />
                
                <div className="text-center">
                  <p className="text-2xl text-gray-200 leading-relaxed mb-8 italic">
                    "{testimonials[activeTestimonial].content}"
                  </p>
                  
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-left">
                      <h4 className="text-white font-semibold text-lg">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <p className="text-gray-400">
                        {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900/90 backdrop-blur-sm border-t border-slate-700/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center group cursor-pointer mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">JD</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h1 className="text-xl font-bold text-white">John Doe</h1>
                  <p className="text-sm text-gray-400">Attorney at Law</p>
                </div>
              </div>
              
              <p className="text-gray-400 mb-6 max-w-md">
                Dedicated to providing exceptional legal representation with integrity, 
                expertise, and unwavering commitment to client success.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                  123 Justice Boulevard, Legal District, NY 10001
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="w-5 h-5 mr-3 text-blue-400" />
                  (555) 123-4567
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  contact@johndoelaw.com
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['About', 'Services', 'Case Results', 'Testimonials', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practice Areas */}
            <div>
              <h3 className="text-white font-semibold mb-6">Practice Areas</h3>
              <ul className="space-y-3">
                {['Corporate Law', 'Criminal Defense', 'Family Law', 'Personal Injury', 'Real Estate', 'Immigration'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700/50 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 John Doe Law Firm. All rights reserved. | Privacy Policy | Terms of Service
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Licensed to practice law in New York State
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
        
        /* Smooth scrolling behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1e293b;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default JohnDoeLawWebsite;