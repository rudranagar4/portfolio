/**
 * Projects configuration
 * Import all project JSON files here
 */

import type { Project } from '../types';

import redisServer from './projects/redis-server.json';
import khataPe from './projects/khata-pe.json';
import roompulseAi from './projects/roompulse-ai.json';
import zeroGap from './projects/zerogap.json';
import smartPlacement from './projects/smart-placement.json';
import hospitalQueue from './projects/hospital-queue.json';
import huddle from './projects/huddle.json';

export const projects: readonly Project[] = [
  redisServer,
  khataPe,
  roompulseAi,
  zeroGap,
  smartPlacement,
  hospitalQueue,
  huddle,
] as Project[];
