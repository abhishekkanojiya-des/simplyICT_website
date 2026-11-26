import { motion } from 'framer-motion'
import {
  Activity, Boxes, Building, Cloud, Layers, RefreshCw, Server, Waypoints,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { HARDWARE_SERVICES } from '../../data/content'
import heroImg from '../../assets/hardware/servers.jpg'
import imgOverview from '../../assets/detail/servers-rack.jpg'
import imgChecklist from '../../assets/detail/servers-drives.jpg'

/* Content mirrors simplyict.com.au/hardware/servers-storage/ */

/* ───────── Added section: where the workload runs ─────────
   The live page offers on-premise, hybrid or "a mix of both", so lay
   the three side by side as a comparison matrix — a different shape
   to the card grids used elsewhere on the page. */
const OPTIONS = [
  { key: 'onprem', icon: Building, name: 'On-premise', note: 'Your own server, in your own building.' },
  { key: 'hybrid', icon: Waypoints, name: 'Hybrid', note: 'Some here, some in the cloud.', featured: true },
  { key: 'cloud', icon: Cloud, name: 'Cloud', note: 'No server hardware on site at all.' },
]

const CRITERIA = [
  { k: 'Suits you when', v: { onprem: 'Large files, local apps, patchy internet', hybrid: 'Most businesses, most of the time', cloud: 'Remote teams, light infrastructure' } },
  { k: 'Up-front cost', v: { onprem: 'Higher — you buy the hardware', hybrid: 'Moderate — staged over time', cloud: 'Lower — little to buy' } },
  { k: 'Ongoing cost', v: { onprem: 'Predictable', hybrid: 'Mixed, and reviewable', cloud: 'Monthly, grows with use' } },
  { k: 'Depends on your internet', v: { onprem: 'Barely', hybrid: 'Partly', cloud: 'Completely' } },
  { k: 'Scaling up means', v: { onprem: 'Buying capacity ahead of time', hybrid: 'Adding in whichever place is cheaper', cloud: 'Changing a plan' } },
]

function WhereItRuns() {
  return (
    <section id="where-it-runs" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-52 top-20 h-[500px] w-[500px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.15), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="Where it runs"
          title="On-premise, cloud, or honestly a bit of both"
          text="There is no single right answer — only the one that fits your files, your internet and your budget. Here is how the three actually compare."
          center
        />

        <Reveal y={36} className="mx-auto mt-12 max-w-[1060px]">
          <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_34px_72px_-44px_rgba(11,18,32,.45)]">
            {/* column heads */}
            <div className="grid grid-cols-3 gap-px bg-line md:grid-cols-[1.1fr_1fr_1fr_1fr]">
              <div className="hidden bg-paper px-6 py-5 md:block">
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">Compare</p>
              </div>
              {OPTIONS.map(({ key, icon: Icon, name, note, featured }) => (
                <div
                  key={key}
                  className={`relative px-4 py-5 text-center sm:px-5 ${featured ? 'bg-white' : 'bg-paper'}`}
                >
                  {featured && (
                    <span
                      className="absolute inset-x-0 top-0 h-[3px]"
                      aria-hidden="true"
                      style={{ background: 'var(--brand-gradient)' }}
                    />
                  )}
                  <span
                    className={`mx-auto grid h-11 w-11 place-items-center rounded-xl ${
                      featured ? 'text-white' : 'bg-white text-brand-blue'
                    }`}
                    style={featured ? { background: 'var(--brand-gradient)' } : undefined}
                  >
                    <Icon size={19} />
                  </span>
                  <p className="mt-3 text-[16px] font-semibold tracking-[-0.02em] text-ink">{name}</p>
                  <p className="mt-1 hidden text-[12.5px] leading-snug text-muted sm:block">{note}</p>
                  {featured && (
                    <p className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white" style={{ background: 'var(--brand-gradient)' }}>
                      Most common
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* criteria rows */}
            <dl>
              {CRITERIA.map(({ k, v }, i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.06 }}
                  className="border-t border-line"
                >
                  <dt className="bg-paper/60 px-6 py-3 text-[13.5px] font-semibold text-ink md:hidden">{k}</dt>
                  <div className="grid grid-cols-3 gap-px bg-line md:grid-cols-[1.1fr_1fr_1fr_1fr]">
                    <dt className="hidden items-center bg-white px-6 py-4 text-[14.5px] text-muted md:flex">{k}</dt>
                    {OPTIONS.map(({ key, featured }) => (
                      <dd
                        key={key}
                        className={`px-4 py-4 text-center text-[13.5px] leading-snug sm:px-5 ${
                          featured ? 'bg-white font-medium text-ink' : 'bg-white text-muted'
                        }`}
                      >
                        {v[key]}
                      </dd>
                    ))}
                  </div>
                </motion.div>
              ))}
            </dl>
          </div>

          <p className="mt-5 flex items-start gap-2.5 text-[14px] leading-relaxed text-muted">
            <Layers size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            Most of the businesses we look after end up hybrid — the big working files stay on site where they are fast,
            and email, backups and anything remote-friendly moves up. We will tell you which of yours falls where.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'servers-storage',
  family: HARDWARE_SERVICES,
  parent: { label: 'Hardware & Infrastructure', href: '/hardware' },
  crumb: 'Servers & Storage',
  tagline: 'Infrastructure · Servers & Storage',
  title: ['Servers &', 'Storage'],
  kicker: 'Your data — safe, fast and always available.',
  hero: {
    img: heroImg,
    focus: '50% 50%',
    text: 'Servers, storage and backup infrastructure designed around the work you actually do — on-premise, hybrid cloud, or the mix that genuinely suits your business.',
    cta: 'Request a review',
  },
  glance: [
    { icon: Server, k: 'Deploy', v: 'On-prem · hybrid · cloud' },
    { icon: Boxes, k: 'Storage', v: 'Scales as data grows' },
    { icon: Activity, k: 'Support', v: 'Monitored & maintained' },
  ],
  overview: {
    eyebrow: 'Why it matters',
    title: 'Right-sizing a server is the difference between paying twice and running out of room.',
    body: [
      'Specify too small and you are back inside two years, mid-quarter, with everyone complaining the system is slow. Specify too large and you have paid for capacity that sat idle until the hardware aged out. Neither is a technical failure — both are a sizing conversation nobody had at the start.',
      'So we start with the workloads: what runs, how hard, how much data it produces and how fast that is growing. Then we build for that, with sensible headroom, and plan the lifecycle from day one so the replacement is a budgeted decision rather than an emergency.',
    ],
    facts: [
      { k: 'Deployment', v: 'On-premise, hybrid or cloud' },
      { k: 'Virtualisation', v: 'Where it genuinely helps' },
      { k: 'Backups', v: 'Restores you can trust' },
      { k: 'Lifecycle', v: 'Planned, not reactive' },
    ],
    badge: {
      value: 'Right-sized',
      label: 'Specced for the work you do, with headroom for the growth you expect.',
    },
    img: imgOverview,
    alt: 'Rack-mounted servers with status lights in a cool server room',
    focus: '50% 50%',
    cta: 'Request a review',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Built for reliability, sized for reality',
    text: 'Four parts that decide whether your server environment is an asset or a recurring problem.',
    items: [
      {
        icon: Server,
        title: 'Server builds & virtualisation',
        desc: 'Physical or virtualised servers built to the right size for your workloads — reliable, with the headroom to absorb a busy quarter rather than buckle under it.',
      },
      {
        icon: Boxes,
        title: 'Storage that scales',
        desc: 'Shared and cloud storage designed around how your data actually grows, so adding capacity is a planned step and not a weekend of emergency work.',
      },
      {
        icon: RefreshCw,
        title: 'Backups & redundancy',
        desc: 'A resilient backup architecture with restores we have tested — because the only backup worth having is one you have already seen come back.',
      },
      {
        icon: Activity,
        title: 'Monitoring & maintenance',
        desc: 'Proactive health checks, patching and lifecycle management, so failing drives and filling disks get caught while they are still just a notification.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What servers & storage covers',
    text: 'From the first specification through to the day it gets replaced.',
    items: [
      'Server specification & supply',
      'Virtualisation & consolidation',
      'Shared & cloud storage',
      'Backup & recovery systems',
      'Hardware lifecycle planning',
      'Proactive health checks & patching',
    ],
    chip: 'Backups & redundancy',
    img: imgChecklist,
    alt: 'Enterprise hard drives ready to go into a storage array',
    focus: '50% 50%',
    cta: 'Review what you have',
  },
  relatedTitle: 'The rest of your infrastructure',
  cta: {
    title: 'Server due for retirement?',
    sub: 'We will review what you have and give you a straight answer on what to replace, migrate or leave alone.',
    primaryLabel: 'Request a review',
  },
}

export default function ServersStorage() {
  return (
    <ServiceDetail page={PAGE}>
      <WhereItRuns />
    </ServiceDetail>
  )
}
