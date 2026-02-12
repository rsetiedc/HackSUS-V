import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DetailsSection from "@/components/DetailsSection";
import TracksSection from "@/components/TracksSection";
import PreEventsTimeline from "@/components/PreEventsTimeline";
import ScheduleSection from "@/components/ScheduleSection";
import SponsorsSection from "@/components/SponsorsSection";
import FAQSection from "@/components/FAQSection";
import CountdownTimer from "@/components/CountdownTimer";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isKruizeXOpen, setIsKruizeXOpen] = useState(false);

  useEffect(() => {
    // Open KruizeX pop-up on page load
    setIsKruizeXOpen(true);
  }, []);

  return (
    <>
      <main className="text-foreground overflow-x-hidden">
        {/* <Navbar /> */}
        <HeroSection />
        <AboutSection />
        <DetailsSection />
        <TracksSection />
        <PreEventsTimeline />
        {/* <ScheduleSection /> */}
        <CountdownTimer />
        {/* <SponsorsSection /> */}
        {/* <FAQSection /> */}
        <Footer />
      </main>

      {/* KruizeX Event Pop-up */}
      <Dialog open={isKruizeXOpen} onOpenChange={setIsKruizeXOpen}>
        <DialogContent className="w-[90vw] max-w-md sm:max-w-lg mx-auto">
          <DialogHeader>
            <div className="flex items-center justify-center gap-4 mb-4">
              <img src="/images/hacksus_logo.webp" alt="Water Metro" className="h-20 w-auto" />
              <span className="text-4xl text-primary font-bold ml-2">×</span>
              <img src="/images/waterMetro.webp" alt="HackSUS" className="h-20 w-auto" />
            </div>
            <DialogTitle className="text-7xl text-[#2563eb] text-center tracking-widest">Kruize<span className="ml-2">X</span></DialogTitle>
            <DialogDescription className="text-base leading-relaxed text-foreground mt-2">
              Participate in this exclusive Problathon on the <span className="text-[#2563eb]">Kochi Water Metro</span> as part of the <span className="text-red-600 font-semibold">HackS'US Edition V Pre-Event</span>.
            </DialogDescription>
          </DialogHeader>

          {/* <div className="py-4 space-y-4">
            <div className="bg-card border border-border p-4 rounded-lg">
              <p className="text-sm font-semibold text-[#2563eb] mb-2">Event Details</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Exclusive Ideathon</li>
                <li>• Pitch your ideas on the water</li>
                <li>• Limited seats available</li>
              </ul>
            </div>
          </div> */}

          <DialogFooter className="flex gap-3">
            <Button
              onClick={() => {
                window.location.href = "/kruizex";
              }}
              className="flex-1 bg-[#2563eb] hover:bg-[#2563eb] !focus:ring-[#2563eb] !focus:ring-offset-0 !ring-[#2563eb]"
            >
              VISIT PAGE
            </Button>
          </DialogFooter>
        </DialogContent >
      </Dialog >
    </>
  );
};

export default Index;
