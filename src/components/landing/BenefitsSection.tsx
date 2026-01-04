import { motion } from 'framer-motion';
import { Check, Globe, Zap, Target, Users, Clock } from 'lucide-react';

const benefits = [
  {
    icon: Globe,
    title: 'Unified Global Operations View',
    description: 'See all your regional operations in one place. No more siloed data or delayed reports across time zones.',
    stats: '20+ countries unified',
  },
  {
    icon: Zap,
    title: '40% Faster Decision Making',
    description: 'Real-time insights mean you can respond to market changes and opportunities faster than competitors.',
    stats: '40% improvement',
  },
  {
    icon: Target,
    title: 'Improved Forecast Accuracy by 35%',
    description: 'AI-powered predictions that learn from your historical data to provide reliable revenue forecasts.',
    stats: '35% more accurate',
  },
  {
    icon: Users,
    title: 'Enhanced Cross-Team Collaboration',
    description: 'Break down silos between sales, operations, and management with shared visibility and goals.',
    stats: 'Real-time sync',
  },
  {
    icon: Clock,
    title: 'Reduced Reporting Time by 60%',
    description: 'Automated reporting means your team spends less time on admin and more time selling.',
    stats: '60% time saved',
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 lg:py-28 bg-background">
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
            Benefits
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Leading Telecom Companies Choose Innovis Dashboard
          </h2>
          <p className="text-lg text-muted-foreground">
            Measurable results that impact your bottom line.
          </p>
        </motion.div>

        {/* Benefits List */}
        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl border border-border hover:border-primary/30 transition-all hover:shadow-soft overflow-hidden"
            >
              <div className={`flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} items-center gap-6 lg:gap-8 p-6 lg:p-8`}>
                {/* Icon & Stats */}
                <div className="flex-shrink-0 w-full lg:w-64 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{benefit.stats}</div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {benefit.description}
                  </p>
                </div>

                {/* Check mark */}
                <div className="flex-shrink-0 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
                  <Check className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
