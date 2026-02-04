import { TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const categoryData = [
  { name: 'MCCB', schneider: 85, competitors: 78, trend: 'up' },
  { name: 'VFD', schneider: 72, competitors: 81, trend: 'down' },
  { name: 'PLC', schneider: 68, competitors: 75, trend: 'down' },
  { name: 'Contactors', schneider: 91, competitors: 82, trend: 'up' },
  { name: 'Sensors', schneider: 64, competitors: 71, trend: 'down' },
];

const competitorStrength = [
  { name: 'ABB', threat: 'high', categories: ['VFD', 'PLC'], note: 'Strong in heavy industry' },
  { name: 'Siemens', threat: 'high', categories: ['PLC', 'HMI'], note: 'Dominant in automation' },
  { name: 'Eaton', threat: 'medium', categories: ['MCCB', 'Contactor'], note: 'Price competitive' },
  { name: 'Rockwell', threat: 'medium', categories: ['PLC', 'Drive'], note: 'Strong in Americas' },
];

const threatColors = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-success/10 text-success border-success/20',
};

export default function Analytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Competitive Analytics</h1>
        <p className="text-muted-foreground">
          Market positioning and competitive intelligence insights
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Market Coverage</p>
          <p className="text-3xl font-bold text-foreground mt-1">76%</p>
          <div className="flex items-center gap-1 mt-2 text-success text-sm">
            <TrendingUp className="w-4 h-4" />
            +3.2% vs last quarter
          </div>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Competitive Wins</p>
          <p className="text-3xl font-bold text-foreground mt-1">234</p>
          <div className="flex items-center gap-1 mt-2 text-success text-sm">
            <TrendingUp className="w-4 h-4" />
            +18 this month
          </div>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Price Position</p>
          <p className="text-3xl font-bold text-foreground mt-1">Medium</p>
          <p className="text-sm text-muted-foreground mt-2">Across all categories</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Risk Alerts</p>
          <p className="text-3xl font-bold text-destructive mt-1">7</p>
          <p className="text-sm text-muted-foreground mt-2">Require attention</p>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Category Performance vs Competitors
        </h2>
        
        <div className="space-y-4">
          {categoryData.map((cat) => (
            <div key={cat.name} className="flex items-center gap-4">
              <div className="w-24 font-medium text-foreground">{cat.name}</div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-primary w-20">Schneider</span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${cat.schneider}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-12">{cat.schneider}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-20">Avg Competitor</span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary rounded-full transition-all duration-500"
                      style={{ width: `${cat.competitors}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-12">{cat.competitors}%</span>
                </div>
              </div>

              <div className="w-16 flex justify-end">
                {cat.trend === 'up' ? (
                  <Badge variant="outline" className="text-success border-success/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Up
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-destructive border-destructive/30">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    Down
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Threat Assessment */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-primary" />
          Competitor Threat Assessment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competitorStrength.map((comp) => (
            <div 
              key={comp.name}
              className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{comp.name}</h3>
                <Badge 
                  variant="outline" 
                  className={threatColors[comp.threat as keyof typeof threatColors]}
                >
                  {comp.threat} threat
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {comp.categories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{comp.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Note */}
      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground">
          <strong>Executive Summary:</strong> Schneider Electric maintains strong positions in MCCB 
          and Contactors but faces increasing competition in VFD and PLC categories. Recommend 
          focusing competitive intelligence efforts on ABB and Siemens in these segments.
        </p>
      </div>
    </div>
  );
}
