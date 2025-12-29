import { Github, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@hacksus.dev", label: "Email" },
  ];

  return (
    <footer className="relative py-16 border-t border-border">
      <div className="container px-6">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Logo and tagline */}
          <div>
            <div className="font-display text-3xl text-primary mb-2">
              HACK<span className="text-foreground">S'US</span>
            </div>
            <p className="text-sm text-muted-foreground">Edition V • March 2025</p>
          </div>

          {/* ASCII Art */}
          <div className="hidden md:block font-mono text-xs text-muted-foreground/50 text-center whitespace-pre leading-none">
{`   _____
  |     |
  | [_] |
  |_____|
  _|___|_
 |_______|`}
          </div>

          {/* Social links */}
          <div className="flex justify-center md:justify-end gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            Made with {"</>"} by HackS'US Team
          </p>
          <div className="flex gap-6 font-mono text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Code of Conduct</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>

        {/* Easter egg hint */}
        <div className="mt-8 text-center">
          <p className="font-mono text-xs text-muted-foreground/30">
            {"// Try the Konami code... if you dare"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
