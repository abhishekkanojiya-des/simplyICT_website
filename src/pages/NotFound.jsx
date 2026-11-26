import { motion, useReducedMotion } from 'framer-motion'
import { Mail, MapPinOff, Phone } from 'lucide-react'
import { BlurText, Button, EASE, Eyebrow, Reveal } from '../components/ui'
import HeroDots from '../components/HeroDots'
import { CONTACT } from '../data/content'

/* ─────────────────────────────────────────────────────────────
   404 — a wrong turn, not a dead end.
   App renders this for any path that doesn't match a page, so it
   also has to work when someone lands here from a stale link or a
   typo. No photo banner: the navbar is forced to its solid state
   for this route (see solidNav in App.jsx).
   ───────────────────────────────────────────────────────────── */

function LostMark() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative isolate overflow-hidden rounded-[30px] border border-line bg-navy px-6 py-12 text-center text-white sm:px-10 sm:py-14"
    >
      <HeroDots
        reduce={!!reduce}
        gap={22}
        base="255,255,255"
        hoverRgb="34,211,238"
        boost={1.5}
        mask="radial-gradient(70% 70% at 50% 50%, #000 20%, transparent 75%)"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{ background: 'radial-gradient(60% 80% at 50% 0%, rgba(59,130,246,.3), transparent 70%)' }}
      />
      <p className="relative font-display text-[clamp(96px,22vw,200px)] font-semibold leading-[0.85] tracking-[-0.06em]">
        <span className="gradient-text">404</span>
      </p>
      <p className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[13px] font-medium text-white/80 backdrop-blur">
        <MapPinOff size={14} className="text-brand-cyan" />
        Page not found
      </p>
    </motion.div>
  )
}

export default function NotFound() {
  return (
    <section id="top" className="section relative overflow-hidden bg-white pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-site relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
          {/* what happened, and what to do about it */}
          <div>
            <Eyebrow>Lost the thread</Eyebrow>
            <BlurText
              as="h1"
              text="This page has moved on, or never existed"
              className="h-display mt-4 max-w-[16ch] text-[38px] sm:text-[48px] xl:text-[58px]"
            />
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-lg text-[17.5px] leading-relaxed text-muted">
                The link may be out of date, or there might be a typo in the address. Nothing is broken at your
                end — and if you were following a link from our own site, we would genuinely like to know.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/" variant="brand">Back to the homepage</Button>
                <Button href="/contact-us" variant="outline">Tell us what you were after</Button>
              </div>
            </Reveal>

            {/* a phone number beats a search box when someone is already stuck */}
            <Reveal delay={0.28}>
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-7">
                <a
                  href={CONTACT.phoneHref}
                  className="group inline-flex items-center gap-2.5 text-[15px] font-semibold text-ink"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-brand-blue transition-colors duration-300 group-hover:border-brand-blue/40">
                    <Phone size={15} />
                  </span>
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group inline-flex items-center gap-2.5 text-[15px] font-semibold text-ink"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-brand-blue transition-colors duration-300 group-hover:border-brand-blue/40">
                    <Mail size={15} />
                  </span>
                  <span className="break-all">{CONTACT.email}</span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal y={40}>
            <LostMark />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
