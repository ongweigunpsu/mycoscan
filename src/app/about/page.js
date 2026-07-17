'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Nav />
      <div className="page page-narrow">
        <div className="page-head">
          <div className="eyebrow">About the platform</div>
          <h1>Open science for mushroom health</h1>
        </div>

        <p className="about-lede">
          MycoScan is an open-access platform that brings together disease imagery,
          AI-assisted identification, and integrated pest management decision support
          for <em>cultivated mushrooms</em> — built to shorten the distance between a
          symptom in the growing room and an informed response.
        </p>

        <div className="about-body">
          <p>
            Mushroom cultivation is a high-value, high-density system in which disease
            can move quickly and costs mount fast. Yet compared with major field crops,
            open tools and shared data for mushroom disease remain scarce. MycoScan is a
            step toward closing that gap: a shared, openly licensed resource that any
            researcher or grower can build on.
          </p>

          <h3>What the platform offers</h3>
          <p>
            The <strong>Community Dataset</strong> collects labeled imagery across RGB,
            hyperspectral, and thermal modalities, each record carrying structured
            metadata. The <strong>Identification</strong> tool runs a trained
            convolutional model directly in the browser, classifying a specimen across
            five disease states without uploading the image. The
            {' '}<strong>Decision Support</strong> module translates a diagnosis into
            region-appropriate management actions, and the
            {' '}<strong>Disease Library</strong> documents the biology and control of
            the major pathogens.
          </p>

          <h3>The identification model</h3>
          <p>
            The classifier is a ResNet-50 network trained on white-light imagery of
            <em> Agaricus bisporus </em> disease states, reaching 98.7% accuracy on a
            held-out test set. It runs locally through the browser using ONNX Runtime,
            so identification is fast, private, and free to use. As the community dataset
            grows, the model will be periodically retrained and expanded.
          </p>

          <h3>Open access</h3>
          <p>
            All contributed data is shared under the Creative Commons BY-NC 4.0 license,
            free for non-commercial research and education. The platform is developed and
            maintained by the Penn State Mushroom Research Center and the Department of
            Agricultural and Biological Engineering, in collaboration with partner
            institutions.
          </p>

          <h3>A note on treatment guidance</h3>
          <p>
            Management recommendations are provided for decision support only. Pesticide
            registrations and permitted uses differ by country and change over time, and
            chemical guidance in the platform is under ongoing review by extension
            specialists. Always follow the product label and consult your local extension
            service before any application.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
