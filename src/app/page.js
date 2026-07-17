'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const MODULES = [
  {
    num: '01',
    title: 'Community Dataset',
    desc: 'Browse and contribute open-access mushroom disease imagery — RGB, hyperspectral, and thermal — with structured metadata for cultivar, sensor, and growth stage.',
    href: '/dataset',
  },
  {
    num: '02',
    title: 'Disease Identification',
    desc: 'Upload a photograph and receive an instant classification across five disease states, computed entirely in your browser. No image leaves your device.',
    href: '/scan',
  },
  {
    num: '03',
    title: 'IPM Decision Support',
    desc: 'Translate a diagnosis into region-appropriate management actions — chemical, biological, and preventive — filtered to what is legally available where you grow.',
    href: '/scan',
  },
  {
    num: '04',
    title: 'Disease Library',
    desc: 'A reference collection of the major pathogens of cultivated mushrooms, documenting symptoms, life cycle, and management for each.',
    href: '/library',
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">Penn State Mushroom Research Center</div>
            <h1>The open platform for <em>mushroom disease</em> research.</h1>
            <p className="hero-lede">
              MycoScan brings together open imagery, AI-assisted identification, and
              integrated pest management decision support — built to accelerate the
              early detection of disease in cultivated mushrooms.
            </p>
            <div className="hero-cta">
              <Link href="/scan" className="btn btn-primary btn-lg">Identify a disease</Link>
              <Link href="/dataset" className="btn btn-outline btn-lg">Explore the dataset</Link>
            </div>
          </div>

          {/* Specimen card — the signature element */}
          <div className="specimen-card">
            <div className="specimen-frame">
              <div className="specimen-head">
                <span className="title">Agaricus bisporus</span>
                <span className="cat">DISEASE STATES</span>
              </div>
              <div className="specimen-grades">
                <div className="sg-row">
                  <span className="sg-chip" style={{ background: '#2E8B6F' }}>H</span>
                  <span className="sg-label"><strong>Healthy</strong> — baseline morphology</span>
                </div>
                <div className="sg-row">
                  <span className="sg-chip" style={{ background: '#C8922E' }}>BB</span>
                  <span className="sg-label"><strong>Bacterial Blotch</strong> — cap discoloration</span>
                </div>
                <div className="sg-row">
                  <span className="sg-chip" style={{ background: '#C8922E' }}>CW</span>
                  <span className="sg-label"><strong>Cobweb</strong> — mycelial overgrowth</span>
                </div>
                <div className="sg-row">
                  <span className="sg-chip" style={{ background: '#C0611E' }}>DB</span>
                  <span className="sg-label"><strong>Dry Bubble</strong> — necrotic distortion</span>
                </div>
                <div className="sg-row">
                  <span className="sg-chip" style={{ background: '#C0611E' }}>WB</span>
                  <span className="sg-label"><strong>Wet Bubble</strong> — amber exudate masses</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stats-inner">
            <div className="hstat"><span className="num">98.7%</span><span className="lbl">Model accuracy</span></div>
            <div className="hstat"><span className="num">5</span><span className="lbl">Disease states</span></div>
            <div className="hstat"><span className="num">3</span><span className="lbl">Sensor modalities</span></div>
            <div className="hstat"><span className="num">Open</span><span className="lbl">CC BY-NC 4.0</span></div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="modules">
        <div className="modules-head">
          <div className="eyebrow">What the platform does</div>
          <h2>Four tools, one workflow</h2>
          <p>From a field photograph to a management decision — each part of MycoScan is open and built to work together.</p>
        </div>
        <div className="module-grid">
          {MODULES.map((m) => (
            <Link href={m.href} key={m.num} className="module">
              <span className="module-num">{m.num}</span>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              <span className="module-arrow">Open →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="partners">
        <div className="partners-inner">
          <span className="partners-label">A collaboration of</span>
          <span className="partner-item">Penn State Mushroom Research Center</span>
          <span className="partner-item">Dept. of Agricultural &amp; Biological Engineering</span>
          <span className="partner-item">Selçuk University</span>
        </div>
      </section>

      <Footer />
    </>
  );
}
