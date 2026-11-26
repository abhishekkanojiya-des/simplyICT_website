import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { STATS, WHY, PROCESS } from '../data/content'
import { BlurText, Button, Counter, Eyebrow, Reveal, SectionHead } from '../components/ui'

/* ───────── Track record: centred heading + bordered stat grid ───────── */
export function StatsBand() {
  return (
    <section aria-labelledby="stats-title" className="relative pb-4 pt-20 md:pb-6 md:pt-28">
      <div className="container-site">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>Our track record</Eyebrow>
            <BlurText as="h2" text="Trusted to keep businesses running" className="h-display mt-4 max-w-[16ch] text-[36px] sm:text-[48px] md:text-[56px]" />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[16.5px] leading-relaxed text-muted lg:ml-auto">
              Three decades of keeping Australian businesses secure, online and moving forward — with local support you can reach.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="relative flex min-h-[170px] flex-col items-center justify-center bg-white px-4 py-10 text-center md:min-h-[200px]"
              >
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  className="block text-[42px] font-semibold leading-none tracking-[-0.04em] text-ink md:text-[54px]"
                />
                <p className="mt-3 text-[15px] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── Why us: sticky heading + editorial list ───────── */
export function WhyUs() {
  const ref = useRef(null)
  // turns dark while the section fills most of the screen, back to white as you leave
  const dark = useInView(ref, { amount: 0.35 })
  const t = 'transition-colors duration-700 ease-out'
  return (
    <section id="why" ref={ref} className={`section ${t} ${dark ? 'bg-navy' : 'bg-white'}`}>
      <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            dark={dark}
            eyebrow="The Simply ICT difference"
            title="IT that feels simple, because it’s done properly"
            sub="For over 30 years we’ve made technology human. That means clear advice, plain language and support you can actually reach."
          />
        </div>
        <ul className={`border-t ${t} ${dark ? 'border-white/10' : 'border-line'}`}>
          {WHY.map(({ icon: Icon, title, desc }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 0.06}
              className={`group grid grid-cols-[auto_1fr] gap-5 border-b py-8 md:gap-8 md:py-10 ${t} ${dark ? 'border-white/10' : 'border-line'}`}
            >
              <span
                className={`relative grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border transition-[border-color,color,box-shadow,transform] duration-500 group-hover:-translate-y-0.5 group-hover:border-transparent group-hover:text-white group-hover:shadow-[0_10px_26px_-12px_rgba(59,130,246,.7)] ${
                  dark ? 'border-white/15 text-brand-cyan' : 'border-line text-brand-blue'
                }`}
              >
                {/* gradient fill fades in on hover only */}
                <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'var(--brand-gradient)' }} />
                <Icon size={24} className="relative" />
              </span>
              <div>
                <h3 className={`text-[22px] font-semibold tracking-[-0.02em] md:text-[26px] ${t} ${dark ? 'text-white' : 'text-ink'}`}>{title}</h3>
                <p className={`mt-2 max-w-xl text-[16.5px] leading-relaxed ${t} ${dark ? 'text-white/60' : 'text-muted'}`}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────── Process: light step cards with progress dots ───────── */
const G = { background: 'var(--brand-gradient)' }

function Dots({ filled, total = 4 }) {
  return (
    <span className="flex items-center gap-1.5" aria-label={`Step ${filled} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`h-2 w-2 rounded-full ${i < filled ? '' : 'bg-line'}`} style={i < filled ? G : undefined} />
      ))}
    </span>
  )
}

export function Process({ bg = 'bg-white', card = 'bg-[#f7f9fc]' }) {
  return (
    <section id="process" className={`section ${bg}`}>
      <div className="container-site">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>How we start</Eyebrow>
            <BlurText as="h2" text="From first call to full support." className="h-display mt-4 max-w-[16ch] text-[36px] sm:text-[46px] md:text-[54px]" />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[16.5px] leading-relaxed text-muted lg:ml-auto">
              A simple, four-step process — clear advice up front, a smooth rollout, and ongoing support that keeps everything healthy.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="h-full">
              <article className={`group flex h-full min-h-[210px] flex-col rounded-[22px] border border-[#e8edf5] ${card} p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:bg-white hover:shadow-[0_18px_40px_-24px_rgba(59,130,246,.5)]`}>
                <div className="flex items-center justify-between">
                  <Dots filled={i + 1} />
                  <span className="text-[15px] font-medium tabular-nums text-muted">{s.n}</span>
                </div>
                <h3 className="mt-auto pt-12 text-[21px] font-semibold tracking-[-0.02em] text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Button href="/contact-us">Book a free consultation</Button>
        </Reveal>
      </div>
    </section>
  )
}
