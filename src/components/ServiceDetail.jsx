import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, ChevronRight } from 'lucide-react'
import { CTA } from '../sections/CTAFooter'
import { BlurText, Button, Eyebrow, EASE, Reveal, ScrollProgress } from './ui'
import HeroDots from './HeroDots'

/* ─────────────────────────────────────────────────────────────
   Shared template for a single service detail page
   (the sub-pages that sit under /managed-it-services/…).

   Rhythm — deliberately different from the hub page so the two
   never feel like the same screen twice:
     1. hero        full-bleed photo, oversized title, glance bar
     2. overview    editorial photo + fact ledger
     3. includes    2×2 bento of “what’s included”
     4. <children>  one bespoke section per page
     5. checklist   navy band — everything in the service
     6. related     the sibling services
     7. cta         shared brand-gradient bar
   Each page passes a `page` config — see src/pages/managed/*.jsx
   ───────────────────────────────────────────────────────────── */

export const RISE = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, ease: EASE, delay },
})

/* Shared section heading, so bespoke sections match the template */
export function DetailHead({ eyebrow, title, text, center = false, dark = false, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <BlurText
        as="h2"
        text={title}
        className={`h-display mt-4 text-[32px] sm:text-[40px] md:text-[46px] ${dark ? '!text-white' : ''}`}
      />
      {text && (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 text-[16.5px] leading-relaxed ${dark ? 'text-white/65' : 'text-muted'} ${
              center ? 'mx-auto max-w-xl' : 'max-w-xl'
            }`}
          >
            {text}
          </p>
        </Reveal>
      )}
    </div>
  )
}

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

/* ───────── 1. Hero ───────── */
function DetailHero({ page }) {
  const { parent, crumb, tagline, title, kicker, hero, glance = [] } = page
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex h-[80svh] min-h-[620px] max-h-[820px] flex-col justify-end overflow-hidden bg-navy text-white"
    >
      <motion.div style={{ y: reduce ? 0 : imageY }} className="absolute inset-0 -bottom-[16%]" aria-hidden="true">
        <motion.img
          src={hero.img}
          alt=""
          initial={reduce ? false : { scale: 1.16 }}
          animate={{ scale: 1.03 }}
          transition={{ duration: 2.2, ease: EASE }}
          className="h-full w-full object-cover"
          style={{ objectPosition: hero.focus || 'center' }}
        />
      </motion.div>

      {/* readability overlays */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: 'linear-gradient(90deg, rgba(5,9,18,.82) 0%, rgba(5,9,18,.5) 48%, rgba(5,9,18,.28) 100%)' }}
      />
      <div
        className="absolute inset-x-0 top-0 h-44"
        aria-hidden="true"
        style={{ background: 'linear-gradient(rgba(5,9,18,.65), transparent)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[58%]"
        aria-hidden="true"
        style={{ background: 'linear-gradient(transparent, rgba(5,9,18,.94))' }}
      />

      <HeroDots reduce={!!reduce} gap={28} boost={0.6} />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-site relative pb-10 pt-32 md:pb-14"
      >
        <motion.nav aria-label="Breadcrumb" {...fade(0.1)}>
          <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/55">
            <li>
              <a href="/" className="transition-colors hover:text-white">Home</a>
            </li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li>
              <a href={parent.href} className="transition-colors hover:text-white">{parent.label}</a>
            </li>
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
          <div>
            <h1 className="font-display text-[42px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[58px] lg:text-[68px] xl:text-[78px]">
              {title.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  <MaskedWord delay={0.25 + i * 0.12}>{line}</MaskedWord>
                </span>
              ))}
            </h1>
            {kicker && (
              <motion.p
                {...fade(0.5)}
                className="mt-5 max-w-[30ch] text-[19px] font-medium leading-snug text-white sm:text-[21px]"
              >
                {kicker}
              </motion.p>
            )}
          </div>

          <div className="flex items-end gap-6 lg:max-w-[440px] lg:pb-2">
            <div>
              <motion.p {...fade(0.6)} className="text-[16px] leading-relaxed text-white/75 md:text-[17px]">
                {hero.text}
              </motion.p>
              <motion.div {...fade(0.72)} className="mt-6 flex flex-wrap gap-3">
                <Button href={hero.ctaHref || '/contact-us'}>{hero.cta || 'Book a free consultation'}</Button>
              </motion.div>
            </div>
            <motion.a
              href="#overview"
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

      {/* glance bar pinned to the foot of the hero */}
      {glance.length > 0 && (
        <motion.div {...fade(0.9)} className="relative border-t border-white/10 bg-white/[0.04] backdrop-blur-md">
          <div className="container-site">
            <dl className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {glance.map(({ icon: Icon, k, v }) => (
                <div key={k} className="flex items-center gap-3.5 py-4 sm:px-6 sm:py-5 sm:first:pl-0 sm:last:pr-0">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/[0.07] text-brand-cyan">
                    <Icon size={18} />
                  </span>
                  <div>
                    <dt className="text-[12px] uppercase tracking-[0.1em] text-white/45">{k}</dt>
                    <dd className="text-[15px] font-semibold text-white">{v}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      )}
    </section>
  )
}

/* ───────── 2. Overview: editorial photo + fact ledger ───────── */
function Overview({ overview }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="overview" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -left-56 top-24 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.15), transparent 70%)' }}
      />
      <div className="container-site relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* photo */}
          <Reveal y={40}>
            <div ref={ref} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] border border-line">
                <motion.img
                  src={overview.img}
                  alt={overview.alt}
                  loading="lazy"
                  style={
                    reduce
                      ? { objectPosition: overview.focus || 'center' }
                      : { y: imgY, objectPosition: overview.focus || 'center' }
                  }
                  className="absolute inset-0 h-[112%] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050912]/60 via-transparent to-transparent" aria-hidden="true" />
              </div>
              {overview.badge && (
                <motion.div
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-7 left-5 right-5 rounded-2xl border border-line bg-white/95 p-5 shadow-[0_26px_60px_-30px_rgba(11,18,32,.5)] backdrop-blur sm:left-8 sm:right-auto sm:max-w-[300px]"
                >
                  <p className="font-display text-[30px] font-semibold leading-none tracking-[-0.04em]">
                    <span className="gradient-text">{overview.badge.value}</span>
                  </p>
                  <p className="mt-2 text-[14px] leading-snug text-muted">{overview.badge.label}</p>
                </motion.div>
              )}
            </div>
          </Reveal>

          {/* text */}
          <div className={overview.badge ? 'pt-6 lg:pl-4 lg:pt-0' : 'lg:pl-4'}>
            <Eyebrow>{overview.eyebrow}</Eyebrow>
            <BlurText
              as="h2"
              text={overview.title}
              className="h-display mt-5 max-w-[20ch] text-[33px] sm:text-[42px] xl:text-[48px]"
            />
            <div className="mt-5 space-y-4">
              {overview.body.map((p, i) => (
                <Reveal key={i} delay={0.12 + i * 0.08}>
                  <p className="max-w-xl text-[16.5px] leading-relaxed text-muted">{p}</p>
                </Reveal>
              ))}
            </div>

            {overview.facts?.length > 0 && (
              <Reveal delay={0.2}>
                <dl className="mt-9 max-w-xl border-t border-line">
                  {overview.facts.map((f) => (
                    <div key={f.k} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                      <dt className="flex items-center gap-2.5 text-[14.5px] text-muted">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: 'var(--brand-gradient)' }} />
                        {f.k}
                      </dt>
                      <dd className="text-right text-[15px] font-semibold text-ink">{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}

            <Reveal delay={0.24} className="mt-9">
              <Button href="/contact-us">{overview.cta || 'Talk to us'}</Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────── 3. Includes: 2×2 bento ───────── */
function Includes({ includes }) {
  return (
    <section id="included" className="section bg-paper">
      <div className="container-site">
        <DetailHead eyebrow={includes.eyebrow || 'What you get'} title={includes.title} text={includes.text} center />

        <div className="mx-auto mt-12 grid max-w-[1120px] gap-4 md:grid-cols-2">
          {includes.items.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={0.08 * i} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[26px] border border-line bg-white p-7 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-brand-blue/30 hover:shadow-[0_30px_64px_-36px_rgba(11,18,32,.5)] sm:p-9">
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-3 font-display text-[66px] font-bold leading-none text-ink/[0.045] transition-colors duration-500 group-hover:text-brand-blue/[0.12]"
                >
                  0{i + 1}
                </span>
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-[0_14px_28px_-14px_rgba(59,130,246,.9)] transition-transform duration-500 group-hover:scale-110"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  <Icon size={21} />
                </span>
                <h3 className="relative mt-6 text-[20px] font-semibold tracking-[-0.025em] text-ink sm:text-[22px]">{title}</h3>
                <span
                  aria-hidden="true"
                  className="mt-3 block h-[2px] w-10 origin-left rounded-full transition-transform duration-500 group-hover:scale-x-[2.8]"
                  style={{ background: 'var(--brand-gradient)' }}
                />
                <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-muted">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── 5. Checklist: navy band ───────── */
function Checklist({ checklist }) {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(45% 55% at 100% 0%, rgba(34,211,238,.18), transparent 70%), radial-gradient(40% 50% at 0% 100%, rgba(59,130,246,.22), transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(rgba(147,197,253,.3) 1px, transparent 1.2px)',
          backgroundSize: '16px 16px',
          WebkitMaskImage: 'radial-gradient(70% 60% at 50% 50%, #000, transparent)',
          maskImage: 'radial-gradient(70% 60% at 50% 50%, #000, transparent)',
        }}
      />
      <div className="container-site relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <DetailHead eyebrow={checklist.eyebrow || 'In the box'} title={checklist.title} text={checklist.text} dark />
            <ul className="mt-9 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {checklist.items.map((item, i) => (
                <Reveal as="li" key={item} delay={0.06 * i} y={18} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: 'var(--brand-gradient)' }}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-[15.5px] font-medium leading-snug text-white/90">{item}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2} className="mt-10">
              <Button href="/contact-us" variant="ghostDark">{checklist.cta || 'Ask what fits your business'}</Button>
            </Reveal>
          </div>

          <Reveal y={40}>
            <div className="relative">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[30px] border border-white/10">
                <img
                  src={checklist.img}
                  alt={checklist.alt}
                  loading="lazy"
                  style={{ objectPosition: checklist.focus || 'center' }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050912]/70 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply" aria-hidden="true" />
              </div>
              <motion.div
                animate={reduce ? undefined : { y: [0, -7, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-5 left-6 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-ink shadow-[0_18px_34px_-16px_rgba(2,6,23,.7)]"
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full align-middle" style={{ background: 'var(--brand-gradient)' }} />
                {checklist.chip || 'Included as standard'}
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ───────── 6. Related: the sibling services ───────── */
function Related({ page }) {
  const siblings = page.family.filter((s) => s.id !== page.id)
  /* Families differ in size (4, 5 or 6 services), so fit the row to the
     count rather than leaving one card stranded on a second line. */
  const cols =
    { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }[siblings.length] || 'lg:grid-cols-4'
  return (
    <section className="section bg-white">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <DetailHead eyebrow="Keep exploring" title={page.relatedTitle || 'The rest of the service'} />
          <Reveal delay={0.1}>
            <Button href={page.parent.href} variant="outline">All {page.parent.label}</Button>
          </Reveal>
        </div>

        <div className={`mt-11 grid gap-4 sm:grid-cols-2 ${cols}`}>
          {siblings.map((s, i) => (
            <Reveal key={s.id} delay={0.07 * i} className="h-full">
              <a
                href={s.href}
                className="group flex h-full flex-col rounded-[22px] border border-line bg-paper p-6 transition-[transform,background-color,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-brand-blue/30 hover:bg-white hover:shadow-[0_24px_52px_-32px_rgba(11,18,32,.45)]"
              >
                {/* outlined by default; the white layer fades out so the
                    gradient fills the tile on hover */}
                <span
                  className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-line text-brand-blue transition-[color,border-color,box-shadow] duration-500 group-hover:border-transparent group-hover:text-white group-hover:shadow-[0_12px_24px_-14px_rgba(59,130,246,.9)]"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-white transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <s.icon size={19} className="relative" />
                </span>
                <h3 className="mt-5 text-[17.5px] font-semibold leading-snug tracking-[-0.02em] text-ink">{s.title}</h3>
                <p className="mt-2.5 line-clamp-3 text-[14.5px] leading-relaxed text-muted">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold">
                  <span className="gradient-text">Learn more</span>
                  <ArrowUpRight
                    size={15}
                    className="text-brand-blue transition-transform duration-300 group-hover:rotate-45"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── page shell ───────── */
export default function ServiceDetail({ page, children }) {
  return (
    <>
      <ScrollProgress />
      <DetailHero page={page} />
      <Overview overview={page.overview} />
      <Includes includes={page.includes} />
      {children}
      <Checklist checklist={page.checklist} />
      <Related page={page} />
      <CTA {...page.cta} />
    </>
  )
}
