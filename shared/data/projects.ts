export interface Project {
  name: string
  description: string
  href: string
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
        name: 'Chakra Ecosystem',
        description: 'Maintainer at Chakra UI & Panda · contributor to Zag & Ark UI.',
        href: 'https://github.com/chakra-ui',
        icon: 'i-simple-icons-chakraui',
        color: '#4FD1C5',
      },
    ],
  },
  {
    title: 'Currently Building',
    projects: [
      {
        name: 'BethelFlow',
        description: 'Founding engineer — backend, frontend, mobile, and design.',
        href: 'https://www.bethelflow.com/',
        logo: '/brands/bethelflow.svg',
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
        description: 'A project that keeps pulling me back. The motivation behind it is on the blog.',
        href: 'https://github.com/Adebesin-Cell/ekphrasis',
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
        description: 'Robust framework for building AI agents with multi-provider LLM support.',
        href: 'https://github.com/IQAIcom/adk-ts',
        logo: '/brands/iq.svg',
      },
    ],
  },
  {
    title: 'IQ.wiki',
    projects: [
      {
        name: 'ep-ui',
        description: 'IQ.wiki frontend and web app.',
        href: 'https://iq.wiki/',
        logo: '/brands/iq.svg',
      },
      {
        name: 'iq-dashboard',
        description: 'IQ.wiki dashboard for staking tokens, facilitate cross-blockchain bridging, vote on governance proposals.',
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
        description: 'IQ.wiki authentication system.',
        href: 'https://github.com/EveripediaNetwork/iq-login',
        logo: '/brands/iq.svg',
      },
      {
        name: "iq-utils",
        description: 'Utility functions for IQ.wiki and related projects.',
        href: 'https://github.com/EveripediaNetwork/iq-utils',
        logo: '/brands/iq.svg',
      }
    ],
  },
  {
    title: 'Volunteer',
    projects: [
      {
        name: '4Herfrika',
        description: 'Mission-driven volunteer work — landing page and ongoing support.',
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
