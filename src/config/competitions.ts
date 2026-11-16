/**
 * Competitions and achievements configuration
 * Add your competition achievements and awards here
 */

import type { Competition } from '../types';

export const competitions: readonly Competition[] = [
  {
    title: 'Adobe Creativity & Generative AI - Gold Category',
    description: 'National GenAI & Creative Computing Achievement',
    achievement: 'Awarded Gold Category recognition in Adobe Creativity and Generative AI for excellence in prompt engineering, media generation, and AI workflows.',
    year: '2024',
    images: [],
  },
  {
    title: 'Red Hat Enterprise Certifications',
    description: 'System Administration & Ansible Automation',
    achievement: 'Earned Red Hat Certified Enterprise Application Developer (RH294) and Red Hat Certified System Administrator (RH104) credentials.',
    year: '2024 - 2025',
    images: [],
  },
  {
    title: 'Academic Excellence Award',
    description: 'NIET Department of Computer Science (Data Science)',
    achievement: 'Ranked among top performers in B.Tech CSE (Data Science) with an outstanding cumulative CGPA of 9.05 / 10.',
    year: '2025',
    images: [],
  },
] as const;
