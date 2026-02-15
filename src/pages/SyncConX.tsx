import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SyncConX = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="pt-24 pb-16">
                <div className="container px-6 mx-auto">
                    {/* Back button */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>

                    {/* Header */}
                    <div className="mb-16 text-center">
                        <span className="font-mono text-sm text-primary tracking-[0.3em]">// TRACK 03</span>
                        <h1 className="font-display text-5xl md:text-6xl text-foreground mt-4">
                            SYNCCONX
                        </h1>
                        <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto text-center">
                            Create data-driven electrical and instrumentation systems for smarter, more efficient workflows
                        </p>

                        {/* Prize Pool */}
                        <div className="mt-8 inline-block bg-card border border-border px-10 py-5 rounded-xl">
                            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">
                                Total Prize Pool
                            </p>
                            <p className="font-display text-5xl md:text-6xl text-primary font-bold">
                                ₹20,000
                            </p>
                        </div>
                    </div>

                    {/* Content sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        <div className="lg:col-span-2">
                            <div className="space-y-8">
                                {/* Overview */}
                                <section className="bg-card border border-border p-8 rounded-xl">
                                    <h2 className="font-display text-2xl text-foreground mb-4">Overview</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        SyncConX challenges engineers to design data-driven electrical and instrumentation systems.
                                        Leverage sensors, IoT, and intelligent analytics to create systems that monitor, measure, and optimize electrical workflows.
                                    </p>
                                </section>

                                {/* Requirements */}
                                <section className="bg-card border border-border p-8 rounded-xl">
                                    <h2 className="font-display text-2xl text-foreground mb-4">Requirements</h2>
                                    <ul className="space-y-3 text-muted-foreground">
                                        <li className="flex gap-3">
                                            <span className="text-primary">•</span>
                                            <span>Data acquisition and instrumentation system</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-primary">•</span>
                                            <span>Real-time monitoring or control capabilities</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-primary">•</span>
                                            <span>Instrumentation in Biomedical Technology</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-primary">•</span>
                                            <span>Robot telemetry (encoders/IMU), motor current sensing</span>
                                        </li>
                                    </ul>
                                </section>

                                {/* Judging Criteria
                                <section className="bg-card border border-border p-8 rounded-xl">
                                    <h2 className="font-display text-2xl text-foreground mb-4">Judging Criteria</h2>
                                    <ul className="space-y-3 text-muted-foreground">
                                        <li className="flex gap-3">
                                            <span className="text-primary">•</span>
                                            <span>System Design (25%)</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-primary">•</span>
                                            <span>Data Integration (25%)</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-primary">•</span>
                                            <span>Accuracy & Reliability (25%)</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-primary">•</span>
                                            <span>Practical Application (25%)</span>
                                        </li>
                                    </ul>
                                </section> */}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-card border border-border p-6 rounded-xl sticky top-24">
                                <h3 className="font-display text-lg text-foreground mb-4">Track Details</h3>
                                <div className="space-y-4 text-sm text-muted-foreground">
                                    <div>
                                        <p className="text-primary font-semibold mb-1">Prize Pool</p>
                                        <p>₹20K</p>
                                    </div>
                                    <div>
                                        <p className="text-primary font-semibold mb-1">Team Size</p>
                                        <p>4-6 members</p>
                                    </div>
                                    <div>
                                        <p className="text-primary font-semibold mb-1">Duration</p>
                                        <p>42 hours</p>
                                    </div>
                                </div>
                                <a
                                    href="https://konfhub.com/hacksus-edition-5"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block w-full mt-6 bg-primary text-primary-foreground px-6 py-3 font-display tracking-wider rounded-lg hover:bg-primary/90 transition-colors text-center"
                                >
                                    Register Team
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Contact Section */}
            <section className="pb-16">
                <div className="container px-6 mx-auto">
                    <div className="mb-12 text-center">
                        <span className="font-mono text-sm text-primary tracking-[0.3em]">// CONTACTS</span>
                        <h2 className="font-display text-3xl md:text-4xl text-foreground mt-4">
                            Get in Touch
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        {[
                            {
                                name: "Amy Reni Varghese",
                                role: "Event Coordinator",
                                phone: "+91 62388 87116",
                                phoneLink: "+91XXXXXXXXXX",
                                email: "u2302012@rajagiri.edu.in",
                            },
                            {
                                name: "Varnika B",
                                role: "Event Coordinator",
                                phone: "+91 79949 08780",
                                phoneLink: "+91XXXXXXXXXX",
                                email: "varnikabofficial@gmail.com",
                            },
                        ].map((contact, i) => (
                            <div
                                key={i}
                                className="bg-card border border-border p-8 rounded-xl"
                            >
                                <p className="text-primary font-semibold text-sm mb-1">{contact.role}</p>
                                <h3 className="font-display text-2xl text-foreground mb-5">
                                    {contact.name}
                                </h3>
                                <div className="space-y-3 text-muted-foreground">
                                    <a
                                        href={`tel:${contact.phoneLink}`}
                                        className="flex gap-3 hover:text-primary transition-colors"
                                    >
                                        <span className="text-primary">•</span>
                                        <span>{contact.phone}</span>
                                    </a>
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="flex gap-3 hover:text-primary transition-colors break-all"
                                    >
                                        <span className="text-primary">•</span>
                                        <span>{contact.email}</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SyncConX;
