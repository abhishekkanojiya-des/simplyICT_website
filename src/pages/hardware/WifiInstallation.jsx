import { motion, useReducedMotion } from 'framer-motion'
import { Building, Eye, Radar, ScanSearch, SlidersHorizontal, Users, Wifi } from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { HARDWARE_SERVICES } from '../../data/content'
import heroImg from '../../assets/hardware/wifi.jpg'
import imgOverview from '../../assets/detail/wifi-router.jpg'
import imgChecklist from '../../assets/detail/wifi-access-point.jpg'

/* Content mirrors simplyict.com.au/hardware/wifi-installation/ */

/* ───────── Added section: what the site survey finds ─────────
   The live page leads with "site survey" and "coverage mapped before
   installation", so draw the thing being described: a floor plan with
   overlapping coverage, then what the walk-through actually turns up. */
const ACCESS_POINTS = [
  { cx: 150, cy: 112, r: 118, delay: 0 },
  { cx: 352, cy: 246, r: 128, delay: 0.18 },
  { cx: 566, cy: 158, r: 116, delay: 0.36 },
]

const FINDINGS = [
  {
    icon: Building,
    title: 'What the walls are made of',
    desc: 'Brick, concrete, foil insulation and plasterboard do wildly different things to a signal. The floor plan does not tell you which you have — walking it does.',
  },
  {
    icon: Radar,
    title: 'Who else is on your channel',
    desc: 'In a shared building, your neighbours’ Wi-Fi is competing for the same airtime as yours. We measure what is already in the air before choosing channels.',
  },
  {
    icon: Users,
    title: 'How many devices per room',
    desc: 'A full meeting room is thirty devices, not six people. Capacity decides how many access points a space needs, not floor area alone.',
  },
  {
    icon: ScanSearch,
    title: 'Where the signal actually dies',
    desc: 'The dead spots are rarely where people assume. We map real signal strength across the floor, so the fix lands where the problem is.',
  },
]

function FloorPlan() {
  const reduce = useReducedMotion()
  return (
    <div
      className="relative overflow-hidden rounded-[28px] border border-line bg-paper p-4 sm:p-6"
      role="img"
      aria-label="Floor plan of an office showing three access points with overlapping Wi-Fi coverage across reception, a meeting room, an open-plan area and a warehouse."
    >
      <svg viewBox="0 0 680 380" className="w-full" aria-hidden="true">
        <defs>
          <radialGradient id="wifi-coverage" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wifi-ap" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <clipPath id="wifi-floor">
            <rect x="20" y="20" width="640" height="340" rx="12" />
          </clipPath>
        </defs>

        {/* floor */}
        <rect x="20" y="20" width="640" height="340" rx="12" fill="#fff" stroke="#e3e8f0" strokeWidth="3" />

        {/* coverage, clipped to the building */}
        <g clipPath="url(#wifi-floor)">
          {ACCESS_POINTS.map(({ cx, cy, r, delay }) => (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="url(#wifi-coverage)"
              initial={reduce ? false : { scale: 0.55, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, ease: EASE, delay }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          ))}
        </g>

        {/* internal walls */}
        <g stroke="#e3e8f0" strokeWidth="3" strokeLinecap="round">
          <line x1="252" y1="20" x2="252" y2="196" />
          <line x1="20" y1="196" x2="252" y2="196" />
          <line x1="470" y1="20" x2="470" y2="360" />
        </g>
        {/* the thick wall the survey cares about */}
        <line x1="470" y1="20" x2="470" y2="360" stroke="#5b6678" strokeWidth="7" strokeLinecap="round" opacity="0.35" />

        {/* room labels */}
        <g fill="#5b6678" fontSize="13" fontWeight="600" fontFamily="inherit">
          <text x="44" y="48">Reception</text>
          <text x="44" y="226">Meeting</text>
          <text x="278" y="48">Open plan</text>
          <text x="496" y="48">Warehouse</text>
        </g>

        {/* access points */}
        {ACCESS_POINTS.map(({ cx, cy, delay }, i) => (
          <motion.g
            key={`ap-${i}`}
            initial={reduce ? false : { opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 + delay }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <circle cx={cx} cy={cy} r="15" fill="#fff" />
            <circle cx={cx} cy={cy} r="11" fill="url(#wifi-ap)" />
            <circle cx={cx} cy={cy} r="4" fill="#fff" />
          </motion.g>
        ))}

        {/* callout on the thick wall */}
        <g>
          <line x1="470" y1="300" x2="540" y2="330" stroke="#5b6678" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
          <rect x="430" y="330" width="214" height="26" rx="13" fill="#0b1220" />
          <text x="444" y="347" fill="#fff" fontSize="12" fontWeight="600" fontFamily="inherit">
            Thick wall — needs its own access point
          </text>
        </g>
      </svg>

      {/* legend */}
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 px-2 pb-1">
        <span className="inline-flex items-center gap-2 text-[12.5px] text-muted">
          <span className="h-3 w-3 rounded-full" style={{ background: 'var(--brand-gradient)' }} />
          Access point
        </span>
        <span className="inline-flex items-center gap-2 text-[12.5px] text-muted">
          <span className="h-3 w-3 rounded-full bg-brand-blue/20" />
          Usable coverage
        </span>
        <span className="inline-flex items-center gap-2 text-[12.5px] text-muted">
          <span className="h-[5px] w-4 rounded-full bg-muted/40" />
          Wall the signal struggles with
        </span>
      </div>
    </div>
  )
}

function SurveyFirst() {
  return (
    <section id="site-survey" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -left-52 top-24 h-[500px] w-[500px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.16), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="Survey first"
          title="Coverage gets mapped before anything gets ordered"
          text="This is the step that decides whether your Wi-Fi works. Three access points in the right places beat five in the wrong ones — and cost less."
          center
        />

        <Reveal y={36} className="mx-auto mt-12 max-w-[1060px]">
          <FloorPlan />
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-[1120px] gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {FINDINGS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={0.07 * i}>
              <div className="group">
                <span
                  aria-hidden="true"
                  className="block h-[2px] w-10 origin-left rounded-full transition-transform duration-500 group-hover:scale-x-[2.4]"
                  style={{ background: 'var(--brand-gradient)' }}
                />
                <span className="mt-5 inline-flex items-center gap-2.5">
                  <Icon size={17} className="text-brand-blue" />
                  <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-ink">{title}</h3>
                </span>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'wifi-installation',
  family: HARDWARE_SERVICES,
  parent: { label: 'Hardware & Infrastructure', href: '/hardware' },
  crumb: 'WiFi Installation',
  tagline: 'Infrastructure · WiFi Installation',
  title: ['WiFi', 'Installation'],
  kicker: 'Business Wi-Fi without the dead zones.',
  hero: {
    img: heroImg,
    focus: '60% 45%',
    text: 'Site surveys, enterprise-grade access points and real performance tuning — so every meeting room, office and awkward back corner has signal you can actually work on.',
    cta: 'Request a site survey',
  },
  glance: [
    { icon: ScanSearch, k: 'First step', v: 'Site survey & coverage map' },
    { icon: Wifi, k: 'Hardware', v: 'Enterprise-grade access points' },
    { icon: SlidersHorizontal, k: 'Tuning', v: 'Placement, channels & roaming' },
  ],
  overview: {
    eyebrow: 'Why it matters',
    title: 'Wi-Fi problems are almost never solved by buying a better router.',
    body: [
      'The usual story is one access point doing the work of four, fighting for the same channel as the business next door, with a brick wall between it and the people complaining. Adding a more expensive box in the same spot changes very little — the coverage was the problem, not the hardware.',
      'So we survey the space before we quote anything: where the walls are, where people actually sit, how many devices are in the room at once. Then we place the right number of access points, tune the channels and roaming so a laptop hands over cleanly between them, and test it walking the floor rather than from the comms cupboard.',
    ],
    facts: [
      { k: 'Before installation', v: 'Site survey & coverage map' },
      { k: 'Access points', v: 'Enterprise-grade' },
      { k: 'Tuned for', v: 'Real-world use' },
      { k: 'After installation', v: 'Monitored & supported' },
    ],
    badge: {
      value: 'Survey first',
      label: 'We map the coverage before quoting hardware, so you buy what the space needs.',
    },
    img: imgOverview,
    alt: 'A Wi-Fi 6 access point on a desk, cabled back to the network',
    focus: '55% 55%',
    cta: 'Request a site survey',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Surveyed, installed, tuned, supported',
    text: 'In that order — because installing before surveying is how dead zones get built in.',
    items: [
      {
        icon: ScanSearch,
        title: 'Site survey',
        desc: 'Coverage mapped across your actual floor plan before anything is ordered, so the quote reflects the building you have rather than a guess at it.',
      },
      {
        icon: Wifi,
        title: 'Access points & controllers',
        desc: 'Enterprise-grade access points, scaled to the size of the space and the number of people in it, managed centrally instead of configured one at a time.',
      },
      {
        icon: SlidersHorizontal,
        title: 'Performance tuning',
        desc: 'Placement, channels and roaming tuned for real-world speed — so walking from your desk to the meeting room does not drop the call.',
      },
      {
        icon: Eye,
        title: 'Support & maintenance',
        desc: 'Ongoing monitoring and fast fixes, because a wireless network drifts as the space, the device count and the neighbours around you change.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What a Wi-Fi installation covers',
    text: 'From the first walk-through to the monitoring that keeps it honest.',
    items: [
      'Site survey & coverage mapping',
      'Access point supply & installation',
      'Network integration & security',
      'Performance tuning & testing',
      'Ongoing monitoring & support',
      'Separate guest network setup',
    ],
    chip: 'No more dead zones',
    img: imgChecklist,
    alt: 'A multi-antenna wireless access point',
    focus: '50% 50%',
    cta: 'Book a site survey',
  },
  relatedTitle: 'The rest of your infrastructure',
  cta: {
    title: 'Wi-Fi driving you up the wall?',
    sub: 'Start with a site survey — a free quote, and no surprises once the work begins.',
    primaryLabel: 'Request a site survey',
  },
}

export default function WifiInstallation() {
  /* <SurveyFirst /> is no longer shown — pass it as a child of ServiceDetail
     to put the section back. */
  return <ServiceDetail page={PAGE} />
}
