'use client';

import { useState } from 'react';
import { ActionList } from '@/components/action/ActionList';
import { ActionForm } from '@/components/action/ActionForm';
import { Modal } from '@/components/ui/Modal';
import { useCharacter } from '@/hooks/useCharacter';
import type { Character } from '@/types';

interface ActionsClientProps {
  userId:    string;
  character: Character;
}

export function ActionsClient({ userId, character: initialChar }: ActionsClientProps) {
  const [showForm, setShowForm] = useState(false);
  const { character, applyStatGains, refetch } = useCharacter(userId);
  const char = character ?? initialChar;

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={() => setShowForm(true)}
        className="w-full border-2 border-dashed border-gray-700 hover:border-yellow-500 text-gray-400 hover:text-yellow-400 rounded-xl py-3 text-sm transition-colors"
      >
        ＋ 新しい行動を登録する
      </button>

      <ActionList
        userId={userId}
        character={char}
        onStatGain={applyStatGains}
      />

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="行動を登録">
        <ActionForm
          userId={userId}
          selectedStats={char.selected_stats}
          onCreated={() => { setShowForm(false); refetch(); }}
          onCancel={() => setShowForm(false)}
        />
      </Modal>
    </div>
  );
}
