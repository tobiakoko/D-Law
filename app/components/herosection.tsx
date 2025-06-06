import { useState, useEffect, useRef } from 'react';
import { Award, Phone, Clock, ArrowRight, Scale, TrendingUp, Globe } from 'lucide-react';
import Stats from '~/components/Stats';
import { Link } from 'react-router';

export default function HeroSection() {
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        setMounted(true); // Fix hydration mismatch
        
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

    const stats = [
        { number: "15+", label: "Years Experience", icon: <Clock className="w-6 h-6" /> },
        { number: "1000+", label: "Cases Won", icon: <Award className="w-6 h-6" /> },
        { number: "98%", label: "Success Rate", icon: <TrendingUp className="w-6 h-6" /> },
        { number: "$50M+", label: "Recovered", icon: <Globe className="w-6 h-6" /> }
    ];

    if (!mounted) {
        return (
            <div 
                className="relative min-h-screen flex items-center justify-center pt-20"
                style={{ backgroundColor: 'var(--color-body-bg)' }}
            >
                <div className="relative z-10 container mt-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h1 
                                    className="leading-tight"
                                    style={{
                                        fontFamily: 'var(--font-raleway)',
                                        fontSize: 'var(--text-heading-1)',
                                        lineHeight: 'var(--text-heading-1--line-height)',
                                        fontWeight: 'var(--font-weight-bold)',
                                        color: 'var(--color-heading)'
                                    }}
                                >
                                    <span>Expert Legal</span>
                                    <br />
                                    <span style={{ color: 'var(--color-primary)' }}>
                                        Counsel
                                    </span>
                                </h1>
                                
                                <p 
                                    className="leading-relaxed max-w-lg"
                                    style={{
                                        fontFamily: 'var(--font-raleway)',
                                        fontSize: 'var(--text-body-large)',
                                        lineHeight: 'var(--text-body-large--line-height)',
                                        color: 'var(--color-secondary)',
                                        fontWeight: 'var(--font-weight-normal)'
                                    }}
                                >
                                    With over 20 years of dedicated legal experience, we provide exceptional 
                                    representation across corporate law, criminal defense, and civil litigation. 
                                    Your rights are our priority.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div 
            ref={heroRef} 
            className="relative min-h-screen flex items-center justify-center pt-20"
            style={{ backgroundColor: 'var(--color-body-bg)' }}
        >
            <div className="relative z-10 container mt-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 animate-fade-in">
                        <div className="space-y-6">
                            <h1 
                                className="leading-tight"
                                style={{
                                    fontFamily: 'var(--font-raleway)',
                                    fontSize: 'var(--text-heading-1)',
                                    lineHeight: 'var(--text-heading-1--line-height)',
                                    fontWeight: 'var(--font-weight-bold)',
                                    color: 'var(--color-heading)'
                                }}
                            >
                                <span>Expert Legal</span>
                                <br />
                                <span style={{ color: 'var(--color-primary)' }}>
                                    Counsel
                                </span>
                            </h1>
                            
                            <p 
                                className="leading-relaxed max-w-lg"
                                style={{
                                    fontFamily: 'var(--font-raleway)',
                                    fontSize: 'var(--text-body-large)',
                                    lineHeight: 'var(--text-body-large--line-height)',
                                    color: 'var(--color-secondary)',
                                    fontWeight: 'var(--font-weight-normal)'
                                }}
                            >
                                With over 15 years of dedicated legal experience, we provide exceptional 
                                representation across corporate law, criminal defense, and civil litigation. 
                                Your rights are our priority.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                className="group px-8 py-4 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
                                style={{
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'var(--color-form-placeholder)',
                                    fontFamily: 'var(--font-raleway)',
                                    fontWeight: 'var(--font-weight-semibold)',
                                    borderRadius: 'var(--radius)'
                                }}
                                onMouseEnter={(e) => {
                                    const target = e.target as HTMLButtonElement;
                                    target.style.backgroundColor = 'var(--color-form-bg-focus)';
                                }}
                                onMouseLeave={(e) => {
                                    const target = e.target as HTMLButtonElement;
                                    target.style.backgroundColor = 'var(--color-primary)';
                                }}
                            >
                                Get Consultation
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            
                            <button 
                                className="px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center border-2"
                                style={{
                                    borderColor: 'var(--color-primary)',
                                    color: 'var(--color-primary)',
                                    fontFamily: 'var(--font-raleway)',
                                    fontWeight: 'var(--font-weight-semibold)',
                                    borderRadius: 'var(--radius)'
                                }}
                                onMouseEnter={(e) => {
                                    const target = e.target as HTMLButtonElement;
                                    target.style.backgroundColor = 'var(--color-primary)';
                                    target.style.color = 'var(--color-form-placeholder)';
                                }}
                                onMouseLeave={(e) => {
                                    const target = e.target as HTMLButtonElement;
                                    target.style.backgroundColor = 'transparent';
                                    target.style.color = 'var(--color-primary)';
                                }}
                            >
                                <Phone className="mr-2 w-5 h-5" />
                                Call: (813) 385-8612
                            </button>
                        </div>

                        {/* Stats Component */}
                        <div className="pt-8">
                            <Stats stats={stats} />
                        </div>
                    </div>

                    {/* Right Content - Professional Visualization */}
                    <div className="relative">
                        <div className="relative w-full max-w-lg mx-auto">
                            {/* Floating Geometric Elements */}
                            <div 
                                className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 animate-float"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                            />
                            <div 
                                className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full opacity-5 animate-float-delayed"
                                style={{ backgroundColor: 'var(--color-secondary)' }}
                            />
                            
                            {/* Main Professional Card */}
                            <div 
                                className="relative p-8 rounded-3xl transform hover:scale-105 transition-all duration-500 shadow-2xl"
                                style={{
                                    backgroundColor: 'var(--color-form-bg)',
                                    borderRadius: 'calc(var(--radius) * 2)'
                                }}
                            >
                                {/* Professional Figure Representation */}
                                <div 
                                    className="relative w-72 h-96 rounded-2xl mx-auto overflow-hidden"
                                    style={{
                                        backgroundColor: 'var(--color-secondary)',
                                        borderRadius: 'var(--radius)'
                                    }}
                                >
                                    {/* Silhouette Design */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                    
                                    {/* Professional Elements */}
                                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                                        <div 
                                            className="w-16 h-16 rounded-full"
                                            style={{ backgroundColor: 'var(--color-primary)' }}
                                        />
                                    </div>
                                    
                                    {/* Suit Representation */}
                                    <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
                                        <div 
                                            className="w-24 h-32 rounded-t-full"
                                            style={{ backgroundColor: 'var(--color-brand-navy)' }}
                                        />
                                    </div>
                                    
                                    {/* Legal Briefcase */}
                                    <div className="absolute bottom-8 right-6">
                                        <div 
                                            className="w-12 h-8 rounded"
                                            style={{ backgroundColor: 'var(--color-brand-gold)' }}
                                        />
                                    </div>

                                    {/* Professional Details */}
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="space-y-2">
                                            <div 
                                                className="h-3 rounded w-3/4"
                                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                            />
                                            <div 
                                                className="h-2 rounded w-1/2"
                                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Achievement Cards */}
                                <div 
                                    className="absolute -right-6 top-16 p-4 rounded-lg shadow-xl border animate-float"
                                    style={{
                                        backgroundColor: 'var(--color-body-bg)',
                                        borderColor: 'var(--color-form-border)',
                                        borderRadius: 'var(--radius)'
                                    }}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Award 
                                            className="w-6 h-6"
                                            style={{ color: 'var(--color-brand-gold)' }}
                                        />
                                        <div>
                                            <div 
                                                className="text-xs"
                                                style={{ 
                                                    color: 'var(--color-secondary)',
                                                    fontFamily: 'var(--font-raleway)'
                                                }}
                                            >
                                                Success Rate
                                            </div>
                                            <div 
                                                className="text-lg font-bold"
                                                style={{ 
                                                    color: 'var(--color-heading)',
                                                    fontFamily: 'var(--font-raleway)',
                                                    fontWeight: 'var(--font-weight-bold)'
                                                }}
                                            >
                                                98%
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div 
                                    className="absolute -left-6 bottom-20 p-4 rounded-lg shadow-xl border animate-float-delayed"
                                    style={{
                                        backgroundColor: 'var(--color-body-bg)',
                                        borderColor: 'var(--color-form-border)',
                                        borderRadius: 'var(--radius)'
                                    }}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Scale 
                                            className="w-6 h-6"
                                            style={{ color: 'var(--color-primary)' }}
                                        />
                                        <div>
                                            <div 
                                                className="text-xs"
                                                style={{ 
                                                    color: 'var(--color-secondary)',
                                                    fontFamily: 'var(--font-raleway)'
                                                }}
                                            >
                                                Cases Won
                                            </div>
                                            <div 
                                                className="text-lg font-bold"
                                                style={{ 
                                                    color: 'var(--color-heading)',
                                                    fontFamily: 'var(--font-raleway)',
                                                    fontWeight: 'var(--font-weight-bold)'
                                                }}
                                            >
                                                500+
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <Link
                to={{
                    hash: "#practice-areas",
                }} 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-200"
            >
                <div
                    className="w-6 h-10 border-2 rounded-full flex justify-center"
                    style={{ borderColor: 'var(--color-primary)' }}
                >
                    <div
                        className="w-1 h-3 rounded-full mt-2 animate-pulse"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                    />
                </div>
            </Link>
        </div>
    );
}