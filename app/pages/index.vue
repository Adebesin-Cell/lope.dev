<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css, cx } from 'styled-system/css'
import { link } from 'styled-system/recipes'

const lead = css({ color: 'ink.muted' })
const prose = css({ color: 'ink.muted', lineHeight: '[2rem]', '& > * + *': { mt: '6' } })
const underlineLink = link()

usePageSeo({
  title: 'Adebesin Tolulope (Lope) — Design Engineer',
  description:
    'Adebesin Tolulope (Lope), design engineer and open sourcer. Core maintainer of Panda CSS, Chakra UI, Ark UI and Zag. Writing on design systems and CSS.',
})

const siteUrl = useSiteConfig().url.replace(/\/$/, '')

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Adebesin Tolulope',
        alternateName: 'Lope',
        url: siteUrl,
        image: `${siteUrl}/lope-avatar.jpeg`,
        jobTitle: 'Design Engineer',
        description: 'Design engineer and open sourcer. Core maintainer of Panda CSS, Chakra UI, Ark UI and Zag.',
        worksFor: { '@type': 'Organization', name: 'IQ Industries', url: 'https://iqindustries.com/' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Federal University of Technology, Akure' },
        knowsAbout: [
          'Design engineering',
          'Frontend engineering',
          'Design systems',
          'CSS',
          'Panda CSS',
          'Chakra UI',
          'Ark UI',
          'Zag',
          'React',
          'Vue',
          'Nuxt',
          'TypeScript',
          'Open source',
        ],
        sameAs: [
          'https://github.com/Adebesin-Cell',
          'https://www.linkedin.com/in/adebesin-tolulope/',
          'https://x.com/I_am_Lope',
          'https://bsky.app/profile/lopeadebesin.bsky.social',
          'https://iamlope.substack.com',
          'https://iamlope.medium.com',
        ],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Adebesin Tolulope (Lope)',
        url: siteUrl,
      }),
    },
  ],
})

const title = css({
  fontSize: '4xl',
  fontWeight: 'bold',
  letterSpacing: 'tight',
  lineHeight: 'tight',
  color: 'ink',
  mb: '8',
})
const rows = css({ lineHeight: '[2.25rem]', '& .chip': { me: '1' } })
const find = css({ pt: '6', borderTopWidth: '1px', borderColor: 'ink/10' })
const findLabel = css({ mb: '3' })
const socialList = css({ display: 'flex', flexWrap: 'wrap', columnGap: '4', rowGap: '2' })
const socialLink = cx(underlineLink, css({ display: 'inline-flex', alignItems: 'center', gap: '1.5' }))
const socialIcon = css({ opacity: '0.75' })

const socials = [
  { href: 'https://github.com/Adebesin-Cell', label: 'GitHub', icon: 'i-simple-icons-github' },
  { href: 'https://www.linkedin.com/in/adebesin-tolulope/', label: 'LinkedIn', icon: 'i-simple-icons-linkedin' },
  { href: 'https://bsky.app/profile/lopeadebesin.bsky.social', label: 'Bluesky', icon: 'i-simple-icons-bluesky' },
  { href: 'https://x.com/I_am_Lope', label: 'X', icon: 'i-simple-icons-x' },
]

const roleRows = [
  {
    label: 'Working with',
    chips: [{ logo: '/brands/iq.svg', label: 'IQ Industries', href: 'https://iqindustries.com/' }],
  },
  {
    label: 'Core maintainer at',
    chips: [
      {
        icon: 'i-simple-icons-chakraui',
        color: '#4FD1C5',
        label: 'Chakra UI',
        href: 'https://github.com/chakra-ui/chakra-ui',
      },
      { icon: 'i-logos-pandacss-icon', label: 'Panda', href: 'https://github.com/chakra-ui/panda' },
      { logo: '/brands/ark.png', label: 'Ark UI', href: 'https://github.com/chakra-ui/ark' },
      { logo: '/brands/zag.png', label: 'Zag', href: 'https://github.com/chakra-ui/zag' },
    ],
  },
  {
    label: 'Contributing to',
    chips: [
      { logo: '/brands/npmx.svg', logoLight: '/brands/npmx-light.svg', label: 'npmx.dev', href: 'https://npmx.dev' },
    ],
  },
  {
    label: 'Currently building',
    chips: [{ logo: '/brands/bethelflow.svg', label: 'BethelFlow', href: 'https://www.bethelflow.com/' }],
  },
]
</script>

<template>
  <ark.article :class="['slide-enter-content', prose]">
    <ark.h1 :class="title"> Adebesin Tolulope <ark.span :class="lead">(Lope)</ark.span> </ark.h1>

    <ark.p> Hi, I'm Adebesin Tolulope, a design engineer and open sourcer. </ark.p>

    <ark.p :class="rows">
      <template v-for="row in roleRows" :key="row.label">
        {{ row.label }}
        <Chip v-for="c in row.chips" :key="c.label" v-bind="c" />
        <br />
      </template>
    </ark.p>

    <ark.p>
      I love building, for other people's problems and my own. I enjoy taking a project from idea to shipped, and I'm
      rarely idle for long. Everything I've made is on my
      <Chip to="/projects" label="projects" icon="i-lucide-folder-git-2" /> page.
    </ark.p>

    <ark.p>
      Right now that's
      <Chip href="https://www.bethelflow.com/" label="BethelFlow" logo="/brands/bethelflow.svg" />, which takes the
      manual work out of running a church so churches can spend their time on their people. For fun, I tinker with
      open-source tools in my
      <Chip href="https://studio.adebesin.com" label="Montcha" logo="/brands/montcha.png" /> studio and keep experiments
      in <Chip to="/play" label="play" icon="i-lucide-gamepad-2" />.
    </ark.p>

    <ark.p>
      I write a <Chip to="/blog/build-once-at-build-time" label="series" icon="i-lucide-newspaper" />
      on how Panda CSS works inside, and gave my first talk at
      <Chip
        href="https://sailsconf.com/2026/talks/17347112-5f4c-4086-bd0d-013eb2d2ff77"
        label="SailsConf"
        icon="i-lucide-mic"
      />. I volunteer with
      <Chip href="https://4herfrika.org" label="4Herfrika" logo="/brands/4herfrika.png" />
      because I believe in empowering women. Away from the keyboard: basketball, the gym, cooking and church.
    </ark.p>

    <ark.div :class="find">
      <ark.p :class="findLabel"> Find me on </ark.p>
      <ark.p :class="socialList">
        <ark.a v-for="l in socials" :key="l.label" :href="l.href" target="_blank" rel="noopener" :class="socialLink">
          <ark.span :class="[l.icon, socialIcon]" aria-hidden="true" />
          {{ l.label }}
        </ark.a>
      </ark.p>
    </ark.div>
  </ark.article>
</template>
