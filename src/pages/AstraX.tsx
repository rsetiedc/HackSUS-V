import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Instagram, Linkedin, Facebook, Twitter, Zap, Brain, Cpu, Sparkles, Code, Database, Network, Menu } from "lucide-react";

import LogoLoop from "@/components/LogoLoop";
import ResponsiveParticles from "@/components/ResponsiveParticles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useParticleTuning } from "@/hooks/useParticlesQuality";
import GraphNetwork from "@/components/GraphNetwork";


// ==================== NEURAL NETWORK BACKGROUND (OPTIMIZED) ====================
function NeuralNetwork() {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Reduced node count for performance
    const nodeCount = 30; // Reduced from 50
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
    }));

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', setCanvasSize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodesRef.current.forEach((node, i) => {
        // Mouse interaction
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          node.x -= dx * 0.01;
          node.y -= dy * 0.01;
        }

        // Auto movement
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 49, 46, 0.6)';
        ctx.fill();

        // Draw connections
        nodesRef.current.slice(i + 1).forEach((otherNode) => {
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            const opacity = (1 - distance / 120) * 0.3;
            ctx.strokeStyle = `rgba(255, 49, 46, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasSize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}

// ==================== ACTIVE SECTION TRACKING ====================
function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const items = sectionIds
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((x) => Boolean(x.el));
    if (items.length === 0) return;

    let rafId = 0;
    const getNavOffset = () => {
      const header = document.querySelector(".astrax-header");
      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      return headerHeight + 12;
    };

    const compute = () => {
      const focusY = getNavOffset() + window.innerHeight * 0.36;
      let bestId = items[0]?.id ?? "";
      let bestDist = Number.POSITIVE_INFINITY;

      for (const it of items) {
        const rect = it.el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - focusY);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = it.id;
        }
      }

      setActive((prev) => (prev === bestId ? prev : bestId));
    };

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        compute();
      });
    };

    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [sectionIds]);

  return active;
}

// ==================== HOLOGRAPHIC CARD (OPTIMIZED) ====================
function HolographicCard({ className, children, delay = 0, colorTheme = "red" }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  }, []);

  const gradientColors = {
    red: "rgba(255, 49, 46, 0.15), rgba(239, 68, 68, 0.1), rgba(251, 146, 60, 0.08)",
    blue: "rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.08)",
    mixed: "rgba(255, 49, 46, 0.12), rgba(59, 130, 246, 0.12), rgba(251, 146, 60, 0.08)",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-2xl border transition-all duration-500",
        isHovered 
          ? "border-primary/40 bg-black/60 shadow-[0_0_60px_rgba(255,49,46,0.15)]" 
          : "border-white/10 bg-black/40",
        className
      )}
    >
      {/* Holographic shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${gradientColors[colorTheme]}, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Content - reduced blur for performance */}
      <div className="relative backdrop-blur-md rounded-2xl p-1">
        <div className="relative z-10 p-8">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// ==================== SECTION HEADING WITH PARTICLE BURST ====================
function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-16 md:mb-20 text-center relative"
    >
      {/* Decorative particles - simplified */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-32 h-32 bg-gradient-radial from-primary/20 via-blue-500/10 to-transparent rounded-full blur-xl opacity-60" />

      <span className="inline-block font-mono text-sm text-primary tracking-[0.4em] uppercase mb-6 relative">
        <span className="relative z-10">// {eyebrow}</span>
      </span>

      <h2 className="font-display text-5xl md:text-7xl text-foreground tracking-wide mb-6 leading-tight">
        {title}
      </h2>

      {description && (
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}

// ==================== NAVBAR WITH LIQUID INDICATOR ====================
function AstraXNavbar({ activeId, items, onNavigate }) {
  const linksWrapRef = useRef(null);
  const linkRefs = useRef({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const syncIndicator = useCallback(() => {
    const wrap = linksWrapRef.current;
    const activeEl = linkRefs.current[activeId];
    if (!wrap || !activeEl) return;

    const wrapRect = wrap.getBoundingClientRect();
    const linkRect = activeEl.getBoundingClientRect();
    setIndicator({
      left: linkRect.left - wrapRect.left,
      width: linkRect.width,
      opacity: 1,
    });
  }, [activeId]);

  useLayoutEffect(() => {
    syncIndicator();
  }, [syncIndicator, items]);

  useEffect(() => {
    const wrap = linksWrapRef.current;
    if (!wrap) return;

    const onResize = () => syncIndicator();
    window.addEventListener("resize", onResize, { passive: true });

    const ro = new ResizeObserver(() => syncIndicator());
    ro.observe(wrap);
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [syncIndicator]);

  const navigateFromSheet = useCallback(
    (id) => {
      setMobileOpen(false);
      window.setTimeout(() => onNavigate(id), 180);
    },
    [onNavigate]
  );

  return (
    <header className="astrax-header fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/5">
      <div className="container max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Hacks'us Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-foreground/90 hover:text-foreground transition-colors"
          >
            <img 
              src="/images/hacksus_logo.webp" 
              alt="Hacks'us" 
              className="h-10 w-10 md:h-11 md:w-11 object-contain"
            />
          </motion.a>

          {/* Separator */}
          <div className="h-8 w-px bg-white/10" />

          {/* ASTRAX Logo */}
          <motion.a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("top");
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 text-foreground/90 hover:text-foreground transition-colors"
          >
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-red-500 to-orange-500" />
              <div className="absolute inset-0.5 rounded-full bg-black flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
            </div>
            <span className="font-display tracking-[0.25em] text-base font-semibold">ASTRAX</span>
          </motion.a>
        </div>

        <div ref={linksWrapRef} className="hidden md:flex items-center gap-10 relative">
          {/* Liquid morphing indicator */}
          <motion.div
            className="absolute -bottom-3 h-1 rounded-full origin-left"
            style={{
              background: "linear-gradient(90deg, rgba(255,49,46,0.8), rgba(59,130,246,0.6), rgba(251,146,60,0.8))",
              boxShadow: "0 0 20px rgba(255,49,46,0.4), 0 0 40px rgba(59,130,246,0.2)",
            }}
            animate={{
              x: indicator.left,
              scaleX: indicator.width / 100,
              opacity: indicator.opacity,
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 30, 
              mass: 0.5,
            }}
          />
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              ref={(el) => {
                linkRefs.current[it.id] = el;
              }}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(it.id);
              }}
              className={cn(
                "relative text-sm tracking-[0.3em] uppercase transition-all duration-300 font-medium",
                activeId === it.id 
                  ? "text-primary scale-105" 
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              )}
            >
              {it.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => window.open("https://konfhub.com/checkout/hacksus-edition-5?ticketId=74891", "_blank")}
              className="hidden md:inline-flex h-10 px-6 bg-primary hover:bg-primary/90 text-white font-display text-sm tracking-wider transition-all duration-300 shadow-[0_10px_30px_rgba(255,49,46,0.2)] hover:shadow-[0_14px_42px_rgba(255,49,46,0.3)]"
            >
              REGISTER NOW
            </Button>
          </motion.div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="md:hidden h-10 w-10 rounded-xl border-white/10 bg-white/5 text-foreground/90 hover:bg-white/10 backdrop-blur-xl"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-black/95 border-white/10 backdrop-blur-xl px-6"
            >
              <div className="mt-10 flex flex-col gap-8">
                <div className="font-display tracking-[0.3em] text-lg text-foreground/90">
                  ASTRAX
                </div>

                <nav className="flex flex-col gap-3">
                  {items.map((it) => (
                    <motion.button
                      key={it.id}
                      type="button"
                      onClick={() => navigateFromSheet(it.id)}
                      whileHover={{ x: 4 }}
                      className={cn(
                        "group flex items-center justify-between rounded-xl px-4 py-4 text-left transition-all duration-300",
                        activeId === it.id
                          ? "bg-gradient-to-r from-primary/20 to-transparent text-foreground border border-primary/30"
                          : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground border border-transparent"
                      )}
                    >
                      <span className="font-mono text-sm tracking-[0.35em] uppercase font-medium">
                        {it.label}
                      </span>
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          activeId === it.id ? "bg-primary" : "bg-primary/50"
                        )}
                      />
                    </motion.button>
                  ))}
                </nav>

                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    window.open("https://konfhub.com/checkout/hacksus-edition-5?ticketId=74891", "_blank");
                  }}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-display text-sm tracking-wider shadow-[0_10px_30px_rgba(255,49,46,0.2)]"
                >
                  REGISTER NOW
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// ==================== MAIN COMPONENT ====================
const AstraX = () => {
  const sectionIds = useMemo(() => ["about", "contacts"], []);
  const activeId = useActiveSection(sectionIds);

  // Logo animation state - bouncy slide-in effect
  const [logoStep, setLogoStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const letters = ["A", "S", "T", "R", "A", "X"];
  const [showYear, setShowYear] = useState(false);

  // Particle configuration
  const particleColors = useMemo(() => ["#ffffff"], []);
  const particleTuning = useParticleTuning();

  // Partner logos - WEBP FORMAT
  const partnerLogos = useMemo(
    () => [
      { node: <img src="/images/rset_iedc.PNG" alt="IEDC" className="h-16 w-auto object-contain opacity-90" />, ariaLabel: "IEDC" },
      { node: <img src="/images/rset_iic.PNG" alt="IIC" className="h-16 w-auto object-contain opacity-90" />, ariaLabel: "IIC" },
      { node: <img src="/images/articon_logo.png" alt="Articon" className="h-16 w-auto object-contain opacity-90" />, ariaLabel: "Articon" },
      { node: <img src="/images/rset_jubilee.png" alt="RSET Jubilee" className="h-16 w-auto object-contain opacity-90" />, ariaLabel: "RSET Jubilee" },
    ],
    []
  );

  // Logo animation with bouncy slide-in and looping
  useEffect(() => {
    if (logoStep < letters.length) {
      const timer = setTimeout(() => {
        setLogoStep((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else if (logoStep === letters.length) {
      const timer = setTimeout(() => {
        setShowYear(true);
      }, 200);
      return () => clearTimeout(timer);
    } else if (showYear) {
      const timer = setTimeout(() => {
        setLogoStep(0);
        setShowYear(false);
        setAnimationKey(prev => prev + 1);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [logoStep, letters.length, showYear, animationKey]);

  const getNavOffset = useCallback(() => {
    const header = document.querySelector(".astrax-header");
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    return Math.max(0, Math.round(headerHeight + 8));
  }, []);

  const scrollToSection = useCallback(
    (id) => {
      window.requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const computed = window.getComputedStyle(el);
        const paddingTop = Number.parseFloat(computed.paddingTop || "0") || 0;
        const top = el.getBoundingClientRect().top + window.scrollY - getNavOffset() + paddingTop;
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    },
    [getNavOffset]
  );

  useEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      window.history.scrollRestoration = prev;
    };
  }, []);

  return (
    <div id="top" className="relative min-h-screen bg-black text-foreground overflow-x-hidden">
      {/* ==================== LAYERED BACKGROUND (OPTIMIZED) ==================== */}
      <div className="fixed inset-0 -z-0 overflow-hidden">
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />

        {/* Subtle gradient orbs - STATIC for performance */}
        <div 
          className="absolute top-0 -left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-8"
          style={{
            background: "radial-gradient(circle, rgba(255,49,46,0.3) 0%, transparent 70%)",
          }}
        />

        <div 
          className="absolute bottom-0 -right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
          }}
        />

        <GraphNetwork 
          gridSpacing={50}
          mouseRadius={300}
          strength={0.8}
        />
      </div>

      {/* ==================== NAVBAR ==================== */}
      <AstraXNavbar
        activeId={activeId}
        items={[
          { id: "about", label: "ABOUT" },
          { id: "contacts", label: "CONTACTS" },
        ]}
        onNavigate={scrollToSection}
      />

      {/* ==================== HERO ==================== */}
      <section className="relative pt-32 pb-16 text-center">
        <div className="container max-w-[1200px] px-6 mx-auto">
          {/* Department label */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-mono text-sm tracking-[0.45em] text-muted-foreground uppercase mb-4"
          >
            Department of Artificial Intelligence & Data Science, RSET
          </motion.p>

          {/* Organizers - BIGGER, CYAN COLOR, MORE VISIBLE */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center gap-5 mb-20 relative"
          >
            <div className="absolute inset-0 blur-3xl opacity-50 bg-[radial-gradient(circle,rgba(34,211,238,0.3)_0%,transparent_50%)]" />
            <span className="relative font-display text-2xl md:text-3xl tracking-[0.25em] text-cyan-400 font-bold drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">ARTICON</span>
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
            <span className="relative font-display text-2xl md:text-3xl tracking-[0.25em] text-cyan-400 font-bold drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">IEDC</span>
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
            <span className="relative font-display text-2xl md:text-3xl tracking-[0.25em] text-cyan-400 font-bold drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">IIC</span>
          </motion.div>

          {/* Logo Animation - Bouncy slide-in with RED theme */}
          <div className="h-[240px] flex items-center justify-center relative mb-16" key={animationKey}>
            {/* Glowing background - static for performance */}
            <div
              className="absolute inset-0 blur-[80px] -z-10 opacity-40"
              style={{
                background: "radial-gradient(circle, rgba(255,49,46,0.4) 0%, transparent 70%)",
              }}
            />

            {logoStep < letters.length ? (
              <div className="flex items-center">
                {letters.slice(0, logoStep + 1).map((letter, index) => (
                  <motion.div
                    key={`${animationKey}-${index}`}
                    initial={{ x: 200, opacity: 0, scale: 0.5 }}
                    animate={{ 
                      x: 0, 
                      opacity: 1,
                      scale: [0.5, 1.15, 0.97, 1],
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 18,
                      mass: 0.7,
                      delay: index * 0.12,
                    }}
                    className="font-mokoto text-6xl md:text-9xl font-bold text-primary drop-shadow-[0_0_40px_rgba(255,49,46,0.6)]"
                  >
                    {letter}
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex items-baseline gap-5"
              >
                <motion.h1
                  className="font-mokoto text-6xl md:text-9xl text-primary"
                  style={{
                    filter: "drop-shadow(0 0 60px rgba(255,49,46,0.5))",
                  }}
                >
                  ASTRAX
                </motion.h1>

                {showYear && (
                  <motion.span
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                    className="font-display text-6xl md:text-7xl text-primary/60 font-light"
                  >
                    2026
                  </motion.span>
                )}
              </motion.div>
            )}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-3xl md:text-4xl text-muted-foreground font-light tracking-wide mb-10"
          >
            Designing Software That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Thinks</span>.
          </motion.p>

          {/* Prize Pool */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1, type: "spring", stiffness: 200 }}
            className="relative inline-block mb-16"
          >
            {/* Glow backdrop */}
            <motion.div
              className="absolute inset-0 rounded-2xl blur-2xl -z-10"
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "linear-gradient(135deg, rgba(255,49,46,0.3), rgba(59,130,246,0.3))",
              }}
            />

            <div className="relative px-14 md:px-20 py-8 md:py-10 rounded-3xl border border-primary/30 bg-black/60 backdrop-blur-xl overflow-hidden">
              {/* Animated gradient border overlay */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-30"
                animate={{
                  background: [
                    "linear-gradient(0deg, rgba(255,49,46,0.2) 0%, transparent 50%, rgba(59,130,246,0.2) 100%)",
                    "linear-gradient(180deg, rgba(255,49,46,0.2) 0%, transparent 50%, rgba(59,130,246,0.2) 100%)",
                    "linear-gradient(0deg, rgba(255,49,46,0.2) 0%, transparent 50%, rgba(59,130,246,0.2) 100%)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Neural dots decoration */}
              <div className="absolute top-3 left-4 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/50" />
                <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                <div className="w-2 h-2 rounded-full bg-orange-500/50" />
              </div>

              <p className="font-mono text-sm md:text-base tracking-[0.4em] text-muted-foreground uppercase mb-3 relative">
                Total Prize Pool
              </p>

              <motion.p
                className="font-display text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-blue-500 relative"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255,49,46,0.5), 0 0 40px rgba(59,130,246,0.3)",
                    "0 0 30px rgba(255,49,46,0.7), 0 0 60px rgba(59,130,246,0.5)",
                    "0 0 20px rgba(255,49,46,0.5), 0 0 40px rgba(59,130,246,0.3)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ₹50,000
              </motion.p>
            </div>
          </motion.div>

          {/* Quick Stats with holographic cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <HolographicCard className="max-w-5xl mx-auto" colorTheme="mixed">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {[
                  { icon: Zap, label: "Duration", value: "42 Hours", gradient: "from-primary to-red-500" },
                  { icon: Brain, label: "Expected", value: "200+ Participants", gradient: "from-blue-500 to-purple-500" },
                  { icon: Cpu, label: "Team Size", value: "4-6 Members", gradient: "from-orange-500 to-pink-500" },
                  { icon: Code, label: "Track", value: "Software", gradient: "from-green-500 to-emerald-500" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-block mb-4"
                    >
                      <div className={cn(
                        "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center",
                        stat.gradient,
                        "shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                      )}>
                        <stat.icon className="w-7 h-7 text-white" />
                      </div>
                    </motion.div>

                    <div className="font-mono text-xs tracking-[0.4em] text-muted-foreground uppercase mb-3">
                      {stat.label}
                    </div>

                    <div className="font-display text-2xl md:text-3xl text-foreground font-semibold">
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </section>

      {/* ==================== ABOUT (IMPROVED WRITEUP) ==================== */}
      <section id="about" className="relative py-16 md:py-20 scroll-mt-24">
        <div className="container max-w-[1200px] px-6 mx-auto">
          <SectionHeading
            eyebrow="ABOUT"
            title={
              <>
                What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-orange-500">AstraX – Software</span>?
              </>
            }
            description="A hackathon by Articon × IEDC, focused on building intelligent systems that learn, optimize, and redefine efficiency."
          />

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {/* Main description - IMPROVED WRITEUP */}
            <HolographicCard delay={0} colorTheme="red">
              <div className="flex items-start gap-5 mb-6">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-red-500/10 border border-primary/20"
                >
                  <Brain className="w-8 h-8 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-display text-3xl mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Intelligence First
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    A collaboration between Articon, IEDC & IIC
                  </p>
                </div>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                <span className="text-cyan-400 font-semibold">AstraX – Software</span> is a 42-hour AI-first hackathon 
                proudly presented by <span className="text-primary font-semibold">Articon</span>, the flagship technical 
                organization of the Department of Artificial Intelligence & Data Science at RSET.
              </p>
              
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Built on the foundation of innovation and collaboration, AstraX brings together students, developers, 
                and AI enthusiasts to build <span className="text-foreground font-medium">intelligent systems</span>, 
                <span className="text-foreground font-medium"> scalable platforms</span>, 
                <span className="text-foreground font-medium"> automation frameworks</span>, and 
                <span className="text-foreground font-medium"> next-generation AI-powered software products</span>.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed">
                Think systems that <span className="text-cyan-400">learn</span>. 
                Think tools that <span className="text-cyan-400">optimize</span>. 
                Think applications that <span className="text-cyan-400">redefine efficiency</span>.
              </p>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm font-mono text-primary tracking-wider">ARTICON</span>
                  </div>
                  <span className="text-muted-foreground">×</span>
                  <div className="px-3 py-1.5 rounded-lg bg-cyan-400/10 border border-cyan-400/20">
                    <span className="text-sm font-mono text-cyan-400 tracking-wider">IEDC</span>
                  </div>
                </div>
              </div>
            </HolographicCard>

            {/* Focus areas */}
            <HolographicCard delay={0.1} colorTheme="blue">
              <h3 className="font-display text-2xl mb-6 text-foreground">Technical Focus</h3>
              
              <div className="space-y-4">
                {[
                  { icon: Cpu, text: "Intelligent Systems & AI/ML", color: "from-primary to-red-500" },
                  { icon: Network, text: "Scalable Platforms", color: "from-blue-500 to-cyan-500" },
                  { icon: Zap, text: "Automation Frameworks", color: "from-orange-500 to-yellow-500" },
                  { icon: Code, text: "Next-Gen Software Products", color: "from-purple-500 to-pink-500" },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 1, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                      item.color
                    )}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-muted-foreground/80">
                  Organized by Articon in collaboration with IEDC & IIC
                </p>
              </div>
            </HolographicCard>
          </div>

          {/* Key highlights with animated badges */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <HolographicCard delay={0.2} colorTheme="mixed">
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { text: "AI/ML Engineering", color: "from-orange-500 to-pink-500" },
                  { text: "Deep Learning", color: "from-orange-500 to-pink-500" },
                  { text: "Natural Language Processing", color: "from-orange-500 to-pink-500"},
                  { text: "Computer Vision", color: "from-orange-500 to-pink-500" },
                  { text: "Intelligent Automation", color: "from-orange-500 to-pink-500" },
                  { text: "Predictive Analytics", color: "from-orange-500 to-pink-500" },
                  { text: "Neural Networks", color: "from-orange-500 to-pink-500" },
                  { text: "LLM Applications", color: "from-orange-500 to-pink-500" },
                ].map((tag, index) => (
                  <motion.div
                    key={tag.text}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <Badge
                      variant="outline"
                      className={cn(
                        "px-4 py-2 text-sm font-medium border-none cursor-pointer transition-all duration-300",
                        `bg-gradient-to-r ${tag.color} text-white shadow-lg hover:shadow-2xl`
                      )}
                    >
                      {tag.text}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </section>

      {/* ==================== PRIZES (KEPT COMMENTED) ==================== */}
      {/*
      <section id="prizes" className="relative py-28 md:py-36 scroll-mt-24">
        <div className="container max-w-[1200px] px-6 mx-auto">
          <SectionHeading
            eyebrow="PRIZES"
            title={
              <>
                Win <span className="text-primary">Big</span>. Build <span className="text-blue-500">Smart</span>.
              </>
            }
            description="Cash prizes, certificates, and recognition for the best AI-powered solutions."
          />

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                place: "1st",
                emoji: "🥇",
                prize: "₹25,000",
                gradient: "from-yellow-400 via-yellow-500 to-orange-500",
                glow: "rgba(251, 191, 36, 0.4)"
              },
              {
                place: "2nd",
                emoji: "🥈",
                prize: "₹15,000",
                gradient: "from-gray-300 via-gray-400 to-gray-500",
                glow: "rgba(156, 163, 175, 0.4)"
              },
              {
                place: "3rd",
                emoji: "🥉",
                prize: "₹10,000",
                gradient: "from-orange-400 via-orange-500 to-orange-600",
                glow: "rgba(251, 146, 60, 0.4)"
              },
            ].map((tier, index) => (
              <HolographicCard key={tier.place} delay={index * 0.1} colorTheme={index === 0 ? "red" : index === 1 ? "blue" : "mixed"}>
                <div className="text-center py-4">
                  <motion.div
                    className="text-7xl mb-6"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    {tier.emoji}
                  </motion.div>

                  <div className="font-display text-3xl mb-4 text-foreground">{tier.place} Place</div>

                  <motion.div
                    className={cn(
                      "font-display text-4xl md:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2",
                      tier.gradient
                    )}
                    style={{
                      filter: `drop-shadow(0 0 20px ${tier.glow})`,
                    }}
                  >
                    {tier.prize}
                  </motion.div>

                  <div className="text-base text-muted-foreground">+ Certificate</div>
                </div>
              </HolographicCard>
            ))}
          </div>

          {/* What participants get }
          <HolographicCard colorTheme="mixed" delay={0.3}>
            <h3 className="font-display text-3xl mb-10 text-center text-foreground">What You'll Receive</h3>

            <div className="grid md:grid-cols-3 gap-10 text-center">
              {[
                {
                  icon: Sparkles,
                  text: "Goodies & Swag",
                  desc: "Exclusive AstraX merchandise",
                  gradient: "from-pink-500 to-rose-500"
                },
                {
                  icon: Database,
                  text: "Participation Certificate",
                  desc: "Official recognition",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Zap,
                  text: "Cash Prizes",
                  desc: "For top performers",
                  gradient: "from-orange-500 to-red-500"
                },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <motion.div
                    className={cn(
                      "inline-flex p-5 rounded-3xl bg-gradient-to-br mb-6 shadow-xl",
                      item.gradient,
                      "group-hover:shadow-2xl transition-shadow duration-300"
                    )}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <div className="font-display text-xl mb-3 text-foreground">
                    {item.text}
                  </div>

                  <div className="text-base text-muted-foreground">
                    {item.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </HolographicCard>
        </div>
      </section>
      */}

      {/* ==================== CONTACTS ==================== */}
      <section id="contacts" className="relative py-16 md:py-20 scroll-mt-24">
        <div className="container max-w-[1200px] px-6 mx-auto">
          <SectionHeading
            eyebrow="CONTACTS"
            title={
              <>
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Touch</span>
              </>
            }
            description="Have questions? Reach out to our core team for support and guidance."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Shone Kuncheria",
                role: "Event Coordinator",
                email: "shone.kuncheria@gmail.com",
                phone: "+91 94973 03875",
                phoneLink: "+919497303875",
                colorTheme: "red",
              },
              {
                name: "Giribala Arun",
                role: "Event Coordinator",
                email: "u2203099@rajagiri.edu.in",
                phone: "+91 89216 24767",
                phoneLink: "+918921624767",
                colorTheme: "blue",
              },
              {
                name: "Shwetha Prabhakaran",
                role: "General Support",
                email: "U2301197@rajagiri.edu.in",
                phone: "+91 90747 80066",
                phoneLink: "+919074780066",
                colorTheme: "mixed",
              },
            ].map((contact, index) => (
              <HolographicCard key={contact.name} delay={index * 0.1} colorTheme={contact.colorTheme}>
                <div className="font-mono text-xs tracking-[0.4em] text-primary/80 uppercase mb-4">
                  {contact.role}
                </div>

                <div className="font-display text-3xl mb-8 text-foreground">
                  {contact.name}
                </div>
                
                <div className="space-y-4">
                  <motion.a
                    href={`mailto:${contact.email}`}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="block p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all group"
                  >
                    <div className="text-xs text-muted-foreground mb-2">Email</div>
                    <div className="text-sm text-foreground/90 group-hover:text-primary transition-colors break-all">
                      {contact.email}
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href={`tel:${contact.phoneLink}`}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="block p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all group"
                  >
                    <div className="text-xs text-muted-foreground mb-2">Phone</div>
                    <div className="text-sm text-foreground/90 group-hover:text-primary transition-colors">
                      {contact.phone}
                    </div>
                  </motion.a>
                </div>
              </HolographicCard>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PARTNERS ==================== */}
      <section className="relative py-28 border-t border-white/5">
        <div className="container max-w-[1200px] px-6 mx-auto">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <HolographicCard colorTheme="mixed">
              <p className="mb-10 font-mono text-sm tracking-[0.4em] text-primary/80 uppercase text-center">
                Presented Partners
              </p>

              <LogoLoop
                logos={partnerLogos}
                speed={52}
                gap={24}
                pauseOnHover={false}
                fadeOut={false}
                className="mb-10"
              />

              <div className="text-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base shadow-[0_10px_30px_rgba(255,49,46,0.3)] hover:shadow-[0_14px_42px_rgba(255,49,46,0.4)]"
                  >
                    <ArrowUp className="w-5 h-5 mr-2" />
                    Back To Top
                  </Button>
                </motion.div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </section>

      {/* ==================== SOCIAL FLOAT - UPDATED THEME MATCHING STYLES ==================== */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 right-8 flex flex-col gap-3 z-50"
      >
        {[
          { icon: Instagram, href: "https://www.instagram.com/rsetiedc/", label: "Instagram" },
          { icon: Linkedin, href: "https://www.linkedin.com/company/rset-iedc/?originalSubdomain=in", label: "LinkedIn" },
          { icon: Facebook, href: "https://www.facebook.com/iedc.rset/", label: "Facebook" },
          { icon: Twitter, href: "https://x.com/rset_iedc", label: "Twitter/X" },
        ].map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl bg-black/40 backdrop-blur-xl border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all shadow-lg hover:shadow-primary/20"
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5 text-primary" />
          </motion.a>
        ))}
      </motion.div>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative py-16 border-t border-white/5">
        <div className="container max-w-[1200px] px-6 mx-auto text-center">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-base text-muted-foreground mb-6">
              Organized by Articon × IEDC
            </p>
            <p className="text-sm text-muted-foreground/60">
              © ASTRAX 2026 • Articon × IEDC × IIC
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default AstraX;