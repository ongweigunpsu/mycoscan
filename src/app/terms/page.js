'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { MODEL, PROJECT, DATA_LICENSE } from '@/lib/legal-config';

export default function TermsPage() {
  return (
    <>
      <Nav />
      <div className="page page-narrow">
        <div className="page-head">
          <div className="eyebrow">Legal</div>
          <h1>Terms of Use</h1>
          <p className="legal-dates">
            Effective {PROJECT.effectiveDate} · Last updated {PROJECT.lastUpdated}
          </p>
        </div>

        <div className="legal-callout">
          <h3>Research prototype</h3>
          <p>
            MycoScan is a research prototype developed at the{' '}
            {PROJECT.responsibleUnit} in association with the{' '}
            {PROJECT.researchCenter}. It is not a commercial product, a
            diagnostic service, or a regulatory instrument. Its outputs are
            experimental and must not be used as the sole basis for any crop
            management, treatment, disposal, or commercial decision.
          </p>
        </div>

        <div className="about-body">
          <h3>1. Acceptance</h3>
          <p>
            By accessing MycoScan you agree to these Terms of Use. If you do not
            agree, do not use the platform.
          </p>

          <h3>2. Who operates the platform</h3>
          <p>
            The platform is operated by researchers at the{' '}
            {PROJECT.responsibleUnit}, in association with the{' '}
            {PROJECT.researchCenter}. Use of the Penn State name here is subject
            to Penn State Policy AD07. The platform does not represent an
            official position, endorsement, or recommendation of The
            Pennsylvania State University.
          </p>

          <h3>3. Limitations of the identification model</h3>
          <p>You must understand the following before relying on any output.</p>
          <ul className="legal-list">
            <li>
              The model is a {MODEL.architecture} classifier trained on the{' '}
              {MODEL.trainingSource}.
            </li>
            <li>
              Its reported accuracy of {MODEL.heldOutAccuracy} was{' '}
              {MODEL.heldOutCaveat}. That figure does not describe performance
              on photographs taken in commercial growing environments.
            </li>
            <li>{MODEL.productionNote}</li>
            <li>
              The model recognises only these classes:{' '}
              {MODEL.classes.join(', ')}. Any other condition, pathogen, pest,
              abiotic disorder, or species will be forced into one of these
              classes and the result will be wrong.
            </li>
            <li>
              The model was developed for <em>Agaricus bisporus</em>. Results
              for any other species are meaningless.
            </li>
          </ul>
          <p>
            The <Link href="/model-card">model card</Link> documents the
            training data, the evaluation, and the known failure modes in full.
            Confirm any result with a qualified plant pathologist or your
            extension educator before acting on it.
          </p>

          <h3>4. Crop protection and pesticide information</h3>
          <p>
            Where the platform presents information about disease management,
            sanitation, or crop protection products, that information is
            provided for research and educational reference only. It is not a
            recommendation.
          </p>
          <ul className="legal-list">
            <li>
              Pesticide registration, permitted crops, application rates,
              re-entry intervals, and harvest intervals differ by jurisdiction
              and change over time. Information here may be out of date or
              inapplicable where you operate.
            </li>
            <li>
              The product label is the law. You must read and follow the label
              of any product you apply. Applying a product in a manner
              inconsistent with its labelling is unlawful in the United States.
            </li>
            <li>
              Nothing here authorises any pesticide application. Consult your
              state pesticide regulatory agency, your certified crop adviser, or
              your extension educator.
            </li>
            <li>
              No endorsement of any named product is intended, and no criticism
              of unnamed products is implied.
            </li>
          </ul>

          <h3>5. Accounts</h3>
          <p>
            Some features require an account. You agree to provide accurate
            information, keep your credentials confidential, and be responsible
            for activity under your account. We may suspend accounts that
            violate these Terms. Request deletion at any time by writing to{' '}
            <a href={`mailto:${PROJECT.contactEmail}`}>{PROJECT.contactEmail}</a>.
          </p>

          <h3>6. Images you submit</h3>
          <p>
            Submission to the community dataset is governed by the{' '}
            <Link href="/data-license">Contributor Agreement</Link>, which you
            accept at the point of upload. In summary, you confirm you hold the
            necessary rights in each image and license it for inclusion in an
            openly published research dataset under the{' '}
            <a href={DATA_LICENSE.url} target="_blank" rel="noopener noreferrer">
              {DATA_LICENSE.short}
            </a>{' '}
            licence.
          </p>
          <p>
            Do not submit images containing identifiable people, personal
            information, third-party copyrighted material, or anything you are
            contractually obliged to keep confidential.
          </p>

          <h3>7. Images you analyse</h3>
          <p>
            The identification tool runs entirely in your browser. Images you
            analyse are not transmitted to our servers and are not stored by us,
            unless you separately choose to contribute them to the dataset.
          </p>

          <h3>8. Acceptable use</h3>
          <p>You agree not to:</p>
          <ul className="legal-list">
            <li>
              present platform outputs as a certified diagnosis, an official
              Penn State determination, or a regulatory clearance;
            </li>
            <li>
              use the platform or its data to make claims about the health,
              quality, or safety of any identified grower&rsquo;s product;
            </li>
            <li>
              upload unlawful content, malware, or content you lack the rights
              to share;
            </li>
            <li>
              attempt to re-identify the origin of dataset records or
              deanonymise contributors;
            </li>
            <li>impose unreasonable load through automated access.</li>
          </ul>

          <h3>9. Platform software and content</h3>
          <p>
            Dataset contents are released under the{' '}
            <a href={DATA_LICENSE.url} target="_blank" rel="noopener noreferrer">
              {DATA_LICENSE.short}
            </a>{' '}
            licence. Penn State names, marks, and logos are not licensed by that
            and remain the property of The Pennsylvania State University.
          </p>

          <h3>10. Third-party services</h3>
          <p>
            The platform relies on third-party infrastructure, including Vercel
            (hosting), Supabase (authentication, database, file storage), and a
            public content delivery network used to load the model file. See the{' '}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <h3>11. Availability</h3>
          <p>
            The platform is provided on a best-effort basis by a research group.
            It may be unavailable, altered, or discontinued at any time without
            notice. Archived dataset releases are deposited at Zenodo (DOI{' '}
            {PROJECT.zenodoDoi}) so published data remain citable independently
            of the platform.
          </p>

          <h3>12. Disclaimer of warranties</h3>
          <p>
            The platform, its model, and its content are provided
            &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranty
            of any kind, express or implied, including any implied warranty of
            merchantability, fitness for a particular purpose, accuracy, or
            non-infringement.
          </p>

          <h3>13. Limitation of liability</h3>
          <p>
            To the fullest extent permitted by law, neither The Pennsylvania
            State University nor the platform&rsquo;s contributors shall be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, or for any loss of crop, yield, revenue, profit,
            or data, arising out of your use of or reliance on the platform.
          </p>

          <h3>14. Changes to these Terms</h3>
          <p>
            We may revise these Terms. The date above will change and material
            revisions will be noted on this page. Continued use after a revision
            constitutes acceptance. Revisions do not retroactively alter the
            licence under which previously contributed data were released.
          </p>

          <h3>15. Governing law</h3>
          <p>
            These Terms are governed by the laws of the Commonwealth of
            Pennsylvania, without regard to its conflict of law provisions, and
            subject to any applicable immunities of The Pennsylvania State
            University.
          </p>

          <h3>16. Contact</h3>
          <p>
            <a href={`mailto:${PROJECT.contactEmail}`}>{PROJECT.contactEmail}</a>
            {' · '}
            <Link href="/contact">Contact page</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
