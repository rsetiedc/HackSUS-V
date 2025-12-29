const sponsors = {
  platinum: [
    { name: "TechCorp", initial: "TC" },
    { name: "InnovateLabs", initial: "IL" },
  ],
  gold: [
    { name: "DataFlow", initial: "DF" },
    { name: "CloudNine", initial: "CN" },
    { name: "ByteWorks", initial: "BW" },
  ],
  silver: [
    { name: "CodeBase", initial: "CB" },
    { name: "DevHub", initial: "DH" },
    { name: "StackUp", initial: "SU" },
    { name: "GitForge", initial: "GF" },
  ],
};

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="relative py-24 md:py-32">
      {/* Background glow */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-charcoal to-transparent" />

      <div className="container px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary tracking-[0.3em]">// BACKED BY THE BEST</span>
          <h2 className="font-display text-5xl md:text-6xl text-foreground mt-4">
            OUR <span className="text-primary">SPONSORS</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            The companies making HackS'US Edition V possible
          </p>
        </div>

        {/* Platinum tier */}
        <div className="mb-12">
          <div className="font-mono text-xs text-center text-muted-foreground tracking-widest mb-6">
            PLATINUM PARTNERS
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {sponsors.platinum.map((sponsor, i) => (
              <div
                key={i}
                className="group w-48 h-24 bg-card border border-border flex items-center justify-center hover:border-primary hover:shadow-[0_0_30px_hsl(var(--electric-red)/0.3)] transition-all duration-300 scanlines"
              >
                <span className="font-display text-3xl text-muted-foreground group-hover:text-primary transition-colors">
                  {sponsor.initial}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gold tier */}
        <div className="mb-12">
          <div className="font-mono text-xs text-center text-muted-foreground tracking-widest mb-6">
            GOLD PARTNERS
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {sponsors.gold.map((sponsor, i) => (
              <div
                key={i}
                className="group w-40 h-20 bg-card border border-border flex items-center justify-center hover:border-primary/70 hover:shadow-[0_0_20px_hsl(var(--electric-red)/0.2)] transition-all duration-300"
              >
                <span className="font-display text-2xl text-muted-foreground group-hover:text-primary transition-colors">
                  {sponsor.initial}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Silver tier */}
        <div>
          <div className="font-mono text-xs text-center text-muted-foreground tracking-widest mb-6">
            SILVER PARTNERS
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {sponsors.silver.map((sponsor, i) => (
              <div
                key={i}
                className="group w-32 h-16 bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-all duration-300"
              >
                <span className="font-display text-xl text-muted-foreground group-hover:text-primary transition-colors">
                  {sponsor.initial}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Become a sponsor CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Interested in sponsoring Edition V?</p>
          <a
            href="mailto:sponsors@hacksus.dev"
            className="font-mono text-primary hover:underline"
          >
            sponsors@hacksus.dev
          </a>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
