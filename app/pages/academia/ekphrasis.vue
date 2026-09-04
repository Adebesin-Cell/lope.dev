<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

usePageSeo({
  title: 'Ekphrasis — Adebesin Tolulope',
  description: 'A Chrome extension that writes image descriptions for blind and low-vision web users, grounded in the text around the image rather than the image alone. Final-year Computer Engineering project, FUTA.',
})

const facts = [
  { label: 'Degree', value: 'B.Eng Computer Engineering' },
  { label: 'Institution', value: 'Federal University of Technology, Akure' },
  { label: 'Built', value: 'Solo, twelve weeks' },
  { label: 'Stack', value: 'Chrome MV3, Plasmo, React, Next.js, transformers.js' },
]

const metrics = [
  { id: 'M1', name: 'Context ranking, nDCG@5', href: 'https://en.wikipedia.org/wiki/Discounted_cumulative_gain', target: '≥ 0.75', result: '0.789', note: '5-fold CV 0.790 ± 0.021', pass: true },
  { id: 'M2', name: 'Hallucination rate, Wilson upper', href: 'https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Wilson_score_interval', target: '≤ 0.12', result: '0.186', note: '23 of 178 claims, 12.9%', pass: false },
  { id: 'M3', name: 'Verification delta', href: 'https://en.wikipedia.org/wiki/Z-test', target: '≥ 40% reduction', result: '−1.7%', note: 'z = −0.06, p = 0.95', pass: false },
  { id: 'M4', name: 'Latency, p50', href: 'https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct', target: '≤ 4s', result: '3.8s', note: 'Qwen3-VL-8B', pass: true },
  { id: 'M8', name: 'Cost per 1,000 images', href: 'https://openrouter.ai/models', target: '< $0.50', result: '$0.165–0.217', note: 'open-weight models', pass: true },
]

const docs = [
  { label: 'RESULTS.md', blurb: 'Every computed metric, including the two misses.' },
  { label: 'PRE-REGISTERED.md', blurb: 'The binding plan. Metrics fixed before any data existed.' },
  { label: 'DECISIONS.md', blurb: 'ADRs. Why each architectural choice was made.' },
  { label: 'ENGINEERING-LOG.md', blurb: 'The problems that cost the most time, and how they were resolved.' },
]
</script>

<template>
  <ark.article class="slide-enter-content prose-content">
    <ark.header>
      <NuxtLink to="/academia" class="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors">
        <ark.span class="i-lucide-chevron-left text-xs" aria-hidden="true" />
        Academia
      </NuxtLink>

      <ark.h1 class="mt-6 text-4xl font-700 tracking-tight">
        Ekphrasis
      </ark.h1>
      <ark.p class="mt-3 text-lg text-ink-muted leading-relaxed">
        Context-aware image descriptions for blind and low-vision web users.
      </ark.p>

      <ark.p class="mt-6 text-sm text-ink-faint italic font-serif">
        Ekphrasis (ἔκφρασις), the classical art of describing a visual scene in words.
      </ark.p>

      <ark.p class="mt-8 inline-flex items-center gap-2 rounded-lg border border-ink/10 bg-ink/2 px-3 py-2 text-sm text-ink-muted">
        <ark.span class="i-lucide-lock text-xs text-ink-faint" aria-hidden="true" />
        The repository is private while the work is under review.
        <ark.a href="https://www.linkedin.com/in/adebesin-tolulope/" target="_blank" rel="noopener" class="underline hover:text-ink transition-colors">Ask me</ark.a>
        for access.
      </ark.p>

      <ark.dl class="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        <ark.div v-for="f in facts" :key="f.label">
          <ark.dt class="text-xs uppercase tracking-wider text-ink-faint">
            {{ f.label }}
          </ark.dt>
          <ark.dd class="mt-1 text-sm text-ink">
            {{ f.value }}
          </ark.dd>
        </ark.div>
      </ark.dl>
    </ark.header>

    <ark.section id="overview" data-toc="Overview" class="scroll-mt-24 mt-20 pt-10 border-t border-ink/8">
      <ark.h2 class="text-2xl font-600 tracking-tight mb-4">
        Overview
      </ark.h2>
      <ark.div class="space-y-4 text-base text-ink-muted leading-relaxed max-w-prose">
        <ark.p>
          Screen readers announce whatever an image's alt text says. <ProseA href="https://webaim.org/projects/million/" class="ref-link">Most of the web has none</ProseA>, and the
          machine-written kind describes the picture in isolation. The same photograph gets the same
          sentence whether it sits in a news report or a shop listing, which is rarely what the reader needs.
        </ark.p>
        <ark.p>
          Ekphrasis puts the page into the prompt. A content script harvests the text around each image,
          ranks it, and feeds the winning segments to a vision-language model tagged by where they came from.
          The description that comes back is then split into claims and each claim is re-asked against the
          image. Anything the model cannot confirm gets softened or struck before a screen reader ever says it.
        </ark.p>
        <ark.p>
          When there is no network, a 500M model runs in the browser instead, and the image never leaves the machine.
        </ark.p>
      </ark.div>
    </ark.section>

    <ark.section id="what-it-does" data-toc="What it does" class="scroll-mt-24 mt-20 pt-10 border-t border-ink/8">
      <ark.h2 class="text-2xl font-600 tracking-tight mb-4">
        What it does
      </ark.h2>

      <ark.div class="space-y-8 max-w-prose">
        <ark.div>
          <ark.h3 class="text-lg font-600 mb-2">
            Grounds descriptions in the page
          </ark.h3>
          <ark.p class="text-base text-ink-muted leading-relaxed">
            Headings, captions, article paragraphs and the page title are ranked by lexical overlap
            (<ProseA href="https://en.wikipedia.org/wiki/Okapi_BM25" class="ref-link">BM25</ProseA>), semantic similarity
            (<ProseA href="https://arxiv.org/abs/2103.00020" class="ref-link">CLIP</ProseA>) and position. The top segments go into the prompt tagged by origin,
            and the domain of the page picks the template. Shopping copy leads with attributes, news leads
            with named entities.
          </ark.p>
        </ark.div>

        <ark.div>
          <ark.h3 class="text-lg font-600 mb-2">
            Checks its own claims
          </ark.h3>
          <ark.p class="text-base text-ink-muted leading-relaxed">
            The description is decomposed into atomic claims and each one is re-asked against the image.
            Unconfirmed claims are hedged, contradicted claims are struck. In practice the verifier is
            conservative. It hedged 27% of claims and struck 1.3%.
          </ark.p>
        </ark.div>

        <ark.div>
          <ark.h3 class="text-lg font-600 mb-2">
            Falls back to the device
          </ark.h3>
          <ark.p class="text-base text-ink-muted leading-relaxed">
            <ProseA href="https://huggingface.co/HuggingFaceTB/SmolVLM-500M-Instruct" class="ref-link">SmolVLM-500M</ProseA> runs in-browser on
            <ProseA href="https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API" class="ref-link">WebGPU</ProseA> via
            <ProseA href="https://huggingface.co/docs/transformers.js" class="ref-link">transformers.js</ProseA>, roughly 8 seconds per image,
            no server and no API key.
            That matters when the image is a medical scan or a bank statement.
          </ark.p>
        </ark.div>

        <ark.div>
          <ark.h3 class="text-lg font-600 mb-2">
            Speaks through the user's own screen reader
          </ark.h3>
          <ark.p class="text-base text-ink-muted leading-relaxed">
            Descriptions are written into the image's
            <ProseA href="https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name" class="ref-link">accessible name</ProseA> and announced on a polite
            <ProseA href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions" class="ref-link">ARIA live region</ProseA>.
            The extension adds no voice of its own.
          </ark.p>
        </ark.div>
      </ark.div>
    </ark.section>

    <ark.section id="interface" data-toc="Interface" class="scroll-mt-24 mt-20 pt-10 border-t border-ink/8">
      <ark.h2 class="text-2xl font-600 tracking-tight mb-4">
        Interface
      </ark.h2>
      <ark.p class="text-base text-ink-muted leading-relaxed max-w-prose mb-6">
        Onboarding, then a <ProseA href="https://developer.chrome.com/docs/extensions/reference/api/sidePanel" class="ref-link">side panel</ProseA> that docks beside the page. Every described image gets a card with a
        short version, a confidence indicator, an expandable long version, and the claims the verifier
        was not sure about.
      </ark.p>

      <ark.figure class="my-8">
        <NuxtImg
          src="/images/academia/ekphrasis/ui-showcase.png"
          alt="Ekphrasis onboarding screen beside three side-panel states: images, history and settings"
          class="w-full rounded-lg border border-ink/10"
          loading="lazy"
          sizes="100vw md:768px"
        />
        <ark.figcaption class="mt-3 text-xs text-ink-faint">
          Onboarding and the three side-panel tabs.
        </ark.figcaption>
      </ark.figure>

      <ark.figure class="my-8">
        <NuxtImg
          src="/images/academia/ekphrasis/context-menu.png"
          alt="Right-click context menu on a web page showing the Describe with Ekphrasis entry"
          class="w-full rounded-lg border border-ink/10"
          loading="lazy"
          sizes="100vw md:768px"
        />
        <ark.figcaption class="mt-3 text-xs text-ink-faint">
          Right-click any image, or press Alt+Shift+D for the panel.
        </ark.figcaption>
      </ark.figure>

      <ark.figure class="my-8">
        <NuxtImg
          src="/images/academia/ekphrasis/aria-label.png"
          alt="Chrome DevTools showing a generated aria-label written onto a Wikipedia image element"
          class="w-full rounded-lg border border-ink/10"
          loading="lazy"
          sizes="100vw md:768px"
        />
        <ark.figcaption class="mt-3 text-xs text-ink-faint">
          The description lands on the element as an accessible name, so the reader's own screen reader announces it.
        </ark.figcaption>
      </ark.figure>
    </ark.section>

    <ark.section id="architecture" data-toc="Architecture" class="scroll-mt-24 mt-20 pt-10 border-t border-ink/8">
      <ark.h2 class="text-2xl font-600 tracking-tight mb-4">
        Architecture
      </ark.h2>
      <ark.p class="text-base text-ink-muted leading-relaxed max-w-prose">
        A <ProseA href="https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3" class="ref-link">Chrome MV3</ProseA> extension, built with
        <ProseA href="https://docs.plasmo.com/" class="ref-link">Plasmo</ProseA>, harvests context and a
        <ProseA href="https://developer.chrome.com/docs/extensions/develop/concepts/service-workers" class="ref-link">service worker</ProseA> routes the work.
        The default path is a cloud inference service that ranks, generates and verifies. When it fails, the
        request drops to an on-device model. Descriptions are cached in
        <ProseA href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" class="ref-link">IndexedDB</ProseA> so a revisit costs nothing.
      </ark.p>

      <ark.figure class="my-8">
        <NuxtImg
          src="/images/academia/ekphrasis/architecture.png"
          alt="System architecture: browser extension with content script, service worker, offscreen on-device model and IndexedDB cache, talking to a cloud inference service that ranks context, generates and verifies"
          class="w-full rounded-lg border border-ink/10 bg-white p-4"
          loading="lazy"
          sizes="100vw md:768px"
        />
        <ark.figcaption class="mt-3 text-xs text-ink-faint">
          Extension, cloud service, and the on-device fallback.
        </ark.figcaption>
      </ark.figure>
    </ark.section>

    <ark.section id="results" data-toc="Results" class="scroll-mt-24 mt-20 pt-10 border-t border-ink/8">
      <ark.h2 class="text-2xl font-600 tracking-tight mb-4">
        Results
      </ark.h2>
      <ark.p class="text-base text-ink-muted leading-relaxed max-w-prose mb-6">
        Six metrics were fixed in a <ProseA href="https://en.wikipedia.org/wiki/Preregistration_(science)" class="ref-link">pre-registered</ProseA> plan
        before any data was generated. Four passed, two did not. Both misses are reported as they came out.
        Ground truth is 1,181 labelled (image, segment) pairs and 178 hand-judged claims. The claims were judged by hand deliberately, because using a
        model to grade a model's output would have made the hallucination metric circular.
      </ark.p>

      <ark.div class="overflow-x-auto -mx-6 px-6">
        <ark.table class="w-full min-w-[36rem] text-sm border-collapse">
          <ark.thead>
            <ark.tr class="border-b border-ink/15 text-left">
              <ark.th class="py-2 pe-4 font-500 text-xs uppercase tracking-wider text-ink-faint">Metric</ark.th>
              <ark.th class="py-2 pe-4 font-500 text-xs uppercase tracking-wider text-ink-faint">Target</ark.th>
              <ark.th class="py-2 pe-4 font-500 text-xs uppercase tracking-wider text-ink-faint">Result</ark.th>
              <ark.th class="py-2 font-500 text-xs uppercase tracking-wider text-ink-faint" />
            </ark.tr>
          </ark.thead>
          <ark.tbody>
            <ark.tr v-for="m in metrics" :key="m.id" class="border-b border-ink/8 align-top">
              <ark.td class="py-3 pe-4">
                <ark.span class="text-ink">{{ m.id }}</ark.span>
                <ProseA v-if="m.href" :href="m.href" class="ref-link text-ink-muted"> {{ m.name }}</ProseA>
                <ark.span v-else class="text-ink-muted"> {{ m.name }}</ark.span>
              </ark.td>
              <ark.td class="py-3 pe-4 whitespace-nowrap text-ink-muted font-mono text-xs">
                {{ m.target }}
              </ark.td>
              <ark.td class="py-3 pe-4 whitespace-nowrap">
                <ark.span class="text-ink font-500 font-mono text-xs">{{ m.result }}</ark.span>
                <ark.span class="block text-xs text-ink-faint mt-0.5">{{ m.note }}</ark.span>
              </ark.td>
              <ark.td class="py-3 whitespace-nowrap">
                <ark.span
                  class="inline-flex items-center rounded px-1.5 py-0.5 text-[11px] uppercase tracking-wider"
                  :class="m.pass ? 'bg-emerald-500/12 text-emerald-400' : 'bg-amber-500/12 text-amber-400'"
                >
                  {{ m.pass ? 'pass' : 'miss' }}
                </ark.span>
              </ark.td>
            </ark.tr>
          </ark.tbody>
        </ark.table>
      </ark.div>

      <ark.div class="mt-10 space-y-8 max-w-prose">
        <ark.div>
          <ark.h3 class="text-lg font-600 mb-2">
            BM25 alone reaches 0.776 of the full 0.789
          </ark.h3>
          <ark.p class="text-base text-ink-muted leading-relaxed">
            Adding CLIP and a positional term buys +0.013 nDCG for 150 MB of weights. If you are building
            in-browser context ranking, lexical overlap is doing nearly all the work.
          </ark.p>
        </ark.div>

        <ark.figure class="my-8">
          <NuxtImg
            src="/images/academia/ekphrasis/ndcg-ablation.png"
            alt="Bar chart of nDCG@5 across ranker variants: BM25 only 0.776, BM25 plus spatial 0.786, full model 0.789"
            class="w-full rounded-lg border border-ink/10 bg-white p-4"
            loading="lazy"
            sizes="100vw md:768px"
          />
          <ark.figcaption class="mt-3 text-xs text-ink-faint">
            Each signal adds a small monotonic lift. The first one adds most of it.
          </ark.figcaption>
        </ark.figure>

        <ark.div>
          <ark.h3 class="text-lg font-600 mb-2">
            M3 measured the wrong half of the verifier
          </ark.h3>
          <ark.p class="text-base text-ink-muted leading-relaxed">
            It counts only struck claims, and this verifier prefers hedging. 120 hedges against 6 strikes
            across 446 claims. The mechanism works. The metric was defined against the wrong operator. The
            threshold was fixed before the data existed and has not been moved after the fact.
          </ark.p>
        </ark.div>
      </ark.div>
    </ark.section>

    <ark.section id="on-device" data-toc="On-device" class="scroll-mt-24 mt-20 pt-10 border-t border-ink/8">
      <ark.h2 class="text-2xl font-600 tracking-tight mb-4">
        On-device
      </ark.h2>
      <ark.p class="text-base text-ink-muted leading-relaxed max-w-prose">
        Warm the model once, about 500 MB downloaded and then served from cache, and the browser can
        describe an image with the network switched off entirely. The output is shorter and plainer than
        the cloud path, with no entities and no verification, which is the honest ceiling of a 500M model.
        It is the difference between a degraded description and none.
      </ark.p>

      <ark.figure class="my-8">
        <NuxtImg
          src="/images/academia/ekphrasis/on-device.png"
          alt="On-device demo page showing the model downloading, then generating a description in the browser with no network"
          class="w-full rounded-lg border border-ink/10"
          loading="lazy"
          sizes="100vw md:768px"
        />
        <ark.figcaption class="mt-3 text-xs text-ink-faint">
          SmolVLM-500M on WebGPU. Nothing leaves the device.
        </ark.figcaption>
      </ark.figure>
    </ark.section>

    <ark.section id="next" data-toc="What's next" class="scroll-mt-24 mt-20 pt-10 border-t border-ink/8">
      <ark.h2 class="text-2xl font-600 tracking-tight mb-4">
        What I want to try next
      </ark.h2>
      <ark.p class="text-base text-ink-muted leading-relaxed max-w-prose mb-8">
        None of this is in the thesis, because it came out of using the tool rather than measuring it.
        Each one is listed as an experiment and not a result, which is the point.
      </ark.p>

      <ark.div class="space-y-10 max-w-prose">
        <ark.div>
          <ark.h3 class="text-lg font-600 mb-2">
            Put the card up at discovery, stream the text in
          </ark.h3>
          <ark.p class="text-base text-ink-muted leading-relaxed">
            Finding an image is a pure DOM scan. No network, no model. But the side panel waits for a whole
            description before it renders anything, so it sits empty while the first call runs, and on a slow
            page that reads as broken.
          </ark.p>
          <ark.p class="mt-3 text-base text-ink-muted leading-relaxed">
            The fix is to render the card the moment an image is found and fill the text in as it arrives.
            I prototyped it in about thirty lines across three message handlers, and it taught me two things.
            The plumbing was already there, since the worker was broadcasting a <ark.code class="font-mono text-sm text-ink">describing</ark.code>
            message the panel simply ignored. And the obvious version has a trap: handle only the success path
            and a failed describe leaves the placeholder spinning forever, which is worse than never showing it.
          </ark.p>
          <ark.p class="mt-3 text-base text-ink-muted leading-relaxed">
            The part I care about is not the spinner. A screen reader announcing a half-built card is a
            regression, so the placeholder needs
            <ProseA href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy" class="ref-link">aria-busy</ProseA>
            and the announcement has to fire on completion, not arrival. Sighted users get a nicety. Screen
            reader users get the difference between "this is working on it" and silence.
          </ark.p>
        </ark.div>

        <ark.div>
          <ark.h3 class="text-lg font-600 mb-2">
            Swap the on-device model
          </ark.h3>
          <ark.p class="text-base text-ink-muted leading-relaxed">
            SmolVLM-500M was picked because it was the smallest vision-language model with a working browser
            path at the time. That is no longer true.
            <ProseA href="https://www.liquid.ai/blog/lfm2-vl-efficient-vision-language-models" class="ref-link">LFM2-VL-450M</ProseA>
            is smaller than what ships here, pairs a SigLIP2 encoder with a lightweight connector, is built
            for on-device use, and reports up to a 2x GPU speedup over comparable models. LFM2.5-VL-3B covers
            the higher-capability end, and <ProseA href="https://moondream.ai/" class="ref-link">Moondream</ProseA>
            at roughly 1.9B is a third candidate with int4 quantisation and a ~2 GB footprint.
          </ark.p>
          <ark.p class="mt-3 text-base text-ink-muted leading-relaxed">
            The swap itself is contained, since the on-device path sits behind one interface. What it needs
            is its own latency and faithfulness measurement before any claim gets made.
          </ark.p>
        </ark.div>

        <ark.div>
          <ark.h3 class="text-lg font-600 mb-2">
            Use Chrome's built-in model when it is there
          </ark.h3>
          <ark.p class="text-base text-ink-muted leading-relaxed">
            Chrome's <ProseA href="https://developer.chrome.com/docs/ai/prompt-api" class="ref-link">Prompt API</ProseA>
            now accepts image input to Gemini Nano, which on paper removes the 500 MB download entirely.
          </ark.p>
          <ark.p class="mt-3 text-base text-ink-muted leading-relaxed">
            It cannot be the primary path yet. It needs a recent Chrome, sits behind a flag, is desktop-only,
            and wants roughly 22 GB of free disk and a GPU with more than 4 GB of VRAM. This is an
            accessibility tool. It has to run on whatever machine a blind or low-vision user actually owns,
            not on a developer's workstation.
          </ark.p>
          <ark.p class="mt-3 text-base text-ink-muted leading-relaxed">
            So the experiment is not "replace the vendored model", it is "add a rung". Prefer the built-in
            model when the browser offers it, fall back to the vendored one otherwise, and fall back to cloud
            when neither works. Same fallback shape the cloud path already uses, one level down. The
            interesting question is whether Nano's descriptions are good enough to prefer, which nobody has
            measured for this task.
          </ark.p>
        </ark.div>

        <ark.div>
          <ark.h3 class="text-lg font-600 mb-2">
            Redefine M3 over hedges, and re-measure
          </ark.h3>
          <ark.p class="text-base text-ink-muted leading-relaxed">
            M3 counts struck claims, and this verifier hedges instead of striking. The threshold stays as
            pre-registered, but the honest follow-up is to define the metric over hedge-or-strike and run it
            again as a separate, clearly labelled analysis. The mechanism is doing something. The metric was
            pointed at the wrong operator.
          </ark.p>
        </ark.div>
      </ark.div>
    </ark.section>

    <ark.section id="limits" data-toc="Limits" class="scroll-mt-24 mt-20 pt-10 border-t border-ink/8">
      <ark.h2 class="text-2xl font-600 tracking-tight mb-4">
        Known limits
      </ark.h2>
      <ark.ul class="space-y-3 max-w-prose">
        <ark.li class="flex gap-3 text-base text-ink-muted leading-relaxed">
          <ark.span class="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink-faint" aria-hidden="true" />
          <ark.span>
            <ark.span class="text-ink">One annotator.</ark.span>
            No <ProseA href="https://en.wikipedia.org/wiki/Inter-rater_reliability" class="ref-link">inter-rater reliability</ProseA>
            on the claim labels, so the hallucination numbers rest on a single judgement. The three model
            judges that produced the ranking ground truth agreed only fairly
            (<ProseA href="https://en.wikipedia.org/wiki/Fleiss%27_kappa" class="ref-link">Fleiss' κ</ProseA> = 0.365),
            which is why majority voting plus human adjudication was used rather than raw single-judge labels.
          </ark.span>
        </ark.li>

        <ark.li class="flex gap-3 text-base text-ink-muted leading-relaxed">
          <ark.span class="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink-faint" aria-hidden="true" />
          <ark.span>
            <ark.span class="text-ink">No live user study.</ark.span>
            <ProseA href="https://en.wikipedia.org/wiki/Institutional_review_board" class="ref-link">Ethics clearance</ProseA>
            was out of scope for a twelve-week capstone, so this evaluates description quality and
            faithfulness, not user preference. The strongest claim available is that descriptions are more
            grounded, not that blind and low-vision users prefer them.
          </ark.span>
        </ark.li>

        <ark.li class="flex gap-3 text-base text-ink-muted leading-relaxed">
          <ark.span class="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink-faint" aria-hidden="true" />
          <ark.span>
            <ark.span class="text-ink">The deployed ranker is not the tuned one.</ark.span>
            The grid-searched weights live in the evaluation. Production runs
            <ProseA href="https://en.wikipedia.org/wiki/Okapi_BM25" class="ref-link">BM25</ProseA> and a positional
            term only, with no CLIP in the loop. Stated rather than quietly reconciled.
          </ark.span>
        </ark.li>

        <ark.li class="flex gap-3 text-base text-ink-muted leading-relaxed">
          <ark.span class="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink-faint" aria-hidden="true" />
          <ark.span>
            <ark.span class="text-ink">The on-device path needs the side panel open.</ark.span>
            <ProseA href="https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API" class="ref-link">WebGPU</ProseA>
            is unavailable in an extension
            <ProseA href="https://developer.chrome.com/docs/extensions/develop/concepts/service-workers" class="ref-link">service worker</ProseA>,
            so the cloud-failure path delegates to the panel. Moving it to an
            <ProseA href="https://developer.chrome.com/docs/extensions/reference/api/offscreen" class="ref-link">offscreen document</ProseA>
            is the fix, and it is not merged.
          </ark.span>
        </ark.li>

        <ark.li class="flex gap-3 text-base text-ink-muted leading-relaxed">
          <ark.span class="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink-faint" aria-hidden="true" />
          <ark.span>
            <ark.span class="text-ink">On-device output is short and long text only.</ark.span>
            No entities, no verification. That is the honest ceiling of a
            <ProseA href="https://huggingface.co/HuggingFaceTB/SmolVLM-500M-Instruct" class="ref-link">500M model</ProseA>.
          </ark.span>
        </ark.li>
      </ark.ul>
    </ark.section>

    <ark.section id="reading" data-toc="Reading it" class="scroll-mt-24 mt-20 pt-10 border-t border-ink/8">
      <ark.h2 class="text-2xl font-600 tracking-tight mb-4">
        Reading it
      </ark.h2>
      <ark.p class="text-base text-ink-muted leading-relaxed max-w-prose mb-6">
        The repository is private for now. If you get access, these are the files worth opening first.
      </ark.p>
      <ark.div class="grid gap-1 sm:grid-cols-2">
        <ark.div v-for="d in docs" :key="d.label" class="-mx-3 p-3">
          <ark.span class="block text-sm font-500 text-ink font-mono">
            {{ d.label }}
          </ark.span>
          <ark.span class="mt-0.5 block text-xs text-ink-muted leading-relaxed">
            {{ d.blurb }}
          </ark.span>
        </ark.div>
      </ark.div>
    </ark.section>
  </ark.article>
</template>
