import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import HeroDots from '../components/HeroDots'
import { ArrowUp, ArrowUpRight, Phone } from 'lucide-react'
import { CONTACT } from '../data/content'
import { Logo, Reveal, EASE } from '../components/ui'

/* ───────── CTA: compact brand-gradient bar — text left, buttons right ───────── */
export function CTA({
  title = 'Ready to simplify your technology?',
  sub = 'Free, no-obligation advice from a local team.',
  primaryLabel = 'Book a free consultation',
}) {
  const reduce = useReducedMotion()
  return (
    <section id="contact" className="relative" style={{ background: 'linear-gradient(to bottom, #ffffff 50%, #07101f 50%)' }}>
      <div className="container-site">
        <Reveal y={40}>
          <div
            className="relative isolate overflow-hidden rounded-[28px] px-7 py-10 text-white shadow-[0_24px_60px_-28px_rgba(59,130,246,.6)] sm:px-10 md:px-14 md:py-12"
            style={{ background: 'linear-gradient(120deg, #1d4ed8 0%, #2563eb 45%, #0891b2 100%)' }}
          >
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              aria-hidden="true"
              style={{ background: 'radial-gradient(50% 90% at 30% 0%, rgba(255,255,255,.14), transparent 70%), linear-gradient(to top, rgba(7,16,31,.3), transparent 70%)' }}
            />
            <HeroDots
              reduce={!!reduce}
              gap={20}
              base="255,255,255"
              hoverRgb="255,255,255"
              boost={1.6}
              mask="linear-gradient(90deg, transparent 0%, transparent 35%, #000 70%)"
            />
            <motion.svg
              viewBox="0 0 40 40"
              className="pointer-events-none absolute -bottom-16 left-[56%] hidden h-[200px] w-[200px] opacity-[0.06] lg:block"
              animate={reduce ? undefined : { rotate: [0, 6, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <rect x="2" y="2" width="36" height="36" rx="10" fill="none" stroke="#fff" strokeWidth="1" />
              <path d="M13 27l10-13 4 6 6-8" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[36px] md:text-[40px]">
                  {title}
                </h2>
                <p className="mt-2 text-[16.5px] text-white/85">{sub}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group inline-flex items-center justify-between gap-3 rounded-full bg-white py-2.5 pl-6 pr-2.5 text-[15px] font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(7,16,31,.5)] transition-transform hover:-translate-y-0.5"
                >
                  {primaryLabel}
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white">
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 px-6 py-3 text-[15px] font-semibold transition-colors hover:bg-white/10"
                >
                  <Phone size={16} /> {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── Footer ───────── */
const COLS = [
  {
    h: 'Services',
    links: [
      { label: 'Managed IT Services', href: '/managed-it-services' },
      { label: 'Web Services', href: '/web-services' },
      { label: 'Hardware & Infrastructure', href: '/hardware' },
      { label: 'AI Services', href: '/ai-services' },
    ],
  },
  {
    h: 'Company',
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Our Team', href: '/our-team' },
      { label: 'Contact Us', href: '/contact-us' },
    ],
  },
  {
    h: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/#top' },
      { label: 'Terms of Service', href: '/#top' },
    ],
  },
]

function BrisbaneClock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Brisbane', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{t}</span>
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      {/* subtle brand glow + dot texture */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(45% 60% at 0% 100%, rgba(59,130,246,.28), transparent 70%), radial-gradient(40% 55% at 100% 100%, rgba(34,211,238,.16), transparent 70%), radial-gradient(50% 40% at 60% 0%, rgba(255,255,255,.05), transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(rgba(147,197,253,.35) 1px, transparent 1.2px)',
          backgroundSize: '14px 14px',
          WebkitMaskImage: 'linear-gradient(transparent, #000)',
          maskImage: 'linear-gradient(transparent, #000)',
        }}
      />

      <div className="container-site relative pt-20 md:pt-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/55">
              Making technology human for over 30 years. One trusted, Australian-owned partner for everything IT.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <p className="text-[13.5px] text-white/45">{c.h}</p>
              <ul className="mt-5 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[19px] font-semibold tracking-[-0.02em] text-white transition-colors hover:text-brand-cyan">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <p className="text-[13.5px] text-white/45">Get in touch</p>
            <ul className="mt-5 space-y-2.5">
              <li><a href={CONTACT.phoneHref} className="text-[19px] font-semibold tracking-[-0.02em] hover:text-brand-cyan">{CONTACT.phone}</a></li>
              <li><a href={`mailto:${CONTACT.email}`} className="break-all text-[17px] font-semibold tracking-[-0.02em] hover:text-brand-cyan">{CONTACT.email}</a></li>
              <li className="pt-1 text-[15px] text-white/55">{CONTACT.location}<br />{CONTACT.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 py-6 text-[14px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Simply ICT. All rights reserved.</p>
          <p>
            North Lakes, QLD <span className="text-white/35">→</span> <BrisbaneClock />
          </p>
          <a href="#top" className="group inline-flex items-center gap-1.5 font-medium text-brand-cyan hover:text-white">
            Back to top <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* giant wordmark, cut off at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="pointer-events-none relative -mb-[5vw] select-none text-center"
        aria-hidden="true"
      >
        <span
          className="block whitespace-nowrap text-[20.5vw] font-bold leading-[0.85] tracking-[-0.06em]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,.22) 0%, rgba(191,219,254,.1) 45%, rgba(59,130,246,0) 85%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          SimplyICT
        </span>
      </motion.div>
    </footer>
  )
}
