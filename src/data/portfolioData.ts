import { Project, Achievement, LeadershipActivity, SkillItem, CertificateItem } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'scanalyzer',
    title: 'Scanalyzer',
    tagline: 'AI-Based Health Report Analyzer',
    description: 'Developed a web-based application to analyze blood test reports and present simplified health insights. Extracted key medical parameters and categorized them into normal, high, or critical ranges for better understanding.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'API Integration'],
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    features: [
      'Developed a web-based application to analyze blood test reports and present simplified health insights.',
      'Implemented functionality to upload report images and PDFs, enabling flexible user input handling.',
      'Extracted key medical parameters and categorized them into normal, high, or critical ranges for better understanding.',
      'Designed an intuitive UI to display results with clear explanations, reducing user confusion and anxiety.',
      'Generated personalized recommendations, including diet suggestions and precautionary measures based on report values.',
      'Focused on user-centric design by simplifying complex medical data into easy-to-read formats.'
    ],
    liveUrl: 'https://scanalyzer-eight.vercel.app/',
    githubUrl: 'https://github.com/Sandhya175/Scanalyzer',
    caseStudyUrl: '#case-study-scanalyzer',
    stats: [
      'React.js', 'Node.js', 'Express.js', 'MySQL', 'API Integration'
    ].map((tech, idx) => ({ label: 'Tech Component', value: tech })),
    impactMetrics: ['OCR Processing', 'AI Analysis', 'Medical Categorization', 'Health Insights']
  },
  {
    id: 'gesture-lab',
    title: 'Gesture Lab',
    tagline: 'Hand Tracking Puzzle Game',
    description: 'An interactive computer vision-driven image puzzle solver that tracks real-time hand-landmarks and processes geometric gestures via webcam streams.',
    technologies: ['React.js', 'MediaPipe', 'Webcam API', 'Firebase', 'TypeScript'],
    category: 'accessibility',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    features: [
      'Real-time hand landmark tracking with extreme accuracy using MediaPipe Hands.',
      'Custom multi-point gesture interpretation recognizing pinch and fist commands.',
      'Dynamic puzzle grid generator with Fisher-Yates array shuffling and win checking.',
      'High-fidelity cloud leaderboard storing top scores in Firestore.',
      'Smooth micro-animations and physics-like reactive mouse cursor fallbacks.'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Sandhya175/gesture-lab',
    caseStudyUrl: '#case-study-gesture',
    stats: [
      { label: 'Tracking Engine', value: 'MediaPipe Hands' },
      { label: 'Leaderboard', value: 'Firestore DB' },
      { label: 'Control Method', value: 'Pinch Gestures' }
    ]
  },
  {
    id: 'fintrack',
    title: 'FinTrack',
    tagline: 'AI-Powered Personal Finance & Expense Tracker',
    description: 'Developed a full-stack personal finance management system that enables users to track income, monitor expenses, analyze spending patterns, and manage financial goals through an interactive dashboard.',
    technologies: ['Java', 'JSP', 'Servlets', 'JDBC', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Chart.js'],
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    features: [
      'Authentication System: Secure Login & Registration with user-specific session management.',
      'Expense Management: Complete CRUD tracking with category and payment method filters.',
      'Income Management: Recording multiple income sources and monthly logs.',
      'Interactive Dashboard: Savings calculation, spending analytics, and custom financial insights.',
      'AI Financial Recommendations: Personalized saving suggestions and spending behavior analysis.',
      'Data Visualization: Dynamic category breakdown charts and budget progress indicators.'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Sandhya175/FinTrack',
    caseStudyUrl: '#case-study-fintrack',
    stats: [
      { label: 'Backend Stack', value: 'Java Full Stack' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Analytics Chart', value: 'Chart.js' }
    ],
    impactMetrics: ['Expense Tracking', 'Budget Planning', 'AI Recommendations']
  },
  {
    id: 'sign-language',
    title: 'Real-Time Sign Language Detection & Audio Translation',
    tagline: 'Avishkar Project',
    description: 'Developed a real-time system to detect sign language gestures from live video feed and convert them into speech and text output instantly to assist hearing and speech-impaired users.',
    technologies: ['Python', 'OpenCV', 'Machine Learning', 'Text-to-Speech'],
    category: 'accessibility',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    features: [
      'Developed a real-time system to detect sign language gestures and convert them into audio output.',
      'Utilized computer vision techniques to capture and interpret hand gestures through live input.',
      'Implemented gesture recognition logic to map signs to corresponding text and speech output.',
      'Enhanced accessibility by enabling communication for hearing and speech-impaired users.',
      'Focused on real-time processing, accuracy, and usability during live demonstrations.',
      'Presented the project at Avishkar and qualified for the Zonal Final Round.'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Sandhya175/sign-language-detection',
    caseStudyUrl: '#case-study-sign',
    stats: [
      { label: 'Recognition Engine', value: 'OpenCV' },
      { label: 'Avishkar Target', value: 'Zonal Winner' },
      { label: 'Aavishkar Status', value: 'Finalist' }
    ],
    impactMetrics: ['Real-time Recognition', 'Accessibility Focus', 'Audio Translation']
  },
  {
    id: 'e-waste',
    title: 'E-Waste Monitoring System',
    tagline: 'Hackathon Team Project',
    description: 'Developed a web platform to monitor and manage e-waste awareness, reporting, and proper disposal pipelines, offering fluid community interactions and smooth data collection workflows.',
    technologies: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Git', 'GitHub'],
    category: 'react',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800',
    features: [
      'Developed a web platform to monitor and manage e-waste awareness and reporting.',
      'Built responsive and user-friendly UI components using React.js.',
      'Focused on clarity of information, smooth workflows, and error-free user interaction.',
      'Collaborated in a team environment, dividing tasks across frontend development and logic handling.',
      'Presented the solution within strict timelines during a hackathon, gaining real-world teamwork experience.'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Sandhya175/E-Waste-Monitoring-System',
    caseStudyUrl: '#case-study-ewaste',
    stats: [
      { label: 'E-Waste Nodes', value: 'Interactive Map' },
      { label: 'Event Period', value: 'Hackathon Track' },
      { label: 'Interface', value: 'Tailwind UI' }
    ]
  },
  {
    id: 'growlio',
    title: 'Growlio',
    tagline: 'Internship Team Project',
    description: 'Contributed to the development of Growlio, a React-based application designed to maximize operational data transparency and improve team organization analytics.',
    technologies: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Git'],
    category: 'react',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    features: [
      'Contributed to the development of a React-based application as part of an internship team.',
      'Worked on UI components, feature integration, and data handling.',
      'Assisted in debugging issues and improving overall usability based on feedback.',
      'Coordinated with team members to understand requirements and implement updates efficiently.'
    ],
    liveUrl: '#',
    githubUrl: '#',
    stats: [
      { label: 'Role', value: 'Team Dev' },
      { label: 'Platform', value: 'React' },
      { label: 'Deployment', value: 'Continuous delivery' }
    ]
  },
  {
    id: 'trippy-go',
    title: 'Trippy Go',
    tagline: 'Group Project',
    description: 'Designed and developed flight booking features in a Travel website, creating an intuitive UI and seamless user experience with destination listings, responsive seat charts, and form validation.',
    technologies: ['React.js', 'HTML', 'CSS', 'SCSS', 'JavaScript'],
    category: 'react',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
    features: [
      'Designed and developed flight booking features in a Travel website, creating an intuitive UI and seamless user experience for travelers.',
      'Implemented key features such as destination listings, seat selection, and form validation to enhance functionality and usability.',
      'Utilized React.js, SCSS, and JavaScript to build responsive components, ensuring efficient and visually appealing interfaces.'
    ],
    liveUrl: '#',
    githubUrl: '#',
    stats: [
      { label: 'UI Prep', value: 'SCSS' },
      { label: 'Responsive', value: 'Fully Grid' },
      { label: 'Features', value: 'Seat Map' }
    ]
  },
  {
    id: 'safar',
    title: 'Safar',
    tagline: 'Web Development Project',
    description: 'Safar is a comprehensive travel management website aimed at helping users plan trips and manage travel expenses efficiently, integrating responsive design structures and multimedia views.',
    technologies: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Create React App'],
    category: 'react',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
    features: [
      'Developed Safar, a travel management website aimed at helping users plan trips and manage travel expenses.',
      'Implemented key features such as a Responsive design and multimedia integration, improving user engagement and overall experience.',
      'Leveraged Create React App for streamlined development, enabling efficient build processes, testing, and deployment.'
    ],
    liveUrl: '#',
    githubUrl: '#',
    stats: [
      { label: 'Stack', value: 'CRA Template' },
      { label: 'Styles', value: 'CSS3 Modules' },
      { label: 'Target', value: 'Expense Tracker' }
    ]
  },
  {
    id: 'scafe',
    title: 'Scafe',
    tagline: 'Web Development Project',
    description: 'Scafe coordinates operations for a modern cafe including menu listing displays and customer orders, backed by a self-directed secure system login audit that eliminates auth loopholes.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'other',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    features: [
      'The Scafe project includes features for managing a cafe\'s operations, such as menu listings, order management, and customer interactions, providing an efficient and user-friendly experience.',
      'Led an initiative to implement a secure login system, identifying and addressing security vulnerabilities to enhance user data protection.',
      'Scafe includes interactive elements that create a seamless experience, such as smooth navigation, visual feedback on selections, and accessible design components that elevate the overall user experience.'
    ],
    liveUrl: '#',
    githubUrl: '#',
    stats: [
      { label: 'Language', value: 'Vanilla JS' },
      { label: 'Auth Sec', value: 'Validated Login' },
      { label: 'Speed', value: 'Absolute Static' }
    ]
  },
  {
    id: 'library-mgmt',
    title: 'Library Management System',
    tagline: 'Python GUI Project',
    description: 'An elegant desktop workflow system to register library books, log active student cards, and trigger validation checks, built with Tkinter and SQLite.',
    technologies: ['Python', 'Tkinter', 'SQLite'],
    category: 'other',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800',
    features: [
      'Designed and maintained application workflows for book and user management.',
      'Debugged functional issues and ensured data consistency using SQLite.',
      'Handled system logic, validations, and error scenarios.'
    ],
    liveUrl: '#',
    githubUrl: '#',
    stats: [
      { label: 'Database', value: 'SQLite3' },
      { label: 'Visual Interface', value: 'Tkinter' },
      { label: 'Platform', value: 'Python Desktop' }
    ]
  },
  {
    id: 'mobilitymate',
    title: 'MobilityMate Smart Wheelchair',
    tagline: 'IoT Project',
    description: 'A hardware-software IoT solution controlled via gamepad or mobile devices, supporting individuals with physical challenges to navigate smoothly and safely.',
    technologies: ['Arduino', 'Bluetooth Communication', 'Motor Control', 'Power Management'],
    category: 'other',
    image: 'https://images.unsplash.com/photo-1544006659-f0840bb71047?auto=format&fit=crop&q=80&w=800',
    features: [
      'Developed a Bluetooth-enabled wheelchair controlled via a gamepad or mobile app, enhancing mobility for individuals with physical challenges.',
      'Designed the system using Arduino UNO, HC-05 Bluetooth module, L298N motor driver, and BO motors for smooth and precise navigation.',
      'Integrated a 12V rechargeable battery and a sturdy base, ensuring stable power supply and long-term durability.',
      'Focused on user-friendly design and safety, enabling easy and efficient movement in multiple directions.'
    ],
    liveUrl: '#',
    githubUrl: '#',
    stats: [
      { label: 'Controller Board', value: 'Arduino UNO' },
      { label: 'RF module', value: 'HC-05 Bluetooth' },
      { label: 'Motor Driver', value: 'L298N Channel' }
    ]
  }
];

export const SKILLS_DATA: SkillItem[] = [
  // Frontend
  { name: 'React.js', level: 96, category: 'frontend' },
  { name: 'JavaScript', level: 94, category: 'frontend' },
  { name: 'HTML5', level: 98, category: 'frontend' },
  { name: 'CSS3', level: 95, category: 'frontend' },
  { name: 'Tailwind CSS', level: 97, category: 'frontend' },

  // Backend
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Express', level: 88, category: 'backend' },
  { name: 'Axios', level: 90, category: 'backend' },

  // Database
  { name: 'MySQL', level: 88, category: 'database' },
  { name: 'Database Queries', level: 84, category: 'database' },

  // Programming
  { name: 'Python', level: 90, category: 'programming' },
  { name: 'C Language', level: 85, category: 'programming' },
  { name: 'Java', level: 82, category: 'programming' },
  { name: 'C++', level: 78, category: 'programming' },

  // Tools
  { name: 'Prompt Engineering', level: 95, category: 'tools' },
  { name: 'Generative AI', level: 92, category: 'tools' },
  { name: 'OpenCV & MediaPipe', level: 88, category: 'tools' },
  { name: 'Figma Design', level: 80, category: 'tools' },
  { name: 'GitHub', level: 92, category: 'tools' },
  { name: 'Postman API Testing', level: 85, category: 'tools' },
  { name: 'Canva', level: 90, category: 'tools' },
  { name: 'Photography', level: 88, category: 'tools' },
  { name: 'Video Editing', level: 85, category: 'tools' }
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
    company: 'Talent Corner HR Services Pvt Ltd',
    period: 'Apr 2025 - Jul 2025',
    description: 'Worked as a full-stack web development intern executing frontend, backend, UI/UX observation, and live hosting deployments from scratch.',
    highlights: [
      'Built responsive user interfaces in React.js, handling functional components, state, custom routing, and form validations.',
      'Developed RESTful APIs using Node.js and Express, integrated seamlessly with frontend layers using Axios.',
      'Designed and managed MySQL databases including tables structure schemas, complex queries, and unified data flows.',
      'Tested REST API functionality using Postman and deployed live code safely to Vercel (frontend) and Render (backend) pipelines.'
    ],
    skills: ['React.js', 'Node.js', 'Express', 'MySQL', 'Axios', 'Postman', 'Vercel', 'Render', 'Figma'],
    gradient: 'from-accent to-glow-purple'
  },
  {
    id: 'exp2',
    role: 'Head of Logistics Committee',
    company: 'Sheth L.U.J. and Sir M.V. College',
    period: 'Jun 2025 - Present',
    description: 'Serving as the Chief of Logistics on-site, managing structural coordinate scheduling, resources allotment, and student action committees.',
    highlights: [
      'Empowered cross-functional volunteer departments to organize academic seminars and intercollegiate events.',
      'Coordinated VIBES cultural festival singing contests, supervising lineups, scheduling registries, and system setup.',
      'Contributed comprehensive plant descriptions and photos to the officially utilized College Green Campus Audit project.'
    ],
    skills: ['Event Management', 'Team Coordination', 'Logistics Routing', 'Strategic Comm', 'Auditing'],
    gradient: 'from-[#ccff00] to-[#82a400]'
  },
  {
    id: 'exp3',
    role: 'Space Intern',
    company: 'Agnirva.com Space Community',
    period: 'Apr 2025 - Jun 2025',
    description: 'Completed an intensive 8-week space internship recognized by AICTE under expert ISRO-registered space tutors.',
    highlights: [
      'Completed over 440+ research learning steps and 80+ hours of dedicated space mechanics and telemetry workouts.',
      'Received foundational training on spacecraft launch vehicles, orbital mechanics, and space technology layouts.',
      'Developed analytical problem-solving and telemetry modeling skills relevant to physical aerospace pipelines.'
    ],
    skills: ['Aerospace Systems', 'Orbital Mechanics', 'Analytical STEM', 'Research Formulation'],
    gradient: 'from-[#e3b5ff] to-[#9400e4]'
  },
  {
    id: 'exp4',
    role: 'Young Innovator Intern',
    company: 'Scaler School of Technology',
    period: 'Apr 2024 - Jun 2024',
    description: 'Selected for the prestigious tech and marketing academy challenge under industry tech founders.',
    highlights: [
      'Leveraged advanced prompt engineering techniques and machine logic to build rapid AI no-code integrations.',
      'Designed custom websites, integrated intelligent web conversational chatbots, and coded active Chrome plug-ins.',
      'Polished expert modular portfolios to highlight visual design parameters and showcase technical capabilities.'
    ],
    skills: ['Generative AI', 'Prompt Engineering', 'Prototyping', 'Personal Branding', 'Chrome Plug-ins'],
    gradient: 'from-[#a5eff3] to-[#004f52]'
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'ach1',
    title: 'Aavishkar Research Zonal Winner',
    description: 'Won the University of Mumbai Zonal Round and selected for the Final Round with "Real-Time Sign Language Detection and Audio Translation on Video Call".',
    date: '2025 - 2026',
    category: 'Innovation',
    icon: '🏆',
    gradient: 'from-[#ccff00] to-[#82a400]',
    animationDelay: 0.1
  },
  {
    id: 'ach2',
    title: 'Published Scientific Paper Author',
    description: 'First author on "Real-Time Sign Language Detection and Audio Translation on Video Call", published in the International Journal of Advance and Innovative Research (IJAIR).',
    date: '2026',
    category: 'Academic Research',
    icon: '📄',
    gradient: 'from-[#e3b5ff] to-[#9400e4]',
    animationDelay: 0.2
  },
  {
    id: 'ach3',
    title: 'Guinness World Record Participant',
    description: 'Awarded credentials for participating in the official Guinness World Records attempt organized by L’Oréal Paris India.',
    date: '2025',
    category: 'World Record',
    icon: '🎖️',
    gradient: 'from-[#a5eff3] to-[#004f52]',
    animationDelay: 0.3
  },
  {
    id: 'ach4',
    title: 'Academic Elite (CGPA: 9.10/10)',
    description: 'Maintained an outstanding cumulative grade standing in the Bachelor of Science in Information Technology class.',
    date: '2023 - Present',
    category: 'Academics',
    icon: '🎓',
    gradient: 'from-[#ffb4ab] to-[#9300a0]',
    animationDelay: 0.4
  },
  {
    id: 'ach5',
    title: 'Code Execution Finalist',
    description: 'Reached the grand finals competing in C language, and reached the semi-finals in the Java programming league.',
    date: '2025',
    category: 'Algorithms',
    icon: '🥇',
    gradient: 'from-[#ffd8b4] to-[#f39c12]',
    animationDelay: 0.5
  }
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'cert_aavishkar_merit',
    title: '20th Aavishkar Research Zonal Round Winner Merit Certificate',
    issuer: 'University of Mumbai',
    date: '2025 - 2026',
    category: 'Research & Innovation',
    fileName: 'aavishkar-students-merit-certificate-25-26-zonal-round-winner.jpg',
    skills: ['Sign Language Recognition', 'Human-Computer Interaction', 'Academic Research', 'Presentation']
  },
  {
    id: 'cert_aavishkar_part',
    title: '20th Aavishkar Research Convention Participation',
    issuer: 'University of Mumbai',
    date: '2025 - 2026',
    category: 'Research & Innovation',
    fileName: 'aavishkar-students-participation-certificate-25-26.jpg',
    skills: ['Scientific Method', 'Sign Language Audio Translation', 'Hardware-Software Interfacing']
  },
  {
    id: 'cert_sig_lang_letter',
    title: 'Selection Letter for Sign Language Project (State Round Selection)',
    issuer: 'University of Mumbai - Aavishkar Board',
    date: '2025 - 2026',
    category: 'Official Selection',
    fileName: 'selection-letter-for-sign-language.pdf',
    skills: ['Project Excellence', 'Technical Reporting', 'State NOMINATION']
  },
  {
    id: 'cert_aavishkar_final_poster',
    title: '20th Aavishkar Research Convention (Final Round Certificate Poster)',
    issuer: 'University of Mumbai',
    date: '2025 - 2026',
    category: 'Research & Innovation',
    fileName: '20th-aavishkar-research-convention-final-round.jpg',
    skills: ['Research Convention finalist', 'Academic Defense', 'Visual Reporting']
  },
  {
    id: 'cert_aavishkar_zonal_poster',
    title: '20th Aavishkar Research Convention (Zonal Round Winner Announcement Poster)',
    issuer: 'University of Mumbai',
    date: '2025 - 2026',
    category: 'Research & Innovation',
    fileName: '20th-aavishkar-research-convention-zonal-round-winner.jpg',
    skills: ['Zonal Round Champion', 'Peer Review Excellence', 'Data Visualization']
  },
  {
    id: 'cert_guinness',
    title: 'Participated in Guinness World Records™ Official Attempt by L\'Oreal Paris',
    issuer: 'Guinness World Records',
    date: 'Mar 2025',
    category: 'World Record',
    fileName: 'guinness-world-record.jpg',
    skills: ['World Record Participation', 'Community Advocacy', 'Collective Impact']
  },
  {
    id: 'cert_prompt',
    title: 'Mastering Prompt Engineering Certificate',
    issuer: 'SHETH L.U.J AND SIR M.V. COLLEGE',
    date: 'Dec 2024',
    category: 'Generative AI',
    fileName: 'mastering-prompt-engineering.jpg',
    skills: ['Prompt Engineering', 'Generative AI', 'LLM Querying', 'Model Alignment']
  },
  {
    id: 'cert_knowledge',
    title: 'Knowledge Sharing Seminar Speaker Certificate',
    issuer: 'SHETH L.U.J AND SIR M.V. COLLEGE',
    date: 'Jul 2024',
    credentialId: '20242501',
    category: 'Academic Outreach',
    fileName: 'knowledge-sharing-week-2025-26.png',
    skills: ['Presentation Skills', 'Group Discussion Skills', 'Technical Writing']
  },
  {
    id: 'cert_biz_analyst',
    title: 'What Is Business Analysis? Certification',
    issuer: 'LinkedIn',
    date: 'Aug 2024',
    credentialId: '7aab892ffcb4071b5f398ed7a238ba97acbddd62bc63edfe3848bd4e19a4f0bd',
    category: 'Business Systems',
    fileName: 'international-institute-of-business-analysis-iiba.jpg',
    skills: ['Business Analysis', 'Systems Requirements', 'Product Lifecycle Flow']
  },
  {
    id: 'cert_cmca',
    title: 'Children\'s Movement for Civic Awareness Workshop Volunteer Certificate',
    issuer: 'CMCA (Children\'s Movement for Civic Awareness)',
    date: 'Jan 2024',
    category: 'Social Impact',
    fileName: 'cmca-workshop-certificate.jpg',
    skills: ['Community Engagement', 'Networking', 'Social Responsibility']
  },
  {
    id: 'cert_adani',
    title: 'Industrial Visit & Technological Training',
    issuer: 'Adani Power',
    date: 'Feb 2024',
    credentialId: 'UDAAN-2024-4040',
    category: 'Industrial Exposure',
    fileName: 'adani-sandhya-industrial-visit-certificate.jpg',
    skills: ['Power Systems', 'Industrial Operations', 'High-Scale Auditing']
  },
  {
    id: 'cert_tcs_career',
    title: 'TCS iON Career Edge - Young Professional Credential',
    issuer: 'Tata Consultancy Services',
    date: 'Jul 2024',
    credentialId: '119854-25034398-1016',
    category: 'Professional Grooming',
    fileName: 'sandhya-tiwari-tcs-ion-career-edge-young-professional-certificate.png',
    skills: ['Effective Email Writing', 'Accounting Fundamentals', 'Business Communication']
  },
  {
    id: 'cert_tcs_presentation',
    title: 'Presentation Skills Official Training',
    issuer: 'Tata Consultancy Services',
    date: 'Oct 2023',
    category: 'Soft Skills',
    fileName: 'tcs-presentation-skills.jpg',
    skills: ['Visual Design Principles', 'Public Interactivity']
  },
  {
    id: 'cert_tcs_comm',
    title: 'Communication Skills Professional Standard',
    issuer: 'Tata Consultancy Services',
    date: 'Nov 2023',
    category: 'Communication',
    fileName: 'tcs-communication-skills.png',
    skills: ['Interpersonal Correspondence', 'Professional Writing']
  },
  {
    id: 'cert_sql_intermediate',
    title: 'SQL Practice: Intermediate Queries',
    issuer: 'LinkedIn',
    date: 'Oct 2023',
    category: 'Databases',
    fileName: 'sql-practice-intermediate-queries.jpg',
    skills: ['SQL', 'Database Queries', 'Aggregate Subqueries']
  },
  {
    id: 'cert_pmi',
    title: 'Project Management Foundation Training Certificate',
    issuer: 'Project Management Institute (PMI)®',
    date: '2024',
    category: 'Business Systems',
    fileName: 'project-management-institute-pmi.jpg',
    skills: ['Project Lifecycle', 'Scope Planning', 'Agile Methodologies']
  },
  {
    id: 'cert_genai_essentials',
    title: 'Career Essentials in Generative AI Professional Certificate',
    issuer: 'Microsoft & LinkedIn',
    date: 'Sep 2023',
    category: 'AI / Ethics',
    fileName: 'career-essentials-in-generative-ai-by-microsoft-and-linkedin.jpg',
    skills: ['Computer Ethics', 'Artificial Intelligence (AI)', 'Generative Models']
  },
  {
    id: 'cert_intro_ai',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'LinkedIn',
    date: 'Sep 2023',
    category: 'Artificial Intelligence',
    fileName: 'introduction-to-artificial-intelligence-2023.jpg',
    skills: ['Artificial Intelligence', 'Computational Logic', 'Symbolic Systems']
  },
  {
    id: 'cert_copilot',
    title: 'Microsoft 365 Copilot First Look Professional Certificate',
    issuer: 'LinkedIn',
    date: 'Sep 2023',
    category: 'Productivity',
    fileName: 'microsoft-365-copilot-december-2023.jpg',
    skills: ['Microsoft Office', 'Copilot Integration', 'Workspace Automation']
  },
  {
    id: 'cert_dlle',
    title: 'DLLE Extension Work Academic Scholar Certificate',
    issuer: 'University of Mumbai',
    date: '2024 - 2025',
    category: 'Social Impact',
    fileName: 'dlle-certificate-tiwari-sandhya-vijay-meena.jpg',
    skills: ['120+ Hours of Extension Work', 'Information Technology Activities', 'Industry Orientation Research', 'Entrepreneurship Guidance', 'Women Empowerment Seminars', 'Population Survey Analysis']
  },
  {
    id: 'cert_talent_corner',
    title: 'Technical Web Developer Internship Certification',
    issuer: 'Talent Corner HR Services Pvt Ltd',
    date: 'Apr 2025 - Jul 2025',
    category: 'Industry Experience',
    fileName: 'internship-experience-at-talent-corner-hr-services-pvt-ltd.jpg',
    skills: ['React.js Development', 'Express Server Integration', 'MySQL Querying', 'API testing with Postman', 'Vercel Deployment']
  },
  {
    id: 'cert_vibes_sing_lead',
    title: 'VIBES Festival Singing Lead Coordinator Appreciation Certificate',
    issuer: 'Sheth L.U.J. and Sir M.V. College',
    date: '2025 - 2026',
    category: 'Arts / Leadership',
    fileName: 'singing-co-ordinator-at-vibes-wings-of-joy-2025-26.jpg',
    skills: ['Cultural Event Leadership', 'Vocal Competition Logistics', 'Team Allotment']
  },
  {
    id: 'cert_singing_competition_coordinator',
    title: 'Coordinator for Singing Competition Excellence Certificate',
    issuer: 'Sheth L.U.J. and Sir M.V. College',
    date: '2025',
    category: 'Arts / Leadership',
    fileName: 'coordinator-for-the-singing-competition.jpg',
    skills: ['Competition Flow Sequencing', 'Judges Panel Management', 'Audiences Logistics']
  },
  {
    id: 'cert_coding_c_final',
    title: 'Coding Execution Championship 2025: C Programming Grand Finalist',
    issuer: 'Technical Events Syndicate',
    date: '2025',
    category: 'Competitive Programming',
    fileName: 'coding-execution-championship-2025-c-programming-final-stage.jpg',
    skills: ['C Advanced Syntax', 'Dynamic Allocation Logic', 'Algorithm Efficiency Parsing']
  },
  {
    id: 'cert_coding_c_semifinal',
    title: 'Coding Execution Championship 2025: C Programming Semi-Finalist',
    issuer: 'Technical Events Syndicate',
    date: '2025',
    category: 'Competitive Programming',
    fileName: 'coding-execution-championship-2025-c-programming-semi-final-stage.jpg',
    skills: ['C Pointer Arithmetic', 'File I/O Parsing', 'Recursive Routines']
  },
  {
    id: 'cert_coding_c_championship',
    title: 'Coding Execution Championship 2025: C Programming Merit Achiever',
    issuer: 'Technical Events Syndicate',
    date: '2025',
    category: 'Competitive Programming',
    fileName: 'coding-execution-championship-2025-c-programming.jpg',
    skills: ['Core C Structs', 'Iterative Speed Optimization']
  },
  {
    id: 'cert_coding_java_stage1',
    title: 'Coding Execution Championship 2025: Java 1st Stage Qualifier',
    issuer: 'Technical Events Syndicate',
    date: '2025',
    category: 'Competitive Programming',
    fileName: 'coding-execution-championship-2025-java-1st-stage.jpg',
    skills: ['Java Core VM Principles', 'Class Implementations']
  },
  {
    id: 'cert_coding_java_semifinal',
    title: 'Coding Execution Championship 2025: Java Semi-Finalist Status',
    issuer: 'Technical Events Syndicate',
    date: '2025',
    category: 'Competitive Programming',
    fileName: 'coding-execution-championship-java-semi-final-stage.jpg',
    skills: ['Exception Interception', 'Polymorphic Structs', 'Interface Designs']
  },
  {
    id: 'cert_green_audit_proj',
    title: 'College Green Campus Audit Project Plant Dataset Analyst',
    issuer: 'Eco Department & Principal Board',
    date: '2024 - 2025',
    category: 'Sustainability',
    fileName: 'college-green-audit-project-2024-25-certificate.jpg',
    skills: ['Plant Curation Metadata', 'QR Dataset Deployment', 'Field Photography Assets']
  },
  {
    id: 'cert_scientific_journal',
    title: 'Scientific Research Article Publication Credential in IJAIR Journal',
    issuer: 'International Journal of Advance and Innovative Research',
    date: '2026',
    category: 'Research & Innovation',
    fileName: 'icmvlu21-sandhya.jpg',
    skills: ['Scientific Writing', 'Academic Publication Research', 'Peer Review Defences']
  },
  {
    id: 'cert_ipr_seminar_glimpses',
    title: 'National Seminar Board: Glimpses on Intellectual Property Rights Scholar',
    issuer: 'National IPR Committee',
    date: '2025',
    category: 'IPR / Academics',
    fileName: 'glimpses-on-intellectual-property-rights.jpg',
    skills: ['Patenting Workflows', 'Copyright Infringement Auditing']
  },
  {
    id: 'cert_ipr_seminar_host',
    title: 'Principal Host & MC National Seminar: Intellectual Property Rights',
    issuer: 'Sheth L.U.J. and Sir M.V. College',
    date: '2025',
    category: 'Arts / Leadership',
    fileName: 'host-of-glimpses-on-intellectual-property-rights.jpg',
    skills: ['Anchoring & Host Protocols', 'Stage Management Coordination', 'Dialogue Moderation']
  }
];

export const LEADERSHIP_DATA: LeadershipActivity[] = [
  {
    id: 'lead_vibes_sing',
    title: 'VIBES Festival Lead Coordinator',
    role: 'Vibes Singing Co-ordinator',
    period: 'Jan 2025 - Jun 2025',
    description: 'Chosen as Coordinating Lead for VIBES intercollegiate cultural singing contests and environmental "Go Green" tracks.',
    highlights: [
      'Organized auditions, schedules, and judge evaluations for over 120+ student competitors.',
      'Managed stage logistics, microphone configurations, and timely communication metrics.',
      'Granted Certificate of Appreciation by Principal Dr Mahendra K. for team coordination excellence.'
    ],
    skills: ['Event Coordination', 'Acoustics Configuration', 'Talent Logistics']
  },
  {
    id: 'lead_logistics',
    title: 'Head of Logistics Committee',
    role: 'Logistics Head',
    period: 'Jun 2025 - Present',
    description: 'Chief of Logistics on-site managing resource pipelines, transport schedules, workspace preparations, and coordinating committee members.',
    highlights: [
      'Empowered cross-functional volunteer departments to organize academic seminars and cultural fests.',
      'Supervised complete on-site coordination, physical setups, sound checkups, and registry desks.',
      'Planned resource flow charts with 100% schedule synchronization and zero-latency transition metrics.'
    ],
    skills: ['Logistics Management', 'Resource Allotment', 'Team Coordination']
  },
  {
    id: 'lead_hosting',
    title: 'IPR National Seminar Anchor',
    role: 'Hosting & Anchoring',
    period: '2025',
    description: 'Served as principal anchor and host of the elite collegiate national seminar on Intellectual Property Rights under industry keynote speaker Dr Arun Raaza.',
    highlights: [
      'Orchestrated seamless audience flow, introducing complex topics such as Patents, Copylights, and Trademark registries.',
      'Maintained professional audience engagement and tight transition loops throughout the elite seminar series.',
      'Tapped core communication and public presentation skillsets under direct guidance of professors Rohini Jagadale and Sumit Tripathi.'
    ],
    skills: ['Public Speaking', 'Intellectual Property Concepts', 'Event Anchoring']
  },
  {
    id: 'lead_hackathon',
    title: 'E-Waste Monitoring Hackathon Project Lead',
    role: 'Hackathon Coordinator & Front-End Team Anchor',
    period: '2024',
    description: 'Spearheaded team coordination during an intensive web development hackathon, structuring tasks and presentation pacing to engineer a fully operational environmental reporter platform.',
    highlights: [
      'Managed task allocation between frontend components and dataset mapping under strict timelines.',
      'Led the team coordination and engineered the presentation pitches for evaluation juries.',
      'Designed a responsive e-waste awareness portal to bridge the municipal recycling gap efficiently.'
    ],
    skills: ['Project Leadership', 'Fast Prototyping', 'Interactive Presenting']
  },
  {
    id: 'lead_green_audit',
    title: 'College Green Audit plantation dataset',
    role: 'Plant Audit Analyst',
    period: '2024 - 2025',
    description: 'Helped build the official campus plantation datasets utilizing digital asset captures.',
    highlights: [
      'Captured high-resolution photographs of plants, scanning and tagging them with QR information codes.',
      'Created and structured plant description datasets currently hosted on the college official domain.',
      'Optimized green records access, contributing directly to institutional sustainability awareness.'
    ],
    skills: ['Plant Curation', 'QR Systems', 'Collaborative Audits']
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
