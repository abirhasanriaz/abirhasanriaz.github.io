export function Footer() {
  return (
    <footer className="border-t border-border mt-12 pb-24 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary grid place-items-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <span className="font-display font-semibold text-lg">Noir</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 max-w-xs">
            A curated marketplace for the things you love. Premium quality, fair prices.
          </p>
        </div>
        {[
          { t: "Shop", l: ["New arrivals", "Best sellers", "Sale", "Brands"] },
          { t: "Support", l: ["Contact", "Shipping", "Returns", "FAQ"] },
        ].map((c) => (
          <div key={c.t}>
            <div className="font-medium text-sm mb-3">{c.t}</div>
            <ul className="space-y-2">
              {c.l.map((i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© 2026 Noir. All rights reserved.</span>
          <span>Designed for the everyday.</span>
        </div>
      </div>
    </footer>
  );
}
