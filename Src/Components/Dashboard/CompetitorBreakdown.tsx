import { mockCompetitorProducts } from '@/data/mockData';

const competitorData = [
  { name: 'ABB', count: 892, color: 'bg-red-500' },
  { name: 'Siemens', count: 756, color: 'bg-blue-500' },
  { name: 'Eaton', count: 634, color: 'bg-amber-500' },
  { name: 'Rockwell', count: 412, color: 'bg-purple-500' },
  { name: 'Mitsubishi', count: 328, color: 'bg-pink-500' },
  { name: 'Danfoss', count: 245, color: 'bg-cyan-500' },
];

const totalCount = competitorData.reduce((sum, c) => sum + c.count, 0);

export function CompetitorBreakdown() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Equivalencies by Competitor</h3>
      
      <div className="space-y-4">
        {competitorData.map((competitor) => {
          const percentage = Math.round((competitor.count / totalCount) * 100);
          
          return (
            <div key={competitor.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-foreground">{competitor.name}</span>
                <span className="text-sm text-muted-foreground">{competitor.count}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(competitor.color, 'h-full rounded-full transition-all duration-500')}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Equivalencies</span>
          <span className="font-semibold text-foreground">{totalCount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
