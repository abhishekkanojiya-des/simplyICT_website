import { motion } from 'framer-motion'
import {
  Banknote, Compass, FileText, Handshake, Lightbulb, Map, Milestone, Route, Target, Wallet,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { MANAGED_IT_SERVICES } from '../../data/content'
import heroImg from '../../assets/managed/consulting.jpg'
import imgOverview from '../../assets/detail/consulting-roadmap.jpg'
import imgChecklist from '../../assets/detail/consulting-documents.jpg'

/* Content mirrors simplyict.com.au/managed-it-services/it-consulting/ */

/* ───────── Bespoke section: the three-horizon roadmap ─────────
   A roadmap is the deliverable, so show its shape. Three horizons
   stepping down a gradient rail: fix, build, then plan. */
const HORIZONS = [
  {
    icon: Target,
    tag: 'Now',
    when: '0 – 3 months',
    lead: 'Stop the bleeding.',
    desc: 'The risks and annoyances that are costing you money or sleep this quarter. Cheap, fast, high-relief work.',
    items: ['Close the obvious security gaps', 'Fix the thing that breaks weekly', 'Get backups verified', 'Tidy licensing you are overpaying for'],
  },
  {
    icon: Route,
    tag: 'Next',
    when: '3 – 12 months',
    lead: 'Build the foundation.',
    desc: 'The projects that need planning and budget, sequenced so each one makes the next one easier rather than harder.',
    items: ['Replace ageing hardware on a plan', 'Cloud or hybrid migration', 'Standardise devices and builds', 'Documented recovery plan'],
  },
  {
    icon: Milestone,
    tag: 'Later',
    when: '1 – 3 years',
    lead: 'Plan for where you are going.',
    desc: 'The bigger moves that follow your business plan — growth, new sites, new systems — costed so they never arrive as a surprise.',
    items: ['Capacity for headcount growth', 'New sites & systems', 'Lifecycle & refresh schedule', 'A three-year IT budget'],
  },
]

const DELIVERABLES = [
  { icon: Map, label: 'A written technology roadmap' },
  { icon: Wallet, label: 'A costed 3-year IT budget' },
  { icon: FileText, label: 'A prioritised risk register' },
  { icon: Handshake, label: 'A vendor & procurement shortlist' },
]

function Roadmap() {
  return (
    <section id="roadmap" className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(45% 55% at 0% 0%, rgba(59,130,246,.24), transparent 70%), radial-gradient(40% 50% at 100% 100%, rgba(34,211,238,.18), transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(rgba(147,197,253,.3) 1px, transparent 1.2px)',
          backgroundSize: '16px 16px',
          WebkitMaskImage: 'radial-gradient(75% 65% at 50% 40%, #000, transparent)',
          maskImage: 'radial-gradient(75% 65% at 50% 40%, #000, transparent)',
        }}
      />

      <div className="container-site relative">
        <DetailHead
          eyebrow="The deliverable"
          title="Now, next, later — a roadmap you could hand to your accountant"
          text="Three horizons instead of one overwhelming list. Each has a cost, a reason and an owner, and nothing on it is there to sell you something."
          dark
          center
        />

        <div className="relative mt-14">
          {/* rail */}
          <div
            className="absolute left-7 top-4 bottom-4 w-[2px] rounded-full lg:left-0 lg:right-0 lg:top-7 lg:bottom-auto lg:h-[2px] lg:w-auto"
            aria-hidden="true"
            style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,.9), rgba(34,211,238,.25))' }}
          />

          <ol className="relative grid gap-10 lg:grid-cols-3 lg:gap-6">
            {HORIZONS.map(({ icon: Icon, tag, when, lead, desc, items }, i) => (
              <motion.li
                key={tag}
                initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
                className="relative flex gap-5 lg:block"
              >
                <span
                  className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-[0_18px_34px_-16px_rgba(34,211,238,.8)] ring-[6px] ring-navy"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  <Icon size={22} />
                </span>

                {/* a gentle staircase on desktop, so time reads left-to-right */}
                <div className={`lg:mt-7 ${i === 1 ? 'lg:pt-7' : ''} ${i === 2 ? 'lg:pt-14' : ''}`}>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full border border-white/20 bg-white/[0.07] px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-cyan">
                      {tag}
                    </span>
                    <span className="text-[13px] font-medium text-white/50">{when}</span>
                  </div>
                  <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.03em] text-white sm:text-[25px]">{lead}</h3>
                  <p className="mt-2.5 text-[15.5px] leading-relaxed text-white/65">{desc}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                    {items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[14.5px] text-white/85">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: 'var(--brand-gradient)' }}
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.2} className="mt-14 lg:mt-20">
          <div className="rounded-[26px] border border-white/[0.12] bg-white/[0.05] p-7 backdrop-blur sm:p-8">
            <p className="flex items-center gap-2.5 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-white/50">
              <Lightbulb size={15} className="text-brand-cyan" />
              What you walk away with
            </p>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {DELIVERABLES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/[0.07] text-brand-cyan">
                    <Icon size={17} />
                  </span>
                  <span className="pt-2 text-[15px] font-medium leading-snug text-white/90">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'it-consulting',
  family: MANAGED_IT_SERVICES,
  parent: { label: 'Managed IT Services', href: '/managed-it-services' },
  crumb: 'IT Consulting & Strategy',
  tagline: 'Managed IT · Consulting & Strategy',
  title: ['IT Consulting', '& Strategy'],
  kicker: 'Clear IT strategy — in plain English.',
  hero: {
    img: heroImg,
    focus: '50% 50%',
    text: 'Roadmap planning, budget forecasting and independent advice, aligned to where your business is actually going — not to whatever a vendor is selling this quarter.',
    cta: 'Book a consultation',
  },
  glance: [
    { icon: Compass, k: 'Horizon', v: 'A 1 – 3 year roadmap' },
    { icon: Banknote, k: 'Budgets', v: 'Costed in advance' },
    { icon: Handshake, k: 'Advice', v: 'Vendor-neutral' },
  ],
  overview: {
    eyebrow: 'Why strategy',
    title: 'Technology decisions are business decisions wearing a technical disguise.',
    body: [
      'Whether to replace the server, move to the cloud, or extend the warranty one more year — those are questions about cash flow, risk and where the business is heading. They get answered badly when the only person in the room who understands the detail is also the person selling you the answer.',
      'We lay out what you have, what you need, what it costs and what we would do first — in language your leadership team can act on. Then we help you deliver it, or hand it over for someone else to deliver. Both are fine with us.',
    ],
    facts: [
      { k: 'Roadmap horizon', v: '1 – 3 years' },
      { k: 'Recommendations', v: 'Vendor-neutral' },
      { k: 'Reporting', v: 'Plain English, for the board' },
      { k: 'Obligation to buy from us', v: 'None' },
    ],
    badge: { value: 'Independent', label: 'We will tell you what you need — and just as often, what you don’t.' },
    img: imgOverview,
    alt: 'A consultant mapping out a plan on a whiteboard with a client',
    focus: '50% 45%',
    cta: 'Book a consultation',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Four things a good IT strategy gives you',
    text: 'Clarity on what to do, in what order, at what cost — and someone to keep it honest.',
    items: [
      {
        icon: Compass,
        title: 'Technology roadmap',
        desc: 'A prioritised plan for the next one to three years, so investment happens in the right order and nothing critical gets discovered the week it fails.',
      },
      {
        icon: Handshake,
        title: 'Independent advice',
        desc: 'Vendor-neutral recommendations based on what suits your business. If the right answer is to keep what you have, that is the answer you will get.',
      },
      {
        icon: Banknote,
        title: 'Budget forecasting',
        desc: 'Know what IT will cost before the financial year starts, with total cost of ownership spelled out — not just the sticker price on the quote.',
      },
      {
        icon: Target,
        title: 'Project oversight',
        desc: 'Help scoping the work, choosing suppliers and keeping delivery honest, so projects land on time instead of quietly drifting into next quarter.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What a consulting engagement covers',
    text: 'Scoped to your size — a single review, an annual planning cycle, or a standing seat at the table.',
    items: [
      'Technology & security reviews',
      'IT budget planning',
      'Vendor & procurement guidance',
      'Project scoping & oversight',
      'Plain-English reporting for leadership',
      'Annual roadmap refresh',
    ],
    chip: 'Every IT dollar working',
    img: imgChecklist,
    alt: 'A team reviewing printed charts and budgets around a table',
    focus: '55% 55%',
    cta: 'Get a second opinion',
  },
  relatedTitle: 'The rest of managed IT',
  cta: {
    title: 'Get a second opinion on your IT',
    sub: 'A conversation that costs nothing, with people who have no quota to hit.',
    primaryLabel: 'Book a consultation',
  },
}

export default function ITConsulting() {
  /* <Roadmap /> is built and ready but hidden for now — pass it as a child
     of ServiceDetail to bring the section back. */
  return <ServiceDetail page={PAGE} />
}
