export interface Experience {
  id: string | number;
  company: string;
  logo?: string | null;
  position: string;
  date: string;
  location?: string | null;
  current?: boolean;
  technologies: string[];
  achievements: string[];
  responsibilities: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Education {
  id: string | number;
  institution: string;
  degree: string;
  grade?: string | null;
  date: string;
  current?: boolean;
  createdAt?: string;
}

export interface Project {
  id: string | number;
  title: string;
  description: string;
  technologies: string[];
  icon?: string | null;
  github?: string | null;
  demo?: string | null;
  featured?: boolean;
  createdAt?: string;
}

export interface Skill {
  id: string | number;
  category: string;
  name: string;
  level: number;
  icon?: string | null;
  color?: string | null;
  createdAt?: string;
}
