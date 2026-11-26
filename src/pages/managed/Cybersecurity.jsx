import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Check, ClipboardCheck, Database, Eye, GraduationCap, Inbox, KeyRound, Laptop,
  LifeBuoy, RefreshCw, ShieldCheck,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { MANAGED_IT_SERVICES } from '../../data/content'
import heroImg from '../../assets/managed/cybersecurity.jpg'
import imgOverview from '../../assets/detail/security-lock.jpg'
import imgChecklist from '../../assets/detail/security-backup.jpg'

/* Content mirrors simplyict.com.au/managed-it-services/cybersecurity/ */

/* ───────── Bespoke section: the five layers of defence ─────────
   Layered security is the whole argument of this page, so show the
   layers. The list is the diagram: each bar steps further inward,
   and choosing one explains what it stops. */
const LAYERS = [
  {
    icon: GraduationCap,
    name: 'Your people',
    lead: 'The layer that stops most attacks before anything technical has to.',
    desc: 'Most breaches start with someone clicking something. We give your team short, practical guidance — what a real invoice scam looks like, how to check a sender, who to tell — and a reporting path that takes five seconds to use.',
    points: ['Phishing awareness that is not a lecture', 'Password & MFA habits', 'A clear, blame-free reporting path'],
    stops: 'Phishing, invoice fraud, impersonation',
  },
  {
    icon: Inbox,
    name: 'Email & web',
    lead: 'Filtering the inbox and the browser, because that is where the threats arrive.',
    desc: 'Managed email protection scans attachments and links before they reach anyone, flags impersonation of your own domain, and blocks the known-bad web destinations that malware calls home to.',
    points: ['Attachment & link scanning', 'Domain impersonation protection', 'Web filtering & safe browsing'],
    stops: 'Malicious attachments, spoofed senders, drive-by downloads',
  },
  {
    icon: Laptop,
    name: 'Devices',
    lead: 'Every laptop, desktop and phone patched, protected and accounted for.',
    desc: 'Managed endpoint protection watches for behaviour rather than just known signatures, and we keep operating systems and applications patched on a schedule — because an unpatched machine is the easiest way in.',
    points: ['Managed endpoint protection', '24/7 monitoring & patching', 'Disk encryption & device inventory'],
    stops: 'Ransomware, known exploits, lost-device data loss',
  },
  {
    icon: KeyRound,
    name: 'Network & identity',
    lead: 'A stolen password should not be enough to get in.',
    desc: 'Multi-factor authentication, conditional access rules and a properly configured firewall mean an attacker with valid credentials still hits a wall. We segment the network so a problem in one place cannot wander into the rest.',
    points: ['MFA & conditional access', 'Firewall configuration & review', 'Network segmentation'],
    stops: 'Credential theft, lateral movement, unauthorised access',
  },
  {
    icon: Database,
    name: 'Data & recovery',
    lead: 'The layer that decides whether a bad day is an hour or a fortnight.',
    desc: 'Backups you have never restored are not backups. We run them, retain them away from your production environment, and actually test the restore — so you know how long recovery takes before you need to know.',
    points: ['Backups with tested restores', 'Off-site & retained copies', 'Documented recovery plan'],
    stops: 'Ransomware payment pressure, accidental deletion, hardware failure',
  },
]

function DefenceLayers() {
  const [active, setActive] = useState(0)
  const layer = LAYERS[active]

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    setActive((i) => (e.key === 'ArrowDown' ? (i + 1) % LAYERS.length : (i - 1 + LAYERS.length) % LAYERS.length))
  }

  return (
    <section id="layers" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-52 top-24 h-[500px] w-[500px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.16), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="Layered defence"
          title="Five layers, so no single mistake becomes a breach"
          text="No one control stops everything. Each layer catches what the one before it missed — and the last one gets you back on your feet."
          center
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          {/* the stack — each bar steps inward */}
          <Reveal y={34}>
            <div role="tablist" aria-orientation="vertical" aria-label="Layers of defence" onKeyDown={onKeyDown} className="space-y-2.5">
              {LAYERS.map(({ icon: Icon, name, lead }, i) => {
                const on = i === active
                return (
                  <button
                    key={name}
                    role="tab"
                    id={`layer-tab-${i}`}
                    aria-selected={on}
                    aria-controls="layer-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    style={{ marginLeft: `calc(${i} * clamp(0px, 1.6vw, 22px))` }}
                    className={`group flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-[background-color,border-color,box-shadow,transform] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 sm:px-5 ${
                      on
                        ? 'border-brand-blue/30 bg-white shadow-[0_22px_44px_-28px_rgba(11,18,32,.45)]'
                        : 'border-line bg-paper hover:border-brand-blue/20 hover:bg-white'
                    }`}
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${
                        on ? 'text-white' : 'bg-white text-brand-blue group-hover:bg-brand-blue/[0.08]'
                      }`}
                      style={on ? { background: 'var(--brand-gradient)' } : undefined}
                    >
                      <Icon size={19} />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-baseline gap-2">
                        <span className="text-[11.5px] font-semibold tabular-nums text-muted">0{i + 1}</span>
                        <span className={`text-[16.5px] font-semibold tracking-[-0.02em] ${on ? 'text-ink' : 'text-ink/85'}`}>
                          {name}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-[13.5px] text-muted">{lead}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* the explanation */}
          <Reveal y={34} delay={0.1}>
            <div
              role="tabpanel"
              id="layer-panel"
              aria-labelledby={`layer-tab-${active}`}
              className="relative h-full overflow-hidden rounded-[28px] bg-navy p-7 text-white sm:p-9 lg:sticky lg:top-28"
            >
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    'radial-gradient(60% 50% at 100% 0%, rgba(34,211,238,.22), transparent 70%), radial-gradient(50% 50% at 0% 100%, rgba(59,130,246,.24), transparent 70%)',
                }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="relative"
                >
                  <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/75">
                    Layer 0{active + 1}
                  </p>
                  <h3 className="mt-5 text-[26px] font-semibold tracking-[-0.03em] sm:text-[30px]">{layer.name}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-white/70">{layer.desc}</p>

                  <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
                    {layer.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                          style={{ background: 'var(--brand-gradient)' }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="text-[15px] font-medium text-white/90">{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 rounded-2xl border border-white/[0.12] bg-white/[0.05] p-4">
                    <p className="text-[12px] uppercase tracking-[0.12em] text-white/45">What this layer stops</p>
                    <p className="mt-1.5 text-[15px] font-medium text-brand-cyan">{layer.stops}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'cybersecurity',
  family: MANAGED_IT_SERVICES,
  parent: { label: 'Managed IT Services', href: '/managed-it-services' },
  crumb: 'Cybersecurity',
  tagline: 'Managed IT · Cybersecurity',
  title: ['Cyber', 'security'],
  kicker: 'Security that protects your business — not your sleep.',
  hero: {
    img: heroImg,
    focus: '50% 50%',
    text: 'Advanced threat protection, honest audits, and backups we have actually tested — monitored and managed so a threat never becomes a business-stopping event.',
    cta: 'Request a security review',
  },
  glance: [
    { icon: Eye, k: 'Monitoring', v: '24/7, patched on schedule' },
    { icon: RefreshCw, k: 'Backups', v: 'Tested restores, not hope' },
    { icon: ClipboardCheck, k: 'Compliance', v: 'Practical, achievable steps' },
  ],
  overview: {
    eyebrow: 'Why it matters',
    title: 'Every business is a target. Very few are targeted personally.',
    body: [
      'Most attacks are not aimed at you — they are automated, indiscriminate and looking for whoever left a door open. That is good news, because it means ordinary, well-maintained defences stop the overwhelming majority of them.',
      'We build those defences in layers: stop what we can at the edge, detect what gets through, and recover fast when something does land. Then we keep them current, because security is a routine, not a project with an end date.',
    ],
    facts: [
      { k: 'Endpoint & email protection', v: 'Managed by us' },
      { k: 'Patching cadence', v: 'Monitored 24/7' },
      { k: 'Backup restores', v: 'Tested, not assumed' },
      { k: 'Incident escalation', v: 'A real person, fast' },
    ],
    badge: { value: 'Tested restores', label: 'A backup you have never restored is a guess. We prove yours works.' },
    img: imgOverview,
    alt: 'A laptop showing a secured connection with a padlock',
    focus: '50% 50%',
    cta: 'Request a security review',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Protection, proof and a way back',
    text: 'Four pieces that work together — and keep working after the install is finished.',
    items: [
      {
        icon: ShieldCheck,
        title: 'Advanced threat protection',
        desc: 'Managed endpoint and email protection, scheduled patching and round-the-clock monitoring — so threats are caught by a system, not by someone noticing.',
      },
      {
        icon: ClipboardCheck,
        title: 'Security audits & reviews',
        desc: 'An honest health check across your people, processes and systems, with the findings prioritised by real risk instead of a scary-looking list.',
      },
      {
        icon: RefreshCw,
        title: 'Backups & disaster recovery',
        desc: 'Backups that are retained properly and restored in testing, with a documented recovery plan — so you know your downtime before you ever need it.',
      },
      {
        icon: LifeBuoy,
        title: 'Practical compliance guidance',
        desc: 'Help meeting the security obligations in your industry, in achievable steps and plain English, without turning your business into a paperwork exercise.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What managed cybersecurity includes',
    text: 'Standard with every managed security engagement, reported back to you every month.',
    items: [
      'Endpoint & email protection',
      '24/7 monitoring & patching',
      'Security audits & staff guidance',
      'Backups with tested restores',
      'Incident response support',
      'Monthly security reporting',
    ],
    chip: 'Layered protection',
    img: imgChecklist,
    alt: 'Hard drives in a docking station being backed up',
    focus: '50% 62%',
    cta: 'Book a security review',
  },
  relatedTitle: 'The rest of managed IT',
  cta: {
    title: 'How secure is your business right now?',
    sub: 'Start with a security review. You will get a clear, prioritised picture — and no scare tactics.',
    primaryLabel: 'Request a security review',
  },
}

export default function Cybersecurity() {
  /* <DefenceLayers /> is built and ready but hidden for now — pass it as a child
     of ServiceDetail to bring the section back. */
  return <ServiceDetail page={PAGE} />
}
