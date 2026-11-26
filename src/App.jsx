import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ManagedIT from './pages/ManagedIT'
import CoManagedIT from './pages/managed/CoManagedIT'
import Cybersecurity from './pages/managed/Cybersecurity'
import CloudServices from './pages/managed/CloudServices'
import OnSiteSupport from './pages/managed/OnSiteSupport'
import ITConsulting from './pages/managed/ITConsulting'
import WebServices from './pages/WebServices'
import WebDesign from './pages/web/WebDesign'
import HostingMaintenance from './pages/web/HostingMaintenance'
import SeoPerformance from './pages/web/SeoPerformance'
import ECommerce from './pages/web/ECommerce'
import Hardware from './pages/Hardware'
import ServersStorage from './pages/hardware/ServersStorage'
import Networking from './pages/hardware/Networking'
import Workstations from './pages/hardware/Workstations'
import WifiInstallation from './pages/hardware/WifiInstallation'
import AIServices from './pages/AIServices'
import AiStrategy from './pages/ai/AiStrategy'
import Copilot from './pages/ai/Copilot'
import Chatbots from './pages/ai/Chatbots'
import Automation from './pages/ai/Automation'
import DataInsights from './pages/ai/DataInsights'
import AiGovernance from './pages/ai/AiGovernance'
import About from './pages/About'
import OurTeam from './pages/OurTeam'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import NotFound from './pages/NotFound'
import { Footer } from './sections/CTAFooter'
import { useRoute, useRouteScroll } from './lib/router'

const HOME_META = {
  title: 'Simply ICT | Managed IT, Web, Infrastructure & AI Services',
  description:
    'Simply ICT is an Australian-owned technology partner in North Lakes, QLD — managed IT, web services, hardware & infrastructure and AI services under one roof.',
}

/* Anything that isn't '/' and doesn't match a page below. Kept out of PAGES so
   it can never be reached by a URL of its own. */
const NOT_FOUND = {
  Component: NotFound,
  solidNav: true, // no photo banner, so the navbar needs its opaque state
  meta: {
    title: 'Page not found | Simply ICT',
    description: 'That page has moved or never existed. Here are the places you were most likely looking for.',
    noindex: true,
  },
}

/* Sub-pages: path prefix → component + meta. Anything else renders Home. */
const PAGES = [
  {
    path: '/managed-it-services',
    Component: ManagedIT,
    meta: {
      title: 'Managed IT Services | 24/7 Monitoring | Simply ICT',
      description:
        'Proactive managed IT for Australian businesses — 24/7 monitoring, helpdesk, cybersecurity, cloud, on-site support and strategy. Free consultation.',
    },
  },
  {
    path: '/managed-it-services/co-managed-it',
    Component: CoManagedIT,
    meta: {
      title: 'Co-Managed IT | Extend Your IT Team | Simply ICT',
      description:
        'Co-managed IT for businesses with an internal IT team or provider — after-hours and overflow cover, specialist skills on tap and a second pair of eyes, without new headcount.',
    },
  },
  {
    path: '/managed-it-services/cybersecurity',
    Component: Cybersecurity,
    meta: {
      title: 'Cybersecurity | Protection, Audits & Backups | Simply ICT',
      description:
        'Managed cybersecurity for Australian businesses — endpoint and email protection, 24/7 monitoring and patching, security audits, and backups with tested restores.',
    },
  },
  {
    path: '/managed-it-services/cloud-services',
    Component: CloudServices,
    meta: {
      title: 'Cloud Services | Microsoft 365 & Azure | Simply ICT',
      description:
        'Microsoft 365, Azure and hybrid cloud — planned, migrated in stages with a rollback plan, and managed afterwards. Free consultation on what should move.',
    },
  },
  {
    path: '/managed-it-services/on-site-support',
    Component: OnSiteSupport,
    meta: {
      title: 'On-site IT Support | 4-Hour Response | Simply ICT',
      description:
        'On-site IT support with published response times — urgent within 4 hours, priority within 24, standard within 48, plus scheduled maintenance visits.',
    },
  },
  {
    path: '/managed-it-services/it-consulting',
    Component: ITConsulting,
    meta: {
      title: 'IT Consulting & Strategy | Roadmaps & Budgets | Simply ICT',
      description:
        'Independent IT consulting — a prioritised 1 to 3 year technology roadmap, IT budget forecasting, vendor-neutral advice and project oversight, in plain English.',
    },
  },
  {
    path: '/web-services',
    Component: WebServices,
    meta: {
      title: 'Web Services | WordPress Design, Hosting & SEO | Simply ICT',
      description:
        'Custom WordPress websites, managed hosting, SEO and e-commerce — designed and maintained to help your business stand out online. Free consultation.',
    },
  },
  {
    path: '/web-services/web-design',
    Component: WebDesign,
    meta: {
      title: 'Web Design | Custom WordPress Websites | Simply ICT',
      description:
        'Custom WordPress web design — fast, mobile-first sites built around your brand, with an SEO-ready structure and an editor your own team can use. Fixed quotes.',
    },
  },
  {
    path: '/web-services/hosting-maintenance',
    Component: HostingMaintenance,
    meta: {
      title: 'Web Hosting & Maintenance | Daily Backups | Simply ICT',
      description:
        'Managed WordPress hosting and maintenance — SSD and CDN performance hosting, daily backups with 30-day retention, 24/7 security monitoring and real support.',
    },
  },
  {
    path: '/web-services/seo-performance',
    Component: SeoPerformance,
    meta: {
      title: 'SEO & Performance | Get Found on Google | Simply ICT',
      description:
        'On-page, local and technical SEO plus speed and Core Web Vitals work, with plain-English monthly reporting. Start with a free SEO audit of your current site.',
    },
  },
  {
    path: '/web-services/e-commerce',
    Component: ECommerce,
    meta: {
      title: 'E-Commerce | WooCommerce Stores | Simply ICT',
      description:
        'WooCommerce stores for Australian businesses — products, shipping and tax configured, Stripe, PayPal, Square and Afterpay payments, training and ongoing support.',
    },
  },
  {
    path: '/hardware',
    Component: Hardware,
    meta: {
      title: 'Hardware & Infrastructure | Servers, Networking & Wi-Fi | Simply ICT',
      description:
        'Servers, storage, networking, workstations and business Wi-Fi — designed, supplied and supported so your infrastructure stays fast, reliable and ready to grow.',
    },
  },
  {
    path: '/hardware/servers-storage',
    Component: ServersStorage,
    meta: {
      title: 'Servers & Storage | On-Prem & Hybrid | Simply ICT',
      description:
        'Servers, storage and backup infrastructure right-sized to your workloads — on-premise, hybrid or cloud, with tested restores, monitoring and lifecycle planning.',
    },
  },
  {
    path: '/hardware/networking',
    Component: Networking,
    meta: {
      title: 'Networking | Design, Security & Support | Simply ICT',
      description:
        'Business network design, installation and support — structured and documented layouts, firewalls, VLANs and segmentation, plus proactive performance monitoring.',
    },
  },
  {
    path: '/hardware/workstations',
    Component: Workstations,
    meta: {
      title: 'Workstations | Business PCs & Laptops | Simply ICT',
      description:
        'Business-grade PCs, laptops and devices matched to each role — standard builds and imaging, new-starter setup, and refresh and lifecycle management for your fleet.',
    },
  },
  {
    path: '/hardware/wifi-installation',
    Component: WifiInstallation,
    meta: {
      title: 'Business WiFi Installation | Site Surveys | Simply ICT',
      description:
        'Business Wi-Fi done properly — site survey and coverage mapping first, enterprise-grade access points installed and tuned for real-world speed, then monitored.',
    },
  },
  {
    path: '/about-us',
    Component: About,
    meta: {
      title: 'About Us | 30+ Years Making Technology Human | Simply ICT',
      description:
        'Australian-owned and based in North Lakes, QLD, Simply ICT has helped businesses use technology to grow, compete and succeed for over 30 years.',
    },
  },
  {
    path: '/our-team',
    Component: OurTeam,
    meta: {
      title: 'Our Team | The People Behind Simply ICT',
      description:
        'Meet the Simply ICT team — decades of combined experience across managed IT, web development, cybersecurity and cloud, based in North Lakes, QLD.',
    },
  },
  {
    path: '/ai-services/ai-strategy',
    Component: AiStrategy,
    meta: {
      title: 'AI Strategy & Consulting | Costed Roadmaps | Simply ICT',
      description:
        'Independent AI consulting — an AI readiness review, use-case discovery and a prioritised, costed roadmap in plain English. No hype, and no obligation to buy.',
    },
  },
  {
    path: '/ai-services/copilot',
    Component: Copilot,
    meta: {
      title: 'Microsoft Copilot Rollout & Training | Simply ICT',
      description:
        'Copilot for Microsoft 365 rolled out properly — licensing and setup, a data and permissions check before go-live, role-based training and adoption support.',
    },
  },
  {
    path: '/ai-services/chatbots',
    Component: Chatbots,
    meta: {
      title: 'AI Chatbots & Virtual Agents | Simply ICT',
      description:
        'Website and internal AI assistants trained on your own content — answering common enquiries 24/7 and handing over to a real person when it matters.',
    },
  },
  {
    path: '/ai-services/automation',
    Component: Automation,
    meta: {
      title: 'Workflow Automation | Remove Repetitive Admin | Simply ICT',
      description:
        'Workflow automation across email, documents, CRM and accounting — information entered once, approvals routed automatically, and fewer manual errors.',
    },
  },
  {
    path: '/ai-services/data-insights',
    Component: DataInsights,
    meta: {
      title: 'AI Data & Insights | Live Dashboards & Reports | Simply ICT',
      description:
        'Live dashboards, automated reports and forecasting built on the systems you already use — plus plain-English querying of your own business data.',
    },
  },
  {
    path: '/ai-services/ai-governance',
    Component: AiGovernance,
    meta: {
      title: 'AI Security & Governance | Safe AI Use | Simply ICT',
      description:
        'AI governance for Australian businesses — a readable AI use policy, an approved tool list, data protection, access controls and practical staff guidance.',
    },
  },
  {
    path: '/contact-us',
    Component: Contact,
    meta: {
      title: 'Contact Us | Simply ICT | 07 5329 7997',
      description:
        'Get in touch with Simply ICT for IT support, a quote or general advice. Call 07 5329 7997 or send a message — we reply within one business day.',
    },
  },
  {
    /* No photo banner on this one, so the navbar needs its solid state from
       the top — otherwise the white logo and links sit on a white page. */
    path: '/privacy-policy',
    Component: PrivacyPolicy,
    solidNav: true,
    meta: {
      title: 'Privacy Policy | Simply ICT',
      description:
        'How Simply ICT collects, uses and protects your personal information, in plain English — your rights of access and correction, and how to raise a concern.',
    },
  },
  {
    path: '/ai-services',
    Component: AIServices,
    meta: {
      title: 'AI Services | Copilot, Chatbots & Automation | Simply ICT',
      description:
        'Practical AI for Australian businesses — strategy, Microsoft Copilot rollout, chatbots, workflow automation, data insights and AI governance. Free consultation.',
    },
  },
]

/* Longest match wins, so /managed-it-services/cybersecurity resolves to the
   sub-page rather than to its parent hub. */
const findPage = (path) =>
  PAGES
    .filter((p) => path === p.path || path.startsWith(`${p.path}/`))
    .sort((a, b) => b.path.length - a.path.length)[0]

/* '/' is the home page; a known prefix wins its sub-page; anything else is a 404
   rather than a silent fallback to home. */
const resolve = (path) => {
  if (path === '/') return { Component: Home, meta: HOME_META }
  return findPage(path) || NOT_FOUND
}

function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    window.__lenis = lenis
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)

    // smooth in-page anchor links
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      const el = id === '#top' ? 0 : document.querySelector(id)
      if (el === null) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -120 })
    }
    document.addEventListener('click', onClick)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); document.removeEventListener('click', onClick) }
  }, [])
}

function usePageMeta(path) {
  useEffect(() => {
    const meta = resolve(path).meta
    document.title = meta.title

    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', meta.description)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', meta.title)

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.setAttribute('content', meta.description)

    /* The host serves every route as 200, so a 404 has to tell crawlers to skip
       it itself — otherwise every bad link becomes an indexable thin page. */
    const ROBOTS = 'simplyict-robots'
    document.getElementById(ROBOTS)?.remove()
    if (meta.noindex) {
      const robots = document.createElement('meta')
      robots.id = ROBOTS
      robots.name = 'robots'
      robots.content = 'noindex, follow'
      document.head.appendChild(robots)
    }
  }, [path])
}

export default function App() {
  const route = useRoute()
  useRouteScroll(route)
  usePageMeta(route.path)
  useLenis()
  const page = resolve(route.path)
  const Page = page.Component

  return (
    <div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar path={route.path} solid={!!page.solidNav} />
      <motion.main
        id="main-content"
        key={route.path}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Page />
      </motion.main>
      <Footer />
    </div>
  )
}
