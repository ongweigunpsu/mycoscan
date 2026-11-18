'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PROJECT, DATA_LICENSE } from '@/lib/legal-config';

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <div className="page page-narrow">
        <div className="page-head">
          <div className="eyebrow">Legal</div>
          <h1>Privacy Policy</h1>
          <p className="legal-dates">
            Effective {PROJECT.effectiveDate} · Last updated {PROJECT.lastUpdated}
          </p>
        </div>

        <div className="legal-callout">
          <h3>Short version</h3>
          <ul className="legal-list">
            <li>
              Images you analyse with the identification tool stay on your
              device. The model runs in your browser and those images are never
              uploaded.
            </li>
            <li>
              Images you deliberately contribute to the dataset are uploaded and
              are intended for open publication.
            </li>
            <li>
              We remove GPS coordinates and camera serial numbers from
              contributed images before storing them.
            </li>
            <li>We do not sell data and we do not use it for advertising.</li>
            <li>
              Write to{' '}
              <a href={`mailto:${PROJECT.contactEmail}`}>{PROJECT.contactEmail}</a>{' '}
              to access or delete your data.
            </li>
          </ul>
        </div>

        <div className="about-body">
          <h3>1. Who is responsible</h3>
          <p>
            This platform is operated by researchers at the{' '}
            {PROJECT.responsibleUnit}, under the direction of{' '}
            {PROJECT.principalInvestigator}.
          </p>

          <h3>2. What we collect</h3>

          <p>
            <strong>Account information.</strong> If you create an account we
            collect your email address and an authentication record.
            Authentication is handled by Supabase. We do not store your
            password; Supabase stores a cryptographic hash.
          </p>

          <p>
            <strong>Images you analyse.</strong> None. Inference runs locally in
            your browser using a model file downloaded to your device. The image
            is read into browser memory, never transmitted to us, and discarded
            when you leave the page.
          </p>

          <p>
            <strong>Images you contribute.</strong> When you upload an image to
            the dataset we store the image file, the label and descriptive
            fields you enter (disease class, species, growth stage, severity
            note, region, free-text notes), basic technical metadata such as
            image dimensions and file size, and the account that submitted it
            with a timestamp.
          </p>

          <p>
            <strong>Metadata we remove on upload.</strong> Before an image is
            stored, your browser re-encodes it, which destroys all embedded
            metadata: GPS coordinates, camera and lens serial numbers, and
            author or copyright fields. The original filename is replaced with a
            random identifier. We do this because the location of a commercial
            growing facility is competitively sensitive, and because phone
            cameras embed it by default without the photographer realising.
          </p>

          <p>
            <strong>Facility identity.</strong> We do not publish the name or
            location of any farm, facility, or company alongside dataset records
            unless you have separately and explicitly asked us to credit it.
            Contributor email addresses are never published or exposed through
            the public dataset.
          </p>

          <p>
            <strong>Technical logs.</strong> Our hosting and database providers
            generate operational logs that may include IP address, browser user
            agent, requested URL, and timestamp. These are used for security and
            debugging and are not combined with dataset records to identify
            contributors.
          </p>

          <p>
            <strong>What we do not collect.</strong> No advertising trackers, no
            third-party analytics profiling, no payment information, and no
            sensitive personal categories such as health, biometric, or
            demographic data.
          </p>

          <h3>3. Why we process it</h3>
          <ul className="legal-list">
            <li>To operate accounts and make the platform function.</li>
            <li>
              To build an openly published, scientifically documented image
              dataset of <em>Agaricus bisporus</em> disease states, for research
              and teaching.
            </li>
            <li>To train and evaluate disease identification models.</li>
            <li>To secure the platform and diagnose faults.</li>
          </ul>
          <p>
            If you are in a jurisdiction requiring a stated legal basis, ours is
            your consent for contributed images and account creation, and our
            legitimate interest in conducting academic research and maintaining
            service security for operational logs. You may withdraw consent as
            described in section 6.
          </p>

          <h3>4. Who we share it with</h3>
          <ul className="legal-list">
            <li>
              <strong>Vercel</strong> &mdash; application hosting and request
              logging.
            </li>
            <li>
              <strong>Supabase</strong> &mdash; authentication, database, and
              file storage.
            </li>
            <li>
              <strong>Public content delivery network</strong> &mdash; serves
              the model file to your browser. Your IP address is visible to that
              provider when the model loads.
            </li>
            <li>
              <strong>Zenodo (CERN)</strong> &mdash; long-term archive for
              published dataset releases.
            </li>
          </ul>
          <p>
            We do not sell personal information. We disclose data to others only
            where required by law, by Penn State policy, or by research
            integrity obligations.
          </p>

          <h3>5. What becomes public</h3>
          <p>
            Contributed images, their labels, and their scientific metadata are
            intended for open publication under the{' '}
            <a href={DATA_LICENSE.url} target="_blank" rel="noopener noreferrer">
              {DATA_LICENSE.short}
            </a>{' '}
            licence, including deposit in a public archive with a permanent DOI
            and possible description in a peer-reviewed data publication.
          </p>
          <p>
            Account email addresses, authentication records, and technical logs
            are never published.
          </p>
          <p>
            <strong>Published releases cannot be unpublished.</strong> Once a
            dataset version has been deposited under a DOI, that version is
            permanently citable and may already have been downloaded and
            redistributed by third parties under its licence. We can remove your
            contribution from the platform and from future releases. We cannot
            retract copies already distributed. Consider this before
            contributing.
          </p>

          <h3>6. Your rights</h3>
          <p>
            Write to{' '}
            <a href={`mailto:${PROJECT.contactEmail}`}>{PROJECT.contactEmail}</a>{' '}
            to:
          </p>
          <ul className="legal-list">
            <li>obtain a copy of the data we hold about you;</li>
            <li>correct inaccurate account information or image labels;</li>
            <li>delete your account;</li>
            <li>
              withdraw a contributed image from the platform and from future
              dataset releases, subject to the limitation in section 5.
            </li>
          </ul>
          <p>
            We aim to respond within 30 days. Depending on where you live you
            may also have rights under the GDPR, the UK GDPR, or state privacy
            laws, including the right to lodge a complaint with your supervisory
            authority.
          </p>

          <h3>7. Retention</h3>
          <p>
            Account records are retained while the account is active and for a
            reasonable period afterwards for research reproducibility.
            Contributed images are retained indefinitely as part of the
            scientific record. Technical logs follow our providers&rsquo;
            default retention periods, which are short.
          </p>

          <h3>8. Security</h3>
          <p>
            Data are transmitted over TLS and stored with access controls. No
            system is perfectly secure, and this is a research platform rather
            than hardened production infrastructure. Do not submit anything
            whose disclosure would harm you or your business.
          </p>

          <h3>9. International transfers</h3>
          <p>
            The platform and its providers operate in the United States. If you
            contribute from outside the United States, your data will be
            transferred to and stored in the United States.
          </p>

          <h3>10. Children</h3>
          <p>
            The platform is intended for researchers, growers, and agricultural
            professionals. It is not directed to children and we do not
            knowingly collect information from anyone under 13. If you believe a
            child has provided information, contact us and we will delete it.
          </p>

          <h3>11. Accessibility</h3>
          <p>
            Penn State Policy AD69 requires university web content to be
            accessible. Report a barrier to{' '}
            <a href={`mailto:${PROJECT.accessibilityEmail}`}>
              {PROJECT.accessibilityEmail}
            </a>
            .
          </p>

          <h3>12. Changes</h3>
          <p>
            We will update this page when our practices change and revise the
            date above. Material changes affecting contributed data will be
            communicated to registered contributors by email. See also the{' '}
            <Link href="/terms">Terms of Use</Link> and the{' '}
            <Link href="/data-license">Contributor Agreement</Link>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
