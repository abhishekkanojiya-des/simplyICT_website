import { motion } from 'framer-motion'
import {
  Banknote, CalendarClock, Compass, Handshake, Hourglass, Lightbulb, MessagesSquare, Rocket,
  ScanSearch, Target,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { AI_SERVICES } from '../../data/content'
import heroImg from '../../assets/ai/strategy.jpg'
import imgOverview from '../../assets/detail/strategy-ai.jpg'
import imgChecklist from '../../assets/detail/strategy-workshop.jpg'

/* No live AI sub-page exists yet — copy is drafted from the AI Services hub
   and the service points in src/data/content.js. Needs a review by the team. */

/* ───────── Added section: the use-case scorecard ─────────
   Use-case discovery is the heart of this service, so show the judgement it
   produces: every idea weighed on effort against payoff, with the verdict
   stated. Kept as one compact table — grouping these into separate panels
   read well but made the section twice as tall as it needed to be.
   The levels are a considered view rather than measured data, so each one
   reads as a word as well as a graphic. */
const LEVELS = ['Low', 'Medium', 'High']

const VERDICTS = {
  start: { label: 'Start here', icon: Rocket, featured: true },
  plan: { label: 'Worth planning', icon: CalendarClock },
  park: { label: 'Park for now', icon: Hourglass },
}

const CASES = [
  {
    name: 'Meeting notes & summaries',
    desc: 'Transcripts turned into decisions and actions, with nobody taking minutes.',
    effort: 1,
    payoff: 3,
    verdict: 'start',
  },
  {
    name: 'Routine document drafting',
    desc: 'First drafts your team edits, instead of starting from a blank page.',
    effort: 1,
    payoff: 3,
    verdict: 'start',
  },
  {
    name: 'Searching your own documents',
    desc: 'Ask a question, get the answer out of your files — with the source attached.',
    effort: 2,
    payoff: 3,
    verdict: 'start',
  },
  {
    name: 'Customer chat assistant',
    desc: 'Covers the common enquiries after hours, hands everything else to your team.',
    effort: 2,
    payoff: 2,
    verdict: 'plan',
  },
  {
    name: 'Quote & proposal generation',
    desc: 'Drafts proposals from your own pricing. Depends entirely on clean data.',
    effort: 3,
    payoff: 3,
    verdict: 'plan',
  },
  {
    name: 'Generating marketing imagery',
    desc: 'Occasionally handy, rarely moves a quarter — and easy to try without us.',
    effort: 1,
    payoff: 1,
    verdict: 'park',
  },
  {
    name: 'Training a custom model',
    desc: 'Seldom justified at small-business scale; off-the-shelf tools catch up first.',
    effort: 3,
    payoff: 1,
    verdict: 'park',
  },
]

/* Three pips and the word, so a level never rests on the graphic alone.
   Payoff fills with the brand gradient; effort fills in ink, because more
   effort is a cost rather than something to celebrate. */
function Pips({ level, tone }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={`h-1.5 w-4 rounded-full ${n > level ? 'bg-line' : tone === 'payoff' ? '' : 'bg-ink/70'}`}
            style={n <= level && tone === 'payoff' ? { background: 'var(--brand-gradient)' } : undefined}
          />
        ))}
      </span>
      <span className="w-[50px] text-[12.5px] font-semibold text-ink">{LEVELS[level - 1]}</span>
    </span>
  )
}

function UseCaseScorecard() {
  return (
    <section id="use-cases" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -left-52 top-24 h-[480px] w-[480px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.15), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="Use-case discovery"
          title="Not every AI idea is worth the licence fee"
          text="We weigh each idea on what it costs to set up against what it gives back. The dull ones at the top are where most businesses should start."
          center
        />

        <Reveal y={32} className="mx-auto mt-11 max-w-[1020px]">
          <div className="overflow-hidden rounded-[26px] border border-line bg-white shadow-[0_30px_64px_-42px_rgba(11,18,32,.45)]">
            {/* column heads — wide screens only */}
            <div className="hidden items-center gap-6 border-b border-line bg-paper px-7 py-3 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-muted lg:grid lg:grid-cols-[minmax(0,1fr)_118px_118px_150px]">
              <span>Use case</span>
              <span>Effort</span>
              <span>Payoff</span>
              <span className="text-right">Verdict</span>
            </div>

            <ul>
              {CASES.map(({ name, desc, effort, payoff, verdict }, i) => {
                const { label, icon: Icon, featured } = VERDICTS[verdict]
                return (
                  <motion.li
                    key={name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                    className={`grid gap-3 border-b border-line px-6 py-4 transition-colors duration-300 last:border-b-0 sm:px-7 lg:grid-cols-[minmax(0,1fr)_118px_118px_150px] lg:items-center lg:gap-6 ${
                      featured ? 'bg-brand-blue/[0.035] hover:bg-brand-blue/[0.06]' : 'hover:bg-paper/70'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-[15.5px] font-semibold leading-tight tracking-[-0.02em] text-ink">{name}</p>
                      <p className="mt-1 max-w-[70ch] text-[13.5px] leading-snug text-muted">{desc}</p>
                    </div>

                    {/* meters — labelled inline on small screens, column-aligned on wide */}
                    <div className="flex items-center justify-between gap-4 lg:block">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted lg:hidden">
                        Effort
                      </span>
                      <Pips level={effort} tone="effort" />
                    </div>
                    <div className="flex items-center justify-between gap-4 lg:block">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted lg:hidden">
                        Payoff
                      </span>
                      <Pips level={payoff} tone="payoff" />
                    </div>

                    <div className="lg:text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold ${
                          featured ? 'text-white' : 'border border-line bg-paper text-ink'
                        }`}
                        style={featured ? { background: 'var(--brand-gradient)' } : undefined}
                      >
                        <Icon size={13} strokeWidth={featured ? 2.8 : 2.2} className={featured ? '' : 'text-brand-blue'} />
                        {label}
                      </span>
                    </div>
                  </motion.li>
                )
              })}
            </ul>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-muted">
              <Lightbulb size={15} className="mt-0.5 shrink-0 text-brand-blue" />
              Your list will look different — a law firm and a plumbing business do not share a top row.
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
              <span className="inline-flex items-center gap-2 text-[12.5px] text-muted">
                <span className="h-1.5 w-4 rounded-full" style={{ background: 'var(--brand-gradient)' }} />
                Payoff
              </span>
              <span className="inline-flex items-center gap-2 text-[12.5px] text-muted">
                <span className="h-1.5 w-4 rounded-full bg-ink/70" />
                Effort
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'ai-strategy',
  family: AI_SERVICES,
  parent: { label: 'AI Services', href: '/ai-services' },
  crumb: 'AI Strategy & Consulting',
  tagline: 'AI Services · Strategy & Consulting',
  title: ['AI Strategy', '& Consulting'],
  kicker: 'Find where AI actually pays off.',
  hero: {
    img: heroImg,
    focus: '40% 40%',
    text: 'A readiness review, honest use-case discovery and a costed roadmap — so you spend on the handful of things AI genuinely does well for a business your size.',
    cta: 'Book a consultation',
  },
  glance: [
    { icon: ScanSearch, k: 'Starts with', v: 'An AI readiness review' },
    { icon: Compass, k: 'You get', v: 'A costed roadmap' },
    { icon: Handshake, k: 'Advice', v: 'Vendor-neutral' },
  ],
  overview: {
    eyebrow: 'Why strategy first',
    title: 'The question is not whether AI works. It is which of your jobs it is worth pointing at.',
    body: [
      'There is no shortage of demos. What is harder to find is someone willing to tell you that three of the five ideas on your list are not worth the licence fee, and that the dull one everybody skipped over would save your admin team a day a week.',
      'So we start by looking: what your team actually spends time on, where your data lives, and what is already licensed and sitting unused. Then you get a prioritised, costed roadmap — in plain English, with the things we would not bother doing marked as such.',
    ],
    facts: [
      { k: 'Starts with', v: 'An AI readiness review' },
      { k: 'Deliverable', v: 'A prioritised, costed roadmap' },
      { k: 'Written in', v: 'Plain English' },
      { k: 'Obligation to buy from us', v: 'None' },
    ],
    badge: {
      value: 'No hype',
      label: 'Where AI is not the answer for a job, we will say so plainly.',
    },
    img: imgOverview,
    alt: 'A robotic hand reaching towards a network of connected points',
    focus: '50% 68%',
    cta: 'Book a consultation',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'From curiosity to a plan you can budget',
    text: 'Four steps that turn "we should probably do something with AI" into a decision you can actually sign off.',
    items: [
      {
        icon: ScanSearch,
        title: 'AI readiness review',
        desc: 'An honest look at your data, systems, licensing and security — because most AI projects stall on messy permissions long before the clever part matters.',
      },
      {
        icon: Target,
        title: 'Use-case discovery',
        desc: 'We work through where your team loses hours and rank the opportunities by effort against payoff, rather than by which demo looked the most impressive.',
      },
      {
        icon: Banknote,
        title: 'Costed roadmap',
        desc: 'A prioritised plan with licence costs, setup effort and expected time saved for each item — so AI becomes a budget line rather than an experiment.',
      },
      {
        icon: MessagesSquare,
        title: 'Plain-English advice',
        desc: 'Explanations your leadership team can act on without a glossary, and a straight answer when the honest recommendation is to wait six months.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What a strategy engagement covers',
    text: 'Scoped to your size — a single review, or an ongoing seat at the table as things change.',
    items: [
      'AI readiness review',
      'Use-case discovery workshop',
      'Data & permissions assessment',
      'Costed, prioritised roadmap',
      'Tool & licence recommendations',
      'Plain-English report for leadership',
    ],
    chip: 'Clear, costed roadmap',
    img: imgChecklist,
    alt: 'A team mapping out AI use cases on a whiteboard',
    focus: '55% 50%',
    cta: 'Start with a review',
  },
  relatedTitle: 'The rest of our AI services',
  cta: {
    title: 'Not sure where AI fits your business?',
    sub: 'Start with a readiness review — a clear picture and a costed plan, with no obligation.',
    primaryLabel: 'Book a consultation',
  },
}

export default function AiStrategy() {
  return (
    <ServiceDetail page={PAGE}>
      <UseCaseScorecard />
    </ServiceDetail>
  )
}
