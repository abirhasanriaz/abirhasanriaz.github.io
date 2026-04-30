import { ArrowRight, Sparkles } from "lucide-react";
import heroProduct from "@/assets/hero-product.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface border border-border/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              Founded by Abir Hasan Riaz · 2026
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02]">
              Riaz Digital Store
              <br />
              <span className="italic font-light text-muted-foreground">by Abir Hasan Riaz.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Curated premium essentials from <strong className="font-medium text-foreground">Abir Hasan Riaz</strong> —
              thoughtfully designed, fairly priced, delivered to your door.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button className="group btn-glossy inline-flex items-center gap-2 h-12 px-6 rounded-full text-primary-foreground text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </button>
              <button className="inline-flex items-center h-12 px-6 rounded-full border border-border bg-background text-sm font-medium hover:bg-surface transition-colors">
                Browse Categories
              </button>
            </div>

            <div className="flex items-center gap-8 pt-6">
              {[
                { v: "10K+", l: "Products" },
                { v: "4.9★", l: "Rated" },
                { v: "Free", l: "Delivery" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-semibold">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative animate-fade-up" style={{ animationDelay: "100ms" }}>
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-surface to-surface-elevated rounded-[2rem] blur-2xl opacity-60" />
            <div className="relative aspect-square rounded-[2rem] bg-gradient-to-br from-surface to-surface-elevated overflow-hidden shadow-lift">
              <img
                src={heroProduct}
                alt="Premium wireless headphones"
                width={1280}
                height={1280}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-4 flex items-center justify-between shadow-card">
                <div>
                  <div className="text-xs text-muted-foreground">Featured</div>
                  <div className="font-medium text-sm">Studio Pro Headphones</div>
                </div>
                <div className="font-display font-semibold">$349</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
