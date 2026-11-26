import { motion } from 'framer-motion'
import { ChartLine, Gauge, Hourglass, MapPinned, ScanSearch, Search, Settings2 } from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { WEB_SERVICES } from '../../data/content'
import heroImg from '../../assets/web/seo.jpg'
import imgOverview from '../../assets/detail/seo-dashboard.jpg'
import imgChecklist from '../../assets/detail/seo-reports.jpg'

/* Content mirrors simplyict.com.au/web-services/seo-performance/ */

/* ───────── Added section: what the first 90 days look like ─────────
   SEO is the service clients are most often burned on, so set the
   expectation plainly: what we do, in what order, and when results
   realistically show up. */
const PHASES = [
  {
    icon: ScanSearch,
    tag: 'Days 1 – 30',
    lead: 'Find out where you actually stand',
    desc: 'No guessing and no recommendations until we have looked. This is the month that tells us what is worth doing.',
    items: ['Keyword & competitor research', 'Full technical audit', 'Analytics & Search Console set up properly', 'The quick technical fixes'],
  },
  {
    icon: MapPinned,
    tag: 'Days 31 – 60',
    lead: 'Fix the pages that matter',
    desc: 'Work moves to the handful of pages that bring in enquiries, and to the local searches your customers really use.',
    items: ['On-page optimisation', 'Local SEO & Google Business Profile', 'Schema markup & sitemaps', 'Speed & Core Web Vitals'],
  },
  {
    icon: ChartLine,
    tag: 'Days 61 – 90',
    lead: 'Measure, then do more of what works',
    desc: 'The first real data arrives. We report on it in plain English and put the next month where the movement is.',
    items: ['First full monthly reports', 'Rankings & traffic compared to day one', 'Content recommendations', 'The plan for the next quarter'],
  },
]

function FirstNinetyDays() {
  return (
    <section id="first-90-days" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -left-52 top-24 h-[500px] w-[500px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,.15), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="What to expect"
          title="Your first 90 days"
          text="SEO is the service people get burned on most, so here is the order we work in and when results realistically start to show."
          center
        />

        <div className="relative mt-14">
          <div
            className="absolute left-7 bottom-4 top-4 w-[2px] rounded-full lg:left-0 lg:right-0 lg:bottom-auto lg:top-7 lg:h-[2px] lg:w-auto"
            aria-hidden="true"
            style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,.9), rgba(34,211,238,.25))' }}
          />

          <ol className="relative grid gap-10 lg:grid-cols-3 lg:gap-6">
            {PHASES.map(({ icon: Icon, tag, lead, desc, items }, i) => (
              <motion.li
                key={tag}
                initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
                className="flex gap-5 lg:block"
              >
                <span
                  className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-[0_16px_32px_-16px_rgba(59,130,246,.95)] ring-[6px] ring-white"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  <Icon size={22} />
                </span>
                {/* a gentle staircase on desktop, so time reads left-to-right */}
                <div className={`lg:mt-7 ${i === 1 ? 'lg:pt-7' : ''} ${i === 2 ? 'lg:pt-14' : ''}`}>
                  <span className="inline-block rounded-full border border-line bg-paper px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-brand-deep">
                    {tag}
                  </span>
                  <h3 className="mt-4 text-[21px] font-semibold tracking-[-0.03em] text-ink sm:text-[23px]">{lead}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{desc}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                    {items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-ink/85">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: 'var(--brand-gradient)' }}
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.2} className="mt-14 lg:mt-20">
          <div className="flex flex-col gap-3 rounded-2xl border border-line bg-paper px-6 py-5 sm:flex-row sm:items-center sm:gap-5">
            <Hourglass size={20} className="shrink-0 text-brand-blue" />
            <p className="text-[14.5px] leading-relaxed text-muted">
              <span className="font-semibold text-ink">An honest word on timing.</span> Technical and speed fixes show up
              quickly. Rankings do not — search engines take months to re-evaluate a site, so meaningful movement
              normally lands somewhere between three and six months in. Anyone promising page one by next week is
              selling you something else.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'seo-performance',
  family: WEB_SERVICES,
  parent: { label: 'Web Services', href: '/web-services' },
  crumb: 'SEO & Performance',
  tagline: 'Web Services · SEO & Performance',
  title: ['SEO &', 'Performance'],
  kicker: 'Get found. Get results.',
  hero: {
    img: heroImg,
    focus: '40% 50%',
    text: 'Search optimisation, speed work and analytics that are reported in plain English — so customers find you first, and the visits you earn actually turn into enquiries.',
    cta: 'Book a free SEO audit',
  },
  glance: [
    { icon: Search, k: 'SEO', v: 'On-page, local & technical' },
    { icon: Gauge, k: 'Speed', v: 'Core Web Vitals fixed' },
    { icon: ChartLine, k: 'Reporting', v: 'Monthly, in plain English' },
  ],
  overview: {
    eyebrow: 'Why SEO',
    title: 'Being on Google is not the same as being found on Google.',
    body: [
      'Almost every site is indexed. Far fewer are on the first page for the handful of searches that actually bring in work. The gap between those two things is usually not a mystery — it is keywords nobody researched, a structure Google cannot read, and a site that takes four seconds to load on a phone.',
      'We start by finding out where you genuinely stand, fix the technical problems holding the site back, then improve the pages that matter for the searches your customers really type. Every month you get a short report that says what changed and what we are doing next — no jargon, no vanity metrics.',
    ],
    facts: [
      { k: 'Where we start', v: 'Keyword & competitor research' },
      { k: 'Technical SEO & schema', v: 'Included' },
      { k: 'Core Web Vitals', v: 'Measured & fixed' },
      { k: 'Reporting', v: 'Monthly' },
    ],
    badge: {
      value: 'Free audit',
      label: 'We will show you where you stand before you spend anything.',
    },
    img: imgOverview,
    alt: 'A website analytics dashboard open on a laptop',
    focus: '40% 50%',
    cta: 'Book a free SEO audit',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Four levers, pulled in the right order',
    text: 'Content, code, speed and measurement — fixing one without the others is where most SEO money goes to waste.',
    items: [
      {
        icon: MapPinned,
        title: 'On-page & local SEO',
        desc: 'Keywords your customers actually search for, page structure that matches them, and local search tuning so you show up when someone nearby is ready to buy.',
      },
      {
        icon: Settings2,
        title: 'Technical SEO',
        desc: 'Schema markup, sitemaps, indexing issues and Core Web Vitals — the unglamorous fixes that stop Google from misreading or ignoring your pages.',
      },
      {
        icon: ChartLine,
        title: 'Analytics & reporting',
        desc: 'Google Analytics and Search Console set up properly and summarised monthly, so you can see what search is bringing in rather than guessing at it.',
      },
      {
        icon: Gauge,
        title: 'Speed optimisation',
        desc: 'Image, caching and code improvements that cut load time — which helps your ranking and, more importantly, keeps impatient visitors on the page.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What the SEO work covers',
    text: 'An ongoing programme rather than a one-off fix, reviewed with you every month.',
    items: [
      'Keyword & competitor research',
      'On-page & local SEO',
      'Technical SEO & schema',
      'Speed & Core Web Vitals',
      'Monthly reports & recommendations',
      'Google Business Profile tuning',
    ],
    chip: 'Get found first',
    img: imgChecklist,
    alt: 'A printed traffic report showing visits, sources and top pages',
    focus: '50% 45%',
    cta: 'Start with the free audit',
  },
  relatedTitle: 'The rest of web services',
  cta: {
    title: 'Want to know where you stand on Google?',
    sub: 'Start with a free SEO audit — a clear, prioritised list of the opportunities in your current site.',
    primaryLabel: 'Book a free SEO audit',
  },
}

export default function SeoPerformance() {
  /* <FirstNinetyDays /> is built and ready but hidden for now — pass it as a
     child of ServiceDetail to bring the section back. */
  return <ServiceDetail page={PAGE} />
}
