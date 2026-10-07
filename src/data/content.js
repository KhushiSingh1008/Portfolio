export const stats = [
  { label: 'Academic record', value: 'VESIT, Mumbai', detail: 'B.E. Information Technology · CGPA 9.92 / 10 (till Sem 6) · 2023–2027' },
  { label: 'Core domains', value: 'Bioinformatics & Bio-AI', detail: 'Medical imaging, cheminformatics, neural vision' },
  { label: 'Infrastructure', value: 'Web3 & Cryptography', detail: 'Account abstraction, ZK proofs, Solidity on Polygon PoS' },
]

// Mirrors the Projects section of public/resume.pdf.
export const projects = [
  {
    id: 'biotoken',
    code: 'BIO-01 // Cheminformatics & crypto',
    title: 'BioToken',
    subtitle: 'Reagent provenance & verification',
    tags: ['Python', 'XGBoost', 'Solidity', 'Polygon PoS', 'ZK-SNARKs', 'FastAPI'],
    github: 'https://github.com/KhushiSingh1008',
    award: 'Research paper presented at IJCACI 2026, WUST, USA (Springer, in press)',
    narrative: 'An end-to-end reagent authentication pipeline from manufacturer HPLC scan to on-chain ZK proof, addressing supply chain fraud without exposing proprietary chemical data.',
    metrics: [
      'Runs at $0.0087 per vial on Polygon PoS.',
      'XGBoost anomaly classifier trained on 77,901 molecules (137 RDKit features) detects tampered reagents via HPLC retention-time deviation: AUC 0.9798, F1 0.9351, validated on 1,000 real multi-lab entries and 15 published degradation measurements.',
      '2 Solidity smart contracts manage 5 lifecycle states with role-based access control; a FastAPI backend handles webhook-based custody logging and a cross-company consensus validator.',
    ],
  },
  {
    id: 'recblock',
    code: 'SYS-02 // Distributed healthcare',
    title: 'RecBlock',
    subtitle: 'Web 2.5 decentralised EHR system',
    tags: ['Solidity', 'Polygon PoS', 'IPFS', 'React', 'Node.js', 'AES-256'],
    github: 'https://github.com/KhushiSingh1008',
    narrative: 'A Web 2.5 bridge giving patients full cryptographic ownership of their records with Web2-grade usability.',
    metrics: [
      'Eliminates wallet and gas-fee friction via ERC-4337 Account Abstraction (Privy + Pimlico Paymaster) at INR 0.27 ($0.003) per transaction.',
      '1.5s average retrieval: AES-256-GCM encrypted records stored on IPFS and decrypted locally, bypassing on-chain consensus for reads while anchoring keccak256 integrity proofs on Polygon PoS for tamper-proof audit trails.',
    ],
  },
  {
    id: 'navisense',
    code: 'VIS-03 // Edge inference & embedded',
    title: 'NaviSense',
    subtitle: 'Inclusive visual assistance platform',
    tags: ['Flutter', 'YOLOv8n TFLite', 'Python', 'Firebase'],
    github: 'https://github.com/KhushiSingh1008',
    award: '1st Place, Hack4Innovation (VESIT × Rotary Club of Mumbai, Mar 2026)',
    narrative: 'A quantized vision model running entirely on-device, built for the 70M+ visually impaired people in low-connectivity regions.',
    metrics: [
      'Quantized YOLOv8n TFLite model deployed fully on-device with zero network dependency, running real-time inference at 1 frame every 3 seconds.',
    ],
  },
]

export const experiences = [
  {
    role: 'Software Developer & Research Intern',
    organization: 'Veermata Jijabai Technological Institute (VJTI), Mumbai',
    period: 'May 2025 – Jul 2025',
    domain: 'Python, TensorFlow, HuggingFace, medical imaging',
    points: [
      'Developed deep learning models for automated disease classification from medical scans (MRI, CT, X-ray) using TensorFlow and HuggingFace; applied CNN architectures (ResNet) and vision transformers, evaluated on precision, recall and AUC-ROC.',
      'Built end-to-end Python preprocessing pipelines for medical image augmentation, normalisation and class-imbalance correction to improve generalisation across multi-class clinical datasets.',
    ],
  },
  {
    role: 'Junior Public Relations Officer',
    organization: 'ISTE-VESIT, Mumbai',
    period: 'Aug 2024 – Jun 2026',
    domain: 'Communications & technical events',
    points: [
      'Managed communications and stakeholder coordination for 10+ technical events per year, driving a 30% increase in student participation.',
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
  {
    title: 'Presented Research Paper, IJCACI 2026',
    details: '“BioToken: Decentralized Reagent Provenance & Verification using ZK-Proofs and Blockchain”, WUST, USA (Springer, in press)',
    date: 'Jul 2026',
    badge: 'Paper',
  },
  { title: 'Winner, Hack4Innovation', details: 'VESIT × Rotary Club of Mumbai (NaviSense)', date: 'Mar 2026', badge: '1st' },
  { title: '3rd Prize, Manthan: Deep Thinking', details: 'Aarohan 2026, VESIT Department Technology Day', date: 'Mar 2026', badge: '3rd' },
  { title: '2nd Runner-Up, Genesis Hackathon', details: 'AI/ML and Blockchain track, among 500+ registrations', date: '2025', badge: 'R-up' },
  { title: '2nd Position, Youth Conclave', details: 'Sydenham College of Commerce and Economics, Mumbai', date: '2025', badge: '2nd' },
]

export const certifications = [
  { title: 'Oracle Academy: Database Design (90 hrs, 96%)', issuer: 'Oracle Academy', date: '2025–26' },
  { title: 'Oracle Academy: Database Programming with SQL (90 hrs, 82%)', issuer: 'Oracle Academy', date: '2025–26' },
  { title: 'AWS Academy Graduate: Cloud Foundations', issuer: 'Amazon Web Services', date: 'Oct 2025' },
  { title: 'MathWorks Onramp Series: MATLAB, Machine Learning & Deep Learning', issuer: 'MathWorks', date: 'Feb 2026' },
]

// Mirrors the Technical Skills section of public/resume.pdf.
export const skills = [
  { group: 'Languages', items: ['Java', 'Python', 'SQL', 'JavaScript', 'C', 'Bash', 'Solidity'] },
  { group: 'Frameworks', items: ['REST APIs', 'FastAPI', 'Node.js', 'React'] },
  { group: 'Libraries & ML', items: ['TensorFlow', 'HuggingFace', 'XGBoost', 'LangChain'] },
  { group: 'Tools & other', items: ['Git', 'MySQL', 'Docker', 'MongoDB', 'Firebase', 'Polygon PoS', 'Jira', 'Postman', 'CI/CD (Jenkins)', 'GitHub Copilot'] },
]

export const contacts = [
  { label: 'Email', href: 'mailto:khushisingh10.08.2005@gmail.com', text: 'khushisingh10.08.2005@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/khushisingh0811', text: 'linkedin.com/in/khushisingh0811' },
  { label: 'GitHub', href: 'https://github.com/KhushiSingh1008', text: 'github.com/KhushiSingh1008' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/KhushiSingh1008', text: 'leetcode.com/u/KhushiSingh1008' },
]
