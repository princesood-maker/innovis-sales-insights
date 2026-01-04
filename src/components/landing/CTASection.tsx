import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Sales Operations?
          </h2>
          <p className="text-lg lg:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
            Join industry leaders using Innovis Dashboard to drive growth across their global operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-primary-glow hover:shadow-lg text-lg group"
            >
              Schedule Your Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="mailto:solutions@innovis-global.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary-foreground/30 text-primary-foreground font-semibold rounded-xl hover:border-primary-foreground/60 transition-all text-lg"
            >
              <Mail className="w-5 h-5" />
              Contact Sales Team
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
