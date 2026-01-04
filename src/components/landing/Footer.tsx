import { Building2, MapPin } from 'lucide-react';
import innovisLogo from '@/assets/innovis-logo.png';

const footerLinks = {
  aboutUs: [
    { label: 'Leadership Team', href: '#' },
    { label: 'Our Growth Story', href: '#' },
    { label: 'Our Clients', href: '#' },
  ],
  globalPresence: [
    { label: 'Africa', href: '#' },
    { label: 'Asia', href: '#' },
    { label: 'Middle East', href: '#' },
  ],
  career: [
    { label: 'Life @ Innovis', href: '#' },
    { label: 'Join Our Team', href: '#' },
    { label: 'Contact Us', href: '#contact' },
  ],
};

export const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Innovis Expansion */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">Innovis Expansion</h4>
            <div className="text-5xl lg:text-6xl font-light text-primary-foreground/90 mb-2">
              2,000+
            </div>
            <p className="text-sm text-primary-foreground/60">
              Global workforce in 2025
            </p>
          </div>

          {/* Quick Contact */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">Quick Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/70">
                  Innovis Holdings Pte. Ltd.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/70">
                  80 Raffles Place #58-01 UOB Plaza 1<br />
                  Singapore 048624
                </span>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">About Us</h4>
            <ul className="space-y-3">
              {footerLinks.aboutUs.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Presence */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">Global Presence</h4>
            <ul className="space-y-3">
              {footerLinks.globalPresence.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Career */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">Career</h4>
            <ul className="space-y-3">
              {footerLinks.career.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <img src={innovisLogo} alt="Innovis" className="h-8" />
            <p className="text-sm text-primary-foreground/50">
              © {new Date().getFullYear()} Innovis Holdings Pte. Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-primary-foreground/50 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-primary-foreground/50 hover:text-primary transition-colors">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
