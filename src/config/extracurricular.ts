/**
 * Extracurricular activities configuration
 * Add your leadership roles and activities here
 */

import type { ExtraCurricularRole, ExtraCurricularActivity } from '../types';

export const extraCurricularRoles: readonly ExtraCurricularRole[] = [
  {
    role: 'Student Member & AI Enthusiast',
    institution: 'NIET Data Science & AI Club',
    location: 'Greater Noida, India',
    year: '2025 - Present',
    images: [],
  },
  {
    role: 'Linux & Open Source Contributor',
    institution: 'Open Source Community',
    location: 'Remote',
    year: '2024 - Present',
    images: [],
  },
] as const;

export const extraCurricularActivities: readonly ExtraCurricularActivity[] = [
  {
    title: 'Wi-Fi CSI Sensing & Privacy-First Research',
    description: 'Exploration and simulation of Channel State Information (CSI) from standard Wi-Fi routers for non-invasive indoor presence detection and human motion tracking.',
    institution: 'Independent Research & Prototyping',
    location: 'Faridabad / NIET',
    year: '2025',
    images: [],
  },
  {
    title: 'Generative AI & Career Technology Prototyping',
    description: 'Conceptualizing and building AI-driven career path recommendation systems and skill-gap analyzers (ZeroGap).',
    institution: 'Project ZeroGap',
    location: 'Faridabad / NIET',
    year: '2025',
    images: [],
  },
] as const;
