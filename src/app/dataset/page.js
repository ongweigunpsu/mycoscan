'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

const SENSOR_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'rgb', label: 'RGB' },
  { id: 'hsi', label: 'Hyperspectral' },
  { id: 'thermal', label: 'Thermal' },
];

export default function DatasetPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('uploads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(120);
      if (!error && data) setRows(data);
      setLoading(false);
    })();
  }, []);

  const shown = rows.filter((r) => filter === 'all' || r.sensor_type === filter);

  return (
    <>
      <Nav />
      <div className="page">
        <div className="page-head">
          <div className="eyebrow">Open-access collection</div>
          <h1>Community Dataset</h1>
          <p>
            A growing, open collection of mushroom disease imagery contributed by
            researchers and growers. Every record carries structured metadata for
            cultivar, sensor modality, and growth stage.
          </p>
        </div>

        <div className="toolbar">
          <div className="filter-row">
            {SENSOR_FILTERS.map((f) => (
              <button key={f.id}
                className={`chip ${filter === f.id ? 'active' : ''}`}
                onClick={() => setFilter(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
          <Link href="/upload" className="btn btn-primary btn-sm">Contribute imagery</Link>
        </div>

        {loading ? (
          <div className="empty"><p>Loading the collection…</p></div>
        ) : shown.length === 0 ? (
          <div className="empty">
            <p>No records yet in this view.</p>
            <Link href="/upload" className="btn btn-primary">Be the first to contribute</Link>
          </div>
        ) : (
          <div className="grid-cards">
            {shown.map((r) => (
              <div className="card" key={r.id}>
                <div className="card-media">
                  {r.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.image_url} alt={r.disease_type || 'specimen'} loading="lazy" />
                  ) : null}
                  {r.sensor_type && <span className="card-tag-float">{r.sensor_type}</span>}
                </div>
                <div className="card-body">
                  <div className="card-title">{r.disease_type || 'Unlabeled specimen'}</div>
                  <div className="card-meta">
                    {r.mushroom_species && <span>{r.mushroom_species}</span>}
                    {r.growth_stage && <span>· {r.growth_stage}</span>}
                    {r.country && <span>· {r.country}</span>}
                  </div>
                  {r.notes && <div className="card-note">{r.notes}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
