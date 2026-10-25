import { defineConfig, presetIcons } from 'unocss'
import { projects } from './shared/data/projects'

const dataIcons = projects.flatMap((g) => g.projects.map((p) => p.icon)).filter((v): v is string => Boolean(v))

const uiIcons = [
  // homepage chips + inline links
  'i-simple-icons-chakraui',
  'i-logos-pandacss-icon',
  'i-lucide-zap',
  'i-lucide-anchor',
  'i-lucide-feather',
  'i-lucide-newspaper',
  'i-simple-icons-linkedin',
  // header nav + socials + controls
  'i-lucide-pencil-line',
  'i-lucide-folder-git-2',
  'i-lucide-mic',
  'i-lucide-git-merge',
  'i-lucide-rss',
  'i-lucide-moon',
  'i-lucide-sun',
  'i-lucide-menu',
  'i-lucide-x',
  'i-lucide-arrow-up',
  'i-lucide-rocket',
  'i-lucide-star',
  'i-lucide-chevron-left',
  'i-lucide-chevron-right',
  'i-simple-icons-github',
  'i-simple-icons-bluesky',
  'i-simple-icons-x',
]

export default defineConfig({
  presets: [
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  outputToCssLayers: { cssLayerName: () => 'icons' },
  content: {
    pipeline: {
      include: [/\.(vue|[jt]sx|mdx?|html)($|\?)/, 'shared/**/*.ts', 'app/**/*.ts'],
    },
  },
  safelist: [...new Set([...uiIcons, ...dataIcons])],
})
