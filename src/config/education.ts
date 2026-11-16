/**
 * Education and courses configuration
 * Add your educational background and courses here
 */

import type { Education, Course } from '../types';

export const education: readonly Education[] = [
  {
    degree: 'Bachelor of Technology (B.Tech)',
    major: 'Computer Science & Engineering (Data Science)',
    institution: 'Noida Institute of Engineering & Technology (NIET)',
    location: 'Greater Noida, Uttar Pradesh, India',
    year: '2025 - 2029',
    description: 'Current CGPA: 9.05 / 10. Focusing on Data Science, Artificial Intelligence, Machine Learning, Data Structures & Algorithms, Statistics, and Linux Systems.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
        alt: 'NIET Campus',
        description: 'Noida Institute of Engineering & Technology',
      },
    ],
  },
] as const;

export const courses: readonly Course[] = [
  {
    title: 'Red Hat Enterprise Linux Automation with Ansible (RH294)',
    description: 'Enterprise Linux automation using Ansible, playbook development, role creation, and automated system administration.',
    institution: 'Red Hat',
    location: 'Certified',
    year: 'Sep 2026',
    images: [
      {
        url: 'https://images.credly.com/images/3a232f17-f273-4554-94c6-48c08ec2d829/RH294.png',
        alt: 'Red Hat RH294 Certification',
      },
    ],
  },
  {
    title: 'Getting Started with Linux Fundamentals (RH104)',
    description: 'Enterprise Linux fundamentals, command-line operations, user administration, storage, file systems, and system security.',
    institution: 'Red Hat',
    location: 'Certified',
    year: 'Aug 2026',
    images: [
      {
        url: 'https://images.credly.com/images/eed2cd76-0bfd-4e96-a6c8-e0473e3a479a/RHCSA.png',
        alt: 'Red Hat Fundamentals RH104',
      },
    ],
  },
  {
    title: 'Probability and Statistics using Python',
    description: 'Comprehensive statistical modeling, probability distributions, data distributions, and scientific computing with Python.',
    institution: 'Infosys Springboard',
    location: 'Certified',
    year: 'Aug 2026',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        alt: 'Probability & Statistics Python',
      },
    ],
  },
  {
    title: 'Introduction to Data Science',
    description: 'Foundations of data science, analytics methodologies, data exploration, predictive thinking, and real-world data pipelines.',
    institution: 'Cisco Networking Academy',
    location: 'Certified',
    year: 'Oct 2026',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80',
        alt: 'Cisco Introduction to Data Science',
      },
    ],
  },
  {
    title: 'Computational Problem Solving',
    description: 'Algorithmic thinking, data structures, optimization techniques, and computational complexity analysis.',
    institution: 'Infosys Springboard',
    location: 'Certified',
    year: 'Oct 2026',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        alt: 'Computational Problem Solving',
      },
    ],
  },
  {
    title: 'Gen AI 101',
    description: 'Foundations of generative artificial intelligence, LLM architectures, prompt engineering, and multimodal AI workflows.',
    institution: 'FutureSkills Prime / NASSCOM',
    location: 'Certified',
    year: 'Aug 2026',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        alt: 'Gen AI 101 NASSCOM',
      },
    ],
  },
] as const;
