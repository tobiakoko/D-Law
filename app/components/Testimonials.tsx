import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import TestimonialImage from '~/assets/Testimonials.jpg';

type TestimonialsProps = { testimonials: { name: string, role: string, content: string, rating: number, image?: string }[] };

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const testimonialData = testimonials.length > 0 ? testimonials : testimonials;

  const currentData = testimonialData[activeTestimonial % testimonialData.length];

  return (
    <section className="min-h-screen flex items-center py-20">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left Side - Quote Content with Navy Background */}
          <div 
            className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-20"
            style={{ backgroundColor: 'var(--color-brand-navy, #1A2A4F)' }}
          >
            {/* Section Header */}
            <div className="mb-12">
              <p 
                className="text-sm tracking-widest uppercase mb-4"
                style={{ 
                  color: 'var(--color-brand-gold, #C6A24F)',
                  fontWeight: '500',
                  letterSpacing: '0.15em'
                }}
              >
                What They Say
              </p>
              <h2 
                className="text-4xl lg:text-5xl font-light mb-16"
                style={{
                  color: 'var(--color-brand-gold, #C6A24F)',
                  fontFamily: 'var(--font-raleway, serif)',
                  lineHeight: '1.2'
                }}
              >
                Client Testimonials
              </h2>
            </div>

            {/* Quote Icon */}
            <Quote 
              size={40} 
              className="mb-8 opacity-60"
              style={{ color: 'var(--color-brand-gold, #C6A24F)' }} 
            />
            
            {/* Quote Content */}
            <blockquote 
              className="text-lg lg:text-xl leading-relaxed mb-8 font-light italic"
              style={{
                color: '#E5E7EB',
                lineHeight: '1.7'
              }}
            >
              "{currentData.content}"
            </blockquote>

            {/* Rating Stars */}
            <div className="flex gap-1 mb-8">
              {Array.from({ length: currentData.rating }).map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  style={{ color: 'var(--color-brand-gold, #C6A24F)' }}
                  fill="currentColor"
                />
              ))}
            </div>

            {/* Client Info */}
            <div className="mb-12">
              <h4 
                className="text-xl font-semibold mb-1"
                style={{ color: 'white' }}
              >
                {currentData.name}
              </h4>
              <p 
                className="text-base opacity-75"
                style={{ color: '#9CA3AF' }}
              >
                {currentData.role}
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex gap-3">
              {testimonialData.map((_, index) => (
                <button
                  key={index}
                  className="w-2 h-2 rounded-full transition-all duration-300 hover:scale-125"
                  style={{
                    backgroundColor: index === (activeTestimonial % testimonialData.length)
                      ? 'var(--color-brand-gold, #C6A24F)' 
                      : 'rgba(255,255,255,0.3)',
                    transform: index === (activeTestimonial % testimonialData.length) ? 'scale(1.5)' : 'scale(1)'
                  }}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative bg-gray-100 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${TestimonialImage})`
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}