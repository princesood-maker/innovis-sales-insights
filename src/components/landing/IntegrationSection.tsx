import { motion } from 'framer-motion';
import { Cloud, Shield, Smartphone, Code, RefreshCw, Clock } from 'lucide-react';

const technologies = [
  { icon: Cloud, label: 'Cloud-Based Infrastructure', description: 'Scalable & reliable' },
  { icon: Shield, label: 'Bank-Level Security', description: 'SOC 2 compliant' },
  { icon: Smartphone, label: 'Mobile Responsive', description: 'Access anywhere' },
  { icon: Code, label: 'API Integrations', description: 'Connect your stack' },
  { icon: RefreshCw, label: 'Real-Time Sync', description: 'Always up-to-date' },
  { icon: Clock, label: '99.9% Uptime SLA', description: 'Enterprise reliability' },
];

export const IntegrationSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
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
            Technology
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Enterprise-Grade Platform
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for scale, security, and reliability that global enterprises demand.
          </p>
        </motion.div>

        {/* Technology Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all hover:shadow-soft text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <tech.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">{tech.label}</h3>
              <p className="text-sm text-muted-foreground">{tech.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-6 lg:gap-8"
        >
          {['ISO 27001 Certified', 'GDPR Compliant', 'SOC 2 Type II', 'SSL Encrypted'].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
