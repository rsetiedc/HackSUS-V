import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Info, Download, Music, Zap, Layers, Trophy, Users, Clock, Volume2 } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RevolvingHeader = () => {
    return (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
            <div className="relative">
                {/* Spotify-style Mesh Gradient (Canvas Effect) */}
                <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-crimson/10 to-transparent blur-[120px] animate-pulse opacity-60" />

                {/* Targeted Concentrated Glow */}
                <div className="absolute inset-[10%] rounded-full bg-primary/20 blur-[80px] animate-pulse" />

                <motion.div
                    className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-deep-black shadow-[0_0_100px_rgba(0,0,0,0.8),0_0_40px_rgba(var(--primary),0.15),inset_0_0_15px_rgba(255,255,255,0.05)] border-[8px] md:border-[12px] border-charcoal overflow-hidden"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                    {/* Grooves */}
                    <div className="absolute inset-0 rounded-full border-[30px] border-transparent border-t-white/5 border-b-white/5 opacity-40" />
                    <div className="absolute inset-12 rounded-full border-[1px] border-white/5" />
                    <div className="absolute inset-24 rounded-full border-[1px] border-white/5" />
                    <div className="absolute inset-40 rounded-full border-[1px] border-white/5" />
                    <div className="absolute inset-60 rounded-full border-[1px] border-white/5" />

                    {/* Revolving Text */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <defs>
                            <path
                                id="textPath"
                                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                            />
                        </defs>
                        <text className="text-[4px] font-display uppercase tracking-[0.5em] fill-white/20">
                            <textPath href="#textPath" startOffset="0%">
                                UNMUTEX • UNMUTEX • UNMUTEX • UNMUTEX • UNMUTEX • UNMUTEX • UNMUTEX • UNMUTEX •
                            </textPath>
                        </text>
                    </svg>

                    {/* Center Label */}
                    <div className="absolute inset-[33%] rounded-full bg-gradient-to-br from-primary via-crimson to-charcoal border-[10px] border-deep-black flex flex-col items-center justify-center p-8">
                        <span className="text-xs font-mono text-white/50 tracking-tighter mb-2 uppercase italic font-bold">HackS'US</span>
                        <div className="w-full h-px bg-white/20 my-2" />
                        <span className="text-white font-display text-3xl md:text-5xl tracking-widest">UNMUTEX</span>
                        <span className="text-[10px] font-mono text-white/70 mt-2 uppercase">SIDE X • 2026</span>
                    </div>

                    {/* Spindle Hole */}
                    <div className="absolute inset-[48.5%] rounded-full bg-deep-black border border-white/20 shadow-inner" />
                </motion.div>

                {/* Reflection Overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/5 to-transparent pointer-events-none opacity-50 mix-blend-overlay" />
            </div>
        </div>
    );
};

const NowPlayingBar = () => {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/10 h-20 px-6 flex items-center justify-between"
        >
            <div className="flex items-center gap-3 md:gap-4 w-full md:w-1/3 min-w-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-charcoal rounded shadow-lg overflow-hidden flex-shrink-0 relative group">
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play size={16} fill="white" />
                    </div>
                    <div className="w-full h-full bg-gradient-to-br from-primary to-crimson flex items-center justify-center text-white font-display text-sm md:text-base">UN</div>
                </div>
                <div className="min-w-0">
                    <h4 className="text-xs md:text-sm font-medium text-white truncate">Unmute X - Side A</h4>
                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">HackS'US 2026</p>
                </div>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="ml-2 text-muted-foreground hover:text-primary transition-colors hidden xs:block"
                >
                    <Music size={16} />
                </motion.button>
            </div>

            <div className="flex flex-col items-center gap-1 md:gap-2 w-auto md:w-1/3 flex-shrink-0">
                <div className="flex items-center gap-4 md:gap-6">
                    <button className="text-muted-foreground hover:text-white transition-colors hidden sm:block"><Clock size={16} /></button>
                    <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform"><Play size={16} fill="black" /></button>
                    <button className="text-muted-foreground hover:text-white transition-colors hidden sm:block"><Zap size={16} /></button>
                </div>
                <div className="w-24 xs:w-32 sm:w-full max-w-md flex items-center gap-2">
                    <span className="text-[8px] md:text-[10px] font-mono text-muted-foreground">0:42</span>
                    <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden relative group cursor-pointer">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-white group-hover:bg-primary transition-colors"
                            animate={{ width: ["10%", "95%"] }}
                            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    <span className="text-[8px] md:text-[10px] font-mono text-muted-foreground">42:00</span>
                </div>
            </div>

            <div className="items-center justify-end gap-4 w-1/3 hidden md:flex">
                <div className="flex items-center gap-2">
                    <Layers size={16} className="text-muted-foreground" />
                    <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-white" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const LevelMeter = ({ count = 12 }: { count?: number }) => {
    return (
        <div className="flex gap-1 h-3 items-end">
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    className={`w-1 rounded-sm ${i > count - 4 ? 'bg-primary' : i > count - 7 ? 'bg-yellow-500' : 'bg-scanline-green'}`}
                    animate={{
                        height: [2, Math.random() * 12 + 4, 2],
                        opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                        duration: 0.5 + Math.random(),
                        repeat: Infinity,
                        delay: i * 0.05
                    }}
                />
            ))}
        </div>
    );
};

const PartnerBranding = ({ className = "", variant = "small" }: { className?: string, variant?: "small" | "large" }) => {
    const isLarge = variant === "large";
    return (
        <div className={`flex items-center gap-6 ${className} ${isLarge ? 'flex-col sm:flex-row' : ''}`}>
            <div className={`flex items-center justify-center rounded-2xl bg-charcoal/30 border border-white/5 overflow-hidden shadow-2xl backdrop-blur-sm ${isLarge ? 'w-20 h-20 md:w-56 md:h-46 p-4' : 'w-12 h-12 p-1.5'}`}>
                {/* 
                   PLACEHOLDER FOR LOGO
                   Replace 'src' with your actual logo path once you have it.
                */}
                <img
                    src="/images/jakes-bejoy-logo.PNG"
                    alt="MINDSCORE"
                    className="w-full h-full object-contain opacity-100 drop-shadow-[0_0_20px_rgba(var(--primary),0.3)] scale-80"
                    onError={(e) => {
                        // Fallback in case image is not found yet
                        (e.target as any).style.display = 'none';
                        (e.target as any).parentElement.innerHTML = `<div class="text-primary font-bold ${isLarge ? 'text-8xl' : 'text-lg'}">JB</div>`;
                    }}
                />
            </div>
            <div className={`flex flex-col items-start leading-none ${isLarge ? 'items-center sm:items-start' : ''}`}>
                <span className={`${isLarge ? 'text-[10px] md:text-xs mb-4' : 'text-[10px] mb-1'} font-mono text-muted-foreground uppercase tracking-[0.5em]`}>A Jakes Bejoy Company</span>
                <div className={`flex items-center ${isLarge ? 'gap-4' : 'gap-2'}`}>
                    <span className={`${isLarge ? 'text-2xl md:text-4xl' : 'text-sm'} font-display text-white tracking-widest uppercase font-black`}>MINDSCORE</span>
                    <span className={`rounded-full bg-primary/10 border border-primary/20 font-mono text-primary uppercase tracking-tighter ${isLarge ? 'px-3 py-1 text-[10px]' : 'px-2 py-0.5 text-[9px]'}`}>Track Partner</span>
                </div>
            </div>
        </div>
    );
};

// ==================== KONFHUB REGISTRATION ====================
function KonfHubRegistration() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Ensure the script is only added once
        containerRef.current.innerHTML = "";

        const script = document.createElement("script");
        script.src = "https://widget.konfhub.com/widget.js";
        script.setAttribute("button_id", "btn_0a61a84147fd");
        script.async = true;

        containerRef.current.appendChild(script);
    }, []);

    return (
        <div className="flex justify-center flex-shrink-0">
            <style>{`
        .konfhub-widget-container .reg-button {
          background-color: #ff312e !important;
          color: white !important;
          font-family: inherit !important;
          font-weight: 700 !important;
          font-size: 0.95rem !important;
          padding: 0 2.5rem !important;
          height: 3.5rem !important;
          border-radius: 9999px !important;
          box-shadow: 0 10px 20px rgba(255, 49, 46, 0.2) !important;
          transition: all 0.3s ease !important;
          border: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
        }
        .konfhub-widget-container .reg-button:hover {
          background-color: rgba(255, 49, 46, 0.9) !important;
          box-shadow: 0 15px 30px rgba(255, 49, 46, 0.4) !important;
          transform: scale(1.05) !important;
        }
        .konfhub-widget-container .reg-button img {
          display: none !important;
        }
        /* Adding a play icon approximation since we can't easily inject lucide into KonfHub's button DOM */
        .konfhub-widget-container .reg-button::before {
          content: '▶';
          margin-right: 12px;
          font-size: 14px;
        }
      `}</style>
            <div ref={containerRef} className="konfhub-widget-container" />
        </div>
    );
}

const UnmuteX = () => {
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isRegistrationActive, setIsRegistrationActive] = useState(false);
    const embedControllerRef = useRef<any>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Load Spotify IFrame API
        if (!document.getElementById("spotify-iframe-api")) {
            const script = document.createElement("script");
            script.id = "spotify-iframe-api";
            script.src = "https://open.spotify.com/embed/iframe-api/v1";
            script.async = true;
            document.body.appendChild(script);
        }

        // Define the global callback for Spotify API
        (window as any).onSpotifyIframeApiReady = (IFrameAPI: any) => {
            const element = document.getElementById("spotify-embed");
            if (!element) return;

            const options = {
                uri: "spotify:artist:3Q80PCEUBCiRhLSWdQApNt",
                width: "100%",
                height: "352",
                theme: "dark"
            };

            const callback = (EmbedController: any) => {
                embedControllerRef.current = EmbedController;
                EmbedController.addListener("ready", () => {
                    setIsPlayerReady(true);
                });
            };

            IFrameAPI.createController(element, options, callback);
        };


        // Detection for KonfHub Popup
        const observer = new MutationObserver(() => {
            const popup = document.querySelector(".konfhub-buttons-ifrm");
            setIsRegistrationActive(!!popup);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            // Cleanup if needed (though usually not necessary for global scripts)
            delete (window as any).onSpotifyIframeApiReady;
            observer.disconnect();
        };
    }, []);

    const handlePlayTrigger = () => {
        if (embedControllerRef.current) {
            embedControllerRef.current.play();
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as any
    };

    return (
        <div className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden font-body flex flex-col relative">
            {!isRegistrationActive && <Navbar />}

            {/* New Revolving Record Header */}
            <RevolvingHeader />

            <main className="relative pt-32 pb-40 flex-grow">
                {/* Spotify-style Mesh Gradient Background */}
                <div className="fixed inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-crimson/5 pointer-events-none" />
                <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
                <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-scanline-green/5 rounded-full blur-[150px] animate-pulse" />

                <div className="container px-6 mx-auto relative z-10">
                    {/* Header Controls */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-8">
                        <motion.div {...fadeInUp}>
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 group"
                            >
                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="font-mono text-sm tracking-[0.2em] uppercase">Back to Library</span>
                            </Link>
                        </motion.div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 bg-charcoal/40 backdrop-blur-md border border-white/5 p-2 rounded-full px-4">
                                <div className="px-3 py-1 flex items-center gap-2 border-r border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-scanline-green animate-pulse" />
                                    <span className="font-mono text-[10px] text-scanline-green tracking-widest uppercase">Streaming</span>
                                </div>
                                <LevelMeter count={12} />
                            </div>
                            <button className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center border border-white/5 hover:border-primary/50 transition-colors">
                                <Users size={18} className="text-muted-foreground" />
                            </button>
                        </div>
                    </div>

                    {/* Hero Section - Centered */}
                    <div className="flex flex-col items-center text-center mb-32">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-12"
                        >
                            <PartnerBranding variant="large" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block px-3 py-1 border border-primary/30 bg-primary/5 rounded-full mb-6"
                        >
                            <span className="font-mono text-xs text-primary tracking-[0.4em] font-bold uppercase mb-2">
                                // TRACK SIX
                            </span>
                        </motion.div>

                        <motion.h1
                            className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-[0.85] mb-4 mt-10"
                        >
                            UNMUTEX
                        </motion.h1>

                        <div className="flex flex-col items-center gap-6 mb-12">
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-charcoal border-2 border-black flex items-center justify-center text-[10px] font-bold">P{i}</div>
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">Curated for <span className="text-white">Music Producers</span> • 42 hrs duration</span>
                            </div>

                            {/* Prize Pool Badge */}
                            <motion.div
                                className="flex flex-col items-center gap-4 bg-charcoal/40 backdrop-blur-md border border-primary/30 rounded-xl px-8 md:px-12 py-8 md:py-10 z-20 relative overflow-hidden"
                                style={{
                                    boxShadow: "0 0 20px rgba(255,49,46,0.3), inset 0 0 20px rgba(255,49,46,0.05)",
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                                <div className="flex items-center gap-2 mb-2">
                                    <motion.div
                                        className="w-2 h-2 rounded-full bg-primary"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                    <span className="font-mono text-[10px] text-primary uppercase tracking-widest">Prize Broadcasting</span>
                                </div>

                                <p className="font-mono text-xs text-muted-foreground uppercase tracking-[0.3em] mb-3">
                                    Grand Prize Pool
                                </p>

                                <motion.p
                                    className="font-display text-5xl md:text-7xl text-white font-black tracking-wider"
                                    animate={{
                                        textShadow: [
                                            "0 0 10px rgba(255,49,46,0.5), 0 0 30px rgba(255,49,46,0.2)",
                                            "0 0 20px rgba(255,49,46,0.7), 0 0 50px rgba(255,49,46,0.3)",
                                            "0 0 10px rgba(255,49,46,0.5), 0 0 30px rgba(255,49,46,0.2)"
                                        ]
                                    }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    ₹10,000
                                </motion.p>

                                <div className="flex gap-1 mt-4">
                                    <LevelMeter count={8} />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                            </motion.div>

                            <motion.div
                                className="flex flex-wrap justify-center gap-4 mt-10"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <KonfHubRegistration />

                                <motion.button
                                    onClick={handlePlayTrigger}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`h-14 px-8 bg-charcoal/60 hover:bg-charcoal/80 text-white rounded-full flex items-center gap-3 font-medium border border-white/10 transition-all ${!isPlayerReady && "opacity-50 cursor-not-allowed"}`}
                                    disabled={!isPlayerReady}
                                >
                                    <Volume2 size={18} className={isPlayerReady ? "text-primary" : "text-muted-foreground"} />
                                    <span>{isPlayerReady ? "Click Me!" : "LOADING PLAYER..."}</span>
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Content Section: Tracklist Style */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Tracklist Main */}
                        <div className="lg:col-span-8">
                            <div className="mb-12">
                                <h2 className="text-4xl font-display uppercase tracking-tight mb-8 flex items-center gap-3">
                                    <Layers className="text-primary" />
                                    <span>Tracklist Details</span>
                                </h2>

                                <div className="space-y-1">
                                    <div className="grid grid-cols-12 px-4 py-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest border-b border-white/5 mb-4">
                                        <div className="col-span-1">#</div>
                                        <div className="col-span-8">Title</div>
                                        <div className="col-span-3 text-right"><Clock size={12} className="inline mr-1" /> Duration</div>
                                    </div>

                                    {[
                                        { id: "01", title: "AI-Augmented Workflows", sub: "Intelligent ideation and arrangement tools", dur: "12:00" },
                                        { id: "02", title: "Adaptive Audio Systems", sub: "Real-time responsive music environments", dur: "08:30" },
                                        { id: "03", title: "Intelligent Mixing Hub", sub: "Automated feedback and sonic enhancement", dur: "10:15" },
                                        { id: "04", title: "Sonic Education Module", sub: "New ways to learn music production", dur: "06:45" },
                                        { id: "05", title: "Interactive Media Synth", sub: "Gaming and film audio integration", dur: "04:30" }
                                    ].map((track, i) => (
                                        <motion.div
                                            key={i}
                                            className="grid grid-cols-12 items-center px-4 py-3 rounded-md hover:bg-white/5 transition-colors group cursor-pointer"
                                            whileHover={{ x: 5 }}
                                        >
                                            <div className="col-span-1 font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors">
                                                <span className="group-hover:hidden">{track.id}</span>
                                                <Play size={14} className="hidden group-hover:block fill-primary" />
                                            </div>
                                            <div className="col-span-8">
                                                <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors">{track.title}</h4>
                                                <p className="text-xs text-muted-foreground">{track.sub}</p>
                                            </div>
                                            <div className="col-span-3 text-right font-mono text-xs text-muted-foreground">
                                                {track.dur}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Album Description */}
                            <div className="bg-charcoal/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                <h3 className="text-2xl mb-6">About the Production</h3>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        Unmute X is designed for sonic architects to push the boundaries of modern music technology. We focus on bridging the gap between human intuition and machine intelligence.
                                    </p>
                                    <p>
                                        Participants will have access to high-fidelity source material and cutting-edge audio APIs to build prototypes that can be integrated into existing professional DAW environments.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar: Spotify Embed */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-24 shadow-2xl">
                                <div
                                    id="spotify-embed"
                                    className="min-h-[352px] bg-charcoal/20 rounded-xl"
                                >
                                    {/* The Spotify IFrame API will inject the player here */}
                                </div>


                                <div className="mt-8 bg-charcoal/40 backdrop-blur-md p-6 rounded-2xl border border-white/5">
                                    <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Transmission Info</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                            <span className="text-[10px] font-mono text-muted-foreground uppercase">Rate</span>
                                            <span className="text-xs font-bold">44.1 kHz</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                            <span className="text-[10px] font-mono text-muted-foreground uppercase">Bit Depth</span>
                                            <span className="text-xs font-bold">24-bit</span>
                                        </div>
                                        <div className="pt-2">
                                            <PartnerBranding />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Contact Section */}
            <section className="relative z-10 pb-32 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex items-center gap-4 justify-center mb-12">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
                        <div className="flex items-center gap-3 bg-charcoal/40 backdrop-blur-md border border-white/5 rounded-full px-5 py-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase">Contact Frequency</span>
                        </div>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
                    </div>

                    <h2 className="font-display text-5xl md:text-6xl text-center mb-16 tracking-wider">
                        Get in Touch
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                name: "Alen George Scaria",
                                role: "// Event Coordinator",
                                phone: "+91 85908 85208",
                                phoneLink: "+91XXXXXXXXXX",
                                email: "alengscaria@gmail.com",
                            },
                            {
                                name: "Rishi Krishna",
                                role: "// Event Coordinator",
                                phone: "+91 7904 48102",
                                phoneLink: "+91XXXXXXXXXX",
                                email: "bss10a04rishi@gmail.com",
                            },
                        ].map((contact, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -4 }}
                                className="bg-charcoal/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-primary/20 transition-all duration-500"
                            >
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-2 h-2 rounded-full bg-scanline-green" />
                                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
                                        {contact.role}
                                    </span>
                                </div>

                                <h3 className="font-display text-3xl text-white tracking-wider mb-6">
                                    {contact.name}
                                </h3>

                                <div className="space-y-3">
                                    <a
                                        href={`tel:${contact.phoneLink}`}
                                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group/link"
                                    >
                                        <Volume2 size={14} className="text-primary/50 group-hover/link:text-primary transition-colors" />
                                        <span className="font-mono text-sm">{contact.phone}</span>
                                    </a>
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group/link break-all"
                                    >
                                        <Music size={14} className="text-primary/50 group-hover/link:text-primary transition-colors flex-shrink-0" />
                                        <span className="font-mono text-sm">{contact.email}</span>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {!isRegistrationActive && <NowPlayingBar />}
            <Footer />
        </div>
    );
};

export default UnmuteX;
