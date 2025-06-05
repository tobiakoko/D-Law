import { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqItems: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqItems }) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id='faq' style={{ 
      backgroundColor: 'var(--color-body-bg, #fbfcfc)',
      paddingTop: '6rem',
      paddingBottom: '6rem'
    }}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p style={{ 
            color: 'var(--color-brand-gold, #C6A24F)',
            fontSize: 'var(--text-body-small)',
            letterSpacing: 'var(--letter-spacing-subheader)',
            textTransform: 'uppercase',
            fontWeight: 'var(--font-weight-medium)',
            marginBottom: '1rem'
          }}>
            Common Questions
          </p>
          <h2 style={{
            fontSize: 'var(--text-heading-2)',
            lineHeight: 'var(--text-heading-2--line-height)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-heading)',
            fontFamily: 'var(--font-raleway)',
            marginBottom: '1.5rem'
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{
            fontSize: 'var(--text-body-large)',
            lineHeight: 'var(--text-body-large--line-height)',
            color: 'var(--color-brand-gray, #6B7280)',
            maxWidth: '48rem',
            margin: '0 auto'
          }}>
            Find answers to common inquiries about our legal services and process.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="group mb-4 last:mb-0"
              style={{
                borderBottom: '1px solid var(--color-form-border)',
                paddingBottom: '1.5rem',
                paddingTop: index === 0 ? '0' : '1.5rem'
              }}
            >
              <button
                  className="w-full text-left focus:outline-none focus:ring-2 focus:ring-offset-2"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQ === index}
                >
                <div className="flex justify-between items-start gap-4">
                  <h3 style={{
                    fontSize: 'var(--text-heading-5)',
                    lineHeight: 'var(--text-heading-5--line-height)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-heading)',
                    fontFamily: 'var(--font-raleway)',
                    textAlign: 'left',
                    transition: 'color 0.2s ease'
                  }}>
                    {item.question}
                  </h3>
                  
                  <div 
                    className="flex-shrink-0 mt-1"
                    style={{
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: openFAQ === index 
                        ? 'var(--color-primary)' 
                        : 'var(--color-form-border)',
                      transition: 'all 0.3s ease',
                      transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <ChevronDown 
                      size={16} 
                      style={{ 
                        color: openFAQ === index 
                          ? 'var(--color-form-placeholder)' 
                          : 'var(--color-brand-gray)' 
                      }} 
                    />
                  </div>
                </div>
              </button>

              {/* Answer Content */}
              <div
                style={{
                  maxHeight: openFAQ === index ? '1000px' : '0',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: openFAQ === index ? 1 : 0
                }}
              >
                <div style={{ paddingTop: '1rem', paddingRight: '2rem' }}>
                  <p style={{
                    fontSize: 'var(--text-body-regular)',
                    lineHeight: 'var(--text-body-regular--line-height)',
                    color: 'var(--color-brand-gray, #6B7280)',
                    fontFamily: 'var(--font-raleway)'
                  }}>
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div 
          id='contact'
          className="text-center mt-12 p-8 rounded-lg"
          style={{ backgroundColor: 'rgba(174, 132, 75, 0.05)' }}
        >
          <h3 style={{
            fontSize: 'var(--text-heading-4)',
            lineHeight: 'var(--text-heading-4--line-height)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-heading)',
            marginBottom: '0.5rem'
          }}>
            Still have questions?
          </h3>
          <p style={{
            fontSize: 'var(--text-body-regular)',
            color: 'var(--color-brand-gray)',
            marginBottom: '1.5rem'
          }}>
            Contact our legal team for personalized assistance with your case.
          </p>
          <button 
            className="px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-form-placeholder)',
              fontSize: 'var(--text-body-regular)',
              fontWeight: 'var(--font-weight-medium)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Contact Us Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;