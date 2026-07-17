'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { DISEASES, SEVERITY_COLORS } from '@/lib/diseases';

export default function LibraryPage() {
  return (
    <>
      <Nav />
      <div className="page">
        <div className="page-head">
          <div className="eyebrow">Reference collection</div>
          <h1>Disease Library</h1>
          <p>
            A documented reference to the major pathogens of cultivated mushrooms —
            their symptoms, life cycle, and management. Each entry is presented as a
            specimen plate for quick field reference.
          </p>
        </div>

        <div className="plate-grid">
          {DISEASES.map((d) => (
            <article className="plate" key={d.key}>
              <div className="plate-head">
                <div>
                  <div className="plate-title">{d.name}</div>
                  <div className="plate-latin">{d.latin}</div>
                </div>
                <div className="plate-specimen-no">
                  {d.specimenNo}
                  <div className="plate-severity">
                    <span className="dot" style={{ background: SEVERITY_COLORS[d.severity] }} />
                    {d.severityLabel}
                  </div>
                </div>
              </div>
              <div className="plate-body">
                <p className="plate-desc">{d.desc}</p>
                <div className="plate-field">
                  <div className="k">Symptoms</div>
                  <div className="v">{d.symptoms}</div>
                </div>
                <div className="plate-field">
                  <div className="k">Life cycle</div>
                  <div className="v">{d.lifecycle}</div>
                </div>
                <div className="plate-field">
                  <div className="k">Management</div>
                  <div className="v">{d.management}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
