import { cn } from '@/lib/utils';
import { getConfidenceLevel } from '@/data/mockData';

interface ConfidenceBadgeProps {
  score: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ConfidenceBadge({ score, showLabel = true, size = 'md' }: ConfidenceBadgeProps) {
  const level = getConfidenceLevel(score);
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full font-medium border',
      sizeClasses[size],
      level === 'high' && 'confidence-badge-high',
      level === 'medium' && 'confidence-badge-medium',
      level === 'low' && 'confidence-badge-low',
    )}>
      <span className={cn(
        'w-2 h-2 rounded-full',
        level === 'high' && 'bg-success',
        level === 'medium' && 'bg-warning',
        level === 'low' && 'bg-destructive',
      )} />
      {score}%
      {showLabel && (
        <span className="text-xs opacity-80 capitalize">{level}</span>
      )}
    </span>
  );
}
