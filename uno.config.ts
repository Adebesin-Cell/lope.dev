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
    'dot-bg': 'bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:24px_24px]',
    'chip': 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 text-sm leading-none border border-white/5 hover:bg-white/10 transition-colors',
    'nav-link': 'op-70 hover:op-100 transition-opacity',
    'watermark': 'absolute pointer-events-none select-none font-bold text-7xl md:text-8xl lg:text-9xl op-3 tracking-tight uppercase',
  },
  theme: {
    colors: {
      ink: {
        DEFAULT: '#fafafa',
        muted: '#a1a1aa',
        faint: '#52525b',
      },
      bg: {
        DEFAULT: '#0a0a0a',
        soft: '#111111',
      },
    },
  },
  safelist: [
    'i-lucide-rss',
    'i-lucide-moon',
    'i-lucide-sun',
    'i-lucide-menu',
    'i-lucide-x',
    'i-lucide-arrow-up',
    'i-simple-icons-github',
    'i-simple-icons-bluesky',
    'i-simple-icons-x',
  ],
})
