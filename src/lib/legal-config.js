/**
 * MycoScan — single source of truth for policy pages and public claims.
 *
 * Any figure quoted on the site should come from here, so the homepage,
 * the About page and the Model Card can never drift apart again.
 */

export const MODEL = {
  architecture: 'ResNet-50',
  runtime: 'ONNX Runtime, executed in the browser',
  classes: [
    'bacterial-spot',
    'dry-blister',
    'healthy',
    'spider-web',
    'wet-blister',
  ],
  trainingSource:
    'Albayrak et al. studio-acquired Agaricus bisporus image dataset',
  heldOutAccuracy: '98.7%',
  heldOutCaveat:
    'measured on a held-out split of the same studio-acquired dataset used for training',
  productionNote:
    'Evaluated against imagery captured in Penn State production rooms, where approximately 80% of samples were misclassified. The model has not been validated for use on production-house imagery.',
};

export const PROJECT = {
  responsibleUnit:
    'Department of Agricultural and Biological Engineering, The Pennsylvania State University',
  researchCenter: 'Penn State Mushroom Research Center',
  principalInvestigator: 'Dr. Shirin Ghatrehsamani',
  zenodoDoi: '10.5281/zenodo.21420276',
  accessibilityEmail: 'accessibility@psu.edu',

  // REPLACE before this goes live. A policy page with a placeholder
  // contact is worse than no policy page.
  contactEmail: 'wfw5324@psu.edu',

  // ROAR group storage. Master copy of imagery.
  groupStoragePath: '/storage/group/spg5994/default',
};

/**
 * Data licence. Currently CC BY-NC 4.0 across the site.
 *
 * Scientific Data (Nature) does not consider datasets with restrictions on
 * commercial reuse, CC BY-NC included. If that venue matters, this has to
 * become CC-BY-4.0 or CC0-1.0 before the first contributor accepts terms.
 *
 * Changing it afterwards means re-obtaining consent from every contributor.
 */
export const DATA_LICENSE = {
  id: 'CC-BY-NC-4.0',
  short: 'CC BY-NC 4.0',
  name: 'Creative Commons Attribution-NonCommercial 4.0 International',
  url: 'https://creativecommons.org/licenses/by-nc/4.0/',
};
