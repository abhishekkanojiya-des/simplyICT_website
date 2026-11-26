import { useEffect, useState } from 'react'
import {
  ArrowUpRight, Cookie, Database, FileCheck, Lock, Mail, MapPin, MessageSquareExclamationPoint, Phone, Scale,
  Share2, ShieldCheck, UserCog,
} from 'lucide-react'
import { BlurText, Eyebrow, Reveal, ScrollProgress } from '../components/ui'
import { CTA } from '../sections/CTAFooter'
import { CONTACT } from '../data/content'

/* ─────────────────────────────────────────────────────────────
   Privacy Policy — content mirrors simplyict.com.au/privacy-policy.
   Deliberately no photo hero: a legal page opens straight on the
   text, with a sticky contents rail beside it on large screens.
   ───────────────────────────────────────────────────────────── */

const UPDATED = 'November 2026'

const OAIC = 'https://www.oaic.gov.au'
const PRIVACY_ACT = 'https://www.oaic.gov.au/privacy/australian-privacy-principles'

/* Each section: an id for the contents rail, a short nav label, the heading,
   and body paragraphs (strings) / bullet lists ({ list: [...] }). */
const SECTIONS = [
  {
    id: 'who-we-are',
    nav: 'Who we are',
    icon: ShieldCheck,
    title: 'Who we are',
    body: [
      'Simply ICT provides managed IT services, web design and hosting, and hardware and infrastructure services to businesses across Australia. We are Australian-owned and based in North Lakes, Queensland.',
      'We are bound by the Australian Privacy Principles under the Privacy Act 1988 (Cth), and this policy explains how we handle the personal information you give us — whether that is through this website, over the phone, or in the course of supporting your systems.',
    ],
  },
  {
    id: 'what-we-collect',
    nav: 'What we collect',
    icon: Database,
    title: 'What we collect',
    body: [
      'We only collect what we need in order to help you. That usually means:',
      {
        list: [
          'Contact and enquiry details — your name, business name, email address, phone number and whatever you tell us in your message.',
          'Technical information — the account, device, network and system details required to deliver and support the services you have asked us to look after.',
          'Website usage data — standard information such as the pages visited and how long they were open, used to understand what people find useful.',
        ],
      },
      'We do not ask for sensitive information, and we would rather you did not send passwords or payment card details by email. If we need a credential to do our job, we will tell you how to share it safely.',
    ],
  },
  {
    id: 'how-we-use-it',
    nav: 'How we use it',
    icon: FileCheck,
    title: 'How we use it',
    body: [
      'We use the information we hold to:',
      {
        list: [
          'Respond to your enquiry and provide the quote or advice you asked for.',
          'Deliver, support and invoice the services you have engaged us for.',
          'Meet our legal, tax and record-keeping obligations.',
          'Improve this website and the services we offer.',
        ],
      },
      'We do not sell your personal information, and we do not rent or trade it. We will not add you to a marketing list off the back of a support request.',
    ],
  },
  {
    id: 'sharing',
    nav: 'Sharing',
    icon: Share2,
    title: 'Sharing your information',
    body: [
      'We disclose personal information only where it is genuinely needed: to the hosting, software and support providers we use to deliver a service to you, where you have asked us to share it on your behalf, or where the law requires it.',
      'We do not send your information overseas unless it is necessary for a service you have specifically asked for — for example a cloud platform or hosting provider whose infrastructure sits outside Australia. Where that applies, we will tell you.',
    ],
  },
  {
    id: 'security',
    nav: 'Security',
    icon: Lock,
    title: 'How we keep it safe',
    body: [
      'We take reasonable steps to protect the information we hold from misuse, interference, loss and unauthorised access, modification or disclosure. In practice that means secure and patched systems, access limited to the people who need it, multi-factor authentication on our own accounts, and staff who are trained to handle client information properly.',
      'No system is ever completely risk-free. If a data breach did occur and it was likely to cause you serious harm, we would notify you and the Office of the Australian Information Commissioner as required.',
    ],
  },
  {
    id: 'cookies',
    nav: 'Cookies & analytics',
    icon: Cookie,
    title: 'Cookies & analytics',
    body: [
      'This website may use cookies and privacy-respecting analytics to understand how the site is used and to keep it working properly. This information is aggregated — we are looking at which pages are useful, not at individuals.',
      'You can block or delete cookies in your browser settings at any time. The site will still work, though some preferences may not be remembered.',
    ],
  },
  {
    id: 'access-correction',
    nav: 'Access & correction',
    icon: UserCog,
    title: 'Access & correction',
    body: [
      `You can ask us what personal information we hold about you, ask for a copy of it, or ask us to correct anything that is wrong or out of date. Just email ${CONTACT.email} and we will respond within a reasonable period — usually within 30 days.`,
      'We may need to verify who you are before we release information, and in rare cases we may be unable to provide access. If that happens, we will explain why in writing.',
    ],
  },
  {
    id: 'complaints',
    nav: 'Complaints',
    icon: MessageSquareExclamationPoint,
    title: 'Complaints',
    body: [
      `If you think we have mishandled your personal information, please tell us first — email ${CONTACT.email} with the details and we will look into it and come back to you.`,
      { oaic: true },
    ],
  },
]

/* The contact block closes the page, and belongs in the rail with the rest. */
const CONTACT_SECTION = { id: 'contact-details', nav: 'Contact us' }
const RAIL = [...SECTIONS.map(({ id, nav }) => ({ id, nav })), CONTACT_SECTION]

/* ───────── Contents rail ───────── */
function Contents({ active }) {
  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">On this page</p>
      <ul className="mt-4 space-y-0.5 border-l border-line">
        {RAIL.map(({ id, nav }) => {
          const on = active === id
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={on ? 'true' : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-[14.5px] transition-[color,border-color] duration-300 ${
                  on ? 'border-brand-blue font-semibold text-ink' : 'border-transparent text-muted hover:border-ink/20 hover:text-ink'
                }`}
              >
                {nav}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function useActiveSection() {
  const [active, setActive] = useState(RAIL[0].id)
  useEffect(() => {
    const els = RAIL.map(({ id }) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-140px 0px -60% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

/* ───────── Body copy ───────── */
function Paragraph({ block }) {
  if (typeof block === 'string') {
    return <p className="mt-4 text-[16.5px] leading-[1.75] text-muted">{block}</p>
  }
  if (block.oaic) {
    return (
      <p className="mt-4 text-[16.5px] leading-[1.75] text-muted">
        If you are not happy with how we have handled it, you can take the matter to the Office of the Australian
        Information Commissioner at{' '}
        <a href={OAIC} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-deep underline-offset-4 hover:underline">
          oaic.gov.au
        </a>
        .
      </p>
    )
  }
  return (
    <ul className="mt-4 space-y-3">
      {block.list.map((item) => (
        <li key={item} className="flex gap-3 text-[16.5px] leading-[1.75] text-muted">
          <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Section({ section, index }) {
  const { id, title, body, icon: Icon } = section
  return (
    <section id={id} className="scroll-mt-32 border-t border-line pt-9 first:border-t-0 first:pt-0">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white text-brand-blue">
            <Icon size={18} />
          </span>
          <span className="text-[13px] font-semibold tabular-nums text-muted">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h2 className="mt-4 text-[25px] font-semibold tracking-[-0.03em] text-ink md:text-[29px]">{title}</h2>
        {body.map((block, i) => (
          <Paragraph key={i} block={block} />
        ))}
      </Reveal>
    </section>
  )
}

/* ───────── Contact card (section 9 on the source page) ───────── */
function ContactCard() {
  const rows = [
    { icon: Phone, label: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, label: `Simply ICT, ${CONTACT.location}, Australia` },
  ]
  return (
    <section id={CONTACT_SECTION.id} className="mt-12 scroll-mt-32">
      <Reveal className="overflow-hidden rounded-[26px] border border-line bg-paper p-7 md:p-9">
        <h2 className="text-[25px] font-semibold tracking-[-0.03em] text-ink md:text-[29px]">Contact us</h2>
        <p className="mt-3 max-w-xl text-[16.5px] leading-[1.75] text-muted">
          Any question about this policy, or about the information we hold for you, reaches a real person here:
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {rows.map(({ icon: Icon, label, href }) => {
            const inner = (
              <>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-white text-brand-blue">
                  <Icon size={15} />
                </span>
                <span className="break-words text-[15px] font-semibold text-ink">{label}</span>
              </>
            )
            return (
              <li key={label} className={href ? '' : 'sm:col-span-2'}>
                {href ? (
                  <a
                    href={href}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-white px-3.5 py-3 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-[0_16px_32px_-22px_rgba(59,130,246,.6)]"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-3.5 py-3">{inner}</div>
                )}
              </li>
            )
          })}
        </ul>
        <p className="mt-6 text-[14.5px] leading-relaxed text-muted">
          Office hours are {CONTACT.hours}. For anything urgent, calling is still the fastest way to reach us.
        </p>
      </Reveal>
    </section>
  )
}

export default function PrivacyPolicy() {
  const active = useActiveSection()

  return (
    <>
      <ScrollProgress />

      {/* intro — no photo banner, just the title, clear of the fixed navbar */}
      <section id="top" className="relative overflow-hidden bg-white pb-12 pt-32 md:pb-16 md:pt-40">
        <div
          className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,.14), transparent 70%)' }}
        />
        <div className="container-site relative">
          <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
            <a href="/" className="underline-offset-4 hover:text-ink hover:underline">Home</a>
            <span className="px-2 text-ink/25">/</span>
            <span className="text-ink">Privacy Policy</span>
          </nav>

          <Eyebrow className="mt-7">Legal</Eyebrow>
          <BlurText
            as="h1"
            text="Privacy Policy"
            className="h-display mt-4 text-[40px] sm:text-[52px] xl:text-[60px]"
          />
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-[17.5px] leading-relaxed text-muted">
              Plain English, no small print. This page sets out what we collect, why we collect it, who sees it and
              how you can get it changed or removed.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-1.5 text-[13px] font-medium text-muted">
                Last updated {UPDATED}
              </span>
              <a
                href={PRIVACY_ACT}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-blue/40"
              >
                <Scale size={13} className="text-brand-blue" />
                Australian Privacy Principles
                <ArrowUpRight size={13} className="text-muted transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* policy */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 xl:gap-24">
            <Contents active={active} />
            <div className="max-w-[720px]">
              <div className="space-y-9">
                {SECTIONS.map((section, i) => (
                  <Section key={section.id} section={section} index={i} />
                ))}
              </div>
              <ContactCard />
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Questions about this page?"
        sub="Get in touch and we’ll happily talk you through it."
        primaryLabel={`Email ${CONTACT.email}`}
        primaryHref={`mailto:${CONTACT.email}`}
      />
    </>
  )
}
