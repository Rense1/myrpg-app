import { STAT_LABELS, type StatKey } from '@/types';

interface StatusBarProps {
  stat:    StatKey;
  value:   number;
  max?:    number;
  showLabel?: boolean;
}

const statColors: Record<StatKey, string> = {
  appearance:   'bg-pink-500',
  personality:  'bg-purple-500',
  intelligence: 'bg-blue-500',
  strength:     'bg-red-500',
  wealth:       'bg-yellow-500',
  empathy:      'bg-green-500',
};

export function StatusBar({ stat, value, max = 100, showLabel = true }: StatusBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{STAT_LABELS[stat]}</span>
          <span className="text-white font-mono">{value}</span>
        </div>
      )}
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${statColors[stat]} transition-all duration-700 rounded-full`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
