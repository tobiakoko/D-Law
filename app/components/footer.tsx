import { 
  ChevronRight, Scale, Phone, Mail, MapPin, Clock, Smartphone, Printer
} from 'lucide-react';
import { NavLink } from 'react-router';
import DarkLogo from '~/assets/logo-light.png';
import Logo from '~/components/logo';

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const currentYear = new Date().getFullYear();

const Footer = ({
  logo = {
    src: DarkLogo,
    alt: "Osei K. Prempeh P.A. Logo",
    title: "Osei K. Prempeh, P.A.",
    url: "/",
  },
  tagline = "Attorney, Mediator, and Counselor at Law",
  menuItems = [
    {
      title: "Practice Areas",
      links: [
        { text: "Immigration", url: "#" },
        { text: "Personal Injury", url: "#" },
        { text: "International Business", url: "#" },
        { text: "Family Law", url: "#" },
        { text: "Contract Disputes", url: "#" },
        { text: "Criminal Law", url: "#" },
      ],
    },
    {
      title: "Firm",
      links: [
        { text: "About", url: "#about" },
        { text: "Practice Areas", url: "#" },
        { text: "Client Testimonials", url: "#testimonials" },
        { text: "Contact", url: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Legal Resources", url: "#" },
        { text: "FAQ", url: "#faq" },
        { text: "Consultation", url: "#contact" },
        { text: "Case Evaluation", url: "#" },
      ],
    },
  ],
  copyright = `© ${currentYear} The Law Offices of Osei K. Prempeh, P.A. All rights reserved.`,
  bottomLinks = [
    { text: "Privacy Policy", url: "#" },
    { text: "Terms of Service", url: "#" },
    { text: "Disclaimer", url: "#" },
  ],
}: FooterProps) => {
  return (
    <footer 
      className="relative"
      style={{ backgroundColor: 'var(--color-brand-navy, #1A2A4F)' }}
    >
      {/* Main Footer Content */}
      <div className="py-20 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Firm Information - Takes up more space */}
            <div className="lg:col-span-5">
              {/* Logo and Firm Name */}
              <div className="flex items-center mb-8">
                <Logo />
                <div>
                  <h2 
                    className="text-2xl lg:text-3xl font-light"
                    style={{ 
                      color: 'var(--color-brand-gold, #C6A24F)',
                      fontFamily: 'var(--font-raleway, serif)'
                    }}
                  >
                    {logo.title}
                  </h2>
                  <p 
                    className="text-lg font-light mt-1"
                    style={{ color: '#E5E7EB' }}
                  >
                    {tagline}
                  </p>
                </div>
              </div>
              
              {/* Description */}
              <p 
                className="text-lg leading-relaxed mb-10 max-w-md font-light"
                style={{ color: '#9CA3AF', lineHeight: '1.7' }}
              >
                Providing exceptional legal representation with integrity, expertise, 
                and unwavering commitment to achieving the best outcomes for our clients.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin 
                    className="w-5 h-5 mr-4 mt-1 flex-shrink-0" 
                    style={{ color: 'var(--color-brand-gold, #C6A24F)' }}
                  />
                  <div>
                    <p style={{ color: '#E5E7EB' }}>
                      3202 N. Howard Ave<br />
                      Tampa, FL 33607
                    </p>
                  </div>
                </div>
                
                
                {/* Office Phone */}
                <div className="flex items-start">
                <Phone
                  className="w-5 h-5 mr-4 mt-1 flex-shrink-0"
                  style={{ color: 'var(--color-brand-gold, #C6A24F)' }}
                />
                <div>
                  <p style={{ color: '#E5E7EB' }}>
                    Office: (813) 555-0123
                  </p>
                </div>
                </div>

                {/* Fax */}
                <div className="flex items-start">
                <Printer
                  className="w-5 h-5 mr-4 mt-1 flex-shrink-0"
                  style={{ color: 'var(--color-brand-gold, #C6A24F)' }}
                />
                <div>
                  <p style={{ color: '#E5E7EB' }}>
                    Fax: (813) 555-0124
                  </p>
                </div>
                </div>

                {/* Cell Phone */}
                <div className="flex items-start">
                <Smartphone
                  className="w-5 h-5 mr-4 mt-1 flex-shrink-0"
                  style={{ color: 'var(--color-brand-gold, #C6A24F)' }}
                />
                <div>
                  <p style={{ color: '#E5E7EB' }}>
                    Cell: (813) 555-0125
                  </p>
                </div>
                </div>
                
                <div className="flex items-center">
                  <Mail 
                    className="w-5 h-5 mr-4" 
                    style={{ color: 'var(--color-brand-gold, #C6A24F)' }}
                  />
                  <a 
                    href="mailto:info@oseiprempeh.com"
                    className="hover:opacity-75 transition-opacity"
                    style={{ color: '#E5E7EB' }}
                  >
                    info@oseiprempeh
                  </a>
                </div>
                <div className="flex items-start">
                  <Mail
                    className="w-5 h-5 mr-4 mt-1 flex-shrink-0"
                    style={{ color: 'var(--color-brand-gold, #C6A24F)' }}
                  />
                  <div>
                    <p style={{ color: '#E5E7EB' }}>
                      P.O. Box 27384<br />
                      Tampa, FL 33623
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock 
                    className="w-5 h-5 mr-4" 
                    style={{ color: 'var(--color-brand-gold, #C6A24F)' }}
                  />
                  <p style={{ color: '#E5E7EB' }}>
                    Mon - Fri: 8:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {menuItems.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 
                    className="text-lg font-semibold mb-8"
                    style={{ color: 'var(--color-brand-gold, #C6A24F)' }}
                  >
                    {section.title}
                  </h3>
                  <ul className="space-y-4">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a 
                          href={link.url}
                          className="group flex items-center transition-all duration-300 hover:translate-x-2"
                          style={{ color: '#9CA3AF' }}
                        >
                          <ChevronRight 
                            className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            style={{ color: 'var(--color-brand-gold, #C6A24F)' }}
                          />
                          <span className="group-hover:text-white transition-colors duration-300">
                            {link.text}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        className="border-t px-8 lg:px-16 py-8"
        style={{ borderColor: 'rgba(198, 162, 79, 0.2)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p style={{ color: '#9CA3AF' }}>
                {copyright}
              </p>
              <p 
                className="text-sm mt-1"
                style={{ color: '#6B7280' }}
              >
                Licensed to practice law in the State of Florida
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-6">
              {bottomLinks.map((link, linkIdx) => (
                <NavLink
                  key={linkIdx}
                  to={link.url}
                  className="text-sm transition-colors duration-300"
                  style={{ 
                    color: '#9CA3AF'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-brand-gold, #C6A24F)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9CA3AF';
                  }}
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;