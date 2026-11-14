<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { chip } from 'styled-system/recipes'

const props = defineProps<{
  icon?: string
  logo?: string
  logoLight?: string
  label: string
  href?: string
  to?: string
  // Brand tint for monochrome icons (full-colour logos ignore it).
  color?: string
  note?: string
}>()

const NuxtLink = resolveComponent('NuxtLink')
const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'span'))
const linkAttrs = computed(() =>
  props.to ? { to: props.to } : props.href ? { href: props.href, target: '_blank', rel: 'noopener' } : {},
)

const noteId = useId()
const { show, hide } = useCursorNote()

let hovered = false
let focused: HTMLElement | undefined

function sync() {
  if (!props.note) return hide(noteId)
  if (focused) show({ id: noteId, text: props.note, anchor: focused })
  else if (hovered) show({ id: noteId, text: props.note })
  else hide(noteId)
}

function onPointerEnter(event: PointerEvent) {
  if (event.pointerType === 'touch') return
  hovered = true
  sync()
}

function onPointerLeave() {
  hovered = false
  sync()
}

function onFocus(event: FocusEvent) {
  const target = event.currentTarget
  if (!(target instanceof HTMLElement) || !target.matches(':focus-visible')) return
  focused = target
  sync()
}

function onBlur() {
  focused = undefined
  sync()
}

function reset() {
  hovered = false
  focused = undefined
  hide(noteId)
}

watch(() => props.note, sync)

onBeforeUnmount(reset)

const chipClass = chip()
const mark = css({
  display: 'grid',
  placeItems: 'center',
  alignSelf: 'center',
  w: '[1.1em]',
  h: '[1.1em]',
  flexShrink: '0',
})
const fill = css({ w: 'full', h: 'full' })
const iconFill = css({ w: 'full!', h: 'full!' })
</script>

<template>
  <component
    :is="tag"
    v-bind="linkAttrs"
    :class="chipClass"
    :aria-describedby="note ? noteId : undefined"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @focus="onFocus"
    @blur="onBlur"
  >
    <ark.span v-if="logo || icon" :class="mark" aria-hidden="true">
      <BrandLogo v-if="logo" :src="logo" :light="logoLight" :alt="label" :class="fill" />
      <ark.span v-else :class="[icon, iconFill]" :style="color ? { color } : undefined" />
    </ark.span>
    <ark.span>{{ label }}</ark.span>
    <ark.span v-if="note" :id="noteId" hidden>{{ note }}</ark.span>
  </component>
</template>
