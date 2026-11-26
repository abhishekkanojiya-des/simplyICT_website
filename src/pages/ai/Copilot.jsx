import { motion } from 'framer-motion'
import {
  Check, Eye, GraduationCap, Lock, ScanSearch, Settings2, Sparkles, TrendingUp, Wrench,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { AI_SERVICES } from '../../data/content'
import heroImg from '../../assets/ai/copilot.jpg'
import imgOverview from '../../assets/detail/copilot-work.jpg'
import imgChecklist from '../../assets/detail/copilot-training.jpg'

/* No live AI sub-page exists yet — copy is drafted from the AI Services hub
   and the service points in src/data/content.js. Needs a review by the team. */

/* ───────── Added section: the readiness gate ─────────
   The page argues that the permissions work comes before go-live, so lay the
   prerequisites out as a pre-flight check. Status is carried by an icon and a
   word, never by colour alone. */
const STATES = {
  fine: { icon: Check, label: 'Usually fine' },
  work: { icon: Wrench, label: 'Often needs work' },
  check: { icon: Eye, label: 'Worth checking' },
}

const PREREQS = [
  {
    title: 'A Microsoft 365 plan that supports Copilot',
    desc: 'Copilot sits on top of Microsoft 365, so the underlying licensing has to be in place before anything else is worth discussing.',
    state: 'fine',
  },
  {
    title: 'SharePoint and OneDrive that are not a free-for-all',
    desc: 'This is the one that catches people. Copilot answers from what each person can already open — including the site somebody shared with "everyone" years ago.',
    state: 'work',
  },
  {
    title: 'Multi-factor authentication switched on',
    desc: 'An assistant that can read across your whole document library is a very good reason to make sure a stolen password is not enough to sign in.',
    state: 'check',
  },
  {
    title: 'Sensitive folders genuinely restricted',
    desc: 'Payroll, HR files and board papers need to be restricted in fact, not just by nobody happening to look. Copilot will find them if they are reachable.',
    state: 'work',
  },
  {
    title: 'Someone inside the business who champions it',
    desc: 'Rollouts that stick have one enthusiastic person per team. Without that, licences get assigned, used twice, and quietly forgotten.',
    state: 'check',
  },
]

function ReadinessGate() {
  return (
    <section id="readiness" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-52 top-20 h-[500px] w-[500px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.16), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="Before you buy"
          title="Five things we check before Copilot goes anywhere near your data"
          text="This is the readiness check, and it is the whole reason we do not just hand over licences. Two of these catch out almost everybody."
          center
        />

        <Reveal y={36} className="mx-auto mt-12 max-w-[920px]">
          <ol className="relative">
            {/* the rail the checks hang off */}
            <span
              className="absolute bottom-6 left-[21px] top-6 w-[2px] rounded-full bg-line sm:left-[25px]"
              aria-hidden="true"
            />

            {PREREQS.map(({ title, desc, state }, i) => {
              const { icon: StateIcon, label } = STATES[state]
              return (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                  className="relative flex gap-5 pb-7 last:pb-0 sm:gap-6"
                >
                  {/* numbered node */}
                  <span
                    className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full text-[14px] font-bold text-white shadow-[0_12px_24px_-14px_rgba(59,130,246,.9)] ring-[5px] ring-white sm:h-[53px] sm:w-[53px] sm:text-[16px]"
                    style={{ background: 'var(--brand-gradient)' }}
                  >
                    {i + 1}
                  </span>

                  <div className="min-w-0 flex-1 rounded-[22px] border border-line bg-paper px-5 py-5 transition-[border-color,background-color] duration-500 hover:border-brand-blue/25 hover:bg-white sm:px-6">
                    <div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-2">
                      <h3 className="max-w-[46ch] text-[17px] font-semibold leading-snug tracking-[-0.02em] text-ink">
                        {title}
                      </h3>
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-[12px] font-semibold text-ink">
                        <StateIcon size={13} strokeWidth={2.6} className="text-brand-blue" />
                        {label}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{desc}</p>
                  </div>
                </motion.li>
              )
            })}
          </ol>

          <p className="mt-7 flex items-start gap-2.5 text-[14px] leading-relaxed text-muted">
            <ScanSearch size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            The readiness check is a short piece of work on its own. If it turns up more than we expected, you will hear
            that before you have committed to a single licence.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'copilot',
  family: AI_SERVICES,
  parent: { label: 'AI Services', href: '/ai-services' },
  crumb: 'Microsoft Copilot Rollout',
  tagline: 'AI Services · Microsoft Copilot',
  title: ['Microsoft', 'Copilot Rollout'],
  kicker: 'Copilot, rolled out so people actually use it.',
  hero: {
    img: heroImg,
    focus: '50% 40%',
    text: 'Licensing, setup, a proper data and permissions check, and hands-on training by role — the parts that decide whether Copilot becomes a habit or an unused licence.',
    cta: 'Book a readiness check',
  },
  glance: [
    { icon: Sparkles, k: 'Platform', v: 'Copilot for Microsoft 365' },
    { icon: Lock, k: 'Before go-live', v: 'Data & permissions check' },
    { icon: GraduationCap, k: 'Training', v: 'Hands-on, role by role' },
  ],
  overview: {
    eyebrow: 'Why the order matters',
    title: 'Copilot can only see what your staff can already see — which is usually more than you think.',
    body: [
      'Copilot answers from your own Microsoft 365 content, respecting each person’s existing permissions. That sounds reassuring until you remember the SharePoint site somebody shared with "everyone" in 2019, or the payroll folder that was only ever private because nobody knew it was there.',
      'So we check the permissions before anyone starts asking questions, not after. Then we size the licences to the people who will genuinely use them, configure the tenant, and train your team by role — because what Copilot is useful for in accounts has nothing in common with what it is useful for in sales.',
    ],
    facts: [
      { k: 'Licensing', v: 'Sized to who will use it' },
      { k: 'Permissions audit', v: 'Before anyone logs in' },
      { k: 'Training', v: 'Hands-on, by role' },
      { k: 'Adoption', v: 'Followed up, not assumed' },
    ],
    badge: {
      value: 'Permissions first',
      label: 'We check what Copilot can reach before your team starts asking it questions.',
    },
    img: imgOverview,
    alt: 'Someone working through their day on a laptop and desktop',
    focus: '60% 50%',
    cta: 'Book a readiness check',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'The four parts of a rollout that sticks',
    text: 'Buying the licences is the easy bit. These are the parts that decide whether anyone still uses it in March.',
    items: [
      {
        icon: Settings2,
        title: 'Licensing & setup',
        desc: 'The right licences for the people who will actually use them, with the tenant and Copilot settings configured properly rather than left on defaults.',
      },
      {
        icon: Lock,
        title: 'Data & permissions check',
        desc: 'A review of what your staff can already reach in SharePoint and OneDrive, tightened where it needs to be — the single most-skipped step in a Copilot rollout.',
      },
      {
        icon: GraduationCap,
        title: 'Hands-on staff training',
        desc: 'Sessions built around each team’s real work, with prompt examples they will recognise — not a generic webinar everybody watches once and forgets.',
      },
      {
        icon: TrendingUp,
        title: 'Adoption support',
        desc: 'Check-ins after go-live to see who is using it and who quietly stopped, so you can fix the gaps rather than renew licences nobody touches.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What a Copilot rollout covers',
    text: 'From the readiness check through to the follow-up a month after launch.',
    items: [
      'Licence review & assignment',
      'Tenant & Copilot configuration',
      'SharePoint & permissions clean-up',
      'Role-based training sessions',
      'Prompt guides for your team',
      'Adoption check-ins after go-live',
    ],
    chip: 'Copilot for Microsoft 365',
    img: imgChecklist,
    alt: 'A trainer running a session for staff in a meeting room',
    focus: '45% 55%',
    cta: 'Check if you are ready',
  },
  relatedTitle: 'The rest of our AI services',
  cta: {
    title: 'Thinking about Copilot?',
    sub: 'We will tell you whether your Microsoft 365 is ready for it — and what to fix first if it is not.',
    primaryLabel: 'Book a readiness check',
  },
}

export default function Copilot() {
  return (
    <ServiceDetail page={PAGE}>
      <ReadinessGate />
    </ServiceDetail>
  )
}
