'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const TEAM = [
  {
    name: 'Shirin Ghatrehsamani, Ph.D.',
    role: 'Principal Investigator',
    title: 'Associate Professor of Agricultural and Biological Engineering',
    affiliation: 'Department of Agricultural and Biological Engineering, Penn State',
    focus:
      'Precision agriculture, agricultural robotics, and machine learning for early plant-disease detection. Leads the MycoScan initiative and directs the research program on hyperspectral and RGB imaging for controlled-environment agriculture.',
    email: 'spg5994@psu.edu',
    link: 'https://abe.psu.edu/directory/spg5994',
    initials: 'SG',
  },
  {
    name: 'David M. Beyer, Ph.D.',
    role: 'Co-Investigator · Mushroom Pathology Advisor',
    title: 'Professor of Mushrooms',
    affiliation: 'Department of Plant Pathology and Environmental Microbiology, Penn State',
    focus:
      'Mushroom cultivation, composting, mushroom nutrition and physiology, and IPM for mushroom cultivation. Directs mushroom extension services for the North American mushroom industry and co-organizes the Penn State Mushroom Short Course.',
    email: 'dmb8@psu.edu',
    link: 'https://plantpath.psu.edu/directory/dmb8',
    initials: 'DB',
  },
  {
    name: 'Weiqun Wang',
    role: 'Lead Developer · Researcher',
    title: 'Ph.D. Graduate Assistant',
    affiliation: 'Department of Agricultural and Biological Engineering, Penn State',
    focus:
      'Doctoral research on hyperspectral imaging and deep learning for early detection of dry bubble disease in Agaricus bisporus. Designed and built the MycoScan platform end to end — from data pipeline and model deployment to UI.',
    email: 'wfw5324@psu.edu',
    link: 'https://abe.psu.edu/directory/wfw5324',
    initials: 'WW',
  },
];

export default function TeamPage() {
  return (
    <>
      <Nav />
      <div className="page page-narrow">
        <div className="page-head">
          <div className="eyebrow">People behind the platform</div>
          <h1>Team</h1>
          <p>
            MycoScan is developed and maintained at Pennsylvania State University as a
            joint effort between the Department of Agricultural and Biological Engineering
            and the Department of Plant Pathology and Environmental Microbiology, in
            partnership with the Penn State Mushroom Research Center.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 20, marginTop: 8 }}>
          {TEAM.map((p) => (
            <article
              key={p.name}
              style={{
                border: '1px solid var(--line1)',
                borderRadius: 12,
                padding: 28,
                background: 'var(--bg1)',
                display: 'grid',
                gridTemplateColumns: '72px 1fr',
                gap: 22,
                alignItems: 'start',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 10,
                  background: 'var(--ink1)',
                  color: 'var(--bg0)',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: 'var(--serif, Spectral, Georgia, serif)',
                  fontSize: 26,
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}
              >
                {p.initials}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink4)',
                    marginBottom: 6,
                  }}
                >
                  {p.role}
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--serif, Spectral, Georgia, serif)',
                    fontSize: 26,
                    fontWeight: 500,
                    margin: '0 0 6px',
                    color: 'var(--ink0)',
                  }}
                >
                  {p.name}
                </h2>
                <div
                  style={{
                    fontSize: 15,
                    color: 'var(--ink2)',
                    marginBottom: 4,
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'var(--ink4)',
                    marginBottom: 14,
                  }}
                >
                  {p.affiliation}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink2)', margin: '0 0 14px' }}>
                  {p.focus}
                </p>
                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 14 }}>
                  <a
                    href={`mailto:${p.email}`}
                    style={{ color: 'var(--ink1)', textDecoration: 'none', borderBottom: '1px solid var(--line2)' }}
                  >
                    {p.email}
                  </a>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--ink1)', textDecoration: 'none', borderBottom: '1px solid var(--line2)' }}
                  >
                    Penn State directory →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            padding: 22,
            background: 'var(--bg1)',
            border: '1px solid var(--line1)',
            borderRadius: 10,
            fontSize: 14,
            color: 'var(--ink3)',
            lineHeight: 1.65,
          }}
        >
          <strong style={{ color: 'var(--ink1)' }}>Contact.</strong>{' '}
          For research collaboration, dataset partnerships, or extension inquiries, please
          reach out to any of the team members above. General questions about the platform
          can be directed to the lead developer.
        </div>
      </div>
      <Footer />
    </>
  );
}
