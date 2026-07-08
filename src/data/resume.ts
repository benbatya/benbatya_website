// Single source of truth for site content, derived from Benjamin Batya's résumé.

export interface Role {
  company: string;
  /** Short one-line description of the work. */
  summary: string;
}

export interface Project {
  slug: string;
  name: string;
  role: string;
  period: string;
  tagline: string;
  /** One-paragraph description for cards. */
  blurb: string;
  tech: string[];
}

export const profile = {
  name: 'Benjamin Batya',
  title: 'AI & Systems Engineering Consultant',
  tagline:
    'Senior software engineer with 20+ years architecting and optimizing high-performance systems — spanning AI development, extended reality, embedded platforms, and demanding graphics.',
  location: 'San Francisco Bay Area',
  email: 'benjaminbatya@gmail.com',
  linkedin: 'https://www.linkedin.com/in/benjaminbatya/',
  github: 'https://github.com/benbatya',
  resumeUrl: '/Ben_Batya_Resume.pdf',
  headshotUrl: '/head_shot.jpg',
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Languages',
    items: ['C/C++', 'TypeScript', 'React', 'Rust', 'Python', 'C#', 'Kotlin', 'Java', 'Hack', 'SQL'],
  },
  {
    group: 'UI / Graphics',
    items: ['Vulkan', 'OpenGL', 'WebGL', 'Metal', 'DirectX 11/12', 'ImGui', 'Qt/QML', 'VTK'],
  },
  {
    group: 'Platforms',
    items: ['Android', 'Windows', 'macOS', 'Linux', 'QNX', 'Xbox 360', 'PS3', 'nRF52'],
  },
  {
    group: 'Build / Source',
    items: ['Buck', 'Skylark', 'Soong', 'Make', 'CMake', 'Mercurial', 'Git', 'Perforce'],
  },
];

// What Benjamin offers as a consultant — AI + systems positioning.
export const services: { title: string; description: string }[] = [
  {
    title: 'AI-Assisted Engineering & Tooling',
    description:
      'Stand up AI development workflows, evaluation harnesses, and test infrastructure for engineering teams — cutting iteration and review time on complex codebases where off-the-shelf tooling falls short.',
  },
  {
    title: 'High-Performance Systems',
    description:
      'Architect and optimize latency- and throughput-critical software in C/C++ and Rust across desktop, mobile, and embedded targets — the deep-systems work most teams can\'t staff in-house.',
  },
  {
    title: 'Graphics, XR & Simulation',
    description:
      'Build cross-API rendering, simulation layers, and developer tooling (Vulkan, Metal, DX11/12, OpenXR) for XR, medical, and real-time visualization products that push the hardware.',
  },
];

export const roles: Role[] = [
  {
    company: 'Generation Alpha Transistor',
    summary: 'Test infrastructure and developer-experience consulting for an EDA/IC toolchain.',
  },
  {
    company: 'Meta Platforms',
    summary:
      'Led the Meta XR Simulator and Spatial Simulator — flagship XR developer tools that cut headset iteration time by up to 50%.',
  },
  {
    company: 'Tensil.io',
    summary: 'Built an in-browser multi-person video editor powered by WebAssembly.',
  },
  {
    company: 'Vytronus',
    summary: 'UIs for a cardiac-ablation surgical robotics system with real-time 3D heart visualization.',
  },
  {
    company: 'Medical Neural Stimulation Startup',
    summary: 'Embedded control software for a wearable Vagus-nerve neural stimulator.',
  },
  {
    company: 'Velo3D',
    summary: 'Additive-manufacturing pre-print software for metal 3D printing.',
  },
  {
    company: 'Holo3D',
    summary: 'Founder — prototyped an immersive sports-broadcasting platform in Unreal Engine 4.',
  },
  {
    company: 'Zynga',
    summary: 'Gameplay and asset-loading engineering for social games.',
  },
  {
    company: 'LucasArts',
    summary: 'Game tooling for Star Wars: The Force Unleashed I & II on Xbox 360 and PS3.',
  },
  {
    company: 'Versamed',
    summary: 'Real-time Qt UI for the iVent101 medical ventilator.',
  },
  {
    company: 'Optitex',
    summary: 'Contributed to the Runway apparel CAD/CAM package.',
  },
  {
    company: 'DPSI',
    summary: 'Maya tooling for the animated feature film Happily N\'Ever After.',
  },
  {
    company: 'CompuNet.Net',
    summary: 'Built browser casino games with Flash MX, ASP, and MSSQL.',
  },
  {
    company: 'NuvoStudios',
    summary: 'Ported the Rootbeer Tapper arcade game to PocketPC.',
  },
  {
    company: 'Midway Games',
    summary: 'Gameplay and real-time cloth/hair simulation for a gladiator-style Xbox title.',
  },
];

export const education = {
  school: 'University of California, Berkeley',
  degree: 'BS, Electrical Engineering & Computer Science (EECS)',
  period: 'Graduated 2001',
};

// Selected projects surfaced as case-study cards (XR Simulator has its own page).
export const projects: Project[] = [
  {
    slug: 'xr-simulator',
    name: 'Meta XR Simulator',
    role: 'Lead, Senior Software Engineer',
    period: '2021 – 2026',
    tagline: 'Run and debug XR apps on a desktop — no headset required.',
    blurb:
      'Led development of XrSim, a runtime that emulates Meta headsets on desktop so developers can iterate on XR apps without donning hardware — cutting iteration time by up to 50% for nearly 9,000 monthly active developers and unifying rendering across Metal, Vulkan, DX11, and DX12.',
    tech: ['C++', 'Vulkan', 'Metal', 'DirectX', 'OpenXR'],
  },
  {
    slug: 'tensil-video-editor',
    name: 'In-Browser Video Editor',
    role: 'Senior Software Engineer, Tensil.io',
    period: '2020',
    tagline: 'A timeline video editor running entirely in the browser via WebAssembly.',
    blurb:
      'Built a WebAssembly-powered video editor that runs in the browser, with frame prefetching and caching that improved clip load times by 50%.',
    tech: ['C++', 'WebAssembly', 'TypeScript', 'WebGL'],
  },
  {
    slug: 'vytronus-visualization',
    name: 'Therapeutic Catheter Visualization',
    role: 'Senior Software Engineer, Vytronus',
    period: '2018 – 2020',
    tagline: 'Millimeter-precision motion planning for a medical device.',
    blurb:
      'Delivered medical visualization and motion planning that used the Biarc algorithm to achieve 1mm positional accuracy for a therapeutic catheter platform.',
    tech: ['C++', 'VTK', 'Qt/QML', 'Geometry'],
  },
  {
    slug: 'velo3d-preprint',
    name: 'Metal 3D-Print Pre-Processor',
    role: 'Software Engineer, Velo3D',
    period: '2016 – 2018',
    tagline: 'CAD import, part placement, and support generation for additive manufacturing.',
    blurb:
      'Engineered a pre-print system for metal additive manufacturing covering CAD import, part placement, and automatic support-structure generation.',
    tech: ['C++', 'Computational Geometry', 'CAD'],
  },
];
