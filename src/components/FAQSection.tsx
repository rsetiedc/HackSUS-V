import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who can participate in HackS'US?",
    answer: "Anyone with a passion for technology! Students, developers, designers, and makers of all skill levels are welcome. You can participate solo or form teams of up to 4 members.",
  },
  {
    question: "Is HackS'US free to attend?",
    answer: "Yes! HackS'US is completely free for all participants. We provide meals, snacks, swag, and everything you need for 36 hours of hacking.",
  },
  {
    question: "What should I bring?",
    answer: "Bring your laptop, chargers, any hardware you plan to use, toiletries for overnight, and a sleeping bag if you plan to rest. We'll provide the rest!",
  },
  {
    question: "Do I need a team before registering?",
    answer: "Nope! You can register solo and we'll help you find teammates at the event. We have a dedicated team formation session at the start.",
  },
  {
    question: "What can I build?",
    answer: "Anything within our challenge tracks! Software, hardware, mobile apps, web apps, AI projects—the choice is yours. Projects must be started at the hackathon.",
  },
  {
    question: "How does judging work?",
    answer: "Projects are judged on innovation, technical complexity, design, and impact. Each track has its own prize pool. You'll demo to a panel of industry experts.",
  },
  {
    question: "Will there be food and drinks?",
    answer: "Absolutely! We provide all meals, unlimited snacks, coffee, and energy drinks throughout the event. Vegetarian and vegan options available.",
  },
  {
    question: "Can I sleep at the venue?",
    answer: "Yes! We have designated quiet areas with sleeping spaces. However, many hackers choose to power through—we'll keep the coffee flowing.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-24 md:py-32 bg-charcoal">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />

      <div className="container px-6 relative max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-primary tracking-[0.3em]">// QUESTIONS?</span>
          <h2 className="font-display text-5xl md:text-6xl text-foreground mt-4">
            FREQUENTLY <span className="text-primary">ASKED</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border bg-background px-6 data-[state=open]:border-primary/50 transition-colors"
            >
              <AccordionTrigger className="font-display text-lg text-foreground hover:text-primary hover:no-underline py-6">
                <span className="text-left">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional help */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a href="mailto:hello@hacksus.dev" className="text-primary hover:underline">
              Reach out to us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
