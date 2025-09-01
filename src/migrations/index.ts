import * as migration_20250824_150113 from './20250824_150113';
import * as migration_20250824_183243 from './20250824_183243';
import * as migration_20250901_195913 from './20250901_195913';

export const migrations = [
  {
    up: migration_20250824_150113.up,
    down: migration_20250824_150113.down,
    name: '20250824_150113',
  },
  {
    up: migration_20250824_183243.up,
    down: migration_20250824_183243.down,
    name: '20250824_183243',
  },
  {
    up: migration_20250901_195913.up,
    down: migration_20250901_195913.down,
    name: '20250901_195913'
  },
];
