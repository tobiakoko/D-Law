import React from 'react';
import { User, GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

interface AboutData {
  title: string;
  description: string;
  bgTitle: string;
  background: string;
  experienceTitle: string;
  experienceDescription: string;
  experienceList: string[];
}

const data: AboutData = {
  title: "Attorney, Mediator, and Counselor at Law",
  description: "Osei K. Prempeh, P.A. brings over two decades of dedicated legal experience to clients throughout the region, combining deep expertise with a genuine understanding of the challenges facing individuals and businesses in today's complex legal landscape.",
  bgTitle: "Background and Experience",
  background: "Born in Kumasi, Ghana, Attorney Prempeh immigrated to the Washington D.C. Metropolitan area in 1981, where he began building the foundation for his distinguished legal career. His journey to the law was shaped by years of hands-on experience in the community, working as a cab driver for six years and serving at the United States Postal Service for five years. This early professional experience provided him with invaluable insights into the daily lives and concerns of working families—perspective that continues to inform his compassionate approach to legal representation today.",
  experienceTitle: "Educational Excellence",
  experienceDescription: "Attorney Prempeh's commitment to legal excellence is reflected in his comprehensive educational background:",
  experienceList: [
    "Bachelor of Science in Administration of Justice from the George Mason University (May 1997)",
    "Juris Doctor (J.D.) from Stetson University College of Law (2000)",
    "Master of Laws (LL.M.) in International Business Law from Stetson University College of Law (2004)",
  ],
};

interface CredentialItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CredentialItem: React.FC<CredentialItemProps> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div 
      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(174, 132, 75, 0.1)',
        color: 'var(--color-primary)'
      }}
    >
      {icon}
    </div>
    <div>
      <h4 
        style={{
          fontFamily: 'var(--font-raleway)',
          fontSize: 'var(--text-body)',
          lineHeight: 'var(--text-body--line-height)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-heading)',
          marginBottom: '0.25rem'
        }}
      >
        {title}
      </h4>
      <p 
        style={{
          fontFamily: 'var(--font-raleway)',
          fontSize: 'var(--text-body-small)',
          lineHeight: 'var(--text-body-small--line-height)',
          color: 'var(--color-secondary)',
          fontWeight: 'var(--font-weight-normal)'
        }}
      >
        {description}
      </p>
    </div>
  </div>
);

const AboutSection: React.FC = () => {
  const credentials = [
    {
      icon: <GraduationCap size={20} />,
      title: "George Mason University",
      description: "Bachelor of Science in Administration of Justice - 1997"
    },
    {
      icon: <Award size={20} />,
      title: "Stetson University College of Law",
      description: "Juris Doctor (J.D.) - 2000"
    },
    {
      icon: <Award size={20} />,
      title: "Stetson University College of Law",
      description: "Master of Laws (LL.M.) in International Business Law - 2004"
    },
    {
      icon: <Calendar size={20} />,
      title: "Licensed to Practice",
      description: "Licensed since March 26, 2004 - Over 20 years of experience"
    },
    {
      icon: <MapPin size={20} />,
      title: "Practice Location",
      description: "3202 N. Howard Ave Tampa, FL 33607"
    }
  ];

  return (
    <section 
      id="about"
      className="relative py-24 z-10"
      style={{ backgroundColor: 'var(--color-body-bg)' }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-medium tracking-wide uppercase"
              style={{
                color: 'var(--color-primary)',
                backgroundColor: 'rgba(174, 132, 75, 0.1)',
                fontFamily: 'var(--font-raleway)',
                fontWeight: 'var(--font-weight-medium)',
                letterSpacing: 'var(--letter-spacing-subheader)'
              }}
            >
              Who We Are
            </span>
          </div>
          
          <h2 
            className="mb-6"
            style={{
              fontFamily: 'var(--font-raleway)',
              fontSize: 'var(--text-heading-2)',
              lineHeight: 'var(--text-heading-2--line-height)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-heading)'
            }}
          >
            About Us
          </h2>
          
          <p 
            className="max-w-2xl mx-auto leading-relaxed mb-4"
            style={{
              fontFamily: 'var(--font-raleway)',
              fontSize: 'var(--text-heading-5)',
              lineHeight: 'var(--text-heading-5--line-height)',
              color: 'var(--color-primary)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            {data.title}
          </p>

          <p 
            className="max-w-4xl mx-auto leading-relaxed"
            style={{
              fontFamily: 'var(--font-raleway)',
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--text-body--line-height)',
              color: 'var(--color-secondary)',
              fontWeight: 'var(--font-weight-normal)'
            }}
          >
            {data.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Background Story - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div 
              className="bg-white rounded-2xl p-8 h-full"
              style={{
                backgroundColor: 'var(--color-body-bg)',
                border: '1px solid var(--color-form-border)',
                borderRadius: 'calc(var(--radius) * 2)'
              }}
            >
              <div className="mb-6">
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{
                    backgroundColor: 'rgba(174, 132, 75, 0.1)',
                    color: 'var(--color-primary)'
                  }}
                >
                  <User size={24} />
                </div>
                
                <h3 
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    fontSize: 'var(--text-heading-4)',
                    lineHeight: 'var(--text-heading-4--line-height)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-heading)',
                    marginBottom: '1rem'
                  }}
                >
                  {data.bgTitle}
                </h3>
              </div>
              
              <p 
                className="leading-relaxed"
                style={{
                  fontFamily: 'var(--font-raleway)',
                  fontSize: 'var(--text-body)',
                  lineHeight: 'var(--text-body--line-height)',
                  color: 'var(--color-secondary)',
                  fontWeight: 'var(--font-weight-normal)'
                }}
              >
                {data.background}
              </p>
            </div>
          </div>

          {/* Credentials Sidebar */}
          <div className="lg:col-span-1">
            <div 
              className="bg-white rounded-2xl p-8 h-full"
              style={{
                backgroundColor: 'var(--color-body-bg)',
                border: '1px solid var(--color-form-border)',
                borderRadius: 'calc(var(--radius) * 2)'
              }}
            >
              <h3 
                className="mb-8"
                style={{
                  fontFamily: 'var(--font-raleway)',
                  fontSize: 'var(--text-heading-4)',
                  lineHeight: 'var(--text-heading-4--line-height)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-heading)'
                }}
              >
                Credentials & Experience
              </h3>

              <div className="space-y-6">
                {credentials.map((credential, index) => (
                  <CredentialItem
                    key={index}
                    icon={credential.icon}
                    title={credential.title}
                    description={credential.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience Highlight 
        <div className="mt-16">
          <div 
            className="bg-white rounded-2xl p-8 text-center"
            style={{
              backgroundColor: 'rgba(174, 132, 75, 0.03)',
              border: '1px solid rgba(174, 132, 75, 0.15)',
              borderRadius: 'calc(var(--radius) * 2)'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    color: 'var(--color-primary)',
                    fontWeight: 'var(--font-weight-bold)'
                  }}
                >
                  20+
                </div>
                <p 
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    fontSize: 'var(--text-body-small)',
                    color: 'var(--color-secondary)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  Years of Legal Experience
                </p>
              </div>
              
              <div>
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    color: 'var(--color-primary)',
                    fontWeight: 'var(--font-weight-bold)'
                  }}
                >
                  6
                </div>
                <p 
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    fontSize: 'var(--text-body-small)',
                    color: 'var(--color-secondary)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  Practice Areas
                </p>
              </div>
              
              <div>
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    color: 'var(--color-primary)',
                    fontWeight: 'var(--font-weight-bold)'
                  }}
                >
                  2004
                </div>
                <p 
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    fontSize: 'var(--text-body-small)',
                    color: 'var(--color-secondary)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  Licensed Since
                </p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Call to Action Quote */}
        <div className="text-center mt-16">
          <div 
            className="inline-block px-8 py-6 rounded-2xl max-w-3xl"
            style={{
              backgroundColor: 'rgba(174, 132, 75, 0.05)',
              border: '1px solid rgba(174, 132, 75, 0.2)'
            }}
          >
            <p 
              style={{
                fontFamily: 'var(--font-raleway)',
                fontSize: 'var(--text-heading-6)',
                lineHeight: 'var(--text-heading-6--line-height)',
                color: 'var(--color-heading)',
                fontWeight: 'var(--font-weight-medium)',
                fontStyle: 'italic'
              }}
            >
              "Committed to providing excellent, ethical, and effective legal representation."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutSection };