import * as migration_20250824_150113 from './20250824_150113';

export const migrations = [
  {
    up: migration_20250824_150113.up,
    down: migration_20250824_150113.down,
    name: '20250824_150113'
  },
];
