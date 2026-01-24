import * as migration_20250824_150113 from './20250824_150113';
import * as migration_20250824_183243 from './20250824_183243';
import * as migration_20250901_195913 from './20250901_195913';
import * as migration_20250906_180722 from './20250906_180722';
import * as migration_20250907_191323 from './20250907_191323';
import * as migration_20250915_122132 from './20250915_122132';
import * as migration_20251217_083823 from './20251217_083823';
import * as migration_20251221_161845 from './20251221_161845';
import * as migration_20260104_092840 from './20260104_092840';
import * as migration_20260105_152031 from './20260105_152031';
import * as migration_20260110_162614 from './20260110_162614';
import * as migration_20260112_164329 from './20260112_164329';
import * as migration_20260124_083229 from './20260124_083229';
import * as migration_20260124_144616 from './20260124_144616';

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
    name: '20250901_195913',
  },
  {
    up: migration_20250906_180722.up,
    down: migration_20250906_180722.down,
    name: '20250906_180722',
  },
  {
    up: migration_20250907_191323.up,
    down: migration_20250907_191323.down,
    name: '20250907_191323',
  },
  {
    up: migration_20250915_122132.up,
    down: migration_20250915_122132.down,
    name: '20250915_122132',
  },
  {
    up: migration_20251217_083823.up,
    down: migration_20251217_083823.down,
    name: '20251217_083823',
  },
  {
    up: migration_20251221_161845.up,
    down: migration_20251221_161845.down,
    name: '20251221_161845',
  },
  {
    up: migration_20260104_092840.up,
    down: migration_20260104_092840.down,
    name: '20260104_092840',
  },
  {
    up: migration_20260105_152031.up,
    down: migration_20260105_152031.down,
    name: '20260105_152031',
  },
  {
    up: migration_20260110_162614.up,
    down: migration_20260110_162614.down,
    name: '20260110_162614',
  },
  {
    up: migration_20260112_164329.up,
    down: migration_20260112_164329.down,
    name: '20260112_164329',
  },
  {
    up: migration_20260124_083229.up,
    down: migration_20260124_083229.down,
    name: '20260124_083229',
  },
  {
    up: migration_20260124_144616.up,
    down: migration_20260124_144616.down,
    name: '20260124_144616'
  },
];
