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
    title: 'Current Focus',
    projects: [
      {
        name: 'Panda CSS',
        role: 'Core maintainer',
        description: 'Build-time CSS-in-JS with type-safe styles, design tokens and recipes. v2 runs on a Rust engine.',
        href: 'https://github.com/chakra-ui/panda',
        stack: ['Rust', 'Oxc', 'TypeScript', 'WASI'],
        icon: 'i-logos-pandacss-icon',
      },
      {
        name: 'Ark UI',
        role: 'Core maintainer',
        description: 'Headless, accessible UI components for React, Vue, Solid and Svelte.',
        href: 'https://github.com/chakra-ui/ark',
        stack: ['TypeScript', 'React', 'Vue', 'Solid', 'Svelte', 'Zag'],
        logo: '/brands/ark.png',
      },
      {
        name: 'Chakra UI',
        role: 'Core maintainer',
        description: 'Accessible React component library for building design systems and apps.',
        href: 'https://github.com/chakra-ui/chakra-ui',
        stack: ['React', 'TypeScript', 'Codemods'],
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
    ],
  },
  {
    title: 'Currently Building',
    projects: [
      {
        name: 'BethelFlow',
        description: 'The church operating system. Auto check-in and attendance (40k+ records tracked), member and family records, children\'s check-in, service planning and ticketed events, first-timer follow-up, bulk SMS and email, giving, growth analytics, and multi-branch church networks, all in one place.',
        href: 'https://www.bethelflow.com/',
        stack: ['Next.js', 'Nuxt', 'Panda CSS', 'Ark UI', 'AI SDK', 'Postgres'],
        logo: '/brands/bethelflow.svg',
      },
    ],
  },
  {
    title: 'Montcha',
    projects: [
      {
        name: 'Montcha',
        description: 'A design studio of small apps, games and gifts, all built on one Panda CSS and Ark UI design system.',
        href: 'https://studio.adebesin.com',
        stack: ['Nuxt', 'Panda CSS', 'Ark UI', 'Bun'],
        logo: '/brands/montcha.png',
      },
      {
        name: 'Flowers',
        description: 'Give them their flowers while they are here. Pick a bouquet from a pink garden, tie it with a note, and send the link.',
        href: 'https://flowers.studio.adebesin.com',
        stack: ['Nuxt', 'three.js', 'WebGPU'],
        logo: '/brands/flowers.png',
      },
    ],
  },
  {
    title: 'Packages',
    projects: [
      {
        name: '@chakra-ui/codemod',
        description: 'Codemods for migrating and transforming Chakra UI codebases across versions.',
        href: 'https://npmx.dev/package/@chakra-ui/codemod',
        icon: 'i-simple-icons-chakraui',
        color: '#4FD1C5',
      },
    ],
  },
  {
    title: 'Own Projects',
    projects: [
      {
        name: 'Ekphrasis',
        description: 'A Chrome extension that writes image descriptions for blind and low-vision users, grounded in the page around the image, with every claim checked against the image itself.',
        icon: 'i-lucide-feather',
        color: '#34D399',
      },
      {
        name: 'claude-roast',
        description: 'Roasts how badly you use Claude Code, based on your ~/.claude history.',
        href: 'https://github.com/Adebesin-Cell/claude-roast',
        icon: 'i-lucide-flame',
        color: '#FB923C',
      },
      {
        name: 'EchoTrap',
        description: 'A React-based echo cancellation experiment using the Web Audio API.',
        href: 'https://github.com/Adebesin-Cell/EchoTrap',
        icon: 'i-lucide-radio',
        color: '#38BDF8',
      },
      {
        name: 'Rumate (TRUmate)',
        description: 'Roommate-finding app for university students.',
        href: 'https://www.rumate.app/',
        icon: 'i-lucide-users',
        color: '#A78BFA',
      },
      {
        name: 'Recall',
        description: 'Quick brain games for memory, focus, and reaction — playable in seconds, shareable by link. No sign-up.',
        href: 'https://playrecuerdo.vercel.app/',
        icon: 'i-lucide-brain',
        color: '#A855F7',
      },
    ],
  },
  {
    title: 'Open Source Contributions',
    projects: [
      {
        name: 'e18e Ecosystem Issues',
        description: 'Improving the perf, size, and dep health of the JS ecosystem.',
        href: 'https://github.com/e18e/ecosystem-issues',
        logo: '/brands/e18e.svg',
      },
      {
        name: 'npmx.dev',
        description: 'A fast, modern browser for the npm registry.',
        href: 'https://npmx.dev',
        logo: '/brands/npmx.svg',
        logoLight: '/brands/npmx-light.svg',
      },
      {
        name: 'Syncia',
        description: 'A browser extension that brings ChatGPT-like AI assistants to any site.',
        href: 'https://github.com/Royal-lobster/Syncia',
        icon: 'i-lucide-bot',
        color: '#22D3EE',
      },
      {
        name: 'node-archiver',
        description: 'Streaming archiver for Node.js — zip, tar.',
        href: 'https://github.com/node-archiver',
        icon: 'i-lucide-folder-archive',
        color: '#FBBF24',
      },
    ],
  },
  {
    title: 'IQ.AI',
    projects: [
      {
        name: 'adk-ts',
        description: 'Open-source TypeScript framework for building AI agents with multi-provider LLM support.',
        href: 'https://github.com/IQAIcom/adk-ts',
        stack: ['TypeScript', 'Node.js', 'LLMs'],
        logo: '/brands/iq.svg',
      },
    ],
  },
  {
    title: 'IQ.wiki',
    projects: [
      {
        name: 'ep-ui',
        description: 'Frontend for IQ.wiki, the crypto encyclopedia.',
        href: 'https://iq.wiki/',
        stack: ['Next.js', 'React', 'Tailwind', 'shadcn/Radix', 'GraphQL'],
        logo: '/brands/iq.svg',
      },
      {
        name: 'iq-dashboard',
        description: 'Dashboard for staking IQ tokens, bridging across chains, and voting on governance proposals.',
        href: 'https://iq.iqai.com/dashboard',
        stack: ['Next.js', 'wagmi', 'viem', 'Tailwind'],
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
        description: 'Authentication and wallet connection for IQ.wiki apps.',
        href: 'https://github.com/EveripediaNetwork/iq-login',
        logo: '/brands/iq.svg',
      },
      {
        name: 'iq-utils',
        description: 'Shared utilities for IQ.wiki: wiki schemas, validity checks and scoring.',
        href: 'https://github.com/EveripediaNetwork/iq-utils',
        logo: '/brands/iq.svg',
      },
    ],
  },
  {
    title: 'Volunteer',
    projects: [
      {
        name: '4Herfrika',
        description: 'A movement for the education and guidance of women and girls.',
        href: 'https://github.com/4HerfrikaHQ/landing-page',
        logo: '/brands/4herfrika.png',
      },
    ],
  },
  {
    title: 'Academic',
    projects: [
      {
        name: 'EMF-modelling',
        description: 'CPE 415 — statistical distribution modelling of EMF exposure around a FUTA cellular base station.',
        href: 'https://github.com/Adebesin-Cell/futa-cpe415-emf-modelling',
        icon: 'i-lucide-radio-tower',
        color: '#F87171',
      },
    ],
  },
]
