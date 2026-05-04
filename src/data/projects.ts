
export interface ProjectData {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  technicalDetails: string;
  features: string[];
  dataStructure?: string;
  image: string;
  gallery: string[];
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  demoCredentials?: {
    username?: string;
    password?: string;
  };
}

export const projects: ProjectData[] = [
  {
    id: "clinic-system",
    title: "Clinic System",
    category: "Medical Management",
    shortDescription: "Advanced clinic management system with patient records, appointments, and medical reporting.",
    fullDescription: "A comprehensive digital solution for medical clinics. Features include patient profile management, appointment scheduling, electronic medical records (EMR), and financial tracking.",
    problem: "Medical clinics faced challenges in managing patient flow, securing medical history, and tracking clinic finances across multiple departments. Manual record-keeping led to data loss and inefficiency.",
    solution: "We built a centralized, secure platform that streamlines the patient experience from booking to billing. The system uses real-time synchronization and AI-assisted diagnostics to assist doctors in maintaining accurate patient histories.",
    technicalDetails: "Built using React for the frontend with a modular architecture. The backend handles heavy data loads with optimized indexing. We implemented WhatsApp automation for appointment reminders and a custom ERP module for financial analytics. The system follows medical data security protocols (HIPAA-aligned principles).",
    features: [
      "Dynamic Patient EMR (Electronic Medical Records)",
      "Automated WhatsApp Appointment Reminders",
      "Financial Analytics Dashboard for Clinic Owners",
      "Multi-Doctor/Multi-Specialty Support",
      "Secure Medical Document Storage & Encryption"
    ],
    dataStructure: "Relational database schema optimized for medical records with encrypted patient identifiers. Uses a tree-based structure for specialty-specific medical forms to allow doctors to customize their input fields.",
    image: "/projects/clinic-system/الرئيسيه.png",
    gallery: [
      "/projects/clinic-system/الرئيسيه.png",
      "/projects/clinic-system/المرضي.png",
      "/projects/clinic-system/المواعيد.png",
      "/projects/clinic-system/اداره الماليه.png",
      "/projects/clinic-system/اعدادات الai.png",
      "/projects/clinic-system/واتساب.png"
    ],
    technologies: ['React', 'AI Integration', 'WhatsApp Automation', 'Medical ERP', 'Financial Analytics'],
    demoUrl: 'https://clinic-system-v2.vercel.app/',
    githubUrl: 'https://github.com/OmarAbovli/clinic-system-v2'
  },
  {
    id: "competooo",
    title: "Competooo",
    category: "EdTech Platform",
    shortDescription: "Interactive English learning platform for high school students with live sessions and gamification.",
    fullDescription: "Competooo is a comprehensive educational platform designed for 1st, 2nd, and 3rd secondary high school students. It transforms English learning into an engaging experience through gamified lessons, daily streaks, exams, and live interactive sessions with teachers.",
    problem: "Traditional learning methods often fail to engage high school students, leading to low retention and motivation. Students needed a platform that speaks their language—fun, competitive, and accessible anywhere.",
    solution: "We built a React-based platform featuring a vibrant dark mode UI, real-time quizzes, and a comprehensive dashboard for tracking progress. The system supports video lessons, PDF materials, and live streaming integration.",
    technicalDetails: "The platform leverages Vercel for high-speed delivery. The UI is built with Tailwind CSS for rapid prototyping and responsiveness. It features a custom gamification engine that tracks 'streaks' and 'competitions' using high-frequency state updates. We used WebSockets for real-time leaderboards.",
    features: [
      "Real-time Gamified Quizzes & Leaderboards",
      "Live Streaming Integration for Lessons",
      "Automated Exam Grading & Feedback",
      "PDF Material Management System",
      "Student Progress Tracking (Streaks & Badges)"
    ],
    dataStructure: "User-centric data model with high-frequency tracking for gamification elements. CDN-optimized video and document delivery for low-latency learning across different internet speeds.",
    image: "/projects/competooo-landing.png",
    gallery: [
      "/projects/competooo-dashboard.png",
      "/projects/competooo-landing.png"
    ],
    technologies: ['React', 'Vercel', 'Tailwind CSS', 'Interactive UI'],
    demoUrl: 'https://competooo.vercel.app/',
    githubUrl: 'https://github.com/OmarAbovli/EL-helal',
    demoCredentials: {
      username: 'omarabovli',
      password: '123123'
    }
  },
  {
    id: "sahl-erp",
    title: "Sahl ERP",
    category: "Enterprise System",
    shortDescription: "Comprehensive ERP system for company management, accounting, and CRM.",
    fullDescription: "Sahl ERP is a powerful business management suite that streamlines operations for companies. It integrates accounting, HR, CRM, and inventory management into a single, unified dashboard with real-time analytics.",
    problem: "Managing disconnected systems for accounting, customer relations, and HR leads to data silos and inefficiency. Companies needed a unified 'Source of Truth'.",
    solution: "We developed a modular ERP system with a dashboard-first approach. Key features include automated financial reporting, employee management, and a robust CRM for tracking sales pipelines.",
    technicalDetails: "Architecture designed for scalability with a modular micro-frontend approach. Uses high-performance data visualization libraries for financial reporting. State management is optimized for complex ERP workflows with undo/redo capabilities.",
    features: [
      "Unified Accounting & Ledger System",
      "Employee HR & Payroll Management",
      "Sales Pipeline & CRM Analytics",
      "Inventory Tracking with Real-time Updates",
      "Automated Tax & Financial Reporting"
    ],
    dataStructure: "Complex relational model with audit logging for every financial transaction. Multi-tenant architecture support allowing one instance to serve multiple branches.",
    image: "/projects/sahl-dashboard.png",
    gallery: [
      "/projects/sahl-dashboard.png"
    ],
    technologies: ['React', 'ERP Architecture', 'CRM', 'Data Visualization'],
    demoUrl: 'https://sahl-demo.vercel.app/',
    githubUrl: 'https://github.com/OmarAbovli/Sahl-v3',
    demoCredentials: {
      username: 'abdelazizmahmoudadmin280',
      password: '321321'
    }
  },
  {
    id: "bee-group",
    title: "Bee Group",
    category: "Corporate Website",
    shortDescription: "Modern corporate presence for a leading pharmaceutical company.",
    fullDescription: "A professional corporate website for Bee Group, a pharmaceutical company active in the Egyptian market since 2018. The site showcases their medical products, vision, and market presence with a clean, trustworthy aesthetic.",
    problem: "The company needed a digital presence that reflected their innovative approach to medicine and established trust with partners and patients.",
    solution: "We designed a clean, medical-themed website with golden touches to reflect quality. It features detailed product catalogs, company history, and easy contact channels.",
    technicalDetails: "Optimized for SEO and performance. Uses a custom content structure to handle extensive product listings without compromising load times. Built with accessibility in mind and high-end animations using Framer Motion.",
    features: [
      "Dynamic Pharmaceutical Product Catalog",
      "Corporate Vision & History Timeline",
      "Partner & Distributor Portal Integration",
      "Responsive Medical-themed Design",
      "Direct Inquiry & Contact Management"
    ],
    dataStructure: "Hierarchical product categorization with metadata for medical specifications. Optimized image delivery for pharmaceutical catalogs.",
    image: "/projects/bee-group-landing.png",
    gallery: [
      "/projects/bee-group-landing.png"
    ],
    technologies: ['React', 'Corporate Design', 'Responsive Web'],
    demoUrl: 'https://bee-group.vercel.app/',
    githubUrl: 'https://github.com/OmarAbovli/BEE-GROUP'
  },
  {
    id: "center-man-sys",
    title: "Center Man Sys",
    category: "Management System",
    shortDescription: "Attendance and grading system for educational centers with WhatsApp reporting.",
    fullDescription: "A specialized management system for educational centers to track student attendance, grades, and performance. It automates administrative tasks and keeps parents informed through automated reporting.",
    problem: "Manual attendance taking and reporting is time-consuming and error-prone for busy educational centers. Communicating with parents about quiz grades was a major bottleneck.",
    solution: "We built an automated system that tracks attendance via unique IDs, records quiz grades, and automatically sends performance reports to parents via WhatsApp, ensuring seamless communication.",
    technicalDetails: "The core engine handles bulk WhatsApp messaging via API integration. The frontend is designed for high-speed data entry by teachers. It includes a robust reporting engine that generates individual student performance graphs.",
    features: [
      "ID-based Quick Attendance Tracking",
      "Automated WhatsApp Parent Notifications",
      "Student Performance & Grading Analytics",
      "Teacher & Class Scheduling",
      "Bulk SMS/WhatsApp Communication Module"
    ],
    dataStructure: "Optimized for high-concurrency during peak attendance hours. Normalized schema for students, classes, and performance metrics.",
    image: "/projects/center-man-sys.png",
    gallery: [
      "/projects/center-man-sys.png"
    ],
    technologies: ['Attendance Tracking', 'WhatsApp Integration', 'Grading System', 'Bulk Messaging'],
    demoUrl: '#',
    githubUrl: 'https://github.com/OmarAbovli/center-man-sys'
  }
];
