'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { sanitizeImage } from '@/lib/sanitize-image';
import { PROJECT, DATA_LICENSE } from '@/lib/legal-config';

const DISEASE_OPTIONS = ['Healthy', 'Dry Bubble', 'Wet Bubble', 'Cobweb', 'Bacterial Blotch', 'Green Mold', 'Other / Unknown'];
const SENSOR_OPTIONS = [{ v: 'rgb', l: 'RGB photograph' }, { v: 'hsi', l: 'Hyperspectral' }, { v: 'thermal', l: 'Thermal' }];
const STAGE_OPTIONS = ['Pinning', 'Button', 'Cup', 'Flat', 'Mature', 'Unknown'];
const SPECIES_OPTIONS = [
  { v: 'Agaricus bisporus',      l: 'Agaricus bisporus (button / white mushroom)' },
  { v: 'Pleurotus ostreatus',    l: 'Pleurotus ostreatus (oyster mushroom)' },
  { v: 'Lentinula edodes',       l: 'Lentinula edodes (shiitake)' },
  { v: 'Flammulina velutipes',   l: 'Flammulina velutipes (enoki)' },
  { v: 'Hericium erinaceus',     l: 'Hericium erinaceus (lion’s mane)' },
  { v: 'Ganoderma lucidum',      l: 'Ganoderma lucidum (reishi)' },
  { v: 'Other',                  l: 'Other / Unknown' },
];

export default function UploadPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const fileRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    disease_type: '', mushroom_species: 'Agaricus bisporus',
    sensor_type: 'rgb', growth_stage: '', severity_grade: '', country: '', notes: '',
  });
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  // Consent gate. Upload is impossible until all three are true.
  const [consent, setConsent] = useState({ rights: false, noPersonal: false, openPub: false });
  const [attribution, setAttribution] = useState('anonymous');
  const [attributionValue, setAttributionValue] = useState('');

  const consentComplete =
    consent.rights && consent.noPersonal && consent.openPub &&
    (attribution === 'anonymous' || attributionValue.trim().length > 0);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { setUser(data.user); setChecked(true); });
  }, []);

  const pickFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onInput = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    setMsg(null);
    if (!file) { setMsg({ type: 'err', text: 'Choose an image to contribute.' }); return; }
    if (!form.disease_type) { setMsg({ type: 'err', text: 'Select a disease label.' }); return; }
    if (!consentComplete) { setMsg({ type: 'err', text: 'Please accept the contribution terms first.' }); return; }
    setBusy(true);
    try {
      // Destroy GPS and all other embedded metadata before anything leaves
      // the device. See /privacy and /data-license.
      const clean = await sanitizeImage(file);

      const path = `${user.id}/${clean.file.name}`;
      const { error: upErr } = await supabase.storage
        .from('mycoscan-images').upload(path, clean.file, { contentType: 'image/jpeg' });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from('mycoscan-images').getPublicUrl(path);

      const { error: insErr } = await supabase.from('uploads').insert({
        user_id: user.id,
        user_email: user.email,
        image_url: pub.publicUrl,
        storage_path: path,
        file_size_kb: clean.sizeKb,
        image_width_px: clean.width,
        image_height_px: clean.height,
        metadata_stripped: true,
        consent_version: PROJECT.agreementVersion,
        consent_license: DATA_LICENSE.id,
        consent_accepted_at: new Date().toISOString(),
        attribution_kind: attribution,
        attribution_value: attribution === 'anonymous' ? null : attributionValue.trim(),
        ...form,
      });
      if (insErr) throw insErr;

      setMsg({ type: 'ok', text: 'Contribution received. Thank you.' });
      setTimeout(() => router.push('/dataset'), 1100);
    } catch (e) {
      setMsg({ type: 'err', text: e.message || 'Upload failed.' });
    } finally {
      setBusy(false);
    }
  };

  if (!checked) return (<><Nav /><div className="page"><div className="empty"><p>Loading…</p></div></div><Footer /></>);

  if (!user) return (
    <>
      <Nav />
      <div className="page page-narrow">
        <div className="locked">
          <div className="icon">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </div>
          <h3>Sign in to contribute</h3>
          <p>Contributing imagery requires an account so we can attribute your data.</p>
          <Link href="/auth" className="btn btn-primary">Sign in or register</Link>
        </div>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Nav />
      <div className="page page-narrow">
        <div className="page-head">
          <div className="eyebrow">Add to the collection</div>
          <h1>Contribute imagery</h1>
          <p>
            Share a labeled mushroom image with the research community.
            Contributions are published openly under the {DATA_LICENSE.short} licence.
            GPS coordinates and other embedded metadata are removed in your browser
            before the image is uploaded.
          </p>
        </div>

        <div className="panel panel-pad">
          {/* Dropzone */}
          <div className={`dropzone ${file ? 'has-file' : ''}`} onClick={() => fileRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); pickFile(e.dataTransfer.files?.[0]); }}>
            {preview ? (
              <div className="dz-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="preview" />
                <div className="dz-filename">{file.name}</div>
              </div>
            ) : (
              <>
                <div className="dz-icon">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div className="dz-text">Drop an image here, or click to browse</div>
                <div className="dz-hint">JPG or PNG · up to ~10 MB</div>
              </>
            )}
            <input ref={fileRef} type="file" accept="image/*" hidden
              onChange={(e) => pickFile(e.target.files?.[0])} />
          </div>

          {/* Metadata */}
          <div style={{ marginTop: 24 }}>
            <div className="field-row">
              <div className="field">
                <label>Disease label</label>
                <select value={form.disease_type} onChange={onInput('disease_type')}>
                  <option value="">Select…</option>
                  {DISEASE_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Sensor modality</label>
                <select value={form.sensor_type} onChange={onInput('sensor_type')}>
                  {SENSOR_OPTIONS.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
                </select>
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Species</label>
                <select value={form.mushroom_species} onChange={onInput('mushroom_species')}>
                  {SPECIES_OPTIONS.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Growth stage</label>
                <select value={form.growth_stage} onChange={onInput('growth_stage')}>
                  <option value="">Select…</option>
                  {STAGE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Country / region <span style={{ color: 'var(--ink4)', fontWeight: 400 }}>(optional)</span></label>
                <input value={form.country} onChange={onInput('country')} placeholder="e.g. United States" />
              </div>
              <div className="field">
                <label>Severity note <span style={{ color: 'var(--ink4)', fontWeight: 400 }}>(optional)</span></label>
                <input value={form.severity_grade} onChange={onInput('severity_grade')} placeholder="e.g. early / advanced" />
              </div>
            </div>
            <div className="field">
              <label>Notes <span style={{ color: 'var(--ink4)', fontWeight: 400 }}>(optional)</span></label>
              <textarea value={form.notes} onChange={onInput('notes')}
                placeholder="Cultivation conditions, observations, or context…" />
            </div>

            {/* ---- Consent gate ---- */}
            <fieldset className="consent-box">
              <legend>Contribution terms</legend>
              <p className="consent-intro">
                Read the{' '}
                <Link href="/data-license" target="_blank">Contributor Agreement</Link>.
                All three confirmations are required.
              </p>

              <label className="consent-item">
                <input
                  type="checkbox"
                  checked={consent.rights}
                  onChange={(e) => setConsent({ ...consent, rights: e.target.checked })}
                />
                <span>
                  I took this photograph, or I hold the rights needed to share it.
                  If it was taken at a facility I do not own, I have that
                  facility&rsquo;s permission.
                </span>
              </label>

              <label className="consent-item">
                <input
                  type="checkbox"
                  checked={consent.noPersonal}
                  onChange={(e) => setConsent({ ...consent, noPersonal: e.target.checked })}
                />
                <span>
                  The image contains no identifiable person, no readable
                  confidential document or signage, and nothing covered by a
                  non-disclosure or research agreement.
                </span>
              </label>

              <label className="consent-item">
                <input
                  type="checkbox"
                  checked={consent.openPub}
                  onChange={(e) => setConsent({ ...consent, openPub: e.target.checked })}
                />
                <span>
                  I license this image for open publication under the{' '}
                  <a href={DATA_LICENSE.url} target="_blank" rel="noopener noreferrer">
                    {DATA_LICENSE.short}
                  </a>{' '}
                  licence, and I understand that a release already published
                  under a DOI cannot be recalled.
                </span>
              </label>

              <div className="field" style={{ marginTop: 16 }}>
                <label htmlFor="attribution">How should this be credited?</label>
                <select
                  id="attribution"
                  value={attribution}
                  onChange={(e) => setAttribution(e.target.value)}
                >
                  <option value="anonymous">Anonymously (default)</option>
                  <option value="name">By my name</option>
                  <option value="organisation">By an organisation name</option>
                  <option value="pseudonym">By a pseudonym</option>
                </select>
              </div>

              {attribution !== 'anonymous' && (
                <div className="field">
                  <label htmlFor="attribution-value">Credit text</label>
                  <input
                    id="attribution-value"
                    value={attributionValue}
                    onChange={(e) => setAttributionValue(e.target.value)}
                    placeholder="Name or organisation to credit"
                  />
                </div>
              )}

              <p className="consent-status" role="status" aria-live="polite">
                {consentComplete
                  ? 'Terms accepted. You can submit your contribution.'
                  : 'Submission is disabled until all three boxes are ticked.'}
              </p>
            </fieldset>

            {msg && <div className={`form-msg ${msg.type}`}>{msg.text}</div>}

            <button
              className="btn btn-primary btn-lg"
              style={{ marginTop: 8 }}
              onClick={submit}
              disabled={busy || !consentComplete}
            >
              {busy ? 'Uploading…' : 'Contribute to dataset'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
