import { motion } from 'framer-motion';
import { Globe, Users, Award, Zap } from 'lucide-react';

const stats = [
  { icon: Globe, value: '20', label: 'Countries Served', suffix: '+' },
  { icon: Users, value: '2,000', label: 'Team Members', suffix: '+' },
  { icon: Award, value: '15', label: 'Years Experience', suffix: '+' },
  { icon: Zap, value: '99.9', label: 'Uptime', suffix: '%' },
];

export const StatsBar = () => {
  return (
    <section className="py-16 bg-foreground relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/20 mb-4">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-2">
                {stat.value}
                <span className="text-primary">{stat.suffix}</span>
              </div>
              <div className="text-sm text-primary-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
