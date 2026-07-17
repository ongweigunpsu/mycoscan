'use client';

import { useEffect, useRef, useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import {
  MODEL_CLASSES, CLASS_INFO, SEVERITY_COLORS,
  REGIONS, getDSS,
} from '@/lib/diseases';

// ImageNet normalization (must match training transforms)
const MEAN = [0.485, 0.456, 0.406];
const STD = [0.229, 0.224, 0.225];
const SIZE = 224;

export default function ScanPage() {
  const fileRef = useRef(null);
  const canvasRef = useRef(null);
  const sessionRef = useRef(null);
  const ortRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | modelloading | ready | running | done | error
  const [result, setResult] = useState(null);    // { probs: [...], topIdx }
  const [region, setRegion] = useState('north_america');
  const [errText, setErrText] = useState('');

  // Load ONNX Runtime Web from CDN (avoids bundling its wasm/worker code)
  const ORT_CDN = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.19.2/dist/ort.min.js';

  const loadOrt = () => new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.ort) return resolve(window.ort);
    const existing = document.querySelector(`script[src="${ORT_CDN}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.ort));
      existing.addEventListener('error', reject);
      return;
    }
    const s = document.createElement('script');
    s.src = ORT_CDN;
    s.async = true;
    s.onload = () => resolve(window.ort);
    s.onerror = reject;
    document.head.appendChild(s);
  });

  // Load model on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setStatus('modelloading');
        const ort = await loadOrt();
        // Point ORT at the matching CDN wasm assets
        ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.19.2/dist/';
        ort.env.wasm.numThreads = 1;
        ortRef.current = ort;
        const session = await ort.InferenceSession.create('/models/model.onnx', {
          executionProviders: ['wasm'],
        });
        if (cancelled) return;
        sessionRef.current = session;
        setStatus('ready');
      } catch (e) {
        console.error(e);
        setErrText('Could not load the identification model. Please refresh and try again.');
        setStatus('error');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const pickFile = (f) => {
    if (!f) return;
    setResult(null);
    setPreview(URL.createObjectURL(f));
  };

  const preprocess = (img) => {
    const canvas = canvasRef.current;
    canvas.width = SIZE; canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, SIZE, SIZE);
    const { data } = ctx.getImageData(0, 0, SIZE, SIZE);
    // NCHW float32, normalized
    const arr = new Float32Array(3 * SIZE * SIZE);
    for (let i = 0; i < SIZE * SIZE; i++) {
      const r = data[i * 4] / 255;
      const g = data[i * 4 + 1] / 255;
      const b = data[i * 4 + 2] / 255;
      arr[i] = (r - MEAN[0]) / STD[0];
      arr[SIZE * SIZE + i] = (g - MEAN[1]) / STD[1];
      arr[2 * SIZE * SIZE + i] = (b - MEAN[2]) / STD[2];
    }
    return arr;
  };

  const softmax = (logits) => {
    const max = Math.max(...logits);
    const exps = logits.map((v) => Math.exp(v - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map((v) => v / sum);
  };

  const run = async () => {
    if (!preview || !sessionRef.current) return;
    setStatus('running');
    setResult(null);
    try {
      const ort = ortRef.current;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = preview;
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });

      const input = preprocess(img);
      const tensor = new ort.Tensor('float32', input, [1, 3, SIZE, SIZE]);
      const output = await sessionRef.current.run({ input: tensor });
      const logits = Array.from(output.output.data);
      const probs = softmax(logits);
      const topIdx = probs.indexOf(Math.max(...probs));

      setResult({ probs, topIdx });
      setStatus('done');
    } catch (e) {
      console.error(e);
      setErrText('Identification failed on this image. Try another photograph.');
      setStatus('error');
    }
  };

  const topClass = result ? MODEL_CLASSES[result.topIdx] : null;
  const topInfo = topClass ? CLASS_INFO[topClass] : null;
  const isHealthy = topClass === 'healthy';
  const dss = topInfo && topInfo.libKey ? getDSS(topInfo.libKey, region) : null;

  return (
    <>
      <Nav />
      <div className="page">
        <div className="page-head">
          <div className="eyebrow">In-browser identification</div>
          <h1>Identify a disease</h1>
          <p>
            Upload a photograph of a mushroom and receive an instant classification
            across five disease states. Inference runs entirely in your browser —
            your image is never uploaded.
          </p>
        </div>

        <div className="scan-grid">
          {/* LEFT — input */}
          <div className="scan-panel">
            <div className="scan-panel-head">
              <span className="t">Specimen</span>
              <span className="t" style={{ color: 'var(--ink4)' }}>RGB</span>
            </div>
            <div className="scan-panel-body">
              <div className="scan-preview-box" onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); pickFile(e.dataTransfer.files?.[0]); }}
                style={{ cursor: 'pointer' }}>
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt="specimen" />
                ) : (
                  <div className="scan-empty">
                    <div className="icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                    </div>
                    <div>Drop an image here, or click to browse</div>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*" hidden
                  onChange={(e) => pickFile(e.target.files?.[0])} />
              </div>

              <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
                <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}
                  onClick={run}
                  disabled={!preview || status === 'running' || status === 'modelloading'}>
                  {status === 'modelloading' ? 'Loading model…'
                    : status === 'running' ? 'Analyzing…'
                    : 'Run identification'}
                </button>
                {preview && (
                  <button className="btn btn-outline" onClick={() => { setPreview(null); setResult(null); }}>
                    Clear
                  </button>
                )}
              </div>
              {status === 'modelloading' && (
                <p className="scan-loading mono" style={{ padding: '12px 0 0', textAlign: 'left' }}>
                  First load fetches the model (~90 MB). It is cached afterward.
                </p>
              )}
            </div>
          </div>

          {/* RIGHT — result */}
          <div className="scan-panel">
            <div className="scan-panel-head">
              <span className="t">Diagnosis</span>
              {result && <span className="t" style={{ color: 'var(--ink4)' }}>ResNet-50</span>}
            </div>
            <div className="scan-panel-body">
              {status === 'error' ? (
                <div className="result-empty">{errText}</div>
              ) : status === 'running' ? (
                <div className="scan-loading">
                  <div className="spinner" />
                  <p>Analyzing spectral and morphological features</p>
                  <p className="mono">running inference locally</p>
                </div>
              ) : !result ? (
                <div className="result-empty">
                  Upload a specimen and run identification to see the diagnosis.
                </div>
              ) : (
                <>
                  <div className="result-headline">
                    <span className="result-dot" style={{ background: SEVERITY_COLORS[topInfo.severity] }} />
                    <div>
                      <div className="result-class">{topInfo.label}</div>
                      <div className="result-latin">{topInfo.latin}</div>
                    </div>
                    <div className="result-conf">
                      <div className="pct">{(result.probs[result.topIdx] * 100).toFixed(1)}%</div>
                      <div className="lbl">Confidence</div>
                    </div>
                  </div>

                  <div className="prob-list">
                    {MODEL_CLASSES.map((c, i) => {
                      const info = CLASS_INFO[c];
                      const pct = result.probs[i] * 100;
                      return (
                        <div className="prob-row" key={c}>
                          <span className="prob-name">{info.label}</span>
                          <span className="prob-track">
                            <span className="prob-fill" style={{
                              width: `${pct}%`,
                              background: i === result.topIdx ? SEVERITY_COLORS[info.severity] : 'var(--line2)',
                            }} />
                          </span>
                          <span className="prob-val">{pct.toFixed(1)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* DSS — appears once a disease (non-healthy) is identified */}
        {result && !isHealthy && dss && (
          <div style={{ marginTop: 44 }}>
            <div className="section-rule">
              <span className="tag">Decision Support</span>
              <span className="line" />
            </div>
            <div className="page-head" style={{ marginBottom: 22 }}>
              <h1 style={{ fontSize: 28 }}>Recommended management</h1>
              <p>
                Integrated pest management for <strong>{topInfo.label}</strong>, filtered
                to treatments available in your region. Confirm all chemical use against
                current local regulations before application.
              </p>
            </div>

            <div className="dss-region-bar">
              <span className="lbl">Region</span>
              <select value={region} onChange={(e) => setRegion(e.target.value)}>
                {REGIONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
              </select>
            </div>

            <div className="dss-tiers">
              {/* Chemical */}
              <div className="dss-tier">
                <div className="dss-tier-head">
                  <span className="icon" style={{ color: 'var(--sev3)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M9 3h6M10 3v6l-4 8a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3l-4-8V3" />
                    </svg>
                  </span>
                  <span className="t">Chemical</span>
                </div>
                <div className="dss-tier-body">
                  {dss.chemical.map((c, i) => (
                    <div className="dss-item" key={i} style={{ alignItems: 'center' }}>
                      <span>{c.text}</span>
                      <span className={`avail ${c.avail}`}>{c.avail === 'yes' ? 'Available' : 'Restricted'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Biological */}
              <div className="dss-tier">
                <div className="dss-tier-head">
                  <span className="icon" style={{ color: 'var(--healthy)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 2C7 7 7 12 12 22c5-10 5-15 0-20z" /><path d="M12 8v8" />
                    </svg>
                  </span>
                  <span className="t">Biological</span>
                </div>
                <div className="dss-tier-body">
                  {dss.biological.map((b, i) => <div className="dss-item" key={i}>{b}</div>)}
                </div>
              </div>

              {/* Prevention */}
              <div className="dss-tier">
                <div className="dss-tier-head">
                  <span className="icon" style={{ color: 'var(--beaver)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </span>
                  <span className="t">Prevention</span>
                </div>
                <div className="dss-tier-body">
                  {dss.prevention.map((p, i) => <div className="dss-item" key={i}>{p}</div>)}
                </div>
              </div>
            </div>

            <div className="dss-note">
              <strong>Advisory.</strong> These recommendations are for decision support only.
              Pesticide registrations and permitted uses vary by jurisdiction and change over
              time. Always follow the product label and consult your local extension service
              before any chemical application.
            </div>
          </div>
        )}

        {result && isHealthy && (
          <div style={{ marginTop: 32 }} className="dss-note" >
            <strong>No disease detected.</strong> This specimen appears healthy. Continue
            routine monitoring and maintain standard hygiene practices.
          </div>
        )}
      </div>

      {/* hidden work canvas */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <Footer />
    </>
  );
}
