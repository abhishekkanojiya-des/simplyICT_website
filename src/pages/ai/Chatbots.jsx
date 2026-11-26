import { motion } from 'framer-motion'
import { Bot, Clock, FileText, Globe, MoveRight, ShieldCheck, UserCheck } from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { AI_SERVICES } from '../../data/content'
import heroImg from '../../assets/ai/chatbots.jpg'
import imgOverview from '../../assets/detail/chatbots-phone.jpg'
import imgChecklist from '../../assets/detail/chatbots-handover.jpg'

/* No live AI sub-page exists yet — copy is drafted from the AI Services hub
   and the service points in src/data/content.js. Needs a review by the team. */

/* ───────── Added section: the hand-off line ─────────
   The service promises an assistant that answers from your content and hands
   over when it should. Drawing that line is the most useful thing this page
   can do, so give it a sorting board: handled on one side, escalated on the
   other, with the boundary itself as the centrepiece. */
const HANDLED = [
  'Opening hours & locations',
  'Which areas you cover',
  'What a service includes',
  'How to request a quote',
  'Where an order or job is up to',
  'First-line troubleshooting',
  'Pointing people at the right page',
]

const ESCALATED = [
  'Anything about price negotiation',
  'Complaints, of any size',
  'Questions about an existing contract',
  'Real technical faults',
  'Anything involving personal data',
  'Anything it is not confident about',
]

function HandOffLine() {
  return (
    <section id="hand-off" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -left-52 top-24 h-[500px] w-[500px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.15), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="The hand-off line"
          title="What it answers, and what it passes straight to you"
          text="A useful assistant is defined by what it refuses to attempt. We agree this boundary with you before it goes anywhere near your customers."
          center
        />

        <div className="relative mx-auto mt-12 grid max-w-[1060px] gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-0">
          {/* handled */}
          <Reveal y={34}>
            <div className="h-full rounded-[26px] border border-line bg-paper p-7 sm:p-8 lg:rounded-r-none lg:border-r-0">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl text-white shadow-[0_12px_24px_-14px_rgba(59,130,246,.9)]"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  <Bot size={19} />
                </span>
                <div>
                  <p className="text-[17px] font-semibold tracking-[-0.02em] text-ink">It handles these</p>
                  <p className="text-[12.5px] text-muted">Answered from your own content, any hour</p>
                </div>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {HANDLED.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[13.5px] font-medium text-ink"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--brand-gradient)' }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* the line itself */}
          <div className="relative flex items-center justify-center lg:w-[76px]">
            <span
              className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 lg:inset-x-auto lg:inset-y-0 lg:left-1/2 lg:h-auto lg:w-[2px] lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
              style={{ background: 'var(--brand-gradient)' }}
            />
            <span className="relative grid h-12 w-12 place-items-center rounded-full border border-line bg-white text-brand-blue shadow-[0_14px_28px_-16px_rgba(11,18,32,.5)]">
              <MoveRight size={19} className="rotate-90 lg:rotate-0" />
            </span>
          </div>

          {/* escalated */}
          <Reveal y={34} delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-[26px] bg-navy p-7 text-white sm:p-8 lg:rounded-l-none">
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    'radial-gradient(60% 55% at 100% 0%, rgba(34,211,238,.2), transparent 70%), radial-gradient(50% 50% at 0% 100%, rgba(59,130,246,.22), transparent 70%)',
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/[0.08] text-brand-cyan">
                    <UserCheck size={19} />
                  </span>
                  <div>
                    <p className="text-[17px] font-semibold tracking-[-0.02em]">It hands these to you</p>
                    <p className="text-[12.5px] text-white/55">With the full conversation attached</p>
                  </div>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {ESCALATED.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.45, ease: EASE, delay: 0.1 + i * 0.05 }}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-2 text-[13.5px] font-medium text-white/90"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-9 flex max-w-2xl items-start justify-center gap-2.5 text-center text-[14px] leading-relaxed text-muted">
            <ShieldCheck size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            An assistant that guesses is worse than no assistant at all. Ours is set up to say it does not know and fetch
            a human — which is also what your customers would prefer.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'chatbots',
  family: AI_SERVICES,
  parent: { label: 'AI Services', href: '/ai-services' },
  crumb: 'AI Chatbots & Virtual Agents',
  tagline: 'AI Services · Chatbots & Virtual Agents',
  title: ['AI Chatbots &', 'Virtual Agents'],
  kicker: 'Someone to answer at 11pm.',
  hero: {
    img: heroImg,
    focus: '50% 50%',
    text: 'Website and internal assistants trained on your own content — answering the questions you field all day, and handing over to a human the moment it matters.',
    cta: 'Talk to us',
  },
  glance: [
    { icon: Clock, k: 'Available', v: '24/7, including after hours' },
    { icon: FileText, k: 'Trained on', v: 'Your content, not the open web' },
    { icon: UserCheck, k: 'When unsure', v: 'Hands over to a person' },
  ],
  overview: {
    eyebrow: 'Why it works',
    title: 'Most of your enquiries are the same eight questions, asked outside business hours.',
    body: [
      'Opening times, whether you cover a suburb, what a service includes, how to get a quote, where an order is. Answering them is easy — being awake for them is the hard part, and an unanswered enquiry at 9pm is usually a customer who has already messaged someone else by morning.',
      'An assistant trained on your own pages and documents handles those without inventing anything, because it answers from your content rather than from whatever it absorbed off the internet. When a question goes beyond what you have published, it says so and hands the conversation to your team with the transcript attached.',
    ],
    facts: [
      { k: 'Trained on', v: 'Your pages & documents' },
      { k: 'Available', v: '24/7' },
      { k: 'When it does not know', v: 'It hands over, not guesses' },
      { k: 'Where it runs', v: 'Your website, or internally' },
    ],
    badge: {
      value: 'Your content only',
      label: 'Answers come from what you have actually published — not from the open internet.',
    },
    img: imgOverview,
    alt: 'An AI chat assistant open on a phone',
    focus: '38% 50%',
    cta: 'Talk to us',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Two kinds of assistant, one set of rules',
    text: 'One facing your customers, one facing your staff — both grounded in your own material.',
    items: [
      {
        icon: Globe,
        title: 'Website chat assistant',
        desc: 'Answers the enquiries that arrive after hours, qualifies them, and passes the ones worth your time straight to your team with the full conversation.',
      },
      {
        icon: Bot,
        title: 'Internal knowledge bot',
        desc: 'An assistant your staff can ask about policies, procedures and how things are done here — so the same question does not land on the same person every week.',
      },
      {
        icon: FileText,
        title: 'Trained on your content',
        desc: 'Built on your pages, documents and procedures, with boundaries set so it declines rather than improvises when something falls outside what it knows.',
      },
      {
        icon: UserCheck,
        title: 'Hand-off to a human',
        desc: 'A clear escalation path to a real person, because the point is to deal with the easy eight questions, not to trap a frustrated customer in a loop.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What building an assistant covers',
    text: 'Set up, bounded, tested on real questions, then kept current as your content changes.',
    items: [
      'Website chat assistant',
      'Internal knowledge assistant',
      'Trained on your documents & pages',
      'Human hand-off & transcripts',
      'Tone & boundary setup',
      'Retraining as your content changes',
    ],
    chip: 'Available 24/7',
    img: imgChecklist,
    alt: 'Two support staff on headsets, ready to pick up where the bot stops',
    focus: '50% 45%',
    cta: 'Talk through the idea',
  },
  relatedTitle: 'The rest of our AI services',
  cta: {
    title: 'Answering the same questions all day?',
    sub: 'Let us look at what an assistant trained on your own content could genuinely take off your plate.',
    primaryLabel: 'Talk to us',
  },
}

export default function Chatbots() {
  /* <HandOffLine /> is no longer shown — pass it as a child of ServiceDetail
     to put the section back. */
  return <ServiceDetail page={PAGE} />
}
