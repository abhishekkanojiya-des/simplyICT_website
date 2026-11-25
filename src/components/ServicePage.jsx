import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ChevronRight } from 'lucide-react'
import { CTA } from '../sections/CTAFooter'
import { BlurText, Button, Counter, Eyebrow, EASE, Reveal, ScrollProgress } from './ui'
import HeroDots from './HeroDots'
import { STATS } from '../data/content'

/* ─────────────────────────────────────────────────────────────
   Shared service-page template (Managed IT, Web, Hardware …)
   - full-bleed photo banner with oversized title
   - services as sticky cards that stack one on top of another
   - "why" block with photo cards + stats
   - closing CTA
   Each page passes a `page` config — see src/pages/*.jsx.
   ───────────────────────────────────────────────────────────── */

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

export function PageHero({ page, next = '#explore' }) {
  const { crumb, tagline, title, hero } = page
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
          src={hero.img}
          alt=""
          initial={reduce ? false : { scale: 1.18 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 2.2, ease: EASE }}
          className="h-full w-full object-cover"
          style={{ objectPosition: hero.focus || 'center' }}
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
            <li aria-current="page" className="text-white/85">{crumb}</li>
          </ol>
        </motion.nav>

        <motion.p
          {...fade(0.2)}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 text-[13px] font-medium text-white/85 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
          {tagline}
        </motion.p>

        <div className="mt-5 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h1 className="font-display text-[44px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[60px] lg:text-[72px] xl:text-[84px]">
            {title.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                <MaskedWord delay={0.25 + i * 0.12}>{line}</MaskedWord>
              </span>
            ))}
          </h1>

          <div className="flex items-end gap-6 lg:max-w-[460px] lg:pb-3">
            <div>
              <motion.p {...fade(0.6)} className="text-left text-[16px] leading-relaxed text-white/75 md:text-[17px]">
                {hero.text}
              </motion.p>
              <motion.div {...fade(0.72)} className="mt-6 flex flex-wrap gap-3">
                <Button href={hero.ctaHref || '#contact'}>{hero.cta || 'Book a free consultation'}</Button>
              </motion.div>
            </div>
            <motion.a
              href={next}
              aria-label="Scroll down"
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

/* ───────── Why: statement + photo cards + stats ───────── */
function Why({ why }) {
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
            <Eyebrow>{why.eyebrow}</Eyebrow>
            <BlurText
              as="h2"
              text={why.title}
              className="h-display mt-5 max-w-[15ch] text-[35px] sm:text-[44px] xl:text-[50px]"
            />
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">{why.text}</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <Button href="#contact">{why.cta || 'Book a free consultation'}</Button>
            </Reveal>
          </div>

          <div>
            <div className="grid gap-3 sm:grid-cols-3">
              {why.pillars.map(({ icon: Icon, label, img, alt, focus }, i) => (
                <Reveal key={label} delay={0.1 + i * 0.07} className="h-full">
                  <div className="group h-full overflow-hidden rounded-2xl border border-line bg-paper p-2 transition-[transform,background-color,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-brand-blue/25 hover:bg-white hover:shadow-[0_18px_36px_-24px_rgba(11,18,32,.4)]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <img
                        src={img}
                        alt={alt}
                        loading="lazy"
                        style={{ objectPosition: focus || 'center' }}
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
  const { icon: Icon, title, img, focus = 'center', alt, chip } = service
  const imgScale = useTransform(enter, [0, 1], [1.18, 1])
  const imgY = useTransform(enter, [0, 1], ['-6%', '0%'])

  return (
    <div className="relative h-full min-h-[300px] overflow-hidden sm:min-h-[360px]">
      <motion.img
        src={img}
        alt={alt}
        loading="lazy"
        style={reduce ? { objectPosition: focus } : { scale: imgScale, y: imgY, objectPosition: focus }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050912]/75 via-[#050912]/10 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply" aria-hidden="true" />

      {/* floating highlight */}
      {chip && (
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
            {chip}
          </motion.div>
        </motion.div>
      )}

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
            <Button href="#contact">Learn more</Button>
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

function Explore({ explore, services }) {
  const deck = useRef(null)
  const { scrollYProgress } = useScroll({ target: deck, offset: ['start start', 'end end'] })
  const n = services.length

  return (
    <section id="explore" className="relative bg-paper pb-20 pt-20 md:pb-10 md:pt-28">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Explore</Eyebrow>
          <BlurText
            as="h2"
            text={explore.title}
            className="h-display mt-4 text-[36px] sm:text-[46px] md:text-[56px]"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted md:text-[17.5px]">{explore.text}</p>
          </Reveal>
        </div>

        <div ref={deck} className="mx-auto mt-12 flex max-w-[1180px] flex-col gap-6 md:mt-4 md:gap-0">
          {services.map((service, i) => (
            <StackedServiceCard key={service.id} service={service} index={i} total={n} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ServicePage({ page }) {
  return (
    <>
      <ScrollProgress />
      <PageHero page={page} />
      <Explore explore={page.explore} services={page.services} />
      <Why why={page.why} />
      <CTA {...page.cta} />
    </>
  )
}
