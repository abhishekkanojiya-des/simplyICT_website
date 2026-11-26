import { motion } from 'framer-motion'
import {
  BadgeCheck, ChevronRight, ClipboardCheck, Clock, FileText, Inbox, Mail, Receipt,
  Share2, Users, Workflow,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { AI_SERVICES } from '../../data/content'
import heroImg from '../../assets/ai/automation.jpg'
import imgOverview from '../../assets/detail/automation-paperwork.jpg'
import imgChecklist from '../../assets/detail/automation-digital.jpg'

/* No live AI sub-page exists yet — copy is drafted from the AI Services hub
   and the service points in src/data/content.js. Needs a review by the team. */

/* ───────── Added section: one process, before and after ─────────
   The overview describes the enquiry that gets retyped into three systems.
   Rather than assert the saving, draw the two chains and let the difference
   in length make the argument. */
const BEFORE = [
  { icon: Inbox, label: 'Enquiry lands in an inbox', who: 'Whoever spots it' },
  { icon: Users, label: 'Copied into the CRM', who: 'Admin' },
  { icon: FileText, label: 'Job raised from the CRM', who: 'Operations' },
  { icon: Receipt, label: 'Invoice keyed into accounts', who: 'Bookkeeper' },
]

const AFTER = [
  { icon: Inbox, label: 'Enquiry arrives', who: 'Captured automatically' },
  { icon: Workflow, label: 'CRM, job and invoice all created', who: 'No retyping' },
]

function Chain({ steps, dim }) {
  return (
    <ol className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
      {steps.map(({ icon: Icon, label, who }, i) => (
        <motion.li
          key={label}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
          className="flex flex-1 items-center gap-2"
        >
          <div
            className={`flex min-w-0 flex-1 items-center gap-3 rounded-2xl border px-4 py-3.5 ${
              dim ? 'border-dashed border-line bg-white' : 'border-line bg-white'
            }`}
          >
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                dim ? 'bg-paper text-muted' : 'text-white'
              }`}
              style={dim ? undefined : { background: 'var(--brand-gradient)' }}
            >
              <Icon size={17} />
            </span>
            <span className="min-w-0">
              <span className={`block text-[14.5px] font-semibold leading-tight ${dim ? 'text-ink/70' : 'text-ink'}`}>
                {label}
              </span>
              <span className="mt-0.5 block text-[12.5px] text-muted">{who}</span>
            </span>
          </div>
          {i < steps.length - 1 && (
            <ChevronRight
              size={18}
              aria-hidden="true"
              className={`mx-1 shrink-0 rotate-90 sm:rotate-0 ${dim ? 'text-line' : 'text-brand-blue'}`}
            />
          )}
        </motion.li>
      ))}
    </ol>
  )
}

function BeforeAfter() {
  return (
    <section id="before-after" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-52 top-20 h-[500px] w-[500px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.16), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="One process"
          title="The same enquiry, before and after"
          text="This is the chain we see in almost every business we look at. Nobody designed it — it just grew, one system at a time."
          center
        />

        <Reveal y={36} className="mx-auto mt-12 max-w-[1060px]">
          {/* today */}
          <div className="rounded-[28px] border border-line bg-paper p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">
                <Clock size={15} />
                How it runs today
              </p>
              <p className="text-[13px] font-medium text-muted">
                4 hand-offs · 3 people · 4 chances to mistype
              </p>
            </div>
            <div className="mt-6">
              <Chain steps={BEFORE} dim />
            </div>
          </div>

          {/* the join */}
          <div className="flex justify-center py-1">
            <div className="flex flex-col items-center">
              <span className="h-6 w-[2px]" aria-hidden="true" style={{ background: 'var(--brand-gradient)' }} />
              <span
                className="rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white"
                style={{ background: 'var(--brand-gradient)' }}
              >
                Automated
              </span>
              <span className="h-6 w-[2px]" aria-hidden="true" style={{ background: 'var(--brand-gradient)' }} />
            </div>
          </div>

          {/* after */}
          <div className="relative overflow-hidden rounded-[28px] border border-brand-blue/25 bg-white p-6 sm:p-8">
            <span className="absolute inset-x-0 top-0 h-[3px]" aria-hidden="true" style={{ background: 'var(--brand-gradient)' }} />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.12em]">
                <BadgeCheck size={15} className="text-brand-blue" />
                <span className="gradient-text">How it runs after</span>
              </p>
              <p className="text-[13px] font-medium text-ink">1 entry · 0 retyping · a record of every step</p>
            </div>
            <div className="mt-6">
              <Chain steps={AFTER} />
            </div>
          </div>

          <p className="mt-6 flex items-start gap-2.5 text-[14px] leading-relaxed text-muted">
            <Share2 size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            Nobody loses a job here — the bookkeeper stops re-keying invoices and starts checking the ones that look
            wrong. That is usually the actual win, and it is the one people notice.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'automation',
  family: AI_SERVICES,
  parent: { label: 'AI Services', href: '/ai-services' },
  crumb: 'Workflow Automation',
  tagline: 'AI Services · Workflow Automation',
  title: ['Workflow', 'Automation'],
  kicker: 'Stop retyping the same information.',
  hero: {
    img: heroImg,
    focus: '50% 60%',
    text: 'Automation across email, documents, your CRM and your accounting system — so the information gets entered once and arrives everywhere it needs to be.',
    cta: 'Talk to us',
  },
  glance: [
    { icon: Workflow, k: 'Removes', v: 'Copy-paste between systems' },
    { icon: Share2, k: 'Connects', v: 'Email, CRM & accounts' },
    { icon: BadgeCheck, k: 'Result', v: 'Fewer manual errors' },
  ],
  overview: {
    eyebrow: 'Why automate',
    title: 'The same information gets typed into three systems, by three people, every week.',
    body: [
      'An enquiry arrives by email. Someone copies it into the CRM. Someone raises a job from it. Someone else keys the invoice into the accounting system. Nobody thinks of that as a process — it is just how Tuesdays work — and every hop is a chance for a wrong number or a missed job.',
      'We map what actually happens, then automate the handovers: the form that creates the CRM record, the approval that routes itself, the invoice that does not need re-keying. We start with one process that everybody complains about, prove it works, and only then look at the next.',
    ],
    facts: [
      { k: 'Typical starting point', v: 'One painful weekly process' },
      { k: 'Connects', v: 'Email, documents, CRM, accounts' },
      { k: 'Approvals', v: 'Routed & logged' },
      { k: 'Errors', v: 'Fewer, because less retyping' },
    ],
    badge: {
      value: 'One process first',
      label: 'We automate a single painful process, prove it, then move on to the next.',
    },
    img: imgOverview,
    alt: 'An office buried in paperwork, files and loose documents',
    focus: '50% 50%',
    cta: 'Talk to us',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'The handovers, handled',
    text: 'Automation is rarely about replacing a job. It is about removing the gaps between systems where work falls over.',
    items: [
      {
        icon: Mail,
        title: 'Email & document flows',
        desc: 'Enquiries, forms, quotes and signed documents routed, filed and logged automatically — instead of living in one person’s inbox until they get back from leave.',
      },
      {
        icon: Share2,
        title: 'CRM & accounts integration',
        desc: 'Your systems talking to each other, so a new customer, a won job or an invoice is entered once and appears wherever else it is needed.',
      },
      {
        icon: ClipboardCheck,
        title: 'Approvals & notifications',
        desc: 'Approvals that route themselves to the right person and chase when ignored, with a record of who approved what and when it happened.',
      },
      {
        icon: BadgeCheck,
        title: 'Fewer manual errors',
        desc: 'Every re-keying removed is a transposed number that never happens — plus alerts when something does fail, rather than silence until a customer rings.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What an automation project covers',
    text: 'Mapped first, built in stages, documented so it is not a black box only we understand.',
    items: [
      'Process mapping & quick wins',
      'Email & document automation',
      'CRM & accounting integration',
      'Approval routing & notifications',
      'Error handling & alerts',
      'Documentation & handover',
    ],
    chip: 'Less repetitive admin',
    img: imgChecklist,
    alt: 'An administrator working through the same records digitally',
    focus: '45% 50%',
    cta: 'Map your worst process',
  },
  relatedTitle: 'The rest of our AI services',
  cta: {
    title: 'Which process drives your team mad?',
    sub: 'Tell us the one everybody complains about and we will tell you honestly whether it can be automated.',
    primaryLabel: 'Talk to us',
  },
}

export default function Automation() {
  return (
    <ServiceDetail page={PAGE}>
      <BeforeAfter />
    </ServiceDetail>
  )
}
