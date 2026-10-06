import { achievements, certifications, contacts, experiences, projects, skills, stats } from '../data/content'

function About() {
  return (
    <>
      <p className="lede">
        I am a third-year B.E. Information Technology student at VESIT, Mumbai, with a CGPA of <strong>9.92 / 10</strong> through
        Semester 6. My work sits where distributed systems, artificial intelligence and biological computing meet.
      </p>
      <p>
        I treat algorithmic research and software architecture as two sides of one job: observe a messy, nonlinear system, then design a
        clean, verifiable abstraction for it. From zero-knowledge reagent custody to on-device inference for diagnostic radiology, I aim to
        build systems that are provable, robust and humane.
      </p>
      <blockquote className="verse">
        Outside of terminal windows and research papers, I write poetry. Code and verse come from the same instinct: noticing patterns in
        silence and crafting something precise out of them.
      </blockquote>
      <div className="stat-grid">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <span className="eyebrow">{s.label}</span>
            <strong>{s.value}</strong>
            <span>{s.detail}</span>
          </div>
        ))}
      </div>
    </>
  )
}

function Projects() {
  return projects.map((p) => (
    <article className="card" key={p.id}>
      <span className="eyebrow">{p.code}</span>
      <div className="card-head">
        <h4>
          {p.title} <span className="dim">· {p.subtitle}</span>
        </h4>
        <a href={p.github} target="_blank" rel="noopener noreferrer" className="chip-link">
          Source ↗
        </a>
      </div>
      <p className="narrative">{p.narrative}</p>
      {p.award && <p className="award">★ {p.award}</p>}
      <ul className="ticks">
        {p.metrics.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <div className="tags">
        {p.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </article>
  ))
}

function Experience() {
  return (
    <ol className="timeline">
      {experiences.map((e) => (
        <li key={e.role}>
          <div className="card-head">
            <h4>{e.role}</h4>
            <span className="eyebrow">{e.period}</span>
          </div>
          <p className="dim">
            {e.organization} · {e.domain}
          </p>
          <ul className="ticks">
            {e.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}

function Lab() {
  return (
    <>
      <p className="lede">
        Look under my engineering systems and you will find biological motifs. That is not decoration; it is structure.
      </p>
      <p>
        Biological code evolved its own fault tolerance, polymerase proofreading and cellular consensus. Biochemistry and distributed
        software face the same problem: moving high-fidelity information through noisy, adversarial environments.
      </p>
      <blockquote className="note">
        “HPLC profiles are chemical fingerprints. In BioToken, we parse 137 RDKit descriptors to catch degraded or counterfeit reagents
        before they touch a lab bench.”
        <cite>Lab notebook entry 04.B</cite>
      </blockquote>
      <p>
        The same thread ties my medical computer vision research at VJTI, classifying subtle pathologies across MRI, CT and radiographs,
        to BioToken’s molecular anomaly classifier trained on 77,901 chemical entities.
      </p>
      <blockquote className="verse">
        To write a parser is to prune a hedge;
        <br />
        to trace a codon is to map a bridge.
        <br />
        Between the silent nucleotide and the executing thread,
        <br />
        lies all the living things that ever spoke or bled.
        <cite>Fragment from notebook IV</cite>
      </blockquote>
      <div className="callout">
        <span className="eyebrow">Research direction</span>
        <p>
          Privacy-preserving zero-knowledge proofs for genomic sequence alignment, and decentralised federated learning across private
          clinical cohorts.
        </p>
      </div>
    </>
  )
}

function Honors() {
  return (
    <>
      <h5 className="sub">Honors & recognition</h5>
      {achievements.map((a) => (
        <div className="row" key={a.title}>
          <span className="badge">{a.badge}</span>
          <div>
            <strong>{a.title}</strong>
            <span className="dim">{a.details}</span>
          </div>
          <span className="eyebrow">{a.date}</span>
        </div>
      ))}
      <h5 className="sub">Certifications</h5>
      {certifications.map((c) => (
        <div className="row" key={c.title}>
          <span className="badge cert">✓</span>
          <div>
            <strong>{c.title}</strong>
            <span className="dim">{c.issuer}</span>
          </div>
          <span className="eyebrow">{c.date}</span>
        </div>
      ))}
    </>
  )
}

function Resume() {
  return (
    <>
      <div className="actions">
        <a className="btn primary" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          Open PDF ↗
        </a>
        <a className="btn" href="/resume.pdf" download="Khushi_Singh_Resume.pdf">
          Download
        </a>
      </div>
      <h5 className="sub">Education</h5>
      <div className="row">
        <span className="badge">B.E.</span>
        <div>
          <strong>Information Technology, VESIT Mumbai</strong>
          <span className="dim">CGPA 9.92 / 10 through Semester 6</span>
        </div>
      </div>
      <h5 className="sub">Skills</h5>
      {skills.map((s) => (
        <div className="skill-group" key={s.group}>
          <span className="eyebrow">{s.group}</span>
          <div className="tags">
            {s.items.map((i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
        </div>
      ))}
      <h5 className="sub">Highlights</h5>
      <ul className="ticks">
        <li>1st place, Hack4Innovation 2026 for NaviSense, an offline edge-AI navigation aid.</li>
        <li>BioToken anomaly classifier: AUC 0.9798 on 77,901 molecules.</li>
        <li>RecBlock: gasless EHR transactions at $0.003 each via ERC-4337.</li>
        <li>Research intern at VJTI, medical computer vision with ViTs.</li>
      </ul>
      <div className="pdf-frame">
        <iframe src="/resume.pdf#view=FitH" title="Khushi Singh resume (PDF)" loading="lazy" />
      </div>
    </>
  )
}

function Contact() {
  return (
    <>
      <p className="lede">
        If you are exploring decentralised infrastructure, bioinformatics pipelines, or want to trade notes on systems and verse, reach out.
      </p>
      <ul className="contact">
        {contacts.map((c) => (
          <li key={c.label}>
            <span className="eyebrow">{c.label}</span>
            <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
              {c.text}
            </a>
          </li>
        ))}
      </ul>
      <p className="signoff">“Building at the intersection of code, cells and verse.”</p>
    </>
  )
}

const CONTENT = {
  about: About,
  projects: Projects,
  experience: Experience,
  lab: Lab,
  honors: Honors,
  resume: Resume,
  contact: Contact,
}

export default function SectionContent({ id }) {
  const Body = CONTENT[id]
  return Body ? <Body /> : null
}
