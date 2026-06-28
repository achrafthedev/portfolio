export const translations = {
  en: {
    nav_skills: "Skills",
    nav_education: "Education",
    nav_projects: "Projects",
    hero_greeting: "Hi, I'm",
    hero_role: "CTO & Tech Lead",
    hero_subtitle: "Full-Stack Software Architect",
    hero_desc: "I design highly available, scalable, and privacy-first Cloud architectures. Specialized in complex project management, system optimization, and local AI integration with open-source LLMs.",
    contact_me: "Get in Touch",
    stats_projects: "Projects Delivered",
    stats_technologies: "Technologies",
    stats_experience: "Years Experience",
    stats_level: "Leadership Level",
    skills_title: "Technical Expertise",
    skills_desc: "A broad and deep toolkit built across 13+ production projects.",
    education_title: "Education & Certifications",
    education_desc: "Academic background and official degrees from HETIC, a leading French tech school.",
    status_preparing: "In Progress",
    status_obtained: "Obtained",
    verify_rncp: "Verify RNCP",
    verify_diploma: "View Certificate",
    projects_title: "Selected Projects",
    projects_desc: "A curated selection of my most impactful engineering and architecture work.",
    view_project: "View Website",
    github_repo: "View Code",
    private_project: "Private Source",
    footer_cta: "Let's Build Something Great",
    footer_cta_desc: "Have a project in mind? Let's talk about how I can help bring it to life.",
    footer_text: "© 2026 Achraf Chardoudi. All rights reserved.",
    lang_en: "EN",
    lang_fr: "FR",
  },
  fr: {
    nav_skills: "Compétences",
    nav_education: "Formation",
    nav_projects: "Projets",
    hero_greeting: "Bonjour, je suis",
    hero_role: "CTO & Tech Lead",
    hero_subtitle: "Architecte Logiciel Full-Stack",
    hero_desc: "Je conçois des architectures Cloud hautement disponibles, scalables et orientées privacy-first. Spécialisé dans la direction de projets complexes, l’optimisation système et l’intégration d’IA locales (LLMs open-source).",
    contact_me: "Me Contacter",
    stats_projects: "Projets Livrés",
    stats_technologies: "Technologies",
    stats_experience: "Ans d’Expérience",
    stats_level: "Niveau Leadership",
    skills_title: "Expertise Technique",
    skills_desc: "Un toolkit large et profond, construit à travers 13+ projets en production.",
    education_title: "Formation & Diplômes",
    education_desc: "Parcours académique et certifications officielles de HETIC, école tech de référence.",
    status_preparing: "En préparation",
    status_obtained: "Obtenu",
    verify_rncp: "Voir RNCP",
    verify_diploma: "Voir le Certificat",
    projects_title: "Sélection de Projets",
    projects_desc: "Une sélection soignée de mes travaux d’ingénierie et d’architecture les plus impactants.",
    view_project: "Voir le Site",
    github_repo: "Code Source",
    private_project: "Code Privé",
    footer_cta: "Construisons Ensemble",
    footer_cta_desc: "Un projet en tête ? Discutons de comment je peux vous aider à le réaliser.",
    footer_text: "© 2026 Achraf Chardoudi. Tous droits réservés.",
    lang_en: "EN",
    lang_fr: "FR",
  }
};

export const stats = [
  { value: '13+', key: 'stats_projects' },
  { value: '15+', key: 'stats_technologies' },
  { value: '3+', key: 'stats_experience' },
  { value: 'CTO', key: 'stats_level' },
];

export const skillCategories = [
  {
    id: 'frontend',
    title_en: 'Frontend',
    title_fr: 'Frontend',
    color: '#22d3ee',
    skills: ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js']
  },
  {
    id: 'backend',
    title_en: 'Backend',
    title_fr: 'Backend',
    color: '#a78bfa',
    skills: ['Node.js', 'Python', 'Java', 'PHP 8', '.NET', 'FastAPI', 'Spring Boot']
  },
  {
    id: 'cloud',
    title_en: 'Cloud & DevOps',
    title_fr: 'Cloud & DevOps',
    color: '#34d399',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'CI/CD', 'Nginx']
  },
  {
    id: 'data',
    title_en: 'Data & AI',
    title_fr: 'Données & IA',
    color: '#fbbf24',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'LLMs', 'Polars', 'Streamlit', 'Data Analysis']
  },
  {
    id: 'architecture',
    title_en: 'Architecture & Leadership',
    title_fr: 'Architecture & Leadership',
    color: '#f472b6',
    skills: ['System Design', 'Microservices', 'REST APIs', 'IaC', 'Agile / Scrum', 'Tech Strategy']
  }
];

export const categoryMeta = {
  fullstack:  { color: '#22d3ee', en: 'Full-Stack',        fr: 'Full-Stack' },
  cloud:      { color: '#34d399', en: 'Cloud & DevOps',    fr: 'Cloud & DevOps' },
  ai:         { color: '#fbbf24', en: 'AI & Privacy',      fr: 'IA & Privacy' },
  data:       { color: '#fbbf24', en: 'Data Engineering',  fr: 'Data Engineering' },
  systems:    { color: '#a78bfa', en: 'Systems',           fr: 'Systèmes' },
  frontend:   { color: '#3b82f6', en: 'Frontend',          fr: 'Frontend' },
  backend:    { color: '#a78bfa', en: 'Backend',           fr: 'Backend' },
  mobile:     { color: '#f472b6', en: 'Mobile',            fr: 'Mobile' },
};

export const projects = [
  {
    id: 'bitora',
    title: 'Bitora',
    category: 'fullstack',
    role_en: 'Founder & CEO',
    role_fr: 'Fondateur & CEO',
    desc_en: 'Tech agency specializing in scalable web/mobile app engineering and business process automation. Directing product strategy and bespoke software development.',
    desc_fr: 'Création d’une micro-entreprise spécialisée dans l’ingénierie d’applications web et mobiles scalables et l’automatisation de processus métiers.',
    tags: ['React', 'Node.js', 'Cloud', 'UI/UX'],
    link: 'https://bitora.fr',
    isPublic: true
  },
  {
    id: 'stud',
    title: 'Stud\'Saveurs',
    category: 'fullstack',
    role_en: 'CTO / Tech Lead',
    role_fr: 'CTO / Tech Lead',
    desc_en: 'Global ecosystem for student dining. Engineered a high-performance Next.js 15 showcase site, KFETTE online ordering platform, and a custom ERP/CRM for catering. Includes PostgreSQL DB architecture, Stripe integration, and Docker containerization.',
    desc_fr: 'Écosystème global digitalisant la restauration étudiante. Conception avec Next.js 15, PostgreSQL, Stripe et Docker. Inclus KFETTE (plateforme de commande) et un ERP/CRM sur mesure.',
    tags: ['Next.js 15', 'PostgreSQL', 'Stripe', 'Docker'],
    isPublic: false
  },
  {
    id: 'koyote',
    title: 'Koyote',
    category: 'ai',
    role_en: 'Tech Lead / Architect',
    role_fr: 'Tech Lead / Architecte',
    desc_en: '100% local data processing engine compiled into a single PyInstaller/Docker binary. Integrates llama.cpp for schema generation via offline LLMs (Llama 3 8B) and AES encryption.',
    desc_fr: 'Moteur de traitement de données 100% local. Intégration de llama.cpp pour la génération de schémas via des LLMs hors ligne (Llama 3 8B) et chiffrement AES.',
    tags: ['Angular 17+', 'FastAPI', 'Polars', 'Rust', 'LLM'],
    isPublic: false
  },
  {
    id: 'greenleaf',
    title: 'GreenLeaf Infrastructure',
    category: 'cloud',
    role_en: 'Cloud DevOps Engineer',
    role_fr: 'Ingénieur DevOps Cloud',
    desc_en: 'Fully automated Infrastructure-as-Code (IaC) project deploying Magento 2.4.7 on AWS. Features Multi-AZ architecture, Terraform provisioning (VPC, RDS, OpenSearch), and Ansible configuration.',
    desc_fr: 'Infrastructure-as-Code (IaC) automatisée pour Magento sur AWS. Architecture Multi-AZ, provisionnement via Terraform (VPC, RDS, OpenSearch) et configuration Ansible.',
    tags: ['AWS', 'Terraform', 'Ansible', 'Magento'],
    repo: 'https://github.com/achrafthedev/GreenLeaf_infra',
    isPublic: false
  },
  {
    id: 'krab',
    title: 'KRAB 3D Raytracing Engine',
    category: 'systems',
    role_en: 'C++ Developer',
    role_fr: 'Développeur C++',
    desc_en: 'High-performance raytracing engine built in C++17. Features multithreaded tile-based rendering, Lambertian/Blinn-Phong reflection models, and a dynamic JSON scene parser.',
    desc_fr: 'Moteur de raytracing physique développé en C++17. Rendu multithreadé par tuiles, modèles de réflexion (Lambertian/Blinn-Phong) et parser JSON dynamique.',
    tags: ['C++', 'Raytracing', 'Multithreading', 'CMake'],
    repo: 'https://github.com/achrafthedev/KRAB-raytracing',
    isPublic: false
  },
  {
    id: 'black-friday',
    title: 'Black Friday Survival',
    category: 'cloud',
    role_en: 'Cloud Architect',
    role_fr: 'Architecte Cloud',
    desc_en: 'Design of a highly available and scalable e-commerce infrastructure using AWS EKS (Kubernetes), Istio Service Mesh, and Terraform.',
    desc_fr: 'Conception d’une infrastructure e-commerce hautement disponible et scalable sous AWS EKS (Kubernetes), Istio et Terraform (IaC).',
    tags: ['AWS EKS', 'Kubernetes', 'Terraform', 'Istio'],
    isPublic: false
  },
  {
    id: 'ehub-artnet',
    title: 'E-Hub to Art-Net Router',
    category: 'systems',
    role_en: '.NET Developer',
    role_fr: 'Développeur .NET',
    desc_en: 'Real-time middleware translating eHuB protocol to Art-Net (DMX) for lighting control. Built with .NET 8 using async UDP sockets, GZip decompression, and Avalonia UI.',
    desc_fr: 'Middleware en temps réel traduisant le protocole eHuB vers Art-Net (DMX) pour l’éclairage. Développé en .NET 8 avec sockets UDP, décompression GZip et Avalonia UI.',
    tags: ['.NET 8', 'UDP', 'Networking', 'Avalonia UI'],
    isPublic: false
  },
  {
    id: 'shopping-trends',
    title: 'Shopping Trends Dashboard',
    category: 'data',
    role_en: 'Data Engineer / Full-Stack',
    role_fr: 'Data Engineer / Full-Stack',
    desc_en: 'Interactive dashboard analyzing Kaggle shopping trends. Features a RESTful FastAPI backend and a Streamlit frontend visualizing key KPIs and consumer behaviors.',
    desc_fr: 'Dashboard interactif analysant des tendances d’achat. Combine une API RESTful (FastAPI) et une interface visuelle (Streamlit) pour analyser les comportements clients.',
    tags: ['Python', 'FastAPI', 'Streamlit', 'Data Analysis'],
    repo: 'https://github.com/achrafthedev/shopping-trends-dashboard',
    isPublic: false
  },
  {
    id: 'dach',
    title: 'DachRentCar',
    category: 'fullstack',
    role_en: 'Full-Stack Engineer',
    role_fr: 'Ingénieur Full-Stack',
    desc_en: 'Design of a fleet management system and customer portal automating the car rental process, featuring RBAC and dynamic reporting.',
    desc_fr: 'Conception d’un système de gestion de flotte et d’un portail client automatisant le processus de location. Inclus un système de rôles RBAC et génération de rapports.',
    tags: ['PHP', 'MySQL', 'Bootstrap 5', 'RBAC'],
    isPublic: false
  },
  {
    id: 'pfe-autonomous',
    title: 'Autonomous Vehicle Control',
    category: 'mobile',
    role_en: 'Mobile Developer',
    role_fr: 'Développeur Mobile',
    desc_en: 'Mobile app to control and monitor an autonomous vehicle. Features manual remote control, line-following mode, voice control, and real-time video streaming (Cloudinary).',
    desc_fr: 'Application mobile de contrôle de véhicule. Intègre un pilotage manuel, un mode autonome, un contrôle vocal et du streaming vidéo en temps réel via Cloudinary.',
    tags: ['React Native', 'PostgreSQL', 'Video Streaming'],
    isPublic: false
  },
  {
    id: 'cohabit',
    title: 'CoHabit',
    category: 'fullstack',
    role_en: 'Full-Stack Developer',
    role_fr: 'Développeur Full-Stack',
    desc_en: 'Roommate management solution for shared expenses and tasks. Refactored backend to PHP 8.x and modernized frontend with React 18 & Redux, fully Dockerized.',
    desc_fr: 'Solution de gestion de colocation. Refactoring massif vers PHP 8.x et React 18 & Redux, avec conteneurisation complète sous Docker.',
    tags: ['PHP 8', 'React 18', 'Redux', 'Docker'],
    repo: 'https://github.com/achrafthedev/CoHabit',
    isPublic: false
  },
  {
    id: 'goalmap-angular',
    title: 'Goalmap Instance Manager',
    category: 'frontend',
    role_en: 'Frontend Developer',
    role_fr: 'Développeur Frontend',
    desc_en: 'Architected and developed a comprehensive internal dashboard for the Goalmap team. Streamlines management of corporate instances and deployments with Angular and Node.js.',
    desc_fr: 'Conception et développement d’un tableau de bord interne pour l’équipe Goalmap. Simplifie la gestion des instances et déploiements avec Angular et Node.js.',
    tags: ['Angular', 'Node.js', 'Dashboarding'],
    isPublic: false
  },
  {
    id: 'goalmap-spring',
    title: 'Goalmap Showcase Platform',
    category: 'backend',
    role_en: 'Java Developer',
    role_fr: 'Développeur Java',
    desc_en: 'Built the primary corporate showcase website for Goalmap. High-performance, SEO-optimized platform with Java 11, Spring Boot, and Thymeleaf for dynamic content.',
    desc_fr: 'Développement du site vitrine principal de Goalmap. Plateforme haute performance et optimisée SEO avec Java 11, Spring Boot et Thymeleaf.',
    tags: ['Java 11', 'Spring Boot', 'Thymeleaf', 'SEO'],
    isPublic: false
  }
];

export const diplomas = [
  {
    id: 'master',
    status: 'preparing',
    title_en: "Master's Degree: Expert in Digital & Technological Transformation",
    title_fr: "Mastère : Expert en transformation digitale et technologique",
    school: "HETIC",
    rncp_link: "https://www.francecompetences.fr/recherche/rncp/36209/",
    linkedin_link: "",
    desc_en: "Currently preparing a Master's degree equivalent (RNCP Level 7) specializing in complex systems architecture, team leadership, and digital transformation.",
    desc_fr: "En cours de préparation du mastère (Titre RNCP Niveau 7) spécialisé dans l'architecture de systèmes complexes, le leadership technique et la transformation numérique."
  },
  {
    id: 'bachelor',
    status: 'obtained',
    title_en: "Bachelor's Degree: Application Developer & Designer",
    title_fr: "Bachelor : Concepteur Développeur d'Applications",
    school: "HETIC",
    rncp_link: "https://www.francecompetences.fr/recherche/rncp/36146/",
    linkedin_link: "https://www.linkedin.com/in/achrafchardoudi/overlay/Certifications/618479261/treasury/?profileId=ACoAADePMBkBrg7mGvajd7BhXGkLAh6oMUml7Z0",
    desc_en: "Obtained degree (RNCP Level 6) focused on full-stack web development, software engineering, and application design.",
    desc_fr: "Diplôme obtenu (Titre RNCP Niveau 6) avec une spécialisation en développement web full-stack, ingénierie logicielle et conception d'applications."
  }
];
