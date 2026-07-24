export interface Talk {
  name: string
  angle: string
  href: string
  topics: string[]
  // Logo path under /public, or a remote URL (e.g. a GitHub org avatar).
  logo: string
}

export const talks: Talk[] = [
  {
    name: 'Panda CSS',
    angle: 'Build-time styling done right: the mental model, the v2 engine, and migrating.',
    href: 'https://panda-css.com',
    logo: '/brands/panda.png',
    topics: ['the v2 engine', 'zero-runtime', 'migrating from v1'],
  },
  {
    name: 'Chakra UI',
    angle: 'Composition, theming, and the DX decisions behind it, from a maintainer.',
    href: 'https://chakra-ui.com',
    logo: 'https://github.com/chakra-ui.png',
    topics: ['composition', 'theming', 'maintainer notes'],
  },
  {
    name: 'Zag.js',
    angle: 'UI as state machines. Framework-agnostic components that stay accessible.',
    href: 'https://zagjs.com',
    logo: '/brands/zag.png',
    topics: ['statecharts', 'accessibility', 'framework-agnostic'],
  },
  {
    name: 'Ark UI',
    angle: 'Headless, accessible components built on top of Zag state machines.',
    href: 'https://ark-ui.com',
    logo: '/brands/ark.png',
    topics: ['headless', 'accessibility', 'design-system foundation'],
  },
  {
    name: 'Open source',
    angle: 'Contributing, maintaining, and keeping the ecosystem healthy.',
    href: 'https://github.com/Adebesin-Cell',
    logo: 'https://github.com/Adebesin-Cell.png',
    topics: ['maintaining', 'e18e / perf', 'first contributions'],
  },
]
