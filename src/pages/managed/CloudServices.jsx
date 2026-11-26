import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import {
  Cloud, CloudUpload, EarthLock, FlaskConical, Gauge, MoveRight, Scan, Server, Settings2, Undo2,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { MANAGED_IT_SERVICES } from '../../data/content'
import heroImg from '../../assets/managed/cloud.jpg'
import imgOverview from '../../assets/detail/cloud-engineer.jpg'
import imgChecklist from '../../assets/detail/cloud-team.jpg'

/* Content mirrors simplyict.com.au/managed-it-services/cloud-services/ */

/* ───────── Bespoke section: the migration, step by step ─────────
   "Without the chaos" is a promise, so show the staging that makes
   it true. The rail fills as you scroll through the five steps. */
const STEPS = [
  {
    icon: Scan,
    title: 'Discover',
    when: 'Week 1',
    desc: 'We map what you actually run — apps, data, mailboxes, licences, the server in the cupboard nobody mentions.',
    out: 'A written inventory and the honest list of what should not move.',
  },
  {
    icon: Settings2,
    title: 'Design',
    when: 'Week 2',
    desc: 'We pick the destination for each piece, size the licensing, and set identity, access and backup before anything moves.',
    out: 'A staged plan with costs, downtime windows and a rollback path.',
  },
  {
    icon: FlaskConical,
    title: 'Pilot',
    when: 'Week 3',
    desc: 'One small, willing group goes first. We find the surprises on five people instead of fifty.',
    out: 'A tested runbook, adjusted for how your team really works.',
  },
  {
    icon: CloudUpload,
    title: 'Migrate',
    when: 'In waves',
    desc: 'Teams move in waves, usually out of hours, with mail and files synced ahead so the switch itself is quick.',
    out: 'Your people working in the new environment, with us on hand.',
  },
  {
    icon: Gauge,
    title: 'Optimise',
    when: 'Ongoing',
    desc: 'Once the dust settles we tune performance, retire what you are still paying for, and keep the licensing honest.',
    out: 'Lower bills, fewer loose ends, managed from here on.',
  },
]

function MigrationPath() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] })
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 })

  return (
    <section id="migration" className="section relative overflow-hidden bg-paper">
      <div
        className="pointer-events-none absolute -left-48 bottom-10 h-[460px] w-[460px] rounded-full opacity-50 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.18), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="How it runs"
          title="Your migration, step by step"
          text="Nobody should wake up to a cloud migration that happened to them. Five stages, each with something you can see and sign off."
          center
        />

        <div ref={ref} className="relative mt-14">
          {/* rail — vertical on mobile, horizontal from lg; fills as you scroll */}
          <div
            className="absolute bottom-2 left-[27px] top-2 w-[2px] overflow-hidden rounded-full bg-line lg:hidden"
            aria-hidden="true"
          >
            <motion.span
              className="block h-full w-full origin-top rounded-full"
              style={{ background: 'var(--brand-gradient)', scaleY: reduce ? 1 : grow }}
            />
          </div>
          <div
            className="absolute left-0 right-0 top-[27px] hidden h-[2px] overflow-hidden rounded-full bg-line lg:block"
            aria-hidden="true"
          >
            <motion.span
              className="block h-full w-full origin-left rounded-full"
              style={{ background: 'var(--brand-gradient)', scaleX: reduce ? 1 : grow }}
            />
          </div>

          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-5">
            {STEPS.map(({ icon: Icon, title, when, desc, out }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
                className="relative flex gap-5 lg:flex-col lg:gap-0"
              >
                <span
                  className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-[0_16px_32px_-16px_rgba(59,130,246,.95)] ring-[6px] ring-paper"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  <Icon size={22} />
                </span>

                <div className="pb-2 lg:pt-6">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-deep">
                      Step 0{i + 1}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-line" aria-hidden="true" />
                    <span className="text-[12.5px] font-medium text-muted">{when}</span>
                  </div>
                  <h3 className="mt-2 flex items-center gap-2 text-[20px] font-semibold tracking-[-0.025em] text-ink">
                    {title}
                    {i < STEPS.length - 1 && (
                      <MoveRight size={16} className="hidden text-line lg:inline" aria-hidden="true" />
                    )}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{desc}</p>
                  <p className="mt-4 rounded-xl border border-line bg-white px-3.5 py-3 text-[13.5px] leading-snug text-ink">
                    <span className="block text-[11.5px] uppercase tracking-[0.1em] text-muted">You get</span>
                    {out}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 flex items-start gap-2.5 text-[14px] leading-relaxed text-muted">
            <Undo2 size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            Every wave has a rollback plan. If something is not right on the morning after, we put it back the way it
            was and try again — that is the difference between a staged move and a leap.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'cloud-services',
  family: MANAGED_IT_SERVICES,
  parent: { label: 'Managed IT Services', href: '/managed-it-services' },
  crumb: 'Cloud Services',
  tagline: 'Managed IT · Cloud Services',
  title: ['Cloud', 'Services'],
  kicker: 'Modern cloud, without the chaos.',
  hero: {
    img: heroImg,
    focus: '50% 40%',
    text: 'Microsoft 365, Azure and hybrid infrastructure — planned properly, moved in stages, and managed afterwards so the cloud actually makes your week simpler.',
    cta: 'Plan my cloud move',
  },
  glance: [
    { icon: Cloud, k: 'Platforms', v: 'Microsoft 365 · Azure' },
    { icon: Server, k: 'Approach', v: 'Staged, with rollback' },
    { icon: EarthLock, k: 'Security', v: 'Built in from day one' },
  ],
  overview: {
    eyebrow: 'Why cloud',
    title: 'The cloud should simplify your business — not become a second one to manage.',
    body: [
      'Done well, the cloud means no ageing server to nurse, no VPN to explain, and your team working from wherever they are. Done in a rush, it means surprise bills, three places to look for the same file and a migration nobody wants to repeat.',
      'So we move the right things, at the right pace. Some workloads belong in Microsoft 365, some in Azure, and some are honestly fine where they are for another two years. We will tell you which is which — and build security, backups and support in from the start rather than bolting them on later.',
    ],
    facts: [
      { k: 'Email, Teams, SharePoint & Office', v: 'Microsoft 365' },
      { k: 'Servers & line-of-business apps', v: 'Azure or hybrid' },
      { k: 'Identity & access', v: 'Configured first' },
      { k: 'Cloud backup', v: 'From day one' },
    ],
    badge: { value: 'Staged, not sudden', label: 'Waves, out-of-hours cutovers and a rollback plan for each one.' },
    img: imgOverview,
    alt: 'An engineer checking cloud infrastructure on a tablet beside server racks',
    focus: '70% 45%',
    cta: 'Plan my cloud move',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Everything the move needs — and what comes after',
    text: 'Planning, migration and the ongoing management that keeps a cloud environment tidy.',
    items: [
      {
        icon: Cloud,
        title: 'Microsoft 365',
        desc: 'Email, Teams, SharePoint and Office set up the way your business actually works, migrated carefully, then managed and kept licensed sensibly.',
      },
      {
        icon: CloudUpload,
        title: 'Careful cloud migration',
        desc: 'Staged, low-risk moves with data synced ahead, cutovers scheduled around your week, minimal downtime and a documented rollback plan.',
      },
      {
        icon: Server,
        title: 'Modernise infrastructure',
        desc: 'Retire ageing on-premise servers using Azure and hybrid options — or keep what still earns its place, and connect it properly.',
      },
      {
        icon: EarthLock,
        title: 'Security in the cloud',
        desc: 'Identity, multi-factor authentication, access control and cloud backup configured from day one, not added after the first scare.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What cloud services covers',
    text: 'From the first inventory to the ongoing management, with the licensing reviewed as you grow.',
    items: [
      'Microsoft 365 setup & migrations',
      'Azure & hybrid infrastructure',
      'Email & data migrations',
      'Cloud backup & recovery',
      'Ongoing cloud management',
      'Licence & cost reviews',
    ],
    chip: 'Microsoft 365 · Azure',
    img: imgChecklist,
    alt: 'Colleagues working side by side on laptops with a report open',
    focus: '50% 50%',
    cta: 'Map what should move',
  },
  relatedTitle: 'The rest of managed IT',
  cta: {
    title: 'Move to the cloud on your terms',
    sub: 'A free consultation to map what should move, what should not, and what it will cost.',
    primaryLabel: 'Plan my cloud move',
  },
}

export default function CloudServices() {
  /* <MigrationPath /> is built and ready but hidden for now — pass it as a child
     of ServiceDetail to bring the section back. */
  return <ServiceDetail page={PAGE} />
}
