import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Film, Clapperboard, Palette, Music, Scissors, Sparkles, Camera, Mic, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmReelBackground from "@/components/FilmReelBackground";

const ScreenX = () => {
    // Film reel data for scrolling rows
    const filmReelRow1 = [
        { icon: Film, title: "Scriptwriting", desc: "AI-powered story generation" },
        { icon: Clapperboard, title: "Storyboarding", desc: "Visual scene planning" },
        { icon: Camera, title: "Shot Selection", desc: "Shot composition AI" },
        { icon: Palette, title: "Color Grading", desc: "Automated color correction" },
        { icon: Scissors, title: "Automated Editing", desc: "Intelligent clip assembly" },
        { icon: Sparkles, title: "Continuity Check", desc: "AI-powered error detection" },
    ];

    const filmReelRow2 = [
        { icon: Music, title: "Sound Design", desc: "Audio enhancement AI" },
        { icon: Mic, title: "Dialogue Cleanup", desc: "AI voice generation" },
        { icon: Film, title: "Location Scouting", desc: "AI-driven location discovery" },
        { icon: Clapperboard, title: "Scene Breakdown", desc: "Smart scene analysis" },
        { icon: Camera, title: "Lighting AI", desc: "Optimal light setup" },
        { icon: Palette, title: "Moodboard AI", desc: "Cinematic filters" },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { scrollY } = useScroll();
    const scrollIndicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);

    return (
        <div className="min-h-screen bg-black">
            <FilmReelBackground />
            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
                }}
            />
            <Navbar />

            {/* ═══════════════════ HERO ═══════════════════ */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">


                {/* Track label */}
                <motion.span
                    className="font-mono text-xs text-primary/60 tracking-[0.5em] uppercase mb-6 z-20 font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    // Track 05
                </motion.span>

                {/* Main title */}
                <motion.h1
                    className="font-copperplate font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-wider z-20 text-center leading-none px-4"
                    style={{
                        color: "#f6f7eb",
                        textShadow:
                            "0 0 10px rgba(255,49,46,0.6), 0 0 40px rgba(255,49,46,0.3), 0 0 80px rgba(208,37,46,0.15)",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    SCREEN<span className="text-primary">X</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    className="font-copperplate text-muted-foreground text-lg md:text-xl max-w-xl text-center mt-6 z-20 px-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    Where AI meets the art of filmmaking
                </motion.p>

                {/* Prize Pool Badge */}
                <motion.div
                    className="border border-primary rounded-tl-3xl rounded-br-3xl px-10 md:px-16 py-6 md:py-10 mt-12 z-20"
                    style={{
                        background: "rgba(0, 0, 0, 0.5)",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="font-copperplate text-sm md:text-lg tracking-wider text-white/60 uppercase mb-2 text-center">
                        Prize Pool
                    </p>
                    <p
                        className="font-copperplate font-bold text-4xl md:text-6xl"
                        style={{
                            color: "#ffffff",
                            textShadow:
                                "0 0 10px rgba(255,49,46,0.6), 0 0 40px rgba(255,49,46,0.3), 0 0 80px rgba(208,37,46,0.15)",
                        }}
                    >
                        ₹10,000
                    </p>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 z-20 flex flex-col items-center gap-2 text-muted-foreground/50"
                    style={{ opacity: scrollIndicatorOpacity }}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
                    <ChevronDown size={16} />
                </motion.div>
            </section>

            {/* ═══════════════════ FILM REEL CAROUSELS ═══════════════════ */}
            <section className="relative py-12 md:py-20 overflow-hidden">
                {/* Section heading */}
                <div className="container px-6 mx-auto mb-12">
                    <h2 className="font-copperplate text-2xl md:text-4xl text-foreground tracking-wider text-center">
                        The Production Pipeline
                    </h2>
                    <div className="w-24 h-[2px] bg-primary mx-auto mt-4" />
                </div>

                <div className="space-y-2">
                    {/* Film Strip Row 1 */}
                    <div className="film-strip">
                        <motion.div
                            className="flex gap-0"
                            animate={{ x: [0, -1500] }}
                            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                        >
                            {[...filmReelRow1, ...filmReelRow1, ...filmReelRow1, ...filmReelRow1].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="flex-shrink-0 w-44 md:w-60 border-l border-r border-primary/10 bg-black px-3 md:px-5 py-4 md:py-6 hover:bg-primary/5 transition-colors group"
                                    >
                                        <div className="flex items-center gap-2 md:gap-3 mb-2">
                                            <Icon className="text-primary group-hover:text-[#ff312e] transition-colors" size={18} />
                                            <h3 className="font-copperplate text-xs md:text-sm tracking-wider text-foreground uppercase">{item.title}</h3>
                                        </div>
                                        <p className="text-[10px] md:text-xs text-muted-foreground font-body">{item.desc}</p>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Film Strip Row 2 */}
                    <div className="film-strip">
                        <motion.div
                            className="flex gap-0"
                            animate={{ x: [-1500, 0] }}
                            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                        >
                            {[...filmReelRow2, ...filmReelRow2, ...filmReelRow2, ...filmReelRow2].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="flex-shrink-0 w-44 md:w-60 border-l border-r border-primary/10 bg-black px-3 md:px-5 py-4 md:py-6 hover:bg-primary/5 transition-colors group"
                                    >
                                        <div className="flex items-center gap-2 md:gap-3 mb-2">
                                            <Icon className="text-primary group-hover:text-[#ff312e] transition-colors" size={18} />
                                            <h3 className="font-copperplate text-xs md:text-sm tracking-wider text-foreground uppercase">{item.title}</h3>
                                        </div>
                                        <p className="text-[10px] md:text-xs text-muted-foreground font-body">{item.desc}</p>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ CONTENT SECTIONS ═══════════════════ */}
            <main className="pb-16 md:pb-24">
                <div className="container px-4 md:px-6 mx-auto">
                    {/* Back button */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12"
                    >
                        <ArrowLeft size={18} />
                        <span className="font-mono text-sm">Back to Home</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Left column — film-strip styled content */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Overview */}
                            <motion.section
                                className="relative bg-black border border-primary/20 p-8 md:p-10"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Red accent bar */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                <h2 className="font-copperplate text-2xl md:text-3xl text-foreground tracking-wider mb-5">
                                    Overview
                                </h2>
                                <p className="font-body text-muted-foreground leading-relaxed text-base">
                                    ScreenX is the Film & Creator Technology track of HackS'US Edition V, built for innovators passionate about the future of filmmaking, digital storytelling, and creator ecosystems.
                                    <br />
                                    <br />
                                    Participants will work on real-world challenges at the intersection of film, media technology, and artificial intelligence designing solutions that enhance production workflows, post production pipelines, content automation and next generation creator tools.
                                    <br />
                                    <br />
                                    From AI powered editing systems to smarter VFX workflows and immersive storytelling platforms, ScreenX empowers teams to build technology that transforms how stories are created and experienced.
                                </p>
                            </motion.section>

                            {/* Requirements */}
                            <motion.section
                                className="relative bg-black border border-primary/20 p-8 md:p-10"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                <h2 className="font-copperplate text-2xl md:text-3xl text-foreground tracking-wider mb-5">
                                    Requirements
                                </h2>
                                <ul className="space-y-4 text-muted-foreground font-body">
                                    {[
                                        "Film production tool or platform with AI integration",
                                        "Demo or proof of concept",
                                        "Sample output or case study",
                                        "Documentation of creative improvements",
                                    ].map((req, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <motion.div
                                className="relative bg-black border border-primary/20 p-8 sticky top-24"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary" />
                                <h3 className="font-copperplate text-xl text-foreground tracking-wider mb-6">
                                    Track Details
                                </h3>
                                <div className="space-y-5 text-sm font-body">
                                    {[
                                        { label: "Prize Pool", value: "₹10K" },
                                        { label: "Team Size", value: "4–6 members" },
                                        { label: "Duration", value: "42 hours" },
                                    ].map((detail, i) => (
                                        <div key={i} className="flex justify-between items-baseline border-b border-primary/10 pb-3">
                                            <span className="text-primary font-copperplate text-xs tracking-wider uppercase">{detail.label}</span>
                                            <span className="text-foreground">{detail.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <a
                                    href="https://konfhub.com/hacksus-edition-5"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full mt-8 bg-primary text-black font-copperplate tracking-widest text-center py-3 px-6 hover:bg-[#ff312e]/90 transition-colors uppercase text-sm"
                                >
                                    Register Team
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ScreenX;
