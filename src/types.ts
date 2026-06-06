export type TabType = 
  | 'home'
  | 'dashboard'
  | 'about'
  | 'projects'
  | 'game'
  | 'skills'
  | 'experience'
  | 'education'
  | 'achievements'
  | 'publications'
  | 'leadership'
  | 'contact';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  category: 'all' | 'ai' | 'react' | 'accessibility' | 'other';
  image: string;
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string; // Links to case study details overlay
  stats?: { label: string; value: string }[];
  impactMetrics?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  icon: string;
  gradient: string;
  animationDelay: number;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills?: string[];
  fileName?: string;
  category: string;
}

export interface LeadershipActivity {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  category: 'frontend' | 'backend' | 'database' | 'programming' | 'tools';
}
