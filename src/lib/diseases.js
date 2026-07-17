// ============================================================
// MycoScan — shared domain data
// Model classes match the trained ResNet-50 (ONNX) output order.
// ============================================================

// ONNX output index order — MUST match training class order:
// ['bacterial-spot', 'dry-blister', 'healthy', 'spider-web', 'wet-blister']
export const MODEL_CLASSES = [
  'bacterial-spot',
  'dry-blister',
  'healthy',
  'spider-web',
  'wet-blister',
];

// Presentation metadata for each model class
export const CLASS_INFO = {
  'healthy': {
    label: 'Healthy',
    latin: 'Agaricus bisporus',
    severity: 'healthy',
    blurb: 'No disease indicators detected. Fruiting body morphology within normal range.',
    libKey: null,
  },
  'dry-blister': {
    label: 'Dry Bubble',
    latin: 'Lecanicillium fungicola',
    severity: 'sev3',
    blurb: 'The most economically damaging disease of cultivated A. bisporus.',
    libKey: 'dry_bubble',
  },
  'wet-blister': {
    label: 'Wet Bubble',
    latin: 'Mycogone perniciosa',
    severity: 'sev3',
    blurb: 'Produces malformed, undifferentiated masses with amber exudate.',
    libKey: 'wet_bubble',
  },
  'spider-web': {
    label: 'Cobweb',
    latin: 'Cladobotryum spp.',
    severity: 'sev2',
    blurb: 'Fast-spreading mycelial overgrowth across casing and fruiting bodies.',
    libKey: 'cobweb',
  },
  'bacterial-spot': {
    label: 'Bacterial Blotch',
    latin: 'Pseudomonas tolaasii',
    severity: 'sev2',
    blurb: 'Brown cap discoloration triggered by surface moisture films.',
    libKey: 'bacterial_blotch',
  },
};

export const SEVERITY_COLORS = {
  healthy: '#2E8B6F',
  sev1: '#4A90A4',
  sev2: '#C8922E',
  sev3: '#C0611E',
  sev4: '#A32E1C',
};

// ============================================================
// Disease Library — full reference content
// ============================================================
export const DISEASES = [
  {
    key: 'dry_bubble',
    specimenNo: 'MRC-DB-001',
    name: 'Dry Bubble',
    latin: 'Lecanicillium fungicola',
    severity: 'sev3',
    severityLabel: 'High impact',
    desc: 'The most economically damaging disease of cultivated Agaricus bisporus, capable of causing 15–30% yield loss per cropping cycle. Infection spreads through contaminated casing soil and airborne conidia, with symptom severity dependent on the growth stage at time of infection.',
    symptoms: 'Brown necrotic cap lesions, stipe distortion and splitting, and undifferentiated tissue masses ("dry bubbles"). Late infections produce a characteristic white fluffy mycelium over deformed fruiting bodies.',
    lifecycle: 'Conidia germinate on the casing surface and penetrate developing pins. The pathogen follows an invasive necrotrophic strategy — earlier infection produces more severe morphological disruption.',
    management: 'Hygiene-based prevention is primary: clean casing material, filtered air handling, and immediate removal of symptomatic mushrooms with surrounding substrate. Chemical control is region-dependent.',
  },
  {
    key: 'wet_bubble',
    specimenNo: 'MRC-WB-002',
    name: 'Wet Bubble',
    latin: 'Mycogone perniciosa',
    severity: 'sev3',
    severityLabel: 'High impact',
    desc: 'A devastating fungal disease that produces malformed, undifferentiated tissue masses covered in amber-brown liquid droplets. Spores spread via water splash, worker movement, and contaminated tools, and can persist in growing rooms between crops.',
    symptoms: 'Distorted "sclerodermoid" mushrooms with amber droplets on the surface, white cottony mycelium, and a foul odor in advanced stages. Early primordia infection prevents normal cap and stipe differentiation.',
    lifecycle: 'The mycoparasite adheres to and penetrates A. bisporus at any stage of fruiting body development, producing thick-walled chlamydospores that survive between cropping cycles.',
    management: 'Strict room hygiene and end-of-crop steam pasteurization. Avoid overhead watering on infected beds. Chemical options are region-dependent and increasingly restricted.',
  },
  {
    key: 'cobweb',
    specimenNo: 'MRC-CW-003',
    name: 'Cobweb Disease',
    latin: 'Cladobotryum spp.',
    severity: 'sev2',
    severityLabel: 'Moderate impact',
    desc: 'A fast-growing pathogen that covers mushrooms and casing with fine, cobweb-like mycelium. Spreads rapidly through airborne spores, and is particularly problematic in high-humidity environments with poor air movement.',
    symptoms: 'Fine white-to-grey mycelium spreading across the casing surface and enveloping fruiting bodies. Affected mushrooms become soft, discolored, and unmarketable within days.',
    lifecycle: 'Rapid superficial mycelial growth from airborne or splash-dispersed conidia. Sporulation is prolific, enabling explosive secondary spread across a growing room.',
    management: 'Reduce humidity and increase air movement. Apply salt directly to affected spots to prevent sporulation. Remove and bag affected mushrooms before disturbing. Chemical control region-dependent.',
  },
  {
    key: 'bacterial_blotch',
    specimenNo: 'MRC-BB-004',
    name: 'Bacterial Blotch',
    latin: 'Pseudomonas tolaasii',
    severity: 'sev2',
    severityLabel: 'Quality impact',
    desc: 'A bacterial infection causing brown discoloration on mushroom caps. Triggered by persistent water films on caps combined with high humidity. Primarily reduces marketable quality rather than total yield.',
    symptoms: 'Yellow-to-brown blotches on cap surfaces, often with a slimy texture. Discoloration typically worsens after harvest and during storage.',
    lifecycle: 'The bacterium multiplies rapidly in free water on the cap surface, producing the toxin tolaasin that breaks down cell membranes and causes the characteristic blotch.',
    management: 'Control watering to minimize surface water films. Improve air circulation to promote rapid cap drying. Reduce humidity during pinning. Calcium-based sprays can reduce incidence.',
  },
  {
    key: 'green_mold',
    specimenNo: 'MRC-GM-005',
    name: 'Green Mold',
    latin: 'Trichoderma spp.',
    severity: 'sev3',
    severityLabel: 'High impact',
    desc: 'An aggressive competitor mold that colonizes compost and casing, outcompeting A. bisporus mycelium. Often indicates deficiencies in composting or pasteurization, and produces distinctive green sporulating patches.',
    symptoms: 'Green sporulating patches on the casing or compost surface, reduced pinning and yield in affected zones, and a sour compost odor in severe cases.',
    lifecycle: 'Spores germinate in nutrient-rich substrate and colonize aggressively where the mushroom mycelium is weak. Sporulation produces vast numbers of green conidia that spread readily.',
    management: 'Improve Phase I and II composting quality, maintain proper pasteurization temperatures, remove contaminated substrate immediately, and increase ventilation.',
  },
  {
    key: 'virus_x',
    specimenNo: 'MRC-VX-006',
    name: 'Mushroom Virus X',
    latin: 'MVX complex',
    severity: 'sev2',
    severityLabel: 'Variable impact',
    desc: 'A complex of double-stranded RNA viruses causing a range of symptoms including browning, malformation, and premature veil opening. Transmitted through mycelial contact and spores, with no chemical treatment available.',
    symptoms: 'Cap browning, premature veil breaking, elongated stipes, reduced or delayed yield, and off-colored patches. Symptom expression varies widely with the viral composition.',
    lifecycle: 'Viruses propagate within the mushroom mycelium and transmit via anastomosis and spores. Multiple viral species can co-infect a single crop.',
    management: 'No chemical treatment exists. Rely on strict hygiene, virus-free spawn, end-of-crop steam pasteurization, and air filtration between rooms.',
  },
];

// ============================================================
// DSS — region-differentiated IPM recommendations
// Chemical availability reflects current major-market regulatory status.
// NOTE: Content pending review by MRC extension specialists.
// ============================================================
export const REGIONS = [
  { id: 'north_america', label: 'North America (USA / Canada)' },
  { id: 'eu', label: 'European Union' },
  { id: 'asia', label: 'Asia (China / Japan / others)' },
];

export const DSS = {
  dry_bubble: {
    north_america: {
      chemical: [
        { text: 'Prochloraz-manganese, applied to casing per label', avail: 'yes' },
        { text: 'Chlorothalonil — use restricted; verify current label', avail: 'no' },
      ],
      biological: [
        'Bacillus subtilis-based biofungicides (QST 713 strains)',
        'Increase casing hygiene between breaks',
      ],
      prevention: [
        'Filter incoming air; maintain positive room pressure',
        'Remove symptomatic mushrooms with a 10 cm substrate margin',
        'Disinfect tools and footwear between rooms',
      ],
    },
    eu: {
      chemical: [
        { text: 'Prochloraz — banned in the EU since June 2023', avail: 'no' },
        { text: 'Metrafenone — primary option; monitor for resistance', avail: 'yes' },
      ],
      biological: [
        'Bacillus-based biocontrol agents',
        'Enhanced hygiene and steam-off protocols are essential',
      ],
      prevention: [
        'HEPA-filtered air handling',
        'Strict casing-source control',
        'End-of-crop cook-out at 70°C for 12 h',
      ],
    },
    asia: {
      chemical: [
        { text: 'Prochloraz-manganese — widely registered', avail: 'yes' },
        { text: 'Carbendazim — available; resistance monitoring advised', avail: 'yes' },
      ],
      biological: [
        'Bacillus subtilis preparations',
        'Tea tree oil formulations (where available)',
      ],
      prevention: [
        'Casing pasteurization',
        'Worker movement and tool hygiene protocols',
        'Ventilation management to control humidity',
      ],
    },
  },
  // Fallback template used for diseases without a full region matrix yet
  _default: {
    chemical: [
      { text: 'Chemical recommendations pending MRC extension review', avail: 'no' },
    ],
    biological: [
      'Bacillus-based biofungicides are a broadly available alternative',
      'Consult your local extension service for approved products',
    ],
    prevention: [
      'Maintain strict room and tool hygiene',
      'Remove and bag symptomatic mushrooms promptly',
      'Manage humidity and air movement to limit spread',
      'End-of-crop steam pasteurization',
    ],
  },
};

export function getDSS(libKey, region) {
  const entry = DSS[libKey];
  if (entry && entry[region]) return entry[region];
  return DSS._default;
}
