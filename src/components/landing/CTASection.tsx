import { motion } from 'framer-motion';
import ctaBackground from '@/assets/cta-background.jpg';

export const CTASection = () => {
  return (
    <section className="relative">
      {/* Background Image */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat py-20 lg:py-32"
        style={{ backgroundImage: `url(${ctaBackground})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-foreground/50" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-5xl mx-auto"
          >
            <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-primary-foreground/70 mb-6">
              Innovation Meets Execution
            </span>
            
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-8 leading-tight">
              Want To Explore How Innovis Can Add Value To Your Organisation? Contact Our Experts Today
            </h2>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all text-sm"
            >
              Book A Consultation
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
