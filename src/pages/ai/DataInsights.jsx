import { motion, useReducedMotion } from 'framer-motion'
import {
  Banknote, CalendarCheck, Clock, FileText, Gauge, Globe, Search, Table, TrendingUp, Users,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { AI_SERVICES } from '../../data/content'
import heroImg from '../../assets/ai/insights.jpg'
import imgOverview from '../../assets/detail/insights-dashboard.jpg'
import imgChecklist from '../../assets/detail/insights-tablet.jpg'

/* No live AI sub-page exists yet — copy is drafted from the AI Services hub
   and the service points in src/data/content.js. Needs a review by the team. */

/* ───────── Added section: where the numbers already live ─────────
   The overview's argument is that the data exists but is scattered, so draw
   it: sources on both flanks, one dashboard in the middle, connectors
   between. Laid out as a grid with CSS connectors rather than an SVG, so the
   labels stay real text at any size. */
const LEFT_SOURCES = [
  { icon: Banknote, name: 'Accounting', detail: 'Invoices, payments, margin' },
  { icon: Users, name: 'CRM', detail: 'Pipeline, clients, win rate' },
  { icon: CalendarCheck, name: 'Job management', detail: 'Jobs, scheduling, completion' },
]

const RIGHT_SOURCES = [
  { icon: Clock, name: 'Payroll & rostering', detail: 'Hours, cost of delivery' },
  { icon: Globe, name: 'Website analytics', detail: 'Enquiries, traffic, sources' },
  { icon: Table, name: 'The spreadsheets', detail: 'The ones only one person updates' },
]

function SourceCard({ icon: Icon, name, detail, side, index, reduce }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: side === 'left' ? -16 : 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
      className="relative"
    >
      <div
        className={`group flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 transition-[border-color,box-shadow] duration-500 hover:border-brand-blue/30 hover:shadow-[0_18px_38px_-26px_rgba(11,18,32,.45)] ${
          side === 'left' ? 'lg:pr-5' : 'lg:flex-row-reverse lg:pl-5 lg:text-right'
        }`}
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-blue/[0.08] text-brand-blue transition-colors duration-500 group-hover:bg-brand-blue group-hover:text-white">
          <Icon size={17} />
        </span>
        <span className="min-w-0">
          <span className="block text-[14.5px] font-semibold leading-tight text-ink">{name}</span>
          <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">{detail}</span>
        </span>
      </div>
      {/* connector into the hub — wide screens only */}
      <span
        aria-hidden="true"
        className={`absolute top-1/2 hidden h-[2px] w-9 -translate-y-1/2 lg:block ${
          side === 'left' ? 'left-full' : 'right-full'
        }`}
        style={{
          background:
            side === 'left'
              ? 'linear-gradient(to right, #e3e8f0, rgba(59,130,246,.55))'
              : 'linear-gradient(to left, #e3e8f0, rgba(34,211,238,.55))',
        }}
      />
      {/* a pulse drifting along the connector toward the dashboard, so the
          diagram reads as data arriving rather than sitting still.
          The wrapper owns the vertical centring: Framer writes the whole
          `transform`, so a Tailwind -translate-y class on the animated
          element itself would be thrown away. */}
      {!reduce && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 hidden h-[7px] w-9 -translate-y-1/2 lg:block ${
            side === 'left' ? 'left-full' : 'right-full'
          }`}
        >
          <motion.span
            className="absolute left-0 top-0 h-[7px] w-[7px] rounded-full"
            style={{ background: 'var(--brand-gradient)' }}
            /* x and opacity carry the same number of keyframes, so one
               `times` array applies cleanly to both */
            animate={{
              x: side === 'left' ? [0, 5, 23, 29] : [29, 24, 6, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.18, 0.78, 1],
              ease: 'linear',
              repeat: Infinity,
              repeatDelay: 1.2,
              delay: index * 0.5,
            }}
          />
        </span>
      )}
    </motion.li>
  )
}

function WhereNumbersLive() {
  const reduce = useReducedMotion()
  return (
    <section id="sources" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -left-52 top-24 h-[500px] w-[500px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.15), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="Your data"
          title="Six places your numbers already live"
          text="Nothing here needs replacing. The work is connecting what you already run, so the picture assembles itself instead of being rebuilt by hand each month."
          center
        />

        <Reveal y={36} className="mx-auto mt-12 max-w-[1120px]">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-9">
            <ul className="space-y-3">
              {LEFT_SOURCES.map((s, i) => (
                <SourceCard key={s.name} {...s} side="left" index={i} reduce={reduce} />
              ))}
            </ul>

            {/* the hub — the outer wrapper carries a slow float, so there is
                still motion below lg, where the connectors are hidden */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-auto w-full max-w-[260px]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
                className="relative overflow-hidden rounded-[26px] bg-navy px-6 py-7 text-center text-white"
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background:
                      'radial-gradient(70% 60% at 50% 0%, rgba(34,211,238,.24), transparent 70%), radial-gradient(60% 60% at 50% 100%, rgba(59,130,246,.26), transparent 70%)',
                  }}
                />
                <div className="relative">
                  <span className="relative mx-auto grid h-14 w-14 place-items-center">
                    {/* one slow ring, so the hub looks like it is receiving */}
                    {!reduce && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-2xl border border-brand-cyan/50"
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                    <span
                      className="relative grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[0_18px_34px_-16px_rgba(34,211,238,.8)]"
                      style={{ background: 'var(--brand-gradient)' }}
                    >
                      <Gauge size={23} />
                    </span>
                  </span>
                  <p className="mt-4 text-[18px] font-semibold tracking-[-0.02em]">One dashboard</p>
                  <p className="mt-1.5 text-[13px] leading-snug text-white/60">
                    Live, shared, and the same numbers for everyone
                  </p>
                  <ul className="mt-5 space-y-1.5 border-t border-white/10 pt-4 text-[12.5px] text-white/70">
                    <li>Automated reports</li>
                    <li>Plain-English questions</li>
                    <li>Forecasts, where history allows</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>

            <ul className="space-y-3">
              {RIGHT_SOURCES.map((s, i) => (
                <SourceCard key={s.name} {...s} side="right" index={i} reduce={reduce} />
              ))}
            </ul>
          </div>

          <p className="mt-9 flex items-start gap-2.5 text-[14px] leading-relaxed text-muted">
            <FileText size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            We start with whichever two sources answer your most annoying question. A dashboard built from everything at
            once takes months and gets opened twice.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'data-insights',
  family: AI_SERVICES,
  parent: { label: 'AI Services', href: '/ai-services' },
  crumb: 'AI Data & Insights',
  tagline: 'AI Services · Data & Insights',
  title: ['AI Data', '& Insights'],
  kicker: 'Answers from your own numbers.',
  hero: {
    img: heroImg,
    focus: '60% 50%',
    text: 'Live dashboards, automated reports and forecasting built on the systems you already use — so you can ask a question on a Tuesday instead of waiting for month end.',
    cta: 'Book a consultation',
  },
  glance: [
    { icon: Gauge, k: 'Dashboards', v: 'Live, not last month' },
    { icon: TrendingUp, k: 'Forecasting', v: 'Based on your own history' },
    { icon: Search, k: 'Ask in', v: 'Plain English' },
  ],
  overview: {
    eyebrow: 'Why it matters',
    title: 'Your business already has the data. It is just spread across five systems and a spreadsheet.',
    body: [
      'The job numbers are in one place, the invoices in another, the hours somewhere else, and the real picture only appears when somebody spends a morning stitching them together in Excel. By the time it is ready, it describes a month that has already finished.',
      'We connect the systems you actually use and build dashboards that stay current, schedule the reports that used to be a manual job, and set things up so you can ask a question in ordinary language rather than waiting for someone to build a pivot table. Where there is enough history, we add forecasting — labelled as a forecast, not as fact.',
    ],
    facts: [
      { k: 'Dashboards', v: 'Live' },
      { k: 'Reports', v: 'Automated & scheduled' },
      { k: 'Questions', v: 'Asked in plain English' },
      { k: 'Sources', v: 'The systems you already use' },
    ],
    badge: {
      value: 'Live, not monthly',
      label: 'Numbers you can check on a Tuesday, rather than wait for at month end.',
    },
    img: imgOverview,
    alt: 'A live analytics dashboard open on a laptop',
    focus: '65% 45%',
    cta: 'Book a consultation',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'From scattered data to a straight answer',
    text: 'Four things that move reporting out of spreadsheets and into something you will actually look at.',
    items: [
      {
        icon: Gauge,
        title: 'Live dashboards',
        desc: 'The handful of numbers that actually run your business, on one screen, updating themselves — rather than a forty-tab workbook nobody opens twice.',
      },
      {
        icon: TrendingUp,
        title: 'Forecasting',
        desc: 'Projections built from your own trading history for cash flow, demand and capacity — always presented as a forecast with its assumptions on show.',
      },
      {
        icon: Search,
        title: 'Ask questions in plain English',
        desc: 'Type "which clients grew most this quarter" and get an answer, instead of adding it to a list of reports somebody has to build for you.',
      },
      {
        icon: FileText,
        title: 'Automated reports',
        desc: 'The weekly and monthly reports that currently eat someone’s Friday, generated and sent on schedule, in the same shape every time.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What a data & insights project covers',
    text: 'Starting from whatever systems you have now, however tidy they happen to be.',
    items: [
      'Data source review',
      'Live dashboard build',
      'Automated scheduled reports',
      'Forecasting where history allows',
      'Plain-English querying',
      'Training on reading the numbers',
    ],
    chip: 'Plain answers from your data',
    img: imgChecklist,
    alt: 'A manager reading a performance chart on a tablet',
    focus: '45% 50%',
    cta: 'See what is possible',
  },
  relatedTitle: 'The rest of our AI services',
  cta: {
    title: 'Still reporting out of spreadsheets?',
    sub: 'We will show you what a live dashboard of your own numbers would actually look like.',
    primaryLabel: 'Book a consultation',
  },
}

export default function DataInsights() {
  return (
    <ServiceDetail page={PAGE}>
      <WhereNumbersLive />
    </ServiceDetail>
  )
}
