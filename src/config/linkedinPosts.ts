export interface LinkedInPost {
  id: string;
  title: string;
  issuer: string;
  date: string;
  relativeTime: string;
  caption: string;
  hashtags: string[];
  imageUrl: string;
  initialLikes: number;
  initialComments: number;
  badge?: string;
}

export const linkedinPosts: readonly LinkedInPost[] = [
  {
    id: 'post-iiit-delhi-hackathon',
    title: 'Industry Solve Hackathon 2026 @ IIIT Delhi',
    issuer: 'IIIT Delhi & STMicroelectronics (CIPD)',
    date: 'October 2026',
    relativeTime: '2w • Edited • 🌐',
    caption: `🏆 Thrilled to share that I participated in the Industry Solve Hackathon 2026 hosted by Indraprastha Institute of Information Technology, Delhi (IIIT Delhi) in collaboration with STMicroelectronics & CIPD! 💡⚡

Over two rigorous hackathon phases (4th & 25th October), our focus was on solving real-world product engineering challenges—designing modular, deployable intelligent systems and integrating hardware with software pipelines.

Grateful to Dr. Anubha Gupta (HOD, ECE IIIT Delhi) and Dr. Anuj Grover (Head, CIPD) for creating an incredible platform for young engineers to innovate and push technical boundaries. Huge thanks to the mentors and fellow participants for the inspiring energy! 🚀

Onwards and upwards! ✨`,
    hashtags: ['#Hackathon', '#IIITDelhi', '#STMicroelectronics', '#ProductEngineering', '#IntelligentSystems', '#IoT', '#Engineering', '#Innovation'],
    imageUrl: '/certificates/iiit-delhi-hackathon.jpg',
    initialLikes: 84,
    initialComments: 19,
    badge: 'Hackathon Participation',
  },
  {
    id: 'post-redhat-ansible',
    title: 'Red Hat Enterprise Linux Automation with Ansible (RH294)',
    issuer: 'Red Hat',
    date: 'September 2026',
    relativeTime: '1mo • 🌐',
    caption: `🔴 Excited to announce that I have completed the Red Hat Enterprise Linux Automation with Ansible (RH294 - RHA Ver. 9.0) course by Red Hat! 🎩⚡

Automating infrastructure is no longer optional—it's foundational. Throughout this 32-hour deep-dive, I worked extensively on:
✅ Writing and orchestrating robust Ansible playbooks
✅ Modularizing deployments with Ansible Roles & Collections
✅ Multi-node enterprise configuration management
✅ Automating Linux administration, storage, and security policies

Ready to bring infrastructure-as-code and scalable Linux automation to production-grade architectures! 💻🌐`,
    hashtags: ['#RedHat', '#Ansible', '#RH294', '#Linux', '#DevOps', '#Automation', '#InfrastructureAsCode', '#SysAdmin'],
    imageUrl: '/certificates/redhat-rh294-ansible.png',
    initialLikes: 112,
    initialComments: 24,
    badge: 'Enterprise Certified',
  },
  {
    id: 'post-cwes-internship',
    title: 'Social Internship on Child Education & Community Welfare',
    issuer: 'Child Welfare & Educational Society (CWES)',
    date: 'June 2026',
    relativeTime: '4mo • 🌐',
    caption: `🌱 "The best way to find yourself is to lose yourself in the service of others."

Humbled and grateful to share that I completed a 1-month Social Internship with the Child Welfare and Educational Society (CWES) in Faridabad! 📚❤️

During this internship, I actively engaged in grassroots educational initiatives for underprivileged children, community outreach, and organizing learning workshops. 

While engineering and code build systems, empathy and social contribution build communities. This experience taught me invaluable lessons in leadership, ground realities, and human connection that no classroom ever could. 🌟`,
    hashtags: ['#SocialImpact', '#ChildEducation', '#CommunityDevelopment', '#CWES', '#GivingBack', '#YouthForChange', '#EducationForAll'],
    imageUrl: '/certificates/cwes-social-internship.jpg',
    initialLikes: 146,
    initialComments: 31,
    badge: 'Community Impact',
  },
  {
    id: 'post-adobe-genai-gold',
    title: 'Adobe Creativity & GenAI - Gold Certificate (70%+ Score)',
    issuer: 'FutureSkills Prime, MeitY & NASSCOM',
    date: 'October 2026',
    relativeTime: '3w • 🌐',
    caption: `🏅 Proud to share that I have been awarded the GOLD CERTIFICATE in 'Adobe Creativity & GenAI' accredited by FutureSkills Prime, Ministry of Electronics & IT (MeitY), and NASSCOM! ✨🎨

Scoring in the Gold Category (70%+ score), the assessment tested:
🔹 Generative AI models and multimodal asset synthesis
🔹 Creative workflow automation with modern AI tools
🔹 Prompt craftsmanship and ethical AI generation standards

Generative AI is redefining how we prototype, design, and interact with software interfaces. Super stoked to integrate these concepts into full-stack and mobile applications! 🤖🚀`,
    hashtags: ['#GenerativeAI', '#Adobe', '#NASSCOM', '#MeitY', '#FutureSkillsPrime', '#AI', '#GoldCertificate', '#MultimodalAI'],
    imageUrl: '/certificates/adobe-creativity-genai.jpg',
    initialLikes: 98,
    initialComments: 17,
    badge: 'Gold Category (70%+)',
  },
  {
    id: 'post-cisco-data-science',
    title: 'Introduction to Data Science Certification',
    issuer: 'Cisco Networking Academy',
    date: 'October 2026',
    relativeTime: '3w • 🌐',
    caption: `📊 Thrilled to share that I have officially earned my 'Introduction to Data Science' certification through the Cisco Networking Academy program! 🌐📈

As a B.Tech Computer Science (Data Science) undergraduate at NIET, diving into:
🔹 Data collection, cleansing, and analytical pipelines
🔹 Statistical exploration and feature correlation
🔹 Real-world predictive modeling and business intelligence

has provided a solid stepping stone for my advanced machine learning and data engineering coursework. Huge thanks to Cisco Networking Academy! 📉🐍`,
    hashtags: ['#DataScience', '#Cisco', '#NetworkingAcademy', '#Analytics', '#Python', '#MachineLearning', '#NIET', '#LearningJourney'],
    imageUrl: '/certificates/cisco-intro-data-science.jpg',
    initialLikes: 76,
    initialComments: 14,
    badge: 'Cisco Certified',
  },
  {
    id: 'post-british-council-englishscore',
    title: 'British Council EnglishScore - CEFR B2 Upper Intermediate (Score: 416)',
    issuer: 'British Council (Endorsed by NIET Greater Noida)',
    date: 'May 2026',
    relativeTime: '5mo • 🌐',
    caption: `🗣️ Delighted to achieve the CEFR B2 Upper Intermediate Level in the British Council EnglishScore Speaking Assessment with a score of 416! 🎙️🌍

Breakdown:
• Fluency: 441
• Pronunciation: 432
• Communication: 375

In software engineering, technical excellence must be backed by clear, persuasive communication—whether presenting architectural designs, collaborating across global time zones, or leading development scrums. 

Verified on englishscore.com/verify (Code: 71db4f2227be). Grateful to British Council and NIET Greater Noida! 🤝`,
    hashtags: ['#BritishCouncil', '#EnglishScore', '#CEFR', '#Communication', '#ProfessionalDevelopment', '#GlobalLeadership'],
    imageUrl: '/certificates/british-council-englishscore.jpg',
    initialLikes: 89,
    initialComments: 15,
    badge: 'CEFR B2 (Score: 416)',
  },
  {
    id: 'post-infosys-problem-solving',
    title: 'Computational Problem Solving Course Completion',
    issuer: 'Infosys Springboard',
    date: 'October 2026',
    relativeTime: '3w • 🌐',
    caption: `💡 "First, solve the problem. Then, write the code."

Glad to share that I have completed the 'Computational Problem Solving' course on Infosys Springboard! 🧩💻

This course sharpened my approach to:
✔️ Breaking down ambiguous problems into algorithmic building blocks
✔️ Analyzing time and space complexity with Big-O notation
✔️ Choosing optimal data structures for high-performance execution
✔️ Recursion, divide-and-conquer, and systematic debugging

Strong algorithmic fundamentals make tackling tough LeetCode problems and systems architecture that much more enjoyable! 🚀`,
    hashtags: ['#ComputationalThinking', '#Algorithms', '#ProblemSolving', '#DataStructures', '#InfosysSpringboard', '#Coding', '#ComputerScience'],
    imageUrl: '/certificates/computational-problem-solving-infosys.jpg',
    initialLikes: 68,
    initialComments: 11,
    badge: 'Infosys Springboard',
  },
  {
    id: 'post-genai-101-nasscom',
    title: 'Gen AI 101 - FutureSkills Prime & NASSCOM',
    issuer: 'FutureSkills Prime / NASSCOM IT-ITeS SSC',
    date: 'August 2026',
    relativeTime: '2mo • 🌐',
    caption: `🤖 Excited to have completed 'Gen AI 101' certified by FutureSkills Prime and the NASSCOM IT-ITeS Sector Skills Council! 🌐✨

Aligned with industry and government competency standards, this curriculum covered:
🔹 Large Language Model (LLM) architectures and training paradigms
🔹 Transformer attention mechanisms and tokenization
🔹 Prompt engineering strategies and context window dynamics
🔹 Safety, governance, and responsible deployment of AI systems

The AI landscape is moving at breakneck speed, and staying grounded in foundational theory while building hands-on is the way forward! 🚀⚡`,
    hashtags: ['#GenAI', '#NASSCOM', '#FutureSkillsPrime', '#ArtificialIntelligence', '#DeepLearning', '#ContinuousLearning', '#TechCommunity'],
    imageUrl: '/certificates/genai-101-nasscom.jpg',
    initialLikes: 91,
    initialComments: 16,
    badge: 'NASSCOM Certified',
  },
] as const;

