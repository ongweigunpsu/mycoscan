'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const DISEASES = [
  { code: 'H',  label: 'Healthy',          desc: 'baseline morphology',   color: '#2E8B6F', img: '/images/healthy.jpg' },
  { code: 'BB', label: 'Bacterial Blotch', desc: 'cap discoloration',     color: '#C8922E', img: '/images/bacterial-spot.jpg' },
  { code: 'CW', label: 'Cobweb',           desc: 'mycelial overgrowth',   color: '#C8922E', img: '/images/spider-web.jpg' },
  { code: 'DB', label: 'Dry Bubble',       desc: 'necrotic distortion',   color: '#C0611E', img: '/images/dry-blister.jpg' },
  { code: 'WB', label: 'Wet Bubble',       desc: 'amber exudate masses',  color: '#C0611E', img: '/images/wet-blister.jpg' },
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
                {DISEASES.map((d) => (
                  <div className="sg-row" key={d.code}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={d.img}
                      alt={d.label}
                      className="sg-thumb"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 8,
                        objectFit: 'cover',
                        border: `2px solid ${d.color}`,
                        flexShrink: 0,
                      }}
                    />
                    <span className="sg-label" style={{ marginLeft: 12 }}>
                      <strong>{d.label}</strong> — {d.desc}
                    </span>
                  </div>
                ))}
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

      {/* PARTNERS */}
      <section className="partners">
        <div className="partners-inner">
          <span className="partners-label">A collaboration of</span>
          <span className="partner-item">Penn State Mushroom Research Center</span>
          <span className="partner-item">Dept. of Agricultural &amp; Biological Engineering</span>
          <span className="partner-item">Dept. of Plant Pathology &amp; Environmental Microbiology</span>
        </div>
      </section>

      <Footer />
    </>
  );
}
