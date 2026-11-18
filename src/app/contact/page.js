'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PROJECT } from '@/lib/legal-config';

const ROUTES = [
  ['Contribute images, or discuss a data-sharing collaboration', PROJECT.contactEmail],
  ['Withdraw a contribution or delete your account', PROJECT.contactEmail],
  ['Report a misclassification or a data error', PROJECT.contactEmail],
  ['Report an accessibility barrier (Penn State Policy AD69)', PROJECT.accessibilityEmail],
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <div className="page page-narrow">
        <div className="page-head">
          <div className="eyebrow">Get in touch</div>
          <h1>Contact</h1>
        </div>

        <p className="about-lede">
          Who runs this platform, and how to reach us.
        </p>

        <div className="about-body">
          <h3>Project team</h3>
          <p>
            MycoScan is developed by researchers at the{' '}
            {PROJECT.responsibleUnit}, in association with the{' '}
            {PROJECT.researchCenter}.
          </p>
          <p>
            Principal investigator: {PROJECT.principalInvestigator}
          </p>

          <h3>General and research enquiries</h3>
          <p>
            <a href={`mailto:${PROJECT.contactEmail}`}>{PROJECT.contactEmail}</a>
          </p>

          <h3>Specific requests</h3>
          <dl className="spec-list">
            {ROUTES.map(([what, where]) => (
              <div key={what}>
                <dt style={{ flex: '1 1 auto' }}>{what}</dt>
                <dd style={{ flex: '0 0 220px' }}>
                  <a href={`mailto:${where}`}>{where}</a>
                </dd>
              </div>
            ))}
          </dl>

          <h3>A note on scope</h3>
          <p>
            This is a research platform operated by a small academic group. We
            cannot provide individual crop diagnosis or management advice. For
            operational problems in a commercial facility, contact your
            extension educator or a qualified plant pathologist. The{' '}
            <Link href="/terms">Terms of Use</Link> and the{' '}
            <Link href="/model-card">Model Card</Link> set out the limits of
            what this platform can tell you.
          </p>

          <h3>Citing this work</h3>
          <p>
            Archived dataset releases carry a permanent DOI:{' '}
            <a
              href={`https://doi.org/${PROJECT.zenodoDoi}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {PROJECT.zenodoDoi}
            </a>
            . Please cite the archived release rather than the website.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
