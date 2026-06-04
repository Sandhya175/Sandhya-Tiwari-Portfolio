import { Project, Achievement, LeadershipActivity, SkillItem } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'scanalyzer',
    title: 'Scanalyzer™ Health',
    tagline: 'AI Based Health Report Analyzer',
    description: 'Advanced clinical diagnostic analysis engine leveraging deep neural models to process medical health parameters and extract clinical variables from complex lab reports with high fidelity and immediate clarity.',
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Gemini AI'],
    category: 'ai',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz0mXG-BapVJz1x9mQHpkceB7Ni4ypOezce0BrZjRhgPORMPl0KCJd1S0jkgf7WokJ_UNtWWp8U0urZqBAUh0HF1EcdKQvYRg1N8YAOZbXlYG7IhVpiZ4K4d0m8a2AixBM8k5VF-keWfhZzt06PSUtMjkOO6a0V6JX7AHHrnKYP1uvQnlib95FiGg0orU-w5NlzR26iKvQKeka6AWYjhOxMYrBdPyGXcjX9l5u4FD_fGpS4HaMULPPONXn1qpXzxxDePjfCCXEuZI',
    features: [
      'Automated health report uploading and Optical Character Recognition (OCR)',
      'Intelligent medical parameter extractions (blood metrics, levels, markers)',
      'AI Analysis offering instant, hazard-screened medical clarifications',
      'Context-aware, evidence-based recommendations and wellness guidance'
    ],
    liveUrl: 'https://scanalyzer-eight.vercel.app/',
    githubUrl: 'https://github.com/Sandhya175/Scanalyzer',
    caseStudyUrl: '#case-study-scanalyzer',
    stats: [
      { label: 'Accuracy Rate', value: '98.8%' },
      { label: 'Analysis Time', value: '< 2.4s' },
      { label: 'Parameters Screened', value: '45+' }
    ]
  },
  {
    id: 'sign-language',
    title: 'Real-Time Gesture Translator',
    tagline: 'Real Time Sign Language Detection System',
    description: 'An assistive accessibility program leveraging computer vision and light gesture neural pipelines to process real-time sign language frames into fluid textual outputs and clear synthesized speech audio.',
    technologies: ['Python', 'OpenCV', 'Machine Learning', 'TensorFlow', 'React'],
    category: 'accessibility',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIGAW8d3FM5lhfZr9jNqHwSDW-i27nhz-wvdsUpEF6laBQGOZP4MVvJv3xrO_2k8s3I7YlszB1dNfD-U9BSiOfRpuS1LUz377OK2mV9oFCVHnk_xyW5cs7S70UuiqFb4ShtFRndLa5jr24mggdE3OlSZJ4Olj6EaAy46Uu39lzTqSg9U2c5n03Ldvw_NEaJtwyf5a7l6q-0BZNDF78QrZsk82B2A5628XcP_nhvkgngyEOtbphjgfROvvICoOl5rJil9nt3VvcAxk',
    features: [
      'High-velocity sign language gesture recognition under varying lux',
      'Vocal synthesis & sound conversion for immediate multi-modal output',
      'WCAG-grounded design prioritizing lightweight accessibility configurations',
      'Sub-30ms raw edge feed execution on standard consumer webcams'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/sandhyatiwari1755/sign-language-detection',
    caseStudyUrl: '#case-study-sign',
    stats: [
      { label: 'Response Latency', value: '18ms' },
      { label: 'Vocab Coverage', value: '250+ Terms' },
      { label: 'Visual Model Weight', value: '14MB' }
    ]
  },
  {
    id: 'e-waste',
    title: 'Ether Recycle Pulse',
    tagline: 'E-Waste Monitoring & Reporting System',
    description: 'A cloud-native telemetry dashboard mapped to municipal recycling routes, enabling citizens to report electronic scrap, coordinate collection operations, and visualize neighborhood environmental metrics.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'GitHub', 'Node.js'],
    category: 'react',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyp30ozGao1VVHh53FZfaMgtNr7ThMGY7RikuGJrCHzHOSopy7nqPhiL8Cb1YaS-JkiAeEwpVEh-cG9XQi09Gl6a4LMmI5zzfXmLtH3NdBPu5gjAc824u4cP88yKXIUBDsDVDc-LYvfu_M9oqWjFllhsYpd1OKl1aakmLosjtDkS3VGaEhz9KsFmL4kMq5H5x9slWdJyE2CMNUqg17DWQShdJHqM73jMSdbwnJZhmI_DdOVserNylfGFFmKxcrPDORWISCAhvDuuM',
    features: [
      'Localized community reporting node system with precise GPS coordinates',
      'Dynamic monitoring board visualizing metric carbon reduction offsets',
      'Symmetric task allocation flows facilitating dispatchers to retrieve scraps',
      'Awareness interface detailing processing safety standards for battery items'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/sandhyatiwari1755/e-waste-monitor',
    caseStudyUrl: '#case-study-ewaste',
    stats: [
      { label: 'Scrap Processed', value: '4.2 Tons' },
      { label: 'Coordinated Collects', value: '1,240' },
      { label: 'Active Reporting Agents', value: '380+' }
    ]
  },
  {
    id: 'trippy-go',
    title: 'Trippy Go Ecosystem',
    tagline: 'High-Velocity Travel Booking Application',
    description: 'A modern, lightning-fast travel portal empowering users to construct flight schedules, toggle dynamic seat chart selections, and utilize full schema form validations for secure customer checkouts.',
    technologies: ['React', 'JavaScript', 'Tailwind', 'Framer Motion'],
    category: 'react',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcNIxiRhM8sYAk-h2aJ00CQan-3Ek1CP-sAwx3HOWpSAGFlT4eScZI2nI6c7ViAgjgcoCDoEVJYZyWk0oCANgqOd0WZvjBdKWqO4iXjKQPNT29fYG5MPefNK4dKWHvwgfX-k6bMIargSnUhm6sNUL565KduPRY2BYQ5JIqEQAGAb1BW29jJB4Gn-TcoT3SegSqGuNN5CrP5Tt6A5cdoSYq2V3agpm9nWmfru3UeGwbjRUyb1mJjGZn-AWVecrNn08xW2sXrOQly38',
    features: [
      'Isomorphic flight search filter matrix with immediate cache responses',
      'Interactive vector seat visualization with multi-aisle booking configurations',
      'Stateful reactive forms enforcing comprehensive type check validations',
      'Parallax scrolling environments for sensory travel destination profiles'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/sandhyatiwari1755/trippy-go',
    caseStudyUrl: '#case-study-trippy',
    stats: [
      { label: 'Booking Latency', value: '45ms' },
      { label: 'Form Accuracy', value: '99.9%' },
      { label: 'Client Satisfaction', value: '4.9/5.0' }
    ]
  },
  {
    id: 'scafe',
    title: 'Scafe Portal',
    tagline: 'Interactive Cafe Management System',
    description: 'A high-performance cafe administration platform integrating POS terminal registers, kitchen coordination pipelines, secure session vaults, and interactive client menu order tracking interfaces.',
    technologies: ['React', 'Tailwind', 'CSS', 'Node.js', 'Express'],
    category: 'other',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfP7jrgXvRamF4jMUgohoPXJvSQya0axqZSSs0NL-qMNQhWflqJYVG2zIEZIeunHAAW0NjeBBM0BCjZQZy4ANyb31o2jt2MLizraAMK8eSRQVR0wGHEEOO52pfG0BFlyFYn_BWQ8RX8Kb2nat7cH03JQMKi_ESTIIAix0ZyFmDSIEIyTrhb8M9sIQp78OsPC82ehJURrwj4x9hAAh9sQ0clukMfaV8Eg_xpU3x-F7aqj2JNOvs4evLyoeg1Aj-WlmJaveajkOEMrg',
    features: [
      'Interactive checkout desk syncing ticket orders instantly to chefs',
      'Stateful table allocations map coordinating reservation limits',
      'Sub-15ms client page updates using local context states',
      'Encrypted operator entry portal backed by standard web JWT payloads'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/sandhyatiwari1755/scafe-portal',
    caseStudyUrl: '#case-study-scafe',
    stats: [
      { label: 'Order Processing Speed', value: '-35%' },
      { label: 'Active Tables Coordinates', value: '18' },
      { label: 'Daily Session Transactions', value: '250+' }
    ]
  }
];

export const SKILLS_DATA: SkillItem[] = [
  // Frontend
  { name: 'React', level: 96, category: 'frontend' },
  { name: 'JavaScript', level: 94, category: 'frontend' },
  { name: 'HTML', level: 98, category: 'frontend' },
  { name: 'CSS', level: 95, category: 'frontend' },
  { name: 'Tailwind CSS', level: 97, category: 'frontend' },
  { name: 'SCSS', level: 90, category: 'frontend' },

  // Backend
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Express', level: 88, category: 'backend' },

  // Database
  { name: 'MySQL', level: 82, category: 'database' },

  // Programming
  { name: 'Python', level: 90, category: 'programming' },
  { name: 'Java', level: 78, category: 'programming' },
  { name: 'C++', level: 75, category: 'programming' },
  { name: 'C', level: 80, category: 'programming' },

  // Tools
  { name: 'Git', level: 92, category: 'tools' },
  { name: 'GitHub', level: 95, category: 'tools' },
  { name: 'Linux', level: 85, category: 'tools' },
  { name: 'Canva', level: 88, category: 'tools' }
];

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  skills: string[];
  gradient: string;
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp1',
    role: 'Web Developer Intern',
    company: 'Talent Corner HR Services',
    period: '2023 - Present',
    description: 'Engineered clean production codebases, leading layout design iterations and optimizing frontend performance streams for specialized recruitment hubs.',
    highlights: [
      'Responsive Website Development: Built fluid client interfaces accommodating strict multi-device parameters.',
      'UI Improvements: Revitalized high-traffic layouts utilizing deep grid alignments and visual micro-interactions.',
      'API Integration: Structured robust communication layers utilizing optimized asynchronous catch architectures.',
      'Bug Fixing & Optimization: Eliminated legacy state leaks, dropping web latency by 40% and boosting Core Web Vitals.'
    ],
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'API Integration', 'Profiling'],
    gradient: 'from-accent to-glow-purple'
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'ach1',
    title: 'Avishkar Zonal Finalist',
    description: 'Honored as a finalist in the prestigious state-directed Avishkar Science Competition, recognized for an innovative healthcare app design.',
    date: '2024',
    category: 'Innovation',
    icon: 'emoji_events',
    gradient: 'from-[#ccff00] to-[#82a400]',
    animationDelay: 0.1
  },
  {
    id: 'ach2',
    title: 'Code Execution Champion',
    description: 'Secured the first-place gold tier in algorithmic sprint competitions, scoring high marks for execution speed, memory footprint, and edgecase coverage.',
    date: '2023',
    category: 'Algorithms',
    icon: 'military_tech',
    gradient: 'from-[#e3b5ff] to-[#9400e4]',
    animationDelay: 0.2
  },
  {
    id: 'ach3',
    title: 'CGPA Academic Elite: 9.10',
    description: 'Maintained an outstanding cumulative academic standing within the top tier of the BSc Information Technology cohort.',
    date: '2021 - Present',
    category: 'Academics',
    icon: 'school',
    gradient: 'from-[#a5eff3] to-[#004f52]',
    animationDelay: 0.3
  },
  {
    id: 'ach4',
    title: 'Conference Organizing Coordinator',
    description: 'Coordinated academic event logistics, scheduling schedules, and streaming live broadcasts for high-profile international science panels.',
    date: '2023',
    category: 'Leadership',
    icon: 'groups',
    gradient: 'from-[#ffb4ab] to-[#9300a0]',
    animationDelay: 0.4
  }
];

export const LEADERSHIP_DATA: LeadershipActivity[] = [
  {
    id: 'lead1',
    title: 'VIBES Festival Coordinator',
    role: 'Event Lead',
    period: '2023',
    description: 'Orchestrated structural scheduling, creative designs, and resource flows for a high-intensity student cultural festival with over 1,500 participants.',
    highlights: [
      'Empowered a multi-tiered cross-functional student action committee of 45 peers',
      'Curated fluid stage schedules, ensuring perfect timing with zero transition lags',
      'Spearheaded creative media outreach campaigns resulting in record attendance'
    ],
    skills: ['Crisis Management', 'Logistics Routing', 'Strategic Comm']
  },
  {
    id: 'lead2',
    title: 'Singing Competition Coordinator',
    role: 'Stage Producer & Director',
    period: '2024',
    description: 'Directed audio configurations, contestant rosters, and jury operations for the flagship spotlight cultural singing show.',
    highlights: [
      'Engineered digital registration pipelines accommodating 120 live audition scripts',
      'Configured acoustics coordination, adjusting visual track timings on a minimal budget',
      'Secured prestigious industry vocalists to preside on the evaluation jury'
    ],
    skills: ['Sound Design', 'Scheduling Matrix', 'Sponsor Outreach']
  },
  {
    id: 'lead3',
    title: 'Hospitality Volunteer Elite',
    role: 'Representative Coordinator',
    period: '2022',
    description: 'Represented institutional hospitality squads during inter-collegiate technical symposiums, housing and tutoring distinguished guest panelists.',
    highlights: [
      'Arranged high-tier lodging arrangements, transport grids, and custom dietary requests',
      'Facilitated open networking events bridging academic pioneers with final-year peers',
      'Aided host logistics, resolving immediate emergency schedule updates seamlessly'
    ],
    skills: ['Resource Planning', 'Empathy Routing', 'Public Relations']
  }
];

export const ROADMAP_DATA = [
  { title: 'Advanced React', topic: 'React 19 Server Components, Suspense configurations, custom concurrent state layers', status: 'active', progress: 75, code: 'REACT_R_19' },
  { title: 'Backend Mastery', topic: 'Express microservice structures, PostgreSQL indexing, server performance scaling', status: 'active', progress: 50, code: 'NODE_SVC_V2' },
  { title: 'Artificial Intelligence', topic: 'Deep neural frame generation, OpenCV camera gesture filters, LLM orchestration', status: 'learning', progress: 40, code: 'NEURAL_P_04' },
  { title: 'Full Stack Integration', topic: 'Docker containers, CI/CD telemetry systems, secure OAuth user authentication', status: 'backlog', progress: 0, code: 'DEPLOY_SYS_Z' }
];

export const DEVELOP_PROCESS = [
  { step: '01', title: 'Research', desc: 'Analyzing parameters, gathering system limitations, defining WCAG access guidelines, and auditing user flows.', active: true },
  { step: '02', title: 'Planning', desc: 'Mapping state nodes, structuring modular database schemas, defining types early, and drawing visual wireframes.', active: true },
  { step: '03', title: 'Design', desc: 'Crafting high-fidelity mockups of premium dark interfaces, glowing visual curves, and micro-interactive curves.', active: true },
  { step: '04', title: 'Development', desc: 'Writing clean TypeScript, integrating optimized animation chains via motion, and deploying real analytical charts.', active: true },
  { step: '05', title: 'Testing', desc: 'Auditing screen parameters across viewports, profiling React re-renders, and validating input validation schemas.', active: false },
  { step: '06', title: 'Deployment', desc: 'Compiling bundles with esbuild, configuring standalone Node processes, and launching behind secure reverse proxies.', active: false }
];
