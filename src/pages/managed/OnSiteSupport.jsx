import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  CalendarCheck, Clock, MapPin, PhoneCall, Siren, Truck, Zap,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Counter, Reveal, EASE } from '../../components/ui'
import { CONTACT, MANAGED_IT_SERVICES } from '../../data/content'
import heroImg from '../../assets/services/infrastructure.jpg'
import imgOverview from '../../assets/detail/onsite-repair.jpg'
import imgChecklist from '../../assets/detail/onsite-cabling.jpg'

/* Content mirrors simplyict.com.au/managed-it-services/on-site-support/ */

/* ───────── Bespoke section: the response board ─────────
   The service levels are the product here, so give them a board of
   their own. Each dial shows the response window measured against
   our 48-hour standard — a shorter arc is a faster visit. */
const TIERS = [
  {
    key: 'urgent',
    icon: Siren,
    name: 'Urgent',
    hours: 4,
    window: 'within 4 hours',
    desc: 'Something has stopped the business — the server is down, the internet is out, nobody can take a call.',
    examples: ['Server or network outage', 'Site-wide connectivity loss', 'Phone system down'],
  },
  {
    key: 'priority',
    icon: Zap,
    name: 'Priority',
    hours: 24,
    window: 'within 24 hours',
    desc: 'High impact, but you can still work around it. We keep moving on it until it is resolved.',
    examples: ['A key application failing', 'One team or site affected', 'Repeat faults on a machine'],
  },
  {
    key: 'standard',
    icon: Clock,
    name: 'Standard',
    hours: 48,
    window: 'within 48 hours',
    desc: 'General requests and the small jobs that are easier to do in person than to talk someone through.',
    examples: ['New user or device setup', 'Printer & peripheral issues', 'Hands-on how-to help'],
  },
  {
    key: 'scheduled',
    icon: CalendarCheck,
    name: 'Scheduled',
    window: 'booked in advance',
    desc: 'Regular visits that keep things healthy — maintenance, check-ins, upgrades and project days.',
    examples: ['Site maintenance visits', 'Moves, upgrades & rollouts', 'Face-to-face check-ins'],
  },
]

const MAX_HOURS = 48
const R = 42
const C = 2 * Math.PI * R

function Dial({ hours }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const share = hours ? hours / MAX_HOURS : 0

  return (
    <div ref={ref} className="relative h-[116px] w-[116px] shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id={`dial-${hours || 'sched'}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={R} fill="none" stroke="#e3e8f0" strokeWidth="7" />
        {hours ? (
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={`url(#dial-${hours})`}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView || reduce ? { strokeDashoffset: C * (1 - share) } : { strokeDashoffset: C }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.15 }}
          />
        ) : (
          <circle cx="50" cy="50" r={R} fill="none" stroke="#e3e8f0" strokeWidth="7" strokeDasharray="4 9" strokeLinecap="round" />
        )}
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        {hours ? (
          <p className="text-center">
            <Counter
              value={hours}
              className="block font-display text-[30px] font-semibold leading-none tracking-[-0.04em] text-ink"
            />
            <span className="mt-1 block text-[11.5px] uppercase tracking-[0.1em] text-muted">hours</span>
          </p>
        ) : (
          <CalendarCheck size={28} className="text-brand-blue" />
        )}
      </div>
    </div>
  )
}

function ResponseBoard() {
  return (
    <section id="response-times" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-48 top-16 h-[480px] w-[480px] rounded-full opacity-50 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.16), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="Service levels"
          title="Response times, in plain numbers"
          text="Four tiers, published up front. You will always know which one your issue sits in before you put the phone down."
          center
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {TIERS.map(({ key, icon: Icon, name, hours, window, desc, examples }, i) => (
            <Reveal key={key} delay={0.08 * i} className="h-full">
              <div className="group flex h-full flex-col gap-6 rounded-[26px] border border-line bg-paper p-7 transition-[transform,background-color,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-brand-blue/30 hover:bg-white hover:shadow-[0_30px_64px_-36px_rgba(11,18,32,.5)] sm:flex-row sm:p-8">
                <Dial hours={hours} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-blue/[0.08] text-brand-blue transition-colors duration-500 group-hover:bg-brand-blue group-hover:text-white">
                      <Icon size={16} />
                    </span>
                    <h3 className="text-[20px] font-semibold tracking-[-0.025em] text-ink">{name}</h3>
                  </div>
                  <p className="mt-2 text-[14px] font-semibold text-brand-deep">On site {window}</p>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{desc}</p>
                  <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                    {examples.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-[14px] text-ink/80">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: 'var(--brand-gradient)' }}
                        />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-line bg-paper px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2.5 text-[14px] leading-relaxed text-muted">
              <Clock size={16} className="mt-0.5 shrink-0 text-brand-blue" />
              Each dial shows the response window against our 48-hour standard — the shorter the arc, the sooner an
              engineer is at your door.
            </p>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#16213a]"
            >
              <PhoneCall size={15} /> Urgent? Call {CONTACT.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'on-site-support',
  family: MANAGED_IT_SERVICES,
  parent: { label: 'Managed IT Services', href: '/managed-it-services' },
  crumb: 'On-site Support',
  tagline: 'Managed IT · On-site Support',
  title: ['On-site', 'Support'],
  kicker: 'When you need us on-site, we’re there.',
  hero: {
    img: heroImg,
    focus: '85% 55%',
    text: 'Field engineers who come to you, with response times published up front — from urgent break-fix inside four hours through to scheduled maintenance visits.',
    cta: 'Request on-site support',
  },
  glance: [
    { icon: Siren, k: 'Urgent', v: 'On site within 4 hours' },
    { icon: MapPin, k: 'Based in', v: 'North Lakes, QLD' },
    { icon: Truck, k: 'Coverage', v: 'Local & regional visits' },
  ],
  overview: {
    eyebrow: 'Why on-site',
    title: 'Some problems do not get fixed over the phone.',
    body: [
      'Remote support solves most things, and it solves them faster. But a failed switch, a dead workstation, a new office to cable or a staff member who would simply rather be shown — those need someone in the room.',
      'So we keep real engineers on the road. They arrive knowing your setup, because it is documented before anything breaks, and they fix the cause rather than the symptom. You get the same small team, not whoever was closest.',
    ],
    facts: [
      { k: 'Urgent — business stopped', v: 'Within 4 hours' },
      { k: 'Priority — high impact', v: 'Within 24 hours' },
      { k: 'Standard — general requests', v: 'Within 48 hours' },
      { k: 'Scheduled maintenance', v: 'Booked in advance' },
    ],
    badge: { value: '4 hours', label: 'Our urgent response window when something has stopped the business.' },
    img: imgOverview,
    alt: 'A technician working inside a desktop PC on site',
    focus: '58% 50%',
    cta: 'Request on-site support',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Four levels of on-site cover',
    text: 'You tell us the impact, we tell you the window — and then we meet it.',
    items: [
      {
        icon: Siren,
        title: 'Urgent — within 4 hours',
        desc: 'For the critical issues that have stopped your business. We mobilise an engineer straight away and stay until you are working again.',
      },
      {
        icon: Zap,
        title: 'Priority — within 24 hours',
        desc: 'For high-impact problems where there is still a workaround. We keep the job moving rather than parking it until someone chases.',
      },
      {
        icon: Clock,
        title: 'Standard — within 48 hours',
        desc: 'For general requests and the hands-on jobs — new equipment, a stubborn printer, a walk-through for a staff member who would rather be shown.',
      },
      {
        icon: CalendarCheck,
        title: 'Scheduled visits',
        desc: 'Regular on-site visits for maintenance, project work and face-to-face check-ins — so small things get caught before they become urgent ones.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What an engineer can do on site',
    text: 'Break-fix, build and everything in between — logged and documented in the same system as your remote support.',
    items: [
      'On-site troubleshooting & repairs',
      'New user & equipment setup',
      'Site maintenance visits',
      'Emergency call-outs',
      'Moves, upgrades & project days',
      'Cabling, switching & Wi-Fi checks',
    ],
    chip: 'Urgent — within 4 hours',
    img: imgChecklist,
    alt: 'A technician patching network cables into a switch in a comms rack',
    focus: '60% 50%',
    cta: 'Book a visit',
  },
  relatedTitle: 'The rest of managed IT',
  cta: {
    title: 'Need an engineer on site?',
    sub: 'Call us for urgent support, or send a message and we will confirm the fastest visit we can make.',
    primaryLabel: 'Request on-site support',
  },
}

export default function OnSiteSupport() {
  return (
    <ServiceDetail page={PAGE}>
      <ResponseBoard />
    </ServiceDetail>
  )
}
