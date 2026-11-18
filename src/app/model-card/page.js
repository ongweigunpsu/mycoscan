'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { MODEL, PROJECT } from '@/lib/legal-config';

export default function ModelCardPage() {
  return (
    <>
      <Nav />
      <div className="page page-narrow">
        <div className="page-head">
          <div className="eyebrow">Model documentation</div>
          <h1>Model Card</h1>
        </div>

        <p className="about-lede">
          What the identification model was trained on, how it was evaluated,
          and where it fails.
        </p>

        <div className="legal-callout">
          <h3>Headline finding</h3>
          <p>
            The model reaches {MODEL.heldOutAccuracy} accuracy on held-out
            images from the dataset it was trained on, and fails on roughly four
            out of five images taken in a real production room. The gap is
            caused by distribution shift between studio-acquired training images
            and commercial growing environments. Treat the model as a
            demonstration of the analysis pipeline, not as a working diagnostic
            tool.
          </p>
        </div>

        <div className="about-body">
          <h3>Model details</h3>
          <dl className="spec-list">
            <div><dt>Task</dt><dd>Single-label image classification</dd></div>
            <div><dt>Architecture</dt><dd>{MODEL.architecture}</dd></div>
            <div><dt>Runtime</dt><dd>{MODEL.runtime}</dd></div>
            <div><dt>Input</dt><dd>RGB photograph, resized to the network input size</dd></div>
            <div><dt>Output</dt><dd>Probability over {MODEL.classes.length} classes</dd></div>
            <div><dt>Classes</dt><dd>{MODEL.classes.join(', ')}</dd></div>
            <div><dt>Target organism</dt><dd><em>Agaricus bisporus</em></dd></div>
            <div><dt>Owner</dt><dd>{PROJECT.responsibleUnit}</dd></div>
          </dl>

          <h3>Training data</h3>
          <p>
            The model was trained on the {MODEL.trainingSource}. These images
            were captured under controlled conditions: consistent illumination,
            plain backgrounds, individual or small groups of mushrooms, and
            framing chosen to show the symptom clearly.
          </p>
          <p>
            No images from Penn State production rooms, and no images
            contributed through this platform, were used in training the
            currently deployed model.
          </p>

          <h3>Evaluation on held-out studio images</h3>
          <p>
            Accuracy was {MODEL.heldOutAccuracy}, {MODEL.heldOutCaveat}. Because
            the held-out images share illumination, background, framing and
            camera characteristics with the training images, this figure
            measures how well the model separates classes under studio
            conditions. It is not an estimate of field performance and should
            not be quoted without this context.
          </p>

          <h3>Evaluation on production-room images</h3>
          <p>{MODEL.productionNote}</p>
          <p>
            Production-room imagery differs from the training distribution in
            several respects at once: low and coloured artificial lighting,
            dense beds with many overlapping mushrooms, casing soil and peat in
            frame, motion blur and handheld framing, and varying phone camera
            pipelines with their own colour processing and compression. Any one
            of these shifts degrades a classifier trained on studio images.
            Together they dominate the prediction.
          </p>

          <h3>Intended use</h3>
          <ul className="legal-list">
            <li>Demonstrating the platform&rsquo;s in-browser analysis pipeline.</li>
            <li>
              Teaching and outreach about the distinction between benchmark
              accuracy and field performance.
            </li>
            <li>
              Serving as a documented baseline against which models trained on
              production imagery can be compared.
            </li>
          </ul>

          <h3>Out-of-scope use</h3>
          <ul className="legal-list">
            <li>Deciding whether to treat, harvest, cull or discard a crop.</li>
            <li>Any pesticide application decision.</li>
            <li>Certification, grading, insurance or regulatory determinations.</li>
            <li>Species other than <em>Agaricus bisporus</em>.</li>
            <li>
              Conditions outside the {MODEL.classes.length} supported classes.
              Any such condition will be assigned to one of the supported
              classes with misleading confidence.
            </li>
          </ul>

          <h3>Known failure modes</h3>
          <ul className="legal-list">
            <li>
              <strong>Domain shift.</strong> Production-room photographs are
              misclassified at a high rate.
            </li>
            <li>
              <strong>Closed-set assumption.</strong> The model cannot say
              &ldquo;unknown&rdquo;. Out-of-class inputs, including photographs
              of unrelated objects, still produce a confident class.
            </li>
            <li>
              <strong>Confidence is not calibrated.</strong> The reported
              probability does not correspond to the likelihood of being
              correct, and is especially unreliable off-distribution.
            </li>
            <li>
              <strong>Early-stage symptoms.</strong> The model operates on
              visible RGB symptoms. Pre-symptomatic and very early infection is
              not detectable in this modality.
            </li>
            <li>
              <strong>Single-label.</strong> Co-occurring conditions on the same
              sample cannot be represented.
            </li>
          </ul>

          <h3>Gaps in this documentation</h3>
          <p>
            The following have not yet been measured and will be added as they
            are completed: per-class precision and recall, confusion matrix,
            calibration curves, per-class counts in the training split, and a
            quantified comparison between studio and production performance
            under matched conditions.
          </p>

          <h3>How this will be improved</h3>
          <p>
            The binding constraint is labelled imagery captured in commercial
            growing conditions, not model architecture. Planned work, in order:
            collection of labelled production-room images under a documented
            annotation protocol; augmentation and domain adaptation to narrow
            the studio-to-production gap; retraining and re-evaluation with the
            gap reported explicitly.
          </p>

          <h3>Contact</h3>
          <p>
            Report a misclassification or request details of the evaluation:{' '}
            <a href={`mailto:${PROJECT.contactEmail}`}>{PROJECT.contactEmail}</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
