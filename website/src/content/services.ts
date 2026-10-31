import type { Service } from "@/types/content";

export const services: readonly Service[] = [
  {
    slug: "slope-stabilisation",
    title: "Slope Stabilisation",
    shortTitle: "Slope stabilisation",
    category: "Slope Stabilization & Rockfall",
    summary:
      "Integrated slope protection measures for road corridors, infrastructure platforms and exposed rock faces.",
    introduction:
      "Slope stabilisation combines thorough geological assessment, engineered restraint systems, surface protection and controlled execution to eliminate rockfall hazards and mitigate catastrophic slope failures along critical infrastructure corridors in Oman.",
    targetGeology:
      "Fractured limestone, steep mountain highway cuttings, weathered slopes and wadi embankments.",
    typicalEquipment: [
      "Tracked Hydraulic Drilling Rigs",
      "High-Pressure Shotcrete Units",
      "Rope-Access Rigging Gear",
    ],
    fieldTesting:
      "Hydraulic pull-out testing, drainage flow verification, and continuous bench stability checks.",
    methods: [
      "Deep cable anchoring",
      "Self-drilling rock bolting",
      "High-pressure shotcreting",
      "Sub-surface drainage & ditch lining",
      "Flexible steel wire netting",
    ],
    capabilities: [
      "Ground and cable anchors",
      "Self-drilling anchors and rock bolts",
      "Shotcrete and surface protection",
      "Drain holes and erosion-control measures",
      "Wire netting and rockfall protection systems",
    ],
    applications: [
      "Mountain road cuttings and highway corridors",
      "Infrastructure platforms and deep construction excavations",
      "Exposed rock faces requiring active or passive restraint",
      "Wadi embankments and steep water pipeline trenches",
    ],
    relatedProjectSlugs: [
      "al-ubaidah-fayyad-road",
      "wilayat-manah",
      "al-kamil-sur-road",
    ],
    relatedServiceSlugs: [
      "ground-anchors-and-rock-bolting",
      "shotcrete-and-wire-netting",
      "rockfall-protection",
    ],
  },
  {
    slug: "ground-anchors-and-rock-bolting",
    title: "Ground Anchors and Rock Bolting",
    shortTitle: "Anchors and rock bolts",
    category: "Slope Stabilization & Rockfall",
    summary:
      "Targeted rock reinforcement and anchoring systems engineered to restrain unstable rock masses and support retention structures.",
    introduction:
      "Ground anchors, cable anchors and self-drilling rock bolts provide concentrated reinforcement where fractured rock masses or excavated faces require mechanical restraint to maintain equilibrium under static and seismic conditions.",
    targetGeology:
      "Stratified and jointed rock masses, unstable slope wedges, and deep retention cuts.",
    typicalEquipment: [
      "Rotary Percussive Drilling Rigs",
      "Automated Colloidal Grout Mixers",
      "Calibrated Hollow-Cylinder Jacks",
    ],
    fieldTesting:
      "Proof loading to 120-150% design load, anchor lift-off tests, and grout compressive strength analysis.",
    methods: [
      "Prestressed ground & cable anchors",
      "Passive & active rock bolting",
      "Self-drilling hollow-bar installations",
      "High-pressure cementitious grouting",
      "Proof loading and anchor lift-off verification",
    ],
    capabilities: [
      "Ground and cable anchors",
      "Self-drilling anchors",
      "Rock bolt installation",
      "Drilling and grouting support",
      "Integration with wire netting and shotcrete systems",
    ],
    applications: [
      "Fractured rock cuttings along mountain highways",
      "Retaining walls and basement excavation shoring",
      "Tension anchors for foundations and dam structures",
      "Combined slope-stabilisation and rockfall mitigation",
    ],
    relatedProjectSlugs: [
      "khasab-lima-road",
      "al-sharqiyah-region",
      "al-ubaidah-fayyad-road",
    ],
    relatedServiceSlugs: [
      "slope-stabilisation",
      "shotcrete-and-wire-netting",
      "rockfall-protection",
    ],
  },
  {
    slug: "shotcrete-and-wire-netting",
    title: "Shotcrete and Wire Netting",
    shortTitle: "Shotcrete and wire netting",
    category: "Slope Stabilization & Rockfall",
    summary:
      "Surface protection systems for exposed rock cuts and weathered slopes, integrated with pattern anchoring and controlled drainage.",
    introduction:
      "Shotcrete and high-tensile wire netting can be deployed individually or as a composite reinforcement system to arrest weathering, prevent surface ravelling, and restrain loose rock fragments adjacent to active roads and utilities.",
    targetGeology:
      "Friable rock cuts, weathered shale, and unraveling highway benches subject to thermal erosion.",
    typicalEquipment: [
      "Wet/Dry Shotcrete Concrete Pumps",
      "Wire Mesh Unrolling Winches",
      "Sub-Horizontal Berm Drills",
    ],
    fieldTesting:
      "Cored compressive strength testing, wire mesh tensile anchorage tests, and weep-hole discharge logging.",
    methods: [
      "Dry-mix and wet-mix shotcreting",
      "Steel wire netting drape & pinned systems",
      "Perforated PVC sub-horizontal drain holes",
      "Concrete bench drainage and ditch lining",
      "Weep hole and geocomposite integration",
    ],
    capabilities: [
      "Shotcrete application",
      "Wire netting installation",
      "Anchor and rock bolt integration",
      "Ditch lining",
      "Drain-hole installation",
    ],
    applications: [
      "Roadside cuttings and expressway shoulders",
      "Weathered rock faces near utility assets",
      "Steep cut slopes requiring surface protection and drainage",
      "Pipeline trenches and open civil excavations",
    ],
    relatedProjectSlugs: [
      "al-ubaidah-fayyad-road",
      "wilayat-manah",
      "al-sharqiyah-region",
    ],
    relatedServiceSlugs: [
      "slope-stabilisation",
      "ground-anchors-and-rock-bolting",
      "rockfall-protection",
    ],
  },
  {
    slug: "rockfall-protection",
    title: "Rockfall Protection",
    shortTitle: "Rockfall protection",
    category: "Slope Stabilization & Rockfall",
    summary:
      "Engineered barriers, wire drapery and intercepted slope systems designed for hazardous mountain corridors in Oman.",
    introduction:
      "Rockfall protection combines passive interception barriers, pinned drapery systems and active face bolting tailored to the trajectory, impact energy and geomorphology of Oman's rugged mountain terrain.",
    targetGeology:
      "Vertical sea-cliffs, towering rock crags, and boulder overhangs above active traffic lanes.",
    typicalEquipment: [
      "Heavy Mobile Cranes & Suspended Cages",
      "Certified Industrial Rope Access Gear",
      "High-Tensile Wire Mesh Rigging",
    ],
    fieldTesting:
      "Energy dissipation brake-ring verification, foundation post proof tests, and anchor pull testing.",
    methods: [
      "Dynamic rockfall catch barriers",
      "Pinned high-tensile steel netting",
      "Attenuator fence installations",
      "Rope-access slope scaling & preparation",
      "Energy dissipation anchor systems",
    ],
    capabilities: [
      "Rockfall barriers",
      "Wire netting and mesh systems",
      "Rock bolts and anchors",
      "Natural-hazard protection measures",
      "Associated slope preparation",
    ],
    applications: [
      "Steep coastal roads and mountain highways",
      "Transport corridors beneath vertical rock cliffs",
      "Water treatment plants and municipal assets",
      "Quarry perimeters and industrial plant access corridors",
    ],
    relatedProjectSlugs: ["khasab-lima-road", "al-sharqiyah-region"],
    relatedServiceSlugs: [
      "slope-stabilisation",
      "ground-anchors-and-rock-bolting",
      "shotcrete-and-wire-netting",
    ],
  },
  {
    slug: "ground-improvement-and-grouting",
    title: "Ground Improvement and Grouting",
    shortTitle: "Ground improvement and grouting",
    category: "Ground Improvement & Grouting",
    summary:
      "Specialist grouting and ground modification techniques for permeable, voided, weak or water-bearing sub-surface formations.",
    introduction:
      "Ground improvement techniques modify in-situ soil and rock properties to increase bearing capacity, arrest water ingress, and fill geological voids prior to foundation construction or deep excavation.",
    targetGeology:
      "Permeable sands, karstic limestone cavities, voided alluvial gravels, and fractured water-bearing rock.",
    typicalEquipment: [
      "High-Pressure Jet Grouting Pumps",
      "Tube à Manchette (TAM) Injection Units",
      "Electronic Flow & Pressure Monitoring Systems",
    ],
    fieldTesting:
      "Lugeon water pressure tests before and after grouting, core sample recovery, and ultrasonic integrity logging.",
    methods: [
      "High-pressure jet grouting",
      "TAM (Tube à Manchette) grouting",
      "Fissure and rock void permeation",
      "Polyurethane and chemical resin injection",
      "Deep drilling and water cut-off barriers",
    ],
    capabilities: [
      "Jet and TAM grouting",
      "Fissure, chemical and cavity grouting",
      "Deep-hole drilling and grouting",
      "Water-leakage arresting work",
      "Ground-improvement design-and-build coordination",
    ],
    applications: [
      "Subsurface ground strengthening and settlement control",
      "Water cut-off curtains for basements and shafts",
      "Cavity and fissure treatment in karstic or fractured strata",
      "Tunnelling breakout and portal ground conditioning",
    ],
    relatedProjectSlugs: [],
    relatedServiceSlugs: [
      "piling-and-foundation-engineering",
      "tunnelling-and-underground-works",
      "infrastructure-rehabilitation",
    ],
  },
  {
    slug: "piling-and-foundation-engineering",
    title: "Piling and Foundation Engineering",
    shortTitle: "Piling and foundations",
    category: "Piling & Deep Foundations",
    summary:
      "Specialist piling, retaining walls and deep-foundation engineering for demanding structural loads and constrained urban sites.",
    introduction:
      "Foundation and earth-retention systems are engineered to transfer structural loads through weak ground to competent bedrock, providing rigid excavation support while safeguarding adjacent buildings and infrastructure.",
    targetGeology:
      "Weak surface soils, urban reclaimed ground, sabkha, and deep overburden overlying sound bedrock.",
    typicalEquipment: [
      "Hydraulic Rotary Piling Rigs",
      "Continuous Flight Auger (CFA) Systems",
      "High-Capacity Micropile Drills",
    ],
    fieldTesting:
      "Static axial compression and lateral pile load testing, Pile Integrity Testing (PIT), and Crosshole Sonic Logging (CSL).",
    methods: [
      "Secant and contiguous bored piling",
      "High-capacity micropiling in rock",
      "Soldier piles with timber/concrete lagging",
      "Diaphragm wall construction",
      "King post and plunge column installation",
    ],
    capabilities: [
      "Secant and contiguous piling",
      "Soldier and sheet piling",
      "Micropiling",
      "King posts and plunge columns",
      "Diaphragm walls",
    ],
    applications: [
      "Deep multi-level basement excavations",
      "Bridge abutment and highway flyover foundations",
      "Heavy industrial and commercial foundation systems",
      "Underpinning and settlement mitigation for existing structures",
    ],
    relatedProjectSlugs: [],
    relatedServiceSlugs: [
      "ground-improvement-and-grouting",
      "infrastructure-rehabilitation",
      "tunnelling-and-underground-works",
    ],
  },
  {
    slug: "tunnelling-and-underground-works",
    title: "Tunnelling and Underground Works",
    shortTitle: "Tunnelling and underground works",
    category: "Underground & Specialist Works",
    summary:
      "Specialist underground excavation, ground support, shaft sinking and microtunnelling methods for transport and utilities.",
    introduction:
      "Underground construction requires rigorous advance ground assessment, systematic rock support, and coordinated structural lining to safely advance through variable geological strata.",
    targetGeology:
      "Faulted rock zones, variable lithology, sub-surface utility corridors, and deep underground caverns.",
    typicalEquipment: [
      "Sequential Excavation Rigs & Roadheaders",
      "Forepoling Canopy & Spiling Units",
      "Microtunnelling & Pipe Jacking Systems",
    ],
    fieldTesting:
      "3D optical convergence monitoring, extensometer settlement logging, and core compressive verification.",
    methods: [
      "Sequential excavation (NATM / SEM)",
      "Cut-and-cover underground structures",
      "Pipe roofing, spiling and forepoling canopies",
      "Shaft sinking and underground cavern excavation",
      "TBM and microtunnelling utility crossings",
    ],
    capabilities: [
      "NATM and cut-and-cover tunnelling",
      "Cross passages, pipe roofing and forepoling",
      "Shaft and cavern excavation",
      "Pipe jacking and microtunnelling",
      "TBM metro and sewer tunnels",
    ],
    applications: [
      "Road, rail and utility tunnels",
      "Surge shafts and underground power station caverns",
      "Deep stormwater and sewer transmission corridors",
      "Trenchless highway and rail crossings",
    ],
    relatedProjectSlugs: [],
    relatedServiceSlugs: [
      "infrastructure-rehabilitation",
      "ground-improvement-and-grouting",
      "piling-and-foundation-engineering",
    ],
  },
  {
    slug: "infrastructure-rehabilitation",
    title: "Infrastructure Rehabilitation",
    shortTitle: "Infrastructure rehabilitation",
    category: "Underground & Specialist Works",
    summary:
      "Specialist geotechnical remediation for existing transport, dam, bridge and utility assets experiencing ground movement or structural distress.",
    introduction:
      "Infrastructure rehabilitation combines non-destructive forensic assessment, engineered ground intervention and structural strengthening to extend the operational life of civil assets without requiring full replacement.",
    targetGeology:
      "Settled bridge piers, leaking dam abutments, creeping road embankments, and deteriorated tunnel liners.",
    typicalEquipment: [
      "Low-Headroom Microdrilling Rigs",
      "Pressure-Relief Core Drills",
      "Chemical Resin Grout Proportioners",
    ],
    fieldTesting:
      "In-situ crack displacement telemetry, piezometric seepage logging, and structural load monitoring.",
    methods: [
      "Tunnel lining remediation & void grouting",
      "Dam foundation seepage control & pressure relief",
      "Bridge pier scour protection & micropile underpinning",
      "Deep-seated rotational slope remediation",
      "Gabion and anchored concrete retaining systems",
    ],
    capabilities: [
      "Tunnel rehabilitation",
      "Dam and bridge rehabilitation",
      "Deep-seated failure treatment",
      "Gabion and concrete retaining walls",
      "Associated road and structural works",
    ],
    applications: [
      "Existing highways affected by slope creep or subsidence",
      "Dams, reservoirs and water distribution facilities",
      "Aging bridges and viaduct foundations",
      "Underground culverts, tunnels and drainage channels",
    ],
    relatedProjectSlugs: [],
    relatedServiceSlugs: [
      "slope-stabilisation",
      "tunnelling-and-underground-works",
      "ground-improvement-and-grouting",
    ],
  },
] as const;

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
