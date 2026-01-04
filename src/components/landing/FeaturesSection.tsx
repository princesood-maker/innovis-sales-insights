import { motion } from 'framer-motion';
import { BarChart3, GitBranch, Target, TrendingUp, Users2, FileText } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Global Sales Analytics',
    description: 'Real-time visibility across all regions with unified dashboards and performance metrics.',
  },
  {
    icon: GitBranch,
    title: 'Project Pipeline Management',
    description: 'Track deals from lead to closure with customizable stages and automated workflows.',
  },
  {
    icon: Target,
    title: 'Team Performance Metrics',
    description: 'Monitor individual and team KPIs with goal tracking and achievement recognition.',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Forecasting',
    description: 'AI-powered predictive analytics to forecast revenue with unprecedented accuracy.',
  },
  {
    icon: Users2,
    title: 'Client Relationship Intelligence',
    description: '360° customer view with interaction history, preferences, and opportunity scoring.',
  },
  {
    icon: FileText,
    title: 'Custom Reporting',
    description: 'Executive-ready insights in seconds with drag-and-drop report builder.',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-28 bg-background">
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
            Features
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Powerful Features for Global Sales Teams
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to manage, analyze, and optimize your sales operations across borders.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-primary/30 transition-all hover:shadow-elevated"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
