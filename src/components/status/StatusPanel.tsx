import { StatusBar } from './StatusBar';
import { STAT_LABELS, type Stats, type StatKey } from '@/types';

interface StatusPanelProps {
  stats:          Stats;
  selectedStats:  StatKey[];
}

export function StatusPanel({ stats, selectedStats }: StatusPanelProps) {
  const maxVal = Math.max(100, ...selectedStats.map((s) => stats[s] ?? 0));

  return (
    <div className="bg-gray-900 rounded-2xl p-4 space-y-3">
      <h3 className="text-yellow-400 font-bold text-sm tracking-wider mb-2">⚡ ステータス</h3>
      {selectedStats.map((stat) => (
        <StatusBar
          key={stat}
          stat={stat}
          value={stats[stat] ?? 0}
          max={maxVal}
          showLabel
        />
      ))}
    </div>
  );
}
