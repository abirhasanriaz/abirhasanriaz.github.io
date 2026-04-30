import founderImg from "@/assets/founder-abir.jpg";

export function AboutFounder() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative order-1 lg:order-none">
            <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-3xl bg-muted shadow-lift">
              <img
                src={founderImg}
                alt="Abir Hasan Riaz — Founder of Noir"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] opacity-80">Founder</p>
                  <p className="font-display font-semibold text-lg">Abir Hasan Riaz</p>
                </div>
                <span className="h-9 w-9 rounded-full bg-white/15 backdrop-blur grid place-items-center border border-white/30">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </span>
              </div>
            </div>
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-muted to-transparent blur-2xl opacity-60" />
          </div>

          {/* Text */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Meet the founder
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
              Hi, I'm <span className="italic">Abir Hasan Riaz</span>.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              I built Riaz Digital Store to make premium shopping feel calm again — a curated
              marketplace where every product earns its place. No clutter, no
              gimmicks. Just thoughtful design and fair prices.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 max-w-sm">
              <div>
                <p className="font-display text-2xl font-semibold">2026</p>
                <p className="text-xs text-muted-foreground mt-1">Founded</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold">120+</p>
                <p className="text-xs text-muted-foreground mt-1">Brands</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold">50k</p>
                <p className="text-xs text-muted-foreground mt-1">Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
