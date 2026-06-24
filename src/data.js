export const translations = {
  en: {
    hero_greeting: "Hi, I'm",
    hero_role: "Mastère CTO & Tech Lead | Full-Stack Software Architect",
    hero_desc: "Specialized in designing highly available, scalable, and privacy-first Cloud architectures. Expert in complex project management, system optimization, and local AI integration (open-source LLMs).",
    contact_me: "Contact Me",
    projects_title: "Selected Projects",
    projects_desc: "A curated selection of my most impactful engineering and architecture work.",
    footer_text: "© 2026 Achraf Chardoudi. All rights reserved.",
    view_project: "View Website",
    github_repo: "View Code",
    private_project: "Private Source",
    lang_fr: "Passer en Français",
    lang_en: "Switch to English",
    education_title: "Education & Certifications",
    education_desc: "Academic background and official degrees.",
    status_preparing: "In Progress",
    status_obtained: "Obtained",
    verify_rncp: "Verify RNCP",
    verify_diploma: "View Certificate",
  },
  fr: {
    hero_greeting: "Bonjour, je suis",
    hero_role: "Mastère CTO & Tech Lead | Architecte Logiciel Full-Stack",
    hero_desc: "Spécialisé dans la conception d'architectures Cloud hautement disponibles, scalables et orientées privacy-first. Expert en direction de projets complexes, en optimisation système et en intégration d'IA locales (LLMs open-source).",
    contact_me: "Me Contacter",
    projects_title: "Sélection de Projets",
    projects_desc: "Une sélection soignée de mes travaux d'ingénierie et d'architecture les plus impactants.",
    footer_text: "© 2026 Achraf Chardoudi. Tous droits réservés.",
    view_project: "Voir le Site",
    github_repo: "Code Source",
    private_project: "Code Privé",
    lang_fr: "Passer en Français",
    lang_en: "Switch to English",
    education_title: "Formation & Diplômes",
    education_desc: "Parcours académique et certifications officielles.",
    status_preparing: "En préparation",
    status_obtained: "Obtenu",
    verify_rncp: "Voir RNCP",
    verify_diploma: "Voir le Certificat",
  }
};

export const projects = [
  {
    id: 'bitora',
    title: 'Bitora',
    role_en: 'Founder & CEO',
    role_fr: 'Fondateur & CEO',
    desc_en: 'Tech agency specializing in scalable web/mobile app engineering and business process automation. Directing product strategy and bespoke software development.',
    desc_fr: 'Création d\'une micro-entreprise spécialisée dans l\'ingénierie d\'applications web et mobiles scalables et l\'automatisation de processus métiers.',
    tags: ['React', 'Node.js', 'Cloud', 'UI/UX'],
    link: 'https://bitora.fr',
    isPublic: true
  },
  {
    id: 'stud',
    title: 'Stud\'Saveurs : Écosystème Global de Restauration Étudiante',
    role_en: 'CTO / Tech Lead',
    role_fr: 'CTO / Tech Lead',
    desc_en: 'Global ecosystem for student dining. Engineered a high-performance Next.js 15 showcase site, KFETTE online ordering platform, and a custom ERP/CRM for catering. Includes PostgreSQL DB architecture, Stripe integration, and Docker containerization.',
    desc_fr: 'Écosystème global digitalisant la restauration étudiante. Conception avec Next.js 15, PostgreSQL, Stripe et Docker. Inclus KFETTE (plateforme de commande) et un ERP/CRM sur mesure.',
    tags: ['Next.js 15', 'PostgreSQL', 'Stripe', 'Docker'],
    isPublic: false
  },
  {
    id: 'koyote',
    title: 'Koyote : Privacy-First ETL Platform',
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
    role_en: 'Cloud Architect',
    role_fr: 'Architecte Cloud',
    desc_en: 'Design of a highly available and scalable e-commerce infrastructure using AWS EKS (Kubernetes), Istio Service Mesh, and Terraform.',
    desc_fr: 'Conception d\'une infrastructure e-commerce hautement disponible et scalable sous AWS EKS (Kubernetes), Istio et Terraform (IaC).',
    tags: ['AWS EKS', 'Kubernetes', 'Terraform', 'Istio'],
    isPublic: false
  },
  {
    id: 'ehub-artnet',
    title: 'High-Performance E-Hub to Art-Net Router',
    role_en: '.NET Developer',
    role_fr: 'Développeur .NET',
    desc_en: 'Real-time middleware translating eHuB protocol to Art-Net (DMX) for lighting control. Built with .NET 8 using async UDP sockets, GZip decompression, and Avalonia UI.',
    desc_fr: 'Middleware en temps réel traduisant le protocole eHuB vers Art-Net (DMX) pour l\'éclairage. Développé en .NET 8 avec sockets UDP, décompression GZip et Avalonia UI.',
    tags: ['.NET 8', 'UDP', 'Networking', 'Avalonia UI'],
    isPublic: false
  },
  {
    id: 'shopping-trends',
    title: 'Customer Shopping Trends Dashboard',
    role_en: 'Data Engineer / Full-Stack',
    role_fr: 'Data Engineer / Full-Stack',
    desc_en: 'Interactive dashboard analyzing Kaggle shopping trends. Features a RESTful FastAPI backend and a Streamlit frontend visualizing key KPIs and consumer behaviors.',
    desc_fr: 'Dashboard interactif analysant des tendances d\'achat. Combine une API RESTful (FastAPI) et une interface visuelle (Streamlit) pour analyser les comportements clients.',
    tags: ['Python', 'FastAPI', 'Streamlit', 'Data Analysis'],
    repo: 'https://github.com/achrafthedev/shopping-trends-dashboard',
    isPublic: false
  },
  {
    id: 'dach',
    title: 'Système de Gestion DachRentCar',
    role_en: 'Full-Stack Engineer',
    role_fr: 'Ingénieur Full-Stack',
    desc_en: 'Design of a fleet management system and customer portal automating the car rental process, featuring RBAC and dynamic reporting.',
    desc_fr: 'Conception d\'un système de gestion de flotte et d\'un portail client automatisant le processus de location. Inclus un système de rôles RBAC et génération de rapports.',
    tags: ['PHP', 'MySQL', 'Bootstrap 5', 'RBAC'],
    isPublic: false
  },
  {
    id: 'pfe-autonomous',
    title: 'Autonomous Vehicle Control Interface [PFE]',
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
    title: 'Goalmap Internal Instance Management',
    role_en: 'Frontend Developer',
    role_fr: 'Développeur Frontend',
    desc_en: 'Architected and developed a comprehensive internal dashboard for the Goalmap team. This tool streamlines the management of various corporate instances and deployments, utilizing Angular for a robust frontend interface and Node.js for backend synchronization.',
    desc_fr: 'Conception et développement d\'un tableau de bord interne complet pour l\'équipe Goalmap. Cet outil simplifie la gestion des différentes instances et déploiements de l\'entreprise, en utilisant Angular pour une interface robuste et Node.js pour la synchronisation.',
    tags: ['Angular', 'Node.js', 'Dashboarding'],
    isPublic: false
  },
  {
    id: 'goalmap-spring',
    title: 'Goalmap Showcase Platform',
    role_en: 'Java Developer',
    role_fr: 'Développeur Java',
    desc_en: 'Spearheaded the development of the primary corporate showcase website for Goalmap. Built a high-performance, SEO-optimized platform relying on Java 11, Spring Boot, and the Thymeleaf template engine to deliver dynamic content without a heavy database footprint.',
    desc_fr: 'Développement du site vitrine principal de Goalmap. Création d\'une plateforme haute performance et optimisée pour le SEO reposant sur Java 11, Spring Boot et le moteur de template Thymeleaf pour fournir un contenu dynamique.',
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
