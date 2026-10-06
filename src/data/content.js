export const stats = [
  { label: 'Academic record', value: 'VESIT, Mumbai', detail: 'B.E. Information Technology · CGPA 9.91 / 10' },
  { label: 'Core domains', value: 'Bioinformatics & Bio-AI', detail: 'Cellular automata, neural vision, genomics pipelines' },
  { label: 'Infrastructure', value: 'Web3 & Cryptography', detail: 'Account abstraction, ZK proofs, Solidity & Rust' },
]

export const projects = [
  {
    id: 'recblock',
    code: 'SYS-01 // Distributed healthcare',
    title: 'RecBlock',
    subtitle: 'Web 2.5 decentralised EHR system',
    tags: ['Solidity', 'Polygon PoS', 'IPFS', 'React', 'Node.js', 'AES-256-GCM', 'ERC-4337'],
    github: 'https://github.com/KhushiSingh1008',
    narrative: 'A Web 2.5 architecture granting patients sovereign cryptographic ownership over health records while preserving consumer-grade usability.',
    metrics: [
      'Eliminates wallet seed phrases and gas friction via ERC-4337 Account Abstraction (Privy + Pimlico Paymaster) executing at INR 0.27 ($0.003) per transaction.',
      '1.5s average record retrieval: AES-256-GCM encrypted payloads stored on IPFS, decrypted strictly client-side, anchoring keccak256 proofs on Polygon PoS.',
    ],
  },
  {
    id: 'biotoken',
    code: 'BIO-02 // Cheminformatics & crypto',
    title: 'BioToken',
    subtitle: 'Reagent provenance & ZK verification',
    tags: ['Python', 'XGBoost', 'Solidity', 'Polygon PoS', 'ZK-SNARKs', 'FastAPI', 'RDKit'],
    github: 'https://github.com/KhushiSingh1008',
    narrative: 'End-to-end reagent custody verification from manufacturer HPLC scans to on-chain ZK proofs, mitigating biochemical counterfeits without disclosing proprietary formulations.',
    metrics: [
      'XGBoost anomaly classifier trained on 77,901 molecules (137 RDKit descriptors) detecting tampered reagents via retention-time deviation (AUC 0.9798, F1 0.9351).',
      'Dual Solidity contracts orchestrating 5 custody states with role-based access control, coupled with FastAPI async verification at $0.0087 per vial.',
    ],
  },
  {
    id: 'navisense',
    code: 'VIS-03 // Edge inference & embedded',
    title: 'NaviSense',
    subtitle: 'Inclusive visual assistance platform',
    tags: ['Flutter', 'YOLOv8n TFLite', 'Python', 'Firebase', 'Edge AI'],
    github: 'https://github.com/KhushiSingh1008',
    award: '1st Place, Hack4Innovation (VESIT × Rotary Club of Mumbai, March 2026)',
    narrative: 'Quantized neural vision pipeline running entirely offline on mobile silicon, delivering low-latency spatial guidance for visually impaired people in remote environments.',
    metrics: [
      'Zero network dependency: quantized YOLOv8n TFLite model on-device at 1 frame per 3 seconds to maximise battery life.',
      'Audio-spatial feedback loop alerting users to dynamic obstacles and elevation changes in real time.',
    ],
  },
]

export const experiences = [
  {
    role: 'Software Developer & Research Intern',
    organization: 'VJTI (Veermata Jijabai Technological Institute)',
    period: 'May 2025 – Jul 2025',
    domain: 'Medical computer vision & deep learning',
    points: [
      'Developed deep learning pipelines for automated pathology classification across MRI, CT and X-ray using TensorFlow, HuggingFace, ResNet and Vision Transformers.',
      'Evaluated models on clinical diagnostic benchmarks with full precision-recall and AUC-ROC curves.',
      'Engineered preprocessing pipelines with stochastic augmentation, intensity normalisation and class-imbalance correction.',
    ],
  },
  {
    role: 'Junior Public Relations Officer',
    organization: 'ISTE-VESIT',
    period: 'Aug 2024 – Jun 2026',
    domain: 'Institutional outreach & technical symposia',
    points: [
      'Managed communications and stakeholder coordination for 10+ technical symposiums and competitions per year.',
      'Led outreach initiatives that drove a 30% increase in cross-collegiate registrations.',
    ],
  },
  {
    role: 'Design Lead',
    organization: 'VESLit Circle',
    period: '2024 – Present',
    domain: 'Visual identity & editorial design',
    points: [
      'Directed visual identity and creative media for flagship literary publications, technical magazines and symposiums.',
    ],
  },
]

export const achievements = [
  { title: 'Winner (1st Place), Hack4Innovation', details: 'VESIT × Rotary Club of Mumbai (NaviSense Edge-AI platform)', date: 'Mar 2026', badge: '1st' },
  { title: '3rd Prize, Manthan: Deep Thinking', details: 'Aarohan 2026, VESIT Dept. Technology Day', date: 'Mar 2026', badge: '3rd' },
  { title: '2nd Runner-Up, Genesis Hackathon', details: 'AI/ML & Blockchain track (500+ registrations nationwide)', date: '2025', badge: 'R-up' },
  { title: '2nd Position, Youth Conclave', details: 'Sydenham College of Commerce and Economics, Mumbai', date: '2025', badge: '2nd' },
]

export const certifications = [
  { title: 'AWS Academy Graduate: Cloud Foundations', issuer: 'Amazon Web Services', date: 'Oct 2025' },
  { title: 'Oracle Academy: Database Programming with SQL (90 hrs, 82%)', issuer: 'Oracle Academy', date: '2025–26' },
  { title: 'Oracle Academy: Database Design (90 hrs, 96%)', issuer: 'Oracle Academy', date: '2025–26' },
  { title: 'MathWorks Onramp: MATLAB, Machine Learning & Deep Learning', issuer: 'MathWorks', date: 'Feb 2026' },
]

export const skills = [
  { group: 'Biotech & ML', items: ['TensorFlow', 'HuggingFace', 'Vision Transformers', 'XGBoost', 'RDKit', 'YOLOv8'] },
  { group: 'Blockchain', items: ['Solidity', 'Polygon PoS', 'ERC-4337', 'ZK-SNARKs', 'IPFS'] },
  { group: 'Engineering', items: ['Python', 'Rust', 'React', 'Node.js', 'FastAPI', 'Flutter', 'Firebase', 'SQL', 'AWS'] },
]

export const contacts = [
  { label: 'Email', href: 'mailto:khushisingh10.08.2005@gmail.com', text: 'khushisingh10.08.2005@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/khushisingh0811', text: 'linkedin.com/in/khushisingh0811' },
  { label: 'GitHub', href: 'https://github.com/KhushiSingh1008', text: 'github.com/KhushiSingh1008' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/KhushiSingh1008', text: 'leetcode.com/u/KhushiSingh1008' },
]
