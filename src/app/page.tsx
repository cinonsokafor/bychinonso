import Link from "next/link";

const capabilities = [
  {
    id: "01",
    title: "Frontend",
    description:
      "Interfaces that are fast, responsive and deliberate. I build products that feel as good as they function.",
  },
  {
    id: "02",
    title: "Creative Development",
    description:
      "Where design meets code. Interactive experiences, motion, visual systems and expressive web interfaces.",
  },
  {
    id: "03",
    title: "Digital Products",
    description:
      "From an early idea to a working product, connecting thoughtful UX with solid engineering.",
  },
];

const principles = [
  "Think clearly.",
  "Build intentionally.",
  "Obsess over details.",
  "Keep moving forward.",
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f4f3ef] text-[#111] transition-colors duration-500 dark:bg-[#111] dark:text-[#f4f3ef]">

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header className="fixed left-0 top-0 z-50 w-full mix-blend-difference">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-5 py-5 text-white">
          <Link
            href="/"
            className="text-sm font-medium tracking-[-0.02em]"
          >
            BYCHINONSO
          </Link>

          <nav className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.18em] md:flex">
            <a href="#about" className="transition-opacity hover:opacity-50">
              About
            </a>

            <a
              href="#capabilities"
              className="transition-opacity hover:opacity-50"
            >
              Capabilities
            </a>

            <a href="#work" className="transition-opacity hover:opacity-50">
              Work
            </a>

            <a
              href="#contact"
              className="transition-opacity hover:opacity-50"
            >
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="text-[10px] uppercase tracking-[0.18em] transition-opacity hover:opacity-50"
          >
            Let&apos;s talk ↗
          </a>
        </div>
      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen border-b border-black/15 dark:border-white/15">

        <div className="mx-auto flex min-h-screen max-w-[1800px] flex-col justify-between px-5 pb-8 pt-32">

          {/* Intro */}
          <div className="grid grid-cols-12">

            <div className="col-span-12 md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                01 / Independent
              </p>
            </div>

            <div className="col-span-12 mt-6 md:col-span-6 md:mt-0">
              <p className="max-w-md text-sm leading-6 text-black/60 dark:text-white/60">
                Developer & creative technologist creating digital experiences
                where technology and visual thinking meet.
              </p>
            </div>

            <div className="col-span-3 hidden text-right md:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                Nigeria
              </p>
            </div>

          </div>


          {/* Name */}
          <div className="relative py-24">

            <h1 className="select-none text-[20vw] font-medium leading-[0.72] tracking-[-0.09em] md:text-[16vw]">

              <span className="block">
                CHINONSO
              </span>

              <span className="ml-[12vw] block">
                OKAFOR<span className="text-black/25 dark:text-white/25">.</span>
              </span>

            </h1>

          </div>


          {/* Bottom metadata */}
          <div className="grid grid-cols-12 border-t border-black/15 pt-5 dark:border-white/15">

            <div className="col-span-4 text-[10px] uppercase tracking-[0.18em] text-black/45 dark:text-white/45 md:col-span-3">
              Scroll to explore
            </div>

            <div className="col-span-4 text-[10px] uppercase tracking-[0.18em] md:col-span-6">
              Design / Technology / Web
            </div>

            <div className="col-span-4 text-right text-[10px] md:col-span-3">
              ↓
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section
        id="about"
        className="border-b border-black/15 dark:border-white/15"
      >

        <div className="mx-auto max-w-[1800px] px-5 py-24 md:py-40">

          <div className="grid grid-cols-12">

            <div className="col-span-12 md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                02 / About
              </p>
            </div>

            <div className="col-span-12 mt-10 md:col-span-8 md:col-start-5 md:mt-0">

              <p className="text-4xl leading-[1.05] tracking-[-0.05em] md:text-7xl lg:text-[6.5vw]">
                I build digital experiences that are{" "}
                <span className="text-black/30 dark:text-white/30">
                  useful, expressive and built to last.
                </span>
              </p>

            </div>

          </div>


          <div className="mt-32 grid grid-cols-12 border-t border-black/15 pt-8 dark:border-white/15">

            <div className="col-span-12 md:col-span-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                A little more
              </span>
            </div>

            <div className="col-span-12 mt-8 md:col-span-4 md:col-start-5 md:mt-0">
              <p className="text-sm leading-7 text-black/60 dark:text-white/60">
                I enjoy taking ideas from rough concepts to polished digital
                experiences. My work sits somewhere between engineering,
                interaction and visual design.
              </p>
            </div>

            <div className="col-span-12 mt-8 md:col-span-4 md:mt-0">
              <p className="text-sm leading-7 text-black/60 dark:text-white/60">
                The goal is simple: make things that communicate clearly,
                perform well and have enough personality to be remembered.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CAPABILITIES
      ===================================================== */}

      <section
        id="capabilities"
        className="border-b border-black/15 dark:border-white/15"
      >

        <div className="mx-auto max-w-[1800px] px-5 py-24 md:py-40">

          {/* Heading */}
          <div className="grid grid-cols-12">

            <div className="col-span-12 md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                03 / Capabilities
              </p>
            </div>

            <div className="col-span-12 mt-8 md:col-span-8 md:col-start-5 md:mt-0">

              <h2 className="text-5xl tracking-[-0.06em] md:text-8xl lg:text-[8vw]">
                What I do.
              </h2>

            </div>

          </div>


          {/* Capability rows */}
          <div className="mt-24">

            {capabilities.map((item) => (
              <div
                key={item.id}
                className="group grid grid-cols-12 border-t border-black/15 py-8 dark:border-white/15 md:py-12"
              >

                <div className="col-span-2">
                  <span className="text-[10px] text-black/40 dark:text-white/40">
                    {item.id}
                  </span>
                </div>

                <div className="col-span-10 md:col-span-4">
                  <h3 className="text-3xl tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                    {item.title}
                  </h3>
                </div>

                <div className="col-span-10 col-start-3 mt-8 md:col-span-5 md:col-start-8 md:mt-0">
                  <p className="max-w-md text-sm leading-7 text-black/55 dark:text-white/55">
                    {item.description}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          VISUAL STATEMENT
      ===================================================== */}

      <section className="border-b border-black/15 dark:border-white/15">

        <div className="mx-auto max-w-[1800px] px-5 py-24 md:py-40">

          <div className="grid grid-cols-12">

            <div className="col-span-12 md:col-span-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                04 / Philosophy
              </span>
            </div>

            <div className="col-span-12 mt-12 md:col-span-8 md:col-start-5 md:mt-0">

              <div className="text-5xl leading-[0.9] tracking-[-0.065em] md:text-8xl lg:text-[9vw]">

                <div>MAKE IT</div>

                <div className="ml-[12vw] text-black/30 dark:text-white/30">
                  SIMPLE.
                </div>

                <div>MAKE IT</div>

                <div className="ml-[5vw]">
                  MATTER.
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          WORK
      ===================================================== */}

      <section
        id="work"
        className="border-b border-black/15 dark:border-white/15"
      >

        <div className="mx-auto max-w-[1800px] px-5 py-24 md:py-40">

          <div className="grid grid-cols-12">

            <div className="col-span-12 md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                05 / Selected Work
              </p>
            </div>

            <div className="col-span-12 mt-8 md:col-span-8 md:col-start-5 md:mt-0">

              <div className="border-t border-black/15 dark:border-white/15">

                <div className="flex items-start justify-between py-6">

                  <span className="text-[10px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                    Portfolio
                  </span>

                  <span className="text-[10px]">
                    2026
                  </span>

                </div>


                <div className="flex min-h-[55vh] items-center justify-center border-y border-black/15 dark:border-white/15">

                  <div className="text-center">

                    <p className="text-6xl tracking-[-0.07em] md:text-[9vw]">
                      COMING
                    </p>

                    <p className="ml-[8vw] text-6xl tracking-[-0.07em] text-black/25 dark:text-white/25 md:text-[9vw]">
                      SOON.
                    </p>

                  </div>

                </div>


                <div className="flex justify-between py-6 text-[10px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40">

                  <span>
                    Selected projects
                  </span>

                  <span>
                    01 — 04
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          PRINCIPLES
      ===================================================== */}

      <section className="border-b border-black/15 dark:border-white/15">

        <div className="mx-auto max-w-[1800px] px-5 py-24 md:py-40">

          <div className="grid grid-cols-12">

            <div className="col-span-12 md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                06 / Principles
              </p>
            </div>

            <div className="col-span-12 mt-12 md:col-span-8 md:col-start-5 md:mt-0">

              <div>

                {principles.map((principle, index) => (
                  <div
                    key={principle}
                    className="flex items-baseline justify-between border-t border-black/15 py-6 dark:border-white/15 md:py-8"
                  >

                    <span className="text-[10px] text-black/35 dark:text-white/35">
                      0{index + 1}
                    </span>

                    <span className="ml-8 text-right text-2xl tracking-[-0.035em] md:text-4xl">
                      {principle}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          LOCATION
      ===================================================== */}

      <section className="border-b border-black/15 dark:border-white/15">

        <div className="mx-auto max-w-[1800px] px-5 py-24 md:py-32">

          <div className="grid grid-cols-12">

            <div className="col-span-12 md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                07 / Where I am
              </p>
            </div>

            <div className="col-span-12 mt-12 md:col-span-8 md:col-start-5 md:mt-0">

              <div className="grid grid-cols-2 gap-y-8 border-t border-black/15 pt-6 dark:border-white/15 md:grid-cols-3">

                <div>
                  <p className="text-sm">
                    Abuja, Nigeria
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-black/40 dark:text-white/40">
                    Current base
                  </p>
                </div>

                <div>
                  <p className="text-sm">
                    West Africa
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-black/40 dark:text-white/40">
                    Time zone
                  </p>
                </div>

                <div>
                  <p className="text-sm">
                    Worldwide
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-black/40 dark:text-white/40">
                    Available remotely
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section id="contact">

        <div className="mx-auto max-w-[1800px] px-5 pb-10 pt-24 md:pt-40">

          <div className="grid grid-cols-12">

            <div className="col-span-12 md:col-span-3">

              <p className="text-[10px] uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                08 / Contact
              </p>

            </div>


            <div className="col-span-12 mt-12 md:col-span-9 md:mt-0">

              <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                Have something worth building?
              </p>


              <h2 className="mt-10 text-[19vw] font-medium leading-[0.7] tracking-[-0.09em] md:text-[14vw]">

                LET&apos;S

                <br />

                TALK<span className="text-black/25 dark:text-white/25">.</span>

              </h2>


              {/* Contact information */}

              <div className="mt-24 grid grid-cols-12 border-t border-black/15 pt-6 dark:border-white/15">

                <div className="col-span-12 md:col-span-3">

                  <span className="text-[10px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                    Email
                  </span>

                </div>

                <div className="col-span-12 mt-3 md:col-span-9 md:mt-0">

                  <a
                    href="mailto:cinonsokafor@gmail.com"
                    className="text-xl tracking-[-0.03em] underline decoration-black/20 underline-offset-4 transition-opacity hover:opacity-50 dark:decoration-white/20 md:text-3xl"
                  >
                    hello@bychinonso.com
                  </a>

                </div>

              </div>


              <div className="grid grid-cols-12 border-t border-black/15 py-6 dark:border-white/15">

                <div className="col-span-12 md:col-span-3">

                  <span className="text-[10px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                    Phone
                  </span>

                </div>

                <div className="col-span-12 mt-3 md:col-span-9 md:mt-0">

                  <a
                    href="tel:+2347026704155"
                    className="text-xl tracking-[-0.03em] underline decoration-black/20 underline-offset-4 transition-opacity hover:opacity-50 dark:decoration-white/20 md:text-3xl"
                  >
                    +234 70 2670 4155
                  </a>

                </div>

              </div>


              {/* Social */}

              <div className="grid grid-cols-12 border-t border-black/15 py-6 dark:border-white/15">

                <div className="col-span-12 md:col-span-3">

                  <span className="text-[10px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                    Elsewhere
                  </span>

                </div>

                <div className="col-span-12 mt-5 flex gap-8 md:col-span-9 md:mt-0">

                  <a
                    href="https://www.linkedin.com/in/bychinonso/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm transition-opacity hover:opacity-50"
                  >
                    LinkedIn ↗
                  </a>

                  <a
                    href="https://bychinonso.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm transition-opacity hover:opacity-50"
                  >
                    Website ↗
                  </a>

                </div>

              </div>

            </div>

          </div>


          {/* Footer */}

          <footer className="mt-32 border-t border-black/15 py-6 dark:border-white/15">

            <div className="grid grid-cols-12 text-[10px] uppercase tracking-[0.15em] text-black/40 dark:text-white/40">

              <div className="col-span-6 md:col-span-4">
                © 2026 By Chinonso
              </div>

              <div className="col-span-6 text-right md:col-span-4 md:text-center">
                Nigeria ↗
              </div>

              <div className="col-span-12 mt-4 md:col-span-4 md:mt-0 md:text-right">
                Built with Next.js
              </div>

            </div>

          </footer>

        </div>

      </section>

    </main>
  );
}
