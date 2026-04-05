// ============================================================
// types/index.ts  — アプリ全体の型定義
// ============================================================

export type StatKey =
  | 'appearance'   // 容姿
  | 'personality'  // 性格
  | 'intelligence' // 知力
  | 'strength'     // 運動能力
  | 'wealth'       // 財力
  | 'empathy';     // 共感力

export const STAT_LABELS: Record<StatKey, string> = {
  appearance:   '容姿',
  personality:  '性格',
  intelligence: '知力',
  strength:     '運動能力',
  wealth:       '財力',
  empathy:      '共感力',
};

export const ALL_STAT_KEYS: StatKey[] = [
  'appearance',
  'personality',
  'intelligence',
  'strength',
  'wealth',
  'empathy',
];

// ---- Character ----
export type HatOption    = 'hat1' | 'hat2' | 'hat3' | 'hat4' | 'hat5';
export type FaceOption   = 'face1' | 'face2' | 'face3' | 'face4' | 'face5';
export type TopOption    = 'top1' | 'top2' | 'top3' | 'top4' | 'top5';
export type BottomOption = 'bottom1' | 'bottom2' | 'bottom3' | 'bottom4' | 'bottom5';

export interface CharacterParts {
  hat:    HatOption;
  face:   FaceOption;
  top:    TopOption;
  bottom: BottomOption;
}

export type Stats = Partial<Record<StatKey, number>>;

export interface Character {
  id:           string;
  user_id:      string;
  name:         string;
  parts:        CharacterParts;
  selected_stats: StatKey[];   // 5つ選択
  stats:        Stats;
  created_at:   string;
  updated_at:   string;
}

// ---- Action ----
export interface StatGain {
  stat:  StatKey;
  value: number;
}

export interface Action {
  id:          string;
  user_id:     string;
  name:        string;
  description: string;
  stat_gains:  StatGain[];
  created_at:  string;
}

export interface ActionLog {
  id:          string;
  user_id:     string;
  action_id:   string;
  action_name: string;
  stat_gains:  StatGain[];
  logged_at:   string;
}

// ---- Battle ----
export type BattleResult = 'win' | 'lose';
export type BattlePattern = 1 | 2;

export interface RequiredStats {
  stat:     StatKey;
  required: number;
}

export interface Monster {
  id:             number;
  boss_id:        number;   // 属するボスの番号 (1-10)
  order:          number;   // ボス前の順番 (1-4)
  name:           string;
  sprite:         string;   // public/sprites/monsters/ 以下のパス
  required_stats: RequiredStats[];
  description:    string;
}

export interface Boss {
  id:             number;
  name:           string;
  sprite:         string;
  required_stats: RequiredStats[];
  description:    string;
  lore:           string;
}

export interface BattleRecord {
  id:          string;
  user_id:     string;
  enemy_type:  'monster' | 'boss';
  enemy_id:    number;
  result:      BattleResult;
  pattern:     BattlePattern;
  battled_at:  string;
}

// ---- Auth ----
export interface UserProfile {
  id:         string;
  email:      string;
  created_at: string;
}

// ---- DB Row types (Supabase) ----
export interface DBCharacter {
  id:             string;
  user_id:        string;
  name:           string;
  parts:          CharacterParts;
  selected_stats: StatKey[];
  stats:          Stats;
  created_at:     string;
  updated_at:     string;
}

export interface DBAction {
  id:          string;
  user_id:     string;
  name:        string;
  description: string;
  stat_gains:  StatGain[];
  created_at:  string;
}

export interface DBActionLog {
  id:          string;
  user_id:     string;
  action_id:   string;
  action_name: string;
  stat_gains:  StatGain[];
  logged_at:   string;
}

export interface DBBattleRecord {
  id:         string;
  user_id:    string;
  enemy_type: 'monster' | 'boss';
  enemy_id:   number;
  result:     BattleResult;
  pattern:    BattlePattern;
  battled_at: string;
}
