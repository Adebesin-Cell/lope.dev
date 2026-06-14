import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { projects } from './shared/data/projects'

const dataIcons = projects
  .flatMap(g => g.projects.map(p => p.icon))
  .filter((v): v is string => Boolean(v))

const uiIcons = [
  // homepage chips
  'i-simple-icons-chakraui', 'i-logos-pandacss-icon', 'i-lucide-zap', 'i-lucide-anchor', 'i-lucide-feather',
  // header nav + socials + controls
  'i-lucide-pencil-line', 'i-lucide-folder-git-2', 'i-lucide-mic', 'i-lucide-git-merge',
  'i-lucide-rss', 'i-lucide-moon', 'i-lucide-sun', 'i-lucide-menu', 'i-lucide-x', 'i-lucide-arrow-up',
  'i-lucide-rocket', 'i-lucide-star', 'i-lucide-chevron-left', 'i-lucide-chevron-right',
  'i-simple-icons-github', 'i-simple-icons-bluesky', 'i-simple-icons-x',
]

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter:400,500,600,700',
        mono: 'JetBrains Mono:400,500',
        serif: {
          name: 'Newsreader',
          weights: ['400', '500'],
          italic: true,
        },
        script: 'Caveat:500,600,700',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  content: {
    pipeline: {
      // Default pipeline only scans .vue/.jsx/.md etc — add plain .ts so the
      // dynamically-bound icon classes in shared/data/*.ts are generated.
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'shared/**/*.ts',
        'app/**/*.ts',
      ],
    },
  },
  shortcuts: {
    'dot-bg': 'bg-[radial-gradient(circle,var(--dot-color)_1px,transparent_1px)] bg-[length:24px_24px]',
    'chip': 'inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md bg-ink/5 text-sm leading-none border border-ink/5 hover:bg-ink/10 transition-colors',
    'nav-link': 'op-70 hover:op-100 transition-opacity',
    'btn': 'inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg text-sm font-500 transition',
    'watermark': 'absolute pointer-events-none select-none font-bold text-7xl md:text-8xl lg:text-9xl op-3 tracking-tight uppercase',
  },
  theme: {
    colors: {
      // Theme-aware via CSS vars (defined in main.css) so text/surfaces invert
      // correctly in light mode. Faint is tuned to clear WCAG AA on each bg.
      ink: {
        DEFAULT: 'rgb(var(--ink) / %alpha%)',
        muted: 'rgb(var(--ink-muted) / %alpha%)',
        faint: 'rgb(var(--ink-faint) / %alpha%)',
      },
      bg: {
        DEFAULT: 'rgb(var(--bg) / %alpha%)',
        soft: 'rgb(var(--bg-soft) / %alpha%)',
      },
    },
  },
  safelist: [...new Set([...uiIcons, ...dataIcons])],
})
