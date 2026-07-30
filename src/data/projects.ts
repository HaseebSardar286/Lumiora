export interface Project {
  slug: string;
  title: string;
  category: string;
  status: string;
  desc: string;
  longDesc: string;
  tags: string[];
  metrics: string;
  image: string;
  liveUrl?: string;
  screenshots: string[];
  features: string[];
  techStack: string[];
}

export const projects: Project[] = [];
