'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { STAT_LABELS, type StatKey } from '@/types';
import { Button } from '@/components/ui/Button';

interface ActionFormProps {
  userId:        string;
  selectedStats: StatKey[];
  onCreated:     () => void;
  onCancel:      () => void;
}

export function ActionForm({ userId, selectedStats, onCreated, onCancel }: ActionFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [gains, setGains] = useState<Record<StatKey, number>>(() => {
    const init = {} as Record<StatKey, number>;
    selectedStats.forEach((s) => { init[s] = 0; });
    return init;
  });
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const handleSave = async () => {
    if (!name.trim()) return;
    const statGains = selectedStats
      .filter((s) => gains[s] > 0)
      .map((s) => ({ stat: s, value: gains[s] }));
    if (statGains.length === 0) return;
    setSaving(true);
    await supabase.from('actions').insert({
      user_id:     userId,
      name:        name.trim(),
      description: description.trim(),
      stat_gains:  statGains,
    });
    setSaving(false);
    onCreated();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-gray-400">行動名 *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={30}
          placeholder="例：筋トレ30分"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white mt-1 focus:outline-none focus:border-yellow-500"
        />
      </div>
      <div>
        <label className="text-sm text-gray-400">説明（任意）</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={60}
          placeholder="どんな行動か..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white mt-1 focus:outline-none focus:border-yellow-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-400">ステータス上昇値（合計1以上）</label>
        {selectedStats.map((stat) => (
          <div key={stat} className="flex items-center gap-3">
            <span className="text-sm text-gray-300 w-24 shrink-0">{STAT_LABELS[stat]}</span>
            <input
              type="number"
              min={0}
              max={50}
              value={gains[stat] ?? 0}
              onChange={(e) => setGains({ ...gains, [stat]: Math.max(0, parseInt(e.target.value) || 0) })}
              className="w-20 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 text-white text-center focus:outline-none focus:border-yellow-500"
            />
            <span className="text-yellow-400 text-sm">+{gains[stat] ?? 0}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-2">
        <Button variant="ghost" size="md" className="flex-1" onClick={onCancel}>キャンセル</Button>
        <Button size="md" className="flex-1" disabled={saving || !name.trim()} onClick={handleSave}>
          {saving ? '登録中...' : '登録する'}
        </Button>
      </div>
    </div>
  );
}
