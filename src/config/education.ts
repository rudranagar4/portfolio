/**
 * Education and courses configuration
 * Real educational background and verified certificates
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
    title: 'Industry Solve Hackathon 2026',
    description: 'Participated in a 2-phase ideathon on industry-grade product engineering, modular development, system integration, and deployable intelligent IoT systems.',
    institution: 'IIIT Delhi & STMicroelectronics (CIPD)',
    location: 'Delhi, India',
    year: 'Oct 2026',
    images: [
      {
        url: '/certificates/iiit-delhi-hackathon.jpg',
        alt: 'IIIT Delhi Industry Solve Hackathon Certificate',
      },
    ],
  },
  {
    title: 'Red Hat Enterprise Linux Automation with Ansible (RH294)',
    description: 'Enterprise Linux automation using Ansible, playbook development, role creation, and automated system administration. 32 credit hours.',
    institution: 'Red Hat',
    location: 'Certified',
    year: 'Sep 2026',
    images: [
      {
        url: '/certificates/redhat-rh294-ansible.png',
        alt: 'Red Hat RH294 Ansible Automation Certificate',
      },
    ],
  },
  {
    title: 'Adobe Creativity & GenAI (Gold Certificate)',
    description: 'Awarded Gold Category (70%+ score) assessment certification in multimodal generative AI and creative tools.',
    institution: 'FutureSkills Prime, MeitY & NASSCOM',
    location: 'Certified',
    year: 'Oct 2026',
    images: [
      {
        url: '/certificates/adobe-creativity-genai.jpg',
        alt: 'Adobe Creativity & GenAI Gold Certificate',
      },
    ],
  },
  {
    title: 'Introduction to Data Science',
    description: 'Foundations of data science, predictive thinking, exploratory analytics, and real-world data pipelines.',
    institution: 'Cisco Networking Academy',
    location: 'Certified',
    year: 'Oct 2026',
    images: [
      {
        url: '/certificates/cisco-intro-data-science.jpg',
        alt: 'Cisco Introduction to Data Science Certificate',
      },
    ],
  },
  {
    title: 'Computational Problem Solving',
    description: 'Algorithmic thinking, complexity analysis, structured problem decomposition, and optimized data structures.',
    institution: 'Infosys Springboard',
    location: 'Certified',
    year: 'Oct 2026',
    images: [
      {
        url: '/certificates/computational-problem-solving-infosys.jpg',
        alt: 'Infosys Computational Problem Solving Certificate',
      },
    ],
  },
  {
    title: 'British Council EnglishScore (CEFR B2 Upper Intermediate)',
    description: 'Certified CEFR B2 Upper Intermediate level in EnglishScore Speaking Assessment (Score: 416). Fluency: 441, Pronunciation: 432.',
    institution: 'British Council & NIET Greater Noida',
    location: 'Certified',
    year: 'May 2026',
    images: [
      {
        url: '/certificates/british-council-englishscore.jpg',
        alt: 'British Council EnglishScore Certificate',
      },
    ],
  },
  {
    title: 'Gen AI 101',
    description: 'Foundations of generative artificial intelligence, LLM architectures, prompt engineering, and multimodal AI workflows.',
    institution: 'FutureSkills Prime / NASSCOM IT-ITeS SSC',
    location: 'Certified',
    year: 'Aug 2026',
    images: [
      {
        url: '/certificates/genai-101-nasscom.jpg',
        alt: 'NASSCOM Gen AI 101 Certificate',
      },
    ],
  },
  {
    title: 'Social Internship on Child Education',
    description: '1-month social internship on child education, community engagement, and grassroots learning development.',
    institution: 'Child Welfare & Educational Society (CWES)',
    location: 'Faridabad, India',
    year: 'Jun 2026',
    images: [
      {
        url: '/certificates/cwes-social-internship.jpg',
        alt: 'CWES Social Internship Certificate',
      },
    ],
  },
] as const;
