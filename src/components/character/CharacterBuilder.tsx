'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { CharacterSprite } from './CharacterSprite';
import { Button } from '@/components/ui/Button';
import { HAT_OPTIONS, FACE_OPTIONS, TOP_OPTIONS, BOTTOM_OPTIONS, PART_LABELS, STAT_INITIAL, REQUIRED_STAT_COUNT } from '@/lib/constants';
import { ALL_STAT_KEYS, STAT_LABELS, type CharacterParts, type StatKey } from '@/types';

interface CharacterBuilderProps {
  userId: string;
}

type Step = 'parts' | 'stats' | 'name';

export function CharacterBuilder({ userId }: CharacterBuilderProps) {
  const [step, setStep] = useState<Step>('parts');
  const [name, setName] = useState('');
  const [parts, setParts] = useState<CharacterParts>({ hat: 'hat1', face: 'face1', top: 'top1', bottom: 'bottom1' });
  const [selectedStats, setSelectedStats] = useState<StatKey[]>([]);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const toggleStat = (stat: StatKey) => {
    setSelectedStats((prev) =>
      prev.includes(stat)
        ? prev.filter((s) => s !== stat)
        : prev.length < REQUIRED_STAT_COUNT
          ? [...prev, stat]
          : prev
    );
  };

  const handleSave = async () => {
    if (!name.trim() || selectedStats.length !== REQUIRED_STAT_COUNT) return;
    setSaving(true);
    const initialStats: Record<string, number> = {};
    selectedStats.forEach((s) => { initialStats[s] = STAT_INITIAL; });

    await supabase.from('characters').insert({
      user_id:        userId,
      name:           name.trim(),
      parts,
      selected_stats: selectedStats,
      stats:          initialStats,
    });
    router.push('/home');
    router.refresh();
  };

  const partOptionMap = {
    hat:    HAT_OPTIONS,
    face:   FACE_OPTIONS,
    top:    TOP_OPTIONS,
    bottom: BOTTOM_OPTIONS,
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-center">
        <CharacterSprite parts={parts} size="lg" />
      </div>

      {/* ステップインジケーター */}
      <div className="flex gap-2 justify-center text-xs">
        {(['parts', 'stats', 'name'] as Step[]).map((s, i) => (
          <div key={s} className={`flex items-center gap-1 ${step === s ? 'text-yellow-400' : 'text-gray-600'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step === s ? 'bg-yellow-500 text-gray-950' : 'bg-gray-700'}`}>{i + 1}</span>
            <span>{s === 'parts' ? '外見' : s === 'stats' ? 'ステータス' : '名前'}</span>
          </div>
        ))}
      </div>

      {step === 'parts' && (
        <div className="space-y-4">
          {(Object.keys(partOptionMap) as (keyof CharacterParts)[]).map((partKey) => (
            <div key={partKey}>
              <p className="text-sm text-gray-400 mb-2">{PART_LABELS[partKey]}</p>
              <div className="flex gap-2 flex-wrap">
                {partOptionMap[partKey].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setParts({ ...parts, [partKey]: opt })}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${parts[partKey] === opt ? 'border-yellow-500 text-yellow-400 bg-yellow-500/10' : 'border-gray-700 text-gray-400'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <Button size="lg" onClick={() => setStep('stats')}>次へ →</Button>
        </div>
      )}

      {step === 'stats' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-400 text-center">5つのステータスを選択（{selectedStats.length}/{REQUIRED_STAT_COUNT}）</p>
          <div className="grid grid-cols-2 gap-3">
            {ALL_STAT_KEYS.map((stat) => (
              <button
                key={stat}
                onClick={() => toggleStat(stat)}
                className={`py-3 rounded-xl border text-sm transition-colors ${selectedStats.includes(stat) ? 'border-yellow-500 text-yellow-400 bg-yellow-500/10' : 'border-gray-700 text-gray-400'}`}
              >
                {STAT_LABELS[stat]}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button size="lg" variant="ghost" onClick={() => setStep('parts')}>← 戻る</Button>
            <Button size="lg" disabled={selectedStats.length !== REQUIRED_STAT_COUNT} onClick={() => setStep('name')}>次へ →</Button>
          </div>
        </div>
      )}

      {step === 'name' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-400 text-center">キャラクター名を入力</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            placeholder="勇者の名前..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-center text-lg placeholder-gray-500 focus:outline-none focus:border-yellow-500"
          />
          <div className="flex gap-2">
            <Button size="lg" variant="ghost" onClick={() => setStep('stats')}>← 戻る</Button>
            <Button size="lg" disabled={!name.trim() || saving} onClick={handleSave}>
              {saving ? '作成中...' : '冒険開始！'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
