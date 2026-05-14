import { motion, useReducedMotion } from 'framer-motion'

const heroVideo =
  'https://videos.pexels.com/video-files/12956438/12956438-uhd_2560_1440_25fps.mp4'

const images = {
  heroPoster:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=82',
  philosophy:
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=82',
  studio:
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=82',
  material:
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=82',
  interior:
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=82',
  site:
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=82',
  cta:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=82',
}

const navItems = [
  'What We Do',
  'Designs',
  'Our Story',
  'Collaborations',
  'Get in Touch',
]

const partnerStats = [
  ['Founded', '2025'],
  ['Projects Together', '4'],
  ['Based In', 'Bengaluru, India'],
]

const expertise = [
  'Residential Architecture',
  'Interior Architecture',
  'Space Planning',
  'Material Curation',
]

const benefits = [
  {
    number: '01',
    title: 'Design Excellence',
    copy: 'You work with architects vetted by Auriga, firms whose eye for space, light, and form we trust deeply.',
    image: images.interior,
  },
  {
    number: '02',
    title: 'Shared Standards',
    copy: 'No gap between design intent and built reality. The architect understands how we build, and we understand how they design.',
    image: images.material,
  },
  {
    number: '03',
    title: 'Unified Delivery',
    copy: 'Architecture and construction move as one team, reducing friction, improving decisions, and protecting the final outcome.',
    image: images.site,
  },
]

const timeline = [
  ['Discover', 'We understand the client’s lifestyle, site, budget, and design expectations.'],
  ['Align', 'Auriga and the architecture partner align on scope, materials, timelines, and build feasibility.'],
  ['Design', 'The architect develops spatial direction while Auriga keeps execution, costing, and delivery realities in sync.'],
  ['Build', 'Construction moves with shared documentation, faster decisions, and fewer design-to-site gaps.'],
  ['Deliver', 'The final home reflects both the design vision and Auriga’s build quality.'],
]

const reasons = [
  'Fewer coordination gaps',
  'Better material decisions',
  'Faster approvals',
  'More faithful execution of design intent',
]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, ease: 'easeOut' as const, delay },
  }
}

function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden bg-[#15120e] text-white">
      <motion.video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        poster={images.heroPoster}
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="metadata"
        initial={reduceMotion ? false : { scale: 1.04 }}
        animate={reduceMotion ? undefined : { scale: 1.09 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,16,11,0.9),rgba(20,16,11,0.58)_48%,rgba(20,16,11,0.26))]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,16,11,0.9),transparent_42%,rgba(20,16,11,0.45))]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1480px] items-end px-5 pb-12 pt-28 sm:px-8 lg:pb-20">
        <div className="max-w-5xl">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.38em] text-[#d8c4a2]"
            {...fadeUp(0)}
          >
            Creative Alliances
          </motion.p>
          <motion.h1
            className="mt-5 max-w-4xl font-[var(--font-display)] text-[clamp(4.4rem,12vw,12rem)] font-normal leading-[0.82] tracking-[-0.045em]"
            {...fadeUp(0.08)}
          >
            Built Together
          </motion.h1>
          <motion.p
            className="mt-7 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl"
            {...fadeUp(0.16)}
          >
            We are intentional about who we create with. Our collaborators are not vendors, they are co-authors of the spaces we deliver.
          </motion.p>
          <motion.p
            className="mt-5 text-sm font-medium uppercase tracking-[0.22em] text-white/55"
            {...fadeUp(0.22)}
          >
            Architecture. Construction. Delivery. Aligned from day one.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            {...fadeUp(0.28)}
          >
            <a className="group rounded-full bg-[#e7d7bd] px-8 py-4 text-center text-sm font-semibold text-[#17120c] transition-colors hover:bg-white" href="#partner">
              View Collaborators
              <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a className="group rounded-full border border-white/32 px-8 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#17120c]" href="#get-in-touch">
              Start a Conversation
              <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/52 md:flex">
        <span className="h-px w-12 bg-white/38" />
        Scroll
        <span className="h-px w-12 bg-white/38" />
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-[#f4efe5] text-[#17120c]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#17120c]/72 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-4 sm:px-8" aria-label="Main navigation">
          <a href="#home" className="font-[var(--font-display)] text-3xl leading-none tracking-tight text-white">
            Auriga Homes<sup className="ml-0.5 align-super text-xs">&reg;</sup>
          </a>
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} className="text-sm font-medium text-white/66 transition-colors hover:text-white">
                {item}
              </a>
            ))}
          </div>
          <a href="#get-in-touch" className="rounded-full bg-[#e7d7bd] px-5 py-2.5 text-sm font-semibold text-[#17120c] transition-colors hover:bg-white sm:px-6">
            Start
          </a>
        </nav>
      </header>

      <main>
        <Hero />

        <section id="collaborations" className="mx-auto grid max-w-[1480px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:py-28">
          <motion.div {...fadeUp()}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9c8056]">Philosophy</p>
            <h2 className="mt-5 max-w-2xl font-[var(--font-display)] text-5xl font-normal leading-[0.92] tracking-tight sm:text-7xl">
              A curated circle of craft, clarity, and shared standards.
            </h2>
          </motion.div>

          <div className="grid gap-8">
            <motion.div className="overflow-hidden" {...fadeUp(0.08)}>
              <motion.img
                src={images.philosophy}
                alt="Architectural drawings and building plans on a work table"
                className="h-[360px] w-full object-cover md:h-[460px]"
                loading="lazy"
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              />
            </motion.div>
            <motion.div className="max-w-3xl text-lg leading-8 text-[#5f5547]" {...fadeUp(0.12)}>
              <p>
                At Auriga, we believe exceptional homes are never built in isolation. Architecture and construction must speak the same language, sharing values around precision, materiality, and the human experience of space.
              </p>
              <p className="mt-5">
                We collaborate only with firms whose standards match our own, creating a seamless process from the first sketch to the final finish.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Precision', 'Materiality', 'Human Experience'].map((chip) => (
                  <span key={chip} className="rounded-full border border-[#cdbb9c] px-5 py-2 text-sm font-semibold text-[#6c5736]">
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="partner" className="bg-[#17120c] px-5 py-20 text-white sm:px-8 lg:py-28">
          <div className="mx-auto max-w-[1480px]">
            <motion.div className="mb-10 max-w-3xl" {...fadeUp()}>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d8c4a2]">Partner Showcase</p>
              <h2 className="mt-5 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-tight sm:text-7xl">
                Studio Spectra
              </h2>
            </motion.div>

            <motion.article className="grid overflow-hidden border border-white/12 bg-white/[0.04] lg:grid-cols-[1.05fr_0.95fr]" {...fadeUp(0.08)}>
              <div className="relative min-h-[420px] overflow-hidden">
                <motion.img
                  src={images.studio}
                  alt="Architectural studio with geometric facade and design atmosphere"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.05 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/42 to-transparent" />
              </div>

              <div className="p-7 sm:p-10 lg:p-12">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d8c4a2]">Architecture as Art</p>
                <h3 className="mt-4 font-[var(--font-display)] text-5xl leading-none">Contemporary Residential & Commercial Design</h3>
                <div className="mt-8 grid gap-px bg-white/12 sm:grid-cols-3">
                  {partnerStats.map(([label, value]) => (
                    <div key={label} className="bg-[#17120c] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/42">{label}</p>
                      <p className="mt-3 font-[var(--font-display)] text-3xl">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 grid gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8c4a2]">About</h4>
                    <p className="mt-4 text-sm leading-7 text-white/68">
                      Studio Spectra is a full-service architecture firm rooted in the belief that every structure should speak. Their work blends conceptual rigour with liveable warmth across residential, hospitality, and cultural projects.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8c4a2]">What They Bring</h4>
                    <p className="mt-4 text-sm leading-7 text-white/68">
                      Studio Spectra leads the architectural vision on select Auriga projects, from site studies and spatial planning to construction documentation.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {expertise.map((tag, index) => (
                    <motion.span
                      key={tag}
                      className="rounded-full border border-white/18 px-4 py-2 text-sm text-white/72"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        <section className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:py-28">
          <motion.div className="mb-12 max-w-3xl" {...fadeUp()}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9c8056]">Client Benefits</p>
            <h2 className="mt-5 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-tight sm:text-7xl">
              What collaboration means for your home
            </h2>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.article
                key={benefit.title}
                className="group border border-[#d8c6a6] bg-[#fbf7ee] p-4 transition-transform duration-500 hover:-translate-y-1"
                {...fadeUp(index * 0.08)}
              >
                <div className="overflow-hidden">
                  <img src={benefit.image} alt="" className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-bold text-[#9c8056]">{benefit.number}</p>
                  <h3 className="mt-4 font-[var(--font-display)] text-4xl leading-none">{benefit.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-[#625747]">{benefit.copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#d8c6a6] bg-[#ede4d4] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-[1480px]">
            <motion.div className="max-w-3xl" {...fadeUp()}>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9c8056]">How Collaboration Works</p>
              <h2 className="mt-5 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-tight sm:text-7xl">
                From first sketch to final finish
              </h2>
            </motion.div>

            <div className="mt-14 grid gap-6 lg:grid-cols-5 lg:gap-0">
              {timeline.map(([title, copy], index) => (
                <motion.div key={title} className="relative border-l border-[#bba179] pl-6 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8" {...fadeUp(index * 0.07)}>
                  <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-[#7b5a2e] lg:-top-[5px] lg:left-0" />
                  <p className="text-sm font-bold text-[#9c8056]">0{index + 1}</p>
                  <h3 className="mt-4 font-[var(--font-display)] text-3xl">{title}</h3>
                  <p className="mt-4 max-w-xs text-sm leading-7 text-[#625747]">{copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1480px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
          <motion.div {...fadeUp()}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9c8056]">Why It Matters</p>
            <h2 className="mt-5 font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-tight sm:text-7xl">
              The biggest risk is the gap between design and construction.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#625747]">
              Auriga’s collaboration model closes that gap early, so the final home stays faithful to the architectural vision while remaining buildable, cost-aware, and calm to deliver.
            </p>
          </motion.div>
          <div className="grid gap-px bg-[#d8c6a6] sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <motion.div key={reason} className="bg-[#f4efe5] p-8" {...fadeUp(index * 0.08)}>
                <p className="font-[var(--font-display)] text-4xl leading-none">{reason}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="get-in-touch" className="relative isolate overflow-hidden px-5 py-20 text-white sm:px-8 lg:py-28">
          <img src={images.cta} alt="Warm modern residence exterior surrounded by natural light" className="absolute inset-0 -z-20 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 -z-10 bg-[#17120c]/78" />
          <div className="mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-[1fr_0.8fr]">
            <motion.div {...fadeUp()}>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d8c4a2]">Interested in working together?</p>
              <h2 className="mt-5 max-w-4xl font-[var(--font-display)] text-5xl font-normal leading-[0.94] tracking-tight sm:text-7xl">
                Architects, let’s build homes that feel considered from every angle.
              </h2>
            </motion.div>
            <motion.div className="self-end border border-white/16 bg-white/10 p-7 backdrop-blur-xl" {...fadeUp(0.12)}>
              <p className="text-base leading-8 text-white/72">
                We are open to conversations with architecture and design firms who share our standards for detail, materiality, and client experience.
              </p>
              <blockquote className="mt-8 font-[var(--font-display)] text-3xl leading-tight">
                “We do not just build what architects draw. We build what they dream.”
              </blockquote>
              <a href="mailto:hello@aurigahomes.in" className="mt-8 inline-flex rounded-full bg-[#e7d7bd] px-8 py-4 text-sm font-semibold text-[#17120c] transition-colors hover:bg-white">
                Start the Conversation
              </a>
              <p className="mt-5 text-sm text-white/54">Every enquiry is reviewed personally.</p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-[#17120c] px-5 py-10 text-white sm:px-8">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-8 border-t border-white/12 pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-[var(--font-display)] text-3xl">Auriga Homes</p>
            <p className="mt-3 text-sm text-white/56">Building dreams with precision and grace.</p>
          </div>
          <div className="text-sm leading-7 text-white/62 md:text-right">
            <p>hello@aurigahomes.in</p>
            <p>+91 89044 28450</p>
            <p>Instagram · Facebook · LinkedIn</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
