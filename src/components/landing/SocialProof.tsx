import { motion } from 'framer-motion';
import { Quote, Building2 } from 'lucide-react';

export const SocialProof = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Trusted
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground">
            Powering operations for major telecom carriers across Africa and beyond.
          </p>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-8 lg:p-12 border border-border shadow-soft relative overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/10" />
            
            <div className="relative z-10">
              <p className="text-xl lg:text-2xl text-foreground leading-relaxed mb-8">
                "Innovis has transformed how we manage our operations across Africa. Managing{' '}
                <span className="text-primary font-semibold">3,000+ telecom sites</span> with real-time visibility 
                has improved our efficiency by 40% and helped us make faster, data-driven decisions."
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Regional Operations Director</div>
                  <div className="text-sm text-muted-foreground">Major African Telecom Carrier</div>
                </div>
              </div>
            </div>

            {/* Accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          </div>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { value: '3,000+', label: 'Telecom Sites Managed' },
            { value: '16', label: 'Nationalities in Team' },
            { value: '$2B+', label: 'Revenue Tracked' },
            { value: '50+', label: 'Enterprise Clients' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-secondary/30 rounded-xl">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
