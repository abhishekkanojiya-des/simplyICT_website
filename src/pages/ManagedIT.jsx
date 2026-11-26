import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  Activity, ArrowDown, ChevronRight, Compass, Headset,
} from 'lucide-react'
import { CTA } from '../sections/CTAFooter'
import { BlurText, Button, Counter, Eyebrow, EASE, Reveal } from '../components/ui'
import HeroDots from '../components/HeroDots'
import { MANAGED_IT_SERVICES, STATS } from '../data/content'
import heroImg from '../assets/services/managed-it.jpg'
import imgOnSite from '../assets/services/infrastructure.jpg'
// Photos from Unsplash (free under the Unsplash License):
// monitoring photo-1551288049-bebda4e38f71 · helpdesk photo-1766066014237-00645c74e9c6
// strategy photo-1581091877018-dac6a371d50f · co-managed photo-1580894899378-92e56886cd4d
// cybersecurity photo-1584433144859-1fc3ab64a957 · cloud photo-1667372283496-893f0b1e7c16
// consulting photo-1557804506-669a67965ba0
import imgMonitoring from '../assets/managed/monitoring.jpg'
import imgHelpdesk from '../assets/managed/helpdesk.jpg'
import imgStrategy from '../assets/managed/strategy.jpg'
import imgCoManaged from '../assets/managed/co-managed.jpg'
import imgCyber from '../assets/managed/cybersecurity.jpg'
import imgCloud from '../assets/managed/cloud.jpg'
import imgConsulting from '../assets/managed/consulting.jpg'

/* ─────────────────────────────────────────────────────────────
   Managed IT Services
   Content mirrors simplyict.com.au/managed-it-services, rebuilt
   in the homepage visual system:
   - full-bleed photo banner with oversized title
   - services as sticky cards that stack one on top of another
   ───────────────────────────────────────────────────────────── */

const PILLARS = [
  { icon: Activity, label: 'Round-the-clock monitoring', img: imgMonitoring, alt: 'Live system performance dashboard' },
  { icon: Headset, label: 'A helpdesk that actually answers', img: imgHelpdesk, alt: 'Support specialist wearing a headset at her desk' },
  { icon: Compass, label: 'Strategy that pays for itself', img: imgStrategy, alt: 'Two colleagues planning at a whiteboard' },
]

/* Per-service photo for the visual half of each stacked card */
const VISUALS = {
  'co-managed-it': { img: imgCoManaged, focus: '50% 35%', alt: 'Two colleagues working through a problem together at a computer', chip: 'Your team + our specialists' },
  cybersecurity: { img: imgCyber, focus: '50% 50%', alt: 'Smartphone showing a secured lock screen on a desk', chip: 'Layered protection' },
  'cloud-services': { img: imgCloud, focus: '50% 40%', alt: 'Secure cloud storage illustration', chip: 'Microsoft 365 · Azure' },
  'on-site-support': { img: imgOnSite, focus: '85% 55%', alt: 'Technician working on a server rack', chip: 'Urgent — within 4 hours' },
  'it-consulting': { img: imgConsulting, focus: '50% 50%', alt: 'Team planning a technology roadmap at a whiteboard', chip: 'Every IT dollar working' },
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-blue"
    />
  )
}

/* ───────── Hero: full-bleed banner ───────── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, ease: EASE, delay },
})

function MaskedWord({ children, delay }) {
  const reduce = useReducedMotion()
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span
        className="inline-block"
        initial={reduce ? { opacity: 0 } : { y: '105%' }}
        animate={reduce ? { opacity: 1 } : { y: '0%' }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function ManagedHero() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex h-[70svh] min-h-[540px] max-h-[720px] items-end overflow-hidden bg-navy text-white"
    >
      {/* photo */}
      <motion.div style={{ y: reduce ? 0 : imageY }} className="absolute inset-0 -bottom-[18%]" aria-hidden="true">
        <motion.img
          src={heroImg}
          alt=""
          initial={reduce ? false : { scale: 1.18 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 2.2, ease: EASE }}
          className="h-full w-full object-cover object-[68%_40%]"
        />
      </motion.div>

      {/* readability overlays */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: 'linear-gradient(90deg, rgba(5,9,18,.78) 0%, rgba(5,9,18,.45) 45%, rgba(5,9,18,.25) 100%)' }}
      />
      <div className="absolute inset-x-0 top-0 h-44" aria-hidden="true" style={{ background: 'linear-gradient(rgba(5,9,18,.6), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-[62%]" aria-hidden="true" style={{ background: 'linear-gradient(transparent, rgba(5,9,18,.92))' }} />

      <HeroDots reduce={!!reduce} gap={28} boost={0.6} />

      <motion.div style={reduce ? undefined : { y: contentY, opacity: contentOpacity }} className="container-site relative pb-12 md:pb-16">
        <motion.nav aria-label="Breadcrumb" {...fade(0.1)}>
          <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/55">
            <li><a href="/" className="transition-colors hover:text-white">Home</a></li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li aria-current="page" className="text-white/85">Managed IT Services</li>
          </ol>
        </motion.nav>

        <motion.p
          {...fade(0.2)}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 text-[13px] font-medium text-white/85 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
          Managed IT Services
        </motion.p>

        <div className="mt-5 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h1 className="font-display text-[44px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[60px] lg:text-[72px] xl:text-[84px]">
            <MaskedWord delay={0.25}>Managed&nbsp;IT</MaskedWord>
            <br />
            <MaskedWord delay={0.37}>Services</MaskedWord>
          </h1>

          <div className="flex items-end gap-6 lg:max-w-[460px] lg:pb-3">
            <div>
              <motion.p {...fade(0.6)} className="text-left text-[16px] leading-relaxed text-white/75 md:text-[17px]">
                Round-the-clock monitoring, a helpdesk that actually answers, and strategy that pays for itself — one
                partner for all of it, so your team can get on with work.
              </motion.p>
              <motion.div {...fade(0.72)} className="mt-6 flex flex-wrap gap-3">
                <Button href="/contact-us">Book a free consultation</Button>
              </motion.div>
            </div>
            <motion.a
              href="#explore"
              aria-label="Scroll to services"
              initial={{ opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, 7, 0] }}
              transition={{ opacity: { delay: 1.1 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
              className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-white/25 text-white/80 backdrop-blur transition-colors hover:border-white hover:text-white md:grid"
            >
              <ArrowDown size={20} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ───────── Intro: statement + pillars + stats ───────── */
function Intro() {
  return (
    <section className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -left-52 top-1/3 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.14), transparent 70%)' }}
      />
      <div className="container-site relative">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Why managed IT</Eyebrow>
            <BlurText
              as="h2"
              text="Your technology should never be the reason work stops."
              className="h-display mt-5 max-w-[15ch] text-[35px] sm:text-[44px] xl:text-[50px]"
            />
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">
                When systems slow down or go offline, your whole team feels it. We keep your technology secure, supported
                and running smoothly — so your people can focus on the work that grows your business.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <Button href="/contact-us">Book a free consultation</Button>
            </Reveal>
          </div>

          <div>
            <div className="grid gap-3 sm:grid-cols-3">
              {PILLARS.map(({ icon: Icon, label, img, alt }, i) => (
                <Reveal key={label} delay={0.1 + i * 0.07} className="h-full">
                  <div className="group h-full overflow-hidden rounded-2xl border border-line bg-paper p-2 transition-[transform,background-color,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-brand-blue/25 hover:bg-white hover:shadow-[0_18px_36px_-24px_rgba(11,18,32,.4)]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <img
                        src={img}
                        alt={alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
                    </div>
                    <div className="relative px-3 pb-4">
                      <span
                        className="-mt-5 grid h-10 w-10 place-items-center rounded-xl text-white shadow-[0_10px_22px_-12px_rgba(59,130,246,.9)] ring-4 ring-paper transition-[transform,box-shadow] duration-500 group-hover:scale-110 group-hover:ring-white"
                        style={{ background: 'var(--brand-gradient)' }}
                      >
                        <Icon size={18} />
                      </span>
                      <p className="mt-3 text-[14.5px] font-semibold leading-snug text-ink">{label}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-10">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-white px-4 py-6 text-center">
                    <Counter
                      value={s.value}
                      suffix={s.suffix}
                      decimals={s.decimals}
                      className="block text-[28px] font-semibold leading-none tracking-[-0.04em] text-ink md:text-[32px]"
                    />
                    <p className="mt-2 text-[12.5px] text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────── Explore: stacked service cards ───────── */
const rise = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
}

/* The right-hand photo of a card: zooms out as the card slides into place,
   with a service label and a floating highlight chip. */
function ServiceVisual({ service, enter }) {
  const reduce = useReducedMotion()
  const { icon: Icon, title, id } = service
  const visual = VISUALS[id]
  const imgScale = useTransform(enter, [0, 1], [1.18, 1])
  const imgY = useTransform(enter, [0, 1], ['-6%', '0%'])

  return (
    <div className="relative h-full min-h-[300px] overflow-hidden sm:min-h-[360px]">
      <motion.img
        src={visual.img}
        alt={visual.alt}
        loading="lazy"
        style={reduce ? { objectPosition: visual.focus } : { scale: imgScale, y: imgY, objectPosition: visual.focus }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050912]/75 via-[#050912]/10 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply" aria-hidden="true" />

      {/* floating highlight */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: -16 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.45 } } }}
        className="absolute right-5 top-5 sm:right-7 sm:top-7"
        aria-hidden="true"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-full bg-white px-4 py-2 text-[12.5px] font-semibold text-ink shadow-[0_16px_30px_-14px_rgba(2,6,23,.6)]"
        >
          <span className="mr-2 inline-block h-2 w-2 rounded-full align-middle" style={{ background: 'var(--brand-gradient)' }} />
          {visual.chip}
        </motion.div>
      </motion.div>

      {/* service label */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.3 } } }}
        className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/25 bg-white/[0.12] py-2.5 pl-2.5 pr-5 backdrop-blur-xl sm:bottom-7 sm:left-7"
        aria-hidden="true"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: 'var(--brand-gradient)' }}>
          <Icon size={19} />
        </span>
        <span className="text-[14px] font-semibold text-white">{title}</span>
      </motion.div>
    </div>
  )
}

function useIsDesktop(query = '(min-width: 768px)') {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setMatch(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])
  return match
}

function StackedServiceCard({ service, index, total, progress }) {
  const reduceMotion = useReducedMotion()
  const desktop = useIsDesktop()
  const reduce = reduceMotion || !desktop // the deck effect only runs where cards are sticky
  const wrap = useRef(null)
  const { title, desc, points, id } = service

  // how far this card has travelled into its sticky slot (0 → 1)
  const { scrollYProgress: enter } = useScroll({ target: wrap, offset: ['start end', 'start start'] })

  // once later cards slide over it, this one shrinks back into the deck
  const targetScale = 1 - (total - 1 - index) * 0.045
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])
  const shade = useTransform(progress, [index / total, 1], [0, (total - 1 - index) * 0.05])

  return (
    <div id={id} ref={wrap} className="md:sticky md:top-0 md:flex md:h-screen md:items-center">
      <motion.article
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        style={reduce ? undefined : { scale, top: `calc(${index} * 26px)` }}
        className="relative grid w-full origin-top overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_40px_80px_-46px_rgba(11,18,32,.5)] md:min-h-[540px] md:grid-cols-[1fr_1fr]"
      >
        {/* text half */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
          className="order-2 flex flex-col p-7 sm:p-9 md:order-1 lg:p-12"
        >
          <motion.div variants={rise} className="flex items-baseline gap-2 text-[13px] font-semibold text-muted">
            <span className="gradient-text text-[15px]">0{index + 1}</span>
            <span>/ 0{total}</span>
          </motion.div>
          <motion.h3 variants={rise} className="mt-4 text-[28px] font-semibold tracking-[-0.03em] text-ink md:text-[34px]">
            {title}
          </motion.h3>
          <motion.p variants={rise} className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-muted">
            {desc}
          </motion.p>

          <motion.hr variants={rise} className="my-7 border-line" />

          <motion.p variants={rise} className="text-[13.5px] text-muted">What’s included:</motion.p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2.5">
            {points.map((p) => (
              <motion.li variants={rise} key={p} className="flex items-center gap-2 text-[15.5px] font-medium text-ink">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: 'var(--brand-gradient)' }} />
                {p}
              </motion.li>
            ))}
          </ul>

          <motion.hr variants={rise} className="my-7 border-line" />

          <motion.div variants={rise} className="mt-auto">
            <Button href={service.href || "/contact-us"}>Learn more</Button>
          </motion.div>
        </motion.div>

        {/* visual half */}
        <div className="relative order-1 overflow-hidden md:order-2">
          <ServiceVisual service={service} enter={enter} />
        </div>

        {/* dims the card as it is buried in the deck */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: shade }}
            className="pointer-events-none absolute inset-0 bg-ink"
          />
        )}
      </motion.article>
    </div>
  )
}

function Explore() {
  const deck = useRef(null)
  const { scrollYProgress } = useScroll({ target: deck, offset: ['start start', 'end end'] })
  const n = MANAGED_IT_SERVICES.length

  return (
    <section id="explore" className="relative bg-paper pb-20 pt-20 md:pb-10 md:pt-28">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Explore</Eyebrow>
          <BlurText
            as="h2"
            text="Five ways we make IT feel simple"
            className="h-display mt-4 text-[36px] sm:text-[46px] md:text-[56px]"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted md:text-[17.5px]">
              Start wherever the friction is. Extend your team, tighten security, modernise the cloud, get on-site help
              or build the roadmap — we fill the gaps from there.
            </p>
          </Reveal>
        </div>

        <div ref={deck} className="mx-auto mt-12 flex max-w-[1180px] flex-col gap-6 md:mt-4 md:gap-0">
          {MANAGED_IT_SERVICES.map((service, i) => (
            <StackedServiceCard key={service.id} service={service} index={i} total={n} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ManagedIT() {
  return (
    <>
      <ScrollProgress />
      <ManagedHero />
      <Explore />
      <Intro />
      <CTA
        title="Ready to discuss your IT needs?"
        sub="Free consultation. No obligation. Just honest advice from people who genuinely care."
        primaryLabel="Get a free quote"
      />
    </>
  )
}
