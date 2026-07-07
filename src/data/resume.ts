// Single source of truth for site content, derived from Benjamin Batya's résumé.

export interface Role {
  company: string;
  title: string;
  start: string;
  end: string;
  /** Short punchy summary shown as the lead line. */
  summary: string;
  /** Notable accomplishments / bullet points. */
  highlights: string[];
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
      'Design and stand up AI development workflows, evaluation harnesses, and test infrastructure that cut iteration and review time dramatically.',
  },
  {
    title: 'High-Performance Systems',
    description:
      'Architect and optimize latency- and throughput-critical software in C/C++ and Rust across desktop, mobile, and embedded targets.',
  },
  {
    title: 'Graphics, XR & Simulation',
    description:
      'Build cross-API rendering and simulation layers (Vulkan, Metal, DX11/12) and developer tooling for XR and real-time visualization.',
  },
];

export const roles: Role[] = [
  {
    company: 'Generation Alpha Transistor',
    title: 'Technical Consultant',
    start: 'Apr 2026',
    end: 'Jul 2026',
    summary: 'Test infrastructure and developer-experience consulting for an EDA/IC toolchain.',
    highlights: [
      'Architected test infrastructure for pull requests and AI evaluations, reducing durations by 90%.',
      'Redesigned the EDA-IC UI to provide domain-specific functionality and an enhanced experience.',
    ],
  },
  {
    company: 'Meta Platforms',
    title: 'Senior Software Engineer',
    start: 'Feb 2021',
    end: 'Jan 2026',
    summary: 'Led development of the Meta XR Simulator (XrSim), the flagship XR developer tool.',
    highlights: [
      'Led XR Simulator development, reducing iteration time for headset projects by up to 50%.',
      'Architected integrated rendering capabilities across Metal, Vulkan, DX11, and DX12.',
      'Mentored 8+ junior engineers through design and code reviews.',
    ],
  },
  {
    company: 'Tensil.io',
    title: 'Senior Software Engineer',
    start: 'Jun 2020',
    end: 'Nov 2020',
    summary: 'Built an in-browser video editor powered by WebAssembly.',
    highlights: [
      'Developed an in-browser video editor using WebAssembly.',
      'Improved clip load times by 50% by prefetching and caching frames.',
    ],
  },
  {
    company: 'Vytronus',
    title: 'Senior Software Engineer',
    start: 'Sep 2018',
    end: 'Jan 2020',
    summary: 'Medical visualization and precision motion for a therapeutic catheter system.',
    highlights: [
      'Enhanced position accuracy using the Biarc algorithm to achieve 1mm precision.',
    ],
  },
  {
    company: 'Velo3D',
    title: 'Software Engineer',
    start: 'Jul 2016',
    end: 'Mar 2018',
    summary: 'Additive manufacturing pre-print software for metal 3D printing.',
    highlights: [
      'Engineered a pre-print system featuring CAD import, part placement, and support generation.',
    ],
  },
  {
    company: 'LucasArts',
    title: 'Tools Engineer',
    start: 'Aug 2007',
    end: 'Dec 2009',
    summary: 'Game development tooling and iteration-time improvements.',
    highlights: [
      'Improved iterative desktop→console test time from minutes to seconds.',
    ],
  },
];

export const education = {
  school: 'University of California, Berkeley',
  degree: 'BS, Electrical Engineering & Computer Science (EECS)',
  period: 'Sep 1997 – May 2001',
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
      'Led development of XrSim, a runtime that emulates Meta headsets on desktop so developers can iterate on XR apps without donning hardware — cutting iteration time by up to 50% and unifying rendering across Metal, Vulkan, DX11, and DX12.',
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
