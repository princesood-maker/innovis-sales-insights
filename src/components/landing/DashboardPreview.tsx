import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Briefcase, Users, ArrowUp, ArrowDown } from 'lucide-react';

export const DashboardPreview = () => {
  const metrics = [
    { icon: DollarSign, label: 'Total Revenue', value: '$12.4M', change: '+18.2%', up: true },
    { icon: Briefcase, label: 'Active Deals', value: '284', change: '+12.5%', up: true },
    { icon: Users, label: 'New Clients', value: '47', change: '+23.1%', up: true },
    { icon: TrendingUp, label: 'Win Rate', value: '68%', change: '+5.4%', up: true },
  ];

  const regionalData = [
    { region: 'Asia Pacific', revenue: '$4.2M', deals: 89, progress: 85 },
    { region: 'Africa', revenue: '$3.8M', deals: 76, progress: 76 },
    { region: 'Europe', revenue: '$2.6M', deals: 54, progress: 52 },
    { region: 'Americas', revenue: '$1.8M', deals: 65, progress: 36 },
  ];

  const recentDeals = [
    { client: 'Airtel Nigeria', value: '$2.4M', stage: 'Negotiation', probability: '85%' },
    { client: 'Vodafone Ghana', value: '$1.8M', stage: 'Proposal', probability: '70%' },
    { client: 'MTN Uganda', value: '$890K', stage: 'Discovery', probability: '45%' },
    { client: 'Orange Senegal', value: '$1.2M', stage: 'Closed Won', probability: '100%' },
  ];

  return (
    <section id="demo" className="py-20 lg:py-28 bg-secondary/30">
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
            Dashboard Preview
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Your Command Center for Global Sales
          </h2>
          <p className="text-lg text-muted-foreground">
            See how leading telecom companies manage their operations with real-time insights.
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden"
        >
          {/* Dashboard Header */}
          <div className="bg-foreground/[0.02] px-6 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/60" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
              </div>
              <span className="text-sm text-muted-foreground font-medium">Innovis Sales Dashboard — Q4 2024</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <div className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">Live Data</div>
            </div>
          </div>

          <div className="p-6 lg:p-8 space-y-6">
            {/* Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, i) => (
                <div key={i} className="bg-secondary/50 rounded-xl p-4 lg:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <metric.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-medium ${metric.up ? 'text-green-600' : 'text-red-500'}`}>
                      {metric.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {metric.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              {/* Chart */}
              <div className="lg:col-span-3 bg-secondary/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground">Revenue Trend</h3>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-primary" /> This Year</span>
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-primary/30" /> Last Year</span>
                  </div>
                </div>
                <div className="flex items-end gap-3 h-40">
                  {[45, 55, 40, 65, 50, 75, 60, 80, 70, 90, 85, 95].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                      <div className="w-full relative" style={{ height: `${height}%` }}>
                        <div className="absolute bottom-0 w-full bg-primary/20 rounded-t h-3/4" />
                        <div className="absolute bottom-0 w-full bg-primary rounded-t" style={{ height: `${60 + Math.random() * 30}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regional Performance */}
              <div className="lg:col-span-2 bg-secondary/30 rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-4">Regional Performance</h3>
                <div className="space-y-4">
                  {regionalData.map((region, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-foreground">{region.region}</span>
                        <span className="text-sm font-medium text-foreground">{region.revenue}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${region.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Deals Table */}
            <div className="bg-secondary/30 rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-4">Recent Pipeline Activity</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground border-b border-border">
                      <th className="pb-3 font-medium">Client</th>
                      <th className="pb-3 font-medium">Deal Value</th>
                      <th className="pb-3 font-medium">Stage</th>
                      <th className="pb-3 font-medium text-right">Probability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDeals.map((deal, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="py-3 text-sm font-medium text-foreground">{deal.client}</td>
                        <td className="py-3 text-sm text-foreground">{deal.value}</td>
                        <td className="py-3">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            deal.stage === 'Closed Won' ? 'bg-green-100 text-green-700' :
                            deal.stage === 'Negotiation' ? 'bg-primary/10 text-primary' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {deal.stage}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-foreground text-right font-medium">{deal.probability}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
