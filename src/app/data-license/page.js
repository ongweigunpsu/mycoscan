'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PROJECT, DATA_LICENSE } from '@/lib/legal-config';

export default function DataLicensePage() {
  return (
    <>
      <Nav />
      <div className="page page-narrow">
        <div className="page-head">
          <div className="eyebrow">Legal</div>
          <h1>Contributor Agreement</h1>
          <p className="legal-dates">
            Version {PROJECT.agreementVersion} · Effective {PROJECT.effectiveDate}
          </p>
        </div>

        <div className="legal-callout">
          <h3>In plain language</h3>
          <p>
            You keep ownership of your photographs. You give us permission to
            include them in a free, openly licensed research dataset that others
            can download and use under the {DATA_LICENSE.short} licence. We
            remove GPS data from every image, and we never publish your
            farm&rsquo;s name or your email address. You can withdraw an image,
            but we cannot recall copies already downloaded by other people.
          </p>
        </div>

        <div className="about-body">
          <h3>1. What you are agreeing to</h3>
          <p>
            This Agreement is between you (the &ldquo;Contributor&rdquo;) and
            The Pennsylvania State University, acting through the{' '}
            {PROJECT.responsibleUnit}. It applies to each image and accompanying
            description you submit to the MycoScan community dataset.
          </p>

          <h3>2. You keep ownership</h3>
          <p>
            You retain all copyright and other rights you hold in your
            contributions. This Agreement grants a licence; it does not transfer
            ownership.
          </p>

          <h3>3. Licence you grant</h3>
          <p>
            You grant the project a perpetual, worldwide, irrevocable,
            royalty-free, non-exclusive licence to reproduce, adapt, publish,
            distribute, and sublicense your contribution as part of the MycoScan
            dataset, and you agree it may be published under the{' '}
            <a href={DATA_LICENSE.url} target="_blank" rel="noopener noreferrer">
              {DATA_LICENSE.name} ({DATA_LICENSE.short})
            </a>
            .
          </p>
          <p>
            You also grant permission to use your contribution to train,
            validate, and evaluate machine learning models, and to publish
            results and figures derived from it.
          </p>

          <h3>4. What you confirm</h3>
          <p>By submitting, you confirm that:</p>
          <ul className="legal-list">
            <li>
              you took the photograph, or you hold all rights necessary to grant
              the licence in section 3;
            </li>
            <li>
              if the photograph was taken at a facility you do not own, you have
              that facility&rsquo;s permission to share it;
            </li>
            <li>
              the image contains no identifiable person, no personal
              information, and no readable document, screen, label, or signage
              carrying confidential or proprietary information;
            </li>
            <li>
              the image is not subject to a non-disclosure agreement, a research
              contract, or any other obligation that open publication would
              breach;
            </li>
            <li>
              the image is not copied from the internet, a publication, another
              dataset, or any third-party source;
            </li>
            <li>
              the label and description you provide are accurate to the best of
              your knowledge.
            </li>
          </ul>
          <p>
            Contributions that appear to breach any of these may be removed
            without notice.
          </p>

          <h3>5. Attribution</h3>
          <p>
            At upload you choose how your contribution is credited in the
            published dataset: by your name, by an organisation name, by a
            pseudonym, or anonymously. The default is anonymous. We will not
            publish a farm, facility, or company name unless you select that
            option explicitly, and your email address is never published.
          </p>

          <h3>6. Location and sensitive metadata</h3>
          <p>
            GPS coordinates, camera serial numbers, and author fields are
            destroyed in your browser before the image reaches our servers.
            Where geographic context is scientifically useful, we record only
            the coarse region you enter yourself, such as a country or state. We
            never publish a precise facility location. See the{' '}
            <Link href="/privacy">Privacy Policy</Link> for detail.
          </p>

          <h3>7. Withdrawal, and its limits</h3>
          <p>
            You may withdraw any contribution at any time by writing to{' '}
            <a href={`mailto:${PROJECT.contactEmail}`}>{PROJECT.contactEmail}</a>
            . On withdrawal we will remove the image from the platform and
            exclude it from all future dataset releases.
          </p>
          <p>
            <strong>We cannot recall a published version.</strong> Dataset
            releases are deposited in a public archive under a permanent DOI.
            Once a version is released, third parties may already have
            downloaded and redistributed it under its open licence, and the
            archived version remains citable for reasons of scientific
            reproducibility. Withdrawal is therefore forward-looking only.
            Please take this into account before contributing.
          </p>

          <h3>8. No compensation, no obligation</h3>
          <p>
            Contributions are voluntary and unpaid. The project is under no
            obligation to use, label, publish, or retain any particular
            contribution, and may decline or remove contributions at its
            discretion, including for reasons of image quality or scientific
            fit.
          </p>

          <h3>9. No warranty from the project</h3>
          <p>
            The project makes no warranty about how third parties will use the
            published dataset. Once released under an open licence, downstream
            use is outside our control.
          </p>

          <h3>10. Governing law</h3>
          <p>
            This Agreement is governed by the laws of the Commonwealth of
            Pennsylvania, subject to any applicable immunities of The
            Pennsylvania State University.
          </p>

          <h3>11. How to cite the dataset</h3>
          <p>
            Please cite the archived release rather than the website, so the
            version you used remains identifiable:
          </p>
          <pre className="legal-cite">
{`MycoScan community dataset.
${PROJECT.researchCenter}, ${PROJECT.responsibleUnit}.
DOI: ${PROJECT.zenodoDoi}
Licence: ${DATA_LICENSE.short}`}
          </pre>

          <h3>12. Related documents</h3>
          <p>
            <Link href="/terms">Terms of Use</Link>
            {' · '}
            <Link href="/privacy">Privacy Policy</Link>
            {' · '}
            <Link href="/model-card">Model Card</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
