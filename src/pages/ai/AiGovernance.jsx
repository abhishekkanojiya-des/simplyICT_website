import { motion } from 'framer-motion'
import { Check, Eye, FileText, GraduationCap, KeyRound, Lock, Minus, ShieldOff } from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { AI_SERVICES } from '../../data/content'
import heroImg from '../../assets/ai/governance.jpg'
import imgOverview from '../../assets/detail/governance-key.jpg'
import imgChecklist from '../../assets/detail/governance-review.jpg'

/* No live AI sub-page exists yet — copy is drafted from the AI Services hub
   and the service points in src/data/content.js. Needs a review by the team. */

/* ───────── Added section: the three-tier tool list ─────────
   The approved tool list is the practical half of this service, so show its
   shape. Tiers are separated by visual weight (solid / outlined / dimmed)
   plus an icon and a word — never by colour alone, and no traffic-light
   palette, which would sit outside the brand's blues. */
const TIERS = [
  {
    key: 'approved',
    icon: Check,
    tier: 'Approved',
    rule: 'Licensed by the business, configured so your content is not used for training. Use these freely.',
    examples: ['Microsoft 365 Copilot', 'Tools we have set up for you', 'Your own internal assistant'],
    weight: 'solid',
  },
  {
    key: 'care',
    icon: Eye,
    tier: 'Allowed, with care',
    rule: 'Fine for general work with nothing identifying in it. Read it back before you send it anywhere.',
    examples: ['Public chatbots for general research', 'Drafting marketing copy', 'Summarising published material'],
    weight: 'outline',
  },
  {
    key: 'never',
    icon: ShieldOff,
    tier: 'Not with work data',
    rule: 'Never paste these into a tool the business has not approved — once it is sent, it is gone.',
    examples: ['Client names & contact details', 'Personal or health information', 'Contracts & financials', 'Passwords & access keys'],
    weight: 'dim',
  },
]

function ToolTiers() {
  return (
    <section id="tool-tiers" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-52 top-20 h-[500px] w-[500px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.15), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="The approved list"
          title="Three tiers, and a policy nobody needs a lawyer to read"
          text="This is the practical half of governance. Most of the risk disappears the moment your team knows which bucket a tool sits in."
          center
        />

        <Reveal y={36} className="mx-auto mt-12 max-w-[1000px] space-y-4">
          {TIERS.map(({ key, icon: Icon, tier, rule, examples, weight }, i) => {
            const solid = weight === 'solid'
            const dim = weight === 'dim'
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.09 }}
                className={`relative overflow-hidden rounded-[26px] border pl-2 ${
                  solid
                    ? 'border-brand-blue/25 bg-white shadow-[0_30px_64px_-40px_rgba(11,18,32,.45)]'
                    : dim
                      ? 'border-dashed border-line bg-paper/60'
                      : 'border-line bg-white'
                }`}
              >
                {/* weight spine */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[5px]"
                  style={
                    solid
                      ? { background: 'var(--brand-gradient)' }
                      : dim
                        ? { background: '#e3e8f0' }
                        : { background: 'linear-gradient(to bottom, rgba(59,130,246,.5), rgba(34,211,238,.3))' }
                  }
                />

                <div className="grid gap-5 px-6 py-6 sm:px-7 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-center md:gap-8">
                  <div className="flex items-start gap-4">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                        solid ? 'text-white' : dim ? 'bg-white text-muted' : 'bg-brand-blue/[0.08] text-brand-blue'
                      }`}
                      style={solid ? { background: 'var(--brand-gradient)' } : undefined}
                    >
                      <Icon size={19} strokeWidth={solid ? 3 : 2} />
                    </span>
                    <div className="min-w-0">
                      <p className={`text-[18px] font-semibold tracking-[-0.025em] ${dim ? 'text-ink/75' : 'text-ink'}`}>
                        {tier}
                      </p>
                      <p className="mt-1.5 text-[13.5px] leading-snug text-muted">{rule}</p>
                    </div>
                  </div>

                  <ul className="flex flex-wrap gap-2 md:border-l md:border-line md:pl-8">
                    {examples.map((e) => (
                      <li
                        key={e}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-medium ${
                          dim ? 'border-line bg-white text-muted' : 'border-line bg-paper text-ink'
                        }`}
                      >
                        {dim ? (
                          <Minus size={12} strokeWidth={3} className="shrink-0 text-muted/60" />
                        ) : (
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: 'var(--brand-gradient)' }}
                          />
                        )}
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}

          <p className="flex items-start gap-2.5 pt-2 text-[14px] leading-relaxed text-muted">
            <KeyRound size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            The trick is making the approved path the easy path. If the licensed tool is slower to reach than the free
            one, people will keep using the free one — whatever the policy says.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'ai-governance',
  family: AI_SERVICES,
  parent: { label: 'AI Services', href: '/ai-services' },
  crumb: 'AI Security & Governance',
  tagline: 'AI Services · Security & Governance',
  title: ['AI Security', '& Governance'],
  kicker: 'Let your team use AI without losing control of your data.',
  hero: {
    img: heroImg,
    focus: '50% 50%',
    text: 'A short, readable AI use policy, an approved tool list, the access controls to back them up, and guidance your staff can follow without a legal degree.',
    cta: 'Book a consultation',
  },
  glance: [
    { icon: FileText, k: 'Policy', v: 'Short enough to be read' },
    { icon: Lock, k: 'Your data', v: 'Kept out of public tools' },
    { icon: Eye, k: 'Visibility', v: 'Who is using what' },
  ],
  overview: {
    eyebrow: 'Why governance',
    title: 'Your team is already using AI. The only open question is whether you know which tools.',
    body: [
      'Someone is pasting a client email into a free chatbot to make it sound more professional. Someone else is running a spreadsheet of names through a summariser. Neither of them is being reckless — they are trying to get work done — but your data has quietly left the building, and you have no record of it.',
      'Banning AI outright does not work; it just moves the usage onto personal phones where you cannot see it. What works is a short policy people will actually read, a list of tools that are approved and paid for, and the access controls to make the approved path the easy path.',
    ],
    facts: [
      { k: 'Policy', v: 'Short enough to be read' },
      { k: 'Approved tools', v: 'Chosen, listed & licensed' },
      { k: 'Client data', v: 'Stays out of public tools' },
      { k: 'Staff guidance', v: 'Practical, not legal' },
    ],
    badge: {
      value: 'Already happening',
      label: 'A policy written now still beats discovering the problem in a breach report.',
    },
    img: imgOverview,
    alt: 'A hardware security key beside a laptop',
    focus: '50% 50%',
    cta: 'Book a consultation',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Four things that remove most of the risk',
    text: 'None of them are difficult. They are just rarely done before something goes wrong.',
    items: [
      {
        icon: FileText,
        title: 'AI use policy',
        desc: 'A short, readable policy covering what may go into an AI tool and what may not — written to be understood by your staff rather than to satisfy a filing cabinet.',
      },
      {
        icon: Lock,
        title: 'Data protection',
        desc: 'Clear boundaries around client data, personal information and anything commercially sensitive, with approved tools configured so your content is not used for training.',
      },
      {
        icon: KeyRound,
        title: 'Access controls',
        desc: 'The approved tools licensed and reachable, the risky ones restricted, and permissions tightened so an AI assistant cannot surface what a person should not see.',
      },
      {
        icon: GraduationCap,
        title: 'Staff guidance',
        desc: 'Practical guidance on what good use looks like — including the habit of checking AI output before sending it, which is where most embarrassment comes from.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What AI governance covers',
    text: 'Enough structure to be safe, without turning everyday work into an approval process.',
    items: [
      'AI use policy',
      'Approved tool list',
      'Data protection review',
      'Access controls & licensing',
      'Staff guidance & training',
      'Annual policy review',
    ],
    chip: 'Safe, compliant AI use',
    img: imgChecklist,
    alt: 'A leadership team reviewing and signing off a policy document',
    focus: '50% 50%',
    cta: 'Start with a policy',
  },
  relatedTitle: 'The rest of our AI services',
  cta: {
    title: 'Do you know what AI your team is using?',
    sub: 'Start with a short policy and an approved tool list — the two things that remove most of the risk.',
    primaryLabel: 'Book a consultation',
  },
}

export default function AiGovernance() {
  /* <ToolTiers /> is built and ready but hidden for now — pass it as a child
     of ServiceDetail to bring the section back. */
  return <ServiceDetail page={PAGE} />
}
