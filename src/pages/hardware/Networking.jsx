import { motion } from 'framer-motion'
import {
  Activity, Boxes, Database, FileText, Headset, Lock, MonitorSmartphone, Network,
  ShieldCheck, Waypoints, Wrench,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { HARDWARE_SERVICES } from '../../data/content'
import heroImg from '../../assets/hardware/networking.jpg'
import imgOverview from '../../assets/detail/network-switch.jpg'
import imgChecklist from '../../assets/detail/network-patch-panel.jpg'

/* Content mirrors simplyict.com.au/hardware/networking/ */

/* ───────── Added section: what the network carries, and how it is divided ─────────
   Straight from the live page: the network carries voice, files, applications
   and backups, and is segmented with VLANs and access controls. Two halves —
   the traffic on the left, the segmentation diagram on the right. */
const TRAFFIC = [
  { icon: Headset, name: 'Voice', needs: 'Low latency — a delay of milliseconds is a conversation people talk over.' },
  { icon: FileText, name: 'Files', needs: 'Throughput — opening a 2GB drawing should not be a coffee break.' },
  { icon: MonitorSmartphone, name: 'Applications', needs: 'Steady uptime — line-of-business apps stop the office when they stall.' },
  { icon: Database, name: 'Backups', needs: 'Bandwidth at the right time — overnight, not mid-afternoon.' },
]

const SEGMENTS = [
  { name: 'Staff', desc: 'Your people and their devices', tone: 'strong' },
  { name: 'Servers & storage', desc: 'Kept apart from everyday traffic', tone: 'strong' },
  { name: 'Payments & point of sale', desc: 'Isolated, for good reason', tone: 'mid' },
  { name: 'Guest Wi-Fi', desc: 'Internet only — no reach inside', tone: 'light' },
  { name: 'Cameras, printers & IoT', desc: 'The devices nobody patches', tone: 'light' },
]

function OneNetwork() {
  return (
    <section id="what-it-carries" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -left-52 top-24 h-[500px] w-[500px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.16), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="One network"
          title="Four kinds of traffic, one set of cables"
          text="Voice, files, applications and backups all share the same switching — and each one wants something different from it. Which is why the network gets divided up."
          center
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-14">
          {/* left: the traffic */}
          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-muted">What rides on it</p>
            <ul className="mt-5 space-y-px overflow-hidden rounded-[24px] border border-line bg-line">
              {TRAFFIC.map(({ icon: Icon, name, needs }, i) => (
                <motion.li
                  key={name}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
                  className="group flex items-start gap-4 bg-white px-5 py-5 transition-colors duration-300 hover:bg-paper/70 sm:px-6"
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white shadow-[0_12px_24px_-14px_rgba(59,130,246,.9)] transition-transform duration-500 group-hover:scale-110"
                    style={{ background: 'var(--brand-gradient)' }}
                  >
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold tracking-[-0.02em] text-ink">{name}</span>
                    <span className="mt-1 block text-[14px] leading-snug text-muted">{needs}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* right: segmentation diagram */}
          <div className="lg:pt-7">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-muted">
              How we keep it out of each other’s way
            </p>
            <div className="relative mt-5 overflow-hidden rounded-[24px] bg-navy p-6 text-white sm:p-7">
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    'radial-gradient(60% 55% at 100% 0%, rgba(34,211,238,.2), transparent 70%), radial-gradient(50% 50% at 0% 100%, rgba(59,130,246,.22), transparent 70%)',
                }}
              />
              <div className="relative">
                {/* edge */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-brand-cyan">
                    <ShieldCheck size={17} />
                  </span>
                  <div>
                    <p className="text-[14.5px] font-semibold">Firewall at the edge</p>
                    <p className="text-[12.5px] text-white/55">Everything in and out passes through here</p>
                  </div>
                </div>

                <div className="my-2 ml-[22px] h-5 w-[2px] rounded-full bg-white/20" aria-hidden="true" />

                {/* core */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-brand-cyan">
                    <Boxes size={17} />
                  </span>
                  <div>
                    <p className="text-[14.5px] font-semibold">Core switching</p>
                    <p className="text-[12.5px] text-white/55">Then split into separate VLANs</p>
                  </div>
                </div>

                {/* segments */}
                <ul className="relative mt-3 space-y-2 pl-7">
                  <span
                    className="absolute bottom-5 left-[22px] top-0 w-[2px] rounded-full bg-white/20"
                    aria-hidden="true"
                  />
                  {SEGMENTS.map(({ name, desc, tone }, i) => (
                    <motion.li
                      key={name}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.07 }}
                      className="relative"
                    >
                      <span
                        className="absolute -left-[13px] top-1/2 h-[2px] w-[11px] rounded-full bg-white/20"
                        aria-hidden="true"
                      />
                      <div
                        className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 ${
                          tone === 'strong'
                            ? 'border-white/20 bg-white/[0.09]'
                            : tone === 'mid'
                              ? 'border-white/15 bg-white/[0.06]'
                              : 'border-white/10 bg-white/[0.035]'
                        }`}
                      >
                        <Lock size={13} className="shrink-0 text-brand-cyan" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="block text-[13.5px] font-semibold leading-tight">{name}</span>
                          <span className="block text-[12px] leading-snug text-white/50">{desc}</span>
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 flex items-start gap-2.5 text-[14px] leading-relaxed text-muted">
            <Activity size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            Segmentation is the cheapest security you can buy. A compromised camera or an infected guest laptop should
            reach the internet and nothing else — and on a flat network, it reaches everything.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'networking',
  family: HARDWARE_SERVICES,
  parent: { label: 'Hardware & Infrastructure', href: '/hardware' },
  crumb: 'Networking',
  tagline: 'Infrastructure · Networking',
  title: ['Networking'],
  kicker: 'A network that never slows you down.',
  hero: {
    img: heroImg,
    focus: '50% 50%',
    text: 'Network design, security and support — structured, documented and monitored, so your people stay connected and your data stays where it belongs.',
    cta: 'Get help now',
  },
  glance: [
    { icon: Waypoints, k: 'Design', v: 'Structured & documented' },
    { icon: ShieldCheck, k: 'Security', v: 'Firewalls, VLANs & access control' },
    { icon: Activity, k: 'Monitoring', v: 'Health checks & speed testing' },
  ],
  overview: {
    eyebrow: 'Why it matters',
    title: 'Everything you do crosses the network before it reaches anyone.',
    body: [
      'Voice, files, applications, backups, the card machine at the front counter — all of it travels the same cabling and switching. Which is why a network problem never looks like a network problem. It looks like the phones being bad, the server being slow and the internet being down, all at once.',
      'We design networks that are structured rather than accumulated, with security and segmentation built in from the start, and we document what we build. Then we monitor it, so the slow afternoon gets investigated before it turns into a morning where nobody can work.',
    ],
    facts: [
      { k: 'Design', v: 'Structured & documented' },
      { k: 'Segmentation', v: 'VLANs & access control' },
      { k: 'Install disruption', v: 'Kept to a minimum' },
      { k: 'Monitoring', v: 'Proactive health checks' },
    ],
    badge: {
      value: 'Documented',
      label: 'You get the diagram and the detail — not a cupboard only we understand.',
    },
    img: imgOverview,
    alt: 'Blue ethernet cables patched into a network switch',
    focus: '50% 50%',
    cta: 'Get help now',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Designed, secured, installed, watched',
    text: 'A network is only as good as the weakest of these four — so none of them is treated as an extra.',
    items: [
      {
        icon: Waypoints,
        title: 'Network design',
        desc: 'A structured, future-proofed layout with documentation you can actually rely on — including when the person who needs it is not us.',
      },
      {
        icon: ShieldCheck,
        title: 'Security & segmentation',
        desc: 'Firewalls, VLANs and access controls that keep threats out and keep sensitive data separated from the parts of the network everyone can reach.',
      },
      {
        icon: Wrench,
        title: 'Installation & upgrades',
        desc: 'Switches, cabling and hardware installed properly and labelled, scheduled around your week so the disruption lands when it costs you least.',
      },
      {
        icon: Network,
        title: 'Monitoring & troubleshooting',
        desc: 'Ongoing health checks and speed testing, plus fast diagnosis when something does go wrong — cause first, rather than swapping parts hopefully.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What the networking service covers',
    text: 'New builds, upgrades and the ongoing care that keeps a good network good.',
    items: [
      'Network design & documentation',
      'Switches, cabling & backhaul',
      'Firewall & security configuration',
      'Performance & health monitoring',
      'Troubleshooting & upgrades',
      'Site moves & office fit-outs',
    ],
    chip: 'Security & segmentation',
    img: imgChecklist,
    alt: 'Fibre patch leads running into a cabinet in a comms room',
    focus: '50% 50%',
    cta: 'Talk through your network',
  },
  relatedTitle: 'The rest of your infrastructure',
  cta: {
    title: 'Slow network? Dropped connections?',
    sub: 'Tell us the symptoms and we will find the cause — then fix it, or upgrade whatever is holding it back.',
    primaryLabel: 'Get help now',
  },
}

export default function Networking() {
  /* <OneNetwork /> is no longer shown — pass it as a child of ServiceDetail
     to put the section back. */
  return <ServiceDetail page={PAGE} />
}
