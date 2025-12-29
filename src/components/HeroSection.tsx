import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/50 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/30" />

      <div className="container relative z-10 px-6 text-center">
        {/* Edition tag */}
        <div className="inline-block mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="font-mono text-sm text-primary tracking-[0.3em] border border-primary/50 px-4 py-1">
            EDITION V
          </span>
        </div>

        {/* Main title with glitch effect */}
        <h1
          className="glitch font-display text-7xl md:text-9xl lg:text-[12rem] text-foreground leading-none tracking-wider mb-4 animate-fade-in"
          data-text="HACK S'US"
          style={{ animationDelay: "0.4s" }}
        >
          HACK<span className="text-primary">S'US</span>
        </h1>

        {/* Tagline */}
        <p
          className="font-body text-xl md:text-2xl text-muted-foreground mb-2 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          Where Code Meets Chaos
        </p>

        {/* Date */}
        <p
          className="font-mono text-lg text-primary mb-12 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          MARCH 15-17, 2025
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in" style={{ animationDelay: "1s" }}>
          <Button variant="hero" size="xl">
            <span className="relative z-10">CLAIM YOUR SPOT</span>
          </Button>
        </div>

        {/* Stats preview */}
        <div
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in"
          style={{ animationDelay: "1.2s" }}
        >
          {[
            { value: "36", label: "HOURS" },
            { value: "500+", label: "HACKERS" },
            { value: "$50K", label: "IN PRIZES" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl md:text-5xl text-primary">{stat.value}</div>
              <div className="font-mono text-xs text-muted-foreground tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll to content"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
};

export default HeroSection;
