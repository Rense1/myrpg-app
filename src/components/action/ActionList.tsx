'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { STAT_LABELS, type Action, type StatKey } from '@/types';
import type { Character } from '@/types';

interface ActionListProps {
  userId:    string;
  character: Character;
  onStatGain: (gains: Array<{ stat: StatKey; value: number }>) => Promise<void>;
}

export function ActionList({ userId, character, onStatGain }: ActionListProps) {
  const [actions, setActions] = useState<Action[]>([]);
  const [executing, setExecuting] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const supabase = createClient();

  const fetchActions = useCallback(async () => {
    const { data } = await supabase
      .from('actions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (data) setActions(data as Action[]);
  }, [userId]);

  useEffect(() => { fetchActions(); }, [fetchActions]);

  const execute = async (action: Action) => {
    if (executing) return;
    setExecuting(action.id);
    await onStatGain(action.stat_gains);
    await supabase.from('action_logs').insert({
      user_id:     userId,
      action_id:   action.id,
      action_name: action.name,
      stat_gains:  action.stat_gains,
    });
    setFeedback(`${action.name} 完了！`);
    setTimeout(() => setFeedback(null), 2000);
    setExecuting(null);
  };

  if (actions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p className="text-3xl mb-2">📋</p>
        <p>行動がまだ登録されていません</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {feedback && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-gray-950 px-6 py-2 rounded-full font-bold z-50 animate-bounce">
          ✨ {feedback}
        </div>
      )}
      {actions.map((action) => (
        <div key={action.id} className="bg-gray-900 rounded-xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-bold text-white">{action.name}</p>
              {action.description && <p className="text-gray-500 text-xs mt-0.5">{action.description}</p>}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {action.stat_gains.map(({ stat, value }, i) => (
                  <span key={i} className="bg-gray-800 text-yellow-400 text-xs px-2 py-0.5 rounded-full">
                    {STAT_LABELS[stat as StatKey]} +{value}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => execute(action)}
              disabled={!!executing}
              className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-gray-950 font-bold px-4 py-2 rounded-lg text-sm transition-colors shrink-0"
            >
              {executing === action.id ? '...' : '実行'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
