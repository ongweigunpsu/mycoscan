'use client';

import Link from 'next/link';

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
              <a href="https://plantscience.psu.edu/research/centers/mushroom" target="_blank" rel="noopener noreferrer">Mushroom Research Center</a>
              <a href="https://abe.psu.edu" target="_blank" rel="noopener noreferrer">Dept. of ABE</a>
            </div>
            <div className="footer-col">
              <h4>Access</h4>
              <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC 4.0</a>
              <Link href="/auth">Sign in</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2026 The Pennsylvania State University · Department of Agricultural
            and Biological Engineering · Mushroom Research Center
          </p>
          <p className="mono">Data licensed under CC BY-NC 4.0</p>
        </div>
      </div>
    </footer>
  );
}
