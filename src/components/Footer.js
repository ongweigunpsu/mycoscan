'use client';

import Link from 'next/link';
import { DATA_LICENSE } from '@/lib/legal-config';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="name">MycoScan</div>
            <p>
              An open-access platform for mushroom disease data, AI-assisted
              identification, and integrated pest management decision support —
              advancing sustainable mushroom cultivation worldwide.
            </p>
          </div>
          <div className="footer-qr">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mycoscan-qr.png"
              alt="Scan to open MycoScan"
              style={{
                width: 130,
                height: 130,
                borderRadius: 10,
                background: 'white',
                padding: 6,
              }}
            />
            <span style={{
              display: 'block',
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink4)',
              marginTop: 8,
              textAlign: 'center',
            }}>
              Scan to open
            </span>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Platform</h4>
              <Link href="/dataset">Dataset</Link>
              <Link href="/scan">Identify Disease</Link>
              <Link href="/library">Disease Library</Link>
              <Link href="/upload">Contribute Data</Link>
            </div>
            <div className="footer-col">
              <h4>Program</h4>
              <Link href="/about">About the Project</Link>
              <Link href="/team">Team</Link>
              <a href="https://plantscience.psu.edu/research/centers/mushroom" target="_blank" rel="noopener noreferrer">Mushroom Research Center</a>
              <a href="https://abe.psu.edu" target="_blank" rel="noopener noreferrer">Dept. of ABE</a>
            </div>
            <div className="footer-col">
              <h4>Access</h4>
              <a href={DATA_LICENSE.url} target="_blank" rel="noopener noreferrer">{DATA_LICENSE.short}</a>
              <Link href="/auth">Sign in</Link>
            </div>
            <div className="footer-col">
              <h4>Policies</h4>
              <Link href="/terms">Terms of Use</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/data-license">Contributor Agreement</Link>
              <Link href="/model-card">Model Card</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2026 The Pennsylvania State University · Department of Agricultural
            and Biological Engineering · Mushroom Research Center
          </p>
          <p className="mono">Data licensed under {DATA_LICENSE.short}</p>
        </div>
      </div>
    </footer>
  );
}
