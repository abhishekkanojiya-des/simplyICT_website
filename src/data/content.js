import {
  ServerCog, Globe, Network, ShieldCheck, Cloud, Wrench, Compass, Users, Code2, Gauge, ShoppingCart,
  HardDrive, Router, Monitor, Wifi, Sparkles, Bot, Workflow, BarChart3, Lock, BrainCircuit, Handshake,
  HeartHandshake, MapPin, Radar, Info, UsersRound,
} from 'lucide-react'

export const CONTACT = {
  phone: '07 5329 7997',
  phoneHref: 'tel:+61753297997',
  email: 'info@simplyict.com.au',
  location: 'North Lakes, QLD 4509',
  hours: 'Mon – Fri, 8:30am – 5:30pm',
}

export const NAV = [
  {
    label: 'Managed IT',
    href: '/managed-it-services',
    items: [
      { label: 'Managed IT Services', href: '/managed-it-services', desc: '24/7 monitoring, helpdesk & strategy', icon: ServerCog },
      { label: 'Co-Managed IT', href: '/managed-it-services#co-managed-it', desc: 'Back up your in-house IT team', icon: Users },
      { label: 'Cybersecurity', href: '/managed-it-services#cybersecurity', desc: 'Protection, backups & recovery', icon: ShieldCheck },
      { label: 'Cloud Services', href: '/managed-it-services#cloud-services', desc: 'Microsoft 365, Azure & migrations', icon: Cloud },
      { label: 'On-site Support', href: '/managed-it-services#on-site-support', desc: 'Local technicians when you need them', icon: Wrench },
      { label: 'IT Consulting & Strategy', href: '/managed-it-services#it-consulting', desc: 'Roadmaps and budgeting that make sense', icon: Compass },
    ],
  },
  {
    label: 'Web Services',
    href: '/web-services',
    items: [
      { label: 'Web Design', href: '/web-services#web-design', desc: 'Fast WordPress sites that convert', icon: Code2 },
      { label: 'Hosting & Maintenance', href: '/web-services#hosting-maintenance', desc: 'Secure hosting, updates & daily backups', icon: Globe },
      { label: 'SEO & Performance', href: '/web-services#seo-performance', desc: 'Get found and load fast', icon: Gauge },
      { label: 'E-Commerce', href: '/web-services#e-commerce', desc: 'Online stores that sell', icon: ShoppingCart },
    ],
  },
  {
    label: 'Infrastructure',
    href: '/hardware',
    items: [
      { label: 'Servers & Storage', href: '/hardware#servers-storage', desc: 'Reliable on-prem & hybrid servers', icon: HardDrive },
      { label: 'Networking', href: '/hardware#networking', desc: 'Switching, routing & firewalls', icon: Router },
      { label: 'Workstations', href: '/hardware#workstations', desc: 'Supplied, imaged & managed', icon: Monitor },
      { label: 'WiFi Installation', href: '/hardware#wifi-installation', desc: 'Business-grade wireless coverage', icon: Wifi },
    ],
  },
  {
    label: 'AI Services',
    href: '/ai-services',
    badge: 'New',
    items: [
      { label: 'AI Strategy & Consulting', href: '/ai-services#ai-strategy', desc: 'Find where AI pays off', icon: BrainCircuit },
      { label: 'Microsoft Copilot Rollout', href: '/ai-services#copilot', desc: 'Deploy & train your team', icon: Sparkles },
      { label: 'AI Chatbots & Virtual Agents', href: '/ai-services#chatbots', desc: '24/7 assistants on your knowledge', icon: Bot },
      { label: 'Workflow Automation', href: '/ai-services#automation', desc: 'Remove repetitive admin', icon: Workflow },
      { label: 'AI Data & Insights', href: '/ai-services#data-insights', desc: 'Dashboards, forecasts & answers', icon: BarChart3 },
      { label: 'AI Security & Governance', href: '/ai-services#ai-governance', desc: 'Safe, compliant AI use', icon: Lock },
    ],
  },
  {
    label: 'About',
    href: '/about-us',
    items: [
      { label: 'About Us', href: '/about-us', desc: '30+ years of making tech human', icon: Info },
      { label: 'Our Team', href: '/our-team', desc: 'Meet the people behind the support', icon: UsersRound },
    ],
  },
  { label: 'Contact', href: '/contact-us' },
]

export const STATS = [
  { value: 30, suffix: '+', label: 'Years experience' },
  { value: 500, suffix: '+', label: 'Businesses served' },
  { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime guarantee' },
  { value: 100, suffix: '%', label: 'Australian owned' },
]

export const SERVICES = [
  {
    icon: ServerCog,
    title: 'Managed IT Services',
    href: '/managed-it-services',
    desc: 'Proactive monitoring, helpdesk and strategy that keep your systems running — and your people working.',
    points: ['24/7 monitoring & helpdesk', 'Cybersecurity & backups', 'Cloud & on-site support'],
    cta: 'Explore managed IT',
  },
  {
    icon: Globe,
    title: 'Web Services',
    href: '/web-services',
    desc: 'Beautiful, fast WordPress websites — designed, hosted, secured and ranked so your business shines online.',
    points: ['Web design & e-commerce', 'Hosting, updates & daily backups', 'SEO & performance'],
    cta: 'Explore web services',
  },
  {
    icon: Network,
    title: 'Hardware & Infrastructure',
    href: '/hardware',
    desc: 'Servers, networking, workstations and Wi-Fi — supplied, installed and managed for peak performance.',
    points: ['Servers & storage', 'Networking & firewalls', 'Workstations & business Wi-Fi'],
    cta: 'Explore infrastructure',
  },
  {
    icon: Sparkles,
    title: 'AI Services',
    href: '/ai-services',
    badge: 'New',
    desc: 'Practical AI that saves your team hours every week — rolled out safely, explained in plain English.',
    points: ['Microsoft Copilot rollout & training', 'AI chatbots & workflow automation', 'AI security & governance'],
    cta: 'Explore AI services',
  },
]

export const MANAGED_IT_SERVICES = [
  {
    id: 'co-managed-it',
    icon: Users,
    title: 'Co-Managed IT',
    desc: 'Extend your existing IT team or provider with our specialists — extra capacity and skills, without the cost of new hires.',
    points: ['Flexible partnership', 'Specialist skills on tap', 'After-hours & overflow cover', 'Second pair of eyes'],
  },
  {
    id: 'cybersecurity',
    icon: ShieldCheck,
    title: 'Cybersecurity',
    desc: 'Layered protection, honest audits and tested backups — so a threat never becomes a business-stopping event.',
    points: ['Advanced threat protection', 'Security audits & reviews', 'Backups & disaster recovery', 'Practical compliance guidance'],
  },
  {
    id: 'cloud-services',
    icon: Cloud,
    title: 'Cloud Services',
    desc: 'Microsoft 365, Azure and modern cloud — planned, migrated and managed, without the disruption.',
    points: ['Microsoft 365', 'Careful cloud migration', 'Modernise infrastructure', 'Security in the cloud'],
  },
  {
    id: 'on-site-support',
    icon: Wrench,
    title: 'On-site Support',
    desc: 'When you need us on-site, we’re there — guaranteed response times and engineers who fix it right.',
    points: ['Urgent — within 4 hours', 'Priority — within 24 hours', 'Standard — within 48 hours', 'Scheduled visits'],
  },
  {
    id: 'it-consulting',
    icon: Compass,
    title: 'IT Consulting & Strategy',
    desc: 'A practical technology roadmap and honest advice — so every IT dollar works toward your goals.',
    points: ['Technology roadmap', 'Independent advice', 'Budget forecasting', 'Project oversight'],
  },
]

export const WEB_SERVICES = [
  {
    id: 'web-design',
    icon: Code2,
    title: 'Web Design',
    desc: 'Custom WordPress sites that look premium, load fast, and are simple for your team to update.',
    points: ['Custom design', 'WordPress build', 'Fast & mobile-first', 'SEO-ready structure'],
  },
  {
    id: 'hosting-maintenance',
    icon: Globe,
    title: 'Hosting & Maintenance',
    desc: 'Managed hosting with daily backups, security monitoring and updates — so your site stays online and fast.',
    points: ['Performance hosting', 'Daily backups', 'Security monitoring', 'Real support'],
  },
  {
    id: 'seo-performance',
    icon: Gauge,
    title: 'SEO & Performance',
    desc: 'On-page, technical and local SEO with clear reporting — so customers find you before your competitors.',
    points: ['On-page & local SEO', 'Technical SEO', 'Analytics & reporting', 'Speed optimisation'],
  },
  {
    id: 'e-commerce',
    icon: ShoppingCart,
    title: 'E-Commerce',
    desc: 'Secure WooCommerce stores with payments, inventory and support — built to sell, and built to last.',
    points: ['Store setup', 'Secure payments', 'Easy management', 'Ongoing support'],
  },
]

export const HARDWARE_SERVICES = [
  {
    id: 'servers-storage',
    icon: HardDrive,
    title: 'Servers & Storage',
    desc: 'Servers, storage and backup systems — specified, deployed and supported so your data is safe and fast.',
    points: ['Server builds & virtualisation', 'Storage that scales', 'Backups & redundancy', 'Monitoring & maintenance'],
  },
  {
    id: 'networking',
    icon: Router,
    title: 'Networking',
    desc: 'Fast, secure networks — designed, installed and supported for offices that depend on them.',
    points: ['Network design', 'Security & segmentation', 'Installation & upgrades', 'Monitoring & troubleshooting'],
  },
  {
    id: 'workstations',
    icon: Monitor,
    title: 'Workstations',
    desc: 'The right PCs, laptops and devices for every role — supplied, standardised and supported.',
    points: ['Business-grade hardware', 'Standard builds & imaging', 'Setup & onboarding', 'Refresh & support'],
  },
  {
    id: 'wifi-installation',
    icon: Wifi,
    title: 'WiFi Installation',
    desc: 'Business Wi-Fi that reaches everywhere — surveyed, installed and tuned so dead zones are history.',
    points: ['Site survey', 'Access points & controllers', 'Performance tuning', 'Support & maintenance'],
  },
]

/* No live AI page yet — titles & descriptions come from the homepage/nav copy;
   the bullet points are drafted and should be reviewed by the team. */
export const AI_SERVICES = [
  {
    id: 'ai-strategy',
    icon: BrainCircuit,
    title: 'AI Strategy & Consulting',
    desc: 'Find where AI delivers real return in your business, with a clear, costed roadmap.',
    points: ['AI readiness review', 'Use-case discovery', 'Costed roadmap', 'Plain-English advice'],
  },
  {
    id: 'copilot',
    icon: Sparkles,
    title: 'Microsoft Copilot Rollout',
    desc: 'Deploy, configure and train your team on Copilot for Microsoft 365.',
    points: ['Licensing & setup', 'Data & permissions check', 'Hands-on staff training', 'Adoption support'],
  },
  {
    id: 'chatbots',
    icon: Bot,
    title: 'AI Chatbots & Virtual Agents',
    desc: '24/7 website and internal assistants trained on your own knowledge.',
    points: ['Website chat assistant', 'Internal knowledge bot', 'Trained on your content', 'Hand-off to a human'],
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'Workflow Automation',
    desc: 'Automate repetitive tasks across email, documents, CRM and accounts.',
    points: ['Email & document flows', 'CRM & accounts integration', 'Approvals & notifications', 'Fewer manual errors'],
  },
  {
    id: 'data-insights',
    icon: BarChart3,
    title: 'AI Data & Insights',
    desc: 'Turn your business data into dashboards, forecasts and plain answers.',
    points: ['Live dashboards', 'Forecasting', 'Ask questions in plain English', 'Automated reports'],
  },
  {
    id: 'ai-governance',
    icon: Lock,
    title: 'AI Security & Governance',
    desc: 'Policies, data protection and safe-use controls for every AI tool.',
    points: ['AI use policy', 'Data protection', 'Access controls', 'Staff guidance'],
  },
]

export const WHY = [
  { icon: Handshake, title: 'One accountable partner', desc: 'A single team for IT, web and infrastructure — no finger-pointing between vendors when something matters.' },
  { icon: HeartHandshake, title: 'Humans first', desc: 'Friendly people who explain things in plain English. Support you can reach, and advice you can trust.' },
  { icon: MapPin, title: 'Australian owned & local', desc: 'Based in North Lakes, QLD, we serve businesses across Australia with local response and local accountability.' },
  { icon: Radar, title: 'Proactive, not reactive', desc: 'We monitor, patch and plan ahead so most problems never reach you in the first place.' },
]

export const PROCESS = [
  { n: '01', title: 'Free consultation', desc: 'We listen to your goals and map your current setup — no jargon, no obligation.' },
  { n: '02', title: 'Honest recommendations', desc: 'A clear plan with transparent pricing. We tell you what you need — and what you don’t.' },
  { n: '03', title: 'Smooth implementation', desc: 'We deploy, document and communicate. Minimal disruption to your day.' },
  { n: '04', title: 'Ongoing partnership', desc: 'Monitoring, support and monthly reporting keep everything healthy and improving.' },
]
