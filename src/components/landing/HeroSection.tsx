import { motion } from 'framer-motion';
import { Globe, Users, BarChart3, Play } from 'lucide-react';

const floatingStats = [
  { icon: Globe, value: '20', label: 'Countries' },
  { icon: Users, value: '2,000+', label: 'Users' },
  { icon: BarChart3, value: 'Real-Time', label: 'Analytics' },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Red Accent Glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Trusted by Global Enterprises
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Transform Your Sales Performance with{' '}
              <span className="text-primary">Real-Time Intelligence</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Empower your global telecom and energy operations with data-driven insights across 20 countries. Make faster decisions, close more deals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-primary-glow hover:shadow-lg text-lg"
              >
                Schedule Demo
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-foreground/20 text-foreground font-semibold rounded-xl hover:border-primary hover:text-primary transition-all text-lg"
              >
                <Play className="w-5 h-5" />
                Watch Overview
              </a>
            </div>
          </motion.div>

          {/* Dashboard Preview with Floating Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Dashboard Card */}
            <div className="relative bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-foreground/[0.03] px-6 py-4 border-b border-border flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">Innovis Sales Dashboard</span>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 space-y-4">
                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Revenue', value: '$2.4M', change: '+12%' },
                    { label: 'Active Deals', value: '147', change: '+8%' },
                    { label: 'Win Rate', value: '68%', change: '+5%' },
                  ].map((metric, i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                      <div className="text-lg font-bold text-foreground">{metric.value}</div>
                      <div className="text-xs text-green-600 font-medium">{metric.change}</div>
                    </div>
                  ))}
                </div>

                {/* Chart Placeholder */}
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="flex items-end gap-2 h-24">
                    {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 70, 95].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-primary/20 rounded-t"
                        style={{ height: `${height}%` }}
                      >
                        <div
                          className="bg-primary rounded-t w-full"
                          style={{ height: `${Math.random() * 30 + 60}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Table Preview */}
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-2 bg-secondary/20 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/10" />
                      <div className="flex-1">
                        <div className="h-2.5 bg-muted-foreground/10 rounded w-3/4" />
                      </div>
                      <div className="h-2.5 bg-muted-foreground/10 rounded w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            {floatingStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className={`absolute bg-card rounded-xl shadow-elevated border border-border p-4 ${
                  index === 0
                    ? '-top-4 -left-4 lg:-left-8'
                    : index === 1
                    ? 'top-1/3 -right-4 lg:-right-8'
                    : '-bottom-4 left-1/4'
                }`}
                style={{ animation: 'float 3s ease-in-out infinite', animationDelay: `${index * 0.5}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
