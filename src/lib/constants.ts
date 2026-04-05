import type { HatOption, FaceOption, TopOption, BottomOption } from '@/types';

export const HAT_OPTIONS: HatOption[]    = ['hat1', 'hat2', 'hat3', 'hat4', 'hat5'];
export const FACE_OPTIONS: FaceOption[]  = ['face1', 'face2', 'face3', 'face4', 'face5'];
export const TOP_OPTIONS: TopOption[]    = ['top1', 'top2', 'top3', 'top4', 'top5'];
export const BOTTOM_OPTIONS: BottomOption[] = ['bottom1', 'bottom2', 'bottom3', 'bottom4', 'bottom5'];

export const PART_LABELS = {
  hat:    '帽子',
  face:   '顔',
  top:    '上半身',
  bottom: '下半身',
};

export const STAT_MAX = 999;
export const STAT_INITIAL = 10;
export const REQUIRED_STAT_COUNT = 5;
