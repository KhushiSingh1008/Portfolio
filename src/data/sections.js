// Every neuron in the network maps to one section of the portfolio.
// `key` is the typewriter key that opens the section; `ink` is a darker
// version of `color` that stays legible on the notebook's cream paper.

export const HUB = {
  id: 'home',
  key: 'escape',
  label: 'Khushi Singh',
  color: '#fbf3e4',
  pos: [0, 0, 0],
  size: 0.95,
}

export const SECTIONS = [
  {
    id: 'about',
    key: 'a',
    label: 'About',
    title: 'The instinct to notice patterns',
    blurb: 'IT engineer at VESIT working where cells, code and cryptography meet.',
    color: '#9ee6cf',
    ink: '#0f766e',
    pos: [-6.2, 2.4, 1.2],
    size: 0.66,
  },
  {
    id: 'projects',
    key: 'p',
    label: 'Projects',
    title: 'Engineering & systems',
    blurb: 'Case studies across distributed consensus, molecular analysis and edge vision.',
    color: '#c4b5fd',
    ink: '#6d28d9',
    pos: [5.6, 3.1, -1.4],
    size: 0.74,
  },
  {
    id: 'experience',
    key: 'e',
    label: 'Experience',
    title: 'Field notes',
    blurb: 'Research internships, clinical machine learning and leadership.',
    color: '#a5c8f5',
    ink: '#1d4ed8',
    pos: [-3.6, -3.7, -2.6],
    size: 0.62,
  },
  {
    id: 'lab',
    key: 'l',
    label: 'Lab Notes',
    title: 'Notes in the margins',
    blurb: 'On computational biology, neuroscience and the poetic continuum.',
    color: '#f5b3cf',
    ink: '#be185d',
    pos: [4.3, -3.2, 2.5],
    size: 0.58,
  },
  {
    id: 'honors',
    key: 'h',
    label: 'Honors',
    title: 'Certifications & honors',
    blurb: 'Hackathon wins, competitive awards and verified credentials.',
    color: '#f6dc8f',
    ink: '#b45309',
    pos: [0.6, 5.6, -3.8],
    size: 0.56,
  },
  {
    id: 'resume',
    key: 'r',
    label: 'Resume',
    title: 'Curriculum vitae',
    blurb: 'Education, skills and highlights. The full PDF is one click away.',
    color: '#f9c09f',
    ink: '#c2410c',
    pos: [-7.0, -0.6, -5.2],
    size: 0.6,
  },
  {
    id: 'contact',
    key: 'c',
    label: 'Contact',
    title: 'Open a synapse',
    blurb: 'Open to research fellowships, engineering roles and long conversations.',
    color: '#a7e3b5',
    ink: '#047857',
    pos: [1.4, -5.4, -0.4],
    size: 0.54,
  },
]

export const NODES = [HUB, ...SECTIONS]

export const nodeById = (id) => NODES.find((n) => n.id === id) ?? HUB

// Axons: every section wires to the hub, plus a few cross-links so the
// network reads as a web rather than a star.
export const AXONS = [
  ...SECTIONS.map((s) => ['home', s.id]),
  ['about', 'resume'],
  ['about', 'honors'],
  ['projects', 'honors'],
  ['projects', 'lab'],
  ['lab', 'contact'],
  ['experience', 'contact'],
  ['experience', 'resume'],
]
