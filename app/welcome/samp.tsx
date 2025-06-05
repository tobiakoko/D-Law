import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Shield, Users, Briefcase, TrendingUp, Award, Handshake, Lightbulb } from 'lucide-react';

const BernsteinLawWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "We're Built On Relationships",
      subtitle: "A Heritage of Results",
      image: "/api/placeholder/800/600"
    },
    {
      title: "Experienced Legal Counsel",
      subtitle: "Protecting Your Interests",
      image: "/api/placeholder/800/600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      icon: <Briefcase className="w-12 h-12 text-amber-600" />,
      title: "Business Focused",
      subtitle: "Clear, Concise Advice",
      description: "Guiding you through complex legal matters with strategic counsel that aligns with your business goals."
    },
    {
      icon: <Users className="w-12 h-12 text-amber-600" />,
      title: "Legal Counsel",
      subtitle: "Collaborative Partnership",
      description: "Working closely with our skilled counsel to ensure your legal strategy is both effective and actionable."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-amber-600" />,
      title: "Judicial Results",
      subtitle: "Proof, Not Promises",
      description: "Our track record speaks for itself - delivering measurable results that protect and advance your interests."
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-amber-600" />,
      title: "Ideating in Law",
      description: "Pioneering innovative approaches to complex legal challenges with creative solutions."
    },
    {
      icon: <Users className="w-8 h-8 text-amber-600" />,
      title: "The Right People",
      description: "Our experienced team combines deep expertise with personalized attention."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-amber-600" />,
      title: "Business Open",
      description: "Ethical, accountable practices that deliver transparent results for your business."
    },
    {
      icon: <Award className="w-8 h-8 text-amber-600" />,
      title: "Justice Served",
      description: "Comprehensive client service focused on achieving justice through every case."
    }
  ];

  const bottomFeatures = [
    {
      icon: <Lightbulb className="w-16 h-16 text-amber-600" />,
      title: "Strategy",
      description: "Comprehensive strategic planning tailored to your specific legal needs and business objectives."
    },
    {
      icon: <Handshake className="w-16 h-16 text-amber-600" />,
      title: "Cooperation",
      description: "Collaborative approach that ensures seamless integration with your existing business operations."
    },
    {
      icon: <TrendingUp className="w-16 h-16 text-amber-600" />,
      title: "Solution",
      description: "Results-driven solutions that provide measurable outcomes and long-term value for your organization."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-slate-800 text-white px-3 py-2 rounded font-bold text-xl">
                B
              </div>
              <span className="ml-3 text-slate-600 font-light text-lg tracking-wider">
                BERNSTEIN
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium">HOME</a>
                <a href="#" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium">ABOUT</a>
                <a href="#" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium">SERVICES</a>
                <a href="#" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium">PAGES</a>
                <a href="#" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium">ELEMENTS</a>
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
                  NEWSLETTER
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-slate-900"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="text-slate-600 hover:text-slate-900 block px-3 py-2 text-base font-medium">HOME</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 block px-3 py-2 text-base font-medium">ABOUT</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 block px-3 py-2 text-base font-medium">SERVICES</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 block px-3 py-2 text-base font-medium">PAGES</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 block px-3 py-2 text-base font-medium">ELEMENTS</a>
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-medium mt-2 ml-3">
                NEWSLETTER
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-r from-slate-900 to-slate-800 overflow-hidden mt-16">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Background Pattern */}
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <div className="grid grid-cols-8 gap-2 h-full p-8 opacity-20">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`rounded ${
                  Math.random() > 0.5 ? 'bg-amber-400' : 'bg-slate-600'
                }`}
                style={{ opacity: Math.random() * 0.8 + 0.2 }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <p className="text-amber-400 text-sm font-medium tracking-wider uppercase">
                {heroSlides[currentSlide].subtitle}
              </p>
              <h1 className="text-5xl lg:text-6xl font-light leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <div className="flex space-x-4">
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded font-medium transition-colors">
                  Legal Services
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded font-medium transition-colors">
                  Meet & Discuss
                </button>
              </div>
            </div>

            {/* Right Content - Professional Image */}
            <div className="relative">
              <div className="w-80 h-96 bg-slate-700 rounded-lg mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800 opacity-90"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="w-16 h-16 bg-slate-600 rounded-full mb-4"></div>
                  <h3 className="font-semibold">Professional Attorney</h3>
                  <p className="text-sm text-slate-300">Experienced Legal Counsel</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-amber-500' : 'bg-white bg-opacity-50'
              }`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-light text-slate-800 mb-2">{service.title}</h3>
                <p className="text-amber-600 font-medium mb-4">{service.subtitle}</p>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
                <a href="#" className="inline-block mt-4 text-amber-600 hover:text-amber-700 font-medium">
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Committed to Your Business Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-slate-500 text-sm font-medium tracking-wider uppercase mb-4">
                Your Business Is Safe With Bernstein
              </p>
              <h2 className="text-4xl lg:text-5xl font-light text-slate-800 mb-6">
                Committed to
                <span className="block text-amber-600">Your Business</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                We're experienced attorneys who can handle a broad range of complex legal issues for businesses, governmental entities, organizations, professionals, and individuals throughout Florida.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="space-y-3">
                    <div>{feature.icon}</div>
                    <h4 className="font-semibold text-slate-800">{feature.title}</h4>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-800 text-white p-8 rounded-lg">
                <p className="text-amber-400 text-sm font-medium tracking-wider uppercase mb-4">
                  We Support and Encourage
                </p>
                <h3 className="text-2xl font-light mb-4">
                  Our Attorneys Work in Community and Citizenship
                </h3>
                <p className="text-slate-300 mb-6">
                  Through outside of the main office in our downtown area, we maintain active involvement in community initiatives.
                </p>
                <p className="text-white font-medium">Adam Bernstein</p>
                <p className="text-slate-400 text-sm">Managing Partner</p>
              </div>
              
              {/* Background image placeholder */}
              <div className="absolute -right-8 -top-8 w-64 h-80 bg-slate-200 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Experienced and Trusted Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-slate-500 text-sm font-medium tracking-wider uppercase mb-4">
                Your Business Is Safe With Bernstein
              </p>
              <h2 className="text-4xl lg:text-5xl font-light text-slate-800 mb-6">
                Experienced
                <span className="block text-amber-600">And Trusted</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Our attorneys have 150 collective years of experience in the legal industry, bringing knowledge to help solve, giving you greater certainty and the ability to focus on the challenges you face. We work closely and comprehensively with our clients to understand their goals and help them achieve lasting legal clarity.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Understanding the competing demands for your attention, we take pride in providing information about the status of your case. Our attorneys work in earnest to provide an exceptional level of professional service that addresses the real needs of our clients in the areas they find challenging or complex.
              </p>
            </div>

            <div className="relative">
              {/* Professional image placeholder with geometric overlay */}
              <div className="relative">
                <div className="w-full h-96 bg-slate-700 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800"></div>
                  
                  {/* Geometric pattern overlay */}
                  <div className="absolute right-0 top-0 w-1/3 h-full">
                    <div className="grid grid-cols-4 gap-1 h-full p-4 opacity-30">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <div
                          key={i}
                          className={`rounded ${
                            Math.random() > 0.5 ? 'bg-white' : 'bg-amber-400'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {bottomFeatures.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 border-2 border-amber-600 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-slate-800">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-white text-slate-800 px-3 py-2 rounded font-bold text-xl">
                  B
                </div>
                <span className="ml-3 text-white font-light text-lg tracking-wider">
                  BERNSTEIN
                </span>
              </div>
              <p className="text-slate-400">
                Experienced legal counsel dedicated to protecting your business interests.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Business Law</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate Counsel</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Litigation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Real Estate</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Contact Info</h5>
              <div className="space-y-2 text-slate-400">
                <p>123 Legal Plaza</p>
                <p>Tampa, FL 33602</p>
                <p>Phone: (813) 555-0123</p>
                <p>Email: info@bernsteinlaw.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Bernstein Law Firm. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BernsteinLawWebsite;