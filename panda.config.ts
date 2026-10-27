import { defineConfig, defineRecipe, defineTextStyles } from '@pandacss/dev'
import { typographyPreset } from '@pandacss/preset-typography'

const chip = defineRecipe({
  className: 'chip',
  description: 'Inline brand pill used in running text',
  base: {
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: '1',
    px: '1.5',
    py: '0.5',
    rounded: 'sm',
    bg: 'ink/8',
    color: 'ink',
    fontSize: '[0.95em]',
    lineHeight: '[1.5rem]',
    transition: 'colors',
    _hover: { bg: 'ink/14' },
  },
})

const button = defineRecipe({
  className: 'button',
  description: 'Pill-shaped actions: ghost by default, solid for the primary action',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    h: '9',
    px: '4',
    rounded: 'lg',
    fontSize: 'sm',
    fontWeight: 'medium',
    transition: 'all',
    _hover: { transform: 'translateY(-1px)' },
    _active: { transform: 'translateY(0)' },
    _motionReduce: { _hover: { transform: 'none' } },
  },
  variants: {
    variant: {
      ghost: {
        borderWidth: '1px',
        borderColor: 'ink/22',
        color: 'ink.muted',
        _hover: { bg: 'ink/8', borderColor: 'ink/45', color: 'ink' },
      },
      solid: {
        bg: 'ink',
        color: 'bg',
        _hover: { opacity: '0.9' },
      },
    },
  },
  defaultVariants: { variant: 'ghost' },
})

const link = defineRecipe({
  className: 'link',
  description: 'Text links: underlined in prose, faded in navigation',
  base: { transition: 'all' },
  variants: {
    tone: {
      strong: {
        color: 'ink',
        textDecoration: 'underline',
        textDecorationColor: 'ink/30',
        textUnderlineOffset: '4px',
        _hover: { textDecorationColor: 'ink' },
      },
      muted: {
        color: 'ink.muted',
        textDecoration: 'underline',
        textDecorationColor: 'ink/30',
        textUnderlineOffset: '4px',
        _hover: { color: 'ink' },
      },
      quiet: { textDecoration: 'underline', _hover: { color: 'ink.muted' } },
      nav: { opacity: '0.7', _hover: { opacity: '1' }, '&.router-link-active': { opacity: '1', fontWeight: 'medium' } },
    },
  },
  defaultVariants: { tone: 'strong' },
})

const proseExtension = {
  base: {
    '--prose-leading': '1.7',
    '--prose-flow': '1rem',
    maxW: 'none',
    '& h2': { mt: '10', mb: '3', lineHeight: '[1.5]' },
    '& h3': { mt: '8', mb: '2' },
    '& li': { marginBlock: '[0.35rem]' },
    '& :is(h1, h2, h3, h4) a': { textDecoration: 'none', color: 'inherit' },
    '& a': { textUnderlineOffset: '4px' },
    '& pre': {
      marginBlock: '5',
      px: '[1.1rem]',
      py: '4',
      rounded: 'lg',
      bg: 'ink/5',
      borderWidth: '1px',
      borderColor: 'ink/10',
      overflowX: 'auto',
      fontSize: '[0.85rem]',
    },
    '& :is(img, video)': { display: 'block', rounded: 'lg', maxW: 'full', h: 'auto' },
    '& hr': {
      border: '0',
      borderTopWidth: '0',
      h: '1px',
      bgImage:
        'linear-gradient(to right, transparent, color-mix(in srgb, {colors.ink} 16%, transparent) 20%, color-mix(in srgb, {colors.ink} 16%, transparent) 80%, transparent)',
    },
    '& .prose-table': { overflowX: 'auto' },
    '& th': { fontSize: 'xs', letterSpacing: '[0.06em]', textTransform: 'uppercase' },
  },
}

const textStyles = defineTextStyles({
  display: { value: { fontSize: '4xl', fontWeight: 'bold', letterSpacing: 'tight', lineHeight: 'tight' } },
})

export default defineConfig({
  presets: [
    '@pandacss/preset-base',
    '@pandacss/preset-panda',
    typographyPreset({ semanticTokens: { enabled: false } }),
  ],
  include: ['./app/**/*.{vue,ts}', './shared/**/*.ts'],
  exclude: ['./app/components/OgImage/**'],
  outdir: 'styled-system',
  preflight: true,
  strictTokens: true,
  optimize: { removeUnusedTokens: true, removeUnusedKeyframes: true },
  conditions: {
    extend: {
      light: 'html.light &',
    },
  },
  globalCss: {
    html: {
      colorScheme: 'dark',
      bg: 'bg',
      color: 'ink',
      scrollBehavior: 'smooth',
      scrollPaddingTop: '20',
      overflowX: 'hidden',
      _motionReduce: { scrollBehavior: 'auto' },
    },
    'html.light': { colorScheme: 'light' },
    body: {
      bg: 'transparent',
      fontFamily: 'sans',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    '::selection': { bg: 'ink/15' },
    a: { color: 'inherit', textDecoration: 'none', textUnderlineOffset: '4px' },
    'a:focus-visible, button:focus-visible, [tabindex]:focus-visible': {
      outline: '2px solid',
      outlineColor: 'ink/60',
      outlineOffset: '2px',
      rounded: 'sm',
    },
  },
  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: { value: '"Inter", system-ui, sans-serif' },
          mono: { value: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace' },
          serif: { value: '"Newsreader", Georgia, serif' },
          script: { value: '"Caveat", "Brush Script MT", cursive' },
        },
        fontSizes: {
          '2xs': { value: '0.6875rem' },
          '3xs': { value: '0.625rem' },
        },
        colors: {
          lope: {
            50: { value: '#fafafa' },
            100: { value: '#f0f0f0' },
            300: { value: '#d4d4d8' },
            400: { value: '#a1a1aa' },
            500: { value: '#80808a' },
            550: { value: '#71717a' },
            600: { value: '#6b6b75' },
            700: { value: '#52525b' },
            900: { value: '#111111' },
            950: { value: '#0a0a0a' },
          },
          panda: {
            yellow: { value: '#f6e458' },
          },
        },
        animations: {
          shipping: { value: 'fadePulse 2.4s ease-in-out infinite' },
          draw: { value: 'draw 5s ease-in-out infinite' },
          drawCrossbar: { value: 'drawCrossbar 5s ease-in-out infinite' },
        },
      },
      semanticTokens: {
        colors: {
          ink: {
            DEFAULT: { value: { base: '{colors.lope.50}', _light: '{colors.lope.950}' } },
            muted: { value: { base: '{colors.lope.400}', _light: '{colors.lope.700}' } },
            faint: { value: { base: '{colors.lope.500}', _light: '{colors.lope.600}' } },
          },
          bg: {
            DEFAULT: { value: { base: '{colors.lope.950}', _light: '{colors.lope.50}' } },
            soft: { value: { base: '{colors.lope.900}', _light: '{colors.lope.100}' } },
          },
          dot: { value: { base: 'rgba(255, 255, 255, 0.08)', _light: 'rgba(0, 0, 0, 0.09)' } },
          prose: {
            body: { value: 'color-mix(in srgb, {colors.ink} 78%, transparent)' },
            heading: { value: '{colors.ink}' },
            lead: { value: '{colors.ink.muted}' },
            link: { value: '{colors.ink}' },
            linkDecoration: { value: 'color-mix(in srgb, {colors.ink} 40%, transparent)' },
            bold: { value: '{colors.ink}' },
            counter: { value: '{colors.ink.faint}' },
            bullet: { value: '{colors.ink.faint}' },
            hrBorder: { value: 'color-mix(in srgb, {colors.ink} 16%, transparent)' },
            quote: { value: 'color-mix(in srgb, {colors.ink} 55%, transparent)' },
            quoteBorder: { value: 'color-mix(in srgb, {colors.ink} 18%, transparent)' },
            caption: { value: '{colors.ink.faint}' },
            kbd: { value: '{colors.ink}' },
            code: { value: '{colors.ink}' },
            codeBg: { value: 'color-mix(in srgb, {colors.ink} 8%, transparent)' },
            preCode: { value: '{colors.ink}' },
            preBg: { value: 'color-mix(in srgb, {colors.ink} 5%, transparent)' },
            thBorder: { value: 'color-mix(in srgb, {colors.ink} 12%, transparent)' },
            tdBorder: { value: 'color-mix(in srgb, {colors.ink} 6%, transparent)' },
          },
        },
      },
      textStyles,
      recipes: { chip, button, link, prose: proseExtension },
      keyframes: {
        draw: {
          '0%': { strokeDashoffset: '1' },
          '28%, 88%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '1' },
        },
        drawCrossbar: {
          '0%, 28%': { strokeDashoffset: '1' },
          '36%, 88%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '1' },
        },
        fadePulse: { '0%, 100%': { opacity: '0.4' }, '50%': { opacity: '1' } },
      },
    },
  },
})
