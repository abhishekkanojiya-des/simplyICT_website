import { motion } from 'framer-motion'
import {
  Check, Clock, GraduationCap, Handshake, Minus, ScanSearch, Share2, UserCheck, Users,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { MANAGED_IT_SERVICES } from '../../data/content'
import heroImg from '../../assets/managed/co-managed.jpg'
import imgOverview from '../../assets/detail/co-managed-pair.jpg'
import imgChecklist from '../../assets/detail/co-managed-whiteboard.jpg'

/* Content mirrors simplyict.com.au/managed-it-services/co-managed-it/ */

/* ───────── Bespoke section: who does what ─────────
   The question every in-house IT manager asks first. A ledger
   with a gradient spine down the middle: your side, our side,
   and the rows we share. */
const SPLIT = [
  { task: 'Day-to-day user requests', own: 'you', note: 'You stay the first face your team sees.' },
  { task: 'Overflow & after-hours cover', own: 'us', note: 'We pick up the queue outside your hours.' },
  { task: 'Cybersecurity monitoring & patching', own: 'both', note: 'We watch and patch; you set the policy.' },
  { task: 'Cloud & Microsoft 365 administration', own: 'both', note: 'Shared admin, documented either way.' },
  { task: 'Escalation on complex incidents', own: 'us', note: 'Specialists on tap when it gets deep.' },
  { task: 'Strategy, budgets & final decisions', own: 'you', note: 'We advise. You decide. Always.' },
]

const OWNERS = [
  { key: 'you', label: 'Your team', icon: UserCheck },
  { key: 'us', label: 'Simply ICT', icon: Users },
]

function Marker({ active }) {
  return active ? (
    <span
      className="grid h-7 w-7 place-items-center rounded-full text-white shadow-[0_8px_18px_-8px_rgba(59,130,246,.9)]"
      style={{ background: 'var(--brand-gradient)' }}
    >
      <Check size={14} strokeWidth={3} />
    </span>
  ) : (
    <span className="grid h-7 w-7 place-items-center rounded-full border border-line bg-paper text-muted/40">
      <Minus size={13} strokeWidth={2.5} />
    </span>
  )
}

function SplitLedger() {
  return (
    <section id="who-does-what" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-48 top-20 h-[460px] w-[460px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.16), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="The split"
          title="Who does what — agreed in writing, week one"
          text="Co-managed only works when the boundaries are obvious. Here is the split we start from, then we tune it to your team in the first week."
          center
        />

        <Reveal y={36} className="mx-auto mt-12 max-w-[1000px]">
          <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_34px_72px_-44px_rgba(11,18,32,.45)]">
            {/* header */}
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line bg-paper px-6 py-4 sm:px-8 md:grid-cols-[1fr_120px_120px] md:gap-0">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Responsibility</p>
              <div className="flex gap-6 md:hidden">
                {OWNERS.map(({ key, label }) => (
                  <span key={key} className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
                    {label === 'Your team' ? 'You' : 'Us'}
                  </span>
                ))}
              </div>
              {OWNERS.map(({ key, label, icon: Icon }) => (
                <div key={key} className="hidden items-center justify-center gap-2 md:flex">
                  <Icon size={15} className="text-brand-blue" />
                  <span className="text-[13px] font-semibold text-ink">{label}</span>
                </div>
              ))}
            </div>

            {/* rows */}
            <ul>
              {SPLIT.map(({ task, own, note }, i) => (
                <motion.li
                  key={task}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                  className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line px-6 py-5 transition-colors duration-300 last:border-b-0 hover:bg-paper/70 sm:px-8 md:grid-cols-[1fr_120px_120px] md:gap-0"
                >
                  <div className="md:pr-8">
                    <p className="text-[16px] font-semibold tracking-[-0.01em] text-ink">{task}</p>
                    <p className="mt-1 text-[13.5px] leading-snug text-muted">{note}</p>
                  </div>
                  <div className="flex items-center gap-[46px] md:hidden">
                    <Marker active={own === 'you' || own === 'both'} />
                    <Marker active={own === 'us' || own === 'both'} />
                  </div>
                  <div className="hidden justify-center md:flex">
                    <Marker active={own === 'you' || own === 'both'} />
                  </div>
                  <div className="hidden justify-center md:flex">
                    <Marker active={own === 'us' || own === 'both'} />
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <p className="mt-5 flex items-start gap-2.5 text-[14px] leading-relaxed text-muted">
            <Share2 size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            Two ticks means we share the work — the detail goes into a one-page responsibility matrix your team and ours
            both sign off on, so nothing falls between the cracks.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'co-managed-it',
  family: MANAGED_IT_SERVICES,
  parent: { label: 'Managed IT Services', href: '/managed-it-services' },
  crumb: 'Co-Managed IT',
  tagline: 'Managed IT · Co-Managed IT',
  title: ['Co-Managed', 'IT'],
  kicker: 'Your IT team, amplified.',
  hero: {
    img: heroImg,
    focus: '50% 35%',
    text: 'Already have internal IT or a provider you like? Keep them — and keep control. We add the hours, the specialist skills and the second opinion your team is missing.',
    cta: 'Talk to us',
  },
  glance: [
    { icon: Handshake, k: 'Model', v: 'You stay in control' },
    { icon: Clock, k: 'Cover', v: 'After-hours & overflow' },
    { icon: GraduationCap, k: 'Skills', v: 'Security · cloud · network' },
  ],
  overview: {
    eyebrow: 'Why co-managed',
    title: 'One or two people cannot cover everything. That is not a failing — it is maths.',
    body: [
      'Internal IT teams get stretched thin. Tickets pile up while a project runs, nobody is on call at 7pm, and the one person who understands the firewall is on leave. Co-managed IT fills those gaps without you hiring, retraining or handing over the keys.',
      'We work as your team’s extra team. Your people keep owning the relationships and the decisions; we bring capacity when the queue spikes, specialists when the problem goes deep, and an independent view when a big call has to be made.',
    ],
    facts: [
      { k: 'Who owns the user relationship', v: 'Your team' },
      { k: 'Who covers nights, weekends & leave', v: 'Us' },
      { k: 'Who sets policy and signs off spend', v: 'Your team' },
      { k: 'Who you escalate to at 2am', v: 'Us' },
    ],
    badge: { value: 'No new headcount', label: 'Specialist cover without a recruitment round or a permanent salary.' },
    img: imgOverview,
    alt: 'Two support engineers working side by side in an office, both on headsets',
    focus: '50% 45%',
    cta: 'Talk to us',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Four ways we back up your team',
    text: 'Pick the gaps that hurt most. Co-managed IT is shaped around what your team already does well.',
    items: [
      {
        icon: Handshake,
        title: 'Flexible partnership',
        desc: 'We work alongside your in-house team or your existing provider, filling the gaps you point at — while you stay firmly in control of your own IT.',
      },
      {
        icon: GraduationCap,
        title: 'Specialist skills on tap',
        desc: 'Cybersecurity, cloud, networking and web expertise when you need it, without recruiting for it or carrying the cost of a full-time specialist.',
      },
      {
        icon: Clock,
        title: 'After-hours & overflow cover',
        desc: 'Extended hours and surge capacity for projects, launches, migrations and the busy periods that would otherwise bury your team.',
      },
      {
        icon: ScanSearch,
        title: 'Second pair of eyes',
        desc: 'An independent review of your setup and an escalation path for complex incidents and the decisions that are too big to make alone.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What a co-managed engagement includes',
    text: 'Agreed up front, documented as we go, and reviewed with you every month.',
    items: [
      'Helpdesk overflow & escalation',
      'Project delivery support',
      'Security & compliance reviews',
      'Cloud & Microsoft 365 administration',
      'Documentation & knowledge transfer',
      'Monthly review with your IT lead',
    ],
    chip: 'Your team + our specialists',
    img: imgChecklist,
    alt: 'A manager and an engineer planning at a whiteboard',
    focus: '50% 45%',
    cta: 'Map the gaps with us',
  },
  relatedTitle: 'The rest of managed IT',
  cta: {
    title: 'Extend your team without the headcount',
    sub: 'A free, no-obligation chat about where co-managed IT would actually help.',
    primaryLabel: 'Talk to us',
  },
}

export default function CoManagedIT() {
  /* <SplitLedger /> is built and ready but hidden for now — pass it as a child
     of ServiceDetail to bring the section back. */
  return <ServiceDetail page={PAGE} />
}
