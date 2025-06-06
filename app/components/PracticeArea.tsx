import { ChevronRight } from 'lucide-react';

type PracticeAreas = {
  icon: React.ReactNode;
  title: string;
  description: string;
  cases: string;
};

export default function PracticeAreas({ practiceAreas }: { practiceAreas: PracticeAreas[] }) {
  if (!practiceAreas || practiceAreas.length === 0) {
    return null;
  }

  return (
    <section 
      id="practice-areas"
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
              What We Do
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
            Our Practice Areas
          </h2>
        </div>

        {/* Practice Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 transition-all duration-500 cursor-pointer hover:shadow-2xl"
              style={{
                backgroundColor: 'var(--color-body-bg)',
                border: '1px solid var(--color-form-border)',
                borderRadius: 'calc(var(--radius) * 2)'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = 'translateY(-8px)';
                target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.15)';
                target.style.borderColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                target.style.borderColor = 'var(--color-form-border)';
              }}
            >
              {/* Icon Container */}
              <div className="mb-8">
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(174, 132, 75, 0.1)',
                    color: 'var(--color-primary)'
                  }}
                >
                  {area.icon}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 
                  className="group-hover:text-primary transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    fontSize: 'var(--text-heading-5)',
                    lineHeight: 'var(--text-heading-5--line-height)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-heading)'
                  }}
                >
                  {area.title}
                </h3>
                
                <p 
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    fontSize: 'var(--text-body-small)',
                    lineHeight: 'var(--text-body-small--line-height)',
                    color: 'var(--color-secondary)',
                    fontWeight: 'var(--font-weight-normal)'
                  }}
                >
                  {area.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <div 
                  className="text-sm"
                  style={{
                    fontFamily: 'var(--font-raleway)',
                    fontSize: 'var(--text-body-small)',
                    color: 'var(--color-secondary)'
                  }}
                >
                  <span 
                    className="font-semibold"
                    style={{ 
                      color: 'var(--color-primary)',
                      fontWeight: 'var(--font-weight-semibold)' 
                    }}
                  >
                    {area.cases}
                  </span> cases handled
                </div>
                
                <ChevronRight 
                  className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: 'var(--color-secondary)' }}
                />
              </div>

              {/* Hover Overlay Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                  borderRadius: 'calc(var(--radius) * 2)'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}