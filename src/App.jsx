import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ManagedIT from './pages/ManagedIT'
import WebServices from './pages/WebServices'
import Hardware from './pages/Hardware'
import AIServices from './pages/AIServices'
import About from './pages/About'
import OurTeam from './pages/OurTeam'
import Contact from './pages/Contact'
import { Footer } from './sections/CTAFooter'
import { useRoute, useRouteScroll } from './lib/router'

const HOME_META = {
  title: 'Simply ICT | Managed IT, Web, Infrastructure & AI Services',
  description:
    'Simply ICT is an Australian-owned technology partner in North Lakes, QLD — managed IT, web services, hardware & infrastructure and AI services under one roof.',
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
    path: '/web-services',
    Component: WebServices,
    meta: {
      title: 'Web Services | WordPress Design, Hosting & SEO | Simply ICT',
      description:
        'Custom WordPress websites, managed hosting, SEO and e-commerce — designed and maintained to help your business stand out online. Free consultation.',
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
    path: '/contact-us',
    Component: Contact,
    meta: {
      title: 'Contact Us | Simply ICT | 07 5329 7997',
      description:
        'Get in touch with Simply ICT for IT support, a quote or general advice. Call 07 5329 7997 or send a message — we reply within one business day.',
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

const findPage = (path) => PAGES.find((p) => path === p.path || path.startsWith(`${p.path}/`))

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
    const meta = findPage(path)?.meta || HOME_META
    document.title = meta.title

    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', meta.description)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', meta.title)

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.setAttribute('content', meta.description)
  }, [path])
}

export default function App() {
  const route = useRoute()
  useRouteScroll(route)
  usePageMeta(route.path)
  useLenis()
  const Page = findPage(route.path)?.Component || Home

  return (
    <div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar path={route.path} />
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
