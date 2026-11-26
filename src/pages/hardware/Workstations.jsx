import { motion } from 'framer-motion'
import {
  Briefcase, Headset, Layers, LifeBuoy, Monitor, Palette, Plug, RefreshCw, Truck,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { HARDWARE_SERVICES } from '../../data/content'
import heroImg from '../../assets/hardware/workstations.jpg'
import imgOverview from '../../assets/detail/workstations-office.jpg'
import imgChecklist from '../../assets/detail/workstations-setup.jpg'

/* Content mirrors simplyict.com.au/hardware/workstations/ */

/* ───────── Added section: the device, matched to the role ─────────
   "The right device for every job" is the live page's own kicker, and it
   promises hardware "matched to role and workload" — so show the roles.
   Laid out as a spec sheet of rows rather than another card grid. */
const ROLES = [
  {
    icon: Briefcase,
    role: 'Office & admin',
    device: 'Desktop or docked laptop',
    priorities: ['Dual monitors', 'Comfortable keyboard & mouse', 'Quiet and tidy'],
    note: 'Eight hours a day at one desk — screen space matters more than raw power.',
  },
  {
    icon: Truck,
    role: 'Field & mobile',
    device: 'Lightweight business laptop',
    priorities: ['Battery that lasts the day', 'Light enough to carry', 'Built to survive a ute'],
    note: 'It will be opened in a car, a site office and a cafe, all before lunch.',
  },
  {
    icon: Palette,
    role: 'Design & technical',
    device: 'High-spec workstation',
    priorities: ['Serious CPU & memory', 'Discrete graphics', 'Fast local storage'],
    note: 'The one role where underspeccing costs more in lost hours than the machine did.',
  },
  {
    icon: Headset,
    role: 'Reception & shared',
    device: 'Compact desktop',
    priorities: ['Always on, always ready', 'Simple, locked-down build', 'Easy to swap out'],
    note: 'Used by several people and visible to every visitor — reliability over specs.',
  },
]

function DeviceByRole() {
  return (
    <section id="by-role" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-52 top-20 h-[500px] w-[500px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.15), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="Matched to the job"
          title="A laptop for the field is not the machine for the designer"
          text="Buying one model for everyone is simple to order and expensive to live with. These are the four briefs most workplaces actually need."
          center
        />

        <Reveal y={36} className="mx-auto mt-12 max-w-[1060px]">
          <ul className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_34px_72px_-44px_rgba(11,18,32,.45)]">
            {ROLES.map(({ icon: Icon, role, device, priorities, note }, i) => (
              <motion.li
                key={role}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                className="group grid gap-5 border-b border-line px-6 py-6 transition-colors duration-300 last:border-b-0 hover:bg-paper/60 sm:px-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-8"
              >
                {/* role + device */}
                <div className="flex items-start gap-4">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-[0_14px_28px_-14px_rgba(59,130,246,.9)] transition-transform duration-500 group-hover:scale-110"
                    style={{ background: 'var(--brand-gradient)' }}
                  >
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[18px] font-semibold tracking-[-0.025em] text-ink">{role}</p>
                    <p className="mt-0.5 text-[13.5px] font-medium">
                      <span className="gradient-text">{device}</span>
                    </p>
                    <p className="mt-2 text-[13.5px] leading-snug text-muted">{note}</p>
                  </div>
                </div>

                {/* priorities */}
                <div className="md:border-l md:border-line md:pl-8">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                    What we prioritise
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {priorities.map((p) => (
                      <li
                        key={p}
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-[13px] font-medium text-ink transition-colors duration-300 group-hover:border-brand-blue/25 group-hover:bg-white"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: 'var(--brand-gradient)' }}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ul>

          <p className="mt-5 flex items-start gap-2.5 text-[14px] leading-relaxed text-muted">
            <Layers size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            However many briefs you need, every machine is built from the same standard image — so a swap is a swap,
            not a rebuild, and support does not depend on who bought what.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'workstations',
  family: HARDWARE_SERVICES,
  parent: { label: 'Hardware & Infrastructure', href: '/hardware' },
  crumb: 'Workstations',
  tagline: 'Infrastructure · Workstations',
  title: ['Work', 'stations'],
  kicker: 'The right device for every job.',
  hero: {
    img: heroImg,
    focus: '50% 55%',
    text: 'Business-grade PCs, laptops and devices matched to the role, standardised so they are simple to support, and delivered configured and ready to work.',
    cta: 'Get device advice',
  },
  glance: [
    { icon: Monitor, k: 'Hardware', v: 'Business-grade, role-matched' },
    { icon: Layers, k: 'Builds', v: 'One standard image' },
    { icon: RefreshCw, k: 'Lifecycle', v: 'Refresh planned ahead' },
  ],
  overview: {
    eyebrow: 'Why it matters',
    title: 'The cheapest laptop in the catalogue is rarely the cheapest laptop.',
    body: [
      'Consumer hardware is built to a price for someone who uses it a few hours a week. Put it on a desk for eight hours a day and you get the difference back in failed drives, dead hinges, warranty arguments and the hours your team loses waiting for a replacement.',
      'We supply business-grade machines matched to what each role actually needs — because a laptop for the field is not the machine for the designer — and we build them all from the same standard image. That means a failed device is a swap rather than a rebuild, and a new starter sits down to something that already works.',
    ],
    facts: [
      { k: 'Hardware grade', v: 'Business, not consumer' },
      { k: 'Builds', v: 'Standardised & imaged' },
      { k: 'Devices arrive', v: 'Configured & tested' },
      { k: 'Refresh', v: 'Planned per role' },
    ],
    badge: {
      value: 'Day one',
      label: 'New starters sit down to a machine that is already set up and signed in.',
    },
    img: imgOverview,
    alt: 'A row of standard office workstations with monitors and keyboards',
    focus: '50% 50%',
    cta: 'Get device advice',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Specced, built, delivered, supported',
    text: 'The whole life of a device, rather than just the moment you buy it.',
    items: [
      {
        icon: Monitor,
        title: 'Business-grade hardware',
        desc: 'Reliable workstations from trusted manufacturers, matched to the role and the workload — so nobody is waiting on a machine that was never built for their job.',
      },
      {
        icon: Layers,
        title: 'Standard builds & imaging',
        desc: 'Consistent, secure setups across the fleet. Every machine looks the same, behaves the same and can be rebuilt the same way when it needs to be.',
      },
      {
        icon: Plug,
        title: 'Setup & onboarding',
        desc: 'Devices configured, connected, updated and tested before they reach anyone — not dropped on a desk in a box for someone to work out themselves.',
      },
      {
        icon: LifeBuoy,
        title: 'Refresh & support',
        desc: 'Lifecycle planning so replacements are budgeted rather than urgent, plus ongoing support and warranty handling across every device you run.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What the workstation service covers',
    text: 'Whether it is one new starter or a whole-office refresh.',
    items: [
      'Hardware selection & supply',
      'Standard builds & imaging',
      'Peripherals & accessories',
      'New-starter setup & onboarding',
      'Refresh & lifecycle management',
      'Fleet support & warranty handling',
    ],
    chip: 'Business-grade hardware',
    img: imgChecklist,
    alt: 'A workstation set up with multiple screens and ready for a new starter',
    focus: '50% 55%',
    cta: 'Spec your next refresh',
  },
  relatedTitle: 'The rest of your infrastructure',
  cta: {
    title: 'Upgrading your team’s hardware?',
    sub: 'We will spec devices to your budget and deliver them ready to work.',
    primaryLabel: 'Get device advice',
  },
}

export default function Workstations() {
  return (
    <ServiceDetail page={PAGE}>
      <DeviceByRole />
    </ServiceDetail>
  )
}
