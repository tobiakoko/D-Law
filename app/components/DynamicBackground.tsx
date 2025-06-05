import { useState, useEffect } from 'react';

export default function DynamicBackground() {
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
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
      
    return (
        <div className="fixed inset-0 z-0">
            <div 
            className="absolute inset-0 opacity-30"
            style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`
            }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background via-[var(color-brand-gray)] to-background" />
            <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
                <div
                key={i}
                className="absolute w-1 h-1 bg-[var(brand-gold)] rounded-full opacity-20 animate-pulse"
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
    );
}