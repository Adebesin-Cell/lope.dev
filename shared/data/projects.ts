export interface Project {
  name: string
  description: string
  role?: string
  stack?: string[]
  href?: string
  icon?: string
  // Brand tint for a monochrome `icon` (full-colour logos ignore it).
  color?: string
  // Full-colour brand mark (path under /public). Takes precedence over `icon`.
  logo?: string
  // Optional light-mode variant of `logo`.
  logoLight?: string
}

export interface ProjectGroup {
  title: string
  projects: Project[]
}

export const projects: ProjectGroup[] = [
  {
    title: 'Maintaining',
    projects: [
      {
        name: 'Panda CSS',
        role: 'Core maintainer',
        description: 'Build-time CSS-in-JS with type-safe tokens and recipes, on a Rust engine.',
        href: 'https://github.com/chakra-ui/panda',
        stack: ['Rust', 'Oxc', 'TypeScript', 'WASI'],
        icon: 'i-logos-pandacss-icon',
      },
      {
        name: 'Ark UI',
        role: 'Core maintainer',
        description: 'Headless, accessible components for React, Vue, Solid and Svelte.',
        href: 'https://github.com/chakra-ui/ark',
        stack: ['TypeScript', 'React', 'Vue', 'Solid', 'Svelte'],
        logo: '/brands/ark.png',
      },
      {
        name: 'Chakra UI',
        role: 'Core maintainer',
        description: 'Accessible React components for design systems and apps.',
        href: 'https://github.com/chakra-ui/chakra-ui',
        stack: ['React', 'TypeScript'],
        icon: 'i-simple-icons-chakraui',
        color: '#4FD1C5',
      },
      {
        name: 'Zag',
        role: 'Core maintainer',
        description: 'Framework-agnostic state machines behind Ark UI.',
        href: 'https://github.com/chakra-ui/zag',
        stack: ['TypeScript', 'State machines'],
        logo: '/brands/zag.png',
      },
      {
        name: '@chakra-ui/codemod',
        description: 'Codemods for moving Chakra UI codebases across versions.',
        href: 'https://npmx.dev/package/@chakra-ui/codemod',
        icon: 'i-simple-icons-chakraui',
        color: '#4FD1C5',
      },
    ],
  },
  {
    title: 'Building',
    projects: [
      {
        name: 'BethelFlow',
        description: 'The church operating system: check-in, members, events, giving and growth, in one place.',
        href: 'https://www.bethelflow.com/',
        stack: ['Next.js', 'Nuxt', 'Tailwind', 'Radix', 'Postgres'],
        logo: '/brands/bethelflow.svg',
      },
      {
        name: 'Montcha',
        description: 'A studio of small apps, games and gifts on one Panda CSS and Ark UI design system.',
        href: 'https://studio.adebesin.com',
        stack: ['Nuxt', 'Panda CSS', 'Ark UI', 'Bun'],
        logo: '/brands/montcha.png',
      },
      {
        name: 'Flowers',
        description: 'Pick a bouquet, tie it with a note, and send the link.',
        href: 'https://flowers.studio.adebesin.com',
        stack: ['Nuxt', 'three.js', 'WebGPU'],
        logo: '/brands/flowers.png',
      },
    ],
  },
  {
    title: 'At IQ',
    projects: [
      {
        name: 'IQ AI',
        description: 'Agent infrastructure, and the Sophia and AIDEN agents behind IQ.wiki.',
        href: 'https://iqai.com/',
        logo: '/brands/iq.svg',
      },
      {
        name: 'KRWQ',
        description: 'The first regulated Korean Won stablecoin, on Base.',
        href: 'https://www.krwq.cash/',
        icon: 'i-lucide-coins',
        color: '#60A5FA',
      },
      {
        name: 'BrainDAO',
        description: 'The DAO that governs the IQ stack and funds new work.',
        href: 'https://braindao.org/',
        icon: 'i-lucide-landmark',
        color: '#F472B6',
      },
      {
        name: 'adk-ts',
        description: 'TypeScript framework for building AI agents.',
        href: 'https://github.com/IQAIcom/adk-ts',
        logo: '/brands/iq.svg',
      },
      {
        name: 'ep-ui',
        description: 'Frontend for IQ.wiki, the crypto encyclopedia.',
        href: 'https://iq.wiki/',
        logo: '/brands/iq.svg',
      },
      {
        name: 'iq-dashboard',
        description: 'Staking, bridging and governance for IQ.',
        href: 'https://iq.iqai.com/dashboard',
        logo: '/brands/iq.svg',
      },
      {
        name: 'ep-api',
        description: 'IQ.wiki API and backend services.',
        href: 'https://github.com/EveripediaNetwork/ep-api',
        logo: '/brands/iq.svg',
      },
      {
        name: 'iq-login',
        description: 'Auth and wallet connection for IQ.wiki apps.',
        href: 'https://github.com/EveripediaNetwork/iq-login',
        logo: '/brands/iq.svg',
      },
      {
        name: 'iq-utils',
        description: 'Wiki schemas, validity checks and scoring.',
        href: 'https://github.com/EveripediaNetwork/iq-utils',
        logo: '/brands/iq.svg',
      },
    ],
  },
  {
    title: 'Contributing',
    projects: [
      {
        name: '4Herfrika',
        role: 'Volunteer software engineer',
        description: 'Education and guidance for women and girls.',
        href: 'https://4herfrika.org',
        logo: '/brands/4herfrika.png',
      },
      {
        name: 'npmx.dev',
        description: 'A fast, modern browser for the npm registry.',
        href: 'https://npmx.dev',
        logo: '/brands/npmx.svg',
        logoLight: '/brands/npmx-light.svg',
      },
      {
        name: 'e18e',
        description: 'Improving the perf, size and dependency health of the JS ecosystem.',
        href: 'https://github.com/e18e/ecosystem-issues',
        logo: '/brands/e18e.svg',
      },
      {
        name: 'Syncia',
        description: 'AI assistants on any site, as a browser extension.',
        href: 'https://github.com/Royal-lobster/Syncia',
        icon: 'i-lucide-bot',
        color: '#22D3EE',
      },
      {
        name: 'node-archiver',
        description: 'Streaming zip and tar archives for Node.js.',
        href: 'https://github.com/node-archiver',
        icon: 'i-lucide-folder-archive',
        color: '#FBBF24',
      },
    ],
  },
  {
    title: 'Made',
    projects: [
      {
        name: 'Ekphrasis',
        description: 'Image descriptions for blind and low-vision users, checked against the image.',
        icon: 'i-lucide-feather',
        color: '#34D399',
      },
      {
        name: 'claude-roast',
        description: 'Roasts how you use Claude Code, from your ~/.claude history.',
        href: 'https://github.com/Adebesin-Cell/claude-roast',
        icon: 'i-lucide-flame',
        color: '#FB923C',
      },
      {
        name: 'Recall',
        description: 'Quick brain games, shareable by link. No sign-up.',
        href: 'https://playrecuerdo.vercel.app/',
        icon: 'i-lucide-brain',
        color: '#A855F7',
      },
      {
        name: 'Rumate',
        description: 'Student housing near Truman State University.',
        href: 'https://www.rumate.app/',
        icon: 'i-lucide-users',
        color: '#A78BFA',
      },
      {
        name: 'EchoTrap',
        description: 'Echo cancellation with the Web Audio API.',
        href: 'https://github.com/Adebesin-Cell/EchoTrap',
        icon: 'i-lucide-radio',
        color: '#38BDF8',
      },
      {
        name: 'EMF-modelling',
        description: 'Modelling EMF exposure around a cell tower. A FUTA course project.',
        href: 'https://github.com/Adebesin-Cell/futa-cpe415-emf-modelling',
        icon: 'i-lucide-radio-tower',
        color: '#F87171',
      },
    ],
  },
]
