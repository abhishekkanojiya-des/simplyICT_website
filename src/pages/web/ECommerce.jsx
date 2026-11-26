import { motion } from 'framer-motion'
import {
  Boxes, CreditCard, LifeBuoy, MoveRight, Package, ReceiptText, ShoppingCart,
  SlidersHorizontal, Smartphone, Truck,
} from 'lucide-react'
import ServiceDetail, { DetailHead } from '../../components/ServiceDetail'
import { Reveal, EASE } from '../../components/ui'
import { WEB_SERVICES } from '../../data/content'
import heroImg from '../../assets/web/ecommerce.jpg'
import imgOverview from '../../assets/detail/ecommerce-checkout.jpg'
import imgChecklist from '../../assets/detail/ecommerce-fulfilment.jpg'

/* Content mirrors simplyict.com.au/web-services/e-commerce/ */

/* ───────── Added section: the customer journey ─────────
   A store is judged at four moments. Spell out what gets
   configured at each one, because that is where sales leak. */
const JOURNEY = [
  {
    icon: Boxes,
    step: 'Browse',
    lead: 'They have to find the right product',
    items: ['Product & category structure', 'Variations, sizes & options', 'Search and filtering', 'Image sizing that stays fast'],
  },
  {
    icon: ShoppingCart,
    step: 'Cart',
    lead: 'And see an honest total',
    items: ['Shipping zones & live rates', 'Tax calculated correctly', 'Discount & coupon codes', 'No surprise fees at the end'],
  },
  {
    icon: CreditCard,
    step: 'Checkout',
    lead: 'This is where stores lose the sale',
    items: ['Stripe, PayPal, Square & Afterpay', 'SSL-secured, PCI-compliant', 'Guest checkout, not forced sign-up', 'Tested on a phone, properly'],
  },
  {
    icon: ReceiptText,
    step: 'After the sale',
    lead: 'And then you have to fulfil it',
    items: ['Order & shipping notifications', 'Live stock levels', 'Refunds & returns handling', 'Sales reporting you can read'],
  },
]

function CustomerJourney() {
  return (
    <section id="journey" className="section relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-52 top-20 h-[500px] w-[500px] rounded-full opacity-45 blur-3xl"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.16), transparent 70%)' }}
      />
      <div className="container-site relative">
        <DetailHead
          eyebrow="The journey"
          title="From browse to paid order"
          text="A store gets judged at four moments. Each one is a place a sale quietly disappears — so each one gets set up deliberately."
          center
        />

        <ol className="mx-auto mt-12 grid max-w-[1180px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map(({ icon: Icon, step, lead, items }, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
              className="relative h-full"
            >
              <div className="group flex h-full flex-col rounded-[26px] border border-line bg-paper p-7 transition-[transform,background-color,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-brand-blue/30 hover:bg-white hover:shadow-[0_30px_64px_-36px_rgba(11,18,32,.5)]">
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-[0_14px_28px_-14px_rgba(59,130,246,.9)] transition-transform duration-500 group-hover:scale-110"
                    style={{ background: 'var(--brand-gradient)' }}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.03em] text-ink">{step}</h3>
                <p className="mt-1.5 text-[13.5px] font-medium leading-snug text-brand-deep">{lead}</p>
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

              {/* arrow into the next step, on wide screens only */}
              {i < JOURNEY.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-[22px] top-[58px] hidden text-line lg:block"
                >
                  <MoveRight size={18} />
                </span>
              )}
            </motion.li>
          ))}
        </ol>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-9 flex max-w-2xl items-start justify-center gap-2.5 text-center text-[14px] leading-relaxed text-muted">
            <Smartphone size={16} className="mt-0.5 shrink-0 text-brand-blue" />
            Most of your customers will do all four of these on a phone, one-handed, somewhere with bad reception — so
            that is where we test the checkout before you launch, not after.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const PAGE = {
  id: 'e-commerce',
  family: WEB_SERVICES,
  parent: { label: 'Web Services', href: '/web-services' },
  crumb: 'E-Commerce',
  tagline: 'Web Services · E-Commerce',
  title: ['E-Commerce'],
  kicker: 'Sell online with confidence.',
  hero: {
    img: heroImg,
    focus: '50% 50%',
    text: 'WooCommerce stores with secure payments, real inventory management and a checkout that does not lose people — set up properly for the Australian market.',
    cta: 'Start your store',
  },
  glance: [
    { icon: ShoppingCart, k: 'Platform', v: 'WooCommerce' },
    { icon: CreditCard, k: 'Payments', v: 'Stripe · PayPal · Afterpay' },
    { icon: Truck, k: 'Configured for', v: 'Australian tax & shipping' },
  ],
  overview: {
    eyebrow: 'Why it matters',
    title: 'A store is not a website with a buy button bolted on.',
    body: [
      'Behind the product photos sit shipping rules, tax, stock levels, payment gateways and a checkout that has to work on a phone, first time, for someone who is already having second thoughts. Get any of those wrong and you do not get an error message — you get an abandoned cart you never hear about.',
      'We build on WooCommerce, so you own the store and your data rather than renting both. Products, categories, shipping and tax are configured for how Australian businesses actually sell, your team is trained on the dashboard, and we stay on afterwards to keep it updated and patched.',
    ],
    facts: [
      { k: 'Platform', v: 'WooCommerce' },
      { k: 'Payments', v: 'Stripe, PayPal, Square, Afterpay' },
      { k: 'Checkout', v: 'SSL-secured & PCI-compliant' },
      { k: 'Shipping & tax', v: 'Set up for Australia' },
    ],
    badge: {
      value: 'Built for AU',
      label: 'Australian payments, shipping rules and tax configured from the start.',
    },
    img: imgOverview,
    alt: 'A shopper checking out on an online store with a card in hand',
    focus: '50% 55%',
    cta: 'Start your store',
  },
  includes: {
    eyebrow: 'What you get',
    title: 'Everything between a product list and a paid order',
    text: 'Set up once, properly — then handed over with training so you are not dependent on us to run it.',
    items: [
      {
        icon: Package,
        title: 'Store setup',
        desc: 'Products, categories, variations, shipping zones and tax configured for the Australian market, so the prices and postage your customers see are the right ones.',
      },
      {
        icon: CreditCard,
        title: 'Secure payments',
        desc: 'Stripe, PayPal, Square and Afterpay, through an SSL-secured, PCI-compliant checkout — the payment methods your customers already trust and expect.',
      },
      {
        icon: SlidersHorizontal,
        title: 'Easy management',
        desc: 'One dashboard for orders, stock and reporting, and training for the people who will use it daily — so fulfilling an order never needs a phone call to us.',
      },
      {
        icon: LifeBuoy,
        title: 'Ongoing support',
        desc: 'Updates, security patches and sales reporting after launch, because a store that takes money is the last thing you want quietly running out of date.',
      },
    ],
  },
  checklist: {
    eyebrow: 'In the box',
    title: 'What building your store includes',
    text: 'From the first product through to the week after launch, and every month after that.',
    items: [
      'Product & category setup',
      'Payment gateways & security',
      'Shipping & tax configuration',
      'Training for your team',
      'Ongoing maintenance & support',
      'Sales reporting you can read',
    ],
    chip: 'Secure payments',
    img: imgChecklist,
    alt: 'A worker checking labelled orders ready for dispatch',
    focus: '55% 50%',
    cta: 'Talk through your store',
  },
  relatedTitle: 'The rest of web services',
  cta: {
    title: 'Ready to start selling online?',
    sub: 'Whether it is your first product or a full catalogue, we will guide the whole build.',
    primaryLabel: 'Start your store',
  },
}

export default function ECommerce() {
  return (
    <ServiceDetail page={PAGE}>
      <CustomerJourney />
    </ServiceDetail>
  )
}
