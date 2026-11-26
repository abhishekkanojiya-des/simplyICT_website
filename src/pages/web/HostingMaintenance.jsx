import {
  CalendarCheck, ChartLine, Gauge, Headset, LifeBuoy, RefreshCw, ShieldCheck, Zap,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal } from '../../components/ui'
import { WEB_SERVICES } from '../../data/content'
import heroImg from '../../assets/web/hosting.jpg'
import imgOverview from '../../assets/detail/hosting-datacentre.jpg'
import imgChecklist from '../../assets/detail/hosting-backup.jpg'

/* Content mirrors simplyict.com.au/web-services/hosting-maintenance/ */

/* ───────── Added section: the maintenance rhythm ─────────
   "Maintenance" is invisible by nature, so spell out what is
   actually happening to the site while nobody is watching. */
const CADENCE = [
  {
    icon: RefreshCw,
    when: 'Every day',
    lead: 'The quiet, automatic work',
    items: ['Full site backup taken', 'Uptime checks around the clock', 'Malware & firewall scanning'],
  },
  {
    icon: CalendarCheck,
    when: 'Every week',
    lead: 'Updates, applied carefully',
    items: ['WordPress core & plugin updates', 'Checked after updating, not before', 'Rolled back if anything breaks'],
  },
  {
    icon: ChartLine,
    when: 'Every month',
    lead: 'The look back',
    items: ['Performance & load-time review', 'Security and uptime summary', 'What we would improve next'],
  },
  {
    icon: LifeBuoy,
    when: 'Whenever you need it',
    lead: 'The part you actually call about',
    items: ['Restore from any of 30 days', 'Malware removal & recovery', 'Support from people who know your site'],
  },
]

function MaintenanceRhythm() {
  return (
    <section id="rhythm" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-52 top-20 h-[480px] w-[480px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.16), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="The rhythm"
          title="What happens to your site, and how often"
          text="Good maintenance is invisible by definition. Here is what you are paying for when nothing appears to be going wrong."
          center
        />

        <div className="mx-auto mt-12 grid max-w-[1120px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CADENCE.map(({ icon: Icon, when, lead, items }, i) => (
            <Reveal key={when} delay={0.08 * i} className="h-full">
              <div className="group flex h-full flex-col rounded-[26px] border border-line bg-paper p-7 transition-[transform,background-color,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-brand-blue/30 hover:bg-white hover:shadow-[0_30px_64px_-36px_rgba(11,18,32,.5)]">
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-[0_14px_28px_-14px_rgba(59,130,246,.9)] transition-transform duration-500 group-hover:scale-110"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  <Icon size={20} />
                </span>
                <p className="mt-6 text-[19px] font-semibold leading-tight tracking-[-0.03em]">
                  <span className="gradient-text">{when}</span>
                </p>
                <p className="mt-1.5 text-[13.5px] font-medium text-muted">{lead}</p>
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
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-9 flex items-start gap-2.5 text-[14px] leading-relaxed text-muted">
            <ShieldCheck size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            Updates are the risky part of maintenance, not the safe part — so a backup is taken first and the site is
            checked afterwards. That is the difference between managed hosting and auto-updates left switched on.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'hosting-maintenance',
  family: WEB_SERVICES,
  parent: { label: 'Web Services', href: '/web-services' },
  crumb: 'Hosting & Maintenance',
  tagline: 'Web Services · Hosting & Maintenance',
  title: ['Hosting &', 'Maintenance'],
  kicker: 'Your website, always online, always fast.',
  hero: {
    img: heroImg,
    focus: '50% 50%',
    text: 'Reliable hosting, automatic updates, daily backups, security monitoring and performance tuning — all managed, so the site you paid for stays the site your customers see.',
    cta: 'Get started',
  },
  glance: [
    { icon: Zap, k: 'Hosting', v: 'SSD, CDN & caching' },
    { icon: RefreshCw, k: 'Backups', v: 'Daily · 30-day retention' },
    { icon: ShieldCheck, k: 'Monitoring', v: '24/7 malware scanning' },
  ],
  overview: {
    eyebrow: 'Why maintenance',
    title: 'A website is never finished. It is only currently working.',
    body: [
      'WordPress, its plugins and its themes all update constantly, and most of those updates exist because somebody found a hole. Leave a site alone for six months and it does not stay the same — it quietly becomes slower, more fragile and easier to break into.',
      'So we look after it. Updates get applied and checked, backups run every night and get restored in testing, the firewall and malware scanner watch the front door, and performance gets tuned rather than assumed. When something does go wrong, you call people who already know your site.',
    ],
    facts: [
      { k: 'Backup frequency', v: 'Every day' },
      { k: 'Backup retention', v: '30 days' },
      { k: 'Restore', v: 'One click' },
      { k: 'WordPress & plugin updates', v: 'Managed by us' },
    ],
    badge: {
      value: '30 days',
      label: 'Daily backups kept for a month, with one-click restore to any of them.',
    },
    img: imgOverview,
    alt: 'Blue-lit server blades in a hosting data centre',
    focus: '50% 50%',
    cta: 'Get started',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Hosting, plus the care it actually needs',
    text: 'Space on a server is the easy part. The rest of this is what keeps a site healthy.',
    items: [
      {
        icon: Gauge,
        title: 'Performance hosting',
        desc: 'SSD storage, a content delivery network and caching tuned for fast page loads — because every extra second costs you visitors before they ever see your offer.',
      },
      {
        icon: RefreshCw,
        title: 'Daily backups',
        desc: 'Automatic backups every day, retained for 30 days, with one-click restore. If a bad update or a bad actor breaks something, yesterday is always available.',
      },
      {
        icon: ShieldCheck,
        title: 'Security monitoring',
        desc: 'Round-the-clock malware scanning, firewall protection and WordPress updates applied for you — the three things that stop most website compromises.',
      },
      {
        icon: Headset,
        title: 'Real support',
        desc: 'People who already know how your site is put together, reachable when you need them. No ticket queue, no explaining your setup from scratch every time.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What a maintenance plan covers',
    text: 'Everything below is included every month — and we will move your existing site across for you.',
    items: [
      'WordPress & plugin updates',
      'Daily backups (30-day retention)',
      'Uptime & security monitoring',
      'Performance optimisation',
      'Malware removal & recovery',
      'Migration of your current site',
    ],
    chip: 'Daily backups',
    img: imgChecklist,
    alt: 'A portable drive beside a laptop, backing a site up',
    focus: '50% 50%',
    cta: 'Ask about moving your site',
  },
  relatedTitle: 'The rest of web services',
  cta: {
    title: 'Worried about your current website?',
    sub: 'Move it onto managed hosting and we will handle the migration — no downtime, no drama.',
    primaryLabel: 'Get started',
  },
}

export default function HostingMaintenance() {
  /* <MaintenanceRhythm /> is built and ready but hidden for now — pass it as a
     child of ServiceDetail to bring the section back. */
  return <ServiceDetail page={PAGE} />
}
