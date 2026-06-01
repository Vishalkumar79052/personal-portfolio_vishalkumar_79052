export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  projectType: string;
  iconName: 'database' | 'box' | 'map' | 'message-square' | 'globe';
  link?: string;
}

export interface MosaicItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  link: string;
  imageAlt: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  iconName: string;
}

export interface StatItem {
  value: string;
  label: string;
}
